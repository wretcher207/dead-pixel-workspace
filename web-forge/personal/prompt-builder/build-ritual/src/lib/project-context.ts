/*
 * Per-project context used by Output Studio, DNA, and Builder.
 * Keyed by the same slug as projects.ts and prompts.ts.
 *
 * Two projects have full fleshed-out context (Thorn and Thimble, The Nail Suite).
 * Everything else renders in a "Draft — not yet briefed" state.
 */

import type { OutputBundle } from "@/lib/prompts";

export type DnaPanel = {
  label: string;
  title: string;
  why: string;
  body: string;
};

export type AssetRef = { name: string; detail: string };

export type ProjectContext = {
  slug: string;
  name: string;
  environment: string; // Top-bar label: "Project", "Brief", etc.
  topbarMeta: { label: string; value: string }[];
  analysisSummaryTitle: string;
  analysisSummaryBody: string;
  brandTone: string[];
  availableAssets: AssetRef[];
  constraints: string[];
  dnaPanels: DnaPanel[];
  railSnapshot: string;
  railSnapshotHelper: string;
  railCta: string;
  railAssets: string[];
  railGaps: string[];
  railConstraints: string[];
  builderProgress: { completed: number; total: number };
};

export const contexts: Record<string, ProjectContext> = {
  "thorn-and-thimble": {
    slug: "thorn-and-thimble",
    name: "Thorn and Thimble",
    environment: "Project",
    topbarMeta: [
      { label: "Spec Site", value: "Bangor, Maine" },
      { label: "Updated", value: "2m ago" },
    ],
    analysisSummaryTitle: "Refined Precision",
    analysisSummaryBody:
      "Narrative depth over standard conversion metrics. The architecture prioritizes the discovery phase — Libby's voice leads, marketing scaffolding recedes. Every page is measured against the two-clicks-to-booking rule.",
    brandTone: ["Monastic", "Deliberate", "Archival"],
    availableAssets: [
      { name: "Textile_Study_01.jpg", detail: "1600×1600 · 4.2MB" },
      { name: "Studio_Shadows.png", detail: "1440×960 · 2.1MB" },
      { name: "Libby_Portrait.jpg", detail: "1200×1600 · 3.8MB" },
    ],
    constraints: [
      "Fixed-width canvas for the Bangor spec site",
      "Newsreader + Manrope only — no third typeface",
      "No industry-standard safety boilerplate — Libby's voice leads",
      "Owner photos take precedence over generated imagery",
      "'Trauma-informed' stays out of marketing copy",
    ],
    dnaPanels: [
      {
        label: "Panel 01",
        title: "Brand Direction",
        why: "This is what the AI will try to match in every generated output.",
        body: "Dark, refined, premium, atmospheric. Cartoonish visuals, generic AI styling, over-animation, and cluttered composition are all out. Libby's language leads — marketing scaffolding recedes to the background.",
      },
      {
        label: "Panel 02",
        title: "Audience Profile",
        why: "Shapes who the copy speaks to and which objections it addresses.",
        body: "Adults in Central Maine researching their first or first-in-a-long-time piercing. High-intent on safety, sterilization, and jewelry sourcing. Low tolerance for edgy studio vibes or clinical boilerplate. They've done the Google search already.",
      },
      {
        label: "Panel 03",
        title: "Conversion Strategy",
        why: "Every page will be measured against how well it serves this path.",
        body: "Primary CTA is Book Consultation. Secondary CTAs reinforce trust — aftercare depth, jewelry sourcing transparency, and Libby's own training history. Two clicks max from anywhere on the site to a booking.",
      },
      {
        label: "Panel 04",
        title: "Content Reality",
        why: "What's on hand to work with vs. what still needs to be created.",
        body: "Available: logo, studio photos, testimonials, draft service copy, owner/about content, business hours. Not available: hero loop video. That gets generated in Seedance as part of the Visual pack.",
      },
      {
        label: "Panel 05",
        title: "Asset Readiness",
        why: "Flags what's production-ready and what's blocking the build.",
        body: "Logo: ready. Portraits: one usable, second needed. Studio photos: 12 on hand — need color grading to match. Testimonials: 3 usable as-is. Service copy: draft-stage, needs a voice pass before it ships.",
      },
      {
        label: "Panel 06",
        title: "Technical Standards",
        why: "The non-negotiables. Defaults plus anything specific to this job.",
        body: "Mobile strong, desktop primary. Strong SEO for Bangor and Central Maine queries. Newsreader + Manrope as the only type system. Minimal animation. Tap targets 44px or larger. WCAG AA floor.",
      },
      {
        label: "Panel 07",
        title: "Constraints",
        why: "Things the AI will specifically not do. Enforced on every output.",
        body: "&ldquo;Trauma-informed&rdquo; stays out of marketing copy. Owner photos come before generated imagery in every section. No industry-standard safety FAQ boilerplate. Palette stays in warm neutrals + one ember accent.",
      },
      {
        label: "Panel 08",
        title: "Output Set",
        why: "Which prompt packs will be generated when you hit Generate.",
        body: "Build Prompt, Research Prompt, Visual Prompt Pack, Refinement Prompt Pack. SEO pack is deferred until the architecture in the Build pack is reviewed — no point optimizing pages that might not exist yet.",
      },
    ],
    railSnapshot: "Body piercing studio in Bangor, Maine.",
    railSnapshotHelper: "Solo, premium, owner-led voice. Anatomy-first.",
    railCta: "Book Consultation",
    railAssets: [
      "Vector logo",
      "12 studio photos",
      "3 usable testimonials",
      "Portrait of Libby",
    ],
    railGaps: [
      "No hero video yet",
      "Service copy needs voice pass",
      "Second portrait missing",
    ],
    railConstraints: [
      "No marketing boilerplate",
      "Libby's voice leads",
      "No \u201Ctrauma-informed\u201D as copy",
    ],
    builderProgress: { completed: 6, total: 7 },
  },

  "the-nail-suite": {
    slug: "the-nail-suite",
    name: "The Nail Suite",
    environment: "Project",
    topbarMeta: [
      { label: "Spec Site", value: "Dexter, Maine" },
      { label: "Updated", value: "1h ago" },
    ],
    analysisSummaryTitle: "Interior as Brand",
    analysisSummaryBody:
      "A two-chair boutique in a town of three thousand. The studio space itself carries the brand — every visual moment derives from the actual chair, lamp, and afternoon light. Booking friction beats everything else as the primary metric.",
    brandTone: ["Warm", "Editorial", "Localized"],
    availableAssets: [
      { name: "Interior_GoldenHour.mov", detail: "Seedance · 14s loop" },
      { name: "Larissa_Hands.jpg", detail: "1200×1600 · 2.9MB" },
      { name: "Work_Ombre_Set.jpg", detail: "1440×1080 · 1.8MB" },
    ],
    constraints: [
      "Warm palette only — no pastels, no cool tones",
      "Larissa's own phone photos beat any AI generation",
      "Mobile is primary, desktop is the bonus",
      "No 'luxury' language — Larissa hates it",
      "The word 'boutique' appears once total, in the hero",
    ],
    dnaPanels: [
      {
        label: "Panel 01",
        title: "Brand Direction",
        why: "What the AI tries to match in every output.",
        body: "Warm, interior-driven, matter-of-fact. Not luxury, not cold-feminine, not pastel. The studio space leads — portraits are secondary, and work close-ups third.",
      },
      {
        label: "Panel 02",
        title: "Audience Profile",
        why: "Who the copy speaks to.",
        body: "Women 20–60 living within a 30-minute drive. Split between phone-booking regulars and Instagram-first newcomers. Low tolerance for salon-chain language.",
      },
      {
        label: "Panel 03",
        title: "Conversion Strategy",
        why: "What every page is measured against.",
        body: "Reserve a Chair (embedded booking) is primary. Tap-to-call is the fallback. Instagram tap is tertiary. No other CTAs compete on mobile.",
      },
      {
        label: "Panel 04",
        title: "Content Reality",
        why: "What's ready to ship and what still needs producing.",
        body: "Available: interior video, Larissa's IG work photos, hours, service list with pricing. Not available: second portrait, written about-page copy. Larissa will record a voice memo for copy source.",
      },
      {
        label: "Panel 05",
        title: "Asset Readiness",
        why: "Blockers to first deploy.",
        body: "Interior loop: ready. Service photos: ready (IG source). Portraits: one usable. About copy: needs writing from voice memo. Logo: simple wordmark, vector.",
      },
      {
        label: "Panel 06",
        title: "Technical Standards",
        why: "The non-negotiables for this build.",
        body: "Mobile primary. Performance-critical (slow rural connections). Square or Vagaro booking embed. WCAG AA. Tap-to-call on phone number always works.",
      },
      {
        label: "Panel 07",
        title: "Constraints",
        why: "What the AI will refuse to produce.",
        body: "No luxury language. No stock imagery. 'Boutique' appears exactly once. No cool-tone palette drift. No generated imagery where Larissa's real work exists.",
      },
      {
        label: "Panel 08",
        title: "Output Set",
        why: "Prompt packs in this generation.",
        body: "Build, Research, Visuals, Refine. SEO pack deferred until architecture is locked — there are only two real pages anyway.",
      },
    ],
    railSnapshot: "Two-chair nail studio in Dexter, Maine.",
    railSnapshotHelper: "Warm, interior-led, Larissa's own work leads.",
    railCta: "Reserve a Chair",
    railAssets: [
      "Interior hero loop (Seedance)",
      "8 work photos from Larissa's IG",
      "Logo wordmark (vector)",
      "Portrait of Larissa",
    ],
    railGaps: [
      "Second portrait needed",
      "About copy (voice memo pending)",
      "Booking embed config",
    ],
    railConstraints: [
      "Warm palette only",
      "'Boutique' appears once",
      "No luxury language",
    ],
    builderProgress: { completed: 5, total: 7 },
  },
};

export function getContext(slug: string | undefined): ProjectContext | null {
  if (!slug) return contexts["thorn-and-thimble"];
  return contexts[slug] ?? null;
}

export function resolveSlug(slug: string | undefined): string {
  if (!slug) return "thorn-and-thimble";
  return slug;
}
