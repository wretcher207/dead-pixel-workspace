export interface Artist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  styles: string[];
  bookingLink: string;
}

export const artists: Artist[] = [
  {
    id: "matt",
    name: "Matt",
    title: "Founding Artist",
    specialty: "American Traditional & Neo-Traditional",
    bio: "Matt built Hallowed Ground from the ground up. With over 36 years in the craft, he's the kind of artist who makes you feel at ease the second you walk through the door. Bold lines, timeless compositions, and zero pretension — that's his whole deal.",
    styles: ["American Traditional", "Neo-Traditional", "Custom"],
    bookingLink: "#booking",
  },
  {
    id: "nick",
    name: "Nick",
    title: "Senior Artist",
    specialty: "Black & Grey / Geometric",
    bio: "Nick's work has a quiet intensity to it. Whether he's laying down a large-scale geometric back piece or doing intricate black and grey portraiture, the result is the same: something that looks like it belongs in a gallery. His technical range is second to none.",
    styles: ["Black & Grey", "Geometric", "Portraiture", "Illustrative"],
    bookingLink: "#booking",
  },
  {
    id: "pete",
    name: "Pete",
    title: "Staff Artist",
    specialty: "Color Realism & Neo-Traditional",
    bio: "Pete has a precision you can feel. His placements are intentional, his line work is immaculate, and his ability to read a client's vision and translate it onto skin is the reason people drive hours to sit in his chair. He'll make sure you're comfortable the whole way through.",
    styles: ["Color Realism", "Neo-Traditional", "Fine Line"],
    bookingLink: "#booking",
  },
  {
    id: "rueben",
    name: "Rueben",
    title: "Staff Artist",
    specialty: "Fine Line & Illustrative",
    bio: "Rueben is detail-obsessed in the best way. He specializes in fine line and illustrative work — subtle, intricate pieces that reward a close look. He's relaxed to work with and will go the extra mile to make sure your experience is right, start to finish.",
    styles: ["Fine Line", "Illustrative", "Botanical", "Minimalist"],
    bookingLink: "#booking",
  },
];
