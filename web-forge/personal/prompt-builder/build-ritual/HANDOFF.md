# Build Ritual — Session Handoff

**Last session:** 2026-04-12
**Branch:** `feat/claudes-receipts` (this work is in the same branch but untracked — `web-forge/personal/prompt-builder/build-ritual/` is a new project outside any committed scope)
**Status:** Two fully passes complete. App navigates cleanly across five screens with real project context. Next direction locked in: **Teaching Mode**.

---

## 0. Read This First

Before reading the rest of this document:

1. **Read** `c:/dead-pixel-design/CLAUDE.md` — David's workspace-wide instructions. Anti-generic guardrails, writing standards, how he works.
2. **Read** `c:/dead-pixel-design/web-forge/CLAUDE.md` and `c:/dead-pixel-design/web-forge/personal/CLAUDE.md` — project-local instructions.
3. **Read** `c:/dead-pixel-design/MEMORY.md` at workspace root and whatever is relevant in `C:/Users/david/.claude/projects/c--dead-pixel-design/memory/MEMORY.md` — memory carries context across sessions.
4. **Invoke** the `frontend-design` skill before writing any frontend code. Every session. No exceptions. (Global rule from CLAUDE.md.)
5. **Read** `web-forge/personal/prompt-builder/prompt-builder-design.md` — the original 785-line product brief.
6. **Look at** the Stitch references in `web-forge/personal/prompt-builder/stitch_build_ritual_output_design/` — three output_studio variants + `ritual_dark_mono/DESIGN.md` (the visual system). These are the visual source of truth.

---

## 1. Quick Start

```bash
cd c:/dead-pixel-design/web-forge/personal/prompt-builder/build-ritual

# Dev server
npx next dev --port 4100
# → http://localhost:4100

# Build check (catches type errors)
npx next build

# Lint
npm run lint
```

URLs to test:
- `http://localhost:4100/` — redirects to `/output` (Thorn and Thimble by default)
- `http://localhost:4100/projects` — archive of 7 sample projects
- `http://localhost:4100/output?project=thorn-and-thimble` — Output Studio, Thorn & Thimble
- `http://localhost:4100/output?project=the-nail-suite` — Output Studio, Nail Suite
- `http://localhost:4100/output?project=strange-maine` — draft state (no context yet)
- `http://localhost:4100/builder?project=the-nail-suite` — Builder with Nail Suite context
- `http://localhost:4100/dna?project=thorn-and-thimble` — DNA review
- `http://localhost:4100/settings` — preferences

Build uses **Turbopack** by default (Next 16). Dev server is fast (~600ms ready).

---

## 2. Stack

| Thing | Version | Notes |
|---|---|---|
| Next.js | 16.2.3 | App Router. Turbopack dev + build. Breaking changes from prior versions — see `build-ritual/AGENTS.md` |
| React | 19.2.4 | Server Components + Client Components split is rigorous |
| Tailwind CSS | v4 | CSS-first config via `@theme { }` in `globals.css`. No `tailwind.config.js` |
| TypeScript | 5.x | Strict mode |
| ESLint | 9 | `eslint-config-next` 16.2.3 |
| Fonts | Newsreader + Manrope | Loaded via `next/font/google` in `src/app/layout.tsx` |
| Icons | none | Intentionally. Using `atmospheric-line`, vertical rules, and text glyphs instead of an icon library |

No backend, no auth, no DB. Everything is in-memory / static data. Search params (`?project=slug`) carry state between pages.

---

## 3. File Structure

```
build-ritual/
├── HANDOFF.md                                   ← this file
├── AGENTS.md                                    ← Next 16 breaking-changes warning
├── CLAUDE.md                                    ← @AGENTS.md (symlink-style reference)
├── README.md                                    ← stock Next.js readme (unchanged)
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
├── package.json
├── public/                                      ← unchanged scaffold assets
├── screenshots/                                 ← comparison shots from both passes
│   ├── 01-output-studio-build.png
│   ├── 02-output-studio-full.png
│   ├── 03-projects.png
│   ├── 04-builder.png                           ← race-condition artifact, ignore
│   ├── 05-dna.png
│   ├── 06-builder.png
│   ├── 07-output-visuals-tab.png
│   ├── 08-builder-overhaul.png                  ← after pass 2 descriptiveness pass
│   ├── 09-dna-revised.png
│   ├── 10-output-revised.png
│   ├── 11-nail-suite-output.png                 ← proof of multi-project switching
│   ├── 12-draft-state.png                       ← Strange Maine "no outputs yet"
│   ├── 13-settings-revised.png
│   └── 14-projects-revised.png
└── src/
    ├── app/
    │   ├── layout.tsx                           ← root — Newsreader + Manrope setup
    │   ├── page.tsx                             ← / → redirect to /output
    │   ├── globals.css                          ← FULL DESIGN SYSTEM — tokens, utilities, animations
    │   └── (app)/
    │       ├── layout.tsx                       ← sidebar + main shell, Suspense wrapper for SidebarNav
    │       ├── projects/page.tsx                ← archive list with filter row
    │       ├── builder/page.tsx                 ← 7-section form + scrollspy + progress strip + rail
    │       ├── dna/page.tsx                     ← 8-panel review grid + readiness rail
    │       ├── output/page.tsx                  ← Output Studio host (server, reads searchParams)
    │       └── settings/page.tsx                ← 4 preference groups with descriptions
    ├── components/
    │   ├── app-shell/
    │   │   ├── SidebarNav.tsx                   ← fixed left rail, "Working on" block, active-project aware
    │   │   ├── TopMetaBar.tsx                   ← thin top header with env label + serif title + meta cluster
    │   │   └── DraftProjectState.tsx            ← "No outputs yet" screen for unbriefed projects
    │   ├── output-studio/
    │   │   └── OutputStudio.tsx                 ← tabs + Stage + analysis rail
    │   └── ui/
    │       ├── Buttons.tsx                      ← primary (atmospheric-gradient) / secondary (ghost border) / ghost (text)
    │       └── Chip.tsx                         ← squared whisper-border chips for tone tags
    └── lib/
        ├── projects.ts                          ← archive list data (7 projects)
        ├── project-context.ts                   ← FULL per-project context — the single source of truth
        └── prompts.ts                           ← OutputBundle type + bundles keyed by slug
```

---

## 4. Current State

### What's done (both passes)

**Pass 1 (v1):**
- Next.js 16 scaffold with Turbopack
- Full Monastic Workspace design system ported to Tailwind v4 `@theme`
- Newsreader + Manrope via `next/font/google`
- App shell (fixed sidebar + thin top bar) via `(app)` route group
- Five primary screens: Projects / Builder / DNA / Output / Settings
- Prompt content for Thorn and Thimble grounded in the KERNEL framework
- Drop cap on Stage body prose
- Tab state in Output Studio with per-tab content swap
- Staggered reveal animation on Stage content
- Screenshots comparing against Stitch references

**Pass 2 (descriptiveness + wiring):**
- Widened tonal contrast between surface levels (5→8 value points)
- Warmed neutrals (on-surface from `#e7e5e4` → `#ece7e1`)
- New CSS utilities: `warm-wash`, `grain` (SVG noise), `atmospheric-line`, `helper-text`
- Promoted editorial labels from `outline-variant` to `on-surface-variant` (single biggest "drab" fix)
- Started using `tertiary` (#fcf9f8) as the signature cut-through
- Complete copy rewrite: manifesto voice → David's direct, observational voice
- Ritual Builder overhaul:
  - Helper text under every label (italic Newsreader, 12px, concrete examples)
  - Realistic placeholders on every input
  - Chip-input UI for tone/cliché-suppressor fields with suggested starters
  - Scrollspy section nav on left (sticky)
  - Progress strip at top with atmospheric-gradient fill
  - Output Selection cards with sublines
- "Why this matters" subline on each DNA panel
- Settings: full descriptive copy per row + tertiary values on the right
- **Project context registry** (`lib/project-context.ts`) — single source of truth per project
- **Two fully populated projects**: Thorn and Thimble + The Nail Suite
- **URL search params as project context** (`?project=slug`)
- **Draft project state** for unbriefed projects (Strange Maine, Balsam Electric, etc.)
- **"Working on" block in sidebar** with "Switch project" link
- Full action-button wiring (Builder → DNA → Output all carry project context)

### Build / Lint / Test Status

- `next build` passes cleanly — 9 routes, 2.7s compile, zero type errors
- Zero console warnings at runtime
- No tests written (prototype)
- Not deployed anywhere yet

### Known limitations / intentionally deferred

- **No persistence** — Builder form inputs are React state only, don't save
- **Export actions are decorative** — COPY / EXPORT / REGENERATE buttons don't do anything real
- **"+ New Project" button does nothing**
- **Mobile untested** — desktop-first per brief
- **Only 2 of 7 projects have full context** — others render draft state (by design)
- **No project hub page** — clicking "Open" on a project card goes straight to Output Studio; a `/projects/[slug]/` summary page would be a nice intermediary
- **Filter row in Projects archive is static** — search / filter dropdowns don't filter anything
- **Tab state in Output Studio doesn't persist** — refresh resets to Build tab
- **"Edit" button on DNA panels does nothing**

---

## 5. Design System Reference

### Tokens (in `src/app/globals.css`)

Full Material-3-style token set inside `@theme { }`. Key tokens:

| Token | Value | Use |
|---|---|---|
| `--color-surface` | `#0d0d0e` | Base background |
| `--color-surface-dim` | `#0b0b0c` | Deepest ambient surface |
| `--color-surface-container-low` | `#141416` | Sidebar, work floor |
| `--color-surface-container` | `#1b1c1e` | Generic elevated surface |
| `--color-surface-container-high` | `#23252a` | Active modules, panels |
| `--color-surface-container-highest` | `#2c2e33` | Focus elements |
| `--color-surface-bright` | `#343434` | Strong focus |
| `--color-surface-container-lowest` | `#050505` | The Stage (deep void) |
| `--color-on-surface` | `#ece7e1` | Body text (NEVER pure white) |
| `--color-on-surface-variant` | `#b5b1ac` | Muted text |
| `--color-outline` | `#7a7671` | Decorative only |
| `--color-outline-variant` | `#52504c` | Ghost borders (always at 15-20% opacity) |
| `--color-primary` | `#c6c6c6` | Primary button fill (paired with atmospheric-gradient) |
| `--color-primary-container` | `#454747` | Gradient endpoint |
| `--color-on-primary` | `#3f4041` | Primary button text |
| `--color-tertiary` | `#fcf9f8` | THE STARK CUT-THROUGH — use deliberately |

### Typography

- **Display (serif):** Newsreader. Italic used for the wordmark, page titles of projects, and right-rail subheads.
- **Utility (sans):** Manrope. All labels, body, controls.
- **Rule:** Every primary heading is preceded by an `editorial-label` (tiny caps Manrope with `0.22em` letter-spacing). This two-line archival pattern is the signature typographic moment.
- **Body copy:** 15px Manrope, `leading-[1.7]`.
- **Helper text:** 12px italic Newsreader. Used under form labels, in the sidebar "Working on" block, and as "why this matters" sublines on DNA panels.

### Key custom utilities

- `.editorial-label` — the caps-tracked Manrope micro-label above every serif title
- `.helper-text` — italic Newsreader 12px/1.55 with `on-surface-variant` color
- `.atmospheric-gradient` — 45° `#c6c6c6 → #454747`. Reserved for primary CTAs and the progress bar.
- `.atmospheric-line` — gradient hairline divider that fades in/out at the edges. Replaces any flat 1px line.
- `.warm-wash` — subtle radial warmth (rgba 255 244 228 at 3.5%). Used on the Stage, Builder workspace, DNA workspace, and draft-state page.
- `.grain` — SVG noise overlay at 3.5% opacity with `mix-blend-mode: overlay`. Used on the Stage.
- `.ghost-border` / `.ghost-border-b` — 1px at 20%/18% opacity of outline-variant
- `.drop-cap` — publication-grade first-letter float in Newsreader
- `.ritual-reveal`, `.ritual-reveal-1` through `.ritual-reveal-4` — staggered page-load fade+translate

### Hard rules (from CLAUDE.md and DESIGN.md)

- **Never** use default Tailwind blue/indigo as primary color
- **Never** use `shadow.md` — depth via tonal layering only
- **Never** use pure white — `#ece7e1` is the lightest text
- **Never** use 1px flat borders for sectioning — tonal shift or `atmospheric-line` only
- **Never** use rounded pill buttons — `rounded-sm` max
- **Never** use `transition-all` — only `transform` and `opacity`
- **Never** use spring animations for decorative motion
- **Only** ever use `tertiary` (#fcf9f8) sparingly as the "cut-through" accent — not decoration

### Composition patterns

- **Three-column workspace:** scrollspy (xl only) / central / summary rail
- **Two-column workspace (below xl):** central / summary rail
- **Full-bleed centered:** Draft project state only
- **Asymmetric headers:** page title on the left, action button on the right
- **Metadata-over-title hierarchy:** editorial-label → serif title → body intro. Repeat across every page.

---

## 6. Data Model

### ProjectContext (`src/lib/project-context.ts`)

Every project that's been "briefed" has a full context:

```typescript
type ProjectContext = {
  slug: string;                      // URL slug
  name: string;                      // Display name
  environment: string;               // "Project" / "Brief" / "Interpretation" — TopMetaBar label
  topbarMeta: { label: string; value: string }[];
  analysisSummaryTitle: string;      // Italic serif right-rail subhead
  analysisSummaryBody: string;       // Right-rail body prose
  brandTone: string[];               // Chip labels
  availableAssets: { name: string; detail: string }[];
  constraints: string[];
  dnaPanels: DnaPanel[];             // 8 panels per project
  railSnapshot: string;              // Builder right-rail Project block body
  railSnapshotHelper: string;        // Italic helper under snapshot
  railCta: string;                   // "Book Consultation" — italic serif
  railAssets: string[];              // "Assets you have" list
  railGaps: string[];                // "Gaps to flag" list
  railConstraints: string[];         // "Constraints noted" list
  builderProgress: { completed: number; total: number };
};

type DnaPanel = {
  label: string;   // "Panel 01"
  title: string;   // "Brand Direction"
  why: string;     // helper-text line explaining why this panel matters
  body: string;    // main panel content (HTML allowed via dangerouslySetInnerHTML)
};
```

### OutputBundle (`src/lib/prompts.ts`)

```typescript
type PromptDoc = {
  moduleLabel: string;      // "Module 01 // Structural Blueprint"
  title: string;            // "Site Architecture & Navigation"
  description: string;      // Subtitle paragraph
  sections: PromptSection[];
};

type PromptSection = {
  label: string;   // "LAYER 01 — GLOBAL ENTRY" — renders as editorial-label
  body: string;    // Prose — can be multi-sentence, can have bullet lists joined with ' • '
};

type OutputBundle = Record<"build" | "research" | "visuals" | "refine", PromptDoc>;

// Registry, keyed by slug
const bundles: Record<string, OutputBundle> = { ... };
```

### Project list (`src/lib/projects.ts`)

Thin registry of 7 sample projects (Thorn and Thimble, Nail Suite, Strange Maine, Balsam Electric, Lavender Puff, Ghostly Engraving, Bar Harbor Guitar Repair). Only 2 have full context in `project-context.ts`.

---

## 7. Key Technical Patterns Established

### Pattern: Project context via URL search params

Server pages (`output`, `dna`) accept `searchParams` as an async prop:

```tsx
type SearchParams = Promise<{ project?: string }>;

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { project: slug } = await searchParams;
  const ctx = getContext(resolveSlug(slug));
  // ...
}
```

Client pages (`builder`) use `useSearchParams` with a **required Suspense wrapper**:

```tsx
"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <PageBody />
    </Suspense>
  );
}

function PageBody() {
  const params = useSearchParams();
  const slug = params.get("project");
  // ...
}
```

**WHY:** In Next.js 16, any client component reading URL params inside a statically-rendered page will fail at build time without a Suspense boundary. This is non-negotiable.

### Pattern: Draft project state

Any project page (Builder / DNA / Output) checks context + project existence:

- `project && !ctx` → render `<DraftProjectState project={project} stage="builder" />`
- `!ctx && !project` → render "Not Found" with link back to archive
- both exist → render normally

Keeps the UX graceful for partially-briefed projects.

### Pattern: Sidebar active-project awareness

`SidebarNav` uses both `usePathname` and `useSearchParams`. When pathname is one of `/builder` `/dna` `/output`, it resolves the slug from URL, looks up the project, and shows a "Working on" block above the nav. Nav items for those three routes inherit the current `?project=` query so you can switch workspaces without losing context.

---

## 8. David's Voice & Working Preferences

**What he likes:**
- Direct, first-person, observational prose
- "I noticed..." "Hope you're doing well..." — natural not performative
- Specific over abstract
- Bias to action — when he asks for something, just build it
- Real examples over generic framing
- Memory carried across sessions

**What he hates:**
- Corporate fluff: "unlock", "elevate", "seamless", "journey", "cutting-edge", "transformative", "solutions that..."
- Em dashes used as filler punctuation
- Run-on sentences that say nothing
- Generic AI aesthetics (purple gradients, Inter, Space Grotesk by default)
- Being asked permission for things Claude is capable of handling
- Planning without building when a clear instruction was given
- Second-guessing after the direction is set

**Pitch rule:** NEVER send him any writing without referencing `c:/dead-pixel-design/davids-writing-style/`. That rule applies to outreach / marketing copy. UX microcopy is a softer case but the same voice principles apply.

**Reference images rule:** If a reference image exists, match layout/spacing/type/color exactly. Don't "improve." Screenshot, compare, iterate at least two rounds. Stop only when there's no visible difference or David says so.

**Assets rule:** Always check `Assets/` in the working folder before designing. Use real assets, don't placeholder over them.

---

## 9. NEXT DIRECTION — Teaching Mode

### The insight that triggered this

David noticed the app is accidentally a teaching tool. Every prompt section contains **encoded design opinion**:
- "Two clicks max to primary CTA"
- "Owner photos precede generated imagery"
- "Never put imagery inside a rounded container"
- "Local SEO uses place names naturally, never keyword-stuffed"
- "'Boutique' appears once total, in the hero"

These aren't prompting tips — they're web-design principles. The KERNEL framework was the excuse to write them down, but the principles transcend any single project. Anyone reading the generated prompts learns Dead Pixel's approach to web craft by osmosis.

Teaching Mode makes that explicit. It transforms the product from "prompt generator" into **"prompt generator + curriculum for small-business web design."** Two products from one codebase.

### What Teaching Mode does

A **global app toggle** ("Teaching Notes: On/Off"). When **On**:

**Builder:**
- Each field helper text expands into richer commentary (still italic Newsreader, but 2-3 sentences instead of one)
- Each section intro gains a "Real example" expansion — a short case reference showing how a successful site answered that section
- The Live Snapshot rail gets a "What this teaches" mini-card

**DNA Review:**
- Each panel gets a new tag row under the title: small caps category chips like `COMPOSITION · COPY · TRUST`
- Each panel gains an "Underlying principle" block — surfaces the reusable rule that this project-specific content demonstrates
- Link from each panel to the matching principle in the Library

**Output Studio:**
- Each prompt section gets a numbered margin note annotation (tiny tertiary number to the right of the section label)
- Clicking the number expands a sidenote: "Why this rule / What would go wrong without it / Which projects demonstrate it"
- The Stage becomes an annotated document — like an editorial edition of a design textbook

**Projects archive:**
- Each card gains a "What you'll learn from this project" micro-line at the bottom

**When Off:** Everything renders as it does now. Teaching content is present in the data but hidden from the UI.

### New screen — Principles Library

New top-level route: `/principles`

- Grid of principles grouped by **category**: Composition / Copy / CTA Flow / Local SEO / Assets / Mobile / Trust / Accessibility / Typography
- Each principle card shows:
  - `CATEGORY` editorial label
  - Principle stated in italic serif ("Two clicks max to primary CTA")
  - 2-3 sentence rationale (body Manrope)
  - "Appears in" list — which projects demonstrate it
  - "Anti-example" callout (uses subtle error-container background)
- Detail view `/principles/[slug]` — expand a principle into full prose with:
  - The rule
  - Why it matters (longer form)
  - Anti-examples (what NOT to do, specifically)
  - Projects that follow it — with jump links into their relevant prompt sections
  - Related principles

Sidebar gets a new entry: `Principles` (below Settings, above the Support/Archive lower rail)

### Technical implementation

1. **Teaching mode state — global context:**

```tsx
// src/components/teaching/TeachingModeProvider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { enabled: boolean; toggle: () => void };
const TeachingCtx = createContext<Ctx>({ enabled: false, toggle: () => {} });

export function TeachingModeProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("build-ritual:teaching-mode");
    if (stored === "true") setEnabled(true);
  }, []);

  const toggle = () => {
    setEnabled(v => {
      const next = !v;
      localStorage.setItem("build-ritual:teaching-mode", String(next));
      return next;
    });
  };

  return <TeachingCtx.Provider value={{ enabled, toggle }}>{children}</TeachingCtx.Provider>;
}

export const useTeachingMode = () => useContext(TeachingCtx);
```

Wrap `(app)/layout.tsx` with `<TeachingModeProvider>`.

2. **Toggle UI:**
Add to `TopMetaBar` right cluster, before the menu dots:
```tsx
<button
  onClick={toggle}
  className="font-label text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 border border-outline-variant/25 hover:border-tertiary/60 transition-colors duration-300"
>
  Teaching · <span className={enabled ? "text-tertiary" : "text-on-surface-variant"}>
    {enabled ? "On" : "Off"}
  </span>
</button>
```

3. **Annotation primitive — `<TeachingNote>`:**

```tsx
// src/components/teaching/TeachingNote.tsx
"use client";
import { useTeachingMode } from "./TeachingModeProvider";

export function TeachingNote({ children }: { children: React.ReactNode }) {
  const { enabled } = useTeachingMode();
  if (!enabled) return null;

  return (
    <aside className="mt-3 pl-4 border-l border-tertiary/30 space-y-1.5">
      <p className="editorial-label text-tertiary/80">Why</p>
      <p className="helper-text text-on-surface">{children}</p>
    </aside>
  );
}
```

4. **Principle data model:**

```tsx
// src/lib/principles.ts

export type PrincipleCategory =
  | "composition"
  | "copy"
  | "cta-flow"
  | "local-seo"
  | "assets"
  | "mobile"
  | "trust"
  | "accessibility"
  | "typography";

export type Principle = {
  slug: string;
  rule: string;              // "Two clicks max to primary CTA"
  category: PrincipleCategory;
  rationale: string;         // 2-3 sentences
  antiExample?: string;      // what to avoid
  appliesTo: string[];       // project slugs
  appearsIn: {
    project: string;
    tab: "build" | "research" | "visuals" | "refine";
    sectionLabel: string;
  }[];
};

export const principles: Principle[] = [ /* starter list below */ ];
```

5. **Route: `/principles`**
- New folder: `src/app/(app)/principles/page.tsx`
- Grid layout: grouped by category as sections (editorial-label → serif title → grid of principle cards)
- Card design: same visual language as DNA panels (ghost border, tonal layering)

6. **Route: `/principles/[slug]`**
- Dynamic route for principle detail
- Similar composition to Output Studio Stage — editorial label → title → body → annotated example

7. **Wire teaching notes into existing pages:**
- Builder: wrap each field's helper text with a `<TeachingNote>` carrying the longer rationale
- DNA: each panel gets category chips under the title and a principle reference
- Output Studio: each prompt section's `editorial-label` gets a numbered note indicator; expanded note area shows below each section when teaching mode is on

### Content work required

This is the biggest lift. Every existing prompt section needs the design principles extracted and classified. I estimate 30-60 principles total across the two populated projects.

**Starter set (8-12 foundational principles spanning both projects):**

| Rule | Category | Appears in |
|---|---|---|
| Two clicks max from any page to primary CTA | cta-flow | both projects, Build + Refine tabs |
| Owner photos precede generated imagery; generated imagery only fills genuine gaps | assets | both, Visuals + Refine |
| No cliché verbs in copy (unlock, elevate, transform, seamless, journey) | copy | both, Refine |
| Tap targets ≥ 44px, tap-to-call works everywhere | mobile | both, Refine |
| Local place name appears naturally in titles, never keyword-stuffed | local-seo | both, Refine |
| Editorial label → serif title → body is the canonical hierarchy | typography | both, Visuals |
| Asymmetric composition; left-heavy headlines, no center-aligned body | composition | both, Visuals |
| Never put imagery inside a rounded container | composition | Nail Suite Visuals |
| Industry-standard safety/trust FAQs are banned — owner's voice leads | trust | Thorn & Thimble, Build + Refine |
| One signature typographic moment per page (drop cap, italic for one word, etc.) | typography | both, Visuals |
| Owner photos color-graded to a single shared profile | assets | both, Visuals |
| Mobile primary even when desktop is the star | mobile | both, Build |

Each needs 2-3 sentences of rationale + optional anti-example.

### Suggested implementation order

1. **Build the scaffolding first, content second.** `TeachingModeProvider`, `TeachingNote` component, toggle UI, localStorage persistence.
2. **Seed 4-6 teaching notes into the Builder** (cheapest place to demonstrate the pattern — each field already has helper text, just expand it when mode is on).
3. **Build `/principles` list route** with the 12 starter principles.
4. **Wire principle category chips into DNA panels** (each panel already has a why line; adding categories is a one-line addition to the context data).
5. **Add margin notes to Output Studio prompt sections** — this is the biggest visual change. Reserve right-side Stage padding for sidenotes. Numbered references like `[1]`, `[2]` in the prompt content, with sidenote blocks at the bottom of the Stage that expand when teaching mode is on.
6. **Build `/principles/[slug]` detail route.**
7. **Iterate content** — add more principles, more annotations, refine what's teachable.

### Design treatment for teaching content

- **Teaching content uses `tertiary` (#fcf9f8) as its color system** (instead of `on-surface`). This visually distinguishes "the teaching layer" from "the product layer."
- **Category chips** use filled Chip variant with a slightly different bg (`surface-container-high` instead of ghost border). Keeps them quiet.
- **Anti-example callouts** use `bg-error-container/15 border-error/20` — the only time the error token gets used in the UI.
- **Margin notes in Output Studio** use a thin vertical `atmospheric-line` (rotated 90°) as the left rule, with tertiary-colored editorial labels.
- **Toggle affordance** uses a subtle `tertiary/60` color when ON, `on-surface-variant` when OFF. The toggle itself is a small chip in the TopMetaBar — never the primary visual element.

### What NOT to do

- Don't turn Teaching Mode into a "tutorial overlay" with giant explanatory callouts. The tone is **footnote**, not **tutorial**.
- Don't gate content behind Teaching Mode. All the same prompts show up. Teaching Mode only adds commentary.
- Don't use bright accent colors for teaching content. Use the tertiary off-white and the error-container (quietly) and that's it.
- Don't write principles in marketing voice. They should read like a senior developer explaining over the shoulder, not like a landing page.
- Don't make teaching mode opinionated about THE RIGHT WAY to do things. Present the rule, give the rationale, acknowledge the trade-off if there is one.

---

## 10. Reference Material

- **Original brief:** `web-forge/personal/prompt-builder/prompt-builder-design.md` (785 lines)
- **Visual reference — Stitch:** `web-forge/personal/prompt-builder/stitch_build_ritual_output_design/`
  - `output_studio/screen.png` — clearest reference for Output Studio layout
  - `output_studio_thorn_and_thimble/screen.png` — shows Thorn & Thimble treatment
  - `output_studio_visuals/screen.png` — Visuals tab treatment
  - `ritual_dark_mono/DESIGN.md` — full design system spec (the "Monastic Workspace" language)
- **The prompt-engineering canon** (knowledge base for the prompt content):
  - `the-brain/wiki/concepts/prompt-engineering.md` — KERNEL framework + principles
  - `the-brain/wiki/concepts/context-engineering.md`
  - `the-brain/wiki/concepts/claude-code-workflow.md`
  - `the-brain/wiki/sources/article-prompt-engineering-collection.md`
  - `the-brain/wiki/sources/article-context-engineering-anthropic.md`
  - `the-brain/` root has the Anthropic Prompt Engineering Interactive Tutorial notebooks (01–10 + appendices)
- **David's voice reference:** `davids-writing-style/` — must reference before writing any pitch-like copy
- **Sidekick project:** Claude's Receipts — nearby sibling project with similar sensibility. See `HANDOFF.md` there for patterns.

---

## 11. How to pick this up

1. Read §0, §1, §5, §8, §9 of this document (in that order)
2. `cd` into the build-ritual folder
3. Run `npx next dev --port 4100` and click through the existing flow first — understand the current state
4. Invoke `frontend-design` skill
5. Start with §9 step 1 (TeachingModeProvider + toggle UI + `<TeachingNote>`)
6. Commit incrementally — one concern per commit (state management, then UI affordance, then Principles Library, then content)
7. When adding new principles, always add them to both the registry (`lib/principles.ts`) AND wire them into the `appearsIn` references so the cross-links work

**First 30 minutes should produce:**
- `TeachingModeProvider` wrapping `(app)/layout.tsx`
- Toggle in `TopMetaBar`
- `<TeachingNote>` component
- 2-3 teaching notes visible in the Builder when toggle is on
- Screenshots confirming it reads as a footnote layer, not a tutorial overlay

**Don't start on content (principles list) until the scaffolding is solid.** Reversing that order leads to writing a lot of prose that then has to be shoehorned into whatever structure you land on.

---

*David will verify. He'll tell you when it's right. He'll tell you when it's off. Trust both signals equally.*
