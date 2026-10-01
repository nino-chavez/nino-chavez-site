# The refit preserves more of the existing experience; release checks remain

The September 30 continuation completed two fresh independent reviews and repaired the remaining confirmed styling losses. Tutorial exercises, checkpoints and templates again have distinct, readable colors. Writing now keeps the same spacing after a footer link from Sessions and after a direct load. Main-site styling changes are restricted to their owning routes.

The gallery viewer now takes keyboard focus, keeps Tab inside it, and returns focus to the photo on close. Saved hearts, counts and the saved list now update immediately; persistence and removal survive reload. These two interaction defects were already present before the refit. The new browser checks caught them before repair and pass afterward. The download check also caught WebP data being delivered under a `.jpg` name. The proxy now requests JPEG; the browser check verifies the actual format.

The [continuation report](reviews/refit-continuation-20260930.md) records the independent reviews, before/after evidence, verification and remaining limits. The [earlier regression report](reviews/regression-rerun-20260930.md) records the album, timeline, publication-navigation, search, image-crop and presentation repairs. Historical statements below are superseded where these reports record corrections.

The compact album opening, scroll-linked year/month timeline, Popular photos, existing filters, complete content and public URLs are retained. Main production/HTML tests, audit checks, static checks and lint pass; lint has ten warnings and no errors. Publication build, gallery static check/build, viewer-navigation tests, Saved transition tests and the four new real-data browser journeys pass.

Changes remain local and unpublished. Consent persistence, actual external sharing, bulk ZIP delivery, valid unlisted-share access, physical phones and production one-host routing remain unverified. The local gallery preview blocks production writes. Tutorial Copy showed its success message, but its clipboard payload was not verified through the in-app browser. No analytics or SEO improvement has been measured.

## Historical selected-B implementation — superseded where corrected above

Nino selected B, By Nino, on September 30. The real article and album routes now use that direction: clear authorship and event context, a substantial source image, and a compact phone opening. The article has a light reading surface; the gallery retains its current charcoal and metallic-gold palette. Nothing was committed, pushed or deployed in this selected-direction step.

## The selected pages work with real content

The article retains its full source text, source image disclosure, canonical URL, series and related links. Its compact publication masthead exposes All essays and the real Pagefind search. Phone contents expand and navigate to the selected section. The parent inspected the opening at 320, 390 and 1440 CSS pixels, the reading body, and built search results. Search titles, highlights and the close control were corrected for the light theme. The no-image route uses one column; the series route retains previous, next and full-series destinations. The complete normal publication build passes.

The album identifies the event, source date, count and photographer before a configured cover photo. Browse photos leads to the searchable collection; mixed albums say Browse album. Existing lightbox, saves, download and share controls remain available. Repeated category badges are omitted within the album grid. Popular photos follow the complete collection. The parent inspected Millikin at 320, 390 and 1440 CSS pixels, search recovery, the viewer, JCA's 48-to-96 pagination and full 120-photo search, and the real 73-photo/116-video mixed album. The new cover field comes from an existing query; no database changes were made.

See the [selected frames](evidence/selected-b-20260930/article-phone.png), [album frame](evidence/selected-b-20260930/album-phone.png), [reading frame](evidence/selected-b-20260930/article-body-phone.png), [search frame](evidence/selected-b-20260930/article-search-phone.png), and [browser observations](evidence/selected-b-20260930/viewport-observations.json). A fresh [independent review](reviews/selected-b-cold.md) opened nine implementation frames and found no blocking visual defect. The parent verified image calls and returned images in the full child transcript. The shorter Operator event stream omits those calls; an earlier mistaken exclusion of the concept review has been corrected. The gallery's final static check and production build pass. Its canonical-name preservation and existing viewer navigation tests also pass.

The article implementation is in `blog/.worktrees/codex/referral-design-b-20260930`, based on `2dd2f03`. The album implementation is in `nino-chavez-photography/.worktrees/codex/referral-entry-20260930`, based on `3a1bd85`. Documentation and comparison artifacts remain in this main-site worktree. The publication worker's requested route is recorded by Operator; absent runtime model fields are not presented as proof of which model ran. Branch refs did not move during its work.

Local review URLs:

- [Selected article](http://127.0.0.1:4325/blog/the-work-doesnt-end-at-send)
- [Selected album](http://127.0.0.1:4322/photography/albums/college-womens-vb-millikin-at-north-central-09-23-2026-DWdCET)

This is a local implementation and browser review. It does not establish a traffic or SEO gain, physical-phone acceptance, production routing, successful download delivery, external sharing, or save persistence. The gallery preview blocks browser POST requests. Actual empty and video-only albums were not available in this review. The selected direction keeps the existing hostname and public destinations; the production router was not changed.

## Earlier decisions remain separate

Nino rejected all three Work concepts. The recommendation is to retain `/work` as a secondary complete archive, with direct project pages doing the work for specific referrals. Its job would be to show the full public body of work and current availability. That is useful when someone deliberately wants breadth; the available evidence does not establish that it deserves the first navigation position.

This recommendation is not an implemented navigation change. The archive, domain data, filters, project URLs, and existing navigation position remain intact. No fourth concept is being developed in this round. Nino's September 30 referral report now makes article and gallery entrances the first review priority. The homepage's primary outcome remains undecided.

## Earlier referral review — superseded for the selected article and album presentation

Nino reports that he sends most people through LinkedIn blog crossposts or social-media photo-gallery posts. This identifies how he shares links. It does not measure the audience's source distribution or prove what visitors do afterward.

An article should deliver the promised reading without a homepage detour. An album should identify the event, show photographs, and let someone use the photograph they came for. The wider site remains available through the common navigation. Neither entrance needs to make a visitor understand every project before completing that immediate task.

The article refit already puts the title and introduction before the image. A fresh [independent review](reviews/referral-entrances.md) found no additional styling or structural change necessary. It judged the article and album frames before inspecting their source. The parent also opened the frames directly.

One album issue remained: the heading cut off the event name on phones, hiding the opponent and date. The follow-up lets the complete heading wrap and places the photo count below it. Real published album captures at 320, 390, and 1440 CSS viewport widths show the event identity, search, and photographs without horizontal overflow. Phone photos remain visible in the first viewport. See the [phone frame](evidence/referrals-20260930/album-phone.jpg), [narrow frame](evidence/referrals-20260930/album-narrow.jpg), [desktop frame](evidence/referrals-20260930/album-desktop.jpg), and [measurements](evidence/referrals-20260930/viewport-observations.json).

The parent opened a phone photo, inspected its existing download and share controls, advanced to the next photo, and returned to the album. The [photo-action frame](evidence/referrals-20260930/photo-actions-phone.jpg) shows those controls. Whole-album actions remain desktop-only. The referral report does not establish a need to add mobile bulk actions. Download delivery and external sharing were not exercised.

The follow-up lives in the gallery's `codex/referral-entry-20260930` worktree, based on the checked `3a1bd85` refit. Its static check, production build, navigation checks, and updated reader-review receipt pass. The main brief now records the referral priority. These additions remain local and uncommitted. The publication candidate has no new changes.

The gallery preview uses the project-owned `tools/ux-preview.config.ts` through Vite's existing configuration option. It blocks browser mutation requests during review against public production data. An attempted telemetry POST returned 403. The ordinary build uses the existing Vite configuration.

Analytics remain evidence for choosing which task needs attention. Page loads and sampled referrers do not establish reading completion, a successful photo download, the visitor's occupation, or a better homepage layout. Further Mobbin reference research or Impeccable styling should address a specific unresolved task. This review found no reason to start another visual direction.

What this means: keep the existing refit, improve the confirmed album identification issue, and evaluate the pages Nino actually shares before reopening Work or the homepage's purpose.

## The repairs make the existing paths easier to use

- Home exposes a named Rally HQ action and real product proof earlier on a phone. Its selected work grid no longer inherits the desktop column count at phone widths.
- Learn wraps its long heading, compares outputs more clearly, and fits within the page. Later CSS rules no longer override the intended desktop type scale. Writing's desktop title scale received the same correction.
- Photography's entrance has a clearer image crop, text overlay, and search panel. The coverage page uses the existing type family with adjusted display tracking.
- The three applications use the same global labels and menu order while retaining publication and photo-finding controls. Keyboard focus wraps in both directions. Escape, Close, route selection, and Back close the menus without leaving an extra menu entry in navigation history.
- Same-site essays, series, writing search results, and related writing use ordinary same-tab navigation. External product destinations retain their existing behavior.
- Main-site entrances now emit an apex canonical URL, including query-based Work and Search pages. This repairs page identity; it does not establish an indexing or traffic gain.
- The gallery's long album breadcrumb fits a phone. Existing album viewing and lightbox navigation remain available.

What this means: the current site can be reviewed as a working candidate without selecting a new Work model or replacing its brand.

## The rejected concepts do not answer the purpose question

All three concepts were comparison artifacts. Each retained the full collection, but each assumed a prominent Work entrance was necessary. Nino's rejection challenges that premise as well as their appearance.

The [independent Work review](reviews/work-job.md) recommends a secondary archive. Home already supplies selected proof and a domain map. Search retrieves remembered things. Links supplies usable destinations. Work's remaining distinct value is complete inspection, including work that those entrances omit.

The historical analytics show page loads, not why people visited or whether they made a useful decision. They cannot settle archive prominence, prove that a new design would improve conversion, or justify deleting project evidence. The audit's historical numbers remain in their existing local evidence files.

What this means: do not use SEO, completeness, or a prettier inventory as substitutes for a visitor's actual task. Keeping one hostname does not require this particular collection entrance.

The recommendation would change if real referrals independently sought the full body of work, used the archive's metadata, and found relevant evidence they otherwise missed. Removal would require evidence that complete inspection adds no useful discovery. The next real referral is the appropriate starting point; no messages to visitors were sent.

## Earlier visual review — before Nino selected B

The [cold rendered review](reviews/cold-render.md) found a coherent visual system and no release-blocking visual defect in the reviewed frames. It recommended preserving the light global shell and the distinct publication and gallery environments. Nino's preference for the homepage image and desktop pacing remains open.

The reviewer flagged a $250/$350 source conflict. The current [September 9 offer correction](../../coverage/lead-operations.md#introductory-price-correction--september-9), current offer code, and rendered page all specify $250. The older IA reference was stale and has been corrected. Commercial terms were not changed by the refit. The original review is preserved rather than silently rewritten.

The gallery's lower thumbnails were blank in the initial capture. A later [scrolled observation](evidence/gallery-scroll-observed.jpg) shows loaded photographs farther down the collection. The capture alone cannot establish a persistent missing-image defect. No image-loading rewrite was made.

What this means: another styling round is unsupported. Work's purpose and the homepage's intended first impression are the remaining product decisions.

## The checks cover local builds and observed browser behavior

| Surface | Completed checks | Evidence |
|---|---|---|
| Main application | Static check; lint with eight existing warnings and no errors; production build and rendered HTML checks; audit regression checks | Local command results; [canonical negative control](evidence/canonical-negative-control.json) |
| Main standalone checkout | Fresh independent clone, dependency install, public production test using the existing published-feed fallback | [Clean-checkout receipt](evidence/clean-checkout.json) |
| Publication | Production build after the article-title and menu repairs | Local build result; article and menu captures |
| Gallery | Static/Svelte check, production build, navigation contract checks, refreshed reader-review source receipt | Gallery review branch and its `docs/reader-audits/gallery-interface.json` |
| Browser behavior | Main and publication menu focus/Back/search; gallery focus/Back, real event and album, lightbox Next/Escape; Work empty-state recovery and domain filter | [Menu observations](evidence/menu-checks.json); phone captures; parent interactive observations |
| Intermediate width | Ten main routes measured at 800 CSS pixels without document overflow | [Tablet measurements](evidence/responsive-tablet.json) |
| Appearance | Desktop and phone entrance captures, article body, album and lightbox; parent inspection and independent cold review | [Capture manifest](evidence/capture-manifest.json); [review](reviews/cold-render.md) |

The overflow check encountered a real failing album breadcrumb before the fix. Its document scroll width changed from 485 to 378 CSS pixels at a 378-pixel client width. The canonical check also rejected the older Work build with no canonical. These are observed failures, not checks that have only shown green.

The committed candidate's owned content refresh produced 306 writing items and nine series. The clean checkout also produced 306 items and nine series through the published-feed fallback. The category sets differ between those sources, so passing the clean build does not claim identical content snapshots. Generated indexes were refreshed with their owning scripts, not hand-edited.

What this means: implementation and local rendering are checked. Human visitor success, production routing, and traffic gains have not been measured by these checks.

## The review branches remain local

| Repository | Branch | Source commit before documentation closeout |
|---|---|---|
| Main site | `codex/frontend-refit-20260929` | `6995badba04daf148e860bc7274381caef431455` |
| Publication | `codex/frontend-shell-20260929` | `eaf6ab4` |
| Gallery | `codex/frontend-shell-20260929` | `3a1bd85` |

The original main-site branch refs were compared before and after dispatch; none moved. See [the ref comparison](evidence/branches-after.json). Original checkouts and unrelated worktrees were preserved. Review worktrees remain available; they have not been merged or published.

Operator classified and dispatched the bounded workers. The saved receipts record requested routes. Observed child model and effort fields were unavailable, so the requested models are not presented as verified runtime facts. No new persistent sidebar task was created.

## Production and visitor outcomes remain separate

- The three local applications ran on separate ports. A complete Home → article → album → Work journey on one hosted hostname was not observed for this candidate. The production router was not modified.
- The review used browser desktop, phone, and intermediate-width states. It is not physical-phone acceptance, measured Core Web Vitals, or a complete cold/warm-cache performance study.
- Coverage persistence, email delivery, downloads, saves, authentication, and share delivery were not newly exercised as production operations. Existing commercial behavior was preserved.
- Search Console changes, legacy-host redirects, deployment, and post-release analytics were not performed. Existing automation must be considered before an authorized push.
- No preference approval is inferred from the cold reviewer. All three Work concepts remain rejected, and the homepage priority question remains unanswered.

What this means: this round closes with a tested local refit and a clear negative result for the three concepts. Further design work starts with the visitor's decision, not another rearrangement of the archive.
