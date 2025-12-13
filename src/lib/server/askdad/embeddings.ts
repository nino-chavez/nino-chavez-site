import { env } from '$env/dynamic/private';

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DIMENSION = 1536;

function getApiKey(): string {
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }
  return env.OPENAI_API_KEY;
}

export interface EmbeddingResponse {
  embedding: number[];
  tokenCount: number;
}

/**
 * Generate an embedding for a single text input
 */
export async function generateEmbedding(text: string): Promise<EmbeddingResponse> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: text,
      dimensions: EMBEDDING_DIMENSION
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();

  return {
    embedding: data.data[0].embedding,
    tokenCount: data.usage.total_tokens
  };
}

/**
 * Generate embeddings for multiple texts (batch)
 */
export async function generateEmbeddings(texts: string[]): Promise<EmbeddingResponse[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
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
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await response.json();

  return data.data.map((item: { embedding: number[] }, index: number) => ({
    embedding: item.embedding,
    tokenCount: Math.floor(data.usage.total_tokens / texts.length) // Approximate per-text
  }));
}
