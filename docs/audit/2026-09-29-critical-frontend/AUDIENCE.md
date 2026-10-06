# Audience clues support separate photo and project arrivals

Analytics can identify audience clues through entry sources, destinations, devices, and recorded actions. These reports do not establish visitors' names, employment, relationship to Nino, or the decision they were making.

The arrival analysis is a new reading of the saved September 29 evidence, not a new Cloudflare query. Cloudflare covers August 30–September 28, complete UTC days. Gallery activity covers the same dates in America/Chicago. Their counts and definitions must not be joined into one funnel. The additional orientation below includes a fresh live action-report check and the user-linked Photo analytics chat.

## The sampled arrival routes are different

| Observed source | Landing page | Device | Estimated entry visits | Interpretation |
|---|---|---|---:|---|
| Facebook | `/photography` | Mobile | 10 | A photo-oriented referral. Athlete, family, team, or fan is a hypothesis. |
| Instagram | `/photography` | Mobile | 10 | A photo-oriented referral. It does not identify the viewer's relationship to Nino. |
| LinkedIn | `/work/blueprint` | Desktop | 10 | A specific professional or technical work referral is plausible. Recruiter, client, and colleague cannot be distinguished. |
| Direct / unknown | `/` | Desktop | 20 | Homepage arrivals whose source and task are unattributed. |
| Direct / unknown | `/photography/coverage` | Desktop | 10 | Coverage-page arrivals. Owner or QA activity and real commercial interest cannot be separated here. |

These sums were re-derived from [the direct query rows](evidence/cloudflare-traffic-direct.json). They are sampled estimates, not verified people. Missing referrers do not identify direct visits as a single audience. Owner and agent-assisted traffic can remain in the reports.

What this means: the next review can begin with a social-photo arrival and a LinkedIn-project arrival. There is evidence for these entrances; there is not yet evidence for the visitors' job titles or ultimate decisions.

## Photo actions are the clearest task evidence

The saved [gallery report](evidence/gallery-analytics-30d.json) records 2,167 photo opens and 126 estimated browsers with any activity. JCA at ACC, JCA vs. PNHS, and Millikin at North Central account for 1,275 opens, about 59 percent of those actions. These are photo opens, not people or completed bookings. This supports attention to recent event retrieval and direct album access.

The recorded [coverage inquiry report](evidence/coverage-leads-report.json) establishes no persisted non-test inquiries. Coverage arrivals cannot yet be presented as a client acquisition channel.

What this means: preserve the practical photo-finding path. Gallery interest does not establish commercial demand or professional portfolio interest.

## Work is currently reached through internal navigation in this sample

`/work` has 30 estimated loads, all with `ninochavez.co` as referrer, and zero recorded entry visits in the direct-query sample. The LinkedIn arrival bypasses the archive and lands on Blueprint's project page.

What this means: a secondary archive is a reasonable hypothesis to test. These sparse sampled rows do not justify deleting the archive or prove that its current navigation position is wrong.

## Device conclusions depend on the denominator

Mobile accounts for 310 of 550 estimated loads, about 56 percent. It accounts for 20 of 60 estimated entry visits, about 33 percent. The two measures answer different questions. In the arrival rows above, social photo referrals are mobile and the recorded LinkedIn project arrival is desktop.

What this means: verify the actual entry journeys on their observed devices. Do not call the share of page loads the share of people.

## The next measurement should concern useful actions

Compare actual entry sources and landing pages with the existing actions available in each section. Keep internal/QA activity separate. For professional work, inspect evidence openings, product destinations, CV/contact actions, and archive use where the current instrumentation records them. For photography, inspect album finding, photo viewing, downloads, shares, and persisted non-test inquiries. Availability of those measures must be checked before promising a joined journey report.

Country, referrer, device, browser, and operating-system breakdowns are available in Cloudflare Web Analytics, according to its current [dimension documentation](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/). Country was not included in this saved direct query, so no geographical conclusion is made here. Cloudflare's [visit definition](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/) describes an external or direct arrival; it is not a unique person count.

## Photo analytics supplies reports, but the wider site's action history is empty

Nino asked this assessment to also orient to [Photo analytics](codex://threads/01a0ea01-31d2-73a1-b08f-4e7eb50e4a39). Its recent turns distinguish available gallery history, the implementation and release of broader action reports, and the remaining collection and interpretation gaps. The latest release turn supersedes its earlier local-only implementation status.

The parent then inspected the live [Actions report](https://analytics.ninochavez.co/sites?view=actions) on September 29 at 10:23 PM CDT. For the displayed August 31–September 29 complete UTC days, it says no matching action has been recorded. Page views, contact clicks, outbound clicks, article progress, article active time, and the last demo section show an unavailable-history dash rather than evidence of zero response. See [the live observation](evidence/audience-live-actions.json).

Expanding Linked journeys produced no eligible linked views for those dates, with a collection/delivery-gap qualification. See [the expanded observation](evidence/audience-live-linked-journeys.json). The September 29 release receipt reports PostHog forwarding disabled, and the inspected relay configuration still sets `ANALYTICS_RELAY_ENABLED` to `false`; remote configuration was not queried again here.

The parent checked the actual metric definitions and linked-query code in the photography worktree. Contact clicks are not inquiries. Reaching 90 percent of an article is not proof of reading. Active time means a visible, focused tab. Reaching a demo's last section is not proof of traversing every section. Linked fractions apply to opted-in views and are not causal effects or all-visitor conversion rates.

What this means: use the existing reports for further measurement rather than introducing a second analytics system. Verify collection and gather actual eligible history before interpreting article, demo, contact, or linked-journey performance. Missing action history cannot tell us that visitors lacked interest.

The source-linked arrival clues remain useful for choosing a social-photo journey and a specific LinkedIn-project journey to review. Neither those clues nor the empty newer reports establish whether Work deserves prominent navigation or whether a new layout would improve visitors' decisions.

No tracking, privacy settings, production configuration, or public page was changed. This audience note and the underlying private analytics evidence remain local and unpublished.
