# Helper App Foundation

The local helper app is the canonical source of truth for Claude's Receipts.

Initial responsibilities:

- register a device to a user account
- store a revocable per-device ingest credential
- watch the local Claude Code telemetry source
- normalize metadata-only events
- batch and retry uploads
- persist an offline queue for recovery

Suggested implementation order:

1. Tauri shell with a minimal settings screen
2. background worker that writes an encrypted or protected queue
3. ingest adapter that emits metadata-only session events
4. secure upload client against `POST /api/ingest`
