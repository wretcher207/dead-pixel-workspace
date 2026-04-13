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

export type PrincipleRef = {
  project: string;
  tab: "build" | "research" | "visuals" | "refine";
  sectionLabel: string;
};

export type Principle = {
  slug: string;
  rule: string;
  category: PrincipleCategory;
  rationale: string;
  antiExample?: string;
  appliesTo: string[];
  appearsIn: PrincipleRef[];
  relatedSlugs?: string[];
};

export const CATEGORY_LABELS: Record<PrincipleCategory, string> = {
  composition: "Composition",
  copy: "Copy",
  "cta-flow": "CTA Flow",
  "local-seo": "Local SEO",
  assets: "Assets",
  mobile: "Mobile",
  trust: "Trust",
  accessibility: "Accessibility",
  typography: "Typography",
};

export const principles: Principle[] = [
  {
    slug: "two-clicks-to-cta",
    rule: "Two clicks max from any page to primary CTA",
    category: "cta-flow",
    rationale:
      "Every extra click between a visitor and the action you want them to take is a decision point where they can leave. Small business sites aren't complex enough to justify deep navigation. If someone has to hunt for the booking page, they'll book with whoever made it easy.",
    antiExample:
      "Burying 'Book Now' inside a Services > Piercing > Aftercare > Contact chain. The visitor wanted to book, not read a manual.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Layer 01 — Global Entry" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 05 — CTA Tightening" },
      { project: "the-nail-suite", tab: "build", sectionLabel: "Layer 01 — Global Entry" },
    ],
    relatedSlugs: ["mobile-primary", "asymmetric-composition"],
  },
  {
    slug: "owner-photos-first",
    rule: "Owner photos precede generated imagery; generated imagery only fills genuine gaps",
    category: "assets",
    rationale:
      "Real photos of a real person doing real work build trust faster than any AI-generated image. A slightly imperfect photo of the actual studio is worth ten polished stock images. Generated imagery should only appear where no real asset exists yet.",
    antiExample:
      "Leading with an AI-generated hero image of a generic salon interior when the owner has 200 photos on their Instagram.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Layer 02 — Photography Direction" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 02 — Photography Direction" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 08 — Asset Audit" },
    ],
    relatedSlugs: ["owner-photos-color-graded", "no-rounded-image-containers"],
  },
  {
    slug: "no-cliche-verbs",
    rule: "No cliche verbs in copy: unlock, elevate, transform, seamless, journey",
    category: "copy",
    rationale:
      "These words have been emptied of meaning by a decade of SaaS landing pages and AI-generated content. When every business claims to 'elevate your experience,' none of them are saying anything. Specific, concrete language builds credibility. Vague language builds suspicion.",
    antiExample:
      "'Elevate your piercing journey with our seamless booking experience.' That sentence contains zero information.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 07 — Copy Humanization" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Layer 07 — Copy Humanization" },
    ],
    relatedSlugs: ["owner-voice-leads"],
  },
  {
    slug: "tap-targets-44px",
    rule: "Tap targets 44px minimum, tap-to-call works everywhere",
    category: "mobile",
    rationale:
      "Most visitors to a local business site are on their phone, often one-handed, often distracted. A 32px button that looks fine on your desktop monitor becomes a frustrating missed-tap on a phone screen. 44px is the floor, not the ceiling.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 04 — Mobile Polish" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Layer 04 — Mobile Polish" },
    ],
    relatedSlugs: ["mobile-primary"],
  },
  {
    slug: "local-place-names-natural",
    rule: "Local place name appears naturally in titles, never keyword-stuffed",
    category: "local-seo",
    rationale:
      "Google's local algorithm rewards natural mention of the city and region. But 'Best Body Piercing Bangor Maine | Bangor ME Piercing Studio' reads like spam and destroys trust. Write for the human first. If the copy mentions Bangor once or twice naturally, SEO follows.",
    antiExample:
      "Page title: 'Bangor Maine Body Piercing | Best Piercing Bangor ME | Bangor Piercings Near Me'",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 06 — Local SEO" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Layer 06 — Local SEO" },
    ],
    relatedSlugs: ["no-cliche-verbs"],
  },
  {
    slug: "editorial-hierarchy",
    rule: "Editorial label, then serif title, then body is the canonical hierarchy",
    category: "typography",
    rationale:
      "This three-tier pattern (tiny caps label, large serif heading, readable body) creates a consistent reading rhythm across every page. The label orients, the title anchors, the body informs. Breaking this pattern makes a page feel disorganized even if the content is good.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Layer 03 — Typography System" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 03 — Typography System" },
    ],
    relatedSlugs: ["one-typographic-moment", "asymmetric-composition"],
  },
  {
    slug: "asymmetric-composition",
    rule: "Asymmetric composition; left-heavy headlines, no center-aligned body text",
    category: "composition",
    rationale:
      "Center-aligned body text is harder to read because the eye has to find a new starting point on every line. Left-aligned text with asymmetric layout creates visual tension and a clear reading path. Centered headings work for invitations, not information architecture.",
    antiExample:
      "A services page where every heading, paragraph, and button is center-aligned. It reads like a wedding program.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Layer 01 — Composition Rules" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 01 — Composition Rules" },
    ],
    relatedSlugs: ["editorial-hierarchy"],
  },
  {
    slug: "no-rounded-image-containers",
    rule: "Never put imagery inside a rounded container",
    category: "composition",
    rationale:
      "Rounded image containers (circle crops, pill-shaped frames) crop meaningful content and signal generic template design. Full-bleed or sharp-cornered images let the photography speak. The shape of the image should be the shape of the photograph, not a UI decoration.",
    antiExample:
      "Circular headshots on a team page that crop out the artist's hands, workspace, or tools.",
    appliesTo: ["the-nail-suite"],
    appearsIn: [
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 01 — Composition Rules" },
    ],
    relatedSlugs: ["owner-photos-first", "asymmetric-composition"],
  },
  {
    slug: "owner-voice-leads",
    rule: "Industry-standard safety/trust FAQs are banned; the owner's voice leads",
    category: "trust",
    rationale:
      "Every piercing studio has the same sterilization FAQ. Every nail salon has the same hygiene policy. Copying those templates makes you invisible. When the owner explains their process in their own words, the visitor hears a person, not a template. Trust comes from specificity.",
    antiExample:
      "A 'Frequently Asked Questions' section copied from a competitor's site with the business name swapped in.",
    appliesTo: ["thorn-and-thimble"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Layer 04 — Trust Surface" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Layer 07 — Copy Humanization" },
    ],
    relatedSlugs: ["no-cliche-verbs"],
  },
  {
    slug: "one-typographic-moment",
    rule: "One signature typographic moment per page",
    category: "typography",
    rationale:
      "A single unexpected typographic gesture (a drop cap, one italic word in a heading, an oversized pull quote) makes a page memorable. Two or three competing gestures make it chaotic. The restraint is what gives the moment its power.",
    antiExample:
      "A page with a drop cap, an oversized pull quote, a rotated sidebar label, AND a handwritten-font accent. Pick one.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Layer 03 — Typography System" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 03 — Typography System" },
    ],
    relatedSlugs: ["editorial-hierarchy"],
  },
  {
    slug: "owner-photos-color-graded",
    rule: "Owner photos color-graded to a single shared profile",
    category: "assets",
    rationale:
      "Photos from different sources (phone, DSLR, Instagram, Google listing) have wildly different color temperatures. A single color-grading pass unifies them visually without losing authenticity. The site should look like one photographer shot it, even when five sources contributed.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Layer 02 — Photography Direction" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Layer 02 — Photography Direction" },
    ],
    relatedSlugs: ["owner-photos-first"],
  },
  {
    slug: "mobile-primary",
    rule: "Mobile is primary even when desktop is the visual star",
    category: "mobile",
    rationale:
      "70%+ of local business traffic is mobile. The desktop version gets the screenshots for the portfolio, but the phone version gets the customers. Design mobile first, then let it breathe on desktop. Never retrofit mobile from a desktop-first layout.",
    antiExample:
      "A beautiful desktop hero with a 3-column layout that collapses into an unreadable single column because mobile was an afterthought.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Constraints" },
      { project: "the-nail-suite", tab: "build", sectionLabel: "Constraints" },
    ],
    relatedSlugs: ["tap-targets-44px"],
  },
];

// ── Lookup helpers ──

export function getPrinciple(slug: string): Principle | undefined {
  return principles.find((p) => p.slug === slug);
}

export function getPrinciplesByCategory(cat: PrincipleCategory): Principle[] {
  return principles.filter((p) => p.category === cat);
}

export function getPrinciplesForProject(projectSlug: string): Principle[] {
  return principles.filter((p) => p.appliesTo.includes(projectSlug));
}

export function getCategories(): PrincipleCategory[] {
  const seen = new Set<PrincipleCategory>();
  for (const p of principles) seen.add(p.category);
  return Array.from(seen);
}
