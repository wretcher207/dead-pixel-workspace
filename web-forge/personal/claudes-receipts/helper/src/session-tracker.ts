export type SessionTimeline = {
  firstEventAt: number;
  lastEventAt: number;
  eventTimestamps: number[];
};

export type SessionEndMetadata = {
  endedAt: string;
  durationSeconds: number;
  activeSeconds: number;
  idleSeconds: number;
};

export const IDLE_TIMEOUT_MS = 15 * 60 * 1000;
export const ACTIVE_GAP_MS = 2 * 60 * 1000;

export function recordEventTimestamp(
  timelines: Map<string, SessionTimeline>,
  sessionId: string,
  isoTimestamp: string,
): void {
  const ms = Date.parse(isoTimestamp);
  if (Number.isNaN(ms)) return;
  const existing = timelines.get(sessionId);
  if (existing) {
    existing.eventTimestamps.push(ms);
    if (ms < existing.firstEventAt) existing.firstEventAt = ms;
    if (ms > existing.lastEventAt) existing.lastEventAt = ms;
    return;
  }
  timelines.set(sessionId, {
    firstEventAt: ms,
    lastEventAt: ms,
    eventTimestamps: [ms],
  });
}

export function computeSessionEnd(
  timeline: SessionTimeline,
): SessionEndMetadata {
  const durationMs = timeline.lastEventAt - timeline.firstEventAt;
  const durationSeconds = Math.max(0, Math.round(durationMs / 1000));

  let activeMs = 0;
  const sorted = [...timeline.eventTimestamps].sort((a, b) => a - b);
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const gap = sorted[i + 1] - sorted[i];
    if (gap <= ACTIVE_GAP_MS) activeMs += gap;
  }

  const activeSeconds = Math.round(activeMs / 1000);
  const idleSeconds = Math.max(0, durationSeconds - activeSeconds);

  return {
    endedAt: new Date(timeline.lastEventAt).toISOString(),
    durationSeconds,
    activeSeconds,
    idleSeconds,
  };
}

export function idleSessionIds(
  timelines: Map<string, SessionTimeline>,
  now: number,
  timeoutMs: number = IDLE_TIMEOUT_MS,
): string[] {
  const ids: string[] = [];
  for (const [sessionId, timeline] of timelines.entries()) {
    if (now - timeline.lastEventAt >= timeoutMs) ids.push(sessionId);
  }
  return ids;
}
