---
stage: 1
task: A — local depth survey
captured_on: 2026-07-08
method: read-only survey of ~/Workspace/dev; every claim cites a path (+line) or git/curl/npm output run 2026-07-08
register: internal research
---

# Evidence base — local depth behind the /ai artifacts

For each local project the `/ai` surface could point at: what it is, how mature it is
(git recency + docs + tests), what it demonstrates about AI-native practice, and whether
the local reality **supports or undercuts** the public claim. Persona→artifact map is from
`docs/AI-INITIATIVE-GOAL.md:37-40`.

## Verdict summary

| Project | Last commit | Depth | Live/dist state | Track it grounds | Verdict |
|---|---|---|---|---|---|
| tools/blueprint | 2026-07-08 | Deep (84 waves, 20 reviewers, npm 0.5.0) | blueprint.ninochavez.co ✓200; npm `@nino-chavez-labs/blueprint-cli@0.5.0` ✓ | Architect | **SUPPORTS (strongest)** |
| wip/atelier | 2026-07-03 | Deep (106 commits, ADRs, tests, M0–M7) | atelier.ninochavez.co ✓200 | Builder | **SUPPORTS** |
| wip/ask-bc | 2026-05-24 | Deep (82 commits, DO+Worker, 29 tools) | askbc.ninochavez.co ✓200 | Builder | **SUPPORTS** (6wk stale, live) |
| tools/claude-recall-cli | 2026-07-03 | Solid (SQLite/FTS5, py tests, the Poe machinery) | CLI, local slash commands | Voice | **SUPPORTS** |
| tools/forge-signal | 2026-06-16 | Solid (30 commits, 4 modes = voice taxonomy) | CLI, dist/ | Author/Strategist | **SUPPORTS** |
| tools/forge-brand | 2026-05-23 | Solid (16 commits, 4 real test files) | CLI | Author/Strategist (secondary) | **SUPPORTS (secondary)** |
| tools/forge-site | 2026-06-09 | Moderate (knowledge artifact, no runtime) | docs-as-product | method (site builds) | **SUPPORTS as method, not app** |
| tools/specchain | 2026-07-05 | Moderate (8 commits, method + slash cmds) | npx create-specchain | Builder/method | **SUPPORTS as method, not app** |
| apps/labs | 2026-05-06 | Real code (119 commits, Turborepo) but… | labs.ninochavez.co ✗ **cert expired** | (Build demo target) | **UNDERCUTS** |

---

## tools/blueprint — the Architect track's evidence, and the strongest artifact here

**What it is.** A packaged agent-assisted product-delivery methodology: research → BRD/PRD-class
docs → prototype → validated handoff, released in numbered "waves"
(`METHODOLOGY.md:1-15`). Ships as an installable CLI (`package.json` name
`@nino-chavez-labs/blueprint-cli`, version `0.5.0`, bin `blueprint`), a `template/`
scaffolder (`stamp.mjs`), reviewer agents, and four internal packages
(`packages/`: design-tokens, gate-derive, ui, portal).

**Maturity (high).** Last commit `338913b 2026-07-08` (`git log -1`). WAVE-LOG.md holds
**83 wave entries up to Wave 84** (`grep -cE '^- Wave'` = 83; max = 84) — a live, dated
change history spanning wave 8 (2026-05-26) through wave 84. **20 reviewer agents**
shipped as `.md`+`.mjs` pairs under
`template/.claude/agents/blueprint/reviewers/` (incl. `research-sibling-scanner.md`,
`portal-chrome-canonical-reviewer`, `stateful-claim-lint-reviewer`,
`prescription-evidence-reviewer`). Four ADRs in `decisions/` (00-charter →
03-portal-type-naming). Published on npm **verified live**: `npm view
@nino-chavez-labs/blueprint-cli version` → `0.5.0` (matches local). Portal live:
`curl https://blueprint.ninochavez.co` → **HTTP 200**. A live consumer registry
(`consumers.yml`) enumerates ~14 initiatives (rally-hq, blog, atelier, photography,
two de-named commerce initiatives, one external non-Nino adopter).

**Demonstrates.** The First Principle — "agent struggle is a missing capability, so encode
it into the repo" (`METHODOLOGY.md:24-56`) — is the single best public proof of AI-native
*practice as method*: every wave is a failure converted to durable infrastructure (reviewer,
sensor, schema field). This is exactly the "method is the transferable part" input
(`AI-INITIATIVE-GOAL.md:41-44`).

**Verdict: SUPPORTS (strongest).** Public claim "Blueprint (npm CLI + blueprint.ninochavez.co)"
is fully backed — CLI published, portal live, methodology deep and actively maintained.
One **currency caveat**: `METHODOLOGY.md:7` still lists `website-nc-v3` as a consumer, but
that initiative was removed (repo CLAUDE.md, c5754ed); `consumers.yml` line
`nino-chavez/ninochavez.co` is "operator-declared, NOT locally verified." Minor staleness in
the doc; the machinery itself is real.

## wip/atelier — the deepest Builder artifact, live and documented

**What it is.** Self-hostable OSS template + a 12-tool agent-interop protocol + a reference
prototype for mixed human/agent teams concurrently authoring one canonical artifact without
drift (`README.md:1-3`). Three engagement tiers, all v1 (`README.md:9-13`).

**Maturity (high).** Last commit `d1aec33 2026-07-03`; **106 commits** (`git rev-list --count`).
"v1 substrate shipped (M0–M7 done as of 2026-05-03)" with a cited milestone-exit audit
(`README.md:12`). Tests present: `prototype/__smoke__/*.dom.spec.ts`, `prototype/e2e/a11y`,
`tools/scenario-results/index.test.ts`. Dense ADR corpus referenced inline (ADR-007…ADR-046).
Live: `curl https://atelier.ninochavez.co` → **HTTP 200**. Pinned methodology 0.4.0 in
`consumers.yml` (bespoke portal, ADR-001).

**Demonstrates.** Agent-interop / multi-surface coordination — the "hive becomes atelier"
substrate. Grounds Builder with a *live, forkable* system, and doubles as evidence for the
freshness thesis (it has a `docs/for-reviewers.md` concentrated-pitch pattern the /ai front
door could borrow).

**Verdict: SUPPORTS.** Live, deep, self-documented for the reviewer case.

## wip/ask-bc — sophisticated live agentic app (Builder)

**What it is.** Production-grade agentic assistant for e-commerce (targets BigCommerce):
Next.js on Vercel + Cloudflare Worker + Durable Object per store, Haiku 4.5 / Sonnet 4.6
model routing, 29 BC API tools (22 read / 7 write), generative UI (7 inline React blocks),
two-turn confirmation before any mutation, Codemode sandbox for read tools (`README.md:1-40`).

**Maturity (high, slightly stale).** Last commit `4cafbc6 2026-05-24` (~6 weeks before survey);
**82 commits**. No test directory found (`find` for `*.test/*.spec/tests/` → none). Live:
`curl https://askbc.ninochavez.co` → **HTTP 200**.

**Demonstrates.** The most architecturally advanced agentic pattern in the corpus —
tool-use, sandboxed codegen, DO state, confirmation gating. Strong Builder-track worked
example.

**Verdict: SUPPORTS.** Claim (askbc.ninochavez.co live) holds. Flag the 6-week idle + absent
tests if the surface asserts "actively maintained."

## tools/claude-recall-cli — the Voice/recall practice, made real

**What it is.** Save/search reusable session entries via `/recall` + `/recall-scan` global
slash commands, backed by SQLite + FTS5 (`README.md:1-3`). Also houses the **Poe voice-stack
machinery** (`poe-extract.py`, `poe-preamble.md`) and `artifact-miner.py` (mines transcripts
for created-and-survived artifacts).

**Maturity (solid).** Last commit `aacffcf 2026-07-03`. Python tests present
(`test_classify_situation.py`, `test_prompt_hook_recency.py`). Has `IMPLEMENTATION.md`,
`ROADMAP.md`, one-line curl install.

**Demonstrates.** This is the actual engine behind the "voice corpora + recall" method the
goal doc names for the Voice track (`AI-INITIATIVE-GOAL.md:38-39,41-44`) — and behind the
Poe stack referenced in the global CLAUDE.md. When /ai says "voice corpus / recall practice,"
this repo is the demonstrating artifact.

**Verdict: SUPPORTS.** The claim's substrate is here and current.

## tools/forge-signal — Author/Strategist grounding

**What it is.** Voice-aware content generation with **four content modes** (Thought Leadership,
Solution Architecture, Executive Advisory, Documentation) each carrying its own voice rules
(`README.md:9-16`) — i.e. the CLAUDE.md content-mode taxonomy made executable. Multi-provider,
multi-format export, demo-reel TTS workflow.

**Maturity (solid).** Last commit `4d9357c 2026-06-16`; **30 commits**; has `dist/`. No test
dir found. Named as one of Blueprint's three integration tools (`METHODOLOGY.md:19`).

**Demonstrates.** The "Author/Strategist → forge-signal" mapping (`AI-INITIATIVE-GOAL.md:39-40`)
is real: the modes are the voice guide's modes, and the engine consumes brand-kit bridges.

**Verdict: SUPPORTS.**

## tools/forge-brand — secondary Author/Strategist evidence

**What it is.** CLI design-agency toolkit: one brand-kit JSON drives tokens/media/components/docs
(`README.md:1-3`); AI generators need `OPENROUTER_API_KEY`.

**Maturity (solid).** Last commit `cbf2b67 2026-05-23` (oldest of the forge trio); **16 commits**.
**Real tests**: `tests/{schema,extractors,review,exporters}.test.ts`. First link in the forge
chain (brand-forge → signal-forge → forge-site per global CLAUDE.md).

**Verdict: SUPPORTS (secondary).** Solid but the least AI-visible of the trio for a practitioner
audience; best cited as the brand-kit source the others consume, not a headline.

## tools/forge-site — method, not a running app

**What it is.** Explicitly a **knowledge artifact — "No runtime, no database, no build step"**
(`README.md:5-9`): 5 archetypes + 12 modules + a 5-step playbook, plus one helper
(`scripts/compile-prompt.mjs`). Agent-driven client-site "renovation" process.

**Maturity (moderate).** Last commit `025e46b 2026-06-09`; **16 commits**. It is docs by design;
"maturity" is coverage, not code.

**Verdict: SUPPORTS as method, not app.** Honest presentation: point at it as a *playbook*
(the spec→archetype→module method), never imply a live tool. Undercuts if framed as software.

## tools/specchain — the spec→tasks→implementation method

**What it is.** Spec-driven dev workflow: `/spec` chains init→spec→implement with gates,
`/audit-spec` seeds specs from a 9-category codebase audit, crash recovery, remediation loop,
bidirectional traceability (`README.md:1-19`). Distributed via `npx create-specchain`.

**Maturity (moderate).** Last commit `79d8772 2026-07-05`; only **8 commits** (has a `test/`
dir and worked `examples/user-profile/`). Named as a Blueprint integration tool
(`METHODOLOGY.md:18`) and the origin of the spec→tasks→implementation method the goal doc
calls out (`AI-INITIATIVE-GOAL.md:41-42`).

**Verdict: SUPPORTS as method, not app.** It is the method itself — cite it as the
spec→implementation pipeline; low commit count means "stable small tool," not "abandoned."

## apps/labs — the one that UNDERCUTS

**What it is.** Turborepo monorepo (119 commits) hosting the labs landing, **Code to Cognition**
(the Spring→agentic learning app), and **CIQ / Commerce Intelligence Quotient**
(`README.md:1-22`). This is the "Build project" home the old /ai page links to.

**Maturity (real code, dead surface).** Last commit `1f7c3a8 2026-05-06` (~2 months stale).
**Live site is DOWN**: `curl https://labs.ninochavez.co` → SSL **certificate has expired**
(`ssl_verify=10`, HTTP 000) — verified 2026-07-08, matching the audit
(`AI-INITIATIVE-GOAL.md:248,275`). The README advertises
`labs.ninochavez.co/code-to-cognition` as live (`README.md:9-12`), but the expired cert means
nothing loads — this is precisely the /ai/build → /code-to-cognition dead link (audit finding
#3). CIQ actually lives on a different domain (`ciq.signalx.studio`, `README.md:19-22`).

**Verdict: UNDERCUTS.** The local code is substantial, but the *public artifact the /ai surface
points at is broken*. This is the strongest argument for the goal doc's Freshness §2 "sensors
fail loudly" (a cert-expiry probe would have caught it). The initiative must either fix/retire
the cert before pointing at labs, or cite `ciq.signalx.studio` directly and drop the dead
`/code-to-cognition` link.

---

## Not surveyed locally (flagged gaps)

Named in the persona→artifact map but **not present in the Task-A local set**, so their depth
is unverified on this machine — treat as public-repo claims until checked:
- **ai-champions-kit** (Enterprise track anchor, `AI-INITIATIVE-GOAL.md:39`) — no local
  workspace copy surveyed; public repo only.
- **cortex** and **forge** (image-gen) (`AI-INITIATIVE-GOAL.md:38,168`) — not in the local
  survey scope; the forge *family* surveyed here is brand/signal/site.
The Enterprise track therefore has **no locally-verified evidence base yet**; Stage 2 must
either pull ai-champions-kit locally or ground Enterprise in a surveyed artifact (Blueprint's
consumer-registry / fleet governance is the closest local candidate).
