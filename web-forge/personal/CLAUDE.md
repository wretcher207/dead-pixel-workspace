# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

The `personal/` directory contains Dead Pixel Design's own projects and experiments. Each subdirectory is a standalone project with its own dependencies and config. Do NOT share assets between projects.

## Projects

### dead-pixel-redesign-3/ (main site)
- **Stack:** Next.js 16, React 19, Tailwind CSS 4, TypeScript, Framer Motion
- **Deploys to:** Vercel (deadpixeldesign.com)
- **Dev:** `npm run dev` (uses `--webpack` flag in script)
- **Build/Lint:** `npm run build` / `npm run lint`
- **Fonts:** Cormorant + IBM Plex Mono via next/font/google CSS variables
- **Design system:** CSS custom properties in `globals.css`. Tailwind v4 CSS-first config (no tailwind.config file).
- **Architecture:** App Router. Server page components export metadata, delegate rendering to client `*Content.tsx` components.
- **SEO:** JSON-LD via `src/components/seo/JsonLd.tsx`, per-page metadata, sitemap.ts, robots.ts
- **Assets:** Large design files in project root excluded via `.vercelignore`. Production assets in `public/images/` and `public/videos/`.

### aether-app/ — Next.js 16 + Supabase + Anthropic SDK + Leaflet
### ai-voice-directory/ — Vite + React 19 + Tailwind v4
### atlas-dashboard/ — Vite + React 19 + Tailwind v4
### ghost-terminal/ — Next.js 16 + Tailwind v4
### guitar-tuner/app/ — Vite + React + TypeScript (nested under `app/`)

## Key Patterns

- Pages: server component (`page.tsx`) handles metadata/SEO, delegates to `"use client"` content component.
- Main site uses `@vercel/analytics` — keep `<Analytics />` in root layout.
- Image optimization: WebP format, specific device sizes in `next.config.ts`.
- Static cache headers for `/images/*` and `/videos/*`.
