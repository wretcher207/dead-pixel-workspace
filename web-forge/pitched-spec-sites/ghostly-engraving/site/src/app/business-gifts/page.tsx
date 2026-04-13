import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BulkOrderForm } from "@/components/BulkOrderForm";

const audiences = [
  {
    title: "Real Estate Agents",
    desc: "Closing gifts your clients will actually remember.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    title: "Small Businesses",
    desc: "Branded products that represent your quality.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
    ),
  },
  {
    title: "Event Organizers",
    desc: "Custom giveaways and awards for any occasion.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: "Corporate Teams",
    desc: "Employee gifts and recognition that feel personal.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const products = [
  "Branded Tumblers",
  "Desk Nameplates",
  "Engraved Bottle Openers",
  "Award Plaques",
  "Custom Coasters",
  "Promotional Keychains",
];

const valueProps = [
  {
    title: "No Minimums on Most Items",
    desc: "Order 5 or 500. We scale with you.",
  },
  {
    title: "Free Digital Proofs",
    desc: "Review and approve before anything is produced.",
  },
  {
    title: "Fast Turnaround for Rush Orders",
    desc: "Tight deadline? We make it work.",
  },
];

const tiers = [
  {
    name: "Small Run",
    range: "1 - 24 pieces",
    features: [
      "Perfect for personal gifting",
      "Full customization",
      "Free digital proof",
      "Standard turnaround",
    ],
    highlighted: false,
  },
  {
    name: "Standard",
    range: "25 - 99 pieces",
    features: [
      "Volume pricing applied",
      "Dedicated project support",
      "Priority production",
      "Free shipping over $250",
    ],
    highlighted: true,
  },
  {
    name: "Volume",
    range: "100+ pieces",
    features: [
      "Best per-unit pricing",
      "Dedicated account manager",
      "Rush production available",
      "Custom packaging options",
    ],
    highlighted: false,
  },
];

const useCases = [
  "Client Appreciation",
  "Employee Onboarding",
  "Holiday Gifts",
  "Trade Shows & Conferences",
  "Awards & Recognition",
  "Grand Openings",
];

export default function BusinessGiftsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cosmic-hero overflow-hidden">
        <div className="star-field" />
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Business Gifts</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-[1.1] mb-6">
                Custom Branded Gifts<br />
                <span className="text-violet">That Actually Get Kept.</span>
              </h1>
              <p className="text-lg text-cream-dim leading-relaxed max-w-lg mb-8">
                Engraved drinkware, desk accessories, and branded keepsakes for
                your team, your clients, and your next event.
              </p>
              <Link href="#bulk-form" className="btn-primary">Request a Bulk Quote</Link>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="right">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Branded Tumblers</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Built For</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Who This Is For</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {audiences.map((aud, i) => (
              <ScrollReveal key={aud.title} delay={i * 100}>
                <div className="card-surface rounded-xl p-6 border-t-2 border-t-violet/30 hover:border-t-violet transition-colors">
                  <div className="text-lilac mb-4">{aud.icon}</div>
                  <h3 className="font-serif text-lg text-cream mb-2">{aud.title}</h3>
                  <p className="text-sm text-cream-dim">{aud.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Products</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Business-Ready Products</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <ScrollReveal key={product} delay={i * 80}>
                <div className="group relative aspect-[16/10] rounded-xl overflow-hidden card-surface cursor-pointer glow-violet-hover transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-serif text-lg text-cream group-hover:text-violet transition-colors">{product}</p>
                      <p className="text-xs text-cream-dim/40 mt-2 uppercase tracking-widest">Product Photo</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Workshop / Laser Detail</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Partnership</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
                Why Partner With Ghostly
              </h2>
              <div className="space-y-6">
                {valueProps.map((vp) => (
                  <div key={vp.title} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-cream">{vp.title}</h3>
                      <p className="text-sm text-cream-dim mt-1">{vp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-cream-dim mt-8">
                Based in Lewiston, Maine &mdash; serving businesses across New England.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Pricing</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Bulk Pricing Tiers</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 100}>
                <div
                  className={`rounded-xl p-7 transition-all duration-500 hover:-translate-y-1 ${
                    tier.highlighted
                      ? "card-surface border-2 !border-violet/40 shadow-[0_0_40px_rgba(155,127,212,0.12)]"
                      : "card-surface"
                  }`}
                >
                  {tier.highlighted && (
                    <p className="text-[10px] uppercase tracking-[0.2em] text-violet font-semibold mb-4">
                      Most Popular
                    </p>
                  )}
                  <h3 className="font-serif text-xl text-cream">{tier.name}</h3>
                  <p className="text-sm text-violet mt-1 mb-6">{tier.range}</p>
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-cream-dim">
                        <span className="text-violet mt-0.5">&#10003;</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <p className="text-center text-sm text-cream-dim mt-10">
              Every order starts with a free custom quote. No commitment required.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Occasions</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">
                Perfect for Every Business Moment
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((uc, i) => (
              <ScrollReveal key={uc} delay={i * 80}>
                <div className="group relative rounded-xl overflow-hidden card-surface h-40 cursor-pointer glow-violet-hover transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-serif text-lg text-cream group-hover:text-violet transition-colors">
                      {uc}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-28 lg:py-36 bg-cosmic-subtle">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="block font-serif text-7xl text-violet/30 leading-none mb-4 select-none">
              &ldquo;
            </span>
            <blockquote className="font-serif text-xl md:text-2xl text-cream italic leading-relaxed mb-8">
              I ordered 50 custom tumblers for our real estate team. The quality
              blew everyone away. Our clients actually use them daily instead of
              tossing them in a closet.
            </blockquote>
            <p className="text-sm font-medium text-cream">Mike D.</p>
            <p className="text-xs text-cream-dim mt-1">Real Estate Broker, Manchester NH</p>
            <div className="flex items-center justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-violet" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xs text-cream-dim/50 mt-3">100% Recommend &middot; 7 Reviews</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Bulk Order Form */}
      <section id="bulk-form" className="py-28 lg:py-36 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-violet/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                Let&apos;s Build Something for Your Brand
              </h2>
              <p className="text-cream-dim">
                Tell us about your project and we&apos;ll get back to you with a custom quote.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <BulkOrderForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Partner CTA */}
      <section className="py-16 bg-gradient-to-r from-violet/10 via-violet/20 to-violet/10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl md:text-3xl text-cream mb-6">
              Ready to make your brand unforgettable?
            </h2>
            <Link
              href="#bulk-form"
              className="inline-block bg-white text-midnight font-medium px-8 py-4 rounded-full hover:bg-cream transition-colors"
            >
              Get Started Today
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
