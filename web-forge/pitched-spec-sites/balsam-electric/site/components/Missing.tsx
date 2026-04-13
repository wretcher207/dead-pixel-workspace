"use client";

import { useEffect, useRef } from "react";

const points = [
  {
    stat: "97%",
    heading: "of people search online before hiring a local service",
    detail:
      "If you're not showing up, your competitor down the road is. Every search you're absent from is a job that goes to someone else.",
  },
  {
    stat: "70%",
    heading: "of customers judge credibility based on website quality",
    detail:
      "A Facebook page isn't a website. Homeowners making a $5,000 decision want to see that you're established, professional, and easy to reach.",
  },
  {
    stat: "0",
    heading: "calls you get from people who can't find you",
    detail:
      "Word of mouth only scales so far. A website works 24/7 — answering questions, showing your work, and putting your phone number in front of people ready to hire.",
  },
];

export default function Missing() {
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
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
      <div className="divider mb-28 md:mb-40" />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-28 reveal">
          <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/80 font-medium block mb-4">
            Without a Website
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,4rem)] font-light text-cream leading-[1.08] tracking-[-0.02em] max-w-3xl">
            Every day without an online presence{" "}
            <span className="font-bold">is business walking past your door.</span>
          </h2>
        </div>

        {/* Points */}
        <div className="stagger">
          {points.map((p, i) => (
            <div key={i} className="reveal">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 border-t border-cream/[0.04]">
                {/* Stat */}
                <div className="md:col-span-2">
                  <span className="font-display text-4xl md:text-5xl font-bold text-copper tracking-tight">
                    {p.stat}
                  </span>
                </div>

                {/* Heading */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-base md:text-lg font-medium text-cream/85 leading-snug">
                    {p.heading}
                  </h3>
                </div>

                {/* Detail */}
                <div className="md:col-span-5 md:col-start-8">
                  <p className="text-sm text-cream/30 font-light leading-[1.8]">
                    {p.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-cream/[0.04]" />
        </div>
      </div>
    </section>
  );
}
