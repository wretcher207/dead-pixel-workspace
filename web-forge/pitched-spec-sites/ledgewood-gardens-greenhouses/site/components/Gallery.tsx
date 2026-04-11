"use client";

import { useMemo, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { Reveal } from "@/components/ui/Reveal";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { LightboxModal } from "@/components/LightboxModal";
import { GALLERY, type GalleryImage } from "@/data/gallery";

type Props = {
  images?: GalleryImage[];
  heading?: string;
  eyebrow?: string;
  compact?: boolean;
};

// Editorial asymmetric grid. Sizing pattern repeats every 10 tiles
// to give the illusion of curation without hardcoding every cell.
// Every tile opens in the lightbox.
function patternClass(index: number): string {
  const pattern = [
    "md:col-span-4 md:row-span-2", // big landscape
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
    "md:col-span-3 md:row-span-2", // tall portrait
    "md:col-span-3 md:row-span-1",
    "md:col-span-2 md:row-span-2", // another tall
    "md:col-span-2 md:row-span-1",
    "md:col-span-4 md:row-span-2", // wide
    "md:col-span-2 md:row-span-1",
    "md:col-span-2 md:row-span-1",
  ];
  return pattern[index % pattern.length];
}

function aspectClass(i: number): string {
  // Match pattern so tiles look right on mobile (where grid is 2-col).
  const aspects = [
    "aspect-[4/3]",
    "aspect-square",
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[16/10]",
    "aspect-[3/4]",
    "aspect-square",
    "aspect-[4/3]",
    "aspect-square",
    "aspect-square",
  ];
  return aspects[i % aspects.length];
}

export function Gallery({
  images = GALLERY,
  heading = "Twenty-four photos from inside the greenhouse.",
  eyebrow = "Gallery",
  compact = false,
}: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const items = useMemo(
    () =>
      images.map((img, i) => ({
        img,
        pattern: patternClass(i),
        aspect: aspectClass(i),
      })),
    [images],
  );

  return (
    <Section id="gallery" tone="cream">
      <Reveal className="flex flex-col items-center text-center mb-14 md:mb-20">
        <p className="eyebrow-caps mb-5">{eyebrow}</p>
        <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] tracking-heading text-balance max-w-[760px]">
          {heading}
        </h2>
        <BotanicalDivider className="mt-7 w-48 text-moss/60" />
      </Reveal>

      <div
        className={`grid grid-cols-2 md:grid-cols-10 gap-3 md:gap-5 md:auto-rows-[170px]`}
      >
        {items.map(({ img, pattern, aspect }, i) => (
          <button
            key={img.id}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            onClick={() => setOpenIndex(i)}
            className={`group relative overflow-hidden rounded-[14px] md:rounded-[16px] ${pattern} ${aspect} md:aspect-auto bg-moss/5 border border-moss/10 card-elevated focus-visible:outline-moss`}
            aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
          >
            <ResponsivePicture
              base={img.file}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 40vw, 30vw"
              className="absolute inset-0 block h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(31,42,36,0) 40%, rgba(31,42,36,0.55) 100%)",
              }}
            />
            <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-ivory/90 text-moss shadow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M11 8 V14" />
                  <path d="M8 11 H14" />
                  <path d="M16 16 L21 21" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {!compact && (
        <Reveal className="mt-12 md:mt-16 flex justify-center">
          <a
            href="/gallery/"
            className="btn btn-ghost-dark"
          >
            View All Photos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12 H19" />
              <path d="M13 6 L19 12 L13 18" />
            </svg>
          </a>
        </Reveal>
      )}

      <LightboxModal
        images={images}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={(n) => setOpenIndex(n)}
        returnFocusRef={thumbRefs}
      />
    </Section>
  );
}
