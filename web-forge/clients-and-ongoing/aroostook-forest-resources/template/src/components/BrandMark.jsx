import { siteConfig } from '../data/site'

function BrandMark({ className = 'h-11 w-11', showBorder = true }) {
  const { logo, monogram } = siteConfig.brand
  const borderClass = showBorder ? 'border border-white/10' : ''

  if (logo.src) {
    return <img src={logo.src} alt={logo.alt} className={`${className} ${borderClass} object-cover`} />
  }

  return (
    <div className={`${className} ${borderClass} flex items-center justify-center bg-card text-lg font-bold uppercase tracking-tighter text-foreground`}>
      {monogram}
    </div>
  )
}

export default BrandMark
