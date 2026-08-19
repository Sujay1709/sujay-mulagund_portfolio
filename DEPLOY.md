# Run & Deploy Guide

A complete, start-to-finish guide for running this portfolio locally and
publishing it. No prior experience with the stack required.

---

## 1. Prerequisites

You need **Node.js 18 or newer** (20+ recommended) and **npm** (bundled with Node).

Check what you have:

```bash
node -v
npm -v
```

If Node is missing, install it from https://nodejs.org (the "LTS" build) or via a
version manager like `nvm`.

---

## 2. Get the code

If you downloaded the zip, unzip it and open a terminal **inside** the resulting
`sujay-portfolio-2026` folder:

```bash
cd path/to/sujay-portfolio-2026
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

---

## 5. Build for production & preview

```bash
npm run build      # type-checks, then outputs static files to dist/
npm run preview    # serves dist/ locally so you can test the real build
```

`npm run preview` prints another localhost URL — open it to confirm the built
site behaves exactly as it will once deployed.

---

## 6. Deploy to Vercel (free)

### 6a. Push to GitHub

```bash
git init
git add .
git commit -m "Portfolio site"
```

Create an empty repo on github.com (e.g. `sujay-portfolio`), then:

```bash
git remote add origin https://github.com/Sujay1709/sujay-portfolio.git
git branch -M main
git push -u origin main
```

### 6b. Import into Vercel

1. Go to https://vercel.com and sign in **with GitHub**.
2. **Add New → Project** and pick the repo.
3. Vercel auto-detects Vite and fills in:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**.

In ~30 seconds you get a live URL like `https://sujay-portfolio.vercel.app`.
Every `git push` to `main` redeploys automatically.

---

## 7. Add your own domain (later)

When you buy a domain (e.g. `sujaymulagund.com`):

1. Vercel → project → **Settings → Domains → Add**, type the domain.
2. Add the DNS records Vercel shows you at your registrar:
   - **A** record: `@ → 76.76.21.21` (or the CNAME Vercel gives you)
   - **CNAME** record: `www → cname.vercel-dns.com`
3. HTTPS is issued automatically within a few minutes.

---

## 8. Add certificate images

1. Put each image in `public/certs/` (PNG or JPG, ideally square-ish,
   ~600 px is plenty). Example: `public/certs/datacamp-aeds.png`.
2. Open `src/Portfolio.tsx`, find the `certs` array, and uncomment / set the
   `img` field to match the file path:

   ```ts
   {
     title: 'AI Engineer for Data Scientists (Associate)',
     issuer: 'DataCamp',
     date: 'Jul 2026',
     img: '/certs/datacamp-aeds.png',   // <-- points at public/certs/...
     href: 'https://www.datacamp.com/certificate/...',
   },
   ```
3. Save — the dev server updates instantly. Add or remove entries freely.

> Paths that start with `/` resolve to the `public/` folder, so `/certs/x.png`
> means `public/certs/x.png`.

---

## 9. Edit your content

Everything lives in **`src/Portfolio.tsx`**, in plain arrays near the top:
`projects`, `experience`, `education`, `certs`, `toolkit`, and `systems`.
Page title / social tags are in `index.html`; the social image is
`public/og.png`.

---

## Troubleshooting

- **`command not found: npm`** — Node isn't installed or not on your PATH.
  Reinstall from nodejs.org and reopen the terminal.
- **Port 5173 already in use** — another dev server is running; stop it, or
  Vite will offer the next free port automatically.
- **Blank page after deploy** — make sure the Vercel output directory is `dist`
  (it is by default for Vite).
- **A cert card shows initials instead of an image** — the `img` path is unset
  or the file isn't in `public/certs/`. See section 8.
- **Fonts look plain on first paint** — the Google Fonts stylesheet loads at
  runtime; it settles in a moment and falls back to system fonts gracefully.
