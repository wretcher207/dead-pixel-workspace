import { services } from '../data/services'
import { RevealItem, RevealSection } from './Reveal'
import SectionHeading from './SectionHeading'

function Services() {
  return (
    <RevealSection id="services" className="scroll-mt-32 py-20 md:py-28 lg:py-32">
      <div className="page-shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <SectionHeading
            label="Our Services"
            title="Comprehensive Forest Management"
            description="From tax planning to harvest layout, every service protects and grows the value of your land."
          />
          <RevealItem className="border-l border-border pl-6 lg:mb-4">
            <p className="font-mono text-xs uppercase tracking-widerest text-muted-foreground">Landowner Note</p>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              Tree Growth Tax Law plans require 10 or more acres of forested land to qualify.
            </p>
          </RevealItem>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon

            return (
              <RevealItem key={service.title} className="service-card flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <Icon size={26} strokeWidth={1.5} className="text-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-widerest text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 text-xl font-semibold leading-snug text-foreground">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxedest text-muted-foreground md:text-base">
                  {service.description}
                </p>
              </RevealItem>
            )
          })}
        </div>
      </div>
    </RevealSection>
  )
}

export default Services
