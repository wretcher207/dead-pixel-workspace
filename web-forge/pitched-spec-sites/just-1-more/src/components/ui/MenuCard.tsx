"use client";
import { motion } from "framer-motion";
import type { MenuItem } from "@/data/menu";
import NeonBadge from "./NeonBadge";

interface MenuCardProps {
  item: MenuItem;
  onAdd?: (item: MenuItem) => void;
}

export default function MenuCard({ item, onAdd }: MenuCardProps) {
  return (
    <motion.div
      className="min-w-[220px] max-w-[220px] p-4 flex flex-col gap-2 flex-shrink-0 border-l border-white/5"
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-text-primary font-semibold text-sm leading-snug">{item.name}</span>
        {item.popular && <NeonBadge text="Popular" color="amber" />}
      </div>
      <p className="text-text-muted text-xs leading-relaxed flex-1">{item.description}</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-amber font-semibold text-sm">{item.price}</span>
        {onAdd && (
          <button
            onClick={() => onAdd(item)}
            className="w-7 h-7 rounded-full bg-neon/10 border border-neon/30 text-neon text-lg leading-none flex items-center justify-center hover:bg-neon/20 transition-colors"
          >
            +
          </button>
        )}
      </div>
    </motion.div>
  );
}
