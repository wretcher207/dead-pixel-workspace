use dirs::data_local_dir;
use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HelperConfig {
    pub endpoint: String,
    pub device_id: String,
    pub ingest_key: String,
    pub surface: String,
}

pub fn config_dir() -> PathBuf {
    // Windows: %APPDATA%\claudes-receipts
    // Fallback: ~/.local/share/claudes-receipts
    let base = std::env::var("APPDATA")
        .map(PathBuf::from)
        .unwrap_or_else(|_| data_local_dir().unwrap_or_else(|| PathBuf::from(".")));
    base.join("claudes-receipts")
}

pub fn config_path() -> PathBuf {
    config_dir().join("config.json")
}

pub fn cursor_dir() -> PathBuf {
    config_dir().join("cursors")
}

pub fn queue_path() -> PathBuf {
    config_dir().join("queue.jsonl")
}

pub fn read_config() -> Option<HelperConfig> {
    let raw = fs::read_to_string(config_path()).ok()?;
    serde_json::from_str(&raw).ok()
}

pub fn write_config(cfg: &HelperConfig) -> std::io::Result<()> {
    let dir = config_dir();
    fs::create_dir_all(&dir)?;
    fs::create_dir_all(cursor_dir())?;
    let json = serde_json::to_string_pretty(cfg).unwrap();
    fs::write(config_path(), json)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::env;
    use tempfile::tempdir;

    #[test]
    fn round_trips_config() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());

        let cfg = HelperConfig {
            endpoint: "https://example.com".into(),
            device_id: "abc-123".into(),
            ingest_key: "secret".into(),
            surface: "desktop".into(),
        };
        write_config(&cfg).unwrap();
        let loaded = read_config().unwrap();
        assert_eq!(loaded.endpoint, cfg.endpoint);
        assert_eq!(loaded.device_id, cfg.device_id);
        assert_eq!(loaded.ingest_key, cfg.ingest_key);
    }
}
