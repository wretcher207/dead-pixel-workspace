import BrandMark from './BrandMark'
import { siteConfig } from '../data/site'

function Footer() {
  const { brand, footer } = siteConfig

  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="page-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="hidden sm:block">
              <BrandMark className="h-14 w-14" />
            </div>
            <div>
              <p className="text-lg font-bold uppercase tracking-tighter text-foreground">
                {brand.name}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-widerest text-muted-foreground">
                {brand.locationShort}
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>{brand.phoneDisplay}</p>
            <p>{brand.emailDisplay}</p>
            <a
              href={brand.socialHref}
              target="_blank"
              rel="noreferrer"
              className="ghost-link"
            >
              {brand.socialLabel}
            </a>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs uppercase tracking-wider text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{footer.legalLine}</p>
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
