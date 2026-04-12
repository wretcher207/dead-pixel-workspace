import { notFound } from "next/navigation";
import {
  AppShell,
  DataList,
  MetricCluster,
  PageHeader,
  SectionBlock,
  Timeline,
} from "@/components/receipts-ui";
import { siteNavigation } from "@/lib/navigation";
import { getSessionById, sessions } from "@/lib/receipts-data";

type SessionPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export function generateStaticParams() {
  return sessions.map((session) => ({
    sessionId: session.id,
  }));
}

export async function generateMetadata({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const session = getSessionById(sessionId);

  return {
    title: session ? session.name : "Session",
  };
}

export default async function SessionDetailPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const session = getSessionById(sessionId);

  if (!session) {
    notFound();
  }

  return (
    <AppShell currentPath="/sessions" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Autopsy"
        title={session.name}
        description={session.summary}
        videoSrc="/videos/sessions-chaos.mp4"
        stats={session.headerStats}
      />

      <SectionBlock
        eyebrow="Timeline"
        title="Ordered metadata-only reconstruction"
        description="Prompt contents stay out of storage. Ordered events still explain exactly where the session veered off."
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="section-frame">
            <Timeline items={session.timeline} />
          </div>
          <div className="stack-md">
            <div className="section-frame section-frame-soft">
              <p className="subtle-kicker">Session Fields</p>
              <MetricCluster items={session.detailMetrics} compact />
            </div>
            <div className="section-frame section-frame-soft">
              <p className="subtle-kicker">Signals</p>
              <DataList items={session.signals} />
            </div>
          </div>
        </div>
      </SectionBlock>
    </AppShell>
  );
}
