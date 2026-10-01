# Concept A is live

Released October 1, 2026 at [ninochavez.co](https://ninochavez.co/), following the explicit “ship it” instruction. The local-review record below is retained as a dated record of what was known before release.

## Production release

The homepage again uses the full-bleed photograph. Writing, Building, Photography and About now form the shared navigation across the main site, publication and gallery.

The technology stacks remain separate: React/VineNext for the main site, Astro for the publication and SvelteKit for photography. The existing router joins their public paths. Minder, The Rotation, apps.ninochavez.co and Work Library were not migrated or redeployed in this release.

| Surface | Merged source | Deployment receipt |
| --- | --- | --- |
| Main | `4ae7ce1552b10b3e5eb7acd94766af17d6c6a656` — [PR 33](https://github.com/nino-chavez/nino-chavez-site/pull/33) | Worker version `c7eeb98c-c16b-40a3-a6bd-275c4b88074d`, deployment `7f4430d4-3143-43eb-8e96-07c268113f96`, 100%, 06:05:47 UTC |
| Publication | `7250499b2d2838ab12917c712c5226216f53766b` — [PR 52](https://github.com/nino-chavez/blog/pull/52) | Pages `a6b469b2-ea46-4c5f-8ec9-b96ce3e0e3d2`, production success at 06:08:02 UTC |
| Photography | `0fb0231702e5df3c895c8a61399a0e18332ce2af` — [PR 180](https://github.com/nino-chavez/nino-chavez-photography/pull/180) | Pages `ebce0f4d-e8d9-41a8-8a6e-6aae13bf6419`, production success at 06:06:49 UTC |

The release branches incorporated current production before publishing. This preserved the newer analytics reporting, consent and scheduled intelligence work. The shared tracker now returns HTTP 200. Main and article HTML each include it once; the gallery keeps its existing collector. The earlier missing-asset issue was a stale local-worktree gap and is resolved.

## Release checks

- Fresh dependencies and all three production builds passed. Main checks, lint, coverage, rendered HTML and audit regression tests passed. Gallery static, navigation, analytics and reader checks passed.
- The merged local site passed 26 route/viewport checks, with a failing overflow canary proved first. Four real-data gallery journeys and eleven intercepted tracker cases passed. Intercepted cases prove the consent behavior in the fixture, not production ingestion.
- D1 reported no pending migrations. The linked Supabase dry-run reported the remote database up to date. This release changed no schema or companion Worker.
- Live HTTP checks returned 200 for 17 representative paths and redirect destinations. Older commerce, whitepaper and presentation links still reach their intended pages. Public main pages retain their canonical URLs and indexable metadata. Analytics choices and the analytics report remain noindex.
- The parent opened live desktop/phone homepage and essay captures, plus phone album and timeline captures. The full-bleed image, text-first essay, compact album, Popular rail and date timeline are present. Mobile overflow checks returned zero and the album viewport images decoded successfully.
- The analytics report returns 200 on its separate hostname. No new production events were fabricated, and improved engagement or conversion has not yet been measured.

[HTTP observations](release-20261001/http-checks.json) and [live homepage](release-20261001/live-home-desktop.png) are saved beside the phone album, timeline and essay captures.

Main deployed with the documented manual fallback from a clean checkout of the merged revision. GitHub run `36822917965` confirmed its automatic deploy is still dormant because the Cloudflare Actions credentials are absent. Both Pages projects deployed through their existing GitHub integrations. No deployment settings, credentials or DNS were changed.

Phone evidence is responsive browser evidence, not physical-device acceptance. Private owner screens were not rerun. The existing tutorial duplicate H1 and authored image-credit placement remain outside this release check. No outcome is inferred from the visual review alone.

---

# Local review snapshot — September 30, 2026

Selected direction: **In the field**, approved with “go with A. less is more.”

Review the combined site at http://127.0.0.1:4343/. This serves the actual main, writing and gallery builds through the existing routing rules. It is a read-only local preview. Nothing was committed, pushed or deployed.

## What changed

- Restored the full-bleed homepage photograph with one introduction and three entrances into the work.
- Unified global navigation as Writing, Building, Photography and About.
- Made Building the home for products, studies, process and guides. Minder, The Rotation, Rally HQ, Cutting Board, Yawn and public Work Library content have explicit destinations and availability labels. Featured products also appear in Building filters and global search; their record-update date is not presented as a release date.
- Applied warm reading surfaces, dark photography chrome and consistent typography. Standard essays begin with text; their existing illustration follows the essay. Authored prose remains unchanged.
- Removed repeated introductions from Guides. Reduced competing photography counts and repeated album headings.
- Preserved compact album identity, the Popular rail, actual date timeline, saved photos, downloads and viewer controls.
- Removed the old cross-document transition opt-in. A controlled comparison reproduced an error when leaving the main app for writing with the opt-in and no error without it.

B contributed compact reading and truthful availability labels. C contributed earlier access to work. Their busier front-page structures were not carried over. The existing URLs and operational product stacks remain.

## What was checked

The final main build, static checks, lint and 52 rendered/audit tests passed. Lint retains eight existing image warnings and no errors. Coverage tests passed before the final catalog-only addition. The catalog addition has a new regression check proving all five newly indexed products appear in both Building filters and site search with the correct destination and availability.

The blog production build passed. The gallery build passed its navigation/head/reader checks; the final small album-label change was subsequently rebuilt, visually inspected, and its reader receipt refreshed and checked.

The browser walk covered 13 representative routes at 1440 and 390 CSS pixels: home, Building, Writing, About, Photography, Process, Guides, Rally HQ, Privacy, essay, tutorial, album and timeline. All 26 checks passed: HTTP 200, no horizontal overflow, no broken loaded images in the viewport and no page errors. The overflow check was first proved against an injected 4-pixel overflow. Mobile Menu Escape, browser Back and focus restoration passed across all three applications. Cross-application writing navigation and direct filtered Building entry passed. Captures and results are in `evidence/`.

Four gallery journeys passed after the final label change: desktop and phone viewer keyboard/focus, saved-photo reload/removal, and downloading bytes that decode as a JPEG. The parent also observed the final hydrated Minder search result in the in-app browser.

The independent reviewer opened seven representative desktop and phone captures. The direction survived. Its actionable mobile findings were corrected and inspected by the parent: shorter archive navigation labels and a persistent album search explanation. The private preview banner remains because it is already omitted in public mode. See `cold-review.md` for the actual review and disposition.

## Limits before publication

This is local design and functional evidence, not production acceptance or an analytics outcome. Phone captures are responsive browser views, not physical-device testing. Private/unlisted access, consent persistence and live analytics collection were not accepted by this pass.

The tutorial route retains an existing pair of top-level headings from its template and authored content. This was recorded separately from the new work.

The local blog requests `/photography/site-activity.js`, but this gallery worktree does not contain that tracker endpoint and returns 404. The request already exists in the blog baseline commit `2dd2f03`; this is a cross-worktree analytics integration gap, not a proven production outage. Reconcile the analytics implementation before publishing these worktrees together. No collection or visitor-identity claims are made from this preview.

The independent review covered initial viewports. Deeper states have only the bounded functional and parent checks described above. Mobbin was not used as authenticated comparative evidence in this implementation pass.

## Source and dispatch record

Integration source:
- Main: `nino-chavez-site/.worktrees/codex/frontend-refit-20260929`
- Writing: `blog/.worktrees/codex/referral-design-b-20260930`
- Gallery: `nino-chavez-photography/.worktrees/codex/referral-entry-20260930`

Existing dirty work was preserved. Three isolated worker branches were created from the intended source snapshots. No existing branch tip moved; `ref-comparison.json` records the comparison.

Completed Operator dispatch receipts:
- Building: `7d2dcd0f-cbaa-49a3-919c-bfda3de65dfb`
- Writing: `09708893-73a8-4c0c-b2f7-c8d8683d65de`
- Independent visual review: `decadcbb-6921-4690-a248-65248d20984d`

Classification timeouts prevented the gallery worker from starting; the parent implemented its bounded changes. The independent review succeeded on retry. Receipts record requested routes; the runtime did not expose model/effort fields, so those remain unverified. Receipts live under `~/.local/state/nino-operator/dispatch/<id>/`.

Local review processes: main 4344, writing 4341, gallery 4342 and the read-only combined origin 4343. The redundant 4340 dev process was stopped. Earlier user previews were left alone.

## October 1 morning: Home and Writing density refit (local review)

Nino's production screenshots exposed two composition problems after release: Home's destination headings competed with text inside the images, and Writing spent most of the first screen on its introduction and latest-piece feature. This follow-up keeps Concept A and changes those two surfaces only.

Home now presents three equally weighted image previews with separate captions. On phones the destinations become compact image-and-text rows. The full-bleed opening's markup and every hero CSS declaration are byte-for-byte equivalent to the released source at `850f861`. Existing destination copy, images and URLs remain available; the three route names are now the destination headings.

Writing's title band, latest-piece feature, filters and group headings use less space. The latest feature uses the available desktop width. Phone filters share a row where they fit and wrap at 320px. All controls retain at least 44px height. The complete archive, source content, series, and query behavior are unchanged.

Fresh Chrome measurements at 1440 × 900:

| Region | Released production | Local revision |
| --- | ---: | ---: |
| Writing introduction height | 369px | 148px |
| Writing controls start | 839px | 399px |
| First archive record starts | 1,039px | 590px |
| Home destination section height | 882px | 501px |

Three full archive records now appear on the initial desktop screen. At 390px, all three homepage destinations fit within a 416px section. These are layout measurements, not evidence of better conversion or reading outcomes.

Verification: production build, static check, lint, rendered-HTML suite and audit-regression suite passed. Lint reports eight existing image warnings and no errors. Browser checks passed at 1440, 768, 390 and 320px. Observed journeys include each homepage destination and Back; combined search/form/subject/year filtering; query reload; opening the real published essay and Back; empty results and clearing; all 306 records and nine series; and keyboard access to archive controls. The overflow check rejected an intentional 4px overflow before passing the restored page. Early automation attempts raced client hydration; the completed run waits for the existing page-ready marker before interacting.

The parent inspected rendered desktop, tablet and phone frames. A separate cold reviewer inspected eight frames, then two complete viewport frames. The review found no blocking visual defects. The initial gutter concern was caused by component-only screenshots and was withdrawn after whole-viewport review. Optional refinements remain: a simpler Building preview image, and a shorter small-phone search placeholder. Neither was required to make the navigation understandable; no new images or copy were introduced.

Impeccable's detector returned design-reference warnings: the repository's old DESIGN.md does not describe the already-approved Concept A font, colors and type sizes. The context launcher also flagged PRODUCT.md as stale. The approved concept record and actual released theme governed this refit. Refreshing those context documents through `init` is separate work, not a reason to revert the selected design.

Evidence: [desktop Writing](refit-20261001/writing-after-1440.png), [phone Writing](refit-20261001/writing-after-390.png), [desktop Home](refit-20261001/home-context-1440.png), [phone Home](refit-20261001/home-context-390.png), [measurements](refit-20261001/measurements.json), and [observed behavior](refit-20261001/behavior.json). Before captures are in the same folder. Review runs at `http://127.0.0.1:4361/` and `/blog`; article links open their real published destinations. Gallery detail routes require the production site because only the main application is running here.

This follow-up is local and unpublished. No production deployment, shared header edit, routing change, stack migration, analytics configuration, generated content change, or gallery/article application edit was performed.
