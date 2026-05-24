/**
 * derive-corpus — ask-dad RAG ingester.
 *
 * Per ADR-0006: full re-derivation of the askdad.content_chunks table from
 * the source set in `./sources.ts`. Event-triggered (GitHub Actions on push
 * to main), never scheduled. Idempotent: same input commit → same corpus.
 *
 * Pipeline per source:
 *   resolve path → read file (skip if missing) → parse to plain text →
 *   chunk → embed (OpenAI text-embedding-3-small) → upsert into Supabase
 *
 * Env vars required:
 *   OPENAI_API_KEY       — embedding generation
 *   SUPABASE_URL         — askdad-schema Supabase project URL
 *   SUPABASE_SERVICE_KEY — service-role key (NOT anon — writes required)
 *
 * Usage:
 *   tsx tools/derive-corpus/derive-corpus.ts
 *   tsx tools/derive-corpus/derive-corpus.ts --dry-run   # parse + chunk, skip embed + upsert
 */

import { readFile, access } from 'node:fs/promises';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SOURCES, type CorpusSource } from './sources';

// The askdad schema isn't typed-codegen'd here; the looser client type
// avoids the @supabase/supabase-js generic-narrowing that fights with
// custom-schema clients lacking declared Database types.
type LooseClient = SupabaseClient<any, any, any>;

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSION = 1536;
const CHUNK_MAX_CHARS = 1500; // ~375 tokens, well under 8191 model max
const CHUNK_OVERLAP_CHARS = 150;

const DRY_RUN = process.argv.includes('--dry-run');

interface Chunk {
	source_id: string;
	source_type: string;
	source_title: string;
	source_url: string;
	chunk_index: number;
	content: string;
}

interface Embedding {
	chunk: Chunk;
	embedding: number[];
}

// ──── Env + clients ──────────────────────────────────────────────────

function requireEnv(name: string): string {
	const v = process.env[name];
	if (!v) {
		throw new Error(`Required env var ${name} is not set`);
	}
	return v;
}

function makeSupabase(): LooseClient | null {
	if (DRY_RUN) return null;
	const url = requireEnv('SUPABASE_URL');
	const key = requireEnv('SUPABASE_SERVICE_KEY');
	return createClient(url, key, { db: { schema: 'askdad' } }) as LooseClient;
}

// ──── File resolution + parsing ──────────────────────────────────────

async function readSource(source: CorpusSource): Promise<string | null> {
	try {
		await access(source.source_path);
	} catch {
		console.warn(`[skip] ${source.source_id} — path not present: ${source.source_path}`);
		return null;
	}

	const raw = await readFile(source.source_path, 'utf8');

	switch (source.kind) {
		case 'local-markdown':
		case 'local-yaml':
		case 'local-text':
			return raw;
		case 'local-svelte':
			// Strip Svelte's <script> and <style> blocks, keep the template/markdown
			return raw
				.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
				.replace(/<style[^>]*>[\s\S]*?<\/style>/g, '')
				.replace(/<!--[\s\S]*?-->/g, '')
				.trim();
		default:
			throw new Error(`Unknown source kind: ${source.kind}`);
	}
}

// ──── Chunking ────────────────────────────────────────────────────────

/**
 * Chunk a text body into overlapping windows. Boundaries prefer paragraph
 * breaks (\n\n) within the last 25% of the window; falls back to sentence
 * boundaries; falls back to hard cut. Overlap carries the trailing
 * CHUNK_OVERLAP_CHARS forward so retrieval doesn't lose context at seams.
 */
function chunkText(text: string): string[] {
	const normalized = text.replace(/\r\n/g, '\n').trim();
	if (normalized.length <= CHUNK_MAX_CHARS) {
		return [normalized];
	}

	const chunks: string[] = [];
	let cursor = 0;

	while (cursor < normalized.length) {
		const end = Math.min(cursor + CHUNK_MAX_CHARS, normalized.length);
		let chunk = normalized.slice(cursor, end);

		// If we're not at the end of the text, prefer a paragraph or sentence
		// boundary in the trailing 25% of the chunk
		if (end < normalized.length) {
			const tailStart = Math.floor(chunk.length * 0.75);
			const paraBreak = chunk.lastIndexOf('\n\n', chunk.length);
			const sentenceBreak = Math.max(
				chunk.lastIndexOf('. ', chunk.length),
				chunk.lastIndexOf('? ', chunk.length),
				chunk.lastIndexOf('! ', chunk.length),
				chunk.lastIndexOf('.\n', chunk.length)
			);

			if (paraBreak > tailStart) {
				chunk = chunk.slice(0, paraBreak);
			} else if (sentenceBreak > tailStart) {
				chunk = chunk.slice(0, sentenceBreak + 1);
			}
		}

		chunks.push(chunk.trim());
		cursor += chunk.length;
		if (cursor < normalized.length) {
			cursor = Math.max(cursor - CHUNK_OVERLAP_CHARS, 0);
		}
	}

	return chunks.filter((c) => c.length > 0);
}

function buildChunks(source: CorpusSource, text: string): Chunk[] {
	const pieces = chunkText(text);
	return pieces.map((content, chunk_index) => ({
		source_id: source.source_id,
		source_type: source.source_type,
		source_title: source.source_title,
		source_url: source.source_url,
		chunk_index,
		content
	}));
}

// ──── Embedding ───────────────────────────────────────────────────────

async function embedBatch(texts: string[]): Promise<number[][]> {
	if (DRY_RUN) {
		// Skip the actual API call in dry-run
		return texts.map(() => new Array(EMBEDDING_DIMENSION).fill(0));
	}
	const apiKey = requireEnv('OPENAI_API_KEY');

	const response = await fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			model: EMBEDDING_MODEL,
			input: texts,
			dimensions: EMBEDDING_DIMENSION
		})
	});

	if (!response.ok) {
		const error = await response.text();
		throw new Error(`OpenAI embedding error (${response.status}): ${error}`);
	}

	const data = (await response.json()) as { data: { embedding: number[] }[] };
	return data.data.map((d) => d.embedding);
}

async function embedChunks(chunks: Chunk[]): Promise<Embedding[]> {
	const BATCH_SIZE = 100;
	const embedded: Embedding[] = [];
	for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
		const batch = chunks.slice(i, i + BATCH_SIZE);
		const vectors = await embedBatch(batch.map((c) => c.content));
		for (let j = 0; j < batch.length; j++) {
			embedded.push({ chunk: batch[j], embedding: vectors[j] });
		}
	}
	return embedded;
}

// ──── Supabase upsert ─────────────────────────────────────────────────

async function replaceSource(
	client: LooseClient | null,
	source_id: string,
	rows: Embedding[]
): Promise<void> {
	if (DRY_RUN || !client) {
		console.log(`[dry-run] would replace source_id=${source_id} with ${rows.length} chunk(s)`);
		return;
	}

	// Delete the prior rows for this source; then insert fresh.
	const { error: deleteError } = await client
		.from('content_chunks')
		.delete()
		.eq('source_id', source_id);

	if (deleteError) {
		throw new Error(`Delete failed for ${source_id}: ${deleteError.message}`);
	}

	if (rows.length === 0) return;

	const payload = rows.map(({ chunk, embedding }) => ({
		source_id: chunk.source_id,
		source_type: chunk.source_type,
		source_title: chunk.source_title,
		source_url: chunk.source_url,
		chunk_index: chunk.chunk_index,
		content: chunk.content,
		embedding
	}));

	// Insert in batches of 100 to stay under Supabase's request size limits
	const BATCH_SIZE = 100;
	for (let i = 0; i < payload.length; i += BATCH_SIZE) {
		const batch = payload.slice(i, i + BATCH_SIZE);
		const { error: insertError } = await client.from('content_chunks').insert(batch);
		if (insertError) {
			throw new Error(
				`Insert failed for ${source_id} (batch starting at ${i}): ${insertError.message}`
			);
		}
	}
}

// ──── Main ────────────────────────────────────────────────────────────

async function main() {
	const startedAt = Date.now();
	const client = makeSupabase();
	console.log(
		`derive-corpus starting · ${SOURCES.length} sources declared · ${DRY_RUN ? 'DRY-RUN' : 'LIVE'}`
	);

	let totalChunks = 0;
	let totalTokensEstimate = 0;
	let sourcesIngested = 0;
	let sourcesSkipped = 0;

	for (const source of SOURCES) {
		const text = await readSource(source);
		if (text === null) {
			sourcesSkipped += 1;
			continue;
		}

		const chunks = buildChunks(source, text);
		console.log(`[ingest] ${source.source_id} — ${chunks.length} chunk(s), ${text.length} chars`);

		const embedded = await embedChunks(chunks);
		await replaceSource(client, source.source_id, embedded);

		totalChunks += embedded.length;
		totalTokensEstimate += Math.ceil(text.length / 4); // ~4 chars per token rough heuristic
		sourcesIngested += 1;
	}

	const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1);
	console.log('');
	console.log(`Done in ${elapsedSec}s.`);
	console.log(`  Sources ingested: ${sourcesIngested}`);
	console.log(`  Sources skipped:  ${sourcesSkipped}`);
	console.log(`  Total chunks:     ${totalChunks}`);
	console.log(`  Token estimate:   ~${totalTokensEstimate.toLocaleString()}`);
	if (!DRY_RUN) {
		const usd = (totalTokensEstimate * 0.02) / 1_000_000;
		console.log(`  Approx cost:      $${usd.toFixed(4)} (text-embedding-3-small at $0.02/M tokens)`);
	}
}

main().catch((err) => {
	console.error('derive-corpus failed:', err);
	process.exit(1);
});
