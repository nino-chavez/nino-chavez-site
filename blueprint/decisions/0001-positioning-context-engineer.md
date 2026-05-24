# ADR-0001 — Positioning: Context Engineer (over Polymath / Generalist Creative)

**Status:** Accepted
**Date:** 2026-05-24
**Deciders:** Nino Chavez

## Context

The current `ninochavez.co` (v2) leads with a polymath claim: *"Software, photographs, mixes, essays. Day job: product architect. Chicago."* The homepage interests grid presents Photography / Music / Writing / Building as equal-weight parallel interests. The hero photo is a volleyball action shot. The site reads as "generalist creative whose day job happens to be product architect."

The v2 framing fails the goal that surfaced in the redesign conversation: *be hirable and known as a context engineer who codified a working practice for shipping software with AI agents.* Three concrete failure modes against that goal:

1. **Inbound mis-targeting.** AI assistants crawling `/api/person.json` see "25+ years building commerce platforms" and surface Nino as an enterprise architect when someone asks about commerce-platform consultants. Recruiters / partners / hiring managers searching for context-engineer talent never find him.
2. **Polymath dilutes the load-bearing claim.** *"Context engineer who built and shipped a toolchain"* is rare and verifiable. *"Polymath who codes and shoots photos and makes music"* is generic and unfalsifiable.
3. **Photography on the main surface conflates audiences.** Action-sports photography is a real practice with its own audience at `photography.ninochavez.co`; surfacing it on the main homepage positions the site as photographer-first to the wrong audience.

The audits (Agent C: practice layer, Agent B: evidence base, Agent D: current site) all surfaced the same throughline independently: *"Nino does not configure Claude. He instruments it."* That sentence is the spine. The current site doesn't say it anywhere.

## Decision

**Position `ninochavez.co` as the surface for a context engineer.** The site claims one thing and proves it: *"I codified a working practice for shipping software with AI agents, and I run it in public."*

Concrete enforcement:
- Hero claim leads with the role and the practice (see [ADR-0003](./0003-hero-claim-option-a.md))
- Homepage surfaces toolchain artifacts + case studies + the `/practice` page; no parallel-interests grid
- Photography stays at the subdomain; one pointer on `/about`, not on the main surface
- AEO `jobTitle` leads with `Context Engineer`; `Product Architect` kept as current employment fact but no longer the lead identity
- Music / hobby content does not appear on `ninochavez.co` v3

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Polymath / generalist creative** (current v2) | Diluted; fails the inbound-targeting goal; not differentiated |
| **Product Architect (enterprise consulting)** | Real identity but commodity in the consulting market; doesn't surface the toolchain or the practice |
| **AI consultant / AI-native developer** | "AI consultant" is saturated and undifferentiated. "AI-native developer" is closer but still doesn't name the differentiator (the toolchain). "Context engineer" is rare enough to be claimable and grounded enough to be defensible. |
| **Founder / builder** | Implies a specific company surface (signalx.studio handles that); on the personal portfolio, "founder" reads as a positioning hedge |

## Consequences

**Positive:**
- AEO surface targets the right buyer (hiring managers + engineering peers looking for someone who codified an AI-assisted dev practice)
- Toolchain repos become load-bearing evidence rather than auxiliary GitHub links
- `/practice` page has a clear purpose (the differentiator surface)

**Negative / accepted trade-offs:**
- Music + casual hobby content no longer appears anywhere on the main site; that content lives on `ninochavez.co/blog` (Signal Dispatch) and on social channels
- Photography demoted from co-equal to a single pointer; mitigated by the dogfood-trio framing (*"I built the photography business and the software that runs it"*) which strengthens the practice claim when made
- "Context engineer" as a term has no canonical definition yet; the `/practice` page essay is the load-bearing piece that defines it on Nino's terms (also a positive — first-mover on the definition)

## Enforcement

Every Phase 3 PR that touches positioning-bearing surfaces (hero, about, AEO endpoints, work-data taglines) gets reviewed against this ADR. Drift surfaces as: language reverting to polymath framing, photography reappearing on the main surface, "Product Architect" leading any human-readable identity claim.

## References

- [`02-prescription.yml`](../02-prescription.yml) `client.positioning: context-engineer-hirable-and-known`
- [`03-design-brief.md`](../03-design-brief.md) §1 signature + hero claim treatment
- [`DESIGN-PRINCIPLES.md`](../DESIGN-PRINCIPLES.md) §1 "no transactional framing" + §4 "no 4-way polymath grid"
- Agent audits (synthesis-grade): practice-layer audit (top 5 differentiators), evidence-base audit (5 lead studies bucketing), current-site audit (positioning quote + dilution analysis)
