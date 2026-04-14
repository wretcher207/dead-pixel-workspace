// One-shot backfill: walk ~/.claude/projects, parse every JSONL, post to /api/ingest.
// Bypasses chokidar. Uses the built helper's parse + post logic.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parseRecord, projectKeyFromPath } from "../dist/parse.js";

const CONFIG_PATH = path.join(process.env.APPDATA, "claudes-receipts", "config.json");
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const ROOT = path.join(os.homedir(), ".claude", "projects");

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (entry.isFile() && p.endsWith(".jsonl")) out.push(p);
  }
  return out;
}

async function post(payload) {
  const r = await fetch(`${config.endpoint}/api/ingest`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-device-id": config.deviceId,
      "x-ingest-key": config.ingestKey,
    },
    body: JSON.stringify(payload),
  });
  return { status: r.status, body: r.status >= 400 ? await r.text() : null };
}

const ACTIVE_THRESHOLD_MS = 20 * 60_000;
const files = walk(ROOT);
console.log(`[backfill] found ${files.length} jsonl files`);

let totalEvents = 0;
let totalSessions = 0;
let failed = 0;
let firstError = null;

let skippedActive = 0;
for (const file of files) {
  const sessionId = path.basename(file, ".jsonl");
  const projectKey = projectKeyFromPath(file);
  const stat = fs.statSync(file);
  const isLive = Date.now() - stat.mtimeMs < ACTIVE_THRESHOLD_MS;
  const raw = fs.readFileSync(file, "utf8");
  const lines = raw.split("\n").filter((l) => l.trim());

  const events = [];
  for (const line of lines) {
    try {
      const rec = JSON.parse(line);
      events.push(...parseRecord(rec, sessionId));
    } catch {}
  }
  if (events.length === 0) continue;

  // Chunk into batches of 200 events (safety for large sessions)
  const CHUNK = 200;
  for (let i = 0; i < events.length; i += CHUNK) {
    const batch = events.slice(i, i + CHUNK);
    const res = await post({
      sessionId,
      surface: config.surface,
      projectKey: projectKey ?? undefined,
      events: batch,
    });
    if (res.status >= 400) {
      failed++;
      if (!firstError) {
        firstError = { file, status: res.status, body: res.body };
      }
    } else {
      totalEvents += batch.length;
    }
  }

  // Skip synthetic session_ended for files still being actively written to.
  // The live helper (or a subsequent backfill) will close them once idle.
  if (isLive) {
    skippedActive++;
    continue;
  }

  const last = events[events.length - 1].timestamp;
  const first = events[0].timestamp;
  const durSec = Math.max(
    1,
    Math.floor((new Date(last).getTime() - new Date(first).getTime()) / 1000),
  );
  const endedEvent = {
    eventId: `${sessionId}-session-ended`,
    eventType: "session_ended",
    sessionId,
    timestamp: last,
  };
  const r2 = await post({
    sessionId,
    surface: config.surface,
    projectKey: projectKey ?? undefined,
    events: [endedEvent],
    sessionEnd: {
      endedAt: last,
      startedAt: first,
      durationSeconds: durSec,
      activeSeconds: durSec,
      idleSeconds: 0,
    },
  });
  if (r2.status < 400) totalSessions++;
}

console.log(`[backfill] events posted: ${totalEvents}, sessions closed: ${totalSessions}, kept-live: ${skippedActive}, failures: ${failed}`);
if (firstError) console.log(`[backfill] first error:`, firstError);
