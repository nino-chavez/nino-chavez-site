# Coverage page review

Approved for publication • September 8, 2026

Nino approved the reviewed page, $350 volleyball package and booking terms with “ship it.” The canonical route is `/photography/coverage`. The notes below preserve the earlier local review; they are not a deployment receipt.

The final form check passed 49 browser assertions across all four coverage types, required fields, date boundaries, whitespace-only input, special characters, exact email payload, stale-draft clearing, focus, mobile layout and no-JavaScript fallback. It found and corrected missing whitespace validation for the sport/event and coverage-window fields. Copy success and permission failure were tested with controlled clipboard stubs; the actual clipboard was unchanged. The email-link click was intercepted before launching an email app. No message was sent or delivered by this test.

Owned route: `/photography/volleyball-coverage`. The main site owns the service page and its Photography CTA; the separate router change sends the exact route and trailing-slash form to main. Existing gallery routes retain their owner. Both changes need publication together after Nino approves the commercial offer.

## Evidence

- Direct browser checks at 1440px desktop and 390px mobile. All three actual portfolio images loaded. No page JavaScript errors observed.
- September 18 is rejected, with an inline red date error. September 22 prepares the correct $350 request with ten preview photos, five-day delivery, school, venue and access/payment status. Editing a field clears the stale prepared email. Focus moves to the prepared-email panel.
- Email link payload checked without opening the email app or sending. Copy fallback is present; no test email or clipboard write was performed.
- With JavaScript disabled, the form is disabled and a direct email fallback is shown. After hydration, it is enabled. This prevents native GET submission of contact details.
- No horizontal overflow at 320, 390, 768 and 1440px. A narrow-phone heading overflow found at 320px was corrected with responsive type sizing.
- Root inspected desktop/mobile renders, the enlarged sample image and date error. Independent cold reviewer approved the revised rendered experience after deposit/balance terms moved into the price card, the first mobile photo was enlarged, and the inline date error was added.
- Router tests pass, including the exact new page routes and existing gallery route preservation.
- Site compatibility check, production build, rendered HTML tests, audit regression tests and lint run as part of local verification. Lint retains eight existing image warnings outside this page.
- The wider `tsc --noEmit` command encounters existing missing Playwright/Worker and archived Svelte types in the unmodified main checkout as well (69 baseline errors). That is not a clean repository-wide typecheck receipt.

The repository’s normal build synchronizes its writing index before tests. A diagnostic build that skipped this synchronization passed 47 of 48 tests; the unrelated blog test expected the old 298-piece snapshot while the live publication returned 302. The normal `npm test` route includes the required synchronization. Generated writing-index changes from verification are not retained in this feature.

## Scope and limits

Price: proposed $350. Payment and cancellation policy: proposed. Nino confirmed five-calendar-day full gallery delivery and ten still preview photos in 24 hours. A typical 40–60-image gallery is a proposed expectation, not a measured guarantee or an agreed minimum.

The page collects nothing on the server and makes no booking. Real school access, publication restrictions, payment and exact availability remain part of booking confirmation. No school endorsement is implied by the sample album.

No full screen-reader or physical-phone test was performed. Browser form validation, keyboard focus and narrow viewports were observed. Real email-app handoff, payment collection, post-shoot delivery and public edge routing await their respective real workflows.

No commit, push, publication or outreach send was performed. Local preview is `http://localhost:4319/photography/volleyball-coverage`.

## Broad service-page verification

Nino clarified that the service covers multiple sports and events. The canonical page is now `/photography/coverage`; the prior seasonal address redirects here. The root fetched the public album catalogue and twelve representative album pages and inspected their actual cover photographs. Six gallery examples now show men’s volleyball, basketball, soccer, golf, surfing and school theater. Additional links show football, bowling, pickleball and athletics signings.

The $350 price remains specifically a varsity volleyball match package, girls or boys. Other sports, tournaments and events receive a fixed quote. Browser checks observed separate basketball, volleyball and theater inquiry flows. Other requests include their coverage window and do not contain the $350 commitment; volleyball retains ten edited previews in 24 hours and a full gallery in five days. Changing the type clears the old email. No message was sent.

No horizontal overflow at 320, 390, 768 and 1440 pixels; all six selected photos loaded with no observed page JavaScript errors. Root inspected the desktop and readable mobile frames. The independent reviewer approved the broader page and the package/quote distinction. The page, price and terms remain unpublished.
