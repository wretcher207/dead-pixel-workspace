import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import {
  AppShell,
  DataList,
  MetricCluster,
  PageHeader,
  SectionBlock,
  Timeline,
} from "@/components/receipts-ui";
import { authOptions } from "@/lib/auth";
import { siteNavigation } from "@/lib/navigation";
import { getSessionById } from "@/lib/receipts-data";
import { loadSessionDetail } from "@/lib/receipts-queries";

type SessionPageProps = {
  params: Promise<{
    sessionId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const mock = getSessionById(sessionId);
  return {
    title: mock ? mock.name : "Session",
  };
}

export default async function SessionDetailPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  const authSession = await getServerSession(authOptions);
  const userId = authSession?.user?.id ?? null;

  const live = await loadSessionDetail(userId, sessionId);
  const session = live ?? getSessionById(sessionId);

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
