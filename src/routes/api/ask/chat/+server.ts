import { createAnthropic } from '@ai-sdk/anthropic';
import { streamText, type CoreMessage } from 'ai';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { SYSTEM_PROMPT, CONTEXT_INJECTION_TEMPLATE } from '$lib/server/askdad/system-prompt';
import { retrieveContext, shouldUseRAG } from '$lib/server/askdad/rag';
import {
  checkRateLimit,
  validateMessages,
  checkPromptInjection,
  getClientIP,
  logSecurityEvent
} from '$lib/server/askdad/security';

// Create Anthropic provider lazily (API key checked at runtime)
function getAnthropic() {
  if (!env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }
  return createAnthropic({
    apiKey: env.ANTHROPIC_API_KEY,
  });
}

// Response token limit to control costs
const MAX_RESPONSE_TOKENS = 1024;

export const POST: RequestHandler = async ({ request }) => {
  const clientIP = getClientIP(request);

  // 1. Rate limiting
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    logSecurityEvent('rate_limit', clientIP, rateLimit.error);
    return new Response(
      JSON.stringify({ error: rateLimit.error }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(rateLimit.resetIn),
          'X-RateLimit-Remaining-Minute': String(rateLimit.remaining.minute),
          'X-RateLimit-Remaining-Hour': String(rateLimit.remaining.hour),
          'X-RateLimit-Remaining-Day': String(rateLimit.remaining.day),
        }
      }
    );
  }

  // 2. Parse and validate request
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { messages: rawMessages } = body as { messages?: unknown };
  const validation = validateMessages(rawMessages);

  if (!validation.valid || !validation.sanitizedMessages) {
    logSecurityEvent('validation_error', clientIP, validation.error);
    return new Response(
      JSON.stringify({ error: validation.error }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const messages = validation.sanitizedMessages;

  // 3. Check for prompt injection in the latest user message
  const latestMessage = messages[messages.length - 1];
  const isUserMessage = latestMessage?.role === 'user';
  const query = isUserMessage ? latestMessage.content : '';

  if (isUserMessage && query) {
    const injectionCheck = checkPromptInjection(query);

    if (injectionCheck.blocked) {
      logSecurityEvent('injection_blocked', clientIP, injectionCheck.reason);
      return new Response(
        JSON.stringify({ error: 'Your message could not be processed. Please rephrase and try again.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (injectionCheck.suspicious) {
      logSecurityEvent('injection_suspicious', clientIP, injectionCheck.reason);
      // Continue but logged for monitoring
    }
  }

  // 4. Retrieve relevant context if appropriate
  let contextInjection = '';

  if (isUserMessage && query && shouldUseRAG(query)) {
    try {
      const { formattedContext, chunks } = await retrieveContext(query, {
        maxChunks: 5,
        minSimilarity: 0.65
      });

      if (chunks.length > 0) {
        contextInjection = CONTEXT_INJECTION_TEMPLATE(formattedContext);
      }
    } catch (error) {
      console.error('RAG retrieval error:', error);
      // Continue without context if RAG fails
    }
  }

  // 5. Build system prompt with context
  const fullSystemPrompt = contextInjection
    ? `${SYSTEM_PROMPT}\n\n${contextInjection}`
    : SYSTEM_PROMPT;

  // Convert to CoreMessage format
  const coreMessages: CoreMessage[] = messages.map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  // 6. Stream the response with token limit
  const anthropic = getAnthropic();
  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: fullSystemPrompt,
    messages: coreMessages,
    maxTokens: MAX_RESPONSE_TOKENS,
  });

  // Add rate limit headers to response
  const response = result.toTextStreamResponse();

  // Clone response to add headers (Response is immutable)
  const headers = new Headers(response.headers);
  headers.set('X-RateLimit-Remaining-Minute', String(rateLimit.remaining.minute));
  headers.set('X-RateLimit-Remaining-Hour', String(rateLimit.remaining.hour));
  headers.set('X-RateLimit-Remaining-Day', String(rateLimit.remaining.day));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};
