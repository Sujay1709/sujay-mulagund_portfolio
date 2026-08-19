# Sujay Mulagund — Portfolio

A fast, self-contained personal portfolio built as one product: a single-page,
editorial site with a light/dark toggle, positioned around AI engineering
(RAG pipelines, LLM evaluation, agent backends) on a data-engineering foundation.

- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4
- **No backend** — a static site you can host anywhere
- **All content lives in one file:** `src/Portfolio.tsx`

## Run it locally

Requires Node 18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally to check it
```

## Where to edit your content

Everything is in **`src/Portfolio.tsx`**, in plain arrays near the top:

| What | Edit this |
|------|-----------|
| Headline, intro, name | the `<section id="top">` block in the component |
| Projects | the `projects` array |
| Experience | the `experience` array |
| Education | the `education` array |
| Certifications | the `certifications` array |
| Skills | the `toolkit` array |
| System diagrams | the `systems` array (inline SVG) |
| Contact links | search for `mailto:` / `linkedin` / `github` |

Page title, description, and social-preview tags live in `index.html`.
The social image is `public/og.png` — regenerate or replace it anytime.

## Swap placeholders for real assets

The **Systems** section uses hand-drawn SVG architecture sketches. If you have
real screenshots or diagrams of your pipelines, drop them in `public/` and
replace the `render()` functions in the `systems` array with `<img>` tags.

## Extras

- `src/BrowserFrame.tsx` — a reusable "browser window" wrapper for creating
  mockup images of the site (used for case studies / LinkedIn). Not part of the
  live page; import it where you need it.

## Add your music (optional)

Open `src/Portfolio.tsx`, set `SPOTIFY_EMBED_URL` to your playlist's embed URL,
and a "Listening" section appears automatically. Leave it `''` to hide it.
(Spotify: open a playlist → Share → Copy link, then change `/playlist/` in the
URL to `/embed/playlist/`.)

## Deploy, domain & reliability

- **`DEPLOY.md`** — run locally and deploy to Vercel (free).
- **`DOMAIN.md`** — buy `sujaygopal.com` and connect DNS + HTTPS.
- **`RELIABILITY.md`** — the full "keep it from failing" loop: CI build gate,
  CDN/HTTPS, health-check workflow, uptime monitoring, and the status page at
  `/status.html`.
- `.github/workflows/` — CI build gate + scheduled health check.
- **`DOCKER.md`** — efficient multi-stage container (`Dockerfile` + `nginx.conf`)
  for hosting on any container platform.
