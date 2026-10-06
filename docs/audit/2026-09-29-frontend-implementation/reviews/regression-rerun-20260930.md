# The refit introduced regressions that the visual review missed

The confirmed regressions below are repaired in the local candidate. The rerun combined comparison with each repository's HEAD, independent reviews, existing test suites, and direct phone/desktop browser checks. It does not certify every route or action. No changes were committed, pushed or published.

The largest mistake was treating cleaner presentation as evidence that behavior was preserved. Useful context disappeared or moved behind the work it was meant to explain. Earlier visual-clearance statements are superseded by this report.

## Restore the visitor's existing tools and context

| Area | Regression and consequence | Current repair and evidence |
|---|---|---|
| Album opening | A separate cover hero and Browse photos step delayed the collection. Nino identified this. | Compact title, event/date, count, authorship and Share; retrieval tools and photos follow. [Current phone](../evidence/site-wide-20260930/regression-rerun/album-phone-final.jpg). |
| By date | The scroll-linked timeline became isolated year buttons. Nino identified this. | Restored year/month rail, progress and older-period loading. Year and January 2023 jumps were observed. The sticky year heading begins at 239px, exactly below the rail. [January 2023, visible window region](../evidence/site-wide-20260930/regression-rerun/timeline-month-verified.jpg). |
| Album discovery | Popular photos moved below the initial photo page; photo-specific category metadata was hidden. | Popular rail restored before the grid; metadata restored on hover/focus. Album viewer Next and Escape were exercised. |
| Gallery retrieval | Search/filter/download utility rows lost sticky positioning. | Compact utility rows now sit below shared navigation. Album search stayed at 108px while scrolling on a phone. Valid shared-album runtime remains untested. |
| Article context | Challenge disclosure and series position moved after the essay. | Existing banner and series navigation restored before the body. Observed on The Metering Phase and The Human Loom. [Challenge context](../evidence/site-wide-20260930/regression-rerun/article-desktop.png). |
| Publication navigation | Articles lost Sections, format destinations and RSS. | Shared publication navigation restored; mobile Sections and all destinations observed. Search button contrast repaired after restoring the header. |
| Essay archive | A large sticky filter obstructed phone reading; excerpts/whitespace stopped being link targets; spaces triggered a false search state. | Phone filter is static with horizontal subjects; full row links restored with independent topic buttons; one trimmed query drives search and status. [Current phone](../evidence/site-wide-20260930/regression-rerun/archive-phone-final.jpg). |
| Session proof | Source screenshots changed from contain to cover, cutting away content. | Whole source frame restored in feature and archive images. [Current desktop](../evidence/site-wide-20260930/regression-rerun/sessions-desktop-final.jpg). |
| Writing entrance | The latest piece's summary was hidden at every size. | Summary restored in the existing card. Source and earlier repaired phone/desktop frames checked. |
| Photography entrance | Phone archive-navigation links moved after a large image. | Events, By date, Collections and Saved links restored ahead of the image. Existing destinations and query propagation retained. |
| Site search | Shared Work row styling placed search descriptions in a 22px third column. | Separate search layout: descriptions measured about 997px at desktop and 354px at phone width. [Desktop result region](../evidence/site-wide-20260930/regression-rerun/search-results-final.jpg), [phone result region](../evidence/site-wide-20260930/regression-rerun/search-results-phone-final.jpg). |
| Presentations | General button styling turned the slide dots into pale rectangles and crowded the title. | Explicit dot sizes, spacing and contrast restored. Clicking dot 3 reached 3/17; phone Next reached 2/17 with visible arrows. [Desktop](../evidence/site-wide-20260930/regression-rerun/presentation-desktop-final.jpg), [phone](../evidence/site-wide-20260930/regression-rerun/presentation-phone-final.jpg). |
| Fiction | Archive paragraph styling overrode fiction's primary body color. | Fiction paragraphs now use #14202e instead of muted #5a6472; Georgia and reading measure retained. This was an unintended hierarchy loss, not a claimed WCAG failure. [Body region](../evidence/site-wide-20260930/regression-rerun/fiction-body-final.jpg). |
| Collection covers | Portrait frames became landscape, removing substantially more of the portrait cover images. | Original 3:4 ratio restored after direct comparison. [Restored covers](../evidence/site-wide-20260930/regression-rerun/collections-restored-desktop.jpg). This restores the baseline crop, not an uncropped-image guarantee. |

What this means: the refit retains the chosen visual direction while recovering the functions and information visitors already had. Another redesign is not justified by these failures.

## The local checks pass within a bounded scope

| Application | Final checks |
|---|---|
| Main | `npm test` (production build and rendered HTML), `node --test tests/audit-regression.test.mjs`, `npm run check`, `npm run lint`, `git diff --check`. Lint: zero errors, ten warnings. |
| Publication | Normal `npm run build` after final slide/fiction repairs; `git diff --check`. Build caption notices remain separate from this UX review; source prose was not rewritten. |
| Gallery | `npm run check`, normal `npm run build`, `git diff --check`; existing navigation, lightbox-navigation, pagination, canonical-album-name and collection tests. Manual reader-review receipt refreshed with actual scope and exclusions. |

Additional observed interactions: publication search returned nine results for `metering`; archive whitespace kept Featured; exact-title search returned the featured essay; no-match recovery and Load more worked; a topic button filtered without opening the row; clicking the row opened the correct essay. Gallery global search returned 442 Millikin results. Main Search → Sessions navigation retained the expected layout. Earlier representative public-page captures supplement these focused reruns; they are not proof that every interaction was repeated.

Impeccable source checks are saved beside the captures. Their font/style warnings do not establish a functional regression or justify replacing owned fonts and authored deck styling. They are not a substitute for the interactions above.

## Review evidence has limits

- [First main review](regression-first-main.md), [publication review](regression-first-publication.md) and [gallery review](regression-first-gallery.md) record the losses before repair.
- [Fresh main review](regression-rerun-main.md) found the search defect. Its desktop Sessions clipping verdict is not accepted: the supplied screenshot omitted the right edge. The fresh complete 1440px frame shows the entire card, whose right edge is 1380px; document width is 1440px. A `min-width: 0` guard is now explicit.
- [Fresh gallery review](regression-rerun-gallery.md) found no additional confirmed source regression and flagged cover cropping for inspection; the parent then inspected and restored those covers.
- Publication dispatch `d2b73a0c-d1c0-4c69-a4fb-6b499af55a88` hit its 900-second limit without a final report. Its partial commentary flagged slide-control contrast and fiction color. The parent reproduced both in the browser and repaired them. This is not an independent completed verdict.
- [Source and dispatch record](../evidence/site-wide-20260930/regression-rerun/source-and-dispatch.json) identifies worktrees and HEADs. Branch refs were unchanged. Requested model routes are recorded; missing runtime model/effort fields remain unverified.
- Some early rerun images were document crops mistaken for current scrolled viewports. `timeline-2024-phone.png`, `timeline-month-desktop.png`, `timeline-month-desktop-visible.jpg`, and `sessions-desktop.png` are excluded from the final proof. The linked January capture is explicitly a visible-window region, accompanied by observed DOM positions. Final opening frames use explicit complete-viewport captures at scroll position zero.

What this means: independent review helped find defects but also produced a false positive from an incomplete capture. The parent checked the evidence before accepting either conclusion.

## Release acceptance is still open

The local preview blocks gallery POST writes. Actual download delivery, save and consent persistence, a populated Saved view, a valid unlisted share, physical phones, and production one-host navigation were not exercised. Form submission and production data were not changed. The existing lightbox did not restore focus on Escape; its unchanged implementation makes this a baseline issue, not a refit regression. Broad stylesheet selectors remain a cross-route risk beyond the navigation paths actually exercised.

These checks establish local repairs, not visitor success, identity, conversion or SEO improvement. A failed delivery/persistence check, a new route-specific defect, or a real-device failure would change the readiness decision. The candidate remains unpublished until those relevant release checks and human review are complete.
