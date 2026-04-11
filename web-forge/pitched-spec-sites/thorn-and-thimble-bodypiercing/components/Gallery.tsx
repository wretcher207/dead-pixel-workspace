"use client";

import { useState, useEffect, useCallback } from "react";
import { gallery } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((i) => (i === null ? null : (i + 1) % gallery.length)),
    [],
  );
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? null : (i - 1 + gallery.length) % gallery.length,
      ),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, next, prev]);

  return (
    <section
      id="showcase"
      className="relative py-section overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(217,168,148,0.12),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div className="max-w-[56ch]">
            <div className="section-label mb-6">№ 04 · Showcase</div>
            <h2
              id="gallery-heading"
              className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3"
            >
              Recent <span className="display-italic text-rose-200">work,</span> selected with care.
            </h2>
            <p className="mt-6 text-[0.98rem] leading-[1.8] text-bone/70 max-w-[52ch]">
              A small edit of pieces from the studio. Every placement, jewelry choice, and finish is a conversation between Libby and her client — precise, considered, and yours.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.28em] text-bone/45">
            <span className="w-10 h-px bg-rose/40" />
            <span>{gallery.length} Pieces · Vol. I</span>
          </div>
        </Reveal>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[140px] md:auto-rows-[180px]">
          {gallery.map((item, i) => {
            const spanClass = spanToClass(item.span, i);
            return (
              <Reveal key={item.src} delay={(i % 6) * 0.05} className={spanClass}>
                <button
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative w-full h-full overflow-hidden rounded-[2px] text-left"
                  aria-label={`View ${item.title} — ${item.detail}`}
                >
                  {/* Frame */}
                  <div className="absolute inset-0 ring-1 ring-bone/8 z-20 pointer-events-none group-hover:ring-rose/50 transition-[box-shadow,outline-color] duration-700" />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-ink-900/10 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(227,180,138,0.12),transparent_60%)] mix-blend-overlay z-10 pointer-events-none" />

                  <img
                    src={item.src}
                    alt={item.alt}
                    className="absolute inset-0 w-full h-full object-cover scale-[1.02] group-hover:scale-[1.08] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    loading="lazy"
                  />

                  {/* Corner index */}
                  <span className="absolute top-3 left-3 md:top-4 md:left-4 z-20 text-[0.58rem] uppercase tracking-[0.28em] text-bone/80 font-display italic">
                    № {item.index}
                  </span>

                  {/* Caption */}
                  <div className="absolute left-0 right-0 bottom-0 z-20 p-3 md:p-5">
                    <div className="eyebrow text-rose-200/90 mb-1 text-[0.58rem] md:text-[0.7rem]">
                      {item.detail}
                    </div>
                    <div className="font-display text-[1.1rem] md:text-[1.35rem] leading-tight text-bone tracking-[-0.015em]">
                      {item.title}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-ink-900/80 border border-rose/40 backdrop-blur">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M13 13L9.5 9.5M11 6A5 5 0 111 6a5 5 0 0110 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-200" />
                      </svg>
                      <span className="text-[0.62rem] uppercase tracking-[0.24em] text-bone/80">
                        View
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-ink-900/96 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${lightbox + 1} of ${gallery.length}: ${gallery[lightbox].title}`}
          onClick={close}
        >
          <button
            type="button"
            className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full border border-bone/20 flex items-center justify-center text-bone/80 hover:text-rose-200 hover:border-rose/50 transition-colors duration-500"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <button
            type="button"
            className="hidden md:flex absolute left-6 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-bone/20 items-center justify-center text-bone/80 hover:text-rose-200 hover:border-rose/50 transition-colors duration-500"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8 1L2 7L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="hidden md:flex absolute right-6 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-bone/20 items-center justify-center text-bone/80 hover:text-rose-200 hover:border-rose/50 transition-colors duration-500"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6 1L12 7L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative max-w-[1100px] w-full flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="max-h-[78svh] w-auto object-contain rounded-[2px] shadow-ink-lift"
            />
            <div className="flex items-end justify-between w-full max-w-[900px] px-2">
              <div>
                <div className="eyebrow text-rose-200/90 mb-1">
                  № {gallery[lightbox].index} · {gallery[lightbox].detail}
                </div>
                <div className="font-display text-2xl md:text-3xl text-bone tracking-[-0.015em]">
                  {gallery[lightbox].title}
                </div>
              </div>
              <div className="text-[0.68rem] uppercase tracking-[0.28em] text-bone/50 tabular-nums">
                {lightbox + 1} / {gallery.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function spanToClass(span: "sm" | "md" | "lg" | "tall", i: number): string {
  // 4-column desktop grid, 2-column mobile grid
  // Use explicit patterns for varied layout
  const patterns = [
    "col-span-1 row-span-3 md:col-span-2 md:row-span-3", // 0 - tall
    "col-span-1 row-span-2 md:col-span-1 md:row-span-2", // 1 - md
    "col-span-1 row-span-2 md:col-span-1 md:row-span-2", // 2 - md
    "col-span-2 row-span-3 md:col-span-2 md:row-span-3", // 3 - tall
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2", // 4 - wide
    "col-span-1 row-span-2 md:col-span-1 md:row-span-2", // 5 - md
    "col-span-2 row-span-3 md:col-span-1 md:row-span-3", // 6 - tall
    "col-span-1 row-span-2 md:col-span-2 md:row-span-2", // 7 - md
    "col-span-1 row-span-2 md:col-span-1 md:row-span-2", // 8 - md
    "col-span-1 row-span-2 md:col-span-1 md:row-span-2", // 9 - sm
    "col-span-2 row-span-2 md:col-span-2 md:row-span-2", // 10 - md
  ];
  return patterns[i] || "col-span-1 row-span-2 md:col-span-1 md:row-span-2";
}
