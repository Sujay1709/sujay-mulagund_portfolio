# Getting sujaygopal.com live

I can't buy the domain for you (it needs your payment and account), but here is
the exact path from "unregistered" to "live and secure."

## 1. Check availability & buy

Search `sujaygopal.com` at a registrar. Recommended:

- **Cloudflare Registrar** (dash.cloudflare.com) — sells .com at wholesale
  (~$10–11/yr), no markup, free WHOIS privacy. Best long-term value.
- **Porkbun** or **Namecheap** — cheap first-year deals, easy UI, free privacy.

Buy it with **WHOIS privacy on** (usually free) so your contact info stays private.

> Tip: also consider grabbing `sujaygopal.dev` — but `.com` is the one to own.

## 2. Connect it to Vercel

Once the site is deployed on Vercel (see DEPLOY.md):

1. Vercel → your project → **Settings → Domains → Add** → type `sujaygopal.com`.
2. Add `www.sujaygopal.com` too and let Vercel redirect one to the other.
3. Vercel shows the DNS records to create. At your registrar's DNS panel add:
   - **A** record: `@` → `76.76.21.21`
   - **CNAME** record: `www` → `cname.vercel-dns.com`
   (If you use Cloudflare Registrar, its DNS panel is in the same dashboard.)
4. Wait for propagation (usually minutes, up to a few hours). Vercel issues the
   HTTPS certificate automatically once DNS resolves.

## 3. Turn on the reliability loop

- Add the repo variable `SITE_URL = https://sujaygopal.com` (enables the
  health-check workflow).
- Create an UptimeRobot/Better Stack monitor on the same URL.
- Confirm `https://sujaygopal.com/status.html` loads.

See **RELIABILITY.md** for the full picture.

## 4. If you use Cloudflare for DNS (optional, extra resilience)

Cloudflare in front of Vercel adds DDoS protection, caching, and analytics for
free. If you do this, set the records to **DNS-only** (grey cloud) first to let
Vercel validate the domain and issue TLS, then you can enable proxying.
