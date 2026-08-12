# Nino Chavez portfolio system

- **Status:** Withdrawn candidate — retained as historical evidence (2026-08-04)
- **Superseded by:** `docs/claude-design-system.md` (the rationed system), which
  shipped to production 2026-08-05
- **What survived from this document:** the interaction, accessibility, IA, and
  route contracts, absorbed as dated amendments into the winning system
- **Prototype:** `prototype/index.html` (review click-through, never produced)

This was the Codex-authored candidate in the 2026-08-04 two-system bake-off.
After rendering both candidates, Codex itself withdrew this one: "Claude's
candidate is the better visual foundation. Mine is organized and usable, but it
overcorrects into a generic portfolio template." Its visual layer (warm-neutral
shell, portrait hero) is retired; do not apply its palette, type roles, or
component rules. See `art-direction/RETROSPECTIVE-claudeish-redesign.md` for the
full record.

## The decision

The main site is a quiet personal portfolio holding several strong project
identities. The shell provides hierarchy, navigation, and honest state. The work
provides the color.

The system has one visual signature: **a calm, warm reading surface interrupted by
real project evidence.** It does not need a second signature made from oversized
type, decorative geometry, dark fields, or color-coded categories.

## Reader contract

- **Reader:** A prospective collaborator, client, employer, or reader encountering
  Nino's work
- **Job:** Understand who Nino is, see the complete body of work, and choose a
  useful next destination
- **Assumed knowledge:** None
- **Plainness:** Lay language in navigation and summaries; exact project and
  technical names where they carry meaning
- **Precision locks:** Project names, public destinations, lifecycle states,
  forms, dates, counts, and published titles
- **Copy owners:** `app/data.ts`, `app/demo-data.json`, the route copy in `app/`,
  and `docs/IA-NAVIGATION.md`

## Authority and change rules

After approval:

1. This document owns the design decisions.
2. `app/globals.css` owns the production token values.
3. Components consume semantic tokens. They do not own colors, typefaces, radii,
   or shadows.
4. Route data owns names, claims, state, form, dates, and destinations.
5. A new visual rule starts here before it reaches a component.
6. A project may keep its native identity inside screenshots, photographs, logos,
   and embedded product surfaces.

No second palette, component-local token set, or route-specific visual system may
be added to the main shell. A legitimate exception names its reader need and stays
contained to the owning project surface.

## Visual principles

### One thing leads

Every viewport has one dominant subject: identity, a collection title, a work
record, or a piece of evidence. Metadata, navigation, and actions support it.

### Color has one interface job

Blue marks links, focus, selected controls, and the primary action. It does not
wash sections, tint categories, or color headings. Lifecycle states are written in
text and never rely on color.

### Project media keeps its identity

Rally HQ remains black and yellow inside its screenshot. Blueprint remains blue.
Photography remains photographic. The shell does not recolor them or place every
project inside the same tinted card.

### Repetition comes from anatomy

Work records repeat the same information order. Demo sessions repeat the same media
and caption anatomy. Consistency comes from placement and behavior, not identical
background treatments.

### Empty space carries hierarchy

Spacing and rules separate sections. Shadows, gradients, glows, floating badges,
and decorative shapes are not part of the system.

## Tokens

### Color

| Token | Candidate value | Job |
|---|---:|---|
| `--ground` | `#f4f1eb` | Page background |
| `--surface` | `#fffdfa` | Media beds, controls, and contained reading surfaces |
| `--text` | `#17191d` | Primary text and strong rules |
| `--muted` | `#62666d` | Supporting text and metadata |
| `--rule` | `#d6d2c9` | Hairline boundaries |
| `--action` | `#2b55d4` | Links, focus, selected state, primary action |
| `--action-quiet` | `#edf1ff` | Selected-control background only |

These seven tokens are the entire shell palette. There are no shell-owned copper,
sand, lime, coral, violet, or domain colors. Dark project screenshots are content,
not a dark-mode instruction.

### Typography

| Role | Typeface | Use |
|---|---|---|
| Display | Schibsted Grotesk, 600–700 | Name and page titles |
| Body/UI | Inter, 400–700 | Navigation, summaries, controls, and actions |
| Evidence | Space Mono, 400–700 | State, form, date, count, and sequence only |

Rules:

- Names and headings use title case.
- Display type never turns a paragraph into a poster.
- Mono never carries a section title, project title, or sentence.
- A recurring label is ordinary body type unless the value is genuinely evidence.
- Body copy stays at `1rem/1.6` or larger.

### Type scale

| Token | Candidate value |
|---|---:|
| `--step--1` | `0.8125rem` |
| `--step-0` | `1rem` |
| `--step-1` | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` |
| `--step-2` | `clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)` |
| `--step-3` | `clamp(2.25rem, 1.6rem + 2.6vw, 4rem)` |
| `--step-4` | `clamp(3.5rem, 2.2rem + 5vw, 7.5rem)` |

### Space and geometry

- Four-pixel base: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`
- Content width: `1240px`
- Reading width: `680px`
- Radius: `4px`; pills are reserved for compact filter controls
- Rules: `1px`
- Shadows: none
- Gradients: none
- Default media ratios: `16:10` for products, `4:5` for portrait photography

## Layout

The site uses a twelve-column desktop grid and a single-column mobile flow. The
grid is implementation structure, not visible decoration.

- Header: identity / primary navigation / search
- Home opening: seven columns of identity and copy / five columns of portrait
- Collection opening: eight columns of title / four columns of explanation
- Work row: domain / name and claim / state and form / action
- Detail: eight-column evidence area / four-column facts and action
- Page padding: `24px` mobile, `32px` tablet, `48px` desktop

No page changes the global header order or invents another shell.

## Component library

### `SiteHeader`

Stable identity, six primary destinations, and Search. It is light, compact, and
separated by one rule. The current item uses text weight plus an underline and
`aria-current`.

Mobile replaces primary links with a labeled Menu button. The dialog contains
Search, all primary destinations, Now, and Links. It closes on Escape, explicit
Close, or navigation and returns focus to Menu.

### `PageIntro`

Contains an optional evidence label, one `h1`, and one short explanation. The
explanation does not repeat the heading.

### `EvidenceMedia`

Shows a real screenshot or photograph without a color wash. `object-fit` follows
the artifact: contain for interfaces, cover for photography. A caption states what
the reader is seeing when the image cannot explain itself.

### `WorkRecord`

Required anatomy, in order:

1. Domain
2. Name
3. One-sentence claim
4. Lifecycle state and form
5. One honest action or an explicit unavailable state

The row does not become a colored card. Hover may underline the name and shift the
arrow. The record remains understandable without hover or color.

### `CollectionControls`

Search, domain, lifecycle state, and form. Labels name the reader outcome. Active
filters remain visible. The result count updates in text. Reset is available when
the result set is filtered.

### `SessionCard`

Real media first, then session number, title, summary, and one action. Cards share
anatomy and spacing; the media supplies visual variation.

### `StateLabel`

Text only: `Live`, `Maintained`, `Published`, `In development`, or `Paused`.
Production adds the plain-language gloss where the consequence matters. The label
never uses a colored badge as its only signal.

### `PrimaryAction`

Solid blue, one per viewport. Secondary actions are underlined text links. Button
copy names the destination: `Open Rally HQ`, not `Learn more`.

### `Breadcrumbs`

Detail routes only. Ancestors are links. The current page is plain text with
`aria-current="page"`.

### `SiteFooter`

Repeats identity and navigation on the page ground. No second dark field, slogan,
or oversized sign-off.

## Page archetypes

### Home

Identity, one concrete first-person sentence, role and location, two actions, a
small real portrait, three unlike pieces of work, and direct entrances to the deep
collections. Home introduces the model. It does not reproduce the full library.

### Work

The complete authorized inventory. Search and filters operate on all records. Rows
stay stable across domains and states. Domain is information, not decoration.

### Demos

Sessions and applied techniques remain visibly distinct collections. Real session
frames lead. Session numbers are evidence, not chapter styling.

### Detail

One concise claim, truthful state and form, one primary destination, real evidence,
and related material. A detail page is not forced into a fabricated case-study
story.

## Interaction and motion

- State changes complete in `160ms` or less.
- Images may scale up to `1.01` inside a clipped frame.
- Links underline or shift an arrow by no more than `4px`.
- Filters update the result list without moving the controls.
- `prefers-reduced-motion` removes transforms and smooth scrolling.
- No entrance choreography, parallax, marquees, carousels, ambient movement, or
  whole-grid reallocation.

## Accessibility

- WCAG AA contrast for text and controls
- Visible `3px` focus outline using `--action`
- Minimum `44px` touch targets
- Semantic headings, lists, navigation, forms, and buttons
- `aria-current` for active navigation
- Labels for every form control
- Filter results announced with `aria-live="polite"`
- Mobile dialog is keyboard complete and returns focus to its trigger
- Images keep useful alternative text from their owning data

## Copy and naming

- Use the canonical route names: Work, Demos, Learn, Writing, Photography, About,
  and Search.
- Use one public name per object.
- State what the object does before naming its implementation pattern.
- Keep one claim and one action per record.
- Avoid `Explore`, `Discover`, and `Learn more` when the destination has a concrete
  verb.
- Do not expose internal labels such as `work object`, `registry`, `snapshot`, or
  `review build` to visitors.

## Explicitly retired from the shell

- Full-bleed sports or portrait hero backgrounds
- Oversized condensed all-caps name treatments
- Decorative circles, diagonals, blobs, grain, and grids
- Floating profile badges
- Copper/cobalt/sand or multi-accent combinations
- Colored domain tiles and colored taxonomy bands
- Dark section alternating with dark header and dark footer
- Mono kickers repeated above every heading
- Counts presented as outcomes
- Generic card walls

## Prototype acceptance

The candidate passes review only when all of these remain true:

- Home identifies Nino and exposes real navigation in the first viewport.
- Work remains legible with all 26 authorized records.
- A filtered Work state is obvious without relying on color.
- Demos remains understandable with twelve sessions.
- One detail route works without becoming a generic case-study template.
- Mobile navigation is complete and keyboard operable.
- Removing color does not erase hierarchy, state, or action.
- Removing hover does not hide content or navigation.
- No production route or token changes before operator approval.

## Review question

Does this feel like one person with a coherent practice, while letting each piece
of work remain itself?
