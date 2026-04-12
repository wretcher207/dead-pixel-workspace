"use client";

import { useState } from "react";

type CreateResult = {
  ok: boolean;
  slug?: string;
  url?: string;
  error?: string;
};

export function ShareCreator() {
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<CreateResult | null>(null);
  const [redactions, setRedactions] = useState({
    projectAliases: false,
    machineNames: false,
    exactCosts: false,
    topSessionNames: false,
    rankingVisible: true,
  });

  async function submit() {
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/shares", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          visibility,
          redactionConfig: redactions,
        }),
      });
      const payload = (await response.json()) as CreateResult;
      setResult(payload);
    } catch (error) {
      setResult({
        ok: false,
        error: error instanceof Error ? error.message : "Failed to create share.",
      });
    } finally {
      setPending(false);
    }
  }

  function toggle(key: keyof typeof redactions) {
    setRedactions((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="share-creator">
      <div className="share-creator-row">
        <span className="share-creator-label">Visibility</span>
        <div className="share-creator-toggle">
          <button
            type="button"
            className={`share-pill ${visibility === "private" ? "share-pill-active" : ""}`}
            onClick={() => setVisibility("private")}
          >
            Private link
          </button>
          <button
            type="button"
            className={`share-pill ${visibility === "public" ? "share-pill-active" : ""}`}
            onClick={() => setVisibility("public")}
          >
            Public page
          </button>
        </div>
      </div>

      <fieldset className="share-creator-row share-creator-redactions">
        <legend className="share-creator-label">Redactions</legend>
        {(
          [
            ["projectAliases", "Hide project aliases"],
            ["machineNames", "Hide machine names"],
            ["exactCosts", "Obscure exact costs"],
            ["topSessionNames", "Hide top session names"],
            ["rankingVisible", "Show ranking"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="share-checkbox">
            <input
              type="checkbox"
              checked={redactions[key]}
              onChange={() => toggle(key)}
            />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="button"
        className="share-submit"
        onClick={submit}
        disabled={pending}
      >
        {pending ? "Creating" : "Create receipt"}
      </button>

      {result?.ok && result.url ? (
        <p className="share-result">
          Ready at{" "}
          <a className="share-result-link" href={result.url}>
            {result.url}
          </a>
        </p>
      ) : null}
      {result && !result.ok ? (
        <p className="share-result share-result-error">{result.error}</p>
      ) : null}
    </div>
  );
}
