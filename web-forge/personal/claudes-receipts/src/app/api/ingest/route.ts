import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { devices, projects, sessionEvents, sessions } from "@/db/schema";
import { getDb } from "@/lib/db";
import { estimateCostCents, resolveModelFamily } from "@/lib/metrics";
import { ingestKeyMatches } from "@/lib/security";

const ingestEventSchema = z.object({
  eventId: z.string().min(1),
  eventType: z.string().min(1),
  sessionId: z.string().min(1),
  timestamp: z.string().min(1),
  toolName: z.string().min(1).optional(),
  success: z.boolean().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  inputTokens: z.number().int().nonnegative().optional(),
  outputTokens: z.number().int().nonnegative().optional(),
  cacheTokens: z.number().int().nonnegative().optional(),
  model: z.string().min(1).optional(),
});

const sessionEndSchema = z.object({
  endedAt: z.string().min(1),
  durationSeconds: z.number().int().nonnegative(),
  activeSeconds: z.number().int().nonnegative(),
  idleSeconds: z.number().int().nonnegative(),
});

const ingestPayloadSchema = z.object({
  sessionId: z.string().min(1),
  surface: z.string().min(1).optional(),
  projectKey: z.string().min(1).optional(),
  events: z.array(ingestEventSchema).min(1),
  sessionEnd: sessionEndSchema.optional(),
});

export async function POST(request: Request) {
  const db = getDb();

  if (!db) {
    return Response.json(
      {
        ok: false,
        error: "DATABASE_URL is required before ingest can be accepted.",
      },
      { status: 503 },
    );
  }

  const deviceId = request.headers.get("x-device-id");
  const ingestKey = request.headers.get("x-ingest-key");

  if (!deviceId || !ingestKey) {
    return Response.json(
      {
        ok: false,
        error: "Expected x-device-id and x-ingest-key headers.",
      },
      { status: 401 },
    );
  }

  const parsed = ingestPayloadSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Invalid ingest payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const device = await db.query.devices.findFirst({
    where: eq(devices.id, deviceId),
  });

  if (!device || !ingestKeyMatches(ingestKey, device.ingestKeyHash)) {
    return Response.json(
      {
        ok: false,
        error: "Device credentials were not accepted.",
      },
      { status: 401 },
    );
  }

  let projectId: string | null = null;

  if (parsed.data.projectKey) {
    const existingProject = await db.query.projects.findFirst({
      where: and(
        eq(projects.userId, device.userId),
        eq(projects.canonicalKey, parsed.data.projectKey),
      ),
    });

    if (existingProject) {
      projectId = existingProject.id;
    } else {
      projectId = crypto.randomUUID();

      await db.insert(projects).values({
        id: projectId,
        userId: device.userId,
        canonicalKey: parsed.data.projectKey,
        currentAlias: parsed.data.projectKey,
      });
    }
  }

  const firstEventAt = new Date(parsed.data.events[0].timestamp);
  const lastEventAt = new Date(
    parsed.data.events[parsed.data.events.length - 1].timestamp,
  );

  let batchInputTokens = 0;
  let batchOutputTokens = 0;
  let batchCacheTokens = 0;
  let batchCostCents = 0;
  let latestModel: string | null = null;

  const eventRows = parsed.data.events.map((event) => {
    const inputTokens = event.inputTokens ?? 0;
    const outputTokens = event.outputTokens ?? 0;
    const cacheTokens = event.cacheTokens ?? 0;
    const hasUsage = inputTokens > 0 || outputTokens > 0 || cacheTokens > 0;

    let eventCostCents: number | undefined;
    if (hasUsage) {
      const family = resolveModelFamily(event.model);
      eventCostCents = estimateCostCents(
        { inputTokens, outputTokens, cacheTokens },
        family,
      );
      batchInputTokens += inputTokens;
      batchOutputTokens += outputTokens;
      batchCacheTokens += cacheTokens;
      batchCostCents += eventCostCents;
    }

    if (event.model) latestModel = event.model;

    return {
      id: event.eventId,
      sessionId: parsed.data.sessionId,
      eventType: event.eventType,
      occurredAt: new Date(event.timestamp),
      deviceId: device.id,
      projectId,
      toolName: event.toolName,
      success: event.success,
      durationMs: event.durationMs,
      inputTokens: hasUsage ? inputTokens : undefined,
      outputTokens: hasUsage ? outputTokens : undefined,
      cacheTokens: hasUsage ? cacheTokens : undefined,
      estimatedCostCents: eventCostCents,
    };
  });

  await db
    .update(devices)
    .set({
      lastSeenAt: lastEventAt,
    })
    .where(eq(devices.id, device.id));

  // Only set ended_at when the helper explicitly signals end-of-session via
  // sessionEnd metadata (handled below). Live event batches keep ended_at null
  // so the realtime dashboard can show the session as active.
  const hasSessionEnd = !!parsed.data.sessionEnd;

  await db
    .insert(sessions)
    .values({
      id: parsed.data.sessionId,
      userId: device.userId,
      deviceId: device.id,
      projectId,
      surface: parsed.data.surface ?? "unknown",
      modelSummary: latestModel,
      startedAt: firstEventAt,
      endedAt: hasSessionEnd ? lastEventAt : null,
      inputTokens: batchInputTokens,
      outputTokens: batchOutputTokens,
      cacheTokens: batchCacheTokens,
      estimatedCostCents: batchCostCents,
    })
    .onConflictDoUpdate({
      target: sessions.id,
      set: {
        deviceId: device.id,
        projectId,
        surface: parsed.data.surface ?? "unknown",
        // Do not clobber ended_at on update; the sessionEnd branch below is the
        // single source of truth for marking a session closed.
        modelSummary: latestModel
          ? sql`COALESCE(${latestModel}, ${sessions.modelSummary})`
          : sessions.modelSummary,
        inputTokens: sql`${sessions.inputTokens} + ${batchInputTokens}`,
        outputTokens: sql`${sessions.outputTokens} + ${batchOutputTokens}`,
        cacheTokens: sql`${sessions.cacheTokens} + ${batchCacheTokens}`,
        estimatedCostCents: sql`${sessions.estimatedCostCents} + ${batchCostCents}`,
      },
    });

  await db.insert(sessionEvents).values(eventRows).onConflictDoNothing();

  if (parsed.data.sessionEnd) {
    const end = parsed.data.sessionEnd;
    await db
      .update(sessions)
      .set({
        endedAt: new Date(end.endedAt),
        durationSeconds: end.durationSeconds,
        activeSeconds: end.activeSeconds,
        idleSeconds: end.idleSeconds,
      })
      .where(eq(sessions.id, parsed.data.sessionId));
  }

  return Response.json({
    ok: true,
    accepted: parsed.data.events.length,
    sessionId: parsed.data.sessionId,
    sessionClosed: Boolean(parsed.data.sessionEnd),
    note: "Device authentication, session upsert, and event persistence all completed.",
  });
}
