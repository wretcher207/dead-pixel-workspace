"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-forest.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ animation: "slowZoom 20s ease-out forwards" }}
        />
      </div>

      {/* Heavy gradient — atmospheric, not just darkened */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/20 to-charcoal" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-charcoal/30" />
      {/* Bottom fog effect */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />

      {/* Content — offset left, editorial positioning */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-20 md:pb-28 max-w-[1400px]">
        {/* Tag */}
        <div
          className="mb-8 flex items-center gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(12px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
          <div className="w-16 h-[1px] bg-copper origin-left" style={{
            transform: loaded ? "scaleX(1)" : "scaleX(0)",
            transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }} />
          <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/90 font-medium">
            Balsam Electric LLC
          </span>
        </div>

        {/* Headline — oversized, editorial weight contrast */}
        <h1
          className="font-display leading-[0.92] mb-8"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
          }}
        >
          <span className="block text-[clamp(3rem,8vw,7.5rem)] font-extralight text-cream/90 tracking-[-0.03em]">
            Powering
          </span>
          <span className="block text-[clamp(3rem,8vw,7.5rem)] font-bold text-cream tracking-[-0.03em]">
            what matters.
          </span>
        </h1>

        {/* Sub — tight, restrained */}
        <p
          className="text-[15px] md:text-base text-cream/35 font-light leading-relaxed max-w-md mb-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s",
          }}
        >
          Placeholder text. Reliable electrical work across Maine.
          No project too small, no detail overlooked.
        </p>

        {/* CTA — single, confident */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(16px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s",
          }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4"
          >
            <span className="px-8 py-4 bg-copper text-charcoal font-display text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-copper-light group-hover:translate-y-[-1px] group-hover:shadow-lg group-hover:shadow-copper/15">
              Request a Quote
            </span>
            <svg
              className="w-5 h-5 text-copper transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Right side — phone number, vertical */}
      <div
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-4"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      >
        <a
          href="tel:2079498888"
          className="font-display text-[11px] tracking-[0.2em] text-cream/25 hover:text-copper transition-colors duration-300"
          style={{ writingMode: "vertical-rl" }}
        >
          207 — 949 — 8888
        </a>
      </div>

      {/* Bottom scroll line */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease 1.5s",
        }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-cream/15 to-transparent" />
      </div>
    </section>
  );
}
