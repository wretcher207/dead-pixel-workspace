import type { Metadata } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hallowed Ground Tattoo | Custom Tattoo Shop Portland, Maine",
  description:
    "Hallowed Ground Tattoo is Portland Maine's premier custom tattoo studio. Experienced artists specializing in black & grey, color, fine line, traditional, and geometric styles. Book a consultation at 646 Congress St.",
  keywords:
    "tattoo shop Portland Maine, Portland Maine tattoo artists, custom tattoos Portland ME, best tattoo shop Portland Maine, fine line tattoo Portland, black and grey tattoo Portland",
  openGraph: {
    title: "Hallowed Ground Tattoo | Custom Tattoo Shop Portland, Maine",
    description:
      "Custom tattoo studio on Congress Street in Portland, ME. Multiple artists, every style. 375+ five-star reviews.",
    url: "https://hallowedgroundtattoo.com",
    siteName: "Hallowed Ground Tattoo",
    locale: "en_US",
    type: "website",
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Hallowed Ground Tattoo",
  description:
    "Custom tattoo studio in Portland, ME with multiple artists specializing in a wide range of styles.",
  url: "https://hallowedgroundtattoo.com",
  telephone: "+12078051702",
  email: "hallowedgroundtattooshop@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "646 Congress Street",
    addressLocality: "Portland",
    addressRegion: "ME",
    postalCode: "04101",
    addressCountry: "US",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "375",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "11:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "11:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "17:00" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
