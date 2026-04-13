"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import PaperCard from "@/components/ui/PaperCard";
import { specials } from "@/data/specials";

export default function FeaturedSpecials() {
  const reduce = useReducedMotion();

  return (
    <section
      id="specials"
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: "#f5f0e8" }}
    >
      <SectionHeader
        eyebrow="this week's favorites"
        headline="Things Worth Getting Out of Bed For"
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-8">
          {specials.map((special, i) => (
            <motion.div
              key={special.id}
              initial={reduce ? {} : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <PaperCard special={special} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a
            href="#menu"
            className="font-serif italic text-lg text-[#8b5e3c] hover:text-[#3d2e24] transition-colors"
          >
            See the full menu →
          </a>
        </div>
      </div>
    </section>
  );
}
