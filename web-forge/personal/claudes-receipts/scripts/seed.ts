import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { devices, projects, sessions, shares, users } from "../src/db/schema";
import { createIngestKey, hashIngestKey } from "../src/lib/security";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed the database.");
  }

  const sql = postgres(process.env.DATABASE_URL, { prepare: false });
  const db = drizzle(sql);

  const userId = "seed-founder";
  const deviceId = "seed-workstation";
  const projectId = "seed-project-receipts";
  const shareId = "seed-share-overview";
  const ingestKey = createIngestKey();

  await db
    .insert(users)
    .values({
      id: userId,
      email: "founder@example.com",
      name: "Founder Account",
      displayName: "Founder Account",
      githubLogin: "founder-account",
    })
    .onConflictDoNothing();

  await db
    .insert(devices)
    .values({
      id: deviceId,
      userId,
      nickname: "Workstation North",
      platform: "windows",
      ingestKeyHash: hashIngestKey(ingestKey),
    })
    .onConflictDoNothing();

  await db
    .insert(projects)
    .values({
      id: projectId,
      userId,
      canonicalKey: "receipts/web-app",
      currentAlias: "Claude's Receipts",
      pinned: true,
    })
    .onConflictDoNothing();

  await db
    .insert(sessions)
    .values({
      id: "seed-session-overview",
      userId,
      deviceId,
      projectId,
      surface: "desktop",
      remoteControlled: false,
      modelSummary: "Claude Sonnet",
      startedAt: new Date("2026-04-08T20:00:00.000Z"),
      endedAt: new Date("2026-04-08T22:26:00.000Z"),
      durationSeconds: 8760,
      activeSeconds: 7120,
      idleSeconds: 1640,
      estimatedCostCents: 11842,
      inputTokens: 1700000,
      outputTokens: 824000,
      cacheTokens: 307000,
    })
    .onConflictDoNothing();

  await db
    .insert(shares)
    .values({
      id: shareId,
      userId,
      shareSlug: "founder-weekly-damage",
      visibility: "private",
      redactionConfig: {
        hideExactCosts: false,
        hideProjectAliases: false,
      },
      publishedAt: new Date("2026-04-10T12:00:00.000Z"),
    })
    .onConflictDoNothing();

  console.log("Seed complete.");
  console.log(`Sample device id: ${deviceId}`);
  console.log(`Sample ingest key: ${ingestKey}`);

  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
