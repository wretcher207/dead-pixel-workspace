"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClayButton from "@/components/ui/ClayButton";
import { staggerContainer, staggerItem } from "@/lib/animations";

const previewImages = [
  { src: "/images/showcase/nails-1.jpg", alt: "Purple glitter dip powder nails with hand-painted bunny and chick nail art by Beauty and Polish" },
  { src: "/images/showcase/nails-3.jpg", alt: "Vibrant pop art nails with bold colors, polka dots, and stripes by Beauty and Polish" },
  { src: "/images/showcase/nails-5.jpg", alt: "Black and pink cow print nails with polka dot accent nails by Beauty and Polish" },
];

export default function GalleryPreview() {
  return (
    <section className="py-16 sm:py-24 bg-white/30 rounded-[48px] mx-4 sm:mx-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading title="Our Work" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-3 gap-3 sm:gap-5"
        >
          {previewImages.map((img) => (
            <motion.div
              key={img.src}
              variants={staggerItem}
              className="group aspect-square overflow-hidden rounded-[24px] shadow-clay-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 25vw"
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <ClayButton href="/gallery" variant="outline">
            View Full Gallery
          </ClayButton>
        </div>
      </div>
    </section>
  );
}
