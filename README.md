# Dennis & Jaelly Prieto · Epique Realty

South Florida luxury real estate site. React + Vite, deploys to Vercel, points at **PrietoReal.Estate**.

---

## What this is

A single-page React application with ten pages routed by internal state (no react-router — clean and fast). Built with Vite. Styled with Tailwind utility classes loaded via the Tailwind Play CDN in `index.html`. Uses `lucide-react` for icons and `recharts` for charts in the calculators.

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
npm run preview   # optional: previews the dist/ build at http://localhost:4173
```

The build output goes into `dist/`. That's what Vercel deploys.

---

## Deploying to Vercel (first time)

### 1. Push this folder to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/prieto-real-estate.git
git branch -M main
git push -u origin main
```

### 2. Connect Vercel

1. Go to **vercel.com**, sign up with your GitHub account (free).
2. Click **Add New → Project**.
3. Pick the `prieto-real-estate` repo. Vercel auto-detects Vite — accept the defaults:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. ~60 seconds later you'll have a live URL like `prieto-real-estate.vercel.app`.

### 3. Add your custom domain

1. In the Vercel project, go to **Settings → Domains**.
2. Add **prietoreal.estate** and **www.prietoreal.estate**.
3. Vercel will show you two DNS records to add — typically:
   - An **A** record on `@` pointing to `76.76.21.21`
   - A **CNAME** on `www` pointing to `cname.vercel-dns.com`

### 4. Update DNS at Squarespace

1. Log into Squarespace.
2. Go to **Settings → Domains → prietoreal.estate → DNS Settings**.
3. **Remove** any existing A records on `@` and CNAME on `www` that Squarespace added.
4. **Add** the two records Vercel showed you in step 3.
5. Save.

DNS propagation usually takes 5–60 minutes, occasionally up to 24 hours. Vercel will show a green checkmark once it sees the records. Then **PrietoReal.Estate** loads the site, automatically HTTPS-secured.

### 5. Future updates

Every `git push` to the `main` branch auto-deploys to production. There's no separate build/upload step.

---

## What's wired up

- **Formspree forms:** Contact, Buyer Questionnaire, Canada Access Request — IDs are in `src/App.jsx` near the top in the `FORMSPREE` constant. To redirect submissions to a different email, log into the corresponding form at **formspree.io** and update the recipient list there.
- **Calendly:** Schedule buttons and the embedded widget on the Contact page point at `calendly.com/dennisprieto/private-consultation`. To change, search `App.jsx` for `dennisprieto/private-consultation`.
- **Brand portrait:** The About page hero image is embedded as a base64 data URI in the `PRIETO_PORTRAIT` constant near the top of `App.jsx`. To swap, regenerate the data URI from a new photo and replace the constant value.

## Tech stack

- React 18
- Vite 5
- Tailwind CSS (via CDN, configured inline in `index.html`)
- lucide-react (icons)
- recharts (calculator charts)
- Formspree (form submissions)
- Calendly (scheduling)

## File map

```
.
├── index.html              # HTML shell, fonts, Tailwind CDN, SEO meta
├── package.json            # Dependencies + npm scripts
├── vite.config.js          # Vite build config
├── vercel.json             # SPA rewrites for Vercel
├── .gitignore
└── src/
    ├── main.jsx            # React entry point (mounts App)
    └── App.jsx             # Entire site — ~2,500 lines, all components
```

---

## Support

The Vercel free tier handles this site forever as long as monthly traffic stays under ~100GB bandwidth — enough for tens of thousands of monthly visits. If you ever outgrow it, the next tier is $20/month.
