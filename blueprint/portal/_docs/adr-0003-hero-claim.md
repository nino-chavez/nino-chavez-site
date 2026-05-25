# ADR-0003 — Hero claim: Option A locked

**Status:** Accepted
**Date:** 2026-05-24
**Deciders:** Nino Chavez

## Context

The v3 hero is the single most load-bearing piece of copy on the site. Most visitors will not scroll past the credibility ribbon; the hero claim has to do positioning work in one sentence. Three options were drafted in [`03-design-brief.md`](../03-design-brief.md) §"Hero claim — finalist set":

| Option | Reads as |
|---|---|
| **A** | *"Context engineer. I instrument the systems that build the systems."* — recursive, technical, distinctive |
| **B** | *"I codified how to ship software with agents. I run it in public."* — direct, evidence-forward |
| **C** | *"Software shipped with agents — by someone who built the toolchain to make it repeatable."* — concrete, less abstract |

## Decision

**Lock Option A:** *"Context engineer. I instrument the systems that build the systems."*

The word **instrument** renders as the violet-emphasis italic (per [`03-design-brief.md`](../03-design-brief.md) §1 supporting pattern `editorial-italic` — one human moment per page).

## Why Option A over B and C

- **A is the only option that defines *what Nino is*; B and C describe *what Nino did*.** For a hirable surface, the noun-claim ("context engineer") is the more durable framing than the verb-claim ("codified" / "shipped").
- **A pairs cleanly with the schematic-diagram signature.** The recursion "systems that build the systems" is literally what the `forge-pipeline-diagram` schematic depicts (brand-kit → tokens → copy → images → site archetype). Hero copy + hero diagram reinforce each other instead of fighting.
- **A contains exactly one word doing visible work** ("instrument"), which becomes the violet italic emphasis. B and C have multiple candidate emphasis words and would force a less load-bearing choice.
- **A is the only option that incorporates the throughline that surfaced in the practice audit**: *"Nino does not configure Claude. He instruments it."* The hero is the compressed form of that thesis; the closing `/` thesis panel ([`content/hero.md`](../content/hero.md) Composition 6) is the expanded form: *"Most engineers configure Claude. I instrument it. The artifacts above are how."*

## Subhead

The hero is paired with one subhead line (mono pill row treatment optional):

> *Working practice + open toolchain + production software. Built solo with agents at volume.*

Three nouns separated by `+` marks — sets the spine that the rest of the page proves. Each noun maps to a downstream composition: working practice → `/practice`; open toolchain → the toolchain readout grid; production software → the case-study stripe.

## Consequences

The locked claim cascades into:

- `/api/person.json` `jobTitle` array leads with `Context Engineer` (see [`content/aeo-person.json`](../content/aeo-person.json))
- `/api/expertise.json` first ItemList entry is "Context Engineering" with the toolchain as evidence (see [`content/aeo-expertise.json`](../content/aeo-expertise.json))
- `/about` lede uses the verb form: *"I codified how to ship software with agents, and I run the practice in public."* — first-person variant of the hero's third-person claim
- `/practice` hero uses the question form: *"This is how I work."* (italic violet on *how*)
- All schematic-diagram label sets use "instrument" / "instrumentation" terminology where applicable (e.g., the three-layer hesitation fold diagram uses "instrumentation" as the section header)

## Rejected with reasoning

- **B and C** are still good copy. They would work as fallback options if the term "context engineer" stops doing positioning work (e.g., if the term becomes saturated in the way "prompt engineer" did). Treat B and C as escape hatches, not as v3 alternatives.
- **"AI engineer" / "AI-native developer" / "Senior engineer specializing in AI"** were considered and rejected at the [ADR-0001](./0001-positioning-context-engineer.md) stage; not re-litigated here. The term "context engineer" is load-bearing for this whole positioning move.

## References

- [`03-design-brief.md`](../03-design-brief.md) §"Hero claim — finalist set"
- [`content/hero.md`](../content/hero.md) — hero composition spec with this claim locked
- [`content/aeo-person.json`](../content/aeo-person.json) — AEO payload reflecting the locked claim
