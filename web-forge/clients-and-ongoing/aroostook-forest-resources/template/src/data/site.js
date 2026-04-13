export const siteConfig = {
  meta: {
    title: 'North Ridge Land Services',
    description:
      'Editorial service business template for local experts, consultants, and field service companies.',
  },
  theme: {
    colors: {
      background: '#0c1a0f',
      foreground: '#f5f2eb',
      muted: '#1a2e1d',
      'muted-foreground': '#8b9b8e',
      accent: '#2d6a4f',
      'accent-foreground': '#f5f2eb',
      'secondary-accent': '#d4a843',
      border: '#1e3a24',
      input: '#1a2e1d',
      card: '#0f2214',
      'card-foreground': '#f5f2eb',
      ring: '#2d6a4f',
    },
  },
  brand: {
    name: 'North Ridge Land Services',
    wordmarkTop: 'North Ridge',
    wordmarkBottom: 'Land Services',
    monogram: 'N',
    locationShort: 'Presque Isle, ME',
    phoneDisplay: '(207) 555-0147',
    phoneHref: 'tel:+12075550147',
    emailDisplay: 'hello@northridgeland.com',
    emailHref: 'mailto:hello@northridgeland.com',
    socialLabel: 'Facebook',
    socialHref: 'https://facebook.com/',
    logo: {
      src: '',
      alt: 'North Ridge Land Services logo',
    },
  },
  navigation: {
    ctaLabel: 'Request Consultation',
    links: [
      { href: '#services', label: 'Services' },
      { href: '#about', label: 'About' },
      { href: '#featured', label: 'Packages' },
      { href: '#contact', label: 'Contact' },
    ],
  },
  hero: {
    eyebrow: 'Local expertise. Clear direction.',
    headline: ['Your Property.', 'Your Decisions.', 'Your Next Move.'],
    accentLineIndex: 2,
    subtitle:
      'A sharp, high-trust website template for field experts, consultants, and service businesses that need authority on the page fast.',
    primaryCta: {
      href: '#contact',
      label: 'Request Consultation',
    },
    backgroundImage: {
      src: '',
      alt: 'Replace with a strong hero image',
      placeholder:
        'Add a client photo at /public/images/hero-image.jpg and set hero.backgroundImage.src.',
    },
    facts: ['Local owner', 'Clear service area', 'Licensed and insured'],
  },
  stats: [
    {
      value: '10+',
      tone: 'gold',
      label: 'Years Experience',
    },
    {
      value: 'Fast Local Response',
      tone: 'accent',
      label: 'Lead Gen Hook',
    },
    {
      value: 'Straightforward Process',
      tone: 'accent',
      label: 'Client Confidence',
    },
  ],
  servicesSection: {
    label: 'Core Services',
    title: 'Structured For Service Businesses With Real Expertise',
    description:
      'Use the cards below for core offers. Keep each one clear, specific, and grounded in what the client actually does.',
    noteLabel: 'Template Note',
    noteBody:
      'This layout works best when one card carries the main qualification, threshold, or buying detail people need before they call.',
    items: [
      {
        icon: 'FileText',
        title: 'Planning And Reporting',
        description:
          'Use this slot for written plans, evaluations, or reports that show the client is organized and credible.',
      },
      {
        icon: 'MapPin',
        title: 'Field Services',
        description:
          'Use this for the work done on site, in the field, or at the property where the client needs hands-on execution.',
      },
      {
        icon: 'TreePine',
        title: 'Inspection Work',
        description:
          'Use this for inventories, reviews, measurements, inspections, or any service that depends on direct observation.',
      },
      {
        icon: 'ClipboardCheck',
        title: 'Valuation Or Review',
        description:
          'Use this for pricing opinions, condition reports, appraisals, or other trust-heavy advisory work.',
      },
      {
        icon: 'Map',
        title: 'Project Layout',
        description:
          'Use this for scope planning, site layout, process design, or preparation before the main work begins.',
      },
      {
        icon: 'Layers',
        title: 'Mapping And Documentation',
        description:
          'Use this for maps, records, GIS work, overlays, photos, or supporting materials that make the service tangible.',
      },
    ],
  },
  aboutSection: {
    label: 'About',
    title: 'A Credible Operator, Not A Generic Contractor',
    paragraphs: [
      'Use this section to explain who leads the business, how long they have been doing the work, and why clients trust them.',
      'Keep the copy plain. Mention local knowledge, practical judgment, and the kind of work they are known for.',
      'If there is a certification, license, or meaningful background detail, put it here once and keep it specific.',
      'End with a simple next step that pushes the visitor toward a call, form, or message.',
    ],
    image: {
      src: '',
      alt: 'Replace with an about section image',
      placeholder:
        'Add a fieldwork or owner photo at /public/images/about-image.jpg and set aboutSection.image.src.',
    },
  },
  featureSection: {
    enabled: true,
    id: 'featured',
    label: 'Featured Packages',
    title: 'Package The Offers People Compare Most',
    description:
      'This section is useful when the client has review tiers, due diligence packages, audits, or phased service options.',
    image: {
      src: '',
      alt: 'Replace with a package section image',
      placeholder:
        'Add a support image at /public/images/feature-image.jpg and set featureSection.image.src.',
    },
    tiers: [
      {
        tier: 'Tier 1',
        title: 'Quick Review',
        description:
          'A fast first-pass offer for prospects who need clarity before they commit to deeper work.',
        includes: ['Basic review', 'Clear summary', 'Next-step recommendation'],
      },
      {
        tier: 'Tier 2',
        title: 'Full Report',
        description:
          'A more complete package for buyers who need stronger detail, written findings, and a clearer scope.',
        includes: ['Field review', 'Written report', 'Key risk notes', 'Opportunity summary'],
        featured: true,
        badge: 'Recommended',
      },
      {
        tier: 'Tier 3',
        title: 'Certified Package',
        description:
          'A formal package for high-stakes decisions, transactions, or documentation-heavy work.',
        includes: ['Detailed review', 'Formal documentation', 'Priority follow-up'],
      },
    ],
    ctaLabel: 'Ask About This Package',
  },
  advisoryNote: {
    enabled: true,
    icon: 'ShieldCheck',
    label: 'Advisory Note',
    body:
      'Use this strip for a short clarification, scope limit, or helpful note that avoids confusion before a prospect reaches out.',
  },
  contactSection: {
    label: 'Reach Out Anytime',
    title: 'Make The Next Step Easy',
    description:
      'Keep the contact section simple. One clear heading, one short paragraph, and the fastest ways to reach the client.',
    formNote:
      'Use this line for service area coverage, response expectations, or another short trust-builder.',
    buttonLabel: 'Send Message',
    items: [
      {
        icon: 'Phone',
        label: 'Phone',
        value: '(207) 555-0147',
        href: 'tel:+12075550147',
      },
      {
        icon: 'Mail',
        label: 'Email',
        value: 'hello@northridgeland.com',
        href: 'mailto:hello@northridgeland.com',
      },
      {
        icon: 'MapPin',
        label: 'Location',
        value: 'Presque Isle, ME',
      },
      {
        icon: 'MessageCircle',
        label: 'Facebook',
        value: 'North Ridge Land Services',
        href: 'https://facebook.com/',
      },
    ],
  },
  footer: {
    legalLine: 'Licensed and insured',
    copyright: '2026 North Ridge Land Services. All rights reserved.',
  },
}

export function applySiteTheme(theme) {
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value)
  })
}

export function syncSiteDocument(meta) {
  document.title = meta.title

  let descriptionTag = document.querySelector('meta[name="description"]')

  if (!descriptionTag) {
    descriptionTag = document.createElement('meta')
    descriptionTag.setAttribute('name', 'description')
    document.head.appendChild(descriptionTag)
  }

  descriptionTag.setAttribute('content', meta.description)
}
