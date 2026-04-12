import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://claudes-receipts.example"),
  title: {
    default: "Claude's Receipts",
    template: "%s | Claude's Receipts",
  },
  description:
    "A premium telemetry dashboard for Claude Code sessions, project burn, tool dependency, and public Receipt Mode reports.",
  openGraph: {
    title: "Claude's Receipts",
    description:
      "A premium telemetry dashboard for Claude Code sessions, project burn, tool dependency, and public Receipt Mode reports.",
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
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
