"use client";

import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

interface StatOrbProps {
  value: string;
  label: string;
  color?: string;
  delay?: number;
}

export default function StatOrb({ value, label, color = "bg-clay-accent/10", delay = 0 }: StatOrbProps) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
      className={`flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-clay-card animate-clay-breathe bg-white/80 backdrop-blur-xl hover:scale-110 transition-transform duration-300 ${color}`}
    >
      <span className="text-3xl sm:text-4xl font-black text-clay-foreground" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
        {value}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-clay-muted mt-1">{label}</span>
    </motion.div>
  );
}
