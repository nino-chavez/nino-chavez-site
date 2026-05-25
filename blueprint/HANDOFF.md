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

**Design system foundation + /work/[slug] + /now + /writing + /api/contact.json + toolchain restructure + Substrate section shipped (commits `580038f`, `a8292e4`, `e81a155`, `870566c`, `2a8a89f`, this commit):**

**ask-dad corpus refresh** (2026-05-25, this commit): the SYSTEM_PROMPT in `src/lib/server/askdad/system-prompt.ts` now has a "Current Practice Snapshot" section that gives the agent baseline knowledge of v3 artifacts (production line, substrate, voice corpus stats, 5 lead case studies, the lathe framing) without requiring RAG retrieval. Static — survives RAG misses.

**derive-corpus substrate** (2026-05-25, this commit + ADR-0006): the RAG corpus is now mechanically derived from source on every push to `main`. `tools/derive-corpus/derive-corpus.ts` reads the source list in `tools/derive-corpus/sources.ts` (19 sources currently: ADRs, blueprint docs, content drafts, voice guide, Poe stack, CLAUDE.md), chunks, embeds via OpenAI `text-embedding-3-small`, full-replaces in `askdad.content_chunks` per `source_id`. GitHub Actions workflow at `.github/workflows/ingest-askdad-corpus.yml` triggers on push to `main` and on `workflow_dispatch` only — **no schedule, no cron**, per prior Nino direction. Dry-run verified: ~55K tokens / ~$0.001 per full run. **Storage backend changed to Cloudflare Vectorize per ADR-0007.** Verified via dashboard: no `ask-dad` Supabase project exists anywhere across Nino's three orgs (Nino Chavez / Nino Chavez Dev / Signal x Studio LLC). The deployed `/api/ask/chat` has been silently degrading to no-RAG since launch because `supabase.ts` had no client to connect to. Migration to Cloudflare-native vector storage is the substrate fix; matches the broader Cloudflare-primary direction (Atelier ADR-052, ask-bc DO runtime, CF Pages deploy).

**Blocked on THREE one-time setup items:**

1. **Create the Vectorize index:**
   ```bash
   wrangler vectorize create askdad-corpus --dimensions=1536 --metric=cosine
   ```

2. **Add a `Vectorize ask-dad` item to 1Password** (Developer Secrets vault) with three fields:
   - `account_id` — Cloudflare account ID (visible in dashboard URL)
   - `index_name` — `askdad-corpus`
   - `api_token` — a CF API token with `Vectorize:Edit` scope (create at dash.cloudflare.com/profile/api-tokens)

3. **Set `OP_SERVICE_ACCOUNT_TOKEN`** in GH Actions secrets — a 1Password service account token with read access to the "Developer Secrets" vault. One static secret; everything else (OPENAI_API_KEY, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, VECTORIZE_INDEX) is pulled at runtime via `op://Developer Secrets/...` references.

Once all three land, the next push to main auto-populates the corpus. bc-subscriptions secrets are NOT reusable (different stack entirely — BigCommerce + CF Worker bindings, no OpenAI / no vectors).

**Runtime binding for the query path** also needs configuration in the SvelteKit adapter-cloudflare config so the `/api/ask/chat` worker can `env.VECTORIZE.query()`. The wrangler-managed binding name is `VECTORIZE`; this is set when the CF Pages project's deploy config is updated to include the Vectorize binding (one-time CF Pages dashboard edit). Companion docs: `blueprint/content/askdad-corpus-catalog.md` (human-readable), `tools/derive-corpus/README.md` (usage).

**/ai/learn anchor refresh** (2026-05-25, this commit): each of the 7 TrackCards on /ai/learn now surfaces 1-2 "Live anchors" pointing at the real /work case studies or /practice substrate that embody the track's pattern. The track-level curriculum content (5400 lines across 8 pages) was NOT rewritten — the anchors do the v3-connection work without forcing a level-by-level audit. A deeper per-level update is a separate scope; flag it if the surface needs the substrate-aware curriculum specifically.

**Brief extension** (record per HANDOFF rule 7): `/practice` was 3 sections in the original brief (`toolchain-readout-grid → operating-rules-stack → instrumentation-deep-dive`). Restructured to 4: **01 The production line** (5 lathes from the canonical Signal Dispatch post) → **02 The substrate** (hooks + skills/subagents + session mining + Hive coordination — what runs in every session) → **03 Operating rules** (4 rules from `~/.claude/CLAUDE.md`) → **04 Instrumentation evidence** (hesitation fold + corpus stats + adversarial test plan). Original 3-section structure conflated substrate with evidence and missed the agent/skill/Hive layer. Recorded in DESIGN-PRINCIPLES.md fact-check table.


Built the load-bearing audit gate the brief named — `/design-system` route renders every token (colors, type scale, spacing, motion) and every composition primitive (Hero, SectionHead, RibbonCard, CaseStudyCard, ToolCard, RuleBlock, PullQuote, ChannelRow, PointerRow, HonorableStrip, CaseStripeItem, TeaserCard, Masthead, SiteFooter) live in code. Tokens codified at `src/lib/styles/tokens.css` as CSS custom properties mirroring `DESIGN.md`. Shared `+layout.svelte` mounts Masthead + container + SiteFooter for all v3 public routes (/, /about, /practice, /contact, /design-system, /writing, /now, /work*) — eliminates the 4-way per-page masthead duplication. /blueprint and /api/* opt out (they have their own chrome / JSON).

Pages refactored to consume primitives: `/`, `/about`, `/practice`, `/contact` (per-page chrome CSS deleted, ~600 lines net), `/work` (case-study-readout + honorable-mentions-strip composition), `/work/[slug]` (5-composition deep-dive: hero-case-study → signature-diagram-opener → agentic-approach-readout → quotable-artifact-block → outcome-readout, consuming the `pullQuote` / `quotableArtifacts` / `schematic` schema fields on work-data entries), `/now` (editorial-lede + 3 RibbonCards leading with practice work, no co-equal hobbies), `/writing` (editorial-lede + 3-flagship whitepaper-row + archive pointer — closes nav IA asymmetry).

Stage 4 fact-check gates run for the first time. Findings landed in DESIGN-PRINCIPLES.md §"Stage 4 (Fact-Check) discipline":
- ✓ 5 lead case-study URLs all return 200 via `curl -sI -L`
- ✓ Project count "60+" → "56+" (narrow find undercounted; broader rule documented)
- ✓ Voice corpus 743 → 746 (synced to current `~/.claude/poe/stack.md`)
- ⚠️ Toolchain visibility — 5 of 6 named tools are PRIVATE on GitHub (only `ai-champions-kit` is public). All "open toolchain"/"published"/"public artifact" copy on /, /about, /practice, /api/* reworded to honest framing. ToolCard component renders a [private] badge and non-clickable href for each private repo. **Launch decision needed**: make the 5 private repos public OR keep "mixed visibility" framing permanently. See "What's BLOCKED" section.

New AEO endpoint: `/api/contact.json` (was missing from sitemap). Old v2 payload had "Enterprise Consulting / Photography Services" service-tier properties — direct DESIGN-PRINCIPLES.md §1 violation. Replaced with v3 engagement posture and three typed contactPoints (primary email / professional LinkedIn / code GitHub).

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
| **/ai/ask avatar — §6 tension** | DESIGN-PRINCIPLES.md §6 (revised 2026-05-25) refuses "Rive avatar, 'Virtual Nino' personality framing, talking-head conceit" as decorative novelty. The existing `/ai/ask` implementation imports `AvatarRive` from `src/lib/components/askdad/avatars/` and was titled "Ask Dad - Virtual Nino" with description "Get feedback and guidance from Virtual Nino." Page metadata reworded 2026-05-25 to drop the "Ask Dad" / "Virtual Nino" personality framing; the Rive avatar component is preserved per Nino's "preserve and update" direction but the page no longer markets it as a persona. **Open decision**: (A) keep the avatar as a passive UI indicator with no personality framing, OR (B) strip the avatar entirely per the letter of §6. Title is currently neutralized to just "Ask — Nino Chavez." Nino's call. |
| **Production-line visibility** | The 5 lathes in the production line (specchain, big-blueprint, forge-brand, forge-signal, gen-images) are all PRIVATE on GitHub. `ai-champions-kit` is the single PUBLIC artifact — the transfer kit, not part of the build chain. The site's credibility play (per "The Backport I Didn't Make") is "the chain is the lathe; the case studies are what came off it." Today the chain is private. **Launch decision**: (A) make the 5 lathes public — restores the "go look" credibility play, OR (B) keep "lathes are private; the transfer kit is public" framing permanently — softer credibility play but honest. Nino's call. AEGIS Framework reference removed from all v3 surfaces 2026-05-25 after `gh repo view` confirmed the repo doesn't exist; one residual reference in `src/lib/constants.ts:145` is consumed only by Phase 4 cut routes and will be deleted when those are cut. |
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
