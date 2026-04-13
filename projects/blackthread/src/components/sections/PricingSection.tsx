"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import GlassCard from "@/components/GlassCard";
import GhostButton from "@/components/GhostButton";
import { stagger } from "@/lib/motion";

const tiers = [
  {
    name: "Observer",
    price: "$0",
    unit: "/ signal",
    features: ["Read-only signal feed", "Public thread monitoring", "Community protocols"],
    cta: "Begin",
    highlight: false,
  },
  {
    name: "Operator",
    price: "$249",
    unit: "/ month",
    features: ["Full thread access", "Custom routing", "Priority weaving", "Direct uplink"],
    cta: "Deploy",
    highlight: true,
  },
  {
    name: "Architect",
    price: "Custom",
    unit: "by clearance",
    features: ["Unlimited orchestration", "Shadow protocol access", "Dedicated mesh", "Direct line to the architects"],
    cta: "Contact",
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <Section id="access">
      <div className="flex items-center gap-4 mb-16">
        <div className="h-px flex-1 bg-gradient-to-r from-bt-violet/20 to-transparent" />
        <span className="text-[11px] font-mono tracking-[0.3em] text-bt-muted uppercase">Access Tiers</span>
        <div className="h-px flex-1 bg-gradient-to-l from-bt-violet/20 to-transparent" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {tiers.map((tier) => (
          <GlassCard key={tier.name} highlight={tier.highlight}>
            <div className="mb-8">
              <span className="text-[11px] font-mono tracking-[0.2em] text-bt-muted uppercase block mb-4">
                {tier.name}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tight">{tier.price}</span>
                <span className="text-sm text-bt-muted">{tier.unit}</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {tier.features.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-bt-dim">
                  <span className="w-px h-3 bg-bt-violet/40" />
                  {f}
                </div>
              ))}
            </div>

            <GhostButton
              className="w-full justify-center"
              variant={tier.highlight ? "bright" : "default"}
            >
              {tier.cta}
            </GhostButton>
          </GlassCard>
        ))}
      </motion.div>
    </Section>
  );
}
