# Site actions now record across the public entrances

The collection repair is live on ninochavez.co. Photography, writing, individual projects and demo stories now load the shared tracker. It waits for preferences before recording the first view. Actual page views, a demo section and an internal link click were accepted and read back from storage. Our synthetic visits stayed out of audience counts and exports.

The refreshed report still has no eligible audience history. This release proves collection works. It does not establish who visits, why they visit, or whether a frontend rethink would help.

This report is for Nino to understand what shipped and what the evidence supports. The September 29 “dispatch next” instruction authorized this collection release. The separate “Photo analytics” chat owns its reporting work. The rejected Work concepts and earlier frontend refit remain unpublished.

## The collection changes shipped without the earlier refit

| Surface | Collection change | Production commit | Release |
|---|---|---|---|
| Main site | Public-only tracker, committed-route readiness, demo markers, disclosure and choices link | `2c0672fe014ac175d72ea248c6e7a40fa4df5acc` | [PR 32](https://github.com/nino-chavez/nino-chavez-site/pull/32) |
| Gallery's shared asset | Wait for preferences; isolated regression checks | `2eb4c6c10c9870c00981ab23b40dfa73e074415c` | [PR 172](https://github.com/nino-chavez/nino-chavez-photography/pull/172) |
| Writing | Tracker on public layout pages; noindex page excluded | `3c8a02035cd0cae8e61d86bd04d10f239a78b70d` | [PR 51](https://github.com/nino-chavez/blog/pull/51) |

Only collection changes were applied to current shipping branches. No CSS, navigation refit, route suffix, canonical policy, migration, retention rule or PostHog forwarding flag changed.

Gallery and writing deployed through their existing Pages Git integrations. The main site's GitHub run skipped deployment at its credential gate. The parent deployed the exact shipping commit through its documented Worker command. The live Worker is `ninochavez-main-open-practice`, not the old Pages project named in some notes. No CI configuration changed.

What this means: collection is added to the existing experience. These releases do not publish the abandoned design direction.

Evidence: [gallery deployment](evidence/collection-release-pages-final.json), [writing deployment](evidence/collection-release-writing-deployment.json), and [main Worker deployment](evidence/collection-release-main-deployment.json). Main Worker version `77cdc5a7-8e35-4522-8239-fd3da52fb167` deployed at 05:20 UTC on September 30.

## Cold entrances now send the intended actions

The parent drove the actual live site in an isolated browser context. Cold Home, Blueprint, Photography, Writing, a published article and a demo story each loaded one tracker and sent one initial view. Mobile Photography recorded correctly. The demo sent a section-view event.

The normal preferences response stayed unlinked and non-excluded for positive recording checks. Only our collector requests carried the existing browser-exclusion cookie. The server classified them as `self_excluded`. They had no browser or visit identifiers, were not export eligible, and created no export-outbox rows. These are synthetic acceptance visits, not audience evidence.

The live asset matched the released source. Existing Work redirects and the privacy disclosure were checked. A known-crawler request was rejected as expected. The mobile geometry check detected an injected four-pixel overflow; the real page did not overflow.

What this means: the sampled entrances no longer omit collection. The observed missing-hook and first-view defects are repaired.

Evidence: [live routes and asset](evidence/collection-release-live-routes.json), [cold browser receipt](evidence/collection-release-browser.json), [cold event storage](evidence/collection-release-storage-final.json), and [crawler control](evidence/collection-release-browser-known-crawler.json).

## The scheduled report excludes the acceptance visits

The natural scheduled refresh completed at 06:07 UTC on September 30. All 23 acceptance events were read back by their own generated IDs. Every row was `self_excluded`, unlinked and not export eligible. The current-day summary put those actions under exclusions and kept audience measures at zero. The report returned current freshness, available today data and empty eligible totals.

The report's `firstRecordedAt` is the first stored QA event, not a real visitor's arrival. Its `excludedEvents` field covers completed days; today's exclusions were verified in the daily summary instead. Cloudflare's separate cookieless arrival totals have a different definition. Action exclusions do not promise to remove QA from that separate system.

What this means: recording, storage and scheduled exclusion are verified. Visitor interests and useful outcomes are not yet measured.

Evidence: [stored events, natural refresh and report](evidence/collection-release-scheduled-final.json).

## Navigation recording passed with a browser limitation

Chrome for Testing 152 exited with a native SIGTRAP during the Blueprint-to-Photography click. It also crashed with the tracker script blocked. Blocking Cloudflare's `/cdn-cgi/speculation` prefetch rules in the test context allowed the same navigation with the tracker running.

Under that condition, the visible destination had the correct analytics path and one tracker. The internal click and destination view were read back from storage. The click uses `fetch(..., {keepalive: true})`. The browser lost its response observation during navigation, but the saved row proves delivery. The initial harness assertion requiring that response failed and is retained as such.

These comparisons show the new tracker is not required to trigger the crash. They do not prove ordinary browsers are unaffected or identify the underlying engine defect. Unrestricted navigation acceptance remains incomplete. No production prefetch setting or browser profile changed. This remains a separate browser/navigation investigation.

What this means: delivery is proven for the observed click. General navigation reliability has the stated limit.

Evidence: [tracker blocked, crash retained](evidence/collection-release-probe-nav-no-tracker.json), [prefetch blocked, navigation passes](evidence/collection-release-probe-nav-no-speculation.json), [live navigation recording](evidence/collection-release-browser-navigation-prefetch-blocked.json), and [actual click storage](evidence/collection-release-storage-navigation.json). Native crash reports were inspected on this host.

## Analytics choices are visible on mobile

The parent opened the actual Photography entrance and global footer captures. “Analytics choices” is visible and legible in the mobile footer. A cold reviewer independently opened both captures, then checked the exact disclosure source. The reviewer found no collection-release blocker. Reaching the footer is required; saving preferences was outside that rendered review.

An early capture selected a photography component footer instead of the global footer. The corrected capture selects `footer.site-footer` and checks that the choices link is inside the viewport. The earlier misleading capture is not visual acceptance.

What this means: the added control is available in the observed mobile state. This supplies no evidence for a broader styling change.

Evidence: [actual global footer](evidence/collection-release-mobile-footer-actual.png), [visible geometry](evidence/collection-release-probe-footer.json), [cold review](evidence/collection-release-cold-review.txt), and [dispatch receipt](evidence/collection-release-cold-review-receipt.json). The parent checked the child's actual image-tool calls rather than accepting its claim that it looked.

## Collection checks pass with an existing writing-count limit

Gallery static checks, build and all 11 isolated tracker checks passed. The previous tracker failed the two observed first-view cases before the fix. Writing built successfully: 359 shared public pages each contained one tracker, one noindex page contained none, and four standalone exports stayed outside the layout.

Main static checks, audit checks, public collection assertions and private no-tracker verification passed. The ordinary production test command passed after refreshing generated indexes. A direct rendered test from the unchanged shipping snapshot failed one writing-count assertion: bundled writing had 298 entries while live rendering used 306. The source fetches the live index with a bundled fallback. This mismatch is documented in PR 32. No generated content or writing behavior changed to make it green.

What this means: collection checks pass. The unchanged direct writing-count test is not a clean full-suite receipt.

Evidence: [main release description](evidence/collection-release-main-pr.md), [writing rendering](evidence/collection-release-writing-rendered.json), and [isolated regression verification](evidence/collection-verification.json).

## Use eligible actions before choosing a frontend direction

The next analysis should compare arrival pages with photo finding, project attention, article engagement and contact clicks. Contact clicks remain distinct from submitted inquiries. Search queries and referrals can suggest intent; they do not establish a visitor's profession or identity. Optional linked journeys still require their existing permission and delivery boundaries. PostHog forwarding remains disabled.

What would change this conclusion: a real entrance that misses its first view, accepted actions absent from storage, QA entering audience counts, or stale summaries. A frontend recommendation also needs eligible behavior or direct user evidence. QA rows cannot supply it.

The source releases are public. This report and private evidence remain local and unpublished. The parent removed its three clean collection-release worktrees and temporary acceptance helpers. The cleanup changed no branch refs. Other chat worktrees, the concept preview and the shared browser profile were preserved. See [the cleanup receipt](evidence/collection-release-resources-after-cleanup.json).
