# website-nc

This repo houses the live `ninochavez.co` site (Next-compatible React through
VineNext on Cloudflare).
The live site ships at the repo root. Note: `ninochavez.co` traffic is fronted by
the `~/Workspace/dev/apps/router` Worker, which dispatches to this site's Pages
project (`ninochavez-main`), the blog, and photography — routing bugs live there,
not in this repo (see DEPLOY.md).

## Unified public site

The former `/ai` front door is retired. `/ai`, `/ai/learn`, and `/ai/work`
remain only as permanent redirects into `/`, `/learn`, and `/work`. The old
Svelte data layer and its scheduled freshness workflow no longer exist in the
live application. Do not recreate or update their generated files.

The current application lives under `app/`. Work records and shared taxonomy
live in `app/data.ts` and `app/facets.ts`. Writing data is generated into
`app/writing-data.json` from the separate blog source; do not edit that file
directly. Demo data follows the same generated-content boundary through the
`sync:demos` scripts.

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
