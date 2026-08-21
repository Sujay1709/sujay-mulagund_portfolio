# DEPLOYMENT.md — superseded

This file previously duplicated the deployment guide and described a setup that
no longer exists (buying `sujaygopal.com`, configuring `VERCEL_TOKEN` /
`VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` GitHub secrets, and a
`.github/workflows/deploy.yml` that has since been deleted because Vercel's own
Git integration already deploys `main`).

Current, accurate documentation lives in:

- **[DEPLOY.md](./DEPLOY.md)** — run locally, build, ship a change, the
  live-demo API, troubleshooting
- **[DOMAIN.md](./DOMAIN.md)** — `sujaygopal.space`, how it's wired, which URLs
  track production
- **[RELIABILITY.md](./RELIABILITY.md)** — CI gate, health check, uptime
  monitoring, rollback
- **[README.md](./README.md)** — what the site is and what's on the page

This file is safe to delete.
