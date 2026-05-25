import { generateEmbedding } from './embeddings';
import { searchContent, type ContentChunk } from './vectorize';

/**
 * RAG retrieval for ask-dad. Per ADR-0007, storage is Cloudflare
 * Vectorize; this module is unchanged in its public shape (callers pass
 * a query string + optional `platform` from the request event; they
 * get back a `RAGContext` with `chunks` + `formattedContext`).
 *
 * The `platform` arg threads the CF Pages binding through from the
 * `/api/ask/chat` endpoint — Vectorize is a per-request binding, not a
 * module-level singleton like the prior Supabase client was.
 */

export interface RAGContext {
	chunks: ContentChunk[];
	formattedContext: string;
}

export async function retrieveContext(
	query: string,
	options: {
		maxChunks?: number;
		minSimilarity?: number;
		platform?: { env?: Record<string, unknown> };
	} = {}
): Promise<RAGContext> {
	const { maxChunks = 5, minSimilarity = 0.7, platform } = options;

	const { embedding } = await generateEmbedding(query);

	const chunks = await searchContent(embedding, {
		matchCount: maxChunks,
		matchThreshold: minSimilarity,
		platform
	});

	const formattedContext = formatContextForPrompt(chunks);

	return { chunks, formattedContext };
}

function formatContextForPrompt(chunks: ContentChunk[]): string {
	if (chunks.length === 0) {
		return 'No directly relevant content found in the knowledge base.';
	}

	const formatted = chunks.map((chunk, index) => {
		const source = chunk.source_title ? `**${chunk.source_title}**` : `Source: ${chunk.source_id}`;

		const url = chunk.source_url ? `\nURL: ${chunk.source_url}` : '';
		const similarity = `(Relevance: ${Math.round(chunk.similarity * 100)}%)`;

		return `### Context ${index + 1} ${similarity}
${source}${url}

${chunk.content}`;
	});

	return formatted.join('\n\n---\n\n');
}

export function shouldUseRAG(query: string): boolean {
	const lowercaseQuery = query.toLowerCase();

	const ragKeywords = [
		'think about',
		'opinion on',
		'view on',
		'written about',
		'said about',
		'believe',
		'recommend',
		'advice',
		'approach to',
		'perspective',
		'what would you',
		'how would you',
		'tell me about',
		'explain',
		'what is your'
	];

	return ragKeywords.some((keyword) => lowercaseQuery.includes(keyword));
}
