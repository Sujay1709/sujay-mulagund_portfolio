# Deployment Guide — sujaygopal.com Portfolio

This guide walks through deploying your AI workbench portfolio to production with automatic CI/CD.

---

## 📋 Prerequisites

1. **GitHub Repository:** Already set up at https://github.com/Sujay1709/sujay-mulagund_portfolio
2. **Domain:** sujaygopal.com (point to Vercel nameservers once purchased)
3. **Vercel Account:** Free tier is sufficient (sign up at vercel.com)
4. **Node.js 18+:** For local testing

---

## 🚀 Step 1: Set Up Vercel Project

### Via Vercel Dashboard (Easiest):

1. Go to https://vercel.com/new
2. Import your GitHub repository: `sujay-mulagund_portfolio`
3. Vercel auto-detects it's a Vite + React project
4. Click "Deploy"

Vercel will automatically build and deploy to a preview URL.

### Via Vercel CLI (Alternative):

```bash
npm i -g vercel
cd /Users/sujaygopal/MyProjects/sujay-portfolio-2026
vercel
# Follow prompts to link project
```

---

## 🔑 Step 2: Configure Environment Variables

**In Vercel Dashboard:**

1. Go to your project settings
2. Click "Environment Variables"
3. Add these variables for **Production**:

```
VITE_API_URL=https://sujaygopal.com/api
```

4. Add these variables if using real backends:

```
REGRESSION_DETECTOR_URL=https://your-ml-backend.com
RAG_BACKEND_URL=https://your-rag-backend.com
GEMINI_API_KEY=sk-xxxxx
```

---

## 🔗 Step 3: Connect Your Domain

Once you buy `sujaygopal.com`:

**Option A: Vercel Nameservers (Recommended)**

1. In Vercel project settings → Domains
2. Click "Add Domain" and enter `sujaygopal.com`
3. Vercel gives you nameservers
4. Go to your domain registrar (Namecheap, GoDaddy, etc.)
5. Update nameservers to Vercel's
6. Wait 24-48 hours for DNS propagation

**Option B: CNAME Records (If keeping registrar's nameservers)**

1. Vercel provides a CNAME target
2. Add CNAME record in your registrar's DNS settings
3. Point `www.sujaygopal.com` to Vercel's CNAME
4. Point root domain via ALIAS/ANAME record

---

## 🔄 Step 4: Enable Automatic Deployment

GitHub Actions workflow is already set up in `.github/workflows/deploy.yml`

**Configure secrets in GitHub:**

1. Go to your GitHub repo → Settings → Secrets and variables → Actions
2. Add these secrets:

```
VERCEL_TOKEN:        (get from Vercel account settings → tokens)
VERCEL_ORG_ID:       (get from Vercel project settings)
VERCEL_PROJECT_ID:   (get from Vercel project settings)
```

Now, every `git push` to `main` will automatically:
1. ✅ Run type checks (TypeScript)
2. ✅ Build the project
3. ✅ Deploy to Vercel (production)

---

## 📦 Step 5: Deploy Backend APIs

### Option A: Use Vercel Serverless Functions (Recommended)

Vercel automatically deploys the TypeScript functions in `/api` directory.

Files:
- `api/regression-demo.ts` → `/api/regression-demo`
- `api/rag-query.ts` → `/api/rag-query`

Update the `VITE_API_URL` in your frontend to use these endpoints.

### Option B: Separate Backend Service (Google Cloud Run, AWS Lambda, etc.)

If you want a dedicated backend service:

1. Deploy `mock-backend.js` to Cloud Run or similar
2. Update `VITE_API_URL` to point to your backend
3. Configure CORS to allow requests from `sujaygopal.com`

---

## 🔌 Step 6: Wire Up Real AI Systems

Once deployed, update the API functions to call your real systems:

### Model Regression Detector

Edit `api/regression-demo.ts`:

```typescript
const response = await fetch('https://your-ml-backend.com/api/regression-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model_id: 'email-classifier' })
});
const data = await response.json();
return data;
```

### RAG Pipeline

Edit `api/rag-query.ts`:

```typescript
const response = await fetch('https://your-rag-backend.com/api/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query, top_k: 5 })
});
const data = await response.json();
```

---

## ✅ Production Checklist

Before going live:

- [ ] Domain purchased and pointing to Vercel
- [ ] Environment variables configured in Vercel
- [ ] GitHub secrets set up (VERCEL_TOKEN, etc.)
- [ ] `api/` functions tested and deployed
- [ ] Frontend API calls updated to use production endpoints
- [ ] SSL certificate (auto-configured by Vercel)
- [ ] Analytics enabled (Vercel Web Analytics)
- [ ] Meta tags updated with your domain (og:image, twitter:card)

---

## 📊 Monitoring & Logs

**Vercel Dashboard:**
- Deployments: See build logs and deployment history
- Analytics: Real user monitoring (RUM)
- Edge Logs: API function logs

**GitHub Actions:**
- See build/deploy status in Actions tab
- Automatic rollback on failed deploy

---

## 🆘 Troubleshooting

### Domain not resolving?

```bash
# Check DNS propagation
nslookup sujaygopal.com
# Should show Vercel's IP
```

### API calls failing in production?

```bash
# Check environment variables in Vercel
vercel env pull  # Pull production env vars locally
```

### TypeScript errors on deploy?

```bash
npm run build  # Test build locally first
npx tsc --noEmit
```

---

## 🎯 Next Steps

1. Buy domain: sujaygopal.com
2. Set VERCEL_TOKEN in GitHub secrets
3. Push a commit to main
4. Watch it auto-deploy to your domain! 🚀

---

## 📞 Quick Reference

| Step | URL | Command |
|------|-----|---------|
| Deploy Preview | vercel.com/new | `vercel deploy` |
| Production | sujaygopal.com | `git push origin main` |
| Environment Vars | Vercel Dashboard | `vercel env pull` |
| Logs | Vercel Dashboard → Deployments | `vercel logs` |
