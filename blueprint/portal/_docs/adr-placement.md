# ADR-0002 — Placement: the enablement surface stays at ninochavez.co/ai, integrated

- **Status**: Accepted
- **Date**: 2026-07-08
- **Stage**: Stage 2 (mandate question 3 — "where it should live")
- **serves**: craft-practitioner//ai/learn/find-my-craft-persona-follow; evaluating-client//ai evidence layer/verify-the-ai-native-positioning

## Decision

The rebuilt surface ships at **ninochavez.co/ai**, integrated into the site: main-nav
link, homepage entry in the existing property-showcase pattern, `noindex` dropped,
inbound links added from the two live external channels (GitHub profile README, blog).
The `ai-analyst-academy` repo is **absorbed and superseded**: its Phase-1/labs content
becomes mining material for the Explorer track; its standalone-academy mission is
archived (repo README updated to point at /ai when the rebuilt surface ships).

## Why the incumbent doesn't win by default — and why it still wins

The mandate forbids inheriting /ai silently: the old corpus partly died of placement.
The Stage 1 evidence separates two things the goal doc's warning had fused: the corpus
died of **placement-as-configured** (noindex + zero inbound links from any channel —
`research/funnel/funnel.md` §1, mechanically verified), not of **placement-as-URL**.
Nothing in the diagnose shows the /ai path itself cost anything; it was never reachable
enough to fail as a URL. The prescription fixes the configuration; the URL keeps what
the alternatives can't offer:

- The three live inbound channels all already point at the apex — homepage, GitHub
  profile README (site root + /blog only), blog (funnel §1, §3). Any other placement
  adds a hop from where the audience already is.
- Build-time derivation and scheduled builds (freshness lane 1) run on the existing
  Cloudflare Pages project; the /api routes the surface needs are already served and
  router-fixed there (Stage 0 manifest).
- The secondary evaluator lands via profile/referral on the apex; the evidence layer
  must sit where they land (`research/personas/evaluating-client.md` JTBD).

## Why not the alternatives

- **Dedicated subdomain (labs.ninochavez.co precedent)**: starts at zero domain equity
  and zero inbound links — reproducing the orphan state D1 diagnoses, by choice. The
  precedent itself is the strongest counter-evidence: labs is currently dead behind an
  expired cert with no sensor noticing (`evidence-base-local.md` § apps/labs).
- **ai-analyst-academy as the home**: real curriculum (333 files, 18 labs) but zero
  reach (0 stars), stale (pushed 2026-03-07), a CSR-only stub deploy invisible to
  crawlers — the same discoverability failure class as the old /ai — and an
  aspiration-framed mission ("become an AI Analyst") that contradicts the pilot thesis
  of diagnosis-by-existing-craft (`competitive/walkthroughs.md` §5;
  `reference-grading.md` row 5: graded Neither). Absorb its content; don't inherit its
  frame.
- **Split (paths on one surface, evidence on another)**: re-creates the two
  half-failures the goal doc names as the reason this initiative exists — the academy
  taught paths without evidence; a portfolio shows evidence without paths. The fused
  position is the market gap (`01-diagnose.md` D6); splitting forfeits it.

## Consequences

- Prescription P1 (discoverability) and P3 (placement execution) implement this ADR.
- Tier 2 promotion path unchanged: rebuilt surfaces ship into the live SvelteKit app.
- The academy absorb-and-supersede adds a small external prerequisite (repo README
  pointer) alongside the labs-cert and blog-feed items (P9).
- Revisit trigger: if a future initiative gives the practice surface its own product
  identity (beyond ninochavez.co), this ADR is the record of why apex-integration won
  in July 2026.
