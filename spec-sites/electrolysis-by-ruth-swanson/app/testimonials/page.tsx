import type { Metadata } from 'next'
import { Quote } from 'lucide-react'
import PageHero from '@/components/PageHero'
import CTASection from '@/components/CTASection'
import TestimonialCard from '@/components/TestimonialCard'
import CTAButton from '@/components/CTAButton'
import { testimonials } from '@/content/testimonials'

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'What clients say about Electrolysis by Ruth Swanson — permanent hair removal in Waterville, Maine.',
}

const featured = testimonials.filter((t) => t.featured)
const rest = testimonials.filter((t) => !t.featured)

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        label="Client Voices"
        title="What People Are Saying"
        subtitle="Real feedback from clients who have been through the process. Unedited, unembellished."
      />

      {/* Pull quote */}
      <section className="bg-gradient-parchment border-b border-parchment/60 py-14">
        <div className="container-site">
          <div className="max-w-2xl mx-auto text-center">
            <Quote size={32} strokeWidth={1} className="text-blush mx-auto mb-5" fill="currentColor" />
            <blockquote className="font-serif text-2xl md:text-3xl font-light italic text-charcoal leading-relaxed mb-5">
              &ldquo;Ruth made the process feel comfortable and straightforward from day one.&rdquo;
            </blockquote>
            <p className="font-sans text-sm text-mist">— Sarah M., Waterville, ME</p>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-ivory">
        <div className="container-site">
          <p className="label-text mb-6">Featured</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {featured.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} variant="featured" />
            ))}
          </div>

          {/* All */}
          <p className="label-text mb-6">More Clients</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust note */}
      <section className="bg-ivory-200 border-y border-parchment/60 py-12">
        <div className="container-site max-w-xl mx-auto text-center">
          <p className="font-serif text-lg text-charcoal mb-3 italic">
            Results vary. Every client&apos;s treatment plan and timeline is different.
          </p>
          <p className="font-sans text-sm font-300 text-warm-gray">
            These testimonials reflect individual experiences. Ruth will give you an honest, personalized assessment at your free consultation.
          </p>
        </div>
      </section>

      <CTASection
        title="Ready to Find Out What Electrolysis Can Do for You?"
        subtitle="Start with a free, no-pressure consultation. Ruth will give you a straightforward picture of what treatment looks like for your specific situation."
        primaryLabel="Book Free Consultation"
      />
    </>
  )
}
