# Appendix Validation — mechanical re-verification of the 2026-07-08 /ai audit

Scope: everything the Stage 0 probes did NOT cover. Live-endpoint claims (13/13 noindex,
`/api/ask/chat`, labs cert, `/code-to-cognition`, `signaldispatch.co`) are cited from
`00-capture-manifest.md`, not re-probed. Repo checks run against the initiative worktree
`/Users/nino/Workspace/dev/apps/website-nc-ai-initiative`. External URLs fetched 2026-07-08.
Verdict taxonomy: CONFIRMED / CONFIRMED-WITH-DELTA / REFUTED.

## Broken / inaccurate

| # | Finding | Verdict | Evidence |
|---|---|---|---|
| 2 | Public "Virtual Nino" = private Ask Dad (Zoey) prompt | **CONFIRMED** (line delta) | `src/lib/server/askdad/system-prompt.ts:20`: `**You're talking to Zoey, Nino's 19-year-old daughter.**`. File header `:1` "Virtual Nino: System Prompt for Ask Dad chatbot"; `:36` "## The Zoey Protocol". Appendix cited `:22`; actual quote is `:20` (trivial drift). |
| 5 | Build page claims Vercel; site is Cloudflare Pages | **CONFIRMED** | `src/routes/ai/build/+page.svelte:16` Ask Dad `technologies: [...'Vercel']` (also `:43` for Code to Cognition). `wrangler.toml`: `name = "ninochavez-main"`, `pages_build_output_dir = ".svelte-kit/cloudflare"` — Cloudflare Pages. (It's a stack-tag, not prose, but the claim stands.) |
| 6 | Stale models: chat pin + glossary "GPT-4, Claude 3" | **CONFIRMED** | Pin `anthropic('claude-sonnet-4-20250514')` at `src/routes/api/ask/chat/+server.ts:129` (exact match to appendix). Glossary exemplar at `src/routes/ai/reference/+page.svelte:40`: `example: 'GPT-4, Claude 3, and Gemini are all LLMs...'`. (Also `builder/+page.svelte:21` `'Claude, GPT-4, Gemini'`.) |
| 7 | Mislabeled / moved links | **CONFIRMED** (live-vs-dead detail) | Per-link table below. |

### Finding #7 per-link verification

| Repo source | Label / claim | URL served today | Verdict |
|---|---|---|---|
| `builder/+page.svelte:212` | "Anthropic Safety Guide" | `docs.anthropic.com/.../prompt-caching` → 301 → `platform.claude.com/.../prompt-caching` **200, page titled "Prompt caching"** | MISLABELED confirmed — link is under the "Governance & Safety" section but points at the prompt-caching doc |
| `builder/+page.svelte:18, :125` | `sdk.vercel.ai/docs...` | 301 → `ai-sdk.dev/docs/introduction` (live) | MOVED confirmed; resolves via redirect |
| `builder/+page.svelte:41` | `cursor.sh` | 308 → `cursor.com/` (live) | MOVED confirmed; resolves via redirect |
| `builder/+page.svelte:17, :72` | `docs.anthropic.com/.../prompt-engineering` | 301 → `platform.claude.com/docs/en/docs/build-with-claude/prompt-engineering` **→ 404** | REORGANIZED + **now dead** (used twice) |
| `builder/+page.svelte:40` | `docs.anthropic.com/en/docs/claude-code` | 301 → `platform.claude.com` → 307 → `code.claude.com/docs` (200, live) | REORGANIZED; resolves via redirect chain |

## Stale

| Claim | Verdict | Evidence |
|---|---|---|
| Section frozen Dec 2025/Jan 2026 (git log) | **CONFIRMED-WITH-DELTA** | `git log -- src/routes/ai`: content authored `2025-12-13` (`1a7d11d` "Add AI routes and Ask Dad", `63c6a5b` "Add /ai/build route"), corrected `2026-01-14` (`b901e50` work-timelines/email). Delta below. |
| ~40 of the account's repos active in 2026 | **REFUTED** | `gh api users/nino-chavez/repos --paginate` (the specified command): **21 total, 18 pushed ≥ 2026-01-01**. Authed `gh api user/repos`: **82 owned by nino-chavez, 75 pushed ≥ 2026-01-01**. Neither is ~40. Delta below. |
| Corpus stub "Coming Soon" + "882,786 words / 6 projects / 5 skills", uncited | **CONFIRMED** | `src/routes/ai/learn/corpus/+page.svelte`: `:13` title "Corpus Browser - Coming Soon", `:32` `<h1>Coming Soon`, `:40` `882,786`, `:44` `6` "Client projects", `:48` `5` "Reusable skills". No citation/source on the page. (Delta: a 4th stat `:52` `40+` "Architecture diagrams" the appendix didn't list. Route added 2025-12-13 → ~7 months of "Coming Soon" as of 2026-07-08.) |
| Enterprise track states Claude Skills spec limits as unsourced fixed facts | **CONFIRMED-WITH-DELTA** | `src/routes/ai/learn/enterprise/+page.svelte:48-51` requirements, stated as bare facts, no source: `'Name under 64 characters'`, `'Description under 200 characters (this is what Claude scans)'`, `'SKILL.md under 5,000 words'`. Accuracy delta below. |

## Structurally misaligned

| Claim | Verdict | Evidence |
|---|---|---|
| All 13 pages `noindex, nofollow` | **CONFIRMED** | Cited from `00-capture-manifest.md` (live re-probe): "All pages returned HTTP 200 and carry `<meta name="robots" content="noindex, nofollow"/>`." Corroborated in-repo per file (`build:76`, `corpus:15`, `builder:247`, `enterprise:157`, …). |
| Zero inbound links from the main site | **CONFIRMED** | `grep -rniE 'href="/ai' src --include=*.svelte` outside `src/routes/ai/` → **no matches**. `src/routes/+layout.svelte`, `src/routes/+page.svelte`, `src/lib/components/Footer.svelte` carry no `/ai` link. The only `/ai` reference outside the route tree is `src/hooks.server.ts:9` — a `301` redirect rule (`/learn/*` → `/ai/learn/*`), not a navigational inbound link. |

## Deltas

**Git-freeze (Stale, CONFIRMED-WITH-DELTA).** The substantive /ai content was authored 2025-12-13
and last corrected 2026-01-14, so "frozen Dec 2025/Jan 2026" holds for content authoring. But
`src/routes/ai` was touched twice more since: `c7fe199` (2026-04-28, "copy: strip douche factor
across hero, about, work, ai, footer") — a site-wide tone scrub that grazed /ai — and `4ae093d`
(2026-07-08, "fix(ai): repair dead links…"), which is the audit's own remediation, not new content.
The freeze claim is directionally right; the precise "last touched Jan 2026" is off by the April
cross-cutting copy pass. Not load-bearing.

**"~40 repos active in 2026" (Stale, REFUTED).** Mechanically false under every reading. The
task-specified public command `gh api users/nino-chavez/repos --paginate` returns 21 repos total,
18 with `pushed_at ≥ 2026-01-01`. The authenticated `gh api user/repos` view (gh is logged in as
nino-chavez; includes private) returns 82 repos owned by nino-chavez, 75 pushed in 2026 — the "82"
matches the goal-doc header's "82 repos" exactly, so the appendix author had the authenticated view.
Against that same view, active-in-2026 is 75; against the public view it is 18. "~40" is neither.
Stage 2 should cite the verified figures (18 public / 75 owned active in 2026) and drop the ~40.

**Enterprise Skills limits (Stale, CONFIRMED-WITH-DELTA).** The three limits are present and
unsourced as the appendix says. Checked against current Anthropic docs
(`platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices`, fetched 2026-07-08):
`name` max 64 chars — **still true**; `description` "under 200 characters" — **wrong**, current
spec is max **1024 characters**; "SKILL.md under 5,000 words" — **not the documented metric**, docs
recommend "under 500 lines" (a soft guidance, no word cap). So two of three are stale/incorrect —
which reinforces, rather than weakens, the appendix's point that unsourced volatile facts rot.

## Net reliability

The appendix is safe to build Stage 2 on. Every repo-grounded finding in my scope reproduced against
the canonical source, most with exact file:line matches (the pin `+server.ts:129`, the Zoey line only
2 off at `:20`, the Vercel tag `build:16`, the glossary `reference:40`). The structural claims (13/13
noindex, zero inbound links) both hold. The single REFUTED item — "~40 repos active in 2026" — is a
loose round background stat, not one of the numbered Broken/inaccurate findings, and its correction
(18 public / 75 owned) does not change any diagnosis. The two nuances Stage 2 should carry forward:
(1) the "moved links" finding is real but mixed — cursor.sh, sdk.vercel.ai, claude-code, and
prompt-caching all still resolve via redirect, whereas the prompt-engineering link (`builder:17` and
`:72`) now 404s and the "Anthropic Safety Guide" label genuinely points at a prompt-caching page; and
(2) the Enterprise Skills limits are not just unsourced but partly false against current docs. Both
nuances strengthen the initiative's freshness-architecture thesis rather than undercutting the audit.
