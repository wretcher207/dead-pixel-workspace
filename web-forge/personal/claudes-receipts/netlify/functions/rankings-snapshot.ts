import type { Config } from "@netlify/functions";
import { getDb } from "../../src/lib/db";
import {
  computeRankings,
  persistRankingSnapshots,
} from "../../src/lib/rankings";
import { users } from "../../src/db/schema";

// Rebuild rank_snapshots for every user once per day.
// Scheduled functions have a 30-second hard timeout — keep per-user work fast.

export default async function handler(): Promise<void> {
  const db = getDb();

  if (!db) {
    console.error("[rankings-snapshot] No database URL — skipping.");
    return;
  }

  const allUsers = await db.select({ id: users.id }).from(users);

  if (allUsers.length === 0) {
    console.log("[rankings-snapshot] No users found — nothing to do.");
    return;
  }

  console.log(`[rankings-snapshot] Computing rankings for ${allUsers.length} user(s).`);

  let ok = 0;
  let failed = 0;

  for (const user of allUsers) {
    try {
      const rankings = await computeRankings(user.id);
      await persistRankingSnapshots(user.id, rankings);
      ok++;
    } catch (err) {
      console.error(`[rankings-snapshot] Failed for user ${user.id}:`, err);
      failed++;
    }
  }

  console.log(`[rankings-snapshot] Done. ${ok} succeeded, ${failed} failed.`);
}

export const config: Config = {
  // 4am UTC — low traffic, fresh for the day
  schedule: "0 4 * * *",
};
