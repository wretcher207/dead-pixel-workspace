"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "How do I book a consultation?",
    a: "Fill out the form above and we'll match you with an artist. Pick a consultation date, come in to finalize your design and placement, and get your quote. A deposit holds your spot.",
  },
  {
    q: "How much does a tattoo cost?",
    a: "Depends on size, complexity, and placement. Small pieces start around $150. We're known for being fair. More than a few clients have told us they expected to pay double. Your exact quote comes at consultation.",
  },
  {
    q: "Do I need a deposit?",
    a: "Yes. A deposit secures your appointment and goes directly toward your final total. Deposits start at $75 for smaller pieces and scale up from there. Deposits are non-refundable if you cancel with less than 48 hours notice.",
  },
  {
    q: "How painful is it?",
    a: "Honestly, yeah, it hurts. But most people handle it better than they expect. Placement matters a lot. Ribs and sternum hit harder than the outer arm. Our artists know how to keep you comfortable and will call breaks when you need them.",
  },
  {
    q: "Can I bring my own design?",
    a: "Absolutely. Bring whatever you've got. Photos, sketches, mood boards, screenshots. The more specific, the better. Your artist will take your reference and make it their own.",
  },
  {
    q: "What styles do you specialize in?",
    a: "Between our four artists, we cover a wide range: American traditional, neo-traditional, black and grey, fine line, illustrative, geometric, and color realism. If you're not sure which style fits your idea, that's what the consultation is for.",
  },
  {
    q: "How do I take care of my new tattoo?",
    a: "We'll send you home with an aftercare kit and written instructions. The basics: keep it clean, keep it moisturized, stay out of direct sun and pools for 2-3 weeks, and don't pick at it. Touch-ups are included — if something heals unevenly, we'll fix it.",
  },
  {
    q: "Do you do walk-ins?",
    a: "Occasionally, depending on artist availability. Call or text us before you come in to check: 207-805-1702. Appointments are always recommended, especially for custom work. Walk-ins are more likely on weekday afternoons.",
  },
  {
    q: "Do you do piercings?",
    a: "No. We're a tattoo-only shop. No piercings, sorry.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        padding: "120px 0",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "60px" }}
        >
          <p className="section-label" style={{ marginBottom: "16px" }}>
            FAQ
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
            Common questions
          </h2>
        </motion.div>

        {/* Items */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "24px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9375rem",
                      fontWeight: isOpen ? 500 : 400,
                      color: isOpen ? "var(--color-cream)" : "var(--color-cream-muted)",
                      transition: "color 0.2s",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    style={{
                      color: isOpen ? "var(--color-gold)" : "var(--color-muted)",
                      fontSize: "1.1rem",
                      flexShrink: 0,
                      transition: "color 0.2s, transform 0.3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                      display: "inline-block",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.9rem",
                          fontWeight: 300,
                          color: "var(--color-muted)",
                          lineHeight: 1.8,
                          paddingBottom: "24px",
                          paddingRight: "32px",
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
