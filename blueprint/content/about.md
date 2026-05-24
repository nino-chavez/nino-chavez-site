# `/about` — content draft

Per `blueprint/03-design-brief.md` Composition 1 (`hero-with-thesis`) → 2 (`narrative-prose-block`) → 3 (`closing-pointer-row`).

## Composition 1 — `hero-with-thesis`

First-person, italic emphasis on the verb that does the work.

> I'm Nino. I _codified_ how to ship software with AI agents, and I run the practice in public.

Mono caption under hero (one line):

> Chicago. Product Architect at commerce.com. The work on this site is my own — built solo, evenings and weekends, with the toolchain documented in `/practice`.

## Composition 2 — `narrative-prose-block`

Three short paragraphs. No bullet lists in this composition (per brief — editorial register here, not catalog).

> I've been writing code since 1999. Twenty-five years in commerce platform architecture taught me how large systems hold together — and how teams fail to keep them together. The job I do at commerce.com is product architect on a real platform with real customers; the writing and tools on this site are what I've built independently in parallel.

> What changed for me around late 2024 was realizing that AI coding agents are not a faster autocomplete. They're a different working unit — closer to a junior engineer with no memory and no opinions. Productive use requires the same things productive teams have always needed: clear specs, conventions, decision logs, guardrails, and a record of what was tried. So I started building those: a spec-driven workflow (`specchain`), a brand-kit-to-site pipeline (the forge family), a session voice corpus (`claude-recall-cli` + the Poe stack), an open governance layer for code generation (AEGIS), a planning methodology (`big-blueprint`). The toolchain is the practice. The case studies are what came out of using it.

> The shorthand for that is _context engineer_. The work isn't novel prompts or clever models — it's the surrounding system: the rules a session inherits, the artifacts it produces, the hooks that catch failure modes, the corpus that pulls forward what worked before. Most engineers configure Claude. I instrument it. That's the line; the rest of this site is the proof.

## Composition 3 — `closing-pointer-row`

Mono row, no decoration. Three pointers in order of "least → most personal":

> **Practice** → `/practice` — toolchain, operating rules, instrumentation
> **Photography** → `ninochavez.co/photography` — 20K action-sports photos, AAA accessibility, custom album-zip worker; not a hobby, the production craft side of the practice
> **Writing** → `ninochavez.co/blog` — Signal Dispatch, where I publish the things that don't fit on a case-study card

Followed by single mono line:

> contact · `nino@ninochavez.co` · github.com/nino-chavez · linkedin.com/in/nino-chavez

## Anti-uses (audit guard)

- No "I make things across a few mediums" generalist framing (current site's lede — cut per Diagnose)
- No equal-weight 4-medium grid (Software / Photography / Music / Writing)
- No résumé bullet list of past employers (that lives in `/api/experience.json` for AEO; on the human-readable page it dilutes the claim)
- No "Day job: product architect" as the lede (current site framing — moves to the mono caption under hero, not the load-bearing sentence)
- No mention of awards, certifications, or speaking engagements unless quotable in a sentence about the practice
- No portrait image at v3 launch — use stamped-monogram tile placeholder per brief §3 until a photograph is supplied
