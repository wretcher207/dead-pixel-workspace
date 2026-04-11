// Every alt text here was written after visually inspecting the source photo.
// They name the plant when it was identifiable from visible variety tags
// or recognizable from shape/color.

export type GalleryImage = {
  id: number;
  file: string; // base filename without extension or variant suffix
  width: number;
  height: number;
  alt: string;
  orientation: "landscape" | "portrait" | "square";
};

// Width/height are real pixel dimensions so the browser reserves the
// correct aspect ratio box before the image loads.
export const GALLERY: GalleryImage[] = [
  {
    id: 1,
    file: "showcase-01",
    width: 512,
    height: 384,
    orientation: "landscape",
    alt: "Marigold and orange dahlia petals in close-up macro inside the Ledgewood greenhouse",
  },
  {
    id: 2,
    file: "showcase-02",
    width: 352,
    height: 320,
    orientation: "landscape",
    alt: "Cream osteospermum with a dramatic purple and cream spoon center at Ledgewood Gardens",
  },
  {
    id: 3,
    file: "showcase-03",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Pink, yellow and cream calibrachoa blooms lined up in greenhouse trays",
  },
  {
    id: 4,
    file: "showcase-04",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "Cabbage seedling starter packs labeled Early Jersey Wakefield, Golden Acre and Late Flat Dutch",
  },
  {
    id: 5,
    file: "showcase-05",
    width: 384,
    height: 512,
    orientation: "portrait",
    alt: "Peach and coral double-bloom begonia in a greenhouse tray surrounded by foliage",
  },
  {
    id: 6,
    file: "showcase-06",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "Kale seedlings labeled Vates Blue Curled Scotch, Dazzling Blue and Prizm in starter packs",
  },
  {
    id: 7,
    file: "showcase-07",
    width: 512,
    height: 384,
    orientation: "landscape",
    alt: "A single white and purple pansy in full bloom inside the greenhouse with the structure visible behind",
  },
  {
    id: 8,
    file: "showcase-08",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Bright yellow Cool Wave pansy bloom surrounded by foliage and labeled trays",
  },
  {
    id: 9,
    file: "showcase-09",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "Eggplant seedlings labeled Hansel, Gretel and Fairy Tale in starter six-packs",
  },
  {
    id: 10,
    file: "showcase-10",
    width: 384,
    height: 512,
    orientation: "portrait",
    alt: "White Cool Wave pansies with yellow centers against green leaves",
  },
  {
    id: 11,
    file: "showcase-11",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Rows of yellow pansies filling the Ledgewood greenhouse bed",
  },
  {
    id: 12,
    file: "showcase-12",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "A watering wand gently showering red calibrachoa and petunias in the greenhouse",
  },
  {
    id: 13,
    file: "showcase-13",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Lavender and white double-bloom calibrachoa with deep purple throats in a greenhouse tray",
  },
  {
    id: 14,
    file: "showcase-14",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "A cream pansy with a yellow center and dark whiskered face beside a pale lavender pansy",
  },
  {
    id: 15,
    file: "showcase-15",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Coral petunia blooms with rose-pink centers filling the frame",
  },
  {
    id: 16,
    file: "showcase-16",
    width: 512,
    height: 384,
    orientation: "landscape",
    alt: "A single Sorbet viola with bright yellow lower petals and purple upper petals",
  },
  {
    id: 17,
    file: "showcase-17",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "A wide view of the pansy greenhouse showing rose, yellow and lilac varieties with hanging baskets above",
  },
  {
    id: 18,
    file: "showcase-18",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "Admire Jolly Face violas in bloom with purple upper petals and cream and yellow lower petals",
  },
  {
    id: 19,
    file: "showcase-19",
    width: 352,
    height: 480,
    orientation: "portrait",
    alt: "A green garden bucket filled with freshly pinched red and purple calibrachoa trimmings",
  },
  {
    id: 20,
    file: "showcase-20",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Magenta petunias in full bloom crowding a greenhouse tray",
  },
  {
    id: 21,
    file: "showcase-21",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "A greenhouse row of magenta, orange and white calibrachoa in side-by-side trays",
  },
  {
    id: 22,
    file: "showcase-22",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Yellow and white calibrachoa cascading together in a hanging basket at Ledgewood Gardens",
  },
  {
    id: 23,
    file: "showcase-23",
    width: 600,
    height: 450,
    orientation: "landscape",
    alt: "Deep purple, magenta and hot pink petunia blooms clustered in a greenhouse tray",
  },
  {
    id: 24,
    file: "showcase-24",
    width: 480,
    height: 640,
    orientation: "portrait",
    alt: "Pink, yellow and cream calibrachoa in full bloom filling a greenhouse tray",
  },
];

// Curated hero / section selections so we don't re-shuffle these picks everywhere.
export const HERO_POSTER = GALLERY[1]; // showcase-02: osteospermum
export const SEASONAL_HIGHLIGHTS = [
  GALLERY[21], // showcase-22 hanging basket yellow/white
  GALLERY[14], // showcase-15 coral petunias
  GALLERY[16], // showcase-17 pansy wide view
  GALLERY[8],  // showcase-09 eggplant seedlings
];
export const ABOUT_COLLAGE = [
  GALLERY[12], // showcase-13 lavender double calibrachoa
  GALLERY[1],  // showcase-02 osteospermum
  GALLERY[10], // showcase-11 yellow pansy rows
];
export const OFFERINGS_IMAGES = [
  GALLERY[21], // hanging baskets
  GALLERY[13], // pansies/violas
  GALLERY[3],  // cabbage seedlings (veg & herb)
  GALLERY[12], // perennials (using double calibrachoa as illustrative)
  GALLERY[5],  // seeds & supplies (kale starter packs)
  GALLERY[18], // seasonal arrangements (bucket of blooms)
];
export const WHY_CHOOSE_BACKGROUND = GALLERY[15]; // showcase-16 sorbet viola
export const SEASON_CALLOUT_BACKGROUND = GALLERY[20]; // showcase-21 mixed trays
export const VISIT_AMBIENT = GALLERY[9]; // showcase-10 white cool wave pansies
