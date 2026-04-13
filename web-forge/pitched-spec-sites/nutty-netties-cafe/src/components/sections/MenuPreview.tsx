"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AnnotationBadge from "@/components/ui/AnnotationBadge";
import { menu, menuCategories, type Category } from "@/data/menu";

export default function MenuPreview() {
  const [active, setActive] = useState<Category>("coffee");
  const reduce = useReducedMotion();
  const items = menu[active];

  return (
    <section
      id="menu"
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      <SectionHeader eyebrow="the full spread" headline="Our Menu" />

      {/* Category tabs */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-2" role="tablist">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              onClick={() => setActive(cat.id)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                fontFamily: "var(--font-sans)",
                letterSpacing: "0.06em",
                backgroundColor: active === cat.id ? "#3d2e24" : "#e8dfd4",
                color: active === cat.id ? "#fdf8f0" : "#6b5f56",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8dfd4]"
            role="tabpanel"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.name}
                className="bg-[#fdf8f0] p-6"
                initial={reduce ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="font-serif text-lg font-medium text-[#3d2e24] leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-serif text-base text-[#8b5e3c] font-medium shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-[#6b5f56] leading-relaxed font-light mb-1">
                  {item.description}
                </p>
                {item.seasonal && (
                  <span className="inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-[#b85c6e]/10 text-[#b85c6e] mr-2">
                    Seasonal
                  </span>
                )}
                {item.note && (
                  <AnnotationBadge
                    text={item.note}
                    color={
                      item.note.includes("pick") || item.note.includes("fave")
                        ? "gold"
                        : "sage"
                    }
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-10">
          <a
            href="#visit"
            className="font-serif italic text-lg text-[#8b5e3c] hover:text-[#3d2e24] transition-colors"
          >
            Come in for the full experience →
          </a>
        </div>
      </div>
    </section>
  );
}
