# The refit now preserves tutorial meaning and navigation consistency

The next review wave completed. Its publication review found a real loss of tutorial color meaning, and its main-site review identified a possible style leak. The parent reproduced both, repaired them, and continued the gallery interaction checks. The gallery checks also exposed three older defects: viewer focus, stale Saved feedback and a download file-format mismatch. Those are repaired locally.

The selected By Nino direction remains. The compact album opening, Popular photos before the grid, scroll-linked year/month rail, existing content, filters, public paths and canonical identity remain intact. Nothing was committed, pushed or deployed.

## What changed and why

| Finding | Evidence before repair | Smallest repair | Current result |
| --- | --- | --- | --- |
| Tutorial exercises, checkpoints and templates looked alike after the light refit | Real tutorial render plus computed styles: exercise and template headers were the same pale blue; their labels and checkpoint labels used the same blue | Add owned semantic markers to the three existing components and readable amber, green and cyan variants within the publication theme | Parent opened desktop and phone frames. Exercise numbers/duration, checkpoint labels and template controls are distinct. Lesson text, code and Copy handlers are unchanged |
| Writing inherited a heading gap after arriving through the Sessions footer | Awaited `/blog` and visible controls after client navigation, then compared with a fully painted hard reload. The group-heading gap changed from 20px to normal | Restrict shared library and record selectors to their existing owner routes, using zero-specificity `:where` wrappers | Both journeys now return identical computed styles for controls, status, heading and three writing records. Sessions controls retain their prior dimensions |
| Viewer keyboard focus stayed on the page underneath it (pre-existing) | New browser test failed because Close did not receive focus; parent observed focus outside the open dialog | On dialog mount, focus Close; wrap Tab/Shift+Tab through current visible controls; restore the opening photo and prior scroll lock on close | Desktop and phone tests pass for entry, containment, next/previous, Escape and Close. Parent observed and captured the phone focus ring and return to the same photo |
| Saved state persisted but the heart/count/list did not update immediately (pre-existing) | Real browser removal test failed with the removed photo still visible; the store mutated ordinary Set/Map containers inside Svelte state | Use Svelte's reactive Set and Map implementations; keep the storage format and existing transaction handling | Immediate heart feedback, reload persistence, removal, empty state and a second reload pass |
| Downloads named `.jpg` could contain WebP data (pre-existing) | The received thumbnail decoded as WebP despite its JPEG filename; the tightened format assertion failed | The existing download proxy now requests JPEG instead of advertising WebP support; single and ZIP callers keep their existing paths and names | The received file now decodes as JPEG and the four journeys pass; bulk ZIP packaging remains unexercised |

The new gallery journeys require the expected controls to exist. There are no conditional branches that let a missing control count as a pass. They run in isolated browser contexts, against an explicitly local URL, with non-read requests blocked. They use actual published content; they depend on that content and network access remaining available. The installed Chrome channel was used because the version-specific Playwright browser was absent; the default runner remains unchanged unless the environment override is supplied.

## What was checked

- Main: `npm test`, audit regression tests, static check and lint pass. Lint reports ten warnings and zero errors. The source scope change was also checked through real footer navigation and hard reload.
- Publication: the normal build passes. Parent opened real tutorial blocks on desktop and at 390px; the phone page had equal 390px client and scroll widths. Copy showed its success message; the in-app clipboard bridge returned empty, so payload delivery is not claimed.
- Gallery: static check, build, viewer-navigation tests and Saved transition tests pass. All four new Playwright journeys pass at 1440×900 and 390×844 where specified. The download journey requires the delivered file to decode as JPEG and its name to end in `.jpg`; see the final file metadata receipt.
- New gates were exercised red before green: the keyboard test failed before the focus repair; the Saved test failed before the reactive-store repair; the image-format test failed before the download Accept-header repair. The main navigation comparison also differed before its fix and matched after it.
- Both read-only workers completed. Full child records contain returned image blocks for the four publication frames and two main-site frames. Parent checked the disputed current surfaces directly. Branch refs remained unchanged. Requested model routing is recorded separately from absent runtime model/effort verification.

The two independent reports are [publication](continuation-publication.md) and [main styles](continuation-main-styles.md). They describe the source before these repairs; the rows above close their confirmed findings and runtime question.

The download negotiation follows the existing provider: hosted images can automatically choose a supported format. The proxy had explicitly advertised WebP while its callers named every image `.jpg`. See [Cloudflare image-format documentation](https://developers.cloudflare.com/images/optimization/features/#format--f), fetched during this review. The real downloaded bytes, rather than that documentation alone, determine the result reported here.

## Evidence and remaining limits

Evidence lives in [the continuation directory](../evidence/site-wide-20260930/continuation/): before/after style records, negative test logs, downloaded-file metadata, final viewer and tutorial frames, dispatch receipts, returned-image proof and unchanged branch refs. The [earlier regression report](regression-rerun-20260930.md) remains the receipt for the other page families.

This is local browser and build verification. It does not prove physical-phone acceptance, valid unlisted-share access, production one-host routing, consent persistence, actual external sharing, or bulk ZIP delivery. The local gallery preview blocks production writes. Tutorial clipboard payload delivery remains unverified. No traffic, conversion or SEO gain has been measured. No claim is made that every possible regression has been eliminated.
