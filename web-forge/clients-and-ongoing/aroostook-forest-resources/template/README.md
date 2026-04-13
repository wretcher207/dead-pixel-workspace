# Editorial Service Template

This is a standalone starter built from the Aroostook Forest Resources spec site.

The current production site in the repo root was left alone. This template lives entirely in `template/` so you can reuse the design system and section structure without touching the live build.

## What To Edit First

Start in `src/data/site.js`.

That file controls:

- site title and meta description
- brand name, contact info, and nav links
- theme colors
- hero copy and field notes
- stats
- services
- about copy
- featured packages
- advisory note
- contact section and footer

## Images

This starter is image-optional. It builds even if you do not add any assets yet.

When you are ready, drop files into `public/images/` and point the matching `src` fields in `src/data/site.js` at those files.

Suggested starter image names:

- `/images/logo.jpg`
- `/images/hero-image.jpg`
- `/images/about-image.jpg`
- `/images/feature-image.jpg`

## Commands

```bash
cd template
npm install
npm run dev
```

Build for handoff or deployment:

```bash
npm run build
```

## Notes

- The section order and styling match the current spec site pattern.
- Most business-specific content is centralized so a new spec site can usually start with one file edit and a few image swaps.
- You can disable optional sections directly in `src/data/site.js`.
