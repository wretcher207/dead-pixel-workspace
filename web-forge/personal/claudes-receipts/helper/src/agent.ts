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
  recordEventTimestamp,
  type SessionEndMetadata,
  type SessionTimeline,
} from "./session-tracker.js";
import {
  readCursor,
  readNewLines,
  sessionIdFromPath,
  writeCursor,
} from "./tail.js";
import { enqueue, flushQueue, postBatch } from "./uploader.js";

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

  const handleFile = async (filePath: string) => {
    if (!filePath.endsWith(".jsonl")) return;
    const sessionId = sessionIdFromPath(filePath);
    const cursor = readCursor(config, filePath);
    const { lines, nextOffset } = await readNewLines(filePath, cursor.offset);
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
    ignoreInitial: false,
    awaitWriteFinish: { stabilityThreshold: 500, pollInterval: 100 },
  });
  watcher.on("add", handleFile);
  watcher.on("change", handleFile);

  const send = async (
    sessionId: string,
    bucket: Pending,
    sessionEnd?: SessionEndMetadata,
  ) => {
    const payload = {
      sessionId,
      surface: config.surface,
      projectKey: bucket.projectKey,
      events: bucket.events,
      sessionEnd,
    };
    const ok = await postBatch(config, payload);
    if (!ok) enqueue(config, payload);
  };

  const flush = async () => {
    for (const [sessionId, bucket] of pending.entries()) {
      if (bucket.events.length === 0) {
        pending.delete(sessionId);
        continue;
      }
      await send(sessionId, bucket);
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
      await send(
        sessionId,
        { events: [endedEvent], projectKey: null },
        sessionEnd,
      );
      closedSessions.add(sessionId);
      timelines.delete(sessionId);
    }

    await flushQueue(config);
  };

  setInterval(() => {
    void flush();
  }, FLUSH_INTERVAL_MS);

  process.on("SIGINT", async () => {
    console.log("[helper] stopping");
    await watcher.close();
    await flush();
    process.exit(0);
  });
}
