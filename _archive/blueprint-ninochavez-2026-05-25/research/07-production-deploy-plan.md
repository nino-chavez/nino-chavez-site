---
canonical: true
stage: 6
status: draft
last_updated: 2026-05-25
voice_mode: solution-architecture
version: 0.1
---

# 07 — Production Deploy Plan

The work breakdown that closes the 5 DEFER anchors + 3 brief follow-ups
so v3 can ship from the SvelteKit production app at `ninochavez.co`.
Authored against Stage 5 fact-check (`05-fact-check.md § Stage 6
handoff`).

**This document is the plan, not the execution.** It assigns each item
to a deploy session, scopes effort, names acceptance criteria, and
orders dependencies. The actual SvelteKit + Cloudflare changes happen
in a separate session.

## Scope boundaries

| In scope | Out of scope |
|---|---|
| Closing the 5 DEFER anchors (A4, A7, A9, A10, A11) | New features beyond the brief |
| Closing the 3 brief follow-ups (F1 topics, F2 headshots, F3 signal sources) | Stage 7 iterate work (annotation feedback, content additions, analytics tuning) |
| Wiring SvelteKit production deploy of v3 to `ninochavez.co` | Touching `blueprint.ninochavez.co` portal (already deployed) |
| Stage 6 pre-deploy QA (accessibility, performance, smoke tests) | Comprehensive accessibility audit beyond axe + Lighthouse baseline |

## Work items, in dependency order

The order matters — items earlier in the list unblock items later.

### W1 — Production copy sweep (closes A9 + P2-1)

**Effort**: ~2 hours.

**What**: Audit every named platform, product, role, URL, and number on
`src/lib/constants.ts`, `src/routes/+page.svelte`, `src/routes/about/`,
`src/routes/work/`, `src/routes/ai/`, and the new `/speaking` +
`/colophon` + `/now` SvelteKit routes. Reconcile every claim against
2026-05-25 reality.

**Known stale claims**:
- `src/lib/constants.ts:9` — "hosted on Vercel" (live site is on Cloudflare Pages)
- `constants.ts` project titles drifted from `COPY_ASSESSMENT.md` Oct 2025 baseline (AIQ → AIX, Aegis → AEGIS); reconcile in either direction
- Every external URL in `src/routes/+page.svelte` should return 200

**Acceptance**:
```bash
grep -i vercel src/lib/                # no matches
grep -i vercel src/routes/             # no matches
# every href in src/routes/ resolves to 200
```

**Dependencies**: None. Can start immediately.

**Risks**: low. Pure text edits. No behavioral change.

---

### W2 — Rewrite root DESIGN.md from v0.2 brief tokens (closes A11 + P1-3)

**Effort**: ~2 hours.

**What**: Replace `DESIGN.md` (root, 209 lines, violet + content-forward
+ AEO thesis) with a new document authored fresh from the v0.2 brief
tokens. NOT a diff-edit of the old; written from scratch.

**Source of truth**: `blueprint/research/03-design-brief.md` v0.2,
specifically:
- § "Color tokens" (cyanotype blueprint blue + cream + proof-mark red)
- § "Type system" (Bree Serif display + Crimson Pro body + Inter UI + JetBrains Mono)
- § "Layout" (80rem container, 42rem reading column)
- § "Motion" (single-direction reveal, no ambient)

**Acceptance**:
- New `DESIGN.md` does not reference violet, AEO, or "content-forward"
- New `DESIGN.md` matches the production tokens that the SvelteKit
  refactor in W5 will implement
- Old DESIGN.md preserved as `docs/_archive/DESIGN-v2.md` per the
  "historical artifact" pattern used for `brand-domination-strategy.md`

**Dependencies**: None. Authored independently.

**Risks**: low. Documentation-only.

---

### W3 — Topic anchor verification (closes F1)

**Effort**: ~1 hour.

**What**: For each of the 4 "What I think about" topics on the home
page, verify ≥ 2 existing Signal Dispatch posts anchor the claim.

| Topic | Acceptance |
|---|---|
| Harness engineering for commerce | 2+ posts in `apps/blog/astro-build/src/` |
| Buy-vs-build threshold in the agent era | 2+ posts |
| Architect-directs-agents | 2+ posts |
| Brownfield over greenfield | 2+ posts |

If any topic falls below 2 posts: either (a) write the missing posts
before v3 launch, or (b) revise the home page topic list to drop the
under-anchored topic and substitute one with sufficient corpus.

**Acceptance**:
```bash
for topic in "harness engineering" "buy-vs-build" "architect-directs-agents" "brownfield"; do
  count=$(grep -rilE "$topic" ~/Workspace/dev/apps/blog/astro-build/src/ | wc -l)
  echo "$topic: $count posts"
done
# All ≥ 2
```

**Dependencies**: None.

**Risks**: medium. If topics are under-anchored, this becomes
content-writing work that could push the launch date.

---

### W4 — Headshot sourcing (closes F2)

**Effort**: variable (existing photo selection: ~30min; new shoot: 1+ week).

**What**: Source one square (1:1) + one wide (16:9) headshot for the
`/speaking` page. Two paths:

1. **Existing photography**: pull from `apps/photography` (20k+ photos)
   IF any are suitable practitioner headshots (likely some exist from
   speaking history or LinkedIn).
2. **New shoot**: schedule with a photographer if no existing photo is
   slate-ready. Adds calendar time.

**Acceptance**:
- Square headshot at 4096×4096 (or higher)
- Wide headshot at 4096×2304 (or higher)
- Both with explicit credit line if photographer named
- Both deployed to `apps/website-nc/static/speaking/` and referenced
  from `/speaking` page

**Dependencies**: None (parallelizable with other work).

**Risks**: medium. New-shoot path adds calendar time. If launch is
time-pressured, ship `/speaking` with text-only and a "headshot
forthcoming" note instead of blocking.

---

### W5 — Implement v3 SvelteKit routes from brief (NEW WORK)

**Effort**: ~12-16 hours.

**What**: Build the SvelteKit production routes that mirror the
prototype pages. NOT a copy-paste from the static HTML prototype —
SvelteKit components with data sources, props, accessibility, motion,
responsive breakpoints.

**Routes to ship**:
- `/` — replaces v2 home; cyanotype blueprint canvas + capability prose
  + 11-receipt list + recent Signal Dispatch + topic anchors + footer
  meta-receipt
- `/speaking` — new route; bio variants + headshot library + topics +
  past-talks credits + single inquiry CTA
- `/colophon` — new route; methodology meta-receipt page
- `/now` — promote from lateral to primary; live state mirror

**Existing routes to keep**:
- `/about`, `/work`, `/work/[slug]`, `/ai/`, `/ai/{ask,build,learn,reference}`
- `/links`, `/privacy`, `/api` (operational, unchanged)

**Tokens**: implement from W2's new `DESIGN.md`. Suggested approach:
extract tokens into `src/lib/styles/tokens.css` with CSS custom
properties; load globally via `+layout.svelte`.

**Accessibility**: target WCAG AA. Contrast already verified in
prototype (text-secondary 8:1, text-muted 6.4:1 against cyanotype
canvas). Keyboard navigation on all interactive elements. Skip-to-main
link. Semantic HTML.

**Performance**: target Lighthouse score 95+ on mobile. No bundle
explosion — Bree Serif + Crimson Pro + Inter + JetBrains Mono via
`font-display: swap`, system fallbacks ready.

**Acceptance**:
- All 4 routes deployed and rendered
- Lighthouse mobile ≥ 95 across performance/accessibility/best-practices/SEO
- Tokens match W2's new `DESIGN.md` exactly
- v0.2 brief's IA decisions implemented faithfully

**Dependencies**: W2 (tokens), W3 (topic naming finalized), W4 (headshot
assets if shipping `/speaking` complete).

**Risks**: high. This is the substantive engineering work; budget
generously.

---

### W6 — Wire live signal data sources (closes A4)

**Effort**: ~3-4 hours.

**What**: Connect the home-page live signal strip + `/now` page to actual
data:

| Signal | Source | Wiring |
|---|---|---|
| Writing (latest post) | Signal Dispatch RSS at `https://blog.ninochavez.co/rss.xml` | SvelteKit `+page.server.ts` parses RSS at build; reactive refresh via ISR or client-side fetch |
| Shipping (Rally HQ uptime / activity) | Rally HQ status endpoint (TBD: needs lightweight endpoint at `https://rallyhq.app/api/status` or similar) | Server-side fetch with 5-min cache |
| In-flight (Blueprint stage) | Self-referential — the SvelteKit app reads `blueprint/blueprint.yml` at build time | Build-time static read |
| Commit | Most recent commit on `apps/website-nc` main | Build-time `git log -1` baked into static content |

**MVP scope**: Writing (RSS) + In-flight (self) + Commit (build) ship
day-one. Shipping (Rally HQ) ships with placeholder if Rally HQ
endpoint isn't ready, with TODO for Stage 7 iterate.

**Acceptance**:
- Signal strip on `/` renders real RSS title + actual commit hash
- `/now` page renders same data, expanded
- Build re-fetches RSS at every deploy; staleness ≤ deploy frequency

**Dependencies**: W5 (route exists).

**Risks**: low for RSS + self + commit; medium for Rally HQ (depends on
endpoint availability).

---

### W7 — Pre-compute Vectorize index + wire chat grounding (closes A7)

**Effort**: ~6-8 hours.

**What**: Build the Cloudflare Vectorize index over the Signal Dispatch
corpus and update the chat Pages Function to retrieve top-k excerpts
before passing to the model.

**Steps**:
1. **Embedding generation**: script that reads each markdown file in
   `apps/blog/astro-build/src/content/blog/`, chunks at ~500 tokens
   with overlap, generates embeddings via OpenAI `text-embedding-3-small`
   (or Cloudflare's Workers AI equivalent).
2. **Index upload**: upload chunks + metadata (post slug, title, date) to
   Vectorize.
3. **`functions/api/chat.js` update**: on each query, embed the prompt,
   retrieve top-5 chunks from Vectorize, include them in the model
   context with citation instructions ("cite the post by title when you
   reference content from it").
4. **Vectorize binding**: declare in `wrangler.toml` per Cloudflare docs.

**Acceptance**:
- Chat FAB returns answers that quote Signal Dispatch posts by title +
  URL when the prompt matches indexed content
- "Stub" answers (model knowledge only, no retrieval) are gone
- Reindexing cadence documented; suggested weekly cron in Stage 7

**Dependencies**: W5 (chat FAB on production routes).

**Risks**: medium-high. Vectorize is in beta; embedding + retrieval
quality needs verification. Budget extra time for prompt-engineering
iteration on the citation format.

---

### W8 — Archive `/v1` legacy route (closes A10 + P3-1)

**Effort**: ~1 hour.

**What**: Move `src/routes/v1/` to `src/_archive/v1/`. Add Cloudflare
Pages redirect at `_redirects`: `/v1/* /:splat 301`. Remove from any
sitemap.

**Acceptance**:
- `/v1` returns 301 → `/` (or relevant v3 surface if mapping exists)
- No /v1 references in deployed site source
- `src/_archive/v1/` preserved for diff history

**Dependencies**: W5 (v3 routes shipped, so `/v1` redirect-target
exists).

**Risks**: low. Carefully review existing `/v1` inbound traffic
patterns before redirecting; if any external links exist, may need
specific path mappings.

---

### W9 — Stage 6 pre-deploy QA

**Effort**: ~2-3 hours.

**What**: Validation pass before production cutover.

**Checklist**:
- [ ] Lighthouse mobile ≥ 95 (performance + accessibility + best-practices + SEO)
- [ ] axe accessibility scan: 0 violations
- [ ] All external URLs return 200
- [ ] All internal routes return 200 + render correctly
- [ ] Cal.com booking flow tested end-to-end
- [ ] Chat FAB returns Vectorize-grounded answers for 5 sample queries
- [ ] Live signal strip displays real RSS title
- [ ] Capability sentence renders verbatim per W2's DESIGN.md tokens
- [ ] No regressions on existing surfaces (`/about`, `/work`, `/ai/*`)
- [ ] Smoke tests pass: `npx playwright test e2e/`

**Acceptance**: every checkbox checked. Failures block production
cutover.

**Dependencies**: W1–W8 complete.

**Risks**: low if W1–W8 quality is high. Catches regressions.

---

### W10 — Production cutover + smoke verify

**Effort**: ~1 hour.

**What**: Deploy v3 SvelteKit to `ninochavez-main` Cloudflare Pages
project. Verify production URL.

**Steps**:
```bash
cd apps/website-nc
npm run build
wrangler pages deploy .svelte-kit/cloudflare --project-name ninochavez-main --branch main
# Verify ninochavez.co loads v3
# Smoke: capability sentence, /speaking, /colophon, /now, chat FAB
```

**Acceptance**:
- `ninochavez.co` returns v3 capability sentence
- All 4 new/promoted routes return 200 + render
- Chat FAB opens + returns grounded answers
- Cal.com booking link works
- `/v1` redirects to `/`

**Dependencies**: W9 pass.

**Risks**: low. If W9 passed, this is mechanical.

---

## Estimated total effort

| Work | Estimate |
|---|---|
| W1 Copy sweep | 2h |
| W2 DESIGN.md rewrite | 2h |
| W3 Topic verification | 1h |
| W4 Headshot sourcing | 30min–1wk |
| W5 SvelteKit route implementation | 12–16h |
| W6 Live signal data sources | 3–4h |
| W7 Vectorize indexing + chat grounding | 6–8h |
| W8 /v1 archive | 1h |
| W9 Pre-deploy QA | 2–3h |
| W10 Production cutover | 1h |
| **Total (excluding W4 new-shoot path)** | **30–38 hours** |

Roughly a focused week of work. W4 new-shoot path adds calendar time
that can run in parallel.

## Suggested ordering across sessions

If split across multiple sessions:

**Session 1 (parallelizable, ~5h)**: W1 + W2 + W3 + W8
— Pure text/config edits. Low risk. Closes 3 anchors + 1 follow-up.

**Session 2 (the build, ~12-16h)**: W5
— SvelteKit route implementation. The bulk of engineering.

**Session 3 (data wiring, ~9-12h)**: W6 + W7
— Live signals + Vectorize. Depends on W5 routes existing.

**Session 4 (ship, ~3-4h)**: W9 + W10
— Pre-deploy QA + cutover. Final.

W4 headshot is on its own timeline; pulls or shoots in parallel.

## Out of scope — Stage 7 iterate items

Not in this plan; tracked for post-launch:

- Stakeholder annotation overlay feedback loop
- Re-audit Jordan Singer site with rendered tool (peer-cohort follow-up)
- Re-audit cohort observations for "no Cal.com on /" claim once v3 ships
- Live-signal data source hardening (Rally HQ status endpoint if not ready at W6)
- Reindexing cadence for Vectorize (initial weekly; tune from there)
- Headshot library expansion if W4 ships with minimum
- Topic anchor expansion if W3 ships with revisions

## Acceptance for this plan

This plan is "done" when:
1. v3 is live at `ninochavez.co`
2. All 5 DEFER anchors from `05-fact-check.md` are closed
3. All 3 brief follow-ups from `03-design-brief.md` are closed
4. Stage 7 iterate starts collecting stakeholder feedback

Pipeline shifts to Stage 7 at that point. v3 is officially shipped.
