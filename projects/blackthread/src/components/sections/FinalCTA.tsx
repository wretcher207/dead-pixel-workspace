"use client";

import { motion } from "framer-motion";
import GhostButton from "@/components/GhostButton";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function FinalCTA() {
  return (
    <section className="relative py-40 md:py-56 px-6 md:px-12 overflow-hidden">
      {/* Background glow */}
      <div className="orb orb-violet w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
          The system is already running.
        </h2>
        <p className="text-bt-dim text-base mb-12">You just haven&apos;t connected yet.</p>
        <GhostButton href="#access" variant="bright">Enter the mesh</GhostButton>
      </motion.div>
    </section>
  );
}
