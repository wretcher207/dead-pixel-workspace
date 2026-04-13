export interface NavLink {
  label: string;
  href: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  image: string;
  chips: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}
