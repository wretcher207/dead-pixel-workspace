export const studio = {
  name: "Thorn & Thimble Body Piercing",
  shortName: "Thorn & Thimble",
  tag: "Body Piercing · Fine Jewelry",
  owner: "Libby",
  city: "Bangor, Maine",
  address: {
    street: "40 Main Street",
    city: "Bangor",
    state: "ME",
    zip: "04401",
  },
  phone: "(207) 370-9312",
  phoneHref: "tel:+12073709312",
  phoneNote: "text only",
  email: "thornandthimblebodypiercing@gmail.com",
  messenger: "Thorn & Thimble Body Piercing",
  facebook: "https://www.facebook.com/thornandthimblebodypiercing",
  rating: "4.9 / 5",
  reviewCount: 10,
  recommendPct: 84,
};

export const hours: Array<{ day: string; time: string; closed?: boolean }> = [
  { day: "Sunday", time: "12 — 4" },
  { day: "Monday", time: "Closed", closed: true },
  { day: "Tuesday", time: "11 — 6" },
  { day: "Wednesday", time: "Closed", closed: true },
  { day: "Thursday", time: "11 — 6" },
  { day: "Friday", time: "11 — 6" },
  { day: "Saturday", time: "11 — 6" },
];

export interface Service {
  name: string;
  price: string;
  age: string;
  note?: string;
}

export const services: Service[] = [
  { name: "Nostril", price: "$60", age: "14+" },
  { name: "Navel", price: "$60", age: "16+" },
  { name: "Lobes", price: "$90 / $120", age: "11+ / 5+" },
  { name: "Ear Cartilage", price: "$60", age: "13+" },
  { name: "Septum", price: "$70", age: "16+" },
  { name: "Nipples", price: "$110", age: "18+" },
  { name: "Brow", price: "$60", age: "16+" },
  { name: "Oral", price: "$65", age: "18+" },
  { name: "Tongue", price: "$80", age: "18+" },
  { name: "Industrial", price: "$90", age: "16+" },
  { name: "Bridge", price: "$80", age: "18+" },
  { name: "VCH", price: "$175", age: "18+", note: "By appointment only" },
  { name: "Jewelry Change", price: "$5 — $15", age: "18+" },
  { name: "Piercing Recovery", price: "$15 — $30", age: "18+" },
];

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  detail: string;
  index: string;
  /** Relative size in the masonry grid */
  span: "sm" | "md" | "lg" | "tall";
}

export const gallery: GalleryItem[] = [
  {
    src: "/assets/gallery/ear-crystal-stack.jpg",
    alt: "Ear curation with crystal flat studs and silver hoop by Thorn & Thimble Body Piercing",
    title: "Crystal Cartilage",
    detail: "Flat-back pavé",
    index: "01",
    span: "tall",
  },
  {
    src: "/assets/gallery/opal-constellation.jpg",
    alt: "Multi-piercing ear curation with white and blue opals",
    title: "Opal Constellation",
    detail: "Rook · Tragus · Lobe",
    index: "02",
    span: "md",
  },
  {
    src: "/assets/gallery/pearl-helix.jpg",
    alt: "Pearl helix piercing with pearl lobe studs",
    title: "Pearl Helix",
    detail: "Helix · Double Lobe",
    index: "03",
    span: "md",
  },
  {
    src: "/assets/gallery/daith-pave.jpg",
    alt: "Pavé daith piercing with crystal detail",
    title: "Pavé Daith",
    detail: "Daith Curation",
    index: "04",
    span: "tall",
  },
  {
    src: "/assets/gallery/septum-nostril.jpg",
    alt: "Paired nostril and septum with pavé crystal jewelry",
    title: "Nostril & Septum",
    detail: "Paired Centerline",
    index: "05",
    span: "md",
  },
  {
    src: "/assets/gallery/gold-curation.jpg",
    alt: "Gold ear curation with tragus and helix studs, nostril detail",
    title: "Gold Curation",
    detail: "Helix · Tragus · Nose",
    index: "06",
    span: "md",
  },
  {
    src: "/assets/gallery/conch-opal.jpg",
    alt: "Conch piercing with opal stud and gold hoops",
    title: "Conch in Opal",
    detail: "Conch · Triple Lobe",
    index: "07",
    span: "tall",
  },
  {
    src: "/assets/gallery/helix-skull.jpg",
    alt: "Helix piercing with gold skull stud",
    title: "Skull Helix",
    detail: "Flat-back End",
    index: "08",
    span: "md",
  },
  {
    src: "/assets/gallery/navel-crystal.jpg",
    alt: "Navel piercing with stacked crystal jewelry",
    title: "Navel in Crystal",
    detail: "Curved Barbell",
    index: "09",
    span: "md",
  },
  {
    src: "/assets/gallery/heart-stud.jpg",
    alt: "Heart shaped silver lobe stud",
    title: "Heart Lobe",
    detail: "First Piercing",
    index: "10",
    span: "sm",
  },
  {
    src: "/assets/gallery/gilded-surface.jpg",
    alt: "Paired surface piercings with gold microdermal jewelry",
    title: "Gilded Pair",
    detail: "Surface Work",
    index: "11",
    span: "md",
  },
];

export interface Testimonial {
  name: string;
  date: string;
  body: string;
  tags?: string[];
}

export const testimonials: Testimonial[] = [
  {
    name: "Jasmine Nicole Hephzibah",
    date: "April 2025",
    body: "Libby was thoughtful, and very educated on her craft — she took the time to explain the process of doing a recovery piercing versus re-piercing. Hands down one of the best experiences I've had at a shop. 10/10 recommend.",
  },
  {
    name: "Evangeline Brian Fellows",
    date: "June 2025",
    body: "Extremely knowledgeable. She made my daughter and myself really comfortable. Very high quality jewelry — we have sensitive skin and lots of metal allergies — at a very fair price. Thorough, sanitary, and explained aftercare really well. I'm experienced in getting pierced and she still taught me some things. Highly recommend.",
    tags: ["Amazing results", "Beautiful results", "Great deals"],
  },
  {
    name: "Jennifer Lee Jackson",
    date: "April 2025",
    body: "Libby is amazing. She pierced my eyebrow and my kid's septum, and the whole experience was smooth and comfortable. Incredibly patient, explained everything clearly, and kept everything sterile and professional. You can tell she truly values education and safety.",
    tags: ["Amazing results", "Incredible artists", "Expert piercing", "Walk-ins welcome"],
  },
  {
    name: "Sarah Stanton Andrei",
    date: "January 2025",
    body: "I recently had the pleasure of getting pierced by Libby — my experience was a phenomenon. She explained every step of the process. I shared my inspiration photos and she provided me exactly what I was looking for. I'll definitely be back. Her jewelry options are fantastic.",
    tags: ["Amazing results"],
  },
  {
    name: "Elissa Ivey",
    date: "February 2025",
    body: "Libby was great. Made the whole process easy and was super friendly. She is knowledgeable and great at talking through everything and putting me and my daughter at ease. Thanks for being awesome at what you do, Libby.",
  },
  {
    name: "Andrea Nicole",
    date: "December 2024",
    body: "Libby was hilarious and amazing. Walked in for a spontaneous piercing and she made what could've been an awkward experience very low-key and fun. She walked me through everything she was going to do.",
    tags: ["Expert piercing"],
  },
  {
    name: "Gretchen Bull",
    date: "November 2024",
    body: "Libby is so wonderful — top notch, kind, intelligent in her craft, truly cares for you and your safety and proper healing, and makes you feel so comfortable. I'll definitely be back for all future piercings.",
  },
];

export interface FAQ {
  q: string;
  a: string;
}

export const faqs: FAQ[] = [
  {
    q: "What should I bring to my first appointment?",
    a: "A valid state or federally issued photo ID. Every service — new piercings, jewelry changes, recovery work — requires it, no exceptions.",
  },
  {
    q: "Do you pierce minors?",
    a: "Yes, within age guidelines for each service. A custodial caregiver must be present for the entire appointment, and we require the minor's birth certificate showing both the minor and the caregiver. The caregiver's photo ID must match that name. For name changes, bring the legal document (marriage license or divorce decree).",
  },
  {
    q: "What kind of jewelry do you use?",
    a: "Only high-quality, implant-grade jewelry for every initial piercing. Upgrades to APP-approved fine jewelry are always available — gold, pavé, opals, pearls, and more — sourced from the same manufacturers the top piercers in the country use.",
  },
  {
    q: "What's the feel of the studio?",
    a: "Calm, welcoming, and paced to you. Libby works hard to make every client feel safe, seen, and in control of their own body. You're welcome to ask questions, take breaks, bring a friend, and show up exactly as you are.",
  },
  {
    q: "Do I need an appointment or can I walk in?",
    a: "Walk-ins are welcome during open hours when the schedule allows. For VCH and larger sessions, please book in advance by text at (207) 370-9312.",
  },
  {
    q: "How do I book?",
    a: "Send a text to (207) 370-9312 or message Thorn & Thimble Body Piercing on Facebook Messenger. Phone line is text-only so Libby can stay focused during appointments.",
  },
  {
    q: "What should I do for aftercare?",
    a: "You'll leave with a written aftercare plan tailored to your specific piercing. Short version: sterile saline rinses, hands off, sleep clean, and reach out if anything feels off. Libby answers questions for every client she pierces.",
  },
  {
    q: "What does 'APP-approved' mean?",
    a: "The Association of Professional Piercers (APP) sets the gold-standard for jewelry safety, materials, and studio practice. APP-approved jewelry brands guarantee implant-grade metals, properly finished threading, and safe gem settings — the difference between jewelry that heals well and jewelry that fights your body.",
  },
];
