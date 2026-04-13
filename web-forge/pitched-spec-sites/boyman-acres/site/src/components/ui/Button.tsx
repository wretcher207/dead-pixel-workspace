"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-body uppercase tracking-[0.2em] text-[10px] font-bold rounded-lg transition-all duration-500 cursor-pointer";

  const variants = {
    primary:
      "bg-gold text-on-gold px-10 py-4 hover:brightness-110",
    secondary:
      "ghost-border text-sage px-10 py-4 hover:bg-surface-high",
    ghost:
      "text-on-surface-muted px-4 py-2 hover:text-sage",
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { y: -1, scale: variant === "primary" ? 1.02 : 1 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {children}
    </motion.button>
  );
}
