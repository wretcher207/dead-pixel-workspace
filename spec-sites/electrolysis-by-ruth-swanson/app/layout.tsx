import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { business } from '@/content/business'

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: `${business.name} — Permanent Hair Removal in ${business.address.city}, Maine`,
    template: `%s | ${business.name}`,
  },
  description: `State-licensed electrologist in ${business.address.city}, Maine. Permanent hair removal for all hair types and skin tones. ${business.address.city}, ME. ${business.phoneFormatted}. Free consultation available.`,
  keywords: business.metaKeywords,
  authors: [{ name: business.shortName }],
  creator: business.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: business.website,
    siteName: business.name,
    title: `${business.name} — Permanent Hair Removal in Maine`,
    description: `State-licensed electrologist in Waterville, Maine. Permanent, personalized hair removal for every skin tone and hair type. Free consultation.`,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${business.name} — Permanent Electrolysis in Maine`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — Permanent Hair Removal Maine`,
    description: 'State-licensed electrologist in Waterville, ME. Permanent results for every client.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: business.website,
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService', 'HealthAndBeautyBusiness'],
      '@id': business.website,
      name: business.name,
      description: business.description,
      url: business.website,
      telephone: business.phone,
      email: business.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '44.5523',
        longitude: '-69.6317',
      },
      areaServed: {
        '@type': 'State',
        name: 'Maine',
      },
      priceRange: '$$',
      currenciesAccepted: 'USD',
      paymentAccepted: 'Cash, Check, Major Credit Cards',
      image: `${business.website}/og-image.jpg`,
      sameAs: [business.social.facebook, business.social.instagram],
      hasMap: business.address.mapUrl,
    },
    {
      '@type': 'WebSite',
      '@id': `${business.website}/#website`,
      url: business.website,
      name: business.name,
      description: business.tagline,
      publisher: { '@id': business.website },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ivory text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-rose focus:text-ivory focus:px-4 focus:py-2 focus:rounded-lg focus:font-sans focus:text-sm"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
