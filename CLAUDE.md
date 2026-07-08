# website-nc

This repo houses the live `ninochavez.co` site (SvelteKit on Cloudflare Pages).
The live site ships at the repo root. Note: `ninochavez.co` traffic is fronted by
the `~/Workspace/dev/apps/router` Worker, which dispatches to this site's Pages
project (`ninochavez-main`), the blog, and photography — routing bugs live there,
not in this repo (see DEPLOY.md).

## Blueprint initiative — AI Practice Surface Rebuild (active)

Declared 2026-07-08 on branch `blueprint/ai-enablement` (own worktree per the
worktree rule below). Goal + mandate: `docs/AI-INITIATIVE-GOAL.md`. Config:
`blueprint.yml` at repo root (brownfield, Pattern B Review Portal, Tier 1,
pilot: craft-practitioner). Artifact layout is the variant default the reviewer
gates enforce: `research/`, `decisions/`, and the numbered stage files
(`01-diagnose.md`, `02-prescription.yml`, `03-design-brief.md`) at repo root;
only the review portal lives at `blueprint/portal/`. Methodology learnings in
`METHODOLOGY-AMENDMENTS.md` at repo root. The prior v3 "camera-metaphor"
redesign was abandoned and removed (c5754ed) — its `blueprint/` directory is
unrelated to the current one.

The canonical Blueprint operating instructions live in the methodology repo, not here:
**`~/Workspace/dev/tools/blueprint/template/CLAUDE.md`** is the canonical source — read it
before doing any Blueprint-shaped work (a copy ships at `blueprint/CLAUDE.md`). Stage 0
recipes, voice rules, citation rules, reviewer-agent gates, OWNER-SPEC conventions all
load on demand from there. Do not inline them here. This file is a map, not a manual.

The SessionStart hook (`~/.claude/hooks/blueprint-session-start.py`, installed and
wired in `~/.claude/settings.json`) auto-loads `METHODOLOGY.md` +
`docs/variant-selection.md` + `docs/portal-and-tier-ladder.md` when working in any
directory under a `blueprint.yml` ancestor — which, with `blueprint.yml` at repo
root, is every session in this repo.

### Manual fallback if the hook isn't installed

Open the three canonical docs in order before reasoning about Blueprint shape:
1. `~/Workspace/dev/tools/blueprint/METHODOLOGY.md` (§ "First Principle" + § "Variant Selection")
2. `~/Workspace/dev/tools/blueprint/docs/variant-selection.md`
3. `~/Workspace/dev/tools/blueprint/docs/portal-and-tier-ladder.md`

## Browser automation: use browse-tool, not MCP

This project previously used Playwright/Chrome DevTools MCP for interactive browser work. Prefer the Bash-based `browse-tool` CLI instead — it is on PATH when Claude Code is launched from the `cl` alias or a shell that sources `~/.zshrc`.

Commands: `browse-start`, `browse-nav <url>`, `browse-eval "<js>"`, `browse-screenshot`, `browse-tabs`, `browse-pick`, `browse-stop`.

Full reference: `/Users/nino/Workspace/dev/tools/browse-tool/README.md` (use `@README.md` after `/add-dir`).

`npx playwright test` is still the right tool for running the e2e test suite — browse-tool is for ad-hoc interactive inspection and debugging, not replacing the test runner.

## Worktree / dual-track rule

The live site and the redesign can both have work in flight. When work splits across
parallel sessions or subagents — including the Blueprint portal and the live SvelteKit
app at the same time — each session operates in its own git worktree per the global
multi-session isolation rule. The shared working directory will switch branches under
the running session otherwise.
