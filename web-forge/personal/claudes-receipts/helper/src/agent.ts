import chokidar from "chokidar";
import {
  claudeProjectsDir,
  type HelperConfig,
} from "./config.js";
import {
  parseRecord,
  projectKeyFromPath,
  type IngestEvent,
} from "./parse.js";
import {
  computeSessionEnd,
  idleSessionIds,
  IDLE_TIMEOUT_MS,
  recordEventTimestamp,
  type SessionEndMetadata,
  type SessionTimeline,
} from "./session-tracker.js";
import {
  readCursor,
  readLinesUpToCursor,
  readNewLines,
  sessionIdFromPath,
  writeCursor,
} from "./tail.js";
import { enqueue, flushQueue, postBatch, type PostResult } from "./uploader.js";

const FLUSH_INTERVAL_MS = 15_000;

type Pending = {
  events: IngestEvent[];
  projectKey: string | null;
};

export async function runAgent(config: HelperConfig): Promise<void> {
  const watchRoot = claudeProjectsDir();
  console.log(`[helper] watching ${watchRoot}`);
  console.log(`[helper] ingest target ${config.endpoint}`);
  console.log(`[helper] surface ${config.surface}`);

  const pending = new Map<string, Pending>();
  const timelines = new Map<string, SessionTimeline>();
  const closedSessions = new Set<string>();
  let flushTimer: ReturnType<typeof setInterval> | null = null;

  const rebuildTimeline = async (filePath: string, sessionId: string, upToOffset: number) => {
    const historicLines = await readLinesUpToCursor(filePath, upToOffset);
    for (const line of historicLines) {
      let raw: Record<string, unknown>;
      try {
        raw = JSON.parse(line);
      } catch {
        continue;
      }
      const events = parseRecord(raw, sessionId);
      for (const event of events) {
        recordEventTimestamp(timelines, sessionId, event.timestamp);
      }
    }
  };

  const handleFile = async (filePath: string) => {
    if (!filePath.endsWith(".jsonl")) return;
    const sessionId = sessionIdFromPath(filePath);
    const cursor = readCursor(config, filePath);
    const { lines, nextOffset, mtimeMs } = await readNewLines(filePath, cursor.offset);

    // Stale-session recovery: if we've seen this file before (cursor.offset > 0),
    // it hasn't been modified in over the idle threshold, and we have no timeline
    // for it yet, rebuild the timeline from full history so the flush loop can
    // close it without waiting for new lines.
    const isStaleAtStartup =
      cursor.offset > 0 &&
      mtimeMs < Date.now() - IDLE_TIMEOUT_MS &&
      !timelines.has(sessionId) &&
      !closedSessions.has(sessionId);

    if (isStaleAtStartup) {
      console.log(`[helper] stale session detected at startup: ${sessionId}`);
      await rebuildTimeline(filePath, sessionId, cursor.offset);
    }

    if (lines.length === 0) return;

    if (closedSessions.has(sessionId)) closedSessions.delete(sessionId);

    const bucket =
      pending.get(sessionId) ??
      ({
        events: [],
        projectKey: projectKeyFromPath(filePath),
      } satisfies Pending);

    for (const line of lines) {
      let raw: Record<string, unknown>;
      try {
        raw = JSON.parse(line);
      } catch {
        continue;
      }
      const events = parseRecord(raw, sessionId);
      for (const event of events) {
        bucket.events.push(event);
        recordEventTimestamp(timelines, sessionId, event.timestamp);
      }
    }

    pending.set(sessionId, bucket);
    writeCursor(config, filePath, { offset: nextOffset });
  };

  const watcher = chokidar.watch(`${watchRoot}/**/*.jsonl`, {
    ignoreInitial: true,
    usePolling: true,
    interval: 1_000,
  });
  watcher.on("add", handleFile);
  watcher.on("change", handleFile);
  watcher.on("ready", () => {
    console.log("[helper] startup scan complete");
    void flush();
  });

  const handleAuthFailure = () => {
    console.error("");
    console.error("[helper] ─────────────────────────────────────────────────");
    console.error("[helper] CREDENTIAL FAILURE — ingest key rejected");
    console.error(`[helper] Endpoint: ${config.endpoint}`);
    console.error("[helper]");
    console.error("[helper] The device key may have been revoked or is invalid.");
    console.error("[helper] Queued events have been preserved for re-upload.");
    console.error("[helper]");
    console.error("[helper] To re-pair:");
    console.error(`[helper]   1. Sign in at ${config.endpoint}`);
    console.error("[helper]   2. Navigate to Devices and register a new device");
    console.error("[helper]   3. Run:  helper register \\");
    console.error(`[helper]        --endpoint ${config.endpoint} \\`);
    console.error("[helper]        --device-id <new-id> \\");
    console.error("[helper]        --ingest-key <new-key>");
    console.error("[helper]   4. Run:  helper run");
    console.error("[helper] ─────────────────────────────────────────────────");
    console.error("");
    if (flushTimer) clearInterval(flushTimer);
    process.exit(1);
  };

  const send = async (
    sessionId: string,
    bucket: Pending,
    sessionEnd?: SessionEndMetadata,
  ): Promise<PostResult> => {
    const payload = {
      sessionId,
      surface: config.surface,
      projectKey: bucket.projectKey,
      events: bucket.events,
      sessionEnd,
    };
    const result = await postBatch(config, payload);
    if (!result.ok && !result.authFailed) enqueue(config, payload);
    return result;
  };

  const flush = async () => {
    for (const [sessionId, bucket] of pending.entries()) {
      if (bucket.events.length === 0) {
        pending.delete(sessionId);
        continue;
      }
      const result = await send(sessionId, bucket);
      if (!result.ok && result.authFailed) {
        handleAuthFailure();
        return;
      }
      pending.delete(sessionId);
    }

    const now = Date.now();
    for (const sessionId of idleSessionIds(timelines, now)) {
      if (closedSessions.has(sessionId)) continue;
      const timeline = timelines.get(sessionId);
      if (!timeline) continue;
      const sessionEnd = computeSessionEnd(timeline);
      const endedEvent: IngestEvent = {
        eventId: `${sessionId}-session-ended`,
        eventType: "session_ended",
        sessionId,
        timestamp: sessionEnd.endedAt,
      };
      const result = await send(
        sessionId,
        { events: [endedEvent], projectKey: null },
        sessionEnd,
      );
      if (!result.ok && result.authFailed) {
        handleAuthFailure();
        return;
      }
      closedSessions.add(sessionId);
      timelines.delete(sessionId);
    }

    const queueResult = await flushQueue(config);
    if (queueResult.authFailed) {
      handleAuthFailure();
    }
  };

  flushTimer = setInterval(() => {
    void flush();
  }, FLUSH_INTERVAL_MS);

  process.on("SIGINT", async () => {
    console.log("[helper] stopping");
    await watcher.close();
    await flush();
    process.exit(0);
  });
}
