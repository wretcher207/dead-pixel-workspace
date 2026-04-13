"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ProductCard } from "@/components/ProductCard";

const categories = [
  "All",
  "Drinkware",
  "Keychains",
  "Bottle Openers",
  "Custom Gifts",
  "Business Gifts",
  "Seasonal",
];

const products = [
  { name: "30oz Engraved Tumbler", description: "Insulated stainless steel with custom text or logo", price: "$28", image: "/images/tumbler.jpg", category: "Drinkware", badge: "Best Seller" },
  { name: "20oz Slim Tumbler", description: "Sleek profile, perfect for personalized gifts", price: "$24", image: "/images/slim-tumbler.jpg", category: "Drinkware" },
  { name: "Engraved Wine Tumbler", description: "12oz stemless, ideal for weddings and events", price: "$22", image: "/images/wine-tumbler.jpg", category: "Drinkware" },
  { name: "Heart Cutting Board", description: "Marble & acacia wood with custom engraving", price: "$45", image: "/images/cutting-board.jpg", category: "Custom Gifts" },
  { name: "Round Cutting Board", description: "Solid wood with personalized family name", price: "$38", image: "/images/round-board.jpg", category: "Custom Gifts" },
  { name: "Custom Keychain", description: "Stainless steel with laser-cut detail", price: "$15", image: "/images/keychain.jpg", category: "Keychains" },
  { name: "Leather Keychain", description: "Genuine leather with engraved initials", price: "$18", image: "/images/leather-keychain.jpg", category: "Keychains" },
  { name: "Engraved Bottle Opener", description: "Stainless steel wall-mount or handheld", price: "$20", image: "/images/bottle-opener.jpg", category: "Bottle Openers" },
  { name: "Slate Coaster Set", description: "Set of 4 natural slate with custom design", price: "$32", image: "/images/coasters.jpg", category: "Custom Gifts" },
  { name: "Branded Tumbler Set", description: "Set of 12 with your company logo", price: "$260", image: "/images/branded-set.jpg", category: "Business Gifts", badge: "Bulk" },
  { name: "Desk Nameplate", description: "Wood & marble with engraved name and title", price: "$35", image: "/images/nameplate.jpg", category: "Business Gifts" },
  { name: "Engraved Cross Pendant", description: "Sterling silver with personalized inscription", price: "$55", image: "/images/pendant.jpg", category: "Custom Gifts", badge: "New" },
  { name: "Christmas Ornament", description: "Wood or acrylic with custom text and year", price: "$18", image: "/images/ornament.jpg", category: "Seasonal" },
  { name: "Laser-Cut Wall Art", description: "Intricate multi-layer designs in wood", price: "$85", image: "/images/wall-art.jpg", category: "Custom Gifts" },
  { name: "Memorial Photo Frame", description: "Engraved wood frame with custom message", price: "$42", image: "/images/memorial-frame.jpg", category: "Custom Gifts" },
  { name: "Branded Coaster Set", description: "Set of 50 cork coasters with company logo", price: "$180", image: "/images/branded-coasters.jpg", category: "Business Gifts" },
];

export default function ShopPage() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cosmic-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Shop</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">Our Collections</h1>
            <p className="text-cream-dim max-w-2xl">
              Every piece is made to order with precision and care. Browse our collections or reach out for something entirely custom.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`text-xs uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border transition-all duration-300 ${
                  active === cat
                    ? "bg-violet/15 border-violet/40 text-violet"
                    : "border-violet/10 text-cream-dim hover:border-violet/25 hover:text-cream"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 50}>
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream-dim">No products in this category yet. Check back soon.</p>
            </div>
          )}

          {/* Gift cue */}
          <ScrollReveal delay={200}>
            <div className="mt-20 text-center card-surface rounded-xl p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-violet mb-3">Gift Ready</p>
              <h3 className="font-serif text-2xl text-cream mb-3">
                Every Order Can Be Gift-Wrapped
              </h3>
              <p className="text-cream-dim max-w-lg mx-auto mb-6">
                Add a personal note and we&apos;ll package it with care. Perfect for sending directly to the recipient.
              </p>
              <a href="/custom-orders" className="btn-ghost text-sm">
                Learn About Custom Orders
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
