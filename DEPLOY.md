# Deploy — website-nc (ninochavez.co portfolio)

## Host
- **Platform**: **Cloudflare Pages, git-integrated** (project `ninochavez-main`).
  `svelte.config.js` uses `@sveltejs/adapter-cloudflare`; the "Cloudflare Pages"
  status check on every PR/commit is the CF build. `vercel.json` is **vestigial**
  (CF Pages does not read it — see Open issues) and should not be treated as canonical.
- **Production URL**: https://ninochavez.co (served via the `apps/router` Worker)
- **Preview URL pattern**: CF Pages per-branch preview (`<branch>.ninochavez-main.pages.dev`)

## Deploy trigger
- **Canonical**: push to `main` → Cloudflare Pages git integration builds & deploys.
  No `wrangler` step, no GitHub Actions deploy workflow (the only workflow,
  `ingest-askdad-corpus.yml`, is content ingestion, not deploy).
- **Build command**: `npm run build` (`svelte-kit sync && vite build`)
- **Node version**: pinned to **22** via `.nvmrc`. REQUIRED — CF Pages otherwise
  defaults to an older Node and the build fails (same gotcha that broke rally-hq /
  photography on this stack; the node pin was the unlock).

## Database
- None directly. Some routes proxy to other services (blog, photography sitemaps) —
  see Open issues re: where those rewrites actually live on CF Pages.

## Environment variables
- **Where they live**: Cloudflare Pages dashboard (project `ninochavez-main`),
  exposed via `$env/dynamic/*` at runtime.
- AI SDK keys (Anthropic) needed for the askdad / AI features.

## CI / checks (on PR)
- **Cloudflare Pages** — the git-integrated build; this is the merge gate.
- **GitGuardian Security Checks** — secret scanning.
- `.github/workflows/ingest-askdad-corpus.yml` — content ingestion, not deploy.

## Preflight checks
- `git status` clean
- `npm run build` succeeds locally (on Node 22)
- `npm run test:smoke` passes

## Verify after deploy
- `curl -fsSL https://ninochavez.co` returns 200
- Playwright smoke (`npm run test:smoke`) against prod

## Open issues
- **`vercel.json` is dead config on CF Pages.** Its `redirects` (`/cv` → `/about`,
  `/photo/*` → `/photography/*`) and `rewrites` (gallery/photography sitemap proxies)
  are NOT honored by Cloudflare Pages. Either these are handled by the `apps/router`
  Worker, or they are silently broken in production. Port to `static/_redirects`
  (CF Pages syntax) or confirm the router covers them, then delete `vercel.json`.
  Tracked as separate scope from the build fix.

## Notes
- See PLATFORM.md for workspace-level platform decisions (note: PLATFORM.md's
  "portfolio on Vercel" statement is stale — the live deploy is Cloudflare Pages).
