# Run & Deploy Guide

A complete, start-to-finish guide for running this portfolio locally and
shipping changes to production.

Live site: **https://www.sujaygopal.space**

---

## 1. Prerequisites

You need **Node.js 18 or newer** (20+ recommended) and **npm** (bundled with Node).

```bash
node -v
npm -v
```

If Node is missing, install it from https://nodejs.org (the "LTS" build) or via a
version manager like `nvm`.

---

## 2. Get the code

```bash
git clone https://github.com/Sujay1709/sujay-mulagund_portfolio.git
cd sujay-mulagund_portfolio
```

---

## 3. Install dependencies

Run once (and again whenever `package.json` changes):

```bash
npm install
```

This creates a `node_modules/` folder. It's git-ignored and never committed.

---

## 4. Run it locally (dev server)

```bash
npm run dev
```

Vite prints a URL — usually **http://localhost:5173**. Open it in your browser.
The page hot-reloads as you edit files; stop the server with `Ctrl + C`.

To exercise the two live-demo endpoints locally, run the mock backend in a
second terminal (`vite.config.ts` proxies `/api/*` to port 3001):

```bash
node mock-backend.js
```

---

## 5. Build for production & preview

```bash
npm run build      # type-checks with tsc, then outputs static files to dist/
npm run preview    # serves dist/ locally so you can test the real build
```

Always run `npm run build` before pushing. It runs `tsc -b` first, so it catches
the type errors that would otherwise fail the deploy.

---

## 6. Ship a change

The repo is already connected to Vercel. **Pushing to `main` deploys to
production automatically** — no secrets, no GitHub Actions setup, no manual step.

```bash
git add .
git commit -m "describe the change"
git push origin main
```

Vercel builds and promotes in ~30–60 seconds. Watch it at
vercel.com → your project → **Deployments**.

### Deploying manually instead

```bash
npm i -g vercel   # once
vercel --prod
```

### Checking that it worked

Look at **https://www.sujaygopal.space** — or the project's no-hash alias
(`sujay-mulagund-portfolio.vercel.app`). Do **not** judge by a deployment URL
containing a random hash; those are permanent snapshots of one past build and
never update. See DOMAIN.md.

---

## 7. The domain

Already live and configured — `sujaygopal.space`, registered through Vercel, so
DNS and HTTPS are managed for you. Full details in **DOMAIN.md**.

---

## 8. Edit your content

Everything lives in **`src/Portfolio.tsx`**, in plain arrays near the top:
`projects`, `experience`, `education`, `certs`, `toolkit`, and `playlists`.
Page title and social tags are in `index.html`; the social image is
`public/og.png`.

To swap the Listening section from curated track lists to a real Spotify embed,
set `SPOTIFY_EMBED_URL` near the top of `Portfolio.tsx` (Spotify: open a
playlist → Share → Copy link, then change `/playlist/` to `/embed/playlist/`).

---

## 9. Add or replace certificate images

1. Put each image in `public/certs/` (JPG or PNG, roughly 3:2, ~600 px wide is
   plenty — the existing four are 50–110 KB each).
2. Open `src/Portfolio.tsx`, find the `certs` array, and point `img` at it:

   ```ts
   {
     title: 'AI Engineer for Data Scientists (Associate)',
     issuer: 'DataCamp',
     date: 'Jul 2026',
     img: '/certs/datacamp-ai-engineer.jpg',   // → public/certs/...
     href: 'https://www.datacamp.com/certificate/...',  // optional verify link
   },
   ```
3. Save — the dev server updates instantly.

> Paths starting with `/` resolve to `public/`, so `/certs/x.jpg` means
> `public/certs/x.jpg`.

---

## 10. The live-demo API

Two Vercel serverless functions back the "Live Systems" section. Vercel deploys
anything in `/api` automatically — no config needed.

| Route | File |
|---|---|
| `POST /api/regression-demo` | `api/regression-demo.ts` |
| `POST /api/rag-query` | `api/rag-query.ts` |

**Both currently return simulated output** — randomized accuracy/drift numbers
and canned answers, not results from a real model. The section copy on the page
calls them "real endpoints," which is technically true (they are live functions)
but misleading about what they compute. Before showing this to anyone
evaluating you, either wire in a real backend:

```ts
// api/regression-demo.ts
const response = await fetch('https://your-ml-backend.com/api/regression-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model_id: 'email-classifier' }),
});
return await response.json();
```

…or soften the copy in `Portfolio.tsx` to describe the demos as illustrative.

---

## Troubleshooting

- **`command not found: npm`** — Node isn't installed or not on your PATH.
  Reinstall from nodejs.org and reopen the terminal.
- **Port 5173 already in use** — another dev server is running; stop it, or
  Vite will offer the next free port automatically.
- **Build fails with `Invalid vercel.json`** — the config only supports a small
  set of keys. Keys like `domains` and the old object-form `env` are rejected;
  domains are managed in the Vercel dashboard, not in this file.
- **Blank page after deploy** — confirm the Vercel output directory is `dist`
  (it is by default for Vite).
- **A cert card shows no image** — the `img` path is unset or the file isn't in
  `public/certs/`. See section 9.
- **Deploy "didn't take"** — you're probably looking at a hash-containing
  deployment URL. See section 6.
