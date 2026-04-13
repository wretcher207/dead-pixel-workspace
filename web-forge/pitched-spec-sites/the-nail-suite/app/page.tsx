import Nav from "@/components/Nav";

const BOOKING_URL = "https://thenailsuite.square.site";
const PHONE = "(207) 355-1963";
const PHONE_TEL = "2073551963";
const EMAIL = "larissabell30@gmail.com";
const ADDRESS_LINE = "16 Church Street, Suite 207";
const ADDRESS_CITY = "Dexter, ME 04930";
const GMAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=16+Church+Street+Suite+207+Dexter+ME+04930";
const AMAPS_URL =
  "https://maps.apple.com/?address=16%20Church%20Street%20Suite%20207,%20Dexter,%20ME%2004930";

const services = [
  {
    name: "Gel Extensions",
    tagline: "Soft & hard gel",
    body:
      "Soft or hard gel, sculpted directly onto your own nail. Three to four weeks before you need a fill. Bring a reference photo or let Larissa pick the shape and finish.",
    duration: "Approx. 2 hrs",
  },
  {
    name: "Manicures",
    tagline: "Classic or gel",
    body:
      "Cuticles, shape, and polish. Gel if you need it to hold for two or three weeks. Classic lacquer if you want something quick and clean.",
    duration: "Approx. 45 min",
  },
  {
    name: "Pedicures",
    tagline: "Soak, shape, polish",
    body:
      "Warm soak, shaping, callus work, and polish. Done in the white recliner by the window.",
    duration: "Approx. 1 hr",
  },
  {
    name: "Teeth Whitening",
    tagline: "In-studio session",
    body:
      "A twenty-minute in-studio session. Book it on its own or add it onto any other appointment.",
    duration: "Approx. 20 min",
  },
];

const gallery = [
  { src: "/assets/showcase-8.jpg", alt: "French manicure on short nails", span: "tall" },
  { src: "/assets/showcase-1.jpg", alt: "Gold-rim French tip gel extensions" },
  { src: "/assets/showcase-5.jpg", alt: "Lavender ombré with crystal accents" },
  { src: "/assets/showcase-3.jpg", alt: "Custom gel set" },
  { src: "/assets/showcase-10.jpg", alt: "Detailed nail work" },
  { src: "/assets/showcase-6.jpg", alt: "Custom gel set" },
  { src: "/assets/showcase-12.jpg", alt: "Styled gel manicure", span: "wide" },
  { src: "/assets/showcase-9.jpg", alt: "Gel set close-up" },
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen">
      <Nav />

      {/* ───────── HERO ───────── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <div className="hero-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/assets/interior3.jpg"
            aria-hidden="true"
          >
            <source src="/assets/studio-loop.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 mx-auto flex max-w-shell flex-col px-6 md:px-10 pt-40 md:pt-48 pb-24 md:pb-32 min-h-[100svh]">
          <div className="mt-auto max-w-3xl" data-reveal>
            <div className="mb-8 inline-flex items-center gap-3 text-ivory-soft/95 shadow-hero-soft">
              <span className="h-[1px] w-10 bg-gold-light" />
              <span className="font-sans text-[0.72rem] uppercase tracking-eyebrow font-medium">
                Dexter, Maine · By appointment
              </span>
            </div>

            <h1 className="display text-ivory-soft text-[2.85rem] sm:text-[3.6rem] md:text-[4.6rem] lg:text-[5.4rem] max-w-[14ch] shadow-hero">
              A small boutique
              <br />
              <em className="text-gold-glow">for nails done well.</em>
            </h1>

            <p className="mt-8 max-w-xl font-sans text-[1.02rem] md:text-[1.08rem] leading-[1.75] text-ivory-soft/95 shadow-hero-soft">
              The Nail Suite is a two-chair studio on Church Street in Dexter. Gel extensions,
              manicures, pedicures, and teeth whitening. One client in the chair at a time,
              by appointment only.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary bg-ivory-soft text-ink border-ivory-soft hover:bg-gold-deep hover:text-ivory-soft hover:border-gold-deep"
              >
                Book an Appointment
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#services" className="btn-ghost">View Services</a>
            </div>
          </div>

          <div className="mt-16 md:mt-20 flex flex-wrap items-end justify-between gap-6 text-ivory-soft/85 shadow-hero-soft">
            <div className="flex items-center gap-3 font-sans text-[0.72rem] uppercase tracking-eyebrow">
              <span className="h-[1px] w-8 bg-ivory-soft/70" />
              Larissa Bell · Owner &amp; Nail Artist
            </div>
            <div className="flex items-center gap-5 font-sans text-[0.78rem] tracking-[0.12em]">
              <a href={`tel:+1${PHONE_TEL}`} className="link-gold">{PHONE}</a>
              <span className="h-3 w-px bg-ivory-soft/40" />
              <span>16 Church St · Suite 207</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── INTRO / POSITIONING ───────── */}
      <section className="relative bg-ivory">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1" data-reveal>
              <div className="relative">
                <div className="corner-gold tl" />
                <div className="corner-gold br" />
                <div className="img-card aspect-[4/5]">
                  <img
                    src="/assets/interior3.jpg"
                    alt="Marble-topped manicure table with gold lamp inside The Nail Suite"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2" data-reveal>
              <div className="eyebrow-rule mb-7">The idea</div>
              <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.2rem] leading-[1.05] max-w-[16ch]">
                Small room. <em>Full attention.</em>
              </h2>
              <div className="mt-8 space-y-5 font-sans text-[1.02rem] leading-[1.78] text-ink-soft max-w-xl">
                <p>
                  Two stations. One client booked at a time. No overlapping appointments,
                  no second chair going while yours is drying, no shouted conversations
                  across a room of twelve.
                </p>
                <p>
                  You get the whole appointment, not the last ten minutes of someone
                  else's. Larissa runs the studio by herself and takes one set at a time.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  { k: "Two", v: "stations" },
                  { k: "One", v: "at a time" },
                  { k: "By", v: "appointment" },
                ].map((m) => (
                  <div key={m.k} className="border-t border-line pt-4">
                    <div className="font-display text-[1.65rem] text-gold-deep leading-none">{m.k}</div>
                    <div className="mt-1 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-ink-soft">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section id="services" className="relative bg-ivory-warm">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-40">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 md:mb-20" data-reveal>
            <div className="max-w-2xl">
              <div className="eyebrow-rule mb-6">What we do</div>
              <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.2rem] leading-[1.05] max-w-[18ch]">
                Four things, <em>done right.</em>
              </h2>
            </div>
            <p className="max-w-md font-sans text-[1rem] leading-[1.78] text-ink-soft">
              Every service is priced on the Square site. Durations below are
              estimates. Detailed or layered work can run longer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((s, i) => (
              <article
                key={s.name}
                data-reveal
                className="group relative bg-ivory-soft border border-line rounded-sm p-8 md:p-10 shadow-card overflow-hidden"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="absolute top-0 right-0 h-24 w-24 border-t border-r border-gold/40 pointer-events-none" />
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display italic text-[0.95rem] text-gold-deep">
                    0{i + 1}
                  </span>
                  <span className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft">
                    {s.duration}
                  </span>
                </div>

                <h3 className="display text-[2rem] md:text-[2.3rem] mt-6 leading-[1.05]">
                  {s.name}
                </h3>
                <div className="mt-2 font-display italic text-gold-deep text-[1.05rem]">
                  {s.tagline}
                </div>

                <p className="mt-6 font-sans text-[0.98rem] leading-[1.78] text-ink-soft max-w-md">
                  {s.body}
                </p>

                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-sans text-[0.72rem] uppercase tracking-[0.22em] font-medium text-ink link-gold"
                >
                  Book this
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h11M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CRAFT / GALLERY ───────── */}
      <section className="relative bg-ivory">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-40">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20" data-reveal>
            <div className="max-w-2xl">
              <div className="eyebrow-rule mb-6">Recent work</div>
              <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.2rem] leading-[1.05] max-w-[20ch]">
                A few sets <em>from the chair.</em>
              </h2>
            </div>
            <p className="max-w-sm font-sans text-[0.98rem] leading-[1.78] text-ink-soft">
              Classic French, gold-rim tips, soft ombré, natural gel. Bring a reference
              photo or describe what you want. She builds to your ask, not a trend feed.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {gallery.map((g, i) => (
              <div
                key={g.src}
                data-reveal
                className={`img-card ${
                  g.span === "tall"
                    ? "row-span-2 aspect-[3/5]"
                    : g.span === "wide"
                    ? "col-span-2 aspect-[16/10]"
                    : "aspect-square"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── ABOUT ───────── */}
      <section id="about" className="relative bg-ivory-warm">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7" data-reveal>
              <div className="eyebrow-rule mb-7">Meet the owner</div>
              <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.4rem] leading-[1.03] max-w-[14ch]">
                Run by <em>Larissa.</em>
              </h2>

              <div className="mt-8 space-y-5 font-sans text-[1.02rem] leading-[1.78] text-ink-soft max-w-xl">
                <p>
                  Larissa Bell opened The Nail Suite after working in bigger salons where
                  every chair was full and every appointment was a time slot to get through.
                  She trained in gel extensions, books one client at a time, and runs the
                  whole studio herself.
                </p>
                <p>
                  When you're in her chair, you're the only appointment on the schedule.
                  No double-booking, no handing you off to a finisher, no spending half the
                  session talking over you to the next client who just walked in.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-7 max-w-xl">
                <div>
                  <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft">
                    Trained in
                  </div>
                  <div className="font-display italic text-[1.15rem] text-ink mt-1">
                    Soft &amp; hard gel
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft">
                    Works from
                  </div>
                  <div className="font-display italic text-[1.15rem] text-ink mt-1">
                    Suite 207, Dexter
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-ink-soft">
                    Books through
                  </div>
                  <div className="font-display italic text-[1.15rem] text-ink mt-1">
                    Square
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" data-reveal>
              <div className="relative">
                <div className="corner-gold tr" />
                <div className="corner-gold bl" />
                <div className="img-card aspect-[4/5]">
                  <img
                    src="/assets/interior2.jpg"
                    alt="Pedicure recliner inside The Nail Suite"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── THE SUITE (space) ───────── */}
      <section id="suite" className="relative bg-ivory">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-40">
          <div className="max-w-2xl mb-14" data-reveal>
            <div className="eyebrow-rule mb-6">The space</div>
            <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.2rem] leading-[1.05] max-w-[18ch]">
              A suite, <em>not a showroom.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            <div className="md:col-span-7 img-card aspect-[16/11]" data-reveal>
              <img
                src="/assets/interior.jpg"
                alt="Crystal shelf inside The Nail Suite"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:col-span-5 flex flex-col gap-6" data-reveal>
              <div className="img-card aspect-[4/3]">
                <img
                  src="/assets/exterior.jpg"
                  alt="Vintage scroll sign outside Suite 207 reading The Nail Suite"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-ivory-warm border border-line rounded-sm p-7 md:p-8">
                <p className="font-display italic text-[1.25rem] leading-[1.5] text-ink">
                  &ldquo;Soft gray walls. Warm wood floors. A marble-topped work table. A
                  shelf of crystals across the room, and a <span className="text-gold-deep">Treat Yo Self</span> sign
                  on the wall that tells you pretty clearly what the place is for.&rdquo;
                </p>
                <div className="mt-5 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-ink-soft">
                  — Walking in the first time
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            <div className="md:col-span-5 img-card aspect-[4/3]" data-reveal>
              <img
                src="/assets/showcase-11.jpg"
                alt="Detailed manicure work"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="md:col-span-7 img-card aspect-[16/10]" data-reveal>
              <img
                src="/assets/showcase-4.jpg"
                alt="Finished gel set"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="relative bg-ivory-warm border-y border-line">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-24 md:py-32">
          <div className="max-w-2xl mb-14" data-reveal>
            <div className="eyebrow-rule mb-6">Kind words</div>
            <h2 className="display text-[2.3rem] sm:text-[2.6rem] md:text-[3rem] leading-[1.05]">
              What regulars <em>say.</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <figure className="relative bg-ivory-soft border border-line rounded-sm p-8 md:p-10 shadow-card" data-reveal>
              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true" className="text-gold mb-6">
                <path d="M0 28V17.5c0-4.3.93-8 2.8-11.1C4.67 3.2 7.6 1 11.6 0l2 3.8c-2.7.67-4.77 2.03-6.2 4.1-1.4 2.03-2.1 4.47-2.1 7.3h5.7V28H0zm20 0V17.5c0-4.3.93-8 2.8-11.1C24.67 3.2 27.6 1 31.6 0l2 3.8c-2.7.67-4.77 2.03-6.2 4.1-1.4 2.03-2.1 4.47-2.1 7.3H31V28H20z" fill="currentColor" />
              </svg>
              <blockquote className="font-display italic text-[1.3rem] md:text-[1.45rem] leading-[1.55] text-ink">
                Larissa does nails better than anyone I&rsquo;ve been to. The room is actually
                peaceful, which after a long week is worth half the price on its own.
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <div className="h-[1px] w-10 bg-gold" />
                <div>
                  <div className="font-sans text-[0.86rem] text-ink">Emily R.</div>
                  <div className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft mt-0.5">Newport, ME</div>
                </div>
              </figcaption>
            </figure>

            <figure className="relative bg-ivory-soft border border-line rounded-sm p-8 md:p-10 shadow-card" data-reveal style={{ transitionDelay: "120ms" }}>
              <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true" className="text-gold mb-6">
                <path d="M0 28V17.5c0-4.3.93-8 2.8-11.1C4.67 3.2 7.6 1 11.6 0l2 3.8c-2.7.67-4.77 2.03-6.2 4.1-1.4 2.03-2.1 4.47-2.1 7.3h5.7V28H0zm20 0V17.5c0-4.3.93-8 2.8-11.1C24.67 3.2 27.6 1 31.6 0l2 3.8c-2.7.67-4.77 2.03-6.2 4.1-1.4 2.03-2.1 4.47-2.1 7.3H31V28H20z" fill="currentColor" />
              </svg>
              <blockquote className="font-display italic text-[1.3rem] md:text-[1.45rem] leading-[1.55] text-ink">
                I&rsquo;ve been getting my gel sets here for months. They last, they look
                exactly how I ask, and Larissa never rushes through the finish.
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4">
                <div className="h-[1px] w-10 bg-gold" />
                <div>
                  <div className="font-sans text-[0.86rem] text-ink">Sarah K.</div>
                  <div className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-ink-soft mt-0.5">Dover-Foxcroft, ME</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───────── BOOKING CTA ───────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <img
            src="/assets/showcase-2.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(0.42) saturate(0.7) contrast(1.05)" }}
          />
          {/* Vertical base darkening */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,12,8,0.78) 0%, rgba(15,12,8,0.55) 40%, rgba(15,12,8,0.85) 100%)",
            }}
          />
          {/* Left-weighted scrim for text column legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15,12,8,0.85) 0%, rgba(15,12,8,0.6) 40%, rgba(15,12,8,0.2) 70%, rgba(15,12,8,0.08) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-shell px-6 md:px-10 py-28 md:py-36">
          <div className="max-w-2xl" data-reveal>
            <div className="inline-flex items-center gap-3 text-gold-light shadow-hero-soft">
              <span className="h-[1px] w-10 bg-gold-light" />
              <span className="font-sans text-[0.72rem] uppercase tracking-eyebrow font-medium">
                Booking
              </span>
            </div>
            <h2 className="display text-ivory-soft text-[2.6rem] sm:text-[3rem] md:text-[3.8rem] leading-[1.02] mt-7 max-w-[16ch] shadow-hero">
              Reserve a chair <em className="text-gold-glow">at the Suite.</em>
            </h2>
            <p className="mt-7 max-w-xl font-sans text-[1.02rem] leading-[1.78] text-ivory-soft/95 shadow-hero-soft">
              Weekends fill up first. Grab a slot on the Square site or text the studio
              directly. Walk-ins are hit or miss, so texting before you drive over is
              the safer bet.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary bg-ivory-soft text-ink border-ivory-soft hover:bg-gold-deep hover:text-ivory-soft hover:border-gold-deep"
              >
                Book on Square
              </a>
              <a href={`sms:+1${PHONE_TEL}`} className="btn-ghost">
                Text {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VISIT ───────── */}
      <section id="visit" className="relative bg-ivory">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-28 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5" data-reveal>
              <div className="eyebrow-rule mb-6">Visit</div>
              <h2 className="display text-[2.3rem] sm:text-[2.7rem] md:text-[3.2rem] leading-[1.05]">
                Find the <em>Suite.</em>
              </h2>
              <p className="mt-6 max-w-md font-sans text-[1rem] leading-[1.78] text-ink-soft">
                16 Church Street in downtown Dexter, Suite 207. Look for the wrought-iron
                scroll sign next to the door.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={GMAPS_URL} target="_blank" rel="noreferrer" className="btn-outline">
                  Open in Google Maps
                </a>
                <a href={AMAPS_URL} target="_blank" rel="noreferrer" className="btn-outline">
                  Open in Apple Maps
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" data-reveal>
              <div className="bg-ivory-soft border border-line rounded-sm p-7">
                <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-deep">
                  Address
                </div>
                <div className="mt-3 font-display text-[1.25rem] leading-[1.4] text-ink">
                  {ADDRESS_LINE}
                  <br />
                  {ADDRESS_CITY}
                </div>
              </div>

              <div className="bg-ivory-soft border border-line rounded-sm p-7">
                <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-deep">
                  Hours
                </div>
                <div className="mt-3 font-display text-[1.15rem] leading-[1.55] text-ink">
                  By appointment
                  <br />
                  Tuesday through Saturday
                </div>
                <div className="mt-3 font-sans text-[0.82rem] text-ink-soft">
                  Book online or text to confirm same-day availability.
                </div>
              </div>

              <div className="bg-ivory-soft border border-line rounded-sm p-7">
                <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-deep">
                  Phone
                </div>
                <a
                  href={`tel:+1${PHONE_TEL}`}
                  className="mt-3 block font-display text-[1.25rem] text-ink link-gold w-fit"
                >
                  {PHONE}
                </a>
                <div className="mt-2 font-sans text-[0.82rem] text-ink-soft">
                  Text is best.
                </div>
              </div>

              <div className="bg-ivory-soft border border-line rounded-sm p-7">
                <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-deep">
                  Email
                </div>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-3 block font-display text-[1.15rem] text-ink link-gold w-fit break-all"
                >
                  {EMAIL}
                </a>
                <div className="mt-2 font-sans text-[0.82rem] text-ink-soft">
                  Best for longer questions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="relative bg-ink text-ivory-soft/80">
        <div className="mx-auto max-w-shell px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <div className="font-display text-[1.9rem] leading-none text-ivory-soft tracking-editorial">
                The Nail Suite
              </div>
              <div className="mt-2 font-sans text-[0.72rem] uppercase tracking-eyebrow text-gold-light">
                Dexter, Maine
              </div>
              <p className="mt-6 max-w-sm font-sans text-[0.92rem] leading-[1.75] text-ivory-soft/70">
                A two-chair nail studio on Church Street in Dexter. Gel extensions, manicures,
                pedicures, and teeth whitening. By appointment only.
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-light">
                Visit
              </div>
              <div className="mt-4 font-sans text-[0.92rem] leading-[1.75] text-ivory-soft/80">
                {ADDRESS_LINE}
                <br />
                {ADDRESS_CITY}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-light">
                Contact
              </div>
              <div className="mt-4 flex flex-col gap-1.5 font-sans text-[0.92rem]">
                <a href={`tel:+1${PHONE_TEL}`} className="link-gold text-ivory-soft/85 w-fit">
                  {PHONE}
                </a>
                <a href={`mailto:${EMAIL}`} className="link-gold text-ivory-soft/85 w-fit break-all">
                  {EMAIL}
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="font-sans text-[0.66rem] uppercase tracking-[0.22em] text-gold-light">
                Book
              </div>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-sans text-[0.86rem] text-ivory-soft link-gold"
              >
                Square site
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 9l6-6M4 3h5v5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-14 pt-7 border-t border-ivory-soft/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="font-sans text-[0.74rem] text-ivory-soft/55 tracking-[0.1em]">
              © {new Date().getFullYear()} The Nail Suite. All rights reserved.
            </div>
            <div className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-ivory-soft/55">
              Site by Dead Pixel Design
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
