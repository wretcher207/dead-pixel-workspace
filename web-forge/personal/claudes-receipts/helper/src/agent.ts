import path from "node:path";
import chokidar from "chokidar";
import {
  claudeProjectsDir,
  type HelperConfig,
} from "./config.js";
import {
  extractUsage,
  parseRecord,
  projectKeyFromPath,
  type IngestEvent,
} from "./parse.js";
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
  surface: string;
};

export async function runAgent(config: HelperConfig): Promise<void> {
  const watchRoot = claudeProjectsDir();
  console.log(`[helper] watching ${watchRoot}`);
  console.log(`[helper] ingest target ${config.endpoint}`);

  const pending = new Map<string, Pending>();

  const handleFile = async (filePath: string) => {
    if (!filePath.endsWith(".jsonl")) return;
    const sessionId = sessionIdFromPath(filePath);
    const cursor = readCursor(config, filePath);
    const { lines, nextOffset } = await readNewLines(filePath, cursor.offset);
    if (lines.length === 0) return;

    const bucket =
      pending.get(sessionId) ??
      ({
        events: [],
        projectKey: projectKeyFromPath(filePath),
        surface: path.sep === "\\" ? "desktop-windows" : "desktop-unix",
      } satisfies Pending);

    for (const line of lines) {
      let raw: Record<string, unknown>;
      try {
        raw = JSON.parse(line);
      } catch {
        continue;
      }
      const events = parseRecord(raw, sessionId);
      bucket.events.push(...events);
      const usage = extractUsage(raw);
      if (usage) {
        bucket.events.push({
          eventId: `${sessionId}-${bucket.events.length}-tokens`,
          eventType: "api_request_completed",
          sessionId,
          timestamp:
            (raw.timestamp as string | undefined) ?? new Date().toISOString(),
        });
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

  const flush = async () => {
    if (pending.size === 0) {
      await flushQueue(config);
      return;
    }
    for (const [sessionId, bucket] of pending.entries()) {
      if (bucket.events.length === 0) {
        pending.delete(sessionId);
        continue;
      }
      const payload = {
        sessionId,
        surface: bucket.surface,
        projectKey: bucket.projectKey,
        events: bucket.events,
      };
      const ok = await postBatch(config, payload);
      if (!ok) {
        enqueue(config, payload);
      }
      pending.delete(sessionId);
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
