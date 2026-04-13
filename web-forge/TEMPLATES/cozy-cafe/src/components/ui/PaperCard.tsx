"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnnotationBadge from "./AnnotationBadge";
import type { Special } from "@/data/specials";

interface PaperCardProps {
  special: Special;
}

function noteColor(note?: string): "berry" | "gold" | "sage" {
  if (!note) return "gold";
  if (note.includes("fave")) return "berry";
  if (note.includes("seasonal")) return "sage";
  return "gold";
}

export default function PaperCard({ special }: PaperCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative bg-[#fdf8f0] rounded-[10px] p-6 cursor-default select-none"
      style={{
        rotate: special.rotation,
        boxShadow: "0 4px 20px rgba(61,46,36,0.10), 0 1px 4px rgba(61,46,36,0.06)",
      }}
      whileHover={
        reduce
          ? {}
          : {
              rotate: 0,
              boxShadow: "0 12px 40px rgba(61,46,36,0.16), 0 2px 8px rgba(61,46,36,0.08)",
              y: -6,
            }
      }
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {/* Pin dot */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-md"
        style={{ backgroundColor: special.pinColor }}
        aria-hidden="true"
      />

      {/* Item name */}
      <h3 className="font-serif text-xl font-medium text-[#3d2e24] mb-2 leading-tight">
        {special.name}
      </h3>

      {/* Ruled divider */}
      <div className="h-px bg-[#e8dfd4] mb-3" />

      {/* Description */}
      <p className="text-sm text-[#6b5f56] leading-relaxed font-light mb-4">
        {special.description}
      </p>

      {/* Footer */}
      <div className="flex items-end justify-between gap-2 mt-auto">
        <span className="font-serif text-lg text-[#c9a96e] font-medium">
          {special.price}
        </span>
        {special.note && (
          <AnnotationBadge text={special.note} color={noteColor(special.note)} />
        )}
      </div>
    </motion.div>
  );
}
