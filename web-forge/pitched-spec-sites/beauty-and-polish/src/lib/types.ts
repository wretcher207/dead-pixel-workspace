export interface Testimonial {
  name: string;
  text: string;
  tags?: string[];
}

export interface Service {
  name: string;
  description: string;
  price?: string;
}

export interface ServiceCategory {
  name: string;
  accent: string;
  description?: string;
  services?: Service[];
  pricingNote?: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
  tag?: string;
  colSpan?: number;
  rowSpan?: number;
  mobileColSpan?: number;
  mobileRowSpan?: number;
  type: "image" | "video" | "badge";
}

export interface NavLink {
  label: string;
  href: string;
}
