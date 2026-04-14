# Oneir Solutions — Web (oneir-web)

Public marketing site for **Oneir Solutions** (ERP and accounting software). It is a bilingual (English / Canadian French) [Next.js](https://nextjs.org) App Router application with static generation for localized routes, SEO metadata, and integrated lead capture.

## Features

- **Localized experience** — Routes under `/en` and `/fr` with JSON translations (`src/locales/`, `src/lib/translations.ts`) and a language switcher.
- **Home and product storytelling** — Hero, features, financials, ERP solutions, industries, “sell anywhere,” journey, and media/article sections driven by shared components and locale data.
- **Content sections** — Dedicated pages for About Us, Support, Product Manuals, Media & Articles, Common Questions, Success Stories (hub plus individual case studies), Sign-in, and client-side Search.
- **Demo / contact funnel** — Multi-step demo modal with honeypot-style checks; submissions hit `POST /api/demo-request` and are emailed via [Resend](https://resend.com).
- **Optional file uploads** — Attachments use client-side uploads to [Cloudinary](https://cloudinary.com) with an unsigned preset; only `https://res.cloudinary.com/...` URLs are accepted by the API.
- **Support integrations** — Jira Service Management widget helpers for opening support from the UI (`src/lib/atlassianJsdWidget.ts`).
- **Analytics** — Optional Google Analytics 4 (page views plus delegated link, button, and form events) when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- **SEO** — Per-route metadata, JSON-LD helpers, `sitemap.xml`, `robots.txt`, Open Graph / Twitter image routes, and a local `npm run seo:audit` script to sanity-check key pages.

## Tech stack

- **Next.js** 16 (App Router, Turbopack in dev/build scripts)
- **React** 19, **TypeScript** 5
- **Tailwind CSS** 4
- **Framer Motion** for motion primitives
- **Resend** for transactional email from the demo API route

## Getting started

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

The app serves at [http://localhost:3000](http://localhost:3000). The root `src/app/page.tsx` redirects to the default locale (`/en`).

Production-like run:

```bash
npm run build
npm start
```

Other scripts:

- `npm run lint` — ESLint
- `npm run seo:audit` — Static checks on metadata patterns for listed routes (`scripts/seo-audit.mjs`)

## Environment variables (deployment)

Configure these in your host (for example Vercel **Environment Variables**) or in `.env.local` for local development. Names and comments are also in [.env.example](.env.example).

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | **Yes** for demo email | Resend API key used by `src/app/api/demo-request/route.ts`. |
| `RESEND_FROM` | **Yes** for demo email | Verified sender address in Resend (must match a domain you verified, or use Resend’s test sender while developing). |
| `DEMO_REQUEST_TO` | **Yes** for demo email | Inbox(es) that receive demo form notifications. |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name; without it, the demo modal skips client uploads (attachments optional). |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | No | **Unsigned** upload preset name for demo attachments. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | GA4 measurement ID (e.g. `G-XXXXXXXXXX`); if unset, analytics scripts are not injected. |

**Deployment notes**

- **Demo requests**: All three Resend variables must be non-empty or the API returns `500` with a generic “Email is not configured” style response.
- **Cloudinary**: Use an unsigned preset restricted as appropriate; the server only accepts HTTPS URLs on `res.cloudinary.com`.
- **Public vars**: Any `NEXT_PUBLIC_*` value is exposed to the browser—do not put secrets there.

## Repository structure

```text
Oneir-Revamp/
├── public/                 # Static assets (images, SVGs, icons referenced by URL)
├── scripts/
│   └── seo-audit.mjs       # Metadata / alternates checks for major routes
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── layout.tsx      # Root layout: fonts, org JSON-LD, GoogleAnalytics wrapper
│   │   ├── page.tsx        # Redirects / → /en
│   │   ├── globals.css     # Global styles
│   │   ├── robots.ts       # robots.txt
│   │   ├── sitemap.ts      # sitemap.xml (base URL + en/fr paths)
│   │   ├── icon.tsx, apple-icon.tsx, opengraph-image.tsx, twitter-image.tsx
│   │   ├── [locale]/       # All localized pages + nested layouts/metadata
│   │   └── api/demo-request/route.ts
│   ├── components/         # UI sections, modals, navbar, footer, motion, analytics
│   ├── context/            # React context (e.g. demo modal)
│   ├── data/               # Structured data (e.g. common questions)
│   ├── lib/                # translations, SEO helpers, search index, analytics, widgets
│   └── locales/            # en.json / fr.json plus per-section JSON where split out
├── .env.example            # Template for required/optional env vars
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json           # Path alias @/* → src/*
└── eslint.config.mjs
```

### Path alias

Imports use `@/` for `src/` (see `tsconfig.json`).

### Important files (by concern)

| Area | Files |
|------|--------|
| Locales & i18n | `src/lib/translations.ts`, `src/locales/*.json`, `src/app/[locale]/layout.tsx` |
| Home page | `src/app/[locale]/page.tsx` |
| Demo + email | `src/components/DemoModal.tsx`, `src/context/DemoModalContext.tsx`, `src/app/api/demo-request/route.ts` |
| SEO | `src/lib/seo.ts`, `src/components/seo/JsonLd.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts` |
| Search | `src/lib/search-index.ts`, `src/app/[locale]/search/page.tsx`, `src/components/search/SearchPageContent.tsx` |
| Analytics | `src/lib/analytics.ts`, `src/components/analytics/GoogleAnalytics.tsx` |

When you add a new **localized** URL that should be indexed, update `LOCALIZED_PUBLIC_PATHS` in `src/app/sitemap.ts` (and run `npm run seo:audit` if the route is listed there).

## Deploying

Build output is a standard Next.js Node server or static segments as generated. On Vercel (or similar), set the environment variables above, connect the repository, and use the default Next.js build command (`next build`). Ensure your production `metadataBase` and sitemap base URL in code match your real domain if it differs from the current production URL.
