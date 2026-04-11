import { hours, studio } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section
      id="visit"
      className="relative py-section overflow-hidden"
      aria-labelledby="visit-heading"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(227,180,138,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(199,155,114,0.09),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Headline */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div className="max-w-[60ch]">
            <div className="section-label mb-6">№ 07 · Visit The Studio</div>
            <h2
              id="visit-heading"
              className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3"
            >
              Come see us in <span className="display-italic text-rose-200">downtown</span> Bangor.
            </h2>
          </div>
          <p className="text-[0.95rem] leading-[1.75] text-bone/70 max-w-[40ch] md:text-right">
            Walk-ins welcome during open hours when the schedule allows. For VCH and longer sessions, book ahead by text.
          </p>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Hours card — tall */}
          <Reveal className="lg:col-span-5 lg:row-span-2">
            <div className="relative h-full p-8 md:p-10 rounded-[2px] bg-gradient-to-b from-ink-800/90 to-ink-900/90 border border-bone/10 backdrop-blur overflow-hidden">
              <div className="absolute -top-20 -right-20 w-[320px] h-[320px] bg-[radial-gradient(circle,rgba(227,180,138,0.2),transparent_70%)] blur-2xl pointer-events-none" />

              <div className="relative">
                <div className="eyebrow mb-4">Hours</div>
                <h3 className="font-display text-3xl md:text-4xl text-bone tracking-[-0.015em] mb-8">
                  Open this week
                </h3>

                <ul className="divide-y divide-bone/8">
                  {hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className={`font-display text-[1.15rem] tracking-[-0.01em] ${h.closed ? "text-bone/35" : "text-bone"}`}>
                        {h.day}
                      </span>
                      <span className={`text-[0.88rem] tabular-nums ${h.closed ? "text-bone/35" : "text-rose-200"}`}>
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-bone/10 text-[0.8rem] leading-[1.6] text-bone/60">
                  All appointments require valid photo ID. For VCH and extended sessions, please text ahead.
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact methods */}
          <Reveal className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 h-full">
              <ContactCard
                label="Text"
                title={studio.phone}
                href={studio.phoneHref}
                note="Text only — phone stays silent during appointments."
                icon={<PhoneIcon />}
              />
              <ContactCard
                label="Email"
                title="Message Libby"
                href={`mailto:${studio.email}`}
                note={studio.email}
                icon={<MailIcon />}
              />
              <ContactCard
                label="Address"
                title="40 Main Street"
                href="https://maps.google.com/?q=40+Main+Street+Bangor+ME+04401"
                note="Bangor, Maine · 04401"
                icon={<PinIcon />}
              />
              <ContactCard
                label="Social"
                title="Facebook"
                href={studio.facebook}
                note="Thorn & Thimble Body Piercing"
                icon={<MessengerIcon />}
              />
            </div>
          </Reveal>

          {/* Map / Find us */}
          <Reveal className="lg:col-span-7 lg:col-start-6">
            <div className="relative p-8 md:p-10 rounded-[2px] bg-ink-800/60 border border-bone/10 backdrop-blur overflow-hidden">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#e3b48a" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M0 110 L120 100 L200 130 L280 110 L400 125" stroke="#e3b48a" strokeWidth="1.2" fill="none" />
                  <path d="M0 60 L100 65 L220 55 L320 70 L400 50" stroke="#e3b48a" strokeWidth="0.8" fill="none" />
                  <circle cx="200" cy="100" r="6" fill="#e3b48a" />
                  <circle cx="200" cy="100" r="14" fill="none" stroke="#e3b48a" strokeWidth="0.8" />
                </svg>
              </div>

              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="max-w-[36ch]">
                  <div className="eyebrow mb-3">Find Us</div>
                  <h3 className="font-display text-2xl md:text-3xl text-bone tracking-[-0.015em] mb-3">
                    40 Main Street, <span className="display-italic text-rose-200">Bangor, ME.</span>
                  </h3>
                  <p className="text-[0.88rem] leading-[1.7] text-bone/65">
                    Right on Main Street in the heart of downtown Bangor. Street parking available.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://maps.google.com/?q=40+Main+Street+Bangor+ME+04401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-rose/40 text-[0.7rem] uppercase tracking-[0.26em] text-rose-100 hover:bg-rose/10 transition-colors duration-500"
                  >
                    <span>Google Maps</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href="https://maps.apple.com/?q=40+Main+Street+Bangor+ME+04401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-bone/15 text-[0.7rem] uppercase tracking-[0.26em] text-bone/80 hover:border-rose/40 hover:text-rose-100 transition-colors duration-500"
                  >
                    <span>Apple Maps</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Final CTA */}
        <Reveal delay={0.15} className="mt-16 md:mt-24">
          <div className="relative text-center py-14 md:py-20 px-6 rounded-[2px] border border-rose/25 bg-[radial-gradient(circle_at_50%_0%,rgba(227,180,138,0.18),transparent_70%)] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose/60 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-rose/40 to-transparent" />
            <div className="eyebrow mb-5">Ready when you are</div>
            <h3 className="font-display text-4xl md:text-6xl text-bone tracking-tightest-3 max-w-[18ch] mx-auto">
              Come get <span className="display-italic text-rose-200">adorned.</span>
            </h3>
            <p className="mt-5 text-[0.98rem] text-bone/70 max-w-[46ch] mx-auto leading-[1.75]">
              Text Libby to start the conversation. Bring an idea, a reference, or just yourself — she'll take it from there.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-5">
              <a href={studio.phoneHref} className="btn-primary group">
                <span>Text (207) 370-9312</span>
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" className="group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <path d="M0 5H18M18 5L14 1M18 5L14 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href={studio.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Message on Facebook
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactCard({
  label,
  title,
  note,
  href,
  icon,
}: {
  label: string;
  title: string;
  note: string;
  href: string;
  icon: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative flex flex-col justify-between h-full p-7 md:p-8 rounded-[2px] bg-ink-800/50 border border-bone/10 hover:border-rose/40 backdrop-blur overflow-hidden transition-colors duration-700 min-h-[170px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(227,180,138,0.12),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative flex items-start justify-between mb-6">
        <span className="eyebrow">{label}</span>
        <span className="w-10 h-10 rounded-full border border-bone/15 flex items-center justify-center text-rose-200/80 group-hover:border-rose/50 group-hover:rotate-[-6deg] transition-[transform,border-color] duration-500">
          {icon}
        </span>
      </div>

      <div className="relative">
        <div className="font-display text-[1.35rem] md:text-[1.55rem] text-bone tracking-[-0.015em] mb-1">
          {title}
        </div>
        <div className="text-[0.78rem] leading-[1.5] text-bone/55">{note}</div>
      </div>

      <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="text-rose-200" />
        </svg>
      </div>
    </a>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.3 9.6v1.7a1.1 1.1 0 01-1.24 1.1 11 11 0 01-4.8-1.7 10.84 10.84 0 01-3.34-3.34 11 11 0 01-1.7-4.83 1.1 1.1 0 011.1-1.23h1.7a1.1 1.1 0 011.1.95 7.1 7.1 0 00.4 1.56 1.1 1.1 0 01-.25 1.16L4.56 5.7a8.7 8.7 0 003.74 3.74l.72-.72a1.1 1.1 0 011.16-.25 7.1 7.1 0 001.56.4 1.1 1.1 0 01.95 1.12z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="2.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 3.5L7 8l5.5-4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 13s5-4.3 5-8a5 5 0 00-10 0c0 3.7 5 8 5 8z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <circle cx="7" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}
function MessengerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1C3.7 1 1 3.5 1 6.6c0 1.8.9 3.4 2.3 4.5v2.2l2.1-1.2c.5.1 1.1.2 1.6.2 3.3 0 6-2.5 6-5.7C13 3.5 10.3 1 7 1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M3.5 7.5l2.2-2.2L7.5 7 10 5l-2.2 2.5L6 6l-2.5 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}
