import { getServerSession } from "next-auth";
import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { ShareCreator } from "@/components/share-creator";
import { authOptions } from "@/lib/auth";
import { shareModes, shareSummary } from "@/lib/receipts-data";
import { siteNavigation } from "@/lib/navigation";
import { loadUserShares } from "@/lib/receipts-queries";

export const metadata = {
  title: "Share",
};

export const dynamic = "force-dynamic";

export default async function SharePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const userShares = await loadUserShares(userId);
  const signedIn = Boolean(userId);

  return (
    <AppShell currentPath="/share" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Receipt Mode"
        title="Private links and public pages with clean redactions"
        description="Sharing is meant to look composed, not breathless. Rank can appear if enabled. Prompt text never enters the equation."
        videoSrc="/videos/share-review.mp4"
        stats={shareSummary}
      />

      <SectionBlock
        eyebrow="Create"
        title="Cut a receipt"
        description="Pick visibility, set redactions, and the URL is generated on publish. Private links are unguessable. Public pages are listed under the account."
      >
        {signedIn ? (
          <ShareCreator />
        ) : (
          <div className="section-frame section-frame-soft">
            <p className="copy-muted">
              Sign in with GitHub to mint a receipt. Private links require an
              account; public pages are published against that account.
            </p>
          </div>
        )}
      </SectionBlock>

      {userShares && userShares.length > 0 ? (
        <SectionBlock
          eyebrow="Existing receipts"
          title="Everything you've sealed so far"
          description="Each row links out to the shareable URL. Private and public live in the same ledger."
        >
          <ul className="share-list">
            {userShares.map((entry) => (
              <li className="share-list-item" key={entry.id}>
                <div>
                  <span className="share-list-meta">{entry.visibility}</span>
                  <div>
                    <a className="inline-link" href={entry.url}>
                      {entry.url}
                    </a>
                  </div>
                </div>
                <span className="share-list-meta">
                  {entry.publishedAt ?? "draft"}
                </span>
              </li>
            ))}
          </ul>
        </SectionBlock>
      ) : null}

      <SectionBlock
        eyebrow="Publishing"
        title="A public page when you want it, a secret URL when you don't"
        description="The PRD calls this feature family Receipt Mode. The first pass models the two publishing modes and the redaction boundaries."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {shareModes.map((mode) => (
            <article className="section-frame section-frame-soft" key={mode.name}>
              <div className="stack-sm">
                <p className="subtle-kicker">{mode.visibility}</p>
                <h3 className="record-title">{mode.name}</h3>
                <p className="copy-muted">{mode.summary}</p>
              </div>
              <DataList items={mode.controls} />
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
