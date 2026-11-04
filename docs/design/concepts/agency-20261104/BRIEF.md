---
design_intent: rethink
design_direction: docs/decisions/0007-profile-studio.md
status: Masthead selected 2026-11-04; color system awaiting named selection
---

# Profile rethink: a modern agency visual style

Nino asked on 2026-11-04 for a rethink of the profile site in a modern agency visual style. This round proposes three whole-page structures. Nothing here ships until Nino names one.

## Scope assumed

Home and `/work`, so the style can be judged beyond one page. Studio (ADR 0007) is home-only and leaves inner routes as they were; a selection here should say whether the new style replaces Studio on home only or also carries inward.

## Held fixed

- **Palette:** Porcelain `#F1EDE4`, cobalt `#244CC2`, ink `#233343`, pale blue `#E5EAF4`, selected in ADR 0007 on 2026-11-03. The concepts differ in structure, type and scale, not color. A different palette is a separate decision for Nino.
- **Content model:** agency grammar only. No services list, client logos, testimonials, "we", or new claims. All copy is the live site's authored copy.
- **Behavior:** Writing and Photography open in new tabs. `/photography/coverage` stays in the same tab. Native scrolling, visible focus, native semantics. Phone keeps Work, Writing, Photography, About and Email.

## The job

- **Happening now:** someone arrived from a referral, search result or project link and is deciding whether this person is worth their time.
- **Next:** see real work, then open a project, the writing or the galleries.
- **Who:** peers, collaborators, potential employers, people following a photo or writing link.
- **When and where:** usually a phone or a laptop, in a short visit, with no prior knowledge of the site.
- **Can do:** follow Work, Writing, Photography or About, or email.

## Character

Confident, large-scale, physical, plain-spoken, personal.

## Anti-goals

Not a consultancy pitch. Not a template with a heavy font on it. Not a motion demo that makes the visitor wait. Not a repeat of Studio's rail or the November 2 editorial and living-index layouts. Not so stylish that a real product screen stops being legible.

## Density

First screen answers who and offers all five routes without scrolling, on both sizes. At least one real image or product appears within one scroll.

## Hierarchy

Identity or statement first, real work second, routes third.

## Object, action, state

| Object | Action | States checked |
|---|---|---|
| Home | Read, follow a route, email | Desktop, phone, first screen and full page |
| Work page | Open a record, browse all | Selected work with availability, captions and actions |
| Project link | Open in a new tab; Rally HQ on `/work` stays in the tab | Long names, tall and wide media |
| Preview pane (B) | Follows hover and keyboard focus | Default, hover, focus, reduced motion, absent on phone |

## Surfaces

| Surface | Routes | In this round |
|---|---|---|
| Home | `/` | All three concepts |
| Work | `/work` | All three concepts; library controls at `?view=all` unchanged |
| Other inner routes | `/about`, `/now`, `/links`, `/cv`, `/demos`, `/learn`, `/search`, `/privacy` | After selection |

## Concepts

- **A, Masthead:** the name set across the full width in Anton, then a large photograph, then each project as a full-width color panel. Closes on "Get in touch" at the same scale.
- **B, Sentence:** the first screen is the authored statement at poster size on cobalt, and its words are the navigation. Work is a list of large names with one sticky preview that follows hover and focus.
- **C, Wall:** opens directly on the work, edge to edge with no gutters, sized to fill the first screen. The grid does the work the type does in A and B.

Each is built by `build.py` from one shared copy source, so the words are identical across concepts.

## Reference questions

Observation comes from desktop and phone captures of the live sites on 2026-11-04. Stills support no claim about motion, and none is made. Captures are kept outside this public repo at `.artifacts/agency-20261104-refs/` in the main checkout.

| Site | Question | Observed | Used for |
|---|---|---|---|
| [Instrument](https://www.instrument.com) | How far can a wordmark carry the first screen? | Full-width heavy wordmark above large media | A |
| [Koto](https://koto.com) | Can a photograph hold a name without a layout around it? | Full-bleed image, small name lower left | A's photograph |
| [Locomotive](https://locomotive.ca/en) | Can a list of names be the work section? | Very large centered names between rules | B's rows |
| [AREA 17](https://area17.com) | How does a statement become a list? | A sentence with one highlighted name in a stack of names over an image | B's sentence, as inference |
| [Collins](https://www.wearecollins.com) | How little can a statement need? | One large line on an empty field | B's restraint |
| [Instrument](https://www.instrument.com), [Obys](https://obys.agency) | How does work read as a dense field? | Tight tile rows; Obys uses a central image column on white | C |

Limits: Pentagram and BASIC/DEPT captures informed the general read but answered no question here. Obys's motion was not assessed. Work & Co was captured but not used.

## The reel's tells, as review prompts

Source: the `charles.unemployed` Reel, 2026-11-03. Prompts, not bans. Anything unlisted is absent from all three.

| Tell | A | B | C | Reason it stays, if it stays |
|---|---|---|---|---|
| Negative kerning | no | -0.022em at display sizes | -0.025em at display sizes | Optical correction for large type only; never on body text |
| Containers with borders | no | no | 2px lines between tiles | The lines are the grid; tiles are acted on as a unit |
| Periods in titles | no | The statement is a sentence | no | Authored copy, not a title device |
| Overusing dividers | no | Rows only | Tile edges only | Separate items acted on individually |
| Gradient backgrounds | Only a scrim under the photo caption | no | no | Keeps white text legible on the photograph; not decoration |
| ALL CAPS | Display names and headings, no subtitles | no | no | Anton is the concept's voice; captions and body stay sentence case |
| Color shades and opacities | Caption opacity on color panels | Note opacity on cobalt | Note opacity on cobalt | Quiet secondary text on color; to be tokenized if selected |
| Pills, eyebrows, section numbers, mono, italics, Instrument Serif, dithering, ASCII, squircles | no | no | no | |

## What this does not show

These are static concept pages, not the production route. Motion is limited to hover and focus transitions. Device frames are viewport emulation, not physical phones. No analytics or visitor test backs any of them.

## Cold review, 2026-11-04

A reviewer with no brief saw desktop and phone captures of all three, with neutral names. It ranked C first (real work on the first screen, best phone stack), A second (strongest identity, repetitive on Work), B last (empty blue, template-like Work list). Its findings prompted these revisions, which it did not re-review: A's photo crop and Work heading scale, B's phone Work gap and inline image size, C's clipped product screens and filler tile. A fresh cold review is still owed on the build after selection.

Rendered checks after those revisions: no horizontal overflow at 1440 or 390 wide; specialist links open in a new tab with `noopener`; B's preview follows hover and keyboard focus; the keyboard path starts at the skip link and focus outlines render on it and the primary navigation.

## Selection and palette round, 2026-11-04

Nino selected A, Masthead, and asked to rethink the palette using Mobbin and Impeccable. That reopens the palette held fixed above. B's linked statement is grafted into Masthead's home; the other concepts stay in this folder, not approved. The ADR is written once the palette is named.

Candidates are in `m/` with tokens in `palettes/`. Strategy per Impeccable's `colorize` and `new-work` references: one color owns whole regions, with explicit roles for ground, text, action, panels and closing line.

A reviewer with no brief ranked the first versions: Ultra, Night Game, Flare, Clash. Clash was rejected and its first-round files remain. Revisions after that review were not re-reviewed. Script contrast check after revisions: 0 failures, body text at least 5.27:1 and large text at least 4.2:1.

Sibling sites are a constraint: Photography is charcoal and gold, Flickday is black and yellow (`fleet-color-study.md`). That counts against Night Game and rules out black and yellow.

## Color round two, 2026-11-04

Nino rejected Ultra, Night Game and Flare: none made sense for color combined with the page design. The defect was method. Swatches were chosen first and laid on as a different band per section, so they competed with the photograph and product screens, and the reviewer's ranking of those palettes did not catch it.

The new rule starts from the layout. One ground holds the page, work and photographs supply the color, and the accent comes from the photograph and has a stated job. Candidates: Bookend (court red on the first screen and closing line), Gallery (red only on actions), Arena (black from the arena, ice blue on actions).

The reviewer preferred Gallery, then Arena, then Bookend. Its Bookend critique described a page red throughout, including the About section, which the captures do not show, so that ranking carries less weight. Lowest body contrast is 5.36:1.
