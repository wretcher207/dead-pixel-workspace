# Tauri Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Tauri v2 Windows desktop app that replaces the Node CLI helper — Rust backend handles all agent logic, React webview surfaces a system tray status popup and settings window, deep link pairing connects to the live dashboard.

**Architecture:** Tauri v2 app at `tauri/`. Rust backend owns file watching (`notify`), JSONL parsing (`serde`), session tracking, HTTP ingest (`reqwest`), and offline queue. Shared `Arc<Mutex<AgentState>>` bridges the async agent task and Tauri IPC commands. React webview (Vite + Tailwind) renders the status popup and settings window.

**Tech Stack:** Rust / Tauri v2, React 19, Vite, Tailwind v4, `notify` v6, `reqwest` v0.12, `tokio` v1, `tauri-plugin-deep-link`, `tauri-plugin-autostart`, `tauri-plugin-notification`, `tauri-plugin-shell`

---

## File Map

```
tauri/
  src-tauri/
    Cargo.toml                  — Rust deps + Tauri features
    tauri.conf.json             — App identity, bundle, windows, tray, plugins
    build.rs                    — Tauri codegen (boilerplate)
    icons/                      — watching.png, paused.png, warn.png
    src/
      main.rs                   — App entry, plugin registration, tray setup, window creation
      state.rs                  — AgentState enum + AppState struct (Arc<Mutex<...>>)
      config.rs                 — HelperConfig, read/write %APPDATA%\claudes-receipts\config.json
      parser.rs                 — JSONL line → IngestEvent (serde structs)
      session.rs                — SessionTimeline, idle timeout, session_ended synthesis
      uploader.rs               — reqwest POST to /api/ingest, offline queue.jsonl
      watcher.rs                — notify watcher, cursor read/write, line tailing
      agent.rs                  — Agent task: orchestrates watcher→parser→session→uploader
      commands.rs               — #[tauri::command] IPC bridge for webview
  src/
    main.tsx                    — React entry
    App.tsx                     — Route to StatusPopup or SettingsWindow based on window label
    components/
      StatusPopup.tsx           — Left-click tray popup (agent state, last flush, sessions count)
      SettingsWindow.tsx        — Settings window (Connection, Agent, System sections)
    lib/
      tauri.ts                  — Typed invoke() wrappers
      types.ts                  — Shared TS types mirroring Rust structs
  index.html
  vite.config.ts
  package.json
  tailwind.config.ts            — Reuses claudes-receipts design tokens

Dashboard changes:
  src/app/devices/page.tsx      — Add "Open in App" deep link button on registration success
```

---

## Task 1: Scaffold Tauri v2 project

**Files:**
- Create: `tauri/src-tauri/Cargo.toml`
- Create: `tauri/src-tauri/tauri.conf.json`
- Create: `tauri/src-tauri/build.rs`
- Create: `tauri/src-tauri/src/main.rs` (stub)
- Create: `tauri/package.json`
- Create: `tauri/index.html`
- Create: `tauri/vite.config.ts`

- [ ] **Step 1: Install Tauri CLI**

```bash
cargo install tauri-cli --version "^2"
```

Expected: `tauri` binary available at `~/.cargo/bin/tauri`

- [ ] **Step 2: Create directory structure**

```bash
mkdir -p tauri/src-tauri/src tauri/src-tauri/icons tauri/src
```

- [ ] **Step 3: Write `tauri/src-tauri/Cargo.toml`**

```toml
[package]
name = "claudes-receipts"
version = "0.1.0"
edition = "2021"

[lib]
name = "claudes_receipts_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2", features = [] }

[dependencies]
tauri = { version = "2", features = ["tray-icon", "image-png"] }
tauri-plugin-deep-link = "2"
tauri-plugin-autostart = "2"
tauri-plugin-notification = "2"
tauri-plugin-shell = "2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
notify = "6"
tokio = { version = "1", features = ["full"] }
reqwest = { version = "0.12", features = ["json"] }
dirs = "5"
```

- [ ] **Step 4: Write `tauri/src-tauri/build.rs`**

```rust
fn main() {
    tauri_build::build()
}
```

- [ ] **Step 5: Write stub `tauri/src-tauri/src/main.rs`**

```rust
// Prevents additional console window on Windows in release
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    claudes_receipts_lib::run();
}
```

- [ ] **Step 6: Write stub lib entry (will expand in later tasks)**

Create `tauri/src-tauri/src/lib.rs`:

```rust
pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error running tauri app");
}
```

- [ ] **Step 7: Write `tauri/src-tauri/tauri.conf.json`**

```json
{
  "productName": "Claude's Receipts",
  "version": "0.1.0",
  "identifier": "app.claudes-receipts",
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:5173",
    "beforeDevCommand": "npm run dev",
    "beforeBuildCommand": "npm run build"
  },
  "app": {
    "withGlobalTauri": true,
    "windows": [
      {
        "label": "status",
        "title": "Claude's Receipts",
        "width": 320,
        "height": 220,
        "resizable": false,
        "decorations": false,
        "visible": false,
        "alwaysOnTop": true,
        "skipTaskbar": true
      },
      {
        "label": "settings",
        "title": "Claude's Receipts — Settings",
        "width": 520,
        "height": 420,
        "resizable": false,
        "visible": false
      }
    ],
    "trayIcon": {
      "iconPath": "icons/watching.png",
      "tooltip": "Claude's Receipts"
    }
  },
  "bundle": {
    "active": true,
    "targets": ["nsis"],
    "icon": ["icons/watching.png"],
    "windows": {
      "certificateThumbprint": null,
      "digestAlgorithm": "sha256",
      "timestampUrl": ""
    }
  },
  "plugins": {
    "deep-link": {
      "schemes": ["claudes-receipts"]
    },
    "autostart": {
      "args": []
    }
  }
}
```

- [ ] **Step 8: Write `tauri/package.json`**

```json
{
  "name": "claudes-receipts-tauri",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "tauri": "tauri"
  },
  "dependencies": {
    "@tauri-apps/api": "^2",
    "@tauri-apps/plugin-deep-link": "^2",
    "@tauri-apps/plugin-autostart": "^2",
    "@tauri-apps/plugin-notification": "^2",
    "@tauri-apps/plugin-shell": "^2",
    "react": "^19",
    "react-dom": "^19"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "@tailwindcss/vite": "^4",
    "typescript": "^5",
    "vite": "^6"
  }
}
```

- [ ] **Step 9: Write `tauri/vite.config.ts`**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    target: "chrome105",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
```

- [ ] **Step 10: Write `tauri/index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Claude's Receipts</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 11: Install JS deps and verify Rust compiles**

```bash
cd tauri
npm install
cd src-tauri
cargo check
```

Expected: No errors. `cargo check` may take 2–3 minutes on first run.

- [ ] **Step 12: Commit scaffold**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/
git commit -m "feat(tauri): scaffold Tauri v2 project"
```

---

## Task 2: Config module

**Files:**
- Create: `tauri/src-tauri/src/config.rs`

- [ ] **Step 1: Write the test**

Add to bottom of `tauri/src-tauri/src/config.rs`:

```rust
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
```

Add `tempfile = "3"` to `[dev-dependencies]` in `Cargo.toml`.

- [ ] **Step 2: Run test to verify it fails**

```bash
cd tauri/src-tauri
cargo test config -- --nocapture
```

Expected: FAIL — `HelperConfig` and `write_config`/`read_config` not defined.

- [ ] **Step 3: Write `tauri/src-tauri/src/config.rs`**

```rust
use dirs::data_local_dir;
use serde::{Deserialize, Serialize};
use std::{fs, path::PathBuf};

#[derive(Debug, Clone, Serialize, Deserialize)]
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
```

Add `mod config;` to `lib.rs`.

- [ ] **Step 4: Run test to verify it passes**

```bash
cargo test config -- --nocapture
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/config.rs tauri/src-tauri/Cargo.toml tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): config module — read/write HelperConfig"
```

---

## Task 3: JSONL parser

**Files:**
- Create: `tauri/src-tauri/src/parser.rs`

The parser reads the same JSONL format Claude Code writes. It extracts events using identical logic to `helper/src/parse.ts`.

- [ ] **Step 1: Write the tests**

```rust
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
        // same inputs = same id
        let id2 = event_id("session-1", "tool_completed", "2026-04-12T10:00:00.000Z", 0);
        assert_eq!(id, id2);
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd tauri/src-tauri
cargo test parser -- --nocapture
```

Expected: FAIL — `parse_record` and `event_id` not defined.

- [ ] **Step 3: Write `tauri/src-tauri/src/parser.rs`**

```rust
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
            // queue-operation enqueue OR plain user message → prompt_submitted
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
            // Tool use blocks inside assistant messages
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
```

Add `mod parser;` to `lib.rs`.

- [ ] **Step 4: Run tests to verify they pass**

```bash
cargo test parser -- --nocapture
```

Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/parser.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): JSONL parser — IngestEvent extraction"
```

---

## Task 4: Session tracker

**Files:**
- Create: `tauri/src-tauri/src/session.rs`

- [ ] **Step 1: Write tests**

```rust
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
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd tauri/src-tauri
cargo test session -- --nocapture
```

Expected: FAIL

- [ ] **Step 3: Write `tauri/src-tauri/src/session.rs`**

```rust
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
    pub ended_at: String,   // ISO 8601
    pub duration_ms: u64,
    pub active_ms: u64,     // approximated as time between first and last event
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
```

Add `mod session;` to `lib.rs`.

- [ ] **Step 4: Run tests to verify they pass**

```bash
cargo test session -- --nocapture
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/session.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): session tracker — idle timeout and end metadata"
```

---

## Task 5: Uploader module

**Files:**
- Create: `tauri/src-tauri/src/uploader.rs`

- [ ] **Step 1: Write tests**

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::env;
    use tempfile::tempdir;

    #[test]
    fn queue_and_load_roundtrip() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());

        let payload = IngestPayload {
            session_id: "s1".into(),
            surface: "desktop".into(),
            project_key: None,
            events: vec![],
            session_end: None,
        };
        enqueue_payload(&payload).unwrap();
        let loaded = load_queue().unwrap();
        assert_eq!(loaded.len(), 1);
        assert_eq!(loaded[0].session_id, "s1");
    }

    #[test]
    fn clear_queue_empties_file() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());

        let payload = IngestPayload {
            session_id: "s2".into(),
            surface: "desktop".into(),
            project_key: None,
            events: vec![],
            session_end: None,
        };
        enqueue_payload(&payload).unwrap();
        clear_queue().unwrap();
        let loaded = load_queue().unwrap();
        assert!(loaded.is_empty());
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd tauri/src-tauri
cargo test uploader -- --nocapture
```

Expected: FAIL

- [ ] **Step 3: Write `tauri/src-tauri/src/uploader.rs`**

```rust
use crate::{config::queue_path, parser::IngestEvent, session::SessionEndMetadata};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{fs, io::Write};

#[derive(Debug, Clone, Serialize, Deserialize)]
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
```

Add `mod uploader;` to `lib.rs`.

- [ ] **Step 4: Run tests to verify they pass**

```bash
cargo test uploader -- --nocapture
```

Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/uploader.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): uploader — HTTP ingest + offline queue"
```

---

## Task 6: File watcher module

**Files:**
- Create: `tauri/src-tauri/src/watcher.rs`

- [ ] **Step 1: Write tests**

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::{env, io::Write};
    use tempfile::tempdir;

    #[test]
    fn reads_new_lines_past_offset() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());
        let file_path = dir.path().join("test.jsonl");
        let mut f = std::fs::File::create(&file_path).unwrap();
        writeln!(f, "line1").unwrap();
        writeln!(f, "line2").unwrap();
        drop(f);

        let (lines, next_offset) = read_new_lines(&file_path, 0).unwrap();
        assert_eq!(lines.len(), 2);
        assert!(next_offset > 0);

        let (lines2, _) = read_new_lines(&file_path, next_offset).unwrap();
        assert!(lines2.is_empty());
    }

    #[test]
    fn cursor_roundtrip() {
        let dir = tempdir().unwrap();
        env::set_var("APPDATA", dir.path());
        write_cursor("myfile.jsonl", 42).unwrap();
        let offset = read_cursor("myfile.jsonl");
        assert_eq!(offset, 42);
    }

    #[test]
    fn session_id_extracted_from_path() {
        let id = session_id_from_path("/home/.claude/projects/myproject/abc-123.jsonl");
        assert_eq!(id, "abc-123");
    }
}
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd tauri/src-tauri
cargo test watcher -- --nocapture
```

Expected: FAIL

- [ ] **Step 3: Write `tauri/src-tauri/src/watcher.rs`**

```rust
use crate::config::cursor_dir;
use std::{fs, io::Read, path::Path};

/// Returns (new_lines, next_byte_offset)
pub fn read_new_lines(path: &Path, offset: u64) -> std::io::Result<(Vec<String>, u64)> {
    let mut file = fs::File::open(path)?;
    let metadata = file.metadata()?;
    let file_len = metadata.len();

    if file_len <= offset {
        return Ok((vec![], offset));
    }

    use std::io::{BufRead, BufReader, Seek, SeekFrom};
    file.seek(SeekFrom::Start(offset))?;
    let mut reader = BufReader::new(file);
    let mut lines = Vec::new();
    let mut new_offset = offset;

    loop {
        let mut line = String::new();
        let n = reader.read_line(&mut line)?;
        if n == 0 {
            break;
        }
        new_offset += n as u64;
        let trimmed = line.trim_end_matches('\n').trim_end_matches('\r');
        if !trimmed.is_empty() {
            lines.push(trimmed.to_string());
        }
    }

    Ok((lines, new_offset))
}

fn cursor_path(file_path: &str) -> std::path::PathBuf {
    let safe = file_path.replace(['/', '\\', ':'], "_");
    cursor_dir().join(format!("{safe}.cursor"))
}

pub fn read_cursor(file_path: &str) -> u64 {
    let path = cursor_path(file_path);
    fs::read_to_string(path)
        .ok()
        .and_then(|s| s.trim().parse().ok())
        .unwrap_or(0)
}

pub fn write_cursor(file_path: &str, offset: u64) -> std::io::Result<()> {
    let path = cursor_path(file_path);
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    fs::write(path, offset.to_string())
}

pub fn session_id_from_path(path: &str) -> String {
    Path::new(path)
        .file_stem()
        .and_then(|s| s.to_str())
        .unwrap_or("unknown")
        .to_string()
}
```

Add `mod watcher;` to `lib.rs`.

- [ ] **Step 4: Run tests to verify they pass**

```bash
cargo test watcher -- --nocapture
```

Expected: PASS (3 tests)

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/watcher.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): watcher — file tailing and cursor management"
```

---

## Task 7: Agent state + AppState

**Files:**
- Create: `tauri/src-tauri/src/state.rs`

- [ ] **Step 1: Write `tauri/src-tauri/src/state.rs`**

No separate tests needed — state is a data structure, logic is tested in agent.rs integration. Write it directly:

```rust
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
```

Add `mod state;` to `lib.rs`.

- [ ] **Step 2: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/state.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): AgentState enum + SharedState type"
```

---

## Task 8: Agent orchestration

**Files:**
- Create: `tauri/src-tauri/src/agent.rs`

- [ ] **Step 1: Write `tauri/src-tauri/src/agent.rs`**

```rust
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
    collections::HashMap,
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

/// Spawn the agent as a background tokio task.
/// Returns an AgentHandle for pause/resume/shutdown control.
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

async fn run_agent(shared: SharedState, paused: Arc<AtomicBool>, shutdown: Arc<AtomicBool>) {
    let config = match read_config() {
        Some(c) => c,
        None => {
            let mut s = shared.lock().unwrap();
            *s = AgentState::Unconfigured;
            return;
        }
    };

    let claude_dir = dirs::home_dir()
        .unwrap_or_default()
        .join(".claude")
        .join("projects");

    let (tx, mut rx) = mpsc::channel::<PathBuf>(256);
    let mut watcher = RecommendedWatcher::new(
        move |res: notify::Result<notify::Event>| {
            if let Ok(event) = res {
                for path in event.paths {
                    if path.extension().and_then(|e| e.to_str()) == Some("jsonl") {
                        tx.blocking_send(path).ok();
                    }
                }
            }
        },
        Config::default(),
    )
    .expect("watcher init failed");

    watcher
        .watch(&claude_dir, RecursiveMode::Recursive)
        .expect("watch failed");

    let mut pending: HashMap<String, IngestPayload> = HashMap::new();
    let mut timelines: HashMap<String, SessionTimeline> = HashMap::new();
    let mut closed_sessions: std::collections::HashSet<String> = Default::default();
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
                let Ok((lines, next_offset)) = read_new_lines(&path, offset) else { continue };
                if lines.is_empty() { continue }

                closed_sessions.remove(&session_id);
                let bucket = pending.entry(session_id.clone()).or_insert_with(|| IngestPayload {
                    session_id: session_id.clone(),
                    surface: config.surface.clone(),
                    project_key: None,
                    events: vec![],
                    session_end: None,
                });

                for line in &lines {
                    let Ok(raw) = serde_json::from_str::<serde_json::Value>(line) else { continue };
                    let events = parse_record(&raw, &session_id);
                    for event in events {
                        if let Ok(ts) = std::time::SystemTime::now().checked_add(Duration::ZERO).ok_or(()) {
                            record_event_timestamp(&mut timelines, &session_id, ts);
                        }
                        bucket.events.push(event);
                    }
                }
                write_cursor(&path_str, next_offset).ok();
                sessions_tracked += 1;
            }

            _ = flush_ticker.tick() => {
                if paused.load(Ordering::Relaxed) { continue; }
                let auth_failed = do_flush(
                    &config, &mut pending, &mut timelines, &mut closed_sessions,
                ).await;
                if auth_failed {
                    let mut s = shared.lock().unwrap();
                    *s = AgentState::AuthError { since_unix_ms: now_unix_ms() };
                    break;
                }
                let mut s = shared.lock().unwrap();
                *s = AgentState::Watching {
                    last_flush_unix_ms: now_unix_ms(),
                    sessions_tracked,
                };
            }
        }
    }
}

async fn do_flush(
    config: &HelperConfig,
    pending: &mut HashMap<String, IngestPayload>,
    timelines: &mut HashMap<String, SessionTimeline>,
    closed: &mut std::collections::HashSet<String>,
) -> bool {
    // Flush pending events
    let keys: Vec<String> = pending.keys().cloned().collect();
    for session_id in keys {
        let payload = pending.remove(&session_id).unwrap();
        if payload.events.is_empty() { continue; }
        let result = post_batch(&config.endpoint, &config.ingest_key, &payload).await;
        if result.auth_failed { return true; }
        if !result.ok { enqueue_payload(&payload).ok(); }
    }

    // Close idle sessions
    let now = std::time::SystemTime::now();
    for session_id in idle_session_ids(timelines, now) {
        if closed.contains(&session_id) { continue; }
        let Some(tl) = timelines.remove(&session_id) else { continue };
        let session_end = compute_session_end(&tl);
        let payload = IngestPayload {
            session_id: session_id.clone(),
            surface: config.surface.clone(),
            project_key: None,
            events: vec![],
            session_end: Some(session_end),
        };
        let result = post_batch(&config.endpoint, &config.ingest_key, &payload).await;
        if result.auth_failed { return true; }
        if !result.ok { enqueue_payload(&payload).ok(); }
        closed.insert(session_id);
    }

    // Replay offline queue
    let q = flush_queue(&config.endpoint, &config.ingest_key).await;
    q.auth_failed
}
```

Add `mod agent;` to `lib.rs`.

- [ ] **Step 2: Verify it compiles**

```bash
cd tauri/src-tauri
cargo check
```

Expected: No errors. Warnings about unused items are fine.

- [ ] **Step 3: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/agent.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): agent orchestration — watcher→parser→session→uploader"
```

---

## Task 9: Tauri commands (IPC bridge)

**Files:**
- Create: `tauri/src-tauri/src/commands.rs`

- [ ] **Step 1: Write `tauri/src-tauri/src/commands.rs`**

```rust
use crate::{
    config::{read_config, write_config, HelperConfig},
    state::{AgentState, SharedState},
};
use serde::Serialize;
use std::sync::atomic::Ordering;
use tauri::State;

#[derive(Serialize)]
pub struct AgentStatusResponse {
    pub state: AgentState,
    pub has_config: bool,
}

#[tauri::command]
pub async fn get_agent_status(shared: State<'_, SharedState>) -> Result<AgentStatusResponse, String> {
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
    let cfg = HelperConfig { endpoint, device_id, ingest_key, surface };
    write_config(&cfg).map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn set_paused(
    paused: bool,
    agent_paused: State<'_, std::sync::Arc<std::sync::atomic::AtomicBool>>,
    shared: State<'_, SharedState>,
) -> Result<(), String> {
    agent_paused.store(paused, Ordering::Relaxed);
    let mut s = shared.lock().map_err(|e| e.to_string())?;
    if paused {
        *s = AgentState::Paused;
    }
    Ok(())
}
```

Add `mod commands;` to `lib.rs`.

- [ ] **Step 2: Verify compiles**

```bash
cd tauri/src-tauri && cargo check
```

- [ ] **Step 3: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src-tauri/src/commands.rs tauri/src-tauri/src/lib.rs
git commit -m "feat(tauri): IPC commands — status, config, pause"
```

---

## Task 10: Main app entry — tray, plugins, windows

**Files:**
- Modify: `tauri/src-tauri/src/lib.rs` (replace stub with full implementation)
- Create: `tauri/src-tauri/icons/watching.png`, `tauri/src-tauri/icons/paused.png`, `tauri/src-tauri/icons/warn.png`

- [ ] **Step 1: Create placeholder tray icons**

Download or create three 32×32 PNG icons. Quickest for dev: copy any PNG three times and rename. Real icons can be swapped in later.

```bash
# From the tauri/ directory, use any small PNG as placeholder
cp src-tauri/icons/icon.png src-tauri/icons/watching.png
cp src-tauri/icons/icon.png src-tauri/icons/paused.png
cp src-tauri/icons/icon.png src-tauri/icons/warn.png
```

- [ ] **Step 2: Write full `tauri/src-tauri/src/lib.rs`**

```rust
mod agent;
mod commands;
mod config;
mod parser;
mod session;
mod state;
mod uploader;
mod watcher;

use agent::spawn_agent;
use commands::{get_agent_status, get_config, save_config, set_paused};
use state::{new_shared_state, SharedState};
use std::sync::{atomic::AtomicBool, Arc};
use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, WindowEvent,
};

pub fn run() {
    let shared = new_shared_state();
    let paused_flag = Arc::new(AtomicBool::new(false));

    tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_autostart::init(
            tauri_plugin_autostart::MacosLauncher::LaunchAgent,
            Some(vec![]),
        ))
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_shell::init())
        .manage(shared.clone())
        .manage(paused_flag.clone())
        .invoke_handler(tauri::generate_handler![
            get_agent_status,
            get_config,
            save_config,
            set_paused,
        ])
        .setup(move |app| {
            // Build tray
            let quit = MenuItem::with_id(app, "quit", "Quit", true, None::<&str>)?;
            let settings = MenuItem::with_id(app, "settings", "Settings", true, None::<&str>)?;
            let toggle = MenuItem::with_id(app, "toggle", "Pause", true, None::<&str>)?;
            let dashboard = MenuItem::with_id(app, "dashboard", "Open Dashboard", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&settings, &toggle, &dashboard, &quit])?;

            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .tooltip("Claude's Receipts")
                .menu(&menu)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => app.exit(0),
                    "settings" => {
                        if let Some(w) = app.get_webview_window("settings") {
                            w.show().ok();
                            w.set_focus().ok();
                        }
                    }
                    "dashboard" => {
                        let _ = tauri_plugin_shell::ShellExt::shell(app)
                            .open("https://claudes-receipts.netlify.app", None);
                    }
                    "toggle" => {
                        // Handled via IPC from frontend
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(w) = app.get_webview_window("status") {
                            if w.is_visible().unwrap_or(false) {
                                w.hide().ok();
                            } else {
                                w.show().ok();
                                w.set_focus().ok();
                            }
                        }
                    }
                })
                .build(app)?;

            // Deep link handler
            use tauri_plugin_deep_link::DeepLinkExt;
            app.deep_link().on_open_url(|event| {
                for url in event.urls() {
                    handle_deep_link(url.as_str());
                }
            });

            // Hide status popup on focus loss
            if let Some(status_win) = app.get_webview_window("status") {
                let win = status_win.clone();
                status_win.on_window_event(move |event| {
                    if let WindowEvent::Focused(false) = event {
                        win.hide().ok();
                    }
                });
            }

            // Open settings if unconfigured
            if config::read_config().is_none() {
                if let Some(w) = app.get_webview_window("settings") {
                    w.show().ok();
                }
            }

            // Spawn agent
            spawn_agent(shared.clone());

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn handle_deep_link(url: &str) {
    // Parse claudes-receipts://auth?device-id=X&ingest-key=Y&endpoint=Z
    if !url.starts_with("claudes-receipts://auth") {
        return;
    }
    let query = url.split('?').nth(1).unwrap_or("");
    let params: std::collections::HashMap<&str, &str> = query
        .split('&')
        .filter_map(|pair| {
            let mut parts = pair.splitn(2, '=');
            Some((parts.next()?, parts.next()?))
        })
        .collect();

    let Some(device_id) = params.get("device-id") else { return };
    let Some(ingest_key) = params.get("ingest-key") else { return };
    let endpoint = params.get("endpoint").copied().unwrap_or("https://claudes-receipts.netlify.app");

    let cfg = config::HelperConfig {
        endpoint: urlencoding_decode(endpoint),
        device_id: urlencoding_decode(device_id),
        ingest_key: urlencoding_decode(ingest_key),
        surface: "desktop".into(),
    };
    config::write_config(&cfg).ok();
}

fn urlencoding_decode(s: &str) -> String {
    s.replace("%3A", ":").replace("%2F", "/").replace("+", " ")
}
```

- [ ] **Step 3: Verify compiles**

```bash
cd tauri/src-tauri && cargo check
```

Expected: No errors. Address any import mismatches.

- [ ] **Step 4: Run the app in dev mode**

```bash
cd tauri
npm run tauri dev
```

Expected: App launches, tray icon visible in system tray. Left-click shows empty status popup window. Right-click shows menu. No panics.

- [ ] **Step 5: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/
git commit -m "feat(tauri): main app — tray, plugins, window management, deep link handler"
```

---

## Task 11: React webview scaffold

**Files:**
- Create: `tauri/src/main.tsx`
- Create: `tauri/src/App.tsx`
- Create: `tauri/src/lib/tauri.ts`
- Create: `tauri/src/lib/types.ts`
- Create: `tauri/tailwind.config.ts`

- [ ] **Step 1: Write `tauri/src/lib/types.ts`**

```typescript
export type AgentState =
  | { status: "unconfigured" }
  | { status: "watching"; last_flush_unix_ms: number; sessions_tracked: number }
  | { status: "paused" }
  | { status: "auth_error"; since_unix_ms: number };

export type AgentStatusResponse = {
  state: AgentState;
  has_config: boolean;
};

export type HelperConfig = {
  endpoint: string;
  device_id: string;
  ingest_key: string;
  surface: string;
};
```

- [ ] **Step 2: Write `tauri/src/lib/tauri.ts`**

```typescript
import { invoke } from "@tauri-apps/api/core";
import type { AgentStatusResponse, HelperConfig } from "./types";

export const getAgentStatus = () =>
  invoke<AgentStatusResponse>("get_agent_status");

export const getConfig = () =>
  invoke<HelperConfig | null>("get_config");

export const saveConfig = (cfg: HelperConfig) =>
  invoke<void>("save_config", {
    endpoint: cfg.endpoint,
    deviceId: cfg.device_id,
    ingestKey: cfg.ingest_key,
    surface: cfg.surface,
  });

export const setPaused = (paused: boolean) =>
  invoke<void>("set_paused", { paused });
```

- [ ] **Step 3: Write `tauri/src/main.tsx`**

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 4: Write `tauri/src/App.tsx`**

```typescript
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import StatusPopup from "./components/StatusPopup";
import SettingsWindow from "./components/SettingsWindow";

export default function App() {
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    getCurrentWindow().then((w) => setLabel(w.label));
  }, []);

  if (label === "status") return <StatusPopup />;
  if (label === "settings") return <SettingsWindow />;
  return null;
}
```

- [ ] **Step 5: Create `tauri/src/index.css`**

```css
@import "tailwindcss";

:root {
  --background: #070707;
  --foreground: #ede5d9;
  --muted: #a99d8d;
  --panel: rgba(26, 24, 20, 0.96);
  --stroke: rgba(233, 222, 205, 0.12);
  --accent: #cbb58a;
}

body {
  margin: 0;
  background: var(--background);
  color: var(--foreground);
  font-family: ui-sans-serif, system-ui, sans-serif;
  -webkit-user-select: none;
  user-select: none;
}
```

- [ ] **Step 6: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src/
git commit -m "feat(tauri): React webview scaffold — types, IPC wrappers, App router"
```

---

## Task 12: StatusPopup component

**Files:**
- Create: `tauri/src/components/StatusPopup.tsx`

- [ ] **Step 1: Write `tauri/src/components/StatusPopup.tsx`**

```tsx
import { openUrl } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";
import { getAgentStatus, setPaused } from "../lib/tauri";
import type { AgentState, AgentStatusResponse } from "../lib/types";

function formatTimestamp(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StateBadge({ state }: { state: AgentState }) {
  const map: Record<string, { label: string; color: string }> = {
    watching: { label: "Active", color: "#8ea783" },
    paused: { label: "Paused", color: "#a99d8d" },
    auth_error: { label: "Auth Error", color: "#d17c64" },
    unconfigured: { label: "Not Configured", color: "#d17c64" },
  };
  const { label, color } = map[state.status] ?? { label: state.status, color: "#a99d8d" };
  return (
    <span style={{ color }} className="font-mono text-xs tracking-widest uppercase">
      {label}
    </span>
  );
}

export default function StatusPopup() {
  const [data, setData] = useState<AgentStatusResponse | null>(null);
  const [paused, setPausedLocal] = useState(false);

  useEffect(() => {
    const load = async () => {
      const status = await getAgentStatus();
      setData(status);
      setPausedLocal(status.state.status === "paused");
    };
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePause = async () => {
    const next = !paused;
    await setPaused(next);
    setPausedLocal(next);
    const status = await getAgentStatus();
    setData(status);
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b" style={{ borderColor: "var(--stroke)" }}>
        <span className="font-semibold text-sm tracking-wide">Claude's Receipts</span>
        {data && <StateBadge state={data.state} />}
      </div>

      {/* Body */}
      <div className="flex-1 px-4 py-3 flex flex-col gap-2">
        {data?.state.status === "watching" && (
          <>
            <Row label="Last flush" value={formatTimestamp(data.state.last_flush_unix_ms)} />
            <Row label="Sessions this run" value={String(data.state.sessions_tracked)} />
          </>
        )}
        {data?.state.status === "auth_error" && (
          <p className="text-xs" style={{ color: "#d17c64" }}>
            Credential failure. Open Settings to re-pair.
          </p>
        )}
        {data?.state.status === "unconfigured" && (
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Not configured. Open Settings to pair a device.
          </p>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 px-4 pb-4 pt-2 border-t" style={{ borderColor: "var(--stroke)" }}>
        <button
          onClick={handleTogglePause}
          className="text-xs font-mono uppercase tracking-widest px-3 py-1 border"
          style={{ borderColor: "var(--stroke)", color: "var(--muted)", background: "transparent", cursor: "pointer" }}
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={() => openUrl("https://claudes-receipts.netlify.app")}
          className="text-xs font-mono uppercase tracking-widest px-3 py-1 border ml-auto"
          style={{ borderColor: "rgba(203,181,138,0.4)", color: "var(--accent)", background: "transparent", cursor: "pointer" }}
        >
          Dashboard →
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-xs font-mono tracking-wide" style={{ color: "var(--muted)" }}>{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
```

- [ ] **Step 2: Start dev mode and verify popup renders**

```bash
cd tauri && npm run tauri dev
```

Left-click the tray icon. Status popup should appear with agent state, last flush time, sessions count, Pause button, Dashboard button.

- [ ] **Step 3: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src/components/StatusPopup.tsx
git commit -m "feat(tauri): StatusPopup — tray left-click status surface"
```

---

## Task 13: SettingsWindow component

**Files:**
- Create: `tauri/src/components/SettingsWindow.tsx`

- [ ] **Step 1: Write `tauri/src/components/SettingsWindow.tsx`**

```tsx
import { enable, disable, isEnabled } from "@tauri-apps/plugin-autostart";
import { openUrl } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "../lib/tauri";
import type { HelperConfig } from "../lib/types";

const SURFACES = ["desktop", "ide", "terminal"] as const;

export default function SettingsWindow() {
  const [config, setConfig] = useState<HelperConfig>({
    endpoint: "https://claudes-receipts.netlify.app",
    device_id: "",
    ingest_key: "",
    surface: "desktop",
  });
  const [showKey, setShowKey] = useState(false);
  const [autostart, setAutostart] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getConfig().then((c) => { if (c) setConfig(c); });
    isEnabled().then(setAutostart);
  }, []);

  const handleSave = async () => {
    await saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAutostartToggle = async () => {
    if (autostart) { await disable(); setAutostart(false); }
    else { await enable(); setAutostart(true); }
  };

  const handleRepair = () => {
    openUrl(`${config.endpoint}/devices`);
  };

  return (
    <div className="flex flex-col h-full p-6 gap-5" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <h1 className="text-base font-semibold tracking-wide m-0">Settings</h1>

      {/* Connection */}
      <Section title="Connection">
        <Field label="Endpoint">
          <input
            type="url"
            value={config.endpoint}
            onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
            style={inputStyle}
          />
        </Field>
        <Field label="Device ID">
          <input type="text" value={config.device_id} readOnly style={{ ...inputStyle, opacity: 0.6 }} />
        </Field>
        <Field label="Ingest Key">
          <div className="flex gap-2">
            <input
              type={showKey ? "text" : "password"}
              value={config.ingest_key}
              readOnly
              style={{ ...inputStyle, flex: 1, opacity: 0.6 }}
            />
            <button onClick={() => setShowKey(!showKey)} style={ghostBtn}>
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <button onClick={handleRepair} style={accentBtn}>Re-pair Device</button>
      </Section>

      {/* Agent */}
      <Section title="Agent">
        <Field label="Surface">
          <select
            value={config.surface}
            onChange={(e) => setConfig({ ...config, surface: e.target.value })}
            style={inputStyle}
          >
            {SURFACES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </Section>

      {/* System */}
      <Section title="System">
        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "var(--muted)" }}>Start on login</span>
          <button onClick={handleAutostartToggle} style={autostart ? accentBtn : ghostBtn}>
            {autostart ? "On" : "Off"}
          </button>
        </div>
      </Section>

      <div className="mt-auto">
        <button onClick={handleSave} style={accentBtn}>
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-mono tracking-widest uppercase m-0" style={{ color: "var(--muted)" }}>{title}</p>
      <div className="flex flex-col gap-3 pl-0">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs" style={{ color: "var(--muted)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--stroke)",
  color: "var(--foreground)",
  padding: "0.45rem 0.65rem",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
};

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--stroke)",
  color: "var(--muted)",
  padding: "0.4rem 0.8rem",
  fontSize: "0.78rem",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const accentBtn: React.CSSProperties = {
  background: "rgba(203,181,138,0.1)",
  border: "1px solid rgba(203,181,138,0.4)",
  color: "var(--accent)",
  padding: "0.45rem 1rem",
  fontSize: "0.78rem",
  fontFamily: "monospace",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  cursor: "pointer",
};
```

- [ ] **Step 2: Verify in dev mode**

Open the Settings window from the tray right-click menu. Verify all three sections render, endpoint field is editable, surface dropdown works, Re-pair button opens the browser.

- [ ] **Step 3: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add tauri/src/components/SettingsWindow.tsx
git commit -m "feat(tauri): SettingsWindow — connection, agent, system sections"
```

---

## Task 14: Dashboard deep link button

**Files:**
- Modify: `src/app/devices/page.tsx`
- Modify: `src/app/api/devices/register/route.ts` (add deep link URL to response)

- [ ] **Step 1: Read the current devices page**

```bash
cat /c/dead-pixel-design/web-forge/personal/claudes-receipts/src/app/devices/page.tsx
```

- [ ] **Step 2: Read the device register route**

```bash
cat /c/dead-pixel-design/web-forge/personal/claudes-receipts/src/app/api/devices/register/route.ts
```

- [ ] **Step 3: Add `deep_link_url` to the register API response**

In `src/app/api/devices/register/route.ts`, after inserting the device, construct and return the deep link URL:

```typescript
const deepLinkUrl = `claudes-receipts://auth?device-id=${encodeURIComponent(deviceId)}&ingest-key=${encodeURIComponent(rawKey)}&endpoint=${encodeURIComponent(process.env.NEXTAUTH_URL ?? "https://claudes-receipts.netlify.app")}`;

return NextResponse.json({
  deviceId,
  ingestKey: rawKey,
  deepLinkUrl,
});
```

- [ ] **Step 4: Add "Open in App" button to devices page**

In `src/app/devices/page.tsx`, after a successful registration (the client component that handles the form submit), show the deep link:

Find the component that handles the POST to `/api/devices/register`. After receiving the response with `deepLinkUrl`, display:

```tsx
{registrationResult && (
  <div className="section-frame section-frame-soft stack-sm mt-4">
    <p className="subtle-kicker">Device registered</p>
    <p className="copy-muted">Click below to open Claude's Receipts and complete pairing automatically.</p>
    <a href={registrationResult.deepLinkUrl} className="cta-primary" style={{ display: "inline-block" }}>
      Open in App
    </a>
    <p className="copy-muted" style={{ fontSize: "0.78rem" }}>
      Or copy your credentials manually: device ID <code>{registrationResult.deviceId}</code>
    </p>
  </div>
)}
```

- [ ] **Step 5: Build to verify no TypeScript errors**

```bash
npx netlify dev:exec -- npm run build
```

Expected: Clean build.

- [ ] **Step 6: Commit**

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add src/app/devices/ src/app/api/devices/
git commit -m "feat(dashboard): deep link pairing — Open in App on device registration"
```

---

## Task 15: End-to-end pairing flow test

Manual verification — no automated test for native deep links.

- [ ] **Step 1: Build the Tauri app**

```bash
cd tauri && npm run tauri build
```

Expected: NSIS installer at `tauri/src-tauri/target/release/bundle/nsis/`

- [ ] **Step 2: Install it**

Run the NSIS installer. Verify:
- App appears in system tray on launch
- `claudes-receipts://` URL scheme is registered (check `HKEY_CLASSES_ROOT\claudes-receipts` in regedit)
- Start-on-login entry added to registry under `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run`

- [ ] **Step 3: Test pairing flow**

1. Sign in to https://claudes-receipts.netlify.app
2. Navigate to Devices
3. Register a new device
4. Click "Open in App"
5. Verify: Windows routes the deep link to the app, tray icon transitions to "Active", Settings window shows populated device ID and key

- [ ] **Step 4: Test agent functionality**

1. Start Claude Code on any project
2. Wait 30–60 seconds
3. Open the dashboard and verify sessions appearing

- [ ] **Step 5: Commit HANDOFF.md update**

Update `HANDOFF.md` to reflect Tauri shell completion and document the new `tauri/` directory.

```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
git add HANDOFF.md
git commit -m "docs(claudes-receipts): session handoff — Tauri shell complete"
```

---

## Self-Review

**Spec coverage:**
- ✅ Tauri v2 + Rust core (no sidecar) — Tasks 1–10
- ✅ Config at `%APPDATA%\claudes-receipts\config.json` — Task 2
- ✅ JSONL parser matching Node parity — Task 3
- ✅ Session idle timeout + session_ended — Task 4
- ✅ reqwest HTTP + offline queue — Task 5
- ✅ notify file watcher + cursor management — Task 6
- ✅ AgentState enum: Unconfigured/Watching/Paused/AuthError — Task 7
- ✅ Tray: left-click popup, right-click menu — Task 10
- ✅ Status popup: state badge, last flush, sessions, pause/resume, dashboard link — Task 12
- ✅ Settings: endpoint, device ID, ingest key, surface, autostart — Task 13
- ✅ Deep link `claudes-receipts://auth` — Tasks 10 + 14
- ✅ `tauri-plugin-autostart` — Task 10 + 13
- ✅ Dashboard "Open in App" button — Task 14
- ✅ Auth failure handling: AgentState::AuthError, agent exits, queue preserved — Task 8
- ✅ Windows-only target in `tauri.conf.json` — Task 1

**Placeholder scan:** Clean. No TBDs.

**Type consistency:** `HelperConfig` fields match between `config.rs` (snake_case) and `tauri.ts` (camelCase conversion in invoke args). `AgentState` Rust enum tags match TypeScript union discriminants.
