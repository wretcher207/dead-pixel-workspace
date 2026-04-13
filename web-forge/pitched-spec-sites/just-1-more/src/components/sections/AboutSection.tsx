"use client";
import { motion } from "framer-motion";
import { BUSINESS_ADDRESS, BUSINESS_PHONE, BUSINESS_PHONE_RAW } from "@/lib/constants";
import { slideFromLeft, slideFromRight, viewportOnce } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section id="about" className="bg-void py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <motion.div
          className="lg:col-span-3"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p
            className="text-4xl md:text-5xl text-text-primary italic leading-tight mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;One drink turned into a regular. You&apos;ll see.&rdquo;
          </p>

          <div className="h-px w-16 bg-neon/40 mb-8" style={{ boxShadow: "0 0 8px rgba(255,107,26,0.3)" }} />

          <p className="text-text-muted leading-relaxed mb-4">
            Just 1 More has been Farmingdale&apos;s neighborhood bar for years. No
            pretense. No dress code. Just cold beer, hot food, and a room full
            of people who didn&apos;t mean to stay this long either.
          </p>

          <p className="text-text-muted leading-relaxed mb-8">
            We&apos;ve got 5 DARTSLIVE machines, a couple pool tables, karaoke every
            Thursday, and a kitchen that can hold its own. Open 365 days a year
            because some days you just need a place to go.
          </p>

          <div className="h-px w-full bg-white/5 mb-6" />

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <address className="not-italic flex flex-col gap-1">
              <p className="text-text-muted text-sm">{BUSINESS_ADDRESS}</p>
              <a
                href={`tel:${BUSINESS_PHONE_RAW}`}
                className="text-neon hover:underline text-sm"
              >
                {BUSINESS_PHONE}
              </a>
            </address>
            <p className="text-text-faint text-sm">
              Open every day, 4 PM to close
            </p>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              outline: "2px solid rgba(240,160,48,0.3)",
              outlineOffset: "8px",
            }}
          >
            <img
              src="/images/window-logo.jpg"
              alt="Just 1 More bar front window"
              loading="lazy"
              className="w-full h-full object-cover"
              style={{ aspectRatio: "4/3" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
