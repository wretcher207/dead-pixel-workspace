"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandMark from "@/components/ui/BrandMark";

const photos = [
  { gradient: "linear-gradient(135deg, #8b5e3c 0%, #3d2e24 100%)", alt: "Morning light flooding the dining room", caption: "morning ritual",      span: "col-span-2 row-span-2" },
  { gradient: "linear-gradient(135deg, #c9a96e 0%, #8b5e3c 100%)", alt: "Latte art in a ceramic mug",             caption: "pour-over magic",     span: "col-span-1 row-span-1" },
  { gradient: "linear-gradient(135deg, #f5f0e8 0%, #c9a96e 100%)", alt: "Pastry display",                         caption: "fresh from the oven", span: "col-span-1 row-span-1" },
  { gradient: "linear-gradient(135deg, #7a9e7e 0%, #3d2e24 100%)", alt: "Cozy corner booth",                      caption: "corner booth life",   span: "col-span-1 row-span-2" },
  { gradient: "linear-gradient(135deg, #3d2e24 0%, #7a9e7e 100%)", alt: "Barista at work",                        caption: "the craft",           span: "col-span-1 row-span-1" },
  { gradient: "linear-gradient(135deg, #b85c6e 0%, #c9a96e 100%)", alt: "Overhead shot of a breakfast spread",    caption: "the full spread",     span: "col-span-1 row-span-1" },
];

export default function Gallery() {
  const reduce = useReducedMotion();

  return (
    <section
      id="gallery"
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: "#3d2e24" }}
    >
      <SectionHeader
        eyebrow="come see for yourself"
        headline="The Kind of Place You Stay Too Long"
        light
      />

      <div className="max-w-6xl mx-auto grid grid-cols-3 grid-rows-3 gap-3">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.caption}
            className={`relative overflow-hidden rounded-lg group ${photo.span}`}
            style={{ minHeight: 200, background: photo.gradient }}
            initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            {/* Placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <BrandMark size={i === 0 || i === 3 ? 48 : 32} className="text-[#fdf8f0] opacity-10" />
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#3d2e24]/0 group-hover:bg-[#3d2e24]/50 transition-all duration-300 flex items-end p-4">
              <span className="font-accent text-base text-[#c9a96e] translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                {photo.caption}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-12 flex items-center gap-6">
        <div className="flex-1 h-px bg-[#c9a96e]/25" />
        <p className="font-accent text-base text-[#c9a96e]">
          open daily &mdash; 123 Main Street
        </p>
        <div className="flex-1 h-px bg-[#c9a96e]/25" />
      </div>
    </section>
  );
}
