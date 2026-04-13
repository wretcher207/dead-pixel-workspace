import { runtimeSetup } from "@/lib/setup";

export async function GET() {
  return Response.json({
    ok: true,
    product: "Claude's Receipts",
    mode: "foundation",
    githubAuthConfigured: runtimeSetup.isGitHubAuthConfigured,
    databaseConfigured: runtimeSetup.isDatabaseConfigured,
    updatedAt: new Date().toISOString(),
  });
}
