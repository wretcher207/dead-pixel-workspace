"use client";
import { motion } from "framer-motion";

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function NeonButton({ children, href, onClick, size = "md", fullWidth, className = "" }: NeonButtonProps) {
  const sizeClasses = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
  const baseClasses = `bg-neon text-void font-semibold rounded-lg tracking-wide uppercase transition-all cursor-pointer ${sizeClasses[size]} ${fullWidth ? "w-full text-center block" : "inline-block"} ${className}`;

  const inner = (
    <motion.span
      className={baseClasses}
      whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
      whileTap={{ scale: 0.97 }}
      style={{ display: fullWidth ? "block" : "inline-block" }}
    >
      {children}
    </motion.span>
  );

  if (href) return <a href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-lg">{inner}</a>;
  return <button onClick={onClick} type="button" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-lg">{inner}</button>;
}
