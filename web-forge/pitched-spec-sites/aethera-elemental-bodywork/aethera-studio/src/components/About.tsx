"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-aethera-forest" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(122,201,160,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <Leaf className="text-aethera-glow/50" size={16} />
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-aethera-glow/60">
            The Breath
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-aethera-cream leading-[1.1] mb-6 md:mb-8"
            >
              Where stillness
              <br />
              <span className="font-accent text-aethera-glow/80">meets</span>
              <br />
              the body
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5 text-aethera-text/80 text-base sm:text-lg leading-relaxed"
            >
              <p>
                You carry more than you realize. The tension that builds in your
                shoulders, the stress that settles into your jaw, the weight of
                a week that never lets up. Aethera is a place to set it down.
              </p>
              <p>
                Every session is built around you. Your body, your goals,
                whatever you walked in carrying. No scripts, no cookie-cutter
                routines. Just skilled hands, real attention, and a quiet space
                where you can actually let go.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8"
            >
              <div className="section-divider w-32" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-6 font-accent text-aethera-glow-dim text-lg"
            >
              Women-owned. Client-centered. Kennebunk, Maine.
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/general/about.jpg"
                alt="Aethera treatment space"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-aethera-deep/60 via-transparent to-aethera-deep/20" />
            </div>
            {/* Decorative glow */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-aethera-glow/10 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
