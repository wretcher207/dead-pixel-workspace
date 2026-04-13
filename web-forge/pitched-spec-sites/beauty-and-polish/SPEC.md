# Beauty & Polish — Complete Site Spec

**Spec Site for Dead Pixel Design Portfolio**
**Date:** April 4, 2026
**Status:** Design complete — ready to build

---

## Table of Contents

1. [Business Profile](#1-business-profile)
2. [Tech Stack](#2-tech-stack)
3. [Design System](#3-design-system)
4. [Project Structure](#4-project-structure)
5. [Tailwind Configuration](#5-tailwind-configuration)
6. [Component Architecture](#6-component-architecture)
7. [Page Specs + Copy](#7-page-specs--copy)
8. [Gallery Bento Grid (Detailed)](#8-gallery-bento-grid-detailed)
9. [Animation Plan](#9-animation-plan)
10. [Image Optimization](#10-image-optimization)
11. [SEO Strategy](#11-seo-strategy)
12. [Booking Integration](#12-booking-integration)
13. [Performance](#13-performance)
14. [Asset Rename Map](#14-asset-rename-map)

---

## 1. Business Profile

| Field | Value |
|-------|-------|
| **Name** | Beauty & Polish |
| **Owner** | Bebe |
| **Type** | Women-owned nail salon & waxing studio |
| **Address** | 618 US Route 1, Scarborough, ME 04074 (Dunstan area) |
| **Instagram** | @beautyandpolish_dunstan |
| **Booking** | Fresha (online) |
| **Reviews** | 100% recommendation rate, 48 reviews |
| **Award** | Fresha Best in Class 2026 |
| **Staff** | Bebe (owner/artist), Lindsay (nail technician) |
| **Services** | Dip powder, gel, acrylic, custom nail art, children's manis, pedicures, waxing, eyelash extensions |
| **Near** | Old Orchard Beach, South Portland, Saco, Cape Elizabeth |

### What Makes This Place Different

From 12 real Facebook testimonials, the recurring themes:
- **Bebe is an artist** — clients bring half-formed ideas and she creates something better than they imagined
- **100% recommend rate** — 48 out of 48 people said "go here"
- **Clean, warm, welcoming** — mentioned in nearly every review
- **Walk-ins and last-minute appointments** accepted
- **Family friendly** — a mom brought her 5-year-old for a manicure
- **Tourists seek her out** — "my new OOB nail girl" (Jen Blackmore)
- **Repeat customers for life** — "I won't go anywhere else" (Leah Mary)
- **Wedding-quality work** — Sarah Filatov got wedding nails, came back 3x for waxing

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Fonts | Nunito (headings) + DM Sans (body) via `next/font/google` |
| Booking | Fresha (external link) |
| Contact Form | Netlify Forms or Formspree |
| Deploy | Netlify (static export) |
| Output | `output: "export"` — fully static HTML/CSS/JS |

---

## 3. Design System

**High-Fidelity Claymorphism** — full spec in `design-prompt.md`.

Key points for this build:

- **Canvas:** `#F4F1FA` (pale lavender) — never pure white
- **Primary accent:** `#7C3AED` (vivid violet) — matches B&P's purple branding perfectly
- **Secondary accent:** `#DB2777` (hot pink)
- **Tertiary:** `#0EA5E9` (sky blue)
- **Text:** `#332F3A` (soft charcoal), muted `#635F69` (dark lavender-gray)
- **Cards:** `bg-white/60` to `/80` + `backdrop-blur-xl` + 4-layer shadow stacks
- **Corners:** minimum `rounded-[20px]`, cards at `rounded-[32px]`, large containers `rounded-[48px]`
- **Buttons:** Gradient violet, `rounded-[20px]`, squish on click (`active:scale-[0.92]`)
- **Hover:** Elements lift upward + enhanced shadows
- **Background:** 4 animated blobs (violet, pink, sky blue) at 10% opacity with `blur-3xl`

---

## 4. Project Structure

```
beauty-and-polish/
├── public/
│   └── images/
│       ├── exterior.jpg
│       ├── interior.jpg
│       ├── showcase/
│       │   ├── nails-1.jpg          (purple Easter bunny)
│       │   ├── nails-2.jpg          (sage green daisies)
│       │   ├── nails-3.jpg          (pop art multi-color)
│       │   ├── nails-4.jpg          (St. Patrick's green)
│       │   ├── nails-5.jpg          (black/pink cow print)
│       │   ├── award.jpg            (Fresha Best in Class 2026)
│       │   ├── april.jpg            (seasonal purple flowers)
│       │   └── 100-percent.png      (100% recommend badge)
│       └── video/
│           └── showcase.mp4
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               (root: fonts, metadata, blobs, nav, footer)
│   │   ├── page.tsx                 (home)
│   │   ├── globals.css              (Tailwind directives, tokens, shadows, animations)
│   │   ├── services/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── BackgroundBlobs.tsx
│   │   │   └── PageTransition.tsx
│   │   ├── ui/
│   │   │   ├── ClayCard.tsx
│   │   │   ├── ClayButton.tsx
│   │   │   ├── ClayInput.tsx
│   │   │   ├── ClayTextarea.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── StatOrb.tsx
│   │   │   └── Badge.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustBar.tsx
│   │   │   ├── FeaturedServices.tsx
│   │   │   ├── GalleryPreview.tsx
│   │   │   └── TestimonialsCarousel.tsx
│   │   ├── services/
│   │   │   ├── ServiceCategory.tsx
│   │   │   └── ServiceCard.tsx
│   │   ├── gallery/
│   │   │   ├── BentoGrid.tsx
│   │   │   ├── GalleryTile.tsx
│   │   │   ├── VideoTile.tsx
│   │   │   └── Lightbox.tsx
│   │   ├── about/
│   │   │   ├── OwnerStory.tsx
│   │   │   └── AwardShowcase.tsx
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       ├── ContactInfo.tsx
│   │       └── BookingCTA.tsx
│   │
│   └── lib/
│       ├── constants.ts             (site copy, testimonials, services, nav links)
│       ├── animations.ts            (Framer Motion variant presets)
│       └── types.ts                 (shared TS interfaces)
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Tailwind Configuration

### tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clay: {
          canvas: "#F4F1FA",
          foreground: "#332F3A",
          muted: "#635F69",
          accent: "#7C3AED",
          "accent-light": "#A78BFA",
          "accent-alt": "#DB2777",
          tertiary: "#0EA5E9",
          success: "#10B981",
          warning: "#F59E0B",
          cardBg: "rgba(255, 255, 255, 0.70)",
          pressed: "#EFEBF5",
        },
      },
      fontFamily: {
        heading: ["var(--font-nunito)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      borderRadius: {
        clay: "20px",
        "clay-md": "24px",
        "clay-lg": "32px",
        "clay-xl": "48px",
        "clay-2xl": "60px",
      },
      boxShadow: {
        claySurface: [
          "30px 30px 60px #cdc6d9",
          "-30px -30px 60px #ffffff",
          "inset 10px 10px 20px rgba(139, 92, 246, 0.05)",
          "inset -10px -10px 20px rgba(255, 255, 255, 0.8)",
        ].join(", "),
        clayCard: [
          "16px 16px 32px rgba(160, 150, 180, 0.2)",
          "-10px -10px 24px rgba(255, 255, 255, 0.9)",
          "inset 6px 6px 12px rgba(139, 92, 246, 0.03)",
          "inset -6px -6px 12px rgba(255, 255, 255, 1)",
        ].join(", "),
        clayCardHover: [
          "20px 20px 40px rgba(160, 150, 180, 0.3)",
          "-14px -14px 28px rgba(255, 255, 255, 0.95)",
          "inset 6px 6px 12px rgba(139, 92, 246, 0.05)",
          "inset -6px -6px 12px rgba(255, 255, 255, 1)",
        ].join(", "),
        clayButton: [
          "12px 12px 24px rgba(139, 92, 246, 0.3)",
          "-8px -8px 16px rgba(255, 255, 255, 0.4)",
          "inset 4px 4px 8px rgba(255, 255, 255, 0.4)",
          "inset -4px -4px 8px rgba(0, 0, 0, 0.1)",
        ].join(", "),
        clayButtonHover: [
          "16px 16px 32px rgba(139, 92, 246, 0.4)",
          "-10px -10px 20px rgba(255, 255, 255, 0.5)",
          "inset 4px 4px 8px rgba(255, 255, 255, 0.5)",
          "inset -4px -4px 8px rgba(0, 0, 0, 0.12)",
        ].join(", "),
        clayPressed: [
          "inset 10px 10px 20px #d9d4e3",
          "inset -10px -10px 20px #ffffff",
        ].join(", "),
      },
      keyframes: {
        "clay-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        "clay-float-delayed": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(-2deg)" },
        },
        "clay-float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        "clay-breathe": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        "clay-float": "clay-float 8s ease-in-out infinite",
        "clay-float-delayed": "clay-float-delayed 10s ease-in-out infinite",
        "clay-float-slow": "clay-float-slow 12s ease-in-out infinite",
        "clay-breathe": "clay-breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
```

### globals.css additions

```css
@import "tailwindcss";

.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }

.clay-text-gradient {
  background: linear-gradient(135deg, #332F3A 20%, #7C3AED 60%, #DB2777);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #F4F1FA; }
::-webkit-scrollbar-thumb { background: #cdc6d9; border-radius: 20px; }
::-webkit-scrollbar-thumb:hover { background: #A78BFA; }
```

---

## 6. Component Architecture

### Layout Components

| Component | Description | Key Details |
|-----------|-------------|-------------|
| **Navbar** | Fixed top nav, glass-clay | `bg-white/70 backdrop-blur-xl rounded-[32px] sm:rounded-[40px] shadow-clayCard`. Floats 16px from top, max-w-6xl. Logo left (Nunito 800, accent color). Desktop: ghost nav links center. "Book Now" primary button right. Mobile: hamburger + slide-down panel. |
| **Footer** | Glass footer | `bg-white/40 backdrop-blur-xl rounded-t-[48px] shadow-clayCard`. 3-column grid desktop (brand | links | hours+contact). Social icons as clay icon buttons. |
| **BackgroundBlobs** | Ambient color blobs | `fixed inset-0 -z-10 pointer-events-none`. 4 blobs at `h-[60vh] w-[60vh] rounded-full blur-3xl`: violet `/10`, pink `/10`, sky blue `/10`, violet `/8`. Staggered float animations. |
| **PageTransition** | Route transitions | Framer Motion wrapper. `initial={{ opacity: 0, y: 20 }}` / `animate={{ opacity: 1, y: 0 }}`. |

### UI Primitives

| Component | Props | Styling |
|-----------|-------|---------|
| **ClayCard** | `variant: "glass" \| "solid" \| "glass-strong"`, `hover?`, `className?` | `rounded-[32px] backdrop-blur-xl shadow-clayCard p-6 sm:p-8 transition-all duration-500`. Hover: `-translate-y-2 shadow-clayCardHover`. |
| **ClayButton** | `variant: "primary" \| "secondary" \| "outline" \| "ghost"`, `size: "sm" \| "default" \| "lg"`, `href?` | Primary: violet gradient + white text. All: `hover:-translate-y-1 active:scale-[0.92] active:shadow-clayPressed`. Renders as `<a>` when `href`. |
| **ClayInput** | `label`, `type?`, `placeholder?`, `name` | `h-16 rounded-2xl bg-[#EFEBF5] shadow-clayPressed border-0 px-6 text-lg focus:bg-white focus:ring-4 focus:ring-clay-accent/20`. |
| **SectionHeading** | `title`, `subtitle?`, `gradient?`, `align?` | Title: Nunito font-extrabold `text-3xl sm:text-4xl md:text-5xl`. Subtitle: DM Sans `text-lg text-clay-muted`. |
| **StatOrb** | `value`, `label`, `color?` | `rounded-full w-28 h-28 sm:w-32 sm:h-32 shadow-clayCard animate-clay-breathe bg-white/80 backdrop-blur-xl`. |
| **Badge** | `children`, `variant?` | `rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest`. |

### Page-Specific Components

| Component | Page | Purpose |
|-----------|------|---------|
| HeroSection | Home | Full-height hero with headline, CTAs, exterior photo |
| TrustBar | Home | 3 StatOrbs (100%, 48 reviews, Best in Class) |
| FeaturedServices | Home | 4-card grid linking to /services |
| GalleryPreview | Home | 3-photo teaser grid linking to /gallery |
| TestimonialsCarousel | Home | Horizontal scroll, 6 testimonial cards |
| ServiceCategory | Services | Category wrapper with accent bar |
| ServiceCard | Services | Individual service row (name, leader, price) |
| BentoGrid | Gallery | Master grid layout for all tiles |
| GalleryTile | Gallery | Clickable image tile with hover overlay |
| VideoTile | Gallery | Autoplay muted video with play/pause toggle |
| Lightbox | Gallery | Fullscreen viewer with keyboard/swipe nav |
| OwnerStory | About | Split layout: interior photo + narrative |
| AwardShowcase | About | Fresha certificate + 100% badge display |
| ContactForm | Contact | Clay inputs: name, email, phone, message |
| ContactInfo | Contact | Location, hours, socials, map embed |
| BookingCTA | Home, Services, Contact | Full-width Fresha CTA strip |

---

## 7. Page Specs + Copy

---

### PAGE 1: HOME (`/`)

#### Section 1 — Hero

**Layout:** `grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`, full viewport height minus nav, max-w-7xl.

**Left column:**
- Badge pill: "Women-Owned Nail Salon"
- Headline (Nunito font-black, `text-5xl sm:text-6xl md:text-7xl`, `clay-text-gradient`):

> **You bring the idea. She'll make it better than you imagined.**

- Subtitle (DM Sans text-lg text-clay-muted):

> Custom nail art and meticulous care from an award-winning salon in Scarborough, Maine.

- Two CTAs in `flex flex-col sm:flex-row gap-4`:
  - "Book an Appointment" — ClayButton primary lg (Fresha link)
  - "View Our Work" — ClayButton outline lg (links to /gallery)

**Right column:** `exterior.jpg` in clay frame (`rounded-[32px] lg:rounded-[40px] shadow-claySurface`), `rotate-1 lg:rotate-2 hover:rotate-0 transition-transform duration-700`. Image has `priority`, `sizes="(max-width: 768px) 100vw, 50vw"`.

**Mobile:** Stacks, image below text, CTAs go full-width.

**Animation:** Text fades from left (x: -30), image from right, staggered 0.15s.

---

#### Section 2 — Trust Bar

**Layout:** `py-16 sm:py-20`, `flex flex-wrap justify-center gap-8 sm:gap-12`.

3 StatOrbs with staggered `animate-clay-breathe`:
- **100%** / Recommend (violet tint)
- **48** / Five-Star Reviews (pink tint)
- **2026** / Best in Class (sky blue tint)

Scroll-triggered scale-in from 0.8.

---

#### Section 3 — Intro + Why Beauty & Polish

**Copy:**

> Beauty & Polish is the kind of place people find once and never leave. Owner Bebe is a true nail artist — clients walk in with a half-formed Pinterest board or a vague idea, and walk out staring at their hands in disbelief. That's not marketing. That's 48 reviews, every single one saying the same thing.

**4 Benefit blocks** in `grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl`:

**Actual artistry, not just polish.**
> Bebe hand-paints intricate custom designs — florals, characters, patterns, whatever you dream up. This isn't stamp work. Every set is made for you, from scratch, at the chair.

**48 out of 48 people said go here.**
> A perfect recommendation rate across every review platform. Not one person walked out anything less than thrilled. That kind of consistency doesn't happen by accident.

**Walk-ins and last-minute? Yes.**
> Vacation nail emergency. Wedding this weekend. Forgot your anniversary. They'll fit you in. No guilt, no attitude, just great work on your schedule.

**Warm, clean, and genuinely welcoming.**
> Reviews mention the space almost as often as the nails. Spotless salon, friendly team, zero pretension. Kids are welcome. First-timers are welcome. Everyone is welcome.

Each block is a ClayCard (glass, hover) with a 60x60 gradient icon orb.

---

#### Section 4 — Gallery Preview

**Layout:** `py-16 sm:py-24 bg-white/30 rounded-[48px] mx-4 sm:mx-8`.

SectionHeading: **"Our Work"**

`grid grid-cols-3 gap-3 sm:gap-5 max-w-4xl`. 3 nail photos (nails-1, nails-3, nails-5 for color variety). Each `rounded-[24px] overflow-hidden shadow-clayCard aspect-square`, image with `object-cover` and `group-hover:scale-105`.

Below: ClayButton outline "View Full Gallery" → /gallery.

---

#### Section 5 — Testimonials

**Layout:** `py-16 sm:py-24`. Horizontally scrollable: `overflow-x-auto snap-x snap-mandatory scrollbar-hide`.

6 testimonial ClayCards (glass, `min-w-[300px] sm:min-w-[360px] snap-center`). Each: 5 amber stars, quote, reviewer name (Nunito font-bold text-sm), "via Facebook" label.

**Featured testimonials (curated for strongest impact):**

> "I came with an idea and got the coolest nails done by her. She's a great artist."
> — **Stella L.**

> "Both of us requested intricate designs and Bebe delivered above and beyond. Gorgeous nails, very clean space, and super nice people."
> — **Kaitlyn J.**

> "A vacation nail emergency is no joke! I found Beauty & Polish by reviews and I was not let down. Bebe was simply wonderful — my new OOB nail girl!"
> — **Jen B.**

> "Definitely some of the best nail service I have ever received and the customer service is top-notch."
> — **Christy S.**

> "I won't go anywhere else for my nails!"
> — **Leah M.**

> "10/10! My dip mani always comes out perfect."
> — **Kaylea G.**

---

#### Section 6 — Booking CTA

**Copy:**

> **Ready to see what Bebe can do?**
> Book online in seconds, or just walk in. Either way, you're in good hands.

[Book Now] [View Our Work]

Full-width `bg-gradient-to-br from-[#A78BFA]/10 to-[#DB2777]/10 rounded-[48px]`.

---

### PAGE 2: SERVICES (`/services`)

#### Section 1 — Page Header

`pt-32 pb-12 sm:pt-40 sm:pb-16 text-center max-w-3xl mx-auto`.

**Headline:** What we do (and what it's actually like)

**Intro:**
> Every service at Beauty & Polish starts the same way: a real conversation about what you want. Bebe listens, asks questions, and then gets to work. No rushing, no upselling, no assembly line. Just careful, skilled work from people who clearly love what they do.

---

#### Section 2 — Service Categories

`py-8 sm:py-12 max-w-4xl mx-auto space-y-8`. 4 stacked ServiceCategory cards:

**NAILS** (violet accent bar)

| Service | Description |
|---------|-------------|
| **Dip Powder** | The dip manicure that looks freshly done three weeks later. Lightweight, durable, and available in every color Bebe has — which is a lot. Clients who switch to dip here tend to stay with dip. |
| **Gel Manicure** | Classic gel with a flawless finish. Thin, natural-feeling, and cured properly so it actually lasts. Great for clean, polished looks or as a base for nail art. |
| **Acrylic** | Full acrylic sets and fills, shaped and sculpted by hand. Whether you want short and natural or long and dramatic, Bebe builds the shape you're after — not a default template. |
| **Custom Nail Art** | This is where Beauty & Polish separates from every other salon. Bebe hand-paints designs that range from delicate florals and French tips to bold character art and multi-pattern statement sets. Bring a photo, describe a vibe, or just say "surprise me." She'll exceed the brief every time. |
| **Children's Manicure** | Kid-friendly mani for your little one. Non-toxic options, a patient and gentle approach, and a fun experience they'll talk about for days. Ages 5 and up. |
| **Pedicure** | A proper pedicure: soak, scrub, shaping, cuticle care, and polish or gel finish. Relaxing without being slow. Thorough without being rough. Your feet leave happy. |

**WAXING** (sky blue accent bar)

> Clean, quick, and done right. Bebe and her team are experienced enough to make waxing as painless as it can be — and fast enough that you're not dreading it. Eyebrows, lip, chin, full face, legs, bikini, and more. One client came for wedding nails, loved the experience so much she came back three times for waxing alone.
>
> *Pricing available upon request — book a consultation or call for current rates.*

**EYELASH EXTENSIONS** (pink accent bar)

> Full sets and fills for a natural or dramatic look. Applied carefully, lash by lash, so they actually last and don't damage your natural lashes. If you've had a bad lash experience somewhere else, this is the reset.
>
> *Pricing available upon request — book a consultation or call for current rates.*

Each category: ClayCard solid, left accent bar (`w-1 rounded-full bg-gradient-to-b`). "Book [Category]" ClayButton outline sm at bottom.

*Note: Prices are placeholder — populate from Fresha menu before launch.*

---

#### Section 3 — Booking CTA

BookingCTA component (same as home).

---

### PAGE 3: GALLERY (`/gallery`)

#### Section 1 — Page Header

**Headline:** The proof is in the polish.

**Intro:**
> Every set you see here was done at Beauty & Polish by Bebe and her team. Custom designs, clean lines, bold colors, tiny details. No filters needed.

#### Section 2 — Bento Grid

**See [Section 8](#8-gallery-bento-grid-detailed) for full bento grid spec.**

#### Section 3 — Instagram CTA

`py-16 text-center`. "See more on Instagram" + @beautyandpolish_dunstan link + ClayButton outline.

---

### PAGE 4: ABOUT (`/about`)

#### Section 1 — Page Header

**Headline:** The artist behind the chair.

---

#### Section 2 — Owner Story

**Layout:** `grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto`.

**Left:** `interior.jpg` (two women in traditional Vietnamese ao dai) in `rounded-[40px] shadow-claySurface overflow-hidden`. Lazy loaded, `sizes="(max-width: 1024px) 100vw, 50vw"`.

**Right — Copy:**

> Beauty & Polish started because Bebe doesn't know how to do average work. She's a trained nail artist with the kind of skill that makes clients hand over a half-baked idea and trust her to run with it. And she does — every time — turning vague inspiration into something they can't stop showing off.
>
> The salon sits on Route 1 in Scarborough's Dunstan area, just minutes from Old Orchard Beach. Tourists find her on vacation and come back year after year. Locals claim her as their permanent nail artist and refuse to go anywhere else. The space itself is clean, bright, and welcoming — the kind of place where you feel comfortable the second you walk in, whether it's your first visit or your fiftieth.
>
> Bebe built this business on actual results, not advertising. Forty-eight reviews and every single one is a recommendation. That earned her Fresha's Best in Class 2026 award — given to the top-performing salons on their platform. She didn't chase a rating. Her clients built it for her, one perfect set at a time.

**Team mention (below, or in sidebar card):**

> Lindsay is the other name you'll hear clients rave about. She brings the same level of care and precision to every appointment — beautiful nail art, attention to detail, and the kind of warmth that makes you feel like you're visiting a friend, not a salon.

**Mobile:** Stacks, image on top with `max-h-[400px]`.

**Animation:** Image from left (x: -40), text from right (x: 40), scroll-triggered.

---

#### Section 3 — Award Showcase

Centered. `award.jpg` in ClayCard solid (`rounded-[40px] max-w-sm mx-auto shadow-claySurface p-8`), image `rounded-[24px]`. `100-percent.png` as decorative badge: `absolute -top-4 -right-4 w-20 h-20`.

Below:
- **Fresha Best in Class 2026** — Awarded to the highest-rated salons on the Fresha platform.
- **100% Recommendation Rate** — 48 reviews. 48 recommendations. Zero exceptions.

---

#### Section 4 — Values

3 ClayCards (glass, hover) with icon orbs in `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl`:
- **Women-Owned**
- **Attention to Detail**
- **Warm Welcome**

---

#### Section 5 — Booking CTA

---

### PAGE 5: CONTACT (`/contact`)

#### Section 1 — Page Header

**Headline:** Let's get you on the books.

**Intro:**
> Book online through Fresha anytime — it takes about 30 seconds. Walk-ins are also welcome when availability allows, so if you're in the area and want to take a chance, just stop by. For custom nail art or special requests, booking ahead gives Bebe time to prepare your design.

---

#### Section 2 — Two-Column Layout

`grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto`.

**Left (3/5):** ContactForm in ClayCard glass-strong.
- Name + Email row (`grid sm:grid-cols-2 gap-4`)
- Phone (full-width)
- Message textarea (rows=5)
- ClayButton primary lg "Send Message" (`w-full sm:w-auto`)
- Below form: "Or book directly on Fresha" text link

**Right (2/5):** ContactInfo in ClayCard glass.
- Location: 618 US Route 1, Scarborough, ME (Dunstan area)
- Phone: `tel:` link
- Hours: [confirm with salon]
- Instagram: @beautyandpolish_dunstan
- Facebook
- Google Maps embed: `rounded-[24px] overflow-hidden shadow-clayCard h-[200px]`

**Mobile:** Stacks, form on top.

---

## 8. Gallery Bento Grid (Detailed)

### Container

`max-w-6xl mx-auto px-4 sm:px-6`.

Grid: `grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] sm:auto-rows-[240px] md:auto-rows-[280px] gap-3 sm:gap-4`.

### Desktop Layout (md+, 4 columns)

```
┌─────────────────────┬───────────┬───────────┐
│                     │           │           │
│   nails-3.jpg       │ nails-1   │ nails-2   │
│   (pop art)         │ (purple)  │ (sage)    │
│   col-span-2        │           │           │
│   row-span-2        │           │           │
│                     ├───────────┴───────────┤
│                     │                       │
│                     │    video.mp4          │
│                     │    col-span-2         │
├─────────┬───────────┼───────────┬───────────┤
│         │           │           │           │
│ nails-4 │ award.jpg │           │ nails-5   │
│ (green) │ col-span-2│           │ (cow)     │
│         │ row-span-2│           │           │
│         │           │           │           │
├─────────┤           ├───────────┤           │
│         │           │           │           │
│ april   │           │ 100%      │           │
│ (flowers)│          │ badge     │           │
├─────────┴───────────┴───────────┴───────────┘
```

### Tile Assignments

| # | Asset | md+ col-span | md+ row-span | Notes |
|---|-------|:---:|:---:|-------|
| 1 | nails-3.jpg (pop art) | 2 | 2 | **Hero tile.** Most vivid colors, maximum impact. |
| 2 | nails-1.jpg (purple Easter) | 1 | 1 | Purple ties to brand accent color. |
| 3 | nails-2.jpg (sage daisies) | 1 | 1 | Softer tone provides contrast. |
| 4 | video.mp4 | 2 | 1 | Horizontal format. Autoplay muted loop. |
| 5 | nails-4.jpg (St. Patrick's) | 1 | 1 | Green pop of color. |
| 6 | award.jpg (Fresha cert) | 2 | 2 | Social proof anchor. Portrait format suits certificate. |
| 7 | nails-5.jpg (cow print) | 1 | 1 | Black/pink contrast. |
| 8 | april.jpg (seasonal flowers) | 1 | 1 | Seasonal decorative element. |
| 9 | 100-percent.png | 1 | 1 | Special: smaller image centered, `bg-clay-accent/5` background. No lightbox. |

### Mobile Layout (< md, 2 columns)

- nails-3 (hero): col-span-2, row-span-2
- video: col-span-2
- award: col-span-2, row-span-2
- All others: col-span-1, row-span-1
- Source order preserved

### Tile Interactions

**Image tiles:** Clickable → opens Lightbox. Hover: `-translate-y-2`, `shadow-clayCardHover`, inner image `group-hover:scale-[1.03]`. Tag badge ("Nail Art", "Award", "Seasonal") fades in at bottom-left on hover via `opacity-0 group-hover:opacity-100 bg-gradient-to-t from-black/40`.

**Video tile:** Autoplay muted loop playsInline. Custom circular play/pause button at bottom-right (40x40 ClayButton ghost). Hover shows play icon if paused. `object-cover w-full h-full`.

**100% badge tile:** No lightbox, tooltip only. Accent background.

### Lightbox Behavior

- Backdrop: `bg-black/80 backdrop-blur-md fixed inset-0 z-50`
- Image: `max-w-4xl max-h-[85vh] rounded-[32px] shadow-claySurface`
- Nav: Circular clay buttons on sides (prev/next)
- Close: Top-right button
- Keyboard: ArrowLeft, ArrowRight, Escape
- Mobile: Framer Motion `drag="x"` with `dragConstraints`, `onDragEnd` threshold 100px
- Entry: `scale: 0.9, opacity: 0` → `scale: 1, opacity: 1` (spring)
- Image switching: Horizontal slide animation
- Body scroll locked while open
- Only image tiles in lightbox array (video and 100% badge excluded)

---

## 9. Animation Plan

### Framer Motion Variants (`lib/animations.ts`)

```ts
export const smoothEase = { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] };

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: smoothEase },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: smoothEase },
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: smoothEase },
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: smoothEase },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const lightboxVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};
```

### Scroll Trigger Pattern

```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
>
```

### CSS-Only Micro-Animations (not Framer — for performance)

- Card lift: `hover:-translate-y-2 hover:shadow-clayCardHover transition-all duration-500`
- Button lift: `hover:-translate-y-1 hover:shadow-clayButtonHover transition-all duration-200`
- Button squish: `active:scale-[0.92] active:shadow-clayPressed`
- Gallery image zoom: `group-hover:scale-[1.03] transition-transform duration-500`
- Gallery overlay: `opacity-0 group-hover:opacity-100 transition-opacity duration-300`
- Background blobs: CSS keyframes only (no JS)

### Reduced Motion

All animations respect `@media (prefers-reduced-motion: reduce)` — see globals.css.

---

## 10. Image Optimization

### Next.js Image Settings

| Image | priority | loading | sizes | quality |
|-------|:---:|:---:|-------|:---:|
| exterior.jpg (hero) | `true` | eager | `(max-width: 768px) 100vw, 50vw` | 85 |
| interior.jpg (about) | `false` | lazy | `(max-width: 1024px) 100vw, 50vw` | 85 |
| nails-1 through nails-5 | `false` | lazy | `(max-width: 768px) 50vw, 25vw` | 80 |
| award.jpg | `false` | lazy | `(max-width: 768px) 100vw, 50vw` | 85 |
| april.jpg | `false` | lazy | `(max-width: 768px) 50vw, 25vw` | 80 |
| 100-percent.png | `false` | lazy | `80px` | 90 |

- All images use `next/image` — no raw `<img>` tags
- Next.js handles WebP/AVIF conversion automatically
- Use `placeholder="blur"` with generated `blurDataURL` for gallery images
- Video: `<video>` with `preload="metadata"`, poster frame at `/images/video/poster.jpg`

### Alt Text

| File | Alt Text |
|------|----------|
| exterior.jpg | Beauty and Polish nail salon storefront at 618 US Route 1, Scarborough, Maine |
| interior.jpg | Beauty and Polish salon owners in traditional Vietnamese ao dai |
| nails-1.jpg | Purple glitter dip powder nails with hand-painted bunny and chick nail art by Beauty and Polish |
| nails-2.jpg | Sage green gel manicure with hand-painted white daisy accents by Beauty and Polish |
| nails-3.jpg | Vibrant pop art nails with bold colors, polka dots, and stripes by Beauty and Polish in Scarborough, Maine |
| nails-4.jpg | St. Patrick's Day themed nails with green shamrocks, polka dots, and stars |
| nails-5.jpg | Black and pink cow print nails with polka dot accent nails by Beauty and Polish |
| award.jpg | Fresha Best in Class 2026 award certificate for Beauty and Polish |
| april.jpg | Hello April seasonal post with purple cineraria flowers |

### SEO File Naming

Rename images before build (see [Asset Rename Map](#14-asset-rename-map)).

---

## 11. SEO Strategy

### Target Keywords

**Primary (build into core pages):**

| Keyword | Target Page |
|---------|-------------|
| nail salon scarborough maine | Home, Services |
| nail salon scarborough me | Home |
| waxing scarborough maine | Services |
| manicure scarborough maine | Services |

**Secondary:**

| Keyword | Target Page |
|---------|-------------|
| dip powder nails scarborough me | Services |
| gel manicure scarborough maine | Services |
| acrylic nails scarborough me | Services |
| eyelash extensions scarborough maine | Services |
| eyebrow waxing scarborough me | Services |
| nail salon near old orchard beach | Home |
| nail salon dunstan scarborough | Home, About |
| women owned nail salon scarborough me | About |

**Long-tail:**
- best nail salon scarborough maine
- custom nail art scarborough me
- children's manicure scarborough maine
- dip powder nails near old orchard beach maine
- nail salon with online booking scarborough
- fresha best in class nail salon maine

### Meta Tags (Per Page)

| Page | Title | Description |
|------|-------|-------------|
| **Home** | `Beauty & Polish \| Nail Salon & Waxing Studio in Scarborough, ME` | Award-winning nail salon in Scarborough, Maine. Dip powder, gel manicures, acrylic nails, custom nail art, waxing & lash extensions. 100% recommended. Book online today. |
| **Services** | `Nail & Waxing Services \| Beauty & Polish - Scarborough, ME` | Dip powder nails, gel manicures, acrylics, custom nail art, pedicures, full face & body waxing, eyelash extensions, and children's manicures. Book on Fresha. |
| **Gallery** | `Nail Art Gallery \| Beauty & Polish - Scarborough, Maine` | See our latest custom nail designs, dip powder sets, gel manicures, and acrylic work. Fresha Best in Class 2026. |
| **About** | `About Beauty & Polish \| Women-Owned Nail Salon - Scarborough, ME` | Meet Bebe and Lindsay at Beauty & Polish in Dunstan, Scarborough. Women-owned, Fresha Best in Class 2026, and 100% recommended on 48 reviews. |
| **Contact** | `Book Online \| Beauty & Polish - 618 US Route 1, Scarborough, ME` | Book your nail or waxing appointment at Beauty & Polish in Scarborough, Maine. Online booking via Fresha. Walk-ins welcome. |

### Schema Markup (JSON-LD)

**Primary — NailSalon (on all pages via layout):**

```json
{
  "@context": "https://schema.org",
  "@type": "NailSalon",
  "name": "Beauty & Polish",
  "description": "Award-winning nail salon and waxing studio in Scarborough, Maine.",
  "url": "https://www.beautyandpolishme.com",
  "telephone": "+1-XXX-XXX-XXXX",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "618 US Route 1",
    "addressLocality": "Scarborough",
    "addressRegion": "ME",
    "postalCode": "04074",
    "addressCountry": "US"
  },
  "image": "https://www.beautyandpolishme.com/images/exterior.jpg",
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/beautyandpolish_dunstan",
    "https://www.facebook.com/beautyandpolish"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "48",
    "bestRating": "5"
  },
  "award": "Fresha Best in Class 2026"
}
```

Plus: `BreadcrumbList` on all inner pages, `ImageGallery` on gallery page, `FAQPage` on services page if FAQ section added.

### Local SEO Priorities

1. **Google Business Profile** — fully optimized with all services, photos, correct hours, appointment link
2. **NAP consistency** — "Beauty & Polish" / 618 US Route 1, Scarborough, ME 04074 / phone — identical everywhere
3. **Citations** — claim on Yelp, Apple Maps, Bing Places, YellowPages, Foursquare, Scarborough Chamber
4. **Google review strategy** — QR code at checkout, direct review link, respond to every review
5. **Weekly GBP posts** — nail art photo + local keyword + "Book now" CTA
6. **Open Graph + Twitter Cards** — use best gallery photo as social sharing image

### Content Strategy (Post-Launch)

Blog posts at 1-2/month for long-tail SEO:
1. "Dip Powder vs. Gel Manicure: Which Is Right for You?"
2. "Your Guide to Waxing Services at Beauty & Polish"
3. "Spring 2026 Nail Trends We're Loving in Scarborough"
4. "What to Know Before Your First Eyelash Extension Appointment"
5. "Why We Love Dip Powder Nails (And Why Our Clients Do Too)"
6. "Kids' Manicure Day: A Special Treat for Your Little One"

---

## 12. Booking Integration

### Fresha URL

```
https://www.fresha.com/a/beauty-polish-scarborough-618-u-s-1-nm9qgivr/all-offer?menu=true
```

### Strategy

External link approach — all "Book Now" CTAs point to Fresha via `<a target="_blank" rel="noopener noreferrer">`. Fresha handles scheduling, payment, confirmations. No iframe embed needed for launch.

### CTA Placement

| Location | Text | Style |
|----------|------|-------|
| Navbar (all pages) | "Book Now" | ClayButton primary sm |
| Home hero | "Book an Appointment" | ClayButton primary lg |
| Home/Services/Contact bottom | "Book on Fresha" | ClayButton primary lg |
| Services per-category | "Book [Category]" | ClayButton outline sm |
| Contact page | "Or book directly on Fresha" | Text link |
| Footer | "Book Online" | ClayButton outline sm |

---

## 13. Performance

### Font Loading

```tsx
// src/app/layout.tsx
import { Nunito, DM_Sans } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});
```

Self-hosted via `next/font/google` (no Google network request). Only specified weights downloaded.

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | `priority` on hero image, preloaded fonts, minimal JS |
| INP | < 200ms | CSS-only hover animations, Framer uses transform/opacity only |
| CLS | < 0.1 | Explicit image dimensions, `display: swap`, no above-fold injection |

### Server vs. Client Components

Server components by default. `"use client"` only on:
- Navbar (mobile menu state)
- TestimonialsCarousel (scroll interaction)
- BentoGrid / GalleryTile / VideoTile (lightbox click handlers)
- Lightbox (fully interactive)
- ContactForm (form state)
- PageTransition (Framer Motion)

### Static Export

`output: "export"` in `next.config.ts`. Deploy to Netlify as static. Contact form via Netlify Forms or Formspree.

---

## 14. Asset Rename Map

| Original | Renamed (in `public/images/`) |
|----------|-------------------------------|
| `exteriort.jpg` | `exterior.jpg` |
| `showcase/interior.jpg` | `interior.jpg` |
| `showcase/nails.jpg` | `showcase/nails-1.jpg` |
| `showcase/nails2.jpg` | `showcase/nails-2.jpg` |
| `showcase/nails3.jpg` | `showcase/nails-3.jpg` |
| `showcase/nails4.jpg` | `showcase/nails-4.jpg` |
| `showcase/nails5.jpg` | `showcase/nails-5.jpg` |
| `showcase/award.jpg` | `showcase/award.jpg` |
| `showcase/april.jpg` | `showcase/april.jpg` |
| `showcase/100-percent-.png` | `showcase/100-percent.png` |
| `video.mp4` | `video/showcase.mp4` |

---

## Extracted Testimonials (Full Set)

For `lib/constants.ts`:

```ts
export const testimonials = [
  {
    name: "Stella L.",
    text: "I just got my nails done with Bebe and what a great experience! I came with an idea and got the coolest nails done by her. She's a great artist and the salon environment was really nice and clean. Would absolutely recommend Beauty and Polish!",
    tags: ["Beautiful results", "Amazing results"],
  },
  {
    name: "Kaitlyn J.",
    text: "Can't say enough great things about Bebe and Beauty and Polish! First time customers, booked myself a new set of dip with tips and a manicure for my 5 year old daughter. Both of us requested intricate designs and BeBe delivered above and beyond. Gorgeous nails, very clean space and super nice people!",
  },
  {
    name: "Jen B.",
    text: "A vacation nail emergency is no joke! I found Beauty and Polish by FB and google reviews and I was not let down! Bebe was simply wonderful to deal with! Her shop is clean and welcoming. She herself could not have been friendlier and her staff the same! I needed a Dip manicure with design and she did an amazing job!!! I highly recommend Beauty and Polish! Thank You Bebe — my new OOB nail girl!",
    tags: ["Beautiful results"],
  },
  {
    name: "Christy S.",
    text: "Went to this salon for the very first time a friend recommended it and they are amazing. Definitely some of the best Nails service I have ever received and the customer service is top-notch.",
  },
  {
    name: "Leah M.",
    text: "I love it here! Bebe and her staff are all so welcoming and sweet. It's clean and well maintained. I won't go anywhere else for my nails! Very much recommend!",
  },
  {
    name: "Kaylea G.",
    text: "10/10! My dip mani always comes out perfect.",
  },
  {
    name: "Sarah F.",
    text: "I went to Beauty and Polish for the first time a few months back to have my nails done for my wedding and a full face wax. My nails turned out beautifully and I have been back 3 times for waxing. 100% recommended.",
  },
  {
    name: "Heather M.",
    text: "I got my eyelash extensions done here yesterday. Not only was it super easy to get in, but the appointment didn't take forever either. The woman that did my eyelashes was super sweet and knew exactly what she was doing. I definitely enjoyed my experience and will definitely be booking again.",
  },
  {
    name: "Lucia D.",
    text: "Fantastic services for special occasion or when you just want to have great mani pedi for Me Time.",
  },
  {
    name: "Kira S.",
    text: "The place was clean and quiet. The technician that I had was very professional too. I had a dip powder and extended nails, they turned out great and exactly what I wanted.",
    tags: ["Last-minute appointments"],
  },
  {
    name: "Grace M.",
    text: "This place is awesome!!! I was left with fabulous looking eyebrows!!!",
  },
  {
    name: "Donna W.",
    text: "I had an amazing manicure by Lindsay today! Beautiful color and some nail art — done professionally and carefully — love it!",
  },
];
```

---

## Build Checklist

- [ ] Initialize Next.js project with App Router
- [ ] Configure Tailwind with clay design tokens
- [ ] Set up font loading (Nunito + DM Sans)
- [ ] Rename and organize all assets into `public/images/`
- [ ] Build layout components (Navbar, Footer, BackgroundBlobs, PageTransition)
- [ ] Build UI primitives (ClayCard, ClayButton, ClayInput, SectionHeading, StatOrb, Badge)
- [ ] Build Home page (6 sections)
- [ ] Build Services page (3 sections)
- [ ] Build Gallery page (bento grid + lightbox)
- [ ] Build About page (5 sections)
- [ ] Build Contact page (form + info + map)
- [ ] Add all JSON-LD schema markup
- [ ] Configure sitemap.ts and robots.ts
- [ ] Add Open Graph / Twitter Card meta tags
- [ ] Test responsive behavior (mobile-first)
- [ ] Test reduced motion preference
- [ ] Lighthouse audit (target 90+ all categories)
- [ ] Deploy to Netlify
