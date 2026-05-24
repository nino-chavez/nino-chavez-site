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

> Where the toolchain came from: March 2026. About ten months after I'd started taking AI coding agents seriously, I built a Pricing & Packaging initiative for a commerce platform — 11 prototype pages, an AI billing agent with 8 tools, 4 strategy documents validated against production code, 30+ cited sources. About 48 hours of work, mostly prompts. Zero lines of code or copy by hand. The artifacts shipped. The interesting question came around hour 18: *can this happen again from a template, without me in the feedback loop?* That extracted into `big-blueprint`, A/B'd at 70–80% quality in 10–15× less time, then ran on `bc-subscriptions`, `rally-hq`, and the redesign of this site. Each pass made the chain sharper.

> The chain is the lathe: `specchain` (intent → spec → tasks) → `big-blueprint` (archetype routing) → `forge-brand` (typed design system) → `forge-signal` (voiced prose) → `gen-images` (visuals). Five links, each consuming the prior link's output. The single public piece is [`ai-champions-kit`](https://github.com/nino-chavez/ai-champions-kit) — the practice packaged for others. `/practice` has the full inventory.

> The shorthand for that is _context engineer_. The work isn't novel prompts or clever models — it's the surrounding system: the rules a session inherits, the artifacts it produces, the hooks that catch failure modes, the corpus that pulls forward what worked before. Most engineers configure Claude. I instrument it. That's the line; the rest of this site is the proof.

## Composition 3 — `closing-pointer-row`

Mono row, no decoration. Three pointers in order of "least → most personal":

> **Practice** → `/practice` — toolchain, operating rules, instrumentation
> **Photography** → `ninochavez.co/photography` — 20K action-sports photos, AA accessibility, custom album-zip worker; not a hobby, the craft dimension of the same practice
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
