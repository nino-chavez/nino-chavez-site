# Site audit plan — Open Practice redesign

- **Status**: Proposed, not yet run
- **Date**: 2026-07-30
- **Subject**: this branch (`codex/ia-navigation-prototype`), 19 route patterns
- **Primary lens**: a first-time visitor landing cold on the site

## Answer first

Audit the **local production build**, not the hosted preview. The hosted URL
(`ninochavez-portfolio-review.nino-chavez.chatgpt.site`) returns `401` behind a
ChatGPT sign-in wall, so nothing can crawl it unauthenticated. `npm run build &&
npm start` serves the full route set on `localhost:3000` — verified today.

Score the site against the two contracts that already exist rather than against
generic best practice. Every finding cites a clause or is labeled an opinion.

Staff eight reviewer roles. Five already exist as agents in adjacent repos; four
are new and one existing agent needs its default rubric overridden.

---

## 1. Target of record

| Target | Serves | Verified |
|---|---|---|
| `npm run build && npm start` → `http://localhost:3000` | primary — all static route patterns, 200/308 as expected | yes, 2026-07-30 |
| `dist/server/index.js` via direct `worker.fetch` | fast HTML-only assertions, no browser | yes — `tests/rendered-html.test.mjs` already does this |
| Hosted preview (auth-walled) | edge behavior only, needs one-time sign-in | 401 unauthenticated |
| Production `ninochavez.co` | not this build | n/a |

**Before the audit starts, freeze the subject.** The tree is dirty — 12 modified
files, 4 untracked (`app/demos.ts`, `app/demo-data.json`, three demo images,
`scripts/sync-demo-index.mjs`). Commit the working set and record the SHA in the
findings ledger. Findings against an uncommitted tree are not reproducible, and
the demo-index generator is new enough that it will move under the audit.

If edge-dependent checks are wanted later, authenticate the hosted preview once:

```bash
browse-start --profile          # profile: ninochavez-site-redesign
# sign in through ChatGPT in the opened window, once
browse-nav https://ninochavez-portfolio-review.nino-chavez.chatgpt.site/
```

The persistent profile keeps the session across sessions, so this is a one-time
cost.

### Explicitly out of reach

Say this in the report rather than letting a reviewer fake it: real-world Core
Web Vitals, cache headers, redirect chains, canonical tags, `robots.txt`,
sitemap, and OpenGraph unfurls cannot be audited on an auth-walled host or a
localhost build. They defer to a public preview or production. **Do not staff an
SEO lead for this pass.**

---

## 2. What the audit scores against

This is a conformance audit, not a heuristic sweep. Two approved documents supply
the assertions.

**`docs/OPEN-PRACTICE-ART-DIRECTION.md`** — already written as testable claims:

- Out-of-scope list: parallax, scroll reveals, marquees, cursor effects, looping
  status pulses, autoplaying media, decorative dashboards, generic icon sets.
- "Display type must remain inside its owning field at every supported width...
  never paints over instructions, controls, or reading copy."
- "All motion... disappears under the visitor's reduced-motion preference."
- Typography roles are locked: Anton display-only, Inter for everything
  structural, Space Mono for dates/state/counts only.
- Page expression models — Stage, Atlas, Sequence, Collection, Utility. "Page
  level sameness is a defect when the visitor jobs differ."
- Counts come from the publisher, never copied into the interface.

**`~/Workspace/dev/apps/website-nc/docs/IA-NAVIGATION.md`** — the page
responsibilities table's **"Must not become"** column is one approved, testable
claim per route. Five named visitor jobs become five task journeys.

**`docs/OPEN-PRACTICE-ART-DIRECTION.md` §Copy and naming** — six copy clauses,
added 2026-08-01 from the production copy pass:

- Reader-facing nouns, not data-model names.
- A coined term carries its gloss at first use — including a site-level frame in
  the `<title>` or first viewport.
- Say what the reader gets, not what the site refuses to do.
- First person, everywhere Nino speaks.
- Counts never render as ordinals, and a sequence badge matches its own display
  order.
- A duration or effort claim names its basis.

**`docs/IA-NAVIGATION.md` §Naming rules and §Search** — one canonical name per
surface; the nav label appears on the page it opens; the nav label describes what
is there; no two records share a name; every search control names its scope and
count and offers a route to the site-wide search.

**`PRODUCT.md`** — the first-encounter promise: who Nino is, what he does, what
he has made, which object to open next, without scrolling through a manifesto.
Retained as decision history for structure, but the promise itself still holds.

**`reader-contract.json`** — the `reader-clarity` skill's machine-readable
surface contract. Its `denyTerms` list is the mechanical form of the
reader-facing-nouns clause.

Anything a reviewer flags that no clause covers is filed as **S4 — observation**,
for Nino's call. It is not a defect.

### Two rubric overrides, stated up front

These are the failure modes that would make the audit wrong:

1. **`content-ux-reviewer` defaults to conversion optimization.** `PRODUCT.md`
   non-goals explicitly reject a services funnel. "Strengthen the CTA hierarchy
   to drive contact" audits against the wrong contract. Findings must be about
   clarity and honest labeling, not conversion.
2. **`ux-ui-auditor` defaults to design-trend alignment.** The art direction takes
   deliberate anti-trend positions. "You're falling behind on trends" is a defect
   in the audit, not the site.

The project's contracts win over any agent's built-in rubric. Trend and
conversion findings are S4 at most.

---

## 3. The team

Eight reviewer roles plus an orchestrator. Each row names the artifact produced,
the contract it scores against, and the tool it uses. Five map to agents that
already exist — reuse and adapt rather than writing new ones.

| # | Agency role | Existing agent | Owns | Produces |
|---|---|---|---|---|
| 0 | Engagement lead | orchestrator (me) | target freeze, evidence set, dedupe, severity, ledger | `docs/audit/FINDINGS.md` |
| 1 | **First-encounter strategist** | *new* | the five-second and thirty-second read on `/`, `/work`, `/about` | promise scorecard, per-viewport |
| 2 | **Wayfinding / task-journey lead** | *new* | the five visitor jobs as journeys; URL round-trip on all four collections | journey log, clicks-to-target, dead ends, share/reload/back results |
| 3 | **Art director / design conformance** | `ux-ui-auditor` (trend mode off) | expression models, palette, type roles, motion scope, grid | clause-by-clause conformance table |
| 4 | **Responsive & containment engineer** | *new* | Anton at display scale, overflow, tap targets, reflow at 4 widths | containment matrix |
| 5 | **Accessibility specialist** | `accessibility-validator` (website-nc) | WCAG 2.2 AA, keyboard-only, focus order, reduced-motion, no-JS | violation list with node paths |
| 6 | **Content strategist** | `content-ux-reviewer` + `reader-clarity` skill (conversion framing off) | labels, microcopy, headings, scan-ability, jargon | copy defect list with rewrites |
| 7 | **Evidence & claims auditor** | `evidence-audit` skill | "32 records across 6 domains", "281 pieces", demo counts, state labels | claim → source ledger |
| 8 | **Performance & delivery engineer** | `performance-budget-enforcer` (website-nc) | HTML weight, font delivery, image sizing, hydration cost | payload table vs budget |

**Roles deliberately not staffed**: SEO lead (target is auth-walled), CRO /
conversion lead (against contract), brand strategist (art direction is locked and
approved), frontend architecture reviewer (real, but a code-quality lane — it
belongs in `/code-review`, not an end-user audit).

**Voice** is folded into role 6. `architects-voice-auditor` and
`voice-tone-auditor` both exist; run one of them over the copy defect list only
if the content pass surfaces voice drift, not as a standing role.

### The four new roles, in detail

**1. First-encounter strategist** — the spine of the whole audit, because it is
the perspective the ask names. Not a checklist: a scored read of what a cold
visitor can answer at three time budgets (5s, 30s, 2min) on `/`, `/work`,
`/about`, at mobile and desktop. Scores the `PRODUCT.md` four-part promise
directly. Records what the visitor believes the site *is* after five seconds —
if that answer is "a design agency" or "a blog," the entrance has failed
regardless of how well it conforms.

**2. Wayfinding / task-journey lead** — takes each of the five visitor jobs from
the IA contract, runs it as a real journey, records the click path, the number of
steps, and where the path breaks. Also owns URL round-trip on `/work`, `/blog`,
`/demos`, and `/photography`: share, reload, and browser-back against a filtered
or searched URL. This is the role that catches structural defects a page-by-page
review never sees — a filtered view that cannot be shared is invisible to every
other reviewer on the roster.

**3. Responsive & containment engineer** — Anton at display scale over an
illustrated portrait is this design's known failure mode, and the last three
commits are literally `fix: contain about page split headings`, `fix: resolve
launch-blocking layout issues`, and `fix: clarify interactive object affordances`.
That pattern earns its own reviewer. Four widths — 390, 768, 1280, 1728 — plus a
200%-zoom pass, checking overflow, text painting over controls, and tap targets.

**4. Evidence & claims auditor** — the site's whole thesis is an honestly-labeled
record, so a wrong count is a credibility defect, not a typo. The art direction
says demo counts come from the publisher and must not be copied into the
interface; `scripts/sync-demo-index.mjs` is brand new and untracked, so
hardcoded-versus-generated drift is live right now. Every number and state label
on screen traces to its source file or is downgraded.

---

## 4. Sequencing

**Phase 0 — Freeze (15 min).** Commit the working set. Record SHA. Confirm
`npm run build && npm start` clean. Write the ledger header.

**Phase 1 — Evidence capture, one pass (45 min).** One crawl, one artifact
directory, all reviewers read the same set. Do not let each role re-crawl —
findings stop being comparable and the cost multiplies.

Capture into `docs/audit/evidence/<sha>/`:

- Full-page and above-fold screenshots, every URL below × 4 widths (390, 768,
  1280, 1728).
- Rendered HTML per URL (cheap via the worker probe, no browser needed).
- Console errors and network waterfall per URL.
- Three state passes on `/`, `/work`, `/blog`, `/photography`: keyboard-only
  focus walk, `prefers-reduced-motion: reduce`, and JS disabled.

Single visual ground — there is no light/dark toggle in `globals.css` or
`SiteHeader.tsx`, so the evidence set does not double. `DESIGN-DIRECTION.md`'s
light/dark palettes are marked historical and are not the subject.

**Capture list.** Detail-page instances are named, not sampled alphabetically,
so that "state and availability are honest but visually secondary" is testable
across objects whose states actually differ. The registry holds five states:
live (7), source (7), internal (12), building (4), paused (2).

| Pattern | URLs to capture |
|---|---|
| static | `/`, `/work`, `/demos`, `/learn`, `/blog`, `/about`, `/now`, `/links`, `/search`, `/privacy`, `/photography` |
| redirects | `/ai`, `/ai/learn`, `/ai/work` — confirm target, no capture |
| `/work/:slug` | `rally-hq` (live), `browse-tool` (source), `fleet-observability` (internal), `volleyrx` (paused) |
| `/demos/:slug` | `twelve-messages` (first session), plus the last session in publication order |
| `/demos/applied/:slug` | `adopt-or-skip`, `config-probe` |
| `/learn/:track` | two of the seven tracks — one short, one long |
| filtered state | `/work?…`, `/blog?…`, `/demos?…`, `/photography?…` — one filtered and one searched URL each |

**URL round-trip is a named check, not an afterthought.** The README lists
"URL-backed search and filtering" as a headline review item on four collections,
and the art direction requires "a persistent result rail keeps the count and a
direct return to the filters available deep in the archive." Role 2 owns it. The
three failures to look for: a shared filtered URL that lands unfiltered, a reload
that resets state, and browser-back that skips past the filtered view.

**Phase 2 — Parallel review.** Eight roles, same evidence, one findings format:

```
[S2] /work — domain bars have no accessible name or value
Contract: OPEN-PRACTICE §Expressive layer — "domain rows double as proportional
          data bars... encodes each domain's share"
Evidence: evidence/<sha>/work-1280.png, work.html:412
Repro:    1280w, keyboard tab to domain list, screen reader announces "link"
Fix:      expose share as text or aria-label on each row
```

Severity: **S1** blocks launch (a named visitor job cannot complete, a claim is
false, a route is broken, or a WCAG A failure). **S2** contract clause violated.
**S3** craft and consistency. **S4** observation outside contract.

**Phase 3 — Consolidate.** Dedupe across roles, rank, and separate "fix before
launch" from "fix after." One doc: `docs/audit/FINDINGS.md`.

**Phase 4 — Mechanize.** Every content, count, and claim finding becomes a case
in `tests/rendered-html.test.mjs`. That file already holds 14 assertions of
exactly this shape, so the audit's output becomes a regression gate instead of a
document that goes stale.

**Phase 5 — Remediate** in severity batches, re-capturing evidence per batch.

### When a copy pass is owed

A full eight-role audit is an event. Keeping copy correct is a cadence, and it
needs a trigger rather than good intentions. Run the content role — Phase 1
capture limited to the affected routes, then role 6 against the copy clauses — on
any of these:

| Trigger | Why |
|---|---|
| A new route ships | It has a nav label, a title, and a name that must not already be taken. |
| A new count renders anywhere | Counts are the site's central claim. §Content ownership and freshness governs the derivation; the copy pass checks agreement and pluralization. |
| A nav label, page title, or section heading changes | IA §Naming rules constrain all three together; changing one alone breaks the correspondence. |
| A new coined term or state value enters the vocabulary | It needs a gloss where a visitor first meets it. `workStateLabels` is the seam. |
| A record is added to the registry | Sequence badges are assigned from registry order and re-sorted for display — the drift that produced C11. |
| Copy is rewritten by an agent in bulk | The failure mode is fluent internal vocabulary. `reader-contract.json` `denyTerms` catches the known terms; a reader has to catch the new ones. |

`npm run test:audit` is the floor, not the pass. It holds copy and photography
invariants mechanically — internal vocabulary, count agreement,
ordinal-vs-quantity, badge order, status glosses, canonical URLs, internal link
behavior, privacy consent language, publisher-owned totals, and global
navigation. Everything the clauses call judgment (does the lede
answer the question, is the gloss a good gloss, does the framing read as
defensive) needs a person and a re-run.

---

## 5. Seed findings already in hand

From today's orientation pass, before any reviewer runs:

- **`/demos/applied` → 404, unreferenced (S3 candidate).** Only
  `/demos/applied/[slug]` exists. Checked: no internal link targets the bare
  path, and the breadcrumb on a technique page points to `/demos#applied`, not
  the missing index. It only bites a visitor who truncates the URL by hand — a
  real behavior, but not a broken path through the site. Verify the anchor
  actually lands somewhere on `/demos` before closing it.
- **`/ai`, `/ai/learn`, `/ai/work` → 308** to `/`, `/learn`, `/work`. Targets
  correct. Checked: no `href="/ai…"` remains in `app/`. Confirmed clean.
- **`/blog` renders 354 KB of uncompressed SSR HTML** — about 7× the next-largest
  route (`/demos`, 49 KB). All 281 pieces server-render into one document. Record
  compressed transfer size and DOM node count alongside the raw number: Brotli
  will cut the bytes substantially, so the durable claim is the parse and layout
  cost of 281 rendered records, not the byte count. The art direction requires
  the complete publication stay in one searchable record, so the fix is delivery,
  not truncation.
- **Hosted preview is auth-walled**, so no SEO, unfurl, or field-CWV lane exists
  in this audit.

---

## 6. Deliverables

| Path | Contents |
|---|---|
| `docs/AUDIT-PLAN.md` | this document |
| `docs/audit/FINDINGS.md` | ranked findings, one format, contract-cited |
| `docs/audit/evidence/<sha>/` | screenshots, HTML, console, network |
| `tests/rendered-html.test.mjs` | new regression cases from Phase 4 |
| `.claude/agents/*.md` | four new reviewer definitions, if the roster is approved |
