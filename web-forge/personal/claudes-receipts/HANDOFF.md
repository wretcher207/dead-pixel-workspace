# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts`
**Last session ended:** 2026-04-13 (morning)
**Status:** Tauri shell Rust + React code complete. `claudes-receipts.exe` builds cleanly. NSIS installer bundling blocked. Dashboard live at https://claudes-receipts.netlify.app with new deep-link pairing button.

---

## What's new since last handoff

### Dashboard (Next.js 16 site)
- **Homepage redesign.** Deployed. 4-section structure per David's spec: hero 60/40 grid, 3-panel intelligence row, 2-card signals, full-width session strip. Removed the full-viewport video hero. All new layout classes (`.span-4`, `.span-6`, `.home-hero*`, `.intel-card*`, `.signal-card*`, `.session-strip*`) added to `globals.css`.
- **GitHub OAuth unblocked.** `NEXTAUTH_URL` set on Netlify production. David added the callback URL to the GitHub OAuth app. Sign-in works.
- **Deep-link device registration.** `/api/devices/register` now returns `deepLinkUrl` (`claudes-receipts://auth?device-id=X&ingest-key=Y&endpoint=Z`). New `/devices` page embeds a `<DeviceRegister />` client component with a nickname/platform form and an "Open in App" button on success.

### Tauri shell (`tauri/`)

Windows desktop app that will replace the Node helper. Tauri v2 + Rust backend + React webview. 14 commits on the branch.

**Rust modules (`tauri/src-tauri/src/`):**
| File | Responsibility | Tests |
| --- | --- | --- |
| `config.rs` | `HelperConfig` serde struct, `%APPDATA%\claudes-receipts\config.json` | 1 |
| `parser.rs` | JSONL record → `IngestEvent` struct | 4 |
| `session.rs` | `SessionTimeline`, idle timeout (15 min), `SessionEndMetadata` matching API schema (seconds + ISO-8601) | 4 |
| `uploader.rs` | `IngestPayload` (camelCase on wire), `post_batch`, offline `queue.jsonl`, `flush_queue` | 2 |
| `watcher.rs` | `read_new_lines` (cursor-aware tail), `read_cursor`/`write_cursor`, `session_id_from_path` | 3 |
| `state.rs` | `AgentState` enum (Unconfigured/Watching/Paused/AuthError), `SharedState = Arc<Mutex<AgentState>>` | — |
| `agent.rs` | Async tokio task orchestrating watcher → parser → session → uploader. 15s flush ticker, auth failure exits agent with state update | — |
| `commands.rs` | `#[tauri::command]` IPC: `get_agent_status`, `get_config`, `save_config`, `set_paused` | — |
| `lib.rs` | App entry: 4 plugins (deep-link, autostart, notification, shell), tray with menu + left-click popup, deep-link URL parser, agent spawn | — |

Total tests: **14 passing** (run with `cargo test -- --test-threads=1` to avoid APPDATA env-var races; `#[serial]`-tagged tests cover most but not `config::round_trips_config`).

**React webview (`tauri/src/`):**
- `lib/types.ts` — `AgentState` discriminated union matching Rust serde output
- `lib/tauri.ts` — typed `invoke()` wrappers
- `App.tsx` — routes to `StatusPopup` or `SettingsWindow` by window label
- `components/StatusPopup.tsx` — tray left-click popup. Polls `get_agent_status` every 5s, renders state badge, last flush, sessions count, pause/resume, dashboard link. Closes on focus loss (handled in Rust `on_window_event`).
- `components/SettingsWindow.tsx` — 3 sections: Connection (endpoint editable, device ID + ingest key read-only, Re-pair button opens `/devices`), Agent (surface dropdown), System (start-on-login toggle via `tauri-plugin-autostart`).

**Icons:** Three placeholder PNGs in `src-tauri/icons/` (`watching.png`, `paused.png`, `warn.png`). All currently byte-identical 83-byte transparent squares. Real art swap is trivial — no code changes needed.

---

## Current blockers

### 1. NSIS bundler broken (blocks installer)
`cargo tauri build` compiles `claudes-receipts.exe` cleanly (14 MB, at `tauri/src-tauri/target/release/claudes-receipts.exe`) but the NSIS step fails:

```
!insertmacro: macro "NSISCOMCALL" requires 4 parameter(s), passed 7!
Error in macro IsShortcutTarget on macroline 11
Error in script "...installer.nsi" on line 757
```

This is a Tauri 2.10.3 / NSIS 3.11 compatibility issue, not our code. Tauri downloads its own NSIS toolchain (`github.com/tauri-apps/binary-releases`), so it's reproducible across machines.

**Likely fixes, in order of effort:**
1. Switch `tauri.conf.json` → `bundle.targets` from `["nsis"]` to `["msi"]`. MSI uses WiX instead of NSIS. Simpler but larger installer.
2. Pin an older Tauri CLI version (`cargo install tauri-cli --version "=2.9.x"`) if 2.9 shipped with working NSIS.
3. Wait for Tauri upstream fix (check issues on tauri-apps/tauri for "NSISCOMCALL").

Until then, the raw `.exe` can be run directly — just not installed.

### 2. Session-end-only ingest payloads get 400
Agent's idle-session detection posts `{events: [], session_end: {...}}` when a session crosses 15 min idle. The `/api/ingest` zod schema has `events: z.array(ingestEventSchema).min(1)` which rejects empty arrays.

**Effect:** Session-end payloads fail on first send, land in offline queue, fail again on retry. Event telemetry still lands on the NEXT flush with real events, but "session_ended" metadata never posts.

**Fix (choose one):**
- Dashboard: relax schema to `events.min(0)` when `session_end` is present.
- Agent: synthesize a `session_ended` event in the events array so `events.min(1)` passes.

### 3. `sessions_tracked` counter has dead branch
Cosmetic. The first `if saw_events && !timelines.contains_key(...)` branch in `agent.rs` never fires because `record_event_timestamp` inserts the key before the check. The fallback branch produces correct behavior. Clean up during next pass.

### 4. Test isolation flaky without `--test-threads=1`
`config::round_trips_config` isn't `#[serial]`-tagged and races with 5 other APPDATA-mutating tests. `cargo test` may intermittently fail. Fix: add `#[serial]` to that one test, or configure single-thread in `.cargo/config.toml`.

---

## How to run locally

**Dashboard:**
```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
netlify dev:exec -- npm run dev
```

**Tauri dev mode (opens both windows + tray):**
```bash
export PATH="$USERPROFILE/.cargo/bin:$PATH"
cd tauri
cargo tauri dev
```

**Tauri release build:**
```bash
export PATH="$USERPROFILE/.cargo/bin:$PATH"
cd tauri
cargo tauri build
# Raw exe produced at: tauri/src-tauri/target/release/claudes-receipts.exe
# NSIS step currently fails — see Blocker #1.
```

**Run tests:**
```bash
export PATH="$USERPROFILE/.cargo/bin:$PATH"
cd tauri/src-tauri
cargo test -- --test-threads=1
```

---

## Commit trail (Tauri work)

```
a8cc8ac + 0a5b0cb   dashboard: deep link pairing + homepage redesign committed
ef6179b             SettingsWindow — connection, agent, system sections
89223da             StatusPopup — tray left-click status surface
fa046e0             React webview scaffold — types, IPC wrappers, App router
b7104cd             main app — tray, plugins, window management, deep link handler
b008f68             IPC commands — status, config, pause
d551717             agent orchestration — watcher→parser→session→uploader
59e5ed9             AgentState enum + SharedState type
bd99a79             watcher — file tailing and cursor management
0d15991             uploader — HTTP ingest + offline queue
851d1ad             fix: session metadata matches ingest API schema
95ee2f7             session tracker — idle timeout and end metadata
70d8aa4             JSONL parser — IngestEvent extraction
f085b69             config module — read/write HelperConfig
e5e8397             scaffold Tauri v2 project
```

---

## Next session — suggested pickup

**Critical path to a shipping app:**
1. Run `claudes-receipts.exe` directly (from target/release) and verify the tray icon appears. If it works, the code is good and blocker #1 is purely packaging.
2. Fix blocker #1 (NSIS → try MSI first). Swap `bundle.targets` in `tauri.conf.json`.
3. Fix blocker #2 (ingest schema or synthetic event).
4. Run the full pairing flow manually: sign in → register device on `/devices` → click "Open in App" → verify config written → start Claude Code session → verify it appears in dashboard.
5. Swap placeholder icons for real art (3 PNGs at `tauri/src-tauri/icons/`).

**Polish:**
6. Clean up dead-code warnings (unused `AgentHandle.paused/shutdown`, unused `tray_tooltip/tray_icon` methods — these want to be wired to actually update the tray icon on state change).
7. Remove the legacy Node helper at `helper/` once Tauri is in production.
8. Add `--test-threads=1` to `.cargo/config.toml` or fix the `round_trips_config` test.
9. Browser extension (PRD §11.4 — still just a stub).

---

## Key files to open first next session

- `tauri/src-tauri/src/lib.rs` — app entry, tray, plugin registration
- `tauri/src-tauri/src/agent.rs` — async task, the most complex integration
- `tauri/src-tauri/tauri.conf.json` — switch bundle.targets to `["msi"]` to work around NSIS
- `src/app/api/ingest/route.ts` — relax `events.min(1)` for session-end payloads
- `docs/superpowers/specs/2026-04-12-tauri-shell-design.md` — design spec
- `docs/superpowers/plans/2026-04-12-tauri-shell.md` — implementation plan (all 15 tasks done)
