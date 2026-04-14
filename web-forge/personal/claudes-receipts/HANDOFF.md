# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts`
**Last session ended:** 2026-04-13 (late afternoon)
**Status:** Realtime analytics fully live on prod. Dashboard shows live pulse, context window, token burn, agent deployments, and idle skeleton. All three stacked bugs (compare-query SQL, chokidar on Windows, ingest auto-closing sessions) resolved. Polling tail replaces chokidar.

---

## What happened this session

### Realtime analytics dashboard shipped
- **New** `src/app/api/realtime/route.ts` — single GET returning active session + 60s/5m/1h pulse + context window + token sparkline + live event feed. 8 queries in parallel, ~8KB payload, ~200ms.
- **New** `src/components/realtime-pulse.tsx` — polls every 4s, in-place updates.
- **Rewrote** `src/app/page.tsx` — realtime panel as centerpiece, time-window grid (today/7d/lifetime), breakdowns (top projects 7d, agent deployments 7d), recent sessions strip.
- **Added** `loadHomepageSummary()` to `src/lib/receipts-queries.ts`.
- Killed: "Internal Standing" percentile theater, hardcoded `shell_command 38%`, `0.88 tool dependency index`, `Subscription Delusion Delta`.

### Three stacked bugs fixed to get live data flowing
1. **Compare query broke on prod** — `CASE WHEN started_at >= $1` with sum() aggregate failed postgres-js parameter-type inference. Rewrote to fetch rows and bucket in JS.
2. **chokidar watcher silent on Windows** — polling + glob combo never fired change events for append-only JSONL writes. Wrote `helper/scripts/tail.mjs`, a dead-simple polling tail that stats every .jsonl every 3s, reads bytes past a per-file cursor, parses, and POSTs.
3. **Ingest auto-closed live sessions** — `/api/ingest` was setting `ended_at = lastEventAt` on every batch, which prevented any session from ever appearing active. Patched so `ended_at` is only set via the explicit `sessionEnd` metadata path.

### Context window polish
- **Peak instead of latest** — was reading latest `api_request_completed.input_tokens`, which Claude's API excludes cache reads/creations from. Real context = `max(input_tokens + cache_tokens)`. Peak jumped from 1,576 to 219,590 on David's active session.
- **Model-aware limits** — `contextLimitFor()` maps Opus 4.6 and Sonnet 4.6 to 1M, Haiku and unknown to 200k. Read from `session.model_summary`.

### Idle skeleton
- Active session panel no longer hides when last event > 5min ago. Stays rendered with final tokens, cost, and peak context visible, dimmed to 55% opacity.
- Three states: **Live** (pulsing green, ≤5min), **Idle** (muted, session within 12h), **Dormant** (no session 12h+).

### Error surfacing
- `api/realtime` route wrapped in try/catch, returns error message + truncated stack in 500 body instead of crashing to Netlify's default page.
- Client component shows `fetch failed: <reason>` in the empty state instead of perpetual "connecting…".

### Backfill safety
- `helper/scripts/backfill.mjs` no longer synthesizes `session_ended` for files modified in the last 20 minutes. Prevents backfill from closing the currently-running session.

---

## Commits made this session

| SHA | Message |
| --- | --- |
| `580a1b2` | feat: realtime analytics dashboard |
| `afff1bb` | fix: bucket compare query in JS instead of SQL CASE |
| `52883d4` | fix: ingest keeps live sessions open + polling tail for Windows |
| `979efec` | fix: context window = peak (input+cache) · model-aware limit |
| `1d9a3bf` | feat: idle skeleton preserves last-known session state |

---

## Live state at session end

| Metric | Value |
| --- | --- |
| Production URL | https://claudes-receipts.netlify.app |
| Sessions (lifetime) | 299 |
| Sessions (today) | 61+ |
| Cost (today) | $575+ |
| Cost (yesterday) | $659 |
| Context window (this session peak) | ~225k / 1M (22%) |
| Agent deployments 24h | 89+ |
| Polling tail pid (may be dead) | 228949 |

---

## How to run

**Tail (live data):**
```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts/helper
node scripts/tail.mjs
```

**Backfill (idempotent, safe after tail has been running):**
```bash
cd helper
node scripts/backfill.mjs
```

**Dev dashboard:**
```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
npx netlify dev
```

**Deploy to prod:**
```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
npm run build && npx netlify deploy --prod --site 777f66fb-001d-485d-8142-44bad6482cea
```

---

## Open items

### Helper CLI still points at broken chokidar agent
`helper/src/agent.ts` uses chokidar and doesn't fire on Windows file appends. `helper/dist/cli.js run` → `runAgent()` is effectively dead for live tailing. The working path is `node scripts/tail.mjs`. Options:
- Swap `agent.ts` internals to use the tail.mjs polling logic, keep the CLI surface
- Update `cli.ts` to invoke tail.mjs directly
- Document that `helper run` is deprecated, use the tail script

### Context window 1M heuristic
`contextLimitFor()` treats all Opus 4.6 as 1M. If David runs a 200k Opus variant, the bar will under-report. To distinguish, we'd need the parser to capture actual context window from the API response, which it doesn't today.

### Session-end still never fires for live sessions
Without chokidar's idle-detection flush loop, sessions never get a `session_ended` event once tool calls stop. The realtime dashboard's 5min live cutoff + 12h idle visibility handles the UX, but the DB ends up with many `ended_at = null` rows over time. A cleanup pass (or restoring the idle-detection logic in tail.mjs) should close these.

### Other pages still using old queries
- `/sessions`, `/tools`, `/projects`, `/devices` use the pre-realtime query functions
- Fine — they're not broken, just not live. Next session candidate.

### Tauri NSIS installer still blocked
`cargo tauri build` compiles cleanly but NSIS bundler fails. `tauri.conf.json` → switch `bundle.targets` to `["msi"]` to unblock.

---

## Key files next session

- `src/app/api/realtime/route.ts` — endpoint, all realtime queries + context + model limits
- `src/components/realtime-pulse.tsx` — polling client, idle/live/dormant states
- `src/app/page.tsx` — homepage, composed of RealtimePulse + loadHomepageSummary
- `src/lib/receipts-queries.ts` — `loadHomepageSummary` (new) + `loadDashboardData` (for /s/[slug])
- `helper/scripts/tail.mjs` — polling ingest tail, run this not `cli.js run`
- `helper/scripts/backfill.mjs` — idempotent, skips live files (20-min threshold)
- `src/app/api/ingest/route.ts` — only sets `ended_at` via explicit `sessionEnd` metadata
