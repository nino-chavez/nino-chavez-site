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
61ef1e7  feat(v3): wire homepage, /about, /practice, /contact — Phase 3a content
39e0f61  feat(aeo): rewrite person/expertise/experience JSON for context-engineer positioning
757a27f  feat(blueprint): /blueprint route — site-as-prototype review portal
3a19271  feat(blueprint): bc-subs pattern adoption — DESIGN-PRINCIPLES + 5 ADRs + README
39d324a  feat(content): Phase 2 drafts — hero, about, practice, AEO payloads, work-data refresh
8fd227a  feat(blueprint): forge-site stages 2/3/3.5 for v3 redesign
```

**`/blueprint/` route shipped:** Live at <https://redesign-v3-context-engineer.ninochavez-main.pages.dev/blueprint> once the CF Pages deploy completes. Prerendered, noindex/nofollow, violet/Inter/JetBrains-Mono styling. Source: `src/routes/blueprint/{+page.svelte,+page.ts,[...slug]/+page.svelte,[...slug]/+page.ts,blueprint-docs.ts}`. Link resolver rewrites in-blueprint relative refs to `/blueprint/<slug>` and out-of-blueprint refs to GitHub source URLs on the redesign branch.

**Phase 3a shipped:** AEO endpoints, work-data refresh, homepage, `/about`, `/practice`, `/contact` all wired. Every refusal in `DESIGN-PRINCIPLES.md` §10 is removed from the new surfaces (no lime, no Bebas, no bento, no volleyball hero, no 4-way grid, no Cal.com). `aegis`/`signal-forge`/`agent-os` deleted from work-data — they live on `/practice` toolchain. `aix`/`cix`/`six`/`commerce-prompt-analyzer` demoted to honorable mentions at order 11-14. New `Schematic.svelte` component renders `forge-pipeline` and `hesitation-fold` SVG placeholders inline (Phase 3b replaces with hand-drafted final art). All 4 new routes export `prerender = true`.

Also on other repo `main` branches (already pushed):
- `nino-chavez/atelier` — `f53f5db` custom domain bind: <https://atelier.ninochavez.co>
- `nino-chavez/ask-bc` — `4cafbc6` custom domain bind: <https://askbc.ninochavez.co>
- `nino-chavez/bc-subscriptions` — `f61a5130` (cherry-picked to main) README + 15 docs sanitized

## What's pending — DO IT, do not ask

These are authorized. Execute without re-confirming.

### 1. ~~`/blueprint/` route~~ — SHIPPED (commit `757a27f`)

Live at `<preview>/blueprint`. Reference implementation lives at `src/routes/blueprint/`. Do NOT redo this work. If a future change is needed (new doc type, new group, theming pass), edit the existing files.

### 2. ~~Phase 3a — content wiring~~ — SHIPPED (commit `61ef1e7` + `39e0f61`)

All five wires landed: AEO endpoints, `work-data.ts`, `/`, `/about`, `/practice`, `/contact`.

**Phase 3a follow-up still needed (not blocking 3b/3c):**
- `/work` index page (`src/routes/work/+page.svelte`) still uses the v2 visual register (status/visibility badges, category chips, runtime filter). Per `03-design-brief.md` it should become `hero-with-thesis → case-study-readout (5 cards in priority order) → honorable-mentions-strip`. Currently functional with refreshed data but visually inconsistent with the v3 surfaces.
- `/work/[slug]` pages should adopt the case-study composition (`hero-case-study → signature-diagram-opener → agentic-approach-readout → quotable-artifact-block → outcome-readout`). The new schema fields (`pullQuote`, `quotableArtifacts`, `schematic`) are populated on the 5 lead entries — just need a renderer that consumes them.
- Honorable mentions strip (`getHonorableMentions()`) needs a placement on `/work` index.

### 3. Phase 3b — schematic SVGs

Hand-draft 7 SVGs per `blueprint/03-design-brief.md` §3. Save under `static/case-studies/<slug>/schematic.svg` and `static/schematics/`. Reference from work-data entries (`schematic` field per the schema additions in `blueprint/content/work-data-refresh.md`).

Two placeholders currently render inline via `src/lib/components/Schematic.svelte`: `forge-pipeline` (homepage) and `hesitation-fold` (`/practice`). They're at the correct visual register (1.5px stroke, no fill, mono labels, violet spine) so the layout reads as intentional, not unfinished. Replace by either: (a) finalizing the inline SVGs in `Schematic.svelte` with the hand-drafted geometry, or (b) externalizing to `static/schematics/*.svg` and updating the component to `<img src>`. The 5 case-study schematics (rally-hq-blueprint-pipeline, atelier-12-tool-mcp, ask-bc-hybrid-arch, photography-cf-pipeline, bc-subscriptions-dual-track) are not yet drafted; the `schematic` field on each work-data entry points to the target filename.

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

## Prose-voice discipline (canonical going forward)

**Before writing or editing any prose on this site** (hero claims, /about narrative, /practice rules + captions, case-study taglines/pull-quotes, contact lines, blog teasers, OG cards, AEO `description` fields):

1. **Load first** — `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md` (913 lines, v1.2). The "Phrases that have become tells" list, the "Recently Used (Cooling Off)" table, and the §"Concrete Over Coined" rule are the highest-priority checks.
2. **Pick a content mode** — Thought Leadership (hero, /about, case-study narratives) vs Solution Architecture (/practice toolchain, ADRs, technical compositions) vs Documentation (blueprint portal, README). See `~/.claude/CLAUDE.md` → "Prose-voice tasks load the voice guide FIRST" for the taxonomy.
3. **Ground self-interrogation** — no invented people, conversations, internal admissions, or experiences. Per `~/.claude/CLAUDE.md` → "Never fabricate Nino's interior state."

**Before shipping** any prose change — dispatch the `architects-protocol-auditor` agent against the changed files. Apply phrase-level fixes. Re-audit if drift is non-trivial. Sync fixes back to the `blueprint/content/*.md` drafts so the source-of-record matches.

The voice-guide check is not optional. The fact-check gates in DESIGN-PRINCIPLES.md §"Stage 4" assume it ran.

## Glossary of pointers

- forge-site playbook: `~/Workspace/dev/tools/forge-site/playbook/`
- big-blueprint methodology: `~/Workspace/dev/wip/big-blueprint/`
- bc-subscriptions reference repo: `~/Workspace/dev/wip/bc-subscriptions/`
- TNA reference brief (only complete filled brief in workspace): `~/Workspace/dev/wip/tna/brand/visual-identity/brief.md`
- Voice guide (load FIRST before any prose): `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md`
- Project memory (per-project, auto-loaded): `~/.claude/projects/-Users-nino-Workspace-dev-apps-website-nc-v3/memory/MEMORY.md`
