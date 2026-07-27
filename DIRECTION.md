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
| `violet-accent` | authorized | Violet links, hovers and accents | `DESIGN.md` declares `brand.violet: #8b5cf6` as the primary accent and `text.link`. It is the one declared color on the page | `ai-color-palette` |
| `craft-palette` | undecided | The seven kicker colors — pink, purple, lime ×3, cyan, indigo — sourced from `focusArea.color` in `src/lib/constants.ts` | The *device* cites the thesis. The specific palette cannot: none of these colors appear in `DESIGN.md`, which declares exactly one accent, and lime doubles as the CTA color. Three crafts share lime, so the coding is not even one-to-one | `ai-color-palette` |
| `violet-gradient-bg` | undecided | A violet→purple gradient wash behind the hero | Violet is declared, but a decorative gradient ground is not a device the thesis reaches for — a contact sheet has no atmosphere. Recorded rather than rubber-stamped because it uses the one declared color | `ai-color-palette` |

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
`undersized-ui-text` 7 → 0, `line-length` 1 → 0. The three remaining warnings are the
`ai-color-palette` rows above, which are adjudication, not repair.

## Open

**The kicker palette belongs to a person.** This site and the blog have the same unowned
color decision pointing in opposite directions: Signal Dispatch collapses every category to
one violet and throws the taxonomy away, while this page assigns seven colors that no
declared system contains. Neither was decided; both were inherited. Deciding one should
probably decide the other, since the blog is served from this domain at `/blog`.

**`DESIGN.md` declares one accent and the page ships six.** Lime is the CTA color
(`bg-lime-400`) *and* a kicker color for three of seven crafts. Either the kit is
incomplete or the page is off-system; the record cannot tell which from here, and guessing
would entrench whichever answer is wrong.

## Notes

`image-hover-transform` ×25 is **advisory** — reported, never counted, never affects the
exit code. It is the single largest number on this page and it means nothing for the gate.

`repeated-section-kickers` ×3 is also advisory, and it is the `numbered-sections` device
firing exactly as designed. Authorized above so the reasoning is on the record rather than
rediscovered.
