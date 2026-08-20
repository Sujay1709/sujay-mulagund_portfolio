# Sujay Mulagund — AI Workbench Portfolio

> Revolutionary AI engineer portfolio with live backend integration, cursor-reactive particles, and embedded working AI systems.

![Vite](https://img.shields.io/badge/Vite-8.2.1-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4?logo=tailwindcss)

---

## ✨ Features

### Design
- **Amber Accent (#fbbf24)** — Premium AI engineer branding
- **Cursor-reactive Particle Background** — 80 particles, data-driven visual density
- **Full-viewport Immersive Hero** — Terminal showing live AI demos
- **Dark Gradient Theme** — Near-black (#0a0e27) command center aesthetic
- **Bold Typography** — Serif headlines (Newsreader) + Sans body (Inter)
- **Mobile Adaptive** — Hero stacks on 375px devices

### Live Demos
- **Model Regression Detector** — Real-time terminal output showing detection flow
- **RAG Pipeline** — Query interface with vector search + LLM streaming
- **Live Architecture** — System component visualization

### Backend Integration
- Mock backend (Node.js, port 3001) for local development
- Vercel Serverless Functions for production (`/api/*`)
- Ready to wire up real endpoints (Cloud Run, FastAPI, etc.)

### Accessibility
- ✅ Reduced-motion support (all animations disabled if user prefers)
- ✅ WCAG AAA contrast (7.8:1 amber on dark)
- ✅ Keyboard navigation (Tab through all elements)
- ✅ Focus-visible states
- ✅ Semantic HTML

---

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# In a new terminal, start mock backend (port 3001)
node mock-backend.js

# Open http://localhost:5173
```

### Production Build

```bash
npm run build    # Creates optimized dist/
npm run preview  # Test production build locally
```

---

## 📁 Project Structure

```
├── src/
│   ├── Portfolio.tsx          # Main component (hero + sections)
│   ├── api.ts                 # API client functions
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles + accessibility
├── api/
│   ├── regression-demo.ts     # Vercel function: /api/regression-demo
│   └── rag-query.ts           # Vercel function: /api/rag-query
├── mock-backend.js            # Local development backend (ESM)
├── vite.config.ts             # Vite config + API proxy
├── vercel.json                # Vercel deployment config
├── DEPLOYMENT.md              # Deployment guide
└── package.json
```

---

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
VITE_API_URL=http://localhost:3001  # Local development
# OR
VITE_API_URL=https://sujaygopal.com/api  # Production
```

### Vite Proxy

Configured in `vite.config.ts`:
- `/api/*` routes to `http://localhost:3001` (development)
- Auto-detects environment (uses Vercel functions in production)

---

## 🎯 Live Demos

### Model Regression Detector

- **Endpoint:** `POST /api/regression-demo`
- **Returns:** Array of test results with accuracy, confidence, drift detection
- **Frontend:** Terminal component with "Run Detection" button

```typescript
// Example response
[
  {
    timestamp: "2026-08-20T12:34:56Z",
    accuracy: 0.924,
    confidence: 0.951,
    drift: "none",
    prediction: "✓ Model stable, no regression detected"
  }
]
```

### RAG Query

- **Endpoint:** `POST /api/rag-query`
- **Body:** `{ query: "Tell me about RAG" }`
- **Returns:** `{ query, answer, citations }`
- **Frontend:** Query input + streaming response display

---

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

### Quick Deploy to Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Follow prompts to link GitHub repo
```

### Automatic CI/CD

GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Runs TypeScript type checks
- Builds the project
- Deploys to Vercel (on `git push` to main)

**Setup:**
1. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` to GitHub secrets
2. Push to main branch → Auto-deploy ✨

---

## 📦 API Integration

### Wiring Up Real Backends

#### Model Regression Detector

Edit `api/regression-demo.ts`:

```typescript
const response = await fetch('https://your-ml-backend.com/api/check', {
  method: 'POST',
  body: JSON.stringify({ model_id: 'classifier' })
});
```

#### RAG Pipeline

Edit `api/rag-query.ts`:

```typescript
const response = await fetch('https://your-rag-backend.com/query', {
  method: 'POST',
  body: JSON.stringify({ query, top_k: 5 })
});
```

---

## 🎨 Design System

### Colors (CSS Variables)

Dark theme:
```css
--bg: #0a0e27;           /* Near-black */
--surface: #11152d;      /* Card backgrounds */
--accent: #fbbf24;       /* Amber highlight */
--text: #e8f0ff;         /* Cool white */
--muted: #6b7a9e;        /* Secondary text */
--success: #84cc16;      /* Green (success) */
```

### Typography

- **Headlines:** Newsreader (serif), bold, 1.2 line-height
- **Body:** Inter (sans), 16px, 1.6 line-height
- **Mono:** IBM Plex Mono (code)

### Spacing Scale

4 / 8 / 12 / 16 / 24 / 40 / 64 px

---

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Build test
npm run build

# Preview production build
npm run preview
```

---

## ♿ Accessibility

- Respects `prefers-reduced-motion` — animations disabled on user preference
- All interactive elements keyboard-reachable
- Focus outlines on all buttons/links
- WCAG AAA contrast (7.8:1 min)
- Semantic HTML (nav, section, footer, etc.)

Test in DevTools:
```javascript
// Simulate reduced motion
matchMedia('(prefers-reduced-motion: reduce)').matches
```

---

## 📱 Mobile Responsiveness

- Hero: Full viewport → stacked on mobile
- Terminal: Full-width on 375px
- Grid: 2 columns desktop → 1 column mobile
- Touch-friendly: 44px+ tap targets

Test locally:
```bash
# Chrome DevTools: Cmd+Shift+M
# or
npm run preview
# and test on real device via local IP
```

---

## 🤝 Contributing

Push to main:
```bash
git add .
git commit -m "description"
git push origin main
```

GitHub Actions automatically:
1. Runs checks
2. Builds project
3. Deploys to Vercel

---

## 📄 License

MIT

---

## 🔗 Links

- **GitHub:** https://github.com/Sujay1709/sujay-mulagund_portfolio
- **Portfolio:** https://sujaygopal.com (when deployed)
- **LinkedIn:** https://linkedin.com/in/sujay-mulagund-0ab588269
- **Email:** sujaymulagund19@gmail.com

---

## 🚀 Next Steps

1. Buy domain: `sujaygopal.com`
2. Deploy to Vercel (see DEPLOYMENT.md)
3. Wire up real AI backends
4. Add more live demos (LLM chat, prompt optimization, etc.)
5. Monitor performance via Vercel Analytics

---

Made with ❤️ by Sujay Mulagund
