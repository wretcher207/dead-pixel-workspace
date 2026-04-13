export interface PortfolioItem {
  id: number;
  src: string;
  alt: string;
  artist: string;
  style: string;
}

export const portfolioItems: PortfolioItem[] = [
  { id: 1,  src: "/images/showcase/work-1.jpg",  alt: "Custom tattoo work by Hallowed Ground Tattoo Portland Maine", artist: "Nick",   style: "Black & Grey" },
  { id: 2,  src: "/images/showcase/work-2.jpg",  alt: "Custom tattoo artwork Portland ME tattoo artist",            artist: "Matt",   style: "Traditional" },
  { id: 3,  src: "/images/showcase/work-3.jpg",  alt: "Fine line tattoo Portland Maine",                            artist: "Rueben", style: "Fine Line" },
  { id: 4,  src: "/images/showcase/work-4.jpg",  alt: "Color realism tattoo Portland Maine tattoo shop",            artist: "Pete",   style: "Color" },
  { id: 5,  src: "/images/showcase/work-5.jpg",  alt: "Geometric tattoo design Portland Maine custom tattoo",       artist: "Nick",   style: "Geometric" },
  { id: 6,  src: "/images/showcase/work-6.jpg",  alt: "Neo-traditional tattoo Portland ME best tattoo shop",        artist: "Pete",   style: "Neo-Traditional" },
  { id: 7,  src: "/images/showcase/work-7.jpg",  alt: "Custom tattoo by Hallowed Ground Portland Maine",            artist: "Matt",   style: "Traditional" },
  { id: 8,  src: "/images/showcase/work-8.jpg",  alt: "Illustrative tattoo Portland Maine tattoo artist",           artist: "Rueben", style: "Illustrative" },
  { id: 9,  src: "/images/showcase/work-9.jpg",  alt: "Black and grey tattoo Portland Maine fine art tattoo",       artist: "Nick",   style: "Black & Grey" },
  { id: 10, src: "/images/showcase/work-10.jpg", alt: "Custom tattoo design Portland ME",                           artist: "Pete",   style: "Color" },
  { id: 11, src: "/images/showcase/work-11.jpg", alt: "Tattoo artwork by Hallowed Ground Tattoo Portland Maine",    artist: "Rueben", style: "Fine Line" },
  { id: 12, src: "/images/showcase/work-12.jpg", alt: "Custom Portland Maine tattoo shop hallowed ground",          artist: "Matt",   style: "Neo-Traditional" },
];

export const styleFilters = ["All", "Black & Grey", "Traditional", "Fine Line", "Geometric", "Color", "Neo-Traditional", "Illustrative"];
export const artistFilters = ["All", "Matt", "Nick", "Pete", "Rueben"];
