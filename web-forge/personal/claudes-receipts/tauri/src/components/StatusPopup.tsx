import { open as openUrl } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";
import { getAgentStatus, setPaused } from "../lib/tauri";
import type { AgentState, AgentStatusResponse } from "../lib/types";

function formatTimestamp(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function StateBadge({ state }: { state: AgentState }) {
  const map: Record<string, { label: string; color: string }> = {
    watching: { label: "Active", color: "#8ea783" },
    paused: { label: "Paused", color: "#a99d8d" },
    auth_error: { label: "Auth Error", color: "#d17c64" },
    unconfigured: { label: "Not Configured", color: "#d17c64" },
  };
  const { label, color } = map[state.status] ?? { label: state.status, color: "#a99d8d" };
  return (
    <span
      style={{
        color,
        fontFamily: "ui-monospace, monospace",
        fontSize: "0.68rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

export default function StatusPopup() {
  const [data, setData] = useState<AgentStatusResponse | null>(null);
  const [paused, setPausedLocal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const status = await getAgentStatus();
        setData(status);
        setPausedLocal(status.state.status === "paused");
      } catch {
        // IPC may briefly fail during startup — retry on next tick
      }
    };
    void load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePause = async () => {
    const next = !paused;
    try {
      await setPaused(next);
      setPausedLocal(next);
      const status = await getAgentStatus();
      setData(status);
    } catch {
      // ignore
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1rem 0.75rem",
          borderBottom: "1px solid var(--stroke)",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.02em" }}>
          Claude&apos;s Receipts
        </span>
        {data && <StateBadge state={data.state} />}
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          padding: "0.75rem 1rem",
        }}
      >
        {data?.state.status === "watching" && (
          <>
            <Row label="Last flush" value={formatTimestamp(data.state.last_flush_unix_ms)} />
            <Row label="Sessions this run" value={String(data.state.sessions_tracked)} />
          </>
        )}
        {data?.state.status === "auth_error" && (
          <p style={{ fontSize: "0.8rem", color: "#d17c64", margin: 0 }}>
            Credential failure. Open Settings to re-pair.
          </p>
        )}
        {data?.state.status === "unconfigured" && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>
            Not configured. Open Settings to pair a device.
          </p>
        )}
        {data?.state.status === "paused" && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>
            Agent is paused.
          </p>
        )}
        {!data && (
          <p style={{ fontSize: "0.8rem", color: "var(--muted)", margin: 0 }}>
            Loading…
          </p>
        )}
      </div>

      {/* Footer actions */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem 1rem",
          borderTop: "1px solid var(--stroke)",
        }}
      >
        <button
          onClick={handleTogglePause}
          style={{
            fontSize: "0.7rem",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            padding: "0.4rem 0.7rem",
            border: "1px solid var(--stroke)",
            color: "var(--muted)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          {paused ? "Resume" : "Pause"}
        </button>
        <button
          onClick={() => void openUrl("https://claudes-receipts.netlify.app")}
          style={{
            marginLeft: "auto",
            fontSize: "0.7rem",
            fontFamily: "ui-monospace, monospace",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            padding: "0.4rem 0.7rem",
            border: "1px solid rgba(203,181,138,0.4)",
            color: "var(--accent)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Dashboard →
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <span
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
