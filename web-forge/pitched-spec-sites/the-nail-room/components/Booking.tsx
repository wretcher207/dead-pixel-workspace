import { site } from "@/lib/content";
import { Mark } from "./Mark";

export function Booking() {
  return (
    <section
      id="booking"
      className="relative py-section-lg bg-ink text-porcelain overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 50% at 20% 10%, rgba(169,194,216,0.35), transparent 65%), radial-gradient(ellipse 55% 45% at 90% 90%, rgba(169,194,216,0.22), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: "url('/assets/grain.svg')",
          backgroundSize: "220px",
        }}
        aria-hidden="true"
      />

      {/* oversized watermark botanical */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -bottom-40 w-[760px] h-[760px] opacity-[0.06] text-porcelain"
      >
        <img src="/assets/botanical.svg" alt="" className="w-full h-full" />
      </div>

      <div id="visit" className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 text-center">
        <div className="divider-dot mb-12 text-porcelain/35 max-w-[380px] mx-auto">
          <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase">
            Chapter VI &nbsp;·&nbsp; Visit
          </span>
        </div>

        <h2
          className="font-display text-porcelain tracking-tightest-3 mx-auto max-w-[14ch]"
          style={{
            fontSize: "clamp(3rem, 7vw, 7.5rem)",
            lineHeight: "0.92",
            fontVariationSettings: "'SOFT' 100, 'opsz' 144",
          }}
        >
          Come be
          <br />
          <span
            className="italic text-mist"
            style={{
              fontVariationSettings:
                "'SOFT' 100, 'opsz' 144, 'WONK' 1",
            }}
          >
            fussed&nbsp;over.
          </span>
        </h2>

        <p className="mt-10 max-w-[540px] mx-auto text-porcelain/70 leading-[1.8] text-[1.02rem]">
          Booking is by appointment. Send a message, grab a time, and bring any
          references or color ideas you have in mind. First-time clients are
          warmly welcome.
        </p>

        <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center">
          <a
            href={site.phoneHref}
            className="btn btn-porcelain"
          >
            Call the studio
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <a href={site.emailHref} className="btn btn-ghost">
            Send a message
          </a>
        </div>

        {/* contact grid */}
        <div className="mt-24 pt-16 border-t border-porcelain/10 grid grid-cols-1 md:grid-cols-3 gap-10 text-left max-w-[960px] mx-auto">
          <div>
            <div className="font-eyebrow text-[0.6rem] tracking-widest3 uppercase text-mist-200 mb-3">
              Studio
            </div>
            <div className="font-display text-[1.35rem] text-porcelain tracking-tightest-2"
              style={{ fontVariationSettings: "'SOFT' 100, 'opsz' 24" }}>
              {site.address.line1}
            </div>
            <div className="text-porcelain/60 text-[0.92rem] mt-2">
              {site.address.line2}
              <br />
              {site.address.city}
            </div>
          </div>
          <div>
            <div className="font-eyebrow text-[0.6rem] tracking-widest3 uppercase text-mist-200 mb-3">
              Get in touch
            </div>
            <a
              href={site.phoneHref}
              className="block font-display text-[1.35rem] text-porcelain tracking-tightest-2 hover:text-mist"
              style={{
                fontVariationSettings: "'SOFT' 100, 'opsz' 24",
                transition: "color 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {site.phone}
            </a>
            <a
              href={site.emailHref}
              className="block text-porcelain/60 text-[0.92rem] mt-2 hover:text-mist"
              style={{ transition: "color 0.5s cubic-bezier(0.22,1,0.36,1)" }}
            >
              {site.email}
            </a>
          </div>
          <div>
            <div className="font-eyebrow text-[0.6rem] tracking-widest3 uppercase text-mist-200 mb-3">
              Hours
            </div>
            <div className="text-porcelain/80 text-[0.95rem] space-y-1">
              <div className="flex justify-between">
                <span>Tue – Fri</span>
                <span className="text-porcelain/55">10 – 6</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="text-porcelain/55">10 – 4</span>
              </div>
              <div className="flex justify-between">
                <span>Sun, Mon</span>
                <span className="text-porcelain/55">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-ink-900 text-porcelain/70 border-t border-porcelain/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        <Mark light />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-10 font-eyebrow text-[0.62rem] tracking-widest3 uppercase">
          <a
            href={site.instagramHref}
            className="hover:text-porcelain"
            style={{ transition: "color 0.5s cubic-bezier(0.22,1,0.36,1)" }}
          >
            Instagram
          </a>
          <a
            href={site.facebookHref}
            className="hover:text-porcelain"
            style={{ transition: "color 0.5s cubic-bezier(0.22,1,0.36,1)" }}
          >
            Facebook
          </a>
          <a
            href={site.emailHref}
            className="hover:text-porcelain"
            style={{ transition: "color 0.5s cubic-bezier(0.22,1,0.36,1)" }}
          >
            Email
          </a>
        </div>
      </div>
      <div className="border-t border-porcelain/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-eyebrow text-[0.58rem] tracking-widest3 uppercase text-porcelain/40">
          <span>© {new Date().getFullYear()} The Nail Room</span>
          <span>Site by Dead Pixel Design</span>
        </div>
      </div>
    </footer>
  );
}
