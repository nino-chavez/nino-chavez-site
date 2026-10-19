# Nino Chavez Website
> Personal portfolio and landing page

This repo houses the live `ninochavez.co` site (Next-compatible React through
VineNext on Cloudflare).
The live site ships at the repo root. Note: `ninochavez.co` traffic is fronted by
the `~/Workspace/dev/apps/router` Worker, which dispatches to this site's Worker
(`ninochavez-main-open-practice`), the blog, and photography — routing bugs live there,
not in this repo (see DEPLOY.md).

## Stack

- Next-compatible React routes under `app/`, built through VineNext.
- Cloudflare Worker deployment through the repository's VineNext commands.
- Shared CSS and design tokens in `app/globals.css`.

## Project Index

### Entry Points
- `app/layout.tsx`: App shell
- `app/page.tsx`: Homepage
- `app/components/`: Shared UI components

### Key Files
- `app/data.ts`: Work records and public destinations
- `app/facets.ts`: Shared naming and taxonomy normalization
- `app/writing-data.json`: Generated writing index; never edit directly
- `app/demo-data.json` and `app/demo-stories.json`: Generated demo content

## Quick Commands
```bash
npm run check && npm run lint    # Static verification
npm test                         # Production build and rendered HTML checks
npm run test:audit               # Audit regression checks
npm run dev                      # Development server
```

## Boundaries
- `.env*` - Environment configuration (never commit)

## Content boundaries

- Blog-source corrections belong in `/Users/nino/Workspace/dev/sites/nino/blog/astro-build`.
- Refresh writing with `npm run sync:writing`; do not hand-edit `app/writing-data.json`.
- Refresh demos with `npm run sync:demos`; the source remains in `/Users/nino/Workspace/dev/sites/nino/nc-demos`.
- `/ai` is a retired namespace retained only for redirects.

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

### Manual fallback if the hook isn't installed

Open the three canonical docs in order before reasoning about Blueprint shape:
1. `~/Workspace/dev/tools/blueprint/METHODOLOGY.md` (§ "First Principle" + § "Variant Selection")
2. `~/Workspace/dev/tools/blueprint/docs/variant-selection.md`
3. `~/Workspace/dev/tools/blueprint/docs/portal-and-tier-ladder.md`

## Copy is contract-governed, not free-hand

Visitor-facing words are governed by approved clauses, not taste. Before writing or
rewriting any rendered copy — a nav label, a heading, a count, a state value, a
search control, an empty state — read the two clause sets:

- `docs/OPEN-PRACTICE-ART-DIRECTION.md` **§Copy and naming** — reader-facing nouns
  over model names, glosses for coined terms, positive framing, first person,
  counts-are-not-ordinals, sourced duration claims.
- `docs/IA-NAVIGATION.md` **§Naming rules** and **§Search** — one canonical name
  per surface, nav-label correspondence, unique record names, labeled search scope.

`npm run test:audit` holds the mechanically testable cases and is the floor, not
the pass. The 2026-08-01 remediation removed the remaining `todo` markers after
the quantity, status, photography, privacy, canonical, and navigation fixes
landed. `docs/AUDIT-PLAN.md` §"When a copy pass is owed" lists the events that
oblige a fresh content review. Findings ledgers live in `docs/audit/`; the latest
copy pass is `docs/audit/FINDINGS-copy-2026-08-01.md`. `reader-contract.json`
carries the machine-readable term lists.

## Browser automation: use browse-tool, not MCP

This project previously used Playwright/Chrome DevTools MCP for interactive browser work. Prefer the Bash-based `browse-tool` CLI instead — it is on PATH when Claude Code or Codex is launched from the `cl` alias or a shell that sources `~/.zshrc`.

Commands: `browse-start`, `browse-nav <url>`, `browse-eval "<js>"`, `browse-screenshot`, `browse-tabs`, `browse-pick`, `browse-stop`.

Full reference: `/Users/nino/Workspace/dev/tools/browse-tool/README.md` (use `@README.md` after `/add-dir`).

`npx playwright test` is still the right tool for running the e2e test suite — browse-tool is for ad-hoc interactive inspection and debugging, not replacing the test runner.

## Worktree / dual-track rule

The live site and the redesign can both have work in flight. When work splits across
parallel sessions or subagents — including the Blueprint portal and the live Next-compatible React
app at the same time — each session operates in its own git worktree per the global
multi-session isolation rule. The shared working directory will switch branches under
the running session otherwise.
