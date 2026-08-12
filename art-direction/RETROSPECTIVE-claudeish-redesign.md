# Retrospective: the "claudeish" redesign arc (2026-07-29 → 2026-08-05)

Source document for a potential blog post or caption. Mined 2026-08-12 from
Claude session transcripts (`~/.claude/projects/-Users-nino-Workspace-dev-apps-website-nc/`,
principally `51d89cbf` — the 58MB 08-04/05 session), Codex archived sessions
(`~/.codex/archived_sessions/`, principally the 07-29 master and 08-04
claudeish sessions), repo docs, and git history. Verbatim quotes are from
hand-typed operator turns unless marked otherwise.

## Timeline

- **07-29** — Nino hands the redesign from Claude to Codex: "don't take this
  as prescriptive. determine your own plan and approach." Codex runs
  art-direction rounds: round 01 (lineage probes from Nino's own systems),
  round 02 (outside references: Schwulst, Craig Mod, Ink & Switch), round 03
  (rejects both prior rounds — "all six directions are rejected… change the
  visual premise rather than restyle the same premise"). Round-04 RESEARCH.md
  diagnoses the structural failure: the brief itself ("four to six selected
  objects") encoded the collapse; test rule "Remove color and hover, then add
  twenty work objects."
- **07-31** — Open Practice redesign promoted to production (`6722921`),
  acceptance recorded (`81cd307`).
- **08-01** — copy audit against the live site; standard codified (`0e04243`);
  Codex PRs #16–#21.
- **08-03 ~10:40 PM** — Jordan's Slack feedback (relayed into the Claude
  session 08-04 13:08): "Nice and clean look… I will say it feels even more
  AI generated - feels very Claudeish, which may be completely intentional.
  Just a design observation."
- **08-04 (one ~13-hour session)** — diagnosis → palette harvest → homepage
  rebuild → two-model bake-off → nine implementation slices → merge.
- **08-05 01:34** — "publish to prod." 08-05 13:43 — hero subject shifted
  right for mobile (final steering turn), then "end session for now."

## What "claudeish" turned out to mean

1. **The palette was literally Claude's.** The live copper accent
   `#d07a4e` sat within 9/3/9 RGB points of Claude coral `#d97757`, on a
   cream ground — "the cream-ground-plus-terracotta-accent *pair* is the
   fingerprint" (assistant diagnosis, 08-04). Estimated at only ~half the
   signal.
2. **Structure was the other half — five named tells** (assistant diagnosis
   after the palette swap alone failed): the never-varying section formula
   (mono eyebrow → giant headline → right-rail paragraph → card grid);
   declarative sentence-case headline with terminal period; mono-metadata as
   decoration; pastel category tile grid; decorative ordinals and arrows.
   "Formula-consistency is itself the tell." Codex's version of the same
   point: "'Every section gets label + title + support' is itself an
   AI-layout tell."
3. **The tells were inherited, not invented.** Codex's 07-29 diagnosis, five
   days *before* Jordan's message: the editorial attractor was fed by
   repo-owned inputs — DESIGN.md authorizing contact-sheet/numbered-sections/
   tracked mono labels, round-02's "editorial eye" conclusion, and
   `tools/forge-site/archetypes/portfolio-brand.DESIGN.md` defaulting to dark
   mode, loud typography, mono labels, extreme whitespace. "The three
   concepts were not genuinely independent. They were variations inside the
   same editorial attractor." And: "The agentic tooling structured the
   exercise; it did not supply the taste."

## What was attempted, in order

(a) **Corpus-harvested palette** from Nino's photography archive replacing
the Claude-adjacent one (`9e52553`). Result: "still lookst mostly the same
and palette may not be the only issue then."
(b) **Three-candidate section spike** — A photography-as-ground, B box-score
ledger, C conviction accent. "candidate A reads more 'creative technologist'
to me then the other two. the other two just feel like site template renders."
(c) **Reference-site measurement** after "the current ninochavez design just
isn't working. competing visual markers. innk everywhere. ink on ink too."
Findings: ninochavez.co ran 73% dark ground vs bcsubs 16% and the work
library ~0%; 10,615 CSS lines / 42 tokens vs the library's 402 lines / 13
tokens. Conclusion: "Marker *count* isn't the problem; marker *species* is."
Clean sites win by **ration, not coverage**. (Codex declined to relay the
73% figure as verified — it is a session measurement, unaudited.)
(d) **Homepage rebuilt from first principles** ("keep nothing we already
have except the treatment concept on the 'all work' section") as "the venue"
(`10d8b5c`).
(e) **Two-model bake-off.** "Codex is desiging a system too. prefix yours as
claude so we can compare them after." Codex built
`art-direction/round-04-portfolio-system/SYSTEM.md` + click-through
prototype (warm-neutral shell, 12-col grid, nine components). Claude built
`docs/claude-design-system.md` — "the rationed system": ten tokens, one job
each, enforceable budgets (≤1 dark band/page and it must be a photograph;
0–1 photos; 1 accent per ground; 1 display face; ≤3 markers per component).

**The concession** (Codex, after rendering both): "Claude's candidate is the
better visual foundation. Mine is organized and usable, but it overcorrects
into a generic portfolio template… The result could belong to almost any
product consultant. Claude designed a constrained visual language. I designed
a comprehensive website framework. My warm palette, portrait hero, and visual
treatment should be retired rather than merged." Authority split: Claude owns
palette/type/photography/composition/budgets; Codex contributes interaction,
accessibility, IA, route contracts. Its amendments caught a real defect —
cobalt focus rings at 2.91:1 on ink, fixed with a double bone/cobalt ring.
Folded in as dated amendments (`e5bfd68`).

Then nine implementation slices in one day (`4e6dcde` → `c3496cf`), CSS cut
10,724 → 7,687 lines, merge `bc236f6`, production 08-05.

## What was struggled with

- **The oscillation loop, twice around:** sterile → add photography/accent →
  "feels too heavy… like you took a hammer to the entire site" → strip →
  "starting to look stale and sterile again" → conviction pass ("budgets are
  spending targets, not ceilings") → "we also lost all or most of the
  accented colors… even more sterile now even if cleaner" → accent-dosage
  pass. The diagnosis that ended it: ration had been mistaken for restraint.
- **The hero-contrast loop, three attempts:** contrast lifted 4.2:1 → 5.6:1
  ("looks the same" — "tuning to the meter instead of the eye") → 8.7:1
  (still contested) → resolved only by changing the question ("should we
  change the color of text instead?"); A/B showed the untouched photo
  supported neither text color. Bone on darkened sky won.
- **A self-named category error:** the commissioned illustrated portrait was
  retired under the subject-match rule; reversed — "I conflated 'not a
  photograph' with 'not honest.'" ("i preferred the warmer full color live
  prod illustration over the faded one in the preview.")
- **Naming:** "'work' and 'how i work' feel too close semantically and
  verbally" → Sessions rename + IA rule "labels do not share a root noun."
- Assorted: awwwards blocked headless research; a CSS minifier merged
  `justify-self`/`align-self` into `place-self` and silently centered both
  axes; a visual tripwire's 172-story snapshot had been generated against a
  dirty checkout.

## The assistant's own arc summary (attributable to the assistant)

"Claudeish → palette wasn't yours; hammer → photography overdosed; confusing
images → photography off-subject; sterile → ration mistaken for restraint."

## Open items (as of 2026-08-12)

1. **The Jordan re-test never happened.** The session proposed re-asking him
   five times; twenty-three commits and a production deploy shipped without a
   second verdict from the person whose observation started it. The result
   position of any write-up is honestly "not yet measured."
2. **Unreconciled docs.** Uncommitted edits to DESIGN.md /
   DESIGN-DIRECTION.md still say "Production changes remain blocked until
   the candidate prototype is approved" and point at Codex's round-04
   SYSTEM.md as the current review candidate — the system Codex itself
   withdrew. Production shipped the rationed system (`app/globals.css:45-54`
   carries Claude's tokens). The docs route a future reader to a retired
   system.
3. **Untracked artifacts:** round-04 `SYSTEM.md` + `prototype/` (the
   withdrawn candidate), RESEARCH.md's three-line candidate pointer.
