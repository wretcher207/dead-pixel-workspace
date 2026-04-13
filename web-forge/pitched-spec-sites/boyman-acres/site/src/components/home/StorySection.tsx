"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { storyLabel, storyHeadline, storyBody, storyAmenities } from "@/lib/constants";
import { slideFromLeft, scaleIn, fadeInUp, viewportOnce } from "@/lib/animations";

export default function StorySection() {
  return (
    <section id="story" className="bg-surface-low py-32 relative overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-16">

        {/* Text — 5 cols */}
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="md:col-span-5 z-10"
        >
          <SectionLabel className="mb-6">{storyLabel}</SectionLabel>
          <h2 className="font-display text-4xl md:text-6xl text-on-surface mb-8 leading-tight italic">
            {storyHeadline}
          </h2>
          <p className="font-body text-on-surface-muted leading-relaxed mb-10 text-base">
            {storyBody}
          </p>

          {/* Amenity tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {storyAmenities.map((amenity) => (
              <span
                key={amenity}
                className="bg-surface-highest px-3 py-1 rounded-full text-[10px] font-body uppercase tracking-widest text-sage"
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* CTA link */}
          <a
            href="#visit"
            className="inline-flex items-center gap-4 text-sage font-body uppercase tracking-widest text-[10px] group"
          >
            <span className="w-12 h-[1px] bg-sage transition-all duration-500 group-hover:w-20" />
            Plan Your Visit
          </a>
        </motion.div>

        {/* Images — 7 cols, asymmetric with inset */}
        <div className="md:col-span-7 relative md:pb-20">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative w-full aspect-video md:aspect-[4/3] rounded-lg overflow-hidden atmospheric-shadow bg-surface-container"
          >
            <img
              src="/images/interior-2.jpg"
              alt="Boyman Acres dispensary interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/15 mix-blend-overlay pointer-events-none" />
          </motion.div>

          {/* Inset photo — hidden on mobile */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            transition={{ delay: 0.2 }}
            className="hidden md:block absolute -bottom-16 -left-16 w-64 aspect-square rounded-lg overflow-hidden atmospheric-shadow bg-surface-container border-4 border-surface-low"
          >
            <img
              src="/images/interior-1.jpg"
              alt="Boyman Acres store front"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/20 mix-blend-overlay pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
