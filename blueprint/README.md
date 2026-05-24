# ninochavez.co v3 — Blueprint

**Date started:** 2026-05-24
**Status:** in flight — Phase 0 (sanitization + custom-domain deploys) and Phase 1 (Diagnose + Prescribe + Design Brief) complete; Phase 2 content drafts complete; Phase 3 (Renovate — wire content into code) and Phase 4 (destructive cuts) pending.

A redesign of `ninochavez.co` to reposition the site from polymath/creative ("software, photographs, mixes, essays") to **context engineer** — someone who codified a working practice for shipping production software with AI agents and runs the practice in public.

Applied using the **bc-subscriptions blueprint pattern** rather than the rally-hq static-prototype-with-drawers pattern. The reasoning is in [`decisions/0005-site-as-prototype-review-model.md`](./decisions/0005-site-as-prototype-review-model.md). Short version: the site **is** the prototype, the SvelteKit app gets deployed to a preview URL on every push, ADRs document load-bearing decisions, DESIGN-PRINCIPLES.md is the Stage 2 "what this CAN'T do" gate. No separate static portal.

## Reviewable surface

**Live preview deploy** (auto-updated on every push to the `redesign/v3-context-engineer` branch):

→ <https://redesign-v3-context-engineer.ninochavez-main.pages.dev>

The preview is the current v2 site (because Phase 3 hasn't wired v3 content into code yet) — but every push to this branch re-deploys, so once Phase 3 lands the URL above shows the v3 redesign in real SvelteKit, not a mockup of it.

For Stage 2 + Stage 4 discipline (the bc-subs case-study lesson), see:
- [`DESIGN-PRINCIPLES.md`](./DESIGN-PRINCIPLES.md) — Stage 2: what this site CAN'T do today (anti-uses, refusal list, audit guards)
- The ADRs in [`decisions/`](./decisions/) — load-bearing decisions with their cited rationale

## What's in here

```
blueprint/
├── README.md                 this file
├── 01-diagnose.md            Stage 2 of forge-site: archetype lock, module list, scope
├── 02-prescription.yml       Stage 3 of forge-site: stack, sitemap, 5-phase task groups
├── 03-design-brief.md        Stage 3.5 of forge-site: signature + compositions + imagery + motion + iconography
├── DESIGN-PRINCIPLES.md      Stage 2 of big-blueprint: explicit "what this CAN'T do today" — the bc-subs case-study fix
├── decisions/                ADRs for load-bearing decisions, bc-subs-pattern
│   ├── 0001-positioning-context-engineer.md
│   ├── 0002-archetype-portfolio-brand-consulting.md
│   ├── 0003-hero-claim-option-a.md
│   ├── 0004-signature-schematic-diagram.md
│   └── 0005-site-as-prototype-review-model.md
└── content/                  Phase 2 drafts — words before code
    ├── hero.md
    ├── about.md
    ├── practice.md
    ├── aeo-person.json
    ├── aeo-expertise.json
    ├── aeo-experience.json
    └── work-data-refresh.md
```

## Methodology origin

Three methodologies compose into this blueprint:

| Source | What it contributes | Lives in |
|---|---|---|
| `tools/forge-site` | Site-build playbook (5 stages: Recon → Diagnose → Prescribe → Design Brief → Renovate) | `01-diagnose.md`, `02-prescription.yml`, `03-design-brief.md` |
| `wip/big-blueprint` | Stage 2 Design Principles (what this CAN'T do) and Stage 4 Fact-Check discipline — the bc-subs case-study lesson | `DESIGN-PRINCIPLES.md` |
| `wip/bc-subscriptions` | ADR discipline, synthesis-ID-in-commit-message traceability, site-as-prototype review model | `decisions/`, the redesign branch itself |

## Deferred (per Option B "lean" scope)

These are real disciplines from the bc-subs pattern that are out of scope for the v3 redesign but should be revisited if the redesign's scope expands:

- **`tools/state-derive/`-equivalent** — mechanical capability-check tool that verifies blueprint claims against source code (does `/practice` route exist? does AEO payload lead with "Context Engineer"? are cut routes deleted?). For a 4-week portfolio redesign with a clear cut list, the cost of authoring the tool exceeds the cost of manual verification. Re-evaluate if v3.x scope grows beyond the current 5-phase plan.
- **Persona journeys** in `blueprint/journeys/` — useful when there are multiple distinct buyer personas with conflicting needs. For this redesign there's one primary audience (hiring managers / engineering peers looking for a context engineer), so persona-journey work would be ceremonial.

## How to review

1. Open the live preview at <https://redesign-v3-context-engineer.ninochavez-main.pages.dev> (currently shows v2; will show v3 once Phase 3 lands)
2. Read `DESIGN-PRINCIPLES.md` first — the explicit "won't" list is the most efficient way to understand the brief
3. Then the ADRs in `decisions/` in numeric order
4. Then the Phase 2 content drafts in `content/` for the actual words landing in code

Comments / pushback land as GitHub issues or PR comments against the `redesign/v3-context-engineer` branch.
