import Link from "next/link";
import { getServerSession } from "next-auth";
import { AppShell } from "@/components/receipts-ui";
import { RealtimePulse } from "@/components/realtime-pulse";
import { authOptions } from "@/lib/auth";
import { siteNavigation } from "@/lib/navigation";
import { loadHomepageSummary } from "@/lib/receipts-queries";

export const dynamic = "force-dynamic";

function formatCents(cents: number): string {
  const dollars = cents / 100;
  if (Math.abs(dollars) >= 1000) return `$${(dollars / 1000).toFixed(1)}k`;
  if (Math.abs(dollars) >= 100) return `$${dollars.toFixed(0)}`;
  if (Math.abs(dollars) >= 10) return `$${dollars.toFixed(1)}`;
  return `$${dollars.toFixed(2)}`;
}

function formatTokens(total: number): string {
  if (total >= 1_000_000_000) return `${(total / 1_000_000_000).toFixed(2)}B`;
  if (total >= 1_000_000) return `${(total / 1_000_000).toFixed(1)}M`;
  if (total >= 1_000) return `${(total / 1_000).toFixed(1)}k`;
  return String(total);
}

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m}m`;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;
  const summary = await loadHomepageSummary(userId);
  const demoMode = !summary?.hasRealData;

  return (
    <AppShell currentPath="/" navigation={siteNavigation}>
      {/* Compact hero: title + CTA only. Metrics live in the realtime panel. */}
      <section className="home-hero">
        <div className="layout-grid">
          <div className="span-12 home-hero-compact">
            <p className="eyebrow">Realtime Telemetry</p>
            <h1 className="home-hero-title">Claude&apos;s Receipts</h1>
            <p className="home-hero-copy">
              Live agent deployments, tool calls, token burn, and context usage.
              Polls every four seconds. Metadata only.
            </p>
            {demoMode && (
              <div className="home-hero-cta">
                <Link className="cta-primary" href="/login">
                  Connect a device
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Realtime pulse: the centerpiece */}
      <section className="rt-section">
        <div className="layout-grid">
          <div className="span-12">
            {userId ? (
              <RealtimePulse />
            ) : (
              <div className="rt-shell rt-shell-empty">
                <header className="rt-header">
                  <span className="rt-dot rt-dot-idle" />
                  <span className="rt-title">Not connected</span>
                  <span className="rt-status">
                    Sign in and pair a device to see live telemetry.
                  </span>
                </header>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Time windows: today / 7d / lifetime */}
      {summary?.hasRealData && (
        <section className="tw-section">
          <div className="layout-grid">
            {summary.windows.map((w, idx) => (
              <div className={`span-4 tw-col${idx === 0 ? " tw-col-now" : ""}`} key={w.label}>
                <p className="tw-label">{w.label}</p>
                <dl className="tw-dl">
                  <div className="tw-row">
                    <dt>Sessions</dt>
                    <dd>{w.sessions.toLocaleString()}</dd>
                  </div>
                  <div className="tw-row">
                    <dt>Tokens</dt>
                    <dd>{formatTokens(w.tokens)}</dd>
                  </div>
                  <div className="tw-row">
                    <dt>Cost</dt>
                    <dd className="tw-cost">{formatCents(w.costCents)}</dd>
                  </div>
                  <div className="tw-row">
                    <dt>Active time</dt>
                    <dd>
                      {w.activeMinutes > 0
                        ? w.activeMinutes >= 60
                          ? `${Math.floor(w.activeMinutes / 60)}h ${String(w.activeMinutes % 60).padStart(2, "0")}m`
                          : `${w.activeMinutes}m`
                        : "—"}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Breakdowns: top projects 7d + top agents 7d */}
      {summary?.hasRealData &&
        (summary.topProjects7d.length > 0 ||
          summary.topAgents7d.length > 0) && (
          <section className="bd-section">
            <div className="layout-grid">
              {summary.topProjects7d.length > 0 && (
                <div className="span-6 bd-card bd-card-dominant">
                  <p className="bd-eyebrow">Top projects — 7d</p>
                  <ul className="bd-list">
                    {summary.topProjects7d.map((p) => (
                      <li key={p.name}>
                        <span className="bd-list-name">{p.name}</span>
                        <span className="bd-list-meta">
                          {p.sessions} sessions
                        </span>
                        <span className="bd-list-value">
                          {formatCents(p.costCents)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {summary.topAgents7d.length > 0 && (
                <div className="span-6 bd-card">
                  <p className="bd-eyebrow">Agent deployments — 7d</p>
                  <ul className="bd-list">
                    {summary.topAgents7d.map((a) => (
                      <li key={a.name}>
                        <span className="bd-list-name">Task → {a.name}</span>
                        <span className="bd-list-meta">subagent</span>
                        <span className="bd-list-value">{a.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {summary.topAgents7d.length === 0 && (
                <div className="span-6 bd-card bd-card-empty">
                  <p className="bd-eyebrow">Agent deployments — 7d</p>
                  <p className="bd-empty">No agents dispatched this week.</p>
                </div>
              )}
            </div>
          </section>
        )}

      {/* Recent sessions strip */}
      {summary?.hasRealData && summary.recentSessions.length > 0 && (
        <section className="session-section">
          <div className="layout-grid">
            <div className="span-12">
              <div className="session-strip-header">
                <p className="session-strip-eyebrow">Recent Sessions</p>
                <Link className="session-strip-link" href="/sessions">
                  Full archive &rarr;
                </Link>
              </div>
              <div className="session-strip">
                {summary.recentSessions.slice(0, 3).map((s) => (
                  <Link
                    key={s.id}
                    href={`/sessions/${s.id}`}
                    className="session-strip-item"
                  >
                    <p className="session-strip-project">{s.project}</p>
                    <p className="session-strip-name">
                      {s.model ?? `Session ${s.id.slice(0, 8)}`}
                    </p>
                    <div className="session-strip-footer">
                      <p className="session-strip-cost">
                        {formatCents(s.costCents)}
                      </p>
                      <p className="session-strip-meta">
                        {formatDuration(s.durationSeconds)}
                        <br />
                        {formatTokens(s.tokens)} tokens
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </AppShell>
  );
}
