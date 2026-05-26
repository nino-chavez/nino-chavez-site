# Archived — Blueprint for ninochavez.co v3

**Archived 2026-05-25.** The Blueprint-driven v3 redesign effort for
ninochavez.co was abandoned in-session. Production at `ninochavez.co`
remains on v2 (unchanged, restored 2026-05-25 after a brief unauthorized
v3 deploy that was immediately rolled back).

## What's in this archive

| Directory | What |
|---|---|
| `blueprint.yml` | Blueprint configuration |
| `research/` | Stage 1–6 research artifacts (diagnose, prescription, design brief, fact-check, strategy summary, deploy plan, JTBD, Stage 7 candidates, visual spec, retired hire-me pivot) |
| `portal/` | Stage 4 prototype portal (multiple iterations: cyanotype, forge-pipeline, family-aesthetic + selfie) |
| `brand-kit.json` | forge-brand brand kit (forked from letspepper preset, identity tuned for studio surface) |
| `src-brand/` | forge-brand exports (CSS tokens, voice rules, etc.) consumed by SvelteKit attempts |
| `svelte-v3/` | SvelteKit route attempts for /, /speaking, /colophon, /now + RSS adapter + DESIGN.md rewrite |

## Why archived

Multiple iterations across the session failed to converge on an acceptable
design:

1. **v0.1 cyanotype + Bree Serif** — AI-default editorial, rejected as slop
2. **v0.2 cyanotype + cream serif refined** — same trap, smaller scale
3. **forge-pipeline Critical Orange + Roboto Slab** — generated competent
   tech-consultancy aesthetic, wrong genre
4. **Family aesthetic (Bebas Neue + Pepper Yellow)** — closer, but
   methodology had drifted too far from the actual goal
5. **Hire-me pivot** — overcorrected the Prospective Client persona into
   a sales surface (retired same session — see `research/01-diagnose-v2-hire-me.md`)
6. **Selfie integration on family aesthetic** — final state before archive

The underlying issue: the project's actual goal ("a person to be listened
to and sought out" — authority/discovery positioning) didn't yield a
shippable design through the methodology iterations attempted. The
methodology successfully diagnosed v2 problems but the design solutions
proposed by hand-build, forge-pipeline, and Stitch comparison all fell
short of the visual quality of v2 itself.

## What's preserved that may be reusable

- **Stage 1–2 diagnoses + personas + funnel** are accurate captures of
  v2's IA/copy/positioning problems. Useful baseline for any future
  redesign attempt.
- **Cohort calibration** (`research/competitive/peer-cohort.md` v0.2 with
  URL corrections + `market-cohort.md`) — useful for any peer/voice
  positioning work.
- **Receipt-bucket discipline** (`research/_external-corpus.md`) — the
  11 CURRENT / 2 EVOLUTION / 1 CLIENT-CONTEXT / 14 ADJACENT split is
  Nino-validated and useful for any surface that cites the practice.
- **brand-kit.json** (forked from letspepper preset) — captures the
  family-aesthetic identity for any future Nino-studio-surface attempt.

## What v2 production keeps doing

`ninochavez.co` continues to serve the v2 design unchanged. v2 has its own
diagnosed problems (D1–D8 in `research/01-diagnose.md`) but is shipping.

## What blueprint.ninochavez.co serves

As of archive time: the family-aesthetic v3 prototype with selfie
integrated. The subdomain remains pointed at the `ninochavez-blueprint`
Cloudflare Pages project. **Not addressed in this archive** — Nino can
take it down separately if desired.

## Methodology lessons (for the Blueprint repo)

Three issues surfaced during the failed iterations that should inform
template/methodology improvements (see `research/08-stage-7-candidates.md`):

- **C5 — Stage 3.5 visual spec should be canonical** for positioning-led
  projects. Skipping straight from brief to implementation produces
  designer's-aesthetic-statement output instead of constraint-driven
  design.
- **C9 — Stage 2.5 Jobs-to-be-Done missing** for positioning-led
  projects. Function-led projects (Rally HQ) get JTBD from the product
  function for free; positioning-led projects need it explicit.
- **C10 — forge-brand AI-generator output reflects identity-block input**.
  Forking from the wrong preset (signal-dispatch blog vs. letspepper
  family) yields wrong-genre defaults even with the same downstream
  pipeline.
