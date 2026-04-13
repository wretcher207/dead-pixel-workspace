use std::{
    collections::HashMap,
    time::{Duration, SystemTime, UNIX_EPOCH},
};

pub const IDLE_TIMEOUT_MS: u64 = 15 * 60 * 1000; // 15 minutes

#[derive(Debug, Clone)]
pub struct SessionTimeline {
    pub first_event: SystemTime,
    pub last_event: SystemTime,
    pub event_count: usize,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
pub struct SessionEndMetadata {
    pub ended_at: String,
    pub duration_ms: u64,
    pub active_ms: u64,
    pub event_count: usize,
}

pub fn record_event_timestamp(
    timelines: &mut HashMap<String, SessionTimeline>,
    session_id: &str,
    ts: SystemTime,
) {
    timelines
        .entry(session_id.to_string())
        .and_modify(|tl| {
            if ts > tl.last_event {
                tl.last_event = ts;
            }
            tl.event_count += 1;
        })
        .or_insert(SessionTimeline {
            first_event: ts,
            last_event: ts,
            event_count: 1,
        });
}

pub fn idle_session_ids(timelines: &HashMap<String, SessionTimeline>, now: SystemTime) -> Vec<String> {
    let threshold = Duration::from_millis(IDLE_TIMEOUT_MS);
    timelines
        .iter()
        .filter(|(_, tl)| now.duration_since(tl.last_event).unwrap_or_default() >= threshold)
        .map(|(id, _)| id.clone())
        .collect()
}

pub fn compute_session_end(tl: &SessionTimeline) -> SessionEndMetadata {
    let ended_at = tl.last_event + Duration::from_millis(IDLE_TIMEOUT_MS);
    let duration_ms = ended_at
        .duration_since(tl.first_event)
        .unwrap_or_default()
        .as_millis() as u64;
    let active_ms = tl
        .last_event
        .duration_since(tl.first_event)
        .unwrap_or_default()
        .as_millis() as u64;
    let ended_at_unix = ended_at
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis();

    SessionEndMetadata {
        ended_at: format!("{ended_at_unix}"),
        duration_ms,
        active_ms,
        event_count: tl.event_count,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::{Duration, SystemTime};

    #[test]
    fn session_not_idle_within_timeout() {
        let mut timelines: HashMap<String, SessionTimeline> = HashMap::new();
        let now = SystemTime::now();
        record_event_timestamp(&mut timelines, "s1", now);
        let idle = idle_session_ids(&timelines, now + Duration::from_secs(60));
        assert!(idle.is_empty());
    }

    #[test]
    fn session_idle_after_timeout() {
        let mut timelines: HashMap<String, SessionTimeline> = HashMap::new();
        let past = SystemTime::now() - Duration::from_secs(1000);
        record_event_timestamp(&mut timelines, "s1", past);
        let idle = idle_session_ids(&timelines, SystemTime::now());
        assert_eq!(idle, vec!["s1".to_string()]);
    }

    #[test]
    fn compute_session_end_produces_metadata() {
        let mut timelines: HashMap<String, SessionTimeline> = HashMap::new();
        let start = SystemTime::now() - Duration::from_secs(120);
        let mid = SystemTime::now() - Duration::from_secs(60);
        record_event_timestamp(&mut timelines, "s1", start);
        record_event_timestamp(&mut timelines, "s1", mid);
        let tl = timelines.get("s1").unwrap();
        let meta = compute_session_end(tl);
        assert!(meta.duration_ms >= 60_000);
    }
}
