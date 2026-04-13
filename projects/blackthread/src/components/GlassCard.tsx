"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export default function GlassCard({ children, className = "", highlight }: GlassCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`gradient-border p-6 md:p-8 transition-all duration-500 ${highlight ? "!border-bt-violet/40" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
