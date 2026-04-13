#!/usr/bin/env node
import { readConfig, writeConfig } from "./config.js";
import { runAgent } from "./agent.js";

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const flags = parseFlags(rest);

  if (command === "register") {
    const endpoint = flags.endpoint ?? "http://localhost:3000";
    const deviceId = flags.deviceId;
    const ingestKey = flags.ingestKey;
    const surface = flags.surface ?? "desktop";
    if (!deviceId || !ingestKey) {
      console.error(
        "Usage: helper register --endpoint <url> --device-id <uuid> --ingest-key <key> [--surface <label>]",
      );
      process.exit(1);
    }
    writeConfig({ endpoint, deviceId, ingestKey, surface });
    console.log("[helper] configuration saved");
    return;
  }

  if (command === "run" || command === undefined) {
    const config = readConfig();
    if (!config) {
      console.error(
        "[helper] no configuration found. Run `helper register` first.",
      );
      process.exit(1);
    }
    await runAgent(config);
    return;
  }

  console.error(`[helper] unknown command: ${command}`);
  process.exit(1);
}

function parseFlags(args: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const next = args[i + 1];
    if (next && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = "true";
    }
  }
  return out;
}

main().catch((err) => {
  console.error("[helper] fatal", err);
  process.exit(1);
});
