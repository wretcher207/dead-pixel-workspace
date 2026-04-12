import { and, desc, eq, gte, sql } from "drizzle-orm";
import {
  apiErrors,
  devices,
  projects,
  sessionEvents,
  sessions,
  toolDecisions,
  toolResults,
} from "@/db/schema";
import { getDb } from "@/lib/db";
import {
  aggregateCostByProject,
  computeSessionMetrics,
  formatCents,
  formatPercent,
  machineIntensity,
  qualityLabelFor,
  subscriptionValueDelta,
  type MachineIntensity,
  type ProjectBurn,
} from "@/lib/metrics";
import type {
  DashboardPanel,
  DetailItem,
  HeaderStat,
  SessionRecord,
} from "@/lib/types";

const DAY_MS = 86_400_000;
const SUBSCRIPTION_MONTHLY_CENTS = 20_00;

type SessionRow = typeof sessions.$inferSelect;

export type DashboardData = {
  hasRealData: boolean;
  overviewStats: HeaderStat[];
  highlights: DashboardPanel[];
  rankingSummary: {
    percentile: string;
    summary: string;
    dimensions: DetailItem[];
  } | null;
};

export async function loadDashboardData(
  userId: string | null,
): Promise<DashboardData | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const thirtyDaysAgo = new Date(Date.now() - 30 * DAY_MS);
  const sevenDaysAgo = new Date(Date.now() - 7 * DAY_MS);

  const userSessions = await db.query.sessions.findMany({
    where: and(
      eq(sessions.userId, userId),
      gte(sessions.startedAt, thirtyDaysAgo),
    ),
    orderBy: [desc(sessions.startedAt)],
  });

  if (userSessions.length === 0) {
    return {
      hasRealData: false,
      overviewStats: [],
      highlights: [],
      rankingSummary: null,
    };
  }

  const weekSessions = userSessions.filter(
    (session) => session.startedAt >= sevenDaysAgo,
  );

  const lifetimeTotals = await db
    .select({
      inputTokens: sql<number>`coalesce(sum(${sessions.inputTokens}), 0)`,
      outputTokens: sql<number>`coalesce(sum(${sessions.outputTokens}), 0)`,
      cacheTokens: sql<number>`coalesce(sum(${sessions.cacheTokens}), 0)`,
      costCents: sql<number>`coalesce(sum(${sessions.estimatedCostCents}), 0)`,
    })
    .from(sessions)
    .where(eq(sessions.userId, userId));

  const lifetime = lifetimeTotals[0] ?? {
    inputTokens: 0,
    outputTokens: 0,
    cacheTokens: 0,
    costCents: 0,
  };

  const thirtyDayCostCents = userSessions.reduce(
    (sum, session) => sum + session.estimatedCostCents,
    0,
  );
  const subscriptionDelta = subscriptionValueDelta(
    thirtyDayCostCents,
    SUBSCRIPTION_MONTHLY_CENTS,
  );

  const projectBurns = aggregateCostByProject(userSessions);
  const machineMix = machineIntensity(userSessions);
  const topSession = userSessions.reduce<SessionRow | null>((best, session) => {
    if (!best) return session;
    return session.estimatedCostCents > best.estimatedCostCents ? session : best;
  }, null);

  const topProject = projectBurns[0];
  const topProjectRow = topProject?.projectId
    ? await db.query.projects.findFirst({
        where: eq(projects.id, topProject.projectId),
      })
    : null;

  const toolUsage = await db
    .select({
      toolCount: sql<number>`count(*)`,
      sessionCount: sql<number>`count(distinct ${sessionEvents.sessionId})`,
    })
    .from(sessionEvents)
    .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
    .where(
      and(
        eq(sessions.userId, userId),
        gte(sessionEvents.occurredAt, thirtyDaysAgo),
        eq(sessionEvents.eventType, "tool_completed"),
      ),
    );

  const overviewStats: HeaderStat[] = [
    {
      label: "Lifetime Damage",
      value: formatTokens(
        Number(lifetime.inputTokens) +
          Number(lifetime.outputTokens) +
          Number(lifetime.cacheTokens),
      ),
      detail: "tokens observed across local and remote-controlled sessions",
    },
    {
      label: "30-Day Burn",
      value: formatCents(thirtyDayCostCents),
      detail: "API-equivalent estimate, which is the only honest comparison",
    },
    {
      label: "Weekly Sessions",
      value: String(weekSessions.length),
      detail: `${weekSessions.length ? formatCents(
        weekSessions.reduce((s, x) => s + x.estimatedCostCents, 0),
      ) : "$0"} across the last seven days`,
    },
  ];

  const highlights: DashboardPanel[] = [];

  if (topSession) {
    const sessionMetrics = computeSessionMetrics({ session: topSession });
    highlights.push({
      label: "This Week's Damage",
      title: topSession.modelSummary ?? "Top session this week",
      summary: qualityLabelFor(
        sessionMetrics.sessionQualityScore,
        sessionMetrics.idleRatio,
      ),
      value: formatCents(topSession.estimatedCostCents),
      detail: `${formatDuration(topSession.durationSeconds)}, ${formatTokens(
        topSession.inputTokens + topSession.outputTokens,
      )} tokens`,
      href: `/sessions/${topSession.id}`,
    });
  }

  if (topProject) {
    highlights.push({
      label: "Highest Burn Project",
      title: topProjectRow?.currentAlias ?? topProjectRow?.canonicalKey ?? "Unnamed project",
      summary: `${topProject.sessionCount} sessions in the last 30 days.`,
      value: formatCents(topProject.burnCents),
      detail: `${formatCents(topProject.costPerActiveHourCents)} per active hour`,
      href: "/projects",
    });
  }

  if (toolUsage[0]?.sessionCount) {
    const toolSessions = Number(toolUsage[0].sessionCount);
    const coveragePct = toolSessions / userSessions.length;
    highlights.push({
      label: "Tool Dependency Report",
      title: "Tool-driven sessions",
      summary: "Share of 30-day sessions that logged at least one tool_completed event.",
      value: formatPercent(coveragePct, 0),
      detail: `${toolUsage[0].toolCount} tool completions tracked`,
      href: "/tools",
    });
  }

  const topMachine: MachineIntensity | undefined = machineMix[0];
  if (topMachine?.deviceId) {
    const deviceRow = await db.query.devices.findFirst({
      where: eq(devices.id, topMachine.deviceId),
    });
    highlights.push({
      label: "Device Mix",
      title: deviceRow?.nickname ?? "Primary machine",
      summary: `${formatCents(topMachine.intensityCentsPerHour)} of burn per active hour.`,
      value: formatCents(topMachine.costCents),
      detail: `${Math.round(topMachine.activeSeconds / 60)} active minutes in the last 30 days`,
      href: "/devices",
    });
  }

  highlights.push({
    label: "Subscription Delusion Delta",
    title: subscriptionDelta >= 0 ? "Still positive." : "Underusing the subscription.",
    summary:
      "Notional API bill compared against a $20/month subscription baseline. Edit the baseline later.",
    value: `${subscriptionDelta >= 0 ? "+" : ""}${formatCents(
      thirtyDayCostCents - SUBSCRIPTION_MONTHLY_CENTS,
    )}`,
    detail: `${formatPercent(subscriptionDelta, 1)} vs subscription`,
    href: "/share",
  });

  const mostExpensiveDay = mostExpensiveDayFor(userSessions);
  if (mostExpensiveDay) {
    highlights.push({
      label: "Most Expensive Day",
      title: mostExpensiveDay.label,
      summary: "One day carried the bulk of the 30-day total.",
      value: formatCents(mostExpensiveDay.costCents),
      detail: `${mostExpensiveDay.sessionCount} sessions`,
      href: "/sessions",
    });
  }

  return {
    hasRealData: true,
    overviewStats,
    highlights,
    rankingSummary: null,
  };
}

export async function loadSessionsIndex(
  userId: string | null,
): Promise<SessionRecord[] | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const rows = await db.query.sessions.findMany({
    where: eq(sessions.userId, userId),
    orderBy: [desc(sessions.startedAt)],
    limit: 100,
  });

  if (rows.length === 0) return [];

  const projectRows = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  });
  const projectById = new Map(projectRows.map((p) => [p.id, p]));

  const deviceRows = await db.query.devices.findMany({
    where: eq(devices.userId, userId),
  });
  const deviceById = new Map(deviceRows.map((d) => [d.id, d]));

  return rows.map((session) => {
    const metrics = computeSessionMetrics({ session });
    const project = session.projectId ? projectById.get(session.projectId) : null;
    const device = session.deviceId ? deviceById.get(session.deviceId) : null;

    return {
      id: session.id,
      name: session.modelSummary ?? `Session ${session.id.slice(0, 8)}`,
      project: project?.currentAlias ?? project?.canonicalKey ?? "—",
      surface: session.surface,
      device: device?.nickname ?? "—",
      duration: formatDuration(session.durationSeconds),
      costLabel: formatCents(session.estimatedCostCents),
      retryLabel: `${Math.round(metrics.retrySpiralScore * 100) / 100} retry/prompt`,
      summary: metrics.qualityLabel,
      headerStats: [
        {
          label: "Estimated Cost",
          value: formatCents(session.estimatedCostCents),
          detail: `${formatTokens(
            session.inputTokens + session.outputTokens,
          )} total tokens`,
        },
        {
          label: "Quality",
          value: `${metrics.sessionQualityScore}/100`,
          detail: metrics.qualityLabel,
        },
        {
          label: "Machine",
          value: device?.nickname ?? "—",
          detail: device?.platform ?? "",
        },
      ],
      detailMetrics: [
        {
          label: "Project",
          value: project?.currentAlias ?? project?.canonicalKey ?? "—",
          detail: project?.pinned ? "Pinned" : "",
        },
        { label: "Surface", value: session.surface, detail: "" },
        { label: "Idle Ratio", value: formatPercent(metrics.idleRatio, 0), detail: "" },
        {
          label: "Errors",
          value: String(metrics.errorCount),
          detail: metrics.errorCount === 0 ? "clean session" : "recovered in-session",
        },
      ],
      timeline: [],
      signals: [
        { label: "Input tokens", value: formatTokens(session.inputTokens) },
        { label: "Output tokens", value: formatTokens(session.outputTokens) },
        { label: "Cache tokens", value: formatTokens(session.cacheTokens) },
        {
          label: "Retry spiral score",
          value: metrics.retrySpiralScore.toFixed(2),
        },
      ],
    } satisfies SessionRecord;
  });
}

export async function loadSessionDetail(
  userId: string | null,
  sessionId: string,
): Promise<SessionRecord | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const session = await db.query.sessions.findFirst({
    where: and(eq(sessions.userId, userId), eq(sessions.id, sessionId)),
  });
  if (!session) return null;

  const [eventRows, toolRows, decisionRows, errorRows] = await Promise.all([
    db.query.sessionEvents.findMany({
      where: eq(sessionEvents.sessionId, sessionId),
      orderBy: [sessionEvents.occurredAt],
    }),
    db.query.toolResults.findMany({
      where: eq(toolResults.sessionId, sessionId),
    }),
    db.query.toolDecisions.findMany({
      where: eq(toolDecisions.sessionId, sessionId),
    }),
    db.query.apiErrors.findMany({
      where: eq(apiErrors.sessionId, sessionId),
    }),
  ]);

  const metrics = computeSessionMetrics({
    session,
    events: eventRows,
    tools: toolRows,
    decisions: decisionRows,
    errors: errorRows,
  });

  const project = session.projectId
    ? await db.query.projects.findFirst({
        where: eq(projects.id, session.projectId),
      })
    : null;

  const device = session.deviceId
    ? await db.query.devices.findFirst({
        where: eq(devices.id, session.deviceId),
      })
    : null;

  return {
    id: session.id,
    name: session.modelSummary ?? `Session ${session.id.slice(0, 8)}`,
    project: project?.currentAlias ?? project?.canonicalKey ?? "—",
    surface: session.surface,
    device: device?.nickname ?? "—",
    duration: formatDuration(session.durationSeconds),
    costLabel: formatCents(session.estimatedCostCents),
    retryLabel: `${Math.round(metrics.retrySpiralScore * 100) / 100} retry/prompt`,
    summary: metrics.qualityLabel,
    headerStats: [
      {
        label: "Estimated Cost",
        value: formatCents(session.estimatedCostCents),
        detail: `${formatTokens(
          session.inputTokens + session.outputTokens,
        )} total tokens`,
      },
      {
        label: "Quality",
        value: `${metrics.sessionQualityScore}/100`,
        detail: metrics.qualityLabel,
      },
      {
        label: "Machine",
        value: device?.nickname ?? "—",
        detail: device?.platform ?? "",
      },
    ],
    detailMetrics: [
      {
        label: "Project alias",
        value: project?.currentAlias ?? project?.canonicalKey ?? "—",
        detail: project?.pinned ? "Pinned" : "",
      },
      { label: "Surface", value: session.surface, detail: "" },
      {
        label: "Idle Ratio",
        value: formatPercent(metrics.idleRatio, 0),
        detail: "",
      },
      {
        label: "Errors",
        value: String(metrics.errorCount),
        detail: metrics.errorCount === 0 ? "clean session" : "recovered in-session",
      },
    ],
    timeline: eventRows.slice(0, 12).map((event) => ({
      time: event.occurredAt.toISOString().slice(11, 16),
      title: event.eventType.replace(/_/g, " "),
      description:
        event.toolName ??
        (event.success === false ? "not successful" : "event recorded"),
    })),
    signals: [
      { label: "Input tokens", value: formatTokens(session.inputTokens) },
      { label: "Output tokens", value: formatTokens(session.outputTokens) },
      { label: "Cache tokens", value: formatTokens(session.cacheTokens) },
      {
        label: "Retry spiral score",
        value: metrics.retrySpiralScore.toFixed(2),
      },
      {
        label: "Tool dependency index",
        value: metrics.toolDependencyIndex.toFixed(2),
      },
    ],
  };
}

type ProjectOverview = {
  id: string;
  name: string;
  pinned: boolean;
  burn: ProjectBurn;
};

export async function loadProjectsOverview(
  userId: string | null,
): Promise<ProjectOverview[] | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const userSessions = await db.query.sessions.findMany({
    where: eq(sessions.userId, userId),
  });
  const projectRows = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  });

  const burns = aggregateCostByProject(userSessions);
  return projectRows
    .map<ProjectOverview>((project) => ({
      id: project.id,
      name: project.currentAlias ?? project.canonicalKey,
      pinned: project.pinned,
      burn:
        burns.find((b) => b.projectId === project.id) ??
        ({
          projectId: project.id,
          burnCents: 0,
          costPerActiveHourCents: 0,
          sessionCount: 0,
        } satisfies ProjectBurn),
    }))
    .sort((a, b) => b.burn.burnCents - a.burn.burnCents);
}

function mostExpensiveDayFor(
  sessions: SessionRow[],
): { label: string; costCents: number; sessionCount: number } | null {
  const byDay = new Map<string, { costCents: number; sessionCount: number }>();
  for (const session of sessions) {
    const key = session.startedAt.toISOString().slice(0, 10);
    const bucket = byDay.get(key) ?? { costCents: 0, sessionCount: 0 };
    bucket.costCents += session.estimatedCostCents;
    bucket.sessionCount += 1;
    byDay.set(key, bucket);
  }
  let winner: { label: string; costCents: number; sessionCount: number } | null = null;
  for (const [label, bucket] of byDay.entries()) {
    if (!winner || bucket.costCents > winner.costCents) {
      winner = { label, ...bucket };
    }
  }
  return winner;
}

function formatTokens(total: number): string {
  if (total >= 1_000_000) return `${(total / 1_000_000).toFixed(1)}M`;
  if (total >= 1_000) return `${(total / 1_000).toFixed(0)}k`;
  return String(total);
}

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}
