---
persona: craft-practitioner
role: pilot
jtbd:
  - surface: ai-learn-builder
    time_budget: "two minutes from landing to a concrete next action (goal-doc success criterion)"
    job: "Find my craft persona, follow its demonstrated path, adopt the tools self-serve"
    acceptance: "I leave with a persona match, a track entry, and a self-serve action (install / clone / read-and-copy) whose demonstrating shipped artifact is one click deep and actually loads"
---

# Craft practitioner (PILOT)

Schema: `$BLUEPRINT_HOME/template/docs/methodology/personas-template.md`. Expands
`blueprint.yml pilot_profile:` (locked 2026-07-08, ADR-0001). This surface has no
transaction, so the canonical Buy stage is replaced by Adopt (the practitioner
"pays" with practice change); noted per the template's amendment rules.

**Profile**: Practitioner applying AI to the craft they already have, using Nino's
demonstrated paths and tools as the map (`blueprint.yml pilot_profile.display_name`).
**Walkthrough citation**: `docs/AI-INITIATIVE-GOAL.md` (§ Appendix, 2026-07-08 audit)
+ the old corpus's persona taxonomy (`src/routes/ai/learn/**`) + Stage 0 re-probe
(`../current-state/00-capture-manifest.md`).
**Monetization side(s)**: `operator` at every stage — they operate their own work
with AI; no stage hands them to a selling motion.

| Stage | Goal | Pain | Tool today | Monetization side | Cross-side cost |
|---|---|---|---|---|---|
| Discover | Find an applied-AI practice worth copying, from a source that ships | Search/social surfaces tool tutorials and hype threads, not demonstrated practice; /ai is unreachable by construction (noindex + zero inbound links — funnel doc §1) | simonwillison.net, X/HN threads, vendor docs | operator | None |
| Diagnose | Locate themselves — "what kind of work am I doing, and which path applies?" | Tool-first tutorials skip diagnosis entirely; they fail at knowing what kind of work they're doing, not at prompts (goal doc § Goal) | None — this is the underserved step (competitive walkthroughs doc) | operator | None |
| Try | Open a worked example and see the method produce the artifact | Old corpus asserts application without showing it; both "Live" demos dead at audit time (appendix #1, #3) | Reading essays; cloning random repos | operator | None |
| Adopt | Pick up a tool or method self-serve (install, clone, fork the method repo) | Old CTAs are mailto-your-homework — implies a review service that isn't operated (appendix, structural) | npm/GitHub directly, without the connecting path | operator | None |
| Return / expand | Come back for what's new (essays, new tools, updated paths) | A frozen surface gives no reason to return; old corpus's half-life was ~6 months (goal doc § Freshness) | Blog RSS, GitHub follows | operator | None |

**Notes**:
- Seven sub-profiles from the old corpus taxonomy (Explorer / Builder / Architect /
  Strategist / Author / Voice / Enterprise) are craft-specializations of this one
  persona, not separate personas — the taxonomy is the Diagnose-stage instrument
  (verbatim definitions: `../current-state/old-corpus-inventory.md`).
- The two-minute success criterion (goal doc § Success criteria) binds at Diagnose:
  a concrete next action within two minutes of landing.
- **Out of scope, recorded here so no third persona file implies otherwise**:
  family/Zoey (Ask Dad) is a private artifact, off the public surface entirely per
  `blueprint.yml pilot_profile.out_of_scope_pilots`. Only design consequence: no
  public surface may embed the Zoey-hardcoded persona prompt
  (`src/lib/server/askdad/system-prompt.ts:20`, appendix #2); the public "Ask"
  relaunch-or-kill decision is Stage 2's, and family use never justifies a public
  surface.
