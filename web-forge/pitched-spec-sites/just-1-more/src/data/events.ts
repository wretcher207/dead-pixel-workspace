export interface BarEvent {
  id: string;
  name: string;
  day: string;
  dayIndex: number;
  timeStart: string;
  timeEnd: string;
  tagline: string;
  detail: string;
  accentColor: "neon" | "amber" | "ember";
  imagePath?: string;
}

export const events: BarEvent[] = [
  {
    id: "karaoke",
    name: "Karaoke Night",
    day: "Every Thursday",
    dayIndex: 4,
    timeStart: "6:00 PM",
    timeEnd: "9:00 PM",
    tagline: "Thursdays are for bad decisions and good songs.",
    detail: "No experience required.",
    accentColor: "ember",
  },
  {
    id: "pool-darts",
    name: "Pool and Darts Night",
    day: "Every Tuesday",
    dayIndex: 2,
    timeStart: "6:00 PM",
    timeEnd: "9:00 PM",
    tagline: "Tuesdays are for settling scores.",
    detail: "Open tables, 5 DARTSLIVE machines. Bring your trash talk.",
    accentColor: "neon",
    imagePath: "/images/pool-tables.jpg",
  },
];
