import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { QuoteForm } from "@/components/QuoteForm";

const steps = [
  {
    num: "01",
    title: "Share Your Idea",
    desc: "Tell us what you're looking for. Upload a logo, sketch, or just describe your vision.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Review Your Proof",
    desc: "We'll send you a digital mockup before anything gets engraved. Revisions are free.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "We Craft It",
    desc: "Your piece is laser engraved with precision and care in our Maine workshop.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Receive Your Order",
    desc: "Carefully packaged and shipped directly to you or your recipient.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

const materials = [
  { name: "Wood", desc: "Maple, walnut, bamboo, acacia" },
  { name: "Metal", desc: "Stainless steel, aluminum, brass" },
  { name: "Acrylic", desc: "Clear, colored, frosted, mirrored" },
  { name: "Glass", desc: "Drinkware, frames, ornaments" },
  { name: "Slate", desc: "Coasters, signs, serving boards" },
  { name: "Leather", desc: "Journals, keychains, wallets" },
];

const orderTypes = [
  { name: "Personalized Gifts", image: "/images/personalized.jpg" },
  { name: "Wedding & Event Pieces", image: "/images/wedding.jpg" },
  { name: "Memorial & Keepsakes", image: "/images/memorial.jpg" },
  { name: "Business Branding", image: "/images/branding.jpg" },
  { name: "Home Decor", image: "/images/decor.jpg" },
];

const fileTypes = [
  { ext: "SVG", desc: "Preferred for logos" },
  { ext: "PNG", desc: "High resolution (300dpi+)" },
  { ext: "AI", desc: "Adobe Illustrator" },
  { ext: "PDF", desc: "Vector or high-res" },
  { ext: "JPG", desc: "High quality photos" },
];

const faqItems = [
  {
    question: "How long does a custom order take?",
    answer: "Most custom orders are completed within 5-10 business days after proof approval. Rush orders are available for an additional fee. We'll provide a specific timeline when you submit your project details.",
  },
  {
    question: "Is there a minimum order quantity?",
    answer: "No minimums on most products. We're happy to create a single personalized gift or a run of 500 branded tumblers. Bulk orders of 25+ receive volume pricing.",
  },
  {
    question: "Do I get to approve a proof before production?",
    answer: "Always. Every custom order includes a free digital proof. We won't engrave anything until you've reviewed and approved the design. Revisions are included.",
  },
  {
    question: "What if I don't have a design file?",
    answer: "No problem. Send us a sketch, a description, or even just an idea. We can work with text, rough concepts, or photos and create a clean design for engraving.",
  },
  {
    question: "Can I return a custom order?",
    answer: "Because custom orders are made specifically for you, we can't accept returns on personalized items. However, if there's an error on our end, we'll remake it at no charge.",
  },
  {
    question: "Do you ship outside of New England?",
    answer: "Yes. While we're based in Lewiston, Maine, we ship nationwide. Local pickup is also available.",
  },
];

export default function CustomOrdersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cosmic-hero overflow-hidden">
        <div className="star-field" />
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Custom Orders</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-[1.1] mb-6">
                Your Vision.<br />
                <span className="text-violet">Our Craft.</span>
              </h1>
              <p className="text-lg text-cream-dim leading-relaxed max-w-lg mb-8">
                From a single personalized gift to a full custom run, we bring
                your ideas to life in wood, metal, acrylic, and more.
              </p>
              <Link href="#quote-form" className="btn-primary">Get a Free Quote</Link>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="right">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Product Composition</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Process</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">How Custom Orders Work</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 100}>
                <div className="card-surface rounded-xl p-6 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-violet/15 border border-violet/30 flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium text-violet">{step.num}</span>
                    </div>
                    <div className="text-lilac">{step.icon}</div>
                  </div>
                  <h3 className="font-serif text-lg text-cream mb-2">{step.title}</h3>
                  <p className="text-sm text-cream-dim leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Can Be Personalized */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Materials</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
                What Can Be Personalized
              </h2>
              <div className="space-y-4">
                {materials.map((mat) => (
                  <div
                    key={mat.name}
                    className="flex items-center gap-4 p-4 rounded-lg border border-violet/8 hover:border-violet/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-violet/8 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-lilac" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-cream">{mat.name}</h4>
                      <p className="text-xs text-cream-dim">{mat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200} direction="right">
              <div className="relative aspect-square rounded-xl overflow-hidden card-surface sticky top-28">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Detail Photography</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Order Type Examples */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">What We Make</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">Custom Order Categories</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {orderTypes.map((type, i) => (
              <ScrollReveal key={type.name} delay={i * 80}>
                <div className="group relative aspect-[3/4] rounded-xl overflow-hidden card-surface cursor-pointer glow-violet-hover transition-all duration-500">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${type.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-5">
                    <h3 className="font-serif text-base text-cream">{type.name}</h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Guidelines */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Artwork</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10">
                Preparing Your Artwork
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal>
              <h3 className="text-sm font-medium text-cream mb-4 uppercase tracking-wide">
                Accepted File Types
              </h3>
              <div className="flex flex-wrap gap-3">
                {fileTypes.map((ft) => (
                  <div
                    key={ft.ext}
                    className="card-surface rounded-lg px-5 py-3 text-center"
                  >
                    <p className="text-sm font-medium text-violet">{ft.ext}</p>
                    <p className="text-[11px] text-cream-dim mt-1">{ft.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <h3 className="text-sm font-medium text-cream mb-4 uppercase tracking-wide">
                Tips for Best Results
              </h3>
              <ul className="space-y-3 text-sm text-cream-dim">
                <li className="flex items-start gap-3">
                  <span className="text-violet mt-0.5">&#10003;</span>
                  Vector files (SVG, AI) produce the sharpest results
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet mt-0.5">&#10003;</span>
                  Raster images should be 300dpi or higher
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet mt-0.5">&#10003;</span>
                  Simple, high-contrast designs engrave best
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-violet mt-0.5">&#10003;</span>
                  We can convert most formats if needed
                </li>
              </ul>
              <div className="mt-6 p-4 rounded-lg bg-violet/5 border border-violet/10">
                <p className="text-sm text-cream-dim italic">
                  Not sure about your file? Send it anyway. We&apos;ll work with you to
                  get it right.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-2xl text-cream mb-4">Fair, Transparent Pricing</h2>
            <p className="text-cream-dim leading-relaxed mb-6">
              Pricing depends on material, size, complexity, and quantity.
              Every order starts with a free quote so you know exactly what to
              expect. No hidden fees, no surprises.
            </p>
            <div className="section-divider relative my-8">
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-midnight px-4">
                <svg className="w-6 h-6 text-violet/30" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M16 2C10 2 6 7 6 13c0 3 1 5 2 7 0 2-1 4-1 6 0 2 1 3 3 3h2c1 0 2-1 2-2v-1h6v1c0 1 1 2 2 2h2c2 0 3-1 3-3 0-2-1-4-1-6 1-2 2-4 2-7 0-6-4-11-10-11z" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">FAQ</p>
              <h2 className="font-serif text-3xl text-cream">Common Questions</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FaqAccordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-28 lg:py-36 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-violet/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                Start Your Custom Order
              </h2>
              <p className="text-cream-dim">
                Tell us about your project and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <QuoteForm />
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-10 border-t border-violet/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16">
            {[
              { icon: "★", text: "100% Satisfaction" },
              { icon: "✓", text: "Free Digital Proof" },
              { icon: "◆", text: "Handcrafted in Maine" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lilac text-sm">{item.icon}</span>
                <span className="text-xs uppercase tracking-[0.15em] text-cream-dim">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
