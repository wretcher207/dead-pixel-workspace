import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ResponsivePicture } from "@/components/ui/ResponsivePicture";
import { BotanicalSprig, BotanicalDivider } from "@/components/ui/BotanicalFrame";
import { VISIT_AMBIENT } from "@/data/gallery";
import { BUSINESS } from "@/data/business";

export function VisitUs() {
  // Google Maps embed requires a paid API key; OSM embed hangs headless
  // renderers during testing. For a spec site we show a beautifully styled
  // "Find us" panel with the real address and one-tap links to Google Maps
  // and Apple Maps. Better perf, privacy, and premium feel than a random
  // embedded map, and the turn-by-turn handoff is one click away.
  const mapQuery = encodeURIComponent(
    `${BUSINESS.name}, ${BUSINESS.addressOneLine}`,
  );
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const appleMapsLink = `https://maps.apple.com/?q=${mapQuery}`;

  return (
    <Section id="visit" tone="ivory">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-stretch">
        {/* Info column */}
        <Reveal className="relative">
          <p className="eyebrow-caps mb-5">Visit the greenhouse</p>
          <h2 className="font-display text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.05] tracking-heading text-balance">
            Find us on Johnson Mill Road.{" "}
            <em className="italic text-moss">
              Fifteen minutes south of Bangor.
            </em>
          </h2>

          <dl className="mt-10 md:mt-12 space-y-7 max-w-[440px]">
            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Address
              </dt>
              <dd className="font-display text-[1.15rem] text-charcoal leading-[1.45]">
                {BUSINESS.address.street}
                <br />
                {BUSINESS.address.city}, {BUSINESS.address.region}{" "}
                {BUSINESS.address.postalCode}
              </dd>
            </div>

            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Hours for the 2026 season
              </dt>
              <dd className="text-[1.02rem] text-charcoal/85 leading-[1.65]">
                {BUSINESS.hoursStatus}{" "}
                <a
                  href={BUSINESS.facebookUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="text-moss hover:text-moss-deep underline underline-offset-4 decoration-moss/40 decoration-1"
                >
                  Facebook page
                </a>
                .
              </dd>
            </div>

            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Phone
              </dt>
              <dd className="font-display text-[1.15rem]">
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="text-charcoal hover:text-moss transition-colors duration-300"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </dd>
            </div>

            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Email
              </dt>
              <dd className="font-display text-[1.05rem] break-words">
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-charcoal hover:text-moss transition-colors duration-300"
                >
                  {BUSINESS.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Parking & access
              </dt>
              <dd className="text-[1rem] leading-[1.7] text-charcoal/80">
                Free on-site parking in a gravel lot. The greenhouses are all
                single-level and easy to walk through.
              </dd>
            </div>

            <div>
              <dt className="eyebrow-caps !text-[0.7rem] text-moss/85 mb-2">
                Directions from Bangor
              </dt>
              <dd className="text-[1rem] leading-[1.7] text-charcoal/80 text-pretty">
                Head south out of Bangor on Route 15 for about fifteen minutes.
                You'll cross into Orrington and find Johnson Mill Road on your
                right. We're at number 563. The greenhouses are visible from
                the road once you're close.
              </dd>
            </div>
          </dl>

          <BotanicalSprig
            className="absolute -top-6 -right-4 w-20 md:w-24 text-moss/35 scale-x-[-1] hidden md:block"
          />
        </Reveal>

        {/* Find-us panel */}
        <Reveal delay={120} className="w-full">
          <div className="card-floating overflow-hidden w-full min-h-[520px] md:min-h-[640px] relative flex flex-col items-center justify-center text-center p-10 md:p-14">
            {/* Ambient photo background with deep overlay */}
            <div aria-hidden="true" className="absolute inset-0">
              <ResponsivePicture
                base={VISIT_AMBIENT.file}
                alt=""
                width={VISIT_AMBIENT.width}
                height={VISIT_AMBIENT.height}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(47,93,78,0.9) 0%, rgba(34,69,55,0.92) 50%, rgba(31,42,36,0.94) 100%)",
                }}
              />
              <div
                className="absolute inset-0 mix-blend-overlay opacity-40"
                style={{
                  background:
                    "radial-gradient(60% 50% at 30% 30%, rgba(169,191,165,0.5), transparent 60%), radial-gradient(50% 40% at 70% 80%, rgba(47,93,78,0.6), transparent 60%)",
                }}
              />
            </div>

            <div className="relative text-ivory max-w-[440px]">
              {/* Pin icon */}
              <div
                className="mx-auto mb-7 flex items-center justify-center w-16 h-16 rounded-full border border-eucalyptus/50 bg-ivory/5 backdrop-blur text-eucalyptus"
                aria-hidden="true"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2 C8 2 5 5 5 9 C5 14 12 22 12 22 C12 22 19 14 19 9 C19 5 16 2 12 2 Z" />
                  <circle cx="12" cy="9" r="2.6" />
                </svg>
              </div>

              <p className="eyebrow-caps !text-eucalyptus !text-[0.7rem] mb-4">
                The greenhouse is here
              </p>
              <h3 className="font-display text-[1.85rem] md:text-[2.2rem] leading-[1.15] tracking-heading italic text-ivory">
                563 Johnson Mill Road
              </h3>
              <p className="mt-2 font-display text-[1.15rem] md:text-[1.25rem] text-ivory/85">
                Orrington, Maine 04474
              </p>

              <BotanicalDivider className="mt-8 w-40 mx-auto text-eucalyptus/60" />

              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !text-ivory !border-ivory/40 hover:!bg-ivory/10"
                >
                  Google Maps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 L17 7" />
                    <path d="M9 7 H17 V15" />
                  </svg>
                </a>
                <a
                  href={appleMapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost !text-ivory !border-ivory/40 hover:!bg-ivory/10"
                >
                  Apple Maps
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 L17 7" />
                    <path d="M9 7 H17 V15" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
