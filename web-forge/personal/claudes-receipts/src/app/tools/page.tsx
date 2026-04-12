import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { siteNavigation } from "@/lib/navigation";
import { toolSummary, tools } from "@/lib/receipts-data";

export const metadata = {
  title: "Tools",
};

export default function ToolsPage() {
  return (
    <AppShell currentPath="/tools" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Tool Behavior"
        title="Dependency, latency, and error appetite"
        description="Tool analysis is not decorative garnish. The dashboard names the tools doing the damage and how often they needed another try."
        videoSrc="/videos/tools-spiral.mp4"
        stats={toolSummary}
      />

      <SectionBlock
        eyebrow="Tool Report"
        title="Which tools the machine leaned on"
        description="This route tracks the metrics the PRD prioritized: error rate, acceptance rate, time burden, and cost association."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {tools.map((tool) => (
            <article className="section-frame section-frame-soft" key={tool.name}>
              <div className="stack-sm">
                <p className="subtle-kicker">{tool.category}</p>
                <h3 className="record-title">{tool.name}</h3>
                <p className="copy-muted">{tool.summary}</p>
              </div>
              <DataList items={tool.stats} />
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
