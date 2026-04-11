import { Reveal } from "./Reveal";

export function About() {
  return (
    <section
      id="about"
      className="relative py-section overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(199,155,114,0.12),transparent_55%)] blur-2xl" />
      </div>

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Section marker */}
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-16 md:mb-24">
          <div className="section-label">№ 02 · The Hand Behind the Work</div>
          <span className="text-[0.68rem] uppercase tracking-[0.28em] text-bone/40">
            Studio — Owner — Piercer
          </span>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Portrait column */}
          <div className="lg:col-span-5">
            <Reveal>
              <figure className="relative">
                {/* Frame */}
                <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden shadow-ink-lift">
                  <div className="absolute inset-0 ring-1 ring-rose/30 z-20 pointer-events-none" />
                  <div className="absolute inset-[6px] ring-1 ring-bone/8 z-20 pointer-events-none" />

                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(227,180,138,0.22),transparent_60%)] mix-blend-overlay z-10 pointer-events-none" />

                  <img
                    src="/assets/libby-portrait.jpg"
                    alt="Libby, owner and piercer at Thorn and Thimble Body Piercing in Bangor, Maine"
                    className="absolute inset-0 w-full h-full object-cover object-[50%_28%]"
                    loading="lazy"
                  />

                  {/* Caption plate */}
                  <div className="absolute left-0 right-0 bottom-0 z-20 p-6 flex items-end justify-between">
                    <div>
                      <div className="eyebrow text-rose-200/90 mb-1">Portrait</div>
                      <div className="font-display text-3xl text-bone tracking-[-0.02em]">
                        Libby
                      </div>
                    </div>
                    <span className="text-[0.6rem] uppercase tracking-[0.28em] text-bone/60 text-right">
                      Owner<br />Piercer
                    </span>
                  </div>
                </div>

                {/* Outside signature line */}
                <figcaption className="mt-6 flex items-center justify-between text-[0.7rem] uppercase tracking-[0.26em] text-bone/45">
                  <span>Downtown Bangor, Maine</span>
                  <span>Est. ME</span>
                </figcaption>
              </figure>
            </Reveal>

            {/* Credentials strip */}
            <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-5">
              <Credential title="APP-quality" detail="Only high-quality, implant-grade jewelry for every piercing. Upgrade to APP-approved pieces any time." />
              <Credential title="Welcoming" detail="Safe, seen, and in your own pace. Come as you are — there's no space for hate in here." />
            </Reveal>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                id="about-heading"
                className="font-display text-display-md md:text-display-lg text-bone tracking-tightest-3"
              >
                Hey there, <span className="display-italic text-rose-200">I'm Libby.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 md:mt-10 space-y-6 text-[1.02rem] md:text-[1.08rem] leading-[1.85] text-bone/80 max-w-[62ch]">
              <p>
                <span className="float-left font-display text-6xl md:text-7xl leading-[0.8] mr-3 mt-1 text-rose-200">
                  I
                </span>
                wanted to take a second to introduce myself and what I'm all about.
                I own Thorn &amp; Thimble Body Piercing. I'm a single mother of three — my youngest is disabled, and he continues to teach me patience, humility, and acceptance every day. I train MMA, and I'm an artist all the way through.
              </p>
              <p>
                My approach to piercing is built on staying current with the best practices taught by the industry's leaders. I use only high-quality jewelry for every piercing I do, and I offer APP-approved jewelry upgrades so you have access to the finest pieces available — right here in lil ol' Bangor, Maine.
              </p>
              <p>
                Through my own trauma recovery, I've become trauma-informed, and I do everything I can to make sure you feel safe, seen, and comfortable. I want you to feel confident that your bodily autonomy is respected at all times. I also want you to feel safe to be silly, weird, and your authentic self — because that's how I am, and that's what you can expect from me.
              </p>
              <p>
                No matter what's happening in the world outside, I welcome and cherish every loving person who walks into the studio. There is no space for hate in here. I will <em className="display-italic text-rose-200/90 not-italic">always</em> respect pronouns, gender affirmation, and the queerest of queer.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex items-center gap-5">
              <span className="font-display italic text-2xl md:text-3xl text-rose-200">
                Love and light,
              </span>
              <span className="font-display text-2xl md:text-3xl text-bone tracking-[-0.01em]">
                Libby
              </span>
            </Reveal>

            {/* Pull quote */}
            <Reveal delay={0.28} className="mt-14 md:mt-16 pl-6 md:pl-10 border-l border-rose/30 max-w-[52ch]">
              <p className="font-display text-2xl md:text-3xl leading-[1.25] text-bone tracking-[-0.015em]">
                <span className="display-italic text-rose-200">"Safe, seen,</span> and confident that your bodily autonomy is respected at all times."
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Credential({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="p-5 rounded-[2px] bg-ink-800/60 border border-bone/10 backdrop-blur">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-200" />
        <span className="eyebrow text-rose-200/90">{title}</span>
      </div>
      <p className="text-[0.82rem] leading-[1.65] text-bone/70">{detail}</p>
    </div>
  );
}
