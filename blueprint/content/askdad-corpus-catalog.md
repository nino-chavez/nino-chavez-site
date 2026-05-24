# Ask-Dad RAG Corpus Catalog

**Purpose:** the static snapshot in `src/lib/server/askdad/system-prompt.ts` gives the agent baseline knowledge of v3 artifacts without needing RAG. This catalog is the next layer — the documents that should be ingested into the `askdad.content_chunks` Supabase table so the agent can quote source material with citation links and similarity scoring.

**Owner:** Nino runs the ingestion pipeline (this repo doesn't ship the embedder). This file is the brief.

**Last updated:** 2026-05-25 after the v3 redesign session.

---

## Status of current ingestion

Unknown to this repo. The Supabase table sits in the `askdad` schema; `rag.ts` queries it via `match_content` RPC. Whatever's currently there was ingested before v3 — likely just the Signal Dispatch blog archive. The v3 work below needs to land in the corpus for the agent to retrieve it.

If `gh repo list` finds an ingestion script, run it against the source set below. If not, the embedding step is a one-time scripted task: chunk each document, generate embeddings via `embeddings.ts`, insert into `askdad.content_chunks` with appropriate `source_type` / `source_id` / `source_title` / `source_url` per row.

---

## v3 source set to ingest

Each row is a document the agent should be able to retrieve. `source_type` is the recommended column value to filter by.

### Methodology + practice (highest priority — these are the load-bearing references)

| Source | source_type | URL / Path |
|---|---|---|
| The Backport I Didn't Make | blog-post | `https://blog.ninochavez.co/the-backport-i-didnt-make` |
| /practice page (full HTML or markdown export) | site-page | `https://ninochavez.co/practice` |
| /about page | site-page | `https://ninochavez.co/about` |
| blueprint/DESIGN-PRINCIPLES.md | doc | `https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/DESIGN-PRINCIPLES.md` |
| blueprint/03-design-brief.md | doc | `…/blueprint/03-design-brief.md` |
| blueprint/decisions/0001..0005 — five ADRs | adr | `…/blueprint/decisions/` |
| blueprint/HANDOFF.md (operating discipline section only — skip volatile commit list) | doc | `…/blueprint/HANDOFF.md` |

### Case studies (the agent should quote these when asked about specific projects)

| Source | source_type | URL / Path |
|---|---|---|
| Rally HQ + Blueprint case study | work-deep-dive | `https://ninochavez.co/work/rally-hq` |
| Atelier case study | work-deep-dive | `https://ninochavez.co/work/atelier` |
| Ask BC case study | work-deep-dive | `https://ninochavez.co/work/ask-bc` |
| Photography case study | work-deep-dive | `https://ninochavez.co/work/photography` |
| bc-subscriptions case study | work-deep-dive | `https://ninochavez.co/work/bc-subscriptions` |

### Voice + corpus references

| Source | source_type | URL / Path |
|---|---|---|
| Signal Dispatch voice guide (v1.2, 913 lines) | voice-guide | `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md` |
| Poe stack — current serialized character sheet | corpus-snapshot | `~/.claude/poe/stack.md` |
| Adversarial test plan (control/treatment protocol) | corpus-snapshot | `~/.claude/poe/adversarial-test-plan.md` |
| ~/.claude/CLAUDE.md (global rules) | operating-rules | `~/.claude/CLAUDE.md` |

### AEO surfaces (the agent should know how Nino positions himself for AI crawlers)

| Source | source_type | URL / Path |
|---|---|---|
| /api/person.json — Schema.org Person | aeo | `https://ninochavez.co/api/person.json` |
| /api/expertise.json — DefinedTerm list | aeo | `https://ninochavez.co/api/expertise.json` |
| /api/experience.json — WorkRole list | aeo | `https://ninochavez.co/api/experience.json` |
| /api/contact.json — ContactPoint | aeo | `https://ninochavez.co/api/contact.json` |

### Curriculum tracks (the agent should be able to recommend a track based on what someone is trying to do)

| Source | source_type | URL / Path |
|---|---|---|
| /ai/learn index (track overview + anchors) | curriculum-index | `https://ninochavez.co/ai/learn` |
| /ai/learn/explorer | curriculum-track | `https://ninochavez.co/ai/learn/explorer` |
| /ai/learn/builder | curriculum-track | `https://ninochavez.co/ai/learn/builder` |
| /ai/learn/architect | curriculum-track | `https://ninochavez.co/ai/learn/architect` |
| /ai/learn/strategist | curriculum-track | `https://ninochavez.co/ai/learn/strategist` |
| /ai/learn/author | curriculum-track | `https://ninochavez.co/ai/learn/author` |
| /ai/learn/voice | curriculum-track | `https://ninochavez.co/ai/learn/voice` |
| /ai/learn/enterprise | curriculum-track | `https://ninochavez.co/ai/learn/enterprise` |
| /ai/learn/corpus | curriculum-track | `https://ninochavez.co/ai/learn/corpus` |

---

## Ingestion notes for whoever runs it

- **Chunk size:** the `match_content` RPC implies the existing ingestion uses some fixed chunk size (likely 500–1000 tokens). Match it for new sources so similarity scores stay calibrated against existing corpus.
- **Source dedup:** Signal Dispatch posts may already be ingested. Diff before re-embedding to avoid duplicate chunks bloating the index.
- **HTML vs markdown:** site pages are SvelteKit-rendered. Either grab the raw markdown source from this repo (`blueprint/content/*.md`, `src/routes/*/+page.svelte` after stripping Svelte boilerplate) or render to plain text via the prerendered HTML in `.svelte-kit/output/prerendered/`. The latter captures the as-shipped narrative.
- **Re-run cadence:** every push to `redesign/v3-context-engineer` after content edits. Or set up a webhook from CF Pages deploy → ingestion run.

---

## What's deliberately NOT in the corpus

- `src/lib/server/askdad/system-prompt.ts` — that's the static framing, not retrievable context. Don't ingest the prompt into itself.
- Anything under `blueprint/decisions/` numbered higher than 0005 — currently doesn't exist; if more ADRs land, add them here.
- The /v1, /ai/build, /ai/reference, /links v2 surfaces — Phase 4 cuts (links was preserved separately and refactored).
- Private internal docs that aren't on `redesign/v3-context-engineer` branch.
