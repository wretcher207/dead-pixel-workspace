"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingTier {
  id: string;
  label: string;
  size: string;
  description: string;
  priceRange: string;
  deposit: string;
  includes: string[];
  sessions: string;
}

const tiers: PricingTier[] = [
  {
    id: "small",
    label: "Small",
    size: "Up to 3 hours",
    description: "Flash, small custom pieces, or anything that fits in one sitting.",
    priceRange: "$150 – $350",
    deposit: "$75",
    includes: [
      "Artist consultation",
      "Custom design sketch",
      "Touch-up included",
      "Aftercare kit",
    ],
    sessions: "1 session",
  },
  {
    id: "medium",
    label: "Medium",
    size: "3 – 6 hours",
    description: "Half sleeves, forearms, chest panels, and bigger custom work.",
    priceRange: "$350 – $700",
    deposit: "$150",
    includes: [
      "Extended artist consultation",
      "Full custom design",
      "Reference review session",
      "Touch-up included",
      "Aftercare kit",
    ],
    sessions: "1 – 2 sessions",
  },
  {
    id: "large",
    label: "Large",
    size: "6+ hours / multi-session",
    description: "Full sleeves, back pieces, and major multi-session projects.",
    priceRange: "$700 – $2,000+",
    deposit: "$200",
    includes: [
      "In-depth concept consultation",
      "Full design with revisions",
      "Progress check-ins",
      "Priority scheduling",
      "All touch-up sessions",
      "Aftercare kit included",
    ],
    sessions: "2 – 6+ sessions",
  },
];

export default function Pricing() {
  const [selected, setSelected] = useState<string | null>(null);
  const [depositStep, setDepositStep] = useState<"select" | "checkout">("select");
  const selectedTier = tiers.find((t) => t.id === selected);

  return (
    <section
      id="pricing"
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
          style={{ marginBottom: "60px" }}
        >
          <p className="section-label" style={{ marginBottom: "16px" }}>
            Pricing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 400,
              color: "var(--color-cream)",
              lineHeight: 1.05,
              marginBottom: "16px",
            }}
          >
            Fair, honest pricing
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "440px",
            }}
          >
            Starting ranges, not final quotes. You'll get an exact number at your consultation. A small deposit holds your spot and goes toward your total.
          </p>
        </motion.div>

        {/* Tiers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            background: "var(--color-border)",
            marginBottom: "48px",
          }}
          className="pricing-grid"
        >
          {tiers.map((tier, i) => {
            const isSelected = selected === tier.id;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: isSelected ? "rgba(196,151,90,0.06)" : "var(--color-surface)",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                  borderTop: isSelected ? "2px solid var(--color-gold)" : "2px solid transparent",
                }}
                onClick={() => {
                  setSelected(tier.id);
                  setDepositStep("select");
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: isSelected ? "var(--color-gold)" : "var(--color-muted)",
                      marginBottom: "8px",
                      transition: "color 0.2s",
                    }}
                  >
                    {tier.size}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 400,
                      color: "var(--color-cream)",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {tier.label}
                  </h3>
                </div>

                <div
                  style={{
                    width: "32px",
                    height: "1px",
                    background: isSelected ? "var(--color-gold)" : "var(--color-border-strong)",
                    transition: "background 0.2s",
                  }}
                />

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "var(--color-muted)",
                    lineHeight: 1.65,
                    flexGrow: 1,
                  }}
                >
                  {tier.description}
                </p>

                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2rem",
                      fontWeight: 400,
                      color: "var(--color-cream)",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {tier.priceRange}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      color: "var(--color-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {tier.sessions}
                  </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {tier.includes.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8rem",
                        color: "var(--color-cream-muted)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span style={{ color: "var(--color-gold)", fontSize: "0.65rem" }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    padding: "12px 0",
                    borderTop: "1px solid var(--color-border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--color-muted)",
                        marginBottom: "2px",
                      }}
                    >
                      Deposit to Book
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        fontWeight: 400,
                        color: isSelected ? "var(--color-gold)" : "var(--color-cream)",
                        transition: "color 0.2s",
                      }}
                    >
                      {tier.deposit}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.7rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isSelected ? "var(--color-gold)" : "var(--color-muted)",
                      transition: "color 0.2s",
                    }}
                  >
                    {isSelected ? "Selected ✓" : "Select →"}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Checkout panel */}
        <AnimatePresence>
          {selected && selectedTier && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  border: "1px solid var(--color-border-strong)",
                  background: "var(--color-card)",
                  padding: "40px",
                  borderRadius: "2px",
                }}
              >
                {depositStep === "select" && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "32px",
                      alignItems: "center",
                    }}
                    className="checkout-grid"
                  >
                    <div>
                      <p className="section-label" style={{ marginBottom: "12px" }}>
                        Deposit Summary
                      </p>
                      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
                        <div>
                          <div className="section-label" style={{ marginBottom: "4px", color: "var(--color-muted)" }}>Plan</div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, color: "var(--color-cream)" }}>
                            {selectedTier.label} Piece
                          </div>
                        </div>
                        <div>
                          <div className="section-label" style={{ marginBottom: "4px", color: "var(--color-muted)" }}>Deposit</div>
                          <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400, color: "var(--color-gold)" }}>
                            {selectedTier.deposit}
                          </div>
                        </div>
                        <div>
                          <div className="section-label" style={{ marginBottom: "4px", color: "var(--color-muted)" }}>Applied To</div>
                          <div style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-cream-muted)" }}>
                            Final total
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDepositStep("checkout")}
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
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-gold-light)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-gold)")}
                    >
                      Pay Deposit →
                    </button>
                  </div>
                )}

                {depositStep === "checkout" && (
                  <div>
                    <p className="section-label" style={{ marginBottom: "24px" }}>
                      Secure Checkout
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }} className="payment-grid">
                      {[
                        { label: "Name on Card", placeholder: "Full name", type: "text" },
                        { label: "Email", placeholder: "you@email.com", type: "email" },
                        { label: "Card Number", placeholder: "•••• •••• •••• ••••", type: "text" },
                        { label: "Expiry / CVV", placeholder: "MM/YY  •  CVV", type: "text" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.65rem",
                              letterSpacing: "0.15em",
                              textTransform: "uppercase",
                              color: "var(--color-muted)",
                              display: "block",
                              marginBottom: "8px",
                            }}
                          >
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            placeholder={field.placeholder}
                            style={{
                              width: "100%",
                              background: "var(--color-surface)",
                              border: "1px solid var(--color-border-strong)",
                              color: "var(--color-cream)",
                              fontFamily: "var(--font-body)",
                              fontSize: "0.875rem",
                              padding: "12px 14px",
                              borderRadius: "2px",
                              outline: "none",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "var(--color-gold)")}
                            onBlur={(e) => (e.target.style.borderColor = "var(--color-border-strong)")}
                          />
                        </div>
                      ))}
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        background: "rgba(196,151,90,0.06)",
                        border: "1px solid rgba(196,151,90,0.2)",
                        borderRadius: "2px",
                        marginBottom: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.8125rem",
                          color: "var(--color-cream-muted)",
                        }}
                      >
                        {selectedTier.label} Piece Deposit — Applied to your total
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          fontWeight: 400,
                          color: "var(--color-gold)",
                        }}
                      >
                        {selectedTier.deposit}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                      <button
                        style={{
                          background: "var(--color-gold)",
                          border: "none",
                          color: "var(--color-bg)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          padding: "14px 32px",
                          cursor: "pointer",
                          transition: "background 0.2s",
                          borderRadius: "2px",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-gold-light)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-gold)")}
                      >
                        Complete Booking
                      </button>
                      <button
                        onClick={() => setDepositStep("select")}
                        style={{
                          background: "transparent",
                          border: "1px solid var(--color-border-strong)",
                          color: "var(--color-muted)",
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          padding: "14px 20px",
                          cursor: "pointer",
                          borderRadius: "2px",
                        }}
                      >
                        Back
                      </button>
                    </div>

                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: "var(--color-muted)",
                        marginTop: "16px",

                      }}
                    >
                      🔒 This is a demo checkout — no payment will be processed.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .checkout-grid { grid-template-columns: 1fr !important; text-align: left !important; }
          .payment-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .checkout-grid button { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
