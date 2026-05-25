/**
 * derive-corpus — ask-dad RAG ingester. Per ADR-0006 + ADR-0007.
 *
 * Event-triggered (GH Actions on push to main), never scheduled.
 * Idempotent: same input commit → same corpus.
 *
 * Pipeline per source:
 *   resolve path → read file (skip if missing) → parse to plain text →
 *   chunk → embed (OpenAI text-embedding-3-small) → upsert into
 *   Cloudflare Vectorize via REST API
 *
 * Env vars required:
 *   OPENAI_API_KEY            — embedding generation
 *   CLOUDFLARE_ACCOUNT_ID     — CF account that owns the askdad-corpus index
 *   CLOUDFLARE_API_TOKEN      — API token with Vectorize:Edit scope
 *   VECTORIZE_INDEX           — index name (default: askdad-corpus)
 *
 * Usage:
 *   tsx tools/derive-corpus/derive-corpus.ts
 *   tsx tools/derive-corpus/derive-corpus.ts --dry-run   # parse + chunk, skip embed + upsert
 */

import { readFile, access } from 'node:fs/promises';
import { SOURCES, type CorpusSource } from './sources';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSION = 1536;
const CHUNK_MAX_CHARS = 1500; // ~375 tokens, well under 8191 model max
const CHUNK_OVERLAP_CHARS = 150;

const DRY_RUN = process.argv.includes('--dry-run');

const INDEX_NAME = process.env.VECTORIZE_INDEX ?? 'askdad-corpus';

interface Chunk {
	source_id: string;
	source_type: string;
	source_title: string;
	source_url: string;
	chunk_index: number;
	content: string;
}

interface Embedded {
	id: string;
	chunk: Chunk;
	embedding: number[];
}

// ──── Env ────────────────────────────────────────────────────────────

function requireEnv(name: string): string {
	const v = process.env[name];
	if (!v) {
		throw new Error(`Required env var ${name} is not set`);
	}
	return v;
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

function chunkId(source_id: string, chunk_index: number): string {
	// Deterministic ID so re-runs upsert in place.
	// Zero-padded to 4 digits — supports up to 10,000 chunks per source.
	return `${source_id}-${String(chunk_index).padStart(4, '0')}`;
}

// ──── Embedding ───────────────────────────────────────────────────────

async function embedBatch(texts: string[]): Promise<number[][]> {
	if (DRY_RUN) {
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

async function embedChunks(chunks: Chunk[]): Promise<Embedded[]> {
	const BATCH_SIZE = 100;
	const embedded: Embedded[] = [];
	for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
		const batch = chunks.slice(i, i + BATCH_SIZE);
		const vectors = await embedBatch(batch.map((c) => c.content));
		for (let j = 0; j < batch.length; j++) {
			embedded.push({
				id: chunkId(batch[j].source_id, batch[j].chunk_index),
				chunk: batch[j],
				embedding: vectors[j]
			});
		}
	}
	return embedded;
}

// ──── Vectorize upsert via REST ───────────────────────────────────────

function vectorizeUrl(accountId: string, op: 'upsert' | 'delete-by-ids'): string {
	return `https://api.cloudflare.com/client/v4/accounts/${accountId}/vectorize/v2/indexes/${INDEX_NAME}/${op}`;
}

async function upsertVectorize(rows: Embedded[]): Promise<void> {
	if (DRY_RUN) {
		console.log(`[dry-run] would upsert ${rows.length} vectors`);
		return;
	}

	const accountId = requireEnv('CLOUDFLARE_ACCOUNT_ID');
	const apiToken = requireEnv('CLOUDFLARE_API_TOKEN');

	// Vectorize accepts NDJSON: one JSON object per line, no commas, no array wrap.
	const ndjson = rows
		.map((r) =>
			JSON.stringify({
				id: r.id,
				values: r.embedding,
				metadata: {
					source_id: r.chunk.source_id,
					source_type: r.chunk.source_type,
					source_title: r.chunk.source_title,
					source_url: r.chunk.source_url,
					chunk_index: r.chunk.chunk_index,
					content: r.chunk.content
				}
			})
		)
		.join('\n');

	// CF accepts batches up to ~5MB; our chunks are ~1.5KB each + 1536 floats
	// (~12KB), so ~13.5KB per row. 200 rows = ~2.7MB, comfortably under the limit.
	const BATCH = 200;
	for (let i = 0; i < rows.length; i += BATCH) {
		const slice = rows.slice(i, i + BATCH);
		const body = slice
			.map((r) =>
				JSON.stringify({
					id: r.id,
					values: r.embedding,
					metadata: {
						source_id: r.chunk.source_id,
						source_type: r.chunk.source_type,
						source_title: r.chunk.source_title,
						source_url: r.chunk.source_url,
						chunk_index: r.chunk.chunk_index,
						content: r.chunk.content
					}
				})
			)
			.join('\n');

		const response = await fetch(vectorizeUrl(accountId, 'upsert'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiToken}`,
				'Content-Type': 'application/x-ndjson'
			},
			body
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`Vectorize upsert failed (${response.status}): ${error}`);
		}
	}

	// Silence unused warning on the bulk ndjson above; kept for documentation
	// of the full body shape when reviewing.
	void ndjson;
}

// ──── Main ────────────────────────────────────────────────────────────

async function main() {
	const startedAt = Date.now();
	console.log(
		`derive-corpus starting · ${SOURCES.length} sources declared · target=${INDEX_NAME} · ${DRY_RUN ? 'DRY-RUN' : 'LIVE'}`
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
		await upsertVectorize(embedded);

		totalChunks += embedded.length;
		totalTokensEstimate += Math.ceil(text.length / 4);
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
		console.log('');
		console.log(`Note: orphan chunks (from sources whose chunk count shrunk between runs)`);
		console.log(`remain in the index. Per ADR-0007, accepted v1 trade-off.`);
	}
}

main().catch((err) => {
	console.error('derive-corpus failed:', err);
	process.exit(1);
});
