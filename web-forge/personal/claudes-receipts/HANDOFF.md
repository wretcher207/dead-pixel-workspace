# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts`
**Last session ended:** 2026-04-13 (afternoon)
**Status:** Realtime analytics dashboard shipped. `/api/realtime` endpoint polls every 4s, surfaces active session, tool calls, agent deployments, token burn, context window, and day-over-day comparisons. Homepage rewritten around realtime + time-window grid. Ranking theater and hardcoded metrics removed.

---

## What happened this session

**Dashboard rebuild around realtime.** Prior dashboard was a static snapshot with hardcoded numbers (`shell_command — 38% share`, `0.88 tool dependency index`, "Internal Standing" percentile against nobody). David called it out: "this doesn't have the analytics I care about." Rebuilt from scratch against the live event stream.

### New: `/api/realtime` — `src/app/api/realtime/route.ts`

Single `GET` endpoint returning:
- `active` — current session with tokens accruing, cost, **context window estimate** (derived from latest `api_request_completed.input_tokens`), last event age
- `pulse` — tool calls, agent deployments, prompts, API requests, errors, tokens, cost across **60s / 5m / 1h** windows (bucketed client-side from a single 1h event query)
- `today` + `compare` — today vs yesterday vs same-day-last-week cost deltas
- `topToolsHour` + `topAgentsHour` — real counts, not hardcoded
- `tokenSparkline` — 60 per-minute buckets
- `feed` — last 20 events with tool, project, duration, success

Eight queries in parallel, typical response ~8KB, no caching (`Cache-Control: no-store`).

### New: `<RealtimePulse />` — `src/components/realtime-pulse.tsx`

Client component, polls every 4s. Features:
- Pulsing green dot when a session has fired an event in the last 5 minutes, muted dot otherwise
- Context window bar that turns gold at 60%, red at 85%
- 60s/5m/1h pulse grid with agent deployments colored gold, errors red
- Live sparkline, top tools, agent deployments card
- Live feed: 20 most recent events animating in (time since, type, project, duration)

### Homepage rewrite — `src/app/page.tsx`

- Compact hero, CTA only
- Realtime panel is the centerpiece
- Time-window grid: **Today / 7d / Lifetime**, each with sessions, tokens, cost, active time
- Breakdown row: top projects (7d), agent deployments (7d)
- Recent sessions strip retained (real data from `loadHomepageSummary`)

### Queries — `src/lib/receipts-queries.ts`

- Renamed `Lifetime Damage` → `Lifetime tokens`
- Dropped `Subscription Delusion Delta` highlight + unused `subscriptionValueDelta` import
- Added `loadHomepageSummary()` returning the time-window grid + top projects + top agents + recent sessions
- Kept `loadDashboardData` working for `/s/[slug]` share pages + opengraph images (they still reference `overviewStats`)

### Styling — `src/app/globals.css`

New classes (`.rt-*`, `.tw-*`, `.bd-*`) matching the existing tan-accent/dark-panel aesthetic. Mobile breakpoints at 1100px (two-column pulse) and 720px (single column, hide feed meta).

---

## Live data (as of session end)

| Metric | Value |
| --- | --- |
| Sessions (lifetime) | 298 |
| Sessions (today) | 61 |
| Tokens (lifetime) | 1.43B |
| Cost (lifetime) | $2,326.55 |
| Cost (today) | $422.98 |
| Top project 7d | `dead-pixel-design` — $877 |
| Agent deployments 7d | 152 |
| Bash calls last hour | 22 |

---

## Verified

- `tsc --noEmit` — clean
- `next build` — clean, `/api/realtime` registered as dynamic route
- SQL smoke-tested against production Neon with David's userId — all shapes return expected data

---

## How to run locally

**Dashboard:**
```bash
cd /c/dead-pixel-design/web-forge/personal/claudes-receipts
netlify dev:exec -- npm run dev
```

**Helper (live tail):**
```bash
cd helper
node dist/cli.js run
```
If dashboard shows "Idle" / "no session in the last 5 minutes," the helper isn't running.

**Backfill (idempotent):**
```bash
cd helper
node scripts/backfill.mjs
```

---

## Open items

### Context limit hardcoded to 200k
`/api/realtime/route.ts` sets `contextLimit = 200_000`. If David uses Opus 4.6 1M or Sonnet 4.5 variants, this needs a model-name → limit map. Current model string comes from `sessions.modelSummary`.

### Tauri NSIS installer still blocked
`cargo tauri build` compiles `claudes-receipts.exe` cleanly but NSIS bundler fails. `tauri.conf.json` → switch `bundle.targets` to `["msi"]` to unblock. Raw exe still runs.

### Ingest session-end-only payloads
`/api/ingest` zod schema requires `events.min(1)`. Backfill script synthesizes `session_ended` events to work around it. Fix: relax to `min(0)` when `session_end` present.

### Cleanup
- `sessions_tracked` counter has dead branch in `agent.rs`
- `config::round_trips_config` needs `#[serial]` tag
- Legacy Node helper can be removed once Tauri ships

---

## Key files next session

- `src/app/api/realtime/route.ts` — realtime endpoint, all the query logic
- `src/components/realtime-pulse.tsx` — polling client, context bar, feed
- `src/app/page.tsx` — homepage, uses `loadHomepageSummary` + `<RealtimePulse />`
- `src/lib/receipts-queries.ts` — `loadHomepageSummary` at bottom, `loadDashboardData` still there for shares
- `helper/scripts/backfill.mjs` — idempotent, safe to rerun if cursors wiped
