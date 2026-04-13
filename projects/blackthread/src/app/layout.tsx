import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "BlackThread",
  description: "The system beneath the system.",
  openGraph: {
    title: "BlackThread",
    description: "The system beneath the system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bt-black font-display antialiased">
        {children}
        <div className="grid-overlay" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
