"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ClayCard from "@/components/ui/ClayCard";
import { scaleIn } from "@/lib/animations";

export default function AwardShowcase() {
  return (
    <motion.section
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6"
    >
      <div className="mx-auto max-w-sm">
        <ClayCard variant="solid" className="relative rounded-[40px] shadow-clay-surface p-8">
          <div className="rounded-[24px] overflow-hidden">
            <Image
              src="/images/showcase/award.jpg"
              alt="Fresha Best in Class 2026 award certificate for Beauty and Polish"
              width={400}
              height={500}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20">
            <Image
              src="/images/showcase/100-percent.png"
              alt="100% recommendation rate badge"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </ClayCard>
      </div>

      <div className="mt-8 text-center space-y-3 max-w-lg mx-auto">
        <h3
          className="text-xl font-bold text-clay-foreground"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          Fresha Best in Class 2026
        </h3>
        <p className="text-clay-muted">
          Awarded to the highest-rated salons on the Fresha platform.
        </p>
        <p className="text-clay-muted font-bold">
          100% Recommendation Rate &mdash; 48 reviews. 48 recommendations. Zero exceptions.
        </p>
      </div>
    </motion.section>
  );
}
