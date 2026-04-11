"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 36 };
  const animate = { opacity: 1, y: 0 };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden grain"
      aria-label="Thorn and Thimble Body Piercing — fine jewelry piercing studio in Bangor, Maine"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(227,180,138,0.22),transparent_55%),radial-gradient(circle_at_15%_50%,rgba(199,155,114,0.12),transparent_60%),radial-gradient(circle_at_60%_110%,rgba(217,168,148,0.18),transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[22rem] bg-gradient-to-t from-ink-900 to-transparent" />
        {/* Scroll-like vertical rule */}
        <div className="hidden md:block absolute left-10 lg:left-14 top-32 bottom-24 w-px bg-gradient-to-b from-transparent via-bone/10 to-transparent" />
        <div className="hidden md:block absolute right-10 lg:right-14 top-32 bottom-24 w-px bg-gradient-to-b from-transparent via-bone/10 to-transparent" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 z-10">
        {/* Top marker rail */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 1.2, delay: 0.1, ease }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8 mb-14 md:mb-24"
        >
          <div className="flex items-center gap-4">
            <span className="w-10 h-px bg-rose" />
            <span className="eyebrow">Est. Bangor, Maine</span>
          </div>
          <div className="flex items-center gap-5 text-[0.68rem] uppercase tracking-[0.28em] text-bone/55">
            <span className="hidden md:inline">Index №</span>
            <span className="text-bone/80">01 · Hero</span>
            <span className="hidden md:inline w-8 h-px bg-bone/20" />
            <span className="hidden md:inline">Vol. I</span>
          </div>
        </motion.div>

        {/* Main row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left: headline */}
          <div className="lg:col-span-7 relative">
            <motion.h1
              initial={initial}
              animate={animate}
              transition={{ duration: 1.3, delay: 0.25, ease }}
              className="font-display text-hero-md md:text-hero-lg text-bone tracking-tightest-3 relative"
            >
              <span className="block">Adorned</span>
              <span className="block">with <span className="display-italic text-rose-200">intention.</span></span>
            </motion.h1>

            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 1.2, delay: 0.55, ease }}
              className="mt-10 md:mt-14 grid grid-cols-12 gap-6"
            >
              <div className="col-span-12 md:col-span-8">
                <p className="text-[1.02rem] md:text-[1.15rem] leading-[1.75] text-bone/80 max-w-[46ch]">
                  A fine-jewelry piercing studio in downtown Bangor. Precise hands,
                  APP-quality jewelry, and a room where you're welcome to be exactly
                  who you are.
                </p>
              </div>
              <div className="hidden md:flex col-span-4 flex-col items-end text-right">
                <span className="eyebrow mb-3">Owner — Piercer</span>
                <span className="font-display text-2xl text-bone tracking-[-0.02em]">
                  Libby
                </span>
                <span className="text-[0.68rem] uppercase tracking-[0.26em] text-bone/45 mt-1">
                  Est. Bangor, ME
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 1.2, delay: 0.8, ease }}
              className="mt-12 md:mt-14 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-9"
            >
              <a href="#visit" className="btn-primary group">
                <span>Book a Session</span>
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="translate-x-0 group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <path d="M0 5H18M18 5L14 1M18 5L14 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#showcase" className="btn-ghost">
                <span>View Recent Work</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={initial}
              animate={animate}
              transition={{ duration: 1.2, delay: 1.05, ease }}
              className="mt-16 md:mt-24 pt-7 border-t border-bone/10"
            >
              <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                <TrustItem number="10/10" label="Client recommend" />
                <span className="hidden md:inline w-px h-8 bg-bone/15" />
                <TrustItem number="APP" label="Jewelry standard" />
                <span className="hidden md:inline w-px h-8 bg-bone/15" />
                <TrustItem number="40 Main St" label="Downtown Bangor" />
              </div>
            </motion.div>
          </div>

          {/* Right: hero image composition */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease }}
              className="relative"
            >
              {/* Label floating top-right of image */}
              <div className="absolute -top-4 left-0 right-0 flex items-center justify-between z-20 pointer-events-none">
                <span className="font-display italic text-rose-200/90 text-lg">№ 01</span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-bone/60 bg-ink-900/60 px-3 py-1 rounded-full border border-bone/10 backdrop-blur-md">
                  Ear Curation
                </span>
              </div>

              <div className="relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] rounded-[2px] overflow-hidden shadow-ink-lift">
                {/* Frame */}
                <div className="absolute inset-0 ring-1 ring-rose/30 rounded-[2px] z-20 pointer-events-none" />
                <div className="absolute inset-[6px] ring-1 ring-bone/8 rounded-[2px] z-20 pointer-events-none" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(227,180,138,0.18),transparent_55%)] mix-blend-overlay z-10 pointer-events-none" />

                <img
                  src="/assets/gallery/ear-crystal-stack.jpg"
                  alt="Crystal flat-back studs and silver hoop — ear curation by Libby at Thorn and Thimble Body Piercing"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Bottom caption */}
                <div className="absolute left-0 right-0 bottom-0 z-20 p-5 md:p-7 flex items-end justify-between">
                  <div>
                    <div className="eyebrow text-rose-200/90 mb-2">Recent · Bangor</div>
                    <div className="font-display text-2xl md:text-[1.7rem] leading-tight text-bone">
                      Pavé on <span className="display-italic text-rose-200">flat-back</span>
                    </div>
                  </div>
                  <div className="text-[0.6rem] uppercase tracking-[0.28em] text-bone/70">
                    01 / 11
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.3, delay: 0.85, ease }}
                className="hidden md:flex absolute -left-8 bottom-12 w-[220px] flex-col gap-3 p-5 rounded-[2px] bg-ink-800/90 border border-bone/10 backdrop-blur-xl shadow-rose-glow"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-rose-200/90">Studio note</span>
                  <span className="font-display italic text-rose-200/80 text-base">✦</span>
                </div>
                <p className="text-[0.85rem] leading-[1.6] text-bone/80">
                  "There is no space for hate in here. You are welcome exactly as you are."
                </p>
                <span className="text-[0.6rem] uppercase tracking-[0.28em] text-bone/45">— Libby</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 1.2, delay: 1.3, ease }}
          className="mt-20 md:mt-28 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="eyebrow">Scroll</span>
            <span className="relative block w-16 h-px bg-bone/20 overflow-hidden">
              <span className="absolute inset-y-0 left-0 w-6 bg-rose-200 animate-[slide_3s_ease-in-out_infinite]" />
            </span>
          </div>
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-bone/45 text-right">
            A studio by Libby
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0%, 100% { transform: translateX(-20px); }
          50% { transform: translateX(48px); }
        }
      `}</style>
    </section>
  );
}

function TrustItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-2xl text-rose-200 tracking-[-0.02em]">{number}</span>
      <span className="text-[0.68rem] uppercase tracking-[0.26em] text-bone/55">{label}</span>
    </div>
  );
}
