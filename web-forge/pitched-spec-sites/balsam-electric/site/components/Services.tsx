"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    title: "Residential Wiring",
    desc: "New construction, renovations, and full rewiring for homes across Maine.",
  },
  {
    num: "02",
    title: "Commercial Systems",
    desc: "Office, retail, and industrial electrical — built to code, built to last.",
  },
  {
    num: "03",
    title: "Panel Upgrades",
    desc: "Modern panels for safety, capacity, and peace of mind.",
  },
  {
    num: "04",
    title: "Diagnostics & Repair",
    desc: "Fast, accurate troubleshooting. We find it and we fix it.",
  },
  {
    num: "05",
    title: "Generator Systems",
    desc: "Whole-home and commercial backup power. Maine weather doesn't wait.",
  },
  {
    num: "06",
    title: "Lighting",
    desc: "Interior, exterior, and landscape. Functional and atmospheric.",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header — editorial, asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-20 md:mb-28">
          <div className="md:col-span-5 reveal">
            <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/80 font-medium">
              Services
            </span>
          </div>
          <div className="md:col-span-7 reveal">
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-[1.1] tracking-[-0.02em]">
              Every detail,{" "}
              <span className="font-bold">handled right.</span>
            </h2>
          </div>
        </div>

        {/* Service List — editorial, not cards */}
        <div className="stagger">
          {services.map((s, i) => (
            <div key={s.num} className="reveal">
              <div
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 md:py-10 border-t border-cream/[0.04] hover:border-copper/20 transition-colors duration-500 cursor-default"
              >
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-display text-[11px] text-copper/40 tracking-wider group-hover:text-copper transition-colors duration-500">
                    {s.num}
                  </span>
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-lg md:text-xl font-medium text-cream/80 group-hover:text-cream transition-colors duration-500 tracking-wide">
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-5">
                  <p className="text-sm text-cream/25 group-hover:text-cream/45 font-light leading-relaxed transition-colors duration-500">
                    {s.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="md:col-span-2 flex md:justify-end items-center">
                  <svg
                    className="w-5 h-5 text-cream/0 group-hover:text-copper transform translate-x-0 group-hover:translate-x-2 transition-all duration-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              {/* Last item bottom border */}
              {i === services.length - 1 && (
                <div className="border-t border-cream/[0.04]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
