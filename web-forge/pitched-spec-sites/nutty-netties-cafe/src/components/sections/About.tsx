"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import SquirrelMark from "@/components/ui/SquirrelMark";

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
            "We opened because Biddeford needed a place to be weird and
            well-fed at the same time."
          </blockquote>

          <div className="h-px w-12 bg-[#c9a96e] mb-8" />

          <div className="space-y-5 text-[#6b5f56] leading-relaxed font-light">
            <p>
              Nutty Netties started in 2019 with a roaster, a rented kitchen,
              and an unexplained abundance of hazelnut syrup. It turns out
              people would drive a fair distance for a good cortado and a
              place that doesn&rsquo;t rush you.
            </p>
            <p>
              Nettie&rsquo;s a real person. She&rsquo;s the one who named the
              morning bun after herself. We&rsquo;re not sorry about it.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 opacity-20">
            <SquirrelMark size={36} className="text-[#3d2e24]" />
          </div>
        </motion.div>

        {/* Image column */}
        <motion.div
          className="lg:col-span-2 relative"
          initial={reduce ? {} : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/images/interior.jpg"
              alt="Cozy interior of Nutty Netties Cafe"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
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
          Est. Biddeford, Maine — Open Daily 7am–3pm
        </p>
      </div>
    </section>
  );
}
