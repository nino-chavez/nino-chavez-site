# Direction — ninochavez.co, home

Art direction for this surface. Sits above the brand kit (`DESIGN.md`, which says what the
colors *are*) and above the defect scanner (which says what is broken). This says what the
page is *arguing*, and which devices are allowed to trip a slop rule because they carry
that argument.

A finding with no `authorized` row here is a defect. Absence of a record is not permission.

## Thesis

This is an index of one person's output across four unrelated crafts — code, photography,
music, writing — presented flat, without ranking them by what earns money. The page says so
twice in its own copy: *"Some ships, some doesn't."* and *"Some pays the bills. Most of it
doesn't."* The day job appears once, as a line of biography, not as the frame.

It argues that by behaving like a contact sheet rather than a portfolio: numbered sections,
a tagged grid of projects, no headshot, no services list, no testimonials, no single
professional identity to sell. It refuses the consultant-portfolio default — hero photo,
value proposition, case studies, book-a-call.

## Ledger

Every device must cite the thesis. A device that cannot is not authorized, whatever else
can be said for it.

| id | verdict | device | cites the thesis by | rules |
|---|---|---|---|---|
| `numbered-sections` | authorized | `01 / PROJECTS`, `02 / ABOUT`, `03 / CONTACT` in tracked mono caps | A contact sheet is indexed, not narrated. Numbering says "here is everything" where a portfolio would say "here is my best work" | `repeated-section-kickers` |
| `craft-kickers` | authorized | A mono, tracked, uppercase label above each project naming its craft — MEDIA, MUSIC, PHOTOGRAPHY, OPEN BETA, AI PRACTICE, WRITING, AI VISIBILITY — each in its own color with a matching dot | The taxonomy *is* the argument. Four crafts presented flat need a way to say which is which that does not rank them; a color per craft ranks nothing | `undersized-ui-text` |
| `lime-accent` | authorized | `lime-400` as the site's single accent — hero kicker, the one filled CTA (`bg-lime-400 text-black`), every section number, every card-title hover (42 usages on this surface, 111 repo-wide) | A contact sheet is printed in one ink. One high-contrast accent marks what you can *act on* without ranking the crafts around it — which a second brand color would immediately start doing | — |
| `hero-grid-wash` | removed | An 80×80px lime hairline grid at 10% alpha, `opacity-20`, absolutely positioned over the **hero** (`+page.svelte:127`) | **Could not cite it.** A contact sheet's grid holds frames — it is product structure. This one sat behind the hero statement, not behind the project index, so it organized nothing and read as the generated-dev-tool backdrop the detector names. Its own rule prescribes the thesis's answer: "reserve grid overlays for actual canvas, map, blueprint or measurement surfaces; elsewhere use product structure or a plain surface" | `codex-grid-background` |
| `craft-palette` | undecided | Seven craft kickers across five colors — pink (MEDIA), purple (MUSIC), lime (PHOTOGRAPHY, OPEN BETA, AI PRACTICE), cyan (WRITING), indigo (AI VISIBILITY) — hardcoded per card in `src/routes/+page.svelte`, each with a matching dot, tint wash and hover underline | The *device* cites the thesis: four flat crafts need a way to say which is which that does not rank them. The specific palette cannot. Three crafts share lime **with the site accent**, so the coding is not one-to-one and the accent no longer means only "actionable"; and no declared system anywhere contains pink, cyan or indigo | `ai-color-palette` |

## What was fixed

**Eleven contrast failures were the code drifting from its own declared system.** Every one
was `text-neutral-500` (`#737373`) on the near-black ground at **4.2:1**. `DESIGN.md`
declares `text.muted: {colors.neutral.400}` = `#a3a3a3`, which is **7.85:1** on the same
ground. The fix was not a color choice — it was using the color the design system already
names. Swapped across 34 occurrences in 11 files; the site is dark-only, and every
`bg-white` in the codebase is a `/5`–`/10` overlay or sits under an explicit `text-black`,
so no instance moved onto a light ground.

**Seven kicker labels sat at 10px, below the 11px functional-text floor.** Nothing argues
for 10 over 11 — the device is mono, tracked, uppercase and colored, and it survives the
change intact. Raised repo-wide (28 occurrences), not just on the scanned surface.

**One paragraph ran to ~105 characters.** Its three siblings share the same class and the
same absence of a measure; only its sentence was long enough to show it. `max-w-lg` applied
to all four rather than special-casing the one that got caught.

Measured on the built site: total 50 → 31, and **warnings 22 → 3**. `low-contrast` 11 → 0,
`undersized-ui-text` 7 → 0, `line-length` 1 → 0. All three remaining warnings belong to
`craft-palette` and are adjudication, not repair: MUSIC's purple tint (`+page.svelte:252`),
MUSIC's purple kicker (`:263`), WRITING's cyan kicker (`:370`).

## Open

**The kicker palette belongs to a person.** The site accent is settled (see below); the
five craft colors are not. Two directions are both consistent with the thesis — give the
crafts a declared system, or drop the color and let the mono kickers carry the taxonomy on
their own, as they already do typographically. What is *not* consistent is the present
state, where lime means both "this craft" and "act here."

**`DESIGN.md` describes a site that stopped existing in January 2026.** The kit declares
`brand.violet: #8b5cf6` as "the single saturated accent" and forbids a second brand color.
There are **zero** violet usages on this surface. Lime arrived 2026-01-30 in `c4f859e`,
*"style: Redesign one-pager with lime/black color scheme"* — an explicit decision. The kit
was written 2026-04-22, three months later, and describes the pre-redesign site; the
2026-05-25 v3 archive (`2f4ffa8`) then restored it verbatim as "v2 production state" while
restoring lime code alongside it. This is not the page drifting from its system. It is a
document that was inaccurate the day it was written and got re-canonized by an operation
that was about reverting code. **The kit is what needs to change here, not the page.**

## Notes

`image-hover-transform` ×25 is **advisory** — reported, never counted, never affects the
exit code. It is the single largest number on this page and it means nothing for the gate.

`repeated-section-kickers` ×3 is also advisory, and it is the `numbered-sections` device
firing exactly as designed. Authorized above so the reasoning is on the record rather than
rediscovered.

**Three claims in the first draft of this record were false, and the source says so.** It
authorized a `violet-accent` device — "violet links, hovers and accents… the one declared
color on the page" — on a surface with **zero** violet usages. It recorded a
`violet-gradient-bg` "behind the hero"; there is no hero gradient, and the gradient the
detector sees is the MUSIC card's `from-purple-500/10` tint (`+page.svelte:252`), which
belongs to `craft-palette`. And it sourced the kicker colors to `focusArea.color` in
`src/lib/constants.ts`; those are violet/cyan/green and drive work-item metadata, while the
kicker colors are hardcoded per card in the page itself.

All three came from reading `DESIGN.md` and describing the site it *claimed*, instead of
querying the site. That is the same failure as the blog record's `gradient-text` row, and
it is the failure this layer is supposed to catch in others — a record asserting a design
intent that no shipped pixel supports. Corrected against `grep` counts and the live scan's
own snippets.

**The `design-system-color` rule — the one that checks this page against this kit — has
never run here.** impeccable's `addColorObject` reads only string values one level under
`colors:`, so a kit nesting them under `brand:` / `neutral:` parses to **zero** colors and
the rule abstains silently. Verified on a fixture: nested → `hasColors=false`, no finding;
flattened → `hasColors=true` and `design-system-color: Undocumented color #a3e635 is
outside DESIGN.md colors`. It is also a *source*-file check (`checkSourceDesignSystem`,
wired into the regex and static-HTML engines), so a URL scan cannot produce it at all. The
kit/page divergence above was found by hand because the gate is structurally unable to see
it.
