import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { ProductCard } from "@/components/ProductCard";

const collections = [
  {
    name: "Drinkware",
    image: "/images/drinkware.jpg",
    href: "/shop?collection=drinkware",
  },
  {
    name: "Cutting Boards",
    image: "/images/cutting-boards.jpg",
    href: "/shop?collection=cutting-boards",
  },
  {
    name: "Custom Gifts",
    image: "/images/custom-gifts.jpg",
    href: "/shop?collection=custom-gifts",
  },
];

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.2}>
        <circle cx="16" cy="16" r="12" />
        <path d="M16 8v8l5 3" strokeLinecap="round" />
        <path d="M10 20l-2 4M22 20l2 4" strokeLinecap="round" />
      </svg>
    ),
    title: "Precision Laser Engraving",
    desc: "Every detail rendered with exacting accuracy on wood, metal, acrylic, glass, and more.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.2}>
        <path d="M16 4l3 6h7l-5.5 4.5 2 7L16 17l-6.5 4.5 2-7L6 10h7z" strokeLinejoin="round" />
      </svg>
    ),
    title: "Designed for You",
    desc: "Your vision, your logos, your words. Every piece is made to order and personally proofed.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={1.2}>
        <path d="M6 24c2-4 4-12 10-12s8 8 10 12" strokeLinecap="round" />
        <circle cx="16" cy="8" r="3" />
        <path d="M8 28h16" strokeLinecap="round" />
      </svg>
    ),
    title: "Crafted in Maine",
    desc: "Small-batch production from our Lewiston workshop. Local care, shipped everywhere.",
  },
];

const processSteps = [
  { num: "01", title: "Tell Us Your Vision", desc: "Share your idea, logo, or design concept." },
  { num: "02", title: "Review Your Proof", desc: "We send a digital mockup for your approval." },
  { num: "03", title: "We Craft It", desc: "Precision engraved in our Maine workshop." },
  { num: "04", title: "Delivered to You", desc: "Carefully packaged and shipped to your door." },
];

const bestSellers = [
  { name: "Engraved Tumbler", description: "30oz insulated, custom text or logo", price: "$28", image: "/images/tumbler.jpg", badge: "Best Seller" },
  { name: "Heart Cutting Board", description: "Marble & wood with personalized engraving", price: "$45", image: "/images/cutting-board.jpg" },
  { name: "Slate Coaster Set", description: "Set of 4, engraved with your design", price: "$32", image: "/images/coasters.jpg" },
  { name: "Custom Keychain", description: "Stainless steel with laser-cut detail", price: "$15", image: "/images/keychain.jpg" },
  { name: "Engraved Cross Pendant", description: "Sterling silver, personalized inscription", price: "$55", image: "/images/pendant.jpg", badge: "New" },
  { name: "Laser-Cut Wall Art", description: "Intricate multi-layer designs in wood", price: "$85", image: "/images/wall-art.jpg" },
];

const occasions = [
  "Weddings",
  "Birthdays",
  "Memorials",
  "Corporate Events",
  "Holidays",
  "Just Because",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center bg-cosmic-hero overflow-hidden">
        <div className="star-field" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet/5 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-6 font-medium">
                Custom Laser Engraving &middot; Lewiston, Maine
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-cream leading-[1.1] mb-6">
                Precision{" "}
                <span className="text-violet">Engraving.</span>
                <br />
                Personal Touch.
              </h1>
              <p className="text-lg text-cream-dim leading-relaxed max-w-lg mb-10">
                Custom-crafted keepsakes, gifts, and branded pieces made with
                care in our Maine workshop. From a single personalized gift to a
                full custom run.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/shop" className="btn-primary">
                  Shop Collections
                </Link>
                <Link href="/custom-orders" className="btn-ghost">
                  Start a Custom Order
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square max-w-lg ml-auto">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-charcoal to-midnight border border-violet/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-40 h-40 mx-auto rounded-full bg-violet/5 border border-violet/10 flex items-center justify-center mb-6">
                        <svg className="w-16 h-16 text-violet/40" fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth={0.8}>
                          <path d="M16 2C10 2 6 7 6 13c0 3 1 5 2 7 0 2-1 4-1 6 0 2 1 3 3 3h2c1 0 2-1 2-2v-1h6v1c0 1 1 2 2 2h2c2 0 3-1 3-3 0-2-1-4-1-6 1-2 2-4 2-7 0-6-4-11-10-11z" />
                        </svg>
                      </div>
                      <p className="text-xs text-cream-dim/40 uppercase tracking-widest">
                        Product Photography
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -inset-4 bg-violet/5 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cream-dim/40">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-violet/40 to-transparent" />
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Collections</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Explore Our Work</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((col, i) => (
              <ScrollReveal key={col.name} delay={i * 100}>
                <Link href={col.href} className="group block">
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden card-surface transition-all duration-500 glow-violet-hover">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${col.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-8">
                      <div>
                        <h3 className="font-serif text-2xl text-cream tracking-wide">{col.name}</h3>
                        <span className="text-xs text-violet uppercase tracking-widest mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Browse &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GHOSTLY */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Why Choose Us</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Built on Craft, Not Compromise</h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 120}>
                <div className="text-center">
                  <div className="inline-flex text-lilac mb-6">{f.icon}</div>
                  <h3 className="font-serif text-xl text-cream mb-3">{f.title}</h3>
                  <p className="text-sm text-cream-dim leading-relaxed">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM ORDER PROCESS */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">How It Works</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">From Idea to Engraved</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="relative card-surface rounded-xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center mx-auto mb-5">
                    <span className="text-sm font-medium text-violet">{step.num}</span>
                  </div>
                  <h3 className="font-serif text-lg text-cream mb-2">{step.title}</h3>
                  <p className="text-sm text-cream-dim">{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-violet/20" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={500}>
            <div className="text-center mt-12">
              <Link href="/custom-orders" className="btn-primary">Start Your Custom Order</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="py-28 lg:py-36 bg-cosmic-subtle">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Popular Picks</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Best Sellers</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 80}>
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={600}>
            <div className="text-center mt-12">
              <Link href="/shop" className="btn-ghost">View All Products</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Perfect For</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Every Occasion, Made Personal</h2>
            </div>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {occasions.map((occ, i) => (
              <ScrollReveal key={occ} delay={i * 80}>
                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-charcoal border border-violet/15 flex items-center justify-center transition-all duration-500 group-hover:border-violet/40 group-hover:shadow-[0_0_30px_rgba(155,127,212,0.15)]">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-violet/5 flex items-center justify-center">
                      <span className="text-xs text-violet/60 uppercase tracking-widest text-center leading-tight px-2">
                        {occ.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.15em] text-cream-dim group-hover:text-cream transition-colors">
                    {occ}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 lg:py-36 bg-cosmic-subtle">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <TestimonialCarousel />
          </ScrollReveal>
        </div>
      </section>

      {/* BUSINESS GIFTING */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-violet/5 border border-violet/10 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-violet/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Branded Products</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">For Business</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
                Custom Gifts for Your Business
              </h2>
              <p className="text-cream-dim leading-relaxed mb-4">
                From branded tumblers for your sales team to personalized
                closing gifts for clients, we help businesses create products
                people actually keep and use.
              </p>
              <p className="text-cream-dim leading-relaxed mb-8">
                Bulk pricing available. No minimums on most items. Free digital
                proofs on every order.
              </p>
              <Link href="/business-gifts" className="btn-primary">Learn More</Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-gradient-to-r from-violet/10 via-violet/15 to-violet/10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
              Ready to Create Something Memorable?
            </h2>
            <p className="text-cream-dim mb-8">
              Tell us about your project and we&apos;ll bring it to life.
            </p>
            <Link href="/contact" className="btn-primary text-lg">Get Started</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
