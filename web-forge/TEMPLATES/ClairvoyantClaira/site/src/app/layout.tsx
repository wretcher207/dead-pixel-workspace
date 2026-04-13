import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Clairvoyant Claira | Tarot, Astrology & Dream Interpretation",
  description:
    "Private readings, astrological charting, and dream interpretation with Claira. Step beyond the veil and discover what the stars already know.",
  keywords: [
    "psychic readings",
    "tarot",
    "astrology",
    "dream interpretation",
    "clairvoyant",
    "Salem MA",
  ],
  openGraph: {
    title: "Clairvoyant Claira",
    description: "Step beyond the veil. Private readings in Salem, MA.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
