---
# Nino Chavez ⊕ studio — ninochavez.co v3
# Practitioner studio surface. Architect-primary identity, receipt density,
# methodology-as-meta-receipt. Authored from blueprint/research/03-design-brief.md v0.2.
#
# v2 design doc (violet + content-forward + AEO-thesis) archived at
# docs/_archive/DESIGN-v2.md. Do not amend; v3 starts clean.
schemaVersion: 2
name: Nino Chavez ⊕ studio
tagline: Practitioner studio surface — architect-who-directs-agents at production scale
mode: dark
direction: cyanotype-drafting-room

colors:
  canvas: '#1e3a5e'           # Deep cyanotype blueprint blue. Sir John Herschel, 1842 — architectural drafting reproduction. Color IS positioning.
  surface-1: '#26446a'         # Elevated surfaces (rail cards, footer)
  surface-2: '#2e4f78'         # Hover / pressed
  text-primary: '#f6efdb'      # Warm cream — paper-aged, ~10.2:1 contrast against canvas
  text-secondary: '#e3d8b6'    # ~8.0:1 contrast
  text-muted: '#c4b894'        # ~6.4:1 — passes WCAG AA normal text
  accent-red: '#e8623f'        # Counter-saturated proof-mark red. Used SPARINGLY: live signal dots, single CTA, single emphasis word. NEVER a link color.
  accent-red-hover: '#f47a5b'
  border: 'rgba(244, 236, 216, 0.28)'
  border-strong: 'rgba(244, 236, 216, 0.5)'

  # Link convention — cohort-divergent. Links use text-primary color with
  # underline; the underline IS the signal. No separate link color.
  link: '{colors.text-primary}'

typography:
  fonts:
    display:
      family: Bree Serif
      fallbacks: [Tiempos Headline, Georgia, serif]
      weights: [400]
      note: Drafting-room display serif. Used at confident scale (h1, h2, capability prose).
    body:
      family: Crimson Pro
      fallbacks: [Tiempos Text, Charter, 'Iowan Old Style', serif]
      weights: [400, 500, 600]
      note: |
        Body in serif is the RADICAL move for this cohort. Every audited
        L1/L2 cohort site uses sans for body. Serif body codes "writer's
        site" in every sentence the visitor reads. Do not substitute.
    ui:
      family: Inter
      fallbacks: [ui-sans-serif, system-ui, sans-serif]
      weights: [400, 500, 600]
      note: |
        UI ONLY — nav items, live-signal text-secondary labels, footer
        labels. Sans must NEVER escape into prose. If you find yourself
        applying Inter to a paragraph or h2, you've drifted.
    mono:
      family: JetBrains Mono
      fallbacks: [ui-monospace, 'SF Mono', monospace]
      weights: [400, 500, 700]
      note: Code, timestamps, commit hashes, live-signal labels, mono section prefixes (§).

  scale:
    display: 'clamp(2.5rem, 5.5vw, 4.5rem)'   # Capability prose intro; max h1
    h2:      'clamp(1.75rem, 3vw, 2.5rem)'    # Section headers
    h3:      '1.5rem'                         # Subsection / receipt name
    lead:    '1.25rem'                        # Lead paragraphs
    body:    '1.125rem'                       # Body prose (larger than typical — serif body benefits)
    meta:    '0.9375rem'                      # Secondary prose, URLs in receipt list
    micro:   '0.8125rem'                      # Mono labels, footer fine print

  leading:
    display: 1.15
    h2:      1.15
    body:    1.65                             # generous for serif comfort
    relaxed: 1.75

  tracking:
    display: '-0.025em'
    h2:      '-0.015em'
    body:    '0'
    mono-label: 'normal'                      # lowercase mono — letterspacing zero

layout:
  containerMax:   80rem                       # Wider than v2's 72rem; narrower than the current asymmetric live /
  readingColumn:  42rem                       # ~65ch for prose comfort
  mainColumn:     2.2                         # Two-column desktop ratio: mainColumn vs railColumn
  railColumn:     1
  columnGap:      'clamp(2rem, 5vw, 5rem)'
  sectionY:       'clamp(4rem, 8vw, 8rem)'
  gutter:         'clamp(1.25rem, 2vw, 2rem)'
  baseUnit:       4px
  headerHeight:   ~4.5rem                     # Slightly taller than v2's 4rem for the wordmark + studio subtitle

  # Subtle drafting-paper grid texture on canvas
  canvasGrid:
    size:    32px
    opacity: 0.025
    color:   '{colors.text-primary}'

motion:
  reveal:
    direction: up                             # Single direction only
    distance:  8px
    duration:  320ms
    easing:    'cubic-bezier(0.16, 1, 0.3, 1)'
  hover:
    duration:  180ms
    easing:    ease-out
    interactions:
      - receipt-list-name → accent-red underline reveal
      - link → border-bottom transition
      - cta → background shift accent-red → accent-red-hover
  ambient: none                               # NO ambient animation
  heroRotation: none                          # NO hero photo rotation (retired)

wordmark:
  format: 'Nino Chavez ⊕ studio'
  composition: |
    Two-line stack:
      Line 1: "Nino Chavez" in Bree Serif at 1.75rem + "⊕" glyph in JetBrains Mono red at 1.25rem (translated -2px)
      Line 2: "studio" in JetBrains Mono at 0.6875rem, text-muted, +0.12em tracking, lowercase
  custom: ⊕ symbol is the practice mark. Final commission TBD; current symbol is placeholder.
---

# Nino Chavez ⊕ studio — Design System

## Overview

This design system supports **Nino Chavez ⊕ studio** — the practitioner
studio surface at `ninochavez.co`. Authored from
`blueprint/research/03-design-brief.md` v0.2 (the anti-slop reinvention).
Cyanotype blueprint blue canvas + cream Crimson Pro serif body + Bree
Serif display + counter-saturated proof-mark red emphasis.

The previous v2 system (violet + Inter + content-forward + AEO thesis) is
archived at `docs/_archive/DESIGN-v2.md`. Do not amend v2; v3 starts
from the brief, not from a diff.

## Identity claim

The site identifies as a **practitioner studio surface** — Nino as
software architect directing AI agents to ship enterprise commerce,
plus the corpus of shipped products + 277-essay Signal Dispatch
archive that backs the claim. NOT a personal portfolio, NOT a creative-
brand surface, NOT a multi-pursuit polymath site.

The wordmark formalizes this: `Nino Chavez ⊕` with a small mono
`studio` subtitle. Smallest possible delta from "Nino Chavez" personal
identity; framing without rename.

## Color = positioning

Cyanotype blueprint blue is a **direct material reference** to Sir John
Herschel's 1842 architectural drafting reproduction process. Color
choice ties to:
- **Blueprint methodology** — the methodology the site documents and
  was produced by
- **Architectural practice** — the architect identity the capability
  statement claims
- **Cohort divergence** — every audited peer-cohort site uses charcoal
  or pure neutrals; cyanotype is unowned in this market

Counter-saturated proof-mark red (`accent-red`) recalls a proofreader's
mark. Used SPARINGLY: live-signal dots, single CTA emphasis, the rare
emphasis word in body prose (e.g., "harness" in the capability sentence).

**Never use red as a link color.** Links inherit text-primary with
underline as the signal.

## Type = identity

The serif body is the cohort-divergent move. Every audited L1/L2 peer
site (Lovin, Lopopolo, Litt, Larson, Majors, Böckeler, Klein, Thompson)
uses sans for body. Serif body codes "writer's site" in every sentence
the visitor reads — the 277-essay Signal Dispatch archive is the
authority anchor, and the type system mirrors it.

Bree Serif (display) is a working slab — drafting-room textbook feel,
NOT the cohort-default Source Serif Pro / GT Sectra / Tiempos. Picked
deliberately to avoid the AI-portfolio template default.

Inter is **UI ONLY** — nav items, live-signal labels, footer
microcopy. Sans never escapes into prose. If you find yourself reaching
for Inter on a paragraph or h2, you've drifted into vibe-coded-tailwind
territory.

## Layout — prose-led, no hero, two-column

The home page **opens with prose**, not a centered hero. The capability
claim is woven into the first prose paragraph, not staged. This is the
single most anti-template move in the system — every AI-generated
portfolio defaults to hero-centered-above-fold.

Desktop is two-column: main column (~2.2 / 1) + permanent right rail
for live state, photography anchor, adjacent surfaces. Mobile collapses
to single-column journal-entry flow.

## Anti-slop discipline

This system was authored against an explicit anti-slop test. Forbidden
patterns (these are the AI-default tells that v0.1 of the brief
produced and v0.2 retired):

**Do NOT**:
- Use charcoal canvas (`#0e1014`-ish) with a "tasteful warm accent" — that's the Cursor/Linear/Vercel-clone shape
- Use copper / amber accent — same family, same trap
- Mono uppercase tracking-wide section labels — single most-overused AI-portfolio tell
- Stick a sticky-blur header on the page
- Use hairline section dividers + grid-aligned receipt cards
- Center a hero above the fold
- Rotate a hero photo
- Use the four-pursuit framing (Photography / Music / Writing / Building)
- Default to Source Serif Pro / GT Sectra / Tiempos for h1 — those are cohort defaults
- Use Inter for body prose — sans body is cohort-default for this audience

**Do**:
- Open with prose (capability claim in the first paragraph)
- Receipt list flat and dense (Lovin pattern: name + 1-line description per row)
- Body in serif (cohort-divergent; codes "writer")
- One color (cyanotype canvas + cream type); a single counter-saturated emphasis (proof-mark red)
- Mono lowercase labels with `§` prefix; tracking 0
- Subtle drafting-paper grid texture on canvas at 2.5% opacity
- Custom mark in the wordmark (⊕ in red)

## Receipt-bucket discipline

Per `blueprint/research/_external-corpus.md`: the site cites 11 CURRENT
receipts as live. 2 EVOLUTION items (AI Hive, Labs hub) mention only as
"where I started." 1 CLIENT-CONTEXT (630-volleyball) mention only.
14 ADJACENT/EXPERIMENT items DO NOT cite. Receipt fidelity is the
central battle of v3 — every claim must be verifiable.

## Per-surface composition

- **`/`** — Header (wordmark + nav) → prose intro w/ capability claim
  → CTA → live signals strip → "On the desk this week" (11 receipts
  topic-grouped) → "Recent dispatches" (5 + 277-archive callout) →
  "Threads I keep pulling on" (4 named topic anchors) → footer
- **`/speaking`** — bio variants (50/100/250) → headshot library →
  topic list → past-talks credits → single inquiry CTA
- **`/colophon`** — methodology meta-receipt with Blueprint pipeline
  stages + stack + influences + v3-vs-v2 deltas (Stage 7 candidate:
  rework to stat-tile + receipt-line treatment per
  `blueprint/research/08-stage-7-candidates.md § C1`)
- **`/now`** — live state mirror: in-flight initiatives + Blueprint
  stage status + recent writing + reading/listening rotation
- **`/about`** — bio + role + influences + selected client context
- **`/work`, `/work/[slug]`** — preserved from v2 (per-project depth)
- **`/ai/{ask,build,learn,reference}`** — preserved 5-page subsection;
  surfaced from nav per resolved Q1 (`/ai/` is shipped, not experimental)
- **`/v1`** — archived to `_archive/` (per `02-prescription.yml § P3-1`)

## Chat surface

Persistent chat FAB on every page, labeled "Ask Signal Dispatch."
Grounded in the 277-essay corpus via Cloudflare Vectorize binding.
Streaming responses with cited post excerpts. Cohort-divergent — no
audited peer site has this surface.

## Provenance

Authored from `blueprint/research/03-design-brief.md` v0.2 — the
anti-slop reinvention after v0.1 cohort-followed and produced AI-default
tells. Stage 4 prototype lives at `blueprint.ninochavez.co` and
demonstrates this system. Stage 5 fact-check (`blueprint/research/05-fact-check.md`)
verified 6 anchors pass, 5 defer to production deploy (this is part of
that production deploy).

For the full methodology trail: `blueprint/research/01-diagnose.md`
through `blueprint/research/08-stage-7-candidates.md`. The site is the
methodology's latest output; the methodology is itself a receipt the
site cites.
