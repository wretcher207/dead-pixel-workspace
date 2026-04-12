import { AppShell, PageHeader, RecordTable, SectionBlock } from "@/components/receipts-ui";
import { siteNavigation } from "@/lib/navigation";
import { sessionColumns, sessionSummary, sessions } from "@/lib/receipts-data";

export const metadata = {
  title: "Sessions",
};

export default function SessionsPage() {
  return (
    <AppShell currentPath="/sessions" navigation={siteNavigation}>
      <PageHeader
        eyebrow="Forensic Archive"
        title="Sessions Index"
        description="Searchable in spirit, filterable in design, and already shaped around the fields from the PRD."
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
          rows={sessions.map((session) => ({
            id: session.id,
            href: `/sessions/${session.id}`,
            values: [
              session.name,
              session.project,
              session.surface,
              session.device,
              session.costLabel,
              session.duration,
              session.retryLabel,
            ],
          }))}
        />
      </SectionBlock>
    </AppShell>
  );
}
