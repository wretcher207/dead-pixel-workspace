import { BUSINESS } from "@/data/business";
import { BotanicalDivider } from "@/components/ui/BotanicalFrame";

const YEAR = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(169,191,165,0.8), transparent 60%), radial-gradient(60% 60% at 80% 80%, rgba(169,191,165,0.4), transparent 60%)",
        }}
      />
      <div className="relative container-site pt-20 pb-10">
        <div className="flex flex-col items-center text-center mb-14">
          <span className="inline-block overflow-hidden rounded-full border border-ivory/15 bg-ivory/5 w-20 h-20">
            <img
              src="/images/logo.jpg"
              alt=""
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          </span>
          <h2 className="mt-6 font-display text-[1.85rem] md:text-[2.2rem] italic tracking-heading">
            Ledgewood Gardens &amp; Greenhouses
          </h2>
          <p className="mt-2 eyebrow-caps !text-eucalyptus">
            Orrington, Maine · Since 1989
          </p>
          <BotanicalDivider className="mt-7 w-48 text-eucalyptus/60" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mb-14">
          <div>
            <p className="eyebrow-caps !text-eucalyptus mb-4">Explore</p>
            <ul className="space-y-2 text-[0.98rem] text-ivory/80">
              <li>
                <a href="#about" className="hover:text-eucalyptus transition-colors">
                  About the greenhouse
                </a>
              </li>
              <li>
                <a href="#offerings" className="hover:text-eucalyptus transition-colors">
                  What we carry
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-eucalyptus transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-eucalyptus transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-eucalyptus transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow-caps !text-eucalyptus mb-4">Visit</p>
            <address className="not-italic text-[0.98rem] text-ivory/80 leading-[1.7]">
              {BUSINESS.address.street}
              <br />
              {BUSINESS.address.city}, {BUSINESS.address.region}{" "}
              {BUSINESS.address.postalCode}
              <br />
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="hover:text-eucalyptus transition-colors"
              >
                {BUSINESS.phoneDisplay}
              </a>
              <br />
              <a
                href={`mailto:${BUSINESS.email}`}
                className="hover:text-eucalyptus transition-colors break-words"
              >
                {BUSINESS.email}
              </a>
            </address>
          </div>
          <div>
            <p className="eyebrow-caps !text-eucalyptus mb-4">Season</p>
            <p className="text-[0.98rem] text-ivory/80 leading-[1.7]">
              Opening Saturday, April 25, 2026.
              <br />
              Follow along on{" "}
              <a
                href={BUSINESS.facebookUrl}
                rel="noreferrer"
                target="_blank"
                className="text-eucalyptus hover:text-ivory transition-colors underline underline-offset-4 decoration-eucalyptus/40"
              >
                Facebook
              </a>
              {" "}for updates.
            </p>
            <a
              href={BUSINESS.facebookUrl}
              rel="noreferrer"
              target="_blank"
              aria-label="Ledgewood Gardens on Facebook"
              className="mt-5 inline-flex items-center gap-2.5 py-2 px-4 rounded-full border border-ivory/20 text-[0.9rem] hover:border-eucalyptus hover:text-eucalyptus transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 9h3V5h-3c-2 0-4 2-4 4v2H7v4h3v8h4v-8h3l1-4h-4V9z" />
              </svg>
              Follow on Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.82rem] text-ivory/55">
          <p>
            © {YEAR} Ledgewood Gardens &amp; Greenhouses. All rights reserved.
          </p>
          <p className="font-display italic">
            Site by{" "}
            <a
              href="https://deadpixeldesign.com"
              className="text-eucalyptus/90 hover:text-ivory transition-colors"
              rel="noreferrer"
            >
              Dead Pixel Design
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
