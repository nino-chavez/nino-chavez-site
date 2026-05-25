# ninochavez.co v3 — Stage 2: Diagnose (refreshed 2026-05-25)

Per `tools/forge-site/playbook/2-diagnose.md`. Pattern-match the project to an archetype and lock the module list before prescribing.

**This version supersedes the original 2026-05-24 diagnose.** Reason: the original was authored without a full surface inventory. Stage 1 Research (`research/synthesis.md`, 2026-05-25) revealed a scale-mismatch finding that materially changes the prescription — 9 case-study representation versus 69-repo / 17-deploy / 275-artifact footprint. The refresh absorbs that finding plus the methodology correction in ADR-0008 (adopt big-blueprint `portal/` shell).

## What changed since the original diagnose

| Finding (from `research/synthesis.md`) | Impact on prescription |
|---|---|
| **Footprint is 69 repos, 17 custom-domain deploys, 275 published artifacts** — v3 currently surfaces ~12% of it | Case-study slate framing under-represents the receipts. Need a cluster surfacing pattern. |
| **`nino-chavez/forge` is PUBLIC** — the umbrella for the production line | "All 5 lathes private" framing was wrong. Point at the public umbrella; lathes stay private by design. |
| **Paired product + blueprint deploy is the canonical pattern** (rallyhq.app + blueprint.rallyhq.app) | v3 needs `blueprint.ninochavez.co` as a separate CF Pages project. This is now ADR-0008. |
| **Writing corpus is ~25× larger than v3 surfaces** — 229 blog + 12 whitepapers + 8 series + 10 fiction + 9 presentations | `/writing` needs to surface every non-blog collection, not just 3 flagship pointers. |
| **8 thematic clusters organize the work** — forge / agent infra / AI products / commerce / volleyball / personal / client / writing | Flat case-study list IA replaced by cluster IA. ADR-0009 pending pattern choice. |

## Confirmed archetype

**`portfolio-brand`** — variant: **Consulting/Personal Portfolio (Website-NC pattern)**, per `tools/forge-site/archetypes/portfolio-brand.md` §"Variants".

Decision-tree path: Does the business sell access to digital content? → No → Does the business run events? → No → Does it provide services? → No (not actively selling; goal is hirable + known, not transactional) → Is this a personal brand / portfolio? → **Yes → Portfolio/Brand.**

Rationale specific to this project: the site IS the product. Its visual quality and the integrity of the artifacts it surfaces are the credibility proof for a "context engineer" claim. There is no transactional layer because Nino is employed full-time at Commerce.com — the site builds optionality (hirable, known, referable) rather than booking inbound work.

**Refreshed framing**: the credibility proof at v3 scale is not "9 selected case studies" but "the surface area itself is the receipts." The IA needs to expose the breadth (clusters + counts + selective deep-dives) instead of curating it down to a handful.

## Hybrid considerations

Three adjacent surfaces exist; all are correctly out of scope for the main-site **code**, but they're in scope for the main-site **IA** (the main site must link to them and contextualize them as part of the orbit):

- **Photography subdomain** (`ninochavez.co/photography` via router worker, was `photography.ninochavez.co`). Photography/Media Portfolio variant of the same archetype. Own app under `apps/photography/`.
- **Blog subdomain** (`ninochavez.co/blog` via router worker, was `blog.ninochavez.co`). Astro/MDX, runs independently as Signal Dispatch — **229 blog posts + 8 series + 12 whitepapers + 10 fiction + 9 presentations + 3 counterpoints + 3 tutorials = ~275 artifacts**.
- **NEW: Blueprint subdomain** (`blueprint.ninochavez.co`, per ADR-0008). Separate CF Pages project deployed from `apps/website-nc-v3/blueprint/portal/`. Hosts the methodology surface — strategy panels, current-state panels, comparison toggle, AI chat (Vectorize-backed). The site's review portal. Not absorbed into the main site; linked from masthead/footer.

No fourth-archetype hybrid is needed because the main site has no e-commerce, no gated content, and no event surfaces.

## Module selection

Against `tools/forge-site/playbook/2-diagnose.md` §"Module Selection Checklist":

| Question | Answer | Module decision |
|---|---|---|
| CMS for non-technical editors? | No — Nino edits in code | **Skip `cms-sanity`.** |
| Accept payments? | No | Skip `payments-stripe`. |
| User accounts? | No | Skip `auth-*`. |
| Gated content? | No | Skip `feature-gating`. |
| Contact / inquiry form? | Yes — one simple form on `/contact` | **Include `contact-forms` + `email-resend`.** |
| Transactional emails? | Yes — contact-form notification only | Covered by `email-resend`. |
| Sell video content? | No | Skip `video-mux`. |
| Take appointments? | **No — explicitly cut.** | **Skip `booking-calcom`.** Cal.com integration on the v2 site was transactional framing that contradicts the credibility positioning. |
| Local SEO? | No (national/remote, not location-specific) | Skip local-specific JSON-LD, keep general SEO. |
| Product analytics? | Not at v3 launch | Defer `analytics-posthog`. |
| Deploying on Cloudflare Pages? | **Yes — Cloudflare-first.** | Skip `analytics-vercel`. Use **Cloudflare Web Analytics**. |
| **NEW: Paired blueprint surface?** | **Yes — `blueprint.ninochavez.co`.** | **Include `portal-shell` (big-blueprint v2 `portal/` template).** Already stamped at `blueprint/portal/`. |
| **NEW: Vectorize RAG backend for chat?** | **Yes — reuse existing `askdad-corpus` index.** | **Include `pages-function-chat` (portal `functions/api/chat.js`).** Shared corpus between v3 site chat surface (if surfaced) and blueprint portal chat. |

### Required modules

- `seo-structured-data` — JSON-LD AEO endpoints
- `cloudflare-web-analytics` — replaces Vercel analytics
- **`portal-shell`** — stamped from big-blueprint v2 `template/portal/` (ADR-0008)
- **`pages-function-chat`** — portal chat backed by `askdad-corpus` Vectorize index

### Recommended modules

- `contact-forms` — one form on `/contact`
- `email-resend` — sends the contact form notification

### Deferred modules

- `cms-sanity` — Nino is the editor; code is source of truth.
- `analytics-posthog` — CF Web Analytics enough for launch.
- `booking-calcom` — explicitly cut. Transactional framing conflicts with the positioning.

## Framework

**SvelteKit 2 + Svelte 5 (runes)** for the main site.

Reasons:
- The ask-dad RAG backend (`src/lib/server/askdad/`, `src/routes/api/ask/`) is SvelteKit-native and shipped/working — preserving it requires SvelteKit.
- SvelteKit is the portfolio-brand archetype default for SSR + performance focus.
- The Cloudflare Pages adapter is already in `svelte.config.js`.

**Static HTML + Pages Functions** for the blueprint portal (per ADR-0008 and the `portal/` template). Zero build pipeline, deploys directly via `wrangler pages deploy`.

## Scope boundaries

### In scope for v3 — main site (`ninochavez.co`)

Re-framed against the cluster IA. The 8 clusters from `research/synthesis.md`:

| Cluster | Repos / artifacts | Site surface |
|---|---|---|
| **Forge production line** | 8 (1 PUB: `forge`) | Featured on `/practice` toolchain; `forge` umbrella linked as the public entry point; individual lathes referenced |
| **Agent infrastructure** | 10 (1 PUB: `ai-champions-kit`) | Featured on `/practice` substrate section |
| **AI products** | 18 (6 PUB) | Surfaced via cluster IA on `/work` or `/build`; lead case studies = atelier (PUB), ask-dad, quantifai (paused) |
| **Commerce / BC** | 10 (1 PUB) | Surfaced via cluster IA; lead case studies = bc-subscriptions, ask-bc, aisles |
| **630 / volleyball** | 9 (1 PUB) | Surfaced via cluster IA; lead case study = rally-hq (paired with blueprint.rallyhq.app) |
| **Personal sites / brand** | 7 | Surfaced as the orbit being built; this redesign IS part of this cluster |
| **Client work** | 4 | Surfaced minimally — services posture is present but not selling |
| **Writing** | ~275 artifacts | `/writing` surfaces all 7 collections, not just 3 flagship whitepapers |

**Routes** (subject to ADR-0009 cluster surfacing pattern, but baseline shape):
- `/` — hero + credibility ribbon + cluster overview + chat entry
- `/about` — narrative
- `/practice` — toolchain + substrate + operating rules + instrumentation evidence
- `/work` — cluster surfacing (pattern per ADR-0009 — Bento / Tabs / Matrix)
- `/work/[cluster]/[slug]` — per-cluster, per-project deep dives (5-10 leads total)
- `/writing` — all 7 collections surfaced with counts + flagships per
- `/contact` — single form
- `/api/{person,expertise,experience,contact}.json` — AEO endpoints
- `/api/ask/chat` — existing RAG endpoint (already shipped, working — keep wired but only surface in UI if cluster IA decision includes it)

### In scope for v3 — blueprint portal (`blueprint.ninochavez.co`)

Per ADR-0008 and `blueprint/portal/CONVENTIONS.md`:
- Portal front-door (`index.html`) — studio catalog of all prototype pages, grouped by slice
- Prototype page per main-site route — strategy drawer (why this design) + current-state drawer (v2 screenshots)
- Comparison toggle — PROPOSED / COMPARE / SHIPPED per page
- AI chat FAB — Pages Function reusing `askdad-corpus` Vectorize index
- Annotation overlay — opt-in stakeholder notes (localStorage)
- Doc viewer — markdown rendering for `blueprint/*.md` reference docs

### Out of scope — explicitly cut from v2

- `/v1` route (parallel old homepage)
- All Cal.com integration (4 components + 3 API routes + 5 docs)
- 6 unused photography-process section components
- Duplicate `Header.svelte`
- Bento-grid + lime + Bebas Neue homepage aesthetic
- Interests grid (Photography / Music / Writing / Building equal weight)
- ~20 stale `docs/` operational notes
- The in-app `/blueprint` route (deleted 2026-05-25; replaced by the external portal)

### Out of scope — deferred to post-v3

- Sanity CMS migration
- Posthog product analytics
- `/now` page (deprecated — no longer fits the cluster IA; defer decision on revival)
- Per-cluster auto-derived counts (manually maintained at v3; add `tools/state-derive`-style pipeline post-launch if drift becomes a problem)

## Output

**This refreshed Diagnose locks:**
- Archetype = portfolio-brand (consulting/personal variant)
- Framework = SvelteKit 2 (main site) + static HTML / Pages Functions (blueprint portal)
- Modules = `seo-structured-data` + `cloudflare-web-analytics` + `portal-shell` + `pages-function-chat` + `contact-forms` + `email-resend`
- Scope = main site rebuilt against cluster IA (8 clusters, ~275-artifact writing surface, paired blueprint at `blueprint.ninochavez.co`); v2 cuts unchanged; AI products / commerce work no longer hidden behind a 5-case-study slate
- Out = e-commerce, gating, booking, course platform, parallel hobbies framing

**Pending forks before Stage 3:**
- ADR-0009 — cluster surfacing pattern (Bento / Tabs / Filterable Matrix / other) — Nino's call
- Repo visibility flips — deferred per Nino direction (2026-05-25); revisit if the cluster surfacing pattern needs more public repos to function

Proceed to Stage 3 Prescribe (refresh `02-prescription.yml`).
