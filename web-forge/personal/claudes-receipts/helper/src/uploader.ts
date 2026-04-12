import fs from "node:fs";
import path from "node:path";
import type { HelperConfig } from "./config.js";
import type { IngestEvent } from "./parse.js";
import type { SessionEndMetadata } from "./session-tracker.js";

export type BatchPayload = {
  sessionId: string;
  surface: string;
  projectKey: string | null;
  events: IngestEvent[];
  sessionEnd?: SessionEndMetadata;
};

const RETRY_DELAYS_MS = [1_000, 5_000, 15_000, 60_000, 300_000];
const MAX_RETRIES = RETRY_DELAYS_MS.length;

export async function postBatch(
  config: HelperConfig,
  payload: BatchPayload,
): Promise<boolean> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${config.endpoint}/api/ingest`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-device-id": config.deviceId,
          "x-ingest-key": config.ingestKey,
        },
        body: JSON.stringify({
          sessionId: payload.sessionId,
          surface: payload.surface,
          projectKey: payload.projectKey ?? undefined,
          events: payload.events,
          sessionEnd: payload.sessionEnd,
        }),
      });
      if (response.ok) return true;

      if (response.status === 401 || response.status === 400) {
        const body = await response.text();
        console.error(`[helper] ingest rejected ${response.status}: ${body}`);
        return false;
      }
      console.warn(`[helper] ingest retry: HTTP ${response.status}`);
    } catch (error) {
      console.warn(
        `[helper] ingest network error (attempt ${attempt + 1}):`,
        error instanceof Error ? error.message : error,
      );
    }
    const delay = RETRY_DELAYS_MS[Math.min(attempt, RETRY_DELAYS_MS.length - 1)];
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  return false;
}

type QueueEntry = BatchPayload & { id: string };

function queuePath(config: HelperConfig): string {
  return path.join(config.cursorDir, "queue.jsonl");
}

export function enqueue(config: HelperConfig, payload: BatchPayload): void {
  fs.mkdirSync(config.cursorDir, { recursive: true });
  const entry: QueueEntry = { ...payload, id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  fs.appendFileSync(queuePath(config), `${JSON.stringify(entry)}\n`);
}

export async function flushQueue(config: HelperConfig): Promise<void> {
  const qPath = queuePath(config);
  if (!fs.existsSync(qPath)) return;
  const lines = fs
    .readFileSync(qPath, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0);
  const remaining: string[] = [];
  for (const line of lines) {
    try {
      const entry = JSON.parse(line) as QueueEntry;
      const ok = await postBatch(config, entry);
      if (!ok) remaining.push(line);
    } catch {
      // drop unparseable entries
    }
  }
  if (remaining.length === 0) {
    fs.rmSync(qPath);
  } else {
    fs.writeFileSync(qPath, `${remaining.join("\n")}\n`);
  }
}
