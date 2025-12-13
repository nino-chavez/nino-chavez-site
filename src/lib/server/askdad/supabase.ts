import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

// Create client only if credentials are available
let supabaseClient: SupabaseClient | null = null;

if (env.SUPABASE_URL && env.SUPABASE_ANON_KEY) {
  supabaseClient = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}

export const supabase = supabaseClient;

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

/**
 * Search for relevant content chunks using vector similarity
 */
export async function searchContent(
  queryEmbedding: number[],
  options: {
    matchThreshold?: number;
    matchCount?: number;
    sourceType?: string;
  } = {}
): Promise<ContentChunk[]> {
  if (!supabase) {
    console.warn('Supabase not configured, skipping RAG search');
    return [];
  }

  const { matchThreshold = 0.7, matchCount = 5, sourceType } = options;

  const { data, error } = await supabase.rpc('askdad_match_content', {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
    filter_source_type: sourceType ?? null
  });

  if (error) {
    console.error('Error searching content:', error);
    throw error;
  }

  return (data as ContentChunk[]) ?? [];
}

/**
 * Get all content for a specific source (e.g., a blog post)
 */
export async function getSourceContent(sourceId: string): Promise<string> {
  if (!supabase) {
    console.warn('Supabase not configured, skipping source content fetch');
    return '';
  }

  const { data, error } = await supabase
    .from('askdad_content_chunks')
    .select('content, chunk_index')
    .eq('source_id', sourceId)
    .order('chunk_index');

  if (error) {
    console.error('Error fetching source content:', error);
    throw error;
  }

  return (data as { content: string; chunk_index: number }[])
    ?.map(chunk => chunk.content)
    .join('\n\n') ?? '';
}
