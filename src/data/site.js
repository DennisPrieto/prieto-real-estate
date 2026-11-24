// Single source of truth for contact details, form endpoints and shared copy.

export const SITE = {
  name: 'Jaelly & Dennis Prieto',
  brokerage: 'Epique Realty, Inc.',
  brokerageAddress: '100 S Ashley Dr, Ste 600, Tampa, FL 33602',
  url: 'https://www.prietoreal.estate',
  calendly: 'https://calendly.com/dennisprieto/private-consultation',
  region: 'Miami-Dade and Broward',
};

export const PEOPLE = {
  dennis: {
    name: 'Dennis Prieto',
    role: 'Epique Miami Area Leader',
    license: 'SL3347930',
    email: 'DennisPrieto@Epique.me',
    phone: '305.496.3796',
    tel: '+13054963796',
    linkedin: 'https://www.linkedin.com/in/dennisprieto/',
  },
  jaelly: {
    name: 'Jaelly Prieto',
    role: 'Epique Florida Ambassador, Hispanic Division & Growth',
    license: 'SL3362729',
    email: 'JaellyPrieto@Epique.me',
    phone: '786.238.1150',
    tel: '+17862381150',
    instagram: 'https://www.instagram.com/jaellyprieto/',
  },
};

// Formspree form IDs (the part after /f/ in the endpoint).
export const FORMSPREE = {
  contact: 'mjgzlepe',
  buyerQuestionnaire: 'xaqkvdvd',
  canadaAccess: 'mgoqdldj',
};

export const NAV = [
  { href: '/residential', label: 'Residential' },
  { href: '/commercial', label: 'Commercial & Land' },
  { href: '/sellers', label: 'Sellers' },
  { href: '/buyers', label: 'Buyers' },
  { href: '/join', label: 'Join' },
  { href: '/about', label: 'About' },
];

// Client testimonials (confirmed real by Dennis, Nov 2026).
export const CLIENT_TESTIMONIALS = [
  {
    q: 'The level of representation Epique provides is unmatched. They sold our home for 14% over ask in seven days, and it felt effortless.',
    a: 'Sandra & Michael R.',
    r: 'Sellers · Coral Gables',
  },
  {
    q: 'We bought our generational home through Epique. The discretion was as remarkable as the result.',
    a: 'Daniel & Olivia P.',
    r: 'Buyers · Pinecrest',
  },
  {
    q: 'From the first conversation, I knew this was different. They lead with strategy, not slogans.',
    a: 'Rachel S.',
    r: 'Seller · Brickell',
  },
];

export const AGENT_TESTIMONIALS = [
  { q: 'The economics, the technology, the support: every category was an upgrade over my last brokerage.', a: 'Frank Angelucci Jr', r: 'Agent · Fort Lauderdale' },
  { q: 'I had three brokerages courting me. Epique was the only one that built me a model before I asked.', a: 'Johanna Beras', r: 'Agent · Miami' },
  { q: 'First brokerage where I actually feel like an owner, not a tenant. The revenue share is real.', a: 'Liza Michelle Martinez Feliciano', r: 'Agent · Miami' },
];
