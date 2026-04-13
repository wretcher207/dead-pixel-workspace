import { useEffect, useState } from "react";
import {
  contactSubjects,
  eventCards,
  fairwayData,
  galleryImages,
  golfCourses,
  hoursList,
  inTheRoughItems,
  majorsData,
  menuTabs,
  navLinks,
  onTheTeeItems,
  pizzaData,
  sidesAndSoupsData,
  specialtyNightCards,
  specialsCards,
  testimonials
} from "./data/siteData";

const sectionIds = [
  "home",
  "welcome",
  "specials",
  "menu",
  "golf-simulator",
  "events",
  "catering",
  "gallery",
  "testimonials",
  "contact"
];

function MenuItemsGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => (
        <div key={`${item.name}-${index}`} className="rounded-lg border border-sage/40 bg-white/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <h5 className="font-body text-base font-medium text-charcoal">{item.name}</h5>
            <span className="shrink-0 font-body text-base font-medium text-clubhouse">{item.price}</span>
          </div>
          {item.note ? <p className="mt-2 text-sm text-charcoal/60">{item.note}</p> : null}
          {item.description ? <p className="mt-2 text-sm text-charcoal/60">{item.description}</p> : null}
        </div>
      ))}
    </div>
  );
}

function MenuSubHeader({ title }) {
  return (
    <h4 className="mb-4 mt-10 border-b border-sage pb-2 font-heading text-xl font-semibold text-charcoal first:mt-0">
      {title}
    </h4>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [pauseTestimonials, setPauseTestimonials] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(min-width: 768px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event) => setIsDesktop(event.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -50% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    revealItems.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (pauseTestimonials) {
      return undefined;
    }

    const interval = setInterval(() => {
      setTestimonialIndex((previous) => (previous + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [pauseTestimonials]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((previous) => (previous + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((previous) => (previous - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen || lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, lightboxIndex]);

  const activeTestimonial = testimonials[testimonialIndex];

  const handleNavClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const goToNextImage = () => {
    setLightboxIndex((previous) => (previous + 1) % galleryImages.length);
  };

  const goToPreviousImage = () => {
    setLightboxIndex((previous) => (previous - 1 + galleryImages.length) % galleryImages.length);
  };

  const renderMenuContent = () => {
    if (activeMenuTab === 0) {
      return <MenuItemsGrid items={onTheTeeItems} />;
    }

    if (activeMenuTab === 1) {
      return (
        <div>
          <p className="mb-6 rounded-lg border border-sage/60 bg-white p-4 text-sm text-charcoal/80">{fairwayData.intro}</p>
          <MenuSubHeader title="Burgers & Dogs" />
          <MenuItemsGrid items={fairwayData.burgersAndDogs} />
          <MenuSubHeader title="Sandwiches" />
          <p className="mb-4 text-sm italic text-charcoal/60">{fairwayData.sandwichNote}</p>
          <MenuItemsGrid items={fairwayData.sandwiches} />
          <MenuSubHeader title="Hot Subs (12 inch)" />
          <MenuItemsGrid items={fairwayData.hotSubs} />
          <MenuSubHeader title="Wraps" />
          <p className="mb-4 text-sm italic text-charcoal/60">{fairwayData.wrapsIntro}</p>
          <MenuItemsGrid items={fairwayData.wraps} />
        </div>
      );
    }
    if (activeMenuTab === 2) {
      return (
        <div>
          <p className="mb-6 rounded-lg border border-sage/60 bg-white p-4 text-sm text-charcoal/80">{majorsData.intro}</p>
          <MenuSubHeader title="Entrees & Dinners" />
          <MenuItemsGrid items={majorsData.entrees} />
          <MenuSubHeader title={majorsData.kidsMenuTitle} />
          <p className="mb-3 text-sm text-charcoal/70">{majorsData.kidsMenuNote}</p>
          <ul className="grid gap-2 rounded-lg border border-sage/40 bg-white/70 p-4 text-sm text-charcoal/80 sm:grid-cols-2">
            {majorsData.kidsMenuItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <MenuSubHeader title={majorsData.mexicanTitle} />
          <h5 className="mb-3 font-heading text-lg font-semibold text-charcoal">Quesadillas</h5>
          <div className="overflow-x-auto rounded-lg border border-sage/50 bg-white">
            <table className="min-w-full text-left text-sm text-charcoal/85">
              <thead className="bg-sage/30 font-heading text-charcoal">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Small</th>
                  <th className="px-4 py-3">Full</th>
                </tr>
              </thead>
              <tbody>
                {majorsData.quesadillas.map((item) => (
                  <tr key={item.name} className="border-t border-sage/30">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.small}</td>
                    <td className="px-4 py-3">{item.full}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-charcoal/60">{majorsData.quesadillaNote}</p>
          <h5 className="mb-3 mt-8 font-heading text-lg font-semibold text-charcoal">Fajitas</h5>
          <div className="overflow-x-auto rounded-lg border border-sage/50 bg-white">
            <table className="min-w-full text-left text-sm text-charcoal/85">
              <thead className="bg-sage/30 font-heading text-charcoal">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {majorsData.fajitas.map((item) => (
                  <tr key={item.name} className="border-t border-sage/30">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-charcoal/60">{majorsData.fajitasNote}</p>
        </div>
      );
    }

    if (activeMenuTab === 3) {
      return (
        <div>
          <p className="mb-6 rounded-lg border border-sage/60 bg-white p-4 text-sm text-charcoal/80">{pizzaData.intro}</p>
          <h5 className="mb-3 font-heading text-lg font-semibold text-charcoal">Build Your Own</h5>
          <div className="overflow-x-auto rounded-lg border border-sage/50 bg-white">
            <table className="min-w-full text-left text-sm text-charcoal/85">
              <thead className="bg-sage/30 font-heading text-charcoal">
                <tr>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Base Price</th>
                  <th className="px-4 py-3">Per Topping</th>
                </tr>
              </thead>
              <tbody>
                {pizzaData.buildYourOwn.map((item) => (
                  <tr key={item.size} className="border-t border-sage/30">
                    <td className="px-4 py-3">{item.size}</td>
                    <td className="px-4 py-3">{item.basePrice}</td>
                    <td className="px-4 py-3">{item.perTopping}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5 className="mb-3 mt-8 font-heading text-lg font-semibold text-charcoal">Available Toppings</h5>
          <div className="flex flex-wrap gap-2">
            {pizzaData.toppings.map((topping) => (
              <span key={topping} className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-charcoal sm:text-sm">
                {topping}
              </span>
            ))}
          </div>
          <h5 className="mb-3 mt-8 font-heading text-lg font-semibold text-charcoal">Loaded Pizzas</h5>
          <div className="overflow-x-auto rounded-lg border border-sage/50 bg-white">
            <table className="min-w-full text-left text-sm text-charcoal/85">
              <thead className="bg-sage/30 font-heading text-charcoal">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Small</th>
                  <th className="px-4 py-3">Large</th>
                </tr>
              </thead>
              <tbody>
                {pizzaData.loadedPizzas.map((item) => (
                  <tr key={item.name} className="border-t border-sage/30">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.small}</td>
                    <td className="px-4 py-3">{item.large}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeMenuTab === 4) {
      return <MenuItemsGrid items={inTheRoughItems} />;
    }

    if (activeMenuTab === 5) {
      return (
        <div>
          <MenuSubHeader title="Side Orders" />
          <MenuItemsGrid items={sidesAndSoupsData.sideOrders} />
          <MenuSubHeader title="Mulligan's Stews" />
          <p className="mb-4 text-sm text-charcoal/70">{sidesAndSoupsData.stewsNote}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sidesAndSoupsData.stews.map((item) => (
              <div key={item.name} className="rounded-lg border border-sage/50 bg-white p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-body text-base font-medium text-charcoal">{item.name}</span>
                  <span className="font-body text-base font-medium text-clubhouse">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid gap-6 md:grid-cols-2">
        {specialtyNightCards.map((card) => (
          <article key={card.title} className="rounded-xl border border-gold/40 bg-white p-6 shadow-sm">
            <h4 className={`text-2xl ${card.script ? "font-script text-gold" : "font-heading font-bold text-clubhouse"}`}>
              {card.title}
            </h4>
            <div className="mt-4 space-y-2">
              {card.details?.map((detail) => (
                <p key={detail} className="text-sm text-charcoal/80">
                  {detail}
                </p>
              ))}
            </div>
            {card.items ? (
              <ul className="mt-4 space-y-2 rounded-lg bg-cream p-4 text-sm text-charcoal/80">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {card.note ? <p className="mt-4 text-xs italic text-charcoal/65">{card.note}</p> : null}
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-clubhouse/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => handleNavClick("home")} className="flex items-center" aria-label="Go to home section">
            <img src="/images/par-n-grill-logo.png" alt="Par N Grill logo" className="h-10 w-auto" />
          </button>

          <nav className="hidden items-center gap-5 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative pb-1 font-heading text-sm font-semibold text-white transition hover:text-gold ${
                  activeSection === link.id
                    ? "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gold"
                    : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="rounded-lg bg-gold px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-charcoal shadow-sm transition hover:brightness-105 hover:shadow-glow sm:text-sm"
            >
              Order Online
            </a>
            <button
              type="button"
              className="rounded-lg border border-white/30 p-2 text-white transition hover:text-gold md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-50 bg-charcoal/60 transition-opacity md:hidden ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
        role="presentation"
      >
        <aside
          className={`absolute right-0 top-0 flex h-full w-80 max-w-[86vw] flex-col bg-clubhouse p-6 transition-transform ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-8 flex items-center justify-between">
            <img src="/images/par-n-grill-logo.png" alt="Par N Grill logo" className="h-10 w-auto" />
            <button
              type="button"
              className="rounded-lg border border-white/30 p-2 text-white"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 6 12 12" />
                <path d="m18 6-12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left font-heading text-xl font-semibold text-white transition hover:text-gold"
              >
                {link.label}
              </button>
            ))}
          </div>
          <a
            href="#"
            className="mt-8 rounded-lg bg-gold px-4 py-3 text-center font-heading text-base font-bold text-charcoal"
          >
            Order Online
          </a>
        </aside>
      </div>

      <main>
        <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <img src="/images/exterior.jpg" alt="Par N Grill exterior" className="h-full w-full object-cover" />
            {isDesktop && !videoFailed ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src="/video/video-asset.mp4" type="video/mp4" />
              </video>
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,26,26,0.55)_0%,rgba(45,90,61,0.65)_100%)]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
            <img src="/images/par-n-grill-logo.png" alt="Par N Grill" className="mb-6 w-full max-w-[280px]" data-reveal />
            <h1
              className="font-display text-cream text-[clamp(2.5rem,8vw,4rem)] font-black leading-tight"
              data-reveal
              style={{ transitionDelay: "50ms" }}
            >
              Always Better Than Par
            </h1>
            <p className="mt-4 font-heading text-lg text-white/85" data-reveal style={{ transitionDelay: "100ms" }}>
              Open for Lunch & Dinner Daily
            </p>
            <p className="mt-2 text-sm text-white/70" data-reveal style={{ transitionDelay: "150ms" }}>
              6 Carroll Street, Caribou, Maine
            </p>
            <div className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row" data-reveal style={{ transitionDelay: "200ms" }}>
              <button
                onClick={() => handleNavClick("menu")}
                className="w-full rounded-lg border-2 border-white px-8 py-3 font-heading text-sm font-semibold uppercase tracking-wide text-white transition hover:border-gold hover:text-gold sm:w-auto"
              >
                View Menu
              </button>
              <a
                href="#"
                className="w-full rounded-lg bg-gold px-8 py-3 font-heading text-sm font-bold uppercase tracking-wide text-charcoal transition hover:brightness-105 sm:w-auto"
              >
                Order Online
              </a>
            </div>
          </div>

          <button
            onClick={() => handleNavClick("welcome")}
            className="scroll-chevron absolute bottom-6 z-10 text-white/60"
            aria-label="Scroll to welcome section"
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </section>

        <section id="welcome" className="bg-cream py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-12 lg:px-8">
            <div className="lg:col-span-3" data-reveal>
              <img
                src="/images/interior3.jpg"
                alt="Dining room at Par N Grill"
                className="h-full w-full rounded-lg object-cover shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="space-y-5 lg:col-span-2">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold" data-reveal>
                Welcome To
              </p>
              <h2 className="font-display text-4xl font-bold text-charcoal" data-reveal style={{ transitionDelay: "50ms" }}>
                The Par N Grill
              </h2>
              <p className="text-base leading-relaxed text-charcoal/85" data-reveal style={{ transitionDelay: "100ms" }}>
                Good food, cold drinks, and great people all in one spot. Par N Grill on Carroll Street in Caribou is
                family-friendly, has a full bar, and keeps the golf simulator ready for your next round.
              </p>
              <div
                className="rounded-lg border-l-4 border-clubhouse bg-white p-4 shadow-sm"
                data-reveal
                style={{ transitionDelay: "150ms" }}
              >
                <h3 className="font-heading text-base font-semibold text-charcoal">Hours</h3>
                <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                  {hoursList.map((hour) => (
                    <li key={hour.day} className="flex items-center justify-between gap-4">
                      <span>{hour.day}</span>
                      <span>{hour.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="tel:2074920988"
                className="inline-block font-heading text-lg font-semibold text-clubhouse transition hover:text-gold"
                data-reveal
                style={{ transitionDelay: "200ms" }}
              >
                (207) 492-0988
              </a>
            </div>
          </div>
        </section>

        <section id="specials" className="bg-clubhouse py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-4xl font-bold text-white" data-reveal>
              What's On Special
            </h2>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {specialsCards.map((card, index) => (
                <article
                  key={card.title}
                  data-reveal
                  style={{ transitionDelay: `${index * 50}ms` }}
                  className="group h-full rounded-xl border-t-[3px] border-gold bg-charcoal text-cream transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {card.image ? (
                    <img
                      src={card.image}
                      alt="Happy hour cocktails"
                      className="h-52 w-full rounded-t-xl object-cover"
                      loading="lazy"
                    />
                  ) : null}
                  <div className="p-6">
                    <h3
                      className={`text-3xl ${
                        card.script ? "font-script font-bold text-gold" : "font-heading text-xl font-bold text-white"
                      }`}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-sage">{card.subtext}</p>
                    {card.body ? <p className="mt-4 text-sm leading-relaxed text-cream/90">{card.body}</p> : null}
                    {card.weeklyItems ? (
                      <div className="mt-4 space-y-4">
                        {card.weeklyItems.map((item) => (
                          <div key={item.name}>
                            <p className="font-body text-sm font-medium text-cream">{item.name}</p>
                            {item.note ? <p className="mt-1 text-xs text-cream/70">{item.note}</p> : null}
                          </div>
                        ))}
                        <p className="text-xs italic text-sage">{card.footer}</p>
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="menu" className="bg-cream py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-reveal>
              <h2 className="font-display text-5xl font-black text-charcoal">The Menu</h2>
              <p className="mt-3 text-charcoal/60">Serving quality food that keeps you coming back</p>
            </div>

            <div className="mt-10 overflow-x-auto" data-reveal style={{ transitionDelay: "50ms" }}>
              <div className="inline-flex min-w-full gap-2 rounded-xl bg-white p-2 shadow-sm">
                {menuTabs.map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setActiveMenuTab(index)}
                    className={`whitespace-nowrap rounded-lg px-4 py-3 font-heading text-sm transition ${
                      activeMenuTab === index
                        ? "bg-clubhouse/10 font-bold text-clubhouse shadow-[inset_0_-3px_0_0_#D4A843]"
                        : "font-semibold text-charcoal hover:text-gold"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="menu-fade mt-8 rounded-xl border border-sage/40 bg-cream p-6 sm:p-8" data-reveal>
              {renderMenuContent()}
            </div>
          </div>
        </section>

        <section
          id="golf-simulator"
          className="relative overflow-hidden py-20 sm:py-24"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,26,26,0.7), rgba(26,26,26,0.7)), url('/images/golf_simulator.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: isDesktop ? "fixed" : "scroll"
          }}
        >
          <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.25em] text-gold" data-reveal>
              Step Up To The Tee
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl" data-reveal style={{ transitionDelay: "50ms" }}>
              Full Swing Golf Simulator
            </h2>
            <p className="mt-3 font-heading text-xl text-white/85" data-reveal style={{ transitionDelay: "100ms" }}>
              41 World Renowned Golf Courses
            </p>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/85" data-reveal style={{ transitionDelay: "150ms" }}>
              Bring your own clubs or use ours and hit real balls on world class courses. The simulator also includes an
              integrated driving range plus chipping and putting greens so you can work on every part of your game.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3" data-reveal style={{ transitionDelay: "200ms" }}>
              {golfCourses.map((course) => (
                <span key={course} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-charcoal">
                  {course}
                </span>
              ))}
              <span className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold">+36 more</span>
            </div>
            <div
              className="mx-auto mt-10 max-w-md rounded-xl border-l-4 border-gold bg-charcoal/80 p-6 text-left"
              data-reveal
              style={{ transitionDelay: "250ms" }}
            >
              <ul className="space-y-2 text-sm text-white/90">
                <li>18 Holes: $25 per person</li>
                <li>9 Holes: $18 per person</li>
                <li>By the Hour: $20 per hour</li>
              </ul>
              <p className="mt-3 text-xs text-sage">First-time player discounts available</p>
            </div>
            <a
              href="tel:2074920988"
              className="mt-8 inline-flex rounded-lg bg-gold px-7 py-3 font-heading text-sm font-bold uppercase tracking-wide text-charcoal transition hover:brightness-105"
              data-reveal
              style={{ transitionDelay: "300ms" }}
            >
              Call to Book Your Tee Time
            </a>
            <p className="mt-4 text-sm text-white/80" data-reveal style={{ transitionDelay: "350ms" }}>
              Winter league play available. Call for details.
            </p>
          </div>
        </section>

        <section id="events" className="bg-cream py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-4xl font-bold text-charcoal" data-reveal>
              Events & Private Dining
            </h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {eventCards.map((card, index) => (
                <article
                  key={card.title}
                  id={card.id}
                  className="overflow-hidden rounded-xl bg-white shadow-lg"
                  data-reveal
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <img src={card.image} alt={card.title} className="h-64 w-full object-cover" loading="lazy" />
                    {card.logo ? (
                      <img
                        src={card.logo}
                        alt="P and G Catering logo"
                        className="absolute bottom-4 right-4 w-[60px] drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="space-y-4 p-6">
                    <h3 className="font-heading text-2xl font-bold text-charcoal">{card.title}</h3>
                    {card.tagline ? <p className="font-script text-3xl text-gold">{card.tagline}</p> : null}
                    <p className="text-sm leading-relaxed text-charcoal/80">{card.body}</p>
                    <button
                      onClick={() => handleNavClick("contact")}
                      className="font-heading text-sm font-semibold text-clubhouse transition hover:text-gold"
                    >
                      {card.cta} <span aria-hidden="true">&#8594;</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="gallery" className="bg-[#F5F3F0] py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center" data-reveal>
              <h2 className="font-display text-4xl font-bold text-charcoal">Life at the Par</h2>
              <p className="mt-3 text-charcoal/50">Good food, good friends, good times</p>
            </div>
            <div className="gallery-columns mt-12" data-reveal style={{ transitionDelay: "50ms" }}>
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className="gallery-item group relative block w-full overflow-hidden rounded-lg"
                  onClick={() => setLightboxIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Gallery photo ${index + 1}`}
                    className="h-auto w-full rounded-lg object-cover transition duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-clubhouse py-20 sm:py-24">
          <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-display text-[80px] leading-none text-gold/30" data-reveal>
              &#8220;
            </p>
            <h2 className="-mt-4 font-display text-4xl font-bold text-white" data-reveal style={{ transitionDelay: "50ms" }}>
              What People Are Saying
            </h2>
            <div
              className="mt-12 rounded-xl border border-gold/30 bg-charcoal/30 p-8"
              onMouseEnter={() => setPauseTestimonials(true)}
              onMouseLeave={() => setPauseTestimonials(false)}
              data-reveal
              style={{ transitionDelay: "100ms" }}
            >
              <p className="text-lg italic leading-relaxed text-white">{activeTestimonial.quote}</p>
              <div className="mx-auto mt-6 h-px w-10 bg-gold" />
              <p className="mt-5 font-heading text-lg font-semibold text-gold">{activeTestimonial.name}</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2" data-reveal style={{ transitionDelay: "150ms" }}>
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setTestimonialIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    testimonialIndex === index ? "bg-gold" : "bg-white/30"
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-cream py-20 sm:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-4xl font-bold text-charcoal" data-reveal>
              Come See Us
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div className="space-y-6" data-reveal>
                <p className="text-base font-medium text-charcoal">6 Carroll Street, Caribou, Maine 04736</p>
                <a href="tel:2074920988" className="inline-block font-heading text-lg font-semibold text-clubhouse hover:text-gold">
                  (207) 492-0988
                </a>
                <div className="rounded-lg border-l-4 border-clubhouse bg-white p-4 shadow-sm">
                  <h3 className="font-heading text-base font-semibold text-charcoal">Hours</h3>
                  <ul className="mt-3 space-y-2 text-sm text-charcoal/75">
                    {hoursList.map((hour) => (
                      <li key={hour.day} className="flex items-center justify-between gap-4">
                        <span>{hour.day}</span>
                        <span>{hour.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="https://www.facebook.com/theparandgrill/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-heading text-sm font-semibold text-clubhouse hover:text-gold"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 8.4V6.9c0-.7.5-.8.9-.8h2V3h-2.8C10.9 3 10 5 10 7v1.4H8v3h2V21h3.5v-9.6h2.4l.4-3H13.5z" />
                  </svg>
                  Follow us on Facebook
                </a>
                <div className="rounded-lg border-l-4 border-gold bg-white p-4 text-sm text-charcoal/80">
                  Gift cards available! Ask us in person or call to order.
                </div>
              </div>

              <div className="space-y-6" data-reveal style={{ transitionDelay: "50ms" }}>
                <iframe
                  title="Par N Grill map"
                  src="https://www.google.com/maps?q=6+Carroll+Street,+Caribou,+Maine+04736&output=embed"
                  loading="lazy"
                  className="h-[300px] w-full rounded-lg border border-sage/50"
                />
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  className="space-y-4 rounded-xl bg-white p-5 shadow-sm"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="hidden">
                    <label htmlFor="bot-field">
                      Bot Field
                      <input id="bot-field" name="bot-field" />
                    </label>
                  </div>
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal/80">
                      Name
                    </label>
                    <input id="name" name="name" type="text" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-charcoal/80">
                      Email
                    </label>
                    <input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-charcoal/80">
                      Phone
                    </label>
                    <input id="phone" name="phone" type="tel" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="mb-1 block text-sm font-medium text-charcoal/80">
                      Subject
                    </label>
                    <select id="subject" name="subject" required defaultValue="">
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {contactSubjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-1 block text-sm font-medium text-charcoal/80">
                      Message
                    </label>
                    <textarea id="message" name="message" rows="4" required />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-gold px-4 py-3 font-heading text-sm font-bold uppercase tracking-wide text-charcoal transition hover:brightness-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-charcoal pt-14 text-white/80">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-10 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="space-y-4">
            <img src="/images/par-n-grill-logo.png" alt="Par N Grill logo" className="w-full max-w-[160px]" loading="lazy" />
            <p className="font-display text-xl italic text-sage">Always Better Than Par</p>
            <p className="text-sm text-white/70">6 Carroll Street, Caribou, ME 04736</p>
            <a href="tel:2074920988" className="text-sm text-white/70 hover:text-gold">
              (207) 492-0988
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-white">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <button onClick={() => handleNavClick("menu")} className="text-left hover:text-gold">
                Menu
              </button>
              <button onClick={() => handleNavClick("golf-simulator")} className="text-left hover:text-gold">
                Golf Simulator
              </button>
              <button onClick={() => handleNavClick("catering")} className="text-left hover:text-gold">
                Catering
              </button>
              <button onClick={() => handleNavClick("events")} className="text-left hover:text-gold">
                Private Events
              </button>
              <button onClick={() => handleNavClick("contact")} className="text-left hover:text-gold">
                Contact
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-white">Hours</h3>
            <ul className="space-y-2 text-sm text-white/70">
              {hoursList.map((hour) => (
                <li key={hour.day} className="flex items-center justify-between gap-4">
                  <span>{hour.day}</span>
                  <span>{hour.hours}</span>
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex w-full justify-center rounded-lg bg-gold px-4 py-3 text-sm font-bold uppercase tracking-wide text-charcoal transition hover:brightness-105"
            >
              Order Online
            </a>
          </div>
        </div>
        <div className="border-t border-clubhouse">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
            <p>2026 Par N Grill. All rights reserved.</p>
            <a href="https://deadpixeldesign.com" target="_blank" rel="noreferrer" className="hover:text-gold">
              Website by Dead Pixel Design
            </a>
          </div>
        </div>
      </footer>

      {lightboxIndex !== null ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/90 p-4" onClick={() => setLightboxIndex(null)}>
          <button
            type="button"
            className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close gallery"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12" />
              <path d="m18 6-12 12" />
            </svg>
          </button>
          <button
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              goToPreviousImage();
            }}
            aria-label="Previous image"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <img
            src={galleryImages[lightboxIndex]}
            alt={`Gallery detail ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              goToNextImage();
            }}
            aria-label="Next image"
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
