Method: dual-agent (A: 01a0ef43-4188-7591-8d13-25498880338e · B: 01a0ef46-8316-7293-832e-045b207afb9c), plus an independent routing review and parent verification of production screens, interactions, analytics, and Search Console.

# Keep the domain; refit the experience

The shared `ninochavez.co` address is worth keeping. The site has an authored identity and useful destinations. Its weakest moments are the first encounter, navigation between applications, and the phone version of Learn. A whole-site redesign would spend effort replacing things that already work.

The SEO return is not established. Google Search Console reports no Web search clicks in the selected three-month period. Its latest indexing report recognizes very little of the property. That makes search discovery and URL consolidation a priority. It does not prove that sharing a domain caused the problem.

Refit Home, Work, Learn, and the common navigation. Preserve the gallery's practical photo-finding flow and the publication's identity. Investigate a smaller rethink of the Writing archive's browsing and delivery, after measuring it on a phone. No website code, production configuration, Search Console settings, or public content was changed in this assessment.

## One address bought continuity and created shared responsibilities

The public sections are paths under one address. They are not one application. Five repositories contribute to the result: the router, main site, publication, photography application, and demo publishing source. The router and three content runtimes answer public requests. Demo content is imported into the main build.

```text
ninochavez.co — router
  Main site     /, /work, /learn, /demos, /blog, /photography,
                /photography/coverage, /search
  Publication   /blog/<article>, /research, publication assets and feeds
  Gallery       /photography/albums, /photography/photos, gallery utilities
  Demo source   feeds the main build; no separate apex request runtime
```

The routing contract is in [routing.ts](/Users/nino/Workspace/dev/platform/ninochavez-router/src/routing.ts:106). It includes origin-root asset and feed exceptions, so the simplified picture above is not an exhaustive routing specification.

| Decision | What it bought | What it costs | Improvement |
|---|---|---|---|
| One public hostname | One recognizable author, durable links, and search across the body of work | Visitors expect the same global navigation and ordinary browsing behavior everywhere | Own one navigation contract across the three implementations |
| Separate applications | Each section can publish and use a suitable interface | Independent releases can drift; the router remains a shared dependency | Test representative routes and assets together, and record source versions for generated indexes |
| Paths for writing and photography | Related work remains visibly attached to Nino | Several old and current URL forms can describe the same content | Align redirects, canonical URLs, internal links, and sitemaps |
| Distinct publication and gallery interfaces | Reading and photo retrieval retain appropriate tools | Extra headers and differing labels expose application boundaries | Keep local task navigation, but make its relationship to the Nino header clear |

Hosting all the work under one domain does not automatically make every section rank better. Google describes ranking as primarily page-level, with additional site-wide signals. A popular sports album therefore does not establish authority for a product-architecture query. The recommendation is to keep the coherent author identity and strengthen relevant connections between actual projects, sessions, and writing. [Google's ranking systems guide](https://developers.google.com/search/docs/appearance/ranking-systems-guide).

Permanent redirects remain a valid part of consolidation. They do not inherently lose PageRank. The older strategy document's general warning against redirects should not govern current decisions. [Google's site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## The analytics support phone and referral work, not a redesign verdict

These are production observations retrieved on September 29, 2026. Their windows and definitions differ. They must not be combined into a single funnel.

| Source and window | Observation | What it means |
|---|---|---|
| Search Console, Google Web search, June 28–September 27 | 0 clicks; 39 impressions | The selected report has not demonstrated organic acquisition. The sample is too small for a ranking or copy-optimization verdict. |
| Search Console indexing, updated September 20 | 2 indexed URLs: Home and Photography; 27 excluded URLs | Investigate discovery and indexing. The domain property also contains legacy subdomains, and this report predates the September 24 frontend changes. |
| Cloudflare public apex paths, August 30–September 28, complete UTC days | Estimated 550 page loads; 60 entry visits | This measures arrival and loading. It does not measure understanding, reading, or a completed task. |
| Same Cloudflare window | 310 mobile loads; 240 desktop loads | Phones deserve first-class verification. Approximately 56% of this sampled traffic was mobile. |
| Same Cloudflare window | Home 180 loads; Photography entrance 160; Sessions 60; Writing index 30; Work 30 | Home and the photography entrance deserve attention. Low collection counts are not proof of low interest in the underlying content. |
| Gallery, August 30–September 28, America/Chicago | 2,167 recorded photo opens; 126 estimated browsers with any activity | The gallery has stronger task-action evidence than the portfolio. Browsers are not verified people; opens are not unique viewers or photographic-quality scores. |
| Coverage database, all retained records at inspection | 0 non-test inquiries; 10 of 11 recorded form starts explicitly tagged as QA; 8 request opens tagged to school outreach | There is no reliable real-customer conversion rate. Verify a clean outreach-to-request path before changing the offer or price. |

Cloudflare's 60 entry visits are 30 direct/unknown, 10 Facebook, 10 LinkedIn, and 10 Instagram in this sample. A visit here is an externally referred or directly reached page view, not a unique person. Counts are sampled estimates, and owner or agent visits can be included. [Cloudflare's metric definitions](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/).

The previous Cloudflare period recorded 1,020 page loads and 760 entry visits. The displayed declines are real differences between those report totals. They do not establish a design-caused traffic collapse. Traffic composition, sampling, internal use, and recent release timing make that causal claim unsupported.

The gallery's JCA-at-ACC, JCA-vs-PNHS, and Millikin-at-North-Central albums recorded 827, 241, and 207 photo opens respectively. These total 1,275 of 2,167 actions. The practical implication is to protect recent event discovery, direct album links, and photo actions. This is evidence about attention to delivered events, not a reason to reshape the entire portfolio around volleyball.

Sources: [Cloudflare direct query](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/cloudflare-traffic-direct.json), [site report](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/site-analytics-30d.json), [gallery report](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/gallery-analytics-30d.json), [coverage database report](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/coverage-leads-report.json), and [Search Console performance](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/search-console-performance.json).

## Search discovery needs a current handoff

The September 20 indexing report lists six redirect exclusions, three 404s, and eighteen crawled-but-not-indexed URLs. Redirect exclusions are often expected. The excluded examples mix current essays and publication entrances with old gallery and Blueprint subdomains. Treat this as Google's known inventory, not a complete census of the current website or a diagnosis of why Google declined a page.

Search Console's submitted sitemap list still points to older locations. It includes an unsuccessful May fetch of `/blog/sitemap-index.xml` and an unsuccessful legacy photography submission. The currently advertised apex sitemap set is not represented as a complete set in that list.

Today's public checks found valid XML at `/sitemap.xml`, `/sitemap-index.xml`, and `/photography/sitemap.xml`. The historical fetch errors do not mean these current files are broken. Register and monitor the current set, then inspect representative Home, Work, essay, session, and album URLs for Google's selected canonical and indexing status. A sitemap helps discovery; it does not guarantee indexing. [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).

The bounded crawler checked eighteen pages and twenty links. It found no errors and eleven warnings, including ten sampled main pages without self-canonicals and a case variant in publication tag URLs. These are operating diagnostics, not evidence that search acquisition works. Its 22,075 discovered sitemap URLs were not all audited.

Make durable pages declare their preferred URL. Normalize publication tag case. Choose an explicit policy for query-driven search results. Canonicals are helpful consolidation signals, but their absence alone does not explain non-indexing; Google can choose a canonical without them. [Google's canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

Legacy host behavior needs route-level checking. The photography root ultimately reaches the apex, but the tested old album URL still returns HTML with status 200 on `photography.ninochavez.co`. Its canonical correctly points to the corresponding apex album. Consolidation is therefore partial. Preserve any necessary API/auth exceptions and redirect retired public album URLs deliberately, rather than applying an unexamined hostname-wide rule.

Evidence: [indexing report](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/search-console-indexing.json), [submitted sitemaps](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/search-console-sitemaps.json), [bounded crawl](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/seo/ninochavez.md), [current routing requests](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/current-url-routing.json), and [legacy album response](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/legacy-album-alias.json).

## The design is specific, but the first encounter asks for too much patience

The visual language is authored. Anton, Inter, Space Mono, the ink/bone/cobalt palette, volleyball imagery, evidence labels, and varied page compositions connect to this body of work. Replacing them with a generic agency or SaaS template would remove useful character.

The cold-visitor weakness is simpler: the website establishes Nino faster than it demonstrates what Nino builds. The home image proves a personal connection to a real setting. It does not by itself prove the software claim above it. Work then presents a taxonomy before named examples. Together, these pages make an unfamiliar professional referral invest another click or scroll before seeing inspectable product evidence.

Direct destinations often perform better. Rally HQ states the job, availability, and opening action. The album presents search and photographs immediately. The publication clearly names itself. These are strengths to extend, not reasons to flatten every page into one layout.

### Priority issues

| Priority | Problem and evidence | Smallest remedy | Direction |
|---|---|---|---|
| P1 | Learn is visibly broken at 390px: document width is 645px and the opening text is cut off | Correct nowrap and container sizing; verify the longest real heading and supporting text at phone widths | Preserve behavior; responsive repair with `impeccable adapt` |
| P2 | Home claims product-building expertise without a named product in the first viewport; Work leads with six domains | Bring one inspectable product proof into the early encounter and make named work easier to reach; preserve the full atlas | Refit hierarchy with `impeccable clarify` and `layout` |
| P2 | The same global navigation changes by application; the gallery calls Sessions “How I work”; article pages show both global and publication menus | Align labels, order, search placement, current-page treatment, and close/focus behavior; keep local reading/photo controls | Refit with `impeccable harden` and `clarify` |
| P2 | The Writing index renders all 306 pieces, roughly 410KB of decoded HTML and nearly 50,000px of phone document height; same-origin article and series links force new tabs | Restore ordinary same-tab navigation first. Measure phone browsing, then compare bounded initial groups, server filtering, or pagination with an explicit full-archive path | Navigation refit; conditional, targeted browsing rethink using `impeccable optimize` |
| P2 | Learn promises output-based choice, then leads with Explorer, Builder, Architect, Strategist, Author, Voice, and Enterprise | Make what each path produces the dominant comparison cue; retain all paths and make role labels subordinate | Refit with `impeccable clarify` |

The Writing payload is a measured delivery concern, not a measured Core Web Vitals failure. The captures do not establish cold-cache LCP, CLS, or INP. Search Console has no field Core Web Vitals data here. Measure before commissioning a large rendering rewrite.

“See selected work ↓” links to `/work`; it does not scroll to Home's selected-work section. Align that action's behavior and visual cue. On essays, bring the title, author context, and reading start earlier on phones; the illustration currently precedes the title after two navigation bars. These are smaller refit decisions, not evidence that the publication should lose its identity.

Visual evidence: [Home on a phone](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/home-mobile-top.png), [Work on a phone](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/work-mobile-top.png), [Learn clipping](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/learn-mobile-top.png), [essay arrival](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/article-mobile-top.png), and [album arrival](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/album-mobile-top.png).

### Different arrivals need different next steps

| Visitor and entry | What they need | Current friction | Improvement |
|---|---|---|---|
| Cold professional visitor: Home or Work | Understand Nino's contribution and inspect substantial work | Personal identity and collection organization arrive before product proof | Provide a singular early proof and a fast path to a named record |
| Professional referral: project or session | Confirm the recommendation, inspect the work, and understand who made it | Project records are strong; some session pages introduce another visual world before the record | Keep purpose and action prominent; make Nino/section context economical and stable |
| Reader referral: direct essay | Identify the publication, start reading, and find a relevant next piece | Two menu systems and an illustration precede the title; archive links force extra tabs | Improve mobile reading order and ordinary Back behavior |
| Parent, athlete, or team: album | Find the event or athlete, inspect photos, save/download/share | Photo tools are clear; the global label and long album title can lose context | Preserve the retrieval interface; improve title access, stable navigation, and share destinations |
| Organizer considering coverage | Understand terms and complete a real request | No trustworthy customer completion baseline exists | Verify one marked test through the existing request flow, then measure separately from real inquiries |

The strongest emotional path is recognition, useful evidence, then a clear action. Home creates curiosity but delays the evidence. Learn interrupts confidence with visible breakage. Album referrals reach useful content quickly. These are judgments of the observed screens, not measured abandonment rates.

## Refit wins; a whole-site rethink has not earned its cost

| Option | Cold visitor | Referral visitor | Tradeoff | Verdict |
|---|---|---|---|---|
| Refit the authored body of work | Earlier proof and clearer choice without replacing identity | Keeps existing destinations and task tools | Requires disciplined navigation ownership across applications | Preferred |
| Rebuild Home as a campus of separate projects/publications | Makes the section structure explicit | May help visitors already familiar with a project name | Unfamiliar visitors must choose an organization before seeing evidence; reinforces application seams | Borrow explicit section context, reject separate-site framing |
| Rebuild Home around one audience and one conversion | Strong focus for the selected audience | Other referral audiences become secondary | Narrows a deliberately broad practice and risks turning it into a services funnel | Use only if Nino intentionally changes the site's primary job |

These are option assessments, not rendered concepts. No full rethink was prototyped or visually validated. If a new site structure is chosen later, develop three genuinely different whole-screen concepts against the same cold professional, essay-referral, and album-referral cases before committing. Carry useful parts of rejected concepts into the winner deliberately.

| Surface | Recommended intent |
|---|---|
| Shared domain and separate runtimes | Preserve; strengthen their common contracts |
| Home and Work entrance | Refit hierarchy and early proof |
| Project records, About, Sessions | Preserve; adjust only observed context or hierarchy problems |
| Learn | Repair responsive containment; refit comparison labels |
| Writing entrance | Preserve publication character; test a targeted browsing/delivery rethink |
| Direct essays | Refit phone reading order and global/local navigation |
| Photography and albums | Preserve retrieval and action tools; refit shared-shell consistency |
| Coverage | Preserve current offer and pricing; establish clean completion evidence |

## Mobbin supplied bounded precedents, not user evidence

The authenticated Mobbin library was unavailable in the available tool/session state. Public [portfolio website previews](https://mobbin.com/explore/sites/categories/portfolio-websites) were rendered and inspected. This was not a complete flow study or proof of those sites' usability.

| Preview actually inspected | Useful principle | What to reject |
|---|---|---|
| Fiasco's studio/about section | Its imagery and main claim refer to the same people and activity; apply that coherence to the product claim and proof | Copying its yellow palette, collage, or agency positioning |
| Fiasco's contact section | Contact reasons help a visitor choose an appropriate action | Turning the whole body of work into an inquiry form |
| Metalab's statistics section | Strong hierarchy can make selected evidence easy to scan | Large decorative numbers; project and article counts are not outcome proof |
| Vucko's footer | Navigation groups have clear purposes | A giant wordmark or footer as a substitute for first-encounter orientation |

Use Mobbin next to compare specific jobs: a publication index, direct article arrival, project evidence, and mobile archive navigation. Reference screens can inform a decision. They do not become the brand source or replace observation of the current website. [Captured public previews](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/mobbin-fiasco.png).

## Impeccable found useful seams and a stale design contract

Assessment A was completed before Assessment B's detector findings entered synthesis. A judged design specificity and screens. B ran the detector once and examined source and supplied browser evidence. A third reviewer examined routing and URL ownership. The parent independently opened the screens and checked the claims that determine this recommendation.

The detector reported 280 findings: 274 advisory and 6 warning. That is not a count of 280 user defects. Its historical `DESIGN.md` baseline rejects the current approved font aliases and many current sizes/colors. The mobile dialog radius and a coverage status note also produced irrelevant matches. The chapter-progress width transition is real but low priority. The visible Learn breakage and navigation drift survive source and rendering checks.

The following scores are A's limited static judgments. They are not observed success rates, a WCAG audit, or a new full-site score after the parent's interaction checks.

| # | Heuristic | Score | Evidence or limit |
|---|---|---|---|
| 1 | Visibility of status | 2 | Breadcrumbs, counts, and availability help; interaction feedback was outside A's stills |
| 2 | Match to real-world language | 3 | Practical actions are clear; Learn's role labels need interpretation |
| 3 | User control and freedom | n/a | A did not exercise controls |
| 4 | Consistency and standards | 3 | Strong visual system; global navigation drift remains |
| 5 | Error prevention | n/a | A did not exercise forms |
| 6 | Recognition over recall | 2 | Early proof and output comparison need improvement |
| 7 | Flexibility and efficiency | n/a | Not assessed for these stills |
| 8 | Aesthetic and minimalist design | 3 | Distinct hierarchy; Learn's clipping is a clear defect |
| 9 | Error recovery | n/a | A did not capture error states |
| 10 | Help and documentation | n/a | Not assessed for these stills |
| Total | Five scored heuristics | 13/20 | Limited reviewer diagnostic; no empirical conversion claim |

Two contextual files need maintenance before a future formal design pass: `PRODUCT.md` uses the legacy schema and `DESIGN.md` disagrees with the approved current visual system. Impeccable's `init` owns the product-context refresh. Do not let these stale inputs replace the rendered identity or current art direction automatically.

## Measure successful tasks before optimizing presentation further

Use one shared definition of a section, arrival source, QA/operator status, and action destination. Do not join the existing datasets merely because they share a hostname.

| Journey | Useful outcome | Next measurement |
|---|---|---|
| Cold Home → project | Visitor can identify what Nino built and inspect it | Observe a small set of unfamiliar visitors; record the selected project and subsequent public-product action |
| Professional referral → evidence | Visitor reaches the relevant record without wandering through the whole catalog | Tagged referral destination and relevant record/product action |
| Essay referral → reading | Reader starts the actual piece and can find a relevant next one | Article arrival, a restrained reading-progress signal, and next-piece action; do not call a page load a completed read |
| Event referral → photographs | Visitor finds an event or frame and performs the intended photo action | Album discovery, search success, save/download/share actions, and clean human/QA separation |
| Outreach → coverage request | A real inquiry is stored and reaches the existing follow-up workflow | Tagged request open and persisted non-test lead; server records define success |

At this traffic level, a large A/B program would not supply fast, reliable answers. Fix the observed clipping, test the important journeys with unfamiliar people, and collect clean outcome data. A screen recording or more events would not by itself resolve the product-priority decision.

## What would change the recommendation

- A cold-user study shows that earlier product evidence still fails because the overall grouping is misunderstood. That would justify an information-architecture rethink.
- Nino chooses one dominant audience or offer for the homepage. That would justify a different first-screen hierarchy; it is not inferable from the current mixed traffic.
- Representative URL inspection shows persistent indexing/canonical problems after a coherent current URL handoff. That would justify deeper technical investigation, not automatically new domains.
- Actual phone measurements and observed archive tasks show poor Writing responsiveness or retrieval. That would justify the targeted browsing rethink.
- A section needs genuinely independent branding, ownership, authentication, or security boundaries. That could justify a separate hostname. Neither source separation nor speculative SEO benefit is sufficient alone.

## Reviewer claims were checked and corrected

| Claim | Parent finding | Disposition |
|---|---|---|
| The live $250 coverage price contradicts the approved offer | The later [September 9 operations record](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/coverage/lead-operations.md:164) explicitly establishes $250 and supersedes $350 | Reject as a visitor defect; older documentation is stale |
| Photography's legacy hostname never redirects | The root redirects, but the tested old album remains a 200 response on the legacy host with an apex canonical | Narrow to partial public-path consolidation |
| Learn is broken on the captured desktop | Early captures were 800×423; corrected 1440×900 captures show the wide layout fits | Confirm phone and intermediate-width containment; do not claim the corrected wide frame clips |
| Main mobile Escape does not close the menu | A first CDP event lacked the virtual key code; a correctly formed Escape closes the native dialog and returns focus to Menu | Reject the proposed interaction defect |
| Offscreen Writing headings appear empty in extraction | Deferred rendering explains the extractor output; no accessibility-tree failure was demonstrated | Do not report an accessibility failure |
| Traffic decline or no coverage leads proves design/price failure | Mixed traffic, historical windows, and QA-heavy form activity do not support causation | Reject the causal claim |

The overflow gate was deliberately made to fail with a temporary element: Work changed from 390px to 520px document width, then returned to 390px after removal. This verifies that the gate can detect overflow. No temporary page changes were persisted.

## Provenance and scope

Production captures cover Home, Work, Rally HQ, Sessions, Learn, Writing, Photography, Coverage, About, Search, a direct essay, a direct album, and a direct session. Corrected desktop PNGs are 1440×900; phone captures use 390×844. Initial 800×423 captures were retained with explicit filenames. These are selected viewports, not complete full-page, physical-device, keyboard, or assistive-technology reviews.

Parent interaction evidence includes opening the main mobile menu, Escape/focus return, an empty Work search and recovery, and a failing/restored overflow canary. No form was submitted. Source predicts further differences in non-React menus; a browser-wide accessibility verdict is still unmeasured.

The main checkout was at `d264e7d`, behind `origin/main` by one privacy-doc commit. Photography was nineteen commits behind its remote; cross-application current claims used `git show origin/main` and production responses rather than treating the checkout as current. The actual blog source is `sites/nino/blog/astro-build`; an older `apps/blog` pointer is stale.

All three bounded, read-only dispatches completed with exit code 0. Initial design and technical classifier timeouts were retried through the required dispatcher. The receipts prove completed child execution, but expose no actual model or effort metadata. Selected policy routes therefore remain requested, not runtime-verified. [Compact receipts](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/review-receipts.json).

The original independent reviews remain available: [design](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/review-design.md), [technical](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/review-technical.md), and [routing](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/review-routing.md). Their assertions are not interchangeable with the adjudicated findings above.

No worker started a browser or server. No detector overlay was injected. The fallback was the CLI scan, current source, and parent-captured production screenshots and DOM. The parent's own leased browser tab was closed; the shared browser and other sessions were preserved. Local branch refs, the index, and tracked website files remained unchanged. All deliverables are local and unpublished.

## Product choices for a later refit

These choices do not block this completed assessment or the confirmed responsive repair.

1. The homepage pairs a product-building claim with volleyball imagery. Should its first screen remain led by the personal photograph, or make a built product the main evidence while retaining the photograph?
2. For the first-screen hierarchy, which referrals matter most: professional collaborators/employers, publication readers, or people finding event photographs?

The current recommendation preserves the authored identity and assumes professional visitors need earlier product evidence. A different explicit priority could change the hierarchy. It would not change the observed clipping or the need for consistent navigation.
