use serde::Serialize;
use std::{
    sync::{Arc, Mutex},
    time::{SystemTime, UNIX_EPOCH},
};

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "status", rename_all = "snake_case")]
pub enum AgentState {
    Unconfigured,
    Watching {
        last_flush_unix_ms: u64,
        sessions_tracked: usize,
    },
    Paused,
    AuthError {
        since_unix_ms: u64,
    },
}

impl AgentState {
    pub fn tray_tooltip(&self) -> &'static str {
        match self {
            Self::Unconfigured => "Claude's Receipts — Not configured",
            Self::Watching { .. } => "Claude's Receipts — Active",
            Self::Paused => "Claude's Receipts — Paused",
            Self::AuthError { .. } => "Claude's Receipts — Credential failure",
        }
    }

    pub fn tray_icon(&self) -> &'static str {
        match self {
            Self::Watching { .. } => "watching",
            Self::Paused => "paused",
            Self::Unconfigured | Self::AuthError { .. } => "warn",
        }
    }
}

pub fn now_unix_ms() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_millis() as u64
}

pub type SharedState = Arc<Mutex<AgentState>>;

pub fn new_shared_state() -> SharedState {
    Arc::new(Mutex::new(AgentState::Unconfigured))
}
