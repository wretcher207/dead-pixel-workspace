import { getServerSession } from "next-auth";
import { z } from "zod";
import { shares } from "@/db/schema";
import { getDb } from "@/lib/db";
import { authOptions } from "@/lib/auth";

const visibilitySchema = z.enum(["private", "public"]);

const redactionSchema = z.object({
  projectAliases: z.boolean().optional(),
  machineNames: z.boolean().optional(),
  exactCosts: z.boolean().optional(),
  topSessionNames: z.boolean().optional(),
  rankingVisible: z.boolean().optional(),
});

const createShareSchema = z.object({
  visibility: visibilitySchema,
  redactionConfig: redactionSchema.optional(),
});

function makeSlug(visibility: "private" | "public"): string {
  const prefix = visibility === "private" ? "p" : "r";
  const body = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  return `${prefix}_${body}`;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json(
      { ok: false, error: "Sign in first." },
      { status: 401 },
    );
  }

  const db = getDb();
  if (!db) {
    return Response.json(
      { ok: false, error: "DATABASE_URL is required." },
      { status: 503 },
    );
  }

  const parsed = createShareSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Invalid share payload.",
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const slug = makeSlug(parsed.data.visibility);

  await db.insert(shares).values({
    userId: session.user.id,
    shareSlug: slug,
    visibility: parsed.data.visibility,
    redactionConfig: parsed.data.redactionConfig ?? {},
    publishedAt: parsed.data.visibility === "public" ? new Date() : null,
  });

  return Response.json(
    {
      ok: true,
      slug,
      url: `/s/${slug}`,
    },
    { status: 201 },
  );
}
