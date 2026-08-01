# Deploy — website-nc (ninochavez.co portfolio)

## Host

- **Platform**: Cloudflare Worker `ninochavez-main-open-practice`.
- **Production URL**: <https://ninochavez.co>.
- **Request path**: the `apps/router` Worker sends portfolio traffic to the
  `MAIN` service binding, which targets `ninochavez-main-open-practice`.
- **Worker entry**: `worker/index.ts`; static assets come from `dist/client`.

The old `ninochavez-main` Pages project is vestigial. A successful Pages build
does not update the Worker that serves the apex domain.

## Deploy trigger

The current repository does not contain a production deploy workflow and the
Worker is not yet confirmed to have a connected Workers Builds configuration.
Until that dashboard connection is verified, the canonical release is manual:

1. Merge or push the intended revision to `main`.
2. Run `npm run deploy:production` from a clean `main` checkout.
3. Verify the deployed Worker revision and the apex routes below.

Cloudflare Workers Builds can restore automatic deploys from GitHub. Connect
this repository to the existing Worker in **Settings → Builds**, use
`npm run build` as the build command, and `npx wrangler deploy` as the deploy
command. Do not treat a Pages status check as the release gate.

## Build and runtime

- **Build command**: `npm run build`.
- **Deploy command**: `npm run deploy:production` (sets
  `SITE_VISIBILITY=public` so the private-review banner is not published).
- **Node version**: 22, pinned in `.nvmrc`.
- **Wrangler configuration**: `wrangler.jsonc`.

## Environment variables

Runtime secrets and variables belong on the Cloudflare Worker. Never commit
them to the repository.

## Preflight checks

- `git status` is clean.
- `npm run check` succeeds.
- `npm test` succeeds.
- The intended revision is present on `main`.

## Verify after deploy

- Confirm the latest `wrangler deployments list` entry matches the release.
- Load `https://ninochavez.co/work` with a cache-busting query.
- Confirm `/work/commerce-architecture` renders.
- Confirm `/work/commerce-practice` redirects to `/work/commerce-architecture`.
- Confirm `/work/whitepapers` and `/work/presentations` redirect to their
  filtered Signal Dispatch collections.
- Run the production smoke check when available.

## Database

The portfolio has no direct database. Some routes link to or proxy other
services through `apps/router`.
