"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      style={{
        padding: "120px 0",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <p className="section-label" style={{ marginBottom: "16px" }}>
              What People Say
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
              96% recommend us
            </h2>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--color-muted)",
              textAlign: "right",
            }}
          >
            <span style={{ fontSize: "1.8rem", fontFamily: "var(--font-display)", color: "var(--color-cream)", fontWeight: 400, display: "block" }}>375+</span>
            Reviews on Facebook
          </div>
        </motion.div>

        {/* Featured testimonial */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px",
            gap: "48px",
            alignItems: "start",
          }}
          className="testimonial-grid"
        >
          {/* Large quote */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                lineHeight: 0.8,
                color: "var(--color-gold)",
                opacity: 0.4,
                marginBottom: "8px",
              }}
            >
              &ldquo;
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                {current.highlight && (
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.4rem, 3vw, 2rem)",
                      fontWeight: 400,
      
                      color: "var(--color-gold)",
                      lineHeight: 1.3,
                      marginBottom: "20px",
                    }}
                  >
                    {current.highlight}
                  </p>
                )}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 300,
                    color: "var(--color-cream-muted)",
                    lineHeight: 1.85,
                    marginBottom: "28px",
                  }}
                >
                  {current.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "32px",
                      height: "1px",
                      background: "var(--color-gold)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        color: "var(--color-cream)",
                      }}
                    >
                      {current.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "var(--color-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {current.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav controls */}
            <div style={{ display: "flex", gap: "12px", marginTop: "40px" }}>
              <button
                onClick={prev}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-cream-muted)",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.2s",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-cream-muted)";
                }}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                onClick={next}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border-strong)",
                  color: "var(--color-cream-muted)",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  transition: "all 0.2s",
                  borderRadius: "2px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-gold)";
                  e.currentTarget.style.color = "var(--color-gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border-strong)";
                  e.currentTarget.style.color = "var(--color-cream-muted)";
                }}
                aria-label="Next testimonial"
              >
                →
              </button>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  color: "var(--color-muted)",
                  alignSelf: "center",
                  marginLeft: "8px",
                  letterSpacing: "0.1em",
                }}
              >
                {active + 1} / {testimonials.length}
              </span>
            </div>
          </div>

          {/* Sidebar stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1px",
              background: "var(--color-border)",
            }}
            className="testimonial-sidebar"
          >
            {testimonials.slice(0, 5).map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                style={{
                  background: i === active ? "var(--color-card)" : "var(--color-bg)",
                  border: "none",
                  padding: "16px 20px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.2s",
                  borderLeft: i === active ? "2px solid var(--color-gold)" : "2px solid transparent",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    fontWeight: i === active ? 500 : 400,
                    color: i === active ? "var(--color-cream)" : "var(--color-muted)",
                    marginBottom: "3px",
                    transition: "color 0.2s",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.7rem",
                    color: "var(--color-muted)",
                    opacity: 0.6,
                  }}
                >
                  {t.date}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .testimonial-sidebar { display: none !important; }
        }
      `}</style>
    </section>
  );
}
