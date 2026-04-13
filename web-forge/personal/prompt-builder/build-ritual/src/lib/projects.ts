export type Project = {
  slug: string;
  name: string;
  projectType:
    | "Spec Site"
    | "Client Build"
    | "Redesign"
    | "Concept"
    | "Draft";
  location: string;
  tone: string;
  primaryCta: string;
  status: "Draft" | "In Review" | "Ready to Build";
  updatedLabel: string;
  summary: string;
};

// Realistic sample projects drawn from David's actual spec-site workflow
// (Thorn & Thimble, The Nail Suite, Hole in the Wall Bagels — all built).
// Others are believable upcoming work.
export const projects: Project[] = [
  {
    slug: "thorn-and-thimble",
    name: "Thorn and Thimble",
    projectType: "Spec Site",
    location: "Bangor, Maine",
    tone: "Refined Precision",
    primaryCta: "Book Consultation",
    status: "Ready to Build",
    updatedLabel: "2m ago",
    summary:
      "Body piercing studio. Quiet, archival, trauma-informed in the owner's own voice — not as marketing copy.",
  },
  {
    slug: "the-nail-suite",
    name: "The Nail Suite",
    projectType: "Spec Site",
    location: "Dexter, Maine",
    tone: "Editorial",
    primaryCta: "Reserve Chair",
    status: "Ready to Build",
    updatedLabel: "1h ago",
    summary:
      "Two-chair boutique nail studio. Warm, feminine, interior-driven. Seedance hero loop of the space itself.",
  },
  {
    slug: "strange-maine",
    name: "Strange Maine",
    projectType: "Redesign",
    location: "Portland, Maine",
    tone: "Archival",
    primaryCta: "Visit Shop",
    status: "In Review",
    updatedLabel: "yesterday",
    summary:
      "Long-running record and curio shop. Preserve the clutter, elevate the discovery. Inventory deep-links from Instagram.",
  },
  {
    slug: "balsam-electric",
    name: "Balsam Electric",
    projectType: "Client Build",
    location: "Bar Harbor, Maine",
    tone: "Deliberate",
    primaryCta: "Request Estimate",
    status: "Draft",
    updatedLabel: "3 days ago",
    summary:
      "Residential + light-commercial electrician. Trust over flair. Service area map, licenses above the fold.",
  },
  {
    slug: "lavender-puff",
    name: "Lavender Puff Hair and Tanning",
    projectType: "Concept",
    location: "Waterville, Maine",
    tone: "Dark Luxury",
    primaryCta: "Book Appointment",
    status: "Draft",
    updatedLabel: "a week ago",
    summary:
      "Salon and tanning studio. Moody, tactile, not the usual salon pastels. Stylists as individual profiles.",
  },
  {
    slug: "ghostly-engraving",
    name: "Ghostly Engraving",
    projectType: "Client Build",
    location: "Augusta, Maine",
    tone: "Monastic",
    primaryCta: "Custom Order",
    status: "In Review",
    updatedLabel: "2 days ago",
    summary:
      "Headstone and memorial engraving. Serious, quiet, asset-first. The work does the selling.",
  },
  {
    slug: "bar-harbor-guitar-repair",
    name: "Bar Harbor Guitar Repair",
    projectType: "Spec Site",
    location: "Bar Harbor, Maine",
    tone: "Localized",
    primaryCta: "Drop Off Guitar",
    status: "Ready to Build",
    updatedLabel: "4 days ago",
    summary:
      "Solo luthier. Before/after gallery, turnaround times, honest pricing. No AI-synth aesthetics.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
