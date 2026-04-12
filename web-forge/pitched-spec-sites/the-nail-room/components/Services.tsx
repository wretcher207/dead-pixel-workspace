import { services } from "@/lib/content";

export function Services() {
  return (
    <section
      id="services"
      className="relative py-section bg-ink text-porcelain overflow-hidden"
    >
      {/* background texture */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 45% at 15% 0%, rgba(169,194,216,0.25), transparent 65%), radial-gradient(ellipse 55% 40% at 85% 100%, rgba(169,194,216,0.18), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.22] mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: "url('/assets/grain.svg')",
          backgroundSize: "220px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="divider-dot mb-20 text-porcelain/35">
          <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase">
            Chapter II &nbsp;·&nbsp; Services
          </span>
        </div>

        <div className="grid grid-cols-12 gap-y-16 gap-x-10">
          <div className="col-span-12 md:col-span-5 md:sticky md:top-32 md:self-start">
            <h2
              className="font-display text-porcelain tracking-tightest-3"
              style={{
                fontSize: "clamp(2.8rem, 5.6vw, 5.4rem)",
                lineHeight: "1",
                fontVariationSettings: "'SOFT' 100, 'opsz' 144",
              }}
            >
              A short,<br />
              <span
                className="italic text-mist"
                style={{
                  fontVariationSettings:
                    "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                }}
              >
                honest&nbsp;menu.
              </span>
            </h2>
            <p className="mt-8 max-w-[420px] text-porcelain/65 leading-[1.75]">
              Everything on offer, plainly priced. Custom nail art is quoted at the
              table once we've talked through what you want. First visit? Book the
              Classic Gel Manicure and we'll go from there.
            </p>
            <a href="#booking" className="btn-link-light mt-10 inline-flex">
              Reserve a seat
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>

          <div className="col-span-12 md:col-span-7 space-y-16">
            {services.map((group) => (
              <div key={group.group}>
                <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-porcelain/15">
                  <h3
                    className="font-display italic text-[1.9rem] md:text-[2.3rem] text-mist tracking-tightest-2"
                    style={{
                      fontVariationSettings:
                        "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                    }}
                  >
                    {group.group}
                  </h3>
                  <span className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-porcelain/40">
                    {String(services.indexOf(group) + 1).padStart(2, "0")}
                  </span>
                </div>

                <ul className="divide-y divide-porcelain/10">
                  {group.items.map((item) => (
                    <li key={item.name} className="group py-7">
                      <div className="flex items-baseline gap-4 mb-2">
                        <div className="font-display text-[1.15rem] md:text-[1.35rem] text-porcelain tracking-tightest-2 flex-shrink-0"
                          style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 24" }}>
                          {item.name}
                        </div>
                        <div className="flex-1 border-b border-dotted border-porcelain/20 translate-y-[-3px]" aria-hidden="true" />
                        <div className="font-display text-mist text-[1.15rem] md:text-[1.35rem] whitespace-nowrap tracking-tightest-2 flex-shrink-0"
                          style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 24" }}>
                          {item.price}
                        </div>
                      </div>
                      <div className="text-[0.88rem] md:text-[0.92rem] text-porcelain/55 leading-[1.7] max-w-[520px]">
                        {item.note}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* foot note */}
        <div className="mt-24 pt-10 border-t border-porcelain/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-porcelain/45 font-eyebrow text-[0.62rem] tracking-widest3 uppercase">
          <span>Prices in USD · Gratuity appreciated, not expected</span>
          <span>Cancellations 24h in advance, please</span>
        </div>
      </div>
    </section>
  );
}
