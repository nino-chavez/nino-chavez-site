# ADR-0005 — Review model: site-as-prototype (bc-subscriptions pattern over rally-hq pattern)

**Status:** Accepted
**Date:** 2026-05-24
**Deciders:** Nino Chavez

## Context

Stakeholder review requires a *deployable, reviewable* surface for the blueprint. Two patterns exist in the workspace, both validated against real projects:

| Pattern | Implementation | Where used |
|---|---|---|
| **Static prototype with drawers** | `blueprint/prototype/*.html` hand-authored HTML mockups, each with strategy + current-state drawers + comparison toggle. Deployed to a separate Cloudflare Pages project at `blueprint.<project>.app`. AI chat widget preloaded with docs. | [`apps/rally-hq/blueprint/`](../../../rally-hq/blueprint/) → `blueprint.rallyhq.app` |
| **Site-as-prototype** | Real working app built with the production stack (React + BigDesign for bc-subs; would be SvelteKit for v3). `tools/state-derive/` derives capability state mechanically from source. ADRs in `docs/decisions/` with synthesis IDs traceable to commits. Persona journeys in `docs/journeys/`. Spec + prototype + shipping code in one repo. | [`wip/bc-subscriptions/`](../../../../wip/bc-subscriptions/) → repo IS the portal, GitHub renders the docs |

The rally-hq pattern produces a *narrative review surface* — reviewers walk through the strategy panels and see the proposed-vs-shipped story. The bc-subs pattern produces a *substrate review surface* — reviewers see the actual prototype app, mechanically-derived state, ADRs with traceable rationale.

The bc-subs case-study ([`wip/big-blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md`](../../../../wip/big-blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md)) explicitly flags one gap in the bc-subs pattern as practiced: it skipped Stage 2 (Design Principles) and Stage 4 (Fact-Check). Without those, structural completeness (file exists, function exists, schema has column) was being conflated with runtime completeness (the production charge path didn't actually charge real money — it threw on the production branch).

## Decision

**Adopt the bc-subscriptions site-as-prototype pattern with the Stage 2 + Stage 4 gaps explicitly closed.**

Concrete shape for ninochavez.co v3:

1. **The prototype IS the site.** The SvelteKit app on the `redesign/v3-context-engineer` branch at `apps/website-nc-v3/` is what reviewers walk. Not a separate static HTML mockup.
2. **Deployable surface = Cloudflare Pages preview deploy.** The existing `ninochavez-main` CF Pages project has git integration. Every push to the redesign branch auto-deploys to `redesign-v3-context-engineer.ninochavez-main.pages.dev` (stable branch alias) and `<sha>.ninochavez-main.pages.dev` (per-commit URL). Reviewers click the branch alias for the latest state.
3. **ADRs in `blueprint/decisions/`** for load-bearing decisions, bc-subs-pattern (Markdown, numbered, Status / Date / Deciders header, Context / Decision / Alternatives / Consequences / References sections). This is one of those ADRs.
4. **`DESIGN-PRINCIPLES.md` closes Stage 2.** Explicit "what this site CAN'T do today" — categorical refusals plus soft refusals plus the Stage 4 fact-check gates. See [`../DESIGN-PRINCIPLES.md`](../DESIGN-PRINCIPLES.md).
5. **Stage 4 fact-check is a launch gate, not a tool.** For the v3 scope (5 lead case studies, ~10 routes, locked cut list), manual fact-check against the gates listed in DESIGN-PRINCIPLES.md is cheaper than authoring a `state-derive`-equivalent tool. See [ADR-0006] when written, or the soft-refusal §C in DESIGN-PRINCIPLES.md.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Rally-hq static-prototype-with-drawers pattern** | Per Nino's direct feedback: rally-hq's pattern is the lighter / weaker implementation of the bc-subs pattern. Hand-authored HTML mockups duplicate work (you build the mockup, then build the real site, then maintain both); the drawer / panel UI is reviewer-friendly but reviewers end up wanting to click around the real product anyway. The strategy/current-state drawer adds value when the project has both a "shipped" surface to compare against AND a "proposed" surface that doesn't exist yet; for the v3 redesign there's no separate "shipped" surface to compare — the v3 site IS what's being proposed, and the v2 site is the comparison point, accessible at `ninochavez.co` itself. |
| **Both patterns in parallel** (build a static prototype shell AND a site preview) | Double the work for marginal value. Reviewers will use whichever surface is more current, which means one of the two ends up stale; the stale one becomes a liability. |
| **No deployable surface — review off the GitHub repo only** | Loses the visual fidelity that's load-bearing for a portfolio brand redesign. Reviewers need to *see* the schematic-diagram signature, the violet accent, the Inter type, the schematic-mono iconography — markdown rendering on GitHub doesn't show any of that. |
| **Build a `state-derive`-equivalent tool for v3** | Out of scope per Option B "lean" scope. Mechanical capability derivation is a force multiplier when there are dozens of capabilities drifting across weeks of work (bc-subs has 315 capabilities); for the v3 scope (10 routes, 5 case studies, locked cut list, 4-week target), manual fact-check at launch is cheaper than tool authoring. Re-evaluate if v3.x scope grows. |

## Consequences

**Positive:**
- Reviewers see the actual SvelteKit app, not a mockup of it. Visual fidelity is exact because the preview IS the production build.
- The git history + ADRs + DESIGN-PRINCIPLES.md + the branch-alias URL together form the review portal. No separate static portal to maintain.
- Phase 3 wiring work shows up immediately in the preview URL on every push — review-as-you-build, not review-after-batched-content.
- The Stage 2 + Stage 4 gaps from the bc-subs case study are closed explicitly: DESIGN-PRINCIPLES.md is the Stage 2 gate, the fact-check launch gates in DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline" are the Stage 4 gate.

**Negative / accepted trade-offs:**
- No strategy/current-state drawer per page. Reviewers needing the "why this design" rationale read the ADRs and the design brief, not inline panels on the prototype.
- No AI chat widget preloaded with blueprint docs. Reviewers asking questions ask Nino or grep the repo. For a personal-portfolio scope this is a fine trade-off; for a team-product scope (bc-subs, rally-hq) the chat widget pays for itself by making async stakeholder review tractable.
- Current preview URL serves the v2 site (because Phase 3 hasn't wired v3 content into code yet). Reviewers landing today see v2 content with v2 visuals, plus the blueprint docs in the repo. Once Phase 3 lands incrementally, the preview transitions to v3 page-by-page. Until that's complete, the README explicitly says "this preview is currently v2; v3 wires in over Phase 3."

## Enforcement

- **Don't build a separate static prototype portal.** If someone (or a future agent session) proposes building one, link them to this ADR.
- **The branch-alias URL is the canonical review surface.** Cite it in README, in PR descriptions, in any stakeholder communication about the redesign. Per-commit SHA URLs are for diffing specific deploys, not for general review.
- **Stage 4 fact-check happens at launch, not as a separate tool.** The launch gates in DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline" must each have a verified ✅ before the Phase 4 cuts ship to `main`.

## References

- [`../DESIGN-PRINCIPLES.md`](../DESIGN-PRINCIPLES.md) — the Stage 2 + Stage 4 discipline this ADR pairs with
- [`apps/rally-hq/blueprint/`](../../../rally-hq/blueprint/) — the rally-hq pattern (rejected here)
- [`wip/bc-subscriptions/`](../../../../wip/bc-subscriptions/) — the bc-subs pattern (adopted)
- [`wip/big-blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md`](../../../../wip/big-blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md) — the case study explaining why Stage 2 + 4 are non-negotiable
- Preview surface: <https://redesign-v3-context-engineer.ninochavez-main.pages.dev>
