import { getServerSession } from "next-auth";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import {
  devices,
  projects,
  sessionEvents,
  sessions,
} from "@/db/schema";
import { authOptions } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MIN = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

function contextLimitFor(model: string | null): number {
  if (!model) return 200_000;
  const m = model.toLowerCase();
  // Opus 4.6 and Sonnet 4.6 ship 1M-context variants. Haiku caps at 200k.
  if (m.includes("opus-4") || m.includes("sonnet-4-6") || m.includes("sonnet-4-5"))
    return 1_000_000;
  return 200_000;
}

type PulseWindow = {
  tools: number;
  prompts: number;
  agents: number;
  errors: number;
  apiRequests: number;
  tokens: number;
  costCents: number;
};

type FeedItem = {
  id: string;
  occurredAt: string;
  eventType: string;
  toolName: string | null;
  success: boolean | null;
  durationMs: number | null;
  project: string | null;
  sessionId: string;
};

type RealtimePayload = {
  now: string;
  hasData: boolean;
  active: {
    sessionId: string;
    isLive: boolean;
    startedAt: string;
    endedAt: string | null;
    lastEventAt: string | null;
    secondsSinceLastEvent: number | null;
    project: string | null;
    device: string | null;
    model: string | null;
    inputTokens: number;
    outputTokens: number;
    cacheTokens: number;
    costCents: number;
    contextTokens: number;
    contextLimit: number;
    contextPct: number;
  } | null;
  pulse: {
    "60s": PulseWindow;
    "5m": PulseWindow;
    "1h": PulseWindow;
  };
  today: {
    sessions: number;
    tokens: number;
    costCents: number;
    activeMinutes: number;
  };
  compare: {
    todayCostCents: number;
    yesterdayCostCents: number;
    lastWeekCostCents: number;
  };
  topToolsHour: Array<{ tool: string; count: number }>;
  topAgentsHour: Array<{ agent: string; count: number }>;
  tokenSparkline: number[];
  feed: FeedItem[];
};

function emptyWindow(): PulseWindow {
  return {
    tools: 0,
    prompts: 0,
    agents: 0,
    errors: 0,
    apiRequests: 0,
    tokens: 0,
    costCents: 0,
  };
}

function emptyPayload(now: Date): RealtimePayload {
  return {
    now: now.toISOString(),
    hasData: false,
    active: null,
    pulse: { "60s": emptyWindow(), "5m": emptyWindow(), "1h": emptyWindow() },
    today: { sessions: 0, tokens: 0, costCents: 0, activeMinutes: 0 },
    compare: { todayCostCents: 0, yesterdayCostCents: 0, lastWeekCostCents: 0 },
    topToolsHour: [],
    topAgentsHour: [],
    tokenSparkline: new Array(60).fill(0),
    feed: [],
  };
}

export async function GET() {
  const now = new Date();
  try {
    return await handle(now);
  } catch (e) {
    const err = e as Error;
    return Response.json(
      {
        ...emptyPayload(now),
        error: {
          message: err.message,
          stack: err.stack?.split("\n").slice(0, 6).join("\n"),
        },
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

async function handle(now: Date) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const db = getDb();

  if (!db || !userId) {
    return Response.json(emptyPayload(now), {
      headers: { "Cache-Control": "no-store" },
    });
  }

  const hourAgo = new Date(now.getTime() - HOUR);
  const fiveMinAgo = new Date(now.getTime() - 5 * MIN);
  const minAgo = new Date(now.getTime() - MIN);
  const todayStart = new Date(now);
  todayStart.setUTCHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart.getTime() - DAY);
  const lastWeekStart = new Date(todayStart.getTime() - 7 * DAY);
  const lastWeekEnd = new Date(lastWeekStart.getTime() + DAY);

  const [
    activeRow,
    windowRows,
    todayRow,
    compareRows,
    topToolsRows,
    agentRows,
    sparklineRows,
    feedRows,
  ] = await Promise.all([
    // Most recent session within 12h (live OR recently ended).
    // Liveness is computed after we know last event time.
    db
      .select({
        id: sessions.id,
        startedAt: sessions.startedAt,
        endedAt: sessions.endedAt,
        projectId: sessions.projectId,
        deviceId: sessions.deviceId,
        model: sessions.modelSummary,
        inputTokens: sessions.inputTokens,
        outputTokens: sessions.outputTokens,
        cacheTokens: sessions.cacheTokens,
        costCents: sessions.estimatedCostCents,
      })
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessions.startedAt, new Date(now.getTime() - 12 * HOUR)),
        ),
      )
      .orderBy(desc(sessions.startedAt))
      .limit(1),

    // Pulse: events in last hour, bucket client-side by timestamp
    db
      .select({
        occurredAt: sessionEvents.occurredAt,
        eventType: sessionEvents.eventType,
        toolName: sessionEvents.toolName,
        success: sessionEvents.success,
        inputTokens: sessionEvents.inputTokens,
        outputTokens: sessionEvents.outputTokens,
        cacheTokens: sessionEvents.cacheTokens,
        costCents: sessionEvents.estimatedCostCents,
      })
      .from(sessionEvents)
      .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessionEvents.occurredAt, hourAgo),
        ),
      )
      .orderBy(desc(sessionEvents.occurredAt)),

    // Today totals
    db
      .select({
        sessions: sql<number>`count(distinct ${sessions.id})::int`,
        tokens: sql<number>`coalesce(sum(${sessions.inputTokens} + ${sessions.outputTokens} + ${sessions.cacheTokens}), 0)::bigint`,
        cost: sql<number>`coalesce(sum(${sessions.estimatedCostCents}), 0)::int`,
        activeSec: sql<number>`coalesce(sum(${sessions.activeSeconds}), 0)::int`,
      })
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessions.startedAt, todayStart),
        ),
      ),

    // Compare buckets: fetch rows, bucket in JS to avoid CASE param-type inference issues
    db
      .select({
        startedAt: sessions.startedAt,
        cost: sessions.estimatedCostCents,
      })
      .from(sessions)
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessions.startedAt, lastWeekStart),
        ),
      ),

    // Top tools in last hour (excluding Agent)
    db
      .select({
        tool: sessionEvents.toolName,
        count: sql<number>`count(*)::int`,
      })
      .from(sessionEvents)
      .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
      .where(
        and(
          eq(sessions.userId, userId),
          eq(sessionEvents.eventType, "tool_completed"),
          gte(sessionEvents.occurredAt, hourAgo),
          sql`${sessionEvents.toolName} is not null`,
          sql`${sessionEvents.toolName} <> 'Agent'`,
        ),
      )
      .groupBy(sessionEvents.toolName)
      .orderBy(sql`count(*) desc`)
      .limit(8),

    // Agent deployments in last hour (description from subagent_type if available — we only have toolName)
    db
      .select({
        agent: sessionEvents.toolName,
        count: sql<number>`count(*)::int`,
      })
      .from(sessionEvents)
      .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
      .where(
        and(
          eq(sessions.userId, userId),
          eq(sessionEvents.eventType, "tool_completed"),
          eq(sessionEvents.toolName, "Agent"),
          gte(sessionEvents.occurredAt, new Date(now.getTime() - DAY)),
        ),
      )
      .groupBy(sessionEvents.toolName)
      .orderBy(sql`count(*) desc`)
      .limit(6),

    // Token-per-minute sparkline (last 60 min)
    db
      .select({
        bucket: sql<string>`to_char(date_trunc('minute', ${sessionEvents.occurredAt}), 'YYYY-MM-DD"T"HH24:MI')`,
        tokens: sql<number>`coalesce(sum(coalesce(${sessionEvents.inputTokens},0) + coalesce(${sessionEvents.outputTokens},0) + coalesce(${sessionEvents.cacheTokens},0)), 0)::bigint`,
      })
      .from(sessionEvents)
      .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessionEvents.occurredAt, hourAgo),
        ),
      )
      .groupBy(sql`1`),

    // Live feed: last 20 events
    db
      .select({
        id: sessionEvents.id,
        occurredAt: sessionEvents.occurredAt,
        eventType: sessionEvents.eventType,
        toolName: sessionEvents.toolName,
        success: sessionEvents.success,
        durationMs: sessionEvents.durationMs,
        sessionId: sessionEvents.sessionId,
        projectAlias: projects.currentAlias,
        projectKey: projects.canonicalKey,
      })
      .from(sessionEvents)
      .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
      .leftJoin(projects, eq(projects.id, sessions.projectId))
      .where(
        and(
          eq(sessions.userId, userId),
          gte(sessionEvents.occurredAt, hourAgo),
        ),
      )
      .orderBy(desc(sessionEvents.occurredAt))
      .limit(20),
  ]);

  // Resolve active session project/device + latest input_tokens for context estimate
  let active: RealtimePayload["active"] = null;
  const activeCandidate = activeRow[0];
  if (activeCandidate) {
    const [lastEvent, projectRow, deviceRow] = await Promise.all([
      db
        .select({
          occurredAt: sessionEvents.occurredAt,
          inputTokens: sessionEvents.inputTokens,
        })
        .from(sessionEvents)
        .where(eq(sessionEvents.sessionId, activeCandidate.id))
        .orderBy(desc(sessionEvents.occurredAt))
        .limit(1),
      activeCandidate.projectId
        ? db.query.projects.findFirst({ where: eq(projects.id, activeCandidate.projectId) })
        : Promise.resolve(null),
      activeCandidate.deviceId
        ? db.query.devices.findFirst({ where: eq(devices.id, activeCandidate.deviceId) })
        : Promise.resolve(null),
    ]);

    const lastEventAt = lastEvent[0]?.occurredAt ?? null;
    const staleSeconds = lastEventAt
      ? Math.floor((now.getTime() - lastEventAt.getTime()) / 1000)
      : null;
    const isLive = !!lastEventAt && lastEventAt >= fiveMinAgo;

    // Always populate the active panel — even when idle — so the dashboard
    // preserves the last-known state (tokens, cost, context %) instead of
    // hiding everything the moment events stop flowing.
    const contextPeak = await db
      .select({
        peak: sql<number>`coalesce(max(coalesce(${sessionEvents.inputTokens},0) + coalesce(${sessionEvents.cacheTokens},0)), 0)::int`,
      })
      .from(sessionEvents)
      .where(
        and(
          eq(sessionEvents.sessionId, activeCandidate.id),
          eq(sessionEvents.eventType, "api_request_completed"),
        ),
      );

    const contextTokens = contextPeak[0]?.peak ?? 0;
    const contextLimit = contextLimitFor(activeCandidate.model);

    {
      active = {
        sessionId: activeCandidate.id,
        isLive,
        startedAt: activeCandidate.startedAt.toISOString(),
        endedAt: activeCandidate.endedAt
          ? activeCandidate.endedAt.toISOString()
          : null,
        lastEventAt: lastEventAt ? lastEventAt.toISOString() : null,
        secondsSinceLastEvent: staleSeconds,
        project:
          projectRow?.currentAlias ?? projectRow?.canonicalKey ?? null,
        device: deviceRow?.nickname ?? null,
        model: activeCandidate.model,
        inputTokens: Number(activeCandidate.inputTokens),
        outputTokens: Number(activeCandidate.outputTokens),
        cacheTokens: Number(activeCandidate.cacheTokens),
        costCents: activeCandidate.costCents,
        contextTokens: Number(contextTokens),
        contextLimit,
        contextPct: Math.min(1, Number(contextTokens) / contextLimit),
      };
    }
  }

  // Bucket pulse windows
  const pulse = {
    "60s": emptyWindow(),
    "5m": emptyWindow(),
    "1h": emptyWindow(),
  };
  for (const ev of windowRows) {
    const ts = ev.occurredAt.getTime();
    const tokens =
      (ev.inputTokens ?? 0) + (ev.outputTokens ?? 0) + (ev.cacheTokens ?? 0);
    const cost = ev.costCents ?? 0;
    const buckets: (keyof typeof pulse)[] = ["1h"];
    if (ts >= fiveMinAgo.getTime()) buckets.push("5m");
    if (ts >= minAgo.getTime()) buckets.push("60s");
    for (const b of buckets) {
      const w = pulse[b];
      if (ev.eventType === "tool_completed") {
        w.tools += 1;
        if (ev.toolName === "Agent") w.agents += 1;
      } else if (ev.eventType === "prompt_submitted") {
        w.prompts += 1;
      } else if (ev.eventType === "api_error") {
        w.errors += 1;
      } else if (ev.eventType === "api_request_completed") {
        w.apiRequests += 1;
      }
      w.tokens += tokens;
      w.costCents += cost;
    }
  }

  const today = todayRow[0] ?? {
    sessions: 0,
    tokens: 0,
    cost: 0,
    activeSec: 0,
  };

  const compareMap = new Map<string, number>([
    ["today", 0],
    ["yesterday", 0],
    ["lastweek", 0],
  ]);
  for (const row of compareRows) {
    const t = row.startedAt.getTime();
    const cost = Number(row.cost);
    if (t >= todayStart.getTime()) {
      compareMap.set("today", (compareMap.get("today") ?? 0) + cost);
    } else if (t >= yesterdayStart.getTime() && t < todayStart.getTime()) {
      compareMap.set("yesterday", (compareMap.get("yesterday") ?? 0) + cost);
    } else if (t >= lastWeekStart.getTime() && t < lastWeekEnd.getTime()) {
      compareMap.set("lastweek", (compareMap.get("lastweek") ?? 0) + cost);
    }
  }

  // Sparkline: 60 minute buckets, oldest -> newest
  const sparkline = new Array(60).fill(0);
  for (const row of sparklineRows) {
    const bucketTs = new Date(row.bucket + "Z").getTime();
    const ageMin = Math.floor((now.getTime() - bucketTs) / MIN);
    const idx = 59 - ageMin;
    if (idx >= 0 && idx < 60) sparkline[idx] = Number(row.tokens);
  }

  const feed: FeedItem[] = feedRows.map((r) => ({
    id: r.id,
    occurredAt: r.occurredAt.toISOString(),
    eventType: r.eventType,
    toolName: r.toolName,
    success: r.success,
    durationMs: r.durationMs,
    project: r.projectAlias ?? r.projectKey ?? null,
    sessionId: r.sessionId,
  }));

  const payload: RealtimePayload = {
    now: now.toISOString(),
    hasData: true,
    active,
    pulse,
    today: {
      sessions: Number(today.sessions),
      tokens: Number(today.tokens),
      costCents: Number(today.cost),
      activeMinutes: Math.round(Number(today.activeSec) / 60),
    },
    compare: {
      todayCostCents: compareMap.get("today") ?? 0,
      yesterdayCostCents: compareMap.get("yesterday") ?? 0,
      lastWeekCostCents: compareMap.get("lastweek") ?? 0,
    },
    topToolsHour: topToolsRows
      .filter((r) => r.tool)
      .map((r) => ({ tool: r.tool as string, count: Number(r.count) })),
    topAgentsHour: agentRows.map((r) => ({
      agent: (r.agent as string) ?? "Agent",
      count: Number(r.count),
    })),
    tokenSparkline: sparkline,
    feed,
  };

  return Response.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}
