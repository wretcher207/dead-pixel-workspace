"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  wide?: boolean;
}

export default function Section({ children, className = "", id, wide }: SectionProps) {
  return (
    <motion.section
      id={id}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`relative py-28 md:py-40 px-6 md:px-12 ${wide ? "max-w-[1400px]" : "max-w-6xl"} mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
