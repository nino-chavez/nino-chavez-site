/**
 * Security and Rate Limiting for Ask Dad
 *
 * Protections:
 * - Rate limiting per IP (requests per minute/hour)
 * - Input validation and sanitization
 * - Token/character limits
 * - Basic prompt injection detection
 */

// Rate limit configuration
const RATE_LIMITS = {
  // Per-minute limits (burst protection)
  requestsPerMinute: 10,

  // Per-hour limits (sustained abuse protection)
  requestsPerHour: 60,

  // Per-day limits (cost protection)
  requestsPerDay: 200,

  // Cleanup interval (ms)
  cleanupInterval: 5 * 60 * 1000, // 5 minutes
};

// Content limits
const CONTENT_LIMITS = {
  maxMessageLength: 12000,       // Max chars per message (allows long-form writing)
  maxMessagesPerConversation: 50, // Max messages in history
  maxTotalInputTokens: 16000,    // Rough estimate: chars / 4
};

// In-memory rate limit store (resets on deploy - that's fine for Vercel)
interface RateLimitEntry {
  minuteCount: number;
  minuteReset: number;
  hourCount: number;
  hourReset: number;
  dayCount: number;
  dayReset: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitStore.entries()) {
    // Remove entries that haven't been used in over a day
    if (now - entry.dayReset > 24 * 60 * 60 * 1000) {
      rateLimitStore.delete(ip);
    }
  }
}, RATE_LIMITS.cleanupInterval);

export interface RateLimitResult {
  allowed: boolean;
  remaining: {
    minute: number;
    hour: number;
    day: number;
  };
  resetIn: number; // seconds until next window
  error?: string;
}

/**
 * Check and update rate limit for an IP
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  let entry = rateLimitStore.get(ip);

  if (!entry) {
    entry = {
      minuteCount: 0,
      minuteReset: now + 60 * 1000,
      hourCount: 0,
      hourReset: now + 60 * 60 * 1000,
      dayCount: 0,
      dayReset: now + 24 * 60 * 60 * 1000,
    };
    rateLimitStore.set(ip, entry);
  }

  // Reset windows if expired
  if (now > entry.minuteReset) {
    entry.minuteCount = 0;
    entry.minuteReset = now + 60 * 1000;
  }
  if (now > entry.hourReset) {
    entry.hourCount = 0;
    entry.hourReset = now + 60 * 60 * 1000;
  }
  if (now > entry.dayReset) {
    entry.dayCount = 0;
    entry.dayReset = now + 24 * 60 * 60 * 1000;
  }

  // Check limits
  if (entry.minuteCount >= RATE_LIMITS.requestsPerMinute) {
    return {
      allowed: false,
      remaining: { minute: 0, hour: RATE_LIMITS.requestsPerHour - entry.hourCount, day: RATE_LIMITS.requestsPerDay - entry.dayCount },
      resetIn: Math.ceil((entry.minuteReset - now) / 1000),
      error: `Rate limit exceeded. Try again in ${Math.ceil((entry.minuteReset - now) / 1000)} seconds.`
    };
  }

  if (entry.hourCount >= RATE_LIMITS.requestsPerHour) {
    return {
      allowed: false,
      remaining: { minute: 0, hour: 0, day: RATE_LIMITS.requestsPerDay - entry.dayCount },
      resetIn: Math.ceil((entry.hourReset - now) / 1000),
      error: `Hourly limit exceeded. Try again in ${Math.ceil((entry.hourReset - now) / 1000 / 60)} minutes.`
    };
  }

  if (entry.dayCount >= RATE_LIMITS.requestsPerDay) {
    return {
      allowed: false,
      remaining: { minute: 0, hour: 0, day: 0 },
      resetIn: Math.ceil((entry.dayReset - now) / 1000),
      error: `Daily limit exceeded. Try again tomorrow.`
    };
  }

  // Increment counters
  entry.minuteCount++;
  entry.hourCount++;
  entry.dayCount++;

  return {
    allowed: true,
    remaining: {
      minute: RATE_LIMITS.requestsPerMinute - entry.minuteCount,
      hour: RATE_LIMITS.requestsPerHour - entry.hourCount,
      day: RATE_LIMITS.requestsPerDay - entry.dayCount,
    },
    resetIn: 0,
  };
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitizedMessages?: Array<{ role: 'user' | 'assistant'; content: string }>;
}

/**
 * Validate and sanitize chat messages
 */
export function validateMessages(messages: unknown): ValidationResult {
  // Type check
  if (!Array.isArray(messages)) {
    return { valid: false, error: 'Invalid request format' };
  }

  if (messages.length === 0) {
    return { valid: false, error: 'No messages provided' };
  }

  if (messages.length > CONTENT_LIMITS.maxMessagesPerConversation) {
    return { valid: false, error: `Conversation too long. Maximum ${CONTENT_LIMITS.maxMessagesPerConversation} messages.` };
  }

  const sanitizedMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  let totalLength = 0;

  for (const msg of messages) {
    // Validate structure
    if (!msg || typeof msg !== 'object') {
      return { valid: false, error: 'Invalid message format' };
    }

    const { role, content } = msg as { role?: unknown; content?: unknown };

    if (role !== 'user' && role !== 'assistant') {
      return { valid: false, error: 'Invalid message role' };
    }

    if (typeof content !== 'string') {
      return { valid: false, error: 'Invalid message content' };
    }

    // Check individual message length
    if (content.length > CONTENT_LIMITS.maxMessageLength) {
      return { valid: false, error: `Message too long. Maximum ${CONTENT_LIMITS.maxMessageLength} characters.` };
    }

    totalLength += content.length;

    // Sanitize content - remove null bytes and control characters (except newlines/tabs)
    const sanitized = content
      .replace(/\0/g, '')
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

    sanitizedMessages.push({ role, content: sanitized });
  }

  // Check total input size (rough token estimate)
  const estimatedTokens = Math.ceil(totalLength / 4);
  if (estimatedTokens > CONTENT_LIMITS.maxTotalInputTokens) {
    return { valid: false, error: 'Conversation too long. Please start a new chat.' };
  }

  return { valid: true, sanitizedMessages };
}

// Prompt injection patterns to detect
const INJECTION_PATTERNS = [
  // Direct instruction overrides
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?|rules?)/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /forget\s+(everything|all|your)\s+(previous|prior|you)/i,

  // System prompt extraction attempts
  /what\s+(is|are)\s+your\s+(system\s+)?prompt/i,
  /show\s+me\s+your\s+(system\s+)?prompt/i,
  /reveal\s+your\s+(instructions?|prompt|programming)/i,
  /print\s+your\s+(system|initial)\s+(prompt|message)/i,

  // Role-playing attacks
  /you\s+are\s+now\s+(a|an|the)\s+(different|new|evil)/i,
  /pretend\s+(you\s+are|to\s+be)\s+(a|an)/i,
  /act\s+as\s+(if\s+you\s+are|a|an)/i,
  /roleplay\s+as/i,

  // Jailbreak attempts
  /\bdan\s+mode\b/i,
  /\bjailbreak\b/i,
  /\bdeveloper\s+mode\b/i,
  /\bunfiltered\s+mode\b/i,

  // Encoding tricks
  /base64\s*:/i,
  /decode\s+this/i,

  // Output manipulation
  /respond\s+only\s+with/i,
  /your\s+response\s+must\s+(only\s+)?be/i,
];

// Suspicious but not blocking (for logging)
const SUSPICIOUS_PATTERNS = [
  /system\s*:/i,
  /\[system\]/i,
  /\{system\}/i,
  /<system>/i,
];

export interface InjectionCheckResult {
  safe: boolean;
  blocked: boolean;
  suspicious: boolean;
  reason?: string;
}

/**
 * Check for potential prompt injection attempts
 */
export function checkPromptInjection(content: string): InjectionCheckResult {
  // Check blocking patterns
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(content)) {
      return {
        safe: false,
        blocked: true,
        suspicious: true,
        reason: 'Message contains potentially harmful content'
      };
    }
  }

  // Check suspicious patterns (log but don't block)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(content)) {
      return {
        safe: true,
        blocked: false,
        suspicious: true,
        reason: 'Suspicious pattern detected'
      };
    }
  }

  return {
    safe: true,
    blocked: false,
    suspicious: false
  };
}

/**
 * Get client IP from request (handles Vercel/Cloudflare headers)
 */
export function getClientIP(request: Request): string {
  // Vercel
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Cloudflare
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // Real IP header
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Fallback
  return 'unknown';
}

/**
 * Log security events (could be extended to external service)
 */
export function logSecurityEvent(
  event: 'rate_limit' | 'validation_error' | 'injection_blocked' | 'injection_suspicious',
  ip: string,
  details?: string
): void {
  const timestamp = new Date().toISOString();
  console.warn(`[SECURITY] ${timestamp} | ${event} | IP: ${ip} | ${details || ''}`);
}
