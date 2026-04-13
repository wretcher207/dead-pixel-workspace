"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import { stagger } from "@/lib/motion";

const features = [
  {
    tag: "01",
    title: "Silent Routing",
    description: "Traffic moves through paths that don't exist on any map.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-bt-violet">
        <path d="M4 14h6l3-8h2l3 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="14" r="1.5" fill="currentColor" opacity="0.5" />
      </svg>
    ),
  },
  {
    tag: "02",
    title: "Zero Exposure",
    description: "Your data never surfaces. Not even to us.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-bt-violet">
        <rect x="6" y="12" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12V9a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    tag: "03",
    title: "Live Threads",
    description: "Connections that stay open and rewire themselves.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-bt-violet">
        <path d="M6 8h16M6 14h16M6 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="18" cy="14" r="2" fill="currentColor" opacity="0.4" />
        <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    tag: "04",
    title: "Deep Sync",
    description: "Systems converge before they're told to.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-bt-violet">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4v6M14 18v6M4 14h6M18 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <Section id="features">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-px flex-1 bg-gradient-to-r from-bt-violet/20 to-transparent" />
        <span className="text-[11px] font-mono tracking-[0.3em] text-bt-muted uppercase">Capabilities</span>
        <div className="h-px flex-1 bg-gradient-to-l from-bt-violet/20 to-transparent" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        {features.map((f) => (
          <GlassCard key={f.tag}>
            <div className="flex items-start justify-between mb-5">
              {f.icon}
              <span className="text-[10px] font-mono text-bt-muted">{f.tag}</span>
            </div>
            <h3 className="text-white text-lg font-semibold tracking-tight mb-2">{f.title}</h3>
            <p className="text-bt-dim text-sm leading-relaxed">{f.description}</p>
          </GlassCard>
        ))}
      </motion.div>
    </Section>
  );
}
