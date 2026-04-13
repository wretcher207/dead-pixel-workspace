import { motion } from 'framer-motion'
import { getIcon } from '../data/icons'
import { siteConfig } from '../data/site'
import { fadeInUp, RevealSection } from './Reveal'

function Contact() {
  const { contactSection } = siteConfig

  return (
    <RevealSection
      id="contact"
      className="scroll-mt-32 bg-foreground py-20 text-background md:py-28 lg:py-32"
    >
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={fadeInUp}>
            <div className="section-bar bg-accent" />
            <p className="font-mono text-xs uppercase tracking-widerest text-accent md:text-sm">
              {contactSection.label}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-bold uppercase leading-none tracking-tighter md:text-5xl lg:text-6xl">
              {contactSection.title}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-background/72 md:text-lg">
              {contactSection.description}
            </p>

            <div className="mt-10 space-y-5">
              {contactSection.items.map((item) => {
                const Icon = getIcon(item.icon)
                const content = (
                  <>
                    <Icon size={20} strokeWidth={1.5} className="text-accent" />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widerest text-background/55">
                        {item.label}
                      </p>
                      <p className="mt-2 text-lg leading-snug text-background">{item.value}</p>
                    </div>
                  </>
                )

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-start gap-4 border-b border-background/15 pb-5 transition-colors duration-150 ease-editorial hover:text-accent"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-start gap-4 border-b border-background/15 pb-5">
                    {content}
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            onSubmit={(event) => event.preventDefault()}
            className="border border-background/20 p-6 md:p-8"
          >
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-widerest text-background/55">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="h-12 w-full border border-background/30 bg-transparent px-4 text-base text-background placeholder:text-background/50 focus-visible:border-accent focus-visible:ring-accent focus-visible:ring-offset-foreground md:h-14"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-widerest text-background/55">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="h-12 w-full border border-background/30 bg-transparent px-4 text-base text-background placeholder:text-background/50 focus-visible:border-accent focus-visible:ring-accent focus-visible:ring-offset-foreground md:h-14"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-widerest text-background/55">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="w-full border border-background/30 bg-transparent px-4 py-3 text-base text-background placeholder:text-background/50 focus-visible:border-accent focus-visible:ring-accent focus-visible:ring-offset-foreground"
                  placeholder="Tell us a bit about the project or work you need done."
                />
              </div>
              <div className="flex items-center justify-between gap-5 pt-2">
                <p className="max-w-xs font-mono text-[11px] uppercase tracking-wider text-background/55">
                  {contactSection.formNote}
                </p>
                <button type="submit" className="inline-flex min-h-11 items-center justify-center border border-background px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-background transition-all duration-150 ease-editorial hover:bg-background hover:text-foreground active:translate-y-px focus-visible:ring-offset-foreground">
                  {contactSection.buttonLabel}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </RevealSection>
  )
}

export default Contact
