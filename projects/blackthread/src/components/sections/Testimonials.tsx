"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const quotes = [
  {
    text: "We stopped monitoring it. It stopped needing us to.",
    role: "Infrastructure Lead",
  },
  {
    text: "I don\u2019t fully understand what it does. I just know nothing breaks anymore.",
    role: "CTO, Series B",
  },
  {
    text: "It\u2019s the first system I trust more than my team.",
    role: "Anonymous",
  },
];

export default function Testimonials() {
  return (
    <Section>
      <span className="text-[11px] font-mono tracking-[0.3em] text-bt-muted uppercase mb-16 block">
        Transmissions
      </span>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            variants={fadeUp}
            className="gradient-border p-6 md:p-8 flex flex-col justify-between"
          >
            <p className="text-white/60 text-base leading-relaxed mb-6">
              &ldquo;{q.text}&rdquo;
            </p>
            <cite className="text-[11px] font-mono tracking-[0.15em] text-bt-muted not-italic">
              // {q.role}
            </cite>
          </motion.blockquote>
        ))}
      </motion.div>
    </Section>
  );
}
