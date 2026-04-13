"use client";

import { motion } from "framer-motion";

interface GhostButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: "default" | "bright";
}

export default function GhostButton({ children, className = "", href, variant = "default" }: GhostButtonProps) {
  const base = variant === "bright"
    ? "border-bt-violet/50 text-white hover:bg-bt-violet/10 hover:border-bt-violet"
    : "border-white/10 text-white/70 hover:text-white hover:border-white/30";

  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-2 px-7 py-3 text-[13px] font-mono tracking-[0.15em] uppercase border rounded-none transition-all duration-300 ${base} ${className}`}
    >
      {children}
    </Tag>
  );
}
