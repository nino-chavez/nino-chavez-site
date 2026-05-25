// Root layout — prerender by default so static routes ship as static HTML on CF Pages.
// Routes that need server runtime (currently /api/ask/chat — RAG endpoint) opt out
// via their own +server.ts which sets `prerender = false` implicitly.

export const prerender = true;
