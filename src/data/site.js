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
  { href: '/join', label: 'For Agents' },
  { href: '/about', label: 'About' },
];

// Client testimonials (confirmed real by Dennis, Nov 2026).
// Client testimonials, in the clients' own words.
// `pull` is shown large and must be an exact excerpt of `full` (a trailing … marks a cut). `href` (optional) links to the public review.
export const CLIENT_TESTIMONIALS = [
  {
    pull: 'They deliver results and treat their clients like people, not just transactions.',
    full: [
      'Selling our home in Coral Gables with Dennis and Jaelly Prieto was an outstanding experience from start to finish. We had lived in the house for many years and were naturally a little emotional about letting it go, but Dennis and Jaelly handled everything with professionalism, care, and real expertise.',
      'They came in with a clear plan. The staging advice, the pricing strategy, and the marketing were all thoughtful and effective. Our home looked its absolute best, and the exposure they generated brought in serious, qualified buyers quickly. What impressed us most was how well they negotiated. They protected our interests at every step, kept us informed without overwhelming us, and never pressured us into decisions we weren’t comfortable with.',
      'The entire process felt organized and low-stress. Contracts, inspections, repairs, and closing were managed smoothly, and we always felt like we had a strong advocate in our corner. In a competitive market like Coral Gables, that level of guidance and calm confidence made a real difference.',
      'We closed at a price we were very happy with and walked away feeling respected and well taken care of. If you’re thinking about selling in Coral Gables, we highly recommend Dennis and Jaelly Prieto. They deliver results and treat their clients like people, not just transactions.',
    ],
    a: 'Sandra & Michael R.',
    r: 'Sellers · Coral Gables',
  },
  {
    pull: 'Dennis & Jaelly’s negotiation skills saved us real money…',
    full: [
      'Working with Dennis & Jaelly on our Pinecrest home was one of the best decisions we made. From the very first showing, they understood exactly what we were looking for — a quiet, family-friendly neighborhood with strong schools, mature trees, and a home that felt like a true sanctuary.',
      'Dennis & Jaelly were proactive, transparent, and incredibly sharp on the market. When a property we loved went under contract with another buyer, they didn’t just move on — they kept us informed, managed our expectations, and within days had us back in front of a better opportunity that ended up being the one. Dennis & Jaelly’s negotiation skills saved us real money and protected us from several potential pitfalls during inspections and contract review.',
      'What stood out most was the peace of mind. Buying in a competitive area like Pinecrest can feel overwhelming, but they made the entire process feel controlled and clear. We closed on a beautiful home we’re proud to own, and we still talk about how smooth the experience was.',
      'If you’re looking to buy in Pinecrest (or anywhere in the area), we wouldn’t hesitate to recommend Dennis & Jaelly. Truly exceptional service.',
    ],
    a: 'Daniel & Olivia P.',
    r: 'Buyers · Pinecrest',
  },
  {
    pull: 'They lead with strategy, not slogans.',
    full: ['From the first conversation, I knew this was different. They lead with strategy, not slogans.'],
    a: 'Rachel S.',
    r: 'Seller · Brickell',
  },
];

export const AGENT_TESTIMONIALS = [
  { q: 'The economics, the technology, the support: every category was an upgrade over my last brokerage.', a: 'Frank Angelucci Jr', r: 'Agent · Fort Lauderdale' },
  { q: 'I had three brokerages courting me. Epique was the only one that built me a model before I asked.', a: 'Johanna Beras', r: 'Agent · Miami' },
  { q: 'First brokerage where I actually feel like an owner, not a tenant. The revenue share is real.', a: 'Liza Michelle Martinez Feliciano', r: 'Agent · Miami' },
];
