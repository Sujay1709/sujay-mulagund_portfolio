# Domain — sujaygopal.space

**Status: live.** The site is served at **https://www.sujaygopal.space**.

The domain was purchased **through Vercel** (Vercel Domains), not an external
registrar. That matters: Vercel is both the registrar and the DNS provider, so
there are **no DNS records to create by hand** — no A record, no CNAME, no
nameserver change at a third party. Vercel wired it up on purchase.

## How it's currently configured

| Host | Behaviour |
|---|---|
| `www.sujaygopal.space` | Canonical — serves the production deployment |
| `sujaygopal.space` (apex) | `308` permanent redirect → `www.sujaygopal.space` |

HTTPS certificates are issued and renewed automatically by Vercel. Nothing to
configure or renew.

## Verifying it's healthy

Vercel → project → **Settings → Domains**. Both entries should read **Valid
Configuration**. Warning states and what they mean:

- **"Invalid Configuration"** — DNS isn't pointing at Vercel. Only possible if
  the domain was moved to an external registrar/DNS provider.
- **"No Deployment"** — DNS is correct but the project has no production
  deployment yet. Fix by pushing to `main` or running `vercel --prod`; the
  domain itself is fine.

## Which URLs actually track production

Only these two update when you deploy:

- `https://www.sujaygopal.space` — the custom domain
- The project's **no-hash** alias, e.g. `sujay-mulagund-portfolio.vercel.app`

Every build also mints a permanent, frozen snapshot URL containing a random
hash — `sujay-mulagund-portfolio-dfjr8i8bu-sujay1709s-projects.vercel.app`.
**These never update.** They exist so you can inspect or roll back to one
specific past build. Checking a hash URL and concluding "the deploy didn't
work" is the single easiest mistake to make here.

## If you ever move the domain off Vercel

Should you transfer to an external registrar (Cloudflare, Porkbun, Namecheap),
you'd then have to create the records yourself in that registrar's DNS panel:

- **A** record: `@` → the IP Vercel shows under Settings → Domains
- **CNAME** record: `www` → `cname.vercel-dns.com`

Vercel displays the exact current values — copy them from the dashboard rather
than from this file, since Vercel has been expanding its IP range.

## Related

- **RELIABILITY.md** — uptime monitoring and the health-check loop
- **DEPLOY.md** — running locally and shipping changes
