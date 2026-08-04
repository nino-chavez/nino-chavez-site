# Palette harvest — 2026-08-04

The site's previous palette paired warm cream surfaces with a copper accent
whose value (`#d07a4e`) sat 9 RGB points from Anthropic's Claude coral
(`#d97757`, sampled from anthropic.com the same day). External feedback read
the site as "Claudeish"; the pair was the fingerprint. This record documents
the replacement palette and its provenance.

## Method

- Corpus: 80 of 122 unique images published on photography.ninochavez.co
  (home, explore, timeline), fetched 2026-08-04 as Cloudflare Images
  thumbnails.
- Extraction: ImageMagick quantization over a 64px-per-frame contact strip.
  A 14-color pass produced the dominant families; a 48-color pass ranked by
  chroma produced the accent candidates.
- Every token value is either verbatim quantizer output or a lightness ramp
  of a corpus swatch. No free-picked colors.

## What the corpus established

1. The dark family was already honest: the quantizer emits `#0e1928` and
   `#17262e`, bracketing the previous `--ink #091426`.
2. The dominant chroma family is blue at hue 200–215 (court paint, sky,
   jerseys): `#14679e`, `#2691c8`, `#0f5bc3`. The previous cobalt `#4051ed`
   (hue 234, violet) appears in no frame.
3. The warm family is deep signal red at hue 0–9 (`#9b1e1a`, `#c53e2a`,
   `#dc6b6a`), not the hue-17 coral band.

## Token assignments (app/globals.css `:root`)

| Token | Value | Source | Contrast (WCAG 2.1) |
|---|---|---|---|
| `--ground` / `--bone` | `#f0f1f4` | ramp of corpus `#dbdde2` | — |
| `--surface` | `#f7f8fa` | same ramp | — |
| `--surface-muted` | `#dbdde2` | verbatim | — |
| `--text` | `#14202e` | corpus dark family | 14.9:1 on surface |
| `--ink` / `--ink-soft` | `#0e1928` / `#17262e` | verbatim | 15.7:1 under bone text |
| `--action` / `--cobalt` | `#14679e` | verbatim (court blue) | 5.7:1 on surface, AA |
| `--cobalt-bright` | `#2691c8` | verbatim | 5.0:1 on ink, AA |
| `--action-quiet` | `#d9e5ef` | ramp of corpus `#b3c8d5` | — |
| `--copper` | `#9b1e1a` | verbatim (signal red); light-ground warm accent | 7.6:1 on surface, AAA |
| `--copper-dark` | `#dc6b6a` | verbatim; dark-ground warm accent (eyebrows on ink) | 5.4:1 on ink, AA |
| `--focus` | `#c53e2a` | verbatim; only red clearing 3:1 on BOTH grounds for focus rings | 4.8:1 light / 3.5:1 dark |
| `--sand` (new) | `#cb9a5e` | verbatim; dark-hero warm note, hover flashes | 7.0:1 on ink, AAA |

Two deviations from the initial proposal artifact, both from usage analysis:

- `--copper-dark` is `#dc6b6a`, not `#c53e2a`. The token's actual role is
  warm text on dark ink (56 usages, mostly eyebrows); `#c53e2a` reaches only
  3.45:1 there. The previous value managed ~4.4:1 — the swap improves it.
- `--focus` is `#c53e2a`, not `#9b1e1a`. Focus indicators must clear 3:1 on
  both grounds; `#9b1e1a` fails on ink (as did the previous `#9f4f30`).

## Literal sweep (same commit)

Hardcoded values outside the token block, replaced role-for-role:

- `rgb(241 234 223 / *)` ×118 → `rgb(240 241 244 / *)` (bone-with-alpha on
  dark sections; the warm-white cast was part of the cream fingerprint)
- `#ffb082` ×3 (hover flash on dark) → `var(--sand)`
- `#ead8ca` ×2 → `#e8dcc3` (pale sand ramp); `#e3d8ef` → `#dce3d2` (pale
  sage, corpus turf family); `#d9d0c2`, `#dcd4c8` → `#d3d6dc`; `#cbd2ff` →
  `#c4dbea` (pale court blue); `#c7673f` (tile bg, white text) →
  `var(--copper)` (8.1:1)
- Kept: `#d8dce9`, `#132541`, `#071015`, `#050b12` — already inside the
  harvested cool/navy families.

## Not fixed by this change

The palette is roughly half the "AI-generated" signal. The Anton condensed
hero, uppercase mono eyebrows, and hairline registers are the other half and
are a separate decision. Test sequence: ship the palette, re-ask the
original reviewer.

## Fleet scope

Photography (charcoal chrome) and the blog (zinc + Signal Coral `#e86c5d`)
do not share the fingerprint and keep their own brands per IA-NAVIGATION's
brand-handoff rule. Incidental finding: the blog's accent sits 12 RGB points
from corpus `#dc6b6a` — already nearly corpus-honest.
