"use client";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  active?: boolean;
  glowColor?: "neon" | "amber" | "ember";
  className?: string;
  onClick?: () => void;
}

const glowMap = {
  neon:  "0 0 20px rgba(255,107,26,0.45), 0 0 60px rgba(255,107,26,0.15)",
  amber: "0 0 20px rgba(240,160,48,0.35), 0 0 50px rgba(240,160,48,0.10)",
  ember: "0 0 20px rgba(192,57,43,0.45), 0 0 50px rgba(192,57,43,0.15)",
};

const borderMap = {
  neon:  "rgba(255,107,26,0.6)",
  amber: "rgba(240,160,48,0.6)",
  ember: "rgba(192,57,43,0.6)",
};

export default function GlowCard({ children, active, glowColor = "neon", className = "", onClick }: GlowCardProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-surface rounded-xl border transition-colors duration-300 ${className}`}
      style={{
        borderColor: active ? borderMap[glowColor] : "rgba(255,255,255,0.06)",
        boxShadow: active ? glowMap[glowColor] : "none",
      }}
      whileHover={{ y: -4, boxShadow: glowMap[glowColor] }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
