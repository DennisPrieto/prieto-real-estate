# prietoreal.estate

Website for Jaelly & Dennis Prieto, Epique Realty: luxury residential and commercial land advisory across Miami-Dade and Broward.

## Stack

- [Astro](https://astro.build) static site, one real URL per page
- React islands for forms (`src/islands/InquiryForm.jsx`) and the agent calculators (`src/islands/recruiting/`)
- Forms post to Formspree (IDs in `src/data/site.js`); scheduling via Calendly
- Deployed on Vercel from GitHub (`vercel.json` sets the Astro build)

## Where to edit

| What | File |
| --- | --- |
| Phone, email, license numbers, Formspree IDs, testimonials | `src/data/site.js` |
| Neighborhood and commercial page copy | `src/data/places.js` |
| Form fields | `src/data/forms.js` |
| Colors and type | `src/styles/global.css` |
| Bay chart artwork | `src/data/bay.js`, `src/components/BayChart.astro` |
| Agent recruiting pages (/join) | `src/islands/recruiting/Recruiting.jsx` |

## Run locally

```
npm install
npm run dev
```
