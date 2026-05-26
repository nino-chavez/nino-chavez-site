---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
---

# Personas — ninochavez.co v3 audit

Three personas drawn from `blueprint.yml` § `audience.broader`. Each represents a
distinct visit shape — the page they arrive at, the question they're answering, and
the outcome that makes the visit "worth it" for them.

The audience block also names "Nino Chavez (self)" as leadership and engineering.
Self does not get a persona doc. Self is the operator; personas are the people
self is building for.

## Roster

| Persona | Visit question | Decision-by signal |
|---|---|---|
| [Peer Architect](peer-architect.md) | "Is this thinking I'd respect?" | Reads ≥1 long-form piece. Bookmarks or shares. Returns within 30 days. |
| [Prospective Client](prospective-client.md) | "Could this person solve my problem?" | Reaches contact surface (mailto / LinkedIn / Cal.com). Asks a scoped question. |
| [Conference / Speaking Circuit](conference-circuit.md) | "Is this voice interesting enough to platform?" | Pulls speaker bio + headshot. Confirms POV is published, not abstract. |

## Sourcing

Personas synthesized from:
- `_external-corpus.md` § "Peer + competitive references" (peer-cohort calibration)
- Poe stack signals about reader/audience patterns (`apps/website-nc-v3` project signals — same audience cohort, prior session)
- Live referrer + UTM patterns are not yet sensored. Stage 1 assumes the funnel
  map (see `../funnel/`) describes how each persona moves; Stage 4 fact-check
  may revise if analytics reveals different paths.

## Anti-personas — explicitly out of scope

- **Recruiter sourcing for FTE roles** — Nino is at commerce.com; site is not a job-seeking surface.
- **Photography clients** — gallery property handles that surface (`apps/photography`).
- **Volleyball event organizers** — Rally HQ or 630 Volleyball channels.
- **General "what is AI?" learners** — Signal Dispatch blog handles that surface.

The v3 redesign should reject feature requests framed for these anti-personas. If
prescribing for one of the three real personas would dilute the experience for
that persona, the feature does not ship.
