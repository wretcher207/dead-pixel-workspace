"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TopMetaBar } from "@/components/app-shell/TopMetaBar";
import { DraftProjectState } from "@/components/app-shell/DraftProjectState";
import { TeachingNote } from "@/components/teaching/TeachingNote";
import { Button } from "@/components/ui/Buttons";
import { Chip } from "@/components/ui/Chip";
import { getContext, resolveSlug } from "@/lib/project-context";
import { getProject } from "@/lib/projects";

// Field definitions carry not just a label but real guidance —
// a helper line that sets expectations, a realistic placeholder,
// and (for tone/vibe fields) a bank of starter chips.
type FieldDef = {
  name: string;
  helper: string;
  placeholder: string;
  kind?: "text" | "textarea" | "chips";
  suggestedChips?: string[];
  defaultValue?: string;
};

type SectionDef = {
  id: string;
  label: string;
  title: string;
  intro: string;
  fields: FieldDef[];
};

const sections: SectionDef[] = [
  {
    id: "business-reality",
    label: "Section 01",
    title: "Business Reality",
    intro:
      "What the business actually is. Plain facts first — nothing about tone or positioning yet.",
    fields: [
      {
        name: "Business name",
        helper: "The name on the sign, not the LLC name.",
        placeholder: "Thorn and Thimble",
        defaultValue: "Thorn and Thimble",
      },
      {
        name: "Business type",
        helper: "Describe it the way a friend would.",
        placeholder: "Body piercing studio",
        defaultValue: "Body piercing studio",
      },
      {
        name: "Location",
        helper: "City, state. If mobile, say so.",
        placeholder: "Bangor, Maine",
        defaultValue: "Bangor, Maine",
      },
      {
        name: "Service area",
        helper: "Who actually drives to them?",
        placeholder: "Greater Bangor + Central Maine",
      },
      {
        name: "Years in business",
        helper: "New is fine. Don't pad.",
        placeholder: "4",
      },
      {
        name: "Operating status",
        helper: "Open, seasonal, booked out, new location, etc.",
        placeholder: "Open by appointment",
      },
      {
        name: "Brief summary",
        helper:
          "Two or three sentences, in the owner's voice if you have it. Not marketing copy.",
        placeholder:
          "Solo studio run by Libby. Piercing only — no tattoos. Quiet, careful, anatomy-first.",
        kind: "textarea",
      },
    ],
  },
  {
    id: "audience",
    label: "Section 02",
    title: "Audience & Conversion",
    intro:
      "Who this site is for and what you want them to do. The clearer this is, the sharper the prompts.",
    fields: [
      {
        name: "Ideal customer",
        helper: "A specific person, not a demographic.",
        placeholder:
          "Adult first-timer researching their first meaningful piercing",
        kind: "textarea",
      },
      {
        name: "Customer pain points",
        helper: "What scares them, what confuses them, what turns them off.",
        placeholder:
          "Edgy studio vibes, vague sterilization info, surprise jewelry upsells",
        kind: "textarea",
      },
      {
        name: "Positioning",
        helper: "Premium, mid, budget. One word.",
        placeholder: "Premium",
      },
      {
        name: "Primary CTA",
        helper: "The one action you want every visitor to take.",
        placeholder: "Book Consultation",
      },
      {
        name: "Secondary CTAs",
        helper: "Fallback actions for visitors who aren't ready yet.",
        placeholder: "Read Before Your Appointment · Browse Jewelry",
      },
      {
        name: "Trust concerns",
        helper: "What they'll Google after leaving the site.",
        placeholder: "Is she APP certified? Where does the jewelry come from?",
      },
      {
        name: "Desired emotional effect",
        helper:
          "How a visitor should feel after 30 seconds on the homepage — in plain words.",
        placeholder: "Calm. Like the person who runs this place actually cares.",
        kind: "textarea",
      },
    ],
  },
  {
    id: "brand",
    label: "Section 03",
    title: "Brand Atmosphere",
    intro:
      "The feel of the site. Keep it to what you'd actually say out loud — skip the mood-board adjectives.",
    fields: [
      {
        name: "Tone keywords",
        helper: "Pick three to five. Click a suggestion or type your own.",
        placeholder: "Add a tone…",
        kind: "chips",
        suggestedChips: [
          "Monastic",
          "Deliberate",
          "Archival",
          "Warm",
          "Editorial",
          "Dark Luxury",
          "Localized",
          "Refined Precision",
          "Asset-First",
        ],
      },
      {
        name: "Vibe adjectives",
        helper:
          "Three or four words that describe the space, not the service.",
        placeholder: "quiet · tactile · studio-lit",
      },
      {
        name: "Visual references",
        helper:
          "Links, studio names, or films. If you've seen something that gets it right, drop it here.",
        placeholder:
          "The way Aesop stores feel in person. Early Kinfolk layouts.",
        kind: "textarea",
      },
      {
        name: "Things to avoid",
        helper: "Be specific. General 'don't make it tacky' doesn't help.",
        placeholder:
          "No neon, no distressed grunge textures, no 'alternative' clip art",
        kind: "textarea",
      },
      {
        name: "Cliché suppressors",
        helper: "Words and phrases that should never appear on this site.",
        placeholder: "unlock · elevate · seamless · journey · transformative",
        kind: "chips",
        suggestedChips: [
          "unlock",
          "elevate",
          "seamless",
          "journey",
          "cutting-edge",
          "game-changer",
          "synergy",
        ],
      },
    ],
  },
  {
    id: "site-shape",
    label: "Section 04",
    title: "Site Shape",
    intro: "What pages exist, what they hold, what the site has to do.",
    fields: [
      {
        name: "One-page or multi-page",
        helper: "Most small businesses are fine on 3–5 pages.",
        placeholder: "Multi-page",
      },
      {
        name: "Page list",
        helper: "Name them. Don't count the footer.",
        placeholder: "Home · About · Aftercare · Jewelry · Book",
      },
      {
        name: "Booking needs",
        helper:
          "Embedded form, link out to Square/Vagaro, phone only, something custom?",
        placeholder: "Square Appointments embed on /book",
      },
      {
        name: "AI feature ideas",
        helper: "Optional. Skip if you're not sure.",
        placeholder: "Aftercare Q&A chatbot trained on Libby's own guidance",
      },
      {
        name: "Payment intent",
        helper: "Do they take deposits, sell jewelry, or just book?",
        placeholder: "Deposits at booking. No ecomm yet.",
      },
      {
        name: "Local SEO importance",
        helper: "High, medium, low. Everything else falls out of this.",
        placeholder: "High — they want Bangor-first traffic",
      },
    ],
  },
  {
    id: "assets",
    label: "Section 05",
    title: "Asset Inventory",
    intro:
      "What you have on hand. Be honest about gaps — those get flagged in the DNA review.",
    fields: [
      {
        name: "Logo",
        helper: "Vector preferred. PNG works. No logo is fine too — just say so.",
        placeholder: "Vector on file",
      },
      {
        name: "Gallery / showcase photos",
        helper: "Count them roughly. Quality matters more than quantity.",
        placeholder: "12 studio photos, shot on Fuji by owner",
      },
      {
        name: "Testimonials",
        helper: "Written or screenshotted. How many are actually usable?",
        placeholder: "3 usable blocks with permission",
      },
      {
        name: "Owner / about section",
        helper: "Is there real copy to work from, or does it need writing?",
        placeholder: "Rough draft exists, needs Libby voice pass",
      },
      {
        name: "Service list",
        helper: "Core services with pricing, if appropriate.",
        placeholder: "8 piercing types, starting at $60",
      },
      {
        name: "Hours",
        helper: "Fixed hours or by appointment.",
        placeholder: "By appointment, Wed–Sun",
      },
      {
        name: "Pricing",
        helper: "Shown on site or quoted privately?",
        placeholder: "Starting-at pricing on site, jewelry quoted",
      },
      {
        name: "Video assets",
        helper: "Seedance-generated counts too. Note what's generated vs. real.",
        placeholder: "None yet — Seedance hero loop planned",
      },
    ],
  },
  {
    id: "tech",
    label: "Section 06",
    title: "Technical Priorities",
    intro:
      "How the site should behave, not look. Defaults are sensible — change what actually matters.",
    fields: [
      {
        name: "Mobile-first",
        helper: "Almost always yes. Say no only if you really mean it.",
        placeholder: "Yes",
      },
      {
        name: "Performance priority",
        helper: "High = image-heavy sites. Standard = most everything else.",
        placeholder: "High",
      },
      {
        name: "Accessibility priority",
        helper: "WCAG AA is the floor, not the ceiling.",
        placeholder: "AA minimum, AAA where reasonable",
      },
      {
        name: "Animation level",
        helper: "Minimal, moderate, expressive. More is rarely better.",
        placeholder: "Minimal",
      },
      {
        name: "Asset-first design",
        helper: "Let the owner's photos/video drive layout, or design first?",
        placeholder: "Asset-first",
      },
      {
        name: "Framework preference",
        helper: "Next.js, plain HTML, SvelteKit, Astro. No opinion is fine.",
        placeholder: "Next.js",
      },
      {
        name: "Strict SEO",
        helper:
          "Yes for anything that depends on local search. No for internal tools.",
        placeholder: "Yes",
      },
    ],
  },
];

// Teaching notes — expanded rationale shown when Teaching Mode is on.
// Keyed by section ID. Each explains _why_ this section exists as a
// web-design concern, not just what to fill in.
const teachingNotes: Record<string, string> = {
  "business-reality":
    "Business Reality isn't admin data. It's the raw material for every copy decision the site makes. The difference between 'body piercing studio' and 'APP-certified piercer working solo by appointment' changes the entire site's tone, CTA language, and trust strategy. Get this wrong and every downstream prompt hallucinates.",
  audience:
    "Most small business sites talk about themselves. The best ones talk to the visitor's anxiety. When you name the exact pain point ('surprise jewelry upsells,' 'vague sterilization info'), the site copy can address it directly instead of hoping generic reassurance works.",
  brand:
    "Tone isn't decoration. It's the filter that catches bad copy before it ships. If you define 'monastic, deliberate, archival' here, then a headline like 'Unlock Your Piercing Journey!' gets caught immediately. The cliche suppressor list is the most underrated field in the whole brief.",
  "site-shape":
    "Page count is a design decision, not an inventory exercise. A 3-page site with one clear path converts better than a 12-page site where visitors get lost. The page list you define here becomes the sitemap in the Build prompt and the navigation structure the developer implements.",
  assets:
    "The gap between 'what they have' and 'what the site needs' is where most projects stall. Being honest here means the DNA review can flag gaps before anyone starts building. A site designed around missing assets will always feel hollow.",
  tech:
    "These defaults rarely need changing, but when they do, it matters. Setting 'mobile-first' here means the Build prompt specifies a mobile-first CSS strategy. Setting 'asset-first design' means the Visual prompt arranges layout around existing photography instead of placeholder grids.",
};

const outputOptions = [
  {
    name: "Build Prompt",
    sub: "Site architecture + page-by-page spec",
    defaultOn: true,
  },
  {
    name: "Research Prompt",
    sub: "Competitor scan + opportunity ranking",
    defaultOn: true,
  },
  {
    name: "Visual Prompt Pack",
    sub: "Hero, section bg, palette, type, texture",
    defaultOn: true,
  },
  {
    name: "Refinement Prompt Pack",
    sub: "Post-build audit checklist",
    defaultOn: true,
  },
  { name: "SEO Prompt Pack", sub: "Metadata, schema, local-SEO", defaultOn: false },
  {
    name: "Pitch Prompt Pack",
    sub: "Outreach copy in your voice",
    defaultOn: false,
  },
  {
    name: "Content Request Prompt Pack",
    sub: "What to ask the client for",
    defaultOn: false,
  },
];

export default function BuilderPage() {
  // useSearchParams requires a Suspense boundary inside a client page
  // for static rendering. Wrap the real page body and render a neutral
  // fallback while the URL params resolve.
  return (
    <Suspense fallback={<BuilderPageFallback />}>
      <BuilderPageBody />
    </Suspense>
  );
}

function BuilderPageFallback() {
  return (
    <>
      <TopMetaBar environment="Brief" title="Loading" />
      <div className="flex-1 px-12 py-20 warm-wash" />
    </>
  );
}

function BuilderPageBody() {
  const params = useSearchParams();
  const slug = resolveSlug(params.get("project") ?? undefined);
  const ctx = getContext(slug);
  const project = getProject(slug);

  const [activeSection, setActiveSection] = useState(sections[0].id);

  // If the project exists but hasn't been fleshed out with full context,
  // show the draft-state CTA rather than an empty form with wrong chrome.
  const completed = ctx?.builderProgress.completed ?? 0;

  // Scrollspy — mark the section currently in view as active.
  useEffect(() => {
    if (!ctx) return;
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ctx]);

  // Project exists but hasn't been briefed yet → show draft CTA.
  if (project && !ctx) {
    return (
      <>
        <TopMetaBar
          environment="Brief"
          title={project.name}
          meta={[
            { label: project.projectType, value: project.location },
            { label: "Status", value: project.status },
          ]}
        />
        <DraftProjectState project={project} stage="builder" />
      </>
    );
  }

  if (!ctx) {
    return (
      <div className="flex-1 flex items-center justify-center px-12 py-20 text-center">
        <div className="space-y-5 max-w-lg">
          <p className="editorial-label">Not Found</p>
          <h3 className="font-headline text-3xl text-on-surface leading-tight">
            That project isn&rsquo;t in your archive.
          </h3>
          <Link
            href="/projects"
            className="inline-block mt-4 text-tertiary underline underline-offset-4"
          >
            Open the Projects archive
          </Link>
        </div>
      </div>
    );
  }

  const total = ctx.builderProgress.total;
  const pct = Math.round((completed / total) * 100);
  const query = `?project=${ctx.slug}`;
  const useDefaults = ctx.slug === "thorn-and-thimble";

  return (
    <>
      <TopMetaBar
        environment={ctx.environment === "Project" ? "Brief" : ctx.environment}
        title={ctx.name}
        meta={ctx.topbarMeta}
      />

      {/* Progress strip — one quiet line across the top of the workspace */}
      <div className="px-12 pt-8">
        <div className="flex items-center gap-6">
          <p className="font-label text-[10px] uppercase tracking-[0.28em] text-on-surface-variant shrink-0">
            Brief · {completed} of {total} sections
          </p>
          <div className="flex-1 h-[2px] bg-surface-container-high overflow-hidden rounded-full">
            <div
              className="h-full atmospheric-gradient transition-[width] duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.28em] text-on-surface-variant shrink-0">
            {pct}%
          </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* ─── Section Scrollspy (left of content) ─── */}
        <aside className="hidden xl:flex flex-col w-56 shrink-0 px-8 py-10 sticky top-20 self-start">
          <p className="editorial-label mb-5">On this page</p>
          <ol className="space-y-3">
            {sections.map((s, i) => {
              const isActive = activeSection === s.id;
              const isDone = i < completed;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={[
                      "group flex items-start gap-3 font-body text-[13px] leading-snug transition-colors duration-300",
                      isActive
                        ? "text-on-surface"
                        : "text-on-surface-variant hover:text-on-surface",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "mt-1.5 h-1.5 w-1.5 shrink-0 transition-colors duration-300",
                        isActive
                          ? "bg-tertiary"
                          : isDone
                          ? "bg-on-surface-variant"
                          : "bg-outline-variant/40",
                      ].join(" ")}
                      aria-hidden
                    />
                    <span className="flex flex-col leading-tight">
                      <span className="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant">
                        {s.label}
                      </span>
                      <span className="mt-1">{s.title}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* ─── Central Workspace ─── */}
        <section className="flex-1 px-12 py-10 space-y-16 overflow-y-auto warm-wash">
          <header className="space-y-3 max-w-[58ch]">
            <p className="editorial-label">Workspace · Project Brief</p>
            <h3 className="font-headline text-[44px] leading-[1.02] tracking-tight text-on-surface">
              Ritual Builder
            </h3>
            <p className="font-body text-[15px] leading-[1.7] text-on-surface-variant">
              Fill this in the order that makes sense to you. Skip what you
              don&rsquo;t know yet &mdash; gaps get flagged in the DNA review
              before any prompts are generated. Your answers save as you go.
            </p>
          </header>

          {sections.map((s) => (
            <FormSection key={s.id} section={s} useDefaults={useDefaults} />
          ))}

          {/* Output Selection — checkbox cards with sublines */}
          <section id="output-selection" className="space-y-6 pt-4 scroll-mt-24">
            <div className="space-y-2">
              <p className="editorial-label">Section 07</p>
              <h4 className="font-headline text-[26px] text-on-surface tracking-tight">
                Output Selection
              </h4>
              <p className="font-body text-[14px] leading-[1.7] text-on-surface-variant max-w-[54ch]">
                Pick which prompt packs to generate. You can come back and add
                more later &mdash; nothing here is one-shot.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {outputOptions.map((o) => (
                <label
                  key={o.name}
                  className="group flex items-start gap-4 bg-surface-container-low/60 hover:bg-surface-container-low px-5 py-4 rounded-sm cursor-pointer transition-colors duration-300 ghost-border"
                >
                  <input
                    type="checkbox"
                    className="mt-1 h-3.5 w-3.5 shrink-0 appearance-none border border-outline-variant checked:bg-tertiary checked:border-tertiary cursor-pointer"
                    defaultChecked={o.defaultOn}
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">
                      {o.name}
                    </span>
                    <span className="font-body text-[12.5px] text-on-surface-variant mt-1.5">
                      {o.sub}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="ghost">Save Draft</Button>
            <Link href={`/dna${query}`}>
              <Button variant="secondary">Review DNA</Button>
            </Link>
            <Link href={`/output${query}`}>
              <Button variant="primary">Generate Outputs</Button>
            </Link>
          </div>
        </section>

        {/* ─── Live Summary Rail ─── */}
        <aside className="hidden lg:flex w-80 shrink-0 flex-col border-l border-outline-variant/15 bg-surface-container-low/50 px-8 py-10 space-y-10 overflow-y-auto">
          <div>
            <p className="editorial-label mb-3">Live Snapshot</p>
            <p className="helper-text mb-4">
              This updates as you fill things in. It&rsquo;s what the AI will see.
            </p>
          </div>

          <RailBlock title="Project">
            <p className="font-body text-[13px] leading-[1.7] text-on-surface">
              {ctx.railSnapshot}
            </p>
            <p className="helper-text mt-2">{ctx.railSnapshotHelper}</p>
          </RailBlock>

          <RailBlock title="Tone so far">
            <div className="flex flex-wrap gap-2">
              {ctx.brandTone.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </RailBlock>

          <RailBlock title="Primary CTA">
            <p className="font-headline italic text-lg text-on-surface">
              {ctx.railCta}
            </p>
          </RailBlock>

          <RailBlock title="Assets you have">
            <ul className="space-y-1.5 font-body text-[12.5px] text-on-surface leading-[1.6]">
              {ctx.railAssets.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </RailBlock>

          <RailBlock title="Gaps to flag">
            <ul className="space-y-1.5 font-body text-[12.5px] text-on-surface-variant leading-[1.6]">
              {ctx.railGaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </RailBlock>

          <RailBlock title="Constraints noted">
            <ul className="space-y-1.5 font-body text-[12.5px] text-on-surface-variant leading-[1.6]">
              {ctx.railConstraints.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </RailBlock>
        </aside>
      </div>
    </>
  );
}

function FormSection({
  section,
  useDefaults,
}: {
  section: SectionDef;
  useDefaults: boolean;
}) {
  const note = teachingNotes[section.id];
  return (
    <section id={section.id} className="space-y-7 scroll-mt-24">
      <div className="space-y-2 max-w-[58ch]">
        <p className="editorial-label">{section.label}</p>
        <h4 className="font-headline text-[28px] text-on-surface tracking-tight leading-tight">
          {section.title}
        </h4>
        <p className="font-body text-[14px] leading-[1.7] text-on-surface-variant">
          {section.intro}
        </p>
        {note && <TeachingNote>{note}</TeachingNote>}
      </div>

      <div className="atmospheric-line" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
        {section.fields.map((f) => (
          <Field key={f.name} field={f} useDefaults={useDefaults} />
        ))}
      </div>
    </section>
  );
}

function Field({
  field,
  useDefaults,
}: {
  field: FieldDef;
  useDefaults: boolean;
}) {
  const [chips, setChips] = useState<string[]>(
    field.kind === "chips" ? (field.suggestedChips?.slice(0, 3) ?? []) : []
  );

  if (field.kind === "chips") {
    const available =
      field.suggestedChips?.filter((c) => !chips.includes(c)) ?? [];
    return (
      <label className="flex flex-col gap-2">
        <span className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">
          {field.name}
        </span>
        <span className="helper-text">{field.helper}</span>
        <div className="mt-2 min-h-[44px] flex flex-wrap items-center gap-2 bg-surface-container-low/50 px-3 py-2.5 rounded-sm ghost-border">
          {chips.length === 0 ? (
            <span className="font-body text-[13px] text-on-surface-variant/60 italic">
              {field.placeholder}
            </span>
          ) : (
            chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChips(chips.filter((x) => x !== c))}
                className="group inline-flex items-center gap-2 px-3 py-1.5 bg-surface-container-high font-label text-[10px] uppercase tracking-[0.22em] text-on-surface hover:bg-surface-bright transition-colors duration-200"
              >
                {c}
                <span
                  aria-hidden
                  className="text-on-surface-variant group-hover:text-tertiary"
                >
                  ×
                </span>
              </button>
            ))
          )}
        </div>
        {available.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-label text-[9px] uppercase tracking-[0.22em] text-outline-variant mr-1">
              Suggested:
            </span>
            {available.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setChips([...chips, s])}
                className="inline-flex items-center px-2.5 py-1 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant hover:text-tertiary hover:bg-surface-container-high/50 transition-colors duration-200 ghost-border"
              >
                + {s}
              </button>
            ))}
          </div>
        )}
      </label>
    );
  }

  const inputClasses =
    "bg-transparent border-0 border-b border-outline-variant/35 focus:border-tertiary focus:outline-none pb-2 pt-1 text-[14px] text-on-surface placeholder:text-on-surface-variant/45 placeholder:italic transition-colors duration-200";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-label text-[11px] uppercase tracking-[0.22em] text-on-surface">
        {field.name}
      </span>
      <span className="helper-text">{field.helper}</span>
      {field.kind === "textarea" ? (
        <textarea
          rows={2}
          className={`${inputClasses} resize-y leading-[1.6] mt-1`}
          placeholder={field.placeholder}
          defaultValue={useDefaults ? field.defaultValue : undefined}
        />
      ) : (
        <input
          type="text"
          className={`${inputClasses} mt-1`}
          placeholder={field.placeholder}
          defaultValue={useDefaults ? field.defaultValue : undefined}
        />
      )}
    </label>
  );
}

function RailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="editorial-label">{title}</p>
      {children}
    </div>
  );
}
