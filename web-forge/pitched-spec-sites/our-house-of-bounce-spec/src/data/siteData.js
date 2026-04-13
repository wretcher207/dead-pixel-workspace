import bookingsPoster from '../../bookings.jpg';
import comboSlide from '../../509361094_122119925378880272_791915326371837060_n.jpg';
import sportsmanSlide from '../../514089322_122122852424880272_7352649468965251879_n.jpg';
import legoCastle from '../../519575277_122128677704880272_8383763539924140956_n.jpg';
import stickyWall from '../../548049411_122143005956880272_1057761084217787029_n.jpg';
import infoCard from '../../infocard.jpg';
import infoCardBusiness from '../../infocard2.jpg';
import logo from '../../logo.jpg';

export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Events', href: '#events' },
  { label: 'Contact', href: '#contact' },
];

export const marqueeItems = [
  'Birthday Parties',
  'Water Slides',
  'Bounce Houses',
  'Community Events',
  'Church Fairs',
  'School Field Days',
];

export const rentalItems = [
  {
    name: 'Princess Castle',
    price: '$200',
    image: bookingsPoster,
    alt: 'Princess Castle bounce house rental flyer',
    imagePosition: '50% 78%',
    accent: 'var(--secondary)',
    shadow: 'var(--border)',
    description: 'A classic birthday party favorite. Kids love the tower details and bright colors.',
  },
  {
    name: 'Lego Castle Bounce House',
    price: '$200',
    image: legoCastle,
    alt: 'Lego Castle Bounce House inflatable set up outdoors',
    imagePosition: 'center',
    accent: 'var(--quaternary)',
    shadow: 'var(--border)',
    description: 'Bold, colorful, and built for high energy. Great for backyard parties and school events.',
  },
  {
    name: 'Combo Slide Bounce House',
    price: '$250',
    image: comboSlide,
    alt: 'Combo Slide Bounce House with attached slide inflatable',
    imagePosition: 'center',
    accent: 'var(--tertiary)',
    shadow: 'var(--border)',
    description: 'Bounce and slide in one unit. Perfect for field days and church fairs where space counts.',
  },
  {
    name: 'Tidal Wave Water Slide',
    price: '$300',
    image: bookingsPoster,
    alt: 'Tidal Wave Water Slide rental flyer',
    imagePosition: '50% 18%',
    accent: 'var(--accent)',
    shadow: 'var(--border)',
    description: 'The summer crowd pleaser. Hook up a hose and let the kids cool off all day long.',
  },
  {
    name: 'Sportsman Slide',
    price: '$350',
    image: sportsmanSlide,
    alt: 'Sportsman Slide large inflatable with sports theme',
    imagePosition: 'center',
    accent: 'var(--secondary)',
    shadow: 'var(--secondary)',
    featured: true,
    badge: 'Most Popular',
    description: 'Our biggest and most booked unit. A massive slide that turns any event into the main event.',
  },
];

export const eventItems = [
  {
    title: 'Birthday Parties',
    description:
      "Make their big day unforgettable with a bounce house they'll never forget.",
    icon: 'cake',
    color: 'var(--secondary)',
  },
  {
    title: 'Community Events',
    description:
      'School field days, church fairs, and neighborhood block parties.',
    icon: 'users',
    color: 'var(--tertiary)',
  },
  {
    title: 'Corporate Fun',
    description:
      'Company picnics, team building days, and employee appreciation events.',
    icon: 'building',
    color: 'var(--quaternary)',
  },
];

export const business = {
  name: 'Our House of Bounce',
  phoneDisplay: '207-432-8735',
  phoneHref: 'tel:2074328735',
  facebookHandle: '@OurHouseOfBounce',
  facebookHref: 'https://www.facebook.com/OurHouseOfBounce',
  heroImage: comboSlide,
  heroAlt: 'Colorful inflatable combo slide bounce house',
  logo,
  aboutImages: [
    {
      src: infoCard,
      alt: 'Our House of Bounce family marketing card',
    },
    {
      src: stickyWall,
      alt: 'Kids enjoying an inflatable rental setup',
    },
  ],
  businessCardImage: infoCardBusiness,
};
