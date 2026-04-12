# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts` (7 commits ahead of `feat/drum-apparatus-web`, which is ahead of `main`)
**Last session ended:** 2026-04-12 (evening)
**Status:** Milestones 1–3 of the PRD complete. Dashboard wired end-to-end against a live Neon database, seeded with realistic fixtures. Helper emits token/cost telemetry and detects session end by idle timeout. All four blockers from the previous handoff are resolved and verified.

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

- `helper/src/config.ts` — reads/writes `%APPDATA%/claudes-receipts/config.json` (Windows) or `~/.config/claudes-receipts/config.json` (Unix), 0600 perms. Stores endpoint, device ID, ingest key, and **surface label**.
- `helper/src/tail.ts` — per-file byte-cursor state under `<configDir>/cursors/` so restarts don't double-send
- `helper/src/parse.ts` — JSONL record → `IngestEvent[]`. Event extraction:
  - `type: "queue-operation", operation: "enqueue"` → `prompt_submitted`
  - `type: "assistant"` with `message.usage` → `api_request_completed` (**carries inputTokens/outputTokens/cacheTokens/model**)
  - `tool_use` content blocks in assistant → `tool_completed`
  - `tool_result` with `is_error: true` → `api_error`
- `helper/src/session-tracker.ts` — pure timeline math. `recordEventTimestamp` populates a per-session timeline; `idleSessionIds` returns sessions quiet for > 15 min; `computeSessionEnd` derives duration/active/idle from the timeline (active = sum of inter-event gaps ≤ 2 min).
- `helper/src/uploader.ts` — batch POST with exponential backoff retry. Payload optionally carries `sessionEnd` metadata. Failed uploads spool to `<configDir>/cursors/queue.jsonl`, replayed on next flush tick (every 15s)
- `helper/src/agent.ts` — chokidar watcher on `~/.claude/projects/**/*.jsonl`. Flush loop sends pending events, then sweeps idle sessions and emits synthetic `session_ended` events with `sessionEnd` metadata. A closed session can be re-opened if new JSONL lines arrive.
- `helper/src/cli.ts` — `claudes-receipts-helper register --endpoint … --device-id … --ingest-key … [--surface <label>]` and `claudes-receipts-helper run`

`npm install` + `npx tsc` both succeed.

### 6. Schema (`src/db/schema.ts` + `drizzle/0000_fixed_magma.sql`)

Unchanged from codex's scaffold. Tables: `users`, `auth_accounts`, `auth_sessions`, `auth_verification_tokens`, `auth_authenticators`, `devices`, `projects`, `project_aliases`, `prompts`, `sessions`, `api_requests`, `api_errors`, `tool_results`, `tool_decisions`, `session_events`, `daily_rollups`, `shares`, `rank_snapshots`.

Live on Netlify DB (managed Neon), migrated via `netlify dev:exec -- npx drizzle-kit migrate`. `scripts/seed.ts` is aligned and idempotent — seeds founder + 2 peer users, 4 devices, 5 projects, 15 sessions with realistic derived metrics, tool results, tool decisions, api errors, and 2 shares.

---

## How it runs today

1. **DB already provisioned**: Netlify site `claudes-receipts` at https://claudes-receipts.netlify.app, Neon extension installed on the Dead Pixel Design team. `NETLIFY_DATABASE_URL` is saved as a site env var. Locally, run anything that needs the DB via `netlify dev:exec -- <command>`.
2. **GitHub OAuth** is NOT configured yet. Create an OAuth app, set `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` / `AUTH_SECRET` as Netlify site env vars before sign-in will work.
3. Migrations have been applied. To reapply from scratch: `netlify dev:exec -- npx drizzle-kit migrate`.
4. To reseed: `netlify dev:exec -- npm run db:seed`.
5. `netlify dev:exec -- npm run dev` starts the app with `NETLIFY_DATABASE_URL` injected.
6. For a new device: sign in → `POST /api/devices/register` with `{nickname, platform}`. Response returns `{deviceId, ingestKey}` — **save the ingest key, only the hash is persisted**.
7. `cd helper && npm install && npm run register -- --endpoint http://localhost:3000 --device-id … --ingest-key … [--surface desktop-vscode]`
8. `cd helper && npm run dev` → agent tails `~/.claude/projects/**/*.jsonl`, posts batches every 15s, closes idle sessions after 15 min of quiet.

**Pre-seeded test credentials** (for local use only; stored only in this handoff):
- Workstation device id: `seed-dev-workstation`
- Workstation ingest key: `5JUkA6fYZ6UtQj1-RR0yS79yj985vBk_`
- Laptop device id: `seed-dev-laptop`
- Laptop ingest key: `G95oKZBubgfCP2FjOR4nfORE_n_Ns-RF`

End-to-end verified: posted an ingest with `sessionEnd` → `sessionClosed:true` in response → direct Postgres query confirmed `endedAt` / `durationSeconds` / `activeSeconds` / `idleSeconds` / token and cost columns all populated correctly.

---

## Known gaps / follow-ups

### Previously blocking — now done
- ~~Seed script mismatch~~ — rewritten against current schema, idempotent, populates enough data for every surface.
- ~~Helper doesn't send token/cost totals~~ — `parse.ts` attaches usage to `api_request_completed`; `/api/ingest` persists per-event tokens+cost and increments session totals via `sql\`col + N\``.
- ~~Session end detection~~ — idle-timeout heuristic (15 min no-new-lines, 2 min active-gap threshold). Synthetic `session_ended` event + `sessionEnd` payload metadata.
- ~~Device surface labeling~~ — `--surface` flag on `register`, default `"desktop"`. Stored in HelperConfig, sent on every ingest.

### Still open
1. **GitHub OAuth** — not configured on the Netlify site. Needed before real users can sign in. Dashboard pages call `getServerSession` and gracefully render demo mode when there's no user.
2. **Rebase onto main** — branch was cut from `feat/drum-apparatus-web`, so drum commits are in history. Once that branch lands, rebase.
3. **Rank snapshot cadence** — currently recomputed on demand when the home page has no cached snapshot. Needs a scheduled Netlify function when the product has more than one user.
4. **Share page OG image** — `/s/[slug]` has metadata but no dynamic OG image. Build an `opengraph-image.tsx`.
5. **Tauri shell** — settings UI, system tray, start-on-login. The Node agent is the plumbing; Tauri wraps it.
6. **Browser extension** — PRD §11.4. Stub exists in the PRD only.
7. **Error recovery UX** — if helper's ingest key gets revoked, the agent currently logs and stops. Surface a re-pairing flow.
8. **Stale-session recovery on agent restart** — if the helper is killed mid-session, `session_ended` never fires and the row stays open with null duration. Sweep old cursor files on startup and close anything older than the idle threshold.
9. **Deploy to production** — nothing has been built/deployed to Netlify yet. Site exists, DB exists, code has never been pushed.

### PRD open questions still unresolved
- How should public rank snapshots behave — freeze at publish time or remain live? Current implementation reads live on every page load.
- Subscription baseline is a single `$20/mo` constant. When should users configure this?
- SEO behavior for public share pages — indexed or `noindex`? Currently no `robots` directive is set.
- Idle-timeout (15 min) and active-gap threshold (2 min) in the helper are informed guesses. Tune once we watch real user traffic.

---

## Commit trail

```
231fb6c feat(claudes-receipts): wire token/cost telemetry + realistic seed
3644abd docs: session handoff for claudes-receipts
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
- `src/app/api/ingest/route.ts` — writes tokens/cost to session_events, increments session totals, applies `sessionEnd` metadata
- `helper/src/agent.ts` — chokidar watcher + flush loop + idle-session sweep
- `helper/src/session-tracker.ts` — pure timeline math (idle detection, duration/active/idle computation)
- `helper/src/parse.ts` — JSONL → IngestEvent extraction with token usage attached
- `scripts/seed.ts` — idempotent fixture loader; rerun after schema changes

---

## Design decisions worth remembering

- **Demo mode is first-class.** Every page gracefully falls back to mock data when `getDb()` returns null or the user has no rows. Copy changes to be honest about demo state. Don't break this when adding features.
- **Dashboard UI primitives live in `receipts-ui.tsx`.** The `/s/[slug]` share page is the one intentional exception — it uses a separate CSS vocabulary (`receipt-surface`, `receipt-frame`, Fraunces serif) to feel like a published artifact, not a dashboard screen.
- **Metadata-only telemetry is a hard rule.** Helper's `parse.ts` specifically avoids reading prompt/response content. Don't regress this to improve fidelity.
- **Helper chose Node over Tauri for v1.** PRD suggests Tauri, but the data source is just JSONL on disk. Tauri is a UI question, not a capability question. Revisit once the web dashboard proves the product.
- **Session-end is idle-timeout, not event-driven.** Claude Code JSONL has no "session closed" marker. The helper watches for 15 min of quiet and emits a synthetic `session_ended` with derived duration/active/idle. A closed session can be resurrected if new lines arrive.
- **`sessionEnd` is a payload-level field, not an event-level field.** It's metadata *about* the session, not something that happened in it. Keeps the events table clean and the session update is a single-row UPDATE instead of SQL derived from events.
- **Env vars prefer `NETLIFY_DATABASE_URL`, fall back to `DATABASE_URL`.** Wired in `drizzle.config.ts`, `src/lib/db.ts`, `src/lib/setup.ts`, `scripts/seed.ts`. Run DB-dependent commands via `netlify dev:exec --` to get the env injected locally.
