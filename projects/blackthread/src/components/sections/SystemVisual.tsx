"use client";

import { motion } from "framer-motion";
import { fadeUp, slideFromRight, viewportOnce } from "@/lib/motion";

const blocks = [
  {
    tag: "INTELLIGENCE",
    title: "Passive Intelligence",
    text: "It learned your patterns before you named them.",
  },
  {
    tag: "ROUTING",
    title: "Autonomous Routing",
    text: "Decisions resolve before the request finishes.",
  },
  {
    tag: "PROTOCOL",
    title: "Shadow Protocols",
    text: "Some processes are better left undocumented.",
  },
];

export default function SystemVisual() {
  return (
    <div className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Background orb */}
      <div className="orb orb-violet drift-slow w-[500px] h-[500px] top-[20%] left-[10%] opacity-20" />

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Visual — abstract system representation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start"
        >
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
            {/* Concentric rings */}
            <div className="absolute inset-[10%] border border-bt-violet/10 rounded-full" />
            <div className="absolute inset-[25%] border border-bt-violet/15 rounded-full" />
            <div className="absolute inset-[40%] border border-bt-indigo/20 rounded-full" />
            {/* Center glow */}
            <div className="absolute inset-[42%] bg-bt-violet/20 rounded-full blur-xl" />
            <div className="absolute inset-[46%] bg-bt-violet rounded-full opacity-60" />
            {/* Orbiting dots */}
            <div className="absolute top-[8%] left-[48%] w-2 h-2 bg-bt-cyan rounded-full opacity-50 drift" />
            <div className="absolute top-[50%] right-[8%] w-1.5 h-1.5 bg-bt-violet rounded-full opacity-40 drift-slow" />
            <div className="absolute bottom-[15%] left-[25%] w-1 h-1 bg-bt-amber rounded-full opacity-60 pulse-status" />
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l border-t border-white/10" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-white/10" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-white/10" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r border-b border-white/10" />
          </div>
        </motion.div>

        {/* Text blocks */}
        <div className="lg:col-span-7 flex flex-col gap-20 lg:gap-28 lg:py-20">
          {blocks.map((block, i) => (
            <motion.div
              key={block.tag}
              variants={slideFromRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: i * 0.1 }}
            >
              <span className="text-[10px] font-mono tracking-[0.3em] text-bt-violet/60 mb-3 block">
                {block.tag}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                {block.title}
              </h3>
              <p className="text-bt-dim text-base leading-relaxed max-w-md">
                {block.text}
              </p>
              {i < blocks.length - 1 && (
                <div className="mt-12 h-px w-16 bg-gradient-to-r from-bt-violet/30 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
