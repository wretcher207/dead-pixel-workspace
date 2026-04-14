"use client";

import { useState } from "react";

type RegisterResponse = {
  ok: boolean;
  deviceId?: string;
  ingestKey?: string;
  deepLinkUrl?: string;
  error?: string;
};

export function DeviceRegister() {
  const [nickname, setNickname] = useState("");
  const [platform, setPlatform] = useState("Windows desktop");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<RegisterResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const response = await fetch("/api/devices/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: nickname.trim() || undefined,
          platform: platform.trim() || undefined,
        }),
      });
      const data: RegisterResponse = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        ok: false,
        error: err instanceof Error ? err.message : "Registration failed.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="section-frame section-frame-soft stack-md">
      <div className="stack-sm">
        <p className="subtle-kicker">Register a New Device</p>
        <h3 className="record-title">Pair this machine with the helper app</h3>
      </div>

      {!result?.ok && (
        <form onSubmit={handleSubmit} className="stack-md">
          <label className="stack-xs">
            <span className="subtle-kicker">Nickname</span>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Workstation North"
              className="register-input"
              maxLength={80}
            />
          </label>
          <label className="stack-xs">
            <span className="subtle-kicker">Platform</span>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="Windows desktop"
              className="register-input"
              maxLength={40}
            />
          </label>
          <button type="submit" disabled={submitting} className="register-submit">
            {submitting ? "Registering…" : "Create Device"}
          </button>
          {result?.error && (
            <p className="copy-muted" style={{ color: "var(--danger)" }}>
              {result.error}
            </p>
          )}
        </form>
      )}

      {result?.ok && result.deepLinkUrl && (
        <div className="stack-md">
          <p className="copy-muted">
            Device created. Click below to open Claude&apos;s Receipts and complete pairing automatically.
          </p>
          <a href={result.deepLinkUrl} className="register-cta">
            Open in App
          </a>
          <details className="stack-sm">
            <summary className="subtle-kicker" style={{ cursor: "pointer" }}>
              Or copy credentials manually
            </summary>
            <p className="copy-muted" style={{ fontSize: "0.78rem" }}>
              Device ID: <code>{result.deviceId}</code>
            </p>
            <p className="copy-muted" style={{ fontSize: "0.78rem", wordBreak: "break-all" }}>
              Ingest Key: <code>{result.ingestKey}</code>
            </p>
          </details>
        </div>
      )}
    </article>
  );
}
