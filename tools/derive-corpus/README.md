# tools/derive-corpus

Ask-dad RAG ingester. Re-derives the `askdad.content_chunks` Supabase table from the source set in `sources.ts` on every push to `main`. Per ADR-0006.

## What this is

Event-triggered ingestion pipeline that:

1. reads each source declared in `sources.ts`
2. chunks the text (~1500 chars per chunk, sentence-boundary aware, 150-char overlap)
3. embeds via OpenAI `text-embedding-3-small` (1536 dimensions)
4. upserts into `askdad.content_chunks` (full replace per `source_id` — no diff, no delta)

No scheduled runs. No background agents. Push-triggered or local-invoked only.

## How to run

### Local (full live run)

```bash
export OPENAI_API_KEY=...
export SUPABASE_URL=https://<project>.supabase.co
export SUPABASE_SERVICE_KEY=...   # service-role key, NOT anon

cd <repo-root>
npx tsx tools/derive-corpus/derive-corpus.ts
```

### Local (dry-run — chunks + parses but skips embeddings + Supabase)

```bash
npx tsx tools/derive-corpus/derive-corpus.ts --dry-run
```

The dry-run output is the right way to verify a new source's chunking before paying for embeddings.

### CI / GitHub Actions

`.github/workflows/ingest-askdad-corpus.yml` runs this on push to `main`. Secrets required in repo settings:

- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`

## Adding a source

Edit `sources.ts`. The append-only change pattern:

```ts
{
  source_id: 'unique-stable-id',
  source_type: 'doc',  // or 'adr', 'site-page', 'work-deep-dive', 'aeo', 'voice-guide', etc
  source_title: 'Human-readable title shown in retrieval results',
  source_url: 'https://...',  // citation URL
  source_path: repo('blueprint/path/to/file.md'),  // or home('...') for ~/-anchored paths
  kind: 'local-markdown'  // or 'local-yaml', 'local-text', 'local-svelte'
}
```

Then update `blueprint/content/askdad-corpus-catalog.md` to keep the human-readable companion in sync.

If the file isn't present at `source_path` when the ingester runs, that source is skipped with a warning (not an error). This is intentional — paths under `$HOME` aren't resolvable in CI and the ingester handles them gracefully.

## What this does NOT do

- It does NOT fetch remote URLs. v1 reads local files only. Live-site ingestion (fetching prerendered HTML) is a v2 expansion if the static-snapshot system prompt + local-markdown corpus prove insufficient.
- It does NOT do delta detection. Each run replaces all rows for each `source_id`. Total cost per full run is ~$0.004 at current source-set size; not worth tracking diffs.
- It does NOT schedule itself. Push-triggered only — see ADR-0006 for why.

## Cost

Per-run cost is bounded by the total token count of the source set. text-embedding-3-small is $0.02 per 1M tokens. The current set is ~30-50K tokens → ~$0.001 per run. The script reports the approximate cost on completion.

## Verifying it ran

After a push to `main`:

```bash
gh run list --workflow=ingest-askdad-corpus.yml --limit 5
```

To check what's currently in the corpus:

```bash
# (one-off, requires credentials)
psql $SUPABASE_DB_URL -c "select source_id, count(*) from askdad.content_chunks group by source_id;"
```
