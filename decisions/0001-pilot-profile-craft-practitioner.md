# ADR-0001 — Pilot profile: craft-practitioner

- **Status**: Accepted
- **Date**: 2026-07-08
- **Stage**: Stage 0 (initiative declaration)

## Decision

The initiative's pilot is the **craft practitioner** — someone applying AI to the
craft they already have, using Nino's demonstrated paths and tools as the map. The
full profile is locked in `blueprint.yml` `pilot_profile:`, taken verbatim from the
initiative seed (`docs/AI-INITIATIVE-GOAL.md` § blueprint.yml seed).

## Why this pilot

The last two failure modes of the /ai surface were each half of the answer this
pilot needs: the old academy taught paths without demonstrated evidence, and a pure
portfolio would show evidence without a transferable path. Organizing around the
practitioner's question — "how can I use AI this way for my own work?" — is the
fusion that serves both (goal doc § Goal).

The pilot is grounded in real artifacts, not imagined research:

1. The 2026-07-08 /ai audit (goal doc § Appendix) — every claim probed against
   live URLs, repo code, and workspace/GitHub surveys; re-probed at Stage 0
   (`research/current-state/00-capture-manifest.md`).
2. The old corpus's own persona taxonomy (`src/routes/ai/learn/**`) — seven
   personas that encode exactly this visitor; the taxonomy is judged sound even
   though its pages assert rather than show the AI application.

## Explicitly out of scope as pilots

- **Evaluator (client/employer)** judging whether the AI-native claim is real —
  served as a byproduct of the same evidence, never the organizing lens.
- **Family/Zoey (Ask Dad)** — private artifact, off the public surface entirely.

## monetization_side note

`operator` — the practitioner operating their own work with AI. The market around
this surface is not transactional; downstream buyers (clients/employers impressed
by the evidence) are a byproduct. Single-sided by design; recorded here per the
pilot-profile gate's generic-side check.

## Amendment trail

- 2026-07-08: `competitors_in_scope` populated at declaration time with the five
  Stage 1 walk targets named by the seed (simonwillison.net, promptingguide.ai,
  Every.to genre, vendor academies, ai-analyst-academy). The seed had left the
  list empty with the same candidates in a comment; the pilot-profile gate
  correctly refused the empty list as unverified scope.
