"use client";

import { motion } from "framer-motion";
import { artists } from "@/data/artists";

export default function Artists() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="artists"
      style={{
        padding: "120px 0",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            marginBottom: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "16px" }}>
              The Artists
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 400,

                color: "var(--color-cream)",
                lineHeight: 1.05,
              }}
            >
              Your artist matters
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              maxWidth: "320px",
              lineHeight: 1.7,
            }}
          >
            Four artists with different styles, all holding to the same standard.
          </p>
        </motion.div>

        {/* Artists grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1px",
            background: "var(--color-border)",
          }}
        >
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                background: "var(--color-surface)",
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  fontWeight: 400,
                  color: "var(--color-border-strong)",
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Name & title */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.9rem",
                    fontWeight: 400,
                    color: "var(--color-cream)",
                    lineHeight: 1.1,
                    marginBottom: "4px",
                  }}
                >
                  {artist.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                  }}
                >
                  {artist.title}
                </p>
              </div>

              {/* Specialty */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {artist.specialty}
              </p>

              {/* Divider */}
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "var(--color-border-strong)",
                }}
              />

              {/* Bio */}
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  fontWeight: 300,
                  color: "var(--color-cream-muted)",
                  lineHeight: 1.75,
                  flexGrow: 1,
                }}
              >
                {artist.bio}
              </p>

              {/* Style tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {artist.styles.map((style) => (
                  <span
                    key={style}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-muted)",
                      border: "1px solid var(--color-border-strong)",
                      padding: "3px 8px",
                      borderRadius: "1px",
                    }}
                  >
                    {style}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={scrollToBooking}
                style={{
                  marginTop: "4px",
                  background: "transparent",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-cream-muted)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  cursor: "pointer",
                  transition: "border-color 0.2s, color 0.2s",
                  borderRadius: "2px",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-cream-muted)";
                }}
              >
                Book with {artist.name} →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
