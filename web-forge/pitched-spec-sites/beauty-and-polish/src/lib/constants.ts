import { Testimonial, ServiceCategory, GalleryItem, NavLink } from "./types";

export const SITE_NAME = "Beauty & Polish";
export const SITE_URL = "https://www.beautyandpolishme.com";
export const BOOKING_URL = "https://www.fresha.com/a/beauty-polish-scarborough-618-u-s-1-nm9qgivr/all-offer?menu=true";
export const INSTAGRAM_HANDLE = "@beautyandpolish_dunstan";
export const INSTAGRAM_URL = "https://www.instagram.com/beautyandpolish_dunstan";
export const FACEBOOK_URL = "https://www.facebook.com/beautyandpolish";
export const ADDRESS = "618 US Route 1, Scarborough, ME 04074";
export const ADDRESS_SHORT = "Scarborough, ME (Dunstan area)";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Stella L.",
    text: "I just got my nails done with Bebe and what a great experience! I came with an idea and got the coolest nails done by her. She\u2019s a great artist and the salon environment was really nice and clean. Would absolutely recommend Beauty and Polish!",
  },
  {
    name: "Kaitlyn J.",
    text: "Can\u2019t say enough great things about Bebe and Beauty and Polish! First time customers, booked myself a new set of dip with tips and a manicure for my 5 year old daughter. Both of us requested intricate designs and BeBe delivered above and beyond. Gorgeous nails, very clean space and super nice people!",
  },
  {
    name: "Jen B.",
    text: "A vacation nail emergency is no joke! I found Beauty and Polish by FB and google reviews and I was not let down! Bebe was simply wonderful to deal with! Her shop is clean and welcoming. She herself could not have been friendlier and her staff the same! I highly recommend Beauty and Polish!",
  },
  {
    name: "Christy S.",
    text: "Definitely some of the best nail service I have ever received and the customer service is top-notch.",
  },
  {
    name: "Leah M.",
    text: "I love it here! Bebe and her staff are all so welcoming and sweet. It\u2019s clean and well maintained. I won\u2019t go anywhere else for my nails! Very much recommend!",
  },
  {
    name: "Kaylea G.",
    text: "10/10! My dip mani always comes out perfect.",
  },
  {
    name: "Sarah F.",
    text: "I went to Beauty and Polish for the first time a few months back to have my nails done for my wedding and a full face wax. My nails turned out beautifully and I have been back 3 times for waxing. 100% recommended.",
  },
  {
    name: "Heather M.",
    text: "Not only was it super easy to get in, but the appointment didn\u2019t take forever either. The woman that did my eyelashes was super sweet and knew exactly what she was doing. I definitely enjoyed my experience and will definitely be booking again.",
  },
  {
    name: "Lucia D.",
    text: "Fantastic services for special occasion or when you just want to have great mani pedi for Me Time.",
  },
  {
    name: "Kira S.",
    text: "The place was clean and quiet. The technician that I had was very professional too. I had a dip powder and extended nails, they turned out great and exactly what I wanted.",
  },
  {
    name: "Grace M.",
    text: "This place is awesome!!! I was left with fabulous looking eyebrows!!!",
  },
  {
    name: "Donna W.",
    text: "I had an amazing manicure by Lindsay today! Beautiful color and some nail art \u2014 done professionally and carefully \u2014 love it!",
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    name: "Nails",
    accent: "from-clay-accent to-clay-accent-light",
    services: [
      {
        name: "Dip Powder",
        description: "The dip manicure that looks freshly done three weeks later. Lightweight, durable, and available in every color Bebe has \u2014 which is a lot.",
      },
      {
        name: "Gel Manicure",
        description: "Classic gel with a flawless finish. Thin, natural-feeling, and cured properly so it actually lasts. Great for clean, polished looks or as a base for nail art.",
      },
      {
        name: "Acrylic",
        description: "Full acrylic sets and fills, shaped and sculpted by hand. Whether you want short and natural or long and dramatic, Bebe builds the shape you\u2019re after.",
      },
      {
        name: "Custom Nail Art",
        description: "This is where Beauty & Polish separates from every other salon. Bebe hand-paints designs that range from delicate florals to bold character art. Bring a photo, describe a vibe, or just say \u201Csurprise me.\u201D",
      },
      {
        name: "Children\u2019s Manicure",
        description: "Kid-friendly mani for your little one. Non-toxic options, a patient and gentle approach, and a fun experience they\u2019ll talk about for days. Ages 5 and up.",
      },
      {
        name: "Pedicure",
        description: "A proper pedicure: soak, scrub, shaping, cuticle care, and polish or gel finish. Relaxing without being slow. Thorough without being rough.",
      },
    ],
  },
  {
    name: "Waxing",
    accent: "from-clay-tertiary to-sky-400",
    description: "Clean, quick, and done right. Bebe and her team are experienced enough to make waxing as painless as it can be \u2014 and fast enough that you\u2019re not dreading it. Eyebrows, lip, chin, full face, legs, bikini, and more.",
    pricingNote: "Pricing available upon request \u2014 book a consultation or call for current rates.",
  },
  {
    name: "Eyelash Extensions",
    accent: "from-clay-accent-alt to-pink-400",
    description: "Full sets and fills for a natural or dramatic look. Applied carefully, lash by lash, so they actually last and don\u2019t damage your natural lashes. If you\u2019ve had a bad lash experience somewhere else, this is the reset.",
    pricingNote: "Pricing available upon request \u2014 book a consultation or call for current rates.",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    src: "/images/showcase/nails-3.jpg",
    alt: "Vibrant pop art nails with bold colors, polka dots, and stripes by Beauty and Polish in Scarborough, Maine",
    tag: "Nail Art",
    colSpan: 2,
    rowSpan: 2,
    mobileColSpan: 2,
    mobileRowSpan: 2,
    type: "image",
  },
  {
    src: "/images/showcase/nails-1.jpg",
    alt: "Purple glitter dip powder nails with hand-painted bunny and chick nail art by Beauty and Polish",
    tag: "Nail Art",
    colSpan: 1,
    rowSpan: 1,
    type: "image",
  },
  {
    src: "/images/showcase/nails-2.jpg",
    alt: "Sage green gel manicure with hand-painted white daisy accents by Beauty and Polish",
    tag: "Nail Art",
    colSpan: 1,
    rowSpan: 1,
    type: "image",
  },
  {
    src: "/images/video/showcase.mp4",
    alt: "Beauty and Polish nail art showcase video",
    colSpan: 2,
    rowSpan: 1,
    mobileColSpan: 2,
    type: "video",
  },
  {
    src: "/images/showcase/nails-4.jpg",
    alt: "St. Patrick's Day themed nails with green shamrocks, polka dots, and stars",
    tag: "Seasonal",
    colSpan: 1,
    rowSpan: 1,
    type: "image",
  },
  {
    src: "/images/showcase/award.jpg",
    alt: "Fresha Best in Class 2026 award certificate for Beauty and Polish",
    tag: "Award",
    colSpan: 2,
    rowSpan: 2,
    mobileColSpan: 2,
    mobileRowSpan: 2,
    type: "image",
  },
  {
    src: "/images/showcase/nails-5.jpg",
    alt: "Black and pink cow print nails with polka dot accent nails by Beauty and Polish",
    tag: "Nail Art",
    colSpan: 1,
    rowSpan: 1,
    type: "image",
  },
  {
    src: "/images/showcase/april.jpg",
    alt: "Hello April seasonal post with purple cineraria flowers",
    tag: "Seasonal",
    colSpan: 1,
    rowSpan: 1,
    type: "image",
  },
  {
    src: "/images/showcase/100-percent.png",
    alt: "100% recommendation rate badge",
    colSpan: 1,
    rowSpan: 1,
    type: "badge",
  },
];
