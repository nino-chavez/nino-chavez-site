# Accessibility review — Open Practice redesign

- **Role**: 5 — Accessibility specialist
- **Standard**: WCAG 2.2 Level AA (Level A criteria included; AAA noted separately and never counted as a violation)
- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Evidence**: `docs/audit/evidence/d0cfd0e/` — 36 rendered HTML documents, `route-report.json`, `app/globals.css`
- **Method**: static audit of rendered markup and the stylesheet. No browser. Contrast ratios computed from source values with alpha composited against the resolved ground.

Severity per `docs/AUDIT-PLAN.md`: **S1** blocks launch (includes any WCAG Level A failure). **S2** contract clause violated. **S3** craft and consistency. **S4** observation outside contract.

Already filed in `FINDINGS.md` and not re-reported here: the `/about` 18×17 clipped practice links (S1, 2.5.8), reduced motion (conforms), the bare-`text/plain` 404.

---

## Findings

### [S1] Nine routes carry a title that does not describe the page — 2.4.2 Page Titled (Level A)

Every detail route renders the homepage's title verbatim: `Nino Chavez — Open Practice`. A screen-reader user tabbing between tabs, a bookmark list, and browser history all show nine identical entries for nine different objects.

2.4.2 requires titles that "describe topic or purpose." Not uniqueness — descriptiveness. `Nino Chavez — Open Practice` on `/work/rally-hq` describes the site, not the page. The collection routes get this right (`Work library — Nino Chavez`, `Explorer learning path — Nino Chavez`), which makes the detail routes a gap rather than a house style.

Nine routes render this string. The homepage is its legitimate holder; the other eight are the defect:

| Route | Title rendered | |
|---|---|---|
| `/` | `Nino Chavez — Open Practice` | correct — this is the site entrance |
| `/work/rally-hq` | `Nino Chavez — Open Practice` | |
| `/work/browse-tool` | `Nino Chavez — Open Practice` | |
| `/work/fleet-observability` | `Nino Chavez — Open Practice` | |
| `/work/volleyrx` | `Nino Chavez — Open Practice` | |
| `/demos/twelve-messages` | `Nino Chavez — Open Practice` | |
| `/demos/adopt-or-skip` | `Nino Chavez — Open Practice` | |
| `/demos/applied/adopt-or-skip` | `Nino Chavez — Open Practice` | |
| `/demos/applied/config-probe` | `Nino Chavez — Open Practice` | |

- **Criterion**: WCAG 2.2 **2.4.2 Page Titled, Level A**
- **Evidence**: `evidence/d0cfd0e/route-report.json`, `byWidth.1280.title` for each route above; `evidence/d0cfd0e/html/work_rally-hq.html` `<title>`
- **Repro**: load any `/work/:slug` or `/demos/:slug`; read the browser tab
- **Fix**: give each detail route a `generateMetadata` title of the shape `<record name> — Nino Chavez`, matching the pattern the collection routes already use.

---

### [S2] Small text on five of six domain tiles falls under 4.5:1 — 1.4.3 Contrast (Minimum), Level AA

`/` renders `<nav class="domain-index" aria-label="Work domains">` as six tinted tiles. The tile backgrounds are set per `nth-child`, but the text colours are fixed: `--muted` `#68645e` for the index number and the record count, `--copper` `#9f4f30` for the arrow. Both are 12px (`font-size: 0.75rem`, mono, uppercase) — small text, so the 4.5:1 threshold applies with no large-text relief.

| Tile | Background | `--muted` #68645e (`<span>`, `<small>`) | `--copper` #9f4f30 (`<b>`) |
|---|---|---|---|
| 1 Practice | `--action-quiet` `#dfe3ff` | 4.64 PASS | 4.56 PASS |
| 2 Local-first | `--surface-muted` `#e5ded2` | **4.40 FAIL** | **4.32 FAIL** |
| 3 Volleyball | `#d8dce9` | **4.29 FAIL** | **4.22 FAIL** |
| 4 Commerce | `#ead8ca` | **4.25 FAIL** | **4.17 FAIL** |
| 5 Media & assets | `--surface-muted` `#e5ded2` | **4.40 FAIL** | **4.32 FAIL** |
| 6 Writing | `#e3d8ef` | **4.29 FAIL** | **4.22 FAIL** |

The failing text is informational, not decorative: `<small>3 records</small>` is the only place the per-domain count appears. (The `<b>→</b>` arrow is `aria-hidden="true"` and duplicates the tile's own link semantics, so it has a defensible "pure decoration" exemption — the `<span>` and `<small>` do not.)

- **Criterion**: WCAG 2.2 **1.4.3 Contrast (Minimum), Level AA** — 4.5:1 for text under 24px
- **Evidence**: colour and size at `app/globals.css:3521-3526` (`.domain-index span, .domain-index small` → `color: var(--muted)`, `font-size: 0.75rem`); backgrounds at `app/globals.css:7751-7775`; palette at `app/globals.css:39,41,46`; rendered markup at `evidence/d0cfd0e/html/index.html`
- **Repro**: load `/`, read the record count on any tile except Practice
- **Fix**: the tints are only ~4% short. Darkening `--muted` from `#68645e` to `#5f5b56` clears 4.5:1 on all six tints without touching the tile palette — verified against the worst tint `#ead8ca`, where it lands at **4.87:1** (from 4.25), and it lifts every other `--muted` pairing at the same time (bone goes 4.92 → 5.64). `--copper` needs `#98492b` to clear the same tints (4.57:1 worst case) — but see the focus-ring finding first: `--copper` and `--focus` share a hex today and this change pulls them apart.

---

### [S2] Applied-technique cards repeat the same shortfall on `/demos` — 1.4.3 (Level AA)

Same mechanism, second surface. Eight `.demo-technique-card` tiles cycle three backgrounds via `nth-child(3n+2)` and `nth-child(3n)`, with fixed `--muted` text for the card's description and category label.

| Cards | Background | `--muted` #68645e (`small`, `p`) | `--copper` #9f4f30 (`> span`) |
|---|---|---|---|
| 1, 4, 7 | `--action-quiet` `#dfe3ff` | 4.64 PASS | 4.56 PASS |
| 2, 5, 8 | `--surface-muted` `#e5ded2` | **4.40 FAIL** | **4.32 FAIL** |
| 3, 6 | `#ead8ca` | **4.25 FAIL** | **4.17 FAIL** |

`.demo-technique-card p` is the card's full description at the inherited 16px — body copy, not a label. Five of eight cards render it below threshold.

- **Criterion**: WCAG 2.2 **1.4.3 Contrast (Minimum), Level AA**
- **Evidence**: `app/globals.css:8655-8674` (backgrounds), `8683-8694` (`> span` → `--copper`, `small` and `p` → `--muted`); rendered markup at `evidence/d0cfd0e/html/demos.html`
- **Repro**: load `/demos`, read the description on the second card
- **Fix**: same single-token change as the finding above.

---

### [S2] The focused technique card drops its own body copy to 3.79:1 — 1.4.3 (Level AA)

`.demo-technique-card:hover, :focus-visible` fills the card with `--cobalt` `#4051ed` and recolours the text to `rgb(255 255 255 / 0.72)`. Composited against the cobalt fill that resolves to `#cacefa`, which measures **3.79:1** — below 4.5:1 for the 16px description.

This bites hardest on keyboard navigation: the card a keyboard user has focused is the one card whose text they cannot read at threshold. The unmodified `white` used one rule earlier for `strong` measures 5.80:1, so the 0.72 alpha is the whole defect.

- **Criterion**: WCAG 2.2 **1.4.3 Contrast (Minimum), Level AA**
- **Evidence**: `app/globals.css:8677-8681` (focus fill `var(--cobalt)`), `8699-8703` (`color: rgb(255 255 255 / 0.72)`); composited `#cacefa` on `#4051ed` = 3.79:1
- **Repro**: tab to any card in the applied-technique grid on `/demos`
- **Fix**: raise the alpha to 1 (5.80:1) or drop it to `rgb(255 255 255 / 0.86)` (≈4.7:1).

---

### [S3] The decorative arrow on light tiles sits at 2.3–2.5:1

`.demo-technique-card em b` keeps `--copper-dark` `#d07a4e` — a colour tuned for the dark grounds, where it is correct — while the card behind it is light. It measures 2.52:1 on `#dfe3ff`, 2.39:1 on `#e5ded2`, 2.31:1 on `#ead8ca`, and 1.82:1 once the card is focused and fills cobalt.

Filed S3 rather than S2 because the glyph is `aria-hidden="true"` and the whole card is one link, so 1.4.3's "pure decoration" exemption is arguable. It is still the affordance cue a sighted low-vision user looks for, and it is the only `--copper-dark` usage in the stylesheet that is not on an ink ground.

- **Criterion**: WCAG 2.2 1.4.3 (Level AA) if the arrow is treated as text; exempt if treated as decoration
- **Evidence**: `app/globals.css:8645-8647`; contrast with `--copper-dark` `#d07a4e` (`app/globals.css:53`)
- **Fix**: use `--copper` `#9f4f30` on light grounds, matching `.domain-index b`.

---

### [S3] Two working-set tiles put 12.5px metadata at 4.40–4.47:1 — 1.4.3 (Level AA)

`.working-set__list small` is `rgb(241 234 223 / 0.55)` at `font-size: 0.78rem`. Composited against the per-tile backgrounds:

| Tile | Background | Composited | Ratio |
|---|---|---|---|
| 1 | `--ink-soft` `#111f34` | `#8c8f92` | 5.09 PASS |
| 2 | `#162946` | `#8e939a` | 4.72 PASS |
| 3 | `rgb(64 81 237 / 0.24)` over ink-soft → `#1c2b60` | `#9194a6` | **4.47 FAIL** |
| 4 | `#24324b` | `#95979c` | **4.40 FAIL** |

Marginal — 0.03 and 0.10 short — hence S3 rather than S2, but they are failures, not near-misses.

- **Criterion**: WCAG 2.2 **1.4.3 Contrast (Minimum), Level AA**
- **Evidence**: `app/globals.css:3265-3267` (colour and size), `7693-7714` (tile backgrounds)
- **Fix**: raise the alpha from `0.55` to `0.6` — that clears every tile.

---

### [S3] The focus ring is sub-threshold where ink-soft is the adjacent ground — 1.4.11 (Level AA)

The global indicator is `outline: 3px solid var(--focus)` with `--focus: #9f4f30` (copper). Against every ground the site actually uses it clears 3:1 except one:

| Adjacent ground | Ratio vs `#9f4f30` | |
|---|---|---|
| `--ground` `#f1eadf` | 4.83 | PASS |
| `--surface` `#fbf6ed` | 5.37 | PASS |
| `--surface-muted` `#e5ded2` | 4.32 | PASS |
| `--ink` `#091426` | 3.19 | PASS |
| `#071015` | 3.32 | PASS |
| **`--ink-soft` `#111f34`** | **2.86** | **FAIL** |

The same shortfall applies to the five component rules that replace the global ring with `outline: 2px solid var(--action)` — cobalt `#4051ed` measures **2.85:1** against ink-soft, effectively identical.

`outline-offset: 3px` draws the ring outside the element, so what it contrasts against is the *parent's* ground, not the focused element's own fill. That makes the failure conditional on layout.

**The one concrete instance in the build**: `.working-set__list a` has `background: var(--ink-soft)` (`globals.css:7693`) inside a list with `gap: 10px` (`globals.css:7691`). The 3px ring lands inside that 10px gap — over the parent, not the tile. `.working-set` sets no background of its own (`globals.css:3158`, `4410`, `7677`, `9039` are all background-less), so it inherits the section ground. If that resolves to `--ink` the ring measures 3.19:1 and passes; if it resolves to ink-soft it measures 2.86:1 and fails. **That single question is what the live pass needs to answer** — not a general sweep.

Of the five cobalt-outline overrides, four resolve to light grounds and pass (they hover to `--action-quiet`, a light tint). `.library-room .work-record:focus-visible` (`globals.css:3820`) is unresolved: the record itself is `--surface` on `/work` (`globals.css:8197`), but the adjacent ground the offset ring sits over is not determinable statically.

- **Criterion**: WCAG 2.2 **1.4.11 Non-text Contrast, Level AA** (3:1 for focus indicators)
- **Evidence**: `app/globals.css:118-121` (global rule), `app/globals.css:46` (`--focus`), `app/globals.css:48` (`--ink-soft`), `app/globals.css:3820` (cobalt override)
- **Fix**: `#b25c38` measures 3.6:1 against ink-soft and still clears 3:1 on the light grounds — one token change covers every case. **Split `--focus` from `--copper` first**: they are the same hex today but pull in opposite directions. Raising `--copper` to clear 4.5:1 as text on the light tiles (see the fix below) *lowers* its ring contrast on ink-soft to 2.62:1. The two need separate tokens.

---

## Checked and conforming

Recorded so these are not re-raised by another role.

| Check | Criterion | Result |
|---|---|---|
| Language of page | 3.1.1 (A) | **Conforms.** `<html lang="en">` on all 34 real routes. Absent only on the two bare-`text/plain` 404 bodies, which the existing S2 covers. |
| Skip link and its target | 2.4.1 (A) | **Conforms.** `<a href="#main">Skip to content</a>` resolves to `<main id="main">` on every route. `.skip-link:focus` at `globals.css:148` makes it visible. |
| Heading order | 1.3.1 (A) | **Conforms.** No skipped levels on any of the 24 real routes. Exactly one `<h1>` each. `/blog` runs H1→H2→H3 cleanly across 281 records; `/learn/*` and `/work` likewise. |
| Image alt presence | 1.1.1 (A) | **Conforms.** `imgNoAlt: 0` on all 25 routes, all four widths. |
| Image alt quality | 1.1.1 (A) | **Conforms, and unusually well.** All 34 distinct alt values are descriptive sentences (`"Volleyball player diving to keep the ball in play"`). No filenames, no `"image"`, no duplicated-from-caption text. The proportional domain bar (`.domain-index a::before`, width driven by `--domain-share`) is CSS-only with `<small>N records</small>` as its text equivalent, so the data encoding has a non-visual path. |
| Form labels | 3.3.2 (A), 4.1.2 (A), 1.3.1 (A) | **Conforms.** Every `<input>` and `<select>` on `/search`, `/work`, `/blog`, `/demos`, `/photography` has an explicit `<label for>`. No orphans. Verified: 2 inputs on `/search`, 1 input + 3 selects on `/work`, 1 + 3 on `/blog`, 1 + 1 on `/demos`, 2 on `/photography` (one `type="hidden"`, exempt). |
| Link purpose in context | 2.4.4 (A) | **Conforms.** No bare "Open" / "Read" / "View" / arrow-only links anywhere in the 36 documents. Zero links with empty accessible text. Every arrow glyph is `aria-hidden="true"` inside a link whose text names the destination (`"OPEN THE WORK RECORD →"`). |
| Focus visible | 2.4.7 (AA) | **Conforms.** Global `:focus-visible { outline: 3px solid var(--focus); outline-offset: 3px }` at `globals.css:118`. **No `outline: none` or `outline: 0` appears anywhere in the 9,229-line stylesheet.** Roughly 50 component rules extend the treatment rather than replacing it. Every focusable element receives a visible indicator — 2.4.7 asks only that one exist. Whether it clears 3:1 is 1.4.11, assessed in the S3 above, where one case is unresolved. |
| Target size — footer navigation | 2.5.8 (AA) | **Conforms via the Spacing exception.** The 339×21 links reported on 21 routes are footer nav. `.footer-inner nav { display: grid; gap: 9px }` (`globals.css:1419`) gives a 30px vertical pitch — 24px circles centred on adjacent targets are 30px apart and do not intersect. |
| Target size — mobile menu | 2.5.8 (AA) | **Conforms outright.** `.navigation-dialog nav a { min-height: 58px }` and `.mobile-secondary a { min-height: 42px }` (`globals.css:367, 396`). |
| Target size — inline prose links | 2.5.8 (AA) | **Conforms via the Inline exception.** The 20px-tall links on `/privacy` and `/search` sit inside sentences — `<p>Examples: <a>agent</a>, <a>volleyball</a>, or <a>internal</a>.</p>` — so their size is constrained by the line-height of surrounding non-target text. |
| Target size — breadcrumbs | 2.5.8 (AA) | **Conforms via the Spacing exception.** Crumbs measure 32–56px wide in a `display: flex` row with `gap: 8px` (`globals.css:808`); adjacent centres are ≥ 36px apart horizontally and nothing sits above or below. |
| Landmarks | 1.3.1 (A) | **Conforms.** Exactly one `<main>` and one `contentinfo` per route. `/photography`'s second `<footer>` (`photography-selection__footer`) is nested inside an open `<section>`, so per the HTML spec it is not a `contentinfo` landmark — the `footer: 2` count in `route-report.json` is an element count, not a landmark count. |
| Text on dark grounds | 1.4.3 (AA) | **Conforms.** All 47 alpha-composited `rgb(241 234 223 / α)` text colours were composited against their resolved ink grounds. The lowest, α = 0.58 on `--ink`, gives `#909091` = 5.78:1. `--copper-dark` `#d07a4e` — used in 28 rules — sits on `--ink` (5.77:1) or `--ink-soft` (5.18:1) everywhere except the one light-tile case filed S3 above. Checked explicitly for the highest-volume instance: `.demo-session-card small` (36 occurrences on `/demos`) sits on `.demo-session-card { background: var(--ink) }` (`globals.css:8550`) = **5.77:1 PASS**. |
| Display type colour | 1.4.3 (AA) | **Conforms.** `--cobalt-bright` `#6372ff` measures 3.27:1 on bone, which fails the 4.5:1 body threshold — but every one of its seven usages is display type at `clamp(1.55rem, …)` or larger (24.8px minimum, most at 7rem+), so the 3:1 large-text threshold applies and all pass. |

---

## Near-misses and non-AA observations

Kept separate so they cannot be mistaken for AA violations.

- **[S4] Cobalt on bone passes.** `--action` `#4051ed` on `--ground` `#f1eadf` computes to **4.86:1** — a pass at 4.5:1. It fails only AAA (7:1). The audit brief flagged this pair as a likely failure; it is not. On `--surface` it measures 5.39:1.
- **[S4] 15 distinct targets measure 24–43px** at 390. All clear **2.5.8 Target Size (Minimum), AA (24×24)**. They fail only **2.5.5 Target Size (Enhanced), AAA (44×44)**, which is not in scope for this audit. Not defects.
- **[S4] Six to eight `<nav>` landmarks per route share no distinguishing accessible name.** Only `.domain-index` carries `aria-label="Work domains"`. This is axe's `landmark-unique` best-practice rule — **no Level A or AA criterion covers it**, so it is not a violation. It does make landmark-jump navigation in a screen reader ambiguous, and an `aria-label` on each is a cheap improvement.
- **[S4] Nested `<header>` counts (up to 8 on `/privacy`) are not landmark violations.** A `<header>` descended from `<article>` or `<section>` is not a `banner` landmark.
- **[S4] `--copper` and `--cobalt` have effectively identical relative luminance** — `#9f4f30` = 0.1317, `#4051ed` = 0.1309, a **1.00:1** ratio. Any place the two abut is invisible as a boundary to someone perceiving luminance only. Nothing in the current build depends on that boundary, so this is a hazard note rather than a defect.
- **[S4] `--rule-strong` `#8d887f` measures 2.95:1 on bone.** It is used as a text colour in exactly one rule (`globals.css:3835`, a `::before` separator glyph in `.record-meta`), which is decoration; elsewhere it is a border colour. Decorative boundaries are exempt from 1.4.11.
- **Thin focus rings are AAA.** 2.4.13 Focus Appearance is Level AAA and is not assessed here. The 3px ring assessed against 1.4.11 (AA, 3:1) is reported above.

---

## Note on the existing 404 finding

Not a new finding — a severity note on the `[S2] Any unknown URL leaves the site entirely` entry in `FINDINGS.md`. The 9-byte `text/plain` body has no `lang`, no `<title>`, no `<main>`, and no skip link. Under the audit plan's own rule that a WCAG Level A failure is S1, that response fails **3.1.1** and **2.4.2** (both Level A), so **the existing S2 is arguably understated**. The replacement `not-found.tsx` must carry `lang="en"`, a descriptive `<title>`, the skip link, and the global shell.
