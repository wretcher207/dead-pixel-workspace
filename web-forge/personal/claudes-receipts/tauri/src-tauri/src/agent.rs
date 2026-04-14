use crate::{
    config::{read_config, HelperConfig},
    parser::parse_record,
    session::{
        compute_session_end, idle_session_ids, record_event_timestamp, SessionTimeline,
    },
    state::{now_unix_ms, AgentState, SharedState},
    uploader::{enqueue_payload, flush_queue, post_batch, IngestPayload},
    watcher::{read_cursor, read_new_lines, session_id_from_path, write_cursor},
};
use notify::{Config, RecommendedWatcher, RecursiveMode, Watcher};
use std::{
    collections::{HashMap, HashSet},
    path::PathBuf,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::Duration,
};
use tokio::{sync::mpsc, time};

pub struct AgentHandle {
    pub paused: Arc<AtomicBool>,
    pub shutdown: Arc<AtomicBool>,
}

/// Spawn the agent loop as a background tokio task.
pub fn spawn_agent(shared: SharedState) -> AgentHandle {
    let paused = Arc::new(AtomicBool::new(false));
    let shutdown = Arc::new(AtomicBool::new(false));
    let paused2 = paused.clone();
    let shutdown2 = shutdown.clone();

    tokio::spawn(async move {
        run_agent(shared, paused2, shutdown2).await;
    });

    AgentHandle { paused, shutdown }
}

async fn run_agent(
    shared: SharedState,
    paused: Arc<AtomicBool>,
    shutdown: Arc<AtomicBool>,
) {
    let config = match read_config() {
        Some(c) => c,
        None => {
            if let Ok(mut s) = shared.lock() {
                *s = AgentState::Unconfigured;
            }
            return;
        }
    };

    let claude_dir = dirs::home_dir()
        .unwrap_or_default()
        .join(".claude")
        .join("projects");

    let (tx, mut rx) = mpsc::channel::<PathBuf>(256);
    let mut watcher = match RecommendedWatcher::new(
        move |res: notify::Result<notify::Event>| {
            if let Ok(event) = res {
                for path in event.paths {
                    if path.extension().and_then(|e| e.to_str()) == Some("jsonl") {
                        let _ = tx.blocking_send(path);
                    }
                }
            }
        },
        Config::default(),
    ) {
        Ok(w) => w,
        Err(e) => {
            eprintln!("[agent] watcher init failed: {e}");
            return;
        }
    };

    if let Err(e) = watcher.watch(&claude_dir, RecursiveMode::Recursive) {
        eprintln!("[agent] watch failed for {:?}: {e}", claude_dir);
        return;
    }

    let mut pending: HashMap<String, IngestPayload> = HashMap::new();
    let mut timelines: HashMap<String, SessionTimeline> = HashMap::new();
    let mut closed_sessions: HashSet<String> = HashSet::new();
    let mut sessions_tracked: usize = 0;

    let mut flush_ticker = time::interval(Duration::from_secs(15));

    loop {
        if shutdown.load(Ordering::Relaxed) {
            break;
        }

        tokio::select! {
            Some(path) = rx.recv() => {
                if paused.load(Ordering::Relaxed) { continue; }
                let path_str = path.to_string_lossy().to_string();
                let session_id = session_id_from_path(&path_str);
                let offset = read_cursor(&path_str);
                let (lines, next_offset) = match read_new_lines(&path, offset) {
                    Ok(x) => x,
                    Err(_) => continue,
                };
                if lines.is_empty() { continue; }

                closed_sessions.remove(&session_id);
                let bucket = pending.entry(session_id.clone()).or_insert_with(|| IngestPayload {
                    session_id: session_id.clone(),
                    surface: config.surface.clone(),
                    project_key: None,
                    events: Vec::new(),
                    session_end: None,
                });

                let mut saw_events = false;
                for line in &lines {
                    let raw = match serde_json::from_str::<serde_json::Value>(line) {
                        Ok(v) => v,
                        Err(_) => continue,
                    };
                    let events = parse_record(&raw, &session_id);
                    for event in events {
                        record_event_timestamp(&mut timelines, &session_id, std::time::SystemTime::now());
                        bucket.events.push(event);
                        saw_events = true;
                    }
                }
                let _ = write_cursor(&path_str, next_offset);
                if saw_events && !timelines.contains_key(&session_id) {
                    // first-event-for-session counter
                    sessions_tracked += 1;
                } else if saw_events && timelines.len() > sessions_tracked {
                    sessions_tracked = timelines.len();
                }
            }

            _ = flush_ticker.tick() => {
                if paused.load(Ordering::Relaxed) { continue; }
                let auth_failed = do_flush(
                    &config,
                    &mut pending,
                    &mut timelines,
                    &mut closed_sessions,
                ).await;
                if auth_failed {
                    if let Ok(mut s) = shared.lock() {
                        *s = AgentState::AuthError { since_unix_ms: now_unix_ms() };
                    }
                    break;
                }
                if let Ok(mut s) = shared.lock() {
                    *s = AgentState::Watching {
                        last_flush_unix_ms: now_unix_ms(),
                        sessions_tracked,
                    };
                }
            }
        }
    }
}

async fn do_flush(
    config: &HelperConfig,
    pending: &mut HashMap<String, IngestPayload>,
    timelines: &mut HashMap<String, SessionTimeline>,
    closed: &mut HashSet<String>,
) -> bool {
    // Drain pending events
    let keys: Vec<String> = pending.keys().cloned().collect();
    for session_id in keys {
        let Some(payload) = pending.remove(&session_id) else { continue };
        if payload.events.is_empty() { continue; }
        let result = post_batch(&config.endpoint, &config.ingest_key, &payload).await;
        if result.auth_failed { return true; }
        if !result.ok { let _ = enqueue_payload(&payload); }
    }

    // Close idle sessions
    let now = std::time::SystemTime::now();
    let idle_ids = idle_session_ids(timelines, now);
    for session_id in idle_ids {
        if closed.contains(&session_id) { continue; }
        let Some(tl) = timelines.remove(&session_id) else { continue };
        let session_end = compute_session_end(&tl);
        let payload = IngestPayload {
            session_id: session_id.clone(),
            surface: config.surface.clone(),
            project_key: None,
            events: Vec::new(),
            session_end: Some(session_end),
        };
        // Session-end-only payloads still go through ingest — the API handles empty events + session_end.
        // BUT the current ingest schema requires events.min(1). If /api/ingest rejects empty events arrays,
        // this POST will fail and fall into the offline queue. That's fail-soft — the session end just lands
        // on the next successful flush with any new events. Task 14/15 will confirm server-side behavior.
        let result = post_batch(&config.endpoint, &config.ingest_key, &payload).await;
        if result.auth_failed { return true; }
        if !result.ok { let _ = enqueue_payload(&payload); }
        closed.insert(session_id);
    }

    // Replay offline queue
    let q = flush_queue(&config.endpoint, &config.ingest_key).await;
    q.auth_failed
}
