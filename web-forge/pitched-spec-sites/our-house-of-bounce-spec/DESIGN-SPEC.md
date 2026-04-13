# Our House of Bounce — Design Specification

## Overview

**Business**: Our House of Bounce — bounce house and inflatable rental company in Maine
**Phone**: 207-432-8735
**Facebook**: @OurHouseOfBounce
**Target**: Families (birthday parties) + businesses (community events, school field days, company picnics, church fairs)
**Brand Message**: "Every family should be able to celebrate their kids. Kids don't remember how much you spent... they're only kids once. We're here to help you make those memories."

**Site Type**: Single-page spec site for Dead Pixel Design cold outreach
**Tech Stack**: React + Vite + Tailwind CSS
**Design System**: Playful Geometric (from `design.md`), adapted to match brand colors
**Template Goal**: If the build goes well, this becomes a reusable template

---

## Design System: `design.md`

The full Playful Geometric design system lives in `design.md` in this folder. Read it before building. Below are the adaptations specific to this project.

---

## Brand Color Adaptation

The Playful Geometric system defaults to violet/pink. Remap all tokens to match the Our House of Bounce logo (navy, red, yellow, green):

```
background:        #FFFDF5    // Warm Cream (keep as-is, paper feel)
foreground:        #1B3A5C    // Brand Navy (replaces Slate 800)
muted:             #F1F5F9    // Slate 100 (keep)
mutedForeground:   #64748B    // Slate 500 (keep)
accent:            #1B3A5C    // Brand Navy (primary actions, replaces Violet)
secondary:         #E63946    // Bounce Red (playful pop, replaces Hot Pink)
tertiary:          #FBBF24    // Amber/Yellow (already matches logo, keep)
quaternary:        #2D9F3F    // Bounce Green (replaces Mint)
border:            #CBD5E1    // Slightly stronger for chunky borders
card:              #FFFFFF    // White
input:             #FFFFFF    // White
ring:              #1B3A5C    // Navy focus ring
```

**Hard shadow color**: Use `#1B3A5C` (navy) instead of the default `#1E293B` for all hard shadows.

**Confetti/decoration rotation rule**: Decorative shapes cycle through red, yellow, green. Navy is the anchor color, not decoration.

---

## Fonts

Load from Google Fonts:

- **Headings**: `"Outfit", system-ui, sans-serif` — weights 700 (Bold) and 800 (ExtraBold)
- **Body**: `"Plus Jakarta Sans", system-ui, sans-serif` — weights 400 (Regular) and 500 (Medium)
- **Scale Ratio**: 1.25 (Major Third)

---

## Sections (top to bottom)

### Navigation (sticky)

- **Behavior**: Sticky top, cream background, gains subtle shadow on scroll
- **Layout**: Logo left, section links right (About, Rentals, Events, Contact)
- **Mobile**: Hamburger icon, full-screen overlay menu with bouncy entrance animation
- **Logo**: Use `logo.jpg` from this folder

---

### 1. Hero

- **Layout**: Text left (60%), decorative image area right (40%)
- **Headline**: "Bounce Into the Fun!" in Outfit ExtraBold, navy
- **Subheadline**: "Affordable bounce house rentals for birthdays, parties, and community events across Maine." in Plus Jakarta Sans Regular
- **CTA Buttons**:
  - Primary: "View Rentals" (navy candy button, pill shape, 2px navy border, hard shadow, bouncy hover)
  - Secondary: "Call to Book" (transparent, navy border, fills yellow on hover)
- **Decorative Elements**:
  - Massive yellow (#FBBF24) circle positioned behind the headline text (partially clipped)
  - Dot grid pattern behind the right image area
  - Floating confetti: red triangle, green circle, yellow square — absolutely positioned, scattered
  - The logo can sit prominently in or near the hero
- **Right Side**: One of the bounce house photos with a blob-mask clip-path (asymmetric rounded corners)
- **Animation**: All hero elements pop in with bouncy scale entrance (scale 0 to 1 with overshoot easing)

---

### 2. About

- **Layout**: Centered text block, max-width for readability
- **Content** (adapted from their info card, no em dashes, no AI slop):
  > "We started Our House of Bounce because we believe every family should be able to celebrate their kids without the stress and extra cost. At the end of the day, kids don't remember how much you spent. They remember the fun. We're here to help you make those memories. They're only kids just once."
- **Design**:
  - Text sits inside a white "sticker" card: 2px navy border, hard shadow, rounded-xl
  - Squiggly SVG line divider above and/or below the section
  - Background: subtle dot grid pattern on cream
  - One or two of the Facebook photos placed alongside with blob-mask clip-paths
- **Optional**: A marquee text strip above or below this section scrolling keywords: "Birthday Parties / Water Slides / Bounce Houses / Community Events / Church Fairs / School Field Days"

---

### 3. Rental Gallery (Pricing)

- **Section Heading**: "Our Rentals" in Outfit Bold, centered
- **Layout**: Grid of cards. 3 across on desktop (with featured card spanning or scaled up), 2 on tablet, stacked on mobile
- **Card Style**: Sticker card from the design system:
  - White background
  - 2px navy border
  - rounded-xl
  - Hard shadow: `8px 8px 0px #CBD5E1` (default) or `8px 8px 0px #E63946` (red shadow for featured)
  - Hover: rotate -1deg, scale 1.02 (wiggle), shadow extends
  - A colored circle icon floats half-in/half-out of the top border

**Cards (5 total):**

| Rental | Price | Photo | Notes |
|--------|-------|-------|-------|
| Princess Castle | $200 | (use reference style) | Standard card |
| Lego Castle Bounce House | $200 | `519575277_...n.jpg` | Standard card |
| Combo Slide Bounce House | $250 | `509361094_...n.jpg` | Standard card |
| Tidal Wave Water Slide | $300 | (from bookings.jpg reference) | Standard card |
| Sportsman Slide | $350 | `514089322_...n.jpg` | **FEATURED** |

**Featured Card (Sportsman Slide)**:
- Scaled up to 1.1 on desktop
- Red hard shadow instead of default gray
- Yellow (#FBBF24) star badge rotated 15deg with "MOST POPULAR" text, positioned top-right
- Slightly elevated z-index

**Photo Treatment**: All rental photos get rounded corners or blob-mask clip-path. Keep them vibrant, no filters.

**Bottom CTA**: "Book Early! Dates Fill Fast!" in Outfit Bold, with a primary candy button below

---

### 4. Event Types

- **Section Heading**: "Perfect For Any Event" in Outfit Bold, centered
- **Layout**: 3 cards in a row, connected by a dashed SVG line drawn in the background behind them
- **Cards** (alternating color headers per design system):

| Card | Header Color | Icon (Lucide) | Headline | Description |
|------|-------------|---------------|----------|-------------|
| 1 | Red (#E63946) | `Cake` | Birthday Parties | "Make their big day unforgettable with a bounce house they'll never forget." |
| 2 | Yellow (#FBBF24) | `Users` | Community Events | "School field days, church fairs, and neighborhood block parties." |
| 3 | Green (#2D9F3F) | `Building2` | Corporate Fun | "Company picnics, team building days, and employee appreciation events." |

- **Icon Style**: White icon inside the colored circle, circle sits half-in/half-out of the card top border (per design system component spec)
- **Card Body**: Plus Jakarta Sans, brief and direct
- **Animation**: Cards pop in sequentially on scroll with slight stagger

---

### 5. Contact / CTA

- **Background**: Cream with scattered confetti shapes (red, yellow, green)
- **Headline**: "Ready to Bounce?" in Outfit ExtraBold, navy, centered
- **Phone Number**: 207-432-8735 displayed large and prominent, tappable `tel:` link
- **Facebook**: @OurHouseOfBounce with Facebook icon, links to their page
- **Primary CTA**: "Call Now to Book" — large navy candy button, centered
- **Contact info** sits inside a white sticker card with hard shadow
- **Tagline below card**: "They're only kids just once." in Outfit Bold, slightly smaller

---

### 6. Footer

- **Background**: Navy (#1B3A5C)
- **Text**: Cream (#FFFDF5)
- **Content**: Business name, phone, Facebook link
- **Credit**: "Site designed by Dead Pixel Design" (linked)
- **Decorative**: Small floating shapes (circles, triangles) in muted navy tones for subtle depth

---

## Global Animations & Interactions

All animations use bouncy easing: `cubic-bezier(0.34, 1.56, 0.64, 1)`

| Element | Trigger | Effect |
|---------|---------|--------|
| Hero elements | Page load | Pop in: scale 0 to 1 with bounce |
| Cards | Scroll into view | Pop in with staggered delay |
| Cards | Hover | Rotate -1deg, scale 1.02, shadow extends |
| Candy buttons | Hover | Translate -2px/-2px, shadow extends to 6px 6px |
| Candy buttons | Active/click | Translate +2px/+2px, shadow shrinks to 2px 2px |
| Icons | Hover | Wiggle: rotate 0 > 3deg > -3deg > 0 |
| Marquee (optional) | Always | Infinite horizontal scroll |
| Nav | Scroll | Gains box-shadow after scrolling past hero |

**Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce` is set.

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| Desktop (1280px+) | Full grid layouts, all decorative shapes, full hard shadows |
| Tablet (768px) | 2-column grids, reduced confetti count |
| Mobile (375px) | Single column, shadows reduced to 2px offset, complex background shapes hidden, buttons full-width with min 48px height, nav becomes hamburger |

---

## Image Assets (in this folder)

| File | Content | Usage |
|------|---------|-------|
| `logo.jpg` | Circular logo with bounce castle, balloons, sun | Nav + Hero |
| `bookings.jpg` | Rental menu flyer with all 5 units and prices | Reference only (pricing cards replace this) |
| `infocard.jpg` | Family-focused marketing flyer | Copy reference |
| `infocard2.jpg` | Business/corporate marketing card | Copy reference for Event Types section |
| `509361094_...n.jpg` | Combo Slide Bounce House photo | Rental card photo |
| `514089322_...n.jpg` | Sportsman Slide photo | Rental card photo (FEATURED) |
| `519575277_...n.jpg` | Lego Castle Bounce House photo | Rental card photo |
| `548049411_...n.jpg` | Velcro/Sticky Wall photo | Rental card photo or About section |

---

## Accessibility Checklist

- [ ] All text meets AAA contrast ratio on cream/white backgrounds
- [ ] Focus states: thick navy border + hard shadow (visible and on-brand)
- [ ] Alt text on all rental photos describing the inflatable
- [ ] Semantic HTML: `nav`, `main`, `section`, `footer`
- [ ] Skip-to-content link at top
- [ ] `tel:` link on phone number for mobile tap-to-call
- [ ] All interactive elements keyboard accessible
- [ ] `prefers-reduced-motion` respected

---

## QA Notes (from David's spec site checklist)

- [ ] No em dashes anywhere in copy (banned)
- [ ] No double hyphens (render as em dashes in markdown)
- [ ] No AI slop words (leverage, elevate, craft, etc.)
- [ ] All copy sounds human and direct
- [ ] Phone number correct: 207-432-8735
- [ ] Facebook handle correct: @OurHouseOfBounce
- [ ] Dead Pixel Design credit in footer
- [ ] Test at 375px, 768px, 1280px
