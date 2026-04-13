'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { type JournalPost } from '@/content/journal'

interface JournalCardProps {
  post: JournalPost
  index?: number
  variant?: 'default' | 'horizontal'
}

export default function JournalCard({ post, index = 0, variant = 'default' }: JournalCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="group bg-ivory border border-parchment/60 rounded-2xl overflow-hidden shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <Link href={`/journal/${post.slug}`} className="block relative overflow-hidden" tabIndex={-1} aria-hidden="true">
        <div className="aspect-[16/9] bg-ivory-200 relative overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-charcoal/5 group-hover:bg-charcoal/10 transition-colors duration-300" />
        </div>
      </Link>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="label-text text-[0.65rem]">{post.category}</span>
          <span className="text-parchment">·</span>
          <span className="flex items-center gap-1 font-sans text-xs text-mist">
            <Clock size={11} strokeWidth={1.5} />
            {post.readingTime}
          </span>
        </div>
        <Link href={`/journal/${post.slug}`} className="flex-1">
          <h3 className="font-serif text-heading-sm text-charcoal leading-snug mb-3 group-hover:text-rose-dark transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed mb-5 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-parchment/60">
          <time className="font-sans text-xs text-mist" dateTime={post.publishedAt}>
            {formattedDate}
          </time>
          <Link
            href={`/journal/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-sans text-xs font-500 tracking-[0.06em] uppercase text-rose hover:text-rose-dark transition-colors duration-150 group/link"
            aria-label={`Read: ${post.title}`}
          >
            Read
            <ArrowRight size={12} strokeWidth={2} className="group-hover/link:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
