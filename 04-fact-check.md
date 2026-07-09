# 04 — Fact-Check: convergence record

Stage 5 (brownfield; mandatory whether or not Stage 4 ran). Solo-initiative
degrade path applies (METHODOLOGY.md § Stage 4): mechanical claims are
self-verified against canonical sources below; judgment claims carry forward to
the next ratification gate (operator review of the deployed portal). All checks
run 2026-07-08 evening.

## Mechanical claim verification (portal copy vs canonical sources)

| Claim (where) | Source checked | Verdict |
|---|---|---|
| 10 artifact `pushed` dates (ai-work cards) | `gh api repos/nino-chavez/<repo>` pushed_at | 9/10 exact; forge-site corrected 06-09 → 06-10 (GitHub push lags local commit date) |
| Live labels: atelier / askbc / blueprint subdomains | curl | 200 / 200 / 200 — labels hold |
| `npx @nino-chavez-labs/blueprint-cli init` + 0.5.0 | npm registry | 0.5.0 live |
| 7 persona taglines verbatim (front door) | `src/routes/ai/learn/+page.svelte` | 7/7 exact-string match |
| Builder hero quote + "825-line" (meta/strategy) | `src/routes/ai/learn/builder/+page.svelte` | quote present; 825 lines exact |
| 3 writing-strip titles + dates | live `/blog/rss.xml` | all three present, pubDate 2026-06-16 |
| Ask 500 / code-to-cognition 404 (shipped-view annotations) | Stage 0 manifest (same-day probes) | cited, not re-probed |

**Deltas fixed during the pass**: forge-site date (above); four dead links removed
from the repo README (doc-currency gate; `docs/AEO-ARCHITECTURE.md`,
`docs/CAL-COM-QUICK-START.md`, `docs/CAL-COM-INTEGRATION.md`, `e2e/README.md` —
none exist in the tree).

**Implementation note carried to Tier 2**: `ask-bc` is a private repo (BigCommerce
work, excluded from publication by operator rule) — its production ArtifactCard
must derive from the live-URL probe, not the GitHub API.

## Reviewer convergence (executable set, BLUEPRINT_HOME set)

| Reviewer | Status |
|---|---|
| pilot-profile-lock | PASS |
| research-completeness | PASS |
| prescription-evidence | PASS |
| prescription-jtbd-traceability | PASS |
| portal-review-conformance | PASS |
| portal-chrome-canonical | PASS |
| prototype-forge-provenance | PASS (`forge_pipeline.skip` declared: the site's shipped token system is the brand source; JTBD surfaces aligned to prototype page ids per the reviewer's own remediation) |
| doc-currency | PASS |
| prototype-smoke-runner | WARN — static gate green (serve.sh:8903, @smoke spec at `e2e/blueprint-portal.spec.ts`, zero unstyled chrome classes); the live boot + screenshot run is the Stage 6 ship-gate job by design |
| cost-gate | PASS |

Not run (not applicable): portal-initiative-conformance (Pattern A; running both
conformance reviewers is a configuration error per the reviewer README),
design-principles (greenfield-only), persona-fit/defrag (research/continuous).

**Stage 6 doc gates**: terminology-linter reports one BLOCK — "engineering jargon
'schema'" at `README.md:33-35` — overridden as a false positive: the term is the
Schema.org proper noun (JSON-LD structured data), and replacing it would make the
doc technically wrong. Acronym WARNs (WCAG, AA, IP, …) are the linter's own
flagged-heuristic class; all appear in engineering-register docs, not visitor
copy. doc-quality-auditor is agent-run: the five checks (so-what first, no mental
math, no logic gaps, scannable, methodology statement) were applied in authoring
`05-strategy.md`; final judgment is the operator's at package review.

## Chrome-gap remediation (recorded)

The canonical chrome JS emits ~17 class names `shared.css` ships no rules for
(footer bar, lifecycle strip, phone bezel) — visible as the unstyled footer in the
first Stage 4 screenshots. Styled in `project-tokens.css` (consumer overlay; the
one sanctioned home), flagged upstream in `METHODOLOGY-AMENDMENTS.md` 2026-07-08.

## Judgment claims carried forward (not self-attested)

1. Portal copy hits the voice-guide register (concrete-over-coined glosses read
   naturally) — operator judges at portal review.
2. The three strategy-drawer `question:` fields (persona strip vs single path;
   grounding-banner placement; access-label legibility to non-engineers) — these
   are the stakeholder-review questions by design.
3. Wedge/JTBD semantic coherence — no wedges declared; N/A.
