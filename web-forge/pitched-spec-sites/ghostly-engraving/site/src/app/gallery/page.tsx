"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const categories = [
  "All",
  "Wood",
  "Metal",
  "Acrylic",
  "Drinkware",
  "Ornaments",
  "Gifts",
  "Business",
  "Memorial",
];

const galleryItems = [
  { title: "Engraved Walnut Cutting Board", category: "Wood", aspect: "4/3" },
  { title: "Custom 30oz Tumbler Set", category: "Drinkware", aspect: "3/4" },
  { title: "Laser-Cut Parrot Wall Art", category: "Wood", aspect: "1/1" },
  { title: "Engraved Cross Pendant", category: "Metal", aspect: "3/4" },
  { title: "Branded Business Tumblers", category: "Business", aspect: "4/3" },
  { title: "Slate Flag Coaster", category: "Gifts", aspect: "1/1" },
  { title: "Heart Marble Cutting Board", category: "Wood", aspect: "4/3" },
  { title: "Acrylic Award Plaque", category: "Acrylic", aspect: "3/4" },
  { title: "Memorial Photo Frame", category: "Memorial", aspect: "4/3" },
  { title: "Custom Desk Nameplate", category: "Business", aspect: "16/9" },
  { title: "Christmas Ornament Set", category: "Ornaments", aspect: "1/1" },
  { title: "Engraved Leather Wallet", category: "Gifts", aspect: "4/3" },
  { title: "Metal Keychain Collection", category: "Metal", aspect: "1/1" },
  { title: "Custom Wine Tumblers", category: "Drinkware", aspect: "3/4" },
  { title: "Acrylic Night Light", category: "Acrylic", aspect: "3/4" },
  { title: "Memorial Wind Chime", category: "Memorial", aspect: "3/4" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === active);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-cosmic-hero">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-violet mb-4">Gallery</p>
            <h1 className="font-serif text-4xl md:text-5xl text-cream mb-4">
              Inspiration &amp; Craftsmanship
            </h1>
            <p className="text-cream-dim max-w-2xl">
              A look at the pieces that leave our workshop. Every item here was
              custom-made for a real customer with a real story.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filters */}
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

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal key={`${item.title}-${i}`} delay={i * 50}>
                <div className="group relative rounded-xl overflow-hidden card-surface break-inside-avoid cursor-pointer glow-violet-hover transition-all duration-500">
                  <div
                    className="bg-gradient-to-br from-charcoal to-midnight flex items-center justify-center"
                    style={{ aspectRatio: item.aspect }}
                  >
                    <p className="text-xs text-cream-dim/30 uppercase tracking-widest text-center px-4">
                      {item.title}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-serif text-sm text-cream">{item.title}</p>
                    <p className="text-[11px] text-violet uppercase tracking-widest mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream-dim">No items in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-violet/10 via-violet/15 to-violet/10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-cream mb-6">
              Want Something Like This?
            </h2>
            <p className="text-cream-dim mb-8">
              Every piece in our gallery was once just an idea. Tell us yours.
            </p>
            <a href="/custom-orders" className="btn-primary">
              Start a Custom Order
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
