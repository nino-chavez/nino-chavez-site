# 06 — Triage log (Stage 7, Iterate)

Reverse-chronological. Stakeholder feedback on the deployed portal
(https://ai-enablement-blueprint.pages.dev), classified and dispositioned.

## 2026-07-08 — Evidence tier correction (operator)

**Feedback**: "Atelier is still not a live product. Rally HQ and Blueprint and
photography sites are all real shipped products that demonstrate how to do knowledge
work and build with AI."
**Category**: copy/evidence accuracy — the exact over-promising failure class the
initiative exists to kill (a "live" badge on an OAuth-walled docs index).
**Disposition**: **Accept, applied same day.**

Changes:
- Front-door proof strip now leads with the shipped products: Blueprint, Rally HQ,
  Photography, specchain. Atelier and ai-champions-kit moved off the front door
  (both remain on /ai/work).
- Builder grounding banner: Rally HQ (live) replaces Atelier; specchain + Ask BC
  unchanged.
- /ai/work registry: Rally HQ + Photography cards added (12 total); Atelier demoted
  to `clone` with a gloss that says plainly it is not yet a live product.
- Probes: rallyhq.app 200; photography.ninochavez.co → 301 → ninochavez.co/photography/
  200; rally-hq repo PRIVATE (card derives from live probe, same rule as Ask BC),
  photography repo PUBLIC (pushed 2026-06-24).
- Propagated to `01-diagnose.md` D4 addendum, `02-prescription.yml` P4/P5, and the
  page metas' strategy drawers.

**Why this matters beyond the fix**: the correction is Stage-2 P6's claim-lint thesis
demonstrated on the initiative's own artifact — "live" must be a sensor-backed,
operator-agreed status, and an HTTP 200 alone does not make a product live. The
Tier-2 access-label vocabulary gains the distinction: `live` = a real product a
visitor can use; a reachable-but-gated docs index is `clone` or `gated`, never `live`.
