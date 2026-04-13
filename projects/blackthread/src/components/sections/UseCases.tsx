"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { fadeUp, viewportOnce } from "@/lib/motion";

const cases = [
  {
    title: "Predictive Infrastructure",
    text: "Allocate before demand. Decommission before failure.",
  },
  {
    title: "Autonomous Pipelines",
    text: "Pipelines that fix themselves. No tickets. No standups.",
  },
  {
    title: "Covert Integration",
    text: "Lives inside your stack. Nothing changes on the surface.",
  },
];

export default function UseCases() {
  return (
    <Section>
      <span className="text-[11px] font-mono tracking-[0.3em] text-bt-muted uppercase mb-16 block">
        Applications
      </span>

      <div className="flex flex-col gap-0">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: i * 0.1 }}
            className="group relative py-8 border-b border-white/[0.04] first:border-t"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight group-hover:text-bt-violet transition-colors duration-300">
                {c.title}
              </h3>
              <p className="text-bt-dim text-sm md:text-right max-w-sm">{c.text}</p>
            </div>
            {/* Hover accent */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-bt-violet/0 group-hover:bg-bt-violet/60 transition-all duration-300" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
