import { getServerSession } from "next-auth";
import { AppShell, PageHeader, RecordTable, SectionBlock } from "@/components/receipts-ui";
import { authOptions } from "@/lib/auth";
import { siteNavigation } from "@/lib/navigation";
import {
  sessionColumns,
  sessionSummary,
  sessions as sessionMocks,
} from "@/lib/receipts-data";
import { loadSessionsIndex } from "@/lib/receipts-queries";

export const metadata = {
  title: "Sessions",
};

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const live = await loadSessionsIndex(userId);
  const records = live && live.length > 0 ? live : sessionMocks;
  const demoMode = !live || live.length === 0;

  return (
    <AppShell currentPath="/sessions" navigation={siteNavigation}>
      <PageHeader
        eyebrow={demoMode ? "Demo Archive" : "Forensic Archive"}
        title="Sessions Index"
        description={
          demoMode
            ? "Nothing ingested yet. These rows are a placeholder shape. Pair a device to replace them."
            : "Searchable in spirit, filterable in design, and shaped around the PRD fields."
        }
        videoSrc="/videos/sessions-chaos.mp4"
        stats={sessionSummary}
      />

      <SectionBlock
        eyebrow="Archive"
        title="Every session rendered as evidence"
        description="The first pass groups what matters now: cost, tokens, device, surface, retries, remote-control presence, and whether the session held together."
      >
        <RecordTable
          columns={sessionColumns}
          rows={records.map((record) => ({
            id: record.id,
            href: `/sessions/${record.id}`,
            values: [
              record.name,
              record.project,
              record.surface,
              record.device,
              record.costLabel,
              record.duration,
              record.retryLabel,
            ],
          }))}
        />
      </SectionBlock>
    </AppShell>
  );
}
