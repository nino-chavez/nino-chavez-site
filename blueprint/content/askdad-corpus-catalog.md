# Ask-Dad RAG Corpus Catalog

**Purpose:** the static snapshot in `src/lib/server/askdad/system-prompt.ts` gives the agent baseline knowledge of v3 artifacts without needing RAG. This catalog is the next layer — the documents that get ingested into the Cloudflare Vectorize index `askdad-corpus` (per ADR-0007, replacing the earlier Supabase plan) so the agent can quote source material with citation links and similarity scoring.

**Owner:** the GH Actions workflow `ingest-askdad-corpus` runs on every push to main; the executable spec is `tools/derive-corpus/sources.ts`. This file is the human-readable companion.

**Last updated:** 2026-05-25 — migrated from Supabase to Cloudflare Vectorize per ADR-0007.

---

## Status of current ingestion

Empty — verified 2026-05-25. The Vectorize index doesn't exist yet (one-time `wrangler vectorize create` step pending per HANDOFF.md). The deployed `/api/ask/chat` has been silently degrading to no-RAG since launch because the storage layer was never created. Once the index lands + GH Actions secrets are set, the next push to main re-derives the full corpus automatically via `tools/derive-corpus/derive-corpus.ts`.

The catalog below is the source-of-truth document for what should be in the corpus. The executable spec is `tools/derive-corpus/sources.ts` — if you add a row here, mirror it in the TS file (or the ingester won't pick it up).

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
| blueprint/decisions/0001-0004, 0006-0007 — six ADRs | adr | `…/blueprint/decisions/` |

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

## Ingestion notes

- **Storage:** Cloudflare Vectorize index `askdad-corpus`, 1536 dimensions, cosine metric. Per ADR-0007.
- **Chunk size:** 1500 chars max, 150-char overlap, sentence-boundary-aware. Same chunker for every source (see `tools/derive-corpus/derive-corpus.ts` `chunkText`).
- **Deterministic IDs:** `${source_id}-${chunk_index:0000}` so re-runs upsert in place. Orphan chunks from a shrinking source remain — accepted v1 trade-off per ADR-0007.
- **Re-run cadence:** automatic on every push to `main` via `.github/workflows/ingest-askdad-corpus.yml`. Path-filtered to `blueprint/**`, `src/lib/server/askdad/**`, and `tools/derive-corpus/**` so unrelated commits don't re-derive. Manual re-runs via the Actions tab → "Run workflow."

---

## What's deliberately NOT in the corpus

- `src/lib/server/askdad/system-prompt.ts` — that's the static framing, not retrievable context. Don't ingest the prompt into itself.
- Anything under `blueprint/decisions/` numbered higher than 0005 — currently doesn't exist; if more ADRs land, add them here.
- The /v1, /ai/build, /ai/reference, /links v2 surfaces — Phase 4 cuts (links was preserved separately and refactored).
- Private internal docs that aren't on `redesign/v3-context-engineer` branch.
