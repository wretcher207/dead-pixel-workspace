import type {
  apiErrors,
  sessions,
  sessionEvents,
  toolDecisions,
  toolResults,
} from "@/db/schema";

type SessionRow = typeof sessions.$inferSelect;
type SessionEventRow = typeof sessionEvents.$inferSelect;
type ToolResultRow = typeof toolResults.$inferSelect;
type ToolDecisionRow = typeof toolDecisions.$inferSelect;
type ApiErrorRow = typeof apiErrors.$inferSelect;

export type ModelFamily = "opus" | "sonnet" | "haiku";

export type ModelPricing = {
  inputPerMillionCents: number;
  outputPerMillionCents: number;
  cacheReadPerMillionCents: number;
  cacheWritePerMillionCents: number;
};

export const MODEL_PRICING: Record<ModelFamily, ModelPricing> = {
  opus: {
    inputPerMillionCents: 1500,
    outputPerMillionCents: 7500,
    cacheReadPerMillionCents: 150,
    cacheWritePerMillionCents: 1875,
  },
  sonnet: {
    inputPerMillionCents: 300,
    outputPerMillionCents: 1500,
    cacheReadPerMillionCents: 30,
    cacheWritePerMillionCents: 375,
  },
  haiku: {
    inputPerMillionCents: 80,
    outputPerMillionCents: 400,
    cacheReadPerMillionCents: 8,
    cacheWritePerMillionCents: 100,
  },
};

export function resolveModelFamily(modelSummary: string | null | undefined): ModelFamily {
  const normalized = (modelSummary ?? "").toLowerCase();
  if (normalized.includes("opus")) return "opus";
  if (normalized.includes("haiku")) return "haiku";
  return "sonnet";
}

export type TokenLoad = {
  inputTokens: number;
  outputTokens: number;
  cacheTokens: number;
};

export function estimateCostCents(tokens: TokenLoad, family: ModelFamily): number {
  const pricing = MODEL_PRICING[family];
  const value =
    (tokens.inputTokens * pricing.inputPerMillionCents) / 1_000_000 +
    (tokens.outputTokens * pricing.outputPerMillionCents) / 1_000_000 +
    (tokens.cacheTokens * pricing.cacheReadPerMillionCents) / 1_000_000;
  return Math.round(value);
}

export type SessionMetricsInput = {
  session: SessionRow;
  events?: SessionEventRow[];
  tools?: ToolResultRow[];
  decisions?: ToolDecisionRow[];
  errors?: ApiErrorRow[];
};

export type SessionMetrics = {
  apiEquivalentCostCents: number;
  idleRatio: number;
  retrySpiralScore: number;
  toolDependencyIndex: number;
  sessionQualityScore: number;
  qualityLabel: QualityLabel;
  acceptanceRate: number | null;
  errorCount: number;
  toolCount: number;
};

export type QualityLabel =
  | "Surgical"
  | "Acceptable"
  | "Expensive Wandering"
  | "Committed Beyond Reason"
  | "You Stayed With This";

export function qualityLabelFor(score: number, idleRatio: number): QualityLabel {
  if (score >= 85) return "Surgical";
  if (score >= 65) return "Acceptable";
  if (idleRatio >= 0.5) return "You Stayed With This";
  if (score >= 35) return "Expensive Wandering";
  return "Committed Beyond Reason";
}

const SESSION_EVENT_TYPES = {
  prompt: "prompt_submitted",
  request: "api_request_completed",
  error: "api_error",
  toolCompleted: "tool_completed",
  decisionAccepted: "tool_decision_accepted",
  decisionRejected: "tool_decision_rejected",
} as const;

export function computeSessionMetrics(input: SessionMetricsInput): SessionMetrics {
  const { session } = input;
  const events = input.events ?? [];
  const tools = input.tools ?? [];
  const decisions = input.decisions ?? [];
  const errors = input.errors ?? [];

  const family = resolveModelFamily(session.modelSummary);
  const apiEquivalentCostCents =
    session.estimatedCostCents > 0
      ? session.estimatedCostCents
      : estimateCostCents(
          {
            inputTokens: session.inputTokens,
            outputTokens: session.outputTokens,
            cacheTokens: session.cacheTokens,
          },
          family,
        );

  const active = session.activeSeconds ?? 0;
  const idle = session.idleSeconds ?? 0;
  const idleRatio = active + idle > 0 ? idle / (active + idle) : 0;

  const promptCount =
    events.filter((event) => event.eventType === SESSION_EVENT_TYPES.prompt).length || 1;
  const requestCount = events.filter(
    (event) => event.eventType === SESSION_EVENT_TYPES.request,
  ).length;
  const retries = Math.max(0, requestCount - promptCount);
  const retrySpiralScore = promptCount > 0 ? retries / promptCount : 0;

  const toolCount = tools.length || events.filter(
    (event) => event.eventType === SESSION_EVENT_TYPES.toolCompleted,
  ).length;
  const toolDependencyIndex = promptCount > 0 ? toolCount / promptCount : 0;

  const accepted = decisions.filter((d) => d.decision === "accepted").length;
  const rejected = decisions.filter((d) => d.decision === "rejected").length;
  const totalDecisions = accepted + rejected;
  const acceptanceRate = totalDecisions > 0 ? accepted / totalDecisions : null;

  const errorCount = errors.length || events.filter(
    (event) => event.eventType === SESSION_EVENT_TYPES.error,
  ).length;

  const qualityPenalty = Math.min(1, (retries + errorCount) / Math.max(1, promptCount));
  const qualityBoost = acceptanceRate ?? 0.5;
  const rawQuality = 100 * (0.6 * qualityBoost + 0.4 * (1 - qualityPenalty));
  const sessionQualityScore = Math.max(0, Math.min(100, Math.round(rawQuality)));
  const qualityLabel = qualityLabelFor(sessionQualityScore, idleRatio);

  return {
    apiEquivalentCostCents,
    idleRatio,
    retrySpiralScore,
    toolDependencyIndex,
    sessionQualityScore,
    qualityLabel,
    acceptanceRate,
    errorCount,
    toolCount,
  };
}

export type AggregateInput = {
  sessions: SessionRow[];
  activeSeconds?: number;
  subscriptionMonthlyCents?: number;
};

export type ProjectBurn = {
  projectId: string | null;
  burnCents: number;
  costPerActiveHourCents: number;
  sessionCount: number;
};

export function aggregateCostByProject(
  sessions: SessionRow[],
): ProjectBurn[] {
  const rollup = new Map<string | null, ProjectBurn>();
  for (const session of sessions) {
    const key = session.projectId;
    const bucket =
      rollup.get(key) ??
      ({
        projectId: key,
        burnCents: 0,
        costPerActiveHourCents: 0,
        sessionCount: 0,
      } satisfies ProjectBurn);
    bucket.burnCents += session.estimatedCostCents;
    bucket.sessionCount += 1;
    rollup.set(key, bucket);
  }
  for (const bucket of rollup.values()) {
    const activeHours =
      sessions
        .filter((s) => s.projectId === bucket.projectId)
        .reduce((sum, s) => sum + (s.activeSeconds ?? 0), 0) / 3600;
    bucket.costPerActiveHourCents =
      activeHours > 0 ? Math.round(bucket.burnCents / activeHours) : 0;
  }
  return [...rollup.values()].sort((a, b) => b.burnCents - a.burnCents);
}

export type MachineIntensity = {
  deviceId: string | null;
  costCents: number;
  activeSeconds: number;
  intensityCentsPerHour: number;
};

export function machineIntensity(sessions: SessionRow[]): MachineIntensity[] {
  const rollup = new Map<string | null, MachineIntensity>();
  for (const session of sessions) {
    const key = session.deviceId;
    const bucket =
      rollup.get(key) ??
      ({
        deviceId: key,
        costCents: 0,
        activeSeconds: 0,
        intensityCentsPerHour: 0,
      } satisfies MachineIntensity);
    bucket.costCents += session.estimatedCostCents;
    bucket.activeSeconds += session.activeSeconds ?? 0;
    rollup.set(key, bucket);
  }
  for (const bucket of rollup.values()) {
    const hours = bucket.activeSeconds / 3600;
    bucket.intensityCentsPerHour = hours > 0 ? Math.round(bucket.costCents / hours) : 0;
  }
  return [...rollup.values()].sort(
    (a, b) => b.intensityCentsPerHour - a.intensityCentsPerHour,
  );
}

export function subscriptionValueDelta(
  totalApiEquivalentCents: number,
  subscriptionMonthlyCents: number,
): number {
  if (subscriptionMonthlyCents <= 0) return 0;
  return (
    (totalApiEquivalentCents - subscriptionMonthlyCents) / subscriptionMonthlyCents
  );
}

export function formatCents(cents: number): string {
  const dollars = cents / 100;
  if (Math.abs(dollars) >= 1000) {
    return `$${(dollars / 1000).toFixed(1)}k`;
  }
  return `$${dollars.toFixed(dollars < 10 ? 2 : 0)}`;
}

export function formatPercent(ratio: number, digits = 1): string {
  return `${(ratio * 100).toFixed(digits)}%`;
}
