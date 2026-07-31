# Responsive & containment review

- **Role**: 4 — Responsive & containment engineer
- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Evidence**: `docs/audit/evidence/d0cfd0e/route-report.json`, `shots/*-fold.png`,
  `html/*.html`; `app/globals.css`; `public/fonts/anton-400.woff2` glyph metrics
- **Method**: no browser. Measurements come from the Phase 1 route report; every
  prediction is computed from Anton's own advance-width table and the CSS
  cascade, then validated against a measured case.
- **Widths**: 390 / 768 / 1280 / 1728, plus a reasoned 200% zoom pass at 1280
  (CSS viewport 640).

## Answer first

The two filed defects are not two defects. They are two rules, and both rules
have more instances than the capture found.

1. **The display-type rule breaks on four of seven `/learn/:track` pages, not
   one.** `ENTERPRISE` was captured. `STRATEGIST` and `ARCHITECT` overflow the
   viewport by the same mechanism and were never captured. `EXPLORER` overflows
   its content column and clears the viewport by 5.4px. The rule breaks at
   roughly **eight characters**, and `/learn/:track` is the only display title on
   the site whose text comes from data rather than from a word a designer sized
   against once.
2. **The 18px-track collapse is not mobile-only.** Its media conditions are
   `≤760px` (`/about`) and `≤720px` (`/links`). A 1280 desktop at 200% zoom has a
   640px CSS viewport, so both fire there. The filed S1 has a desktop repro.

Everything else in the same class is either contained or contained by design.
A mechanical sweep of all 252 `grid-template-columns` declarations found **no
other live grid whose fixed minimums exceed its container at any width at or
above 390**. The horizontal overflow the report flags on `/demos` and
`/photography` is two intentional scroll rails, not a break.

### Method note — the audited tree has moved

`app/globals.css` and `docs/OPEN-PRACTICE-ART-DIRECTION.md` both differ from
`d0cfd0e` in the working tree. The CSS diff is two lines, one of which is the
`/learn/:track` title rule that produced the filed S2:

```
-    font-size: clamp(4.8rem, 24vw, 8.5rem);     # d0cfd0e — measured 93.6px at 390
+    font-size: clamp(3.55rem, 18vw, 8.5rem);    # working tree — 70.2px at 390
```

Findings below are scored against `d0cfd0e`, because that is the evidence set.
Where the working-tree change alters the outcome, the Fix line says so.

### Method note — scrollbar model

The capture environment has a classic 15px scrollbar: at a 390 viewport,
`clientWidth` is 375 and the content column is 339px. Real phones use overlay
scrollbars, so the same viewport gives a 354px column. `vw` units resolve
against 390 either way; media queries resolve against `clientWidth`.

Every measurement below is stated under both models. **A break is only filed as
S2 if it survives both.** Findings that flip between models are S3 and say so.

### Method note — measurement model, and its validation

Rendered width of an Anton string = `(Σ glyph advances + 0.02em × (n−1)) ×
font-size`, where `0.02em` is `--hero-tracking`.

Validated against the one case the capture measured directly: `ENTERPRISE` at
93.6px predicts **413.9px**; the DIAG capture measured **415.75px**. Error
0.45%. Predicted document `scrollWidth` 18 + 413.9 = **431.9** against a measured
**434**.

---

## Containment matrix

Three states. **break** = the document scrolls sideways, the display title
leaves its content column, or an interactive target is collapsed by its
container. *tight* = contained, but with less than 2% of the column left, or a
visible label removed to make it fit — a pass under the legend, recorded because
it is the same rule one step from failing. `pass` = neither.

| Route | 390 | 768 | 1280 | 1728 |
|---|---|---|---|---|
| `/` | pass (title 95% of column) | pass | pass | pass |
| `/work` | pass | pass | pass | pass |
| `/demos` | rail by design | rail by design | rail by design | rail by design (still scrolls) |
| `/learn` | pass (title 92%) | pass | pass | pass |
| `/blog` | pass (title 89%) | pass | pass | pass |
| `/about` | **break** — action links 18×17 | pass | pass | pass |
| `/now` | *tight* — title 99.9% of column | pass (97%) | pass | pass |
| `/links` | *tight* — 9 action labels suppressed | pass | pass | pass |
| `/search` | pass | pass | pass | pass |
| `/privacy` | pass (title 91%) | pass | pass | pass |
| `/photography` | *tight* — title 98% + rail by design | rail by design | pass | pass |
| `/work/:slug` ×4 | pass | pass | pass | pass |
| `/demos/:slug` ×2 | pass | pass | pass | pass |
| `/demos/applied/:slug` ×2 | pass | pass | pass | pass |
| `/learn/explorer` | **break** — title exceeds column +12.6px (capture model only) | pass | pass | pass |
| `/learn/builder` * | pass | pass | pass | pass |
| `/learn/architect` * | **break** — doc scroll +17.2px | pass | pass | pass |
| `/learn/strategist` * | **break** — doc scroll +52.4px | pass | pass | pass |
| `/learn/author` * | pass | pass | pass | pass |
| `/learn/voice` * | pass | pass | pass | pass |
| `/learn/enterprise` | **break** — doc scroll +59px (filed) | pass | pass | pass |
| `/work?domain=…` | pass | pass | pass | pass |
| `/blog?type=…` | pass (title 89%) | pass | pass | pass |
| `/demos?type=…` | rail by design | rail by design | rail by design | rail by design |

`*` computed, not captured — these five track pages were never rendered at any
width. See [C1].

**200% zoom at 1280 (CSS viewport 640):** display titles clear their columns on
every static route — tightest are `/now` at 94%, `/privacy` 90%, `/learn` 87%.
Two breaks: `/about` and `/links` collapse their action columns (see [C3]), and
`/learn/:track` at `d0cfd0e` overflows by 12.4px under the classic-scrollbar
model.

---

## Root causes

**RC1 — display size anchored to the viewport, container anchored to the
viewport minus a fixed gutter, text that cannot wrap.** Every display title uses
`clamp(floor, N vw, ceiling)`. The container is `min(--content, 100% − gutter)`.
The two track each other only while the `vw` term is active. At the floor or the
ceiling the size stops moving and the container keeps moving. A multi-word title
absorbs that by wrapping. A single unbreakable token cannot, so it overflows.
Five hardcoded display titles are single unbreakable tokens — `WORK`, `NOW`,
`LINKS`, `PRIVACY`, `PHOTOGRAPHY` — plus the seven `/learn/:track` names. The
titles that never break (`NINO` / `CHAVEZ`, `Start with the artifact.`, `241
essays, 44 other pieces`) are the ones with a space in them.

**The one number that predicts it.** Let `E` be the em-width of the longest real
label under that rule and `k` the `vw` coefficient as a fraction. Then
`K = E × k` is how fast the title grows per pixel of viewport, against a
container that grows at 1.0 per pixel of viewport minus a constant gutter.

- `K ≥ 1` — the title grows at least as fast as its container. **No viewport in
  that rule's band fits.** The clamp ceiling is the only thing stopping it.
- `K < 1` — the title fits above `51 / (1 − K)` in the capture model, unless the
  clamp floor binds first, which gives a second threshold at `E × floor + 51`.

| Rule | longest label | E | k | **K** | fits above |
|---|---|---|---|---|---|
| `/learn/:track` `d0cfd0e` | ENTERPRISE | 4.4217 | 0.24 | **1.061** | **never** |
| `/now` `≤720` | NOW | 1.7363 | 0.50 | 0.868 | 387 |
| `/photography` `≤560` | PHOTOGRAPHY | 5.4036 | 0.158 | 0.854 | 349 |
| `/privacy` `≤760` | PRIVACY | 3.1703 | 0.26 | 0.824 | 290 |
| `/learn` `≤720` | the artifact. | 5.3469 | 0.15 | 0.802 | 325 (floor binds) |
| `/learn/:track` working tree | ENTERPRISE | 4.4217 | 0.18 | 0.796 | 303 (floor binds) |
| `/blog` `≤760` | 44 other pieces | 6.4636 | 0.12 | 0.776 | 284 (floor binds) |
| `/` `≤760` | CHAVEZ | 2.8495 | 0.27 | 0.769 | 302 |
| `/links` `≤720` | LINKS | 2.1357 | 0.33 | 0.705 | 291 (floor binds) |
| `/work` `≤760` | WORK | 2.2070 | 0.28 | 0.618 | 280 |

The audited `/learn/:track` rule is **the only display rule on the site with
`K ≥ 1`**, and `/now` and `/photography` are the two closest to the line — the
same two [C5] flags on fill percentage, reached independently. The "fits above"
column comes from an exhaustive walk of each rule chain across 280–1920px, which
is the authority where a chain hands off to a narrower breakpoint; `K` is the
per-rule diagnostic.

This is the Phase 4 regression case: assert `E_longest × k < 0.85` for every
`clamp()` display rule, computed from the shipped Anton metrics and the longest
real label. It catches a new track name before a screenshot does.

**RC2 — a fixed narrow grid track used to suppress a label.** Three rules put an
element into an 18px track and shrink it to fit with `overflow: hidden;
white-space: nowrap; width: 18px; color: transparent`, restoring an arrow through
a pseudo-element or an `aria-hidden` span. This is deliberate. It becomes a
defect on `/about`, where the collapsed element is the anchor itself rather than
a label inside it.

**RC3 — breakpoint scale inversion.** Every mobile display-size override resolves
larger than the desktop rule does immediately above the same breakpoint, so the
title shrinks as the viewport grows. Systemic: 14 of 14 chains checked.

---

## Findings

### [C1] [S2] `/learn/strategist` and `/learn/architect` — the same overflow as `/learn/enterprise`, never captured

At `d0cfd0e` the rule `@media (max-width: 720px) { .learn-track-opening h1 {
font-size: clamp(4.8rem, 24vw, 8.5rem) } }` resolves to **93.6px** at a 390
viewport for every track, because the size depends on the viewport and not on the
name. Four of the seven names exceed their 339px content column at that size:

| Track | chars | Σ advances + tracking | width @93.6px | vs 339px column | vs viewport |
|---|---|---|---|---|---|
| VOICE | 5 | 2.1479em | 201.0px | fits −138.0 | ok |
| AUTHOR | 6 | 2.9164em | 273.0px | fits −66.0 | ok |
| BUILDER | 7 | 3.0775em | 288.1px | fits −50.9 | ok |
| EXPLORER | 8 | 3.7562em | 351.6px | **over +12.6** | ok (−5.4) |
| ARCHITECT | 9 | 3.9984em | 374.2px | **over +35.2** | **scroll +17.2** |
| STRATEGIST | 10 | 4.3743em | 409.4px | **over +70.4** | **scroll +52.4** |
| ENTERPRISE | 10 | 4.4217em | 413.9px | **over +74.9** | **scroll +56.9** (filed) |

Under the overlay-scrollbar model the column is 354px and the viewport 390:
`ARCHITECT` still scrolls (+2.2px), `STRATEGIST` (+37.4px) and `ENTERPRISE`
(+41.9px) still scroll. `EXPLORER` clears the column by 2.4px under that model —
it is model-dependent and is filed separately as [C2].

**The character threshold.** Anton's 26 uppercase advances sum to 12.3130em, mean
**0.4736em**; with `--hero-tracking` the effective cost is **0.4936em per
character**. At 93.6px the 339px column buys **3.6218em = 7.34 average
characters**; the viewport, from an 18px left gutter, buys **3.8141em = 7.73
average characters**.

- A **9-character** name needs a mean advance ≤ 0.4060em. Only `F`, `I`, `L` and
  `T` are below that. No realistic 9-letter word passes. `ARCHITECT` averages
  0.4265em and fails.
- An **8-character** name needs a mean advance ≤ 0.4593em. `EXPLORER` averages
  0.4520em and passes by 0.0073em — under 4px of screen.

So the rule holds for `/learn` today at exactly one name-length above its safe
range, and only because `EXPLORER` happens to contain two `E`s and an `L`.

- **Contract**: `OPEN-PRACTICE §Typography` — "Display type must remain inside
  its owning field at every supported width." Also `§Interaction contract` —
  "Responsive acceptance includes the longest real label and the width
  immediately below, at, and above every layout breakpoint."
- **Evidence**: `app/globals.css:5263-5265` (at `d0cfd0e`);
  `evidence/d0cfd0e/route-report.json` — `/learn/enterprise` and
  `/learn/explorer` both report `Open Practice Hero` `maxSize: 94` at 390;
  `public/fonts/anton-400.woff2` `hmtx` advance widths; model validated to 0.45%
  against the filed `415.75px` measurement.
- **Repro**: 390×844, `/learn/strategist` and `/learn/architect`. Neither route
  exists in the evidence set — the capture list sampled "two of the seven
  tracks."
- **Second repro — 200% zoom, same rule**: 200% zoom on a 1280 viewport gives a
  640px CSS viewport, which matches `max-width: 720px`, so the rule resolves to
  its ceiling `8.5rem = 136px`. `ENTERPRISE` renders **601.4px** inside a
  **589px** column and the document scrolls. Under the overlay-scrollbar model
  the column is 604px and it clears by 2.6px, so this repro is model-dependent —
  it is recorded as a second face of [C1] rather than filed separately.
  Relevant to WCAG 2.2 AA 1.4.4 (accessibility specialist scores it).
- **Fix**: the working tree already changes the rule to `clamp(3.55rem, 18vw,
  8.5rem)`, which resolves to 70.2px and clears all seven names at 390 under both
  scrollbar models (`ENTERPRISE` 310.4px in a 339px column). That closes the
  measured break but keeps the rule viewport-relative, so it will re-break on the
  first track name longer than `ENTERPRISE`. The durable fix is to size the title
  against its container — `cqi` units on the copy grid, or a JS-free
  `max-width` + `font-size: min()` pairing — because this is the site's only
  display title whose text is data.
- **Re-capture**: all seven track pages at 390 belong in the evidence set.

### [C2] [S3] `/learn/explorer` — the title escapes its column but not the viewport

At `d0cfd0e`, `EXPLORER` renders 351.6px inside a 339px content column: it
crosses the right gutter that aligns every other element on the page by 12.6px,
and stops 5.4px short of the viewport edge. The document does not scroll, so the
Phase 1 overflow check — which compares against `innerWidth` — records it as a
pass. `route-report.json` shows `/learn/explorer` at 390 with `scrollWidth 375`
and an empty `overflows` array.

Under the overlay-scrollbar model the column is 354px and `EXPLORER` clears it by
2.4px. The break is real in the capture environment and absent on a real phone,
which is why it is S3 rather than S2.

- **Contract**: `OPEN-PRACTICE §Cognition and Gestalt contract` — "**Text
  containment:** display copy and action language remain inside the surface that
  supplies their contrast… readable text may wrap but may not paint across, hide
  behind, or escape its owning region." Also `§Edge behavior` — "A responsive
  gutter aligns language without turning the composition back into a centered
  brochure shell."
- **Evidence**: computed 351.6px against a 339px column derived from
  `app/globals.css:4337-4341` (`.page-shell { width: min(var(--content),
  calc(100% - 36px)) }` at `≤760`); the filed `/learn/enterprise` measurement
  confirms the 18.25px left offset that fixes the column geometry.
- **Repro**: 390×844, `/learn/explorer`, compare the title's right edge to the
  right edge of `.learn-track-tagline` directly below it.
- **Fix**: same as [C1]. The working-tree change resolves it (263.7px in 339px).

### [C3] [S2] `/about` and `/links` collapse their action columns at 200% zoom on a desktop

The filed S1 describes the `/about` collapse as a mobile-width defect. It is not
width-conditional in the way that framing implies — it is CSS-pixel-conditional,
and 200% zoom halves CSS pixels.

| Rule | Media | Fires at 640 CSS px? |
|---|---|---|
| `.about-practice-register a { width: 18px; color: transparent }` | `≤760px` | **yes** |
| `.links-group li b { width: 18px; font-size: 0; color: transparent }` | `≤720px` | **yes** |
| `.photography-route-index a b { width: 18px }` | `≤660px` | yes, but the component is absent from every captured document |

Verified mechanically: those are the only three rules in `globals.css` that
collapse an element to a fixed box of 20px or less. Of the fourteen
`grid-template-columns` rules that end in a fixed 14–20px track, the remaining
eleven place a single arrow glyph (`<b>→</b>` or `<b>↗</b>`) in that track — no
text is clipped. The `≤460px` `.working-set__list` collapse does **not** fire at
640.

Consequence on `/about`: at 200% zoom on a 1280 desktop, the five practice-list
links measure 18×17 and each row presents a 339px-wide passive region whose only
acting target is an 18px arrow.

- **Contract**: `OPEN-PRACTICE §Action-object contract` — "**Target
  correspondence:** the region that looks actionable is the region that acts."
  And `§Cognition and Gestalt contract` — text containment covers "action
  language." WCAG 2.2 AA 1.4.4 and 2.5.8 (accessibility specialist scores).
- **Evidence**: `app/globals.css:6095` and `6104-6116` (`/about`, `@media
  max-width: 760px`); `app/globals.css:6739` and `6751-6765` (`/links`, `@media
  max-width: 720px`); `evidence/d0cfd0e/shots/DIAG-about-390-links.png` for the
  390 case.
- **Repro**: 1280×800, `/about`, browser zoom 200%, scroll to the practice list.
- **Fix**: gate the collapse on a pointer/width query that reflects touch rather
  than CSS width, or — better, and it fixes the 390 case too — let the action
  wrap onto its own row instead of holding a fixed third track.

### [C4] [S3] `/links` — nine action labels are deleted rather than reflowed

At `≤720px`, `.links-group li b` is set to `width: 18px; font-size: 0; color:
transparent; overflow: hidden` and an `aria-hidden` span supplies `↗`. Nine
distinct labels stop rendering: *Browse source, Listen to sets, Open Instagram,
Open product, Open studio, Send email, View profile, Visit company, Visit
series*. Every row becomes the same arrow.

The link's accessible name is unaffected — `font-size: 0` and `color:
transparent` do not remove text from the accessibility tree — and the whole `<a>`
remains the tap target, so this is a visual-differentiation loss, not a
functional one. The directional cue survives, which keeps it inside `§Action
rows`. It is the same fixed-track root cause as [C3], applied one level deeper in
the DOM.

- **Contract**: `OPEN-PRACTICE §Action-object contract` — "**Behavioral
  consistency:** … Responsive compression may shorten an action label, but it
  does not remove the only action cue." The cue survives; the label does not
  shorten, it disappears.
- **Evidence**: `app/globals.css:6751-6765`;
  `evidence/d0cfd0e/html/links.html` — nine `<b>` elements each carrying a verb
  phrase plus `<span class="assistive-text"> (external)</span>` and an
  `aria-hidden` arrow.
- **Repro**: 390×844 or 1280 at 200% zoom, `/links`.
- **Fix**: shorten the label rather than deleting it (*Open*, *Visit*, *Browse*),
  or move it under the record name in column 2 where `small` already sits.

### [C5] [S3] `/now` and `/photography` — display titles sized to their container with no headroom

Both routes' titles clear their column by a margin smaller than a single glyph.

| Route | Title | Rule | @390 size | Rendered | Column | Fill | Fits below viewport… |
|---|---|---|---|---|---|---|---|
| `/now` | NOW | `clamp(8rem, 50vw, 22rem)` @`≤720` | 195.0px | **338.6px** | 339px | **99.9%** | 387 (capture) / 280 (device) |
| `/photography` | PHOTOGRAPHY | `clamp(3.4rem, 15.8vw, 5.5rem)` @`≤560` | 62.0px | **333.0px** | 339px | **98.2%** | 349 (capture) / 330 (device) |

`50vw` on `/now` is the most aggressive viewport-anchored display rule in the
file. Neither route produced a measured overflow at any audited width, and under
the overlay-scrollbar model both clear comfortably at 390 — which is why this is
S3 and not S2. What it documents is that the design carries no containment
margin: `/now` at 390 in the capture environment has **0.4px** of slack on a
three-letter word.

`/photography`'s failure mode is the cleaner illustration of RC1: below a 349px
viewport the clamp is pinned at its `3.4rem` floor while the container keeps
shrinking, so the title grows relative to its field as the screen gets smaller.

- **Contract**: `OPEN-PRACTICE §Typography` — "at every supported width." The
  contract does not define a minimum supported width; these two rules set one
  implicitly.
- **Evidence**: `app/globals.css:6704` (`/now`), `9200` (`/photography`);
  `evidence/d0cfd0e/route-report.json` — `/now` `Hero maxSize 195` at 390, 384 at
  768; `/photography` `Hero maxSize 62` at 390. Both match the CSS to the pixel,
  which is what makes the derived widths trustworthy.
- **Repro**: 390×844, compare each title's right edge to the gutter.
- **Fix**: state a minimum supported width in the art direction, then raise the
  `vw` coefficient's floor so the clamp never pins above the container. Nothing
  here blocks launch.

### [C6] [S3] Every display title shrinks as the viewport grows across its breakpoint

Mechanical sweep of all fourteen display-size chains. In every one, the mobile
override resolves larger at the breakpoint than the rule immediately above it,
so the title jumps *down* as the screen gets *bigger*.

| Selector | Breakpoint | at bp | at bp+1 | change |
|---|---|---|---|---|
| `.demo-studio__lead h1` (`/demos`) | 760 → 761 | 104.0px | 64.0px | **−38%** |
| `/learn/:track` (`d0cfd0e`) | 720 → 721 | 136.0px | 96.0px | −29% |
| `.now-opening h1` | 900 → 901 | 400.0px | 284.0px | −29% |
| `/learn/:track` (working tree) | 720 → 721 | 132.3px | 96.0px | −27% |
| `.work-atlas__lead h1` | 760 → 761 | 144.0px | 104.0px | −28% |
| `.about-opening h1` | 760 → 761 | 152.0px | 112.0px | −26% |
| `.privacy-opening h1` | 760 → 761 | 176.0px | 133.5px | −24% |
| `.photography-opening h1` | 820 → 821 | 119.4px | 90.3px | −24% |
| `.practice-identity h1` (`/`) | 760 → 761 | 168.0px | 131.9px | −21% |
| `.writing-opening h1` | 760 → 761 | 93.0px | 73.6px | −21% |
| `.links-opening h1` | 720 → 721 | 192.0px | 154.6px | −19% |
| `.practice-identity h1` (`/`) | 980 → 981 | 169.2px | 139.4px | −18% |
| `.learn-opening h1` | 720 → 721 | 102.4px | 86.4px | −16% |
| `.photography-opening h1` | 560 → 561 | 88.0px | 82.4px | −6% |

This never causes an overflow — the type gets smaller — so it is craft, not
containment. It is filed because the contract now names exactly this test.

- **Contract**: `OPEN-PRACTICE §Interaction contract` — "Responsive acceptance
  includes the longest real label and the width immediately below, at, and above
  every layout breakpoint."
- **Evidence**: computed from the `clamp()` chains listed above; each chain's
  `vw` term and floor/ceiling verified against the measured `maxSize` values in
  `route-report.json` at all four widths (`/now`: 195 / 384 / 397 / 480 predicted
  and measured identical).
- **Repro**: drag the window across 760px on `/demos` or `/about`.
- **Fix**: not a launch blocker. If addressed, overlap the ranges — raise the
  desktop rule's floor to meet the mobile rule's value at the breakpoint.

### [C7] [S4] `/demos` — the session reel never resolves to a static grid, including at 1728

`.demo-session-reel` is `overflow-x: auto` with `scroll-snap-type: inline
mandatory` and `grid-auto-columns: clamp(290px, 31vw, 430px)`. The route report
records six overflow nodes at all four widths; at 1728 the last card's right edge
is at 1965 against a 1713 client width. This is a rail behaving as a rail —
correct, and inside `§Sequence` ("a session should look temporal"). Recorded so
the six overflow entries are not re-raised as a defect.

The observation: at 1728 the shell holds 1320px and the reel is still scrolling,
so a desktop visitor with room for four cards sees the same partial-card
affordance as a phone visitor. Whether that is intended is Nino's call.

- **Evidence**: `app/globals.css:8540-8550`;
  `route-report.json` `/demos` `overflows` at 390/768/1280/1728.

### [C8] [S4] Tap targets at 390 — one layout cause, the rest are text-sized

Layout classification only; WCAG 2.5.8 scoring belongs to the accessibility
specialist.

**Caused by a collapsed container** — one class, five instances, all on `/about`:
the practice-list links at 18×17 (the filed S1, extended by [C3]).

**Small by design** — sized by their own text and line-height, with no block
padding to remove:

| Size | Target | Cause |
|---|---|---|
| 32×16 – 56×16 | breadcrumbs (`Work`, `Learn`, `Demos`, `Applied`, `Sessions`) on 8 detail routes | inline text at `0.7rem` |
| 93×24 | `Nino Chavez` header wordmark, all 24 routes | line-height only |
| 339×21 | the five mobile-dialog nav links, 21 routes | full-width row, no vertical padding |
| 125×19 – 291×17 | Space Mono action links (`ADJUST FILTERS ↑`, `OPEN THE WORK RECORD →`) | uppercase micro-label |
| 169×20 – 294×20 | inline prose links on `/privacy` | inline line box |

The `339×21` nav rows are the only design-caused case worth a layout note: the
row is generously wide and vertically unpadded, so adding `padding-block` costs
nothing structurally and moves five targets on every route above 44px.

### [C9] [S4] About 50 class selectors in `globals.css` match nothing in the 36 captured documents

Including a complete 89-line `.photography-route-index` block that carries its
own responsive collapse pattern — the third `width: 18px` rule in [C3] lives
there and cannot fire. The page uses `.photography-route-deck` instead.

This matters to this review specifically: a CSS-only containment audit
over-reports without an intersection against rendered HTML. `.demo-room
.demo-controls` (`minmax(280px, 1.55fr) minmax(210px, 0.45fr)`, 506px of fixed
minimum) is the only grid in the file that demands more than its container with
**no mobile override at any breakpoint** — and it is unreachable, because no
`.demo-room` ancestor exists in any captured document. Two live grids demand more
fixed track than it does (`.learn-track-register a` at 730px across six columns,
`app/globals.css:4712-4715`; `.learn-levels li` at 682px, `5087`) and both are
overridden well before their container runs out — `.learn-track-register a`
collapses at `≤1060` and again at `≤720`, and has 997px available at 1061.

Scoped honestly: "not present in the 36 captured documents." `/search` was
captured without a query, so `search-results`, `result-list` and `result-summary`
are plausibly live-but-uncaptured states rather than dead code.

---

## Type-role conformance — Inter at 90px is not a violation

The brief asks whether `Open Practice Body` (Inter) reaching `maxSize 90` on
`/demos` and `/photography` and 77 on `/work` breaks the locked type roles. It
does not. It is the clause working as written.

Three rules produce those sizes, all verified against the measured tallies at all
four widths:

| Selector | Rule | 390 / 768 / 1280 / 1728 |
|---|---|---|
| `.demo-studio__lead h1` | `clamp(4rem, 7vw, 7.4rem)` | 66 / 64 / 90 / 118 |
| `.photography-selection__heading h2` | `clamp(3.4rem, 7vw, 7.2rem)` | — / — / 90 / 115 |
| `.work-library-stage__heading h2` | `clamp(3rem, 6vw, 6rem)` | 48 / 48 / 77 / 96 |

`§Typography` constrains **Anton**, not Inter: Anton "owns the personal name and
rare, short display words… It is a signature, **not a compulsory
collection-header treatment**." Inter "owns body copy, navigation, controls,
claims, ordinary headings, **section titles**, and record names." A collection
header set in Inter at display scale is precisely what those two sentences ask
for. The contract caps Inter's *role*, not its size.

It is also the containment-safe choice, which ties this back to RC1. `Ways of
Working`, `A selection`, and `The complete record` are multi-word strings that
wrap. The seven `/learn/:track` names are single unbreakable tokens set in Anton,
and they are the only display titles on the site that break. `/work/:slug` and
`/demos/:slug` carry no Anton at all — their `route-report.json` font tallies
show only `Open Practice Body` and `Open Practice Evidence` — so every detail
header is already Inter and already safe.

No Space Mono string was found carrying interface meaning that dates, state,
sequence, counts, or short evidence labels do not cover. The largest Space Mono
size anywhere in the evidence set is 16px.

---

## Checked and conforming

Recorded so these are not re-raised.

| Check | Result |
|---|---|
| Fixed grid tracks vs container | **No live break at or above 390.** All 252 `grid-template-columns` declarations swept; for each subject class, the declaration applying at the narrowest viewport was evaluated against `min(--content, clientWidth − gutter)`. Every live rule fits. The only rule with no mobile override at all is `.demo-room .demo-controls`, whose ancestor is absent from every captured document — see [C9]. |
| `/demos` and `/photography` overflow nodes | **By design.** `.demo-session-reel` (`overflow-x: auto`, scroll-snap) and `.photography-route-deck ol` (same treatment at `≤1100`). The document never scrolls; the rails do. |
| Trailing 14–20px grid tracks | 14 rules; 11 hold a single arrow glyph verified in rendered HTML. Three collapse a real element — see [C3]. |
| Reading measure | Bounded. 132 explicit `max-width` declarations; copy blocks cap between 240px and 820px, so no prose runs the full 1320px shell at 1728. |
| Image reflow | `.about-opening__portrait` changes from a right-half field to a full-width band at `≤760` with `object-position: center top`; `.demo-session-card` frame goes 290px → 250px at `≤560`. Both are deliberate and inside `§Edge behavior` ("proof objects may meet or crop at the edge"). |
| Display type painting over copy or controls | None found. Every break in this review is an overflow past a gutter, not an overlap. `§Typography`'s "never paints over instructions, controls, or reading copy" holds at all four widths and at 200% zoom. |
| Negative tracking on Anton | `--hero-tracking: 0.02em`, positive, applied in all 9 blocks that declare `font-family: var(--hero)`; no negative value reaches an Anton element. Conforms. |

---

## Re-capture requests

1. All seven `/learn/:track` pages at 390 — five were never rendered, and two of
   the five contain the finding in [C1].
2. `/about` and `/links` at 1280 with 200% zoom, for [C3].
3. `/now` and `/photography` at 375 and 360, for [C5] — the two widths where the
   capture environment's model and the device model disagree.
