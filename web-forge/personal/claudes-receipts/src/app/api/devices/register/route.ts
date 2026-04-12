import { getServerSession } from "next-auth";
import { z } from "zod";
import { devices } from "@/db/schema";
import { getDb } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { createIngestKey, hashIngestKey } from "@/lib/security";

const registerDeviceSchema = z.object({
  nickname: z.string().trim().min(1).max(80).optional(),
  platform: z.string().trim().min(1).max(40).optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return Response.json(
      {
        ok: false,
        error: "Sign in first.",
      },
      { status: 401 },
    );
  }

  const db = getDb();

  if (!db) {
    return Response.json(
      {
        ok: false,
        error: "DATABASE_URL is required before devices can be registered.",
      },
      { status: 503 },
    );
  }

  const parsed = registerDeviceSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Invalid device registration payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const ingestKey = createIngestKey();
  const deviceId = crypto.randomUUID();

  await db.insert(devices).values({
    id: deviceId,
    userId: session.user.id,
    nickname: parsed.data.nickname ?? "Unnamed machine",
    platform: parsed.data.platform ?? "unknown",
    ingestKeyHash: hashIngestKey(ingestKey),
  });

  return Response.json(
    {
      ok: true,
      deviceId,
      ingestKey,
      note: "Store the ingest key once. Only the hash is persisted.",
    },
    { status: 201 },
  );
}
