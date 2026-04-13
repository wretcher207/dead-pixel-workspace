import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About' },
  { href: '#due-diligence', label: 'Due Diligence' },
  { href: '#contact', label: 'Contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ease-editorial ${
          scrolled ? 'border-b border-border bg-background/92 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="page-shell flex min-h-20 items-center justify-between gap-6">
          <a href="#top" className="flex min-h-11 items-center gap-4 py-3 text-foreground">
            <img
              src="/images/logo.jpg"
              alt=""
              className="hidden h-11 w-11 border border-white/10 object-cover sm:block"
            />
            <span>
              <span className="block text-lg font-bold uppercase tracking-tighter md:text-xl">Aroostook</span>
              <span className="block font-mono text-[11px] uppercase tracking-widerest text-muted-foreground md:text-xs">
                Forest Resources
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            <nav className="flex items-center gap-7">
              {links.map((link) => (
                <a key={link.href} href={link.href} className="ghost-link">
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="outline-button border-white/50 px-5 text-foreground hover:border-foreground">
              Free Consultation
            </a>
          </div>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center text-foreground md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-opacity duration-200 ease-editorial md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="page-shell flex min-h-screen flex-col justify-center gap-8 pt-20">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-4xl font-bold uppercase tracking-tighter text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" className="eyebrow-link w-fit" onClick={() => setOpen(false)}>
            Free Consultation
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
