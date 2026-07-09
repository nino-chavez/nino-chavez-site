# Methodology Amendments — AI Practice Surface Rebuild

Append-only, reverse-chronological. Convention:
`$BLUEPRINT_HOME/template/docs/methodology/methodology-amendments-convention.md`.

## 2026-07-08 — Pattern B stamp output fails its own chrome/conformance gates in two more places

**Trigger**: First `portal-review-conformance-reviewer` + `portal-chrome-canonical-reviewer` runs against the freshly stamped portal BLOCKed on stamper-created state: (1) the stamp places `canonical-primitives.css` at the portal root, which the conformance reviewer rejects as an orphan top-level stylesheet under the default Profile A (the file is the Profile B import); (2) the stamp applies the `data-theme` substitution to `docs/index.html`, which the chrome manifest requires byte-identical to template canonical — the gate reports 1-line drift on an untouched consumer.
**Scope**: Candidate for methodology promotion
**Status**: Active

Fixed locally by deleting `canonical-primitives.css` (Profile A) and restoring `docs/index.html` byte-identical from `template/portal/`. Upstream fix candidates: the stamp should place `canonical-primitives.css` only when `chrome_profile: consumer-themed`, and `docs/index.html` should be copied verbatim (it is chrome, not project surface). Together with the two scaffold-time bugs below, all four Pattern B defects share one root: the Pattern B path has no smoke test that stamps into a temp dir and runs the Pattern B gates against the result.

**Deploy-time addendum (same day, defect #5)**: `wrangler pages deploy` fails on the stamped portal because `wrangler.toml` ships `name = "PROJECT_SLUG-blueprint"` — the file is copied in the stamper's binary mode, which skips substitutions, and `PROJECT_SLUG` isn't in the substitution table anyway (a comment tells the operator to hand-edit). Also of note for consumers: Pages Functions secrets set via `wrangler pages secret put` only bind on the NEXT deployment — set the secret, then deploy (or redeploy). Both belong in the CONVENTIONS.md § Deploy steps.

**Chrome-CSS gap (defect #6, found at Stage 5)**: canonical `proto-nav.js` emits ~17 class names (`proto-footer-*`, lifecycle strip, phone bezel) that canonical `shared.css` ships no rules for — every Pattern B consumer renders an unstyled footer until they notice. Styled in this initiative's `project-tokens.css`; the rules belong upstream in `shared.css`.

**References**:
- `stamp.mjs` `stampPatternB` (copyTree applies substitutions to the whole tree incl. docs/index.html)
- `portal-review-conformance-reviewer` orphan-stylesheet check; `portal-chrome-canonical-reviewer` byte-diff
- This initiative's Stage 4 commit

## 2026-07-08 — Layout reverted to variant defaults: the mechanical gates enforce fixed root paths

**Trigger**: `research-completeness-reviewer` BLOCKs on the variant default legs at fixed paths (`research/current-state/` …, `01-diagnose.md` at the initiative root) and treats a `stages:` override as advisory INFO only; `prescription-evidence-reviewer` and `prescription-jtbd-traceability-reviewer` likewise resolve `02-prescription.yml` at the root. The `blueprint/`-contained layout (previous entry) can never pass them.
**Scope**: Candidate for methodology promotion (the gap, not the layout)
**Status**: Active — supersedes the same-day layout entry below

Moved `research/` and `decisions/` to the initiative root and dropped the `stages:` override; only `blueprint/portal/` stays nested (the portal tooling's candidate list resolves it). Promotion candidate for the methodology: either the reviewers honor the `stages:` block they already parse, or the docs should state plainly that the artifact layout is fixed and the `stages:` block is informational — the current half-state (schema suggests configurability, gates ignore it) invites exactly this misstep. rally-hq's nested layout predates these gates, which is why the sibling scan didn't flag it.

**References**:
- `research-completeness-reviewer.mjs` (variant default legs; INFO on override)
- Superseded entry below (same day)

## 2026-07-08 — Initiative artifacts live under `blueprint/`, with explicit stage paths in `blueprint.yml`

**Trigger**: This repo is a live product site; the standard initiative layout (research/, decisions/, 01-diagnose.md at the blueprint.yml root) would scatter audit artifacts across the product repo root.
**Scope**: Per-initiative
**Status**: Superseded by 2026-07-08 layout-revert entry above

`blueprint.yml` stays at the repo root (so the SessionStart hook detects the initiative from any cwd in the repo), but all evidence artifacts live under `blueprint/` — `blueprint/research/`, `blueprint/decisions/`, `blueprint/01-diagnose.md`, `blueprint/portal/`. The `stages:` block in `blueprint.yml` declares the `blueprint/`-prefixed paths explicitly so reviewer gates resolve them. This matches the repo's prior-initiative convention (the removed v3 `blueprint/` directory, c5754ed) and rally-hq's layout.

**References**:
- `blueprint.yml` `stages:` block
- rally-hq consumer layout (`apps/rally-hq/blueprint/`)

## 2026-07-08 — Pattern B stamp path skips the `.claude` imposition layer and `tools/lib`

**Trigger**: After the (patched) Pattern B stamp ran, the initiative had no reviewer agents — the `portalType === "review"` branch in `stamp.mjs` returns before the `template/.claude` and `template/tools/lib` copyTree calls that the Pattern A flow labels "installed into EVERY stamped initiative so the SessionStart hook + reviewer agents are present (fixes the install gap; see METHODOLOGY-AMENDMENTS 2026-06-16)".
**Scope**: Candidate for methodology promotion
**Status**: Active

Pattern B consumers get a portal but no stage gates: no `.claude/agents/blueprint/` (workhorses + 15 reviewers), no `.claude/agents/lib/initiative-root.mjs`, no `tools/lib/` (cost-dial, reviewer-registry, doctor — reviewer `.mjs` files import these via relative paths), no `tools/run-reviewers.mjs`. The 2026-06-16 install-gap fix covered Pattern A only. Backfilled by hand in this initiative (skills/ and hooks/ deliberately not copied — both are installed machine-globally here). Upstream fix: move the imposition-layer copy above the Pattern B early return, or call it from `stampPatternB`.

**References**:
- `stamp.mjs` lines ~1030-1039 (early return) vs ~1071-1091 (imposition-layer copy)
- This initiative's backfill commit

## 2026-07-08 — Pattern B initial stamp crashes: `log` referenced in its temporal dead zone

**Trigger**: First run of the documented Pattern B one-liner (`--mode=stamp --portal-type=review`) threw `ReferenceError: Cannot access 'log' before initialization` at `stamp.mjs:1033` — the Pattern B branch uses `log` declared by the Pattern A flow further down the same function scope.
**Scope**: Candidate for methodology promotion
**Status**: Active

The Pattern B initial-stamp path (amendment 1, 2026-06-27) appears to have never been executed end-to-end: the branch at `main()` references the function-scoped `const log` before its declaration. Every fresh Pattern B stamp fails. Worked around by running a scratchpad copy of `stamp.mjs` with a block-scoped `log` declared inside the branch (and `BLUEPRINT_ROOT` pinned, since the copy runs outside the repo). Fix upstream is the same one-liner; a smoke test that runs both stamp modes against a temp dir would have caught it (the mechanical check validates substitutions, not that the stamper runs).

**References**:
- `stamp.mjs:1033` (`stampPatternB(... log)` call), `:1048` (`const log` declaration)
- Patched copy: session scratchpad `stamp-patched.mjs` (throwaway; not committed)
