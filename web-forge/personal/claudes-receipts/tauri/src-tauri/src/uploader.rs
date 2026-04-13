use crate::{config::queue_path, parser::IngestEvent, session::SessionEndMetadata};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{fs, io::Write};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct IngestPayload {
    pub session_id: String,
    pub surface: String,
    pub project_key: Option<String>,
    pub events: Vec<IngestEvent>,
    pub session_end: Option<SessionEndMetadata>,
}

#[derive(Debug)]
pub struct PostResult {
    pub ok: bool,
    pub auth_failed: bool,
}

pub async fn post_batch(
    endpoint: &str,
    ingest_key: &str,
    payload: &IngestPayload,
) -> PostResult {
    let client = Client::new();
    let url = format!("{endpoint}/api/ingest");
    match client
        .post(&url)
        .header("x-ingest-key", ingest_key)
        .json(payload)
        .send()
        .await
    {
        Ok(resp) => {
            if resp.status() == 401 {
                PostResult { ok: false, auth_failed: true }
            } else {
                PostResult { ok: resp.status().is_success(), auth_failed: false }
            }
        }
        Err(_) => PostResult { ok: false, auth_failed: false },
    }
}

pub fn enqueue_payload(payload: &IngestPayload) -> std::io::Result<()> {
    let path = queue_path();
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let mut file = fs::OpenOptions::new().create(true).append(true).open(&path)?;
    let line = serde_json::to_string(payload).unwrap();
    writeln!(file, "{line}")
}

pub fn load_queue() -> std::io::Result<Vec<IngestPayload>> {
    let path = queue_path();
    if !path.exists() {
        return Ok(vec![]);
    }
    let raw = fs::read_to_string(&path)?;
    Ok(raw
        .lines()
        .filter_map(|l| serde_json::from_str(l).ok())
        .collect())
}

pub fn clear_queue() -> std::io::Result<()> {
    let path = queue_path();
    if path.exists() {
        fs::write(path, "")?;
    }
    Ok(())
}

pub async fn flush_queue(endpoint: &str, ingest_key: &str) -> PostResult {
    let items = match load_queue() {
        Ok(v) => v,
        Err(_) => return PostResult { ok: true, auth_failed: false },
    };
    for payload in &items {
        let result = post_batch(endpoint, ingest_key, payload).await;
        if result.auth_failed {
            return PostResult { ok: false, auth_failed: true };
        }
        if !result.ok {
            return PostResult { ok: false, auth_failed: false };
        }
    }
    clear_queue().ok();
    PostResult { ok: true, auth_failed: false }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::parser::IngestEvent;
    use serial_test::serial;
    use std::env;
    use tempfile::tempdir;

    fn empty_payload(session_id: &str) -> IngestPayload {
        IngestPayload {
            session_id: session_id.into(),
            surface: "desktop".into(),
            project_key: None,
            events: Vec::<IngestEvent>::new(),
            session_end: None,
        }
    }

    #[test]
    #[serial]
    fn queue_and_load_roundtrip() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());

        let payload = empty_payload("s1");
        enqueue_payload(&payload).unwrap();
        let loaded = load_queue().unwrap();
        assert_eq!(loaded.len(), 1);
        assert_eq!(loaded[0].session_id, "s1");
    }

    #[test]
    #[serial]
    fn clear_queue_empties_file() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());

        let payload = empty_payload("s2");
        enqueue_payload(&payload).unwrap();
        clear_queue().unwrap();
        let loaded = load_queue().unwrap();
        assert!(loaded.is_empty());
    }
}
