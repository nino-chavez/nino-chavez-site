# ADR-0002 — Archetype: portfolio-brand (consulting / personal variant)

**Status:** Accepted
**Date:** 2026-05-24
**Deciders:** Nino Chavez

## Context

`tools/forge-site` defines 4 archetypes (`service-business`, `event-organizer`, `digital-content`, `portfolio-brand`) and prescribes module + page-IA defaults per archetype. The Stage 2 Diagnose ([`01-diagnose.md`](../01-diagnose.md)) must lock one. The archetype determines the sitemap defaults, the module matrix, and the visual conventions.

`ninochavez.co` v3 has structural signals pulling toward two archetypes:

| Pull | Toward |
|---|---|
| Personal brand + work showcase + the site is the product | `portfolio-brand` |
| Practice + toolchain that could in principle be productized as consulting | `service-business` |

Per the forge-site Diagnose decision tree: *"Does the business provide services to customers? → No (not actively selling) → Is this a personal brand / portfolio? → Yes → Portfolio/Brand."*

## Decision

**Archetype = `portfolio-brand`, consulting/personal variant** (per `tools/forge-site/archetypes/portfolio-brand.md` §Variants).

The consulting/personal variant (described in `portfolio-brand.md`: "Fewer media items, more written content. AEO endpoints for AI discoverability. Focus on expertise and credentials.") is the right fit for a context engineer surface — heavy on written / structured content, AEO-forward, no large media collection on the main site (photography is its own subdomain with its own variant of the same archetype).

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **`service-business` archetype** | Implies active sales motion. The redesign goal is hirable + known, not sellable. Service-business archetype prescribes service-tier IA and booking flows that would drag the site back toward the v2 Cal.com integration that's being cut. |
| **Hybrid: `portfolio-brand` + `service-business` overlay** | The forge-site Diagnose explicit guidance: *"Don't try to combine two full archetypes — that's building two sites."* The Aurvia.io structural reference goes the service-business route because she IS selling; for v3 the positioning is the lighter portfolio-brand. |
| **Photography variant of `portfolio-brand`** | Right for `photography.ninochavez.co` (which is its own app). Wrong for the main site because the main site's media collection is small (a few diagrams + an optional portrait); the photography variant prescribes large-media-collection patterns (Cloudflare Images named variants, gallery + lightbox + EXIF, filtering, timeline) that aren't load-bearing for the context-engineer surface. |

## Consequences

**Module list (locked):**
- Required: `seo-structured-data`, Cloudflare Web Analytics (replaces `analytics-vercel` post-CF-migration)
- Recommended: `contact-forms`, `email-resend` (single form on `/contact`)
- Deferred: `cms-sanity` (Nino is editor; revisit if co-author joins), `analytics-posthog` (CF Web Analytics is enough at launch)
- Cut: `booking-calcom` (transactional framing — see [ADR-0001](./0001-positioning-context-engineer.md))

**Sitemap (locked):** see [`02-prescription.yml`](../02-prescription.yml) — `/`, `/work`, `/work/[slug]`, `/practice`, `/writing`, `/about`, `/contact`, `/now`, `/privacy`, `/api/*.json`.

**Framework:** SvelteKit 2 + Svelte 5 (kept from v2 — the existing `/work` case-study system, AEO endpoints, design tokens, Cloudflare Images integration are all worth keeping; switching frameworks would discard them).

**`/practice` page is an addition to the standard archetype sitemap** — it's the differentiator for the consulting/personal variant when the consultant has a codified practice (most don't, so the archetype default sitemap doesn't include it). The page is novel to this project; it should be back-ported to the `portfolio-brand` archetype as an optional module if v3 ships well.

## References

- [`01-diagnose.md`](../01-diagnose.md) — full diagnose decision-tree walk + module selection
- [`02-prescription.yml`](../02-prescription.yml) — filled prescription against `tools/forge-site/templates/portfolio-brand.yml`
- `tools/forge-site/archetypes/portfolio-brand.md` §Variants — consulting/personal variant definition
- `tools/forge-site/playbook/2-diagnose.md` — archetype decision tree
