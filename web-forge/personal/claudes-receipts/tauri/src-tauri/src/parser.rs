use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IngestEvent {
    pub event_id: String,
    pub event_type: String,
    pub session_id: String,
    pub timestamp: String,
    pub input_tokens: Option<u64>,
    pub output_tokens: Option<u64>,
    pub cache_creation_tokens: Option<u64>,
    pub cache_read_tokens: Option<u64>,
    pub cost_usd: Option<f64>,
    pub tool_name: Option<String>,
    pub is_error: Option<bool>,
}

pub fn event_id(session_id: &str, event_type: &str, timestamp: &str, index: usize) -> String {
    format!("{session_id}-{event_type}-{timestamp}-{index}")
}

pub fn parse_record(raw: &serde_json::Value, session_id: &str) -> Vec<IngestEvent> {
    let mut events = Vec::new();
    let record_type = raw["type"].as_str().unwrap_or("");
    let timestamp = raw["timestamp"].as_str().unwrap_or("").to_string();

    match record_type {
        "user" => {
            let is_meta = raw["isMeta"].as_bool().unwrap_or(false);
            if !is_meta {
                events.push(IngestEvent {
                    event_id: event_id(session_id, "prompt_submitted", &timestamp, 0),
                    event_type: "prompt_submitted".into(),
                    session_id: session_id.into(),
                    timestamp,
                    input_tokens: None,
                    output_tokens: None,
                    cache_creation_tokens: None,
                    cache_read_tokens: None,
                    cost_usd: None,
                    tool_name: None,
                    is_error: None,
                });
            }
        }
        "assistant" => {
            let usage = &raw["message"]["usage"];
            if !usage.is_null() {
                let cost = raw["costUSD"].as_f64();
                events.push(IngestEvent {
                    event_id: event_id(session_id, "api_request_completed", &timestamp, 0),
                    event_type: "api_request_completed".into(),
                    session_id: session_id.into(),
                    timestamp: timestamp.clone(),
                    input_tokens: usage["input_tokens"].as_u64(),
                    output_tokens: usage["output_tokens"].as_u64(),
                    cache_creation_tokens: usage["cache_creation_input_tokens"].as_u64(),
                    cache_read_tokens: usage["cache_read_input_tokens"].as_u64(),
                    cost_usd: cost,
                    tool_name: None,
                    is_error: None,
                });
            }
            if let Some(content) = raw["message"]["content"].as_array() {
                for (i, block) in content.iter().enumerate() {
                    if block["type"].as_str() == Some("tool_use") {
                        let name = block["name"].as_str().unwrap_or("unknown").to_string();
                        events.push(IngestEvent {
                            event_id: event_id(session_id, "tool_completed", &timestamp, i),
                            event_type: "tool_completed".into(),
                            session_id: session_id.into(),
                            timestamp: timestamp.clone(),
                            input_tokens: None,
                            output_tokens: None,
                            cache_creation_tokens: None,
                            cache_read_tokens: None,
                            cost_usd: None,
                            tool_name: Some(name),
                            is_error: None,
                        });
                    }
                }
            }
        }
        _ => {}
    }

    events
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_prompt_submitted() {
        let line = r#"{"type":"user","message":{"role":"user"},"isMeta":false,"requestId":"r1","sessionId":"s1","uuid":"u1","timestamp":"2026-04-12T10:00:00.000Z","cwd":"/home","version":"1.0","gitBranch":"main"}"#;
        let raw: serde_json::Value = serde_json::from_str(line).unwrap();
        let events = parse_record(&raw, "s1");
        assert_eq!(events.len(), 1);
        assert_eq!(events[0].event_type, "prompt_submitted");
    }

    #[test]
    fn parses_api_request_with_usage() {
        let line = r#"{"type":"assistant","message":{"role":"assistant","usage":{"input_tokens":100,"output_tokens":50,"cache_creation_input_tokens":0,"cache_read_input_tokens":0}},"sessionId":"s1","uuid":"u2","timestamp":"2026-04-12T10:01:00.000Z","costUSD":0.0015}"#;
        let raw: serde_json::Value = serde_json::from_str(line).unwrap();
        let events = parse_record(&raw, "s1");
        assert!(events.iter().any(|e| e.event_type == "api_request_completed"));
        let api_evt = events.iter().find(|e| e.event_type == "api_request_completed").unwrap();
        assert_eq!(api_evt.input_tokens, Some(100));
        assert_eq!(api_evt.output_tokens, Some(50));
    }

    #[test]
    fn skips_unknown_records() {
        let line = r#"{"type":"unknown","data":{}}"#;
        let raw: serde_json::Value = serde_json::from_str(line).unwrap();
        let events = parse_record(&raw, "s1");
        assert!(events.is_empty());
    }

    #[test]
    fn generates_stable_event_id() {
        let id = event_id("session-1", "tool_completed", "2026-04-12T10:00:00.000Z", 0);
        assert!(!id.is_empty());
        let id2 = event_id("session-1", "tool_completed", "2026-04-12T10:00:00.000Z", 0);
        assert_eq!(id, id2);
    }
}
