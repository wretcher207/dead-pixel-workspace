"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const photos = [
  { src: "/images/interior.jpg",   alt: "Morning light flooding the dining room", caption: "morning ritual",      span: "col-span-2 row-span-2" },
  { src: "/images/showcase2.jpg",  alt: "Latte art in a ceramic mug",             caption: "pour-over magic",     span: "col-span-1 row-span-1" },
  { src: "/images/showcase1.jpg",  alt: "Pastry under a glass dome",              caption: "fresh from the oven", span: "col-span-1 row-span-1" },
  { src: "/images/showcase3.jpg",  alt: "Cozy corner booth with soft afternoon light", caption: "corner booth life", span: "col-span-1 row-span-2" },
  { src: "/images/showcase4.jpg",  alt: "Barista pouring from a gooseneck kettle", caption: "the craft",         span: "col-span-1 row-span-1" },
  { src: "/images/award.jpg",      alt: "Overhead shot of a breakfast spread",    caption: "the full spread",     span: "col-span-1 row-span-1" },
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
            key={photo.src}
            className={`relative overflow-hidden rounded-lg group ${photo.span}`}
            style={{ minHeight: 200 }}
            initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
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
          open daily — find us at 42 Main St, Biddeford
        </p>
        <div className="flex-1 h-px bg-[#c9a96e]/25" />
      </div>
    </section>
  );
}
