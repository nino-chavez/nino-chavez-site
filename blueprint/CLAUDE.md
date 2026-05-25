# website-nc-v3 Blueprint — Agent Instructions

This is the Blueprint initiative paired with ninochavez.co v3. The live SvelteKit app lives in `../src/`; its parent CLAUDE.md (`../CLAUDE.md`) governs app work. *This* CLAUDE.md governs blueprint work only: portal shell, design briefs, prescriptions, diagnose docs, decisions, and the strategy/current-state panels.

Scope boundary: never touch `../src/`, `../static/`, or any non-blueprint surface from this initiative. The blueprint is a *paired* artifact at `blueprint.ninochavez.co` — it ships alongside the main site, not as part of it.

## Stage 0: Application Legibility (browser sensor)

The parent CLAUDE.md already establishes `browse-tool` as the preferred browser sensor for this project. This blueprint inherits that default and adds the concrete Stage 0 recipe.

**Default sensor: `browse-tool`** — installed and on PATH. Profile name override below keeps initiative state separate from app-level sessions.

### Recipe — validate the portal

```bash
# 1. Boot the portal locally (port 8766; rally-hq uses 8765, so both can run)
./serve.sh

# 2. Boot browse-tool with the initiative-scoped profile
browse-start --profile-name website-nc-v3-blueprint --headless

# 3. Navigate to the front door and screenshot
browse-nav http://localhost:8766/index.html --wait
browse-screenshot --out /tmp/v3-home.png

# 4. Validate a case-study page (one of the seven cases in cluster IA)
browse-nav http://localhost:8766/pages/case-ask-dad.html --wait
browse-eval 'return window.PROTO_PAGE || "no PROTO_PAGE declared"'
browse-screenshot --out /tmp/v3-case.png

# 5. Test the strategy panel + current-state panel toggles
browse-eval 'document.querySelector("[data-strategy-toggle]")?.click(); return document.querySelector("[data-strategy-panel]")?.classList.contains("open")'
browse-eval 'document.querySelector("[data-current-state-toggle]")?.click(); return document.querySelector("[data-current-state-panel]")?.classList.contains("open")'

# 6. Verify case-study cluster navigation works
browse-eval 'return [...document.querySelectorAll("a[href*=\"case-\"]")].map(a => a.href.split("/").pop())'

# 7. Tear down
browse-stop
```

When a prototype page is claimed "done," the proof is a screenshot from step 4, not a code read. Run the recipe before reporting any UI change complete.

### Escalate to Chrome DevTools MCP only when

The task description contains one of:

| Trigger | Reason MCP is required |
|---|---|
| "capture network requests" / "watch XHR" | `browse-eval` can call `fetch` but cannot intercept ambient traffic |
| "stream console errors" / "log capture" | `eval` reads page state, doesn't subscribe to console events |
| "lighthouse audit" / "perf trace" / "core web vitals" | MCP wraps the CDP performance domain directly |
| "accessibility tree" / "ARIA snapshot" / "a11y audit" | MCP exposes the computed a11y tree directly |

Otherwise, default reach is browse-tool. The reason is token economics — this blueprint's `research/`, `decisions/`, and the three-stage diagnose/prescription/brief docs already push context budget; 18k of unused MCP schema would crowd out what the agent reasons from.

## Blueprint structure (this initiative)

```
blueprint/
├── CLAUDE.md                # ← this file
├── 01-diagnose.md           # Stage 1 — diagnose the v2 site failure modes
├── 02-prescription.yml      # Stage 2 — prescribed cluster IA + paired blueprint
├── 03-design-brief.md       # Stage 3 — visual + IA brief
├── DESIGN-PRINCIPLES.md     # Codified visual + IA rules
├── content/                 # Markdown source for case studies
├── decisions/               # ADRs (per-decision rationale)
├── portal/                  # The deployable static portal shell
├── research/                # Diagnose research + competitive intel
└── serve.sh                 # Local server (port 8766)
```

This variant uses the numbered three-stage diagnose/prescription/brief pattern instead of the standard `blueprint.yml`-driven pipeline. Treat 01-diagnose → 02-prescription → 03-design-brief as the equivalent of Stages 1 → 2 → 3 in the standard Blueprint methodology, with portal validation (Stage 0) wrapping all of them.

## Stage rules

- **Match the v3 design language** — see `DESIGN-PRINCIPLES.md` and `03-design-brief.md`. The portal is paired with the main site at `blueprint.ninochavez.co`; visual consistency matters.
- **Mark anything new as PROPOSED** — the portal is communication, not commitment.
- **Cluster IA per ADR-0009** — case studies group by capability cluster, not flat list. Don't regress to flat.
- **Paired blueprint domain per ADR-0008** — the portal lives at `blueprint.ninochavez.co`, not under `ninochavez.co/blueprint`. Routing assumes the subdomain.
- **One primary CTA per page** — no competing actions.
- **Progressive disclosure** — summary first, detail on demand.

## When the agent struggles

Per Codex's harness principle: agent struggle is a missing capability, not a prompting problem. When a stage fails:

1. Identify what's missing — tool, doc, sensor, invariant, ADR
2. Encode it into this blueprint directory (lint, doc, ADR, skill, reviewer agent)
3. Have the agent itself write the encoding
4. Re-run the stage

Do not patch prompts session-by-session. Every encoded capability multiplies across future blueprints.

## Origin

Stage 0 added 2026-05-25 as the second live application of the Blueprint v2 patch (`~/Workspace/dev/wip/blueprint/METHODOLOGY-v2-harness-engineering-patch.md`). Rally HQ was the first; website-nc-v3 follows the same portal shell pattern, so the recipe transfers directly with only URL/path adjustments. The SvelteKit v3 rebuild itself (post 2026-05-25 nuke) is governed by `../CLAUDE.md`, not this file.
