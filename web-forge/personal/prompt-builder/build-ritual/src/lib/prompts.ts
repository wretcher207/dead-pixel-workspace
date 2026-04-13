/*
 * Prompt content for the Output Studio.
 *
 * Every prompt here is structured around the KERNEL framework
 * (Keep simple / Easy to verify / Reproducible / Narrow scope /
 * Explicit constraints / Logical structure) drawn from the
 * prompt-engineering canon in the-brain:
 *
 *   - article-prompt-engineering-collection
 *   - article-context-engineering-anthropic
 *   - Anthropic's Prompt Engineering Interactive Tutorial (01–10)
 *
 * Structural pattern per prompt:
 *   CONTEXT  →  TASK  →  CONSTRAINTS  →  FORMAT
 *
 * This is the knowledge-base spine. Surface-level language adapts
 * per project; the underlying discipline is the same every time.
 */

export type PromptSection = {
  label: string; // LAYER 01: GLOBAL ENTRY
  body: string; // prose or bulleted reasoning
};

export type PromptDoc = {
  moduleLabel: string; // "MODULE 01 // STRUCTURAL BLUEPRINT"
  title: string; // "Site Architecture & Navigation"
  description: string;
  sections: PromptSection[];
};

export type OutputTabKey = "build" | "research" | "visuals" | "refine";

export type OutputBundle = Record<OutputTabKey, PromptDoc>;

// ────────────────────────────────────────────────────────────────
// THORN AND THIMBLE — Libby's body piercing studio, Bangor ME
// ────────────────────────────────────────────────────────────────
export const thornAndThimble: OutputBundle = {
  build: {
    moduleLabel: "Module 01 // Structural Blueprint",
    title: "Site Architecture & Navigation",
    description:
      "Establishing the foundational hierarchy for the Thorn and Thimble digital presence. This output defines the user journey from entry to final engagement.",
    sections: [
      {
        label: "Prompt Specification",
        body: "Construct a multi-layered navigation system that reflects the artisanal nature of the studio. The primary interaction should feel deliberate and rhythmic. Reject generic service-page hierarchy. Every click should reward the visitor with material detail, not marketing copy.",
      },
      {
        label: "Homepage",
        body: "Implement a high-contrast landing experience using a 3-column asymmetric grid. Focus on Bangor-specific context through a dedicated Origin sub-header. Primary CTA: Book Consultation. Secondary CTA: Read Before Your Appointment.",
      },
      {
        label: "Content Flow",
        body: "Utilize a staggered reveal for the studio portfolio. Each entry should be preceded by a metadata summary in Manrope, followed by a large-scale visual anchor in Newsreader. No hover-lift card tricks.",
      },
      {
        label: "Depth & Portfolio",
        body: "A hidden archival section accessible only via a restrained footer link, showcasing process sketches and raw material studies in a minimalist list format. This is the invitation to go deeper; do not surface it on the main nav.",
      },
      {
        label: "Trust & Credibility",
        body: "Aftercare, sterilization practice, and jewelry sourcing live as first-class pages, not footer links. Libby's voice leads. No industry-standard safety boilerplate.",
      },
      {
        label: "Constraints",
        body: "• Mobile-first layout (but desktop is the star) • No excessive animation • No stock imagery • Use provided showcase photography before generated imagery • SEO must support Bangor + Central Maine queries • Preserve premium restraint • Do not use the word 'trauma-informed' as marketing copy",
      },
      {
        label: "Output Format",
        body: "Return a sitemap tree, a per-page section outline, and a 200-word voice & tone statement. No generic examples. Cite Libby's own language from the brief wherever possible.",
      },
    ],
  },
  research: {
    moduleLabel: "Module 02 // Field Research",
    title: "Customer Intent & Competitive Landscape",
    description:
      "A Claude Cowork-style deep scan of the Bangor body-modification market. Treat this as first-pass discovery, not final truth.",
    sections: [
      {
        label: "Research Goal",
        body: "Determine what a serious-minded Bangor/Central Maine client actually looks for when choosing a body piercer, and where Thorn and Thimble can honestly outclass local competitors without overpromising.",
      },
      {
        label: "Business Verification",
        body: "Confirm studio address, operating hours, APP membership status (if any), and jewelry supplier relationships. Cross-check Libby's stated training history against publicly available records.",
      },
      {
        label: "Customer Intent",
        body: "Identify the top 20 search queries in-market. Separate transactional (book now) from investigational (is this safe, what do I need to know). Note which are currently unanswered by any local studio.",
      },
      {
        label: "Competitor Scan",
        body: "List every active piercer within 45 miles. For each: CTA strategy, aftercare content depth, photography quality, tone (clinical / edgy / artisan), and their single biggest weakness.",
      },
      {
        label: "Digital Weaknesses",
        body: "Where are competitors thin: consent content, jewelry sourcing transparency, booking friction, mobile performance? These become our moats.",
      },
      {
        label: "Website Opportunities",
        body: "Translate the above into ranked site opportunities. Each opportunity gets a one-line thesis, a content approach, and a rough effort estimate (S / M / L).",
      },
      {
        label: "Deliverable Format",
        body: "Markdown report. Sections in the order above. Under each, findings as bullets with source URLs inline. No executive summary. No recommendations section — rank the opportunities instead.",
      },
    ],
  },
  visuals: {
    moduleLabel: "Module 03 // Visual Identity System",
    title: "Atmosphere, Palette, and Moving Image",
    description:
      "A visual system dossier, not a moodboard. Every direction here must be producible with the assets Libby already has, or cheaply generated in Seedance / Kling.",
    sections: [
      {
        label: "Hero Image Prompt",
        body: "Close, low-key portrait of a piercer's hands preparing sterilized jewelry on a matte steel tray. Soft directional daylight from left. Shallow depth of field. Matte color grade, desaturated warmth. No faces. No rings. No stock-photo blur.",
      },
      {
        label: "Hero Loop Prompt (Seedance)",
        body: "12-second loop of light shifting across the same tray as the day progresses. Minimal motion. No camera pan. Grain texture. Ambient occlusion dominant. End frame matches start frame for seamless loop.",
      },
      {
        label: "Section Background Prompts",
        body: "Textile close-ups (the 'Thimble' half of the name): raw linen weave, cotton thread under magnification, unbleached canvas. Each at 2:1 ratio. All graded to match the hero's desaturated warmth.",
      },
      {
        label: "Composition Rules",
        body: "Asymmetric. Left-heavy headlines, right-aligned metadata. Oversized serif, small caps Manrope labels. Never center-align body copy. Never put imagery inside a rounded container.",
      },
      {
        label: "Palette Chips",
        body: "Studio Graphite #171614 • Unbleached Linen #e7e2d8 • Sterilized Steel #9a9591 • Ember (accent, used once per page max) #6b2e1c.",
      },
      {
        label: "Type Pairing",
        body: "Display: Newsreader (italic for pull-quotes). Utility: Manrope. No third typeface. Long-form studio writing gets a 16px body, 1.7 line-height, and drop cap.",
      },
      {
        label: "Texture Direction",
        body: "Subtle film grain (3% opacity). No vignettes. No gradients as decoration. One atmospheric gradient only, reserved for primary CTAs.",
      },
    ],
  },
  refine: {
    moduleLabel: "Module 04 // Refinement Pass",
    title: "Post-Build Tightening and Voice Audit",
    description:
      "Corrective prompts to apply after the first build is assembled. Each card here is a discrete pass, not a batch request.",
    sections: [
      {
        label: "Mobile Polish",
        body: "Audit every page on a 390×844 viewport. Flag anything that breaks the left-heavy asymmetry or collapses the metadata-over-title hierarchy. No horizontal scroll. Tap targets ≥ 44px. Hero loop autoplays muted or fails gracefully.",
      },
      {
        label: "Copy Humanization",
        body: "Read every sentence aloud. Any phrase that sounds like a service-page template gets rewritten in Libby's voice from the client notes. Remove every instance of 'we', 'solutions', 'unlock', and 'seamless'. Em dashes stay only where Libby uses them.",
      },
      {
        label: "Hierarchy Cleanup",
        body: "Verify that every page has exactly one h1, one editorial label above it, and no competing serif italics in the same viewport. Kill redundant section labels.",
      },
      {
        label: "Stronger CTA Flow",
        body: "Trace the path from any page to 'Book Consultation'. Maximum two clicks. Remove any intermediate CTA that doesn't serve that journey.",
      },
      {
        label: "Stronger Local SEO",
        body: "Title tags include Bangor or Central Maine where natural — never keyword-stuffed. FAQ page answers the real Bangor-specific questions, not generic piercing FAQs. Schema.org LocalBusiness + Service types wired correctly.",
      },
      {
        label: "Less Generic Language",
        body: "Search for cliché phrases (unlock, elevate, transform, seamless, cutting-edge, journey, experience). Delete or rewrite each hit.",
      },
      {
        label: "More Asset-Driven Design",
        body: "If a page has generated imagery where Libby's own photos exist, swap. Generated imagery only fills genuine gaps. Document which is which.",
      },
    ],
  },
};

// ────────────────────────────────────────────────────────────────
// THE NAIL SUITE — Larissa Bell's 2-chair boutique, Dexter ME
// ────────────────────────────────────────────────────────────────
export const theNailSuite: OutputBundle = {
  build: {
    moduleLabel: "Module 01 // Structural Blueprint",
    title: "Site Architecture & Booking Flow",
    description:
      "A two-chair boutique in a town of three thousand. The site has to do two jobs: hold the phone-booking-dominant older clientele, and pull in the twenty-somethings who book everything through Instagram.",
    sections: [
      {
        label: "Prompt Specification",
        body: "Build a single-page dominant layout with a secondary Services route for depth. Hero is the interior itself — Seedance loop of the space at golden hour, nobody in frame. Booking must be reachable from anywhere on the page in one tap. Phone number must be a tap-to-call link, not a display element.",
      },
      {
        label: "Homepage",
        body: "Full-bleed interior hero loop, muted autoplay. Over it: 'The Nail Suite — Dexter, Maine' in Newsreader, and a single CTA: 'Reserve a Chair'. No nav clutter. Instagram feed preview lives below the fold, not above.",
      },
      {
        label: "Services",
        body: "Four categories: Manicure / Pedicure / Enhancement / Gel-X. Each with a starting-at price, a 2-photo micro-gallery of Larissa's actual work, and a chair-specific availability note ('Chair One — Larissa' / 'Chair Two — Available').",
      },
      {
        label: "About the Owner",
        body: "Single scrolling section: Larissa's own words about why she opened the studio in Dexter specifically. Portrait + hand detail. No 'meet the team' header. Speak like the person in the room, not the business behind them.",
      },
      {
        label: "Booking",
        body: "Embedded Vagaro or Square booking. If the embed feels clinical against the rest of the site, wrap it in a dedicated dark frame and add a '— or call/text 207-xxx-xxxx' fallback immediately beneath.",
      },
      {
        label: "Constraints",
        body: "• Dexter-first SEO (Penobscot County radius) • No stock imagery, ever — Larissa's own phone photos beat any AI generation • Warm palette only (rose-taupe and burnished bronze); reject cool tones and pastels • Mobile is primary, desktop is the bonus • No 'luxury' language; Larissa hates it",
      },
      {
        label: "Output Format",
        body: "Sitemap (two pages max), per-section block spec, copy block drafts for hero + services + about. Leave booking text to Larissa — suggest three framings but don't commit.",
      },
    ],
  },
  research: {
    moduleLabel: "Module 02 // Field Research",
    title: "Central Maine Nail Studio Landscape",
    description:
      "Small-town nail business research. Don't pretend this is a major market — it isn't. Focus on what actually drives bookings here.",
    sections: [
      {
        label: "Research Goal",
        body: "Figure out where Dexter-adjacent clients currently book nails (Bangor drive? local only? in-home operators?), what they'd pay for a second-chair boutique, and what Instagram content actually converts to a phone call in this region.",
      },
      {
        label: "Business Verification",
        body: "Confirm Larissa's license, years practicing, existing client base count (she said ~60 regulars). Cross-reference with Dexter town registry and any review footprint on Google / Facebook / Vagaro.",
      },
      {
        label: "Customer Intent",
        body: "In a town this size, search volume is near-zero. Real intent shows up as: Instagram tag activity, local Facebook group mentions, word-of-mouth patterns. Scrape the last 90 days of #dexterme and adjacent tags.",
      },
      {
        label: "Competitor Scan",
        body: "Closest real studios: two in Bangor (30-min drive), one in Newport (15-min), plus a handful of in-home operators. For each: price range, booking channel, IG aesthetic, and one honest weakness.",
      },
      {
        label: "Digital Weaknesses",
        body: "Most regional competitors have either no website or a free Wix page. That's not a moat — that's the baseline. The real opening is: an actually-usable booking experience on mobile, and service photography that shows Larissa's work style (soft ombré, rose-taupe palette).",
      },
      {
        label: "Website Opportunities",
        body: "Ranked thin slice: (1) Mobile-first booking that beats the Square/Vagaro default (2) Category-specific micro-galleries of Larissa's actual work (3) A 'What to expect' page for first-timers nervous about boutique pricing (4) IG-first content pipeline, not a brochure site.",
      },
      {
        label: "Deliverable Format",
        body: "Markdown report. Findings with evidence screenshots. No persona paragraphs — just observations and what to do with them.",
      },
    ],
  },
  visuals: {
    moduleLabel: "Module 03 // Visual Identity System",
    title: "Warm Boutique, Interior-Led",
    description:
      "The studio interior IS the brand. Everything visual derives from Larissa's actual chair, lamp, light, and hand position. Generated imagery only fills specific gaps.",
    sections: [
      {
        label: "Hero Loop (Seedance)",
        body: "14-second loop of the empty studio at late-afternoon sun. Light shifts slowly across the manicure station. Chair upholstery is rose-taupe. Lamp is warm incandescent, 2700K. No people. End frame matches start frame.",
      },
      {
        label: "Service Thumbnails",
        body: "2 photos per service category, drawn from Larissa's Instagram. Color-grade all to a single warm profile: lift shadows, slight desaturation in greens, emphasize the bronze-rose-taupe triangle.",
      },
      {
        label: "Section Background Prompts",
        body: "Interior textures: chair fabric close-up, lamp reflection on chrome, dried flowers on the service table. Each 3:2, warm-graded to match the hero loop.",
      },
      {
        label: "Palette Chips",
        body: "Chair Taupe #b29b8e • Lamp Warm #e8c499 • Burnished Bronze (accent) #8a5a3a • Studio Shadow #2a211f • Ivory Copy #f5ede3.",
      },
      {
        label: "Type Pairing",
        body: "Display: Newsreader (regular and italic). Utility: Manrope. The 'Suite' in 'Nail Suite' can italic on the hero headline — that one typographic moment is the brand signature.",
      },
      {
        label: "Composition Rules",
        body: "Center-dominant for hero moments (the interior is the star, frame it head-on). Left-aligned for body content. Never use mobile-breakpoint stack ordering that pushes service imagery below a wall of text — image first, copy second, always.",
      },
      {
        label: "Texture Direction",
        body: "Subtle warm film grain, 2.5% opacity. No vignette. No gradients as decoration. Use the atmospheric gradient only on the primary CTA and the progress bar.",
      },
    ],
  },
  refine: {
    moduleLabel: "Module 04 // Refinement Pass",
    title: "Small-Town Polish and Voice Audit",
    description:
      "Corrective passes specific to a two-chair boutique in a small town. Think quieter and more specific, not bigger.",
    sections: [
      {
        label: "Mobile Polish",
        body: "390×844 audit. Tap-to-call on the phone number works everywhere. Booking iframe doesn't force horizontal scroll. Hero loop autoplays muted on iOS (test on a real iPhone, not a simulator).",
      },
      {
        label: "Copy Humanization",
        body: "Any phrase that sounds like a Squarespace template gets cut. Larissa's voice is warm-matter-of-fact. 'Treat yourself' is banned. So is 'experience' as a noun. She says 'come sit down' — use that energy.",
      },
      {
        label: "Local Specificity",
        body: "Every page mentions Dexter or Central Maine at least once, naturally. The word 'boutique' appears once total, in the hero. Nowhere else.",
      },
      {
        label: "Stronger CTA Flow",
        body: "From any page, 'Reserve a Chair' is one tap away. The phone number is one tap away. Instagram is one tap away. Nothing else competes for attention in the lower viewport.",
      },
      {
        label: "Service Photography Audit",
        body: "Every service category shows real work from Larissa's IG, not generated imagery. If a category lacks photos, the fallback is a text description in italic Newsreader — not a stock photo.",
      },
      {
        label: "Less Generic Language",
        body: "Suppress: luxe, pamper, indulge, elevate, treat-yourself, me-time, self-care-journey. Replace each with something Larissa would actually say.",
      },
      {
        label: "Booking Surface Test",
        body: "Time yourself from first-visit-on-mobile to completed-booking. If that flow is longer than 45 seconds, something upstream needs tightening.",
      },
    ],
  },
};

// ────────────────────────────────────────────────────────────────
// REGISTRY
// ────────────────────────────────────────────────────────────────
export const bundles: Record<string, OutputBundle> = {
  "thorn-and-thimble": thornAndThimble,
  "the-nail-suite": theNailSuite,
};
