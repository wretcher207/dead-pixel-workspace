export interface Testimonial {
  id: string
  name: string
  initials: string
  location: string
  service: string
  quote: string
  featured?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah M.',
    initials: 'SM',
    location: 'Waterville, ME',
    service: 'Facial Electrolysis',
    quote:
      'Ruth made the whole process feel straightforward from day one. She explained everything clearly, set realistic expectations, and the results have been exactly what she described. I only wish I\'d started sooner.',
    featured: true,
  },
  {
    id: 't2',
    name: 'Christine L.',
    initials: 'CL',
    location: 'Augusta, ME',
    service: 'Upper Lip & Chin',
    quote:
      'I was nervous about my first appointment. Ruth is calm, professional, and genuinely kind. The studio is clean and private. It felt nothing like I expected — in the best way.',
    featured: true,
  },
  {
    id: 't3',
    name: 'J.T.',
    initials: 'JT',
    location: 'Waterville, ME',
    service: 'Gender-Affirming Treatment',
    quote:
      'Finding a practitioner who treats you like a person first has been meaningful. Ruth is professional, respectful, and very good at what she does. The results have made a real difference.',
    featured: true,
  },
  {
    id: 't4',
    name: 'Donna B.',
    initials: 'DB',
    location: 'Skowhegan, ME',
    service: 'Body Electrolysis',
    quote:
      'I\'ve dealt with PCOS my entire life. Ruth was honest about what to expect with hormonal regrowth and built a plan that actually works with my situation. Real progress and real communication.',
  },
  {
    id: 't5',
    name: 'Margaret H.',
    initials: 'MH',
    location: 'Oakland, ME',
    service: 'Eyebrow Reshaping',
    quote:
      'I had no idea electrolysis could do what she\'s done for my brows. No more penciling every morning. It sounds small but it changed my routine completely.',
  },
  {
    id: 't6',
    name: 'Rachel N.',
    initials: 'RN',
    location: 'Farmington, ME',
    service: 'Facial & Neck',
    quote:
      'She answered every question I had without making me feel like I was being difficult. The consultation alone was worth the trip. Very professional operation.',
  },
  {
    id: 't7',
    name: 'Lisa K.',
    initials: 'LK',
    location: 'Waterville, ME',
    service: 'Chin & Jawline',
    quote:
      'Went in skeptical. I\'d tried laser before and wasn\'t impressed. Electrolysis with Ruth has been different — I can see actual, permanent progress. Halfway through my plan and already thrilled.',
  },
  {
    id: 't8',
    name: 'Paula W.',
    initials: 'PW',
    location: 'Norridgewock, ME',
    service: 'Underarms',
    quote:
      'Honestly one of the best decisions I\'ve made. Professional, private, and the results speak for themselves. Ruth is excellent at what she does.',
  },
  {
    id: 't9',
    name: 'Tom A.',
    initials: 'TA',
    location: 'Waterville, ME',
    service: 'Neck & Shoulders',
    quote:
      'I was the only man in a waiting room that didn\'t exist — because it\'s completely private. That made a big difference. Ruth is direct, efficient, and the treatment works.',
  },
  {
    id: 't10',
    name: 'Erica F.',
    initials: 'EF',
    location: 'Belfast, ME',
    service: 'Full Consultation',
    quote:
      'Came in for a consultation and left with a clear plan, honest expectations, and zero pressure. That\'s rare. I booked my first real session on the way out.',
  },
]
