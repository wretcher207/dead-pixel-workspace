# Aroostook Forest Resources -- Spec Site Handoff Document

This is a complete handoff for building a spec site for **Aroostook Forest Resources, LLC**. Everything another Claude session (or any developer) needs to build this site from scratch is in this document. Read the whole thing before writing any code.

As of April 2, 2026, this repository also contains a working local implementation of the spec site that builds successfully with `npm run build`. This document has been updated to match the current repo state where needed.

---

## What This Is

A **spec site** (speculative demo site) built by Dead Pixel Design to pitch to a potential client. The client has NOT hired us. The goal is to build something so good that John Saucier sees it and wants to hire us.

**Do not deploy this site** without explicit permission from David. Build it locally only.

---

## The Business

**Aroostook Forest Resources, LLC**

- **Owner:** John Saucier, Maine Licensed Forester
- **Location:** Washburn, ME 04786
- **Phone:** (207) 768-0027
- **Email:** john.saucier@aroostookforest.com
- **Website:** aroostookforest.com
- **Facebook:** Aroostook Forest Resources (92 followers, 17 following), https://www.facebook.com/profile.php?id=61586389362408
- **Category:** Forestry Service
- **Service Area:** Aroostook & Northern Penobscot County, Maine
- **Experience:** Nearly a decade working across the state of Maine
- **Insurance:** Fully insured

**What they do:** Professional forestry consulting and land management. John helps landowners manage their forest land, from tax planning to boundary marking to timber assessment. He does NOT currently offer timber harvesting services, but he does advise on harvesting operations and contractor selection.

---

## Services (Exact Copy From Source Materials)

Use these descriptions verbatim or adapt them lightly. Do NOT invent claims or add services that are not listed here.

### 1. Tree Growth Tax Law Management Plans
Written management plans meeting Maine Revenue Services standards, significantly reducing your annual property tax bill. Must own 10 or more acres of forested land to qualify.

### 2. Boundary Line Maintenance
Professional blazing and painting of property boundaries, clearly marked, legally defensible, and ready before any timber work.

### 3. Timber Cruise
Systematic, plot-based field inventory measuring species composition, timber volumes, and stand quality across your property.

### 4. Timber Appraisal
Certified stumpage value estimates using current Maine Forest Service pricing, for sales, estates, financing, and legal matters.

### 5. Harvest Layout
Field layout of harvest boundaries, skid roads, and landings, protecting your residual stand and long-term land value.

### 6. GIS Map Making & Stand Delineation
Professional GIS maps of stand types, boundaries, wetlands, roads, and topography using aerial imagery and field data.

### 7. Pre & Post-Purchase Timberland Real Estate Due Diligence
Professional land assessment for buyers and sellers. Includes stand condition, boundary review, wetlands screening, access analysis, risk flags, and an opportunities summary, available in three tiers from quick visual assessment to full certified appraisal package.

**Three tiers:**
- **Tier 1 -- Quick Assessment:** Visual evaluation and summary
- **Tier 2 -- Full Report:** Comprehensive field assessment with detailed report
- **Tier 3 -- Certified Package:** Full certified appraisal package

### 8. A Note on Timber Harvesting
Harvesting services are not currently offered, but professional advice on harvesting operations and contractor selection is always available upon request.

---

## Design System

This site uses the **Bold Typography** design system (documented in `design-outline.md` in this folder), adapted with a forestry-appropriate color palette. Read `design-outline.md` for the full system. Below are the overrides and key points.

### Color Palette (Overrides the Default Dark Mode)

| Token              | Value     | Usage                                      |
|--------------------|-----------|---------------------------------------------|
| background         | `#0C1A0F` | Deep charcoal-green, subtle forest atmosphere |
| foreground         | `#F5F2EB` | Warm white, organic feel                    |
| muted              | `#1A2E1D` | Subtle surface elevation with green undertone |
| mutedForeground    | `#8B9B8E` | Secondary text (must pass WCAG AA on bg)    |
| accent             | `#2D6A4F` | Rich forest green, CTAs, underlines, highlights |
| accentForeground   | `#F5F2EB` | Light text on accent backgrounds            |
| secondaryAccent    | `#D4A843` | Warm gold/amber, used SPARINGLY on key headlines or stat numbers only |
| border             | `#1E3A24` | Barely-there green-tinted dividers          |
| input              | `#1A2E1D` | Input backgrounds (same as muted)           |
| card               | `#0F2214` | Slight elevation from background            |
| cardForeground     | `#F5F2EB` | Same as foreground                          |
| ring               | `#2D6A4F` | Focus states match accent                   |

### What Stays the Same From the Design System

Everything not color-related carries over exactly:

- **Typography:** Inter Tight for headlines, Playfair Display for pull quotes only, JetBrains Mono for labels/stats
- **Type scale:** The full scale from 0.75rem to 10rem, including the extreme headline sizes
- **Tracking:** Tight (-0.04em to -0.06em) on display, wide (0.1em to 0.2em) on labels
- **Line heights:** 1 for single-line headlines, 1.1 for multi-line, 1.6 for body
- **Radius:** 0px everywhere. Sharp corners only. No border-radius.
- **Shadows:** None. Depth from layered type, underlines, and dividers only.
- **Noise texture:** Subtle fractal noise at 1.5% opacity over the full page background
- **Buttons:** Primary = text-only with animated underline (accent color). Secondary = border with invert-on-hover. Ghost = muted text with appearing underline.
- **Cards:** Minimal, border only, no fill, no shadow, no radius
- **Motion:** Fast and decisive. 150ms micro, 200ms standard, 500ms image hover. No bounce, no playful easing. cubic-bezier(0.25, 0, 0, 1).
- **Scroll animations:** Framer Motion fade-in + slide-up, staggered children, once-only viewport trigger
- **Icons:** Lucide React, 1.5px stroke width, sizes 16/18/20/24px by context
- **Responsive:** Mobile-first, headlines scale from text-3xl up to text-8xl on desktop. Grids collapse to single column on mobile.
- **Accessibility:** All contrast ratios must pass WCAG AA. Focus rings on all interactive elements. Body text min 16px. Touch targets min 44x44px.

### The Vibe, Translated for Forestry

The Bold Typography system feels like a gallery exhibition or luxury magazine. For this forestry site, it should feel like a **premium land prospectus or a high-end outdoor journal**. Confident, editorial, deliberate. John is not a generic contractor; he is a licensed professional who manages your most valuable natural asset. The site should convey that weight.

The gold accent (`#D4A843`) nods to autumn foliage and the value of the land. Use it on:
- Stat numbers in the credibility bar
- The hero headline (or just "YOUR FUTURE" portion)
- Decorative elements

The green accent (`#2D6A4F`) is the workhorse. Use it on:
- All CTAs and interactive underlines
- Section label text ("OUR SERVICES", "DUE DILIGENCE")
- Highlighted card borders
- Focus rings

---

## Tech Stack

- **React** (functional components, hooks only)
- **Vite** (bundler/dev server)
- **Tailwind CSS v3** (utility-first styling)
- **Framer Motion** (scroll animations)
- **Lucide React** (icons)
- **Google Fonts:** Inter Tight (400, 500, 600, 700), Playfair Display (400 italic), JetBrains Mono (400, 500)

### Install Command

```bash
npm create vite@latest . -- --template react
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
```

---

## Site Structure (Single Page, 9 Sections)

### Section 1: Navigation

- **Position:** Fixed top, `z-50`
- **Behavior:** Transparent background initially. On scroll (past ~50px), background transitions to `background` color with slight opacity
- **Left side:** "AROOSTOOK" in bold + "FOREST RESOURCES" below or beside it (text logo, uppercase, tight tracking), with the circular logo mark used in the current implementation on tablet and desktop
- **Right side:** Nav links: Services, About, Due Diligence, Contact
- **Link style:** Ghost button style (muted text, underline appears on hover)
- **Mobile:** Hamburger icon (Menu from Lucide), opens full-screen overlay or slide-in panel with the same links stacked vertically
- **Smooth scroll:** All nav links scroll to their corresponding section IDs

### Section 2: Hero

- **Background:** One of the forest photos (`from-facebook (2).jpg` is the golden autumn shot, most striking) with a heavy dark overlay (bg-black/70 or similar) to maintain text readability
- **Layout:** Centered text, full viewport height (`min-h-screen`), flex centered
- **Top label:** "LICENSED MAINE FORESTER" in JetBrains Mono, uppercase, widest tracking (0.2em), `mutedForeground` color, small text (text-xs or text-sm)
- **Headline:** "YOUR LAND. YOUR RESOURCE. YOUR FUTURE." in Inter Tight, bold (700), massive scale (text-4xl mobile scaling up to text-7xl or text-8xl desktop), tight tracking (-0.04em to -0.06em), foreground color. Consider making "YOUR FUTURE." in the `secondaryAccent` gold
- **Subtitle:** "Professional forestry & land management services tailored to you" in text-lg or text-xl, `mutedForeground`, max-w-2xl, normal tracking
- **CTA:** "Free Consultation" as a primary underline button (accent colored text, animated underline, arrow-right icon). Scrolls to Contact section.
- **Decorative:** An oversized "A" letterform at very low opacity (5-8%) positioned behind the text, referencing the logo mark
- **Scroll animation:** Content fades in and slides up on load (can be immediate or slight delay)
- **Implemented detail:** The current build adds a three-item field-note strip under the hero CTA for location, service area, and licensed/insured credibility

### Section 3: Stats / Credibility Bar

- **Background:** `muted` color for subtle elevation difference
- **Layout:** Horizontal row, 3 items, divided by thin vertical borders or generous spacing. Stacks to 1-column on mobile.
- **Items:**
  1. **"10+"** (large, gold `secondaryAccent` color, JetBrains Mono, bold) + "Years Experience" (small, uppercase, wide tracking, `mutedForeground`)
  2. **"Aroostook & Northern Penobscot"** (accent green, JetBrains Mono) + "Service Area" label
  3. **"Licensed & Fully Insured"** (accent green, JetBrains Mono) + "Maine Licensed Forester" label
- **Padding:** py-16 to py-20
- **Animation:** Numbers/text fade in with slight stagger

### Section 4: Services

- **Section label:** "OUR SERVICES" in mono, uppercase, widest tracking, accent color, with a small accent bar (h-1 w-16) above it
- **Headline:** Something like "Comprehensive Forest Management" in large display type (text-3xl to text-5xl), foreground, tight tracking
- **Subtext:** Brief line like "From tax planning to harvest layout, every service protects and grows the value of your land." in `mutedForeground`, max-w-3xl
- **Grid:** 3 columns on desktop (lg), 2 on tablet (sm), 1 on mobile
- **Cards (6 total):**
  - Border: 1px solid `border`
  - Background: transparent
  - No radius (sharp corners)
  - Padding: p-6 mobile, p-8 desktop
  - Hover: border lightens slightly
  - Content: Lucide icon (accent color, 24px, 1.5px stroke) at top, then title (text-lg, semibold, foreground), then description (text-sm, `mutedForeground`, line-height relaxed)
- **Icon mapping:**
  1. Tree Growth Tax Law: `FileText` or `Receipt`
  2. Boundary Line: `MapPin` or `Fence`
  3. Timber Cruise: `TreePine` or `Search`
  4. Timber Appraisal: `DollarSign` or `ClipboardCheck`
  5. Harvest Layout: `Map` or `Route`
  6. GIS Mapping: `Globe` or `Layers`
- **Animation:** Cards stagger in (fade + slide up, 80ms stagger)
- **Implemented detail:** The current build adds a side note calling out the 10-acre Tree Growth Tax Law qualification and numbers each card 01-06

### Section 5: About John

- **Layout:** Asymmetric 2-column (7/5 split on desktop), stacks on mobile
- **Left column (wider):**
  - Section label: "ABOUT" in mono, accent, wide tracking, with accent bar
  - Headline: "A Forester Who Knows This Land" or similar, large display type
  - Body text (2-3 paragraphs, adapted from Facebook bio):
    - "Aroostook Forest Resources is led by John Saucier, a fully insured Maine Licensed Forester with nearly a decade of experience working across the state of Maine."
    - A paragraph about his approach: hands-on, local knowledge, protecting landowners' interests
    - "Contact John today to take the next step toward achieving your land management goals."
  - Body in text-base to text-lg, foreground, normal line-height (1.6), max-w readable
- **Right column (narrower):**
  - One of the forest photos (`from-facebook (1).jpg` or `from-facebook (3).jpg`, the summer shots with marked trees showing active fieldwork)
  - Full height of the text column, object-cover
  - No border-radius (sharp corners)
  - Optional: thin accent border on one edge
- **Animation:** Text slides in from left, image fades in from right (or just standard fade-up)

### Section 6: Due Diligence (Featured Section)

This is the premium offering and should feel special.

- **Background:** Alternate background (use `card` color or `muted` to differentiate)
- **Section label:** "DUE DILIGENCE" in mono, accent, wide tracking
- **Headline:** "Pre & Post-Purchase Timberland Real Estate Due Diligence" in large display type
- **Description:** "Professional land assessment for buyers and sellers. Includes stand condition, boundary review, wetlands screening, access analysis, risk flags, and an opportunities summary."
- **Supporting visual:** The current build uses the renamed evergreen forest photo beside the section heading
- **3 Tier Cards:**
  - Layout: 3 columns on desktop, stacks on mobile
  - Style: bordered cards, sharp corners, transparent background
  - **Tier 1 (Quick Assessment):**
    - "TIER 1" label in mono, small, wide tracking
    - "Quick Assessment" title
    - Brief description of what's included
    - Standard border (1px, `border` color)
  - **Tier 2 (Full Report) -- FEATURED:**
    - "TIER 2" label
    - "Full Report" title
    - "RECOMMENDED" badge in accent background (bg-accent, text-accentForeground, mono, uppercase, small)
    - Description
    - Border: 2px solid accent (thicker, stands out)
    - Optional: thin accent bar at top (h-1 w-16 bg-accent, absolute positioned)
  - **Tier 3 (Certified Package):**
    - "TIER 3" label
    - "Certified Package" title
    - Description
    - Standard border
  - Each card gets a "Learn More" or "Request Info" ghost-style button at the bottom
  - **Implemented detail:** The current build includes short checklist bullets inside each tier card to make the differences easier to scan
- **Animation:** Cards stagger in

### Section 7: Timber Harvesting Note

- **Short section**, distinct from services
- **Style:** Simple horizontal layout or centered text block
- **Content:** "Harvesting services are not currently offered, but professional advice on harvesting operations and contractor selection is always available upon request."
- **Tone:** Honest and transparent. This is a trust signal.
- **Visual:** Maybe a thin top/bottom border to frame it, `mutedForeground` text, slightly smaller than main sections (py-16)
- **Optional icon:** `Axe` or `TreePine` from Lucide, muted

### Section 8: Contact / CTA

- **Inverted section:** Foreground color (`#F5F2EB`) as background, background color (`#0C1A0F`) as text. This creates a dramatic contrast break.
- **Headline:** "Free Initial Consultations" in large display type, dark text
- **Subtitle:** "Reach Out Anytime" in muted
- **Two columns on desktop:**
  - **Left:** Contact info displayed cleanly
    - Phone: (207) 768-0027 with `Phone` icon
    - Email: john.saucier@aroostookforest.com with `Mail` icon
    - Location: Washburn, ME with `MapPin` icon
    - Facebook: link with `Facebook` icon (or use generic `MessageCircle`)
    - Current URL: `https://www.facebook.com/profile.php?id=61586389362408`
  - **Right:** Simple contact form
    - Name input
    - Email input
    - Message textarea
    - Submit button (secondary style, border with invert on hover, but using the inverted palette)
- **Input styling for inverted section:** Transparent background, border in semi-transparent dark (background/30), dark text, dark placeholder (background/50), focus border in accent
- **Animation:** Fade in on scroll

### Section 9: Footer

- **Background:** Back to the main `background` color (or slightly darker)
- **Layout:** Simple, not overly complex
- **Left:** "AROOSTOOK FOREST RESOURCES" text logo, small, tight tracking + "Washburn, ME" below
- **Center/Right:** Contact info (phone, email), Facebook link
- **Bottom bar:** "Licensed Maine Forester" + copyright "2024 Aroostook Forest Resources, LLC. All rights reserved." separated by a thin border-t
- **Everything in small text, `mutedForeground`**

---

## File Structure

```
aroostook-forest-resources/
  index.html              # Entry HTML, Google Fonts links
  package.json
  vite.config.js          # Vite config with React plugin
  tailwind.config.js      # Custom colors, fonts, tracking, extended theme
  postcss.config.js
  src/
    main.jsx              # React entry point
    App.jsx               # All sections composed here
    index.css             # @tailwind directives, global styles, noise texture
    components/
      Navbar.jsx
      Hero.jsx
      Stats.jsx
      Services.jsx
      About.jsx
      DueDiligence.jsx
      TimberNote.jsx
      Contact.jsx
      Footer.jsx
    data/
      services.js         # Service titles, descriptions, icons as data array
  public/
    images/               # Copy the forest photos and logo here
      logo.jpg
      hero-forest.jpg     # from-facebook (2).jpg renamed (autumn shot)
      fieldwork-1.jpg     # from-facebook (1).jpg renamed
      fieldwork-2.jpg     # from-facebook (3).jpg renamed
      evergreen-forest.jpg # from-facebook (4).jpg renamed, used in the due diligence section
```

---

## Content Rules (CRITICAL)

1. **No em dashes.** Not a single one. No double hyphens either (they render as em dashes in some contexts). Use commas, periods, or restructure the sentence instead.
2. **No AI slop words.** Avoid: "elevate," "leverage," "utilize," "streamline," "robust," "cutting-edge," "holistic," "synergy," "empower," "game-changer," "seamless," "world-class," "delve," "tapestry," "landscape" (as metaphor), "navigate" (as metaphor), "unlock," "spearhead," "foster," "curate," "bespoke."
3. **No invented claims.** Only use facts from the source materials. Do not make up certifications, awards, team members, pricing, or testimonials.
4. **Tone:** Professional, confident, grounded. This is a working forester, not a tech startup. Write like a land prospectus, not a SaaS landing page.
5. **No emojis** unless David specifically asks for them.

---

## Build Order

1. **Scaffold:** `npm create vite@latest . -- --template react`, install deps
2. **Config:** tailwind.config.js with all custom tokens, vite.config.js with the React plugin, postcss.config.js for Tailwind, index.css with globals and noise texture
3. **index.html:** Add Google Fonts links for Inter Tight, Playfair Display, JetBrains Mono
4. **Copy images** to public/images/ with clean filenames
5. **Build sections in order:** Navbar, Hero, Stats, Services, About, DueDiligence, TimberNote, Contact, Footer
6. **Compose in App.jsx:** Import all sections, arrange in order
7. **Add Framer Motion:** Scroll-triggered animations on each section
8. **Responsive pass:** Check every section at mobile (375px), tablet (768px), desktop (1280px+)
9. **QA pass:** Run the content rules check (dashes, slop words), verify accessibility, test all interactions

---

## QA Checklist (Run Before Showing David)

- [ ] No em dashes or double hyphens anywhere in rendered text
- [ ] No AI slop words in any copy
- [ ] All content matches source materials (no invented claims)
- [ ] All images load correctly
- [ ] Site is fully responsive (mobile, tablet, desktop)
- [ ] All nav links smooth-scroll to correct sections
- [ ] Mobile hamburger menu works (opens, closes, links work)
- [ ] All hover/focus states work on buttons and links
- [ ] Contrast ratios pass WCAG AA (especially mutedForeground on background)
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] No horizontal scroll at any breakpoint
- [ ] Form inputs are styled correctly (including the inverted Contact section)
- [ ] Framer Motion animations trigger once on scroll, not repeatedly
- [ ] Noise texture is visible but subtle (1.5% opacity)
- [ ] No console errors
- [ ] `npm run dev` starts cleanly

---

## Reference Files in This Folder

| File | What It Contains |
|------|------------------|
| `design-outline.md` | Full Bold Typography design system (read this for component details, animation specs, responsive strategy, accessibility rules) |
| `logo.jpg` | Circular logo with "A" tree mark and "AROOSTOOK FOREST RESOURCES" text |
| `resources-info.jpg` | Screenshot of existing site/mockup showing all services and layout |
| `business-card.jpg` | John's business card with contact details |
| `information (1).png` | Facebook details: location, phone, Messenger |
| `information (2).png` | Facebook header: business description, follower count |
| `from-facebook (1).jpg` | Summer forest photo, trees marked with red paint (fieldwork) |
| `from-facebook (2).jpg` | Autumn forest photo, golden light through trees (best hero candidate) |
| `from-facebook (3).jpg` | Summer forest photo, red-painted boundary trees (fieldwork) |
| `from-facebook (4).jpg` | Spruce/fir forest view, overcast (moody, good for texture). Renamed to `evergreen-forest.jpg` in `public/images/` in the current implementation. |

---

## Important Notes for the Builder

- **This is a spec site.** Do not add analytics, tracking, or any live form submission backend. The form is visual only.
- **Do not over-engineer.** This is a single-page site. No routing, no state management libraries, no API calls. Keep it simple.
- **The design-outline.md in this folder is the source of truth** for all component styling, animation specs, button patterns, card patterns, responsive strategy, and accessibility rules. This handoff document tells you WHAT to build and the design specifics for THIS site. The design-outline.md tells you HOW each component should be styled and behave.
- **David's environment:** Windows 11, Git Bash, Node.js installed. Use `npm` (not yarn or pnpm).
- **Write the code directly.** Do not use subagents for individual components. Just build it section by section.


