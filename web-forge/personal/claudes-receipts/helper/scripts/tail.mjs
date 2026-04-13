// Simple polling tail. Bypasses chokidar. Stats every .jsonl in ~/.claude/projects
// every POLL_MS, reads bytes past the last known offset, parses + posts new events.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parseRecord, projectKeyFromPath } from "../dist/parse.js";

const POLL_MS = 3_000;
const ACTIVE_THRESHOLD_MS = 20 * 60_000;
const CONFIG_PATH = path.join(process.env.APPDATA, "claudes-receipts", "config.json");
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
const ROOT = path.join(os.homedir(), ".claude", "projects");

// sessionId -> { offset (bytes read), lastSeenMs }
const cursors = new Map();

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
  try {
    const r = await fetch(`${config.endpoint}/api/ingest`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-device-id": config.deviceId,
        "x-ingest-key": config.ingestKey,
      },
      body: JSON.stringify(payload),
    });
    if (r.status >= 400) {
      const body = await r.text();
      return { ok: false, status: r.status, body };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, status: 0, body: String(e) };
  }
}

function readFrom(filePath, offset) {
  const fd = fs.openSync(filePath, "r");
  try {
    const stat = fs.fstatSync(fd);
    if (stat.size <= offset) return { text: "", nextOffset: offset, size: stat.size };
    const length = stat.size - offset;
    const buf = Buffer.alloc(length);
    fs.readSync(fd, buf, 0, length, offset);
    return { text: buf.toString("utf8"), nextOffset: stat.size, size: stat.size };
  } finally {
    fs.closeSync(fd);
  }
}

async function scanOnce() {
  const files = walk(ROOT);
  let posted = 0;
  let filesTouched = 0;
  for (const file of files) {
    const stat = fs.statSync(file);
    const sessionId = path.basename(file, ".jsonl");
    const prev = cursors.get(sessionId) ?? { offset: stat.size, lastSeenMs: stat.mtimeMs };

    // First time we've seen this file this run — initialize cursor at current EOF.
    // This prevents re-posting every historical event on each helper restart.
    // Backfill handles history; tail handles forward motion only.
    if (!cursors.has(sessionId)) {
      cursors.set(sessionId, { offset: stat.size, lastSeenMs: stat.mtimeMs });
      continue;
    }

    if (stat.size === prev.offset && stat.mtimeMs === prev.lastSeenMs) continue;
    filesTouched++;

    const { text, nextOffset } = readFrom(file, prev.offset);
    if (!text) {
      cursors.set(sessionId, { offset: nextOffset, lastSeenMs: stat.mtimeMs });
      continue;
    }

    const events = [];
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const rec = JSON.parse(trimmed);
        events.push(...parseRecord(rec, sessionId));
      } catch {
        // Incomplete trailing line — leave for next poll. Roll offset back to start of last newline.
      }
    }

    if (events.length === 0) {
      cursors.set(sessionId, { offset: nextOffset, lastSeenMs: stat.mtimeMs });
      continue;
    }

    const projectKey = projectKeyFromPath(file);
    const res = await post({
      sessionId,
      surface: config.surface,
      projectKey: projectKey ?? undefined,
      events,
    });
    if (res.ok) {
      posted += events.length;
      cursors.set(sessionId, { offset: nextOffset, lastSeenMs: stat.mtimeMs });
    } else {
      console.error(`[tail] POST failed for ${sessionId}: ${res.status} ${res.body?.slice(0, 200)}`);
      // Do not advance cursor — retry next poll.
    }
  }

  if (posted > 0 || filesTouched > 0) {
    const ts = new Date().toISOString().slice(11, 19);
    console.log(`[tail ${ts}] files touched=${filesTouched} events posted=${posted} cursors=${cursors.size}`);
  }
}

// Close idle sessions: any file not modified in 20min whose session hasn't been closed.
async function closeIdleSessions() {
  const files = walk(ROOT);
  for (const file of files) {
    const stat = fs.statSync(file);
    if (Date.now() - stat.mtimeMs < ACTIVE_THRESHOLD_MS) continue;
    // File is idle — nothing more to do from tail side; backfill or a separate close pass can mark end.
  }
}

console.log(`[tail] watching ${ROOT} (poll every ${POLL_MS}ms)`);
console.log(`[tail] endpoint ${config.endpoint} · surface ${config.surface}`);

// Immediate scan then interval
await scanOnce();
setInterval(() => {
  scanOnce().catch((e) => console.error("[tail] scan error:", e.message));
}, POLL_MS);

// Keep process alive
process.on("SIGINT", () => {
  console.log("[tail] stopping");
  process.exit(0);
});
