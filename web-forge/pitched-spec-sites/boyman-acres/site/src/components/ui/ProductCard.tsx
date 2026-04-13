"use client";

import { motion } from "framer-motion";
import TerpeneChip from "./TerpeneChip";
import type { Product } from "@/lib/types";
import { staggerItem } from "@/lib/animations";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  return (
    <motion.div
      variants={staggerItem}
      className={`group cursor-pointer ${className}`}
    >
      <div className="aspect-[3/4] overflow-hidden rounded-lg mb-8 bg-surface-container atmospheric-shadow relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-forest/10 mix-blend-overlay pointer-events-none" />
      </div>
      <div>
        <h3 className="font-display text-2xl text-on-surface mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-on-surface-muted text-sm leading-relaxed mb-4 font-body">
          {product.description}
        </p>
        <div className="flex gap-2 flex-wrap">
          {product.chips.map((chip) => (
            <TerpeneChip key={chip} label={chip} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
