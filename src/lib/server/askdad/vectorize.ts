import { env } from '$env/dynamic/private';

/**
 * Vectorize storage layer for ask-dad RAG. Per ADR-0007.
 *
 * Query path runs inside the SvelteKit CF Pages worker via the `VECTORIZE`
 * binding (exposed at runtime by adapter-cloudflare's platform proxy).
 * Ingest path runs in Node.js (GH Actions) via REST and lives in
 * `tools/derive-corpus/`, not here — this module is read-only retrieval.
 *
 * Public shape matches the prior supabase.ts so `rag.ts` callers stay the
 * same: `searchContent(embedding, options)` returns `ContentChunk[]`.
 */

const INDEX_NAME = 'askdad-corpus';

export interface ContentChunk {
	id: string;
	source_type: string;
	source_id: string;
	source_title: string | null;
	source_url: string | null;
	chunk_index: number;
	content: string;
	similarity: number;
}

interface VectorizeMatch {
	id: string;
	score: number;
	metadata?: Record<string, unknown>;
	values?: number[];
}

interface VectorizeQueryResult {
	matches: VectorizeMatch[];
	count: number;
}

interface VectorizeBinding {
	query: (
		vector: number[],
		options?: {
			topK?: number;
			returnMetadata?: 'all' | 'indexed' | 'none' | boolean;
			returnValues?: boolean;
			filter?: Record<string, unknown>;
			namespace?: string;
		}
	) => Promise<VectorizeQueryResult>;
}

/**
 * Resolve the Vectorize binding. CF Pages exposes runtime bindings under
 * `platform.env` in the request event — adapter-cloudflare forwards them
 * to `$env/dynamic/private` for SSR + endpoint handlers. The binding is
 * a JS object, not a string, so we read it through the platform path
 * rather than env.SUPABASE_URL-style env vars.
 *
 * In local `vite dev` there is no Vectorize binding; the search call
 * silently returns no matches in that case (same degradation pattern
 * the prior supabase.ts used when the client wasn't configured).
 */
function getBinding(platform?: { env?: Record<string, unknown> }): VectorizeBinding | null {
	// Production: read from the platform proxy at request time.
	const binding = platform?.env?.VECTORIZE as VectorizeBinding | undefined;
	if (binding && typeof binding.query === 'function') {
		return binding;
	}

	// SSR fallback for dev — env.VECTORIZE_BINDING_FALLBACK isn't a real
	// thing; this branch exists so the type system doesn't blow up when
	// no binding is present. Returns null → searchContent returns [].
	void env;
	return null;
}

/**
 * Search the askdad corpus by embedding similarity.
 */
export async function searchContent(
	queryEmbedding: number[],
	options: {
		matchThreshold?: number;
		matchCount?: number;
		sourceType?: string;
		platform?: { env?: Record<string, unknown> };
	} = {}
): Promise<ContentChunk[]> {
	const { matchThreshold = 0.7, matchCount = 5, sourceType, platform } = options;

	const binding = getBinding(platform);
	if (!binding) {
		console.warn(`Vectorize binding "${INDEX_NAME}" not configured; skipping RAG search`);
		return [];
	}

	const result = await binding.query(queryEmbedding, {
		topK: matchCount,
		returnMetadata: 'all',
		returnValues: false,
		filter: sourceType ? { source_type: { $eq: sourceType } } : undefined
	});

	return result.matches
		.filter((m) => m.score >= matchThreshold)
		.map((m) => {
			const meta = m.metadata ?? {};
			return {
				id: m.id,
				source_type: String(meta.source_type ?? ''),
				source_id: String(meta.source_id ?? ''),
				source_title: meta.source_title != null ? String(meta.source_title) : null,
				source_url: meta.source_url != null ? String(meta.source_url) : null,
				chunk_index: Number(meta.chunk_index ?? 0),
				content: String(meta.content ?? ''),
				similarity: m.score
			};
		});
}

/**
 * Fetch all chunks for a single source. Vectorize doesn't expose a
 * native "scan by metadata field" — it does support `getByIds` and
 * lookup by ID. Since chunk IDs follow the deterministic pattern
 * `${source_id}-${chunk_index:0000}`, we read in a small fixed range
 * and stop at the first miss. Used by debugging surfaces, not by the
 * runtime chat handler.
 */
export async function getSourceContent(
	sourceId: string,
	platform?: { env?: Record<string, unknown> }
): Promise<string> {
	const binding = getBinding(platform);
	if (!binding) return '';

	// Hard cap at 200 chunks per source; sources in the catalog typically
	// land at <30. If a source ever needs more, raise this in lockstep
	// with the ingester.
	const MAX_CHUNKS = 200;
	const candidateIds = Array.from(
		{ length: MAX_CHUNKS },
		(_, i) => `${sourceId}-${String(i).padStart(4, '0')}`
	);

	// Vectorize's getByIds returns matches in input order; missing IDs
	// are simply absent from the response.
	const bindingExt = binding as VectorizeBinding & {
		getByIds?: (ids: string[]) => Promise<VectorizeMatch[]>;
	};
	if (!bindingExt.getByIds) {
		console.warn('Vectorize binding does not expose getByIds; falling back to empty');
		return '';
	}

	const matches = await bindingExt.getByIds(candidateIds);
	matches.sort((a, b) => {
		const ai = Number(a.metadata?.chunk_index ?? 0);
		const bi = Number(b.metadata?.chunk_index ?? 0);
		return ai - bi;
	});

	return matches.map((m) => String(m.metadata?.content ?? '')).join('\n\n');
}
