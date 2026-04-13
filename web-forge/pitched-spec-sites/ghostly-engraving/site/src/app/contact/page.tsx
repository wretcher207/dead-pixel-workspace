"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const contactMethods = [
  {
    label: "Email",
    value: "hello@ghostlyengraving.com",
    href: "mailto:hello@ghostlyengraving.com",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "(207) 907-8687",
    href: "tel:+12079078687",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Lewiston, ME 04240",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/GhostlyEngraving",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ghostlyengravingllc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-cosmic-hero overflow-hidden">
        <div className="star-field" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet/5 rounded-full blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Contact</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream font-semibold leading-[1.1] mb-6">
              Let&apos;s Talk About<br />
              <span className="text-violet">Your Project.</span>
            </h1>
            <p className="text-lg text-cream-dim leading-relaxed max-w-2xl mx-auto">
              Have an idea for a custom piece? Need a quote for a bulk order?
              Just curious about what we can do? Reach out.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Sidebar */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="space-y-8">
                  {contactMethods.map((method) => (
                    <div key={method.label} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet/8 border border-violet/15 flex items-center justify-center text-lilac shrink-0">
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.15em] text-cream-dim mb-1">
                          {method.label}
                        </p>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-sm text-cream hover:text-violet transition-colors"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-sm text-cream">{method.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Service area */}
                <div className="mt-10 p-5 rounded-xl bg-violet/5 border border-violet/10">
                  <p className="text-xs uppercase tracking-[0.15em] text-violet mb-2">
                    Service Area
                  </p>
                  <p className="text-sm text-cream-dim leading-relaxed">
                    Based in Lewiston, Maine. Serving New Hampshire, Maine,
                    Massachusetts, and shipping nationwide.
                  </p>
                </div>

                {/* Social */}
                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.15em] text-cream-dim mb-4">
                    Follow Us
                  </p>
                  <div className="flex gap-4">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-violet/8 border border-violet/15 flex items-center justify-center text-cream-dim hover:text-violet hover:border-violet/30 transition-all"
                        aria-label={s.name}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="mt-10">
                  <p className="text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                    Response Time
                  </p>
                  <p className="text-sm text-cream-dim">
                    We respond to all inquiries within 24 hours. Most quotes are
                    delivered same day.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={100}>
                <form
                  className="card-surface rounded-xl p-8 border border-violet/15"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <h2 className="font-serif text-2xl text-cream mb-8">
                    Send Us a Message
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                        Name *
                      </label>
                      <input type="text" className="form-input" placeholder="Your name" required />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                        Email *
                      </label>
                      <input type="email" className="form-input" placeholder="your@email.com" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                        Phone
                      </label>
                      <input type="tel" className="form-input" placeholder="(207) 555-0000" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                        Subject *
                      </label>
                      <select className="form-input" required>
                        <option value="">What&apos;s this about?</option>
                        <option>Custom Order Inquiry</option>
                        <option>Business / Bulk Order</option>
                        <option>General Question</option>
                        <option>Existing Order</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                      Message *
                    </label>
                    <textarea
                      className="form-input min-h-[160px] resize-y"
                      placeholder="Tell us about your project, what you're looking for, any deadlines or special requirements..."
                      required
                    />
                  </div>

                  <div className="mt-5">
                    <label className="block text-xs uppercase tracking-[0.15em] text-cream-dim mb-2">
                      Attach Files <span className="text-cream-dim/40">(optional)</span>
                    </label>
                    <div className="border border-dashed border-violet/20 rounded-lg p-6 text-center cursor-pointer hover:border-violet/40 transition-colors">
                      <svg className="w-8 h-8 text-violet/40 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                      </svg>
                      <p className="text-sm text-cream-dim">
                        Drag files here or{" "}
                        <span className="text-violet underline">browse</span>
                      </p>
                      <p className="text-xs text-cream-dim/50 mt-1">
                        Images, logos, sketches up to 10MB
                      </p>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full mt-8 text-center">
                    Send Message
                  </button>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
