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
import {
  computeRankings,
  DIMENSION_LABELS,
  formatPercentileAsStanding,
  loadLatestRankings,
  type RankingDimension,
  type UserRankings,
} from "@/lib/rankings";
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

  const cachedRankings = await loadLatestRankings(userId);
  const rankings: UserRankings =
    cachedRankings && Object.keys(cachedRankings).length > 0
      ? cachedRankings
      : await computeRankings(userId);

  const rankingSummary = buildRankingSummary(rankings);

  return {
    hasRealData: true,
    overviewStats,
    highlights,
    rankingSummary,
  };
}

function buildRankingSummary(rankings: UserRankings): DashboardData["rankingSummary"] {
  const entries = Object.entries(rankings) as [RankingDimension, number][];
  if (entries.length === 0) return null;

  const sorted = [...entries].sort((a, b) => b[1] - a[1]);
  const headline = sorted[0];
  const percentile = formatPercentileAsStanding(headline[1]);

  return {
    percentile,
    summary: `Highest standing on ${DIMENSION_LABELS[headline[0]].toLowerCase()}.`,
    dimensions: sorted.slice(0, 4).map(([dim, pct]) => ({
      label: DIMENSION_LABELS[dim],
      value: formatPercentileAsStanding(pct),
    })),
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

export type ProjectCard = {
  id: string;
  name: string;
  status: string;
  summary: string;
  facts: DetailItem[];
};

export async function loadProjectCards(
  userId: string | null,
): Promise<ProjectCard[] | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const userSessions = await db.query.sessions.findMany({
    where: eq(sessions.userId, userId),
  });
  const projectRows = await db.query.projects.findMany({
    where: eq(projects.userId, userId),
  });
  if (projectRows.length === 0) return [];

  const burns = aggregateCostByProject(userSessions);
  const leader = burns[0];

  return projectRows
    .map<ProjectCard>((project) => {
      const burn =
        burns.find((b) => b.projectId === project.id) ??
        ({
          projectId: project.id,
          burnCents: 0,
          costPerActiveHourCents: 0,
          sessionCount: 0,
        } satisfies ProjectBurn);
      const isLeader = leader?.projectId === project.id;
      const status = project.archived
        ? "Archived"
        : isLeader
          ? "Highest Burn Project"
          : project.pinned
            ? "Pinned"
            : "Tracked";
      return {
        id: project.id,
        name: project.currentAlias ?? project.canonicalKey,
        status,
        summary: project.canonicalKey,
        facts: [
          { label: "30-day burn", value: formatCents(burn.burnCents) },
          { label: "Sessions", value: String(burn.sessionCount) },
          {
            label: "Cost per active hour",
            value: formatCents(burn.costPerActiveHourCents),
          },
          { label: "Canonical key", value: project.canonicalKey },
        ],
      };
    })
    .sort((a, b) => {
      const aCents = Number(a.facts[0].value.replace(/[^0-9.-]/g, "") || "0");
      const bCents = Number(b.facts[0].value.replace(/[^0-9.-]/g, "") || "0");
      return bCents - aCents;
    });
}

export type ToolCard = {
  name: string;
  category: string;
  summary: string;
  stats: DetailItem[];
};

export async function loadToolCards(
  userId: string | null,
): Promise<ToolCard[] | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const rows = await db
    .select({
      toolName: sessionEvents.toolName,
      total: sql<number>`count(*)`,
      successes: sql<number>`sum(case when ${sessionEvents.success} then 1 else 0 end)`,
      averageMs: sql<number>`coalesce(avg(${sessionEvents.durationMs}), 0)`,
      cost: sql<number>`coalesce(sum(${sessionEvents.estimatedCostCents}), 0)`,
    })
    .from(sessionEvents)
    .innerJoin(sessions, eq(sessions.id, sessionEvents.sessionId))
    .where(
      and(
        eq(sessions.userId, userId),
        eq(sessionEvents.eventType, "tool_completed"),
      ),
    )
    .groupBy(sessionEvents.toolName);

  if (rows.length === 0) return [];

  const totalCalls = rows.reduce((sum, row) => sum + Number(row.total), 0);

  return rows
    .map<ToolCard>((row) => {
      const total = Number(row.total);
      const successes = Number(row.successes);
      const successRate = total > 0 ? successes / total : 0;
      return {
        name: row.toolName ?? "unknown",
        category: classifyTool(row.toolName ?? ""),
        summary: `${total} calls observed across this account.`,
        stats: [
          { label: "Associated cost", value: formatCents(Number(row.cost)) },
          {
            label: "Usage share",
            value: formatPercent(totalCalls ? total / totalCalls : 0, 0),
          },
          { label: "Success rate", value: formatPercent(successRate, 0) },
          {
            label: "Average duration",
            value: `${Math.round(Number(row.averageMs))}ms`,
          },
        ],
      };
    })
    .sort((a, b) => {
      const aShare = Number(a.stats[1].value.replace("%", ""));
      const bShare = Number(b.stats[1].value.replace("%", ""));
      return bShare - aShare;
    });
}

export type DeviceCard = {
  id: string;
  name: string;
  surfaceMix: string;
  summary: string;
  facts: DetailItem[];
};

export async function loadDeviceCards(
  userId: string | null,
): Promise<DeviceCard[] | null> {
  const db = getDb();
  if (!db || !userId) return null;

  const userSessions = await db.query.sessions.findMany({
    where: eq(sessions.userId, userId),
  });
  const deviceRows = await db.query.devices.findMany({
    where: eq(devices.userId, userId),
  });
  if (deviceRows.length === 0) return [];

  const mix = machineIntensity(userSessions);
  const totalBurn = userSessions.reduce(
    (sum, session) => sum + session.estimatedCostCents,
    0,
  );

  return deviceRows
    .map<DeviceCard>((device) => {
      const bucket =
        mix.find((m) => m.deviceId === device.id) ??
        ({
          deviceId: device.id,
          costCents: 0,
          activeSeconds: 0,
          intensityCentsPerHour: 0,
        } satisfies MachineIntensity);
      const deviceSessions = userSessions.filter(
        (s) => s.deviceId === device.id,
      );
      const remoteCount = deviceSessions.filter((s) => s.remoteControlled).length;
      return {
        id: device.id,
        name: device.nickname,
        surfaceMix: device.platform,
        summary: device.lastSeenAt
          ? `Last seen ${device.lastSeenAt.toISOString().slice(0, 10)}.`
          : "No telemetry ingested yet.",
        facts: [
          { label: "Sessions", value: String(deviceSessions.length) },
          {
            label: "Share of burn",
            value: formatPercent(
              totalBurn > 0 ? bucket.costCents / totalBurn : 0,
              0,
            ),
          },
          { label: "Remote-controlled", value: `${remoteCount} sessions` },
          {
            label: "Intensity",
            value: `${formatCents(bucket.intensityCentsPerHour)}/h active`,
          },
        ],
      };
    })
    .sort(
      (a, b) =>
        Number(b.facts[1].value.replace("%", "")) -
        Number(a.facts[1].value.replace("%", "")),
    );
}

function classifyTool(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("shell") || lower.includes("bash") || lower.includes("run"))
    return "Execution";
  if (lower.includes("edit") || lower.includes("patch") || lower.includes("write"))
    return "Editing";
  if (lower.includes("read") || lower.includes("grep") || lower.includes("glob"))
    return "Discovery";
  if (lower.includes("build") || lower.includes("lint") || lower.includes("test"))
    return "Validation";
  return "Other";
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
