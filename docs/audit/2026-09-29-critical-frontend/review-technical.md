# Impeccable Assessment B — technical and interaction seams

## Verdict

The public frontend has three strong foundations: filters are URL-backed, direct-entry pages usually explain where the visitor landed, and the main React shell uses a native dialog with visible focus treatment.

Four concrete seams need attention. The mobile Learn heading is visibly broken. The shared navigation contract drifts across React, Astro, and Svelte. The Writing index sends an unusually large publication into one hydrated page. Writing links unnecessarily force new tabs.

The first, second, and fourth issues are preserve/refit work. The Writing index needs a structural rethink.

## Detector result

Command run exactly once:

`/Users/nino/.codex/skills/impeccable/scripts/impeccable detect --json app`

Exit code: `2`

Total findings: `280`

- `274` advisory
- `6` warning

| Rule | Count | Severity | Locations |
|---|---:|---|---|
| `design-system-font-size` | 254 | Advisory | `app/globals.css` 211; `app/cv/cv.css` 25; `app/photography/coverage/coverage.css` 18 |
| `design-system-color` | 19 | Advisory | `app/globals.css` 13; `app/photography/coverage/coverage.css` 5; `app/cv/cv.css` 1 |
| `design-system-font` | 4 | Warning | `app/globals.css:4,12,20,28` |
| `design-system-radius` | 1 | Advisory | `app/globals.css:263` |
| `layout-transition` | 1 | Warning | `app/globals.css:3225` |
| `side-tab` | 1 | Warning | `app/photography/coverage/coverage.css:82` |

The 25 CV font-size entries are at lines 18, 34, 48, 77, 114, 123, 172, 234, 241, 261, 305, 343, 351, 368, 406, 423, 430, 472, 491, 538, 544, 567, 574, 647, and 656. The 18 coverage entries span lines 3–85. The 211 global entries span lines 199–7675.

The color findings are at:

- `app/globals.css:287,3127,3244,3440,4898,4928,6588,6603,6604,6634,7115,7118,7283`
- `app/photography/coverage/coverage.css:17,18,23,56,69`
- `app/cv/cv.css:637`

Most detector findings are false positives against the approved design:

- The four font warnings reject `Open Practice Hero`, `Open Practice Body`, and `Open Practice Evidence`. These are the current aliases for Anton, Inter, and Space Mono in [globals.css](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/globals.css:3). Historical `DESIGN.md` is stale for this audit.
- The font-size and color findings compare the current expressive system with that same historical file. Current CSS and the art-direction document explicitly permit different density and scale by visitor job.
- The radius warning is the mobile navigation dialog. It is not evidence of inconsistent card styling.
- The `side-tab` match is an inline status note responding to the coverage-type selector, not navigation or a decorative side tab.
- The width-transition warning is technically accurate but low risk. [DemoStoryProgress.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/components/DemoStoryProgress.tsx:119) changes the value only when the active chapter changes, not on every scroll pixel. A transform would avoid layout work without changing the intended progress feedback.

The literal error colors in coverage CSS remain modest token-maintenance debt even though the detector’s historical-design conclusion is wrong.

## Ranked issues

### 1. The Learn promise clips on mobile

**Evidence: observed live capture and source.**

[learn-mobile-top.png](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/learn-mobile-top.png) visibly cuts off “what you need to make.” The saved live DOM records `innerWidth: 800` and `scrollWidth: 958`, independently confirming horizontal overflow at another viewport.

The heading’s spans inherit `white-space: nowrap` from [globals.css](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/globals.css:1741). The mobile rule enlarges the heading but does not cancel nowrap. The cancellation exists only above 980px.

**Affected job:** A visitor deciding whether Learn contains an applicable path cannot read the page’s first promise.

**Smallest change:** In the mobile Learn rule, reset `.learn-opening h1 span` to normal wrapping and validate at 390px with a gate proven to detect known overflow.

**Scope:** Preserve/refit.

### 2. The global navigation contract breaks at runtime boundaries

**Evidence: partly observed; keyboard behavior is source-derived.**

The live album DOM contains “How I work,” while the approved label is “Sessions.” The stale label is present in both [Header.svelte](/Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/src/lib/components/layout/Header.svelte:39) and [Footer.svelte](/Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/src/lib/components/layout/Footer.svelte:42).

The three mobile implementations also have different behavior:

- React uses a native dialog with Search first, primary links, Now, Links, Escape handling, and focus return in [SiteHeader.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/components/SiteHeader.tsx:34).
- Astro uses a plain `<details>` containing primary links followed by Search. It omits Now and Links in [SiteHeader.astro](/Users/nino/Workspace/dev/sites/nino/blog/astro-build/src/components/SiteHeader.astro:47).
- Svelte uses `<details>` plus a conditionally rendered sheet. It also places Search last and omits Now and Links in [Header.svelte](/Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/src/lib/components/layout/Header.svelte:127).

Neither the Astro nor Svelte shared menu declares dialog semantics or implements a focus trap, Escape close, or focus return. The React dialog handles Escape and explicit close, but opening it does not create history state, so browser Back is predicted to navigate away rather than close the menu. Those interaction findings remain unmeasured because this worker could not drive a browser.

Direct-entry context itself is sound: the article capture provides “Back to all essays,” and the album capture provides Home → Albums → current album plus a Back action.

**Affected job:** A visitor moving between the portfolio, an essay, and a gallery must relearn the same “global” menu and may lose keyboard position.

**Smallest change:** Correct the Svelte label, then bring both non-React shells up to the documented menu order and close/focus contract. Add a cross-runtime acceptance fixture for labels, order, dialog semantics, Escape, return focus, and Back.

**Scope:** Visible refit. If drift recurs, shared-shell ownership requires structural rethink; a shared package is not automatically required.

### 3. Writing ships the complete publication as one hydrated interface

**Evidence: observed saved DOM plus source.**

The live Writing capture contains 306 pieces, approximately 410 KB of decoded HTML, a 47,167px document, and a 40,869-byte encoded WritingLibrary script resource. The page’s recorded resources total approximately 245 KB encoded.

[WritingLibrary.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/components/WritingLibrary.tsx:81) filters the full array in the client and maps every visible item into the page. `content-visibility: auto` in [globals.css](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/globals.css:3459) reduces offscreen rendering but does not remove the HTML, client data, hydration surface, or search work.

The saved extractor returned empty text for all 306 offscreen H3 elements. That is an evidence-extraction limitation caused by deferred rendering, not proof that assistive technology receives empty headings. An accessibility-tree check is still needed.

**Affected job:** A visitor who wants one essay pays for the complete publication before narrowing it.

**Smallest change:** Keep the URL contract, counts, and grouped publication model, but server-filter the initial query and cap or paginate each group with an explicit “show all” path.

**Scope:** Structural rethink.

### 4. Same-origin Writing navigation forces new tabs

**Evidence: source-derived; click behavior unmeasured.**

Every record adds `target="_blank"` in [WritingLibrary.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/components/WritingLibrary.tsx:223). Series links do the same in [blog/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/blog/page.tsx:107). These destinations remain on `ninochavez.co`; the Astro runtime boundary does not require a new tab.

**Affected job:** A visitor browsing several pieces loses ordinary Back behavior and accumulates tabs without asking for them.

**Smallest change:** Remove `target`, `rel`, the arrow, and the “opens in a new tab” assistance from same-origin writing and series links. Visitors can still request a new tab through standard browser controls.

**Scope:** Preserve/refit.

## Seams that currently hold

Work, Sessions, and Writing read filters from query parameters and update them with `router.replace`. Their counts are announced through `aria-live`, and zero states offer recovery. Whole-site Search uses a GET query, so `/search?q=…` is directly addressable. These are source-confirmed properties; typing, history restoration, and focus after filtering were not observed.

The article, album, and Rally HQ captures all provide useful direct-entry context. Global `:focus-visible` styling is present. The React mobile menu’s native dialog supplies a real modal focus boundary.

## Instrumentation and evidence limits

The saved JSON provides DOM text, link inventories, Navigation Timing, and resource entries. It does not provide LCP, CLS, INP, long tasks, accessibility trees, input traces, focus transitions, or cold-cache measurements. Several resources report zero transfer size, so the recorded load times cannot be treated as cold public performance.

The largest recorded encoded totals were approximately 628 KB for Home, 532 KB for Photography, and 245 KB for Writing. Photography’s recorded load was 3.08 seconds, but the cache state and external-image completion are unknown. These are capture facts, not performance verdicts.

Coverage explicitly tracks `page_view`, `request_open`, `form_start`, and `submit_error` in [CoverageRequest.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/photography/coverage/CoverageRequest.tsx:27). It has no client `submit_success` event. The gallery has detailed page, search, media, and engagement instrumentation, but the shared menu does not record open, close method, abandonment, or focus failures. No source inspected here measures cross-runtime navigation success or Web Vitals.

## Files and captures used

Governing material: `AGENTS.md`, `CLAUDE.md`, `reader-contract.json`, `docs/IA-NAVIGATION.md`, `docs/OPEN-PRACTICE-ART-DIRECTION.md`, Impeccable `SKILL.md` and `reference/critique.md`, and the Signal Dispatch voice guide.

Main source: `app/globals.css`, `app/components/{SiteHeader,SiteFooter,WorkLibrary,DemoLibrary,WritingLibrary,DemoStoryProgress}.tsx`, `app/blog/page.tsx`, `app/search/page.tsx`, `app/learn/page.tsx`, and `app/photography/coverage/{coverage.css,CoverageRequest.tsx}`. Latest claims came from `origin/main`.

Cross-runtime source: Astro `SiteHeader.astro` and `SiteFooter.astro`; Svelte `Header.svelte`, `Footer.svelte`, `src/routes/+layout.svelte`, and `src/app.html`. Photography files came only from `git show origin/main:<path>`.

Saved JSON used: `home.json`, `work.json`, `search.json`, `sessions.json`, `learn.json`, `writing.json`, `photography.json`, `about.json`, `coverage.json`, `rally-hq.json`, `article.json`, and `album.json`.

PNGs opened: `learn-mobile-top.png`, `learn-desktop-top.png`, `writing-mobile-top.png`, `writing-desktop-top.png`, `photography-mobile-top.png`, `work-mobile-top.png`, `search-mobile-top.png`, `rally-hq-mobile-top.png`, `coverage-mobile-top.png`, `article-mobile-top.png`, and `album-mobile-top.png`.

## Skipped steps and cleanup

No browser, server, port, overlay, network request, analytics query, SEO evidence, private-data API, or nested agent was used. Browser interactions, keyboard sequences, browser Back, and live accessibility-tree inspection remain for the parent.

The documented blog-source path `/Users/nino/Workspace/dev/apps/blog/astro-build` does not exist. The current owner found and inspected was `/Users/nino/Workspace/dev/sites/nino/blog/astro-build`, using its `origin/main`.

No files were written. No processes, tabs, fixtures, or servers were started. Existing untracked audit evidence and unrelated blog files were left untouched. Parent synthesis remains the forward-linked [ASSESSMENT.md](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/ASSESSMENT.md).