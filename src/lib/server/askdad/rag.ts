import { generateEmbedding } from './embeddings';
import { searchContent, type ContentChunk } from './supabase';

export interface RAGContext {
  chunks: ContentChunk[];
  formattedContext: string;
}

/**
 * Retrieve relevant context for a user query
 */
export async function retrieveContext(
  query: string,
  options: {
    maxChunks?: number;
    minSimilarity?: number;
  } = {}
): Promise<RAGContext> {
  const { maxChunks = 5, minSimilarity = 0.7 } = options;

  // Generate embedding for the query
  const { embedding } = await generateEmbedding(query);

  // Search for similar content
  const chunks = await searchContent(embedding, {
    matchCount: maxChunks,
    matchThreshold: minSimilarity
  });

  // Format the context for injection into the prompt
  const formattedContext = formatContextForPrompt(chunks);

  return { chunks, formattedContext };
}

/**
 * Format retrieved chunks into a string for prompt injection
 */
function formatContextForPrompt(chunks: ContentChunk[]): string {
  if (chunks.length === 0) {
    return 'No directly relevant content found in the knowledge base.';
  }

  const formatted = chunks.map((chunk, index) => {
    const source = chunk.source_title
      ? `**${chunk.source_title}**`
      : `Source: ${chunk.source_id}`;

    const url = chunk.source_url ? `\nURL: ${chunk.source_url}` : '';
    const similarity = `(Relevance: ${Math.round(chunk.similarity * 100)}%)`;

    return `### Context ${index + 1} ${similarity}
${source}${url}

${chunk.content}`;
  });

  return formatted.join('\n\n---\n\n');
}

/**
 * Determine if the query is likely to benefit from RAG
 * (Simple heuristic - could be more sophisticated)
 */
export function shouldUseRAG(query: string): boolean {
  const lowercaseQuery = query.toLowerCase();

  // Questions about opinions, positions, or specific topics
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

  return ragKeywords.some(keyword => lowercaseQuery.includes(keyword));
}
