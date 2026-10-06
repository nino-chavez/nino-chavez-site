I found six concrete regressions. The two most serious losses are that important reading context now appears after the essay, and article pages no longer expose the publication navigation.

## Confirmed regressions

### P1 — Challenge disclosure appears only after the full essay

Current source: [[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/[slug].astro:142), with the counterpoint at line 167.

- Previous: the “This post has been challenged” banner appeared before the article body.
- Current: `<Content />` renders first. The challenge appears in the post-reading support area.
- Impact: a referred reader can consume the entire argument without learning that a published counterpoint exists.
- Browser reproduction: open `/blog/the-metering-phase`; the counterpoint link should not appear until after the essay.
- Smallest repair: move the existing counterpoint banner above `<Content />`. Its current styling and destination can remain.

### P1 — Article pages lose publication sections and RSS

Current source: [SiteHeader.astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/SiteHeader.astro:123) and [[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/[slug].astro:81).

- Previous: every essay exposed Essays, Series, Fiction, the More menu, mobile Sections, search, and RSS inside a navigation landmark.
- Current: `variant="article"` suppresses that entire header. The replacement at lines 83–86 offers only Signal Dispatch, All essays, and Search inside a generic `<section>`.
- Impact: readers arriving from LinkedIn or social posts lose direct routes to Series, Fiction, Whitepapers, Presentations, Tutorials, Counterpoints, Tags, and RSS. Screen readers also lose the Signal Dispatch navigation landmark.
- Browser reproduction: open `/blog/the-work-doesnt-end-at-send` and compare its publication controls with `/blog/archive`.
- Smallest repair: retain the shared publication header on articles, or add an equivalent Sections control and RSS link inside a real `<nav>`.

### P2 — Series position and previous/next controls moved below the essay

Current source: [[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/[slug].astro:159).

- Previous: `SeriesNav` appeared before the article body, identifying “Part N of M” before reading.
- Current: the same component appears after `<Content />`.
- Impact: a cold visitor can begin a middle chapter without knowing its position or seeing the previous-part control.
- Browser reproduction: open `/blog/the-human-loom`; series context should appear only after the body.
- Smallest repair: move `SeriesNav` above `<Content />`, or retain a compact series-position control there while leaving full previous/next navigation below.

### P2 — The mobile archive filter becomes a large sticky obstruction

Current source: [BlogList.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/BlogList.tsx:24) and [publication.css](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/styles/publication.css:423).

- Previous: five categories with at least ten posts were shown individually; seven smaller categories were grouped under Other.
- Current: all twelve categories render as separate buttons. The entire search-and-category block is sticky.
- Impact: on the supplied phone capture, the filter occupies roughly 330 pixels before any article content and remains pinned while scrolling. Fourteen controls now replace the previous eight.
- Visual evidence: [publication-archive-phone.png](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/site-wide-20260930/publication-archive-phone.png).
- Browser reproduction: open `/blog/archive` at phone width and scroll past the header.
- Smallest repair: restore grouping for rare categories, or make the category list horizontally scrollable/non-sticky while preserving access to every category.

### P2 — Archive rows no longer have a full-card link target

Current source: [BlogList.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/BlogList.tsx:70).

- Previous: the entire featured or latest card was one link.
- Current: only the title and image navigate. Category, date, excerpt, and row whitespace do nothing.
- Impact: the pointer target is substantially smaller, especially on text-only rows.
- Browser reproduction: open `/blog/archive` and click an excerpt or empty row space.
- Smallest repair: add a stretched article link while keeping tag buttons above the link overlay and independently operable.

### P3 — Whitespace-only search activates a false results state

Current source: [BlogList.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/BlogList.tsx:37).

- Current filtering trims the query, but `filtersActive` and the status message use the untrimmed value at lines 52 and 150.
- Impact: entering spaces matches every essay while hiding Featured and claiming the archive is showing results matching a visually empty query.
- Browser reproduction: enter several spaces in archive search.
- Smallest repair: derive filtering, active state, and status text from one normalized query.

## Verification hold

The supplied phone presentation frame shows a blank blue Next button: [publication-presentation-phone.png](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/site-wide-20260930/publication-presentation-phone.png). Current source adds arrow-visibility overrides in [[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/presentations/[slug].astro:1342), so the capture may predate that repair. This needs phone verification; I did not count it as confirmed.

## Retained behavior and intentional boundaries

Search, category/tag filtering, load-more, whole-site empty-state search, TOC links, reading progress, slide navigation, tutorial copy controls, sharing, and related-post links remain in source.

All declared local `featureImage` paths resolve to files. The removed images are synthetic category fallbacks, not content-owned feature images, so I did not classify that removal as a regression.

Reviewed: all 13 modified tracked files, both untracked style sheets, `archive.astro`, `SearchModal.astro`, `PresentationNavigation.tsx`, tutorial detail/copy controls, the content schemas, feature-image references, and relevant HEAD versions. No build, server, browser automation, or interaction test was run.