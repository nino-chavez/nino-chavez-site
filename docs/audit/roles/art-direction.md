# Art direction / design conformance — role 3

- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Contract**: [`docs/OPEN-PRACTICE-ART-DIRECTION.md`](../../OPEN-PRACTICE-ART-DIRECTION.md)
- **Evidence**: `docs/audit/evidence/d0cfd0e/`
- **Scope rule**: the art direction is locked and approved. This is a conformance
  score, not a redesign. Anti-trend positions are deliberate; "falling behind"
  is not a finding. Observations with no owning clause are S4.
- **Status**: complete. Five clauses scored: 1 (page expression model),
  2 (typography), 3 (expressive layer), 4 (color and material),
  5 (first encounter). Summary tables at the end of this document.

## Family map (established before scoring)

`app/globals.css:3-33` binds the aliases to real files:

| Alias | File | Contract face |
|---|---|---|
| `Open Practice Hero` / `var(--hero)` | `/fonts/anton-400.woff2` | Anton |
| `Open Practice Body` / `var(--font)` **and `var(--display)`** | `/fonts/inter-latin.woff2` | Inter |
| `Open Practice Evidence` / `var(--mono)` | `/fonts/space-mono-latin-400/700-normal.woff2` | Space Mono |

`--display` resolves to Inter, not Anton (`globals.css:58`). Every
`font-family: var(--display)` rule in the sheet is therefore an Inter rule and
is **not** an Anton-scope violation. Only `var(--hero)` is Anton.

All three are local WOFF2. Contract §Typography "delivered locally as WOFF2
assets" — **conforms**.

---

## Clause 4 — Color and material (scored first; `:root` is the whole surface)

Closed set: Ink `#091426`, Ink soft `#111F34`, Bone `#F1EADF`, Surface
`#FBF6ED`, Cobalt `#4051ED`, Copper `#9F4F30` (light) / `#D07A4E` (dark),
rules `#CEC5B8`.

`globals.css:35-66` declares these tokens. Enumerated-set members present and
correct: `--ink #091426`, `--ink-soft #111f34`, `--bone #f1eadf`,
`--surface #fbf6ed`, `--cobalt #4051ed`, `--copper #9f4f30`,
`--copper-dark #d07a4e`, `--rule #cec5b8`, `--ground #f1eadf`.

Tokens outside the closed set:

| Token | Value | Reading |
|---|---|---|
| `--text` | `#111927` | third near-ink value, distinct from Ink and Ink soft |
| `--cobalt-bright` | `#6372ff` | second identity blue |
| `--rule-strong` | `#8d887f` | second rule value |
| `--muted` | `#68645e` | secondary text value |
| `--surface-muted` | `#e5ded2` | derived bone tint |
| `--action-quiet` | `#dfe3ff` | derived cobalt tint |

Beyond the token block, `globals.css` carries 19 further hex literals outside
the closed set. The material ones:

### [S2] A per-domain color language exists outside the closed set

`/work` codes each of the six domains with its own hue. `.domain-index`
children take `#d8dce9` (blue-grey), `#ead8ca` (tan), `#e3d8ef` (lavender)
alongside `--action-quiet` and `--surface-muted`
(`globals.css:7757-7775`). The atlas field repeats the idea with
`.work-field__domain--3/4/5/6` at `#c7673f`, `#d9d0c2`, `#cbd2ff`, `#20375f`
and text at `#fff7ed` (`globals.css:7987-8011`).

Most of those values are tints or shades of enumerated members and read as
legitimate filled fields — `#c7673f` and `#d9d0c2` sit on the Copper and Bone
hues, `#cbd2ff` and `#20375f` on the Cobalt and Ink hues. Two do not:
`#e3d8ef` is violet (hue ≈ 271°) and `#d8dce9` a desaturated blue-grey, neither
derivable from Ink, Bone, Surface, Cobalt, or Copper.

The defect is not any single tint. It is that hue has been made to carry domain
identity across six fields on two routes — the palette is no longer closed, and
color is doing the work the contract assigns to proportional width.

- **Contract**: §Color and material — the enumerated set is the whole palette,
  and "filled fields, spacing, and tonal contrast do the primary grouping work."
  Secondary: §Expressive layer sanctions **width** as the domain encoding; hue
  adds a second encoding beside it. The width behavior itself is correct and is
  scored conforming under clause 3 — this finding is about the palette, not the
  bars.
- **Evidence**: `globals.css:7765-7775`, `globals.css:7987-8011`;
  `evidence/d0cfd0e/shots/work-1280-fold.png`
- **Fix**: carry domain identity in width and label only, and render the six
  fields from the closed set (ink / ink-soft / bone / surface / cobalt / copper).

### [S2] Copper `#9F4F30` is the global focus ring, including on ink grounds

`--focus: #9f4f30` (`globals.css:46`) is the light-ground copper.
`:focus-visible { outline: 3px solid var(--focus) }` (`globals.css:118-120`) is
the only rule that consumes it, and there is no dark-ground override — the five
other `outline:` declarations all use `--action` (cobalt). So every focusable
object on an ink field — the home stage, the compact menu, the work atlas,
the demo studio — draws the value the contract reserves for light surfaces.

`--copper-dark #d07a4e` is otherwise used correctly: 45 declarations, all in
ink-ground blocks.

- **Contract**: §Color and material — "Copper `#9F4F30` annotates light
  surfaces; `#D07A4E` is reserved for dark surfaces where the darker value
  loses contrast."
- **Evidence**: `globals.css:46`, `globals.css:118-120`
- **Fix**: scope the focus token per ground, or set `--focus` to
  `--copper-dark` inside ink sections.

### [S3] `#ffb082` is a fourth copper value on ink hover states

Record hover on `/work`, `/learn` track rows, and the learn evidence list all
resolve accent text to `#ffb082` (`globals.css:2527`, `4796`, `4989`) — lighter
than both enumerated coppers. The contract names two copper values, one per
ground; this adds a third for hover.

- **Contract**: §Color and material — the two copper values are enumerated by
  ground, not by state.
- **Evidence**: `globals.css:2527`, `4796`, `4989`
- **Fix**: hover to `--copper-dark`, or add the hover value to the contract.

### [S3] `--text #111927` is a third near-ink value and it is what body copy uses

`body { color: var(--text) }` (`globals.css:80` block) resolves to `#111927`,
which is neither Ink `#091426` nor Ink soft `#111F34`. Every reading surface on
the site is therefore set in an unenumerated color. `--cobalt-bright #6372ff`
is likewise a second identity blue, used in 10 declarations for links on ink.

- **Contract**: §Color and material — the closed set names one ink and one ink
  soft; §Cognition — "ink introduces identity and active practice."
- **Evidence**: `globals.css:40`, `globals.css:51`
- **Fix**: point `--text` at `--ink` and `--cobalt-bright` at `--cobalt`, or add
  both values to the contract as named members.

### [S4] Grounds darker than Ink appear behind media

`#071015` (`globals.css:3598`, `5731`) and `#050b12` (`8371`, `8574`) back the
Ways index frame, the about portrait, and the demo session frames. The contract
assigns that job to Ink soft `#111F34` — "holds media without introducing
another palette." These read as a deliberate media-plane recession rather than a
new palette, so filed as an observation.

- **Evidence**: `globals.css:3598`, `5731`, `8371`, `8574`

### Not filed

`--surface-muted #e5ded2`, `--action-quiet #dfe3ff`, `--dcd4c8`, `--muted
#68645e`, `--rule-strong #8d887f` are derived tints of enumerated members doing
the grouping work the contract explicitly assigns to "filled fields, spacing,
and tonal contrast." No finding.

---

## Clause 2 — Typography

### Anton scope — conforms

Anton (`var(--hero)`) appears in 9 declarations
(`globals.css:3003`, `3719`, `3872`, `4873`, `5691`, `6238`, `6890`, `7342`,
`7835`). The route report confirms it
carries 1–2 nodes per route and never more: the name on `/`, the collection
title on `/work`, `/blog`, `/learn`, `/about`, `/now`, `/links`, `/privacy`,
`/photography`, and nothing on any detail route or on `/demos` and `/search`.
No negative tracking anywhere — `--hero-tracking: 0.02em` is positive and is the
only tracking value applied to the face (`globals.css:60`). Anton is absent from
every `/work/:slug`, `/demos/:slug`, and `/demos/applied/:slug` page.

`--display` is Inter, so the ~30 `var(--display)` rules are Inter carrying
headings, section titles, and record names exactly as the contract assigns.

The one Anton defect on Utility routes is already filed in `FINDINGS.md` and is
not re-raised here.

### [S2] Space Mono is the site's action and control voice

The contract confines Space Mono to "dates, state, sequence, counts, and short
evidence labels" and gives Inter "body copy, navigation, controls, claims,
ordinary headings, section titles, and record names." Space Mono currently also
carries:

| Object | Selector | Rendered text |
|---|---|---|
| Home primary action | `.practice-enter` (`1938`) | `Enter the work library ↓` |
| Home evidence bench actions | `.evidence-cell__action` (`3394`) | `Open Rally HQ →`, `Read Signal Dispatch →`, `Browse photography →` |
| Work registry row action ×32 | `.record-open` (`2502`) | `Open →` |
| Work atlas action | `.work-atlas__all` (`7858`) | `Browse all 32 records ↓` |
| Now actions ×4 | `.now-register__action` (`6402`) | `Read the durable profile →`, `Browse the complete work →` … |
| About practice actions ×5 | `.about-practice-register a` (`5883`) | `Open the work →` … |
| Bridge actions | `.demo-collection-bridge a` (`4082`), `.learn-evidence-bridge a` (`4824`), `.learn-next-move a` (`5150`), `.writing-publication-bridge a` (`5521`), `.photography-coverage a` (`7143`), `.photography-search > a` (`6958`) | route-level next moves |
| **Section navigation** | `.about-context-navigation a` (`5614`) | `About` / `Now` / `Links` |
| External profile links | `.about-profiles a` (`5979`) | `LinkedIn ↗`, `GitHub ↗` |
| **Filter control labels** | `.control label` (`2357`, `8089`), `.photography-search form label` (`6913`) | `Search work`, `State`, `Form`, `Search demos` |

Navigation and controls are named for Inter in the contract, and the action
phrase is neither a date, a state, a sequence, a count, nor an evidence label.
Because the same treatment repeats on every route, this is the "general
interface voice" the clause forbids by name. It also shows in the tally: 196
mono nodes against 160 Inter nodes on `/work`, 450 against 271 on `/blog`.

The legitimate uses are extensive and correct and should stay — `.record-meta`,
`.library-status` ("32 of 32 records in view"), `.group-heading`
("01 / 06 · Practice · 11 records"), `.record-number`, `.series-state`,
`.learn-track-time`, every `time` element, and the `.eyebrow` family are exactly
what the clause allows.

- **Contract**: §Typography — "Space Mono is limited to dates, state, sequence,
  counts, and short evidence labels. It is not used as a general interface
  voice." / "Inter owns body copy, navigation, controls, claims, ordinary
  headings, section titles, and record names."
- **Evidence**: `app/globals.css` lines above;
  `evidence/d0cfd0e/html/index.html`, `work.html`, `now.html`, `about.html`;
  `evidence/d0cfd0e/route-report.json` font tallies
- **Fix**: move action phrases, navigation, and control labels to Inter. Keep
  the arrow glyph and the mono meta/state/count layer as they are.

### [S3] Two section titles render as mono labels

`.working-set__heading h2` ("Current working set", `globals.css:3175-3183`,
0.75rem uppercase mono) and `.photography-opening__lockup > p`
(`globals.css:6877`) set structural headings in Space Mono. Both read as
eyebrows rather than titles. `.evidence-register h2` had the same problem and is
already corrected — `globals.css:7728` overrides it back to `var(--display)`,
which is the pattern to copy.

- **Contract**: §Typography — Inter owns "ordinary headings, section titles."
- **Evidence**: `globals.css:3175`, `6877`, fixed precedent at `7728`

### Delivery — conforms (see below)

All three faces load as local WOFF2 with `font-display: swap`
(`globals.css:3-33`): `anton-400.woff2`, `inter-latin.woff2`,
`space-mono-latin-400/700-normal.woff2`. No remote font host.

---

## Clause 3 — Expressive layer: **conforms**

Scored in both directions.

### Out-of-scope list — none present

| Forbidden | Check | Result |
|---|---|---|
| Looping status pulses | `grep infinite app/globals.css` | 0 hits |
| Scroll reveals | `IntersectionObserver`, `whileInView`, scroll listeners in `app/**/*.tsx` | 0 hits |
| Parallax | `background-attachment`, `perspective()`, `scroll-timeline`, `view-timeline`, `animation-timeline` | 0 hits |
| Cursor effects | `cursor:` declarations | 1 — `cursor: pointer` on `button` (`globals.css:105`) |
| Marquees | `marquee` | 0 hits |
| Autoplaying media | `autoPlay`, `<video`, `<audio`, `loop=` in `app/` | 0 hits |
| Generic icon sets | `<svg` anywhere in `app/` | 0 hits — direction is carried by `→` / `↗` / `↓` text glyphs |
| Decorative dashboards | — | the only quantitative graphic is the domain bar, which is load-bearing |

The whole motion budget is four keyframes (`globals.css:1657-1703`), all
entrance-only (`both` fill, no iteration count), all inside
`@media (prefers-reduced-motion: no-preference)` (`globals.css:1705-1741`).

### Five approved behaviors — all present

1. **Hierarchy-order settle on home.** `.practice-identity .eyebrow` 280 ms →
   name lines 420 ms (+20 ms, second line +70 ms) → `.practice-portrait` 560 ms
   (+40 ms) → `.practice-copy` 360 ms (+160 ms) → `.practice-proof--rally`
   440 ms (+260 ms). Order matches the contract's "name, portrait, claim, and
   live proof settle once in hierarchy order." `globals.css:1705-1741`
2. **Collection-title reveal.** `.library-opening h1 > span` and
   `.about-opening h1 > span` share `practice-line-in` with the home name —
   "the same short reveal." `globals.css:1713-1727`
3. **Compact menu enters from its own edge.** `.navigation-dialog` is
   right-anchored (`margin: 12px 12px 12px auto`) and animates
   `translateX(28px) → translateX(0)` via `@starting-style`.
   `globals.css:249-280`
4. **Arrows travel only on hover/focus.** Seven rules, every one paired
   `:hover` + `:focus-visible`, all `translateX(5px)` on the `b` glyph:
   `globals.css:3145`, `3256`, `3418`, `3544`, `3652`, `6422`, `7970`.
   Verified exhaustively, not sampled: a full scan of all 27 `translateX` /
   `translateY` declarations in the sheet returns exactly four ungated ones —
   `.skip-link` (offscreen until focused), `.navigation-dialog`'s closed
   position, and two `@keyframes` bodies. No arrow or media transform moves
   without an input event.
5. **Domain rows as proportional data bars.** `--domain-share` drives
   `width` on `.domain-index a::before` (`3487`, `7782`) and
   `.work-field__domain` (`7914`). Rendered values on `/work` are
   34.375 / 9.375 / 15.625 / 12.5 / 18.75 / 9.375 — 11, 3, 5, 4, 6, 3 of 32,
   summing to 100%. Real data, no separate chart.

### [S4] Two observations, no owning clause

- `@view-transition { navigation: auto }` (`globals.css:1653-1655`) adds
  cross-document navigation transitions. Native, not on the out-of-scope list,
  and neutralized under reduced motion by the
  `::view-transition-*` override at `globals.css:1644-1648`. Recorded because
  it is site-wide motion the Expressive-layer list does not enumerate.
- `.work-library-stage .work-record:hover` translates the whole 6px row
  (`globals.css:8216`), not just its arrow. The clause governs arrows and media;
  a travelling record row is neither.

### Dead prototype CSS — context, not a finding

Several earlier composition families are still in the sheet but render nowhere:
`.entrance-artifact`, `.entrance-statement`, `.floor-object`,
`.domain-doorways`, `.practice-method`, `.demo-frame`, `.track-list`,
`.domain-map`, `.recent-list` — zero occurrences across all 36 captured HTML
documents and all of `app/`. This matters here only because
`.entrance-artifact--rally` / `--demo` (`globals.css:1928`, `1935`) are the
tilted-frame collage the First-encounter clause forbids; they are **not**
rendered, so no finding. The cleanup itself is a code-quality item for
`/code-review`, not an art-direction defect.

---

## Clause 1 — Page expression model

Each route's opening was identified mechanically from the rendered HTML, then
read against the 1280 fold captures.

| Route | Declared model | Opening component in the DOM | Verdict |
|---|---|---|---|
| `/` | Stage | `practice-stage` + `practice-identity` + `practice-portrait` + `practice-proof` | conforms |
| `/about` | Stage | `about-opening__stage` + `about-opening__portrait` | conforms to the model |
| `/now` | Stage | `now-opening__stage` + `now-opening__lockup` + `now-opening__statement` | conforms |
| `/work` | Atlas | `work-atlas__opening` + six proportional `work-field__domain` fields, then `work-library-stage` | conforms |
| `/demos` | Sequence | `demo-studio` + `demo-studio__feature` (source frame, `SESSION 02`) + `demo-studio__key` | conforms |
| `/learn` | Sequence | **`library-opening`** + `learn-track-register` | **fails** |
| `/blog` | Collection | `library-opening` + `writing-opening` | conforms |
| `/photography` | Collection | `photography-opening__stage` full-bleed image + `photography-opening__lockup`, then `photography-frame-grid` | conforms |
| `/search` | Utility | none — bare shell | conforms |
| `/links`, `/privacy` | Utility | `links-opening__stage` / `privacy-opening__stage` — same scaffold as `/now` | see filed finding |

### `/photography` — both halves of the Collection clause verified

The contract asks for "a full-bleed opening **and an irregular contact sheet**
rather than translated into the site's record-row language." Both hold:

- Opening: `photography-opening__stage` is a full-bleed image with the Anton
  lockup and the search panel over it (`shots/photography-1280-fold.png`).
- Body: `.photography-frame-grid` (`globals.css:8837-8910`) is a 12-column
  `grid-auto-flow: dense` field where each of the 12 figures carries its own
  span — 2, 3, or 4 columns by 3, 4, or 5 rows, with `aspect-ratio: auto`. That
  is a genuine irregular contact sheet, not a uniform tile grid. An earlier
  uniform version (`repeat(4, 1fr)` with a fixed `2 / 3` aspect,
  `globals.css:7082-7096`) is fully overridden by it.
- The row-language variant `.photography-route-index` — a
  `50px / 170px / 1fr / auto` record row — is dead: zero occurrences in
  `photography.html`. The live component is `.photography-route-deck`, a
  five-tile deck. Commit `bf67525 feat: give collection routes distinct visual
  forms` landed.

### [S2] `/learn` renders the Collection opening, not a Sequence opening

`/learn` and `/blog` server-render the **same** opening component —
`library-opening`, `library-opening__copy`, `library-opening__register` — while
`/demos`, the other route in the Sequence group, renders `demo-studio`. So the
two Sequence routes look nothing alike, and `/learn` looks like the Collection
route.

Read side by side at 1280 the two openings are one composition: ink band, mono
breadcrumb left with a right-aligned meta strip
(`7 PATHS · 5 STAGES EACH` / `285 PIECES · UPDATED JUL 31, 2026`), Anton
headline left, Inter lede plus a grey sub-paragraph right, then a bone body of
left-title-plus-right-rows. `/demos` instead leads with a source frame, a
session tag, and two count blocks — a composition that reads temporal before any
label is read.

The body repeats the problem. Seven tracks render as a register with `L01`/`L02`
numbers, a `START HERE WHEN` column, an `END ARTIFACT` column, and a duration —
the same row grammar `/blog` and `/work` use. Nothing in the composition
expresses progression through five stages; the sequence exists only as a number
in a mono label.

- **Contract**: §Page expression model — "Sequence — Demos, Learn. Order,
  progression, and source artifacts drive the composition." And "Page-level
  sameness is a defect when the visitor jobs differ." §Cognition — "Similarity:
  repeated objects mean repeated behavior. Unlike work keeps an unlike visual
  form, even when it shares the same data and action grammar."
- **Evidence**: `evidence/d0cfd0e/shots/learn-1280-fold.png` beside
  `blog-1280-fold.png` and `demos-1280-fold.png`; class extraction over
  `evidence/d0cfd0e/html/learn.html`, `blog.html`, `demos.html`
- **Fix**: give `/learn` its own opening in the Sequence family. The stage
  progression is the material `/demos` uses source frames for.

### [S3] The two portrait Stage routes open identically

`/` and `/about` both open with the same illustrated portrait
(`/work/nino-illustrated-v1.png`) on the right half, the same two-line Anton
name in Cobalt on the left (179px vs 154px), the same copper eyebrow, and the
same Inter claim below. A visitor moving from Home to About sees the first
screen a second time and has to scroll to learn that the page changed.

Both are Stage routes, so a shared vocabulary is sanctioned — this is a craft
finding about the identity lockup being reused verbatim, not a model error.
`/now` shows the alternative inside the same model: same grid, same palette,
different lockup.

- **Contract**: §Cognition and Gestalt — "Chunking: no major page begins with
  more than one identity statement"; §Page expression model — "Continuity comes
  from the global shell, palette, grid, type roles... Opening composition...
  follow the visitor's job."
- **Evidence**: `evidence/d0cfd0e/shots/index-1280-fold.png`,
  `about-1280-fold.png`
- **Fix**: keep the portrait on one of the two, or change what leads on
  `/about` — the durable profile, not the name already established on `/`.

### Note, not a new finding

`/links` and `/privacy` render `links-opening__stage` / `privacy-opening__stage`
— the same eyebrow + giant lockup + statement + lede + register scaffold as the
Stage route `/now`, sharing rule blocks with it (`globals.css:6196`,
`7312`). `/search` renders none of it. This is the composition half of the
already-filed **"Anton performs on Utility routes, and inconsistently"** in
`FINDINGS.md` — same cause, same fix, so it is recorded here as scope for that
finding rather than as a second item.

---

## Clause 5 — First encounter: **conforms**

Verified against `evidence/d0cfd0e/html/index.html` and
`shots/index-1280-fold.png` / `index-390-fold.png`.

| Assertion | Result |
|---|---|
| Name large enough to behave as structure | `<h1 id="practice-title">` in Anton, 179px at 1280, 113px at 390 |
| Illustrated portrait occupies the right half as an image field | `.practice-portrait` with `/work/nino-illustrated-v1.png`, ~50% of the stage, no fake cutout |
| Name leads the hierarchy | `<h1>` carries only `Nino Chavez`; the claim is a sibling `<p>` |
| A smaller Rally HQ surface, not a third hero | one `<a href="/work/rally-hq" class="practice-proof practice-proof--rally">` inside the portrait field, captioned `On the court / Rally HQ →` |
| Visible grid aligns the composition | `.practice-stage__grid` (`aria-hidden="true"`), visible in the `/about` and `/now` captures |
| **Claim is readable HTML, not baked into an image** | `<p class="practice-claim">I build the system, run the operation, and keep the evidence.</p>` — a real text node in Inter |
| **Library action is readable HTML** | `<a href="/work" class="practice-enter">Enter the work library ↓</a>`, plus `Search and filter all work →` in the working set |
| **The proof surface is singular** | exactly one `.practice-proof` in the stage. `/` carries 6 images total, but the other four (`rally-hq`, `signal-dispatch`, `photography`, `demo-browser`) are inside `.evidence-bench`, which the contract itself defines as "an index, not another thesis." No tilted collage. |

The tilted-frame collage the clause forbids exists in CSS
(`.entrance-artifact--rally` / `--demo`, `globals.css:1928`, `1935`) but renders
on no route.

---

## Conformance summary

| Clause | Result | One-line evidence |
|---|---|---|
| §Page expression model — Stage (`/`, `/about`, `/now`) | pass | three distinct openings, all leading with presence and the working set |
| §Page expression model — Atlas (`/work`) | pass | six proportional domain fields precede the 32-record registry |
| §Page expression model — Sequence (`/demos`) | pass | source frame, session tag, and count blocks read temporal before any label |
| §Page expression model — Sequence (`/learn`) | **fail** | renders `library-opening`, the Collection component, and a register body |
| §Page expression model — Collection (`/blog`, `/photography`) | pass | `/photography` = full-bleed opening + a 12-column dense contact sheet with per-figure spans; `/blog` privileges subject groups and reading rhythm |
| §Page expression model — Utility (`/search`, `/links`, `/privacy`) | fail (already filed) | `/links` and `/privacy` reuse the Stage opening scaffold and 294px / 220px Anton; `/search` has neither |
| §Typography — Anton display-only, never negatively tracked | pass | 8 declarations, 1–2 nodes per route, `--hero-tracking: 0.02em` positive, absent from every detail route |
| §Typography — Inter owns structure | pass | `--display` resolves to Inter; all headings, section titles, and record names use it |
| §Typography — Space Mono confined to dates/state/sequence/counts/labels | **fail** | also carries every action phrase, `.about-context-navigation` links, and `.control label` |
| §Typography — local WOFF2 delivery | pass | three `@font-face` rules, all local, `font-display: swap` |
| §Expressive layer — five approved behaviors present | pass | hierarchy settle, collection-title reveal, right-edge menu, hover/focus-only arrows, `--domain-share` bars summing to 100% |
| §Expressive layer — out-of-scope list absent | pass | zero hits for `infinite`, IntersectionObserver, parallax, marquee, autoplay, custom cursor, `<svg>` icons |
| §Color and material — closed palette | **fail** | a per-domain color language including violet `#e3d8ef`, plus `--text #111927` and `--cobalt-bright #6372ff` |
| §Color and material — Copper by ground | **fail** | `--focus: #9f4f30` is the only focus ring and applies on ink grounds; `#ffb082` adds a third copper |
| §First encounter — claim and library action are readable HTML | pass | `<p class="practice-claim">` and `<a href="/work">` are real text nodes |
| §First encounter — the proof surface is singular | pass | one `.practice-proof` on the stage; the other images sit in the evidence bench index |

## Findings by severity

| # | Sev | Finding |
|---|---|---|
| 1 | S2 | `/learn` renders the Collection opening, not a Sequence opening |
| 2 | S2 | Space Mono is the site's action, navigation, and control voice |
| 3 | S2 | A per-domain color language exists outside the closed set |
| 4 | S2 | Copper `#9F4F30` is the global focus ring, including on ink grounds |
| 5 | S3 | The two portrait Stage routes (`/`, `/about`) open identically |
| 6 | S3 | `#ffb082` is a fourth copper value on ink hover states |
| 7 | S3 | `--text #111927` is a third near-ink value and carries all body copy |
| 8 | S3 | Two section titles render as mono labels |
| 9 | S4 | Grounds darker than Ink (`#071015`, `#050b12`) back media planes |
| 10 | S4 | `@view-transition: auto` is site-wide motion the Expressive layer does not enumerate |
| 11 | S4 | `.work-library-stage .work-record:hover` travels the whole row, not just its arrow |

**Not re-raised**: the Utility display-face finding and the reduced-motion pass,
both already in `FINDINGS.md`.

**Deliberately not filed**: nothing about trend alignment, palette modernity,
type-scale fashion, or grid convention. The direction is locked; those are not
defects.
