export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  duration?: string[]
  startingAt?: string
  category: ServiceCategory
  icon: string
  highlights?: string[]
}

export type ServiceCategory =
  | 'consultation'
  | 'facial'
  | 'body'
  | 'specialty'
  | 'ongoing'

export const serviceCategories: { id: ServiceCategory; label: string; description: string }[] = [
  {
    id: 'consultation',
    label: 'Consultation',
    description: 'Start here — a relaxed, no-pressure conversation to discuss your goals and build your treatment plan.',
  },
  {
    id: 'facial',
    label: 'Facial Electrolysis',
    description: 'Precision treatment for the face — upper lip, chin, eyebrows, jawline, neck, and more.',
  },
  {
    id: 'body',
    label: 'Body Electrolysis',
    description: 'Permanent removal for larger surface areas including arms, legs, underarms, torso, and back.',
  },
  {
    id: 'specialty',
    label: 'Specialty Treatment',
    description: 'Sensitive, precision-focused work for areas requiring particular care and discretion.',
  },
  {
    id: 'ongoing',
    label: 'Treatment Plans',
    description: 'Ongoing, structured care — because permanent results come from consistent, personalized sessions.',
  },
]

export const services: Service[] = [
  {
    id: 'consultation',
    title: 'Free Consultation',
    shortDescription:
      'A relaxed, no-obligation conversation to understand your goals, assess the treatment area, and outline a realistic plan.',
    fullDescription:
      'Your consultation is the natural first step. We talk through what you want to achieve, assess the hair and skin in the treatment area, and discuss what a realistic, personalized treatment plan looks like — including how many sessions to expect and what to anticipate. No pressure. No obligation. Just clear information so you can decide if electrolysis is right for you.',
    category: 'consultation',
    icon: 'MessageCircle',
    highlights: [
      'Complimentary — no charge, no obligation',
      'Discuss your treatment goals',
      'Realistic timeline and session estimate',
      'Questions answered honestly',
    ],
  },
  {
    id: 'facial-15',
    title: 'Facial Treatment — 15 Min',
    shortDescription: 'A focused session targeting a specific area — upper lip, chin, a single brow line.',
    fullDescription:
      'Short sessions are ideal for maintaining progress on smaller areas or for newer clients getting comfortable with the process. Precise, efficient, and effective for targeted work.',
    duration: ['15 minutes'],
    startingAt: '$XX',
    category: 'facial',
    icon: 'Sparkles',
  },
  {
    id: 'facial-30',
    title: 'Facial Treatment — 30 Min',
    shortDescription: 'The most common facial session — enough time for thorough coverage of one or two areas.',
    fullDescription:
      'Thirty minutes allows for focused, thorough treatment of an area like the upper lip and chin, or eyebrow reshaping. This is the most popular session length for ongoing facial work.',
    duration: ['30 minutes'],
    startingAt: '$XX',
    category: 'facial',
    icon: 'Sparkles',
  },
  {
    id: 'facial-60',
    title: 'Facial Treatment — 60 Min',
    shortDescription: 'Extended facial session for comprehensive coverage or multiple areas in a single visit.',
    fullDescription:
      'For clients with more extensive facial treatment goals — full beard, multiple areas, or significant density — a 60-minute session allows for comprehensive, efficient progress.',
    duration: ['60 minutes'],
    startingAt: '$XX',
    category: 'facial',
    icon: 'Sparkles',
  },
  {
    id: 'body-30',
    title: 'Body Treatment — 30 Min',
    shortDescription: 'Targeted body work for smaller surface areas such as underarms, bikini line, or forearms.',
    fullDescription:
      'Body electrolysis in shorter sessions is excellent for smaller targeted areas. Each session makes systematic progress toward permanent clearance.',
    duration: ['30 minutes'],
    startingAt: '$XX',
    category: 'body',
    icon: 'Leaf',
  },
  {
    id: 'body-60',
    title: 'Body Treatment — 60 Min',
    shortDescription: 'A full hour for larger areas — lower legs, abdomen, back, or multiple body zones.',
    fullDescription:
      'Larger surface areas benefit from longer sessions. A 60-minute body appointment allows for meaningful coverage of areas like the lower legs, stomach, or full underarms in a single visit.',
    duration: ['60 minutes'],
    startingAt: '$XX',
    category: 'body',
    icon: 'Leaf',
  },
  {
    id: 'specialty',
    title: 'Sensitive Area Treatment',
    shortDescription: 'Gentle, precise electrolysis for intimate or sensitive areas, handled with professionalism and care.',
    fullDescription:
      'Sensitive-area treatment is approached with discretion, care, and respect. Ruth works with clients to ensure comfort, privacy, and clear communication throughout. All treatment is performed to the same professional standards as any other area.',
    category: 'specialty',
    icon: 'Shield',
    highlights: [
      'Handled with full professionalism and discretion',
      'Client comfort and privacy are the priority',
      'Complimentary consultation recommended',
    ],
  },
  {
    id: 'gender-affirming',
    title: 'Gender-Affirming Electrolysis',
    shortDescription:
      'Supportive, inclusive permanent hair removal for transgender and nonbinary clients. Treated with respect, warmth, and no assumptions.',
    fullDescription:
      'Ruth provides a welcoming, judgment-free environment for transgender and nonbinary clients seeking permanent hair removal. Whether your goals are facial clearance, body work, or both, treatment is tailored specifically to you. This is straightforward, professional care — you are welcome here.',
    category: 'specialty',
    icon: 'Heart',
    highlights: [
      'Inclusive, respectful, judgment-free',
      'Facial clearance for pre-op or standalone goals',
      'Customized treatment planning',
      'Insurance documentation assistance if applicable',
    ],
  },
  {
    id: 'treatment-plan',
    title: 'Structured Treatment Plan',
    shortDescription:
      'For clients with ongoing goals, a structured plan maps out session frequency, area sequencing, and a realistic timeline.',
    fullDescription:
      'Permanent results come from consistent, well-planned care. After your consultation, Ruth will outline a treatment plan that sequences your areas strategically, schedules sessions at optimal intervals for hair cycle coverage, and tracks your progress over time. This is not an upsell — it is simply how the process works best.',
    category: 'ongoing',
    icon: 'ClipboardList',
    highlights: [
      'Developed after your initial consultation',
      'Clear session frequency recommendations',
      'Realistic timeline set at the start',
      'Adjusted as you progress',
    ],
  },
]

export const treatmentAreas = [
  { area: 'Upper Lip', category: 'Facial' },
  { area: 'Chin', category: 'Facial' },
  { area: 'Cheeks', category: 'Facial' },
  { area: 'Eyebrows', category: 'Facial' },
  { area: 'Jawline', category: 'Facial' },
  { area: 'Neck', category: 'Facial' },
  { area: 'Sideburns', category: 'Facial' },
  { area: 'Full Face', category: 'Facial' },
  { area: 'Underarms', category: 'Body' },
  { area: 'Arms', category: 'Body' },
  { area: 'Legs', category: 'Body' },
  { area: 'Abdomen', category: 'Body' },
  { area: 'Back', category: 'Body' },
  { area: 'Chest', category: 'Body' },
  { area: 'Bikini / Brazilian', category: 'Specialty' },
  { area: 'Sensitive Areas', category: 'Specialty' },
]

export const aftercareNotes = [
  'Avoid direct sun exposure and tanning on treated areas for 48 hours.',
  'Skip heavy exercise and heat (sauna, hot tub) for 24 hours post-treatment.',
  'Gently cleanse the area — no harsh exfoliants for 48–72 hours.',
  'Small temporary redness or slight swelling is normal and resolves quickly.',
  'Do not tweeze or wax between sessions — trimming is fine.',
  'Stay hydrated and keep skin moisturized.',
  'If you notice unusual irritation, contact Ruth directly.',
]
