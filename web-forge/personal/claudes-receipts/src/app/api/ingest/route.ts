import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { devices, projects, sessionEvents, sessions } from "@/db/schema";
import { getDb } from "@/lib/db";
import { ingestKeyMatches } from "@/lib/security";

const ingestEventSchema = z.object({
  eventId: z.string().min(1),
  eventType: z.string().min(1),
  sessionId: z.string().min(1),
  timestamp: z.string().min(1),
  toolName: z.string().min(1).optional(),
  success: z.boolean().optional(),
  durationMs: z.number().int().nonnegative().optional(),
});

const ingestPayloadSchema = z.object({
  sessionId: z.string().min(1),
  surface: z.string().min(1).optional(),
  projectKey: z.string().min(1).optional(),
  events: z.array(ingestEventSchema).min(1),
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

  await db
    .update(devices)
    .set({
      lastSeenAt: lastEventAt,
    })
    .where(eq(devices.id, device.id));

  await db
    .insert(sessions)
    .values({
      id: parsed.data.sessionId,
      userId: device.userId,
      deviceId: device.id,
      projectId,
      surface: parsed.data.surface ?? "unknown",
      startedAt: firstEventAt,
      endedAt: lastEventAt,
    })
    .onConflictDoUpdate({
      target: sessions.id,
      set: {
        deviceId: device.id,
        projectId,
        surface: parsed.data.surface ?? "unknown",
        endedAt: lastEventAt,
      },
    });

  await db.insert(sessionEvents).values(
    parsed.data.events.map((event) => ({
      id: event.eventId,
      sessionId: parsed.data.sessionId,
      eventType: event.eventType,
      occurredAt: new Date(event.timestamp),
      deviceId: device.id,
      projectId,
      toolName: event.toolName,
      success: event.success,
      durationMs: event.durationMs,
    })),
  ).onConflictDoNothing();

  return Response.json({
    ok: true,
    accepted: parsed.data.events.length,
    sessionId: parsed.data.sessionId,
    note: "Device authentication, session upsert, and event persistence all completed.",
  });
}
