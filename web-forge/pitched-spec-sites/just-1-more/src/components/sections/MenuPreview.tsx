"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "@/components/ui/MenuCard";
import NeonButton from "@/components/ui/NeonButton";
import { menu, menuCategories, type MenuCategory } from "@/data/menu";

export default function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("wings");

  return (
    <section id="menu" className="bg-charcoal py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-text-primary leading-none mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Menu
        </h2>
        <p className="text-text-muted text-sm mb-8">
          Bar food that doesn&apos;t apologize for being bar food.
        </p>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-sm text-sm font-medium flex-shrink-0 transition-colors tracking-wide uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon ${
                activeCategory === cat.id
                  ? "bg-neon text-void"
                  : "bg-surface text-text-muted border border-white/5 hover:border-neon/30 hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          >
            {menu[activeCategory].map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <NeonButton href="#order">View Full Menu</NeonButton>
        </div>
      </div>
    </section>
  );
}
