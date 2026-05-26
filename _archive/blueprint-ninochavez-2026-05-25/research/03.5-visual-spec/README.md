---
canonical: true
stage: 3.5
status: draft
last_updated: 2026-05-25
voice_mode: solution-architecture
version: 0.1
---

# 03.5 — Visual Spec

High-fidelity pixel screens for each prototype page. Sits between
`03-design-brief.md` (tokens + composition) and the Stage 4 prototype
implementation (`portal/`).

## Why this stage exists

The brief in `03-design-brief.md` commits to design tokens (color, type,
spacing, motion) and composition decisions (capability prose intro,
receipt-density list, right rail, footer meta-receipt). It does NOT
commit to pixel-fidelity execution — line lengths, density, exact
breakpoints, micro-interaction timing.

`03-design-brief.md § What this brief is NOT, line 650`:
> "A Stage 3.5 visual spec (or direct Figma) would render the brief in
> pixels. The brief commits to tokens + composition; pixel-fidelity is
> the next step."

Stage 4 implementation jumped over this gap in the first pass — the
portal prototype was authored directly from the brief without an
intermediate pixel-spec step. That worked because the brief was tight
enough to constrain execution, but it left no calibration artifact to
compare execution against.

## What's in this directory

| Page | Source | Notes |
|---|---|---|
| `home/screen.png` + `home/stitch-code.html` | Google Stitch (stitch.withgoogle.com) v1 | Studio home page rendered from the Set A prompt at `[session log 2026-05-25]` |
| `speaking/` | Stitch v1 | `/speaking` page from same prompt set |
| `colophon/` | Stitch v1 | `/colophon` page from same prompt set |
| `now/` | Stitch v1 | `/now` page from same prompt set |

## How to read these against the brief

These are NOT specs to implement directly — Stitch hallucinated content
(invented project names, post titles, headshot stock photos) and ignored
specific brief decisions (cyanotype blue → went black + red; cream serif
→ went serif but on dark). They are **calibration artifacts** for:

1. **Composition and density** — does the brief's "prose-led, no hero" land at the right density when rendered? Stitch's home compresses the 11 receipts into a tighter vertical list than the Stage 4 HTML prototype does; that's worth borrowing.
2. **Page differentiation** — Stitch's colophon takes a notably different shape from its home (terminal/console aesthetic with stat-tiles + meta-receipt cards). Stage 4 portal renders colophon as prose-led; Stitch's "show the methodology" treatment is more memorable. Stage 7 candidate.
3. **What gets lost in execution** — Stitch's hallucination of project names + post titles is the exact failure mode our prototype must NOT have. Verifying against these screens confirms the receipt-fidelity discipline.

## Comparison findings — Stitch v1 vs. Stage 4 prototype

Documented during session 2026-05-25 (see session log + commit history):

### Where Stitch beat the Stage 4 HTML prototype

- **Personality faster, no anti-slop intervention needed.** Stitch v1 landed on a distinctive aesthetic on the first prompt; the HTML prototype required a v0.1 → v0.2 rework to escape the AI-default trap.
- **Colophon treatment.** Stitch's stat-tile + meta-receipt-card direction beats the prose-led colophon in the Stage 4 portal. Stage 7 candidate to import.
- **Receipt list density on home.** Tighter vertical rhythm than the current 3-column-grid implementation.

### Where Stage 4 prototype beat Stitch

- **Receipt fidelity.** Stage 4 surfaces the 11 CURRENT receipts verbatim from `_external-corpus.md`. Stitch invented 4 plausible-sounding project names that don't exist. This is the central battle of the v3 redesign — receipts over claims — and Stitch loses it categorically.
- **Cyanotype-as-positioning.** Stage 4 honors the cyanotype blueprint blue + Sir John Herschel reference. Stitch went generic dark + red.
- **Live signal authenticity.** Stage 4 uses real commit hashes (b3a4f12, c45e83f) + real uptime metrics + real Blueprint stage state. Stitch generated placeholder-feeling content.

## What this means for the methodology

For brownfield Pattern B initiatives going forward:

1. **Stage 3.5 should be explicit in the canonical Blueprint template.** Currently the variant doc treats it as implicit ("a Stage 3.5 visual spec would render the brief"). Make it required for brownfield Pattern B, optional for greenfield + midstream.
2. **Stitch (or equivalent visual-spec tool) is a legitimate Stage 3.5 producer.** Outputs need verification against receipts (hallucination check) before they're treated as authoritative — but the visual direction calibration is genuinely useful.
3. **Stage 4 implementation should reference Stage 3.5 as a comparison target**, not as a spec to copy. The HTML/SvelteKit implementation owns content fidelity; the visual spec owns aesthetic calibration.

## v2 — Out of scope (Signal Dispatch redesign)

The `v2/` directory in the source download (`/Users/nino/Downloads/nc-site-stitches/v2/`)
contains a Signal Dispatch v2 design (4 pages: homepage, technical assets,
long form article, series archive) plus a complete DESIGN.md for a
light-mode, ink-on-paper, Source Serif 4 + slate blue editorial direction.

That is a **separate Blueprint initiative** — Signal Dispatch
(`apps/blog`) blog redesign, NOT the ninochavez.co studio surface. Per
resolved Q5 in `_inventory.md`: scope stops at the main site for the
current initiative. Cross-app initiatives expand by ADR.

The v2 artifacts are noted here but not imported into this initiative's
visual spec. If/when Signal Dispatch v2 becomes its own Blueprint
initiative, the artifacts at `~/Downloads/nc-site-stitches/v2/` are
candidate Stage 3.5 inputs for it.
