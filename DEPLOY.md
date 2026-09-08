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

`.github/workflows/deploy-site.yml` deploys the Worker on every push to `main`
(check + test preflight, then `npm run deploy:production`). It is **dormant
until repo secrets are set**: add `CLOUDFLARE_API_TOKEN` (Account · Workers
Scripts : Edit) and `CLOUDFLARE_ACCOUNT_ID` under Settings → Secrets and
variables → Actions. Until then it runs green and skips with a notice, and the
canonical release stays manual:

1. Merge or push the intended revision to `main`.
2. Run `npm run deploy:production` from a clean `main` checkout.
3. Verify the deployed Worker revision and the apex routes below.

Alternative to the workflow: connect this repository to the existing Worker via
Workers Builds (**Settings → Builds** on the Worker; build command
`npm run build`, deploy command `npx wrangler deploy`). That connection is
dashboard-only — the builds API rejects API tokens and wrangler OAuth tokens
alike (verified 2026-08-12). Pick one mechanism, not both; if Workers Builds is
connected, delete the workflow. Do not treat a Pages status check as the
release gate.

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

Coverage inquiries use the D1 database described below. Other routes link to
or proxy specialist services through the router.

## Coverage inquiries

The coverage form posts to `/api/coverage/requests`. The main Worker owns this
root API route; it must not be placed under the gallery-owned `/photography/api`.
The router also sends `/photography/coverage.rsc` to main for anchor navigation.

Production bindings:
- `COVERAGE_DB`: D1 `ninochavez-coverage-leads` for inquiries and anonymous events.
- `COVERAGE_EMAIL`: Cloudflare Email Sending, restricted to sender
  `requests@ninochavez.co` and recipient `nino@ninochavez.co`.
- `COVERAGE_NOTIFY_TO`: `nino@ninochavez.co`, the existing Google Workspace alias.
- `COVERAGE_LIMIT`: per-IP request limit. IPs are not saved in the lead database.

Before deploying a schema change, run
`npx wrangler d1 migrations apply ninochavez-coverage-leads --remote`.
For development use `--local`; local Email Sending is simulated, not sent.
Preview has no production lead/email bindings and fails closed.

`npm run test:coverage` exercises validation, actual SQLite persistence,
concurrent duplicate requests, notification failure/retry and analytics boundaries.
`npx wrangler types worker-configuration.d.ts` refreshes binding/runtime types.
The scheduled handler retries pending email notifications every five minutes.
Provider acceptance is recorded as `sent`; this is not proof of inbox delivery.
After 12 attempts a failed notification remains visible in `npm run leads -- report --remote`.
An uncertain provider response can cause a duplicate notification on retry;
its reference remains the same and the inquiry itself is never duplicated.

Operator commands and source-tag conventions are in `docs/coverage/lead-operations.md`.
