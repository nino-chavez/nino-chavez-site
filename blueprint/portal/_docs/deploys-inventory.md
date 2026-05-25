# Deployed surfaces inventory — Cloudflare Pages + Vercel

**As-of:** 2026-05-25 via `wrangler pages project list` and `vercel projects ls --scope sxs-labs`

## Cloudflare Pages (single account, ninochavez.co orbit)

| Project | Custom domains | Source repo |
|---|---|---|
| `rally-hq-blueprint` | `blueprint.rallyhq.app` | rally-hq |
| `rally-hq` | `rallyhq.app`, `www.rallyhq.app` | rally-hq |
| `ninochavez-main` | `ninochavez-main.pages.dev` (no custom domain yet — `ninochavez.co` still routes via Vercel/router) | nino-chavez-site |
| `ninochavez-blog` | `ninochavez-blog.pages.dev` | blog |
| `quantifai-landing` | `quantifai.app`, `www.quantifai.app` | quantifai-landing |
| `nino-chavez-photography` | `nino-chavez-photography.pages.dev` | nino-chavez-photography |
| `urvil-performance` | `urvilperformance.com`, `www.urvilperformance.com` | urvil-performance |
| `flickdaymedia` | `flickdaymedia.com`, `www.flickdaymedia.com` | flickdaymedia |
| `letspepper` | `letspepper.com`, `www.letspepper.com` | letspepper |
| `simple-aes` | `aes.ninochavez.co` | simple-aes |
| `zerospecs` | `zerospecs.app`, `www.zerospecs.app` | zerospecs |
| `signal-x-studio-website` | `signalx.studio`, `www.signalx.studio` | signal-x-studio-website |
| `probe-*` (5 projects) | throwaway probe surfaces | — |

**Active custom domains:** 11 live, externally-resolvable surfaces.

## Vercel (sxs-labs team — "Signal x Studio Labs")

| Project | Production URL | Notes |
|---|---|---|
| `rallyhq` | rallyhq-sxs-labs.vercel.app | Legacy Vercel host before CF migration |
| `ask-bc` | ask-bc-sxs-labs.vercel.app | Custom domain `askbc.ninochavez.co` — TEAM_ACCESS_REQUIRED block (Nino email not on team) |
| `bcss-admin` | bcss-admin-sxs-labs.vercel.app | BC Synthetic Shoppers admin |
| `allen-wellness-center` | allen-wellness-center-sxs-labs.vercel.app | Client site |
| `630-cci` | 630-cci.vercel.app | Volleyball coach assessment |
| `630-vbranking` | 630-vbranking.vercel.app | Volleyball rankings |
| `630-esign` | 630-esign.vercel.app | 630 e-signature |
| `volley-rx` | volleyrx.com | Volleyball product |
| `aisles-admin` | aisles-admin.vercel.app | Aisles admin shell |
| `landing` | landing-five-bice-84.vercel.app | Generic landing |

## Patterns

**Cloudflare-first migration is ongoing.** Most product surfaces have moved to CF (rally-hq, blog, photography, letspepper, signal-x-studio-website). Vercel retains: ask-bc (blocked migration), 630 family (legacy), client sites in transition, and the bcss-admin / aisles-admin headless commerce work.

**Paired product + blueprint deploy pattern** — Rally HQ is the proven shape:
- `rallyhq.app` (the product)
- `blueprint.rallyhq.app` (the methodology surface, separately deployed)

This is the canonical blueprint Stage 6 deploy pattern. The v3 redesign currently lacks the paired blueprint surface — that's the gap this restart fixes.

**Domain conventions:**
- Products own their own apex (rallyhq.app, letspepper.com, quantifai.app, flickdaymedia.com, zerospecs.app, signalx.studio)
- Internal-to-orbit surfaces use `*.ninochavez.co` (aes.ninochavez.co; askbc.ninochavez.co targeted)
- Blueprint surfaces use `blueprint.<product>.app` (blueprint.rallyhq.app is the prototype for `blueprint.ninochavez.co`)
