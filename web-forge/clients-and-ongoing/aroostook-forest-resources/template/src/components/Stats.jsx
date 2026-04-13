import { siteConfig } from '../data/site'
import { RevealItem, RevealSection } from './Reveal'

function Stats() {
  return (
    <RevealSection className="border-b border-border bg-muted py-16 md:py-20">
      <div className="page-shell">
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {siteConfig.stats.map((stat, index) => (
            <RevealItem
              key={stat.label}
              className={`border-border ${index < siteConfig.stats.length - 1 ? 'md:border-r md:pr-8' : ''}`}
            >
              <p
                className={`font-mono text-2xl font-medium uppercase tracking-tight sm:text-3xl ${
                  stat.tone === 'gold' ? 'text-secondary-accent' : 'text-accent'
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widerest text-muted-foreground md:text-sm">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

export default Stats
