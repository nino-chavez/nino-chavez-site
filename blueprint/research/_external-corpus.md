---
canonical: false
status: working-inventory
last_updated: 2026-05-25
---

# External Corpus Map

Inventory of repos, content, and external references that feed the brownfield
redesign. The redesign isn't authored in a vacuum — `ninochavez.co` is the
front-of-house for a family of properties, and the corpus already on disk is
where the redesign's identity claims need to ground.

## The domain family (cross-app shell question)

`ninochavez.co` is one node in a multi-app surface routed by `apps/router`
(`ninochavez-router`). **Scope decided 2026-05-25: the v3 brief stops at the
main site.** Blog / gallery / studio / router stay where they are. Expand
scope by ADR only if Stage 2 prescription discovers a hard dependency that
forces cross-app work. The chat FAB still indexes the blog corpus for
grounding — that's read-only consumption, not in-scope work on the blog.

| Surface | Repo | Role | Live? |
|---|---|---|---|
| `ninochavez.co` (main) | `apps/website-nc` (this repo) | Personal brand / portfolio / POV | Yes |
| Signal Dispatch blog | `apps/blog` | Written POV — 277 posts in `astro-build/src` | Yes |
| Photography gallery | `apps/photography` | Volleyball + action photography at `photography.ninochavez.co` (~20k photos). Replaces the old `nino-chavez-gallery` repo name. | Yes |
| Signal X Studio site | `apps/website-ss` | Studio identity surface (api/, card/, index.html) at `signalx.studio`. | Yes |
| Labs hub | `apps/labs` | Live experimental-apps index at `labs.ninochavez.co`. Indexes Rally HQ, CIQ, Code-to-Cognition. | Yes |
| Router | `apps/router` | Cross-app request routing under the ninochavez domain | Yes |

The four content/identity surfaces (main, blog, gallery, studio) share the
domain umbrella. The redesign's IA needs to answer: *does the v3 portfolio
absorb or sit alongside these?* Either answer is defensible — the prescription
has to make it explicit.

## Working products to reference

Material the v3 portfolio can cite as evidence rather than abstract claim. Per
the 2026-05-25 receipt-bucket interview, the corpus splits into three tiers,
not one flat list. Mixing tiers in the prescription would dilute receipts.

### CURRENT — cite as live receipts of "where I'm at"

These ARE the receipts the v3 site should foreground. Each is shipped or
actively in-flight, maintained within the last ~30 days.

| Product | Repo | Live URL | Why the redesign cites it |
|---|---|---|---|
| Rally HQ | `apps/rally-hq` | rallyhq.app | Live tournament platform. Blueprint Pattern B reference impl. Architect-directs-agents at production scale. |
| Signal Dispatch | `apps/blog` | blog.ninochavez.co | 277 published posts; voice corpus; primary text substrate. |
| Blueprint methodology | `wip/blueprint` | (methodology repo) | Meta-receipt: "I used my own methodology on my own site." Cite explicitly. |
| Atelier | `wip/atelier` | (in flight) | OSS template + interop protocol for mixed human/agent teams. |
| Atelier dashboard blueprint | `wip/atelier-dashboard-blueprint` | (in flight) | Active surface alongside atelier; cite together. |
| Photography | `apps/photography` | photography.ninochavez.co | Volleyball + action sports gallery (replaces the old `nino-chavez-gallery` repo). |
| Signal X Studio | `apps/website-ss` | signalx.studio | Studio identity surface (api/, card/, index.html). |
| Quantifai | `apps/quantifai-landing` + `wip/quantifai-platform` | (one product, two surfaces) | AI FinOps platform; landing is marketing surface, platform is the app. Cite together as one current receipt. |
| Let's Pepper | `apps/letspepper` | letspepper.com | Live brand surface; volleyball cultural property. |
| Flickday Media | `apps/flickdaymedia` | flickdaymedia.com | Live brand surface; photography subcontractor brand. |
| BC Subscriptions | `wip/bc-subscriptions` | (client) | Active client engagement; B2B delivery receipt. |

**Receipt count: 11 current.** D8 prescription priority surfaces these
on `/`, not the 4 currently in the v2 bento grid.

### EVOLUTION — cite only as "where I started," NOT as current receipts

These are real and live (or were), but they are predecessors / index
surfaces, not flagship receipts. Citing them as current would dilute the
flagship signal. If the prescription needs to show evolution, these are
the citations — but the default is to not surface them on `/`.

| Surface | Repo | Why it's evolution, not receipt |
|---|---|---|
| AI Hive | `wip/ai-hive` | "atelier is what i want hive to become" — Nino's own poe-stack framing. Hive is the predecessor; atelier supersedes. |
| Labs | `apps/labs` (live at labs.ninochavez.co) | Live index page that points at the flagship products (Rally HQ, CIQ, Code-to-Cognition). The flagships are the receipts; labs is the hub. |

### CLIENT-CONTEXT — mention only, do not list as Nino's product

| Surface | Repo | Citation rule |
|---|---|---|
| 630 Volleyball platform | `apps/630-apps` | Client subcontractor work (esign / cci / vbranking / design-system). Mention only as "client engagement context," never as "Nino's product." |

### ADJACENT / EXPERIMENT — do not cite

Per the 2026-05-25 interview, the following `wip/` items are
experiments or exploratory and do NOT belong in the v3 receipts list:

`ai-champions-kit`, `aisles-admin`, `ask-bc`, `bealls-aisles`,
`brainstorming`, `claudius`, `cortex`, `ecomm`, `practice`, `simple-aes`,
`six`, `tmp`, `tna`, `zen-loft`

Some of these may earn promotion to CURRENT in future iterations. Today,
none of them.

## Blog content — voice + authority substrate

`apps/blog` (Signal Dispatch) is the primary text corpus for any voice-driven
copy in the redesign and the source corpus for the Pattern B chat FAB.

- **Voice guide**: `apps/blog/docs/signal-dispatch-voice-guide.md` (961 lines, v1.1).
  Loaded BEFORE drafting any v3 prose per global CLAUDE.md "Prose-voice tasks
  load the voice guide FIRST" rule.
- **Content corpus**: 277 markdown files under `apps/blog/astro-build/src`.
  Stage 3 chat FAB will index this via Vectorize (per `blueprint.yml`
  `cloudflare.primitives.vectorize: true`).
- **Authority claims**: the v3 redesign's POV claims (architect-who-directs-agents,
  buy-vs-build threshold thesis, harness-engineering practice) must trace to
  published blog posts. Quote/cite the post, don't paraphrase the thesis from
  memory — per global "Never fabricate Nino's interior state" rule.

## Peer + competitive references

| Reference | Why | Stage 1 treatment |
|---|---|---|
| **https://aurvia.io/** | Friend's site (Nino's peer). Treat as peer reference, not adversarial competitor. Useful for "what does a peer architect's site look like" calibration. | `research/competitive/peer-aurvia.md` — capture screenshots, IA, voice. Frame in `01-diagnose.md` as "peer reference, not benchmark." |
| **Brian Lovin** (brian.lovin.io) | Designer-engineer portfolio. Reference for personality-forward, opinionated single-author site. | `research/competitive/peer-designer-portfolios.md` — group with Singer / Freiberg. |
| **Jordan Singer** (jsngr.co) | Designer-engineer portfolio with strong experimental surface. | Same group. |
| **Rauno Freiberg** (rauno.me) | Designer with high motion / micro-interaction polish. | Same group. Reference for the motion language `MODERN_ANIMATION_SYSTEM.md` already gestures at. |
| **Julian Lehr** (julian.digital) | Designer with strong written POV — closest analog to "writer's portfolio." | `research/competitive/peer-writer-portfolios.md`. |
| **Patrick Collison** (patrickcollison.com) | Minimalist authority-by-receipt portfolio (CEO, but the structure travels). | Same group as Lehr. |
| **Ryan Lopopolo** (https://lopopolo.io/) | Cited in stack signals as influence on "buy-vs-build threshold" / harness-engineering. Reference the actual published material. | `research/competitive/peer-engineering-portfolios.md`. |

## Reference materials to avoid

These exist in the corpus but should NOT seed the redesign:

- **`apps/website-nc-v3`** — referenced in canonical Blueprint docs as a brownfield reference impl. **It does not exist on disk.** Per user confirmation 2026-05-25, the v3 work happens *here* (in `apps/website-nc`), not in a sibling repo. The canonical Blueprint docs themselves need a cleanup pass to remove the outdated reference, but that's a methodology-repo concern, not this initiative's.
- **`apps/zerospecs`** — Svelte experiment, no portfolio relevance.
- **`apps/website-ss`** patterns — the studio surface is a CURRENT receipt to *cite* (see § "Working products"), but its static-fragment patterns do not import into v3. The v3 design system is net-new (per resolved Q2 in `01-diagnose.md`).

## How this corpus enters each stage

- **Stage 1 (Diagnose)** consumes: domain family inventory, peer/competitive references, existing brand strategy in `docs/brand-domination-strategy.md`.
- **Stage 1 (Personas)** synthesizes from: blog reader signals (apps/blog analytics if available), client engagement patterns, peer-cohort observation.
- **Stage 2 (Prescription)** cites: working products as evidence anchors, blog corpus as voice anchor.
- **Stage 3 (Design Brief)** references: Rauno/Singer/Lovin motion language, Lehr/Collison structural language, Flickday Media design system for adjacent-brand calibration.
- **Stage 4 (Fact-check)** verifies: every product claim against the actual repo, every voice claim against an actual blog post, every brand claim against the existing brand strategy doc — pass or revise.
