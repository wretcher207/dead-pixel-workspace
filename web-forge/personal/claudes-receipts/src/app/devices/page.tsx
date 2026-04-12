import { getServerSession } from "next-auth";
import { AppShell, DataList, PageHeader, SectionBlock } from "@/components/receipts-ui";
import { authOptions } from "@/lib/auth";
import { deviceSummary, devices as deviceMocks } from "@/lib/receipts-data";
import { siteNavigation } from "@/lib/navigation";
import { loadDeviceCards } from "@/lib/receipts-queries";

export const metadata = {
  title: "Devices",
};

export const dynamic = "force-dynamic";

export default async function DevicesPage() {
  const session = await getServerSession(authOptions);
  const live = await loadDeviceCards(session?.user?.id ?? null);
  const cards = live && live.length > 0 ? live : deviceMocks;
  const demoMode = !live || live.length === 0;

  return (
    <AppShell currentPath="/devices" navigation={siteNavigation}>
      <PageHeader
        eyebrow={demoMode ? "Demo Devices" : "Surfaces And Machines"}
        title="Local, remote-controlled, and lightly incriminating"
        description="Device analysis separates machine identity from interaction mode so remote control sessions are still counted by the box that actually did the work."
        videoSrc="/videos/devices-floor.mp4"
        stats={deviceSummary}
      />

      <SectionBlock
        eyebrow="Machine Ledger"
        title="Multiple devices under one account"
        description="Nicknames, distribution, remote-control share, and helper status are all represented here because the local helper app owns truth."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {cards.map((device) => (
            <article
              className="section-frame"
              key={"id" in device ? String(device.id) : device.name}
            >
              <div className="stack-sm">
                <p className="subtle-kicker">{device.surfaceMix}</p>
                <h3 className="record-title">{device.name}</h3>
                <p className="copy-muted">{device.summary}</p>
              </div>
              <DataList items={device.facts} />
            </article>
          ))}
        </div>
      </SectionBlock>
    </AppShell>
  );
}
