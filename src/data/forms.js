// Field sets for the InquiryForm island.
const contactBlock = [
  { name: 'name', label: 'Full name *', type: 'text', required: true, half: true, autoComplete: 'name', placeholder: 'Jane Rivera' },
  { name: 'email', label: 'Email *', type: 'email', required: true, half: true, autoComplete: 'email', placeholder: 'jane@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', autoComplete: 'tel', placeholder: '(305) 555-0123' },
];

export const VALUATION_FIELDS = [
  { name: 'address', label: 'Property address *', type: 'text', required: true, autoComplete: 'street-address', placeholder: '1234 Granada Blvd, Coral Gables, FL' },
  { name: 'property_type', label: 'Property type', type: 'select', half: true, options: ['Single-family home', 'Condominium', 'Townhome', 'Multifamily (2–4 units)', 'Land or lot', 'Commercial'] },
  { name: 'timeline', label: 'Timeline', type: 'select', half: true, options: ['Ready now', 'Within 3 months', '3–12 months', 'Exploring only'] },
  ...contactBlock,
  { name: 'message', label: 'Anything we should know?', type: 'textarea', placeholder: 'Recent renovations, tenants, a past listing that did not sell, a deadline.' },
];

export const COMMERCIAL_FIELDS = [
  { name: 'interest', label: 'I am *', type: 'chips', required: true, options: ['An owner', 'A developer', 'An investor', 'An owner-user'] },
  { name: 'site', label: 'Site address or area', type: 'text', placeholder: 'Folio, address or corridor' },
  { name: 'asset', label: 'Asset type', type: 'select', half: true, options: ['Development land', 'Assemblage (multiple parcels)', 'Industrial or warehouse', 'Retail or mixed-use', 'Multifamily', 'Other'] },
  { name: 'need', label: 'What do you need?', type: 'select', half: true, options: ['Opinion of value', 'Highest and best use', 'Live Local Act review', 'Find a site', 'Sell or assemble', 'Not sure yet'] },
  ...contactBlock,
  { name: 'message', label: 'Notes', type: 'textarea', placeholder: 'Parcel count, zoning, timing, what you are weighing.' },
];

export const CONTACT_FIELDS = [
  ...contactBlock,
  { name: 'role', label: 'I am interested in', type: 'chips', options: ['Selling', 'Buying', 'Commercial or land', 'Something else'] },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'A line or two about what you are planning.' },
];

export const BUYER_FIELDS = [
  { name: 'looking_for', label: 'What are you buying? *', type: 'chips', required: true, options: ['Primary residence', 'Second home', 'Investment', 'Not sure yet'] },
  { name: 'budget', label: 'Target budget *', type: 'select', required: true, half: true, options: ['Under $750k', '$750k – $1.5M', '$1.5M – $3M', '$3M – $6M', '$6M+'] },
  { name: 'preferred_area', label: 'Preferred area', type: 'select', half: true, options: ['Coral Gables', 'Coconut Grove', 'Brickell', 'Edgewater', 'Pinecrest', 'Key Biscayne', 'Broward', 'Open to suggestions'] },
  { name: 'timeline', label: 'Timeline *', type: 'chips', required: true, options: ['Now', '1–3 months', '3–6 months', 'Just exploring'] },
  { name: 'pre_approval', label: 'Financing', type: 'chips', options: ['Pre-approved', 'Need a lender', 'Paying cash', 'Foreign national financing'] },
  { name: 'name', label: 'Full name *', type: 'text', required: true, half: true, autoComplete: 'name', placeholder: 'Jane Rivera' },
  { name: 'email', label: 'Email *', type: 'email', required: true, half: true, autoComplete: 'email', placeholder: 'jane@example.com' },
];
