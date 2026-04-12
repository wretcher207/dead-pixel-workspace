import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { computeRankings, persistRankingSnapshots } from "@/lib/rankings";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json(
      { ok: false, error: "Sign in first." },
      { status: 401 },
    );
  }

  const rankings = await computeRankings(session.user.id);
  await persistRankingSnapshots(session.user.id, rankings);

  return Response.json({
    ok: true,
    dimensions: Object.keys(rankings).length,
    rankings,
  });
}
