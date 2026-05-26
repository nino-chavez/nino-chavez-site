---
canonical: true
stage: 7
status: candidates
last_updated: 2026-05-25
voice_mode: solution-architecture
version: 0.1
---

# 08 — Stage 7 Iterate Candidates

Items surfaced during Stage 1–6 that aren't in the Stage 6 production
deploy plan but should be considered in the Stage 7 iterate cycle.

Stage 7 starts post-launch and runs as a feedback loop against the
deployed v3 at `ninochavez.co`. Items here ladder up to "what to
prioritize when iterating."

## C1 — Colophon stat-tile + meta-receipt-card treatment

**Source**: Comparison of Stage 4 portal `/colophon` against Stitch v1
visual spec (`03.5-visual-spec/colophon/screen.png`).

**Observation**: Stage 4 portal renders `/colophon` as a prose-led
explanation of Blueprint methodology + pipeline + stack + influences.
Stitch's render of the same page takes a more structural approach:

- **"TOTAL SYSTEM OVERHEAD"** stat-tile at the top (analogous to a
  cumulative-effort meter for the methodology applied to the site)
- **`receipt-line` rows** for each artifact reference (flex rows with
  mono labels + dotted separators + hover-underline in proof-mark red)
- **§ section prefixes** with UPPERCASE label conventions throughout
- **Notation rail** on the right with material-symbols icons paired with
  mono labels (Contact / Signals / Research / Archives)

**Why steal**: "Show the methodology" beats "tell the methodology." The
stat-tile + receipt-line treatment makes the methodology feel like a
catalogued system rather than a long paragraph. Higher information
density per scroll-distance. More memorable.

**Scope**: Rework `/colophon` in the production SvelteKit implementation
(W5 in `07-production-deploy-plan.md`). NOT a Stage 4 portal rework —
the portal is the stakeholder review surface and is now frozen at
v0.2.

**Effort**: ~3 hours within W5. Token system stays cyanotype + cream;
only the page composition changes.

**Acceptance**: production `/colophon` opens with a stat tile (e.g.,
"TOTAL DESIGN DEBUGGED — X HOURS" or "PIPELINE STAGES COMPLETE — 6/7"),
followed by receipt-line catalog of artifacts + stack + influences. No
prose paragraphs longer than 2 sentences. Mono UPPERCASE section labels
with § prefix.

## C2 — Receipt list density tightening on home page

**Source**: Stitch v1 home page composition (`03.5-visual-spec/home/screen.png`).

**Observation**: Stage 4 portal renders "What I'm building" as a
3-column grid (name / URL / description). Stitch renders it as a tighter
single-column with smaller vertical rhythm — closer to Brian Lovin's
named-receipt-list pattern.

**Why steal**: 11 receipts in a 3-column grid takes more vertical space
than necessary. Lovin's pattern (~15 named projects in a tight vertical
list) reads as a body-of-work index; ours reads as a directory.

**Scope**: Production SvelteKit home page (W5). Reduce per-receipt
vertical padding; consolidate URL + kitchen-link into the description
line.

**Effort**: ~1 hour within W5.

**Acceptance**: Receipt list section on `/` fits within a single
viewport on a 1440px display (currently spans ~1.5 viewports).

## C3 — Singer site re-audit with rendered tool

**Source**: `peer-cohort.md § Stage 4 follow-ups logged`.

**Observation**: Jordan Singer's `ibuildmyideas.com` was partially audited
in the peer-cohort calibration — text-only WebFetch couldn't extract the
interactive-demo content. Marked as Stage 4 follow-up.

**Why now**: Stage 7 cohort re-calibration is the natural time. Use
browse-tool with screenshot to capture Singer's actual interactive
treatment; update `peer-cohort.md` Archetype D with verified observations.

**Scope**: ~30 min — browse-nav, screenshot, update peer-cohort.md.

**Acceptance**: Archetype D in peer-cohort.md cites Singer with
specifics, not "needs rendered audit."

## C4 — Re-verify cohort "no Cal.com on /" claim

**Source**: `peer-cohort.md § Stage 4 follow-ups`.

**Observation**: The claim that NO cohort site has Cal.com on `/` was
based on first-viewport content extraction. A small persistent CTA
could've been missed.

**Why now**: Per `02-prescription.yml § P0-1`, v3 ships Cal.com on `/`.
If a cohort site already does this, the differentiation argument
weakens. Worth confirming.

**Scope**: ~30 min — browse-nav each of 7 cohort sites, scan for
Cal.com / Calendly / scheduling-CTA presence.

**Acceptance**: peer-cohort.md updated with verified Cal.com presence
table per cohort site.

## C5 — Stage 3.5 visual-spec methodology formalization

**Source**: Session 2026-05-25 — `03.5-visual-spec/README.md`.

**Observation**: Stage 3.5 was implicit in the canonical brownfield
Pattern B pipeline ("a visual spec would render the brief"). Imported
Stitch output filled the gap retroactively. Should be explicit in the
methodology going forward.

**Why now**: Stage 7 iterate is the right time to feed canonical
methodology improvements back to `~/Workspace/dev/wip/blueprint/`. Per
Nino's session split: template-repo fixes happen separately.

**Scope**: Methodology repo PR — add Stage 3.5 to brownfield variant doc,
make required for Pattern B initiatives, name candidate tools (Stitch,
Figma, Sketch, hand-illustrated).

**Effort**: ~2 hours in template repo session.

**Acceptance**: `wip/blueprint/docs/variant-selection.md` brownfield
section includes Stage 3.5 (visual spec) between Stage 3 (design brief)
and Stage 4 (prototype). Required for Pattern B; optional for Pattern A.

## C6 — Live signals data-source hardening

**Source**: `05-fact-check.md § A4 DEFER`, `07-production-deploy-plan.md § W6`.

**Observation**: W6 in the deploy plan ships MVP live signals (RSS +
self + commit). Rally HQ status endpoint may not exist at launch and
ships as placeholder.

**Why now**: Stage 7 iterate is when the Rally HQ status endpoint
should land (lightweight `/api/status` returning JSON with uptime +
tournament count). Then update home + /now signal strips to consume it.

**Scope**: Cross-app work — Rally HQ endpoint + ninochavez.co consumer.

**Effort**: ~4 hours.

**Acceptance**: live signal strip shows real Rally HQ uptime + tournament
count, refreshed on every page load via Cloudflare Pages Function
caching (60-second TTL).

## C7 — Vectorize reindexing cadence

**Source**: `07-production-deploy-plan.md § W7`.

**Observation**: Initial Vectorize index ships at launch (W7). Reindexing
cadence not defined.

**Why now**: Signal Dispatch publishes ~4-8 posts/month. Weekly reindex
keeps chat answers current without overbuilding.

**Scope**: Cloudflare Workers Cron Trigger → reindex job → drop +
rebuild Vectorize embeddings from `apps/blog`.

**Effort**: ~2 hours.

**Acceptance**: weekly cron runs; chat FAB cites posts published within
the prior 7 days.

## C8 — Stakeholder annotation overlay enablement

**Source**: `portal/CONVENTIONS.md § Stage 7`.

**Observation**: The portal's `proto-annotate.js` overlay lets
stakeholders drop notes per-element. Enabled via
`localStorage.setItem('rally-anno-enabled','true')`.

**Why now**: Once v3 ships, the blueprint portal becomes the venue for
stakeholder feedback. Enable annotation, send portal URL to specific
reviewers, collect notes per page.

**Scope**: Rename localStorage key from `rally-anno-enabled` to
`ninochavez-anno-enabled` (template divergence — fix in template repo).
Update CONVENTIONS.md instructions. Optionally: build a Pages Function
that aggregates annotation exports from multiple browsers into a single
KV-stored feedback report.

**Effort**: ~30 min for rename; ~4 hours for KV aggregation if desired.

**Acceptance**: stakeholders can enable annotation, drop notes, export.

## Triage — which candidates ship when

| Item | Priority | When |
|---|---|---|
| C1 Colophon stat-tile rework | High | Within W5 of production deploy |
| C2 Receipt list density tightening | Medium | Within W5 of production deploy |
| C3 Singer re-audit | Low | Post-launch — anytime |
| C4 Re-verify Cal.com claim | Low | Post-launch — anytime |
| C5 Stage 3.5 methodology formalization | High | Nino's template repo session |
| C6 Live signal data hardening | Medium | Post-launch — first iterate cycle |
| C7 Vectorize reindex cadence | Medium | First iterate cycle |
| C8 Annotation overlay enable | High | Day-1 of Stage 7 (stakeholder feedback ingestion) |

## What this list is NOT

- **Not a roadmap**. These are candidates; Stage 7 iterate decides what actually ships and in what order based on stakeholder feedback + Nino's bandwidth.
- **Not a backlog spec**. Each candidate is a paragraph of intent, not a full ticket. Promote to a ticket / work item when scheduled.
- **Not exhaustive**. Items surface during iterate; this is the seed list as of Stage 6 close.
