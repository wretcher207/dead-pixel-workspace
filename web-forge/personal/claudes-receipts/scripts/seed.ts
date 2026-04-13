import "dotenv/config";
import { inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  apiErrors,
  apiRequests,
  devices,
  projects,
  rankSnapshots,
  sessionEvents,
  sessions,
  shares,
  toolDecisions,
  toolResults,
  users,
} from "../src/db/schema";
import {
  estimateCostCents,
  resolveModelFamily,
  type ModelFamily,
} from "../src/lib/metrics";
import { createIngestKey, hashIngestKey } from "../src/lib/security";

type Fixture = {
  sessionId: string;
  userId: string;
  deviceId: string;
  projectId: string | null;
  surface: string;
  model: string;
  dayOffset: number;
  startHour: number;
  durationMin: number;
  activeMin: number;
  inputTokens: number;
  outputTokens: number;
  cacheTokens: number;
  promptCount: number;
  retries: number;
  toolCalls: string[];
  errorCount: number;
  remoteControlled?: boolean;
};

const FOUNDER = "seed-founder";
const PEER_POWER = "seed-peer-power";
const PEER_LIGHT = "seed-peer-light";

const DEV_WORKSTATION = "seed-dev-workstation";
const DEV_LAPTOP = "seed-dev-laptop";
const DEV_PEER_POWER = "seed-dev-peer-power";
const DEV_PEER_LIGHT = "seed-dev-peer-light";

const PROJ_RECEIPTS = "seed-proj-receipts";
const PROJ_DRUM = "seed-proj-drum";
const PROJ_SITE = "seed-proj-site";
const PROJ_PEER_POWER = "seed-proj-peer-power";
const PROJ_PEER_LIGHT = "seed-proj-peer-light";

const day = (offset: number, hour = 14) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - offset);
  d.setUTCHours(hour, 0, 0, 0);
  return d;
};

const founderFixtures: Fixture[] = [
  {
    sessionId: "seed-sess-founder-01",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_RECEIPTS,
    surface: "desktop",
    model: "claude-opus-4-6",
    dayOffset: 1,
    startHour: 20,
    durationMin: 146,
    activeMin: 119,
    inputTokens: 1_700_000,
    outputTokens: 824_000,
    cacheTokens: 307_000,
    promptCount: 42,
    retries: 3,
    toolCalls: ["Read", "Read", "Edit", "Bash", "Grep", "Edit", "Edit", "Bash"],
    errorCount: 1,
  },
  {
    sessionId: "seed-sess-founder-02",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_RECEIPTS,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 2,
    startHour: 15,
    durationMin: 72,
    activeMin: 62,
    inputTokens: 420_000,
    outputTokens: 191_000,
    cacheTokens: 88_000,
    promptCount: 18,
    retries: 1,
    toolCalls: ["Read", "Edit", "Bash", "Grep"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-founder-03",
    userId: FOUNDER,
    deviceId: DEV_LAPTOP,
    projectId: PROJ_DRUM,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 4,
    startHour: 10,
    durationMin: 205,
    activeMin: 91,
    inputTokens: 610_000,
    outputTokens: 302_000,
    cacheTokens: 140_000,
    promptCount: 27,
    retries: 8,
    toolCalls: ["Read", "Edit", "Edit", "Bash", "Bash", "Edit"],
    errorCount: 3,
  },
  {
    sessionId: "seed-sess-founder-04",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_SITE,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 7,
    startHour: 19,
    durationMin: 38,
    activeMin: 34,
    inputTokens: 180_000,
    outputTokens: 94_000,
    cacheTokens: 41_000,
    promptCount: 11,
    retries: 0,
    toolCalls: ["Read", "Edit", "Bash"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-founder-05",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_RECEIPTS,
    surface: "desktop",
    model: "claude-opus-4-6",
    dayOffset: 10,
    startHour: 22,
    durationMin: 58,
    activeMin: 52,
    inputTokens: 920_000,
    outputTokens: 401_000,
    cacheTokens: 162_000,
    promptCount: 16,
    retries: 0,
    toolCalls: ["Read", "Edit", "Edit", "Bash", "Grep"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-founder-06",
    userId: FOUNDER,
    deviceId: DEV_LAPTOP,
    projectId: PROJ_DRUM,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 14,
    startHour: 13,
    durationMin: 112,
    activeMin: 77,
    inputTokens: 380_000,
    outputTokens: 178_000,
    cacheTokens: 72_000,
    promptCount: 22,
    retries: 2,
    toolCalls: ["Read", "Edit", "Bash", "Bash"],
    errorCount: 1,
  },
  {
    sessionId: "seed-sess-founder-07",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_SITE,
    surface: "desktop",
    model: "claude-haiku-4-5",
    dayOffset: 18,
    startHour: 11,
    durationMin: 22,
    activeMin: 20,
    inputTokens: 92_000,
    outputTokens: 38_000,
    cacheTokens: 14_000,
    promptCount: 8,
    retries: 0,
    toolCalls: ["Read", "Edit"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-founder-08",
    userId: FOUNDER,
    deviceId: DEV_WORKSTATION,
    projectId: PROJ_RECEIPTS,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 24,
    startHour: 16,
    durationMin: 88,
    activeMin: 71,
    inputTokens: 540_000,
    outputTokens: 245_000,
    cacheTokens: 110_000,
    promptCount: 19,
    retries: 1,
    toolCalls: ["Read", "Edit", "Bash", "Grep", "Edit"],
    errorCount: 0,
    remoteControlled: true,
  },
];

const peerPowerFixtures: Fixture[] = [
  {
    sessionId: "seed-sess-peer-power-01",
    userId: PEER_POWER,
    deviceId: DEV_PEER_POWER,
    projectId: PROJ_PEER_POWER,
    surface: "desktop",
    model: "claude-opus-4-6",
    dayOffset: 2,
    startHour: 9,
    durationMin: 210,
    activeMin: 180,
    inputTokens: 2_400_000,
    outputTokens: 1_020_000,
    cacheTokens: 412_000,
    promptCount: 55,
    retries: 2,
    toolCalls: ["Read", "Edit", "Bash", "Grep", "Edit", "Bash", "Edit"],
    errorCount: 2,
  },
  {
    sessionId: "seed-sess-peer-power-02",
    userId: PEER_POWER,
    deviceId: DEV_PEER_POWER,
    projectId: PROJ_PEER_POWER,
    surface: "desktop",
    model: "claude-opus-4-6",
    dayOffset: 6,
    startHour: 14,
    durationMin: 168,
    activeMin: 142,
    inputTokens: 1_850_000,
    outputTokens: 780_000,
    cacheTokens: 291_000,
    promptCount: 44,
    retries: 1,
    toolCalls: ["Read", "Edit", "Bash", "Edit"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-peer-power-03",
    userId: PEER_POWER,
    deviceId: DEV_PEER_POWER,
    projectId: PROJ_PEER_POWER,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 11,
    startHour: 10,
    durationMin: 93,
    activeMin: 80,
    inputTokens: 480_000,
    outputTokens: 220_000,
    cacheTokens: 98_000,
    promptCount: 21,
    retries: 0,
    toolCalls: ["Read", "Edit", "Bash"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-peer-power-04",
    userId: PEER_POWER,
    deviceId: DEV_PEER_POWER,
    projectId: PROJ_PEER_POWER,
    surface: "desktop",
    model: "claude-opus-4-6",
    dayOffset: 16,
    startHour: 18,
    durationMin: 140,
    activeMin: 118,
    inputTokens: 1_200_000,
    outputTokens: 510_000,
    cacheTokens: 201_000,
    promptCount: 33,
    retries: 2,
    toolCalls: ["Read", "Edit", "Bash", "Grep"],
    errorCount: 1,
  },
  {
    sessionId: "seed-sess-peer-power-05",
    userId: PEER_POWER,
    deviceId: DEV_PEER_POWER,
    projectId: PROJ_PEER_POWER,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 22,
    startHour: 8,
    durationMin: 76,
    activeMin: 65,
    inputTokens: 320_000,
    outputTokens: 150_000,
    cacheTokens: 62_000,
    promptCount: 17,
    retries: 0,
    toolCalls: ["Read", "Edit"],
    errorCount: 0,
  },
];

const peerLightFixtures: Fixture[] = [
  {
    sessionId: "seed-sess-peer-light-01",
    userId: PEER_LIGHT,
    deviceId: DEV_PEER_LIGHT,
    projectId: PROJ_PEER_LIGHT,
    surface: "desktop",
    model: "claude-haiku-4-5",
    dayOffset: 3,
    startHour: 19,
    durationMin: 24,
    activeMin: 20,
    inputTokens: 68_000,
    outputTokens: 24_000,
    cacheTokens: 10_000,
    promptCount: 6,
    retries: 0,
    toolCalls: ["Read"],
    errorCount: 0,
  },
  {
    sessionId: "seed-sess-peer-light-02",
    userId: PEER_LIGHT,
    deviceId: DEV_PEER_LIGHT,
    projectId: PROJ_PEER_LIGHT,
    surface: "desktop",
    model: "claude-sonnet-4-6",
    dayOffset: 13,
    startHour: 21,
    durationMin: 41,
    activeMin: 33,
    inputTokens: 140_000,
    outputTokens: 60_000,
    cacheTokens: 22_000,
    promptCount: 9,
    retries: 0,
    toolCalls: ["Read", "Edit"],
    errorCount: 0,
  },
];

const allFixtures = [
  ...founderFixtures,
  ...peerPowerFixtures,
  ...peerLightFixtures,
];

async function main() {
  const dbUrl =
    process.env.NETLIFY_DATABASE_URL ?? process.env.DATABASE_URL ?? null;
  if (!dbUrl) {
    throw new Error(
      "NETLIFY_DATABASE_URL or DATABASE_URL is required to seed the database.",
    );
  }

  const sql = postgres(dbUrl, { prepare: false });
  const db = drizzle(sql);

  const founderWorkstationKey = createIngestKey();
  const founderLaptopKey = createIngestKey();

  await db
    .insert(users)
    .values([
      {
        id: FOUNDER,
        email: "founder@example.com",
        name: "Founder Account",
        displayName: "Founder",
        githubLogin: "founder-account",
      },
      {
        id: PEER_POWER,
        email: "peer-power@example.com",
        name: "Power User",
        displayName: "Power",
        githubLogin: "peer-power",
      },
      {
        id: PEER_LIGHT,
        email: "peer-light@example.com",
        name: "Light User",
        displayName: "Light",
        githubLogin: "peer-light",
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(devices)
    .values([
      {
        id: DEV_WORKSTATION,
        userId: FOUNDER,
        nickname: "Workstation North",
        platform: "desktop-windows",
        ingestKeyHash: hashIngestKey(founderWorkstationKey),
        lastSeenAt: day(1, 22),
      },
      {
        id: DEV_LAPTOP,
        userId: FOUNDER,
        nickname: "Travel Laptop",
        platform: "desktop-windows",
        ingestKeyHash: hashIngestKey(founderLaptopKey),
        lastSeenAt: day(4, 12),
      },
      {
        id: DEV_PEER_POWER,
        userId: PEER_POWER,
        nickname: "Peer Power Rig",
        platform: "desktop-unix",
        ingestKeyHash: hashIngestKey(createIngestKey()),
        lastSeenAt: day(2, 12),
      },
      {
        id: DEV_PEER_LIGHT,
        userId: PEER_LIGHT,
        nickname: "Peer Light Machine",
        platform: "desktop-unix",
        ingestKeyHash: hashIngestKey(createIngestKey()),
        lastSeenAt: day(3, 19),
      },
    ])
    .onConflictDoNothing();

  await db
    .insert(projects)
    .values([
      {
        id: PROJ_RECEIPTS,
        userId: FOUNDER,
        canonicalKey: "web-forge/personal/claudes-receipts",
        currentAlias: "Claude's Receipts",
        pinned: true,
      },
      {
        id: PROJ_DRUM,
        userId: FOUNDER,
        canonicalKey: "drum-apparatus-web",
        currentAlias: "Drum Apparatus",
        pinned: false,
      },
      {
        id: PROJ_SITE,
        userId: FOUNDER,
        canonicalKey: "web-forge/spec-sites/nail-suite",
        currentAlias: "Nail Suite Pitch",
        pinned: false,
      },
      {
        id: PROJ_PEER_POWER,
        userId: PEER_POWER,
        canonicalKey: "peer/power-project",
        currentAlias: "Power Project",
        pinned: true,
      },
      {
        id: PROJ_PEER_LIGHT,
        userId: PEER_LIGHT,
        canonicalKey: "peer/light-project",
        currentAlias: "Light Project",
        pinned: false,
      },
    ])
    .onConflictDoNothing();

  for (const fx of allFixtures) {
    const family: ModelFamily = resolveModelFamily(fx.model);
    const estimatedCostCents = estimateCostCents(
      {
        inputTokens: fx.inputTokens,
        outputTokens: fx.outputTokens,
        cacheTokens: fx.cacheTokens,
      },
      family,
    );
    const startedAt = day(fx.dayOffset, fx.startHour);
    const endedAt = new Date(startedAt.getTime() + fx.durationMin * 60_000);
    const activeSeconds = fx.activeMin * 60;
    const durationSeconds = fx.durationMin * 60;
    const idleSeconds = Math.max(0, durationSeconds - activeSeconds);

    await db
      .insert(sessions)
      .values({
        id: fx.sessionId,
        userId: fx.userId,
        deviceId: fx.deviceId,
        projectId: fx.projectId,
        surface: fx.surface,
        remoteControlled: fx.remoteControlled ?? false,
        modelSummary: fx.model,
        startedAt,
        endedAt,
        durationSeconds,
        activeSeconds,
        idleSeconds,
        estimatedCostCents,
        inputTokens: fx.inputTokens,
        outputTokens: fx.outputTokens,
        cacheTokens: fx.cacheTokens,
      })
      .onConflictDoNothing();

    await seedSessionSignals(db, fx, family, estimatedCostCents, startedAt);
  }

  await db
    .insert(shares)
    .values([
      {
        id: "seed-share-weekly",
        userId: FOUNDER,
        shareSlug: "founder-weekly-damage",
        visibility: "private",
        redactionConfig: {
          projectAliases: false,
          machineNames: false,
          exactCosts: false,
          topSessionNames: false,
          rankingVisible: true,
        },
        publishedAt: day(0, 12),
      },
      {
        id: "seed-share-public",
        userId: FOUNDER,
        shareSlug: "founder-public-receipt",
        visibility: "public",
        redactionConfig: {
          projectAliases: true,
          machineNames: true,
          exactCosts: false,
          topSessionNames: true,
          rankingVisible: true,
        },
        publishedAt: day(0, 13),
      },
    ])
    .onConflictDoNothing();

  await db
    .delete(rankSnapshots)
    .where(inArray(rankSnapshots.userId, [FOUNDER, PEER_POWER, PEER_LIGHT]));
  console.log("Seed complete.");
  console.log("Founder sign-in email:     founder@example.com");
  console.log(`Workstation device id:     ${DEV_WORKSTATION}`);
  console.log(`Workstation ingest key:    ${founderWorkstationKey}`);
  console.log(`Laptop device id:          ${DEV_LAPTOP}`);
  console.log(`Laptop ingest key:         ${founderLaptopKey}`);
  console.log("Peer users seeded:         seed-peer-power, seed-peer-light");
  console.log(
    "Rank snapshots cleared; next home page load will recompute them live.",
  );

  await sql.end();
}

async function seedSessionSignals(
  db: ReturnType<typeof drizzle>,
  fx: Fixture,
  family: ModelFamily,
  sessionCostCents: number,
  startedAt: Date,
) {
  const events: (typeof sessionEvents.$inferInsert)[] = [];
  const requests: (typeof apiRequests.$inferInsert)[] = [];
  const tools: (typeof toolResults.$inferInsert)[] = [];
  const decisions: (typeof toolDecisions.$inferInsert)[] = [];
  const errors: (typeof apiErrors.$inferInsert)[] = [];

  const totalRequests = fx.promptCount + fx.retries;
  const perRequestInput = Math.round(fx.inputTokens / Math.max(1, totalRequests));
  const perRequestOutput = Math.round(fx.outputTokens / Math.max(1, totalRequests));
  const perRequestCache = Math.round(fx.cacheTokens / Math.max(1, totalRequests));
  const perRequestCost = Math.round(sessionCostCents / Math.max(1, totalRequests));

  const baseMs = startedAt.getTime();
  const spanMs = fx.durationMin * 60_000;
  const tick = (i: number, total: number) =>
    new Date(baseMs + Math.round((spanMs * (i + 1)) / (total + 1)));

  for (let i = 0; i < fx.promptCount; i += 1) {
    events.push({
      id: `${fx.sessionId}-prompt-${i}`,
      sessionId: fx.sessionId,
      eventType: "prompt_submitted",
      occurredAt: tick(i, fx.promptCount),
      deviceId: fx.deviceId,
      projectId: fx.projectId,
    });
  }

  for (let i = 0; i < totalRequests; i += 1) {
    const occurredAt = tick(i, totalRequests);
    events.push({
      id: `${fx.sessionId}-req-${i}`,
      sessionId: fx.sessionId,
      eventType: "api_request_completed",
      occurredAt,
      deviceId: fx.deviceId,
      projectId: fx.projectId,
      inputTokens: perRequestInput,
      outputTokens: perRequestOutput,
      cacheTokens: perRequestCache,
      estimatedCostCents: perRequestCost,
    });
    requests.push({
      id: `${fx.sessionId}-apireq-${i}`,
      sessionId: fx.sessionId,
      requestedAt: occurredAt,
      completedAt: occurredAt,
      model: fx.model,
      estimatedCostCents: perRequestCost,
      inputTokens: perRequestInput,
      outputTokens: perRequestOutput,
      cacheTokens: perRequestCache,
    });
  }

  fx.toolCalls.forEach((toolName, i) => {
    const occurredAt = tick(i, fx.toolCalls.length);
    const durationMs = 200 + Math.round(Math.random() * 1800);
    const success = toolName === "Bash" ? i % 4 !== 0 : true;
    events.push({
      id: `${fx.sessionId}-tool-${i}`,
      sessionId: fx.sessionId,
      eventType: "tool_completed",
      occurredAt,
      deviceId: fx.deviceId,
      projectId: fx.projectId,
      toolName,
      success,
      durationMs,
    });
    const toolResultId = `${fx.sessionId}-toolres-${i}`;
    tools.push({
      id: toolResultId,
      sessionId: fx.sessionId,
      toolName,
      category: categorize(toolName),
      startedAt: occurredAt,
      durationMs,
      success,
    });
    if (i % 2 === 0) {
      decisions.push({
        id: `${fx.sessionId}-dec-${i}`,
        sessionId: fx.sessionId,
        toolResultId,
        decision: success ? "accepted" : "rejected",
        occurredAt,
      });
    }
  });

  for (let i = 0; i < fx.errorCount; i += 1) {
    const occurredAt = tick(i, Math.max(1, fx.errorCount));
    events.push({
      id: `${fx.sessionId}-err-${i}`,
      sessionId: fx.sessionId,
      eventType: "api_error",
      occurredAt,
      deviceId: fx.deviceId,
      projectId: fx.projectId,
    });
    errors.push({
      id: `${fx.sessionId}-apierr-${i}`,
      sessionId: fx.sessionId,
      occurredAt,
      code: "overloaded_error",
      message: "Upstream returned a retryable error.",
    });
  }

  void family;

  if (events.length) {
    await db.insert(sessionEvents).values(events).onConflictDoNothing();
  }
  if (requests.length) {
    await db.insert(apiRequests).values(requests).onConflictDoNothing();
  }
  if (tools.length) {
    await db.insert(toolResults).values(tools).onConflictDoNothing();
  }
  if (decisions.length) {
    await db.insert(toolDecisions).values(decisions).onConflictDoNothing();
  }
  if (errors.length) {
    await db.insert(apiErrors).values(errors).onConflictDoNothing();
  }
}

function categorize(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("bash") || lower.includes("run")) return "Execution";
  if (lower.includes("edit") || lower.includes("write")) return "Editing";
  if (lower.includes("read") || lower.includes("grep") || lower.includes("glob"))
    return "Discovery";
  return "Other";
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
