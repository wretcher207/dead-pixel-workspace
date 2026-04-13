"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { galleryItems } from "@/lib/constants";
import VideoTile from "./VideoTile";
import Lightbox from "./Lightbox";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function BentoGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxImages = galleryItems
    .filter((item) => item.type === "image")
    .map((item) => ({ src: item.src, alt: item.alt }));

  const openLightbox = useCallback((src: string) => {
    const idx = lightboxImages.findIndex((img) => img.src === src);
    if (idx !== -1) {
      setLightboxIndex(idx);
      setLightboxOpen(true);
    }
  }, [lightboxImages]);

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setLightboxIndex((i) => (i + 1) % lightboxImages.length);
  const prevImage = () => setLightboxIndex((i) => (i - 1 + lightboxImages.length) % lightboxImages.length);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] gap-3 sm:gap-4"
      >
        {galleryItems.map((item) => {
          const colSpanMd = item.colSpan || 1;
          const rowSpanMd = item.rowSpan || 1;
          const colSpanMobile = item.mobileColSpan || 1;
          const rowSpanMobile = item.mobileRowSpan || 1;

          const gridClasses = [
            colSpanMobile === 2 ? "col-span-2" : "col-span-1",
            rowSpanMobile === 2 ? "row-span-2" : "row-span-1",
            colSpanMd === 2 ? "md:col-span-2" : "md:col-span-1",
            rowSpanMd === 2 ? "md:row-span-2" : "md:row-span-1",
          ].join(" ");

          if (item.type === "video") {
            return (
              <motion.div key={item.src} variants={staggerItem} className={gridClasses}>
                <VideoTile src={item.src} className="h-full w-full" />
              </motion.div>
            );
          }

          if (item.type === "badge") {
            return (
              <motion.div
                key={item.src}
                variants={staggerItem}
                className={`${gridClasses} flex items-center justify-center rounded-[24px] bg-clay-accent/5 shadow-clay-card`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </motion.div>
            );
          }

          return (
            <motion.div
              key={item.src}
              variants={staggerItem}
              className={`${gridClasses} group cursor-pointer`}
              onClick={() => openLightbox(item.src)}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[24px] shadow-clay-card transition-all duration-500 hover:-translate-y-2 hover:shadow-clay-card-hover">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes={colSpanMd === 2 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                />
                {item.tag && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-bold uppercase tracking-widest text-white">{item.tag}</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}
