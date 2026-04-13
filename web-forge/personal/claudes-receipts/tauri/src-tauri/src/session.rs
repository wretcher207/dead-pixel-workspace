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
#[serde(rename_all = "camelCase")]
pub struct SessionEndMetadata {
    pub ended_at: String,       // ISO-8601 with Z
    pub duration_seconds: u64,
    pub active_seconds: u64,
    pub idle_seconds: u64,
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
    let active = tl
        .last_event
        .duration_since(tl.first_event)
        .unwrap_or_default();
    let active_seconds = active.as_secs();
    let idle_seconds = IDLE_TIMEOUT_MS / 1000;
    let duration_seconds = active_seconds + idle_seconds;
    let ended_at_system = tl.last_event + Duration::from_millis(IDLE_TIMEOUT_MS);
    let ended_at_unix_ms = ended_at_system
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as i64;
    let ended_at = format_iso8601(ended_at_unix_ms);

    SessionEndMetadata {
        ended_at,
        duration_seconds,
        active_seconds,
        idle_seconds,
    }
}

fn format_iso8601(unix_ms: i64) -> String {
    // Convert unix millis to ISO-8601 UTC. Pure Rust — no chrono dep.
    // Algorithm: compute days/time-of-day, then year/month/day from civil-from-days.
    let secs = unix_ms.div_euclid(1000);
    let millis = unix_ms.rem_euclid(1000);
    let days = secs.div_euclid(86_400);
    let sod = secs.rem_euclid(86_400);
    let h = sod / 3_600;
    let m = (sod % 3_600) / 60;
    let s = sod % 60;
    let (y, mo, d) = civil_from_days(days);
    format!(
        "{:04}-{:02}-{:02}T{:02}:{:02}:{:02}.{:03}Z",
        y, mo, d, h, m, s, millis
    )
}

/// Howard Hinnant's civil-from-days algorithm (public domain).
fn civil_from_days(z: i64) -> (i64, u32, u32) {
    let z = z + 719_468;
    let era = if z >= 0 { z } else { z - 146_096 } / 146_097;
    let doe = (z - era * 146_097) as u32;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y = yoe as i64 + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let year = if m <= 2 { y + 1 } else { y };
    (year, m, d)
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
        // active span is 60 seconds (start to mid)
        assert!(meta.active_seconds >= 60);
        // idle padding is 15 minutes
        assert_eq!(meta.idle_seconds, 900);
        // duration is active + idle
        assert_eq!(meta.duration_seconds, meta.active_seconds + meta.idle_seconds);
        // ended_at is ISO-8601 with Z suffix
        assert!(meta.ended_at.ends_with('Z'));
        assert!(meta.ended_at.contains('T'));
    }

    #[test]
    fn iso8601_format_is_correct() {
        // 2026-04-12T10:00:00.000Z → 1775988000000 ms
        let out = format_iso8601(1_775_988_000_000);
        assert_eq!(out, "2026-04-12T10:00:00.000Z");
        // Sanity check another known value: 1970-01-01T00:00:00.000Z → 0 ms
        assert_eq!(format_iso8601(0), "1970-01-01T00:00:00.000Z");
        // And a fractional-millis value
        assert_eq!(
            format_iso8601(1_775_988_000_123),
            "2026-04-12T10:00:00.123Z"
        );
    }
}
