import Link from 'next/link'
import { Phone, MapPin, Mail, Instagram, Facebook } from 'lucide-react'
import { business } from '@/content/business'

const footerLinks = {
  services: [
    { label: 'Free Consultation', href: '/services#consultation' },
    { label: 'Facial Electrolysis', href: '/services#facial' },
    { label: 'Body Electrolysis', href: '/services#body' },
    { label: 'Sensitive Areas', href: '/services#specialty' },
    { label: 'Gender-Affirming Care', href: '/services#gender-affirming' },
    { label: 'Treatment Plans', href: '/services#ongoing' },
  ],
  resources: [
    { label: 'What Is Electrolysis?', href: '/journal/understanding-permanent-hair-removal' },
    { label: 'Your First Consultation', href: '/journal/what-to-expect-first-consultation' },
    { label: 'Electrolysis vs. Laser', href: '/journal/electrolysis-vs-temporary-methods' },
    { label: 'Journal', href: '/journal' },
    { label: 'FAQ', href: '/faq' },
  ],
  support: [
    { label: 'About Ruth', href: '/about' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book Consultation', href: '/contact' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-mist/80" role="contentinfo">
      {/* Main Footer */}
      <div className="container-site py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-5 group">
              <span className="font-serif text-2xl text-ivory group-hover:text-blush transition-colors duration-200 block leading-tight">
                Electrolysis
              </span>
              <span className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-mist/60 font-500">
                by Ruth Swanson
              </span>
            </Link>
            <p className="font-sans text-sm font-300 leading-relaxed text-mist/70 max-w-xs mb-6">
              State-licensed electrologist offering permanent hair removal in Waterville, Maine. Personalized, professional care for every skin tone, hair type, and treatment goal.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2.5 text-sm hover:text-blush transition-colors duration-200 group"
              >
                <Phone size={14} strokeWidth={1.5} className="text-rose/60 group-hover:text-rose transition-colors" />
                {business.phoneFormatted}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2.5 text-sm hover:text-blush transition-colors duration-200 group"
              >
                <Mail size={14} strokeWidth={1.5} className="text-rose/60 group-hover:text-rose transition-colors" />
                {business.email}
              </a>
              <a
                href={business.address.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm hover:text-blush transition-colors duration-200 group"
              >
                <MapPin size={14} strokeWidth={1.5} className="text-rose/60 group-hover:text-rose transition-colors mt-0.5 flex-shrink-0" />
                <span>{business.address.full}</span>
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              <a
                href={business.social.instagram}
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-charcoal-lighter flex items-center justify-center hover:bg-rose transition-colors duration-200"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
              <a
                href={business.social.facebook}
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-charcoal-lighter flex items-center justify-center hover:bg-rose transition-colors duration-200"
              >
                <Facebook size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans text-[0.7rem] font-500 tracking-[0.14em] uppercase text-mist/50 mb-5">Services</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-mist/70 hover:text-ivory transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-sans text-[0.7rem] font-500 tracking-[0.14em] uppercase text-mist/50 mb-5">Resources</h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-mist/70 hover:text-ivory transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="font-sans text-[0.7rem] font-500 tracking-[0.14em] uppercase text-mist/50 mb-5">About</h3>
            <ul className="flex flex-col gap-2.5 mb-8">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-mist/70 hover:text-ivory transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-charcoal-lighter/50">
              <p className="font-sans text-xs text-mist/50 mb-3 leading-relaxed">By appointment only. New clients welcome.</p>
              <a
                href="/contact"
                className="inline-block bg-rose text-ivory font-sans text-xs font-500 tracking-[0.1em] uppercase px-5 py-2.5 rounded-full hover:bg-rose-dark transition-colors duration-200"
              >
                Book Free Consult
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-lighter/50">
        <div className="container-site flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="font-sans text-xs text-mist/40">
            &copy; {currentYear} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span className="font-sans text-xs text-mist/40">State Licensed — Maine</span>
            <span className="text-mist/20">|</span>
            <span className="font-sans text-xs text-mist/40">AEA Member</span>
            <span className="text-mist/20">|</span>
            <span className="font-sans text-xs text-mist/40">Waterville, ME</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
