# Dennis & Jaelly Prieto · Epique Realty

South Florida luxury real estate site. React + Vite + Tailwind, deploys to Vercel, points at **PrietoReal.Estate**.

---

## What this is

A single-page React application with ten pages routed by internal state. Built with Vite. Styled with Tailwind CSS (compiled at build time). Uses `lucide-react` for icons and `recharts` for charts in the calculators.

The brand portrait, all logos, and the entire design system live inline in `src/App.jsx`. No external assets to host. No CMS. No backend — forms POST to Formspree, scheduling opens Calendly.

---

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:5173. Hot-reload edits to `src/App.jsx` show up immediately.

## Building for production

```bash
npm run build
npm run preview
```

The build output goes into `dist/`. That's what Vercel deploys.

---

## Deploying to Vercel

Every push to the `main` branch auto-deploys to production. Vercel auto-detects Vite — accept the default build settings.

## What's wired up

- **Formspree forms:** Contact, Buyer Questionnaire, Canada Access Request — IDs in the `FORMSPREE` constant in `src/App.jsx`.
- **Calendly:** points at `calendly.com/dennisprieto/private-consultation`.
- **Brand portrait:** embedded as base64 in the `PRIETO_PORTRAIT` constant.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS 3 (compiled at build time)
- lucide-react (icons)
- recharts (calculator charts)

## File map

```
.
├── index.html              # HTML shell, fonts, SEO meta
├── package.json            # Dependencies + scripts
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS pipeline
├── vercel.json             # SPA rewrites for Vercel
├── .gitignore
└── src/
    ├── main.jsx            # React entry
    ├── index.css           # Tailwind directives + base styles
    └── App.jsx             # The entire site
```
