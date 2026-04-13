import { ImageResponse } from "next/og";
import { eq } from "drizzle-orm";
import { shares } from "@/db/schema";
import { getDb } from "@/lib/db";
import { loadDashboardData } from "@/lib/receipts-queries";

export const dynamic = "force-dynamic";
export const alt = "A Claude Code receipt. Metadata-only. Mildly incriminating.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fetch a TTF from Google Fonts via old UA to avoid woff2
async function loadFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
        },
      },
    ).then((r) => r.text());

    const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
    if (!url) return null;
    return fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Data
  let lifetimeValue: string | null = null;
  let monthLabel: string | null = null;
  let qualityLabel: string | null = null;
  let isPublic = true;

  const db = getDb();
  if (db) {
    const share = await db.query.shares.findFirst({
      where: eq(shares.shareSlug, slug),
    });

    if (share) {
      isPublic = share.visibility === "public";
      const redaction = (share.redactionConfig ?? {}) as { exactCosts?: boolean };

      const data = await loadDashboardData(share.userId);

      if (data?.overviewStats) {
        const lifetime = data.overviewStats[0];
        if (lifetime) {
          lifetimeValue = redaction.exactCosts ? "$•••" : lifetime.value;
        }
        const month = data.overviewStats.find((s) =>
          s.label.toLowerCase().includes("burn"),
        );
        if (month) {
          monthLabel = redaction.exactCosts ? "$•••" : month.value;
        }
      }

      if (data?.highlights) {
        const qualPanel = data.highlights.find((h) =>
          h.label.toLowerCase().includes("quality"),
        );
        if (qualPanel) qualityLabel = qualPanel.value;
      }
    }
  }

  // Fonts
  const [frauncesData, frauncesLightData] = await Promise.all([
    loadFont("Fraunces", 400),
    loadFont("Fraunces", 300),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 300 | 400; style: "normal" }[] = [];
  if (frauncesData) fonts.push({ name: "Fraunces", data: frauncesData, weight: 400, style: "normal" });
  if (frauncesLightData) fonts.push({ name: "Fraunces", data: frauncesLightData, weight: 300, style: "normal" });

  const displayFont = fonts.length > 0 ? "Fraunces" : "Georgia, serif";
  const monoFont = "ui-monospace, monospace";

  const headline = isPublic ? "Receipt, published." : "Receipt, held privately.";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#070706",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm top gradient */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 320,
            background:
              "linear-gradient(180deg, rgba(203,181,138,0.13) 0%, rgba(203,181,138,0.04) 55%, transparent 100%)",
          }}
        />

        {/* Subtle grid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.6,
          }}
        />

        {/* Left edge gold rule */}
        <div
          style={{
            position: "absolute",
            top: 56,
            bottom: 56,
            left: 72,
            width: 1,
            background:
              "linear-gradient(180deg, transparent, rgba(203,181,138,0.35) 20%, rgba(203,181,138,0.35) 80%, transparent)",
          }}
        />

        {/* Main content — two columns */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            flex: 1,
            paddingTop: 72,
            paddingBottom: 72,
            paddingLeft: 108,
            paddingRight: 80,
            position: "relative",
          }}
        >
          {/* Left: branding + headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
              paddingRight: 56,
            }}
          >
            {/* Top: kicker */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 12,
                  fontWeight: 400,
                  letterSpacing: 4,
                  color: "#cbb58a",
                  textTransform: "uppercase",
                }}
              >
                Claude&apos;s Receipts
              </div>

              {/* Divider */}
              <div
                style={{
                  width: 36,
                  height: 1,
                  background: "rgba(203,181,138,0.4)",
                }}
              />
            </div>

            {/* Middle: headline */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: displayFont,
                  fontSize: 64,
                  fontWeight: 400,
                  color: "#ede5d9",
                  letterSpacing: -2,
                  lineHeight: 1.0,
                }}
              >
                {headline}
              </div>

              {qualityLabel && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "#cbb58a",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: monoFont,
                      fontSize: 13,
                      letterSpacing: 1,
                      color: "#a99d8d",
                    }}
                  >
                    {qualityLabel}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom: tagline */}
            <div
              style={{
                fontFamily: monoFont,
                fontSize: 11,
                letterSpacing: 3,
                color: "rgba(169,157,141,0.55)",
                textTransform: "uppercase",
              }}
            >
              Metadata-only · Mildly incriminating
            </div>
          </div>

          {/* Right: stats panel */}
          {lifetimeValue && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 0,
                width: 320,
                flexShrink: 0,
              }}
            >
              {/* Outer border frame */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgba(233,222,205,0.14)",
                  background:
                    "linear-gradient(180deg, rgba(28,25,21,0.96), rgba(16,14,12,0.98))",
                  padding: 2,
                }}
              >
                {/* Inner border */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(233,222,205,0.05)",
                    paddingTop: 36,
                    paddingBottom: 36,
                    paddingLeft: 32,
                    paddingRight: 32,
                    gap: 8,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: monoFont,
                      fontSize: 10,
                      letterSpacing: 4,
                      color: "#a99d8d",
                      textTransform: "uppercase",
                    }}
                  >
                    Lifetime damage
                  </div>

                  <div
                    style={{
                      fontFamily: displayFont,
                      fontSize: 68,
                      fontWeight: 300,
                      color: "#cbb58a",
                      letterSpacing: -2,
                      lineHeight: 1.0,
                    }}
                  >
                    {lifetimeValue}
                  </div>

                  {monthLabel && (
                    <>
                      <div
                        style={{
                          width: "100%",
                          height: 1,
                          background: "rgba(233,222,205,0.08)",
                          marginTop: 12,
                          marginBottom: 12,
                        }}
                      />
                      <div
                        style={{
                          fontFamily: monoFont,
                          fontSize: 10,
                          letterSpacing: 4,
                          color: "#a99d8d",
                          textTransform: "uppercase",
                        }}
                      >
                        30-day burn
                      </div>
                      <div
                        style={{
                          fontFamily: displayFont,
                          fontSize: 32,
                          fontWeight: 400,
                          color: "#ede5d9",
                          letterSpacing: -1,
                          lineHeight: 1.0,
                        }}
                      >
                        {monthLabel}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* If no data: centered standalone text */}
          {!lifetimeValue && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: 320,
                flexShrink: 0,
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  letterSpacing: 4,
                  color: "#a99d8d",
                  textTransform: "uppercase",
                }}
              >
                Claude Code usage
              </div>
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "rgba(169,157,141,0.5)",
                }}
              >
                Tokens. Cost. Quality.
              </div>
              <div
                style={{
                  fontFamily: monoFont,
                  fontSize: 11,
                  letterSpacing: 2,
                  color: "rgba(169,157,141,0.5)",
                }}
              >
                All held in confidence.
              </div>
            </div>
          )}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(233,222,205,0.1) 20%, rgba(233,222,205,0.1) 80%, transparent)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 24,
            right: 80,
            fontFamily: monoFont,
            fontSize: 10,
            letterSpacing: 3,
            color: "rgba(169,157,141,0.4)",
            textTransform: "uppercase",
          }}
        >
          claudes-receipts.netlify.app
        </div>
      </div>
    ),
    {
      ...size,
      ...(fonts.length > 0 ? { fonts } : {}),
    },
  );
}
