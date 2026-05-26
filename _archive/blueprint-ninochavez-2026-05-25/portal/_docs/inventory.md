---
canonical: false
status: working-inventory
last_updated: 2026-05-25
---

# Existing-Artifact Inventory

Walk of `apps/website-nc/` before authoring any new Blueprint research. Most
brownfield Stage 1 (Diagnose) work already exists in this repo — the table below
maps existing artifacts to brownfield stages so we reference them rather than
recreate them. Anything not mentioned is operational/archive material and gets
left where it is.

**Variant**: brownfield. **Stage 1 required sub-deliverables** (per
`docs/variant-selection.md`): `current-state/`, `personas/`, `funnel/`,
`competitive/`, plus `01-diagnose.md` synthesizing them.

## Salvage — feed directly into Stage 1 (Diagnose)

These are dense audit artifacts. Each gets symlinked or excerpted into
`research/current-state/` or `research/competitive/`, not rewritten.

| Existing artifact | Lines | Maps to | Salvage action |
|---|---|---|---|
| `docs/CODE_ARCHITECTURE_AUDIT.md` | 999 | `research/current-state/code-architecture.md` | Symlink; treat as canonical current-state architecture record. Already structured as an audit — exactly the diagnose shape brownfield needs. |
| `docs/COPY_ASSESSMENT.md` | 247 | `research/current-state/copy-assessment.md` | Symlink. Pre-existing diagnose of project-row copy. Stage 2 prescription extends this. |
| `docs/VALIDATION_REPORT.md` | 298 | `research/current-state/validation-history.md` | Symlink. Post-remediation history; useful as "what we already know works/doesn't" baseline. |
| `docs/REMEDIATION_SUMMARY.md` | 672 | `research/current-state/remediation-history.md` | Symlink. Tracks what's been touched recently — anti-pattern guard against re-prescribing already-attempted fixes. |
| `docs/POST_REMEDIATION_CHECKLIST.md` | 209 | `research/current-state/remediation-checklist.md` | Symlink. Bullet-form complement to REMEDIATION_SUMMARY. |
| `docs/MODERN_ANIMATION_SYSTEM.md` | 172 | `research/current-state/animation-system.md` | Symlink. Catalogs the existing animation surface — current-state input for the redesign's motion language. |
| `e2e/audit/AGENCY_DESIGN_AUDIT.md` | ? | `research/current-state/agency-design-audit.md` | Symlink. Agency-style design audit; closest existing analog to Stage 1's "what does an external eye see." |
| `e2e/audit/AGENCY_AUDIT_V2.sveltekit.md` | ? | `research/current-state/agency-audit-v2.md` | Symlink. Updated agency audit. |
| `e2e/audit/AGENCY_AUDIT_V2_REPORT.md` | ? | `research/current-state/agency-audit-v2-report.md` | Symlink. Report form of the V2 audit. |
| `e2e/audit/PHASE_1.5_AGENCY_AUDIT_V2.adapted.md` | ? | `research/current-state/phase-1.5-audit.md` | Symlink. Phase-1.5 adapted version. |
| `e2e/audit/DESIGN_IMPLEMENTATION_PROPOSAL.md` | ? | `research/_pre-stage-3/design-implementation-proposal.md` | This is already Stage 3-shaped (design brief / implementation). Park separately; revisit when Stage 2 prescription locks in. |
| `docs/agency/visual-review-checklist.md` | ? | `research/current-state/visual-review-checklist.md` | Symlink. Visual review checklist — Stage 1 diagnose input. |
| `audit-smoke-test-mobile.png` | (image) | `research/current-state/screenshots/audit-smoke-test-mobile.png` | Move (not symlink) into the screenshot well. The bare PNG at repo root is housekeeping noise. |
| `DESIGN.md` (root, 209 lines) | 209 | `research/current-state/design-notes-current.md` | Symlink. Existing root-level design notes capture intent of the live site. |

## Salvage — feed into Stage 1 (Competitive + Brand)

| Existing artifact | Lines | Maps to | Salvage action |
|---|---|---|---|
| `docs/brand-domination-strategy.md` | 683 | `research/competitive/brand-strategy-prior.md` | Symlink. Existing brand positioning — Stage 2 prescription needs to reconcile against this or explicitly supersede it. |
| `docs/domain-brand-stress-test.md` | 723 | `research/competitive/brand-stress-test.md` | Symlink. Brand stress-test against agency framing — competitive Stage 1 input. |
| `docs/domain-selection-analysis.md` | 505 | `research/competitive/domain-analysis.md` | Symlink. Domain reasoning — captures positioning thesis. |
| `docs/SEO-MULTI-APP-STRATEGY.md` | 254 | `research/competitive/seo-multi-app.md` | Symlink. Cross-app SEO posture; relevant because the redesign sits in a multi-app domain family (ninochavez.co + blog + gallery + signal-x studio). |
| `docs/SITE-COMPLETION-CHECKLIST.md` | 396 | `research/current-state/completion-checklist.md` | Symlink. What "done" looked like for v2; Stage 2 prescription redefines "done" for v3. |
| `README.md` (root) | 340 | (reference only) | Don't symlink. README describes the AEO architecture thesis — Stage 1 reads this to understand stated intent, but the AEO frame may itself be one of the things the redesign revisits. |

## Live source — current-state baseline (no copy, just reference)

The live site's source is the most authoritative current-state record. Stage 1
references file paths; nothing gets copied into `research/`.

| Surface | Live source | Where it lands in Stage 1 |
|---|---|---|
| Home | `src/routes/+page.svelte` | `01-diagnose.md` § Home |
| About | `src/routes/about/` | `01-diagnose.md` § About |
| Work / projects | `src/routes/work/` | `01-diagnose.md` § Work |
| AI / capabilities | `src/routes/ai/` | `01-diagnose.md` § AI |
| Links / "now" | `src/routes/links/`, `src/routes/now/` | `01-diagnose.md` § Lateral surfaces |
| v1 (legacy?) | `src/routes/v1/` | Determine in Stage 1: legacy archive or live route? |
| Privacy / API | `src/routes/privacy/`, `src/routes/api/` | Operational; not Stage 1 scope. |

## Operational / archive — do not pull into Stage 1

These solved past operational problems. They aren't part of the redesign brief.
Leave them in `docs/` as-is; the next housekeeping pass can sweep them into
`docs/_archive/` if drift becomes a problem.

- `docs/CAL-COM-INTEGRATION.md`, `CAL-COM-PLATFORM-UPGRADE.md`, `CAL-COM-QUICK-START.md`, `CAL-COM-SUMMARY.md` — Cal.com integration history.
- `docs/PROXY-BASE-PATH-FIX.md`, `PROXY-FIX-COMPLETE.md`, `GALLERY-PROXY-FIX.md` — proxy debugging history.
- `docs/BLOG-GALLERY-SETUP.md`, `WEBHOOK-SETUP.md`, `DEPLOY-INSTRUCTIONS.md` — operational setup notes.
- `docs/SEO-IMPLEMENTATION-STATUS.md`, `SEO-QUICK-START.md` — operational SEO records. The strategic SEO posture in `SEO-MULTI-APP-STRATEGY.md` is salvaged separately above.
- `docs/deployment/vercel.md` — stale (site moved to Cloudflare Pages).

## Adjacent methodology — Agent OS coexistence

`agent-os/` is a separate methodology (Agent OS) that the site already uses for
its own development workflow. Blueprint is the redesign methodology layered on
top; the two don't conflict.

- `agent-os/STATE.md` — Agent OS session state. Untouched.
- `agent-os/config.yml`, `roles/`, `standards/`, `workflows/` — Agent OS config. Untouched.

Stage 1 may reference Agent OS docs for production engineering posture; Blueprint
does not consume them as research material.

## Decisions logged 2026-05-25

The five open questions surfaced by this inventory are resolved.

### 1. `src/routes/v1/` → archive at end of redesign

Leave live for the duration of Stage 1–3. When the v3 redesign reaches a
shippable state (end of Stage 4 fact-check or start of Stage 6 deploy), move
`src/routes/v1/` into a `_archive/` location and remove from the live route
table. Stage 2 prescription should explicitly call this out so the move
doesn't get forgotten at ship time.

### 2. AEO ("Answer Engine Optimization") thesis → retire

The current `README.md` and `DESIGN.md` center AEO as the site's strategic frame.
The v3 redesign drops it. Stage 2 prescription replaces the AEO framing with a
positive thesis grounded in working-product receipts (see `_external-corpus.md`
§ "Working products to reference"). Do not paraphrase the AEO thesis forward
into v3; treat the prior strategic frame as superseded.

### 3. `brand-domination-strategy.md` → never shipped, not active

The 683-line "brand domination" campaign was authored but did not ship and is
not active. Treat the doc as historical artifact only. Stage 2 prescription
authors brand positioning from a clean slate against working-product receipts
and the Signal Dispatch voice guide — not against `brand-domination-strategy.md`.
The doc still gets symlinked into `research/competitive/` per § "Salvage" above
so Stage 1 can see what *was* tried, but no claims forward-port.

### 4. Audit-history chronology — ordered

Git-author dates resolve the layering. Most-recent-wins:

| Date | Artifact | Role in Stage 1 |
|---|---|---|
| **2025-10-30** | `docs/COPY_ASSESSMENT.md` | **Diagnose baseline** for copy / content surface. Newest audit artifact in the repo. |
| **2025-10-18** | `docs/CODE_ARCHITECTURE_AUDIT.md` | **Diagnose baseline** for code + architecture. No newer code audit exists. |
| 2025-10-18 | `e2e/audit/AGENCY_DESIGN_AUDIT.md` | **Diagnose baseline** for visual / agency design — supersedes the Oct-17 V2 set below. |
| 2025-10-18 | `e2e/audit/DESIGN_IMPLEMENTATION_PROPOSAL.md` | Stage-3-shaped pre-existing artifact. Park until Stage 2 prescription locks in; re-evaluate then. |
| 2025-10-18 | `docs/agency/visual-review-checklist.md` | Companion checklist to the Oct-18 design audit. |
| 2025-10-18 | `docs/REMEDIATION_SUMMARY.md` | Records what was fixed in the Oct-17 → Oct-18 remediation cycle. |
| 2025-10-18 | `docs/POST_REMEDIATION_CHECKLIST.md` | Bullet companion. |
| 2025-10-18 | `docs/VALIDATION_REPORT.md` | Post-remediation validation. |
| 2025-10-17 | `e2e/audit/AGENCY_AUDIT_V2.sveltekit.md` | Historical — superseded by Oct-18 `AGENCY_DESIGN_AUDIT.md`. Reference only. |
| 2025-10-17 | `e2e/audit/AGENCY_AUDIT_V2_REPORT.md` | Historical — same superseded status. Reference only. |
| 2025-10-17 | `e2e/audit/PHASE_1.5_AGENCY_AUDIT_V2.adapted.md` | Historical — same superseded status. Reference only. |

Stage 1 diagnose authors against the **three baseline docs** (COPY_ASSESSMENT,
CODE_ARCHITECTURE_AUDIT, AGENCY_DESIGN_AUDIT). The Oct-17 V2 trio is reference,
not source.

### 5. Cross-app scope → stops at main site

The v3 brief covers `ninochavez.co` proper. Blog (`apps/blog`), gallery
(`apps/photography`), studio (`apps/website-ss`), and the router
(`apps/router`) stay where they are. Stage 1 personas + funnel reference them
as adjacent surfaces, not in-scope surfaces. If Stage 2 prescription discovers
a hard dependency that forces cross-app work, expand scope by ADR — but the
default is *no cross-app changes*. The chat FAB still indexes the blog corpus
for grounding (per `blueprint.yml` Vectorize binding); that's read-only
consumption, not in-scope work on the blog itself.
