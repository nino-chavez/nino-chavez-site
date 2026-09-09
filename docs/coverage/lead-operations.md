# Coverage inquiries and follow-up

A submission is saved before its notification is attempted. The visitor gets a
reference and knows the date is not booked. Nino receives a notification at
`nino@ninochavez.co`; Reply goes to the requester. This address is an existing
Google Workspace alias for `admin@ninochavez.co`, confirmed by Nino.

Cloudflare handles outgoing notifications. The domain was already enabled for
Email Sending; no Resend setup or Google MX change is needed. The sending
address is `requests@ninochavez.co`. Its incoming Google alias has not been
created: Google Admin requires a fresh sign-in. Direct visitor email links
therefore continue to use the existing `nino@ninochavez.co` address.

## Review and progress leads

Commands use your Cloudflare login. There is no public API for listing leads.
Run from the site repository; omit `--remote` to operate on local test data.

```sh
npm run leads -- list --remote
npm run leads -- show LEAD_ID --remote
npm run leads -- status LEAD_ID contacted --remote
npm run leads -- status LEAD_ID quoted --remote
npm run leads -- status LEAD_ID booked 350 --remote
npm run leads -- followup LEAD_ID 2026-09-20 "Waiting for school access approval" --remote
npm run leads -- due --remote
npm run leads -- report --remote
```

Statuses are `new`, `contacted`, `quoted`, `booked`, `declined`, and `test`.
Book only after the real written confirmation, access and payment arrangement.
The dollar value is entered when the booking is known; it is not inferred from
clicking the volleyball package. Mark synthetic inquiries `test` to exclude
them from lead/revenue reports. `due` lists overdue follow-up dates and unanswered
leads older than two days. These are operator review commands, not automated
marketing emails. No CRM or reminder schedule is implied.

## Source tracking

Use campaign tags on the coverage URL, for example:
`/photography/coverage?utm_source=coach-outreach&utm_medium=email&utm_campaign=fall-2026&utm_content=imsa`.
Use short non-personal slugs with letters, numbers, dots, dashes or underscores.
The server discards other tag formats. Do not put an email, name or private
information in a link. Referrers are reduced to their hostname; paths and query
strings are not stored. Attribution describes the submitted link, not a verified
identity or a history across devices.

The report separates anonymous page/form event counts from saved inquiries,
actual booked status and entered booking revenue. Anonymous events contain no
contact details, persistent browser IDs, cookies or IPs. They expire after 90
days. Events can be blocked or rate-limited and are directional counts, not a
complete census or unique visitors. Test campaign events may be filtered in SQL;
they remain identifiable by `release-check` / `qa` / `direct-submission` tags.

## Failure handling

The submit button disables while a request is in progress. Its request ID is
reused after a timeout or retry, preventing duplicate saved leads. Changing
entries starts a different request. If persistence cannot be confirmed, the UI
keeps all entries and shows retry plus direct email. If persistence succeeds but
email fails, the receipt remains valid and the notification is retried.

Notifications are leased to avoid concurrent sends. Up to 12 attempts are made,
with increasing delays capped at an hour. Pending/failed statuses and exhausted
retries remain in D1. Inspect `npm run leads -- report --remote` for exhausted
notifications. After resolving a provider problem, an operator can reset a
specific failed row's attempts and next-at fields in the Cloudflare D1 console.
Do not reset a sent notification. The provider may accept an email before a
connection fails; an eventual duplicate notification is possible, sharing the
same inquiry reference.

Inquiry data remains private in D1 and the Google inbox for booking/follow-up.
Honor removal requests in both locations. The privacy page describes collection.

## Release and recipient confirmation — September 8, 2026

The direct-submission release is commit `571eac4`, deployed as Worker version
`999c5f7f-f0dd-4873-bcde-5403f6746017`. The live test saved an inquiry,
recorded its source tags, and received provider acceptance on the first attempt.
Nino then confirmed in the task that the test email arrived. This is recipient
confirmation, not an automated inbox inspection or a matched provider delivery log.

Test reference: `f92e15dc-c4f9-4fda-acd4-414559ebf258`, marked `test` so it is
excluded from real lead and booking totals. Live desktop and mobile checks
confirmed that the top request link permits form input and scrolling back up.
The deployed five-minute retry schedule was verified through Cloudflare's API.

The optional incoming requests@ alias still requires Google Admin sign-in.
Follow-up dates and status tracking are available; sales reminder automation
and an operator dashboard were not implemented. No school outreach was sent.

## Inquiry and offer revision — September 9, 2026

The form accepts an inquiry before date, venue, duration, funding or access are
known. Coverage type, activity, name, reply email and organization remain
required. Empty dates are saved as empty strings; notifications show missing
details as “Not provided.” Supplied dates must still be valid upcoming dates in
the coverage window. Do not interpret a missing date or a selected package as
availability, approval, funding or a booking.

The revised offer retains $350 and ten still previews. It makes the five-day
editing deadline separate from gallery release after payment, with written
purchase-order exceptions. The on-site limit is three hours; event
cancellation and cancellation of photography have separate rules. Publish the page and server changes together. Confirm the live page matches
the draft terms before approving any school outreach.

Current pilot drafts and their state are owned by school-outreach-pilot.json in
the originating task's outputs. They remain unsent. The September 9 audit and
revision notes there carry the pricing assumptions and proposed business terms.
Record total time and direct costs for actual jobs before changing price. The
existing lead commands track inquiry and booking state, not job profitability.

## Edge HTML and browser verification

A September 9 production check found an AI Labyrinth link prepended directly
inside the body by Cloudflare. React reported hydration error 418 at that anchor;
the local production build did not reproduce it. A browser-only experiment that
removed that injected link eliminated the error. Coverage HTML now appends
`no-transform` to Cache-Control while preserving existing cache directives.
This applies only to the coverage HTML route, not the request API or other pages.

Verify through the apex after deployment: the response must include
`no-transform`, omit injected `/cdn-cgi/content` links, and hydrate without a
browser error. Then test both the top request link and a direct `#request` URL,
including typing, repeated upward wheel gestures and a real saved inquiry.
One oversized wheel gesture is not a reliable test of reaching the page top.
The change follows Cloudflare's documented response-body control:
https://developers.cloudflare.com/rules/configuration-rules/response-body-inspection/

## September 9 release confirmation

Code revision `c4bd1f5` is deployed as Worker version
`0b6a8299-22e2-4b2f-a25a-c141a9e686ed`. The live coverage page sends
`no-store, must-revalidate, no-transform` and no longer contains the injected
Labyrinth anchor. Desktop/mobile hydration and both request-anchor paths passed.
Repeated upward wheel gestures returned to the top; no scroll lock was observed.

Live inquiry `989abc24-5314-42ca-b25e-be5816db05b6` used no date or venue, was
saved successfully and is marked `test`. Its notification was found and read in
the Google Workspace inbox as message `1a08836f03a6a8df`, matching the reference.
The three school messages remain Gmail drafts. No school outreach was sent.

## Payment routes — September 9 update

The $350 volleyball package now has two payment routes. Schools and established
organizations reserve a confirmed date with an approved purchase order or signed
agreement, without a deposit. Confirm an authorized payer and billing contact
before shooting. Their invoice is due 30 calendar days after the event; gallery
delivery remains within five calendar days and does not wait for payment.

Individuals pay $175 after written availability/access confirmation and $175 when
the gallery is ready, before full-resolution downloads. Ten edited previews
remain due within 24 hours for both routes. The form records a preference; it
does not approve organizational billing or reserve a date. Existing cancellation
charges apply to either route; organizations are invoiced rather than forfeiting
a deposit. See the public FAQ for the cancellation due date and exceptions.

New inquiry snapshots store the individual deposit, zero organizational deposit,
30-day organization payment deadline and the delivery summary. Notification
retries use the saved delivery summary so a policy update does not silently
replace the terms recorded for an earlier inquiry. Older release receipts above
describe the terms in effect at their respective releases.
