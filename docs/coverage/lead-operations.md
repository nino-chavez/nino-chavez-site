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
