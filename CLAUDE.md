# website-nc

This repo houses the live `ninochavez.co` site (SvelteKit on Cloudflare Pages).
The live site ships at the repo root. Note: `ninochavez.co` traffic is fronted by
the `~/Workspace/dev/apps/router` Worker, which dispatches to this site's Pages
project (`ninochavez-main`), the blog, and photography — routing bugs live there,
not in this repo (see DEPLOY.md).

## Blueprint initiative

The prior brownfield redesign (`blueprint/`, v3 "camera-metaphor") was abandoned and
removed (c5754ed). The next initiative — rebuilding the /ai section into an
evidence-backed enablement surface — is seeded by `docs/AI-INITIATIVE-GOAL.md`
(brownfield, Pattern B, Tier 1) and runs in its own worktree; declare it there
per that doc's blueprint.yml seed, and update this section when it exists.

The canonical Blueprint operating instructions live in the methodology repo, not here:
**`~/Workspace/dev/tools/blueprint/template/CLAUDE.md`** is the canonical source — read it
before doing any Blueprint-shaped work. Stage 0 recipes, voice rules, citation rules,
reviewer-agent gates, OWNER-SPEC conventions all load on demand from there. Do not
inline them here. This file is a map, not a manual.

Once the SessionStart hook is installed (`~/.claude/hooks/blueprint-session-start.py`
+ merge from `template/.claude/settings.json.example`), future sessions auto-load
`METHODOLOGY.md` + `docs/variant-selection.md` + `docs/portal-and-tier-ladder.md`
when working in any directory under a `blueprint.yml` ancestor.

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
