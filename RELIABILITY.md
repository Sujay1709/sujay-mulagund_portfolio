# Reliability — the complete loop

The goal: the site stays up, broken code never reaches production, and you're
told the moment anything is wrong. Here's every layer and how they connect.

Live site: **https://www.sujaygopal.space**

```
  push code
     │
     ▼
  [CI build gate]  ── fails ──▶  red check on the commit, you're emailed
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

## 1. CI build gate — broken code is visible before it spreads
`.github/workflows/ci.yml` runs on every push and PR: it installs deps and runs
`npm run build` (which type-checks with `tsc` first). If it fails, the checkmark
goes red and GitHub emails you.

⚠️ **Important caveat:** Vercel deploys via its own Git integration, which does
*not* wait for this workflow. A red CI check does **not** block the deploy — it
only tells you. To make it a real gate, turn on branch protection (repo →
**Settings → Branches → Add rule** for `main` → require the **CI** check) and
work through PRs instead of pushing straight to `main`.

## 2. Vercel — resilient hosting (no server to fall over)
This is a **static** site (plus two serverless functions under `/api`), so
there's no long-running backend to crash. Vercel adds:
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
add `SITE_URL` = `https://www.sujaygopal.space`.

Until that variable is set the workflow exits cleanly and checks nothing — it
looks green while doing no work, so confirm the variable exists.

## 4. External uptime monitor — independent of GitHub/Vercel
GitHub's cron can lag by many minutes, so add a dedicated monitor (free tiers
are plenty):
- **UptimeRobot** (uptimerobot.com) — 5-min checks, email/SMS, free public
  status page.
- **Better Stack / Better Uptime** — 30s checks, Slack/phone alerts, status page.

Point it at `https://www.sujaygopal.space`, alert on 2 consecutive failures to
avoid false alarms, and (optionally) also monitor `/status.html`.

## 5. Status page
`public/status.html` is a self-contained page at
`https://www.sujaygopal.space/status.html` that runs live client-side checks
(website, assets, HTTPS).

Note what this can and can't do: it only runs when *someone opens it*, and it
checks the site from that visitor's browser. It is a reassurance page, not
monitoring. Real detection comes from §3 and §4.

## 6. Alerting — where failures land
- CI + health-check failures → GitHub notification emails (make sure repo
  notifications are on for your account).
- Uptime monitor → email/SMS/Slack, your choice.

## Recovery cheat-sheet
- **Site down after a deploy?** Vercel → Deployments → Promote last good one.
- **Build failing?** Read the red CI log; fix; push.
- **Domain/cert issue?** See DOMAIN.md — but note the domain is registered
  *through Vercel*, so DNS problems are rare and not self-inflicted.
- **"The deploy didn't work"?** Check `https://www.sujaygopal.space`, not a
  hash-containing `*.vercel.app` deployment URL — those are frozen snapshots of
  one past build and never update. See DOMAIN.md.
