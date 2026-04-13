import Link from 'next/link'
import CTAButton from '@/components/CTAButton'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-ivory">
      <div className="text-center container-site py-20">
        <p className="font-sans text-xs font-500 tracking-[0.16em] uppercase text-rose mb-4">404</p>
        <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-5">Page Not Found</h1>
        <p className="font-sans text-base font-300 text-warm-gray mb-8 max-w-sm mx-auto">
          This page doesn&apos;t exist. Try one of the links below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <CTAButton href="/" variant="primary">Home</CTAButton>
          <CTAButton href="/services" variant="ghost">Services</CTAButton>
          <CTAButton href="/contact" variant="ghost">Contact</CTAButton>
        </div>
      </div>
    </div>
  )
}
