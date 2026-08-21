# Sujay Mulagund — AI Engineer Portfolio

Live at **[sujaygopal.space](https://www.sujaygopal.space)**

A single-page AI-engineer portfolio with a cursor-reactive particle background, an
immersive terminal-style hero, and embedded live-system demos (model regression
detection, RAG query), backed by real project, experience, education, and
certificate data.

![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)

---

## Stack

Vite + React 19 + TypeScript + Tailwind CSS v4 + [Motion](https://motion.dev)
(entrance/scroll animations). No backend required to run the site — the two
live demos below optionally call Vercel serverless functions.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

```bash
npm run build      # type-checks (tsc -b) then builds to dist/
npm run preview    # serve the production build locally
```

## What's on the page

- **Hero** — immersive terminal showing the live Model Regression Detector
- **Live Systems** — embedded RAG pipeline query demo + architecture overview
- **Selected Work** — Model Regression Detection System, DocuMind (RAG pipeline),
  AutoHub (real-time AI backend), Conversational SQL Assistant
- **Experience** — ChiSquareX Technologies, PractWorks
- **Education & Credentials** — M.S. Data Science @ ASU, B.Tech CSE @ SRM, plus
  four certificate cards (OpenAI, DataCamp, AWS Academy, Google AI Essentials)
  with verify links
- **Toolkit** — skills grouped by domain (data engineering, LLM & AI, cloud &
  DevOps, languages & data)
- **Listening** — curated Weeknd + old-Bollywood track lists, each linking to
  Spotify search (swap in a real playlist embed via `SPOTIFY_EMBED_URL` near
  the top of `src/Portfolio.tsx`)
- **Contact** — email, LinkedIn, GitHub

All content lives in plain arrays near the top of **`src/Portfolio.tsx`** —
edit `projects`, `experience`, `education`, `certs`, `toolkit`, and `playlists`
directly.

## Live demos & API

Two Vercel serverless functions back the "Live Systems" section:

| Route | File | Purpose |
|---|---|---|
| `POST /api/regression-demo` | `api/regression-demo.ts` | Simulated model-regression detection run |
| `POST /api/rag-query` | `api/rag-query.ts` | Simulated RAG query response |

Both currently return **simulated** output (randomized accuracy/drift, canned
answers) rather than calling a real ML backend — wire in a real endpoint by
editing those two files before presenting the demos as production systems, or
soften the section copy in `Portfolio.tsx` to describe them as illustrative.

For local development, `node mock-backend.js` runs an equivalent mock on port
3001 (see `vite.config.ts` for the dev proxy).

## Deployment

Hosted on Vercel, connected to this GitHub repo. Vercel's own Git integration
rebuilds and promotes to production automatically on every push to `main` —
no GitHub Actions secrets required for deploys.

`.github/workflows/ci.yml` is a separate build gate: it type-checks and builds
on every push/PR so a broken build is visible before merging.
`.github/workflows/healthcheck.yml` pings the live site every 15 minutes (set
the `SITE_URL` repo variable to `https://www.sujaygopal.space`).

To deploy manually instead:

```bash
npm i -g vercel   # once
vercel --prod
```

> **Note:** `DEPLOY.md`, `DEPLOYMENT.md`, `DOMAIN.md`, and `RELIABILITY.md` in
> this repo were written against a `sujaygopal.com` domain that was never
> purchased — the live domain is `sujaygopal.space`. Those files still need
> the same correction this README just got.

## Project structure

```
├── src/
│   ├── Portfolio.tsx   # entire page: content data + all sections
│   ├── api.ts          # client-side demo helpers
│   ├── main.tsx        # React entry point
│   └── index.css       # Tailwind import + accessibility rules
├── api/
│   ├── regression-demo.ts   # Vercel function: /api/regression-demo
│   └── rag-query.ts         # Vercel function: /api/rag-query
├── public/
│   ├── certs/           # certificate images used in Education & Credentials
│   ├── og.png           # social-preview image
│   └── status.html      # uptime status page
├── mock-backend.js      # local-dev mock for the two demo endpoints
├── vercel.json          # Vercel build config
└── package.json
```

`src/Portfolio.backup.tsx` is a snapshot from an earlier design pass and isn't
imported anywhere — safe to delete once you've confirmed you don't need it.

## Accessibility

- Respects `prefers-reduced-motion` (disables entrance/scroll animation, both
  in JS via `useReducedMotion()` and in CSS via a matching media query)
- Visible `:focus-visible` outline on all interactive elements
- Semantic HTML landmarks (`header`, `section`, `footer`)

## License

MIT

---

- **GitHub:** https://github.com/Sujay1709/sujay-mulagund_portfolio
- **Live site:** https://www.sujaygopal.space
- **LinkedIn:** https://linkedin.com/in/sujay-mulagund-0ab588269
- **Email:** sujaymulagund19@gmail.com
