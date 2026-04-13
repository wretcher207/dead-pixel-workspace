"use client";

import { motion, useReducedMotion } from "framer-motion";
import BrandMark from "@/components/ui/BrandMark";

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="py-24 px-8 md:px-16"
      style={{ backgroundColor: "#fdf8f0" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        {/* Text column */}
        <motion.div
          className="lg:col-span-3"
          initial={reduce ? {} : { opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-accent text-base text-[#8b5e3c] mb-3">
            about the place
          </p>
          <div className="h-px w-12 bg-[#c9a96e] mb-8" />

          <blockquote className="font-serif text-3xl md:text-4xl italic text-[#3d2e24] leading-snug mb-8">
            &ldquo;We opened because this town needed a place to slow down
            and eat something worth sitting for.&rdquo;
          </blockquote>

          <div className="h-px w-12 bg-[#c9a96e] mb-8" />

          <div className="space-y-5 text-[#6b5f56] leading-relaxed font-light">
            <p>
              The Copper Cup started with a roaster, a rented kitchen, and
              two people who thought a good cortado was worth building a
              business around. Turns out other people thought so too.
            </p>
            <p>
              We roast in small batches, bake everything from scratch, and
              serve it in a space that doesn&rsquo;t rush you. That&rsquo;s
              the whole idea.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 opacity-20">
            <BrandMark size={36} className="text-[#3d2e24]" />
          </div>
        </motion.div>

        {/* Image placeholder column */}
        <motion.div
          className="lg:col-span-2 relative"
          initial={reduce ? {} : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(160deg, #8b5e3c 0%, #3d2e24 50%, #7a9e7e 100%)",
            }}
          >
            <BrandMark size={64} className="text-[#fdf8f0] opacity-20" />
          </div>
          {/* Decorative gold border offset */}
          <div
            className="absolute -bottom-4 -right-4 w-full h-full rounded-lg border border-[#c9a96e]/30 pointer-events-none"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* Bottom rule + tagline */}
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#e8dfd4] text-center">
        <p
          className="text-xs tracking-[0.25em] uppercase text-[#9a9088]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Open Daily 7am&ndash;3pm
        </p>
      </div>
    </section>
  );
}
