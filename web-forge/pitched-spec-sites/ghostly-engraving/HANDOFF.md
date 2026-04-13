# Ghostly Engraving LLC — Spec Site Build Handoff

This document contains everything needed to build the Ghostly Engraving spec site from scratch. All decisions have been made and approved by David (Dead Pixel Design). Execute — don't re-brainstorm.

---

## What This Is

A **spec site** David is building to pitch Ghostly Engraving LLC on a website redesign. The goal is a polished, premium, production-ready site that makes their engraving business look high-end, giftable, professional, and conversion-focused — intentionally outperforming a typical small-business Shopify presence.

This is NOT a live client project yet. It's a pitch piece.

---

## Business Info

- **Business:** Ghostly Engraving LLC
- **Owners:** Jacob and Kayla (Jake informally)
- **Location:** Lewiston, ME 04240
- **Service Area:** New Hampshire, Maine, Massachusetts
- **Phone:** (207) 907-8687
- **Email:** hello@ghostlyengraving.com
- **Instagram:** instagram.com/ghostlyengravingllc
- **Linktree:** linktr.ee/ghostlyengraving
- **Facebook:** facebook.com/GhostlyEngraving
- **Reviews:** 100% recommend (7 reviews on Facebook)
- **Tagline:** "Exquisite craftsmanship, personalized to perfection."
- **Services:** Engraving, Laser Cutting, Personalized Products
- **Products:** Drinkware, keychains, bottle openers, custom gifts, engraved tumblers, acrylic items, personalized products, ornaments, memorial pieces
- **Brand identity:** Ghost-dog mascot on celestial purple background. Spooky elegance, not novelty Halloween.

---

## Stack

- **Framework:** Next.js + React
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** Netlify (deploy a preview link David can share in the pitch)

---

## Build Workflow

**Stitch-first approach:**
1. Use Google Stitch MCP tools to create a project and generate screen designs for 3 key pages (Homepage, Custom Orders, Business Gifting)
2. Extract visual patterns from Stitch output
3. Build all 7 pages in Next.js to match
4. Polish, responsive pass, deploy

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#7C4DFF` | Celestial purple — buttons, accents, brand elements |
| Background dark | `#0D0B1A` to `#1A1530` | Page backgrounds — rich midnight, never pure black |
| Accent | `#B794F6` | Soft lavender — hover states, glows, UI highlights |
| Neutral | `#F5F0EB` | Text on dark backgrounds — warm off-white |
| Trust | `#C9A96E` | Muted gold — star ratings, badges, sparingly |

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Playfair Display | Headlines, hero text, section titles |
| Body | DM Sans | Body copy, UI text, navigation |
| Accent | Monospace (JetBrains Mono or similar) | Small labels, order numbers, process step numbers |

### Effects
- Subtle cosmic grain overlays on dark sections
- Soft purple-to-midnight gradients (not sharp)
- Glassmorphism on cards and modals (frosted glass, subtle blur)
- Soft lavender glow on hover states
- No harsh drop shadows — layered opacity and blur only

### Ghost Mascot Rules
- Watermark in section backgrounds at 5-8% opacity
- Small icon-scale in navbar and footer
- It's a brand mark, not a cartoon character — subtle always

### Avoid
- Pure black (#000) backgrounds
- Neon/electric purple
- Halloween motifs (bats, cobwebs, dripping horror fonts)
- Generic stock photography of smiling people
- Cluttered layouts — use editorial pacing with breathing room

---

## Assets

All assets are in the project root directory. Use them directly in the site.

### Logo & Branding
- `logo.jpg` — Ghost-dog mascot logo on purple background
- `facebook-banner.jpg` — Banner with logo + product samples + "Engraving | Laser Cutting | Personalized Products"

### Product Showcase Photos (use in gallery, homepage, shop)
- `showcase (1).jpg` — Wooden desk nameplate/organizer with engraved company name
- `showcase (2).jpg` — Heart-shaped marble & wood cutting board engraved "The Andersons Est. 2024"
- `showcase (3).jpg` — Laser-cut painted wooden bird (parrot) — intricate detail piece
- `showcase (4).jpg` — Slate coaster with American flag design engraved
- `showcase (5).jpg` — Engraved cross necklace with "John 3:16" + business card
- `showcase (6).jpg` — Bulk order of white tumblers with eagle mascot engraving
- `showcase (7).jpg` — Branded wallet/gift box with Ghostly Engraving logo

### Testimonial Screenshots (extract text, don't embed images)
- `testimonials (1).png` — Holly Bruns: "I have a new project that I am working on, and they helped it come to life by making some beautiful, quality leather etched coasters that serve as a reminder to me to keep moving my project further, and they serve as a great conversation starter. Kayla and Jake put care and attention to detail throughout the entire process. Thank you both!"
- `testimonials (2).png` — Marcus T. Talarico (5 stars): "Ghostly Engraving is an outstanding small business. Jacob and Kayla are incredibly professional and consistently meet — and often exceed — their promised time deadlines. I've worked with them professionally for urn engravings and personally for custom gifts, and the quality has been excellent every time. Their pricing is very reasonable, communication is clear, and they truly care about their work. It's refreshing to work with a reliable local business that takes pride in what they do. Highly recommend Ghostly Engraving for both professional and personal engraving needs."
- `testimonials (3).png` — Anna L. Jackson Wiggers: "I wanted a personalized water bottle for my granddaughter who was starting a new school because it's always hard to remember the new kids name! It came out amazing. She loves it. It was professional, well priced and shipped in time for her birthday! Very happy with my purchase!"
- `testimonials (4).png` through `testimonials (7).png` — Additional reviews, extract text as needed

### Info Screenshots (reference only, don't use in site)
- `info.png` — Facebook page intro section
- `info-2.png` — Facebook page contact/address details

---

## Site Architecture

| Route | Page | Primary Goal |
|-------|------|-------------|
| `/` | Home | Establish brand, showcase range, drive to custom orders or shop |
| `/shop` | Shop / Collections | Browse product categories, filter, discover |
| `/custom-orders` | Custom Orders | Convert custom inquiries — the main money page |
| `/business` | Business & Wholesale | Pitch Ghostly as a B2B partner for branded gifts |
| `/about` | About | Build trust, tell the craft story |
| `/gallery` | Gallery / Inspiration | Showcase work quality across materials/categories |
| `/contact` | Contact / Request a Quote | Frictionless inquiry with smart form |

### Navigation
- Sticky navbar: Logo (left), page links (center), "Request a Quote" CTA button (right, accent-styled)
- Mobile: hamburger with full-screen overlay in midnight/purple
- Footer: contact info, social links, quick links, ghost watermark

### Cross-page Conversion Flow
- Every page has at least one path to `/custom-orders` or `/contact`
- Shop cards link to custom order form pre-filled with category
- Business page has dedicated inquiry CTA
- Gallery items trigger "order something like this" action

---

## Page Specs

### Homepage

Sections in order:

1. **Hero** — Full-viewport dark section. Cosmic gradient background, grain texture, soft purple glow.
   - Headline: **"Crafted to Be Remembered"**
   - Subheadline: "Precision engraving for gifts, keepsakes, and branded moments."
   - CTAs: "Start a Custom Order" (primary/glow button) + "Browse Collections" (ghost button)
   - No product image in hero — products come next

2. **Featured Collections** — Horizontal row of 4-6 glassmorphism cards (Drinkware, Custom Gifts, Business Gifts, Keepsakes, etc.). Image + category name + descriptor. Hover glow. Routes to `/shop` filtered.

3. **Why Ghostly Engraving** — Three-column feature grid:
   - "Precision Craftsmanship" — "Every piece is engraved with care, not stamped out of a catalog. We treat your project like it matters — because it does."
   - "Personalized to You" — "Your design, your words, your vision. We work with you to get every detail right before anything hits the laser."
   - "Made in Maine" — "Small studio. Real people. We're not a fulfillment warehouse — we're the ones actually making your piece."
   - Ghost mascot watermark behind section at low opacity

4. **How It Works** — Numbered 3-step process:
   1. Choose your product or send your idea
   2. We design and confirm your proof
   3. Handcrafted and shipped to you
   - Custom order CTA at the end

5. **Product Showcase** — Asymmetric grid of 4-6 showcase photos. Mixed sizes. Subtle material/category labels. Editorial feel, not shop grid.

6. **Occasions / Use Cases** — Styled tags or cards: Weddings, Birthdays, Corporate Gifts, Memorials, Holidays, Pet Memorials, Business Branding. Link to shop/custom orders.

7. **Testimonials** — 3 cards: Holly Bruns, Marcus T. Talarico, Anna L. Jackson Wiggers. Customer name, star rating (gold), quote text.

8. **Business Gifting Teaser** — Dark section, distinct treatment.
   - Headline: **"Branded Gifts That Actually Get Kept"**
   - Copy: "Corporate swag ends up in a drawer. A custom-engraved piece ends up on a desk, a shelf, a mantle. Give something worth remembering."
   - CTA to `/business`

9. **Final CTA Banner** — Full-width.
   - Headline: **"Ready to Create Something Worth Keeping?"**
   - Sub-copy: "Tell us what you're looking for. We'll take it from there."
   - Single "Request a Custom Quote" button with purple glow

10. **Footer**

### Shop / Collections
- Category filter bar at top (horizontal pills, not sidebar)
- Product cards: image, name, brief description, "Customize" button
- No prices displayed — all cards drive to inquiry
- Cards link to `/custom-orders` pre-contextualized with category

### Custom Orders (main conversion page)
- "How Custom Orders Work" — 3-step process (reused from homepage)
- "What Can We Engrave?" — grid of material/product categories with icons
- File specs section: SVG, PNG, AI, PDF accepted, sizing guidance
- Inquiry form: name, email, category dropdown, description, file upload area, timeline question
- Trust reinforcements around form: testimonial sidebar, satisfaction note, turnaround info
- FAQ accordion below form

### Business & Wholesale
- Value prop section targeting B2B buyers specifically
- Use cases grid: Realtor Closing Gifts, Employee Recognition, Client Appreciation, Event Giveaways, Branded Merch, Promotional Items
- "Why Partner With Us" — dedicated attention, bulk pricing, consistent quality, local business
- Tailored inquiry form: company name, quantity range, timeline, recurring vs one-time
- Features Marcus Talarico review (mentions professional use)

### About
- Craft story section — placeholder copy in warm, grounded tone, easy for Jacob/Kayla to customize
- "Our Process" visual section
- Values/philosophy (craftsmanship, personalization, local business pride)
- No fake bios — placeholders clearly marked

### Gallery
- Filterable masonry grid by material: Wood, Metal, Acrylic, Drinkware, Ornaments, Gifts, Business Branding, Memorial
- Lightbox on click
- "Request Something Like This" link per image routes to `/custom-orders`

### Contact
- Split layout: form left, contact info + map placeholder right
- Form: name, email, phone (optional), inquiry type dropdown (Personal Gift, Business Order, Custom Project, General Question), message, file upload
- Contact details: hello@ghostlyengraving.com, (207) 907-8687, Lewiston ME
- Social links: Instagram, Facebook, Linktree

---

## Components to Build

### Layout
- `Navbar` — sticky, logo + links + CTA, mobile hamburger overlay
- `Footer` — contact info, social links, quick links, ghost watermark
- `PageHero` — reusable hero with headline/subheadline/CTAs, configurable background
- `CTABanner` — full-width conversion section

### Cards
- `CollectionCard` — image + category + descriptor, glassmorphism, hover glow
- `ProductCard` — image + name + description + "Customize" button
- `TestimonialCard` — name, star rating (gold), quote
- `UseCaseCard` — icon + label
- `FeatureCard` — icon + heading + copy

### Interactive
- `ProcessSteps` — numbered 3-step horizontal flow with icons
- `FilterBar` — horizontal pill-style category filter
- `GalleryGrid` — masonry layout with lightbox
- `FAQAccordion` — expandable Q&A
- `InquiryForm` — configurable (personal/business/general) with file upload area
- `MobileMenu` — full-screen overlay nav

### Design System
- `GhostWatermark` — low-opacity mascot background
- `GlowButton` — primary CTA with lavender hover bloom
- `GhostButton` — secondary/outline CTA
- `SectionWrapper` — consistent padding, max-width, section spacing
- `GrainOverlay` — subtle texture for dark sections

---

## Copy Rules

- Refined, warm, confident, slightly atmospheric
- Never cheesy, never corporate bland, never overblown
- No superlatives ("best in the business")
- No novelty language ("spooktacular")
- No generic filler ("one-stop shop," "your satisfaction is our priority")
- Short paragraphs, punchy lines
- CTAs feel like invitations, not pressure

---

## Forms

All forms are **visual only but structured for easy wiring** — proper `name` attributes, semantic `<form>` elements, file upload UI. Ready to connect to Netlify Forms or any backend with minimal changes. Don't submit anywhere in the spec build.

---

## Build Phases

1. **Stitch Design Generation** — Create Stitch project with design system. Generate homepage, custom orders, and business gifting screens. Extract visual patterns.
2. **Next.js Scaffold** — Init project, Tailwind config with design tokens, import assets, build Navbar/Footer/SectionWrapper.
3. **Core Pages** — Homepage (all sections), Custom Orders, Shop/Collections.
4. **Remaining Pages** — Business & Wholesale, About, Gallery, Contact.
5. **Polish & Deploy** — Framer Motion animations (page transitions, scroll reveals, hover states), mobile responsive pass, accessibility check, deploy to Netlify preview.

---

## Stitch Integration

Use the Google Stitch MCP tools directly to generate screen designs. Create a Stitch project first, then generate screens for:
1. Homepage
2. Custom Orders page
3. Business Gifting page

Use the design system (colors, typography, brand mood) as input. Build the code to match Stitch output — adapt rather than pixel-replicate.

---

## Deployment

Deploy to Netlify as a preview so David can share a pitchable link. This is a Dead Pixel Design spec project — David's Netlify account.
