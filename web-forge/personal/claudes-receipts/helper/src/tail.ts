import fs from "node:fs";
import path from "node:path";
import type { HelperConfig } from "./config.js";

export type CursorState = {
  offset: number;
};

function cursorPath(config: HelperConfig, filePath: string): string {
  const safe = filePath.replace(/[^a-zA-Z0-9]/g, "_");
  return path.join(config.cursorDir, `${safe}.cursor.json`);
}

export function readCursor(
  config: HelperConfig,
  filePath: string,
): CursorState {
  try {
    const raw = fs.readFileSync(cursorPath(config, filePath), "utf8");
    return JSON.parse(raw) as CursorState;
  } catch {
    return { offset: 0 };
  }
}

export function writeCursor(
  config: HelperConfig,
  filePath: string,
  state: CursorState,
): void {
  fs.mkdirSync(config.cursorDir, { recursive: true });
  fs.writeFileSync(cursorPath(config, filePath), JSON.stringify(state));
}

export async function readNewLines(
  filePath: string,
  offset: number,
): Promise<{ lines: string[]; nextOffset: number }> {
  const stat = await fs.promises.stat(filePath);
  if (stat.size <= offset) {
    return { lines: [], nextOffset: offset };
  }
  const stream = fs.createReadStream(filePath, {
    start: offset,
    end: stat.size - 1,
  });
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk as Buffer);
  }
  const buffer = Buffer.concat(chunks);
  const text = buffer.toString("utf8");
  const lines = text.split("\n").filter((line) => line.trim().length > 0);
  return { lines, nextOffset: stat.size };
}

export function sessionIdFromPath(filePath: string): string {
  const base = path.basename(filePath);
  return base.replace(/\.jsonl$/, "");
}
