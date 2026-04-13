export interface DaySpecial {
  id: string;
  day: string;
  dayIndex: number;
  eventName: string;
  detail: string;
  accentColor: "neon" | "amber" | "ember";
}

export const weeklySpecials: DaySpecial[] = [
  { id: "monday",    day: "Monday",    dayIndex: 1, eventName: "Dollar Wing Night", detail: "A buck a wing. Come hungry.",                 accentColor: "amber" },
  { id: "tuesday",   day: "Tuesday",   dayIndex: 2, eventName: "Pool Night",        detail: "Table's open. Game's on you.",                accentColor: "neon"  },
  { id: "wednesday", day: "Wednesday", dayIndex: 3, eventName: "Burger Night",      detail: "Full basket. Cold beer sold separately.",     accentColor: "amber" },
  { id: "thursday",  day: "Thursday",  dayIndex: 4, eventName: "Karaoke Night",     detail: "Three hours to embarrass yourself. Free.",    accentColor: "ember" },
  { id: "friday",    day: "Friday",    dayIndex: 5, eventName: "Pizza Night",       detail: "End the week right. No explanation needed.", accentColor: "neon"  },
];
