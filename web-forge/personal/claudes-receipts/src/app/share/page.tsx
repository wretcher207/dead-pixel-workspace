import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { shareModes, shareSummary } from "@/lib/receipts-data";
import { siteNavigation } from "@/lib/navigation";

export const metadata = {
  title: "Share",
};

export default function SharePage() {
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
