'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2,
  Sparkles,
  Lock,
  Heart,
  Eye,
  Clock,
  MessageSquare,
  ArrowRight,
  Star,
} from 'lucide-react'
import TrustCards from '@/components/TrustCard'
import StatCard from '@/components/StatCard'
import ServiceCard from '@/components/ServiceCard'
import TestimonialCard from '@/components/TestimonialCard'
import FAQAccordion from '@/components/FAQAccordion'
import JournalCard from '@/components/JournalCard'
import CTASection from '@/components/CTASection'
import SectionHeading from '@/components/SectionHeading'
import CTAButton from '@/components/CTAButton'
import { business } from '@/content/business'
import { services } from '@/content/services'
import { faqs } from '@/content/faqs'
import { testimonials } from '@/content/testimonials'
import { journalPosts } from '@/content/journal'

const whyElectrolysis = [
  {
    icon: CheckCircle2,
    title: 'The Only Permanent Method',
    description:
      'Electrolysis is FDA-recognized as the only permanently effective hair removal method. Every other option — laser, waxing, threading — provides temporary or reduced regrowth at best.',
  },
  {
    icon: Sparkles,
    title: 'Works on All Hair Colors',
    description:
      'Laser targets pigment, which means it doesn\'t work on grey, blonde, red, or fine hair. Electrolysis treats each follicle directly — no pigment required.',
  },
  {
    icon: Heart,
    title: 'All Skin Tones Welcome',
    description:
      'Laser carries risk of hyperpigmentation on darker skin and doesn\'t work reliably across all tones. Electrolysis is effective and safe for every skin type.',
  },
  {
    icon: Eye,
    title: 'Precision for Any Area',
    description:
      'For detailed areas like eyebrows, upper lip, or sensitive regions, electrolysis offers a precision that broad-spectrum laser simply cannot match.',
  },
]

const whyChooseUs = [
  {
    icon: Lock,
    title: 'Private, One-on-One Care',
    description: 'Every session is with Ruth — not a rotating staff. Your space, your privacy, your care.',
  },
  {
    icon: MessageSquare,
    title: 'Honest Communication',
    description: 'Ruth tells you what to expect from the start — realistic timelines, clear pricing, no upsells.',
  },
  {
    icon: Heart,
    title: 'Inclusive by Design',
    description: 'All clients welcome — regardless of gender, background, or why you\'re here.',
  },
  {
    icon: Eye,
    title: 'Detail-Focused Approach',
    description: 'Careful, methodical work that respects your skin and your time in every session.',
  },
  {
    icon: Clock,
    title: 'Thoughtful Planning',
    description: 'Your treatment plan is built for your goals and your biology — not a one-size protocol.',
  },
  {
    icon: Star,
    title: 'Licensed & Credentialed',
    description: 'State-licensed in Maine. AEA member. Adherent to professional standards of care.',
  },
]

const homepageFAQs = faqs.slice(0, 5)
const featuredTestimonials = testimonials.filter((t) => t.featured)
const featuredPosts = journalPosts.filter((p) => p.featured).slice(0, 3)
const previewServices = services.slice(0, 6)

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-[88vh] flex items-center">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
        />
        {/* Soft decorative shape */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blush-light/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-sage/10 blur-3xl pointer-events-none" />

        <div className="container-site py-20 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <p className="label-text mb-4">Waterville, Maine</p>
                <div className="h-px w-10 bg-rose mb-7" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.4, 0, 0.2, 1] }}
                className="text-display font-serif font-normal text-charcoal text-balance mb-6 leading-[1.05]"
              >
                Permanent Hair Removal,{' '}
                <em className="font-light text-rose-dark not-italic">Done Right</em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28, ease: [0.4, 0, 0.2, 1] }}
                className="body-lead text-warm-gray mb-8 max-w-[480px]"
              >
                State-licensed electrolysis in central Maine. Safe, proven, genuinely permanent — for every hair color, skin tone, and treatment area. Private care with Ruth Swanson.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <CTAButton href="/contact" variant="primary" size="lg" arrow>
                  Book Free Consultation
                </CTAButton>
                <CTAButton href="/services" variant="ghost" size="lg">
                  View Services
                </CTAButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 pt-8 border-t border-parchment/60"
              >
                {[
                  'Free Consultation',
                  'All Skin & Hair Types',
                  'State Licensed',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 size={13} strokeWidth={2} className="text-rose flex-none" />
                    <span className="font-sans text-xs text-warm-gray">{item}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-elevated aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85"
                  alt="Professional skincare treatment — calm, warm studio setting"
                  fill
                  priority
                  sizes="(max-width: 1200px) 50vw, 560px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>
              {/* Floating credential badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
                className="absolute -bottom-5 -left-6 bg-ivory rounded-2xl shadow-elevated px-5 py-4 border border-parchment/60"
              >
                <p className="font-sans text-[0.65rem] font-500 tracking-[0.12em] uppercase text-mist mb-0.5">Licensed in Maine</p>
                <p className="font-serif text-base text-charcoal">State Licensed · AEA Member</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST CARDS ── */}
      <TrustCards />

      {/* ── ABOUT SUMMARY ── */}
      <section className="section-padding bg-ivory" aria-label="About Ruth Swanson">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
                  alt="Calm professional care environment, warm neutral tones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-blush-light/60 blur-2xl pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <SectionHeading
                label="About Ruth"
                title="Skilled Electrolysis, Practiced with Care"
                subtitle="Ruth Swanson is a state-licensed electrologist based in Waterville, Maine. She works with each client individually — taking time to understand your goals, explain the process honestly, and build a plan that fits your situation."
              />
              <p className="font-sans text-[0.9rem] font-300 text-warm-gray leading-relaxed mb-6">
                Every appointment is one-on-one and private. Whether you&apos;re managing hormonal hair growth, looking for a permanent alternative to waxing, or working toward a larger treatment goal, Ruth brings the same approach to each client: clear communication, careful technique, and respect for your privacy.
              </p>
              <p className="font-sans text-[0.9rem] font-300 text-warm-gray leading-relaxed mb-8">
                Her practice has served clients from across central Maine for years — people of all backgrounds, ages, and goals. Everyone is treated the same way.
              </p>
              <CTAButton href="/about" variant="outline" arrow>
                About Ruth
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-gradient-parchment py-14 md:py-20 border-y border-parchment/60">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {business.stats.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section-padding bg-ivory" aria-label="Services overview">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              label="Services"
              title="What We Treat"
              subtitle="Facial, body, and specialty electrolysis — built around your goals."
              className="mb-0"
            />
            <CTAButton href="/services" variant="ghost" arrow className="flex-none self-start md:self-auto">
              All Services
            </CTAButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewServices.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ELECTROLYSIS ── */}
      <section className="section-padding bg-gradient-parchment" aria-label="Why electrolysis is different">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="The Method"
                title="Why Electrolysis Is Different"
                subtitle="There are many ways to remove hair. There is only one that is genuinely permanent."
              />
              <div className="space-y-6">
                {whyElectrolysis.map((item) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                      className="flex gap-4"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blush-light flex items-center justify-center flex-none mt-0.5">
                        <Icon size={16} strokeWidth={1.5} className="text-rose" />
                      </div>
                      <div>
                        <h3 className="font-serif text-heading-sm text-charcoal mb-1">{item.title}</h3>
                        <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className="mt-8">
                <CTAButton href="/journal/understanding-permanent-hair-removal" variant="ghost" arrow>
                  How Electrolysis Works
                </CTAButton>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
                  alt="Close-up of clear, healthy skin in warm natural light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute top-5 -right-4 bg-ivory rounded-xl shadow-card px-4 py-3 border border-parchment/60 max-w-[200px]">
                <p className="font-serif text-sm italic text-warm-gray leading-relaxed">
                  &ldquo;The only FDA-recognized permanent method.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section-padding bg-ivory" aria-label="What sets this practice apart">
        <div className="container-site">
          <SectionHeading
            label="The Practice"
            title="What Sets This Practice Apart"
            subtitle="Good electrolysis is precise and patient work. These are the things that actually matter."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyChooseUs.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className="bg-ivory-200 rounded-2xl p-6 border border-parchment/50"
                >
                  <div className="w-9 h-9 rounded-lg bg-ivory flex items-center justify-center mb-4 shadow-soft">
                    <Icon size={16} strokeWidth={1.5} className="text-rose" />
                  </div>
                  <h3 className="font-serif text-heading-sm text-charcoal mb-2">{item.title}</h3>
                  <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding bg-gradient-parchment" aria-label="Client testimonials">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              label="Client Voices"
              title="In Their Words"
              className="mb-0"
            />
            <CTAButton href="/testimonials" variant="ghost" arrow className="flex-none self-start md:self-auto">
              All Testimonials
            </CTAButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredTestimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ── */}
      <section className="section-padding bg-charcoal relative overflow-hidden" aria-label="What to expect from treatment">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23FAF8F4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
        <div className="container-site relative z-10">
          <SectionHeading
            label="The Process"
            title="What to Expect"
            align="center"
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Free Consultation', desc: 'Meet with Ruth to discuss your goals and get a clear, honest treatment plan — no charge, no commitment.' },
              { step: '02', title: 'First Session', desc: 'Short, focused treatment in the area you want to start with. Ruth works at a pace that keeps you comfortable.' },
              { step: '03', title: 'Ongoing Sessions', desc: 'Regular appointments spaced to catch each follicle in its active growth phase. Progress builds with every visit.' },
              { step: '04', title: 'Permanent Results', desc: 'Treated follicles are gone for good. The timeline varies, but the outcome — when completed — is permanent.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                className="text-center"
              >
                <p className="font-serif text-5xl font-light text-rose/30 mb-3">{item.step}</p>
                <h3 className="font-serif text-lg text-ivory mb-2">{item.title}</h3>
                <p className="font-sans text-sm font-300 text-mist/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="section-padding bg-ivory" aria-label="Frequently asked questions">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <SectionHeading
                label="FAQ"
                title="Common Questions"
                subtitle="Straightforward answers to what people ask most often."
              />
              <CTAButton href="/faq" variant="ghost" arrow>
                All Questions
              </CTAButton>
            </div>
            <div className="lg:col-span-3">
              <FAQAccordion faqs={homepageFAQs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── JOURNAL PREVIEW ── */}
      <section className="section-padding bg-ivory-200" aria-label="Journal preview">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              label="Journal"
              title="From the Studio"
              subtitle="Honest information about electrolysis and the care process."
              className="mb-0"
            />
            <CTAButton href="/journal" variant="ghost" arrow className="flex-none self-start md:self-auto">
              All Articles
            </CTAButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPosts.map((post, i) => (
              <JournalCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTASection
        title="Your First Consultation Is Free"
        subtitle="No pressure, no obligation — just a clear, honest conversation about what electrolysis can do for you. Ruth sees every new client personally."
        primaryLabel="Schedule Your Consultation"
        primaryHref="/contact"
      />
    </>
  )
}
