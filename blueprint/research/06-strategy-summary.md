---
canonical: true
stage: 6
status: draft
last_updated: 2026-05-25
voice_mode: executive-advisory
version: 0.1
package_artifacts:
  - 01-diagnose.md
  - 02-prescription.yml
  - 03-design-brief.md
  - 05-fact-check.md
  - 06-strategy-summary.md (this file — opens the package)
---

# 06 — Strategy Summary

The opening artifact in the brownfield Pattern B documents-package for
the ninochavez.co v3 redesign. Reads in 5 minutes; points at the four
downstream artifacts when the reader wants the receipts.

## The one sentence

The v2 ninochavez.co presents Nino as a four-pursuit polymath running a
creative-brand surface; the corpus shows Nino as a practicing software
architect directing agentic delivery at production scale, and v3 closes
that gap by reframing the site as **Nino Chavez ⊕ studio** — a
practitioner studio surface with capability-first composition, 11
working-product receipts, dedicated speaking surface, methodology
meta-receipt, and a chat surface grounded in the 277-essay Signal
Dispatch corpus.

## Why now

Three signals converged into the v3 commit:

1. **v2 leaks abstract framing where receipts already exist.** The home
   page positions Nino as a hobbyist polymath; the actual body of work
   (Rally HQ live, Blueprint methodology in production, Signal Dispatch
   at 277 essays, plus 8 other shipped surfaces) describes a different
   person.
2. **The Prospective Client funnel was leaking at the door.** Cal.com
   integration shipped months ago but never surfaced on `/`. The mailto
   was unstructured. Buyers landed and bounced.
3. **An entire persona had no funnel at all.** The Conference Circuit
   curator could not slate Nino without leaving the site — no bio
   variants, no headshot, no topic list, no past-talks credit. Every
   one of those visits was a missed engagement.

## What changed v2 → v3

The redesign is brownfield, not greenfield. v2 keeps shipping during
the work; v3 is a parallel artifact authored against the diagnose +
prescription + brief pipeline. The deltas:

| Surface | v2 | v3 |
|---|---|---|
| **Identity frame** | Four equal creative pursuits (Photography / Music / Writing / Building) | Architect-primary with capability claim; creative pursuits live as nav links to subdomains |
| **Capability statement** | "Cut the Noise, Follow the Signal" (brand line) | "I direct agents to ship commerce. I write the harness that makes them safe to ship it." (thematic anchor naming the commerce × harness-engineering intersection) |
| **Wordmark** | "Nino Chavez" | "Nino Chavez ⊕ studio" (studio framing without rename) |
| **Receipts on `/`** | 4 hero-image cards | 11 named receipts topic-grouped (shipping now / in the harness / cultural surfaces I run) |
| **`/ai/`** | 5 pages shipped but unlinked from `/` | Surfaced from nav |
| **Speaking surface** | None | `/speaking` with bio variants (50/100/250 word), headshot library, 5 topics, on-the-record credits |
| **Methodology meta** | Not surfaced | `/colophon` + footer "Built with Blueprint methodology" line |
| **Live state** | Lateral `/now` page | Promoted to live-state mirror + home-page signals strip |
| **Chat surface** | None | Persistent chat FAB grounded in Signal Dispatch corpus via Vectorize |
| **Contact path** | Unstructured `mailto:` | Single general inquiry CTA → Cal.com |
| **Design system** | DESIGN.md (violet + content-forward + AEO) drifted from live `/` (lime + bento + spectacle) | Fresh direction — cyanotype blueprint blue canvas + cream Crimson Pro serif body + Bree Serif display + counter-saturated proof-mark red emphasis |
| **Aesthetic posture** | Vibe-coded modern-portfolio template | Architectural drafting room — color as positioning, type as identity, prose-led with no hero |

## How v3 was produced — Blueprint pipeline applied to its own surface

The site is the methodology's latest output. v3 was produced through
the Blueprint brownfield Pattern B pipeline; every claim on the site
traces to a research artifact in this directory.

| Stage | Output | Artifact |
|---|---|---|
| **1 — Diagnose** | 8 numbered diagnoses pairing v2's abstract claims with the receipts that contradict them | [`01-diagnose.md`](01-diagnose.md) — 421 lines |
| **2 — Prescription** | 8 impact-ordered changes (P0 / P1 / P2 / P3) each with one evidence cite | [`02-prescription.yml`](02-prescription.yml) — 329 lines |
| **3 — Design Brief (v0.2)** | Visual + IA direction; v0.1 cohort-followed and produced AI-default tells, v0.2 reworked against an explicit anti-slop test | [`03-design-brief.md`](03-design-brief.md) — 700+ lines |
| **4 — Prototype** | 4-page portal demonstrating all 8 structural differentiation moves + all 7 anti-slop commitments | [`blueprint/portal/`](../portal/) — live at `blueprint.ninochavez.co` |
| **5 — Fact-Check** | Ralph Wiggum convergence: 6 PASS / 5 DEFER / 0 FAIL | [`05-fact-check.md`](05-fact-check.md) — 419 lines |
| **6 — Documents + Deploy** | This package + production ship to `ninochavez.co` | This file + deferred work below |
| **7 — Iterate** | Stakeholder feedback loop via annotation overlay | Post-launch |

Receipt-bucket discipline was applied to the corpus: 11 CURRENT
receipts (cite as live), 2 EVOLUTION items (cite only as "where I
started"), 1 CLIENT-CONTEXT (630-volleyball, mention only), 14
ADJACENT/EXPERIMENT items (do not cite). The Stage 4 prototype surfaces
exactly the 11 CURRENT.

## What's prescribed but not yet shipped

Stage 5 fact-check identified 5 anchors that **deferred to Stage 6
production deploy** — these are the work items between this strategy
summary and v3 going live at `ninochavez.co`:

| # | What | From |
|---|---|---|
| A4 | Live signal strip pulls actual data (Signal Dispatch RSS + Rally HQ status + Blueprint stage status) | Brief Stage 4 anchor 4 |
| A7 | Chat FAB grounds in Signal Dispatch corpus via Cloudflare Vectorize (currently OpenRouter without retrieval) | Brief Stage 4 anchor 7 |
| A9 | Production copy sweep: `src/lib/constants.ts:9` still says "Vercel"; verify every platform/role/product/number claim | P2-1 + Brief Stage 4 anchor 9 |
| A10 | Archive `/v1` legacy route at SvelteKit level (move to `_archive/`, 301 redirect from `/v1/*`) | P3-1 + Brief Stage 4 anchor 10 |
| A11 | Replace (not amend) root `DESIGN.md` with v3 tokens (cyanotype + Bree/Crimson + 80rem container) | P1-3 + Brief Stage 4 anchor 11 |

Plus 3 brief follow-ups required pre-deploy:

| # | What |
|---|---|
| F1 | Verify each of the 4 "What I think about" topic anchors has 2+ existing Signal Dispatch posts; revise or write posts before launch |
| F2 | Source `/speaking` headshots (square + wide); blocker for the page going live |
| F3 | Define MVP shape for live signal data sources (RSS ready; Rally HQ + Blueprint endpoints TBD) |

## What the production deploy looks like

Two distinct deploy targets, both on Cloudflare Pages:

1. **`ninochavez.co`** — the actual v3 site shipping per the brief.
   SvelteKit production app, Vectorize-bound chat, live data sources.
   Replaces v2. Project: `ninochavez-main` (already exists per
   `wrangler pages project list`).
2. **`blueprint.ninochavez.co`** — the stakeholder review portal
   demonstrating the v3 design + the methodology that produced it.
   Static HTML + Cloudflare Pages Functions. Already deployed.
   Project: `ninochavez-blueprint` (already exists).

The blueprint subdomain stays live as the meta-receipt surface and as
the stakeholder annotation venue per Stage 7 iterate. Production lives
at the root domain.

## Audience-by-audience read

Per `personas/_index.md` v3 closes funnels for three personas. The
strategy-by-persona summary:

### Peer Architect (Signal Dispatch readers, technical cohort)

**Before**: Lands on a polymath bento grid. Has to mentally subtract
three categories to find the architect surface. `/ai/` exists but is
unreachable from `/`. The Peer Architect cohort that came for an
architect's home leaves without finding one.

**After**: Lands on a capability statement that names the commerce ×
harness-engineering intersection. Sees 11 named receipts immediately.
277-essay archive surfaced with a clear "Full archive →" link. Can open
`/colophon` to verify methodology depth before subscribing. RSS path
intact.

### Prospective Client (buyers with budget)

**Before**: Lands on a brand line. Cannot scan for capability in
buyer language. Cal.com booking exists but is unsurfaced. Most send
unstructured cold emails and ghost.

**After**: Capability statement in buyer language above the fold.
"Schedule a conversation" CTA visible on every page. Speaking surface
provides legitimacy verification (this person can stand on a stage).
Single inquiry path, structured at the contact layer.

### Conference / Speaking Circuit (program chairs, curators)

**Before**: No funnel at all. Has to ask Nino for bio + headshot +
topic list, which is friction most curators won't push through.

**After**: `/speaking` is the dedicated slate-ready surface. Three bio
variants copy-pasteable. Headshot library with download links.
Five named topics with format hints. Honest "writing-first" on
past-talks. Curator can slate without leaving the site.

## Differentiation thesis — why v3 isn't another also-ran

Peer-cohort calibration (`competitive/peer-cohort.md`) and market-cohort
calibration (`competitive/market-cohort.md`) named the shape v3 would
default into if it followed cohort norms: a 12th capability-sentence-
plus-receipt-list site. To NOT be an also-ran, v3 commits to **8
structural differentiation moves + 7 anti-slop visual moves**:

**Structural (in the IA)**:
1. Subject intersection — capability names commerce × harness engineering (empty subspace per market-cohort)
2. Receipt volume — 11 + 277 posts on `/`, more density than any cohort site
3. Methodology meta-receipt — `/colophon` + footer line
4. Live runtime signals — home strip + `/now` page
5. Speaking surface — full `/speaking` page; no cohort site has one
6. AI chat FAB — Vectorize over Signal Dispatch corpus
7. Show the kitchen — receipts link to methodology repos alongside products
8. Editorial serif — body in Crimson Pro serif throughout

**Visual (in the design system)**:
A. Real photography as structural identity (placeholder anchor in prototype)
B. Off-convention layout — no hero, prose-led, two-column with right rail
C. Color that reads "intentional" — cyanotype blueprint blue (Sir John Herschel, 1842)
D. Type personality — Bree Serif display + Crimson Pro body + JetBrains Mono labels
F. Specificity in IA labels — "on the desk this week," "in the harness," "cultural surfaces I run"
G. Embedded artifacts from actual work — live signals with real commit hashes, uptime, stage status
H. Hand-built mark — ⊕ symbol in wordmark, § proof-mark prefixes on labels

(E — marginalia/footnotes — was considered and skipped to preserve reading comfort.)

Posture for the visual moves was learned from Nino's prior anti-slop
fights on `letspepper.com` + `flickdaymedia.com` (big confident type +
saturated color + not-muted-tasteful + type-driven). Form reinvented
because architect-who-writes is a different genre than sport-cultural-
brand.

## Methodology gaps surfaced during the build

Three issues with the canonical Blueprint template (`~/Workspace/dev/wip/blueprint/template/`)
surfaced during Stage 4 prototype build. These are tracked separately
for Nino's template-repo fix session:

1. **`template/portal/shared.css`** is 1107 lines and missing 832 lines
   of styles for DOM classes its own `proto-nav.js` emits. Our portal
   pulled Rally HQ's 1939-line version as a stopgap with DIVERGENCE FLAG
   comment marking the resync point.
2. **`template/portal/docs/index.html`** has Rally HQ project slugs
   hardcoded in the sidebar (CX Strategy, Business model, etc.),
   `TITLES` map, `STRATEGIC_DOCS` set, default doc id, and
   `PORTAL_SHELL_CONFIG.productName`. Template README setup checklist
   omits this file. Our docs viewer rewritten with our 11 artifacts +
   DIVERGENCE comments per patched section.
3. **`_headers` for `/shared.css`** specifies `max-age=60` but Cloudflare
   Pages serves with `max-age=2678400` default. Cache-bust query string
   pattern (`?v=20260525-v04`) is the working stopgap.

These are not blockers for v3 ship; they're template-improvement work
for downstream Blueprint consumers.

## Read the package in this order

1. **This file** (`06-strategy-summary.md`) — the 5-minute strategic read
2. **`01-diagnose.md`** — what's wrong with v2 and why
3. **`02-prescription.yml`** — what to change and in what order
4. **`03-design-brief.md`** — what the changes look like
5. **`05-fact-check.md`** — what's verified, what's deferred
6. **Live prototype** at `https://blueprint.ninochavez.co` — what it
   reads as in the browser

Supporting research artifacts live in subdirectories:
`research/personas/`, `research/funnel/`, `research/competitive/`,
`research/current-state/` (symlinked salvage from v2 audits).

## What this strategy summary is NOT

- **Not a roadmap**. Stage 6 production deploy is the next concrete
  step; Stage 7 iterate is feedback-driven. Beyond that is out of scope
  for this brief.
- **Not a sales document**. v3 is Nino's surface; the audience for this
  package is Nino himself + any stakeholders he chooses to share it with
  (the blueprint subdomain is access-controlled / `noindex`).
- **Not the implementation plan**. Stage 6 deploy notes in the brief +
  the 5 DEFER anchor closures in `05-fact-check.md § Stage 6 handoff`
  are the operational specifics.
- **Not a final document**. Stage 5 documents-package per the brownfield
  variant may revise this summary once before v3 ships. Stage 7 iterate
  may produce a v0.2 of this summary after stakeholder feedback.

The pipeline is converged. The package is ready. v3 ships when the 5
DEFER anchors + 3 brief follow-ups close.
