Found three confirmed regressions beyond the known album-hero and date-rail issues.

## Confirmed regressions

1. High — Session previews crop real evidence

Current CSS changes session images from `object-fit: contain` to `cover` in both the featured session and archive cards: [by-nino-library.css:354](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/by-nino-library.css:354) and [by-nino-library.css:462](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/by-nino-library.css:462).

- Previous behavior: `HEAD` used `contain`, padding, and a dark frame so the complete screenshot remained visible.
- Current behavior: portrait and near-square evidence frames are forced into landscape boxes. The featured 883×900 Browser frame loses its explanatory paragraph, command example, and lower navigation. The capture shows only the central title.
- Reproduce: open `/demos` at desktop or phone width. Compare the featured image with [demo-browser.jpg](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/public/work/demo-browser.jpg). Then scroll through session cards containing portrait screenshots.
- Smallest repair: restore `object-fit: contain` for both selectors and retain a dark containing ground. Do not impose `16 / 9` on contentful screenshots.

2. Medium — The writing front door removes the latest piece’s summary

[by-nino-frontdoors.css:233](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/by-nino-frontdoors.css:233) sets `.writing-featured__excerpt` to `display: none`.

- Previous behavior: `HEAD` rendered and visibly styled `latestPiece.excerpt`.
- Current behavior: the paragraph still exists at [blog/page.tsx:63](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/blog/page.tsx:63), but it is removed visually and from the accessibility tree at every viewport.
- Reproduce: open `/blog`. The latest-piece row contains only its label, title, form, date, and link. This is visible in [main-writing-desktop.png](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/site-wide-20260930/main-writing-desktop.png).
- Smallest repair: remove the `display: none` rule and give the excerpt a row or column in the refitted card.

3. Medium — Phone photography navigation is demoted below the hero photograph

The mobile grid now orders the front door as `register → stage → image → routes` at [by-nino-frontdoors.css:529](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/by-nino-frontdoors.css:529).

- Previous behavior: `HEAD` positioned the Events, Browse by date, Collections, and Saved photos deck inside the hero at its bottom.
- Current behavior: all four navigation controls come after a 4:3 photograph. In the existing 390×844 capture, none is visible; visitors see the search and then a large image.
- Reproduce: open `/photography` at 390×844. The first archive-navigation card only appears after scrolling past the photograph. See [main-photography-phone-final.png](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/site-wide-20260930/main-photography-phone-final.png).
- Smallest repair: place `routes` before `image` in the phone grid, or otherwise keep the route deck within the initial hero. The controls themselves and their `src` query propagation remain intact.

## No additional source regression confirmed

- Work’s domain map, complete archive, filters, query parameters, URLs, and prominent navigation remain in the source.
- `WorkLibrary`, `WritingLibrary`, `DemoLibrary`, shared navigation components, `globals.css`, and `layout.tsx` are unchanged from `HEAD`.
- I found no changed defaults, sorting, filter coverage, empty-state logic, metadata, privacy behavior, or cache behavior in the reviewed delta.
- The new homepage links resolve to existing routes, and both newly referenced image assets exist.
- The two new CSS files remain untracked. That is a delivery risk, not a current rendered regression: they must accompany the route imports in the eventual changeset.
- `by-nino-library.css` contains broad global selectors despite claiming route scoping. Cross-route CSS persistence remains an unverified runtime risk; this source-only audit cannot establish whether VineNext unloads those styles during client navigation.

Reviewed: all 18 changed public `page.tsx`/`not-found.tsx` templates; both untracked refit stylesheets; `globals.css`; coverage and CV styles; layout; Breadcrumbs, DemoLibrary, DemoStory, DemoStoryProgress, SiteActivity, SiteFooter, SiteHeader, WorkLibrary, and WritingLibrary. Generated writing/demo JSON was excluded from styling-worker attribution. No build, server, browser automation, network access, or file write was performed.