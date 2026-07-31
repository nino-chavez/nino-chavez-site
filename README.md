# Nino Chavez — Open Practice

This is the canonical source for ninochavez.co. The site brings the work,
Ways of Working demos, learning paths, writing, photography, and current
practice into one navigable public record.

The creative and interaction contract lives in
[`docs/OPEN-PRACTICE-ART-DIRECTION.md`](docs/OPEN-PRACTICE-ART-DIRECTION.md).
The information architecture is documented in:

- [`decisions/0004-unified-apex-information-architecture.md`](decisions/0004-unified-apex-information-architecture.md)
- [`docs/IA-NAVIGATION.md`](docs/IA-NAVIGATION.md)

## Public route set

- `/` — a composed personal entrance, integrated portrait, one live product,
  three unlike forms of public proof, domain navigation, a direct route to
  current attention, and entry into the complete Ways of Working collections
- `/work` — all 32 projects, systems, and practices with URL-backed search and
  filtering; no “selected work” tier
- `/demos` — the complete Ways of Working collection inside the shared
  navigation system; each session and applied technique renders its full
  authored story natively, including diagrams, excerpts, images, and its own
  visual identity
- `/learn` — seven self-directed practitioner paths, each grounded in visible
  work and ending in a concrete artifact
- `/blog` — the complete Signal Dispatch publication, with every public piece,
  URL-backed filters, the authored series, and direct article handoffs
- `/about` — a durable profile connecting biography, the different practices,
  the role of agents, current context, and external profiles without becoming a
  services pitch or résumé
- `/now` — a dated attention ledger across the current role, public-site
  consolidation, agent-assisted practice, and live volleyball operations
- `/links` — a maintained, outcome-labeled directory of 11 live destinations
  with photography-source attribution preserved
- `/photography` — an image-first front door to the owned collection, with a
  real archive search, five photography-specific routes, and current Flickday
  work in a full-bleed contact sheet
- `/privacy` — a current, plain-language disclosure separating site-wide
  infrastructure, Photography telemetry, browser-local data, image and athlete
  labels, retention, and visitor control
- representative work and demo details — artifact, context, public surface,
  limits, relationships, and sequence
- global navigation and compact menu behavior
- locked typography baseline, inherited and normalized for the personal
  practice — Anton for primary openings, Inter for the portfolio, and Space
  Mono for evidence, delivered locally

The work and demo registries determine what appears on the public site. Keep
their state and destination fields accurate; the interface does not imply that
an unfinished record is a released product.

Writing is the exception: `app/writing-data.json` is generated from the
publication visibility rules and current content in
`/Users/nino/Workspace/dev/apps/blog/astro-build`. Refresh it after publication
changes:

```bash
npm run sync:writing
```

Ways of Working follows the same ownership model. The canonical source remains
`/Users/nino/Workspace/dev/apps/nc-demos`; its publisher emits an inventory and
one complete story feed per record. The site refreshes both its index and
last-known-good story bundle with:

```bash
npm run sync:demos
```

The public routes are `/demos/...` on ninochavez.co. The former Demos subdomain
is a route-preserving redirect into this collection.

## Run locally

```bash
npm install
npm run dev
npm test
```

## Release checks

```bash
npm run check
npm run lint
npm test
npm run test:audit
npm run build:production
```

Production deploys use `npm run deploy:production`. Preview deployments use
`npm run deploy:preview`; previews remain private by default.
