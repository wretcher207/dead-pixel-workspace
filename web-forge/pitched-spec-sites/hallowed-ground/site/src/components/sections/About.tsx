"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 0",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
            }}
          >
            <Image
              src="/interior.jpg"
              alt="Hallowed Ground Tattoo interior — Portland Maine custom tattoo studio"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gold accent border */}
            <div
              style={{
                position: "absolute",
                bottom: "-12px",
                right: "-12px",
                width: "60%",
                height: "60%",
                border: "1px solid rgba(196,151,90,0.25)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Stat badge */}
          <div
            className="about-stat-badge"
            style={{
              position: "absolute",
              bottom: "24px",
              left: "-20px",
              background: "var(--color-card)",
              border: "1px solid var(--color-border-strong)",
              padding: "20px 24px",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 400,
                color: "var(--color-gold)",
                lineHeight: 1,
                marginBottom: "4px",
              }}
            >
              36+
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              Years of craft
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="section-label" style={{ marginBottom: "20px" }}>
            About the Studio
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 400,

              color: "var(--color-cream)",
              lineHeight: 1.1,
              marginBottom: "32px",
            }}
          >
            Where craft has{" "}
            <span style={{ color: "var(--color-gold)" }}>always mattered</span>
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {[
              "Hallowed Ground has been part of Congress Street for over three decades. It started with Matt and a belief that custom tattooing should be treated like what it actually is — fine art. That belief hasn't changed.",
              "Today the studio runs with a tight crew of four artists, each with their own style and voice, all holding to the same standard: no rush, no shortcuts, no settling for close enough. You sit down with your artist, work through the concept together, and leave with something made specifically for you.",
              "The shop is clean, the atmosphere is low-pressure, and the prices are fair. Portland has a lot of tattoo spots. Hallowed Ground is the kind you come back to.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  color: "var(--color-cream-muted)",
                  lineHeight: 1.8,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          <div
            style={{
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "4", label: "Artists on Staff" },
              { value: "Custom", label: "Every Piece" },
              { value: "Portland", label: "Maine's Best" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.75rem",
                    fontWeight: 400,
                    color: "var(--color-cream)",
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second image row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "1200px",
          margin: "80px auto 0",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "3px",
        }}
        className="about-image-row"
      >
        <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src="/interior-2.jpg"
            alt="Hallowed Ground Tattoo studio Portland Maine — interior workspace"
            fill
            style={{ objectFit: "cover", filter: "brightness(0.9)" }}
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <Image
            src="/shop-window.jpg"
            alt="Hallowed Ground Tattoo shop front on Congress Street Portland Maine"
            fill
            style={{ objectFit: "cover", filter: "brightness(0.9)" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .about-image-row {
            grid-template-columns: 1fr !important;
          }
          .about-stat-badge {
            left: 0 !important;
            bottom: -12px !important;
          }
        }
      `}</style>
    </section>
  );
}
