import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { faqs, services } from "@/lib/content";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://thornandthimblebodypiercing.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Thorn & Thimble Body Piercing · Bangor, Maine",
    template: "%s · Thorn & Thimble Body Piercing",
  },
  description:
    "APP-quality body piercing and fine jewelry in downtown Bangor, Maine. Owned and operated by Libby — precise, welcoming, and deeply intentional.",
  keywords: [
    "body piercing Bangor Maine",
    "Bangor piercing studio",
    "fine jewelry piercing",
    "APP jewelry Bangor",
    "ear piercing Bangor",
    "nostril septum piercing Maine",
    "Thorn and Thimble",
    "Libby piercer Bangor",
    "ear curation Bangor",
  ],
  authors: [{ name: "Thorn & Thimble Body Piercing" }],
  creator: "Thorn & Thimble Body Piercing",
  publisher: "Thorn & Thimble Body Piercing",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Thorn & Thimble Body Piercing",
    title: "Thorn & Thimble Body Piercing · Bangor, Maine",
    description:
      "Fine-jewelry body piercing by Libby. APP-quality jewelry and a welcoming studio where you're welcome exactly as you are. Downtown Bangor, Maine.",
    images: [
      {
        url: "/assets/gallery/ear-crystal-stack.jpg",
        width: 1200,
        height: 630,
        alt: "Fine-jewelry ear curation by Thorn & Thimble Body Piercing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thorn & Thimble Body Piercing · Bangor, Maine",
    description:
      "APP-quality piercing and fine jewelry in downtown Bangor, Maine.",
    images: ["/assets/gallery/ear-crystal-stack.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  category: "local business",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
  "@id": siteUrl,
  name: "Thorn & Thimble Body Piercing",
  alternateName: "Thorn and Thimble Body Piercing",
  description:
    "APP-quality body piercing and fine jewelry studio in downtown Bangor, Maine, owned and operated by Libby.",
  url: siteUrl,
  telephone: "+1-207-370-9312",
  email: "thornandthimblebodypiercing@gmail.com",
  image: `${siteUrl}/assets/libby-portrait.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "40 Main Street",
    addressLocality: "Bangor",
    addressRegion: "ME",
    postalCode: "04401",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8016,
    longitude: -68.7712,
  },
  areaServed: {
    "@type": "City",
    name: "Bangor",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "16:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "11:00", closes: "18:00" },
  ],
  sameAs: [
    "https://www.facebook.com/thornandthimblebodypiercing",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "10",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Body Piercing Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.note ?? `${s.name} piercing with implant-grade jewelry`,
      },
      priceSpecification: {
        "@type": "PriceSpecification",
        price: s.price.replace(/[^0-9.]/g, "").split(".")[0] || "0",
        priceCurrency: "USD",
      },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
