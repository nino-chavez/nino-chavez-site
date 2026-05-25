# ADR-0007 — Ask-dad RAG storage on Cloudflare Vectorize

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Nino Chavez

## Context

ADR-0006 declared the ask-dad RAG corpus as derived state, ingested by a GH-Actions-triggered pipeline on every push to `main`. The implementation assumed Supabase + pgvector as the storage layer — matching the inherited `src/lib/server/askdad/supabase.ts` code.

Two findings forced a reconsideration:

1. **No `ask-dad` Supabase project exists.** Verified via the Supabase dashboard across all three of Nino's orgs (Nino Chavez / Nino Chavez Dev / Signal x Studio LLC). The only Supabase projects are `ai-analyst-academy` (paused), `bc-theme-migrator` (paused), and `rally-hq` (PRO). The `Supabase ask-dad` item in 1Password held `url: http://127.0.0.1:54521` — a local-dev placeholder. The chat works today only because `supabase.ts` silently degrades (`if (!supabase) { console.warn('not configured, skipping RAG'); return []; }`) — RAG retrieval has been a no-op since deploy.

2. **Cloudflare-primary is the codified direction.** ADR-0052 in `wip/atelier` pivoted Atelier off Vercel onto CF Workers + OpenNext. Ask BC keeps Vercel only for OAuth + admin iframe and runs the agent runtime as CF Durable Objects. The site itself ships on CF Pages. Adding a Supabase project for a single-table RAG corpus runs against that direction; the operational drag (separate dashboard, separate billing, separate connection lifecycle) doesn't earn its keep.

The natural question: if we're not bringing the Supabase project that doesn't exist back to life, what's the right storage primitive?

## Decision

**Use Cloudflare Vectorize as the ask-dad RAG storage.** Specifically:

1. **Index:** `askdad-corpus`, 1536 dimensions, cosine metric. Matches the existing OpenAI `text-embedding-3-small` output and the prior pgvector schema's similarity function.

2. **Metadata schema per vector:**
   ```
   id           = `${source_id}-${chunk_index:0000}`   e.g. design-principles-0000
   values       = number[1536]                          (embedding)
   metadata.source_id      = string  (catalog key)
   metadata.source_type    = string  (filter dimension)
   metadata.source_title   = string  (citation display)
   metadata.source_url     = string  (citation link)
   metadata.chunk_index    = number
   metadata.content        = string  (the chunk text, ~1500 chars)
   ```

3. **Ingest path** (the GH Actions runner, Node.js): Vectorize REST API at
   `POST https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/vectorize/v2/indexes/askdad-corpus/upsert`
   with NDJSON body, Bearer API token. Same source list (`tools/derive-corpus/sources.ts`); same chunker; only the upsert target changes.

4. **Query path** (the CF Pages worker, runtime): Vectorize binding `env.VECTORIZE` exposed by the SvelteKit `adapter-cloudflare` platform proxy. `env.VECTORIZE.query(vector, { topK: 5, returnMetadata: 'all' })` returns matches with the metadata above; we project that into the existing `ContentChunk` shape so `rag.ts` callers don't change shape.

5. **Idempotent upsert by deterministic ID.** Deriving the ID as `source_id-NNNN` (zero-padded chunk_index) means re-running the ingester replaces existing rows in place. Orphan chunks from a prior run where a source had MORE chunks are an accepted v1 trade-off — they don't get retrieved often if they're irrelevant, and a sweep job can prune them if it ever becomes a problem.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Create a new Supabase project for ask-dad** | The lowest-touch fix (the existing `supabase.ts` would just work once the URL is filled in). But it's a Supabase project for a single-table RAG corpus on a site where every other backend primitive is now Cloudflare. Operational drag without a corresponding capability gain. |
| **Cloudflare D1 + plain SQLite FTS** | Workable for keyword retrieval, but loses semantic similarity. The current corpus + agent rely on cosine similarity over OpenAI embeddings for retrieval quality. Downgrading to FTS5 is a regression on capability for marginal cost savings. |
| **Cloudflare D1 + pgvector-equivalent** | D1's SQLite doesn't have a vector extension. The Cloudflare-native vector primitive is Vectorize, not D1. Forcing D1 to do vector search would be inventing a primitive that already exists in the same ecosystem. |
| **Pinecone / Weaviate / Qdrant** | All viable, all add a third-party SaaS dependency the rest of the site doesn't have. Vectorize sits inside the same Cloudflare account and bills against the same Workers usage; it's the Conway's-law answer to "where should the RAG store live given the rest of the site's substrate." |
| **Switch embedding model to Cloudflare Workers AI** (`@cf/baai/bge-base-en-v1.5` or similar) | Would eliminate the OpenAI dependency entirely. Considered but deferred: text-embedding-3-small at 1536d is well-validated, dirt cheap, and switching embedding models is reversible later if Workers AI proves better for this corpus. v1 keeps OpenAI for embeddings + Vectorize for storage. |

## Consequences

**Positive:**

- **Zero new SaaS dependencies.** The corpus stores in the same Cloudflare account that already hosts the site, the router worker, and the photography R2 bucket. One vendor relationship, one dashboard, one billing line.
- **Tighter latency at query time.** The `/api/ask/chat` Worker calls Vectorize via binding (no HTTPS round-trip), then OpenAI for the chat completion. Skipping the Supabase round-trip per query is ~50-100ms saved off every RAG-augmented response.
- **State-derive philosophy intact.** ADR-0006's design (catalog → ingest → full replace per source) ports cleanly. The only change is the upsert target.
- **Maps cleanly to the existing data model.** Metadata schema preserves source_id, source_type, source_title, source_url that callers already use; `ContentChunk` shape unchanged from the consumer perspective.

**Negative / accepted trade-offs:**

- **Vectorize indexes are not renameable in place.** If the metadata schema needs to evolve breakingly (e.g., switching from cosine to dotproduct, or changing dimensions), the migration is create-new-index → re-ingest → cutover binding → delete-old. Plan the schema decisions above carefully; design-time cost > runtime cost.
- **Orphan chunks accumulate** when a source's chunk count shrinks between runs (deterministic ID `source_id-NNNN` means the upsert replaces chunks 0..N-1 but doesn't delete N..oldMax). Acceptable for the current corpus size (~185 chunks total). A scheduled cleanup pass can be added later if it becomes load-bearing — not now.
- **No SQL.** Anything that wants tabular access to source metadata (admin dashboards, "show me all chunks for source X") needs to use Vectorize's getByIds or scan — no `SELECT ... WHERE` available. For the current scope (RAG retrieval only), not a constraint that bites.

## Enforcement

- **`src/lib/server/askdad/supabase.ts` is removed** in the migration commit. New file: `src/lib/server/askdad/vectorize.ts`. Anything still importing the old path is a regression.
- **The Vectorize binding name `VECTORIZE` is canonical.** If a future change renames it, the SvelteKit adapter config + the rag.ts client + this ADR must all change together.
- **The index name `askdad-corpus` is canonical.** The GH Actions workflow and `derive-corpus.ts` both hardcode it; renaming requires create-new + cutover (see "Negative" above).
- **OpenAI stays the embedding source for v1.** If we switch to Workers AI later, that's a separate ADR with its own re-embed migration (the embeddings aren't model-portable between providers).

## Migration sequence (for the implementation slice)

1. Nino creates the Vectorize index: `wrangler vectorize create askdad-corpus --dimensions=1536 --metric=cosine`.
2. Nino adds a `Vectorize ask-dad` item to 1Password Developer Secrets with `account_id`, `index_name`, `api_token` (Vectorize:Edit scope).
3. Nino adds `OP_SERVICE_ACCOUNT_TOKEN` to GH Actions secrets (one-time setup; same token serves any future 1Password-driven workflow).
4. Code changes land in a single commit per ADR (this commit):
   - New `src/lib/server/askdad/vectorize.ts`
   - `src/lib/server/askdad/supabase.ts` deleted
   - `src/lib/server/askdad/rag.ts` rewired
   - `src/routes/api/ask/chat/+server.ts` updated to read the binding (if it imported supabase.ts directly)
   - `tools/derive-corpus/derive-corpus.ts` rewritten against Vectorize REST API
   - `.github/workflows/ingest-askdad-corpus.yml` swapped to Vectorize env vars
   - `svelte.config.js` (or app-level adapter config) declares the binding
5. First push to `main` after the index + token land triggers the ingester and populates the corpus.

## References

- ADR-0006 — `Corpus as derived state` (the parent decision this extends)
- [Cloudflare Vectorize docs](https://developers.cloudflare.com/vectorize/)
- `wip/atelier/docs/decisions/0052-cloudflare-primary.md` — the precedent for "Cloudflare-primary" direction
- `src/lib/server/askdad/embeddings.ts` — unchanged; OpenAI embedding generation stays
- `tools/derive-corpus/sources.ts` — unchanged; the catalog ports as-is
