"use client";

import { motion, useReducedMotion } from "framer-motion";
import SteamEffect from "@/components/ui/SteamEffect";
import SquirrelMark from "@/components/ui/SquirrelMark";

export default function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "#3d2e24" }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/interior.jpg')",
          opacity: 0.22,
        }}
        aria-hidden="true"
      />
      {/* Dark vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(61,46,36,0.6) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 md:px-16 py-6">
        <span className="font-serif text-2xl italic text-[#fdf8f0]">
          Nutty Netties
        </span>
        <ul className="hidden md:flex items-center gap-8">
          {["Menu", "About", "Visit"].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-sm tracking-widest uppercase text-[#c4b8ac] hover:text-[#fdf8f0] transition-colors"
                style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex items-center px-8 md:px-16 pb-20">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* Floating paper label */}
          <motion.div variants={reduce ? {} : fadeUp} transition={{ duration: 0.5 }}>
            <span
              className="inline-block font-accent text-sm text-[#3d2e24] bg-[#c9a96e] px-4 py-1.5 rounded-sm mb-6"
              style={{ transform: "rotate(-2deg)" }}
            >
              Southern Maine ✦
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-serif text-5xl md:text-7xl font-medium text-[#fdf8f0] leading-[1.05] mb-6"
            variants={reduce ? {} : fadeUp}
            transition={{ duration: 0.6 }}
          >
            A little{" "}
            <em className="text-[#c9a96e] not-italic italic">nutty.</em>
            <br />
            Completely worth it.
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="text-base text-[#c4b8ac] leading-relaxed mb-10 max-w-md font-light"
            variants={reduce ? {} : fadeUp}
            transition={{ duration: 0.5 }}
          >
            House-roasted coffee, scratch pastries, and a corner booth with
            your name on it. Biddeford, Maine.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={reduce ? {} : fadeUp}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#menu"
              className="inline-block px-8 py-3 rounded-md text-sm font-medium tracking-wide uppercase transition-all hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: "#c9a96e",
                color: "#3d2e24",
                fontFamily: "var(--font-sans)",
              }}
            >
              See the Menu
            </a>
            <a
              href="#visit"
              className="inline-block px-8 py-3 rounded-md text-sm font-medium tracking-wide uppercase border border-white/25 text-[#fdf8f0] hover:border-white/50 transition-all active:scale-95"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Find Us
            </a>
          </motion.div>
        </motion.div>

        {/* Squirrel watermark */}
        <div
          className="hidden lg:block absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <SquirrelMark
            size={120}
            className="text-[#fdf8f0] opacity-[0.08]"
          />
        </div>
      </div>

      {/* Steam effect */}
      <SteamEffect />
    </section>
  );
}
