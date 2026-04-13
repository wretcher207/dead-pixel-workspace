import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";

const values = [
  {
    title: "Precision First",
    desc: "Every piece is engraved with laser accuracy. We don't cut corners on quality, detail, or durability.",
  },
  {
    title: "Personally Crafted",
    desc: "This isn't a warehouse operation. Every order is handled with individual attention from start to finish.",
  },
  {
    title: "Built to Last",
    desc: "We choose materials that hold up and engraving methods that stay sharp for years.",
  },
  {
    title: "Rooted Locally",
    desc: "Based in Lewiston, Maine, serving New England and beyond. Small business supporting small businesses.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cosmic-hero overflow-hidden">
        <div className="star-field" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-violet/5 rounded-full blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">About</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-[1.1] mb-6">
              Small Workshop.<br />
              <span className="text-violet">Serious Craft.</span>
            </h1>
            <p className="text-lg text-cream-dim leading-relaxed max-w-2xl mx-auto">
              Ghostly Engraving started with a simple idea: personalized products
              should feel as premium as they are personal. Every piece that
              leaves our workshop carries that standard.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-square rounded-xl overflow-hidden card-surface">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-violet/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M16 2C10 2 6 7 6 13c0 3 1 5 2 7 0 2-1 4-1 6 0 2 1 3 3 3h2c1 0 2-1 2-2v-1h6v1c0 1 1 2 2 2h2c2 0 3-1 3-3 0-2-1-4-1-6 1-2 2-4 2-7 0-6-4-11-10-11z" />
                    </svg>
                    <p className="text-xs text-cream-dim/40 uppercase tracking-widest">Workshop Photo</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-6">Our Story</p>
              <div className="space-y-5 text-cream-dim leading-relaxed">
                <p>
                  Ghostly Engraving LLC is a custom laser engraving workshop
                  based in Lewiston, Maine. We specialize in personalized gifts,
                  branded products, and one-of-a-kind keepsakes crafted with
                  precision and care.
                </p>
                <p>
                  What started as a passion for making things by hand has grown
                  into a full-service engraving operation. From individual gifts
                  to bulk business orders, we bring the same attention to detail
                  to every piece.
                </p>
                <p>
                  We work with wood, metal, acrylic, glass, slate, and leather.
                  Whether it&apos;s a personalized cutting board for a wedding, a set
                  of branded tumblers for a real estate team, or a memorial
                  keepsake for a family, we treat every order like it matters.
                  Because it does.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 lg:py-36 bg-charcoal/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Values</p>
              <h2 className="font-serif text-3xl md:text-4xl text-cream">
                What Drives the Work
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 100}>
                <div className="card-surface rounded-xl p-7">
                  <h3 className="font-serif text-lg text-cream mb-3">{v.title}</h3>
                  <p className="text-sm text-cream-dim leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: "100%", label: "Recommend Rate" },
                { num: "6+", label: "Material Types" },
                { num: "ME", label: "Made in Maine" },
                { num: "24hr", label: "Quote Response" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-violet">{stat.num}</p>
                  <p className="text-xs text-cream-dim uppercase tracking-widest mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet/10 via-violet/15 to-violet/10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-cream mb-6">
              Let&apos;s Make Something Together
            </h2>
            <p className="text-cream-dim mb-8">
              Have a project in mind? We&apos;d love to hear about it.
            </p>
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
