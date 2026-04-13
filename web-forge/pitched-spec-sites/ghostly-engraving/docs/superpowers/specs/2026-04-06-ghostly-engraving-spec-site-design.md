# Ghostly Engraving LLC — Spec Site Design

Spec site concept for Ghostly Engraving LLC, a laser engraving and personalized products business in Lewiston, Maine. This is a redesign pitch — the goal is a polished, premium site that outperforms a typical small-business Shopify presence.

---

## 1. Brand Strategy

**Positioning:** Boutique artisan engraving studio. Premium local choice for personalized gifts, keepsakes, and branded business products. Not a commodity Etsy shop.

**Value Proposition Hierarchy:**
1. Custom craftsmanship with personal care (not factory output)
2. Gift-worthy presentation and quality
3. Easy custom ordering (friction killer)
4. Business/wholesale as a serious revenue channel

**Brand Personality:** Spectral elegance — the ghost-dog mascot and purple palette create a distinctive, memorable identity without going novelty-store. Refined eerie charm — warm, confident, slightly atmospheric.

**Target Customer Segments (priority order):**
1. Gift buyers (individuals, couples, families) — highest volume
2. Small businesses needing branded/client gifts — highest per-order value
3. Event organizers (weddings, corporate events) — seasonal spikes
4. Memorial/keepsake buyers — high emotional value, word-of-mouth drivers

**Competitive Angle:** Most small engraving businesses use stock Shopify templates, cluttered Etsy storefronts, or basic Facebook pages. This site positions Ghostly Engraving a tier above — stronger brand identity, clearer custom-order pathway, better business gifting positioning, more premium perceived value.

---

## 2. Visual Direction & Design System

### Color Palette
- **Primary:** Celestial purple (#7C4DFF)
- **Background:** Deep midnight (#0D0B1A to #1A1530) — rich, not pure black
- **Accent:** Soft lavender glow (#B794F6) — highlights, hover states, subtle UI cues
- **Neutral:** Warm off-white (#F5F0EB) — text on dark, avoids harsh white
- **Trust accent:** Muted gold (#C9A96E) — sparingly for star ratings, badges

### Typography
- **Display/Headlines:** Playfair Display (serif)
- **Body/UI:** DM Sans (sans-serif)
- **Accents:** Monospace for small labels, order numbers, process steps

### Textures & Effects
- Subtle cosmic grain overlays on dark sections
- Soft purple-to-midnight gradients (not sharp)
- Glassmorphism for cards and modals (frosted glass, subtle blur)
- Soft glow on hover states (lavender bloom)
- No harsh drop shadows — use layered opacity and blur

### Ghost Mascot Usage
- Subtle watermark in section backgrounds (5-8% opacity)
- Small icon-scale version in navbar and footer
- Brand mark, not a cartoon character — never at full prominence

### Photography
- Products on dark/moody backgrounds where possible
- Warm directional lighting that catches engraving detail
- Use the actual collected showcase images directly in the site

### Avoid
- Pure black backgrounds (#000)
- Neon/electric purple — stay cosmic and soft
- Halloween motifs (bats, cobwebs, dripping fonts)
- Generic stock photography
- Cluttered multi-column grid layouts

---

## 3. Site Architecture

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
- Mobile: hamburger menu with full-screen overlay in midnight/purple palette
- Footer: contact info, social links (Instagram, Facebook, Linktree), quick links, ghost mascot watermark

### Cross-page Conversion Flow
- Every page has at least one path to `/custom-orders` or `/contact`
- Shop collection cards link to custom order form pre-filled with that category
- Business page has its own dedicated inquiry CTA
- Gallery items trigger "order something like this" action

---

## 4. Homepage Wireframe

**Section flow, top to bottom:**

### Hero
Full-viewport dark section. Large serif headline over subtle cosmic gradient. Subheadline in sans-serif. Two CTAs: "Start a Custom Order" (primary) and "Browse Collections" (secondary/ghost button). Faint grain texture and soft purple ambient glow. No product image competing with the message.

**Headline:** "Crafted to Be Remembered"
**Subheadline:** "Precision engraving for gifts, keepsakes, and branded moments."

### Featured Collections
Horizontal row of 4-6 collection cards (Drinkware, Custom Gifts, Business Gifts, Keepsakes, etc.). Glassmorphism with subtle hover glow. Click routes to `/shop` filtered to that collection.

### Why Ghostly Engraving
Three-column feature grid with icon + heading + short copy:
- "Precision Craftsmanship" — "Every piece is engraved with care, not stamped out of a catalog. We treat your project like it matters — because it does."
- "Personalized to You" — "Your design, your words, your vision. We work with you to get every detail right before anything hits the laser."
- "Made in Maine" — "Small studio. Real people. We're not a fulfillment warehouse — we're the ones actually making your piece."

Ghost mascot watermark behind section at low opacity.

### How It Works
Numbered 3-step horizontal process:
1. Choose your product or send your idea
2. We design and confirm your proof
3. Handcrafted and shipped to you

Connects to custom order CTA at the end.

### Product Showcase
Asymmetric grid of 4-6 best product photos from showcase images. Mixed sizes for visual interest. Subtle labels (material or category). Editorial inspiration, not a shop grid.

### Occasions / Use Cases
Row of styled tags or cards: Weddings, Birthdays, Corporate Gifts, Memorials, Holidays, Pet Memorials, Business Branding. Each links to relevant shop category or custom orders.

### Testimonials
3 testimonial cards. Text extracted from Facebook reviews, styled as cards with customer name, star rating (gold accent), quote text.

**Testimonials to feature:**
- Holly Bruns: "...they helped it come to life by making some beautiful, quality leather etched coasters... Kayla and Jake put care and attention to detail throughout the entire process."
- Marcus T. Talarico: "Ghostly Engraving is an outstanding small business. Jacob and Kayla are incredibly professional and consistently meet — and often exceed — their promised time deadlines..."
- Anna L. Jackson Wiggers: "I wanted a personalized water bottle for my granddaughter... It came out amazing. She loves it. It was professional, well priced and shipped in time for her birthday!"

### Business Gifting Teaser
Dark section with distinct visual treatment. Headline: "Branded Gifts That Actually Get Kept." Brief pitch: "Corporate swag ends up in a drawer. A custom-engraved piece ends up on a desk, a shelf, a mantle. Give something worth remembering." CTA to `/business`.

### Final CTA Banner
Full-width section. Headline: "Ready to Create Something Worth Keeping?" Sub-copy: "Tell us what you're looking for. We'll take it from there." Single prominent "Request a Custom Quote" button with soft purple glow.

### Footer

---

## 5. Interior Pages

### Shop / Collections
- Category filter bar at top (horizontal pills, not sidebar)
- Product cards: image, name, brief description, "Customize" button
- No prices — custom work drives to inquiry rather than cart
- Cards link to `/custom-orders` with category pre-contextualized

### Custom Orders
- "How Custom Orders Work" (3-step process, reused from home)
- "What Can We Engrave?" — grid of material/product categories with icons
- File specs: accepted file types (SVG, PNG, AI, PDF), sizing guidance
- Inquiry form: name, email, category dropdown, description, file upload, timeline
- Trust reinforcements around form: testimonial sidebar, satisfaction note, turnaround info
- FAQ accordion below the form

### Business & Wholesale
- Value prop section targeting B2B buyer
- Use cases grid: Realtor Closing Gifts, Employee Recognition, Client Appreciation, Event Giveaways, Branded Merch, Promotional Items
- "Why Partner With Us" section (dedicated attention, bulk pricing, consistent quality, local)
- Tailored form (company name, quantity range, timeline, recurring vs one-time)
- Features Marcus Talarico review (mentions professional/business use)

### About
- Craft story section with placeholder copy in warm, grounded tone
- "Our Process" visual section
- Values/philosophy section (craftsmanship, personalization, local business pride)
- No fake bios — placeholders clearly marked for real content

### Gallery
- Filterable masonry grid by material: Wood, Metal, Acrylic, Drinkware, Ornaments, Gifts, Business Branding, Memorial
- Lightbox view on click
- "Request Something Like This" link per image, routes to custom orders

### Contact
- Split layout: form on one side, contact info + map placeholder on other
- Form: name, email, phone (optional), inquiry type dropdown, message, file upload
- Contact details: hello@ghostlyengraving.com, (207) 907-8687, Lewiston ME
- Social links: Instagram, Facebook, Linktree

---

## 6. Copy Direction

**Voice:** Refined, warm, confident, slightly atmospheric. Never cheesy, never corporate.

**Rules:**
- No superlatives ("best in the business")
- No novelty language ("spooktacular," "boo-tiful")
- No generic filler ("one-stop shop," "your satisfaction is our priority")
- Short paragraphs, punchy lines, let the products speak
- CTAs feel like invitations, not pressure

**Key Headlines:**
- Hero: "Crafted to Be Remembered"
- Business teaser: "Branded Gifts That Actually Get Kept"
- Custom orders CTA: "Have something in mind? Let's make it real."
- Final CTA: "Ready to Create Something Worth Keeping?"

---

## 7. Component List

### Layout
- `Navbar` — sticky, logo + links + CTA button, mobile hamburger overlay
- `Footer` — contact info, social links, quick links, ghost watermark
- `PageHero` — reusable hero with headline/subheadline/CTAs, configurable background
- `CTABanner` — full-width conversion section, bottom of most pages

### Cards
- `CollectionCard` — image + category + descriptor, glassmorphism, hover glow
- `ProductCard` — image + name + description + "Customize" button
- `TestimonialCard` — customer name, star rating, quote text
- `UseCaseCard` — icon + label
- `FeatureCard` — icon + heading + copy

### Interactive
- `ProcessSteps` — numbered 3-step horizontal flow with icons
- `FilterBar` — horizontal pill-style category filter
- `GalleryGrid` — masonry layout with lightbox
- `FAQAccordion` — expandable question/answer pairs
- `InquiryForm` — configurable form (personal/business/general) with file upload
- `MobileMenu` — full-screen overlay navigation

### Design System
- `GhostWatermark` — low-opacity mascot background element
- `GlowButton` — primary CTA with lavender hover bloom
- `GhostButton` — secondary/outline CTA
- `SectionWrapper` — consistent padding, max-width, spacing
- `GrainOverlay` — subtle texture layer for dark sections

---

## 8. Build Plan

### Phase 1: Stitch Design Generation
- Create Stitch project with Ghostly Engraving design system
- Generate 3 key screens: Homepage, Custom Orders, Business Gifting
- Review outputs, extract visual patterns to replicate in code

### Phase 2: Next.js Scaffold
- Initialize Next.js + Tailwind project
- Set up design system in Tailwind config (colors, fonts, spacing tokens)
- Import asset images (logo, showcase photos)
- Build global layout (Navbar, Footer, SectionWrapper)

### Phase 3: Core Pages
- Homepage (all sections from wireframe)
- Custom Orders (process, materials, form, FAQ)
- Shop / Collections (filter bar, product cards)

### Phase 4: Remaining Pages
- Business & Wholesale
- About
- Gallery
- Contact

### Phase 5: Polish & Deploy
- Animations (Framer Motion — page transitions, scroll reveals, hover states)
- Mobile responsive pass
- Accessibility check (contrast, focus states, semantic HTML, alt text)
- Deploy to Netlify as preview

---

## 9. Technical Decisions

- **Stack:** Next.js + Tailwind CSS + Framer Motion
- **Images:** Actual collected showcase/testimonial assets used directly
- **Testimonials:** Text extracted from Facebook screenshots, styled as cards
- **Forms:** Visual with proper structure for easy wiring later (Netlify Forms ready)
- **Deployment:** Netlify preview deploy for pitchable link
- **Design reference:** Stitch-generated screens for homepage, custom orders, and business gifting

---

## 10. Business Info Reference

- **Business:** Ghostly Engraving LLC
- **Owners:** Jacob and Kayla
- **Location:** Lewiston, ME 04240
- **Service Area:** New Hampshire, Maine, Massachusetts
- **Phone:** (207) 907-8687
- **Email:** hello@ghostlyengraving.com
- **Instagram:** instagram.com/ghostlyengravingllc
- **Linktree:** linktr.ee/ghostlyengraving
- **Facebook:** facebook.com/GhostlyEngraving
- **Reviews:** 100% recommend (7 reviews)
- **Tagline:** "Exquisite craftsmanship, personalized to perfection."
- **Services:** Engraving, Laser Cutting, Personalized Products
