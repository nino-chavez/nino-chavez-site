---
stage: 1
task: B — sibling-project scan (feeds research-sibling-scanner gate)
captured_on: 2026-07-08
primitive: "brownfield Blueprint audit of a live personal-site content surface"
register: internal research
---

# Sibling-Project Scan

Primitive being designed: **a brownfield Blueprint audit + redesign of a live personal-site
content surface** (the /ai section of ninochavez.co). Siblings scanned:
`apps/blog` (Signal Dispatch v2 initiative), `apps/rally-hq` (Pattern B redesign initiative),
and the removed `apps/website-nc-v3` (lessons now encoded in the methodology). Every row cites
a path (+line).

This scan is itself mandated by rally-hq's own amendment
`apps/rally-hq/blueprint/METHODOLOGY-AMENDMENTS.md:250` ("Stage 1 skips sibling-project scan,
drafts plans that hit known walls"), whose promotion criteria (line 300) names *"any consumer
building an AI/agentic feature"* as the next likely to hit the gap — i.e. this initiative.
Skipping the scan is the exact failure that amendment exists to prevent.

## Decision table

| Sibling | Primitive shipped | ADR / doc (path) | What they decided | Adopt or diverge + why |
|---|---|---|---|---|
| apps/blog | Blueprint on a live personal-site content surface | `apps/blog/blueprint.yml:1-22`; `blueprint/01-research.md`; `blueprint/DECISIONS-NEEDED.md` | **Reclassified brownfield→greenfield**: variant is set by the WORK, not by the product existing; v1 preserved under `blueprint/v1-baseline/` as *inputs* | **Adopt the discipline, diverge on the call.** Interrogate the variant (don't pattern-match "live site → brownfield"). But /ai *stays* and is rebuilt in place (audit-first), so **brownfield is correct here** — diverge from blog's greenfield flip. Adopt the v1-baseline-as-input move: the old /ai corpus is mine-not-template (`AI-INITIATIVE-GOAL.md:166`) |
| apps/rally-hq | Pattern B redesign portal for a brand-owning live product | `blueprint/METHODOLOGY-AMENDMENTS.md:497` (chrome-canonical wall); `:250` (sibling-scan); `:310` (reference quality); `:185` (Foundation stage) | Portal-chrome-canonical byte-identical reviewer **breaks for consumers that own their design system at the chrome layer**; Stage 1 must scan siblings + grade references by quality not popularity; feature-first specs need a Foundation stage or they drift bottom-up | **Adopt all four as pre-emptive checks.** Detailed below |
| apps/website-nc-v3 (removed) | Pattern B portal on *this same repo*, prior initiative | `tools/blueprint/docs/case-studies/case-study-v3-portal-css-gap.md` (16.6KB, verified); `tools/blueprint/METHODOLOGY.md:49-50,54` | Shared-chrome drift: lost 268 lines of `shared.css`, restored from a *peer consumer's* live URL → promoted peer drift to de-facto canonical; docs-viewer leaked "Rally HQ" slugs + productName | **Adopt the fix that shipped from it**: canonical chrome (byte-identical, do-not-edit) + `project-tokens.css` overlay + manifest-driven data. Don't hand-edit portal chrome; drive project data from `_meta/index.json` |

## Walls this initiative must not re-hit (rally-hq, cited)

1. **Chrome-canonical reviewer vs a brand-owning consumer** — `METHODOLOGY-AMENDMENTS.md:497`,
   Gap 2 at `:560` ("the load-bearing finding"). Rally owns its design system, so a reviewer
   that enforces *byte-identical* portal chrome fought the brand. **Relevance:** ninochavez.co
   is likewise a brand-owning live site. This initiative is a **Pattern B review portal**
   (`AI-INITIATIVE-GOAL.md:120`) — throwaway scaffolding for current-vs-proposed comparison — so
   the canonical-chrome reviewer is *appropriate for the portal*. The wall reappears only if the
   prototype embeds proposed /ai pages into the live SvelteKit design system (Tier 2 promotion);
   at that point, follow the v3 fix (canonical chrome + project-tokens overlay), do not fight the
   reviewer.

2. **Sibling-scan skip → re-hitting known walls** — `METHODOLOGY-AMENDMENTS.md:250`. Rally
   drafted an AI-chat plan on generic Vercel-AI-SDK assumptions that `wip/ask-bc`'s ADR-001 had
   already rejected (step-count caps, markdown-can't-render-UI, Haiku-as-default). **Relevance:**
   if this initiative's Stage 2 touches the Ask relaunch-or-kill decision
   (`AI-INITIATIVE-GOAL.md:186-188`), read `wip/ask-bc/docs/architecture/decisions/001-*` first
   — ask-bc is the shipped agentic-chat reference (see `evidence-base-local.md`).

3. **Popularity ≠ quality in reference selection** — `METHODOLOGY-AMENDMENTS.md:310`. Rally
   graded 3 of 9 reference apps as "convention references," not "quality references."
   **Relevance:** the goal doc's competitive candidates (simonwillison.net, promptingguide.ai,
   Every, vendor academies — `AI-INITIATIVE-GOAL.md:150-152`) must be graded on quality, not
   traffic. Use Blueprint's Reference Quality Grading (`tools/blueprint/METHODOLOGY.md:173`).

4. **Feature-first drift needs a Foundation stage** — `METHODOLOGY-AMENDMENTS.md:185`.
   Feature-driven specs have no author for cross-cutting IA/design/layout, so projects emerge
   bottom-up and drift. **Relevance:** the /ai rebuild is IA-heavy (front door → learn → work,
   `AI-INITIATIVE-GOAL.md:180-183`). Author the IA/design contract before per-track content, or
   the seven-tracks-from-one-template goal repeats the old corpus's copy-paste sprawl.

5. **Presence ≠ function (DoD verification ladder)** — `tools/blueprint/WAVE-LOG.md` Wave 52 &
   Wave 64. A register read COMPLIANT for a *broken* widget because checks only proved artifacts
   *exist* (G3), never that they *work* (G4) or are *live* (G5). **Relevance:** this is the same
   failure as the old /ai's dead "Live" demos (`AI-INITIATIVE-GOAL.md:246-248`). The rebuilt
   surface's "verified" stamps must assert G4/G5 (works / live-probed), not G3 (route exists) —
   which is exactly the goal doc's Freshness §2 "sensors fail loudly" requirement.

## Already-hit walls, already logged (this initiative's own amendments)

The initiative's `METHODOLOGY-AMENDMENTS.md` already records **three fresh Pattern B stamp
bugs** hit at scaffold time on 2026-07-08 — evidence the Pattern B path is under-tested relative
to Pattern A:
- Pattern B stamp **crashes** on `log` temporal-dead-zone (`stamp.mjs:1033` vs `:1048`) — every
  fresh Pattern B stamp fails; worked around with a patched scratchpad copy.
- Pattern B stamp **skips the reviewer-install layer** (`.claude/agents/blueprint/` + `tools/lib`)
  that the 2026-06-16 install-gap fix only wired for Pattern A — so a stamped Pattern B initiative
  has a portal but no stage gates until backfilled by hand.
- Artifact-layout amendment: `blueprint.yml` at root, evidence under `blueprint/` (matches
  rally-hq + the removed v3 layout).
These are logged; the upstream fixes (move imposition-layer copy above the Pattern B early
return; add a both-modes stamp smoke test) are candidates for methodology promotion, not blockers
for this initiative.

## Declared absences (per the scan rule)

- **apps/blog has NO `METHODOLOGY-AMENDMENTS.md`** (verified: `ls` of both
  `apps/blog/blueprint/` and `apps/blog/` root → absent). Blog's methodology learnings live
  inline in its stage files (`01-research.md`, `DECISIONS-NEEDED.md`) and its `blueprint.yml`
  header, not in a dedicated amendments log. So blog contributes one load-bearing decision (the
  variant reclassification) but no reviewer/gate-level amendments to adopt.
- **apps/website-nc-v3 does NOT exist locally** (verified: directory MISSING; removed at c5754ed
  per repo `CLAUDE.md`). Its lessons are **not lost** — they are encoded in the methodology as the
  chrome-canonical case study (`case-study-v3-portal-css-gap.md`) and cited across
  `METHODOLOGY.md:49-50,54`, `WAVE-LOG.md`, and multiple reviewer specs. Nothing to scan directly;
  adopt via the shipped template separation (canonical chrome + overlay + manifest data).
- **No sibling has run this exact primitive to completion.** Rally-hq (production app redesign)
  and blog (publication re-conception) are the nearest, but neither is a *brownfield audit of a
  hidden/orphaned content section on a live personal site* — the /ai case is closest to blog's
  surface type but rally-hq's process depth. This initiative is the first of its exact shape; the
  adoptable material is the *disciplines* (variant interrogation, sibling scan, reference grading,
  Foundation stage, DoD ladder), not a turnkey precedent.
