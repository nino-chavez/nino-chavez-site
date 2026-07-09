# Public Evidence Base — Survey (Stage 1)

Research register for the /ai enablement rebuild. Question per artifact: what it IS,
maturity signals, the self-serve action a stranger can take TODAY, which learn track(s)
it grounds (confirm/correct the goal-doc hypothesis), and the gaps a visitor clicking
through from /ai would hit. Every claim cites a `gh` command + result, an npm registry
read, or a live-URL probe with status. All probes run 2026-07-08.

## Headline findings (read first)

> **SUPERSEDED IN PART (2026-07-08 evening).** After this survey, the operator authorized
> publication and a sanitation scan cleared four repos: `specchain`, `claude-recall-cli`,
> `forge-brand`, `forge-site` are **now PUBLIC** (gitleaks full-history clean, no
> family/client/env leakage). `forge-signal` remains PRIVATE — held because its git
> history contains client deliverables and a GCP API key. Finding 1 below reflects the
> survey-time state; the current matrix delta is recorded in `01-diagnose.md` § D4
> addendum.

1. **Three of the goal doc's hypothesized grounding repos are PRIVATE** — a visitor
   clicking through would 404. `gh repo view` returns `"visibility":"PRIVATE"` for
   `specchain` (Builder), `claude-recall-cli` (Voice), `forge-signal` (Author/Strategist).
   The public grounding for those three tracks must be re-sourced.
2. **Only Blueprint is genuinely self-serve in one command.** npm package
   `@nino-chavez-labs/blueprint-cli@0.5.0` is real and was published today. Every other
   artifact is clone-and-build, sign-in-gated, marketplace-gated, or read-only docs.
3. **Two "live demo" claims don't survive contact.** `atelier.ninochavez.co` (200) is a
   docs index behind an OAuth sign-in wall, not an interactive demo. `askbc.ninochavez.co`
   (200) is a BigCommerce-merchant marketing page ("install from the App Marketplace"),
   not a chat a visitor can use.
4. **Two referenced surfaces are dead:** `forge.signalx.studio` (forge's own README docs
   badge) is `ENOTFOUND`; `labs.ninochavez.co` returns no response (cert failure, matches
   the appendix).
5. **ai-analyst-academy is real content behind a broken front door.** 333 files, a full
   phased curriculum + 18 labs — but its GitHub README is the default `sv` SvelteKit
   scaffold and its live deploy renders a bare title. The curriculum mission the goal doc
   attributes to it exists; the onboarding surface hides it.

---

## Per-artifact register

### Blueprint — STRONG (Architect + Strategist + Author)
- **Is**: a methodology + CLI that runs a product initiative end-to-end agent-assisted
  (research → strategic docs → prototype → fact-check → deploy), shipping one review portal.
- **Maturity**: last push 2026-07-08 (`gh api .../repos` pushed_at). npm
  `@nino-chavez-labs/blueprint-cli` latest **0.5.0**, registry `modified 2026-07-08T17:02Z`
  (registry.npmjs.org read: versions 0.2.0→0.5.0). 1 GitHub release; tags v0.1.0–v0.5.0 +
  three `dogfood-*` tags. README onboards a stranger cleanly (npm badge, quickstart,
  "evaluating for your team?" 5-min path, ADR links). METHODOLOGY.md canonical.
- **Self-serve today**: `npx @nino-chavez-labs/blueprint-cli init --name=my-initiative`
  (zero-install, Node 18+ / Claude Code). Live demo `blueprint.ninochavez.co` (200) is
  Blueprint applied to itself — doubles as "here's what the output looks like."
- **Grounds**: Architect (the doc pipeline / spec→docs→validate is the track's whole
  claim) — CONFIRMED. Also grounds **Strategist** (charter, prescription, roadmap,
  risk-register generation) and **Author** (BRD/PRD/ADR doc generation) — this is where
  the private `forge-signal` grounding gets replaced.
- **Gaps**: none material for a visitor. Requires Claude Code to actually run the pipeline
  (stated in README) — an install dependency, not a broken claim.

### Atelier — ADEQUATE as method/worked-example, THIN as "run it now" (Builder)
- **Is**: a self-hostable OSS template + 12-tool agent-interop protocol + reference app for
  mixed human/agent teams to co-author one canonical artifact without drift.
- **Maturity**: last push 2026-07-03. **0 releases, 0 tags** (`gh api releases`/`tags`
  empty) despite README claiming "v1 substrate shipped (M0–M7)". **No npm package** (npm
  search for atelier under the org returns only blueprint-cli). Docs are deep and
  well-structured (tiered "pick your path", for-reviewers.md, seven-layer doc map).
- **Self-serve today**: clone + read docs; run locally via `atelier init` / `atelier dev`
  — but those commands ship only inside the repo (no published binary), so it's a clone +
  local Supabase/Vercel stack, not a one-liner. Live `atelier.ninochavez.co` (200) is a
  **docs index + `Sign in →` OAuth wall**, not an interactive demo.
- **Grounds**: Builder — CONFIRMED but qualified: strong as a *worked example / methodology
  to read*, weak as a *tool a practitioner picks up in 2 minutes*.
- **Gaps**: the "live demo" a visitor expects is a sign-in wall; no released artifact;
  running it means standing up the stack.

### Ask BC — THIN as self-serve, real as shipped-app proof (Builder)
- **Is**: an AI store assistant for **BigCommerce merchants**, not a general chat.
- **Maturity**: `askbc.ninochavez.co` (200) is a marketing landing: "AI-powered store
  assistant for BigCommerce merchants. Install this app from the BigCommerce App
  Marketplace to get started."
- **Self-serve today**: none for a general visitor — interaction is gated behind owning a
  BigCommerce store and installing the marketplace app.
- **Grounds**: Builder — as *evidence a real agentic product shipped*, yes; as a
  *worked example a practitioner can open and try*, no. The goal doc's framing of Ask BC
  as an interactive Builder demo is CORRECTED: it's merchant-gated.
- **Gaps**: nothing a non-merchant visitor can do; not a copyable pattern.

### cortex — real shipped app, NOT pick-up-and-run (Builder evidence)
- **Is**: a local-first Mac app (Tauri v2 + SvelteKit + Rust + MLX) that captures
  screen/audio and does on-device OCR, transcription, semantic search, and RAG chat.
- **Maturity**: last push 2026-03-17. **2 stars** (highest in the set). **0 releases,
  0 tags** — no downloadable build. Strong architecture-level README (module map, stack
  table, `~/.cortex/` data model).
- **Self-serve today**: clone + build from source (Rust + Tauri + Swift-rs + whisper.cpp
  + Metal). Heavy; not a casual pickup.
- **Grounds**: Builder — as *proof of a complex shipped AI-native app*, strong; as
  self-serve, thin (no binary).
- **Gaps**: no release artifact; build barrier is high; 4 months since last push.

### ai-champions-kit — ADEQUATE→STRONG (Enterprise)
- **Is**: a copy-in library of Claude Code skills + subagents for people driving AI
  adoption inside a team/company; tiered (universal / content / code / champion).
- **Maturity**: last push 2026-04-17. 0 releases/tags — but it's a copy-in kit, so
  releases aren't the maturity signal; the install.sh + tier structure is. README onboards
  a non-engineer stranger well (defines "skill" vs "subagent", "who this is for", inventory:
  10 skills / 5 subagents / 5 templates / 1 migration example).
- **Self-serve today**: clone, then `./install.sh --tier universal` (then content/code/
  champion) copies into any project's `.claude/`.
- **Grounds**: Enterprise — CONFIRMED, cleanest track-to-artifact fit in the set.
- **Gaps**: clone-only (no one-liner remote install); 3 months since last push.

### agentic-ways-of-working — STRONG for the "method" layer (cross-cutting)
- **Is**: the transferable middle between dotfiles and an essay — one canonical
  `principles/working-style.md` + per-harness adapters (CLAUDE/AGENTS/GEMINI), the skills
  an agent runs, and the hooks that fire; extracted from a private setup, secrets stripped.
- **Maturity**: last push 2026-07-03. 0 releases (it's a clone + `install.sh`). README is
  the strongest-written in the set (names the highest-leverage rule, worked hook examples).
  Skills tree confirmed via `git/trees?recursive=1`: `deepen`, `diagnose`, `tdd`,
  `symbol-surgery`, `grill-with-docs`, `ship`, `zoom-out`, `write-a-skill`, + the full
  `blueprint-*` suite.
- **Self-serve today**: clone + `install.sh` symlinks into `~/.claude` and wires hooks.
- **Grounds**: the **method** cross-cut (spec→tasks→impl, worktree isolation,
  decision-bias, verification gates) that every track leans on. It is the public,
  scrubbed home of "the method" the goal doc names.
- **Gaps**: **contains no voice/recall/corpus tooling** — grep of the tree for
  voice|recall|corpus|poe matched only `skills/` paths. The Voice track cannot be grounded
  here; its tooling is private (see below).

### forge — WEAK as self-serve evidence (does NOT ground Author/Strategist as hypothesized)
- **Is**: an opinionated toolchain hypothesis for building apps with coding agents
  (finite component registries, server-first state, typed primitives).
- **Maturity**: last push 2025-12-24 (oldest priority repo, ~6.5 months). README is
  explicit: *"a personal experiment… Adoption by others is not a goal for Phase 1-2."*
  Status table: Foundation = *Current*; Extraction/Generation = *Planned*. The
  `forge new/test/deploy` CLI is aspirational (`forge feature` marked "future").
- **Self-serve today**: effectively none — no published CLI, and the README's own docs
  badge `forge.signalx.studio` is **dead (`ENOTFOUND`)**.
- **Grounds**: the goal doc hypothesized Author/Strategist → `forge-signal`, but
  `forge-signal` is PRIVATE and public `forge` is a stated not-for-adoption experiment.
  Author/Strategist grounding must move to Blueprint's doc pipeline (above).
- **Gaps**: dead docs domain; self-described as not-yet-adoptable; stale.

### ai-analyst-academy — real curriculum, broken front door (Explorer + Enterprise content)
- **Is**: a phased curriculum for learning to design human-AI systems / architect business
  automation. Tree confirms real content: `content/curriculum/phases/01-ai-literacy` →
  `02-workflow-engineering` → `03-agentic-orchestration`, plus 18 labs
  (`lab-1-persona-stress-test` … `lab-9-executive-pitch`, `capstone-project.md`). 333 files.
- **Maturity**: last push 2026-03-07 (4 months stale). Homepage set to
  `ai-operator-academy.vercel.app`. **README is the default `sv` SvelteKit scaffold**
  (38 lines, "Everything you need to build a Svelte project") — a stranger opening the repo
  sees boilerplate, not the course. Live deploy renders a bare "AI Operator Academy" title
  (SPA stub or incomplete render).
- **Self-serve today**: read the curriculum markdown on GitHub (the labs/lessons are
  legible), but neither the README nor the live URL delivers it as a usable course.
- **Grounds**: **Explorer** (Phase 1 "AI Literacy" is the closest thing to a beginner
  on-ramp in the whole base) and Enterprise/Strategist content (ROI, governance, executive
  pitch labs). Also a live **placement candidate** for mandate Q3 (it already carries the
  curriculum mission).
- **Gaps**: scaffold README + stub deploy bury real content; stale; name mismatch
  (repo `ai-analyst-academy` vs deploy `ai-operator-academy`).

### Signal Dispatch blog — STRONG narrative layer (Author + Voice)
- **Is**: the live writing surface (`ninochavez.co/blog`, 200) actively publishing on
  agentic engineering. Recent posts incl. "The Migration That Ate Two Columns" (2026-06-16),
  "Red Is the Good News", "The Gate Verifies the Work. It Never Looks at the Plan.",
  "When the Voice Guide Becomes the Problem" — several tagged "AI & Automation".
- **Self-serve today**: read it. The **voice guide is public**: `docs/signal-dispatch-voice-guide.md`
  in the `blog` repo (tree-confirmed) — a practitioner can copy the pattern.
- **Grounds**: Author (published essays = the writing evidence) and Voice (the public voice
  guide + the essay literally about maintaining a voice guide).
- **Gaps**: none as evidence; it's narrative, not a runnable tool.

---

## TRACK-GROUNDING MATRIX

| Track | Grounding artifact(s) | Self-serve entry | Evidence | What's missing |
|---|---|---|---|---|
| **Explorer** | ai-analyst-academy Phase 1 "AI Literacy" (only beginner on-ramp in the base) | Read curriculum md on GitHub; live deploy is a stub | **thin** | No usable front door — README is `sv` scaffold, deploy renders bare title; content is real but hidden. A dedicated Explorer entry must be built, not linked. |
| **Builder** | Atelier (clone + local stack), cortex (clone + build), Ask BC (BigCommerce-gated) | Clone-and-build or merchant-gated; no one-liner | **adequate** (as shipped-evidence) / **thin** (as pick-up-and-run) | The one true self-serve builder tool hypothesized (specchain) is **PRIVATE**; every public builder artifact needs a heavy local build or a BC store. |
| **Architect** | **Blueprint** (npm CLI + methodology + live self-demo) | `npx @nino-chavez-labs/blueprint-cli init` | **strong** | Nothing material; requires Claude Code to run the pipeline (stated). |
| **Strategist** | Blueprint strategic-doc generation (charter/prescription/roadmap/risk) | Same npm CLI; academy's ROI/governance/pitch labs | **adequate** | Hypothesized `forge-signal` is **PRIVATE**; strategy grounding rests on Blueprint's doc stage + academy labs, not a dedicated strategist tool. |
| **Author** | Blueprint doc generation (BRD/PRD/ADR) + Signal Dispatch essays + public voice guide | npm CLI; read blog + voice guide on GitHub | **adequate** | `forge-signal` (hypothesized) **PRIVATE**; no standalone authoring tool — grounding is Blueprint docs + the essay corpus. |
| **Voice** | Public `signal-dispatch-voice-guide.md` + "voice guide" essays | Read the voice guide + essays on GitHub | **thin→adequate** | The *tooling* (claude-recall-cli, the poe voice-corpus/stack) is **PRIVATE / machine-local**. A practitioner can read the method and copy the guide, but cannot install the recall/corpus loop. Method is public; the tool is not. |
| **Enterprise** | **ai-champions-kit** (tiered skills/subagents) + academy governance labs | Clone + `./install.sh --tier universal` | **adequate** | Clone-only (no remote one-liner); 3 months stale. Cleanest fit after Architect. |

**Net**: two tracks are safe to lead with self-serve (Architect: strong; Enterprise:
adequate). Author/Strategist are adequate only if re-grounded onto Blueprint's doc pipeline
(the hypothesized `forge-signal` is private). Voice and Builder are the exposure: their
strongest hypothesized artifacts (claude-recall-cli, specchain) are private, so both must
lean on read-only method (voice guide, worked examples) rather than a runnable tool — and
the surface must not badge them "install this" the way the old corpus over-promised.
Explorer is thin as expected — real Phase-1 content exists in the academy but has no usable
front door; an Explorer on-ramp is build-not-link.

---

## Probe log (verification trail)

| Target | Method | Result |
|---|---|---|
| all public repos | `gh api users/nino-chavez/repos --paginate` | 20 repos; priority set present except specchain/recall (private) |
| specchain / claude-recall-cli / forge-signal | `gh repo view --json visibility` | all **PRIVATE** |
| @nino-chavez-labs/blueprint-cli | registry.npmjs.org read | latest **0.5.0**, modified 2026-07-08T17:02Z; versions 0.2.0–0.5.0 |
| atelier npm | npm registry search | no atelier package (org publishes only blueprint-cli) |
| releases/tags | `gh api .../releases` + `.../tags` | blueprint: 1 release, 9 tags. cortex/atelier/champions-kit/agentic-ways: **0/0** |
| blueprint.ninochavez.co | WebFetch | 200 — live product page, real npx quickstart |
| atelier.ninochavez.co | WebFetch | 200 — docs index + `Sign in →` OAuth wall (not an interactive demo) |
| askbc.ninochavez.co | WebFetch | 200 — BigCommerce merchant marketing page ("install from App Marketplace") |
| ai-operator-academy.vercel.app | WebFetch | loads bare "AI Operator Academy" title only (stub/SPA) |
| forge.signalx.studio | WebFetch | **ENOTFOUND** (dead DNS; it's forge's own README docs badge) |
| labs.ninochavez.co | `curl -sI` | no response (cert failure — matches appendix) |
| ninochavez.co/blog | WebFetch | 200 — live, recent AI/agentic posts; latest 2026-06-16 |
| voice guide public | `gh api blog tree` | `docs/signal-dispatch-voice-guide.md` present in public blog repo |
| ai-analyst-academy content | `gh api tree` | 333 files; real phased curriculum + 18 labs; README = default `sv` scaffold |
| agentic-ways-of-working skills | `gh api tree` | full skill suite present; **no voice/recall/corpus** tooling |
