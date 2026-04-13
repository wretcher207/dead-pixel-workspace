import {
  BUSINESS_ADDRESS,
  BUSINESS_PHONE,
  BUSINESS_PHONE_RAW,
  GOOGLE_MAPS_URL,
  NAV_LINKS,
} from "@/lib/constants";

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 mb-12">
          {/* Branding */}
          <div className="md:col-span-2">
            <h2
              className="text-3xl text-neon mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              JUST 1 MORE
            </h2>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Cold drinks. Hot food. Questionable decisions.
              561 Maine Ave, Farmingdale.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-text-faint text-xs tracking-widest uppercase mb-4">
              Navigate
            </p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-muted text-sm hover:text-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact + Hours */}
          <div>
            <p className="text-text-faint text-xs tracking-widest uppercase mb-4">
              Info
            </p>
            <address className="not-italic flex flex-col gap-2 mb-4">
              <p className="text-text-muted text-sm">{BUSINESS_ADDRESS}</p>
              <a
                href={`tel:${BUSINESS_PHONE_RAW}`}
                className="text-neon text-sm hover:underline"
              >
                {BUSINESS_PHONE}
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted text-sm hover:text-neon transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon rounded"
              >
                Get Directions &rarr;
              </a>
            </address>

            <div className="border-t border-white/5 pt-3">
              <p className="text-text-faint text-xs tracking-widest uppercase mb-2">Hours</p>
              <p className="text-text-muted text-sm">Every day, 4 PM to close</p>
              <p className="text-text-faint text-xs mt-1">Yes, all 365 of them.</p>
            </div>
          </div>
        </div>

        {/* Map embed */}
        <div className="rounded-xl overflow-hidden mb-10 border border-white/5">
          <iframe
            title="Just 1 More location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.6!2d-69.7755!3d44.259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDE1JzMyLjQiTiA2OcKwNDYnMzEuOCJX!5e0!3m2!1sen!2sus!4v1700000000000"
            width="100%"
            height="220"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="h-px bg-white/5 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-text-faint text-xs">
            &copy; 2026 Just 1 More. All rights reserved, all wrongs forgotten.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61575539017498"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-faint hover:text-neon transition-colors text-sm"
            >
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
