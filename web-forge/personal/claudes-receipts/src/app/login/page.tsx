import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { siteNavigation } from "@/lib/navigation";
import { getSetupItems, runtimeSetup } from "@/lib/setup";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AppShell currentPath="" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Authentication"
        title="GitHub login is the first gate"
        description="The PRD calls for GitHub sign-in, multi-device linkage, and per-device ingest keys. This page tells you whether the foundation is actually wired."
        videoSrc="/videos/share-review.mp4"
        stats={[
          {
            label: "GitHub OAuth",
            value: runtimeSetup.isGitHubAuthConfigured ? "Ready" : "Not set",
            detail: "requires AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, and AUTH_SECRET",
          },
          {
            label: "Database",
            value: runtimeSetup.isDatabaseConfigured ? "Ready" : "Not set",
            detail: "required for persistent users, devices, and ingest keys",
          },
          {
            label: "Current mode",
            value:
              runtimeSetup.isGitHubAuthConfigured && runtimeSetup.isDatabaseConfigured
                ? "Persistent"
                : "Foundation",
            detail: "the UI remains usable before credentials exist",
          },
        ]}
      />

      <SectionBlock
        eyebrow="Setup"
        title="What still needs real credentials"
        description="Once the values in .env are set, the header sign-in button will complete GitHub OAuth and the device registration route can issue real ingest keys."
      >
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="section-frame">
            <p className="subtle-kicker">Checklist</p>
            <DataList items={getSetupItems()} />
          </article>
          <article className="section-frame section-frame-soft">
            <div className="stack-sm">
              <p className="subtle-kicker">Next steps</p>
              <h3 className="record-title">Finish the foundation in this order</h3>
            </div>
            <ol className="detail-list">
              <li>Create a GitHub OAuth app and copy the client ID and secret.</li>
              <li>Provision Postgres and place the connection string in `DATABASE_URL`.</li>
              <li>Run `npm run db:push` and `npm run db:seed`.</li>
              <li>Reload the app and use the header sign-in button.</li>
            </ol>
          </article>
        </div>
      </SectionBlock>
    </AppShell>
  );
}
