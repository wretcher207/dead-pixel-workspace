# Claude's Receipts

First-pass implementation of the PRD in `../claudes-receipts-prd.md`.

What is included:

- premium Next.js dashboard shell with routes for home, sessions, projects, tools, devices, and share
- metadata-only mock analytics shaped around the PRD
- session detail autopsy pages
- GitHub auth foundation with a custom login page and header session controls
- device registration and ingest API contracts
- Drizzle/Postgres schema in [db/schema.sql](./db/schema.sql) and [src/db/schema.ts](./src/db/schema.ts)
- helper-app responsibilities captured in [helper/README.md](./helper/README.md)
- six local video assets copied into `public/videos`
- `.env.example`, `drizzle.config.ts`, and a seed script for first setup

Run locally:

```bash
npm run dev
```

Environment setup:

```bash
Copy-Item .env.example .env
```

Fill in:

- `AUTH_SECRET`
- `AUTH_GITHUB_ID`
- `AUTH_GITHUB_SECRET`
- `DATABASE_URL`

Database setup:

```bash
npm run db:push
npm run db:seed
```

Verification commands:

```bash
npm run lint
npm run build
```
