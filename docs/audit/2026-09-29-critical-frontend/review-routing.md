# Routing and SEO assessment

## Decision

Keep the one-domain strategy.

It gives cold and referral visitors a coherent public identity: an article, gallery, project, or session can lead back to the same Work, Writing, Photography, About, and Search destinations. Blog articles already carry apex canonicals and the shared site navigation. The gallery also emits apex canonicals.

Keep the public identity, not every implementation detail. The current system needs a refit around host redirects, cookie scope, metadata, navigation drift, content versioning, and the Photography entrance. Separate runtimes remain reasonable; deployment convenience alone is not a reason to merge or split them.

This is not a claim that `ninochavez.co` has a Google “domain authority” score. Shared URLs and internal links create clearer ownership and discovery paths. They do not guarantee indexing or rankings.

## What actually serves the site

Five repositories contribute to the public system:

1. The router.
2. The main portfolio.
3. Signal Dispatch.
4. Photography.
5. `nc-demos`.

Four Cloudflare runtimes answer apex requests at request time:

- The router Worker receives every request.
- The main VineNext Worker serves the portfolio and generated Sessions.
- The Astro Pages project serves article and research routes.
- The SvelteKit Pages project serves the gallery.

`nc-demos.pages.dev` is a fifth deployed source endpoint, but not an apex request-time runtime. Its content is copied into the main build. See [`scripts/sync-demo-index.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/scripts/sync-demo-index.mjs:17) and [`scripts/sync-demo-stories.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/scripts/sync-demo-stories.mjs:64).

| Public request | Actual owner |
|---|---|
| `/`, `/work/**`, `/learn/**`, `/demos/**`, `/about`, `/now`, `/links`, `/search`, `/privacy`, `/sitemap.xml`, `/robots.txt` | Main Worker. Sessions are generated from `nc-demos`, not proxied at request time. |
| `/blog` | Main Worker’s generated Writing collection. |
| `/blog/**` | Blog runtime, including essays, series, tutorials, presentations, whitepapers, fiction, and APIs. |
| `/research/**` | Blog runtime, despite sitting outside `/blog`. |
| `/_astro/**`, `/pagefind/**`, `/generated/**`, `/images/generated/**`, `/og/**`, `/og_image*`, `/rss.xml`, `/full-content-rss.xml`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/llms.txt` | Blog runtime. These origin-root exceptions are explicitly enumerated. |
| `/blog/robots.txt` | Blog runtime after removing `/blog` before the origin fetch. |
| `/photography` and `/photography/coverage` | Main Worker. `/photography/coverage.rsc` also stays on main. |
| `/photography/**` beyond those entrances | Gallery runtime, including albums, photos, search, collections, APIs, assets, and `/photography/sitemap.xml`. |
| `/ai`, `/ai/work`, `/ai/learn/**` | Main application redirects. |
| `/photography/about`, `/photography/privacy`, `/photography/volleyball-coverage` | Router-level permanent redirects to their current owners. |
| `www.ninochavez.co`, `blog.ninochavez.co`, `demos.ninochavez.co` | Router-level path-preserving redirects to the apex. |
| `photography.ninochavez.co` | Direct gallery service, not a redirect. |

The authoritative path dispatch is [`routing.ts`](/Users/nino/Workspace/dev/platform/ninochavez-router/src/routing.ts:106), with collection entrances and prefixes at lines 138–203. Host attachment is in [`wrangler.toml`](/Users/nino/Workspace/dev/platform/ninochavez-router/wrangler.toml:6).

## Real visitor benefits

A referral visitor can arrive on a deep article, photo, or work record without first understanding the deployment topology. Blog articles emit apex canonicals and a global header that returns to Work, Sessions, Learn, Photography, and About (`blog origin/main`, `astro-build/src/layouts/BaseLayout.astro:47-63,90-103`; `src/components/SiteHeader.astro:37-64`).

The apex also provides a genuine cross-collection search. It searches Work, Sessions, techniques, Writing, learning paths, and durable pages from one place; the implementation is in [`app/search/page.tsx`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/search/page.tsx:101).

Crawl discovery is broad rather than absent. The bounded site audit found 22,075 sitemap URLs, four valid sitemap endpoints, 18 sampled pages returning 200, and no audit errors. That proves sitemap reach and the sampled responses, not indexing or ranking (`evidence/seo/ninochavez.json:20-43,123+`).

## Costs and failure domains

The router is a domain-wide choke point. If it fails, every collection fails. A blog or gallery outage is narrower, but the router’s prefix list can turn one missing asset class into silent 404s. The source documents exactly that prior failure for blog share cards in [`routing.ts`](/Users/nino/Workspace/dev/platform/ninochavez-router/src/routing.ts:6).

Same-origin paths improve continuity but widen the cookie namespace. Gallery Supabase sessions and analytics preferences are set with `Path=/`, so a cookie created through the apex can be sent on main and blog requests too (`gallery origin/main`, `src/lib/supabase/server-ssr.ts:19-29`; `src/routes/api/analytics/preferences/+server.ts:30-38`). There is no observed exploit here, but isolation is weaker than the separate repositories imply.

Independent deployments also create version seams. Main’s build imports whatever blog and demo source is available at build time. CI falls back to published remote indexes, while a local build reads sibling checkouts. The deployed `/blog` capture showed 306 pieces updated September 29, while the committed local snapshot still contains 298 pieces generated August 16. That demonstrates successful refreshing, but also that the main commit alone cannot reconstruct the exact published content (`evidence/writing.json:1275`; [`sync-writing-index.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/scripts/sync-writing-index.mjs:120)).

## Ranked current issues

1. **Photography still has two visitor hosts.**  
   Source evidence: the router deliberately keeps `photography.ninochavez.co` on the gallery and tests that behavior, rather than redirecting it ([`routing.ts`](/Users/nino/Workspace/dev/platform/ninochavez-router/src/routing.ts:79); [`routing.test.ts`](/Users/nino/Workspace/dev/platform/ninochavez-router/src/routing.test.ts:124)).  
   Affected visitor: referrals using old photography links can remain on a different host, with different cookie state and a different visible identity. Crawlers receive an apex canonical, but the duplicate host still exists.  
   Remedy and owner: make it a path-preserving 301 like Blog and Demos, owned by the router. If the host is intentionally independent, document that as a product split instead of calling it retired.

2. **The gallery’s apex cookies are broader than its route ownership.**  
   Source evidence: Supabase and analytics cookies default to `Path=/`.  
   Affected visitor: an authenticated gallery operator or analytics participant sends gallery cookies to unrelated main and blog routes. That increases collision and disclosure impact across independently deployed code.  
   Remedy and owner: scope gallery-owned cookies to `/photography` where the authentication library permits it, inventory cookie names, and test login, callback, logout, and preference withdrawal. Gallery owns the change; router tests should hold the boundary.

3. **Main-route canonical and crawl policy is incomplete.**  
   Live evidence: the bounded audit reports missing self-canonicals on 10 of 18 sampled indexable pages, including `/`, `/about`, `/blog`, `/demos`, `/learn`, and `/work`. It also reports both `/blog/tags/consulting` and `/blog/tags/Consulting` in the sitemap (`evidence/seo/ninochavez.json:45-121`). `/search` is explicitly `index, follow` in `evidence/search.json:2-5`, and linked example queries create crawlable parameter variants.  
   Remedy and owner: main should emit self-canonicals for durable public routes and set a deliberate noindex policy for search-result pages. Blog should normalize tag slugs before sitemap emission and redirect the noncanonical case.

4. **Global navigation has drifted inside Photography.**  
   Source evidence: the current gallery branch labels `/demos` as “How I work,” while main and Blog use “Sessions” (`gallery origin/main`, `src/lib/components/layout/Header.svelte:39-46`; [`SiteHeader.tsx`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/components/SiteHeader.tsx:10)).  
   Affected visitor: someone crossing from the gallery must recognize that two labels mean the same destination. This weakens the “one website” claim even when the URL works.  
   Remedy and owner: gallery owns the immediate label fix. The shared navigation contract needs one generated or mechanically compared fixture across all three apps.

5. **Generated collection pages are not tied to an immutable release input.**  
   Source evidence: Writing can read a sibling checkout or fetch the latest published index; Demos does the same. The source revision is recorded inside the output, but the deploy does not pin it before starting ([`sync-writing-index.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/scripts/sync-writing-index.mjs:18); [`sync-demo-index.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/scripts/sync-demo-index.mjs:179)).  
   Affected visitor: `/blog`, `/search`, and direct article routes can temporarily disagree after one project publishes without a matching main rebuild.  
   Remedy and owner: main deployment should record and verify exact blog/demo source revisions, then rebuild from those revisions. Cross-repository publication should trigger that rebuild.

6. **The Photography entrance couples main-page completion to gallery APIs.**  
   Source evidence: main makes two gallery-origin requests with five-second timeouts ([`photography-stats.mjs`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/app/photography-stats.mjs:1)). The captured browser load was about 3.08 seconds, and the crawler recorded 4.162 seconds for `/photography` (`evidence/photography.json:202-209`; `evidence/seo/ninochavez.json:1007-1016`).  
   Affected visitor: cold Photography arrivals can wait on a second runtime before the entrance settles.  
   Remedy and owner: main and gallery should cache or publish a small bounded snapshot, shorten failure time, and keep recent-event enhancement out of the critical response.

## Historical claims that no longer survive checking

- The system is not three Vercel apps using `vercel.json`. It is a Cloudflare router plus three request-time application runtimes and a source-publishing demos project.
- `/gallery` is not the current collection path. `/photography` is.
- “Only accessible through the apex” is false for Photography.
- “No duplicate content” is stronger than the evidence. Canonicals exist, but the Photography host still directly serves content.
- “Redirects are bad for SEO” is too broad. This implementation relies on permanent redirects to consolidate retired hosts and routes.
- “Performance isolation” is only partial. Separate app faults can stay local, but the router is shared and the main Photography entrance calls the gallery.
- The sitemap TODO is largely historical: root robots currently advertises main, Blog, and Gallery sitemaps ([`public/robots.txt`](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/public/robots.txt:59)). The remaining problem is consistency, not wholesale absence.

## Keep / refit / rethink

| Decision | Verdict | Reason |
|---|---|---|
| One apex public identity | Keep | It helps cold visitors move between unlike work without reconstructing separate brands. |
| Separate Blog and Gallery runtimes | Keep | Their local navigation, data, and release needs are materially different. |
| Prefix and origin-root asset routing | Refit | The explicit map works, but omissions fail silently. Treat route inventories as a tested contract. |
| Generated Writing and Sessions entrances | Refit | Useful for unified search and presentation, but releases need pinned source revisions. |
| Photography’s direct subdomain | Rethink | Redirect it, or recognize it as an intentionally independent public property. |
| Root-scoped gallery cookies | Rethink | Repository separation does not provide security separation on one origin. |

## Falsifiers for splitting a collection away

Split a collection only if evidence shows one or more of these:

- Its visitors consistently use a distinct identity and do not continue into the personal site.
- Search Console shows persistent canonical or duplicate-URL problems that remain after correct redirects, canonicals, and sitemaps.
- Same-origin cookie or security requirements cannot be safely path-scoped.
- Measured availability or latency shows the router/proxy boundary materially harms the collection.
- Maintaining the shared navigation and metadata contract repeatedly breaks releases despite mechanical tests.
- The collection becomes an independent product with its own audience, policy, and durable navigation model.

No network, Search Console, analytics API, subdomain request, or cookie-runtime check was available in this review. Browser claims come only from the supplied production captures. Ranking effects remain unproven. No servers, ports, tabs, fixtures, or background resources were started. The main synthesis forward link is `docs/audit/2026-09-29-critical-frontend/ASSESSMENT.md`.

The reader-clarity pass kept the recommendation first and reduced prose load without replacing exact route names, ownership, or evidence states.

