# 01 — Diagnose: the /ai surface, July 2026

Stage 1 synthesis for the AI Practice Surface Rebuild (brownfield, Pattern B, Tier 1).
Inputs: the goal doc's pre-paid audit (`docs/AI-INITIATIVE-GOAL.md` § Appendix), Stage 0
captures and probes (`research/current-state/00-capture-manifest.md`), and seven Stage 1
research documents cited throughout. All probes 2026-07-08. The pilot every finding is
judged against: the craft practitioner asking *"how can I use AI this way for my own
work?"* (`blueprint.yml pilot_profile`, ADR-0001).

## Verdict

The /ai section fails the pilot at every stage of their journey, for four distinct,
individually-fixable reasons: it is unreachable by construction (D1), its evidence layer
breaks at first click (D2), its sound pedagogy asserts instead of shows (D3), and its
public evidence chain is broken at repo visibility — not at existence; the work is real
and locally deep (D4). Underneath all four is one structural root: every fact on the
surface is hand-inlined markup with no data layer, so nothing derives, nothing is sensed,
and rot is the default trajectory (D5). The market scan shows no competitor fuses
persona-diagnosis + one person's shipped evidence + a self-serve path + freshness as
architecture — the position is open (D6). The appendix the initiative was seeded with is
validated and safe to build on, with one refuted background stat and two nuances that
strengthen its thesis (D8).

## D1 — Unreachable by construction

All 13 pages carry `noindex, nofollow` (13/13 live probes, Stage 0 manifest), and every
inbound channel is severed: the homepage link inventory contains no `/ai`, the GitHub
profile README links only the site root and `/blog`, the blog's nav carries no `/ai`, and
grep across `src/` outside the route tree finds zero internal links — the only reference
is a redirect rule (`research/funnel/funnel.md` §1; `research/current-state/appendix-validation.md`
"Structurally misaligned"). The section serves direct-URL visitors only. This is the goal
doc's "died of placement" diagnosis made mechanical, and it makes prescription prior #1
(nav + drop noindex) necessary but insufficient — the two live channels (GitHub profile,
blog) also need a reason to link in (funnel §4).

## D2 — The evidence layer fails at first click

The front door badges two projects **Live**; both fail when used. Ask: `/api/ask/chat`
no longer 404s after the 2026-07-08 router fix, but a well-formed request returns
**500** — the failing layer moved from routing to backend, prime suspect the pinned
retired model `claude-sonnet-4-20250514` (`src/routes/api/ask/chat/+server.ts:129`;
Stage 0 probe). Code to Cognition: `/code-to-cognition` 404s, and its real home
`labs.ninochavez.co` fails TLS entirely — the local monorepo behind it is substantial
(119 commits), making the dead cert a pure sensing failure
(`research/current-state/evidence-base-local.md` § apps/labs). Beyond the demos, the
front door claims "70+ terms" when the reference page holds 33 items, and the corpus
stub has fronted four unverifiable precision stats ("882,786 words") under a "Coming
Soon" banner for ~7 months (`research/current-state/old-corpus-inventory.md` §§1, 11-12).
For the secondary evaluator audience a dead "Live" badge is worse than no demo — it
actively falsifies the AI-native claim (`research/personas/evaluating-client.md`).

## D3 — Sound pedagogy that asserts instead of shows

The 7-persona taxonomy is the corpus's real asset: diagnosis by the craft you already
have, verbatim definitions worth porting intact (`old-corpus-inventory.md` §2). But the
tracks assert their AI application rather than demonstrate it, unevenly: concrete
mechanics concentrate in Builder and Enterprise; **Strategist contains no AI content at
all** — it is writing pedagogy with no tool, no AI step, no shown artifact
(`old-corpus-inventory.md` §7); Explorer's only "artifact" is a fabricated example
version log (§4). Every track CTA is mailto-your-homework — a review service that isn't
operated (§ corpus-wide facts). The Enterprise track states vendor spec limits as bare
fact, and two of its three limits are now false against current Anthropic docs
(`appendix-validation.md` § Deltas) — unsourced volatile facts rotting exactly as the
freshness thesis predicts.

## D4 — The evidence chain breaks at publication, not existence

The load-bearing Stage 1 finding, from crossing the public survey against the local one
(`research/current-state/evidence-base-public.md`; `evidence-base-local.md`):

- **Three of the goal doc's hypothesized grounding repos are PRIVATE** — `specchain`
  (Builder), `claude-recall-cli` (Voice), `forge-signal` (Author/Strategist). A visitor
  clicking through would 404. Locally, all three are solid and current — the gap is
  visibility, not substance.
- **Only Blueprint is one-command self-serve** (`npx @nino-chavez-labs/blueprint-cli init`,
  npm 0.5.0 published 2026-07-08, live self-demo 200). It grounds Architect strongly and
  can absorb Strategist/Author grounding via its strategic-doc and BRD/PRD/ADR stages.
- **The "live demos" are gated, not interactive**: atelier.ninochavez.co is a docs index
  behind an OAuth wall; askbc.ninochavez.co is a BigCommerce-merchant marketing page.
  Real as shipped-evidence, not usable as try-it-now.
- **ai-analyst-academy is real content behind a broken front door**: 333 files, 6 phases,
  18 labs — fronted by a default SvelteKit scaffold README and a CSR-only stub deploy.
- Public `forge` is a stated not-for-adoption experiment with a dead docs domain; it
  cannot ground Author/Strategist as hypothesized.

Track-grounding matrix (full version with probes: `evidence-base-public.md`):

| Track | Public grounding today | Evidence strength |
|---|---|---|
| Explorer | ai-analyst-academy Phase 1 (content real, front door broken) | thin — build, don't link |
| Builder | Atelier / cortex (clone-and-build), Ask BC (merchant-gated) | adequate as proof, thin as pickup |
| Architect | Blueprint (npm CLI + live self-demo) | **strong** |
| Strategist | Blueprint doc stages + academy labs (forge-signal private) | adequate, re-grounded |
| Author | Blueprint docs + Signal Dispatch essays + public voice guide | adequate, re-grounded |
| Voice | Public voice guide + essays (recall/corpus tooling private) | thin→adequate — method public, tool not |
| Enterprise | ai-champions-kit (`install.sh --tier universal`) | adequate |

Stage 2 therefore faces a real decision the goal doc didn't anticipate: **publish the
private tools, or re-ground three tracks on what is already public** (or per-track mixes).
The surface must not promise "install this" where the honest action is "read the method
and copy the pattern" — the old corpus's over-promising failure in a new form.

**Addendum (2026-07-08 evening) — publication decision partially resolved.** The operator
authorized publishing non-BigCommerce repos after a sanitation scan. Scanned (gitleaks
full-history + family/client/env greps): `specchain`, `claude-recall-cli`, `forge-brand`,
`forge-site` all clean → **now PUBLIC**. Effect on the matrix: Builder gains a genuine
self-serve tool (`npx create-specchain`); Voice's "method public, tool private" gap closes
(the recall/Poe tooling is now inspectable and installable); Author/Strategist gain
secondary forge-chain evidence. **`forge-signal` stays PRIVATE — held, not cleared**: its
git history (not HEAD) contains client project deliverables (`projects/signet/`,
`projects/internal/geo-playbook/`, infoverity/authoritas references) and a GCP API key
(`refs/sig-feedo.html`, commit 0270efe0); publishing exposes full history. Author/Strategist
therefore stay re-grounded on Blueprint's doc stages per the matrix; a future
fresh-cut public release of forge-signal (new repo from HEAD, no history) remains open
to Stage 2 but is not assumed. The leaked GCP key should be revoked regardless.

The narrative layer is the healthiest input: 237 posts, 75% AI-relevant, publishing
active through 2026-06-16, Builder/Architect best-served; derivation is feasible today
via the live `/blog/rss.xml`, though the richer `posts.json` and `/llms.txt` 404 on the
apex as collateral of the router's /api fix — a main-repo prerequisite
(`research/current-state/blog-corpus.md` §4).

## D5 — Structural root: no data layer

Every page's content is a hardcoded array literal in its own `<script>`; there is no
`src/lib/data/`, no content collection, nothing derived from GitHub, the blog, or any
canonical source (`research/current-state/surface-audit.md` §a). The 7 learn tracks are
one copy-pasted template: ~2,000 of 4,822 lines (~40%) mechanically duplicated; shared
code is a single CSS file; the only Svelte component in the section is the chat pane
(§b). The surface audit specifies what the single data-driven `<TrackPage>` needs —
normalized level/section shapes, a self-serve CTA field replacing the seven mailto blocks
(§b) — and a ten-shape content-type taxonomy for the data layer, including the Stat Claim
shape the claim-lint gate must cover (§c). No auth boundary constrains any of this (§d).
This is why the surface rotted: a fact updates only if a human edits a page file, which
is the exact failure the goal doc's freshness architecture (derive / sense / agentic
refresh) exists to remove.

## D6 — The market gap is the fused position

Each competitor delivers one or two of the pilot's needs; none fuses them
(`research/competitive/walkthroughs.md` § closing synthesis): simonwillison has
evidence-adjacency but no persona entry; promptingguide is the technique-first entry the
pilot bounces off; Every.to names personas but is prose-only, thin-linked,
developer-implicit; Anthropic Academy has the best role routing but generic vendor
content and a diagnosis-free catalog one layer down; ai-analyst-academy has the strongest
hands-on sequence but asserts without evidence — the old academy's failure class. None
treats freshness as architecture. The open position: persona-diagnosis by existing craft
→ path → one person's shipped artifact one click deep → self-serve next action, on a
surface that demonstrably maintains itself.

## D7 — Placement inputs (mandate Q3, decided in Stage 2)

Evidence gathered, no conclusion drawn here: the incumbent /ai has zero funnel equity to
preserve (D1) but the domain carries the blog and root traffic the GitHub profile already
points at; labs.ninochavez.co is dead at the cert layer; ai-analyst-academy already
carries the curriculum mission with real labs but zero reach, a stale CSR shell, and a
mismatched deploy name — the Q3 options table must weigh supersede-vs-absorb explicitly
(`competitive/walkthroughs.md` §5; `reference-grading.md` row 5). The homepage's existing
external-property showcase pattern (`#labs` anchor cards) is the native slot an /ai entry
would occupy (funnel §3).

## D8 — Appendix reliability (validation result)

The appendix is safe to build Stage 2 on: every repo-grounded finding reproduced, most
at exact file:line; both structural claims hold (`appendix-validation.md` § Net
reliability). One REFUTED background stat: "~40 repos active in 2026" is false under
every reading — verified figures are 18 public / 75 owned-including-private active in
2026; Stage 2 cites those. Two deltas strengthen the freshness thesis: the "moved links"
finding is mixed (four resolve via redirect; the prompt-engineering link — used twice —
now 404s; the "Safety Guide" label genuinely points at prompt-caching), and the
Enterprise spec limits are not just unsourced but partly false against current docs.

## Sibling-Project Scan

Full scan with decision table: `research/current-state/sibling-scan.md` (primitive:
brownfield Blueprint audit of a live personal-site content surface; siblings read:
apps/blog, apps/rally-hq; website-nc-v3 is removed and its lessons are encoded in the
methodology's chrome-canonical case study). Adopt/diverge calls made there; the five
cited walls this initiative must not re-hit:

1. Chrome-canonical reviewer vs a brand-owning consumer — applies only at Tier 2
   promotion; use canonical chrome + `project-tokens.css` overlay, don't fight the gate.
2. Sibling-scan skip — **Stage 2's Ask relaunch-or-kill decision must read
   `wip/ask-bc/docs/architecture/decisions/001-*` first**; rally-hq re-derived exactly
   the walls that ADR had already rejected.
3. Popularity ≠ quality in reference selection — already applied here
   (`research/competitive/reference-grading.md`).
4. Feature-first drift — author the IA/design contract before per-track content, or the
   seven-tracks-from-one-template goal repeats the copy-paste sprawl (D5).
5. Presence ≠ function — the rebuilt surface's "verified" stamps must assert
   works/live-probed, not route-exists; the old corpus's dead "Live" badges are this
   wall's exact instance (D2).

Blog's one load-bearing decision — interrogating the variant instead of pattern-matching
"live site → brownfield" — was adopted as discipline and diverged on outcome: /ai stays
and is rebuilt in place, so brownfield holds.

## Reference Grading Table

Canonical table with evidence and rationale: `research/competitive/reference-grading.md`.
Summary — simonwillison.net: **Both** (quality scoped to content authority, not visual
design); promptingguide.ai: **Convention only** (never citable for quality claims);
Every.to genre: **Both** (editorial/content standard); Anthropic Academy: **Both**;
ai-analyst-academy: **Neither** (placement candidate and structural comparable only).
Quality claims in this diagnose ground only in the Both-graded rows.

## What Stage 2 must decide (agenda, not prescription)

1. **Grounding strategy per thin track** — publish private tools vs re-ground on public
   artifacts (D4 matrix), including whether Voice's "method public, tool private" state
   is presented honestly as read-and-copy.
2. **Placement** (mandate Q3) with an explicit why-not-incumbent sentence; the
   ai-analyst-academy supersede-or-absorb call is part of it (D7).
3. **Ask: kill or relaunch** — the 500 is now a backend/model fix away from testable,
   but relaunch still requires the public persona prompt and unpinned model
   (prescription prior 4; D2).
4. **The data layer** — adopt the surface audit's `<TrackPage>` + ten content shapes as
   the rebuild's structural spine, with volatile facts in dated data files (D5).
5. **Freshness pipeline as Stage 2 deliverable** — derive (GitHub API, blog RSS), sense
   (link checker, cert/demo probes — each of D2's failures maps to a named sensor),
   agentic refresh (the audit behind this initiative, scheduled); plus the blog-repo
   prerequisite (move `posts.json` under `/blog/` scope) and the labs-cert
   fix-or-retire call.
6. **CTA model** — self-serve replacements for the seven mailto blocks, honest per-track
   verbs: install (Architect/Enterprise), clone-and-read (Builder), read-and-copy
   (Voice/Author/Strategist), guided on-ramp (Explorer, build-not-link).
