"use client";

import { useEffect, useRef, useState } from "react";

type PulseWindow = {
  tools: number;
  prompts: number;
  agents: number;
  errors: number;
  apiRequests: number;
  tokens: number;
  costCents: number;
};

type FeedItem = {
  id: string;
  occurredAt: string;
  eventType: string;
  toolName: string | null;
  success: boolean | null;
  durationMs: number | null;
  project: string | null;
  sessionId: string;
};

type RealtimePayload = {
  now: string;
  hasData: boolean;
  active: {
    sessionId: string;
    isLive: boolean;
    startedAt: string;
    endedAt: string | null;
    lastEventAt: string | null;
    secondsSinceLastEvent: number | null;
    project: string | null;
    device: string | null;
    model: string | null;
    inputTokens: number;
    outputTokens: number;
    cacheTokens: number;
    costCents: number;
    contextTokens: number;
    contextLimit: number;
    contextPct: number;
  } | null;
  pulse: { "60s": PulseWindow; "5m": PulseWindow; "1h": PulseWindow };
  today: {
    sessions: number;
    tokens: number;
    costCents: number;
    activeMinutes: number;
  };
  compare: {
    todayCostCents: number;
    yesterdayCostCents: number;
    lastWeekCostCents: number;
  };
  topToolsHour: Array<{ tool: string; count: number }>;
  topAgentsHour: Array<{ agent: string; count: number }>;
  tokenSparkline: number[];
  feed: FeedItem[];
};

const POLL_MS = 4000;

function formatCents(cents: number): string {
  const dollars = cents / 100;
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

function formatAge(iso: string, nowMs: number): string {
  const age = Math.max(0, Math.floor((nowMs - new Date(iso).getTime()) / 1000));
  if (age < 60) return `${age}s`;
  if (age < 3600) return `${Math.floor(age / 60)}m`;
  return `${Math.floor(age / 3600)}h`;
}

function prettyEvent(item: FeedItem): string {
  if (item.eventType === "tool_completed") {
    return item.toolName ?? "tool";
  }
  if (item.eventType === "api_request_completed") return "api request";
  if (item.eventType === "api_error") return "api error";
  if (item.eventType === "prompt_submitted") return "prompt";
  if (item.eventType === "session_ended") return "session end";
  return item.eventType.replace(/_/g, " ");
}

function eventColor(item: FeedItem): string {
  if (item.eventType === "api_error" || item.success === false)
    return "var(--danger)";
  if (item.toolName === "Agent") return "var(--accent)";
  if (item.eventType === "prompt_submitted") return "var(--foreground)";
  return "var(--muted)";
}

export function RealtimePulse() {
  const [data, setData] = useState<RealtimePayload | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [heartbeat, setHeartbeat] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;
    async function tick() {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        const res = await fetch("/api/realtime", {
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const json = (await res.json()) as RealtimePayload;
        if (!mounted) return;
        setData(json);
        setErr(null);
      } catch (e) {
        if (!mounted) return;
        if ((e as Error).name === "AbortError") return;
        setErr((e as Error).message);
      }
    }
    tick();
    const pollId = setInterval(tick, POLL_MS);
    const beatId = setInterval(() => setHeartbeat((h) => h + 1), 1000);
    return () => {
      mounted = false;
      clearInterval(pollId);
      clearInterval(beatId);
      abortRef.current?.abort();
    };
  }, []);

  const nowMs = Date.now();
  void heartbeat;

  if (!data) {
    return (
      <section className="rt-shell">
        <header className="rt-header">
          <span className="rt-dot rt-dot-idle" />
          <span className="rt-title">Realtime</span>
          <span className="rt-status">
            {err ? `fetch failed: ${err}` : "connecting…"}
          </span>
        </header>
      </section>
    );
  }

  const { active, pulse, today, compare, topToolsHour, topAgentsHour, feed, tokenSparkline } = data;
  const isLive = active?.isLive ?? false;
  const maxSpark = Math.max(1, ...tokenSparkline);

  const deltaYesterday = compare.todayCostCents - compare.yesterdayCostCents;
  const deltaLastWeek = compare.todayCostCents - compare.lastWeekCostCents;

  return (
    <section className="rt-shell">
      <header className="rt-header">
        <span className={`rt-dot ${isLive ? "rt-dot-live" : "rt-dot-idle"}`} />
        <span className="rt-title">{isLive ? "Live" : active ? "Idle" : "Dormant"}</span>
        {active && (
          <span className="rt-status">
            {active.project ?? "unlabeled project"} · {active.model ?? "model unknown"} ·{" "}
            {isLive
              ? `${formatAge(active.startedAt, nowMs)} elapsed`
              : `last active ${active.lastEventAt ? formatAge(active.lastEventAt, nowMs) : "—"} ago`}
          </span>
        )}
        {!active && (
          <span className="rt-status">
            no session in the last 12 hours
          </span>
        )}
        {err && <span className="rt-err">· {err}</span>}
      </header>

      {active && (
        <div className={`rt-active ${isLive ? "" : "rt-active-idle"}`}>
          <div className="rt-active-row">
            <div className="rt-active-stat">
              <p className="rt-k">Tokens (session)</p>
              <p className="rt-v">
                {formatTokens(active.inputTokens + active.outputTokens + active.cacheTokens)}
              </p>
              <p className="rt-sub">
                in {formatTokens(active.inputTokens)} · out {formatTokens(active.outputTokens)} · cache {formatTokens(active.cacheTokens)}
              </p>
            </div>
            <div className="rt-active-stat">
              <p className="rt-k">Cost (session)</p>
              <p className="rt-v">{formatCents(active.costCents)}</p>
              <p className="rt-sub">
                last event {active.lastEventAt ? formatAge(active.lastEventAt, nowMs) : "—"} ago
              </p>
            </div>
            <div className="rt-active-stat rt-active-ctx">
              <p className="rt-k">Context window</p>
              <p className="rt-v">
                {formatTokens(active.contextTokens)}
                <span className="rt-sub-inline"> / {formatTokens(active.contextLimit)}</span>
              </p>
              <div className="rt-ctx-bar">
                <div
                  className="rt-ctx-fill"
                  style={{
                    width: `${Math.max(3, active.contextPct * 100).toFixed(1)}%`,
                    background:
                      active.contextPct > 0.85
                        ? "var(--danger)"
                        : active.contextPct > 0.6
                          ? "var(--accent)"
                          : "var(--success)",
                  }}
                />
              </div>
              <p className="rt-sub">
                {(active.contextPct * 100).toFixed(0)}% consumed
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="rt-pulse">
        {(["60s", "5m", "1h"] as const).map((win) => {
          const w = pulse[win];
          return (
            <div className="rt-pulse-col" key={win}>
              <p className="rt-pulse-label">Last {win}</p>
              <dl className="rt-pulse-dl">
                <PulseRow k="Tool calls" v={w.tools} />
                <PulseRow k="Agent deployments" v={w.agents} accent={w.agents > 0} />
                <PulseRow k="Prompts" v={w.prompts} />
                <PulseRow k="API requests" v={w.apiRequests} />
                <PulseRow k="Errors" v={w.errors} danger={w.errors > 0} />
                <PulseRow k="Tokens" v={formatTokens(w.tokens)} />
                <PulseRow k="Cost" v={formatCents(w.costCents)} />
              </dl>
            </div>
          );
        })}
      </div>

      <div className="rt-grid">
        <div className="rt-card">
          <p className="rt-card-eyebrow">Tokens / minute — last hour</p>
          <div className="rt-spark">
            {tokenSparkline.map((t, i) => {
              const h = (t / maxSpark) * 100;
              return (
                <div
                  key={i}
                  className="rt-spark-bar"
                  style={{
                    height: `${Math.max(2, h).toFixed(1)}%`,
                    opacity: t === 0 ? 0.18 : 0.4 + (h / 100) * 0.6,
                  }}
                  title={`${formatTokens(t)} tokens`}
                />
              );
            })}
          </div>
          <p className="rt-card-detail">
            peak {formatTokens(maxSpark)} / min · now {formatTokens(tokenSparkline[59] ?? 0)}
          </p>
        </div>

        <div className="rt-card">
          <p className="rt-card-eyebrow">Top tools — last hour</p>
          {topToolsHour.length === 0 ? (
            <p className="rt-empty">no tool calls yet</p>
          ) : (
            <ul className="rt-list">
              {topToolsHour.map((t) => (
                <li key={t.tool}>
                  <span className="rt-list-name">{t.tool}</span>
                  <span className="rt-list-count">{t.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rt-card">
          <p className="rt-card-eyebrow">Agent deployments — last 24h</p>
          {topAgentsHour.length === 0 ? (
            <p className="rt-empty">no agents dispatched</p>
          ) : (
            <ul className="rt-list">
              {topAgentsHour.map((a) => (
                <li key={a.agent}>
                  <span className="rt-list-name">Task → {a.agent}</span>
                  <span className="rt-list-count">{a.count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rt-card">
          <p className="rt-card-eyebrow">Today vs prior</p>
          <ul className="rt-list">
            <li>
              <span className="rt-list-name">Today</span>
              <span className="rt-list-count">{formatCents(compare.todayCostCents)}</span>
            </li>
            <li>
              <span className="rt-list-name">Yesterday</span>
              <span className="rt-list-count">
                {formatCents(compare.yesterdayCostCents)}
                {compare.yesterdayCostCents > 0 && (
                  <em className={`rt-delta ${deltaYesterday >= 0 ? "up" : "down"}`}>
                    {deltaYesterday >= 0 ? "+" : ""}{formatCents(deltaYesterday)}
                  </em>
                )}
              </span>
            </li>
            <li>
              <span className="rt-list-name">Same day last week</span>
              <span className="rt-list-count">
                {formatCents(compare.lastWeekCostCents)}
                {compare.lastWeekCostCents > 0 && (
                  <em className={`rt-delta ${deltaLastWeek >= 0 ? "up" : "down"}`}>
                    {deltaLastWeek >= 0 ? "+" : ""}{formatCents(deltaLastWeek)}
                  </em>
                )}
              </span>
            </li>
            <li className="rt-list-sep">
              <span className="rt-list-name">Sessions today</span>
              <span className="rt-list-count">{today.sessions}</span>
            </li>
            <li>
              <span className="rt-list-name">Active time</span>
              <span className="rt-list-count">
                {today.activeMinutes > 0 ? `${today.activeMinutes}m` : "—"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="rt-feed">
        <p className="rt-card-eyebrow">Live event feed</p>
        {feed.length === 0 ? (
          <p className="rt-empty">nothing in the last hour</p>
        ) : (
          <ol className="rt-feed-list">
            {feed.map((item) => (
              <li key={item.id} className="rt-feed-row">
                <span
                  className="rt-feed-dot"
                  style={{ background: eventColor(item) }}
                />
                <span className="rt-feed-time">
                  {formatAge(item.occurredAt, nowMs)} ago
                </span>
                <span className="rt-feed-type">{prettyEvent(item)}</span>
                <span className="rt-feed-project">
                  {item.project ?? "—"}
                </span>
                <span className="rt-feed-meta">
                  {item.durationMs ? `${item.durationMs}ms` : ""}
                  {item.success === false ? " · failed" : ""}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function PulseRow({
  k,
  v,
  danger,
  accent,
}: {
  k: string;
  v: number | string;
  danger?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="rt-pulse-row">
      <dt>{k}</dt>
      <dd
        style={{
          color: danger
            ? "var(--danger)"
            : accent
              ? "var(--accent)"
              : "var(--foreground)",
        }}
      >
        {v}
      </dd>
    </div>
  );
}
