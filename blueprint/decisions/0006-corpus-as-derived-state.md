# ADR-0006 — Ask-dad corpus as derived state (state-derive applied to RAG)

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Nino Chavez

## Context

The ask-dad chatbot's RAG layer pulls from a Supabase `askdad.content_chunks` table. The table is populated by an ingestion step Nino runs separately. Two failure modes have appeared:

1. **The corpus drifts behind the site.** Phase 3a of v3 shipped substantial new content (production line, substrate, 5 case studies, AEO endpoint rewrites). The corpus did not. The agent's RAG retrievals will surface pre-v3 framing while the site has moved on. Manual ingestion is blocked on Supabase access and runs intermittently — at best a snapshot of "whenever Nino last ran it," at worst stale by months.

2. **There's no traceability between commit and corpus state.** A reviewer asking "what does ask-dad currently know?" can't derive an answer from git. The corpus is hand-curated; its contents at any moment are whatever the last ingestion happened to insert.

The bc-subscriptions case study makes the same critique of prose-status-vs-reality drift in spec-driven work — and answers it with `tools/state-derive/`, which derives capability state mechanically from source. The site's own DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline" assumes the same philosophy ("update number on every push if the corpus has grown").

The natural question: should ask-dad's corpus be derived state, not narrated state?

## Decision

**Yes — the ask-dad RAG corpus is mechanically derived from source on every push to `main`.**

Specifically:

1. **Catalog as executable spec.** `tools/derive-corpus/sources.ts` exports the source set. Adding a document to the corpus means appending to that file — not running a manual ingestion. The catalog markdown at `blueprint/content/askdad-corpus-catalog.md` remains for narrative documentation; the TS file is the source of truth the ingester reads.

2. **Full re-derivation, not delta.** On each run, for each source: delete existing rows for that `source_id` in `askdad.content_chunks`, re-chunk, re-embed via the existing `text-embedding-3-small` path (already used by `src/lib/server/askdad/embeddings.ts`), insert fresh rows. The previous corpus state is discarded; the derived state replaces it. This matches `state-derive`'s philosophy — derive, don't diff.

3. **Event-triggered, not scheduled.** A GitHub Actions workflow on push to `main` (and optionally to `redesign/v3-context-engineer` for preview corpora) runs the ingester. **No cron, no background-agent schedule** — explicit per prior Nino direction. The artifact change IS the event.

4. **Idempotent.** Same input commit → same output corpus (modulo embedding-model nondeterminism, which is bounded). Re-running the ingester on the same commit produces equivalent retrieval behavior.

5. **The static system-prompt snapshot stays.** The `Current Practice Snapshot` block in `src/lib/server/askdad/system-prompt.ts` covers RAG misses (when retrieval returns no matches). The derived corpus covers retrieval-grade specificity with citations. Both layers stay; they don't compete.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Continue manual ingestion** | Currently broken. Corpus is pre-v3; v3 has shipped. This is the exact prose-status-vs-reality drift the brief named as the bc-subs case study's lesson. |
| **Scheduled cron ingestion** (e.g., daily) | Violates the "No background-agent schedule" rule. Also wrong shape — content changes are bursty (a commit lands, several files change at once) not steady-state. Event-driven matches the actual signal. |
| **Delta-based incremental ingestion** (diff sources between commits, only re-embed changed ones) | Adds complexity (chunk hashing, change detection) for marginal cost savings. Full re-derivation on text-embedding-3-small at ~$0.02 per 1M tokens is ~$0.004 per full run of the current source set. Not worth the engineering cost of delta tracking. |
| **Put the catalog in YAML/JSON rather than TS** | Loses type-checking. The source-list shape (URL/path/source_type/source_id) benefits from compile-time validation. |
| **Use the live site URLs as ingestion source** (fetch + HTML strip) | More moving pieces (HTML parser, anti-bot considerations, deploy-vs-ingest race conditions). v1 ingests from local markdown/text only; live-URL ingestion can come in v2 if it's needed. |

## Consequences

**Positive:**

- **Corpus stops drifting.** Every push to `main` triggers re-derivation. The agent's retrieval surface stays current with the site without manual intervention.
- **Reviewable.** A reviewer can `git log tools/derive-corpus/sources.ts` to see what's in the corpus, and `gh run list --workflow=ingest-askdad-corpus.yml` to see when it last refreshed.
- **Matches the practice's own philosophy.** The site argues for state-derive (bc-subscriptions case study; DESIGN-PRINCIPLES §"Stage 4"); now ask-dad embodies it.
- **Closes the substrate loop.** Site content → mechanical ingestion → agent retrieval → site evidence. No prose-status-vs-reality gap.

**Negative / accepted trade-offs:**

- **Costs $0.004ish per push.** Acceptable; this is well under any meaningful budget. Bounded by the source set size, not by traffic.
- **Re-deriving on every push means short windows of inconsistency** between when site code deploys and when corpus ingestion completes (~30-60s lag). For an answer-engine surface this is fine — visitors hitting `/ai/ask` during that window see the prior corpus, which is a tighter consistency than the prior manual approach offered.
- **Embedding-model nondeterminism.** `text-embedding-3-small` may return slightly different vectors on re-embedding of identical input (floating-point + provider internals). Similarity-search behavior is bounded by this but not perfectly deterministic. Acceptable for retrieval; would not be acceptable for a primary-key role.
- **GH Actions secret management is required.** `OPENAI_API_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_KEY` (write access, not anon) must be set in the repo's Actions secrets. One-time setup cost.

## Enforcement

- **No manual ingestion path.** The `tools/derive-corpus/` script is the only documented way to populate the corpus. If someone proposes a one-off manual upsert, link them to this ADR.
- **Catalog stays in sync.** When a new source is added to `tools/derive-corpus/sources.ts`, the human-readable `blueprint/content/askdad-corpus-catalog.md` gets a row added too. Documentation drift here is recoverable but should be caught at review.
- **GH Action stays event-triggered, not cron-triggered.** If a `schedule:` trigger ever shows up in the workflow file, that PR contradicts this ADR.

## Secret management

Per `~/.claude/CLAUDE.md`'s 1Password-as-standard-convention rule, the
workflow pulls secrets from 1Password at runtime via the
`1password/load-secrets-action@v2` action. The only static GH Actions
secret is `OP_SERVICE_ACCOUNT_TOKEN` (a 1Password service account token
with read access to the "Developer Secrets" vault).

Referenced 1Password items:

| GH env var             | 1Password reference                                         |
|------------------------|-------------------------------------------------------------|
| `OPENAI_API_KEY`       | `op://Developer Secrets/OpenAI labs/credential`             |
| `SUPABASE_URL`         | `op://Developer Secrets/Supabase ask-dad/url`               |
| `SUPABASE_SERVICE_KEY` | `op://Developer Secrets/Supabase ask-dad/service_role_key`  |

bc-subscriptions secrets were not reusable — that project uses
BigCommerce + Cloudflare Workers bindings, not the OpenAI + Supabase
stack ask-dad needs.

**Pre-launch blocker:** the `Supabase ask-dad` 1Password item currently
has `url` set to `http://127.0.0.1:54521` (local-dev). Production
ingestion requires the cloud Supabase URL (`https://<project>.supabase.co`)
in that field. Updating the field in 1Password is a one-time setup task;
the workflow will fail with a `Connection refused` error until then.

## References

- `tools/derive-corpus/sources.ts` — the executable spec
- `tools/derive-corpus/derive-corpus.ts` — the ingester
- `.github/workflows/ingest-askdad-corpus.yml` — the trigger
- `blueprint/content/askdad-corpus-catalog.md` — human-readable companion
- `src/lib/server/askdad/embeddings.ts` — embedding generation (reused by the ingester)
- `src/lib/server/askdad/supabase.ts` — `ContentChunk` shape (the row schema the ingester upserts into)
- `wip/bc-subscriptions/tools/state-derive/` — the philosophical reference; derive don't narrate
- `blueprint/decisions/0005-site-as-prototype-review-model.md` — the prior ADR that adopted the bc-subscriptions pattern for the site; this ADR extends it to ask-dad's substrate
