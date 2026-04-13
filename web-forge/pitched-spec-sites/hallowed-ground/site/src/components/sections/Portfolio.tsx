"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioItems, styleFilters, artistFilters, type PortfolioItem } from "@/data/portfolio";
import Lightbox from "@/components/ui/Lightbox";

export default function Portfolio() {
  const [activeStyle, setActiveStyle] = useState("All");
  const [activeArtist, setActiveArtist] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filtered = portfolioItems.filter((item) => {
    const styleMatch = activeStyle === "All" || item.style === activeStyle;
    const artistMatch = activeArtist === "All" || item.artist === activeArtist;
    return styleMatch && artistMatch;
  });

  const lightboxItems = filtered;

  const handlePrev = () => {
    if (!lightboxItem) return;
    const idx = lightboxItems.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(lightboxItems[(idx - 1 + lightboxItems.length) % lightboxItems.length]);
  };

  const handleNext = () => {
    if (!lightboxItem) return;
    const idx = lightboxItems.findIndex((i) => i.id === lightboxItem.id);
    setLightboxItem(lightboxItems[(idx + 1) % lightboxItems.length]);
  };

  const filterBtnStyle = (active: boolean) => ({
    background: active ? "var(--color-gold)" : "transparent",
    border: `1px solid ${active ? "var(--color-gold)" : "var(--color-border-strong)"}`,
    color: active ? "var(--color-bg)" : "var(--color-cream-muted)",
    fontFamily: "var(--font-body)",
    fontSize: "0.7rem",
    fontWeight: 400,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    padding: "7px 14px",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "2px",
    whiteSpace: "nowrap" as const,
  });

  return (
    <section
      id="portfolio"
      style={{
        padding: "120px 0 100px",
        background: "var(--color-bg)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "56px" }}
        >
          <p className="section-label" style={{ marginBottom: "16px" }}>
            The Work
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,

              color: "var(--color-cream)",
              lineHeight: 1.05,
              maxWidth: "500px",
            }}
          >
            Fine art on skin
          </h2>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: "48px" }}
        >
          {/* Style filter */}
          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Style
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {styleFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStyle(s)}
                  style={filterBtnStyle(activeStyle === s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Artist filter */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Artist
            </span>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {artistFilters.map((a) => (
                <button
                  key={a}
                  onClick={() => setActiveArtist(a)}
                  style={filterBtnStyle(activeArtist === a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "80px 0",
              textAlign: "center",
              color: "var(--color-muted)",
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
            }}
          >
            No work matches those filters.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "4px",
            }}
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                onClick={() => setLightboxItem(item)}
                style={{
                  position: "relative",
                  aspectRatio: "1",
                  overflow: "hidden",
                  cursor: "pointer",
                  background: "var(--color-card)",
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease, filter 0.4s ease",
                  }}
                  loading="lazy"
                  className="portfolio-img"
                />
                {/* Hover overlay */}
                <div
                  className="portfolio-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(8,8,8,0)",
                    transition: "background 0.3s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "20px",
                  }}
                >
                  <div
                    className="portfolio-caption"
                    style={{
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      textAlign: "center",
                    }}
                  >
                    <span className="section-label">{item.style}</span>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "var(--color-cream-muted)",
                        letterSpacing: "0.08em",
                        marginTop: "4px",
                      }}
                    >
                      by {item.artist}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              marginBottom: "24px",
              letterSpacing: "0.04em",
            }}
          >
            Like what you see?
          </p>
          <button
            onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid var(--color-gold)",
              color: "var(--color-gold)",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "13px 32px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              borderRadius: "2px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-gold)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-gold)";
            }}
          >
            Book a Consultation
          </button>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        item={lightboxItem}
        items={lightboxItems}
        onClose={() => setLightboxItem(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      <style>{`
        .portfolio-img:hover { transform: scale(1.04); }
        .portfolio-img:hover + .portfolio-overlay,
        .portfolio-overlay:hover { background: rgba(8,8,8,0.55) !important; }
        .portfolio-img:hover ~ .portfolio-overlay .portfolio-caption,
        .portfolio-overlay:hover .portfolio-caption { opacity: 1 !important; transform: translateY(0) !important; }

        @media (hover: none) {
          .portfolio-img { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
