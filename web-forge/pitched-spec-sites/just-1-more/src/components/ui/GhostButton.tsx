"use client";
import { motion } from "framer-motion";

interface GhostButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GhostButton({ children, href, onClick, size = "md", className = "" }: GhostButtonProps) {
  const sizeClasses = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };

  const inner = (
    <motion.span
      className={`inline-block border border-white/20 text-text-primary font-semibold rounded-lg tracking-wide uppercase ${sizeClasses[size]} ${className}`}
      whileHover={{ borderColor: "rgba(255,107,26,0.6)", color: "var(--color-neon)" }}
      whileTap={{ scale: 0.97 }}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );

  if (href) return <a href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-lg">{inner}</a>;
  return <button onClick={onClick} type="button" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-lg">{inner}</button>;
}
