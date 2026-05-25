# ADR-0008 — Adopt the blueprint `portal/` shell (supersedes deleted ADR-0005)

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Nino Chavez
**Supersedes:** ADR-0005 (site-as-prototype review model) — hard-deleted from `decisions/` because its framing actively prevented the methodology from being applied; preserving it as a "Superseded" stub would have continued misdirecting future agent sessions.

## Context

The v3 redesign initially adopted a "site-as-prototype" review model: blueprint = markdown docs inside the SvelteKit app at `/blueprint`, with the live v3 preview URL serving as the review surface. That decision rejected the rally-hq paired-deploy pattern (separate `blueprint.rallyhq.app` portal with strategy/current-state drawers, comparison toggle, AI chat) as "lighter / weaker" and adopted the bc-subscriptions deliverables-index pattern instead.

The diagnosis was wrong on two counts:

1. **Rally-hq IS the canonical blueprint portal pattern.** Per `~/Workspace/dev/wip/blueprint/METHODOLOGY.md` and the v2 (2026-05-23) template documentation, the static-HTML `portal/` shell is the default for non-BC projects, with `blueprint.rallyhq.app` named as the reference deploy. Rejecting rally-hq as the model meant rejecting the methodology's own canonical Stage 6 output shape.

2. **The bc-subscriptions deliverables-index pattern alone doesn't cover the load-bearing primitives.** That pattern is one component (a structured doc index), not a replacement for the strategy panels, current-state panels, proposed/shipped toggle, and stakeholder chat that make the portal pattern reviewable async. Adopting "bc-subs deliverables-index" without the portal shell produced a sparse `/blueprint` route that read as a directory listing — captured in the 2026-05-25 design-violation correction.

The result was a v3 site that hid its own design rationale, gave reviewers no per-route "why this design" surface, and left the methodology's central artifacts (strategy / current-state / chat / toggle) unbuilt.

## Decision

**Adopt the blueprint `portal/` shell as a separate deployable Cloudflare Pages project at `blueprint.ninochavez.co`.**

Concrete shape:

1. **`blueprint/portal/`** — stamped from `~/Workspace/dev/wip/blueprint/template/portal/` 2026-05-23 v2. Static HTML + Cloudflare Pages Functions. Zero build pipeline.
2. **Separate Cloudflare Pages project** — `ninochavez-blueprint` (paired with `ninochavez-main` for the v3 site itself). Deploys from the same repo under a path-scoped GitHub Action.
3. **Custom domain** — `blueprint.ninochavez.co` (CNAME to `ninochavez-blueprint.pages.dev`).
4. **Slice + page metadata** — `_meta/slices/<slice-id>.json` per slice; `_meta/<page-id>.json` per prototype page. Pages declare only `window.PROTO_PAGE = { id: '<page-id>' };` in HTML; all other state lives in JSON.
5. **Strategy + current-state drawers** — per-page, populated from `_meta/<page-id>.json`.
6. **Comparison toggle** — `PROPOSED / COMPARE / SHIPPED` view modes via `data-view` attribute on `<body>`.
7. **AI chat FAB** — Pages Function at `functions/api/chat.js`. Backed by the existing Vectorize index (`askdad-corpus`) via the same RAG path as the v3 site's `/api/ask/chat` endpoint — corpus shared, not duplicated.
8. **The v3 site is the proposed surface.** When the prototype page in the portal points at `production_surface: "src/routes/.../+page.svelte"`, that reference is to the surviving v3 SvelteKit code (rebuilt from the portal's prescription).
9. **The v2 site is the current-state surface.** Screenshots of v2 routes at 1440px + 390px live under `blueprint/portal/current-state/` and feed the per-page Shipped drawers.

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| **Re-fix the in-app `/blueprint` markdown index** | Treats a symptom (sparse TOC) without addressing the architectural drift (no strategy drawers, no toggle, no chat, no per-route review path). Bandaid. |
| **Keep "site-as-prototype" + add a `/blueprint` masthead link** | Same problem at a smaller surface — still no strategy panel exposure, still no proposed/shipped comparison, still requires reviewers to tab-switch to v2 to see what's changing. |
| **Stamp the React `prototype/` shell instead of `portal/`** | The React `prototype/` shell is BC-specific (BigDesign coupling). The `portal/` shell is the methodology's default for non-BC projects, including this one. |
| **Build a custom portal shell from scratch** | Reinvents what the blueprint template already solves. The rally-hq deploy is the proof the template works. |

## Consequences

**Positive:**
- Reviewers see strategy + current-state per page, comparison toggle, and a chat widget grounded in the same corpus the v3 site uses. Async stakeholder review becomes tractable.
- The paired-deploy pattern matches Nino's other shipped work (rallyhq.app + blueprint.rallyhq.app) — internal consistency with the methodology he sells.
- The v3 site stays clean as "the proposed surface" — no blueprint chrome bleeding into product UI.
- The chat widget reuses the Vectorize index; no duplicate corpus, no separate embedding spend.

**Negative / accepted trade-offs:**
- Two CF Pages projects to maintain (`ninochavez-main` + `ninochavez-blueprint`) instead of one. Acceptable because the blueprint surface needs different cache headers, different robots rules (`noindex` site-wide), and a different deploy cadence.
- Screenshots of v2 need maintenance until v2 is fully replaced. Acceptable because the proposed-vs-shipped story is itself the load-bearing review artifact.
- Markdown ADRs + design-principles still live in `blueprint/*.md`, separate from the portal. The portal can surface them via `docs/` viewer + the AI chat's corpus, but the canonical source is the repo markdown.

## Enforcement

- **The `/blueprint` route in the SvelteKit app stays deleted.** If any future session proposes re-adding it, link them to this ADR.
- **Strategy + current-state drawers are mandatory per prototype page.** Page-level metadata files (`_meta/<page-id>.json`) must populate `strategy.*` and `currentState.*` fields. PRs that ship pages without them get rejected.
- **The portal is the canonical review URL.** Cite `blueprint.ninochavez.co` in PR descriptions, stakeholder communications, and any "review this redesign" context. The site's preview URL (`redesign-v3-context-engineer.ninochavez-main.pages.dev`) is for product-experience review only.

## References

- `~/Workspace/dev/wip/blueprint/METHODOLOGY.md` — the 7-stage methodology this ADR implements
- `~/Workspace/dev/wip/blueprint/template/portal/CONVENTIONS.md` — the contract this portal will follow
- `~/Workspace/dev/apps/rally-hq/blueprint/` — the canonical reference deploy (`blueprint.rallyhq.app`)
- `blueprint/research/synthesis.md` — the Stage 1 finding that drove the supersession
- `blueprint/portal/` — the stamped portal (this repo, post-2026-05-25)
