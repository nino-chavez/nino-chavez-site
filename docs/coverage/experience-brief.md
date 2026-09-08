# Sports and event coverage page

Current approval: Nino authorized publication of the reviewed page and commercial terms on September 8, 2026. The initial brief and subsequent scope correction below record how the broader page was developed. The final canonical route is `/photography/coverage`.

Review state: local implementation; price and commercial terms proposed, not published. Nino requested transparent pricing and availability starting after September 18, 2026. Nino selected a five-calendar-day full gallery turnaround and confirmed that ten still preview images within 24 hours is reasonable.

Reader: a coach, athletic director or booster contact deciding whether to request coverage for a girls varsity match near Aurora. The page must answer cost, scope, delivery, access and the next step without a discovery call.

Character: courtside, specific, photo-led, candid about scope, easy to forward.
Anti-goals: generic creative agency, portrait-store upselling, video ambiguity, an implied booking calendar, an endorsement from schools in a sample gallery.
Density: price and delivery in the first desktop viewport; scope in readable rows; secondary terms in disclosures; full inquiry at the end. Mobile keeps a complete photo large enough to judge.

Objects and states:
- Offer: populated only; $350 proposed package with ten preview still photos and five-day full gallery. No dynamic price negotiation.
- Proof: real JCA–PNHS photos and a complete album. Static populated content; meaningful alt text if remote image fails.
- Terms: disclosures, keyboard-operable expanded/collapsed states.
- Request: empty, populated, invalid date/missing required fields, email prepared. No sent/success or payment state, because this form only prepares email.
- Date window: Sept 19–Dec 31, 2026, advancing the minimum with America/Chicago calendar date. After the window, direct email replaces the form.

Three rendered structures were compared in empty, populated and invalid-date states in the task's work/coverage-concepts folder:
A. Photo-led editorial opening, price below proof. Strong photo introduction but makes a budget-minded reader work to find price.
B. Price and service introduction together, then photo proof, scope, terms and request. Chosen because the main decision is budget/scope and the page still shows substantial real photographs.
C. Match-planning form at the top, then price and proof. Asks for data before establishing whether the offer fits.

Architect structure: shared header > breadcrumb > introduction + price > match photos > included scope > booking terms > request form > shared footer. Mobile collapses to this same reading order. Native labels, required fields, date bounds, inline error, focused prepared-email panel, copy fallback and visible email address keep the flow accessible and honest.

Manager constraints: use the site's owned globals.css palette and Anton/Inter/Space Mono fonts. Live computed styles confirmed the same font families and body color. Preserve the existing photography archive; its coverage CTA links here. Show no private home address, travel itinerary, invented reviews, video deliverable or claim of school approval. Body copy speaks in first person. Prepared emails never send automatically.

Artist: reuse ink/bone/action palette. Large Anton service title, price in a solid ink panel, three real match frames, restrained rules and readable terms. No animation beyond existing site behavior. Mobile enlarges the first photo. A 48px primary action and native form controls preserve usable touch targets.

Verification and cold review are recorded in review-notes.md. No publication, email sending, commit or push is part of this change.

## Scope correction: broader sports and event coverage

Nino clarified that the public service is not limited to girls or volleyball. The current girls-season prospecting campaign stays scoped; the service page now represents the actual wider portfolio. This is a refit of the reviewed page structure: preserve owned typography/palette, price clarity, five-day/ten-photo volleyball delivery, September 19 availability, the email preparation behavior and access/payment distinction. Replace the narrow identity, sample gallery and request assumptions.

Fetched all 254 public album records through the gallery's own API and fetched twelve representative album pages. Opened a rendered contact sheet of actual covers, including men’s volleyball, boys/girls basketball, soccer, golf, bowling, surfing, theater, athletics signings and pickleball. Album titles also establish football homecoming coverage. No unsupported sport was added. Main proof selections show six different categories rather than six volleyball variants.

New reader cases: coach choosing the volleyball package; basketball program requesting a game quote; tournament organizer specifying hours and teams; school contact arranging a performance. Each sees a matching inquiry and no unsupported $350 all-event promise. Other coverage requires a fixed total, deliverables, delivery and terms before commitment. No new non-volleyball price has been invented. These cases reuse the existing empty, populated, invalid-date and prepared-email states.

Canonical address becomes `/photography/coverage`; the old local/shared address redirects. Current-season girls volleyball belongs in the offer section, not the page identity. Cold review should judge whether the page now represents several sports and whether buyers can distinguish the priced match from other requests.
