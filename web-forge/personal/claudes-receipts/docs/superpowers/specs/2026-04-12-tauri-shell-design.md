# Claude's Receipts — Tauri Shell Design

**Date:** 2026-04-12
**Branch:** `feat/claudes-receipts`
**Status:** Approved, ready for implementation planning

---

## Overview

A Tauri v2 desktop app for Windows that replaces the Node CLI helper entirely. The Rust backend handles all agent logic — file watching, session tracking, HTTP ingest, offline queue. The Tauri webview hosts two UI surfaces: a system tray status popup and a settings window. Deep link pairing connects the app to the live dashboard without manual credential entry.

---

## Architecture

### Repo location

`tauri/` at the root of `claudes-receipts/`. Separate from the Next.js app and the legacy Node helper.

### Process model

One Tauri process. The Rust backend spawns a single `tokio` task for the agent loop. A shared `Arc<Mutex<AgentState>>` bridges the agent task and Tauri commands, keeping the webview current on agent status without polling.

### Node helper fate

The `helper/` directory is kept as a reference but not shipped. All production logic moves to Rust. No sidecar. No Node runtime bundled.

---

## Rust Core — Port Map

| Node module | Rust equivalent |
|---|---|
| `chokidar` file watcher | `notify` crate (async) |
| `fs` cursor read/write | `std::fs` + `serde_json` |
| `parse.ts` JSONL parser | `serde`-derived structs |
| `session-tracker.ts` | `HashMap<String, SessionTimeline>` + idle timer |
| `uploader.ts` HTTP | `reqwest` (async, with retry logic) |
| `config.ts` | `serde_json` + `dirs` crate for platform paths |
| `queue.jsonl` offline queue | Same file contract, Rust I/O |

Config path: `%APPDATA%\claudes-receipts\config.json`
Cursors path: `%APPDATA%\claudes-receipts\cursors\`
Queue path: `%APPDATA%\claudes-receipts\queue.jsonl`

---

## Agent State Machine

```
Unconfigured → (deep link received) → Watching
Watching     → (15s flush tick)     → Watching
Watching     → (401 from ingest)    → AuthError
Watching     → (user pauses)        → Paused
Paused       → (user resumes)       → Watching
AuthError    → (re-pair complete)   → Watching
```

`AgentState` enum:
```rust
enum AgentState {
    Unconfigured,
    Watching { last_flush: SystemTime, sessions_tracked: usize },
    Paused,
    AuthError { since: SystemTime },
}
```

---

## System Tray

### Icon states

| State | Icon | Tooltip |
|---|---|---|
| `Watching` | Solid | "Claude's Receipts — Active" |
| `Paused` | Dimmed | "Claude's Receipts — Paused" |
| `AuthError` | Warning | "Claude's Receipts — Credential failure" |
| `Unconfigured` | Warning | "Claude's Receipts — Not configured" |

### Left-click: Status popup

Frameless window, ~320×220px, anchors near the tray. Closes on focus-loss.

Contents:
- Agent state badge
- Last flush timestamp
- Sessions tracked this run
- "Open Dashboard" button (opens `https://claudes-receipts.netlify.app` in browser)

### Right-click: Context menu

- Settings
- Pause / Resume (toggles)
- Open Dashboard
- Quit

---

## Settings Window

Standard window, ~520×420px. Three sections:

### Connection
- Endpoint URL (editable text field)
- Device ID (read-only)
- Ingest key (masked, reveal toggle)
- "Re-pair Device" button — triggers the deep link pairing flow

### Agent
- Surface label dropdown: Desktop / IDE / Terminal
- Flush interval: 15s / 30s / 60s (select)

### System
- Start on login toggle (`tauri-plugin-autostart`, default: enabled)

---

## Deep Link Pairing Flow

### URL scheme
`claudes-receipts://auth?device-id=<id>&ingest-key=<key>&endpoint=<url>`

Registered on Windows via `tauri-plugin-deep-link` at install time.

### Flow

1. User clicks "Re-pair Device" in Settings (or launches app unconfigured)
2. App opens `https://claudes-receipts.netlify.app/devices` in the default browser
3. User registers a device on the dashboard
4. Dashboard shows "Open in App" button on the success screen
5. Clicking it navigates to the `claudes-receipts://auth?...` deep link
6. Windows routes the deep link to the running Tauri app (or launches it)
7. App intercepts via `tauri-plugin-deep-link`, writes config, restarts agent task
8. Tray icon transitions to `Watching`, OS notification confirms pairing

### Dashboard changes required

- Device registration success screen: add "Open in App" button that emits the deep link URL with `device-id`, `ingest-key`, and `endpoint` as query params
- No other dashboard changes needed

---

## Data Flow

### File watching → ingest

1. `notify` watches `~/.claude/projects/**/*.jsonl`
2. On `create` or `modify`: read new lines past stored cursor offset
3. Parse each line into typed events using `serde` structs — same event taxonomy as today (`prompt_submitted`, `api_request_completed`, `tool_completed`, `api_error`)
4. Stage parsed events in an in-memory buffer (`HashMap<String, Vec<IngestEvent>>`)
5. `tokio::time::interval` at the configured flush interval drains buffer → POST to `/api/ingest`
6. Cursor offset written after successful post

### Session end detection

Per-session idle timeout tracked in `HashMap<String, SessionTimeline>`. On each flush tick, sessions with no new events for 15 minutes receive a synthetic `session_ended` event posted with computed duration and active-time metadata.

### Offline queue

Failed POSTs are appended to `queue.jsonl`. On the next flush tick, queue is replayed before new events are posted. Auth failures (401) are not queued — they halt the agent (queue preserved for re-upload after re-pair).

---

## Error Handling

| Error | Behavior |
|---|---|
| Network failure | Append to offline queue, continue |
| 401 Unauthorized | Set `AgentState::AuthError`, update tray icon, fire OS notification, agent task exits (queue preserved) |
| JSONL parse error | Log line and skip, never crash |
| Watcher error | Log, `notify` attempts reconnect |
| Config missing on start | Open Settings window automatically |

---

## Plugins

| Plugin | Purpose |
|---|---|
| `tauri-plugin-deep-link` | Register `claudes-receipts://` URL scheme, receive auth callbacks |
| `tauri-plugin-autostart` | Start-on-login registry entry |
| `tauri-plugin-notification` | OS notification on auth failure + pair success |
| `tauri-plugin-shell` | Open URLs in default browser |

---

## Installer

Tauri's built-in NSIS bundler produces a single `.exe` installer. Registers the URL scheme during install. No external runtime required.

---

## Webview UI Stack

- **Bundler:** Vite
- **Framework:** React (consistent with other projects in the workspace)
- **Styling:** Tailwind v4 — uses the same design tokens as the dashboard (`--accent`, `--muted`, etc.) so the app feels like a native extension of the web product

---

## Out of Scope (v1)

- macOS / Linux support
- Browser extension
- In-app log viewer
- Manual session tagging
- Metrics visible inside the Tauri app (use the dashboard for that)
