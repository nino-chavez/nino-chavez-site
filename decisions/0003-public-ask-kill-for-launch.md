# ADR-0003 — Public Ask: kill for launch; relaunch has a named bar

- **Status**: Accepted
- **Date**: 2026-07-08
- **Stage**: Stage 2 (prescription prior 4: "kill or relaunch, no middle")
- **serves**: evaluating-client/ai-work/verify-the-ai-native-positioning-claim

## Decision

The public Ask surface (`/ai/ask`, "Virtual Nino") is **cut from the rebuilt surface at
launch**. The route is removed (redirect to /ai); the chat backend stays private-only.
The family deployment (Ask Dad) survives untouched in its private home per the goal
doc's out-of-scope list. Relaunch is allowed later, but only over the bar below — no
middle state, no "temporarily offline" badge.

## Evidence

- **It is broken today, at the second layer in a row.** Stage 0 probe: a well-formed
  chat request returns 500 post-router-fix — the pinned retired model
  (`claude-sonnet-4-20250514`, `src/routes/api/ask/chat/+server.ts:129`) is the prime
  suspect (`research/current-state/00-capture-manifest.md`). It already spent ~7 months
  dead at the routing layer while badged **Live**.
- **Its persona is not public-safe.** The system prompt is hardcoded to the private
  family persona ("You're talking to Zoey…", `src/lib/server/askdad/system-prompt.ts:20`;
  appendix #2) and the page leaks the "Ask Dad" naming (`old-corpus-inventory.md` §13).
- **A credible relaunch is a product, not a patch.** Sibling wall #2 required reading
  `wip/ask-bc/docs/architecture/decisions/001-codemode-agent-runtime.md` before this
  call. Its findings: the naive SDK tool-loop shape this backend uses hits documented
  walls (step caps, degraded compound answers, markdown-only), and Ask BC needed a
  Codemode + Durable Object rebuild to feel production-grade. Even the simpler
  RAG-only shape needs a public persona prompt written from scratch, an unpinned model
  in a dated data file, a corpus-refresh path (the blog publishes monthly), and live
  probes — none of which exist.
- **It is the highest-decay artifact on the surface.** Model pins, API keys, prompt,
  and embedding corpus all rot faster than any other content type here; the freshness
  architecture would carry its heaviest sensor load for the surface's least
  load-bearing feature. The pilot's JTBD is paths + evidence, not chat
  (`research/personas/craft-practitioner.md`); the evaluator is actively harmed by a
  broken demo (dead "Live" is worse than absent — `evaluating-client.md` notes).

## The relaunch bar (all four, plus the architecture read)

1. Public persona prompt authored and reviewed (voice-guide loaded; zero family leakage).
2. Model selection lives in a dated data file covered by the claim-lint/staleness gate
   — never pinned in code.
3. Freshness lane 2 operational first: scheduled live probe on the chat endpoint that
   fails loudly, so it can never be dead-while-badged-Live again.
4. Corpus refresh path defined (RAG index tracks the blog's publishing cadence).
5. Architecture decision consults ask-bc ADR-001 explicitly — adopt-or-diverge from
   the Codemode/DO shape in writing, not by default.

## Consequences

- Prescription P2 implements the cut (route removal + badge/stat integrity).
- The evidence layer loses nothing at launch: chat capability is demonstrated by Ask
  BC (live, merchant-gated) and Atelier as shipped-evidence links instead.
- The "Ask" pathway card on the front door is removed rather than re-pointed; the
  four-card IA collapses per the prescription's IA item.
