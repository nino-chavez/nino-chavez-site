# Stage 0 — Application Legibility: /ai surface capture

Captured 2026-07-08 evening (post-router-fix). Sensor: browse-tool headless Chrome
(Chrome/150), profile `ai-enablement-blueprint`, full-page screenshots of the LIVE
production surfaces at `ninochavez.co` (not local builds). Probes: `curl` against
production. Every Stage 1 diagnose claim about the current state grounds in a row
of these tables.

## Page captures (all 13 routes)

All pages returned HTTP 200 and carry `<meta name="robots" content="noindex, nofollow"/>`.

| Route | Capture |
|---|---|
| /ai | `captures/ai.png` |
| /ai/ask | `captures/ai-ask.png` |
| /ai/build | `captures/ai-build.png` |
| /ai/learn | `captures/ai-learn.png` |
| /ai/learn/architect | `captures/ai-learn-architect.png` |
| /ai/learn/author | `captures/ai-learn-author.png` |
| /ai/learn/builder | `captures/ai-learn-builder.png` |
| /ai/learn/corpus | `captures/ai-learn-corpus.png` |
| /ai/learn/enterprise | `captures/ai-learn-enterprise.png` |
| /ai/learn/explorer | `captures/ai-learn-explorer.png` |
| /ai/learn/strategist | `captures/ai-learn-strategist.png` |
| /ai/learn/voice | `captures/ai-learn-voice.png` |
| /ai/reference | `captures/ai-reference.png` |

## Endpoint probes

| Probe | Result | Reading |
|---|---|---|
| GET /api/person.json | 200 | Router fix (2026-07-08) holding: /api/* reaches the Pages origin |
| POST /api/ask/chat `{}` | 400 `{"error":"Invalid request format"}` | Route served; validation layer alive |
| POST /api/ask/chat `{messages:[{role:user,content:"hi"}]}` | **500 `{"message":"Internal Error"}`** | Chat is still dead end-to-end — now at the model/backend layer, not routing. Pinned `claude-sonnet-4-20250514` (`+server.ts:129`) is the prime suspect |
| askbc.ninochavez.co | 200 | Live |
| atelier.ninochavez.co | 200 | Live |
| blueprint.ninochavez.co | 200 | Live |
| labs.ninochavez.co | TLS handshake fails (curl exit, no HTTP) | Expired/broken cert confirmed, unchanged |
| /code-to-cognition | 404 | Second "Live" Build project still dead, unchanged |
| /blog | 200 | Live |
| signaldispatch.co | DNS: no answer | Domain still unresolvable (footer links already fixed 2026-07-08) |

## Deltas vs the goal-doc appendix (2026-07-08 morning audit)

1. **Appendix finding #1 updated**: `/api/ask/chat` no longer 404s (router fix
   landed). But a well-formed chat request returns 500 — "Ask" remains
   functionally broken while badged **Live**. The kill-or-relaunch decision input
   is unchanged in substance; the failing layer moved from routing to backend.
2. Everything else re-probed matches the appendix: 13/13 pages noindex, labs cert
   broken, /code-to-cognition absent, signaldispatch.co without DNS.
