# HANDOFF — fresh session pickup

Read this first. Everything else in `blueprint/` is reference; this is the operating doc.

## Where you are

- **Project:** ninochavez.co v3 redesign
- **Worktree:** `~/Workspace/dev/apps/website-nc-v3/`
- **Branch:** `redesign/v3-context-engineer`
- **Remote:** `git@github.com:nino-chavez/nino-chavez-site.git`
- **Live preview** (auto-rebuilds on push, currently serves v2 because Phase 3 isn't wired): <https://redesign-v3-context-engineer.ninochavez-main.pages.dev>
- **Repo docs entry:** <https://github.com/nino-chavez/nino-chavez-site/tree/redesign/v3-context-engineer/blueprint>

## First commands

```bash
cd ~/Workspace/dev/apps/website-nc-v3
git pull origin redesign/v3-context-engineer
git log --oneline -10        # see what landed
cat blueprint/HANDOFF.md     # this file
```

## What this project is

Redesign of ninochavez.co. Reposition from polymath/creative ("software, photographs, mixes, essays") to **context engineer**: someone who codified a working practice for shipping production software with AI agents. Goal: hirable + known, NOT sellable (no service-tier cards, no Cal.com).

Hero claim (locked, do not relitigate): **"Context engineer. I _instrument_ the systems that build the systems."**

## Methodology — read these in order

| File | What it locks |
|---|---|
| `blueprint/README.md` | Methodology overview + how-to-review |
| `blueprint/01-diagnose.md` | Forge-site Stage 2: archetype = portfolio-brand (consulting variant), module list, scope boundaries |
| `blueprint/02-prescription.yml` | Forge-site Stage 3: full prescription — stack, sitemap, 5-phase plan, case-study slate |
| `blueprint/03-design-brief.md` | Forge-site Stage 3.5: signature = `schematic-diagram`, 9-page composition table |
| `blueprint/DESIGN-PRINCIPLES.md` | Big-blueprint Stage 2: 10 categorical refusals + 6 launch fact-check gates |
| `blueprint/decisions/0001-0005-*.md` | ADRs for positioning / archetype / hero / signature / review model |
| `blueprint/content/*` | Phase 2 drafts — hero, about, practice, AEO payloads, work-data refresh |

## What's done (commits on `redesign/v3-context-engineer`)

```
3a19271  feat(blueprint): bc-subs pattern adoption — DESIGN-PRINCIPLES + 5 ADRs + README
39d324a  feat(content): Phase 2 drafts — hero, about, practice, AEO payloads, work-data refresh
8fd227a  feat(blueprint): forge-site stages 2/3/3.5 for v3 redesign
```

Also on other repo `main` branches (already pushed):
- `nino-chavez/atelier` — `f53f5db` custom domain bind: <https://atelier.ninochavez.co>
- `nino-chavez/ask-bc` — `4cafbc6` custom domain bind: <https://askbc.ninochavez.co>
- `nino-chavez/bc-subscriptions` — `f61a5130` (cherry-picked to main) README + 15 docs sanitized

## What's pending — DO IT, do not ask

These are authorized. Execute without re-confirming.

### 1. `/blueprint/` route on the SvelteKit site (in flight, NOT shipped)

The user asked for a deployable + reviewable blueprint portal. Current state: docs are in `blueprint/` as markdown only; no rendered web surface. The decision (already made, do not re-litigate per ADR-0005) is to add a `/blueprint/` route on the same SvelteKit app — NOT a separate static portal at `blueprint.ninochavez.co`.

Implementation (do this; do not ask):
1. `npm install marked` in worktree root
2. Create `src/routes/blueprint/+page.svelte` — index listing all blueprint docs with links, grouped (Stage 2 Diagnose, Stage 3 Prescribe, Stage 3.5 Design Brief, DESIGN-PRINCIPLES, Decisions, Content)
3. Create `src/routes/blueprint/[...slug]/+page.ts` — `import.meta.glob('/blueprint/**/*.md', { eager: true, query: '?raw', import: 'default' })` to load all docs at build time; resolve `params.slug` → file, return `{ content, slug }`
4. Create `src/routes/blueprint/[...slug]/+page.svelte` — use `marked.parse(data.content)` and render with `{@html}`. Apply the DESIGN.md tokens (violet accent, Inter, JetBrains Mono for code).
5. Add a back-to-index link at top of each rendered doc
6. Verify locally with `npm run dev` then push → preview URL serves at `<preview>/blueprint`
7. Do NOT route this through the `apps/router` CF Worker; the SvelteKit `/blueprint/` route ships as part of the main site

### 2. Phase 3a — content wiring (after `/blueprint/` route)

Apply Phase 2 drafts (in `blueprint/content/`) to actual SvelteKit code:
- `blueprint/content/aeo-person.json` → `src/routes/api/person.json/+server.ts` (rewrite payload)
- `blueprint/content/aeo-expertise.json` → `src/routes/api/expertise.json/+server.ts`
- `blueprint/content/aeo-experience.json` → `src/routes/api/experience.json/+server.ts`
- `blueprint/content/work-data-refresh.md` → `src/lib/work-data.ts` (add 5 new lead entries, demote AIX/CIX/SIX/CPA to `featured: false`, delete aegis/signal-forge/agent-os entries which move to /practice)
- `blueprint/content/hero.md` + `about.md` + `practice.md` → rewrite `src/routes/+page.svelte`, `src/routes/about/+page.svelte`, add `src/routes/practice/+page.svelte`

All fully reversible. Push as you go; preview deploys on every commit.

### 3. Phase 3b — schematic SVGs

Hand-draft 7 SVGs per `blueprint/03-design-brief.md` §3. Save under `static/case-studies/<slug>/schematic.svg` and `static/schematics/`. Reference from work-data entries (`schematic` field per the schema additions in `blueprint/content/work-data-refresh.md`).

### 4. Phase 3c — finish Cloudflare migration

Drop `vercel.json`, remove `@vercel/analytics` + `@vercel/speed-insights/sveltekit` imports from `src/routes/+layout.svelte`, swap to Cloudflare Web Analytics token, port the `vercel.json` rewrites to `static/_redirects` or the router worker as appropriate.

### 5. Phase 4 — destructive cuts (NEED PER-ROUTE GO)

Do NOT execute without Nino confirming each route. List from `blueprint/02-prescription.yml` `cut_routes`:
- `/v1`, `/ai/learn/*` (8 sub-pages), `/ai/ask`, `/ai/build`, `/ai/reference`, `/api/cal/*` (3 sub), `/api/ask/chat`, `/links`
- 6 unused photography-process section components
- Duplicate `Header.svelte` (resolve to one)
- ~20 stale `docs/` operational notes (archive to `docs/_archive/`)

## What's BLOCKED (external — surface to Nino, don't solve unilaterally)

| Block | Detail |
|---|---|
| **Vercel deploys to `ask-bc` are BLOCKED** | `TEAM_ACCESS_REQUIRED` — git author `abelino.chavez@gmail.com` is not a member on `sxs-labs` Vercel team. Custom domain `askbc.ninochavez.co` serves the 16-day-old READY deployment with old `APP_ORIGIN` baked in; chat CORS will fail from the new domain until a fresh deploy lands. Fix requires adding the email as a team member on Vercel (one seat) — Nino's call. |
| **BC Developer Portal callbacks** | Ask BC custom domain change requires updating callback URLs in `https://devtools.bigcommerce.com/my/apps`. Interactive auth, can't be automated. |
| **Phase 4 destructive cuts** | Per-route confirmation required from Nino. Don't preemptively delete. |

## Failure modes from prior sessions — DO NOT REPEAT

These are the things that drew correction. Do not relitigate.

1. **Do not give menus when the answer is obvious.** "Option A vs B vs C" framing is hesitation in disguise. If the next step is clear from the decisions already locked, take it. The `/blueprint/` route is the example that surfaced this — the right move was to build it, not to propose three options.
2. **Do not pivot patterns mid-execution.** The rally-hq vs bc-subs blueprint-pattern thrash was avoidable — should have asked about reference pattern BEFORE building, not started building and pivoted on correction.
3. **Do not propose a `state-derive` tool, persona-journey docs, or a separate static `blueprint.ninochavez.co` site.** All explicitly deferred or rejected. See `decisions/0005-site-as-prototype-review-model.md` for the static-portal rejection.
4. **Do not reintroduce polymath / 4-way-interests / Cal.com / `/ai/learn` / `/ai/ask` / "Cut the Noise" tagline.** All on the categorical refusal list. See `DESIGN-PRINCIPLES.md`.
5. **Do not invent new ADRs unless a NEW load-bearing decision is needed.** 0001–0005 cover the existing decisions. New ADRs only for new decisions (e.g., if a routing/auth/CMS shape needs locking later).
6. **Do not load voice-guide AFTER drafting prose.** Per global CLAUDE.md "Prose-voice tasks load the voice guide FIRST" — `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md` BEFORE any draft.
7. **Do not push without checking branch state first.** bc-subscriptions main was 1302 commits behind origin and required cherry-pick + conflict resolution.

## What "done" looks like for v3

| Gate | Pass criteria |
|---|---|
| `/blueprint/` route live | URL renders the full blueprint docs portal on the preview deploy |
| Phase 3a wired | Preview URL homepage shows the locked hero claim + credibility ribbon; `/api/person.json` leads with `Context Engineer`; `/practice` route exists; 5 case studies in `/work` |
| Phase 3b shipped | 7 hand-drafted SVGs render on `/`, `/practice`, 5 `/work/[slug]` pages |
| Phase 3c finished | `vercel.json` deleted, no `@vercel/*` imports, CF Web Analytics token set |
| Phase 4 cut (Nino-approved) | Cut routes return 404; cut components deleted from src; cut docs archived |
| Stage 4 fact-check gates pass | Each line in DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline" has been verified |
| Merged to `main` | `redesign/v3-context-engineer` → `main` via PR; CF Pages production deploy serves v3 |

## Operating rules for the new session

1. Read this HANDOFF.md first.
2. Read `blueprint/DESIGN-PRINCIPLES.md` second — the refusal list is non-negotiable.
3. Read the 5 ADRs in numeric order to absorb the locked decisions.
4. Then do the work listed under "What's pending — DO IT, do not ask" in order.
5. Status updates: one or two sentences, what landed + next move. No menus.
6. End-of-turn: status sentence describing the next move you're taking. Not a question. Not a request for permission.
7. If you hit a real fork (something not covered by ADRs / DESIGN-PRINCIPLES / this doc), update this doc with the new decision before executing.

## Glossary of pointers

- forge-site playbook: `~/Workspace/dev/tools/forge-site/playbook/`
- big-blueprint methodology: `~/Workspace/dev/wip/big-blueprint/`
- bc-subscriptions reference repo: `~/Workspace/dev/wip/bc-subscriptions/`
- TNA reference brief (only complete filled brief in workspace): `~/Workspace/dev/wip/tna/brand/visual-identity/brief.md`
- Voice guide (load FIRST before any prose): `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md`
- Project memory (per-project, auto-loaded): `~/.claude/projects/-Users-nino-Workspace-dev-apps-website-nc-v3/memory/MEMORY.md`
