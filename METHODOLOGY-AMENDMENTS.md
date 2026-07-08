# Methodology Amendments — AI Practice Surface Rebuild

Append-only, reverse-chronological. Convention:
`$BLUEPRINT_HOME/template/docs/methodology/methodology-amendments-convention.md`.

## 2026-07-08 — Initiative artifacts live under `blueprint/`, with explicit stage paths in `blueprint.yml`

**Trigger**: This repo is a live product site; the standard initiative layout (research/, decisions/, 01-diagnose.md at the blueprint.yml root) would scatter audit artifacts across the product repo root.
**Scope**: Per-initiative
**Status**: Active

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
