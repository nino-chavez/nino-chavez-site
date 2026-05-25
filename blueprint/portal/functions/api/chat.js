// ninochavez.co Blueprint — Pages Function: stakeholder chat endpoint
//
// Runs on the Cloudflare Pages Functions runtime. Proxies stakeholder
// questions through OpenRouter to Claude Haiku 4.5 with the blueprint docs
// loaded as system context.
//
// Required env var: OPENROUTER_API_KEY (set via `wrangler pages secret put`).
//   Stored in 1Password as "blueprint-global" (Developer Secrets vault).
//
// Why OpenRouter, not Anthropic direct: lets the same "blueprint-global" key
// fan out to any model without per-app key management.
//
// Docs are copied into portal/_docs/ at deploy time (see scripts/prep-deploy.sh)
// so the function can fetch them via the ASSETS binding from /_docs/*.md.
//
// FUTURE — migrate to Vectorize RAG (askdad-corpus) per 02-prescription.yml
// "pages-function-chat backed by shared askdad-corpus". Phase 1 uses
// static-doc-load for simplicity; Phase 3 swaps in vectorize retrieval.

const DOCS = [
  ['research-synthesis',           '/_docs/research-synthesis.md'],
  ['design-principles',            '/_docs/design-principles.md'],
  ['03-design-brief',              '/_docs/03-design-brief.md'],
  ['adr-0008-portal-shell',        '/_docs/adr-0008-portal-shell.md'],
  ['adr-0009-cluster-surfacing',   '/_docs/adr-0009-cluster-surfacing.md'],
  ['adr-0010-harness-and-forge',   '/_docs/adr-0010-harness-and-forge.md'],
  ['repos-inventory',              '/_docs/repos-inventory.md'],
  ['writing-corpus',               '/_docs/writing-corpus.md']
];

let SYSTEM_CONTEXT = null;

async function loadContext(env, requestUrl) {
  if (SYSTEM_CONTEXT) return SYSTEM_CONTEXT;

  const origin = new URL(requestUrl).origin;
  const sections = [];

  for (const [name, path] of DOCS) {
    try {
      // Pages Functions get `env.ASSETS` — a fetcher that serves the
      // deploy's static assets. Falls back to a plain fetch against the
      // request origin if ASSETS isn't bound (older runtimes).
      const url = `${origin}${path}`;
      const res = env.ASSETS
        ? await env.ASSETS.fetch(new Request(url))
        : await fetch(url);
      if (res.ok) {
        const content = await res.text();
        sections.push(`=== ${name} (${path}) ===\n${content}`);
      }
    } catch {
      // Skip missing — partial context still useful
    }
  }

  SYSTEM_CONTEXT = `You are a research/design assistant grounded in the ninochavez.co v3 Blueprint — the stakeholder review portal for Nino Chavez's portfolio site redesign. Nino is a context engineer who codified a working practice for shipping software with AI agents.

You have access to the blueprint corpus below: the Stage 1 Research synthesis, design principles (10 categorical refusals), design brief, the two architecturally load-bearing ADRs (0008 portal-shell adoption, 0009 cluster-surfacing pattern), and current-state inventories (69 repos across 8 thematic clusters, ~275 published artifacts across 7 writing collections).

When the user asks about a decision, cite the specific ADR (e.g., "ADR-0009"), design principle (e.g., "R10 — no bento"), or finding from research/synthesis.md. When the user asks for something not covered in the corpus, say so honestly — do not fabricate.

Tone: direct, no cheerleading, no hedging. Match Nino Chavez's voice: short sentences, imperative when giving advice, concrete examples grounded in real files or repos. No emoji.

If asked about a specific page in the portal, reference the per-page strategy panel content (loaded from /_meta/<page-id>.json). If asked about the IA, reference ADR-0009. If asked about why this portal exists separately from the v3 site, reference ADR-0008.

--- BLUEPRINT CORPUS ---

${sections.join('\n\n')}`;

  return SYSTEM_CONTEXT;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages = [], page, pageTitle } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages array required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const system = (await loadContext(env, request.url)) +
    (page ? `\n\nUser is currently viewing the "${pageTitle || page}" prototype page (id: ${page}).` : '');

  try {
    const openrouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://blueprint.ninochavez.co',
        'X-Title': 'ninochavez.co Blueprint'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-haiku-4.5',
        max_tokens: 800,
        messages: [
          { role: 'system', content: system },
          ...messages.map(m => ({ role: m.role, content: m.content }))
        ]
      })
    });

    if (!openrouterRes.ok) {
      const text = await openrouterRes.text();
      return new Response(JSON.stringify({
        error: `OpenRouter API error: ${openrouterRes.status}`,
        detail: text.slice(0, 500)
      }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const data = await openrouterRes.json();
    const reply = data.choices?.[0]?.message?.content || '(no response)';
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Chat request failed',
      message: err.message
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
