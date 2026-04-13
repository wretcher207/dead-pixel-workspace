"use client";

import { useEffect, useRef } from "react";

export default function About() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Large atmospheric image — full width, cinematic crop */}
        <div className="reveal relative mb-20 md:mb-28 overflow-hidden">
          <img
            src="/images/hero-forest.jpg"
            alt="Maine forest"
            className="w-full h-[50vh] md:h-[60vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-charcoal/40" />

          {/* Overlaid text — editorial positioning */}
          <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 right-6">
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/80 font-medium">
              About
            </span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-cream leading-[1.05] tracking-[-0.02em] mt-3">
              Trusted by Maine,{" "}
              <br className="hidden md:block" />
              <span className="font-bold">built on craft.</span>
            </h2>
          </div>
        </div>

        {/* Two-column text — asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5 reveal-left">
            <p className="text-cream/40 font-light leading-[1.8] text-[15px]">
              Placeholder paragraph about Balsam Electric&apos;s story and values.
              How the company was founded and what drives the work every day.
              A deep connection to the communities served.
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-7 reveal-right">
            <p className="text-cream/40 font-light leading-[1.8] text-[15px]">
              Placeholder paragraph about commitment to quality. Every wire pulled,
              every panel mounted, every connection tested — done with the kind of
              care that means you never think about it again.
            </p>
          </div>
        </div>

        {/* Stats — minimal, typographic */}
        <div className="mt-20 md:mt-28 pt-10 border-t border-cream/[0.04] reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { num: "10+", label: "Years" },
              { num: "500+", label: "Projects" },
              { num: "100%", label: "Licensed" },
              { num: "24/7", label: "Emergency" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-3xl md:text-4xl font-bold text-cream/90 tracking-tight">
                  {stat.num}
                </span>
                <span className="font-display text-[10px] tracking-[0.25em] uppercase text-cream/20 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
