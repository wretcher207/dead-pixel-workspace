"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ClayCard from "@/components/ui/ClayCard";
import { testimonials } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";

const featured = testimonials.slice(0, 6);

export default function TestimonialsCarousel() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading title="What our clients say" />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 pb-4"
      >
        {featured.map((t) => (
          <motion.div
            key={t.name}
            variants={staggerItem}
            className="min-w-[300px] sm:min-w-[360px] snap-center flex-shrink-0"
          >
            <ClayCard hover variant="glass" className="h-full">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-clay-warning" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-clay-foreground leading-relaxed mb-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-bold" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
                  {t.name}
                </p>
                <p className="text-xs text-clay-muted">via Facebook</p>
              </div>
            </ClayCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
