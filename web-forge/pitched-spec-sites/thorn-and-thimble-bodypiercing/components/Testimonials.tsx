import { testimonials } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Testimonials() {
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="testimonials"
      className="relative py-section overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bone/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(199,155,114,0.1),transparent_55%),radial-gradient(circle_at_10%_80%,rgba(217,168,148,0.09),transparent_60%)]" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div className="max-w-[56ch]">
            <div className="section-label mb-6">№ 05 · Words From The Chair</div>
            <h2
              id="testimonials-heading"
              className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3"
            >
              Trusted by the people <span className="display-italic text-rose-200">Libby</span> has pierced.
            </h2>
          </div>
          <div className="flex items-baseline gap-4">
            <span className="font-display text-5xl md:text-6xl text-rose-200 tracking-[-0.02em]">
              10/10
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.26em] text-bone/55 max-w-[14ch]">
              Client recommend across every review
            </span>
          </div>
        </Reveal>

        {/* Featured testimonial */}
        <Reveal>
          <article className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 p-8 md:p-12 lg:p-16 rounded-[2px] bg-gradient-to-br from-ink-800/90 to-ink-900/90 border border-bone/10 backdrop-blur overflow-hidden">
            {/* Decorative */}
            <div className="absolute -top-24 -left-24 w-[460px] h-[460px] bg-[radial-gradient(circle,rgba(227,180,138,0.2),transparent_70%)] blur-3xl pointer-events-none" />
            <span
              aria-hidden
              className="absolute top-6 right-8 md:top-10 md:right-14 font-display italic text-[9rem] md:text-[14rem] leading-none text-rose/15 pointer-events-none select-none"
            >
              ”
            </span>

            <div className="lg:col-span-2 relative">
              <div className="eyebrow text-rose-200/90">Featured · 2025</div>
              <div className="mt-4 flex gap-1 text-rose-200">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-lg">✦</span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-10 relative">
              <blockquote>
                <p className="font-display text-[1.7rem] md:text-[2.1rem] lg:text-[2.35rem] leading-[1.25] text-bone tracking-[-0.015em]">
                  "{featured.body}"
                </p>
                <footer className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                  <cite className="not-italic font-display text-lg text-rose-200">
                    {featured.name}
                  </cite>
                  <span className="hidden sm:block w-px h-4 bg-bone/20" />
                  <span className="text-[0.68rem] uppercase tracking-[0.28em] text-bone/45">
                    {featured.date}
                  </span>
                </footer>
              </blockquote>
            </div>
          </article>
        </Reveal>

        {/* Rest of the reviews */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {rest.map((t, i) => (
            <Reveal key={t.name} delay={(i % 6) * 0.06}>
              <article className="group relative h-full flex flex-col p-7 md:p-8 rounded-[2px] bg-ink-800/50 border border-bone/10 hover:border-rose/30 transition-colors duration-700 backdrop-blur">
                <div className="absolute top-5 right-6 font-display italic text-6xl leading-none text-rose/20 pointer-events-none select-none group-hover:text-rose/30 transition-colors duration-700">
                  ”
                </div>

                <div className="flex items-center gap-2 text-rose-200/90 mb-5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className="text-sm">✦</span>
                  ))}
                </div>

                <blockquote className="flex-1 flex flex-col">
                  <p className="text-[0.95rem] leading-[1.75] text-bone/80 flex-1">
                    "{t.body}"
                  </p>

                  {t.tags && (
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[0.58rem] uppercase tracking-[0.2em] text-rose-200/80 px-2 py-1 rounded-full border border-rose/20 bg-rose/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <footer className="mt-6 pt-5 border-t border-bone/10 flex items-end justify-between gap-4">
                    <cite className="not-italic font-display text-[1.05rem] text-bone tracking-[-0.01em]">
                      {t.name}
                    </cite>
                    <span className="text-[0.6rem] uppercase tracking-[0.26em] text-bone/45 whitespace-nowrap">
                      {t.date}
                    </span>
                  </footer>
                </blockquote>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
