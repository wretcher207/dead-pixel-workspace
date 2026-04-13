# Beauty & Polish — Build Handoff

## What This Is

Spec site for Dead Pixel Design portfolio. Nail salon in Scarborough, Maine. Full design spec is complete and ready to build. Nothing has been coded yet.

## Key Files

- `SPEC.md` — The complete build spec. Copy, page layouts, component architecture, Tailwind config, SEO, animations, bento grid layout, everything. This is the source of truth.
- `design-prompt.md` — The claymorphism design system reference. SPEC.md already incorporates it, but the full token definitions, shadow stacks, and dos/don'ts live here.
- `info.png` — Screenshot of the business info (Fresha link, Instagram, hours, review count).

## Assets

All in the project root, need to be renamed and moved to `public/images/` per the asset rename map in SPEC.md Section 14.

- `exteriort.jpg` — Storefront exterior (hero image, priority load)
- `showcase/interior.jpg` — Two women in traditional Vietnamese ao dai (about page)
- `showcase/nails.jpg` through `nails5.jpg` — 5 nail art photos (gallery bento grid + home preview)
- `showcase/award.jpg` — Fresha Best in Class 2026 certificate
- `showcase/april.jpg` — Seasonal purple flowers post
- `showcase/100-percent-.png` — 100% recommend badge
- `video.mp4` — Short video for a gallery bento tile
- `testimonials/` — 12 Facebook review screenshots. Already transcribed into SPEC.md. Not used directly in the build.

## Stack

Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion 12. Static export to Netlify. Fonts: Nunito + DM Sans via next/font/google. Contact form via Netlify Forms or Formspree. Booking links go to Fresha (external).

## Pages

1. **Home** — Hero with storefront photo, trust bar (3 stat orbs), why B&P benefit cards, gallery preview (3 photos), testimonial carousel (6 cards), booking CTA
2. **Services** — Nails (6 services), waxing, lash extensions. Experience-focused copy, not menu items. Prices TBD from Fresha.
3. **Gallery** — Bento grid. Pop art nails at 2x2 hero, video in horizontal tile, award at 2x2 anchor. Lightbox with keyboard/swipe nav.
4. **About** — Split layout with interior photo + Bebe's story. Lindsay mention. Award showcase with 100% badge.
5. **Contact** — Two-column: clay form (left 3/5) + info card with map embed (right 2/5).

## Copy Notes

All copy is written in SPEC.md. The hero line is "You bring the idea. She'll make it better than you imagined." Copy was written to avoid generic platitudes — every line is grounded in real details from the 12 testimonials. Do not replace with filler.

## What's Not Done

- No code written yet
- Service prices need to be pulled from the Fresha booking page
- Business hours need confirmation
- Phone number needs confirmation
- Video poster frame needs to be generated from showcase.mp4
- Blog/content strategy is specced but not part of the initial build
