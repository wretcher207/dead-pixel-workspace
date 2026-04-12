"use client";

import { useEffect, useState, useCallback } from "react";
import { showcase } from "@/lib/content";

export function Gallery() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const close = useCallback(() => setOpen(false), []);
  const openAt = useCallback((i: number) => {
    setActiveIdx(i);
    setOpen(true);
  }, []);
  const next = useCallback(
    () => setActiveIdx((i) => (i + 1) % showcase.length),
    [],
  );
  const prev = useCallback(
    () => setActiveIdx((i) => (i - 1 + showcase.length) % showcase.length),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, next, prev]);

  return (
    <section id="work" className="relative py-section bg-porcelain overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
          <div>
            <div className="divider-dot mb-8 text-indigo/40 max-w-[300px]">
              <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase">
                Chapter III &nbsp;·&nbsp; Work
              </span>
            </div>
            <h2
              className="font-display text-ink tracking-tightest-3 max-w-[720px]"
              style={{
                fontSize: "clamp(2.8rem, 5.6vw, 5.4rem)",
                lineHeight: "1",
                fontVariationSettings: "'SOFT' 100, 'opsz' 144",
              }}
            >
              Recent
              <span
                className="italic text-indigo"
                style={{
                  fontVariationSettings:
                    "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                }}
              >
                {" "}sets.
              </span>
            </h2>
          </div>
          <p className="text-indigo/65 max-w-[360px] leading-[1.75]">
            A small rolling selection. Tap any set to see it full size. Want
            something like one of these? Mention it when you book.
          </p>
        </div>

        {/* editorial asymmetric grid — hand-composed spans per index */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[240px] lg:auto-rows-[260px] gap-3 md:gap-4">
          {showcase.map((s, i) => {
            // Featured tiles: index 0 (big), 3 (tall), 6 (wide)
            const spanClass =
              i === 0
                ? "md:col-span-2 md:row-span-2"
                : i === 3
                  ? "md:row-span-2"
                  : i === 6
                    ? "md:col-span-2"
                    : "";
            return (
              <button
                key={s.src}
                type="button"
                onClick={() => openAt(i)}
                className={`tile ${spanClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo`}
                aria-label={`Open image: ${s.alt}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-10 border-t border-indigo/10">
          <p className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-indigo/50">
            All work by Chelsea &nbsp;·&nbsp; The Nail Room
          </p>
          <a href={`#booking`} className="btn-link">
            Book a custom set
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>
      </div>

      {/* lightbox */}
      <div
        className={`lightbox ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
        onClick={close}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-porcelain/80 hover:text-porcelain p-4 font-eyebrow text-[0.72rem] tracking-widest3 uppercase"
          aria-label="Previous image"
        >
          ← Prev
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-porcelain/80 hover:text-porcelain p-4 font-eyebrow text-[0.72rem] tracking-widest3 uppercase"
          aria-label="Next image"
        >
          Next →
        </button>
        <button
          type="button"
          onClick={close}
          className="absolute top-6 right-6 z-10 text-porcelain/80 hover:text-porcelain font-eyebrow text-[0.72rem] tracking-widest3 uppercase"
          aria-label="Close"
        >
          Close ✕
        </button>
        {open && (
          <figure
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={showcase[activeIdx].src}
              alt={showcase[activeIdx].alt}
            />
            <figcaption className="mt-4 text-center font-eyebrow text-[0.68rem] tracking-widest3 uppercase text-porcelain/70">
              {showcase[activeIdx].alt} · {activeIdx + 1} /{" "}
              {showcase.length}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
