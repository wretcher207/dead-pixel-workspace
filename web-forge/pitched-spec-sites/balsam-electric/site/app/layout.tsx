import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balsam Electric LLC | Electrical Services in Maine",
  description:
    "Licensed and insured electrical contractor serving Maine. Residential and commercial electrical projects and repair.",
  keywords: ["electrician", "Maine", "electrical contractor", "Balsam Electric"],
  openGraph: {
    title: "Balsam Electric LLC",
    description: "Licensed electrical contractor serving Maine",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Sora:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise antialiased">
        {children}
      </body>
    </html>
  );
}
