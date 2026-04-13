# Claude's Receipts — Session Handoff

**Branch:** `feat/claudes-receipts` (8 commits ahead of `feat/drum-apparatus-web`, which is ahead of `main`)
**Last session ended:** 2026-04-12 (evening, second session)
**Status:** Milestones 1–3 complete from prior session. This session completed items 1–6 of the known gaps list. App is live at https://claudes-receipts.netlify.app.

---

## What lives on this branch

### 1. Next.js 16 dashboard (`./`)

- **App Router**, React 19, Tailwind v4, Drizzle ORM, NextAuth (GitHub), Zod
- `AGENTS.md` warns: **Next.js 16 has breaking changes** — consult `node_modules/next/dist/docs/` before writing new route code
- **All dashboard pages are `force-dynamic`** and server-rendered with `getServerSession(authOptions)`
- Lint clean, `npm run build` green, deployed to production

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
| `/s/[slug]/opengraph-image` | dynamic | ImageResponse — dark/gold 1200×630, live DB data |
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

Pure functions. No DB dependency beyond type imports. Unchanged — see prior handoff.

### 3. Rankings engine (`src/lib/rankings.ts`)

All 10 PRD dimensions. `computeRankings` + `persistRankingSnapshots` + `loadLatestRankings`. Unchanged — see prior handoff.

### 4. Share pages

- **`/share`** (authenticated): creator widget + existing shares list
- **`/s/[slug]`** (public): standalone editorial treatment, Fraunces serif, gold-on-charcoal
- **`/s/[slug]/opengraph-image`** (new): dynamic OG image. Dark `#070706` bg, warm top gradient, left gold rule, two-column layout — branding/headline left, receipt stat card right. Pulls lifetime damage + 30-day burn from DB, respects `exactCosts` redaction. Loads Fraunces from Google Fonts at render time, falls back to Georgia. `generateMetadata` on `page.tsx` now wires `og:image` + `twitter:card`.

### 5. Helper agent (`./helper/`)

#### New this session
- **Stale-session recovery** (`tail.ts` + `agent.ts`): `readNewLines` returns `mtimeMs`. `readLinesUpToCursor` re-reads full JSONL history for timeline rebuild. On `add`, files with `cursor.offset > 0` + `mtime > IDLE_TIMEOUT_MS` + no existing timeline get their full history replayed into `timelines`. Chokidar `ready` fires an immediate flush so stale sessions close on startup rather than waiting 15s.
- **Auth failure detection** (`uploader.ts` + `agent.ts`): `postBatch` returns `PostResult = { ok: true } | { ok: false; authFailed: boolean }`. 401 is terminal — not retried, not queued. `flushQueue` returns `{ authFailed: boolean }`. Agent's `flush` checks every send + queue flush; on `authFailed` calls `handleAuthFailure()` which clears the interval, logs exact re-pairing instructions, and exits with code 1. Queue is preserved (not wiped) so data survives a re-register.

#### Re-pairing flow (what `handleAuthFailure` prints)
```
[helper] CREDENTIAL FAILURE — ingest key rejected
[helper] Endpoint: <endpoint>
[helper] The device key may have been revoked or is invalid.
[helper] To re-pair:
[helper]   1. Sign in at <endpoint>
[helper]   2. Navigate to Devices and register a new device
[helper]   3. Run:  helper register --endpoint <endpoint> --device-id <new-id> --ingest-key <new-key>
[helper]   4. Run:  helper run
```

### 6. Scheduled function (`netlify/functions/rankings-snapshot.ts`)

Runs daily at 4am UTC via `schedule: "0 4 * * *"`. Queries all users, runs `computeRankings` + `persistRankingSnapshots` per user. Per-user failures are caught individually. 30-second Netlify scheduled function timeout — fine for v1 user count.

### 7. Schema + seed

Unchanged from prior session.

---

## How it runs today

1. **Live at:** https://claudes-receipts.netlify.app — deployed via `netlify deploy --build --prod`
2. **GitHub OAuth:** `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` / `AUTH_SECRET` are set on the Netlify site (all contexts). Sign-in works once GitHub OAuth app callback URLs are confirmed.
3. **DB:** Neon DB **claimed** — no longer anonymous, no longer at risk of expiry.
4. To run locally: `netlify dev:exec -- npm run dev`
5. To reseed: `netlify dev:exec -- npm run db:seed`
6. To re-run migrations: `netlify dev:exec -- npx drizzle-kit migrate`

**Pre-seeded test credentials** (local use only):
- Workstation device id: `seed-dev-workstation` / key: `5JUkA6fYZ6UtQj1-RR0yS79yj985vBk_`
- Laptop device id: `seed-dev-laptop` / key: `G95oKZBubgfCP2FjOR4nfORE_n_Ns-RF`

---

## Known gaps / follow-ups

### Done this session
- ~~GitHub OAuth~~ — env vars set on Netlify (all + prod contexts)
- ~~Stale-session recovery on agent restart~~ — startup sweep + immediate flush
- ~~Share page OG image~~ — `opengraph-image.tsx` at `/s/[slug]`
- ~~Rank snapshot cron~~ — `netlify/functions/rankings-snapshot.ts`, 4am UTC daily
- ~~Deploy to production~~ — live at https://claudes-receipts.netlify.app
- ~~Error recovery UX~~ — auth failure stops agent, prints re-pairing steps

### Still open
1. **Rebase onto main** — branch was cut from `feat/drum-apparatus-web`. Once that branch lands, rebase.
2. **Tauri shell** — settings UI, system tray, start-on-login. Node agent is the plumbing; Tauri wraps it.
3. **Browser extension** — PRD §11.4. Stub in PRD only.

### PRD open questions (unchanged)
- Public rank snapshots: freeze at publish time or live? Currently live on every load.
- Subscription baseline is `$20/mo` constant. When should users configure this?
- SEO for public share pages — `noindex` or indexed? No directive currently set.
- Idle timeout (15 min) and active-gap threshold (2 min) need tuning against real traffic.

---

## Commit trail

```
e59ec6d feat(claudes-receipts): GitHub OAuth, stale-session recovery, OG image, rank cron, deploy
5f68086 feat(claudes-receipts): idle session-end detection + surface labeling
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

- `src/lib/receipts-queries.ts` — all DB read paths
- `src/lib/metrics.ts` — pure metric math
- `src/lib/rankings.ts` — percentile engine
- `src/app/api/ingest/route.ts` — writes tokens/cost, applies `sessionEnd`
- `helper/src/agent.ts` — chokidar watcher + flush loop + stale sweep + auth failure handling
- `helper/src/uploader.ts` — `PostResult` type, auth failure propagation
- `netlify/functions/rankings-snapshot.ts` — daily cron
- `src/app/s/[slug]/opengraph-image.tsx` — OG image

---

## Design decisions worth remembering

- **Demo mode is first-class.** Every page gracefully falls back to mock data when `getDb()` returns null or the user has no rows. Don't break this when adding features.
- **Dashboard UI primitives live in `receipts-ui.tsx`.** The `/s/[slug]` share page is the one intentional exception — it uses a separate CSS vocabulary.
- **Metadata-only telemetry is a hard rule.** Helper's `parse.ts` never reads prompt/response content.
- **Helper chose Node over Tauri for v1.** Tauri is a UI question, not a capability question.
- **Session-end is idle-timeout, not event-driven.** 15 min of quiet + synthetic `session_ended`.
- **`sessionEnd` is payload-level metadata, not an event.** Keeps events table clean.
- **Auth failure is terminal, not retryable.** Queue is preserved; agent exits with instructions.
- **Env vars prefer `NETLIFY_DATABASE_URL`, fall back to `DATABASE_URL`.** Run DB commands via `netlify dev:exec --`.
