import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import JournalCard from '@/components/JournalCard'
import CTASection from '@/components/CTASection'
import { journalPosts } from '@/content/journal'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Honest information about electrolysis, permanent hair removal, and what to expect — from the studio of Ruth Swanson in Waterville, Maine.',
}

const featured = journalPosts.filter((p) => p.featured)
const rest = journalPosts.filter((p) => !p.featured)

export default function JournalPage() {
  return (
    <>
      <PageHero
        label="Journal"
        title="From the Studio"
        subtitle="Practical information about electrolysis — how it works, what to expect, and how to make the most of your treatment."
      />

      <section className="section-padding bg-ivory">
        <div className="container-site">
          {featured.length > 0 && (
            <>
              <p className="label-text mb-6">Featured</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
                {featured.map((post, i) => (
                  <JournalCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </>
          )}
          {rest.length > 0 && (
            <>
              <p className="label-text mb-6">More Articles</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((post, i) => (
                  <JournalCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTASection
        title="Questions Not Covered Here?"
        subtitle="Bring them to your free consultation. Ruth answers everything directly — no charge, no obligation."
        primaryLabel="Book Free Consultation"
        variant="warm"
      />
    </>
  )
}
