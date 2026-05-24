# `/practice` — content draft

The differentiator page. Per `blueprint/03-design-brief.md` Compositions 1 → 4.

## Composition 1 — `hero-with-thesis`

> This is _how_ I work.

Italic violet emphasis on **how**. The page makes the *how* legible — toolchain artifacts (open repos), operating rules (the literal CLAUDE.md text), and instrumentation (hooks, classifiers, corpus).

Mono caption:

> Every claim on this page links to a public artifact. No methodology that isn't running. No tool that hasn't shipped. No rule that hasn't caught a real failure.

## Composition 2 — `toolchain-readout-grid` (#toolchain anchor)

Six instrument-readout cards in a 2-column grid (3 rows). Each card: title (bold) + one-line description + mono "what it enforces" caption + GitHub link pill.

### 1. forge family — `forge-brand` · `forge-signal` · `forge-site` · `gen-images`

One brand-kit JSON drives tokens, copy, images, and a site archetype. Four CLIs chain together: brand definition → CSS variables → voiced content → imagery → archetype-instantiated site.

> **Enforces:** brand drift is structurally prevented — every downstream artifact resolves to the same source JSON.

→ `github.com/nino-chavez/forge-brand` · `forge-signal` · `forge-site` · `gen-images`

### 2. specchain

Spec-driven development workflow for AI-assisted coding. Execution profiles, crash recovery, traceability between spec and implementation, multi-agent handoffs.

> **Enforces:** the spec is the durable artifact; the implementation is derived. Spec drift surfaces as a failing test, not a hallway conversation three sprints later.

→ `github.com/nino-chavez/specchain`

<!-- AEGIS Framework removed 2026-05-25: the referenced repo at
     signal-x-studio/aegis-framework returns GraphQL "Could not resolve to
     a Repository" — i.e., it does not exist. The /practice toolchain now
     leads with the canonical 5-link production line from the post
     "The Backport I Didn't Make" (specchain → big-blueprint → forge-brand
     → forge-signal → gen-images). AI code governance is a separate concern
     and will get its own card only if a real artifact exists to back it. -->

### 4. claude-recall-cli + Poe stack

Global `/recall` slash commands plus the voice-stack generator that builds the character sheet at the top of every session. 743 signals across 62 projects. SQLite + FTS5 underneath; the Poe stack is the serialized output that loads into every prompt.

> **Enforces:** corrections survive the session — past corrections inform future drafts, with measurable tone metrics (hedge rate, cheerleading rate, imperative-opener rate) as evidence the loop is closed.

→ `github.com/nino-chavez/claude-recall-cli`

### 5. ai-champions-kit

Shared Claude Code skills + subagents packaged for installation by others. 9 skills, 5 subagents, 5 templates. The practice transferred to other practitioners as a kit.

> **Enforces:** the practice is reproducible, not personal. If it only works for me, it isn't a practice.

→ `github.com/nino-chavez/ai-champions-kit`

### 6. big-blueprint

7-stage agent-assisted methodology for product-planning initiatives. Research → design principles → prototype → fact-check → docs → deploy → iterate. Extracted March 2026 from a 48-hour P&P initiative; A/B-tested at 70–80% quality in 10–15× less time, with six template gaps caught and re-tested. Used on Rally HQ (`blueprint.rallyhq.app`), `bc-subscriptions`, and the redesign of this site.

> **Enforces:** every product decision has a recorded source in the synthesis layer; planning state derives from artifacts, not whiteboard memory.

→ `github.com/nino-chavez/big-blueprint`

## Composition 3 — `operating-rules-stack` (#rules anchor)

Four rules from `~/.claude/CLAUDE.md`, quoted verbatim. Each rule: mono pill heading + body block + "Why" inset in italic with left-border violet rule.

### Rule 1 — Canonical-pattern-first for infrastructure

> When implementing infrastructure with a well-known canonical pattern — auth, payments, OAuth, sessions, queues, webhooks, file uploads, anything where the vendor publishes "the right way to do this" — default to the canonical pattern. Custom shapes must justify themselves explicitly against the canonical baseline.

> *Why:* a pre-spec check forces two reads — vendor docs + existing internal reference impl — before a custom shape ships. The "why not canonical" sentence in the spec is non-negotiable. Silence is not an acceptable answer.

### Rule 2 — Default to action, not confirmation

> Don't pause to ask which direction to take when the direction is obvious from the conversation. If we've been working on X and there's a natural next step on X, take it. Mid-task "continue or pause?" questions kill flow and read as timidity, not care. The user can interrupt at any time; they can't recover the time spent waiting for a green light on something that didn't need one.

> *Why:* there are three layers reinforcing this rule — the declarative text in CLAUDE.md, a `UserPromptSubmit` hook that injects voice context before Claude generates a response, and a `Stop` hook that blocks turns ending with hesitation patterns. See *Instrumentation* below.

### Rule 3 — Multi-session work isolation (worktrees mandatory)

> Any time more than one session has independent work in flight against the same repo, each session MUST operate in its own git worktree. For Agent tool invocations: pass `isolation: "worktree"`. No-change worktrees auto-clean; changed worktrees return path + branch in the result.

> *Why:* without this, parallel sessions switch each other's branches under each other's feet and commits land on the wrong branch. The rule is operational evidence of working at agent scale — not a theoretical concern.

### Rule 4 — Voice stack imports

> CLAUDE.md uses `@~/path` syntax to import `poe-preamble.md` + `stack.md` into every session. The serialized voice context is part of every prompt, not optional context.

> *Why:* the corpus only enforces voice if it's actually loaded. The import syntax makes that automatic.

## Composition 4 — `instrumentation-deep-dive` (#instrumentation anchor)

The most differentiating section. Three sub-blocks.

### Sub-block A — The three-layer hesitation fold (with diagram)

Full-width `hesitation-fold-diagram` SVG. Three boxes — `CLAUDE.md rule` (declarative) → `UserPromptSubmit hook` (predict) → `Stop hook` (correct) — connected by mono arrows, with one shared violet `classifier` node sitting beneath all three.

Caption below diagram:

> One classifier, three lifecycle points. The same `classify_situation()` runs at prompt-submit (predict), at end-of-turn (enforce), and at session-end (extract). New patterns added to the classifier are automatically caught by all three layers.

Pull-quote (from `~/.claude/hooks/anti-hesitation.py` block message — the exact text Claude tells itself mid-session when caught):

> "Stop hook feedback: You ended your turn with a hesitation question — exactly the pattern that the CLAUDE.md 'decision bias' rule prohibits. Restate your closing as a status sentence describing the next move you're taking."

### Sub-block B — Poe corpus stats (readout)

`instrument-readout` card with mono numeric values:

> Corpus size: **743** signals
> Project coverage: **62** projects
> Median sentence length: **12** words (p90: 30)
> Hedge rate: **10.6%** (target: declining)
> Cheerleading rate: **1.7%** (target: declining)
> Imperative-opener rate: **11.7%** (target: rising)
> Validated turns (no correction): **6,397**

Caption:

> Quantitative voice card distilled from corrections in past sessions. The metrics are how I know the corpus is doing what it's supposed to do.

### Sub-block C — The adversarial test plan

Pull-quote from `~/.claude/poe/adversarial-test-plan.md`:

> "The deterministic surfaces (classifiers, query, extraction) have unit tests. This document tests the harder claim: **does the prompt hook actually change how Claude responds?**"

Mono caption:

> A documented control-versus-treatment protocol that proves the loop is closed. Most "I prompt Claude well" claims aren't testable. This one is.

→ `github.com/nino-chavez/claude-recall-cli` (look for `~/.claude/poe/adversarial-test-plan.md`)

## Composition 5 (optional) — `router-worker-footnote`

Small instrument-readout card at page foot:

> **Topology footnote.** ninochavez.co is served by a Cloudflare Worker (`ninochavez-router`, 47 lines) that routes the apex, `/photography`, and `/blog` through one entry point with 301s for the old subdomains. The router is its own artifact — `github.com/nino-chavez/nino-chavez-site/tree/main/apps/router`.

## Anti-uses (audit guard)

- No bullet list of "AI tools I use" (Cursor, Claude Code, etc.) — that's commodity; the differentiator is what's *built around* those tools
- No screenshots of prompt UIs — diagrams of the systems, not pictures of the chat
- No "AI productivity" claims expressed as percentages without methodology (e.g. "10x faster with AI" — meaningless without a comparator)
- No course / training pitch — `/ai/learn` was cut from the site for this reason
