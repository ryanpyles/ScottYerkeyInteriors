# Scott Arthur Yerkey Interiors

Portfolio website for **Scott Arthur Yerkey Interiors** — a luxury interior architecture and design studio based in Chicago, Illinois.

**Live site:** [scottarthuryerkey.com](https://scottarthuryerkey.com)

---

## Overview

A single-page portfolio application built with React and Vite. Features a signature intro animation, parallax scroll gallery, per-project case study pages, and a contact form powered by Resend. All project photography is served from Supabase Storage.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Routing | React Router v6 |
| Image Storage | Supabase Storage |
| Email | Resend (`/api/contact` serverless function) |
| Hosting | Vercel |
| SEO | react-helmet (per-page meta), JSON-LD structured data |

---

## Project Structure

```
├── api/
│   └── contact.js          # Vercel serverless function — sends inquiry emails via Resend
├── public/
│   ├── sitemap.xml          # Full sitemap with image extensions for all 7 project pages
│   ├── robots.txt
│   ├── llms.txt             # AI crawler sitemap
│   └── signature-*.svg      # Wordmark assets
├── src/
│   ├── components/
│   │   └── portfolio/       # All active UI components
│   │       ├── Navigation.jsx
│   │       ├── Hero.jsx
│   │       ├── Philosophy.jsx
│   │       ├── Residences.jsx
│   │       ├── Approach.jsx
│   │       ├── Recognition.jsx
│   │       ├── Inquiry.jsx
│   │       ├── Footer.jsx
│   │       ├── ProjectPage.jsx
│   │       └── IntroAnimation.jsx
│   ├── lib/
│   │   └── supabase.js      # Project data + Supabase Storage URLs
│   └── App.jsx              # Routes: / and /projects/:slug
├── index.html               # Meta tags, Open Graph, JSON-LD schemas
├── vercel.json              # SPA rewrite (excludes /api/)
└── tailwind.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Resend](https://resend.com) account with `scottarthuryerkey.com` verified as a sending domain
- Supabase project with `Projects` and `Hero` storage buckets (images already uploaded)

### Install & Run

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

### Build

```bash
npm run build
```

Generates `dist/` — also runs `tools/generate-llms.js` to update `public/llms.txt`.

---

## Environment Variables

Set in Vercel project settings (Settings → Environment Variables):

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) — required for contact form |

No `.env` file is needed locally unless you want to test the serverless function. For local API testing create `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
```

---

## Contact Form

`POST /api/contact` accepts JSON:

```json
{
  "name": "Full Name",
  "email": "sender@example.com",
  "project": "Residential",
  "message": "Your message here."
}
```

Sends a formatted HTML email to `chris@scottarthuryerkey.com` with `replyTo` set to the sender's address. Requires `RESEND_API_KEY` set in Vercel environment variables and the sending domain verified in the Resend dashboard.

---

## Project Pages

Each project lives at `/projects/:slug`. Slugs:

| Project | Slug |
|---|---|
| The Four Seasons Residences | `the-four-seasons-residences` |
| Sunset Lane | `sunset-lane` |
| Lakeside | `lakeside` |
| Highland Park | `highland-park` |
| Rancho Mirage | `rancho-mirage` |
| Halco Dunes | `halco-dunes` |
| W. Winona | `w-winona` |

Project data (title, description, location, year, gallery image URLs) is defined in `src/lib/supabase.js`.

---

## Deployment

The project deploys automatically to Vercel on push to `main`. To deploy manually:

```bash
npx vercel deploy --prod
```

The `vercel.json` rewrite serves the React SPA for all routes except `/api/*`, which routes to the serverless contact function.

---

## DNS Setup

The domain is registered and DNS is managed through Hostinger. MX records (email) remain on Hostinger. Web traffic routes to Vercel via:

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cns.vercel-dns.com` |

---

## Credits

**Studio:** Scott Arthur Yerkey Interiors
**Design & Development:** Ryan J. Pyles — [FORMÆTRIX](https://www.formaetrix.com)
