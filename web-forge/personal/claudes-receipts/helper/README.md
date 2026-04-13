# Claude's Receipts — Helper Agent

Headless Node daemon. Tails Claude Code JSONL transcripts under
`~/.claude/projects/` and posts metadata-only events to the
dashboard's `/api/ingest` endpoint.

This is the v1 helper. A Tauri-shelled version with a settings UI and
system-tray controls lands later; for now the agent runs as a
background process you start with npm or a Windows Scheduled Task.

## What it reads

Claude Code writes one JSONL file per session under
`~/.claude/projects/<project-slug>/<session-id>.jsonl`. Each line is a
JSON record. The helper extracts:

- `queue-operation` with `operation: "enqueue"` → `prompt_submitted`
- `type: "assistant"` with `message.usage` → `api_request_completed`
  plus token/cost metadata
- `tool_use` content blocks in assistant messages → `tool_completed`
- `tool_result` blocks where `is_error: true` → `api_error`

No prompt content, code, or tool payloads are read or forwarded.

## Setup

```bash
cd helper
npm install
```

Register the device against the dashboard. Mint a device + ingest key
by hitting `POST /api/devices/register` while signed in, then:

```bash
npm run register -- \
  --endpoint https://your-dashboard \
  --device-id <uuid> \
  --ingest-key <key>
```

Configuration lands in `%APPDATA%/claudes-receipts/config.json` on
Windows or `~/.config/claudes-receipts/config.json` elsewhere, with
permissions `0600`.

## Run

```bash
npm run dev     # tsx, with file watching
npm run build   # tsc -> dist/
npm start       # node dist/cli.js run
```

## Offline recovery

Failed uploads are appended to
`<configDir>/cursors/queue.jsonl`. On the next flush tick, the queue
is replayed before new events are posted.

## Cursor state

Per-file byte offsets live in `<configDir>/cursors/*.cursor.json` so
the agent resumes exactly where it stopped on restart and never
double-sends a line.

## Next

- native Windows service / Linux systemd unit
- Tauri shell with settings UI, system tray, and pairing flow
- richer event extraction (accepted/rejected decisions, per-tool
  timing)
