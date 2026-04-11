// Single source of truth for every piece of business info on the site.
// If a fact changes, change it here and it propagates everywhere.

export const BUSINESS = {
  name: "Ledgewood Gardens & Greenhouses",
  shortName: "Ledgewood Gardens",
  established: 1989,
  description:
    "A friend and family-run greenhouse in Orrington, Maine since 1989.",
  phoneDisplay: "(207) 825-4707",
  phoneE164: "+12078254707",
  email: "ledgewoodgardens@gmail.com",
  facebookUrl: "https://www.facebook.com/LedgewoodGardensGreenhouses",
  address: {
    street: "563 Johnson Mill Rd",
    city: "Orrington",
    region: "ME",
    postalCode: "04474",
    country: "USA",
  },
  // Full address on a single line, useful for links / maps.
  addressOneLine: "563 Johnson Mill Rd, Orrington, ME 04474",
  // Confirmed with owner: 2026 season opens Saturday, April 25.
  openingDate2026: new Date(2026, 3, 25), // month is 0-indexed
  // Real hours are not yet posted for the 2026 season.
  hoursStatus:
    "2026 season hours coming soon. Doors open Saturday, April 25. Follow our Facebook for updates as we get closer.",
  reviews: {
    count: 25,
    percentRecommend: 100,
  },
  ownerFirstName: "Karen", // mentioned in testimonial #10
} as const;

// Returns the last Saturday in April of the current year,
// or next year if we've already passed it.
// Keeps the site from rotting after 2026.
export function getNextOpeningDate(now: Date = new Date()): Date {
  const year = now.getMonth() > 3 ? now.getFullYear() + 1 : now.getFullYear();
  const april30 = new Date(year, 3, 30);
  const dayOfWeek = april30.getDay(); // 0 = Sun, 6 = Sat
  const offset = (dayOfWeek - 6 + 7) % 7;
  return new Date(year, 3, 30 - offset);
}

// Format a Date as "Saturday, April 25, 2026".
export function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format a Date as "April 25".
export function formatShortDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}
