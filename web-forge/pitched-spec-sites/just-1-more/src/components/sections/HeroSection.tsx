"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HERO_VIDEOS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/animations";
import NeonButton from "@/components/ui/NeonButton";
import GhostButton from "@/components/ui/GhostButton";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.src = HERO_VIDEOS[idx];
    v.load();
    v.play().catch(() => {});
  }, [idx]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        onEnded={() => setIdx((i) => (i + 1) % HERO_VIDEOS.length)}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(13,13,13,0.88) 85%)",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 text-center max-w-4xl px-4"
        variants={reduce ? {} : staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={reduce ? {} : staggerItem}
          className="leading-none mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 12vw, 160px)",
          }}
        >
          <span className="text-text-primary">JUST </span>
          <span className="text-neon text-glow-neon">1</span>
          <span className="text-text-primary"> MORE</span>
        </motion.h1>

        <motion.p
          variants={reduce ? {} : staggerItem}
          className="text-text-muted text-xl italic mb-8"
        >
          You said you&apos;d stay for one.
        </motion.p>

        <motion.div
          variants={reduce ? {} : staggerItem}
          className="flex flex-wrap justify-center gap-4"
        >
          <NeonButton href="#order" size="lg">
            Order Now
          </NeonButton>
          <GhostButton href="#menu" size="lg">
            See the Menu
          </GhostButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-faint"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  );
}
