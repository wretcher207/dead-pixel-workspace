"use client";

import { motion } from "framer-motion";
import ClayButton from "@/components/ui/ClayButton";
import { BOOKING_URL } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

export default function BookingCTA() {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-16 sm:py-24 mx-4 sm:mx-8"
    >
      <div className="mx-auto max-w-4xl rounded-[48px] bg-gradient-to-br from-clay-accent-light/10 to-clay-accent-alt/10 p-10 sm:p-16 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-clay-foreground mb-4"
          style={{ fontFamily: "var(--font-nunito), sans-serif" }}
        >
          Ready to see what Bebe can do?
        </h2>
        <p className="text-lg text-clay-muted mb-8 max-w-xl mx-auto leading-relaxed">
          Book online in seconds, or just walk in. Either way, you&apos;re in good hands.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ClayButton href={BOOKING_URL} external size="lg">
            Book Now
          </ClayButton>
          <ClayButton href="/gallery" variant="outline" size="lg">
            View Our Work
          </ClayButton>
        </div>
      </div>
    </motion.section>
  );
}
