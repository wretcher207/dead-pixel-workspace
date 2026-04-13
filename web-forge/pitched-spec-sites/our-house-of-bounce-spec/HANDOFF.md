# Our House of Bounce Spec Site Handoff

## Project Summary

This project is a standalone spec site for **Our House of Bounce**, built from the requirements in `DESIGN-SPEC.md` and the supporting design language in `design.md`.

It is a **single-page React site** built with **Vite** and **Tailwind CSS v4**.

Primary goals completed:

- Match the playful geometric design direction from the spec
- Use the provided brand colors from the logo
- Implement the required single-page sections
- Keep the codebase simple enough to reuse as a future template
- Preserve direct, human copy with no em dashes and no filler language

Build was verified successfully on **April 2, 2026** with `npm run build`.

---

## Stack

- React 19
- Vite 8
- Tailwind CSS 4 via `@tailwindcss/vite`
- Lucide React for icons

Scripts in `package.json`:

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run preview` - preview the production build locally

---

## File Structure

### Core app files

- `index.html` - Vite entry HTML
- `vite.config.js` - Vite config with React and Tailwind plugins
- `src/main.jsx` - React entry point
- `src/App.jsx` - main single-page site layout and section assembly
- `src/index.css` - global styles, design tokens, custom motion, and non-trivial component styling

### Reusable components

- `src/components/CandyButton.jsx` - primary/secondary pill button system
- `src/components/SectionHeading.jsx` - shared section heading block
- `src/components/RentalCard.jsx` - rental card UI
- `src/components/EventCard.jsx` - event type card UI

### Site content/data

- `src/data/siteData.js` - navigation, rental data, event data, business contact info, imported image assets

### Source docs and assets

- `DESIGN-SPEC.md` - implementation spec that drove the build
- `design.md` - broader design system reference
- `logo.jpg` - used in nav and branding
- `bookings.jpg` - used as a reference image and for crop-based rental cards where standalone photos were missing
- `infocard.jpg` - used in the About section
- `infocard2.jpg` - retained as a source asset
- `509361094_...jpg` - Combo Slide Bounce House
- `514089322_...jpg` - Sportsman Slide
- `519575277_...jpg` - Lego Castle Bounce House
- `548049411_...jpg` - used as a supporting About image

### Generated artifacts

- `dist/` - production build output
- `node_modules/` - installed dependencies
- `package-lock.json` - npm lockfile

---

## What Was Implemented

### Sections included

- Sticky navigation with desktop links and mobile overlay menu
- Hero section with playful shape decoration, logo presence, primary and secondary CTAs
- About section with brand story copy and supporting images
- Scrolling marquee keyword strip
- Rental gallery with five cards and a featured Sportsman Slide card
- Event types section for birthdays, community events, and corporate bookings
- Contact CTA section with tappable phone link and Facebook link
- Footer with Dead Pixel Design credit

### Styling system

The site uses CSS variables in `src/index.css` for the brand token layer:

- Warm cream background
- Navy as foreground and primary accent anchor
- Red, yellow, and green for rotating playful accents
- Hard-shadow card and button system
- Rounded sticker-card treatment
- Bounce easing for motion

### Accessibility work included

- Semantic `header`, `main`, `section`, and `footer` structure
- Skip link
- Visible focus styles
- Tappable `tel:` link
- Keyboard-accessible menu button and links
- Reduced motion handling through `prefers-reduced-motion`
- Alt text on content images

---

## Content Notes

### Phone and social

The current contact info wired into the site is:

- Phone: `207-432-8735`
- Facebook: `@OurHouseOfBounce`

That data lives in `src/data/siteData.js`.

### Rental image handling

There were not five standalone rental photos in the folder.

Because of that:

- `Princess Castle` uses `bookings.jpg` as a crop-based visual reference
- `Tidal Wave Water Slide` uses `bookings.jpg` as a crop-based visual reference
- `Lego Castle Bounce House`, `Combo Slide Bounce House`, and `Sportsman Slide` use their provided standalone photos

If better individual photos are added later, replace those image references in `src/data/siteData.js` first.

### Copy source

Copy was adapted from the handoff spec and flyer language, with these constraints preserved:

- no em dashes
- no double hyphens
- direct, human wording
- no generic agency filler

---

## Important Implementation Notes

### Tailwind setup

This project uses the Tailwind v4 pattern:

- no `tailwind.config.js`
- no PostCSS config
- Tailwind is loaded through `@import "tailwindcss";` in `src/index.css`
- Vite plugin is configured in `vite.config.js`

### Styling split

Utility classes handle layout and spacing.
More opinionated pieces are handled in `src/index.css`, including:

- sticker card styling
- hard shadows
- featured badge shape
- marquee animation
- reveal animation
- decorative confetti shapes
- hero blob treatment

### Motion

Scroll reveal uses a small `IntersectionObserver` in `src/App.jsx`.
If someone wants to simplify the template later, that logic can be removed without affecting content structure.

### Current architecture

The page is intentionally simple.
There is no router, no state library, and no CMS integration.
All editable business content is centralized in `src/data/siteData.js` except for a small amount of section copy written inline in `src/App.jsx`.

---

## Known Gaps / Follow-Up Items

### Still worth QA in a browser

These were not manually QA'd in-browser after the build:

- 375px mobile layout
- 768px tablet layout
- 1280px desktop layout
- hover polish and spacing in live rendering
- final visual treatment of flyer-based crop cards

### Likely next improvements

- Replace the two flyer-crop rental visuals with standalone photos if available
- Move the remaining inline copy in `src/App.jsx` into `src/data/siteData.js` if this is being turned into a reusable template
- Add a real Facebook page URL if the exact canonical link needs to change
- Compress large JPG assets if page weight becomes a concern

### Asset weight note

Several supplied JPGs are large. The build passes, but total image weight is heavy for a production marketing page. If this becomes a real client build instead of a spec, image optimization should happen before launch.

---

## How To Continue Work

### Run locally

```bash
npm install
npm run dev
```

### Create a fresh production build

```bash
npm run build
```

### Main places to edit

- Change business info, nav items, rental cards, and image assignments in `src/data/siteData.js`
- Change page structure or section copy in `src/App.jsx`
- Change tokens, motion, shadows, and decorative styling in `src/index.css`

---

## Handoff Summary

The project is in a usable state as a standalone spec site.

What is done:

- project scaffolded
- dependencies installed
- single-page site built
- design system adapted to brand colors
- build passing

What remains before a polished pitch-ready review:

- manual browser QA
- optional image replacement and compression
- any final copy tweaks after seeing it live
