# Initiative Goal — Rebuild ninochavez.co/ai as an evidence-backed enablement surface

Handoff for a new Blueprint initiative. Derived from the 2026-07-08 /ai content audit
(this doc's appendix) plus surveys of the public GitHub footprint (nino-chavez, 82 repos),
the local workspace (~/Workspace/dev), and the Signal Dispatch blog corpus.

Per the repo worktree rule (CLAUDE.md § Worktree / dual-track rule): the initiative
session operates in its own git worktree, not the shared checkout.

## Goal

Replace the /ai section — a Dec 2025 learning academy that is unlinked, noindexed,
stale, and fronted by two broken "Live" demos — with an enablement surface whose
organizing question belongs to the visitor, not to Nino:

> **"How can I use AI this way for my own work — given the personas, paths, tools,
> and evidence Nino has learned and demonstrated in his?"**

"How Nino works with AI" is the lens and the credibility substrate, not the goal.
The goal is that a practitioner leaves with a path they can follow for their own
craft. The reason this framing matters: the last two failure modes were each half of
it — the old academy taught paths *without* demonstrated evidence (asserted AI
application, dead demos), and a pure portfolio would show evidence *without* a
transferable path. The rebuild fuses them: paths as the product, shipped work as
the proof and the worked examples.

Build from four inputs that already exist and stay verifiable:

- **The pedagogy of the old corpus (the product)**: the persona-based "apply AI to
  the craft you already have" on-ramp (Explorer/Builder/Architect/Strategist/Author/
  Voice/Enterprise). Keep the taxonomy — persona diagnosis is a better entry than
  tool tutorials because newcomers fail at knowing what kind of work they're doing,
  not at prompts. Rebuild each track so the AI application is *shown, not asserted*.
- **Live artifacts (the evidence and worked examples)**: Blueprint (npm CLI +
  blueprint.ninochavez.co), Atelier (atelier.ninochavez.co), Ask BC
  (askbc.ninochavez.co), cortex, forge, ai-champions-kit, specchain,
  claude-recall-cli. Each track grounds in shipped work (Architect → Blueprint's doc
  pipeline; Voice → the voice-guide + corpus/recall practice; Enterprise →
  ai-champions-kit; Builder → Atelier/Ask BC/specchain; Author/Strategist →
  forge-signal + Blueprint doc generation).
- **The method (the transferable part)**: spec → tasks → implementation,
  verification gates, voice corpora, recall, worktree isolation — already public
  and scrubbed in the agentic-ways-of-working repo, which exists precisely to be
  adopted by someone else.
- **The writing**: Signal Dispatch essays (live at /blog), actively publishing on
  agentic engineering — the narrative layer connecting method to evidence.

The organizing test, applied to every surface: it must answer the visitor's "what
can I do with this for my work?" — and back that answer with a demonstrated
artifact. "Show me what you've shipped" remains the evidence standard; it is no
longer the headline.

## Mandate — the three questions the stream answers

The initiative exists to answer, in order:

1. **What needs to exist** — which personas, paths, tools, and evidence make the
   pilot's question answerable; what gets built, mined from the old corpus,
   rebuilt, or cut. Owner: Stage 1 Diagnose + Stage 2 Prescription. The appendix
   and input corpus are raw material, not the answer.
2. **How it needs to be presented** — IA, narrative order, voice, design bar.
   Owner: Stage 3 Design Brief (+ Stage 4 prototype if the brief justifies one).
   The design bar is set by audience, not architecture: a practitioner judges the
   whole practice by this surface, so it clears the flagship bar
   (signal-frontend-designer workflow, voice guide loaded before prose).
3. **Where it should live** — placement is a decision, not an inherited fact.
   /ai on ninochavez.co is the incumbent candidate, but the old corpus partly
   died of placement (unlinked, noindexed, orphaned inside a portfolio site),
   so the incumbent doesn't win by default. The prescription must weigh at
   minimum: /ai integrated into the main-site nav; a dedicated subdomain
   (labs.ninochavez.co precedent); an existing property (ai-analyst-academy
   repo already carries the curriculum mission); or a split (paths on one
   surface, evidence on another). Owner: Stage 2 Prescription, recorded as an
   ADR with an explicit why-not-incumbent sentence — silence is not a choice.

Everything under "Prescription priors" below — including the proposed IA and the
/ai placement itself — is input to these three questions, not answers. The stream
re-derives; where its evidence lands elsewhere, the prior loses.

## Freshness architecture — the surface tracks a moving target

The practice this surface describes is under constant development; a hand-written
snapshot of it starts dying the day it ships (the old corpus's half-life was ~6
months). Freshness is therefore an architectural requirement, not an editorial
habit: a design that needs a human to remember to update it fails acceptance.

Three lanes, by decay rate:

1. **Derived (automatic, no review)** — anything with a canonical source elsewhere
   is rendered, never restated. Project cards from the GitHub API (description,
   pushedAt, README excerpt) at build time; writing from the blog index/RSS;
   method content from the agentic-ways-of-working repo. A push to the canonical
   source updates the surface on the next build. Builds run on a schedule, not
   only on site-repo pushes — the old corpus rotted precisely while this repo
   was idle.
2. **Sensed (fail loudly)** — what can't be derived is monitored: a scheduled
   link checker + live-demo probes (HTTP status, cert expiry — would have caught
   every Broken finding in the appendix), plus a claim lint forbidding volatile
   facts (model IDs, stats, versions) in prose. Volatile facts live in data files
   with a `verified:` date; entries past a threshold fail CI. The surface renders
   honest "last verified" stamps so an aging claim self-flags instead of silently
   lying.
3. **Agentic refresh (agent proposes, operator merges)** — the audit behind this
   doc's appendix is repeatable; encode it as a scheduled agent job: survey
   GitHub/workspace deltas since the last run, draft content updates, open a PR.
   Derived data flows automatically; prose changes go through review because the
   voice and design bar are human-judged. This lane is also positioning: an
   enablement surface about working with AI that maintains itself through agents
   is its own strongest evidence for the pilot.

Consequences for the mandate: question 3's placement decision must support
build-time derivation and scheduled jobs, and the refresh pipeline is a Stage 2
deliverable — part of "what needs to exist," not a post-launch nice-to-have.

## Variant / Pattern / Tier

- **Variant: brownfield** — live product (Q1 yes), no in-flight build (Q2 no),
  audit-first (Q3 yes). Stage 1 Diagnose is substantially pre-paid by the appendix.
- **Pattern: Review Portal (redesign-review-portal, Pattern B)** — single-product
  redesign; reviewers compare current vs proposed per-page.
- **Tier: 1** (default for redesign-review work). Promotion to Tier 2 happens when
  the rebuilt /ai surfaces ship into the live SvelteKit app.

## blueprint.yml seed

```yaml
project:
  name: "AI Practice Surface Rebuild"
  description: "Rebuild ninochavez.co/ai into an evidence-backed enablement surface: personas, paths, and tools a practitioner can apply to their own work, proven by Nino's shipped artifacts"
  product: "ninochavez.co"
  audience:
    leadership: ["Nino (owner)"]
    engineering: ["peer practitioners evaluating the tools"]
    broader: ["prospective clients / employers"]

product_type: ""            # end-user marketing surface, not a dev tool

variant: brownfield

pilot_profile:
  slug: "craft-practitioner"
  display_name: "Practitioner applying AI to the craft they already have, using Nino's demonstrated paths and tools as the map"
  pain_point: "They know AI matters for their work, but generic tutorials teach tools rather than their craft; they need an entry path grounded in someone's real, demonstrated practice — personas to locate themselves, paths to follow, tools they can pick up self-serve, and shipped evidence that the path actually works."
  monetization_side: "operator"  # the practitioner operating their own work with AI;
                                 # downstream buyers (clients/employers impressed by the
                                 # surface) are a byproduct, not the pilot
  walkthrough_citation: "docs/AI-INITIATIVE-GOAL.md § Appendix (2026-07-08 audit: every claim probed against live URLs, repo code, and workspace/GitHub surveys) + the old corpus's own persona taxonomy (src/routes/ai/learn/**), which encodes the same visitor"
  competitors_in_scope: []     # derive in Stage 1 FROM this pilot; candidates to test:
                               # where this practitioner currently goes to learn applied
                               # AI practice (simonwillison.net, promptingguide.ai,
                               # Every / "how I use AI" essays, ai-analyst-academy
                               # comparables, vendor academies)
  out_of_scope_pilots:
    - "Evaluator judging whether Nino's AI-native claim is real (client/employer) — served as a byproduct: the evidence that enables the practitioner also proves the claim; it is not the organizing lens"
    - "Family/Zoey (Ask Dad) — private artifact, off the public surface entirely"

execution:
  depth: standard
```

## Input corpus (what Stage 1 reads)

| Input | Where | Role |
|---|---|---|
| 2026-07-08 audit | Appendix below | Diagnose raw material (verified) |
| Old /ai corpus | `src/routes/ai/**` (~5,700 lines, 13 pages) | Legacy content to mine, not a template |
| Ask Dad backend | `src/lib/server/askdad/**`, `src/routes/api/ask/chat/` | Relaunch-or-kill decision input |
| Public repos | github.com/nino-chavez: blueprint, atelier, agentic-ways-of-working, ai-champions-kit, cortex, forge, ai-analyst-academy | The evidence base |
| Local projects | ~/Workspace/dev: tools/blueprint, tools/specchain, tools/claude-recall-cli, tools/forge-*, wip/atelier, wip/ask-bc, apps/labs | Depth behind each artifact |
| GitHub profile README | github.com/nino-chavez/nino-chavez | The positioning statement the site must match ("AI-native engineer. Agents are how the work gets done.") |
| Signal Dispatch | ninochavez.co/blog (+ apps/blog source) | Writing surface; freshest AI content |
| Voice | apps/blog/docs/signal-dispatch-voice-guide.md + content-mode taxonomy | All prose drafts load this first |

## Prescription priors (Stage 2 re-derives; these are this audit's conclusions, citable not binding)

1. Section becomes discoverable: linked from main nav, `noindex` dropped. A hidden
   showcase is a contradiction — the current section serves direct-URL visitors only.
2. Proposed IA: `/ai` front door framed as the visitor's question ("you can work
   this way — here's the map, drawn from what I've actually done") → `/ai/learn`
   (the persona on-ramp as the primary surface; method and curriculum collapse into
   one) → `/ai/work` (live artifacts as evidence and worked examples supporting the
   paths, data-driven from one array) → link `/blog`. Learn leads because the pilot
   is the practitioner; work supports rather than headlines.
3. CTAs become self-serve (repos, live demos, essays) — the old mailto-your-homework
   model implies a review service that isn't operated.
4. Ask: kill or relaunch, no middle. Relaunch requires a public persona prompt (the
   current one is hardcoded to Zoey), a current model (pinned `claude-sonnet-4-20250514`),
   and working server routes. The family version survives privately (ask-dad repo).
5. Cut: `/ai/learn/corpus` stub ("Coming Soon" since Dec 2025), the 25-term glossary,
   the seven duplicated page templates (one data-driven template instead).
6. Freshness per § Freshness architecture — derivation, sensors, and the agentic
   refresh loop are Stage 2 deliverables, because the old corpus died of unsensed
   rot (Blueprint First Principle: encode the missing capability, don't re-author
   harder).

## Prerequisites that live in the main repo, outside the initiative

1. ~~`svelte.config.js` route exclusion~~ FIXED in diagnosis 2026-07-08: the real
   cause of the sitewide `/api/*` 404s was the `apps/router` Worker forwarding
   `/api/*` to the blog (`router/src/index.ts:43`, dead config — the blog has no
   API routes). Fixed by removing `'/api'` from the router's blog prefixes; the
   Pages origin already served the APIs correctly.
2. Dead `signaldispatch.co` links (domain has no DNS) on /ai and /ai/learn footers;
   the blog lives at /blog. FIXED 2026-07-08.
3. Repo CLAUDE.md references a `blueprint/` initiative directory that was removed
   (c5754ed) — update when the new initiative is declared.

## Success criteria

- Every claim on the surface is verifiable at read time: a live link, a public repo,
  or a published essay. Zero "Coming Soon", zero unverifiable statistics.
- Each learn track demonstrates its AI application with a real shipped artifact.
- Section is linked, indexed, and consistent with the GitHub profile positioning.
- No hardcoded model IDs or vendor doc URLs in page copy; volatile facts live in
  data files with the staleness gate covering them.
- A quarter of site-repo inactivity does not rot the surface: derived content
  refreshes on schedule, sensors fail loudly before a visitor meets a dead link,
  and the agentic refresh job has opened at least one merged update PR.
- The pilot's question — "how can I use AI this way for my work?" — yields a
  concrete next action within two minutes of landing: a persona match, a track
  entry, a tool they can install, or a worked example to copy — all self-serve,
  with the demonstrating artifact one click deep.
- The secondary audience (evaluating client/employer) gets the credibility proof
  as a byproduct of the same evidence, with no separate surface needed.

## Out of scope

- Whole-site redesign. The audit suggests broader positioning drift (the section is
  the site's most differentiated content and it's hidden), but this initiative scopes
  to the enablement surface — wherever mandate question 3 lands it — not the rest of
  ninochavez.co; a follow-up initiative may generalize from its outcome.
- Operating a mentorship/review service (the old CTA model).
- The private Ask Dad family deployment.

---

## Appendix — 2026-07-08 /ai audit (walkthrough citation)

Method: four-agent sweep (page-copy inventory ×2, workspace survey, GitHub survey)
plus direct probes of live URLs and repo code. All probes run 2026-07-08.

### Broken / inaccurate

| # | Finding | Evidence |
|---|---|---|
| 1 | "Ask" badged **Live**; dead in prod | `/api/ask/chat` 404 live (as do `/api/person.json`, `/api/contact.json`). Root cause (verified 2026-07-08 evening): the `apps/router` Worker forwarded ALL `/api/*` to the blog Pages project (`router/src/index.ts:43`), which has no API routes. The Pages origin itself serves the APIs correctly (`ninochavez-main.pages.dev/api/person.json` 200; ask/chat returns validation JSON, env keys configured). Earlier attribution to `svelte.config.js:11` was falsified by a local `wrangler pages dev` smoke test — the adapter config is harmless |
| 2 | Public "Virtual Nino" is the private Ask Dad prompt | `src/lib/server/askdad/system-prompt.ts:22` hardcodes "You're talking to Zoey, Nino's 19-year-old daughter" |
| 3 | Second Build project also dead | `/ai/build` → `/code-to-cognition` 404s (route absent from repo); real home labs.ninochavez.co has an expired SSL cert |
| 4 | Dead footer link | "Read my writing" → signaldispatch.co, domain has no DNS; blog is live at /blog |
| 5 | Wrong deploy claim | Build page says Ask Dad runs on Vercel; site is Cloudflare Pages (wrangler.toml) |
| 6 | Stale models | Chat pins `claude-sonnet-4-20250514` (`api/ask/chat/+server.ts:129`); glossary cites "GPT-4, Claude 3" as current exemplars |
| 7 | Mislabeled/moved links | builder track: "Anthropic Safety Guide" → prompt-caching URL (~:212); sdk.vercel.ai → ai-sdk.dev; cursor.sh → cursor.com; docs.anthropic.com paths reorganized |

### Stale

- Section frozen Dec 2025/Jan 2026 (git log); ~40 of the account's repos active in 2026.
- `/ai/learn/corpus` "Coming Soon" for 7 months, fronted by unverifiable precision
  (882,786 words / 6 projects / 5 skills) inconsistent with the learn page's own counts.
- Enterprise track states Claude Skills spec limits as fixed facts with no source.

### Structurally misaligned

- All 13 pages `noindex, nofollow`; zero inbound links from the main site.
- 7 learn tracks are one copy-pasted template (~5,700 lines, no shared component);
  contact email and shared copy duplicated across up to 7 files.
- Academy framing (personas × 5 levels × mailto-homework CTAs) vs actual public
  positioning (practitioner infrastructure). The persona *taxonomy* is sound — "apply
  AI to the craft you already have" — but pages assert the AI application rather than
  show it; the concrete AI mechanics concentrate in Builder and Enterprise only.

### Missing (all live now, none referenced on /ai)

Blueprint (npm + blueprint.ninochavez.co ✓200), Atelier (atelier.ninochavez.co ✓200),
Ask BC (askbc.ninochavez.co ✓200), agentic-ways-of-working, ai-champions-kit, cortex,
forge, specchain, claude-recall-cli, CIQ/labs (labs.ninochavez.co ✗ expired cert),
Signal Dispatch essay stream, the spec→tasks→implementation method itself.
