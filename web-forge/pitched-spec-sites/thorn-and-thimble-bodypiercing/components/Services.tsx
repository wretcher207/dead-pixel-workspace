import { services } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="relative py-section overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-bone/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(199,155,114,0.08),transparent_55%),radial-gradient(circle_at_85%_20%,rgba(217,168,148,0.07),transparent_60%)]" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-14">
          <div>
            <div className="section-label mb-6">№ 03 · Services & Pricing</div>
            <h2
              id="services-heading"
              className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3 max-w-[14ch]"
            >
              A curated <span className="display-italic text-rose-200">menu,</span> held to one standard.
            </h2>
          </div>
          <p className="text-[0.95rem] leading-[1.75] text-bone/70 max-w-[40ch] md:text-right">
            Pricing reflects the initial piercing with implant-grade jewelry.
            Upgrades to APP-approved fine jewelry are always available at the time of your appointment.
          </p>
        </Reveal>

        {/* Services list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-0 mt-10">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={(i % 8) * 0.04}>
              <div className="group relative flex items-baseline justify-between gap-5 py-6 border-b border-bone/8 hover:border-rose/30 transition-colors duration-700">
                {/* Hover accent */}
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-px bg-rose-200 group-hover:w-8 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />

                <div className="flex items-baseline gap-5 min-w-0">
                  <span className="font-display italic text-[0.8rem] text-rose-200/70 translate-y-[-2px] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[1.55rem] md:text-[1.85rem] leading-[1.1] text-bone tracking-[-0.015em]">
                      {service.name}
                    </h3>
                    {service.note && (
                      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-bone/45 mt-1">
                        {service.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Dotted fill */}
                <span
                  aria-hidden
                  className="flex-1 mx-4 border-b border-dotted border-bone/15 translate-y-[-8px] hidden md:block"
                />

                <div className="flex flex-col items-end flex-none">
                  <span className="font-display text-[1.4rem] md:text-[1.55rem] text-rose-200 tracking-[-0.01em] tabular-nums">
                    {service.price}
                  </span>
                  <span className="text-[0.62rem] uppercase tracking-[0.24em] text-bone/45 mt-1">
                    Ages {service.age}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Minors policy callout */}
        <Reveal delay={0.2} className="mt-20">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-10 lg:p-12 rounded-[2px] bg-ink-800/60 border border-bone/10 backdrop-blur overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[380px] h-[380px] bg-[radial-gradient(circle,rgba(227,180,138,0.18),transparent_70%)] blur-2xl pointer-events-none" />

            <div className="lg:col-span-4 relative">
              <div className="eyebrow mb-3">Policy · Minors</div>
              <h3 className="font-display text-2xl md:text-3xl text-bone tracking-[-0.01em]">
                All minors must be accompanied by an <span className="display-italic text-rose-200">adult,</span> at all times.
              </h3>
            </div>
            <div className="lg:col-span-8 relative space-y-4 text-[0.92rem] leading-[1.75] text-bone/75">
              <p>
                For any service — new piercings, jewelry changes, or recovery work — a custodial caregiver must be present and nearby for the entire appointment.
              </p>
              <p>
                We require the minor's birth certificate showing both the minor's name and the caregiver's name. The name on the birth certificate must match the name on the caregiver's photo ID.
              </p>
              <p>
                In the case of a name change, please bring supporting documentation (usually a marriage license or divorce decree).
              </p>
              <p className="text-bone/55 text-[0.82rem] uppercase tracking-[0.18em] pt-3 border-t border-bone/10">
                Valid state or federally issued photo ID is required for every service.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
