export interface FAQ {
  question: string
  answer: string
  category: FAQCategory
}

export type FAQCategory =
  | 'basics'
  | 'treatment'
  | 'comfort'
  | 'scheduling'
  | 'suitability'
  | 'consultation'

export const faqCategories: { id: FAQCategory; label: string }[] = [
  { id: 'basics', label: 'The Basics' },
  { id: 'treatment', label: 'Treatment Process' },
  { id: 'comfort', label: 'Comfort & Aftercare' },
  { id: 'scheduling', label: 'Scheduling & Pricing' },
  { id: 'suitability', label: 'Who It\'s For' },
  { id: 'consultation', label: 'Getting Started' },
]

export const faqs: FAQ[] = [
  // Basics
  {
    category: 'basics',
    question: 'What exactly is electrolysis?',
    answer:
      'Electrolysis is the only method of hair removal recognized as permanently effective by the FDA. A fine probe is inserted into each hair follicle, and a small amount of electrical current is applied to damage the follicle\'s ability to produce new hair. Over a series of treatments, the follicle is permanently disabled and hair no longer grows back. It is not laser. It is not waxing. It works differently — and more completely.',
  },
  {
    category: 'basics',
    question: 'Is electrolysis actually permanent?',
    answer:
      'Yes — genuinely permanent. This is what distinguishes electrolysis from every other hair removal method. Laser, waxing, threading, and depilatory creams reduce or delay hair growth but do not permanently eliminate it. Electrolysis, when completed properly, permanently destroys the follicle. Maintained consistently through your treatment plan, the results are lasting.',
  },
  {
    category: 'basics',
    question: 'What methods does Ruth use?',
    answer:
      'Ruth works with both the Shortwave (Thermolysis) method and the Blend method. Thermolysis uses high-frequency current to create heat in the follicle. Blend combines galvanic current with thermolysis for a more thorough effect on certain hair types. The best method for you depends on your hair, skin, and treatment area — which Ruth will assess during your consultation.',
  },
  {
    category: 'basics',
    question: 'How does electrolysis compare to laser hair removal?',
    answer:
      'Laser hair removal works on a different principle — it targets pigment in the hair shaft and can reduce hair growth significantly, but it is not permanent, and it does not work on all hair types or skin tones. Electrolysis treats each follicle individually regardless of hair color or skin tone. For truly permanent results, electrolysis is the only clinically proven option.',
  },

  // Treatment Process
  {
    category: 'treatment',
    question: 'How many sessions will I need?',
    answer:
      'This varies significantly depending on the area, hair density, hair type, and your hormonal situation. Most clients require multiple sessions per area spread over several months, because hair grows in cycles and only actively growing follicles can be effectively treated at any one session. A realistic timeline is outlined during your consultation — Ruth won\'t give you a vague estimate. She\'ll tell you what to expect honestly.',
  },
  {
    category: 'treatment',
    question: 'Why do multiple sessions take so long?',
    answer:
      'Hair grows in three distinct phases — actively growing, transitional, and resting. Electrolysis can only permanently treat a follicle when it is in the active growth phase. Since not all follicles are active at the same time, multiple sessions spaced appropriately are necessary to catch each follicle at the right point in its cycle. This is not a limitation unique to Ruth — it is simply how hair biology works.',
  },
  {
    category: 'treatment',
    question: 'What areas can be treated?',
    answer:
      'Virtually any area where hair grows can be treated. Common areas include upper lip, chin, jawline, eyebrows, neck, sideburns, underarms, arms, legs, abdomen, back, chest, bikini area, and sensitive areas. If you have a specific area in mind, ask during your consultation.',
  },
  {
    category: 'treatment',
    question: 'How should I prepare for a session?',
    answer:
      'The hair in the treatment area should be allowed to grow naturally for at least a few days before your appointment — do not wax, tweeze, or use depilatory creams beforehand (trimming is fine). Come with clean skin and no heavy lotion on the treatment area. Avoid caffeine before your appointment if you\'re particularly sensitive to discomfort. Stay hydrated.',
  },

  // Comfort & Aftercare
  {
    category: 'comfort',
    question: 'Does electrolysis hurt?',
    answer:
      'There is a sensation — most clients describe it as a brief warmth, a slight sting, or a quick snap, depending on the area and their sensitivity. The face and sensitive areas tend to be more noticeable than legs or arms. Many clients tolerate it well without any numbing. For those who are more sensitive, topical numbing cream applied before the appointment can help significantly. Ruth works at a pace that keeps client comfort in mind.',
  },
  {
    category: 'comfort',
    question: 'What should I expect after a treatment?',
    answer:
      'Some temporary redness, slight swelling, or small bumps around the treated follicles are normal and typically resolve within a few hours to a day. More sensitive areas may stay slightly pink for longer. Avoid direct sun, heavy sweat, and harsh skincare products on treated areas for 48 hours. Ruth will walk you through aftercare specifics after your first session.',
  },
  {
    category: 'comfort',
    question: 'Is there any recovery time?',
    answer:
      'Generally no. Most clients resume normal activity immediately. You may want to avoid a gym or outdoor activity in the direct sun for 24 hours if the treated area is on the face or particularly sensitive. For most treatments, you\'re fine to go about your day.',
  },

  // Scheduling & Pricing
  {
    category: 'scheduling',
    question: 'How do I book an appointment?',
    answer:
      'All appointments are by arrangement directly with Ruth. You can call or use the contact form on this site to reach out. New clients are encouraged to start with a free consultation before booking their first treatment session.',
  },
  {
    category: 'scheduling',
    question: 'What are the session lengths and pricing?',
    answer:
      'Sessions are available in 15, 30, 45, and 60-minute increments depending on the area and goals. Pricing is based on session length. Please contact Ruth directly for current rates — she will provide clear, upfront information without any surprises.',
  },
  {
    category: 'scheduling',
    question: 'Do you have a cancellation policy?',
    answer:
      'Ruth asks for reasonable notice if you need to cancel or reschedule — 24 hours when possible. Life happens, and she understands that. Consistent attendance is part of what makes a treatment plan effective, so staying on schedule helps everyone.',
  },

  // Suitability
  {
    category: 'suitability',
    question: 'Does electrolysis work on all skin tones and hair colors?',
    answer:
      'Yes — this is one of the key advantages of electrolysis over laser. Because it works at the follicle level rather than targeting pigment, electrolysis is effective on all skin tones and all hair colors, including light, fine, grey, and red hair that laser cannot reliably treat.',
  },
  {
    category: 'suitability',
    question: 'Is electrolysis suitable for hormonal hair growth (PCOS, menopause, etc.)?',
    answer:
      'Electrolysis can absolutely help with hormonally-driven hair growth, and many clients with PCOS, menopause-related changes, or other hormonal conditions find it very effective. It\'s worth noting that if the underlying hormonal cause continues, new follicles may occasionally activate — which is why ongoing maintenance sessions can be part of a long-term plan for some clients. Ruth will discuss this honestly during your consultation.',
  },
  {
    category: 'suitability',
    question: 'Is electrolysis appropriate for transgender clients?',
    answer:
      'Absolutely. Ruth welcomes all clients regardless of gender identity and has experience working with transgender and nonbinary individuals seeking facial clearance or body hair removal. You will be treated with professionalism, respect, and no assumptions about your situation or goals.',
  },

  // Getting Started
  {
    category: 'consultation',
    question: 'What happens at the initial consultation?',
    answer:
      'The consultation is a conversation — no treatment happens at this visit unless you want to try a brief sample. Ruth will learn about what you\'re hoping to achieve, assess the area, explain the process and what to realistically expect, and outline a treatment plan. You\'ll leave with a clear sense of whether electrolysis makes sense for your goals and what the path forward looks like.',
  },
  {
    category: 'consultation',
    question: 'Is the consultation really free?',
    answer:
      'Yes, completely. The consultation is a no-charge, no-commitment conversation. It exists so you can make an informed decision. There is no pressure to book treatment, and no charge if you decide electrolysis isn\'t for you.',
  },
]
