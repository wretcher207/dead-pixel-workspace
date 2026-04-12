export function Studio() {
  return (
    <section
      id="studio"
      className="relative py-section bg-porcelain overflow-hidden"
    >
      {/* subtle top hairline */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="divider-dot mb-20 text-indigo/40">
          <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase">
            Chapter I &nbsp;·&nbsp; The Studio
          </span>
        </div>

        <div className="grid grid-cols-12 gap-y-16 md:gap-y-20 gap-x-8">
          {/* left column: label + quote */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col justify-between gap-16">
            <div>
              <h2
                className="font-display text-ink tracking-tightest-3"
                style={{
                  fontSize: "clamp(2.8rem, 5.6vw, 5.4rem)",
                  lineHeight: "1",
                  fontVariationSettings: "'SOFT' 100, 'opsz' 144",
                }}
              >
                One table,<br />
                <span
                  className="italic text-indigo"
                  style={{
                    fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                  }}
                >
                  one&nbsp;artist.
                </span>
              </h2>
              <div className="mt-10 space-y-6 text-indigo/75 max-w-[440px] text-[1rem] leading-[1.75]">
                <p>
                  The Nail Room is a small, private studio. No crowded salon floor, no
                  rushed appointments, no shouting over a dozen dryers. Just a clean
                  room, good light, and the time to do the work properly.
                </p>
                <p>
                  Chelsea has been doing nails for more than a decade. She knows what
                  lasts, what breaks, and what holds up to the way you actually use your
                  hands. Come in once and she'll remember how you like your cuticles
                  next time.
                </p>
              </div>
            </div>

            <figure className="relative max-w-[440px]">
              <div
                aria-hidden="true"
                className="absolute -left-3 top-0 h-full w-px bg-indigo/30"
              />
              <blockquote className="pl-8 font-display italic text-ink text-[1.4rem] md:text-[1.6rem] leading-[1.35] tracking-tightest-2"
                style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}>
                &ldquo;I walk around knowing I have the most beautiful nails possible.&rdquo;
              </blockquote>
              <figcaption className="pl-8 mt-4 font-eyebrow text-[0.68rem] tracking-widest3 uppercase text-indigo/60">
                Jennifer T. &nbsp;·&nbsp; five years a regular
              </figcaption>
            </figure>
          </div>

          {/* right column: interior image + meta */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 relative">
            <div className="relative aspect-[4/5] md:aspect-[4/5] lg:aspect-[9/11] overflow-hidden">
              <img
                src="/assets/interior.jpg"
                alt="The Nail Room studio interior with hand-painted blue floral mural and pedicure chair"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* color treatment layer */}
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(45,64,87,0) 40%, rgba(20,32,47,0.35) 100%)",
                }}
                aria-hidden="true"
              />
              {/* tonal wash */}
              <div
                className="absolute inset-0 mix-blend-soft-light opacity-40"
                style={{ background: "#a9c2d8" }}
                aria-hidden="true"
              />
              {/* bottom floating meta card */}
              <div
                className="absolute bottom-5 left-5 right-5 md:left-8 md:right-auto md:max-w-[320px] bg-porcelain p-6 shadow-porcelain-lift"
              >
                <div className="font-eyebrow text-[0.6rem] tracking-widest3 uppercase text-indigo/60">
                  Studio hours
                </div>
                <div className="mt-3 space-y-1 font-sans text-[0.92rem] text-ink">
                  <div className="flex justify-between">
                    <span>Tue – Fri</span>
                    <span className="text-indigo/70">10 – 6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-indigo/70">10 – 4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sun, Mon</span>
                    <span className="text-indigo/70">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-ink/10">
                  <div className="font-eyebrow text-[0.58rem] tracking-widest3 uppercase text-indigo/50">
                    By appointment only
                  </div>
                </div>
              </div>
            </div>

            {/* editorial meta row below image */}
            <div className="mt-8 grid grid-cols-3 gap-6 font-sans">
              <div>
                <div className="font-display italic text-[2.2rem] leading-none text-indigo"
                  style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}>
                  10+
                </div>
                <div className="mt-2 font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-indigo/55">
                  Years shaping
                </div>
              </div>
              <div>
                <div className="font-display italic text-[2.2rem] leading-none text-indigo"
                  style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}>
                  3wk+
                </div>
                <div className="mt-2 font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-indigo/55">
                  Gel wear time
                </div>
              </div>
              <div>
                <div className="font-display italic text-[2.2rem] leading-none text-indigo"
                  style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 144, 'WONK' 1" }}>
                  1:1
                </div>
                <div className="mt-2 font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-indigo/55">
                  You &amp; Chelsea
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* soft background petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 w-[560px] h-[560px] opacity-[0.08] text-indigo animate-drift"
      >
        <img src="/assets/botanical.svg" alt="" className="w-full h-full" />
      </div>
    </section>
  );
}
