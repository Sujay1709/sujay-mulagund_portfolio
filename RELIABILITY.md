# Reliability — the complete loop

The goal: the site stays up, broken code never reaches production, and you're
told the moment anything is wrong. Here's every layer and how they connect.

```
  push code
     │
     ▼
  [CI build gate]  ── fails ──▶  deploy blocked, you're emailed
     │ passes
     ▼
  [Vercel]  atomic deploy → global CDN → auto-HTTPS
     │        (preview URL for every PR; instant rollback)
     ▼
  live site  ◀── [Health check cron] every 15 min ── fails ──▶ email alert
     │                                                   ▲
     └── [Uptime monitor] every 1-5 min ────────────────┘ (SMS/email/Slack)
              │
              ▼
       [public status page]  /status.html
```

## 1. CI build gate — broken code can't ship
`.github/workflows/ci.yml` runs on every push and PR: it installs deps and runs
`npm run build` (which type-checks with `tsc` first). If it fails, the checkmark
goes red and GitHub emails you. Turn on branch protection to make it mandatory:
repo → **Settings → Branches → Add rule** for `main` → require the **CI** check.

## 2. Vercel — resilient hosting (no server to fall over)
This is a **static** site, so there's no backend to crash. Vercel adds:
- **Global CDN** — served from edge locations worldwide, cached and fast.
- **Automatic HTTPS** — TLS certs issued and renewed for you.
- **Atomic deploys** — a new version goes live all-at-once or not at all.
- **Preview deploys** — every PR gets its own URL to test before merging.
- **Instant rollback** — Vercel → project → **Deployments** → pick a previous
  good deploy → **Promote to Production**. Reverts in seconds.

## 3. Health-check workflow — active probing
`.github/workflows/healthcheck.yml` pings the live site every 15 minutes. On a
non-2xx/3xx response the job fails and GitHub emails you. Enable it:
repo → **Settings → Secrets and variables → Actions → Variables** →
add `SITE_URL` = `https://sujaygopal.com`.

## 4. External uptime monitor — independent of GitHub/Vercel
GitHub's cron can lag, so add a dedicated monitor (free tiers are plenty):
- **UptimeRobot** (uptimerobot.com) — 5-min checks, email/SMS, free public
  status page.
- **Better Stack / Better Uptime** — 30s checks, Slack/phone alerts, status page.

Point it at `https://sujaygopal.com`, alert on 2 consecutive failures to avoid
false alarms, and (optionally) also monitor `/status.html`.

## 5. Status page
`public/status.html` is a self-contained page at `https://sujaygopal.com/status.html`
that runs live client-side checks (website, assets, HTTPS). For a hosted,
history-tracking status page, enable the free one from UptimeRobot/Better Stack
and link it here.

## 6. Alerting — where failures land
- CI + health-check failures → GitHub notification emails (make sure repo
  notifications are on for your account).
- Uptime monitor → email/SMS/Slack, your choice.

## Recovery cheat-sheet
- **Site down after a deploy?** Vercel → Deployments → Promote last good one.
- **Build failing?** Read the red CI log; fix; push. The gate keeps prod safe
  meanwhile.
- **Domain/cert issue?** See DOMAIN.md → DNS section.
