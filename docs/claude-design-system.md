# Claude proposal — the rationed system

One page. The rules are budgets, and every budget is checkable. Written 2026-08-04
after measuring the two surfaces Nino named as clean (marketing.bcsubs.app, the
work library) against the current homepage. The finding that drives everything
below: the clean sites are not better-documented — they are smaller. The library's
entire visual identity is 402 lines of CSS and 13 tokens with no style guide at
all. This site has 10,615 lines, 42 tokens, and the most documentation of the
three. Coverage is not the cure; ration is.

## Thesis

The site is a light, printed record with one photographic moment per page.
Ink is a material for components, not for page bands. One voice speaks per job:
one accent, one label style, one display face. The photography carries the
identity; everything else stays quiet so it can.

## Tokens (complete list — nothing renders outside it)

Values are the 2026-08-04 corpus harvest (docs/audit/PALETTE-HARVEST-2026-08-04.md).
This proposal changes no hex values; it removes roles.

| Token | Value | Job (the only job) |
|---|---|---|
| `--ground` | `#f0f1f4` | Page ground, and text on ink/photo |
| `--surface` | `#f7f8fa` | Card fill |
| `--surface-muted` | `#dbdde2` | Inset fills, quiet chips |
| `--text` | `#14202e` | All reading text |
| `--muted` | `#5a6472` | Support text, labels |
| `--rule` | `#b9bec6` | Every rule and border (one weight: 1px) |
| `--ink` | `#0e1928` | Component material only: code blocks, badge fill, photo scrim base |
| `--action` | `#14679e` | Every interactive and emphasis color on light ground |
| `--action-quiet` | `#d9e5ef` | Hover fills, quiet action ground |
| `--signal` | `#c53e2a` | One use: the live indicator |

Retired: `--sand`, `--copper`, `--copper-dark`, `--cobalt-bright`, `--rule-strong`,
`--ink-soft`, and every literal outside this table. Their jobs either move to
`--action`/`--signal` or cease to exist.

Focus (amended 2026-08-04 per Codex review): focus is interaction, not status,
so it belongs to `--action` — but `#14679e` alone reads 2.91:1 on ink, under
the 3:1 non-text floor. The focus style is therefore a double ring:
`box-shadow: 0 0 0 2px var(--ground), 0 0 0 4px var(--action)`. The bone inner
ring clears 15.7:1 on ink, so the pair passes on every ground by construction,
and red truly means one thing.

## Budgets (the enforceable core)

| Rule | Budget | How to check |
|---|---|---|
| Dark page bands | **≤ 1 per page, and it must be a photograph.** Flat ink bands: zero. | Count sections with ink/photo ground per rendered page |
| Photography | **0 or 1** full-bleed frames per page — zero is a correct answer, not a gap. Utility routes (Work index, Search, error states) spend none; a frame must earn its band. Additional photos only as sharp contained blocks on light ground. Sharp or absent — no veil scrims. | Frame classes per page; scrim only directional, for type legibility |
| Accent families per ground | 1. `--action` does all emphasis on light. `--signal` is not an accent — it is a status. | Grep rendered colors against token jobs |
| Display faces | 1 on flat ground (`--font` at 700+, `-0.03em`). `--hero` (Anton) only set *into* a photograph, never on flat color. | Grep `var(--hero)` usage sites |
| Label species | 1: mono uppercase 11px, `--muted`, `.08em`. Never red, never cobalt — a label is not an action. | One CSS class (`.label`), zero look-alikes |
| Mono font | Labels, counts, code. Never headings, never body. | Grep `var(--mono)` usage sites (currently 111 — target < 30) |
| Markers per component | ≤ 3: label, title, action. A note *or* a count may replace the label, not join it. | Component review |
| Action markers | 1 per interactive component (the arrow lives on the action line only). | Component review |
| Primary action | 1 filled button per viewport (adopted from SYSTEM.md); everything else is a text action. | Page review |
| Numbers | `tabular-nums`, `--text`. Counts are data, not decoration — no color. | Grep count styles |

Why budgets and not guidelines: bcsubs runs 64 uppercase micro-labels and 70
hairlines and still reads clean, because they are one species in one color doing
one job. The current homepage runs 19 labels and reads noisy, because they come
in three species and two accent colors. The count was never the problem. The
species count is, and species counts can be tested.

## Type

- Display: `--font` (Inter) 700–800, letter-spacing `-0.03em`, tight leading
  (0.95–1.05). Scale: page title `clamp(2.6rem, 6vw, 4.5rem)`; section title
  `clamp(1.8rem, 3.5vw, 2.6rem)`. Sentence case, period allowed only when the
  heading is a sentence.
- In-photo display: `--hero` (Anton) uppercase, color `--ground` or `--ink`
  depending on the frame's own values, set in the photograph's negative space.
  This is the only uppercase display and the only Anton.
- Body: `--font` 400/560, 16–18px, line-height 1.55.
- Label: `--mono` 11px uppercase `--muted`. Counts: `--mono` tabular, `--text`.

## Photography

The identity carrier (memory: photo-as-ground reads creative technologist;
type-only reads template). Dosage per the same record: one full-bleed moment
per page, subject readable, type in negative space; everything else contained.
Duotone recipe and frame assets already exist (`public/images/frame-*`,
recipe in docs/audit/PALETTE-HARVEST-2026-08-04.md). Scrims are directional
(0.88 → 0.16) and exist only where type needs them.

**Subject-match rule (amended 2026-08-04, owner feedback):** the photograph
must depict the page's own subject, not the brand in general. A volleyball
frame on a page about learning AI-assisted work is decoration wearing the
identity's clothes — it confuses the reader it was meant to orient. Archive
photography appears where the archive is the subject: the home identity
surface (credited), /photography, and volleyball work. Pages about software
work show their own real artifacts (session frames, product screenshots) or
nothing — zero was already a correct answer, and off-subject is worse than
zero.

## Component inventory (eight, complete)

1. **Shell** — `min(var(--content), 100% - 48px)`, centered.
2. **Section register** — label + title + one support line. Opens every section.
3. **Card** — `--surface`, 1px `--rule`, optional sharp image top, label/title/action.
4. **Ledger row** — title + support + count + arrow, 1px rule between rows.
5. **Frame** — the page's one photographic band; in-photo Anton allowed.
6. **Contained photo** — sharp image block inside a light section (the second
   legitimate photo mode).
7. **Button** — filled `--action` / quiet `--action-quiet` pair. Live badge:
   `--signal` dot + mono label, the only red.
8. **Footer** — bone ground, 1px top rule. Not ink.

Anything a page needs beyond these eight is a proposal against this document,
not an improvisation in globals.css.

## What this changes on the current site

- Session index and footer leave ink for bone. The homepage keeps **one** dark
  moment; hero (full-bleed frame) and all-work cannot both be bands — the
  all-work treatment becomes a contained sharp photo panel with its Anton line
  set inside the photograph (concept preserved, dosage corrected).
- Red eyebrows, red domain counts, red arrows → `--muted` labels, `--text`
  counts, `--action` actions. Red keeps the live dot only.
- The bold-sans/Anton/mono three-voice display collapses to one voice plus
  in-photo Anton.
- globals.css shrinks toward the inventory: the dormant hero/evidence/ways
  blocks and every retired-token style go.

## Scope and adjacent authorities (amended 2026-08-04, merge with Codex system)

This document owns the visual language: palette, typography, photography,
composition, and the budgets above. It is deliberately not a website framework.

- **Behavior, interaction, accessibility, and route archetypes** come from
  `art-direction/round-04-portfolio-system/SYSTEM.md` — its component
  behavioral contracts (mobile navigation dialog, CollectionControls,
  StateLabel, Breadcrumbs, empty/filtered states), §Interaction and motion,
  §Accessibility, §Page archetypes, and its prototype acceptance checklist,
  which becomes the gate for applying this system. Two guards on the merge:
  1. Behavioral components consume this document's tokens. Any SYSTEM.md
     clause naming a color, face, or marker (its `#2b55d4` action blue, its
     retirement of full-bleed photography and condensed display) is struck —
     visual authority does not transfer with the behavior.
  2. Copy and naming stay with their existing owners: `docs/IA-NAVIGATION.md`
     and `docs/OPEN-PRACTICE-ART-DIRECTION.md` §Copy. SYSTEM.md's §Copy and
     naming is a third copy authority and is struck wholesale — one owner per
     rule. Concrete conflict it would have introduced: it lists "Demos" as a
     canonical name where the standing contract renders the surface as
     "How I work".
- **StateLabel compatibility**: SYSTEM.md's "never a colored badge as the only
  signal" composes with the live badge here — the `--signal` dot is never
  alone; its mono text label carries the meaning.

## Enforcement

The copy contract is already mechanical (`npm run test:audit`); this contract
joins it. Three cheap checks: (1) rendered pages contain ≤ 1 dark band and it
carries a frame class; (2) computed colors on rendered pages resolve only to
token values with their table job; (3) `var(--hero)` and `var(--mono)` usage
sites stay inside their budget lists. A budget that fails loudly is the only
kind that survives an editing pass.

## Provenance

Measured 2026-08-04 in-session: full-page renders of marketing.bcsubs.app,
library.ninochavez.co (gate + repo CSS at
`~/Workspace/dev/apps/work-library/app/globals.css`), and localhost:4173.
Dark-ground share by row luminance: bcsubs 16%, current home 73%. Style
fingerprints (label counts, hairline counts, font tallies) captured via
browser eval the same day. Palette provenance: PALETTE-HARVEST-2026-08-04.md.
Not verified: the library's interior pages in-browser (passphrase gate);
its CSS was read from the repo instead.
