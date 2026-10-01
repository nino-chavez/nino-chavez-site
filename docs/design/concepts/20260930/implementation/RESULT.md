# Concept A is implemented for local review

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
