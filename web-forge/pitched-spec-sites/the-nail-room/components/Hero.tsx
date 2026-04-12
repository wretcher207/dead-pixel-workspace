"use client";

import { site } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-porcelain"
    >
      {/* video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/interior.jpg"
        aria-hidden="true"
      >
        <source src="/assets/interior-loop.mp4" type="video/mp4" />
      </video>
      <img
        src="/assets/interior.jpg"
        alt=""
        className="hero-fallback"
        aria-hidden="true"
      />

      {/* treatment layers — darker at top/bottom, light in the middle so the mural reads */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(14,17,23,0.78) 0%, rgba(14,17,23,0.35) 22%, rgba(14,17,23,0.15) 48%, rgba(14,17,23,0.55) 78%, rgba(14,17,23,0.92) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] mix-blend-multiply"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 15% 85%, rgba(45,64,87,0.55), transparent 65%), radial-gradient(ellipse 50% 45% at 85% 15%, rgba(45,64,87,0.35), transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/grain.svg')",
          backgroundSize: "220px",
        }}
        aria-hidden="true"
      />

      {/* right-side vertical index */}
      <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 right-10 z-10 flex-col items-center gap-5 text-porcelain/60">
        <span className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase [writing-mode:vertical-rl] rotate-180">
          Chapter 00 · Studio
        </span>
        <span className="w-px h-20 bg-porcelain/30" aria-hidden="true" />
        <span className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase [writing-mode:vertical-rl] rotate-180">
          By appointment
        </span>
      </div>

      {/* main hero stack */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 min-h-[100svh] flex flex-col pt-36 md:pt-40 pb-14 md:pb-20">
        {/* eyebrow */}
        <div className="flex items-center gap-4 mb-auto animate-fade-in">
          <span className="w-10 h-px bg-porcelain/60" aria-hidden="true" />
          <span className="font-eyebrow text-[0.7rem] tracking-widest3 uppercase text-porcelain/75">
            Boutique Nail Studio
          </span>
        </div>

        <div className="max-w-[980px] mt-10 animate-rise-in">
          <h1
            className="font-display text-porcelain tracking-tightest-3"
            style={{
              fontSize: "clamp(3.2rem, 9.5vw, 9.5rem)",
              lineHeight: "0.9",
              fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1",
            }}
          >
            A quieter kind
            <br />
            <span
              className="italic block"
              style={{
                fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1",
              }}
            >
              of&nbsp;beautiful.
            </span>
          </h1>

          <p className="mt-8 md:mt-10 max-w-[560px] text-porcelain/80 text-[1.02rem] md:text-[1.08rem] leading-[1.75] font-sans">
            {site.intro}
          </p>

          <div className="mt-9 md:mt-11 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <a href="#booking" className="btn btn-porcelain">
              Book an appointment
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a href="#work" className="btn btn-ghost">
              View the work
            </a>
          </div>
        </div>

        {/* bottom meta row */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-porcelain/55">
          <div className="flex items-center gap-3">
            <div className="scroll-tick" aria-hidden="true" />
            <span className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase">
              Scroll to explore
            </span>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-eyebrow text-[0.62rem] tracking-widest3 uppercase">
            <span>Gel manicure</span>
            <span className="text-porcelain/25">·</span>
            <span>Spa pedicure</span>
            <span className="text-porcelain/25">·</span>
            <span>Custom art</span>
          </div>
        </div>
      </div>
    </section>
  );
}
