"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import GhostButton from "@/components/GhostButton";
import GradientOrbs from "@/components/ParticleField";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden">
      <GradientOrbs />

      {/* Thin horizontal line accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bt-violet/30 to-transparent" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-24 md:pb-32"
      >
        {/* System tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-2 h-2 bg-bt-violet rounded-full pulse-status" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-bt-dim uppercase">
            System active
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-white mb-6 max-w-4xl"
        >
          We already
          <br />
          <span className="glow-text">know.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl text-bt-dim max-w-lg mb-12 leading-relaxed"
        >
          Orchestration that doesn&apos;t announce itself.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center gap-6"
        >
          <GhostButton href="#access" variant="bright">Request access</GhostButton>
          <span className="text-[11px] font-mono text-bt-muted tracking-wider">v0.9.1</span>
        </motion.div>
      </motion.div>

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
}
