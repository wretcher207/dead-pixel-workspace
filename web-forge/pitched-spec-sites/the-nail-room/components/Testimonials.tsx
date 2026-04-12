import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="reviews" className="relative py-section bg-porcelain overflow-hidden">
      {/* bg ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 w-[480px] h-[480px] opacity-[0.05] text-indigo animate-drift"
      >
        <img src="/assets/botanical.svg" alt="" className="w-full h-full" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-12 gap-y-12 gap-x-10 mb-16">
          <div className="col-span-12 md:col-span-7">
            <div className="divider-dot mb-8 text-indigo/40 max-w-[320px]">
              <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase">
                Chapter V &nbsp;·&nbsp; Said by clients
              </span>
            </div>
            <h2
              className="font-display text-ink tracking-tightest-3"
              style={{
                fontSize: "clamp(2.6rem, 5.4vw, 5rem)",
                lineHeight: "1",
                fontVariationSettings: "'SOFT' 100, 'opsz' 144",
              }}
            >
              What people<br />
              <span
                className="italic text-indigo"
                style={{
                  fontVariationSettings:
                    "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                }}
              >
                actually say.
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right flex md:justify-end items-end">
            <div className="max-w-[320px]">
              <div className="font-display text-[3.4rem] leading-none text-mist tracking-tightest-3"
                style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}>
                ★★★★★
              </div>
              <p className="mt-3 font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-indigo/55">
                Pulled from real Facebook recommendations
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((t, i) => (
            <article
              key={t.name}
              className="t-card"
              style={{
                gridRow: i === 0 ? "span 2" : undefined,
              }}
            >
              {/* quote mark */}
              <div
                aria-hidden="true"
                className="absolute top-6 right-7 font-display text-[4rem] leading-none text-mist/60 select-none"
                style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}
              >
                &ldquo;
              </div>
              <blockquote className="font-display italic text-ink text-[1.05rem] md:text-[1.12rem] leading-[1.55] tracking-tightest-2 relative z-10"
                style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 24, 'WONK' 1" }}>
                {t.quote}
              </blockquote>
              <div className="mt-7 pt-5 border-t border-indigo/10">
                <div className="font-sans text-[0.92rem] text-ink">
                  {t.name}
                </div>
                <div className="font-eyebrow text-[0.6rem] tracking-widest3 uppercase text-indigo/55 mt-1">
                  {t.tag}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
