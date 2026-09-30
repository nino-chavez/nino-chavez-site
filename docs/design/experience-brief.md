---
design_intent: refit
design_direction: docs/claude-design-system.md
---

# Make the work easier to understand and reach

Status: Nino authorized planning and implementation dispatch through completion on September 29. The independent responsive, navigation, styling, and canonical-page refit is implemented and checked locally. Nino rejected all three Work entrances and challenged whether the page earns its place. The recommendation is to keep Work as a secondary complete archive; no organizing model or navigation prominence change has been implemented. The last or next important referral is the pending interview question. See the [implementation result](../audit/2026-09-29-frontend-implementation/IMPLEMENTATION.md) for evidence and limits. Publication remains a separate step.

Keep `ninochavez.co` as the common address. Keep the separate applications that publish the portfolio, writing, and photography. Repair the phone experience, make navigation predictable, and perform a substantive styling refit. Compare alternatives to Work's taxonomy-first entrance. Measure Writing before changing how its archive works.

The documents define a clear purpose: understand Nino, inspect his work, explore a collection, and find the right way to connect. The rendered entrances do not always make that connection obvious. Styling execution and Work's organizing entrance both need attention. A services funnel or a new brand would change the purpose without evidence that it needs changing.

The [critical team verdict](../audit/2026-09-29-assessment-challenge/VERDICT.md) qualifies the earlier assessment. It requires changes to type scale and weight, density, imagery and overlays, proof proportions, borders, controls, and common-shell treatment. It preserves the dissent that Work may need a scoped rethink rather than a presentation-only refit.

## Decisions and their owners

| Decision | Current position | Owner |
|---|---|---|
| One public address, distinct applications | Preserve | Accepted ADR-0004; current route details in IA-NAVIGATION |
| Complete Work collection and domain data | Preserve inventory, truth, filters, and URLs; compare the entrance structure | IA-NAVIGATION and Open Practice functional model; Nino selects any amendment |
| Homepage's primary outcome | Pending. Recommend understanding Nino's judgment and pursuing a professional opportunity | Nino, through this interview |
| Photography's role in the homepage opening | Preserve real identity material; image dominance, crop, scrim, and proof balance remain open | Canonical design system, then Nino's explicit choice |
| Fonts, palette, publication identity | Preserve families and identity as the baseline; retune scale, weight, dosage, and surface relationships | Canonical design system and the blog's own design source |
| Writing archive interaction | Start with a refit. A structural rethink requires a separate decision after measurement | This plan's Writing comparison |
| Coverage offer and form | Preserve current production terms and persisted-lead behavior | Coverage implementation and current lead-operations approval; older briefs contain superseded terms |

Use [the navigation contract](../IA-NAVIGATION.md) for current labels and routes. Its later naming amendments supersede older ADR labels. Use [the canonical visual owner](../claude-design-system.md) for composition and tokens, [Open Practice](../OPEN-PRACTICE-ART-DIRECTION.md) for page jobs and copy, and the September 29 rendered captures for the working baseline. Do not restore an older illustrated hero merely because it remains described in an older paragraph.

## Surfaces

- **Home.** Refit the first encounter and the path to named work; hierarchy remains provisional until the priority decision.
- **Work library.** Compare entrance structures before locking its intent; refit type, density, controls, and rows while preserving the complete inventory, domain data, filters, and shared URLs.
- **Work detail.** Preserve truthful status and destinations; make real proof easier to inspect where the opening delays it.
- **Sessions.** Preserve the complete collection and source-faithful stories; apply navigation consistency.
- **Learn.** Repair containment and refit the comparison of outputs; retain every existing path.
- **Writing archive.** Refit links first; measure browsing and delivery before any structural rethink.
- **Article.** Refit phone reading order and the relationship between global navigation and publication controls.
- **Photography entrance.** Preserve discovery and controls; refit the mobile image crop, overlays, search-panel proportions, and common navigation.
- **Album.** Preserve finding, viewing, saving, downloading, and sharing photographs; verify the applicable actions in real states.
- **Coverage request.** Preserve approved terms and the real request flow; measure persisted non-test leads separately from QA activity.
- **Site search.** Preserve grouped discovery, query URLs, and recovery from no results.
- **About and utilities.** Preserve biography, Now, Links, and Privacy; verify navigation and metadata when the common shell changes.
- **Shared navigation.** Refit the common labels, order, current state, search placement, and menu behavior across applications.

## The visitor's situation defines the work

| Arrival | What is happening | What the visitor needs next | People and context | Available action |
|---|---|---|---|---|
| Cold professional | Someone has opened the homepage to evaluate Nino | Understand the connection between his work and inspect one credible example | A collaborator, client, or employer, often on a phone | Open a named project, inspect its evidence, then use a relevant contact path |
| Project referral | Someone sent a particular work record | Understand what it does, its status, and where to inspect it | A person judging a specific product or method | Open the primary destination; explore explicitly related work |
| Article referral | Someone sent an essay | Recognize its title and begin reading | A reader arriving without homepage context | Read, explore the publication, or learn who wrote it |
| Photo referral | Someone sent an album or photo | Find the relevant person or moment and use the supported photo actions | An athlete, parent, coach, or event participant | Search or browse, open a photo, download or share where supported |
| Learning visit | Someone wants a practical path | Compare what each path produces | A practitioner with a specific task | Choose a path and continue its existing sequence |

Return journeys matter as much as first arrivals. Browser Back should return a reader to the archive context they left. Search and filters must survive copying a URL, reload, and Back. A broken image or an empty result must leave a meaningful recovery action. An album referral must remain useful without a detour through the personal homepage.

Character: **authored, practical, candid, readable, human**.

Anti-goals: a generic agency homepage; a shortlist that hides the body of work; decorative product statistics; a forced contact funnel; a shared template that erases the publication or gallery's job.

## Presentation constraints

Proposed density targets, to be checked against rendered screens rather than source alone:

- Home at 390×844: identity, a legible claim, and one named proof action in the first frame. A recognizable product example should appear early enough to substantiate the claim. The final balance with the photograph is pending.
- Work: make the complete inventory and a route to its records apparent without removing the approved domain map. Do not add another selected-work grid above the atlas.
- Learn: opening instructions fit at phone widths; each path's output is legible in the comparison. Role names are supporting information.
- Article: title, author/publication context, and the beginning of the essay precede a large illustrative interruption on phones.
- Album: usable collection identity and photo-finding tools; global chrome must not displace the photograph task.

Hierarchy follows the task: identity → claim → evidence on Home; collection context → useful controls → results on archives; title → reading on essays; album context → retrieval → photograph actions in galleries.

Preserve the current fixed theme. Keep Home's existing section roster as the initial length budget: earlier proof must come from recomposition, not a new section. Compare its total height with the recorded desktop baseline and explain any increase. Collections remain complete; completeness does not require every result to be delivered in the first response.

Use the existing Anton / Inter / Space Mono roles and owned color tokens. Real product screens illustrate software. Archive photographs illustrate the identity or photography itself. Link labels describe where the action goes. Public copy stays concrete and first person where Nino speaks; factual claims and status come from their owning sources.

Those identity choices do not preserve the current scale, weight, opacity, image dominance, or spacing. Work's three-way comparison may change where the domain map appears; that requires a selected direction and a narrow amendment to the current functional owner before implementation.

Preserve ordinary browser navigation, native keyboard behavior, visible focus, reduced motion, and usable touch controls. Add no autoplay, scroll reveal, or decorative movement. The menu must show and close predictably; form feedback must reflect real validation and persistence. Apply the documented dialog behavior across applications, including Back, and verify behavior before calling it compliant.

## Required styling work

| Area | Required comparison or correction | Rendered acceptance |
|---|---|---|
| Type hierarchy | Retune large headings, label/count dosage, weight, measure, and responsive wrapping | The task and next action read clearly; long real content fits without crowding controls |
| Rhythm and density | Recompose Work's rows/groups and Writing's opening/archive spacing | Useful records and controls appear together; desktop space has a purpose and phone comparison remains legible |
| Image and text proof | Give Blueprint and image-bearing Home objects suitable related proportions | Text-only proof looks intentional; no invented image fills an empty box |
| Photographs and overlays | Compare responsive crop, directional scrim, and search-panel area/opacity | The subject remains recognizable and text/controls remain readable in the same frame |
| Borders and controls | Retune grouping, outlines, form surfaces, and action emphasis | Controls are recognizable without every row or marker competing equally |
| Common shell | Align global identity and control treatment while retaining local publication/gallery character | Transitions are intentional; local reading and retrieval tools remain useful |
| Article entry and body | Refine entry proportions and chrome; preserve the body's existing line length and rhythm | A phone reader reaches the title and reading promptly; body composition remains at least as strong as baseline |

Preserve is a boundary on product truth and useful behavior, not a claim that the current CSS is finished. Coverage's flat-ground Anton heading is a consistency comparison for the type pass, not a reason to change its price or request flow. A visual judgment does not establish a WCAG failure; measure contrast and observe accessibility separately where those claims matter.

## Objects, actions, and states

| Object | Owner | Valid actions | States | Reverse or recovery |
|---|---|---|---|---|
| Identity and homepage claim | Nino; main application | Read; open About or named work | Normal; narrow viewport; image unavailable | Global Home link; meaningful text when media fails |
| Work record and its proof | Authorized work registry; artifact publisher | Open record; open its primary destination; follow authored relations | Published status; filtered; unavailable destination | Back to collection; remove filters |
| Session or technique | Sessions publisher | Open and follow the existing story | Collection; detail; related artifact unavailable | Collection link; preserved story context |
| Learning path | Existing learning content | Compare outputs; open path; continue steps | Unchosen; chosen; long title | Back to comparison |
| Writing record or series | Blog publisher | Search/filter; open; read | All; filtered; empty; loading if introduced | Restore query and place; clear filters |
| Article | Blog publisher | Read; use local publication navigation | Reading; media unavailable | Back to archive context |
| Album and photograph | Photography application | Supported search, view, save, download, and share actions | Populated; empty; loading; unavailable media; saved if supported | Back to album; clear search; existing unsave action |
| Coverage request | Current coverage application and lead store | Review terms; validate; submit supported request | Empty; invalid; submitting; failed; persisted lead | Correct fields; retry safely; existing direct contact fallback |
| Site search | Main application and its source indexes | Query; open grouped result | Populated; no results | Edit or clear query; collection links |
| Menu and collection controls | Each application's implementation of the shared contract | Open; navigate; search; close | Closed; open; current location | Escape, Close, route selection, Back; focus return |

## Build in bounded slices

### 1. Repair phone containment and link behavior

In the main application, fix Learn's nowrap/container problem and test the longest real heading and supporting text. Align Home's selected-work link label, destination, and directional cue. Restore ordinary same-tab navigation for same-site articles and series.

Update the existing rendered-HTML assertions that currently treat every absolute HTTP URL as an external destination and demand a new tab. Classify by destination host; do not weaken link coverage to make the change pass. The existing rule that absolute writing links must resolve is distinct from whether they open a tab.

Done when real phone captures show readable Learn text, a known overflow fixture makes the overflow check fail, and article/series navigation plus Back behave as intended. Include a narrow phone, 390px, an intermediate width, desktop, and a zoom/reflow check.

### 2. Make the three applications behave like one site

Apply the current Work / Sessions / Learn / Writing / Photography / About contract to the main, blog, and gallery implementations. Align search placement, Now/Links availability, current-section treatment, focus, background interaction, and menu closing. Run the same journey checks against each implementation.

Keep the publication's topic navigation and the gallery's retrieval controls. On articles, reduce competing global/publication chrome and bring reading earlier on phones. Do not introduce a shared framework package merely to unify markup; the common acceptance contract is the required unity.

Done when a visitor can cross Home → essay → album → Work without relearning the global menu, and keyboard/focus, Back, direct links, and local controls survive the changes.

### 3. Refit Home and Learn; compare Work's entrance

First settle the homepage outcome and compare the balance between personal imagery and product proof. Recompose an existing, verified example into the early encounter and retune the required styling dimensions. Rally HQ is the current approved product proof; choose a different example only with an explicit reason and a verified inspectable destination. Make learning outputs the main comparison cue without removing paths.

Compare three whole Work screens against the same real records and states: a compact domain map followed by records; domains containing named evidence and direct group access; and records first with domain browsing controls. The current model is the control and may win. Keep complete inventory access, truthful statuses, query URLs, clearing/empty states, and return context in every alternative. Do not substitute a permanent shortlist.

The latter alternatives may change the accepted organizing entrance. Nino selects the direction; amend the functional owner narrowly if that choice changes its atlas-before-registry premise. This review recommends the comparison and does not amend that accepted record. Prepare the specific Work experience brief and preserve the rejected screens before implementation.

Home can compare a small number of styling compositions inside a refit; three whole-site concepts are unnecessary. If its job or visual premise changes materially, reclassify that surface as a rethink and compare three different whole-screen concepts before selection. Revisit rejected candidates for useful details and record anything incorporated into the winner.

Done when the styling comparison and Work selection have rendered evidence, and cold visitors can explain what Nino does, identify evidence behind the claim, and choose a useful next action. Observe this directly; a reviewer agreeing with the headline is weaker evidence than a visitor finding the work.

### 4. Decide whether Writing needs a smaller rethink

Measure the existing archive on a real phone with cold and warm caches. Record transferred HTML/JavaScript, loading and interaction responsiveness, and the task of finding an older essay. Test a query/filter URL, opening a result, Back, and restored place. Compare like-for-like builds and states.

If navigation and presentation repairs solve the task, stop. If browsing or delivery remains a material obstacle, compare three genuinely different archive structures: a complete searchable index with bounded delivery; a topic-led publication entrance with an explicit complete archive; and a period-led reading archive with search. These are candidate directions, not preselected winners. All retain every published piece, accurate counts, source ownership, URLs, and access to the full archive.

Use pagination, server filtering, or explicit load-more only where the selected task benefits. Choose based on findability, return behavior, and measured phone cost. Document what an initial delivery limit saves and what navigation it adds. Never equate fewer rendered rows with better usability by itself.

### 5. Repair the search handoff and verify the release together

Audit indexable pages across route owners for apex canonical URLs, share metadata, sitemap inclusion, status, and intentional index policy. Sample entity/detail pages as well as entrances. Normalize duplicate tag casing where appropriate. Prepare the current sitemap submission set and the legacy URL map for review.

Before changing legacy-host redirects, enumerate public pages, assets, APIs, authentication callbacks, and cookie behavior. An old album returning 200 with an apex canonical is a specific migration gap; it does not justify an indiscriminate whole-host redirect. Search Console's September 20 indexing report predates the latest layout and is not a current census or proof of a rendering cause.

Record the main, blog, gallery, router, and content-publisher versions used for the candidate. Existing builds refresh source indexes from checkouts or published feeds; record which source supplied each build rather than assuming the same committed index means the same content. Inspect the existing deployment triggers before any authorized push. Validate each application in its actual clean build environment and verify the combined apex after an authorized release.

Code review, rendered acceptance, hosted deployment, and successful Search Console submissions are separate receipts. Search Console changes and production publication are later scoped actions, not part of this planning request.

## Use Mobbin and Impeccable to answer named questions

| Open question | Research or tool | What earns an implementation change |
|---|---|---|
| How can a personal introduction contain concrete work without looking like an agency? | Targeted Mobbin portfolio/product-proof examples | A principle adapted to Nino's real content and judged on the target phone screen |
| How can publication identity coexist with an immediate reading start? | Real article entry and navigation examples | A legible title/reading start with intact local publication controls |
| How can a large archive support finding and returning? | Archive/search flows, not isolated promotional screenshots | Observed query, result, reading, and Back behavior relevant to the Writing task |
| Does a proposed refit introduce visual or accessibility regressions? | Impeccable adapt, clarify, harden, and optimize as appropriate | Rendered improvement plus observed preserved behavior |

The completed Mobbin pass used public previews, not authenticated end-to-end flows. Mark that limit on any precedent carried forward. References supply patterns, not Nino's palette or claims. Resolve stale design pointers before another Impeccable detector pass. Its warnings are prompts to inspect; its score is not a user-success measure. Keep cold reviewers unaware of the proposed solution and these reference lessons until their baseline judgment is recorded.

## Measure whether the tasks got easier

Use outcomes per arrival, not one blended traffic number:

- Professional visit: inspect a named work example; meaningful professional inquiry as the eventual outcome. A click is only an intermediate action.
- Article referral: begin and continue reading; return to the publication or intentionally explore the author. Scrolling alone is a proxy, not proof of understanding.
- Photo referral: find the intended album/photo and complete a supported download, save, or share action.
- Coverage visit: persisted non-test lead; keep form starts, errors, and QA submissions distinct.

Define operator, automated-review, explicit QA, public, and unclassified activity before interpreting new events. Do not quietly relabel unclassified traffic as human. Keep existing analytics' different time zones, estimates, and action definitions visible; do not invent a joined funnel from unrelated totals. Minimize new events and avoid storing search text or personal contact details in telemetry.

Begin with observed tasks and a clean baseline. The current traffic and submission evidence do not justify a large A/B program, a pricing change, or a promise of conversion lift. Compare matched windows after an authorized release, record attribution limitations, and use real inquiries and completed tasks to guide further work.

## What would change this plan

- Nino selects a different primary homepage outcome: change the proof hierarchy before designing it.
- The current compact-map Work control serves cold/referral tasks as well as the alternatives: preserve its structure and complete the styling refit.
- An evidence-bearing or records-first Work entrance improves understanding without hiding breadth: select the scoped rethink and amend its owner.
- Cold visitors still misunderstand the body of work after a real styling refit: reconsider grouping or visual premise on the affected surfaces.
- Phone archive tasks succeed and delivery is acceptable: stop at the Writing refit.
- A new archive structure loses complete access or return context: reject it even if its initial payload is smaller.
- A navigation change harms reading or photo retrieval: repair the local interaction before rolling it out across owners.

## Evidence and remaining decisions

The [September 29 assessment](../audit/2026-09-29-critical-frontend/ASSESSMENT.md) owns the current findings and analytics, with direct API receipts, production DOM, and phone/desktop captures. Current source checks for this plan include SiteHeader, Home, layout metadata, link tests, the deployment workflow, and the current navigation and visual contracts. No new user study or phone performance benchmark has been conducted for this plan.

The interview currently has one question pending: the homepage's primary outcome. Next, settle the appropriate proof and the balance between the photograph and that proof. Work's entrance selection is also open after the critical review. A publication/archive priority question is needed only if the benchmark or those answers would materially change the plan. Keep answers here as they arrive; leave historical audit findings intact.

No website source, generated content index, production setting, branch, or external account was changed to produce this plan.
