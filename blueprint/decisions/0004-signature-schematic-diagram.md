# ADR-0004 — Signature visual move: `schematic-diagram`

**Status:** Accepted
**Date:** 2026-05-24
**Deciders:** Nino Chavez

## Context

The forge-site playbook ([`playbook/3.5-design-brief.md`](../../../../tools/forge-site/playbook/3.5-design-brief.md)) requires picking exactly one signature visual move per brand. *"Pick one. Two signatures dilute each other."* Options enumerated in the playbook §1 Signature:

| Option | Voice register | Reference |
|---|---|---|
| `instrument-readout` | Technical / precise / receipt-driven | TNA's signature |
| `editorial-italic` | Editorial / considered / publishing | Stripe Press adjacency |
| `gradient-mesh` | Energetic / marketing-forward | Vercel adjacency |
| `stamped-monogram` | Standalone for publishing brands | Pairs with most signatures |
| `schematic-diagram` | Methodology / architecture brands | Hand-drafted SVG-as-content |

## Decision

**Signature = `schematic-diagram`** — hand-drafted inline SVG diagrams as primary content, not decoration. 1.5px stroke, no fill, mono labels (JetBrains Mono), violet accent on the load-bearing node, no gradients, no glow, no rounded ends.

Two diagrams anchor the brand surface (recur across pages as visual continuity):

- **`forge-pipeline-diagram`** — left-to-right chain: `[brand-kit.json]` → `[tokens]` → `[copy via signal-forge]` → `[images via image-gen]` → `[site archetype via forge-site]`. Appears on `/`, on `/practice` toolchain section, and as the opener for `/work/atelier`.
- **`hesitation-fold-diagram`** — three boxes (`CLAUDE.md rule` → `UserPromptSubmit hook` → `Stop hook`) connected by mono arrows, sharing one violet `classifier` node beneath. Appears on `/practice` instrumentation section and as a small inline on `/about`.

Supporting patterns (subordinate, not competing):
- `stamped-monogram` (`nc.`) — masthead + footer brand surface, replaces any "logo" decision
- `instrument-readout` — credibility ribbon + toolchain rows + stats panels (subordinate, not signature — schematics carry the visual weight)
- `editorial-italic` — italic violet on the load-bearing word of hero + `/about` + `/practice` heros (one human moment per page)

## Why `schematic-diagram` and not the alternatives

| Option | Why rejected |
|---|---|
| **`instrument-readout`** | TNA already chose this signature ([`wip/tna/brand/visual-identity/brief.md`](../../../../wip/tna/brand/visual-identity/brief.md)). Picking the same signature for ninochavez.co would make the two brands read as siblings — wrong for two distinct surfaces with overlapping ownership. Demote `instrument-readout` to subordinate role (stats / readout cards) and pick a different signature. |
| **`editorial-italic`** | Would work — the practice has a publishing-register quality. But editorial-italic positions the brand as essayist-first, not builder-first. The thesis is "I instrument my tools"; the signature has to make the *instruments* visible, not the *essays about the instruments*. |
| **`gradient-mesh`** | Wrong fit — energetic / marketing-forward register fights the precise-engineering thesis. A brand whose claim is "I instrument my tools" cannot ship marketing-collateral gradients. |
| **`stamped-monogram` as signature** | The `nc.` monogram works as a masthead surface but doesn't carry the brand on its own — it's too small to fill a hero slot. Keep it as a subordinate pattern, not a signature. |

The reasoning behind picking `schematic-diagram`:

1. **The thesis is "I instrument my tools."** That claim is only credible if visitors see the instruments. A photograph or stock illustration in the hero slot reads as decoration; a schematic of the three-layer hesitation fold reads as the evidence itself. The signature picks itself from the thesis.

2. **The playbook explicitly lists schematic-diagram for brands that sell methodology or architecture work.** That fits exactly — the context-engineering practice sells methodology (the codified rules) and architecture (the toolchain pipelines and the hesitation fold).

3. **Hand-drafted SVG is deterministic.** AI image generation cannot produce schematic-diagram correctly because the constraint set (1.5px stroke, deterministic geometry, mono labels in correct positions) is too narrow for statistical generation. A brand whose thesis is engineering precision cannot ship statistical-generation artifacts in its hero (see [DESIGN-PRINCIPLES.md](../DESIGN-PRINCIPLES.md) §2 "no AI-generated imagery").

## Consequences

**Hand-drafted SVG inventory (Phase 3 deliverable):**

| Filename | Where it appears |
|---|---|
| `forge-pipeline-diagram.svg` | `/` hero, `/practice` toolchain section, `/work/atelier` opener |
| `hesitation-fold-diagram.svg` | `/practice` instrumentation section, `/about` small inline |
| `rally-hq-blueprint-pipeline.svg` | `/work/rally-hq` opener |
| `atelier-12-tool-mcp.svg` | `/work/atelier` opener |
| `ask-bc-hybrid-arch.svg` | `/work/ask-bc` opener |
| `photography-cf-pipeline.svg` | `/work/photography` opener |
| `bc-subscriptions-dual-track.svg` | `/work/bc-subscriptions` opener |

That's 7 SVGs to hand-draft for v3 launch.

**Iconography subordinates to signature.** The 10-icon starter set (`github`, `linkedin`, `external-link`, `arrow-right`, `check`, `x`, `info`, `code`, `terminal`, `file`) uses the same 1.5px no-fill schematic-mono-line register. No Lucide / Heroicons / Phosphor — those are filled-humanist or rounded-end and would fight the signature even with overrides.

**Motion budget is constrained:** static by default. Animated schematics are refused at v3 launch — an animated schematic implies a runtime system; a static schematic implies an engineered system. The latter is the claim. Reduce-motion fallback is required for any hover / scroll-reveal that does exist.

## Revisit if

- The hand-drafted SVG inventory takes longer than a half-day to author (signal that the signature is wrong-cost for solo-author scope; consider whether schematic-diagram is too craft-intensive for v3 launch and a simpler signature should ship first with schematics added in v3.1)
- A schematic produces a layout problem on a real page (e.g., a diagram that's too wide for the 72rem container or too dense for the 44rem prose context); resolve by redrawing, not by switching signature
- The brand surface needs to expand into a second medium (e.g., conference talks, video content) where hand-drafted SVG is not the appropriate signature; signature can evolve per medium

## References

- [`03-design-brief.md`](../03-design-brief.md) §1 signature decision
- [`DESIGN-PRINCIPLES.md`](../DESIGN-PRINCIPLES.md) §2 "no AI-generated imagery" + §10 "no bento + lime + Bebas Neue tells"
- [`wip/tna/brand/visual-identity/brief.md`](../../../../wip/tna/brand/visual-identity/brief.md) — the only complete filled brief in the workspace (TNA chose `instrument-readout`; structurally reusable, signature differentiated)
- `tools/forge-site/playbook/3.5-design-brief.md` §1 signature option list
