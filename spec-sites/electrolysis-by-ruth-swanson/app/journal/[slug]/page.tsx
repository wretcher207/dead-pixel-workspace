import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react'
import CTASection from '@/components/CTASection'
import CTAButton from '@/components/CTAButton'
import JournalCard from '@/components/JournalCard'
import { journalPosts } from '@/content/journal'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = journalPosts.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  }
}

export default function JournalPostPage({ params }: PageProps) {
  const post = journalPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const postIndex = journalPosts.indexOf(post)
  const prevPost = postIndex > 0 ? journalPosts[postIndex - 1] : null
  const nextPost = postIndex < journalPosts.length - 1 ? journalPosts[postIndex + 1] : null
  const relatedPosts = journalPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Ruth Swanson',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Electrolysis by Ruth Swanson',
    },
    keywords: post.tags.join(', '),
  }

  // Convert markdown-ish content to simple paragraphs
  const paragraphs = post.content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      {/* Article Hero */}
      <div className="bg-gradient-warm border-b border-parchment/60">
        <div className="container-site pt-12 pb-8">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 font-sans text-xs font-500 tracking-[0.07em] uppercase text-mist hover:text-charcoal transition-colors duration-150 mb-8"
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Back to Journal
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="label-text text-[0.65rem]">{post.category}</span>
              <span className="text-parchment">·</span>
              <span className="flex items-center gap-1 font-sans text-xs text-mist">
                <Clock size={11} strokeWidth={1.5} />
                {post.readingTime}
              </span>
              <span className="text-parchment">·</span>
              <time className="font-sans text-xs text-mist" dateTime={post.publishedAt}>
                {formattedDate}
              </time>
            </div>
            <h1 className="font-serif text-display-md text-charcoal mb-5 text-balance leading-tight">
              {post.title}
            </h1>
            <p className="body-lead text-warm-gray text-balance">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="bg-ivory-200">
        <div className="container-site py-0">
          <div className="relative aspect-[21/9] rounded-b-2xl overflow-hidden shadow-card max-h-[460px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Body */}
      <article className="section-padding bg-ivory" aria-label={post.title}>
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <div className="prose-content font-sans">
              {paragraphs.map((para, i) => {
                if (para.startsWith('## ')) {
                  return (
                    <h2 key={i} className="font-serif text-2xl text-charcoal mt-10 mb-4 leading-tight">
                      {para.replace('## ', '')}
                    </h2>
                  )
                }
                if (para.startsWith('# ')) {
                  return (
                    <h1 key={i} className="font-serif text-3xl text-charcoal mt-12 mb-5 leading-tight">
                      {para.replace('# ', '')}
                    </h1>
                  )
                }
                if (para.startsWith('**') && para.endsWith('**')) {
                  return (
                    <p key={i} className="font-sans text-sm font-500 text-charcoal my-3">
                      {para.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                return (
                  <p key={i} className="font-sans text-[0.9375rem] font-300 text-warm-gray leading-[1.85] my-4">
                    {para}
                  </p>
                )
              })}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-parchment/60">
                <Tag size={13} strokeWidth={1.5} className="text-mist" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-xs font-400 text-warm-gray bg-ivory-200 px-3 py-1 rounded-full border border-parchment/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Note */}
            <div className="mt-10 bg-ivory-200 rounded-2xl border border-parchment/60 p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blush-light flex items-center justify-center flex-none">
                <span className="font-sans text-xs font-500 text-rose-dark">RS</span>
              </div>
              <div>
                <p className="font-sans text-xs font-500 text-charcoal mb-1">Ruth Swanson</p>
                <p className="font-sans text-xs font-300 text-warm-gray leading-relaxed">
                  State-licensed electrologist in Waterville, Maine. Questions about this article or your own situation?{' '}
                  <Link href="/contact" className="text-rose hover:underline">
                    Get in touch
                  </Link>{' '}
                  — the consultation is free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Prev / Next */}
      <div className="bg-ivory-200 border-y border-parchment/60 py-8">
        <div className="container-site flex flex-col sm:flex-row justify-between gap-5">
          {prevPost ? (
            <Link href={`/journal/${prevPost.slug}`} className="group flex items-start gap-3">
              <ArrowLeft size={16} strokeWidth={1.5} className="text-mist group-hover:text-charcoal mt-1 transition-colors" />
              <div>
                <p className="font-sans text-[0.65rem] font-500 tracking-[0.12em] uppercase text-mist mb-1">Previous</p>
                <p className="font-serif text-base text-charcoal group-hover:text-rose-dark transition-colors leading-tight">
                  {prevPost.title}
                </p>
              </div>
            </Link>
          ) : <div />}
          {nextPost && (
            <Link href={`/journal/${nextPost.slug}`} className="group flex items-start gap-3 sm:text-right sm:flex-row-reverse">
              <ArrowRight size={16} strokeWidth={1.5} className="text-mist group-hover:text-charcoal mt-1 transition-colors" />
              <div>
                <p className="font-sans text-[0.65rem] font-500 tracking-[0.12em] uppercase text-mist mb-1">Next</p>
                <p className="font-serif text-base text-charcoal group-hover:text-rose-dark transition-colors leading-tight">
                  {nextPost.title}
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-ivory" aria-label="Related articles">
          <div className="container-site">
            <p className="label-text mb-8">Related Articles</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((rp, i) => (
                <JournalCard key={rp.slug} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Have a Question After Reading?"
        subtitle="Book a free consultation and ask Ruth directly. She answers everything clearly, before you commit to anything."
        primaryLabel="Book Free Consultation"
        variant="warm"
      />
    </>
  )
}
