"use client";

import { motion } from "framer-motion";

const hours = [
  { day: "Monday", hours: "11am – 7pm" },
  { day: "Tuesday", hours: "11am – 7pm" },
  { day: "Wednesday", hours: "11am – 7pm" },
  { day: "Thursday", hours: "11am – 7pm" },
  { day: "Friday", hours: "11am – 7pm" },
  { day: "Saturday", hours: "11am – 6pm" },
  { day: "Sunday", hours: "12pm – 5pm" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function Location() {
  return (
    <section
      id="location"
      style={{
        padding: "120px 0 0",
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "60px" }}
        >
          <p className="section-label" style={{ marginBottom: "16px" }}>
            Find Us
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
            Congress Street, Portland
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: "60px",
            alignItems: "start",
          }}
          className="location-grid"
        >
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                overflow: "hidden",
                border: "1px solid var(--color-border-strong)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2891.8024088707853!2d-70.2613!3d43.6574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb29b2b8a5d3cf7%3A0x1d9e14a1cfb60a69!2s646%20Congress%20St%2C%20Portland%2C%20ME%2004101!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  filter: "invert(0.9) hue-rotate(180deg) brightness(0.85) contrast(0.9)",
                  display: "block",
                  position: "absolute",
                  inset: 0,
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hallowed Ground Tattoo location — 646 Congress Street Portland Maine"
              />
            </div>
            <a
              href="https://maps.google.com/?q=646+Congress+St,+Portland,+ME+04101"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "14px",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              Open in Google Maps →
            </a>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "40px" }}
          >
            {/* Address & Contact */}
            <div>
              <p className="section-label" style={{ marginBottom: "16px" }}>
                Address
              </p>
              <address
                style={{
                  fontStyle: "normal",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: 300,
                  color: "var(--color-cream)",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                }}
              >
                646 Congress Street
                <br />
                Portland, ME 04101
              </address>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href="tel:+12078051702"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  <span style={{ color: "var(--color-gold)", fontSize: "0.8rem" }}>✆</span>
                  +1 (207) 805-1702
                </a>
                <a
                  href="mailto:hallowedgroundtattooshop@gmail.com"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-cream-muted)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-cream-muted)")}
                >
                  <span style={{ color: "var(--color-gold)", fontSize: "0.8rem", flexShrink: 0 }}>✉</span>
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>hallowedgroundtattooshop@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div>
              <p className="section-label" style={{ marginBottom: "16px" }}>
                Hours
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {hours.map((h) => {
                  const isToday = h.day === today;
                  return (
                    <div
                      key={h.day}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--color-border)",
                        background: isToday ? "rgba(196,151,90,0.05)" : "transparent",
                        paddingLeft: isToday ? "8px" : "0",
                        marginLeft: isToday ? "-8px" : "0",
                        transition: "background 0.2s",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8125rem",
                          color: isToday ? "var(--color-cream)" : "var(--color-muted)",
                          fontWeight: isToday ? 500 : 300,
                        }}
                      >
                        {h.day}
                        {isToday && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.6rem",
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              color: "var(--color-gold)",
                            }}
                          >
                            Today
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8125rem",
                          color: isToday ? "var(--color-gold)" : "var(--color-muted)",
                          fontWeight: isToday ? 400 : 300,
                        }}
                      >
                        {h.hours}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "var(--color-gold)",
                border: "none",
                color: "var(--color-bg)",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                padding: "14px 28px",
                cursor: "pointer",
                transition: "background 0.2s",
                borderRadius: "2px",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-gold-light)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-gold)")}
            >
              Book Your Consultation →
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
