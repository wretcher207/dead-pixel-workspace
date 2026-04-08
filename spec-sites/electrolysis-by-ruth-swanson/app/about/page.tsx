import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, Award, Shield, Heart, BookOpen, Users } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import SectionHeading from '@/components/SectionHeading'
import CTAButton from '@/components/CTAButton'
import { business } from '@/content/business'

export const metadata: Metadata = {
  title: 'About Ruth Swanson',
  description: `Meet Ruth Swanson — state-licensed electrologist in Waterville, Maine. Learn about her approach to permanent hair removal and her commitment to personal, professional care.`,
}

const values = [
  {
    icon: Heart,
    title: 'Client-Centered',
    description: 'Every decision in the treatment plan is made with your comfort, goals, and wellbeing in mind — not a schedule or quota.',
  },
  {
    icon: Shield,
    title: 'Professional Standards',
    description: 'State licensed. AEA member. Adherent to the American Electrology Association\'s infection prevention and ethics standards.',
  },
  {
    icon: BookOpen,
    title: 'Honest Information',
    description: 'Ruth explains the process clearly, sets realistic expectations, and tells you what to expect before you commit to anything.',
  },
  {
    icon: Users,
    title: 'Genuinely Inclusive',
    description: 'All clients are welcome — regardless of gender, background, skin tone, or why they\'re seeking treatment. No assumptions.',
  },
  {
    icon: Award,
    title: 'Detail-Focused Work',
    description: 'Electrolysis is precise, patient work. Ruth approaches each session with the care that permanent results require.',
  },
  {
    icon: CheckCircle2,
    title: 'Discreet & Private',
    description: 'One-on-one appointments. Private setting. Your visit is your own.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title="Professional Care, Quietly Done"
        subtitle="Ruth Swanson is a state-licensed electrologist serving central Maine with focused, personal, permanent hair removal."
      />

      {/* Story */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card">
                <Image
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80"
                  alt="Professional electrolysis care in Waterville, Maine"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-ivory rounded-2xl shadow-elevated border border-parchment/60 px-6 py-5">
                <p className="font-sans text-[0.65rem] font-500 tracking-[0.14em] uppercase text-mist mb-1">Location</p>
                <p className="font-serif text-base text-charcoal">262 Main St, Waterville, ME</p>
              </div>
            </div>

            <div>
              <SectionHeading
                label="The Practice"
                title="Permanent Hair Removal in Waterville, Maine"
              />
              <div className="space-y-5 text-[0.9rem] font-sans font-300 text-warm-gray leading-relaxed">
                <p>
                  Ruth Swanson has been providing electrolysis services in central Maine for years — building a practice known for honest communication, careful work, and results that hold up over time.
                </p>
                <p>
                  Her approach is straightforward: understand what each client wants, build a realistic plan, and follow through with consistent, professional care. She sees clients one-on-one. She takes questions seriously. She explains what to expect before charging for anything.
                </p>
                <p>
                  The practice uses both Shortwave (Thermolysis) and Blend methods, allowing Ruth to match the treatment modality to each client&apos;s hair type, skin sensitivity, and area being treated — rather than applying a single approach to every situation.
                </p>
                <p>
                  Ruth is state licensed in Maine and a member of the American Electrology Association, adhering to the AEA&apos;s Infection Prevention Standards and Code of Ethics and Standards of Practice.
                </p>
              </div>
              <div className="mt-8 flex gap-3">
                <CTAButton href="/contact" variant="primary" arrow>
                  Book Consultation
                </CTAButton>
                <CTAButton href="/services" variant="ghost">
                  Services
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory-200">
        <div className="container-site">
          <SectionHeading
            label="How I Work"
            title="What You Can Expect from Every Visit"
            subtitle="These aren't aspirational statements — they're the standard Ruth holds herself to with every client."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon
              return (
                <div key={v.title} className="bg-ivory rounded-2xl p-6 border border-parchment/60 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-blush-light flex items-center justify-center mb-4">
                    <Icon size={18} strokeWidth={1.5} className="text-rose" />
                  </div>
                  <h3 className="font-serif text-heading-sm text-charcoal mb-2">{v.title}</h3>
                  <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed">{v.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <SectionHeading
              label="Credentials"
              title="Training & Professional Standards"
              align="center"
            />
            <div className="bg-ivory-200 rounded-2xl border border-parchment/60 p-8">
              <ul className="space-y-4">
                {business.credentials.map((cred) => (
                  <li key={cred} className="flex items-center gap-3">
                    <CheckCircle2 size={16} strokeWidth={1.5} className="text-rose flex-none" />
                    <span className="font-sans text-sm font-400 text-charcoal">{cred}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-parchment/60">
                <p className="font-sans text-xs font-300 text-mist leading-relaxed">
                  Specific training dates, CPE status, and additional credentials are placeholders in this spec site — update with verified details before going live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Have a Conversation?"
        subtitle="Ruth is happy to answer questions before you commit to anything. The consultation is free, and there's no pressure to book treatment."
        primaryLabel="Book Free Consultation"
        variant="warm"
      />
    </>
  )
}
