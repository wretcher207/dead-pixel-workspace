# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts` (5 commits ahead of `feat/drum-apparatus-web`, which is ahead of `main`)
**Last session ended:** 2026-04-12
**Status:** Milestones 1–3 of the PRD substantially complete. Dashboard is wired end-to-end against the DB with honest demo-mode fallbacks. Helper agent is functional. Not yet deployed, not yet paired against a live database.

---

## What lives on this branch

### 1. Next.js 16 dashboard (`./`)

- **App Router**, React 19, Tailwind v4, Drizzle ORM, NextAuth (GitHub), Zod
- `AGENTS.md` warns: **Next.js 16 has breaking changes** — consult `node_modules/next/dist/docs/` before writing new route code
- **All dashboard pages are `force-dynamic`** and server-rendered with `getServerSession(authOptions)`
- Lint clean, `npm run build` green

#### Routes
| Route | Status | Source |
| --- | --- | --- |
| `/` | dynamic | `loadDashboardData(userId)` → mocks fallback |
| `/sessions` | dynamic | `loadSessionsIndex(userId)` → mocks fallback |
| `/sessions/[sessionId]` | dynamic | `loadSessionDetail(userId, id)` → mocks fallback |
| `/projects` | dynamic | `loadProjectCards(userId)` → mocks fallback |
| `/tools` | dynamic | `loadToolCards(userId)` → mocks fallback |
| `/devices` | dynamic | `loadDeviceCards(userId)` → mocks fallback |
| `/share` | dynamic | `loadUserShares(userId)` + `ShareCreator` client component |
| `/s/[slug]` | dynamic, public | `loadShare(slug)` + redaction config |
| `/login` | static | NextAuth GitHub button |

#### API routes
| Endpoint | Auth | Purpose |
| --- | --- | --- |
| `POST /api/auth/[...nextauth]` | — | NextAuth handler |
| `POST /api/devices/register` | session | Mints device + ingest key (hashed in DB) |
| `POST /api/ingest` | device key | Upserts session + session_events |
| `POST /api/rankings/rebuild` | session | Recomputes + persists `rank_snapshots` |
| `POST /api/shares` | session | Creates private/public share with redaction config |
| `GET /api/health` | — | Sanity |

### 2. Metrics engine (`src/lib/metrics.ts`)

Pure functions. No DB dependency beyond type imports.

- `MODEL_PRICING` — cents per million tokens for opus / sonnet / haiku (input, output, cache-read, cache-write)
- `resolveModelFamily(modelSummary)` — string matcher
- `estimateCostCents({inputTokens, outputTokens, cacheTokens}, family)`
- `computeSessionMetrics({session, events?, tools?, decisions?, errors?})` → `SessionMetrics` with:
  - `apiEquivalentCostCents`
  - `idleRatio`
  - `retrySpiralScore`
  - `toolDependencyIndex`
  - `sessionQualityScore` (0–100)
  - `qualityLabel`: `"Surgical" | "Acceptable" | "Expensive Wandering" | "Committed Beyond Reason" | "You Stayed With This"`
  - `acceptanceRate`
  - `errorCount`
  - `toolCount`
- `aggregateCostByProject(sessions)` → `ProjectBurn[]`
- `machineIntensity(sessions)` → `MachineIntensity[]`
- `subscriptionValueDelta(totalCents, subscriptionCents)`
- `formatCents` / `formatPercent`

Subscription baseline is hardcoded at `SUBSCRIPTION_MONTHLY_CENTS = 2000` in `receipts-queries.ts`. Move to user settings when that model exists.

### 3. Rankings engine (`src/lib/rankings.ts`)

Covers all 10 PRD dimensions:
- `weekly_tokens`, `monthly_tokens`, `lifetime_tokens`
- `weekly_cost`, `monthly_cost`
- `session_count`, `average_session_duration`
- `tool_dependency_index`, `retry_spiral_score`, `project_burn_intensity`

`computeRankings(userId)` runs SQL per dimension across all users and returns a `UserRankings` record of dimension → percentile.

`persistRankingSnapshots` writes to `rank_snapshots`. `loadLatestRankings` reads the most recent per dimension.

Home-page Internal Standing panel calls `loadLatestRankings` and falls back to `computeRankings` when no snapshots exist.

### 4. Share pages

- **`/share`** (authenticated): creator widget (private/public toggle, 5 redaction checkboxes, ranking visibility) + list of existing shares pulled from DB
- **`/s/[slug]`** (public): standalone editorial treatment, not the dashboard shell. Fraunces display serif via `next/font`, gold-on-charcoal, grid-masked background. Respects redaction config — `exactCosts` collapses amounts to `$•••`, `machineNames` hides Device Mix, etc.
- `POST /api/shares` body: `{ visibility: "private"|"public", redactionConfig: {projectAliases?, machineNames?, exactCosts?, topSessionNames?, rankingVisible?} }`

### 5. Helper agent (`./helper/`)

**v1 pivot:** a headless Node daemon instead of Tauri. Tauri UI shell comes later. Rationale: Claude Code already writes complete JSONL transcripts, so watching them is the whole job.

- `helper/src/config.ts` — reads/writes `%APPDATA%/claudes-receipts/config.json` (Windows) or `~/.config/claudes-receipts/config.json` (Unix), 0600 perms
- `helper/src/tail.ts` — per-file byte-cursor state under `<configDir>/cursors/` so restarts don't double-send
- `helper/src/parse.ts` — JSONL record → `IngestEvent[]`. Event extraction:
  - `type: "queue-operation", operation: "enqueue"` → `prompt_submitted`
  - `type: "assistant"` with `message.usage` → `api_request_completed`
  - `tool_use` content blocks in assistant → `tool_completed`
  - `tool_result` with `is_error: true` → `api_error`
- `helper/src/uploader.ts` — batch POST with exponential backoff retry. Failed uploads spool to `<configDir>/cursors/queue.jsonl`, replayed on next flush tick (every 15s)
- `helper/src/agent.ts` — chokidar watcher on `~/.claude/projects/**/*.jsonl`
- `helper/src/cli.ts` — `claudes-receipts-helper register --endpoint … --device-id … --ingest-key …` and `claudes-receipts-helper run`

`npm install` + `npx tsc` both succeed. `node dist/cli.js` prints the "no configuration" message as expected.

### 6. Schema (`src/db/schema.ts` + `drizzle/0000_fixed_magma.sql`)

Unchanged from codex's scaffold. Tables: `users`, `auth_accounts`, `auth_sessions`, `auth_verification_tokens`, `auth_authenticators`, `devices`, `projects`, `project_aliases`, `prompts`, `sessions`, `api_requests`, `api_errors`, `tool_results`, `tool_decisions`, `session_events`, `daily_rollups`, `shares`, `rank_snapshots`.

Not yet pushed to a real database. `scripts/seed.ts` reflects codex's original shape and probably needs a pass before it works end-to-end.

---

## How it runs today

1. **Create DB**: Postgres somewhere (local, Neon, Supabase). Set `DATABASE_URL` in `.env`.
2. **GitHub OAuth**: create an OAuth app, set `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` / `AUTH_SECRET`.
3. `npm run db:push` to apply the Drizzle migration.
4. `npm run dev` → sign in with GitHub at `/login`.
5. Hit `POST /api/devices/register` (send `{nickname, platform}` as JSON, include the next-auth session cookie). Response returns `{deviceId, ingestKey}` — **save the ingest key, only the hash is persisted**.
6. `cd helper && npm install && npm run register -- --endpoint http://localhost:3000 --device-id … --ingest-key …`
7. `npm run dev` inside `helper/` → agent starts tailing `~/.claude/projects/**/*.jsonl`.
8. Use Claude Code. The home page should start showing real data as soon as events land.

Nothing in that sequence has been end-to-end tested against a real DB yet. Expect bugs on first run.

---

## Known gaps / follow-ups

### Blocking for a real demo
1. **Seed script mismatch** — `scripts/seed.ts` was written against codex's original mock shape. Align with the new derived-metrics-aware schema before demoing.
2. **Helper doesn't send token/cost totals yet** — `parse.ts` emits events but `extractUsage` is computed and discarded. `/api/ingest` also needs columns for input/output/cache tokens on events (or session-level rollups). Wire this so `sessions.estimatedCostCents` and token columns get populated.
3. **Session end detection** — helper emits `prompt_submitted`, `api_request_completed`, `tool_completed`, `api_error`. No `session_ended` yet. Add either an idle-timeout heuristic (e.g., 15 min of no new lines) or listen for Claude Code's equivalent signal.
4. **Device surface labeling** — helper hardcodes `"desktop-windows"` / `"desktop-unix"`. Add a CLI flag and per-session surface detection.

### Nice to have
5. **Rebase onto main** — branch was cut from `feat/drum-apparatus-web`, so drum commits are in history. Once that branch lands, rebase.
6. **Rank snapshot cadence** — currently recomputed on demand when the home page has no cached snapshot. Needs a scheduled job (cron / Netlify scheduled function) when the product has more than one user.
7. **Share page OG image** — `/s/[slug]` has metadata but no dynamic OG image. Build an `opengraph-image.tsx` that renders the receipt.
8. **Tauri shell** — settings UI, system tray, start-on-login. The Node agent is the plumbing; Tauri wraps it.
9. **Browser extension** — PRD §11.4. Stub exists in the PRD only.
10. **Error recovery UX** — if helper's ingest key gets revoked, the agent currently logs and stops. Surface a re-pairing flow.

### PRD open questions still unresolved
- How should public rank snapshots behave — freeze at publish time or remain live? Current implementation reads live on every page load.
- Subscription baseline is a single `$20/mo` constant. When should users configure this?
- SEO behavior for public share pages — indexed or `noindex`? Currently no `robots` directive is set.

---

## Commit trail

```
a9e9105 feat(claudes-receipts): v1 helper agent tails Claude Code JSONL
c0708c9 feat(claudes-receipts): Receipt Mode — public + private share pages
8eab029 feat(claudes-receipts): wire projects/tools/devices + rankings engine
ac10154 feat(claudes-receipts): wire home and sessions to Drizzle queries
175603b feat(claudes-receipts): first-pass Next.js 16 scaffold
```

---

## Key files to open first next session

- `src/lib/receipts-queries.ts` — all DB read paths live here
- `src/lib/metrics.ts` — pure metric math
- `src/lib/rankings.ts` — percentile engine
- `src/app/api/ingest/route.ts` — gets extended when token totals start landing
- `helper/src/parse.ts` + `helper/src/agent.ts` — helper event extraction
- `scripts/seed.ts` — the first thing to fix when wiring a real DB

---

## Design decisions worth remembering

- **Demo mode is first-class.** Every page gracefully falls back to mock data when `getDb()` returns null or the user has no rows. Copy changes to be honest about demo state. Don't break this when adding features.
- **Dashboard UI primitives live in `receipts-ui.tsx`.** The `/s/[slug]` share page is the one intentional exception — it uses a separate CSS vocabulary (`receipt-surface`, `receipt-frame`, Fraunces serif) to feel like a published artifact, not a dashboard screen.
- **Metadata-only telemetry is a hard rule.** Helper's `parse.ts` specifically avoids reading prompt/response content. Don't regress this to improve fidelity.
- **Helper chose Node over Tauri for v1.** PRD suggests Tauri, but the data source is just JSONL on disk. Tauri is a UI question, not a capability question. Revisit once the web dashboard proves the product.
