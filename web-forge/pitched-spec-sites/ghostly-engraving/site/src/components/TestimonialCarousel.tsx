"use client";

import { useState } from "react";

const testimonials = [
  {
    quote:
      "The engraving on our wedding cutting board was absolutely flawless. It's become the centerpiece of our kitchen and a daily reminder of our day.",
    name: "Sarah & James M.",
    location: "Portland, ME",
  },
  {
    quote:
      "I ordered 50 custom tumblers for our real estate team. The quality blew everyone away. Our clients actually use them daily instead of tossing them in a closet.",
    name: "Mike D.",
    location: "Manchester, NH",
  },
  {
    quote:
      "The memorial piece they created for my father was handled with so much care and attention. It means everything to our family.",
    name: "Rachel K.",
    location: "Lewiston, ME",
  },
  {
    quote:
      "Fast turnaround, incredible precision, and they worked with my rough sketch to create something way better than I imagined. Will be back.",
    name: "Tom B.",
    location: "Augusta, ME",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      {/* Large quote mark */}
      <span className="block font-serif text-8xl text-violet/30 leading-none mb-4 select-none">
        &ldquo;
      </span>

      <blockquote className="font-serif text-xl md:text-2xl text-cream italic leading-relaxed mb-8 min-h-[120px] transition-opacity duration-500">
        {t.quote}
      </blockquote>

      <div className="mb-8">
        <p className="text-sm font-medium text-cream">{t.name}</p>
        <p className="text-xs text-cream-dim mt-1">{t.location}</p>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prev}
          className="p-2 text-cream-dim hover:text-violet transition-colors"
          aria-label="Previous testimonial"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-violet w-6"
                  : "bg-cream-dim/30 hover:bg-cream-dim/50"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 text-cream-dim hover:text-violet transition-colors"
          aria-label="Next testimonial"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
