use crate::{
    config::{read_config, write_config, HelperConfig},
    state::{AgentState, SharedState},
};
use serde::Serialize;
use std::sync::{atomic::{AtomicBool, Ordering}, Arc};
use tauri::State;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AgentStatusResponse {
    pub state: AgentState,
    pub has_config: bool,
}

#[tauri::command]
pub async fn get_agent_status(
    shared: State<'_, SharedState>,
) -> Result<AgentStatusResponse, String> {
    let state = shared.lock().map_err(|e| e.to_string())?.clone();
    let has_config = read_config().is_some();
    Ok(AgentStatusResponse { state, has_config })
}

#[tauri::command]
pub async fn get_config() -> Result<Option<HelperConfig>, String> {
    Ok(read_config())
}

#[tauri::command]
pub async fn save_config(
    endpoint: String,
    device_id: String,
    ingest_key: String,
    surface: String,
) -> Result<(), String> {
    let cfg = HelperConfig {
        endpoint,
        device_id,
        ingest_key,
        surface,
    };
    write_config(&cfg).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn set_paused(
    paused: bool,
    agent_paused: State<'_, Arc<AtomicBool>>,
    shared: State<'_, SharedState>,
) -> Result<(), String> {
    agent_paused.store(paused, Ordering::Relaxed);
    let mut s = shared.lock().map_err(|e| e.to_string())?;
    if paused {
        *s = AgentState::Paused;
    }
    Ok(())
}
