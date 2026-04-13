import { desc, eq, gte, sql } from "drizzle-orm";
import {
  rankSnapshots,
  sessionEvents,
  sessions,
} from "@/db/schema";
import { getDb } from "@/lib/db";

export type RankingDimension =
  | "weekly_tokens"
  | "monthly_tokens"
  | "lifetime_tokens"
  | "weekly_cost"
  | "monthly_cost"
  | "session_count"
  | "average_session_duration"
  | "tool_dependency_index"
  | "retry_spiral_score"
  | "project_burn_intensity";

export const RANKING_DIMENSIONS: RankingDimension[] = [
  "weekly_tokens",
  "monthly_tokens",
  "lifetime_tokens",
  "weekly_cost",
  "monthly_cost",
  "session_count",
  "average_session_duration",
  "tool_dependency_index",
  "retry_spiral_score",
  "project_burn_intensity",
];

export const DIMENSION_LABELS: Record<RankingDimension, string> = {
  weekly_tokens: "Weekly tokens",
  monthly_tokens: "Monthly tokens",
  lifetime_tokens: "Lifetime tokens",
  weekly_cost: "Weekly estimated cost",
  monthly_cost: "Monthly estimated cost",
  session_count: "Session count",
  average_session_duration: "Average session duration",
  tool_dependency_index: "Tool dependency index",
  retry_spiral_score: "Retry spiral score",
  project_burn_intensity: "Project burn intensity",
};

const DAY_MS = 86_400_000;

type UserScore = { userId: string; value: number };

type DimensionScore = {
  dimension: RankingDimension;
  scores: UserScore[];
};

async function scoresForDimension(
  dimension: RankingDimension,
): Promise<UserScore[]> {
  const db = getDb();
  if (!db) return [];

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * DAY_MS);
  const monthAgo = new Date(now.getTime() - 30 * DAY_MS);

  switch (dimension) {
    case "weekly_tokens":
    case "monthly_tokens":
    case "lifetime_tokens": {
      const cutoff =
        dimension === "weekly_tokens"
          ? weekAgo
          : dimension === "monthly_tokens"
            ? monthAgo
            : null;
      const rows = await db
        .select({
          userId: sessions.userId,
          value: sql<number>`coalesce(sum(${sessions.inputTokens} + ${sessions.outputTokens} + ${sessions.cacheTokens}), 0)`,
        })
        .from(sessions)
        .where(cutoff ? gte(sessions.startedAt, cutoff) : undefined)
        .groupBy(sessions.userId);
      return rows.map((row) => ({ userId: row.userId, value: Number(row.value) }));
    }

    case "weekly_cost":
    case "monthly_cost": {
      const cutoff = dimension === "weekly_cost" ? weekAgo : monthAgo;
      const rows = await db
        .select({
          userId: sessions.userId,
          value: sql<number>`coalesce(sum(${sessions.estimatedCostCents}), 0)`,
        })
        .from(sessions)
        .where(gte(sessions.startedAt, cutoff))
        .groupBy(sessions.userId);
      return rows.map((row) => ({ userId: row.userId, value: Number(row.value) }));
    }

    case "session_count": {
      const rows = await db
        .select({
          userId: sessions.userId,
          value: sql<number>`count(*)`,
        })
        .from(sessions)
        .groupBy(sessions.userId);
      return rows.map((row) => ({ userId: row.userId, value: Number(row.value) }));
    }

    case "average_session_duration": {
      const rows = await db
        .select({
          userId: sessions.userId,
          value: sql<number>`coalesce(avg(${sessions.durationSeconds}), 0)`,
        })
        .from(sessions)
        .where(gte(sessions.startedAt, monthAgo))
        .groupBy(sessions.userId);
      return rows.map((row) => ({ userId: row.userId, value: Number(row.value) }));
    }

    case "tool_dependency_index": {
      const rows = await db
        .select({
          userId: sessions.userId,
          tools: sql<number>`coalesce(sum(case when ${sessionEvents.eventType} = 'tool_completed' then 1 else 0 end), 0)`,
          prompts: sql<number>`coalesce(sum(case when ${sessionEvents.eventType} = 'prompt_submitted' then 1 else 0 end), 1)`,
        })
        .from(sessions)
        .leftJoin(sessionEvents, eq(sessionEvents.sessionId, sessions.id))
        .where(gte(sessions.startedAt, monthAgo))
        .groupBy(sessions.userId);
      return rows.map((row) => ({
        userId: row.userId,
        value: Number(row.tools) / Math.max(1, Number(row.prompts)),
      }));
    }

    case "retry_spiral_score": {
      const rows = await db
        .select({
          userId: sessions.userId,
          requests: sql<number>`coalesce(sum(case when ${sessionEvents.eventType} = 'api_request_completed' then 1 else 0 end), 0)`,
          prompts: sql<number>`coalesce(sum(case when ${sessionEvents.eventType} = 'prompt_submitted' then 1 else 0 end), 1)`,
        })
        .from(sessions)
        .leftJoin(sessionEvents, eq(sessionEvents.sessionId, sessions.id))
        .where(gte(sessions.startedAt, monthAgo))
        .groupBy(sessions.userId);
      return rows.map((row) => ({
        userId: row.userId,
        value: Math.max(0, Number(row.requests) - Number(row.prompts)) /
          Math.max(1, Number(row.prompts)),
      }));
    }

    case "project_burn_intensity": {
      const rows = await db
        .select({
          userId: sessions.userId,
          cost: sql<number>`coalesce(sum(${sessions.estimatedCostCents}), 0)`,
          active: sql<number>`coalesce(sum(${sessions.activeSeconds}), 1)`,
        })
        .from(sessions)
        .where(gte(sessions.startedAt, monthAgo))
        .groupBy(sessions.userId);
      return rows.map((row) => ({
        userId: row.userId,
        value: (Number(row.cost) * 3600) / Math.max(1, Number(row.active)),
      }));
    }
  }
}

export function percentileFor(
  score: number,
  allScores: number[],
): number {
  if (allScores.length === 0) return 0;
  const below = allScores.filter((s) => s < score).length;
  return below / allScores.length;
}

export type UserRankings = Partial<Record<RankingDimension, number>>;

export async function computeRankings(userId: string): Promise<UserRankings> {
  const result: UserRankings = {};
  const allScores: DimensionScore[] = await Promise.all(
    RANKING_DIMENSIONS.map(async (dimension) => ({
      dimension,
      scores: await scoresForDimension(dimension),
    })),
  );

  for (const { dimension, scores } of allScores) {
    const user = scores.find((s) => s.userId === userId);
    if (!user) continue;
    const pct = percentileFor(
      user.value,
      scores.map((s) => s.value),
    );
    result[dimension] = pct;
  }

  return result;
}

export async function persistRankingSnapshots(
  userId: string,
  rankings: UserRankings,
): Promise<void> {
  const db = getDb();
  if (!db) return;

  const rows = Object.entries(rankings).map(([dimension, pct]) => ({
    userId,
    dimension,
    percentile: pct!.toFixed(4),
  }));
  if (rows.length === 0) return;
  await db.insert(rankSnapshots).values(rows);
}

export async function loadLatestRankings(
  userId: string,
): Promise<UserRankings | null> {
  const db = getDb();
  if (!db) return null;

  const rows = await db
    .select({
      dimension: rankSnapshots.dimension,
      percentile: rankSnapshots.percentile,
      sampledAt: rankSnapshots.sampledAt,
    })
    .from(rankSnapshots)
    .where(eq(rankSnapshots.userId, userId))
    .orderBy(desc(rankSnapshots.sampledAt))
    .limit(50);

  if (rows.length === 0) return null;

  const latest: UserRankings = {};
  for (const row of rows) {
    const key = row.dimension as RankingDimension;
    if (latest[key] !== undefined) continue;
    latest[key] = Number(row.percentile);
  }
  return latest;
}

export function formatPercentileAsStanding(percentile: number): string {
  const topPct = Math.max(0, Math.round((1 - percentile) * 100));
  if (topPct <= 1) return "Top 1%";
  return `Top ${topPct}%`;
}
