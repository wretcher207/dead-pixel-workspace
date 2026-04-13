'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Menu, X } from 'lucide-react'
import { business, nav } from '@/content/business'
import { cn } from '@/lib/utils'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Top Bar */}
      <div className="hidden md:block bg-charcoal text-mist text-xs py-2">
        <div className="container-site flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href={`tel:${business.phone}`}
              className="flex items-center gap-1.5 hover:text-blush transition-colors duration-200"
            >
              <Phone size={11} strokeWidth={1.5} />
              <span className="font-sans font-normal tracking-wide">{business.phoneFormatted}</span>
            </a>
            <span className="text-charcoal-lighter">|</span>
            <a
              href={business.address.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blush transition-colors duration-200"
            >
              <MapPin size={11} strokeWidth={1.5} />
              <span className="font-sans tracking-wide">{business.address.city}, {business.address.state}</span>
            </a>
          </div>
          <p className="font-sans text-mist/80 tracking-wide">By Appointment — New Clients Welcome</p>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-ivory/96 backdrop-blur-md shadow-soft border-b border-parchment/60'
            : 'bg-ivory/98'
        )}
      >
        <nav className="container-site flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none">
            <span className="font-serif text-xl md:text-2xl font-normal text-charcoal tracking-tight group-hover:text-rose-dark transition-colors duration-200">
              Electrolysis
            </span>
            <span className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-mist font-500 -mt-0.5">
              by Ruth Swanson
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-sans text-[0.8rem] font-500 tracking-[0.06em] uppercase transition-colors duration-200',
                  pathname === item.href
                    ? 'text-rose'
                    : 'text-warm-gray hover:text-charcoal'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 bg-charcoal text-ivory font-sans text-[0.75rem] font-500 tracking-[0.08em] uppercase px-5 py-2.5 rounded-full hover:bg-rose-dark transition-colors duration-200"
            >
              Book Consultation
            </a>
            <a
              href="/contact"
              className="hidden sm:inline-flex md:hidden items-center bg-charcoal text-ivory font-sans text-[0.75rem] font-500 tracking-[0.08em] uppercase px-4 py-2 rounded-full hover:bg-rose-dark transition-colors duration-200"
            >
              Book
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-parchment transition-colors duration-200"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={20} className="text-charcoal" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
              className="fixed right-0 top-0 h-full w-[min(320px,90vw)] bg-ivory z-50 shadow-elevated flex flex-col lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-parchment">
                <Link href="/" className="font-serif text-lg text-charcoal" onClick={() => setMobileOpen(false)}>
                  Electrolysis <span className="text-mist font-sans text-xs tracking-wider">by Ruth Swanson</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-parchment transition-colors"
                  aria-label="Close menu"
                >
                  <X size={18} className="text-charcoal" strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-col py-8 px-6 gap-1" aria-label="Mobile navigation">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.22 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block font-sans text-base font-400 py-3 border-b border-parchment/60 transition-colors duration-150',
                        pathname === item.href ? 'text-rose' : 'text-charcoal hover:text-rose'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-6 pb-8 mt-auto">
                <a
                  href="/contact"
                  className="flex items-center justify-center w-full bg-charcoal text-ivory font-sans text-sm font-500 tracking-[0.08em] uppercase py-3.5 rounded-full hover:bg-rose-dark transition-colors duration-200"
                >
                  Book a Free Consultation
                </a>
                <a
                  href={`tel:${business.phone}`}
                  className="flex items-center justify-center gap-2 mt-3 text-warm-gray font-sans text-sm"
                >
                  <Phone size={14} strokeWidth={1.5} />
                  {business.phoneFormatted}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
