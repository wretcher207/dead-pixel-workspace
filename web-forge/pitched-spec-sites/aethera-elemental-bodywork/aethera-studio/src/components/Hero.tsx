"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Ken Burns */}
      <div className="absolute inset-0 ken-burns">
        <Image
          src="/images/landing/misty-ferns.png"
          alt="Misty forest ferns"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-aethera-deep/70 via-aethera-deep/40 to-aethera-deep/90" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10, 20, 17, 0.7) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-6 max-w-4xl">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-24 h-px bg-aethera-glow/40 mx-auto mb-10"
        />

        {/* Logo image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="logo-glow mb-6"
        >
          <Image
            src="/images/logo.jpg"
            alt="AETHERA Elemental Bodywork"
            width={700}
            height={200}
            className="mx-auto w-full max-w-[280px] sm:max-w-[400px] md:max-w-[540px]"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="font-accent text-aethera-pale/70 text-lg sm:text-xl md:text-2xl tracking-wide mb-10 md:mb-12"
        >
          Ground the body. Elevate the spirit.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a
            href="https://www.massagebook.com/biz/aethera-elemental-bodywork"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-pulse inline-block px-8 sm:px-10 py-3.5 sm:py-4 border border-aethera-glow/40 rounded-full font-heading text-xs sm:text-sm tracking-[0.25em] uppercase text-aethera-glow hover:bg-aethera-glow/10 hover:border-aethera-glow/60 transition-all duration-500"
          >
            Book a Session
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-aethera-glow/40" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
