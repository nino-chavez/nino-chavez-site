# ADR-0004 — One public site, one navigation, multiple runtimes

- **Status**: Accepted
- **Date**: 2026-07-29
- **Stage**: Redesign foundation — information architecture and navigation
- **Supersedes**: ADR-0002's `/ai` route placement; preserves its apex-integration rationale

## Decision

`ninochavez.co` is one public personal site with one route hierarchy, one global
navigation contract, and one search surface.

That is a product decision, not a deployment constraint. The blog and photography
applications may remain separate runtimes behind the apex router while they adopt the
same navigation contract. A visitor should never need to understand Pages projects,
origins, or subdomains.

The canonical route tree is:

```text
ninochavez.co
├── /                         home and practice claim
├── /work                     complete work library
│   └── /work/:slug           context when a work object needs it
├── /demos                    complete demo series
│   ├── /demos/:slug          numbered session
│   └── /demos/applied/:slug  applied technique
├── /learn                    practitioner paths
│   └── /learn/:track         one path
├── /blog/**                  writing, whitepapers, and presentations
├── /photography/**           photography collection
├── /about                    durable biography
├── /now                      current focus
├── /links                    useful destinations
├── /search                   site-wide discovery
└── /privacy                  policy
```

The global primary navigation is:

1. **Work** → `/work`
2. **Demos** → `/demos`
3. **Learn** → `/learn`
4. **Writing** → `/blog`
5. **About** → `/about`

The site identity links home. Search is a global utility, not a sixth content
section. Photography, Now, Links, Privacy, and external profiles remain directly
reachable through contextual navigation, the work library, and the footer.

`/work` is the complete public inventory. It is not a shortlist and has no
availability gate. Every admitted object appears in the default view and is labeled
with its domain, state, and form. The homepage may summarize all domains and show
mechanically recent activity, but it may not become the only route to a curated
subset.

`/demos` becomes part of the apex route hierarchy. The existing sessions and applied
techniques retain their internal sequence and identity, but receive the same global
navigation and canonical URLs as the rest of the site.

The `/ai` namespace is retired. Its claim becomes the homepage spine, its evidence
moves into Work and Demos, and its practitioner routing moves to Learn.

## Why

### The current topology makes the visitor reconstruct the person

The homepage, `/work`, `/ai/work`, and the demos property each present a different
answer to "what has Nino made?" None is authoritative. The problem is not merely
visual inconsistency; it is competing information architectures.

A single-page homepage cannot repair that. A front door must orient and route. It
cannot also carry a truthful, maintainable inventory of dozens of work objects,
eighteen demo entries, hundreds of pieces of writing, photography, biography, and
current activity.

### A complete library and a focused homepage solve different jobs

The homepage explains the practice and exposes every major destination. The work
library answers the exhaustive question. Demos, Learn, Writing, and Photography
remain purpose-built collections. This gives each page a coherent job without hiding
the long tail.

### URL unity matters more than deployment unity

The apex router already makes separate blog and photography applications appear as
paths on `ninochavez.co`. Replatforming them merely to reach one Pages project would
add migration risk without improving the visitor's model. Shared URLs, navigation,
metadata, and active states are the required unity.

Demos is different: its subdomain is currently both a separate origin and a separate
public front door. Moving it under `/demos` repairs the product boundary; whether the
content is generated into the SvelteKit app or reverse-proxied is an implementation
choice.

### ADR-0002's rationale now applies one level higher

ADR-0002 chose the apex because the audience already lands there and because paths
and evidence should not be split. The redesigned homepage now carries the practice
claim itself, so preserving `/ai` would recreate the extra front door that the
decision was meant to avoid. The rationale survives; the route does not.

## Consequences

- The redesign is multi-route. The homepage is not a long-form replacement for the
  rest of the site.
- `/work` is rebuilt from an authorized registry; invented placeholder projects are
  removed rather than restyled.
- The default Work view contains every publishable object. Domain, state, form, and
  text search refine the view but do not define admission.
- Demos receives apex URLs and the shared shell before its subdomain begins
  redirecting.
- Blog and photography may keep their present runtimes. They must render the same
  global navigation contract and canonical apex URLs.
- Independent product domains remain independent destinations. They are work objects,
  not sections of the personal site's navigation.
- Global search spans Work, Demos, Writing, and durable pages even when those records
  come from separate build systems.
- Visual composition, color, typography, imagery, motion, and component styling are
  intentionally not decided by this ADR.

## Redirect contract

Redirects are permanent and happen at the apex router, not in client-side JavaScript.

| From | To |
|---|---|
| `/ai` | `/` |
| `/ai/work` | `/work` |
| `/ai/learn` | `/learn` |
| `/ai/learn/:track` | `/learn/:track` |
| `demos.ninochavez.co/` | `ninochavez.co/demos` |
| `demos.ninochavez.co/:slug` | `ninochavez.co/demos/:slug` |
| `demos.ninochavez.co/applied/:slug` | `ninochavez.co/demos/applied/:slug` |
| `blog.ninochavez.co/:path` | `ninochavez.co/blog/:path` |
| `photography.ninochavez.co/:path` | `ninochavez.co/photography/:path` |

The demos redirects do not ship until every current public demo URL has an apex
equivalent and asset-path parity has been verified.

## Revisit triggers

Revisit this decision only if:

- a collection becomes an independent product with its own audience and identity;
- measured navigation evidence shows that a primary destination is consistently
  misunderstood; or
- a runtime cannot preserve the shared URL, metadata, accessibility, and navigation
  contracts without unacceptable operational cost.

Deployment convenience alone is not a revisit trigger.
