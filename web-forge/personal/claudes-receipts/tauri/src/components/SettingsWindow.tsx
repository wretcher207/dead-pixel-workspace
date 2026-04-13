import { disable, enable, isEnabled } from "@tauri-apps/plugin-autostart";
import { open as openUrl } from "@tauri-apps/plugin-shell";
import { useEffect, useState } from "react";
import { getConfig, saveConfig } from "../lib/tauri";
import type { HelperConfig } from "../lib/types";

const SURFACES = ["desktop", "ide", "terminal"] as const;

export default function SettingsWindow() {
  const [config, setConfig] = useState<HelperConfig>({
    endpoint: "https://claudes-receipts.netlify.app",
    deviceId: "",
    ingestKey: "",
    surface: "desktop",
  });
  const [showKey, setShowKey] = useState(false);
  const [autostart, setAutostart] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    void getConfig().then((c) => { if (c) setConfig(c); });
    void isEnabled().then(setAutostart);
  }, []);

  const handleSave = async () => {
    await saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAutostartToggle = async () => {
    if (autostart) { await disable(); setAutostart(false); }
    else { await enable(); setAutostart(true); }
  };

  const handleRepair = () => {
    void openUrl(`${config.endpoint}/devices`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "1.5rem",
        gap: "1.25rem",
        background: "var(--background)",
        color: "var(--foreground)",
        overflow: "auto",
      }}
    >
      <h1 style={{ fontSize: "1rem", fontWeight: 600, margin: 0, letterSpacing: "0.02em" }}>
        Settings
      </h1>

      <Section title="Connection">
        <Field label="Endpoint">
          <input
            type="url"
            value={config.endpoint}
            onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
            style={inputStyle}
          />
        </Field>
        <Field label="Device ID">
          <input type="text" value={config.deviceId} readOnly style={{ ...inputStyle, opacity: 0.6 }} />
        </Field>
        <Field label="Ingest Key">
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type={showKey ? "text" : "password"}
              value={config.ingestKey}
              readOnly
              style={{ ...inputStyle, flex: 1, opacity: 0.6 }}
            />
            <button onClick={() => setShowKey(!showKey)} style={ghostBtn}>
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <button onClick={handleRepair} style={accentBtn}>Re-pair Device</button>
      </Section>

      <Section title="Agent">
        <Field label="Surface">
          <select
            value={config.surface}
            onChange={(e) => setConfig({ ...config, surface: e.target.value })}
            style={inputStyle}
          >
            {SURFACES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
      </Section>

      <Section title="System">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Start on login</span>
          <button onClick={handleAutostartToggle} style={autostart ? accentBtn : ghostBtn}>
            {autostart ? "On" : "Off"}
          </button>
        </div>
      </Section>

      <div style={{ marginTop: "auto" }}>
        <button onClick={handleSave} style={accentBtn}>
          {saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <p
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--muted)",
          margin: 0,
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <label style={{ fontSize: "0.72rem", color: "var(--muted)" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid var(--stroke)",
  color: "var(--foreground)",
  padding: "0.45rem 0.65rem",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  width: "100%",
};

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  border: "1px solid var(--stroke)",
  color: "var(--muted)",
  padding: "0.4rem 0.8rem",
  fontSize: "0.72rem",
  fontFamily: "ui-monospace, monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: "pointer",
};

const accentBtn: React.CSSProperties = {
  background: "rgba(203,181,138,0.1)",
  border: "1px solid rgba(203,181,138,0.4)",
  color: "var(--accent)",
  padding: "0.5rem 1rem",
  fontSize: "0.72rem",
  fontFamily: "ui-monospace, monospace",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  cursor: "pointer",
};
