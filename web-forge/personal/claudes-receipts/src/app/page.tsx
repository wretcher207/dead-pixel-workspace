import Link from "next/link";
import {
  AppShell,
  DataList,
  InsightPanels,
  MetricCluster,
  PageHeader,
  SectionBlock,
  Timeline,
} from "@/components/receipts-ui";
import { siteNavigation } from "@/lib/navigation";
import {
  dashboardHighlights,
  overviewStats,
  rankingSnapshot,
  sessionAutopsy,
  telemetryCoverage,
} from "@/lib/receipts-data";

export default function Home() {
  return (
    <AppShell currentPath="/" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Live Telemetry Overview"
        title="Claude's Receipts"
        description="A browser-accessible receipts engine for Claude Code. Expensive-looking. Metadata only. Mildly accusatory."
        videoSrc="/videos/hero-damage.mp4"
        stats={overviewStats}
      />

      <section className="layout-grid pt-8">
        <div className="section-frame section-frame-strong span-12">
          <div className="section-split">
            <div className="stack-lg">
              <p className="eyebrow">Intelligence Wall</p>
              <h2 className="section-title">
                The home screen starts with the damage, not the marketing.
              </h2>
            </div>
            <p className="copy-muted max-w-2xl">
              Each panel is clickable and points toward the drill-downs defined
              in the PRD: sessions, projects, tools, devices, and share flows.
            </p>
          </div>
        </div>
      </section>

      <InsightPanels panels={dashboardHighlights} />

      <SectionBlock
        id="autopsy"
        eyebrow="Session Autopsy"
        title="Most expensive conversation with a machine"
        description="This detail view treats a Claude Code session like an incident review. Prompt text is absent by design. The metadata is enough."
      >
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.85fr]">
          <div className="section-frame">
            <div className="section-split section-split-tight">
              <div>
                <p className="subtle-kicker">Session</p>
                <h3 className="record-title">{sessionAutopsy.name}</h3>
              </div>
              <Link className="inline-link" href={`/sessions/${sessionAutopsy.id}`}>
                Open full autopsy
              </Link>
            </div>

            <div className="metric-rail metric-rail-tight">
              <MetricCluster items={sessionAutopsy.metrics} compact />
            </div>

            <Timeline items={sessionAutopsy.timeline} />
          </div>

          <div className="stack-md">
            <div className="section-frame section-frame-soft">
              <p className="subtle-kicker">Derived Signals</p>
              <DataList items={sessionAutopsy.signals} />
            </div>
            <div className="section-frame section-frame-soft">
              <p className="subtle-kicker">Internal Standing</p>
              <div className="stack-sm">
                <h3 className="record-title">
                  {rankingSnapshot.percentile} of users had a calmer week.
                </h3>
                <p className="copy-muted">{rankingSnapshot.summary}</p>
              </div>
              <DataList items={rankingSnapshot.dimensions} />
            </div>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        id="truth"
        eyebrow="Truth Model"
        title="What counts, what does not, and who owns the facts"
        description="The product is only useful if attribution quality is obvious. Local helper telemetry is canonical. Browser signals are convenience until proven otherwise."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {telemetryCoverage.map((item) => (
            <article className="section-frame section-frame-soft" key={item.name}>
              <p className="subtle-kicker">{item.confidence}</p>
              <h3 className="record-title">{item.name}</h3>
              <p className="copy-muted">{item.description}</p>
              <ul className="detail-list">
                {item.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
