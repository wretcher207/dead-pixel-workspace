"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";

const hours = [
  { days: "Monday – Friday", time: "7:00 am – 3:00 pm" },
  { days: "Saturday",        time: "8:00 am – 3:00 pm" },
  { days: "Sunday",          time: "8:00 am – 2:00 pm" },
];

export default function Visit() {
  const reduce = useReducedMotion();

  return (
    <section
      id="visit"
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      <SectionHeader
        eyebrow="come find us"
        headline="Easy to Find. Harder to Leave."
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Hours card */}
        <motion.div
          className="rounded-[10px] border border-[#c9a96e]/40 p-8"
          style={{ backgroundColor: "#fdf8f0" }}
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#7a9e7e] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Hours
          </p>
          <div className="space-y-3">
            {hours.map(({ days, time }) => (
              <div key={days} className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-[#3d2e24]">{days}</span>
                <span className="font-serif text-lg text-[#8b5e3c]">{time}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#e8dfd4]">
            <p className="font-accent text-sm text-[#9a9088]">
              kitchen closes 30 min early
            </p>
          </div>
        </motion.div>

        {/* Address + Map */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#7a9e7e] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Find Us
          </p>
          <div className="font-serif text-xl text-[#3d2e24] leading-snug mb-4">
            34 Court Street
            <br />
            New Auburn, ME 04210
          </div>
          <div className="font-serif text-base text-[#8b5e3c] leading-snug mb-4">
            Also at 742 Maine St
            <br />
            Auburn Plaza, Auburn, ME 04210
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-lg border border-[#c9a96e]/30 flex items-center justify-center h-28 mb-4"
            style={{ backgroundColor: "#f5f0e8" }}
          >
            <span className="font-accent text-base text-[#c9a96e]">
              ☕ Find Us in Auburn, ME
            </span>
          </div>

          <p className="text-sm text-[#6b5f56] font-light leading-relaxed">
            Street parking at Court St. Ample lot parking at Auburn Plaza.
          </p>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p
            className="text-xs tracking-[0.2em] uppercase text-[#7a9e7e] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Details
          </p>
          <ul className="space-y-3 text-[#6b5f56] font-light text-sm leading-relaxed mb-6">
            <li>Dine-in ✦ Takeout ✦ Local delivery Fridays</li>
            <li>Dogs welcome on the patio (most of them)</li>
            <li>WiFi available — please don&rsquo;t stay forever</li>
            <li>Large parties? Give us a heads up</li>
          </ul>

          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[#8b5e3c] hover:text-[#3d2e24] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>@nuttynettiescafe</span>
              <span className="text-[#e8dfd4]">—</span>
              <span className="text-[#9a9088]">Instagram</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-[#8b5e3c] hover:text-[#3d2e24] transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              <span>@nuttynettiescafe</span>
              <span className="text-[#e8dfd4]">—</span>
              <span className="text-[#9a9088]">TikTok</span>
            </a>
          </div>

          <a
            href="#"
            className="inline-block mt-6 font-serif italic text-lg text-[#c9a96e] hover:text-[#8b5e3c] transition-colors"
          >
            Order Ahead →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
