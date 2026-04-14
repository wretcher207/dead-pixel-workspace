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
  // ── Original 12 ──
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
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Homepage" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Stronger CTA Flow" },
      { project: "the-nail-suite", tab: "build", sectionLabel: "Homepage" },
    ],
    relatedSlugs: ["mobile-primary", "cta-above-fold", "three-click-depth"],
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
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Service Thumbnails" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Service Thumbnails" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "More Asset-Driven Design" },
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
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Copy Humanization" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Copy Humanization" },
    ],
    relatedSlugs: ["owner-voice-leads", "h1-is-value-prop"],
  },
  {
    slug: "tap-targets-44px",
    rule: "Tap targets 44px minimum, tap-to-call works everywhere",
    category: "mobile",
    rationale:
      "Most visitors to a local business site are on their phone, often one-handed, often distracted. A 32px button that looks fine on your desktop monitor becomes a frustrating missed-tap on a phone screen. 44px is the floor, not the ceiling.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Mobile Polish" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Mobile Polish" },
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
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Stronger Local SEO" },
      { project: "the-nail-suite", tab: "refine", sectionLabel: "Local Specificity" },
    ],
    relatedSlugs: ["no-cliche-verbs", "h1-is-value-prop"],
  },
  {
    slug: "editorial-hierarchy",
    rule: "Editorial label, then serif title, then body is the canonical hierarchy",
    category: "typography",
    rationale:
      "This three-tier pattern (tiny caps label, large serif heading, readable body) creates a consistent reading rhythm across every page. The label orients, the title anchors, the body informs. Breaking this pattern makes a page feel disorganized even if the content is good.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Type Pairing" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Type Pairing" },
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
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Composition Rules" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Composition Rules" },
    ],
    relatedSlugs: ["editorial-hierarchy", "no-sliders-or-carousels"],
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
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Composition Rules" },
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
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Trust & Credibility" },
      { project: "thorn-and-thimble", tab: "refine", sectionLabel: "Copy Humanization" },
    ],
    relatedSlugs: ["no-cliche-verbs", "trust-signals-first-fold"],
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
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Type Pairing" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Type Pairing" },
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
      { project: "thorn-and-thimble", tab: "visuals", sectionLabel: "Service Thumbnails" },
      { project: "the-nail-suite", tab: "visuals", sectionLabel: "Service Thumbnails" },
    ],
    relatedSlugs: ["owner-photos-first"],
  },
  {
    slug: "mobile-primary",
    rule: "Mobile is primary even when desktop is the visual star",
    category: "mobile",
    rationale:
      "60%+ of all web traffic is mobile, and Google uses mobile-first indexing. The desktop version gets the screenshots for the portfolio, but the phone version gets the customers. Design mobile first, then let it breathe on desktop. Never retrofit mobile from a desktop-first layout.",
    antiExample:
      "A beautiful desktop hero with a 3-column layout that collapses into an unreadable single column because mobile was an afterthought.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Constraints" },
      { project: "the-nail-suite", tab: "build", sectionLabel: "Constraints" },
    ],
    relatedSlugs: ["tap-targets-44px", "page-speed-is-design"],
  },

  // ── New principles from article research ──
  {
    slug: "no-sliders-or-carousels",
    rule: "No sliders or carousels; stack content vertically",
    category: "composition",
    rationale:
      "58% of homepages still use sliders despite data showing only the first slide gets meaningful engagement. Carousels create competing priority messages and slow page load. Stacking content vertically, ranked by importance, doubles perceived value and lets each section earn its own attention.",
    antiExample:
      "A 5-slide hero carousel where slides 2-5 get less than 1% of clicks. The client paid for 5 messages but only delivered 1.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["asymmetric-composition", "no-autoplay-no-parallax"],
  },
  {
    slug: "cta-above-fold",
    rule: "Primary CTA visible within 3 seconds, no scrolling required",
    category: "cta-flow",
    rationale:
      "Desktop users spend the majority of their time above the fold. If your strongest call to action isn't visible before a visitor scrolls, you're relying on hope instead of design. Place the primary CTA in the hero, then repeat it at natural decision points further down.",
    antiExample:
      "A product page where the only 'Book Now' button sits below three paragraphs of company history and a photo gallery.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Homepage" },
      { project: "the-nail-suite", tab: "build", sectionLabel: "Homepage" },
    ],
    relatedSlugs: ["two-clicks-to-cta"],
  },
  {
    slug: "descriptive-button-text",
    rule: "Button text mirrors user language, never 'Submit' or 'Click Here'",
    category: "cta-flow",
    rationale:
      "Generic button text ('Submit', 'Click Here', 'Learn More') forces the visitor to guess what happens next. Action-specific labels ('Book Consultation', 'See Pricing', 'Get Free Quote') tell them exactly what commitment they're making. Testing shows specific labels increase clicks by 12% or more.",
    antiExample:
      "A contact form ending with a 'Submit' button instead of 'Send Message' or 'Request a Call Back'.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["two-clicks-to-cta", "cta-above-fold"],
  },
  {
    slug: "nav-five-to-seven-items",
    rule: "Navigation limited to 5-7 items with descriptive labels",
    category: "composition",
    rationale:
      "70% of sites still use vague navigation labels like 'Services' and 'Products.' Users need to know what they're getting before they click. Descriptive labels ('Piercing Types', 'Aftercare Guide') reduce cognitive load. More than 7 top-level items overwhelms and slows decision-making.",
    antiExample:
      "A nav bar with 12 items including 'Resources', 'Solutions', 'Insights', 'Platform', and 'Company' — each vague enough to mean anything.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["three-click-depth", "two-clicks-to-cta"],
  },
  {
    slug: "trust-signals-first-fold",
    rule: "At least one specific trust signal visible before scrolling",
    category: "trust",
    rationale:
      "28% of homepages completely omit testimonials, case studies, or proof from the first screen. Empty claims ('We provide the best service') lose trust. A single specific signal — a named testimonial, a credential badge, a concrete result — converts skeptics in the first 3 seconds.",
    antiExample:
      "A homepage hero that says 'Trusted by thousands' with no names, no logos, no numbers. Trust requires specificity.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Trust & Credibility" },
    ],
    relatedSlugs: ["owner-voice-leads", "cta-above-fold"],
  },
  {
    slug: "page-speed-is-design",
    rule: "Page load under 3 seconds; speed is a design decision, not an afterthought",
    category: "mobile",
    rationale:
      "53% of mobile users leave after 3 seconds. Each additional second reduces conversions by 7%. Core Web Vitals are both UX and ranking factors. Compress images to WebP, lazy-load below-the-fold content, and keep above-the-fold HTML lightweight. Speed beats aesthetics every time.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Constraints" },
    ],
    relatedSlugs: ["mobile-primary", "tap-targets-44px"],
  },
  {
    slug: "whitespace-groups-content",
    rule: "White space groups related content; it's structure, not wasted pixels",
    category: "composition",
    rationale:
      "White space improves text comprehension by 20%. It's how users understand page structure without being told. Group related elements closely (proximity principle), then separate distinct sections with breathing room. Dense pages read as chaotic even when the content is organized.",
    antiExample:
      "A services page where pricing, testimonials, and booking are all crammed together with identical spacing. The eye has no hierarchy.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["asymmetric-composition", "editorial-hierarchy"],
  },
  {
    slug: "h1-is-value-prop",
    rule: "Homepage H1 states what you do, not your business name",
    category: "copy",
    rationale:
      "54% of homepages waste their H1 on the company name or a vague tagline. The H1 is the strongest piece of SEO real estate on the page and the first thing visitors read. 'Precise Body Piercing in Bangor, Maine' beats 'Welcome to Thorn and Thimble' every time.",
    antiExample:
      "H1: 'Welcome to Our Studio' — contains zero information about what the business does, where it is, or why you should care.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [
      { project: "thorn-and-thimble", tab: "build", sectionLabel: "Homepage" },
    ],
    relatedSlugs: ["no-cliche-verbs", "local-place-names-natural"],
  },
  {
    slug: "contrast-ratio-minimum",
    rule: "4.5:1 contrast for text, 3:1 for large text — no exceptions",
    category: "accessibility",
    rationale:
      "Low contrast isn't just an accessibility issue. It signals unprofessionalism and erodes trust. Light gray text on white backgrounds is the most common violation and the easiest to fix. WCAG AA compliance is the floor, not the ceiling.",
    antiExample:
      "Body text set in #999 on a #fff background (2.8:1 ratio). Looks 'clean' in the design tool but is unreadable on a phone in sunlight.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["tap-targets-44px", "mobile-primary"],
  },
  {
    slug: "no-autoplay-no-parallax",
    rule: "No auto-playing video or parallax effects; they look like ads",
    category: "composition",
    rationale:
      "Auto-play videos cause cognitive overload and immediate bouncing. Parallax and decorative animation trigger banner blindness because users have learned to associate movement with advertising. When you use motion, make it purposeful and user-controllable.",
    antiExample:
      "A homepage with an auto-playing background video, three parallax scroll sections, and an animated logo. The visitor's brain ignores all of it.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["no-sliders-or-carousels", "page-speed-is-design"],
  },
  {
    slug: "three-click-depth",
    rule: "Every important page reachable within 3 clicks from the homepage",
    category: "composition",
    rationale:
      "Users expect to reach any important page quickly. Deep hierarchies cause abandonment. Small business sites rarely need more than two levels of navigation. If you have many pages, use clear categories or search instead of burying content under nested menus.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["nav-five-to-seven-items", "two-clicks-to-cta"],
  },
  {
    slug: "no-social-in-header",
    rule: "Social media icons in the footer, never the header; they're exit signs",
    category: "cta-flow",
    rationale:
      "Social links in the header are candy-colored exit signs. You spent money and effort getting someone to your site, and then gave them 4 reasons to leave in the first second. Only 13% of B2B sites still put social icons in the header, down 50% in five years. Move them to the footer.",
    antiExample:
      "A homepage header with Facebook, Instagram, TikTok, and YouTube icons right next to the nav. The visitor clicks Instagram and never comes back.",
    appliesTo: ["thorn-and-thimble", "the-nail-suite"],
    appearsIn: [],
    relatedSlugs: ["cta-above-fold", "two-clicks-to-cta"],
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
