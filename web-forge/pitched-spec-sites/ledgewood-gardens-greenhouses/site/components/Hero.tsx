import { Button } from "@/components/ui/Button";
import { BotanicalCorner } from "@/components/ui/BotanicalFrame";
import { BUSINESS } from "@/data/business";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-ivory"
    >
      {/* Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/showcase/showcase-02.jpg"
        aria-hidden="true"
      >
        <source src="/media/landing-page-loop.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for legibility */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(31,42,36,0.55) 0%, rgba(31,42,36,0.25) 35%, rgba(31,42,36,0.55) 75%, rgba(31,42,36,0.82) 100%)",
        }}
      />
      {/* Color treatment layer for warmth */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 30%, rgba(47,93,78,0.35), transparent 60%), radial-gradient(80% 60% at 70% 70%, rgba(62,47,36,0.3), transparent 60%)",
        }}
      />

      {/* Corner ornaments */}
      <BotanicalCorner className="absolute top-28 left-4 md:top-32 md:left-10 w-24 md:w-32 text-ivory/35" />
      <BotanicalCorner className="absolute bottom-28 right-4 md:bottom-32 md:right-10 w-24 md:w-32 text-ivory/35 scale-x-[-1]" />

      <div className="relative container-site flex min-h-[100svh] flex-col justify-end pb-14 md:pb-20 pt-40 md:pt-48">
        <div className="max-w-[780px]">
          <p className="eyebrow text-ivory/85 mb-5 md:mb-6">
            Orrington, Maine · Since 1989
          </p>
          <h1 className="font-display text-balance text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.02] tracking-[-0.025em] font-semibold text-ivory">
            Rooted in Orrington{" "}
            <em className="italic font-normal text-ivory/95">since 1989.</em>
          </h1>
          <p className="mt-6 md:mt-8 max-w-[560px] text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-ivory/90 text-pretty">
            A friend and family-run greenhouse growing hanging baskets,
            annuals, perennials, and vegetable seedlings for gardeners across
            eastern Maine. We open for the 2026 season Saturday, April 25.
          </p>

          <div className="mt-9 md:mt-11 flex flex-wrap items-center gap-3 md:gap-4">
            <Button variant="primary" href="#visit">
              We Open April 25
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12 H19" />
                <path d="M13 6 L19 12 L13 18" />
              </svg>
            </Button>
            <Button variant="ghost" href="#gallery">
              See the Greenhouse
            </Button>
          </div>
        </div>

        {/* subtle scroll hint */}
        <div className="mt-14 md:mt-20 hidden md:flex items-center gap-3 text-ivory/60">
          <span className="eyebrow-caps !text-ivory/60 !text-[0.68rem]">
            Scroll
          </span>
          <span className="block h-px w-12 bg-ivory/40" />
        </div>
      </div>
    </section>
  );
}
