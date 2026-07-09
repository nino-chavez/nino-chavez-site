# 05 — Strategy Summary: AI Practice Surface Rebuild

**Date:** 2026-07-08
**Status:** Package complete · pre-deploy
**Inputs:** `01-diagnose.md`, `02-prescription.yml`, `03-design-brief.md`, `04-fact-check.md`, `blueprint/portal/` (3-page prototype)

**Decision:** Rebuild ninochavez.co/ai as an integrated, evidence-backed enablement
surface — persona-diagnosed paths as the product, shipped artifacts as the proof,
freshness as architecture — and ship it into the live SvelteKit app (Tier 2) behind
the two ADR-recorded calls already made: placement stays on the apex (ADR-0002) and
the public Ask dies at launch (ADR-0003).

**Why:** The old section failed for four separable reasons, all evidenced at exact
file:line or live probe (`01-diagnose.md` D1–D5): unreachable by construction, an
evidence layer that broke at first click, sound pedagogy that asserted rather than
showed, and a publication gap (the strongest tools were private — four of five now
made public, 2026-07-08). No competitor fuses diagnosis + one person's shipped
evidence + self-serve paths + self-maintaining freshness (D6); that fused position
is open and this package occupies it.

## What exists now (the reviewable package)

| Artifact | What it answers |
|---|---|
| `01-diagnose.md` | Why the current surface fails, with every claim probed |
| `02-prescription.yml` | The nine changes, impact-ordered, evidence-cited, JTBD-traced |
| `03-design-brief.md` | IA, component/data contract, aesthetic + voice constraints |
| `04-fact-check.md` | Convergence record — 9 gates PASS, 1 by-design WARN |
| `blueprint/portal/` | Three current-vs-proposed comparison pages with strategy drawers |
| `decisions/0001–0003` | Pilot lock, placement, Ask kill — each with a revisit trigger |

## The build, in order (from the prescription)

1. **P1–P3 (critical):** reachability (nav, homepage card, drop noindex, profile +
   blog inbound links), evidence integrity (remove Ask + dead cards + false stats),
   placement execution incl. academy absorb-and-supersede.
2. **P4–P6 (high):** the TrackPage data layer, the derived /ai/work registry, and
   the three-lane freshness pipeline (derive / sense / agentic refresh) — the
   pipeline is a launch deliverable, not a follow-up, because unsensed rot is what
   killed the last version.
3. **P7–P9 (medium):** self-serve CTAs, cuts, and the external-repo prerequisites
   (blog feed scope, labs cert fix-or-retire, academy README pointer, GCP key
   revocation — the last is an operator action, flagged 2026-07-08).

## Open items and owners

| Item | Owner | When |
|---|---|---|
| Review the 3 portal pages + drawer questions (persona strip vs single path; grounding-banner order; access-label legibility) | Nino | at portal review — **live at https://ai-enablement-blueprint.pages.dev** |
| ~~Deploy portal to Cloudflare Pages~~ Deployed 2026-07-08 (`ai-enablement-blueprint` Pages project; chat secret wired from 1Password `blueprint-global`) | done | Stage 7 |
| Revoke leaked GCP key in forge-signal history | Nino | now |
| forge-signal fresh-cut public release (optional; Author/Strategist already re-grounded on Blueprint) | Nino decision | any time |
| Tier 2 implementation of P1–P9 in the SvelteKit app | follow-on sessions in this worktree | after portal review |

## Method statement

Every number and claim in this package traces to a command, probe, or file:line in
the Stage 1 research docs or the Stage 0/5 verification passes, run 2026-07-08. No
statistic in the package is asserted without a derivation path — the same standard
the rebuilt surface enforces on itself.
