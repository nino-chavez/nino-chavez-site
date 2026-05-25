# ADR-0009 — Cluster surfacing pattern: cluster ribbon + per-cluster editorial sections

**Status:** Accepted (pending Nino confirmation — flag if alternative preferred)
**Date:** 2026-05-25
**Deciders:** Nino Chavez (proposed by agent session per restart plan)

## Context

The Stage 1 Research synthesis (`research/synthesis.md`, 2026-05-25) identified that the v3 redesign currently presents ~12% of the actual surface — 9 case studies out of 69 repos, 1 site out of 17 live deploys, 3 writing pointers out of 275 published artifacts. The synthesis grouped the surface into **8 thematic clusters**: forge production line, agent infrastructure, AI products, commerce/BC, 630/volleyball, personal sites, client work, writing.

The original v3 IA used a flat case-study slate (5 leads + 4 honorable mentions). That collapses 8 clusters into 9 list items and structurally cannot expose the breadth that IS the "context engineer who codified a working practice" receipts.

This ADR picks the surfacing pattern that replaces the flat slate.

## Options considered

| Pattern | Pros | Cons | Verdict |
|---|---|---|---|
| **Bento grid** (mixed-size tiles per cluster) | Visually dense, scannable, mixed media | **Categorically refused** — DESIGN-PRINCIPLES.md §10: "No bento-card grid as a homepage hero pattern... template-tailwind / vibe-coded-dev-portfolio tells." Even on `/work` (not homepage), the spirit of the refusal applies. | **OUT** |
| **Tabs / segmented control** (one cluster visible at a time) | Shows depth one cluster at a time; familiar pattern | Hides 7 of 8 clusters behind a tab — defeats the "breadth IS the proof" point. Reviewer has to click to find anything. | OUT |
| **Filterable matrix** (table with cluster / visibility / age filters) | Dense, power-user friendly, shows everything at once | Reads as "list view" — utilitarian, low aesthetic register. Wrong tone for a portfolio brand. | OUT |
| **Pure stacked sections** (one cluster per long-scroll editorial section) | Each cluster's surface can match its content shape — forge gets a schematic, AI products gets card grid, writing gets counts-and-flagships row | No at-a-glance summary; reviewer scrolls before seeing scope. | Partial |
| **Cluster ribbon (at-a-glance) + per-cluster editorial sections (depth)** | Combines scanning + depth. Ribbon shows all 8 clusters with counts as compact navigation. Per-cluster sections let content shape surface. | More to build well — each section needs its own composition. | **IN** |

## Decision

**Adopt the hybrid pattern: cluster ribbon at top + per-cluster editorial sections below.**

### Concrete shape

**On `/work` (primary cluster-surfacing route):**

1. **Hero** (thesis sentence, ~70-80 chars) — frames why this page exists. Single sentence, no kicker, no CTA.
2. **Cluster ribbon** — horizontal compact navigation strip. Each of 8 clusters as a chip with:
   - Cluster label (e.g., "Forge production line")
   - Count (e.g., "8 repos, 1 public")
   - Anchor link to the section below
   - Optional: tone/color code per cluster
3. **Per-cluster editorial sections** (one per cluster, in `synthesis.md` declared order):
   - **Forge production line** — schematic-diagram composition (lead the page; this is the load-bearing positioning evidence). Repos listed inline with public/private badge. PUBLIC `forge` umbrella visually emphasized.
   - **Agent infrastructure** — card grid of 10 repos, public ones lead. Brief one-line purpose per repo.
   - **AI products** — case-study deep-dive cards for 3-5 leads (atelier, ask-dad, quantifai/cortex), then a compact "Also in this cluster: …" footer linking the remaining repos.
   - **Commerce / BC** — same shape as AI products. 3 leads (bc-subscriptions, ask-bc, aisles), compact tail.
   - **630 / volleyball** — single hero case study (Rally HQ paired with `blueprint.rallyhq.app`), compact tail for siblings.
   - **Personal sites / brand** — compact list with live URLs. Visual proof of the orbit.
   - **Client work** — minimal — 4-item compact list. Services posture is present but not selling.
   - **Writing** — pointer composition referencing `/writing` for full collection surfacing; show top-of-mind flagships here.
4. **Footer transition** — single sentence + pointer to `/practice` (how this was built) and `/about` (who built it).

**On `/`:**

The cluster ribbon also appears in compressed form below the hero — gives the homepage a one-glance scope view without committing to per-section depth there.

### Component primitives needed

- `ClusterRibbon` (compact horizontal nav, one chip per cluster with anchor + count)
- `ClusterSection` (anchored section wrapper with cluster header)
- Cluster-specific compositions:
  - `ProductionLineSchematic` (custom — schematic-diagram register, public umbrella emphasized)
  - `RepoGrid` (card grid for agent infra)
  - `CaseStudyDeepDive` (for AI products + commerce + 630 leads — reuses existing case-study composition primitives that will be rebuilt)
  - `RepoCompactList` (one-liner per repo with visibility badge)
  - `WritingFlagshipsPointer` (links to full `/writing` cluster surfacing)
  - `OrbitLinkList` (live URLs for the personal-sites cluster)

Reuse existing tokens + signature (per ADR-0004 schematic-diagram register). No new visual vocabulary.

## Why this pattern survives the refusals

- **Not a bento.** Sections are full-width editorial blocks, not mixed-size tiles in a grid.
- **Not a vibe-coded portfolio tell.** The pattern is editorial / journalistic — closer to a magazine "beats" section than a dev-portfolio bento.
- **Schematic-diagram signature preserved.** The forge production line section IS the schematic; reinforces ADR-0004 instead of competing with it.
- **Breadth is exposed.** Ribbon = 8 clusters visible at-a-glance; sections = depth on demand. No "click to discover scope" failure.

## Consequences

**Positive:**
- A single `/work` page exposes 60+ repos, organized by intent. Reviewers see scope before depth.
- Per-cluster sections can have different visual treatments matched to content shape — flexibility without inconsistency (held together by the ribbon + shared tokens).
- The forge production line gets schematic prominence (load-bearing for positioning); writing gets surfaced proportionally (was under-represented at v3 launch).
- Each cluster's count becomes a live, citable number — "60+ repos" claim is now grounded in something a reviewer can verify by counting the sections.

**Negative / accepted trade-offs:**
- `/work` becomes a longer scroll than a 9-item case-study slate. Acceptable because the scroll IS the proof.
- Per-cluster compositions need authoring (one-time). Initial build cost > flat slate.
- Cluster counts need maintenance as new repos ship. Defer the auto-derive question to post-launch (per refreshed diagnose); for v3, manually maintained in `work-data.ts`-equivalent.
- The compact tails ("Also in this cluster: …") can age badly if not pruned. Linked to the maintenance question above.

## Enforcement

- **No bento variants.** If a future composition starts looking like mixed-size tiles in a grid, that's the refusal pattern leaking back. Reject.
- **Ribbon is mandatory.** Removing the ribbon "to save vertical space" defeats the at-a-glance scope point. Don't.
- **Cluster counts displayed must match repos inventory.** Counts come from `research/current-state/repos-inventory.md` (Stage 1 Research) — refresh both when surface changes.
- **Visibility badges required.** Each repo mention shows PUBLIC / private. Honesty is load-bearing per DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline."

## References

- `research/synthesis.md` — the 8-cluster finding
- `research/current-state/repos-inventory.md` — counts source-of-truth
- `DESIGN-PRINCIPLES.md` §10 — categorical refusal: no bento
- ADR-0004 — schematic-diagram signature (reinforced by the forge production line section)
- ADR-0008 — portal-shell adoption (blueprint portal exposes the design rationale for THIS pattern via the per-page strategy drawers)
