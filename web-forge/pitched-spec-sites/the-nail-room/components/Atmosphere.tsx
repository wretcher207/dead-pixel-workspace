export function Atmosphere() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="relative min-h-[85vh] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(20,32,47,0.65) 0%, rgba(20,32,47,0.55) 50%, rgba(20,32,47,0.8) 100%), url('/assets/showcase/showcase-07.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* color wash */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 20% 80%, rgba(45,64,87,0.6), transparent 70%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(20,32,47,0.6), transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-50"
          style={{ background: "#a9c2d8" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-overlay"
          style={{
            backgroundImage: "url('/assets/grain.svg')",
            backgroundSize: "220px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 w-full py-section">
          <div className="max-w-[780px]">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-10 h-px bg-porcelain/60" aria-hidden="true" />
              <span className="font-eyebrow text-[0.65rem] tracking-widest3 uppercase text-porcelain/70">
                Chapter IV &nbsp;·&nbsp; The Room
              </span>
            </div>
            <h2
              className="font-display text-porcelain tracking-tightest-3"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 6rem)",
                lineHeight: "1",
                fontVariationSettings: "'SOFT' 100, 'opsz' 144",
              }}
            >
              The hour<br />
              <span
                className="italic"
                style={{
                  fontVariationSettings:
                    "'SOFT' 100, 'opsz' 144, 'WONK' 1",
                }}
              >
                is yours.
              </span>
            </h2>

            <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-[720px]">
              <div>
                <div className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-mist-200 mb-3">
                  Quiet by design
                </div>
                <p className="text-porcelain/75 leading-[1.75] text-[0.98rem]">
                  No phones ringing across the room. No small talk you didn't sign up
                  for. Bring a book, or bring the gossip, or bring nothing at all.
                </p>
              </div>
              <div>
                <div className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-mist-200 mb-3">
                  Clean, always
                </div>
                <p className="text-porcelain/75 leading-[1.75] text-[0.98rem]">
                  Fresh implements and single-use files every visit. The studio is
                  disinfected between every appointment. Because of course it is.
                </p>
              </div>
              <div>
                <div className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-mist-200 mb-3">
                  No rushing
                </div>
                <p className="text-porcelain/75 leading-[1.75] text-[0.98rem]">
                  Appointments are spaced so nothing feels hurried. If a set takes a
                  little longer, the next person isn't sitting in the lobby tapping
                  their foot.
                </p>
              </div>
              <div>
                <div className="font-eyebrow text-[0.62rem] tracking-widest3 uppercase text-mist-200 mb-3">
                  All hands welcome
                </div>
                <p className="text-porcelain/75 leading-[1.75] text-[0.98rem]">
                  Working hands, short nails, nail biters, first-timers, regulars of
                  fifteen years. Every nail deserves a good hour.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
