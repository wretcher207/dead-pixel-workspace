"use client";
import { motion } from "framer-motion";
import NeonBadge from "@/components/ui/NeonBadge";
import { weeklySpecials } from "@/data/specials";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const accentColorMap: Record<string, string> = {
  neon: "var(--color-neon)",
  amber: "var(--color-amber)",
  ember: "var(--color-ember)",
};

export default function DailySpecials() {
  const today = new Date().getDay();

  const tonightSpecial = weeklySpecials.find((s) => s.dayIndex === today);
  const others = weeklySpecials.filter((s) => s.dayIndex !== today);

  return (
    <section id="specials" className="bg-deep-brown py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.2em] uppercase text-text-faint mb-10 md:mb-12">
          Weekly specials
        </p>

        {/* Tonight's special */}
        {tonightSpecial && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <NeonBadge text="Tonight" color={tonightSpecial.accentColor} />
            <p
              className="text-text-primary leading-none mt-4 mb-3"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
            >
              {tonightSpecial.eventName}
            </p>
            <p className="text-text-muted text-lg max-w-md">{tonightSpecial.detail}</p>
          </motion.div>
        )}

        {/* Rest of the week */}
        <div className="h-px bg-white/5 mb-8" />

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 md:gap-x-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {others.map((special) => {
            const accent = accentColorMap[special.accentColor];
            return (
              <motion.div
                key={special.id}
                variants={staggerItem}
                className="flex flex-col gap-2"
              >
                <p
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: accent }}
                >
                  {special.day}
                </p>
                <p
                  className="text-xl leading-tight text-text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {special.eventName}
                </p>
                <p className="text-text-muted text-sm leading-relaxed">{special.detail}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
