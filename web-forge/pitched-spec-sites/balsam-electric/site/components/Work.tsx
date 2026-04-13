"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Project Title One",
    category: "Residential",
    image: "/images/showcase-1.jpg",
    year: "2024",
  },
  {
    title: "Project Title Two",
    category: "Commercial",
    image: "/images/showcase-2.jpg",
    year: "2024",
  },
  {
    title: "Project Title Three",
    category: "Residential",
    image: "/images/hero-frost.jpg",
    year: "2023",
  },
  {
    title: "Project Title Four",
    category: "Generator Install",
    image: "/images/hero-coast.jpg",
    year: "2023",
  },
];

export default function Work() {
  const ref = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.05 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeModal]);

  return (
    <>
      <section id="work" ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="md:col-span-5 reveal">
              <span className="font-display text-[11px] tracking-[0.35em] uppercase text-copper/80 font-medium">
                Recent Work
              </span>
            </div>
            <div className="md:col-span-7 reveal">
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-cream leading-[1.1] tracking-[-0.02em]">
                Built to last,{" "}
                <span className="font-bold">done right.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Gallery — full bleed */}
        <div className="reveal">
          <div
            ref={scrollRef}
            className="horizontal-scroll pl-6 md:pl-12 lg:pl-20 pr-6"
          >
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActiveModal(i)}
                className="group relative w-[85vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] overflow-hidden cursor-pointer text-left flex-shrink-0"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Overlay — only on hover */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-500" />

                {/* Always visible — bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-charcoal/80 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block font-display text-[10px] tracking-[0.25em] uppercase text-copper/70 mb-1">
                        {p.category}
                      </span>
                      <h3 className="font-display text-base md:text-lg font-medium text-cream/90">
                        {p.title}
                      </h3>
                    </div>
                    <span className="font-display text-xs text-cream/20">{p.year}</span>
                  </div>
                </div>

                {/* Hover center prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-display text-[10px] tracking-[0.3em] uppercase text-cream/60 border border-cream/20 px-5 py-2.5">
                    View Project
                  </span>
                </div>
              </button>
            ))}

            {/* End spacer */}
            <div className="w-4 flex-shrink-0" />
          </div>

          {/* Scroll hint */}
          <div className="max-w-[1400px] mx-auto mt-6 flex items-center gap-3 px-6 md:px-0">
            <div className="w-8 h-[1px] bg-cream/10" />
            <span className="font-display text-[10px] tracking-[0.2em] uppercase text-cream/15">
              Drag to explore
            </span>
          </div>
        </div>
      </section>

      {/* Modal */}
      {activeModal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/95 backdrop-blur-2xl"
          onClick={() => setActiveModal(null)}
          style={{ animation: "fadeIn 0.3s ease forwards" }}
        >
          <div
            className="relative max-w-5xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "fadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
          >
            <img
              src={projects[activeModal].image}
              alt={projects[activeModal].title}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="mt-6 flex items-start justify-between">
              <div>
                <span className="font-display text-[10px] tracking-[0.25em] uppercase text-copper">
                  {projects[activeModal].category} — {projects[activeModal].year}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-cream mt-2">
                  {projects[activeModal].title}
                </h3>
                <p className="text-sm text-cream/30 font-light mt-3 max-w-lg leading-relaxed">
                  Placeholder project description. Details about the scope of work,
                  challenges solved, and results delivered.
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="text-cream/30 hover:text-cream transition-colors p-2"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
