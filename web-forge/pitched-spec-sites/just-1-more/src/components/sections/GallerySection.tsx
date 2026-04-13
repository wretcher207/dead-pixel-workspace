"use client";
import { motion } from "framer-motion";
import { scaleIn } from "@/lib/animations";

const items = [
  {
    src: "/images/window-logo.jpg",
    alt: "Just 1 More front window",
    span: "col-span-2 row-span-2",
    height: "h-[280px] md:h-[420px]",
  },
  {
    src: "/images/pool-tables.jpg",
    alt: "Pool tables",
    span: "",
    height: "h-[200px]",
  },
  {
    src: "/images/lobster-roll.jpg",
    alt: "Lobster roll",
    span: "",
    height: "h-[200px]",
  },
  {
    src: "/images/menu.jpg",
    alt: "The menu board",
    span: "col-span-2",
    height: "h-[200px]",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-charcoal py-16 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-text-muted text-sm tracking-widest uppercase mb-10">
          The place
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          {items.map((item) => (
            <motion.div
              key={item.src}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`relative overflow-hidden rounded-lg group ${item.span} ${item.height}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
