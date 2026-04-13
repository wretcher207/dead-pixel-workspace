"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  align?: "center" | "left";
}

export default function SectionHeading({ title, subtitle, gradient = false, align = "center" }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mb-12 sm:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${gradient ? "clay-text-gradient" : "text-clay-foreground"}`}
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-clay-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
