import { ArrowRight, Check } from 'lucide-react'
import { siteConfig } from '../data/site'
import { RevealItem, RevealSection } from './Reveal'
import SectionHeading from './SectionHeading'
import ImagePlaceholder from './ImagePlaceholder'

function FeatureTiers() {
  const { featureSection } = siteConfig

  return (
    <RevealSection
      id={featureSection.id}
      className="scroll-mt-32 bg-card py-20 md:py-28 lg:py-32"
    >
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_360px] lg:items-end">
          <SectionHeading
            label={featureSection.label}
            title={featureSection.title}
            description={featureSection.description}
          />
          <RevealItem className="overflow-hidden border border-border">
            {featureSection.image.src ? (
              <img
                src={featureSection.image.src}
                alt={featureSection.image.alt}
                className="h-72 w-full object-cover transition-transform duration-500 ease-editorial hover:scale-105"
              />
            ) : (
              <ImagePlaceholder className="min-h-[288px]" message={featureSection.image.placeholder} />
            )}
          </RevealItem>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featureSection.tiers.map((tier) => (
            <RevealItem
              key={tier.title}
              className={`relative flex h-full flex-col border bg-transparent p-6 md:p-8 ${
                tier.featured ? 'border-2 border-accent' : 'border-border'
              }`}
            >
              {tier.featured ? <div className="absolute left-0 top-0 h-1 w-16 bg-accent" /> : null}
              <div className="flex min-h-10 items-start justify-between gap-4">
                <p className="font-mono text-xs uppercase tracking-widerest text-muted-foreground">
                  {tier.tier}
                </p>
                {tier.badge ? (
                  <span className="bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-accent-foreground">
                    {tier.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-7 text-2xl font-semibold uppercase tracking-tight text-foreground">
                {tier.title}
              </h3>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{tier.description}</p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-border pt-6">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/88">
                    <Check size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="ghost-link mt-8 w-fit text-foreground hover:text-foreground">
                {featureSection.ctaLabel}
                <ArrowRight size={16} strokeWidth={1.5} className="ml-2" />
              </a>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

export default FeatureTiers
