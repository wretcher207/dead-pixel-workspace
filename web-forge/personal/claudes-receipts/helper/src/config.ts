import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type HelperConfig = {
  endpoint: string;
  deviceId: string;
  ingestKey: string;
  cursorDir: string;
};

function configDir(): string {
  const base =
    process.env.APPDATA ??
    path.join(os.homedir(), ".config");
  return path.join(base, "claudes-receipts");
}

export function configPath(): string {
  return path.join(configDir(), "config.json");
}

export function cursorDir(): string {
  return path.join(configDir(), "cursors");
}

export function readConfig(): HelperConfig | null {
  try {
    const raw = fs.readFileSync(configPath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<HelperConfig>;
    if (!parsed.endpoint || !parsed.deviceId || !parsed.ingestKey) return null;
    return {
      endpoint: parsed.endpoint,
      deviceId: parsed.deviceId,
      ingestKey: parsed.ingestKey,
      cursorDir: cursorDir(),
    };
  } catch {
    return null;
  }
}

export function writeConfig(config: Omit<HelperConfig, "cursorDir">): void {
  fs.mkdirSync(configDir(), { recursive: true });
  fs.mkdirSync(cursorDir(), { recursive: true });
  fs.writeFileSync(
    configPath(),
    JSON.stringify(config, null, 2),
    { mode: 0o600 },
  );
}

export function claudeProjectsDir(): string {
  return path.join(os.homedir(), ".claude", "projects");
}
