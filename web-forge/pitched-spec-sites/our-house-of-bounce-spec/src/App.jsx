import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Building2,
  MessageCircle,
  Menu,
  Phone,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import CandyButton from './components/CandyButton';
import EventCard from './components/EventCard';
import RentalCard from './components/RentalCard';
import SectionHeading from './components/SectionHeading';
import {
  business,
  eventItems,
  marqueeItems,
  navigationLinks,
  rentalItems,
} from './data/siteData';

function SquiggleDivider({ flip = false }) {
  return (
    <svg
      className={`mx-auto h-6 w-full max-w-5xl text-[var(--secondary)] ${flip ? '-scale-y-100' : ''}`}
      viewBox="0 0 1200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 30C57.143 30 57.143 8 114.286 8C171.429 8 171.429 52 228.571 52C285.714 52 285.714 16 342.857 16C400 16 400 44 457.143 44C514.286 44 514.286 10 571.429 10C628.571 10 628.571 50 685.714 50C742.857 50 742.857 18 800 18C857.143 18 857.143 46 914.286 46C971.429 46 971.429 12 1028.57 12C1085.71 12 1085.71 30 1142.86 30H1200"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DecorativeConfetti() {
  return (
    <>
      <span className="confetti-shape triangle left-[4%] top-12" />
      <span className="confetti-shape circle left-[10%] top-[68%]" />
      <span className="confetti-shape square right-[8%] top-24" />
      <span className="confetti-shape triangle right-[12%] bottom-8" />
      <span className="confetti-shape circle right-[24%] top-[56%]" />
    </>
  );
}

function BusinessHighlights() {
  const highlights = [
    {
      title: 'Birthday Parties',
      text: "Make their big day feel big without making the booking process a headache.",
      Icon: Sparkles,
    },
    {
      title: 'Community Events',
      text: 'School field days, church fairs, and neighborhood events that need simple crowd-friendly fun.',
      Icon: Users,
    },
    {
      title: 'Corporate Fun',
      text: 'Company picnics and appreciation days that need something kids and families actually get excited about.',
      Icon: Building2,
    },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3" data-reveal>
      {highlights.map(({ title, text, Icon }, index) => (
        <div
          key={title}
          className="rounded-[28px] border-2 border-[var(--accent-shadow)] bg-white p-5 shadow-[8px_8px_0_0_var(--border)]"
          style={{ transform: index === 1 ? 'rotate(-1deg)' : 'rotate(0deg)' }}
        >
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--accent-shadow)] bg-[var(--tertiary)] text-[var(--foreground)]">
            <Icon className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <h3 className="mt-4 font-heading text-xl font-extrabold">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{text}</p>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navRaised, setNavRaised] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setNavRaised(window.scrollY > 16);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element, index) => {
      element.style.setProperty('--delay', `${index * 70}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 border-b border-transparent transition-all duration-300 ${
          navRaised
            ? 'bg-[color:rgba(255,253,245,0.94)] shadow-[0_8px_24px_rgba(27,58,92,0.08)] backdrop-blur'
            : 'bg-[var(--background)]'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex items-center gap-3">
            <img
              src={business.logo}
              alt="Our House of Bounce logo"
              className="h-14 w-14 rounded-full border-2 border-[var(--accent-shadow)] bg-white object-cover"
            />
            <div>
              <p className="font-heading text-lg font-extrabold leading-none">
                {business.name}
              </p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Bounce house rentals in Maine
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--secondary)]"
              >
                {link.label}
              </a>
            ))}
            <CandyButton href={business.phoneHref} className="px-5 py-2.5 text-sm">
              Call to Book
            </CandyButton>
          </nav>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-[var(--accent-shadow)] bg-white md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] bg-[color:rgba(27,58,92,0.45)] px-4 py-6 md:hidden">
          <div className="mobile-menu-panel mx-auto flex h-full max-w-md flex-col rounded-[32px] border-2 border-[var(--accent-shadow)] bg-[var(--background)] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={business.logo}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 border-[var(--accent-shadow)] object-cover"
                />
                <span className="font-heading text-lg font-extrabold">{business.name}</span>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[var(--accent-shadow)] bg-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            <nav className="mt-10 flex flex-1 flex-col gap-4" aria-label="Mobile">
              {navigationLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-[24px] border-2 border-[var(--accent-shadow)] bg-white px-5 py-4 font-heading text-2xl font-extrabold"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <CandyButton href={business.phoneHref} onClick={() => setMenuOpen(false)}>
              Call Now to Book
            </CandyButton>
          </div>
        </div>
      ) : null}

      <main id="main-content">
        <section
          id="hero"
          className="relative overflow-hidden px-4 pb-24 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-18"
        >
          <DecorativeConfetti />
          <div className="hero-circle" aria-hidden="true" />
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10">
              <p
                className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent-shadow)] bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)]"
                data-reveal
              >
                <Sparkles className="h-4 w-4 text-[var(--secondary)]" strokeWidth={2.5} />
                Affordable fun for birthdays and community events
              </p>

              <h1
                className="mt-6 max-w-2xl text-balance font-heading text-5xl font-extrabold leading-none text-[var(--foreground)] sm:text-6xl lg:text-7xl"
                data-reveal
              >
                Bounce Into the Fun!
              </h1>

              <p
                className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted-foreground)] sm:text-xl"
                data-reveal
              >
                Affordable bounce house rentals for birthdays, parties, and community events across Maine.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row" data-reveal>
                <CandyButton
                  href="#rentals"
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
                >
                  View Rentals
                </CandyButton>
                <CandyButton href={business.phoneHref} variant="secondary">
                  Call to Book
                </CandyButton>
              </div>

              <BusinessHighlights />
            </div>

            <div className="relative z-10" data-reveal>
              <div className="dot-grid absolute -right-4 -top-8 h-48 w-48 rounded-[32px]" aria-hidden="true" />
              <div className="hero-image-frame relative ml-auto max-w-[560px] overflow-hidden border-2 border-[var(--accent-shadow)] bg-white p-3 shadow-[10px_10px_0_0_var(--accent-shadow)]">
                <img
                  src={business.heroImage}
                  alt={business.heroAlt}
                  className="hero-blob h-[420px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SquiggleDivider />
          </div>
        </section>

        <section id="about" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div className="dot-grid absolute inset-x-0 top-8 h-40 opacity-60" aria-hidden="true" />
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="About"
              title="Built for the moments kids talk about for years."
              body="We started Our House of Bounce because every family should be able to celebrate their kids without the stress and extra cost."
            />

            <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="sticker-card max-w-3xl p-8 sm:p-10" data-reveal>
                <p className="text-xl leading-9 text-[var(--foreground)] sm:text-2xl">
                  We started Our House of Bounce because we believe every family should be able to celebrate their kids without the stress and extra cost. At the end of the day, kids don&apos;t remember how much you spent. They remember the fun. We&apos;re here to help you make those memories. They&apos;re only kids just once.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2" data-reveal>
                {business.aboutImages.map((image, index) => (
                  <div
                    key={image.alt}
                    className={`overflow-hidden border-2 border-[var(--accent-shadow)] bg-white p-3 shadow-[8px_8px_0_0_var(--border)] ${
                      index === 0 ? 'rounded-[38px_38px_38px_12px]' : 'rounded-[18px_42px_18px_42px]'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full min-h-72 w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="marquee-shell mt-14" data-reveal>
              <div className="marquee-track">
                {[...marqueeItems, ...marqueeItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="marquee-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SquiggleDivider flip />
          </div>
        </section>

        <section id="rentals" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Rentals"
              title="Our Rentals"
              body="From birthday staples to big statement slides, these are the units families and event planners book most."
            />

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {rentalItems.map((rental, index) => (
                <RentalCard key={rental.name} rental={rental} index={index} />
              ))}
            </div>

            <div className="mt-16 text-center" data-reveal>
              <p className="font-heading text-3xl font-extrabold text-[var(--foreground)]">
                Book Early! Dates Fill Fast!
              </p>
              <div className="mt-6 flex justify-center">
                <CandyButton
                  href={business.phoneHref}
                  icon={<Phone className="h-4 w-4" strokeWidth={2.5} />}
                >
                  Call Now to Book
                </CandyButton>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="relative px-4 py-24 sm:px-6 lg:px-8">
          <DecorativeConfetti />
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Events"
              title="Perfect For Any Event"
              body="Families, schools, churches, and local businesses all need something that keeps the energy up and the setup simple."
            />

            <div className="relative mt-16">
              <div className="event-connector absolute left-[12%] right-[12%] top-16 hidden border-t-4 border-dashed border-[var(--accent-shadow)] lg:block" />
              <div className="grid gap-8 lg:grid-cols-3">
                {eventItems.map((item) => (
                  <EventCard key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <DecorativeConfetti />
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading
              eyebrow="Contact"
              title="Ready to Bounce?"
              body="Call, message, and lock your date in before the calendar fills up."
            />

            <div className="sticker-card mt-14 p-8 sm:p-12" data-reveal>
              <a
                href={business.phoneHref}
                className="inline-flex flex-wrap items-center justify-center gap-3 font-heading text-4xl font-extrabold text-[var(--foreground)] transition-colors hover:text-[var(--secondary)] sm:text-5xl"
              >
                <Phone className="h-9 w-9" strokeWidth={2.5} />
                <span>{business.phoneDisplay}</span>
              </a>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-lg text-[var(--muted-foreground)]">
                <MessageCircle className="h-5 w-5 text-[var(--foreground)]" strokeWidth={2.5} />
                <a
                  href={business.facebookHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[var(--foreground)] underline decoration-[var(--tertiary)] decoration-4 underline-offset-4"
                >
                  {business.facebookHandle}
                </a>
              </div>

              <div className="mt-10 flex justify-center">
                <CandyButton
                  href={business.phoneHref}
                  icon={<ArrowRight className="h-4 w-4" strokeWidth={2.5} />}
                  className="text-base"
                >
                  Call Now to Book
                </CandyButton>
              </div>
            </div>

            <p className="mt-8 font-heading text-2xl font-extrabold text-[var(--foreground)]" data-reveal>
              They&apos;re only kids just once.
            </p>
          </div>
        </section>
      </main>

      <footer className="relative overflow-hidden bg-[var(--foreground)] px-4 py-10 text-[var(--background)] sm:px-6 lg:px-8">
        <span className="footer-shape left-[8%] top-5" aria-hidden="true" />
        <span className="footer-shape right-[10%] bottom-6" aria-hidden="true" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-heading text-2xl font-extrabold">{business.name}</p>
            <p className="mt-2 text-sm text-[color:rgba(255,253,245,0.8)]">
              Affordable bounce house rentals for birthdays, parties, and local events.
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-[color:rgba(255,253,245,0.92)]">
            <a href={business.phoneHref} className="hover:text-white">
              {business.phoneDisplay}
            </a>
            <a href={business.facebookHref} target="_blank" rel="noreferrer" className="hover:text-white">
              {business.facebookHandle}
            </a>
          </div>

          <a
            href="https://deadpixeldesign.com"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[var(--background)] underline decoration-[var(--tertiary)] decoration-4 underline-offset-4"
          >
            Site designed by Dead Pixel Design
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

