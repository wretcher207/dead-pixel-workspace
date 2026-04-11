import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://thornandthimblebodypiercing.com/sitemap.xml",
    host: "https://thornandthimblebodypiercing.com",
  };
}
