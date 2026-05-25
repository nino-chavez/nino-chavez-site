# Stage 1 Research — synthesis

**As-of:** 2026-05-25
**Inputs:** [`current-state/repos-inventory.md`](current-state/repos-inventory.md) · [`current-state/deploys-inventory.md`](current-state/deploys-inventory.md) · [`current-state/writing-corpus.md`](current-state/writing-corpus.md)
**Purpose:** Translate the surface inventory into design-impacting findings for the v3 redesign. Feeds Stage 2 (Design Principles refresh) and Stage 3 (Prescription refresh).

---

## The scale-mismatch finding

**The v3 redesign as currently scoped represents ~12% of the actual surface.**

| Surface | Inventory total | v3 representation | Coverage |
|---|---|---|---|
| Repos | 69 (13 PUBLIC, 56 PRIVATE) | 5 lead case studies + 4 honorable mentions = 9 | 13% |
| Live deploys | 17 custom-domain surfaces (CF) + 10 Vercel | 1 (the site itself) + linked-out | ~4% |
| Published writing | ~275 artifacts (229 blog, 12 whitepapers, 8 series, 10 fiction, 9 presentations, 3 counterpoints, 3 tutorials, 1 research note) | 3 flagship whitepapers + archive pointer | <2% |

The "context engineer who codified a working practice" positioning is defensible — the forge family (8 repos) plus ai-hive plus the blog corpus IS the evidence. But the v3 site presents the *claim* without the *receipts at scale*. Reviewers landing on `/work` see 9 items and have no way to discover the other 60 repos, 16 other deploys, or 270 other published pieces. The breadth IS the proof; the current scope hides it.

## The forge-public finding

**The "all 5 lathes are private" framing is partially wrong.** The PUBLIC `nino-chavez/forge` repo — "An opinionated toolchain for building applications with coding agents. 12-factor principles for production-ready AI agents." — IS the production line entry point. The specific lathes (specchain, big-blueprint, forge-brand, forge-signal, image-gen) are private, but `forge` itself is the public umbrella.

This changes the launch decision in the old HANDOFF: it's not "make 5 lathes public OR keep mixed-visibility framing." It's "the umbrella IS public — point at `forge`; the lathes are deliberately private as the underlying toolchain." That's a different, cleaner credibility play.

## The paired-deploy pattern is canonical (and we lack it)

Rally HQ ships the canonical big-blueprint Stage 6 shape: `rallyhq.app` (the product) + `blueprint.rallyhq.app` (the methodology surface). Both auto-deploy from the same repo; the blueprint surface has strategy panels, current-state panels, AI chat, proposed/shipped toggle.

The v3 redesign currently does NOT have a paired blueprint surface — that's the gap this restart fixes. Target: `blueprint.ninochavez.co` deployed as a separate CF Pages project from `apps/website-nc-v3/blueprint/portal/`.

## Thematic clusters change the IA

The current v3 IA leads with case-by-case work. The inventory reveals **8 thematic clusters** that better organize the surface:

1. **Forge production line** (8 repos, 1 PUBLIC) — the toolchain that builds the case studies
2. **Agent infrastructure** (10 repos, 1 PUBLIC) — coordination, recall, parallel orchestration
3. **AI products** (18 repos, 6 PUBLIC) — multiple bets, multiple shipped surfaces
4. **Commerce / BC** (10 repos, 1 PUBLIC) — day-job-adjacent + side-project span
5. **630 / volleyball** (9 repos, 1 PUBLIC) — the longest-running build (Rally HQ is the flagship)
6. **Personal sites / brand** (7 repos) — the orbit being redesigned
7. **Client work** (4 repos) — services posture (not the selling point per ADR-0001, but presence matters)
8. **Writing** (~275 artifacts) — the thought-leadership corpus

The case-study slate framing collapses these into a flat list. A cluster framing (Bento? Tabbed surface? Filterable matrix?) would reveal the actual span.

## What survives from the existing blueprint

| Artifact | Status | Why |
|---|---|---|
| `01-diagnose.md` | Valid — Stage 1/2 output, refresh with new clusters | Solid baseline; needs to absorb the thematic-cluster finding |
| `02-prescription.yml` | Partial — sitemap and 5-phase plan need cluster-aware refresh | The prescription assumed flat work list; now needs cluster IA |
| `03-design-brief.md` | Valid signature, partial composition table | Schematic-diagram signature is still right; some compositions need recasting for cluster IA |
| `DESIGN-PRINCIPLES.md` | Valid Stage 2 output | 10 categorical refusals still hold; fact-check gates still hold |
| ADR-0001 (positioning) | Valid | "Context engineer" still right; cluster IA reinforces it |
| ADR-0002 (archetype) | Valid | Portfolio-brand-consulting variant still right |
| ADR-0003 (hero claim) | Valid | "Instrument the systems that build the systems" still right |
| ADR-0004 (signature) | Valid | Schematic-diagram still right |
| ADR-0006 (corpus derived) | Valid | Pattern still right |
| ADR-0007 (Vectorize) | Valid | Live and working |
| Content drafts (`content/*.md`) | Valid baseline, refresh against cluster IA | Voice and substance hold; framing needs to absorb new IA |

## What the restart adds

| Artifact | Status |
|---|---|
| **ADR-0008** (new) | Adopt big-blueprint `portal/` shell — supersedes the deleted ADR-0005 thinking |
| **ADR-0009** (new — TBD) | Cluster IA decision — pick the surfacing pattern (Bento / Tabs / Matrix) |
| **`blueprint/portal/`** (new) | Static HTML + Pages Functions stamp from big-blueprint template |
| **`blueprint.ninochavez.co`** (new) | Separate CF Pages project paired with the main site |
| **Refreshed `01-diagnose.md`** | Cluster-aware diagnose |
| **Refreshed `02-prescription.yml`** | Cluster IA + paired-deploy in the plan |
| **Cluster surfacing on `/work` or new route** | Reveal the 60+ repo footprint, not just 9 case studies |
| **Writing collection surfacing on `/writing`** | Whitepapers / series / fiction / presentations not just blog teasers |

## Next moves in order

1. Stamp the `template/portal/` shell from `~/Workspace/dev/wip/big-blueprint/template/portal/` into `blueprint/portal/`. Configure `blueprint.yml`.
2. Write ADR-0008 documenting the portal-shell adoption (replaces the deleted ADR-0005).
3. Refresh `01-diagnose.md` to absorb the cluster finding.
4. Refresh `02-prescription.yml` to add paired-deploy + cluster IA.
5. Write ADR-0009 picking the cluster-surfacing pattern (Bento / Tabs / Filterable Matrix / other).
6. Stage 2 fact-check pass on the refreshed `DESIGN-PRINCIPLES.md` — does any refusal need to change given the cluster IA?
7. Stage 3 prototype — per-slice pages in `blueprint/portal/pages/` with strategy + current-state metadata.
8. Provision `ninochavez-blueprint` CF Pages project + bind `blueprint.ninochavez.co`.
