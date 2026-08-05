# Information architecture and navigation contract

- **Status**: Approved foundation
- **Date**: 2026-07-29
- **Decision**: `decisions/0004-unified-apex-information-architecture.md`
- **Scope**: route hierarchy, content ownership, navigation behavior, discovery,
  and migration
- **Not in scope**: color, typography, imagery, layout styling, card styling, motion,
  or art direction

## Product model

The site is a profile with several deep collections, not a landing page with project
teasers.

It has five visitor jobs:

1. Understand who Nino is and what connects the work.
2. See the complete body of work without guessing what was omitted.
3. Inspect how the work gets made.
4. Find an applicable path for their own practice.
5. Read, view, or use a specific artifact.

Each top-level route owns one of those jobs. The homepage introduces the model and
routes into it; it does not absorb the collections.

## Canonical route tree

```text
/
├── work
│   └── :slug
├── demos
│   ├── :slug
│   └── applied
│       └── :slug
├── learn
│   └── :track
├── blog
│   └── **                       existing publication routes remain valid
├── photography
│   └── **                       existing gallery routes remain valid
├── about
├── now
├── links
├── search
└── privacy
```

All public canonical URLs use `https://ninochavez.co`. A separate runtime or origin
must not produce a separate public identity.

## Page responsibilities

| Route | Visitor question | Required content | Must not become |
|---|---|---|---|
| `/` | Who is this, and where should I go? | identity, practice claim, three unlike forms of public work, six-domain map, a direct link to current activity, and entrances to Work, Sessions, Learn, Writing, Photography, and About | the full portfolio, a second Now page, a services funnel, or a seven-way persona chooser |
| `/work` | What has Nino actually made? | complete authorized registry, counts, domain groups, search, state and form filters | a selected-work grid or a list split into tools/apps/sites |
| `/work/:slug` | What is this object and what is its honest state? | concise claim, state, form, provenance or receipts when useful, one primary destination, related demos/writing | a required template for every object or an invented case study |
| `/demos` | What can I watch or step through? | all numbered sessions and all applied techniques, with the distinction explained | a marketing teaser for an external subdomain |
| `/demos/:slug` | Show me this session in sequence | existing session content, sequence position, previous/next, related techniques and work | a generic work-detail page |
| `/demos/applied/:slug` | Show me this technique in practice | existing applied content, related sessions and work | a detached microsite |
| `/learn` | Which path matches my practice? | seven existing practitioner tracks and their distinctions | a homepage-level fork |
| `/learn/:track` | What should someone in this track do next? | grounded path, evidence, related demos/work/writing | a claim without receipts |
| `/blog/**` | What has Nino written or published? | existing essays, whitepapers, and presentations with publication navigation | a second personal homepage |
| `/photography/**` | Show the photography | existing gallery and photography-specific navigation | a second personal homepage |
| `/about` | Who is Nino beyond the catalog? | durable biography, working model, profile image if art direction approves it, links to Now and external profiles | a services pitch |
| `/now` | What is active now? | dated current focus and active work | a second work inventory |
| `/links` | Where else can I find or use the work? | maintained destination list | the primary navigation |
| `/search` | Where is the thing I remember? | grouped results across Work, Sessions, Writing, and durable pages | an unscoped web search |
| `/privacy` | What does this site collect? | current policy | promotional content |

## Global navigation

### Desktop and wide layouts

The header has three stable regions:

1. **Identity** — `Nino Chavez`, linked to `/`.
2. **Primary navigation** — Work, Sessions, Learn, Writing, Photography, About, in that order.
3. **Utility** — Search.

There is no global call-to-action, services link, or product dropdown. The navigation
is a single level. Deeper choices belong on their collection landing pages.

The header contract applies to the main app, blog, photography, and every demo page.
The rendering implementation may differ by runtime; the labels, destinations, order,
active-state rules, and accessibility behavior may not.

### Naming rules

A visitor navigating by label must be able to tell they arrived. These rules were
derived from the production copy audit of 2026-08-01
(`docs/audit/FINDINGS-copy-2026-08-01.md`); the vocabulary clauses that govern the
words themselves live in `OPEN-PRACTICE-ART-DIRECTION.md` §Copy and naming.

- **One canonical name per surface.** Each destination in this contract has exactly
  one visitor-facing name, used in the nav, the page title, every cross-link, and
  every breadcrumb. Descriptive variation is allowed in a sentence about the
  surface; it is not allowed in a label, heading, or link that names it. Seven
  names for one library ("the work library", "the complete working record", "the
  complete public record", "the complete searchable record", "all work", "the
  complete library", "Work") is a wayfinding defect even when every phrase is
  accurate.
- **The nav label appears on the page it opens.** A visitor who clicks `Writing`
  must find the word `Writing` on arrival, even when the destination carries its
  own brand. `/blog` satisfies this: its eyebrow reads `WRITING / COMPLETE
  PUBLICATION` above the title `SIGNAL DISPATCH`. Where a destination has a brand
  the nav does not carry, the surface that links to it introduces both.
- **The nav label describes what is there.** `Demos` promising interactive product
  demos and delivering written operating sessions is a label defect, not a content
  defect. When the page's own title and the nav label disagree about what the page
  is, the nav label changes.
- **Labels do not share a root noun.** Owner decision 2026-08-04: the surface at
  `/demos` is named **Sessions** (previously "How I work", previously "Demos").
  "Work" and "How I work" in the same six-item nav were semantically and verbally
  too close to scan. "Sessions" is the page's own dominant noun ("12 complete
  sessions", "Full sessions") and shares no root with any other label. The route
  stays `/demos`; routes are addresses, not names.
- **No two records share a name.** Two work records named `Ways of Working` and
  `Agentic Ways of Working`, plus a third page titled `Ways of Working`, cannot be
  distinguished in search results or in a shared link. Admission to the registry
  requires a name no other public surface already holds.

### Active-state rules

| Navigation item | Active paths |
|---|---|
| Home identity | `/` only |
| Work | `/work`, `/work/**` |
| Sessions | `/demos`, `/demos/**` |
| Learn | `/learn`, `/learn/**` |
| Writing | `/blog`, `/blog/**` |
| Photography | `/photography`, `/photography/**` |
| About | `/about`, `/now`, `/links` |
| Search | `/search` |

Photography has its own visitor task and subtree, so it owns its active state even
though it remains represented in Work. Now and Links are personal-context pages, so
About remains active there.

The current item is communicated by more than color and uses
`aria-current="page"` on an exact page or `aria-current="true"` for a section owner.

### Compact and mobile layouts

The compact header retains the home identity and a labeled **Menu** button. Activating
Menu opens a navigation dialog containing:

1. Search
2. Work
3. Sessions
4. Learn
5. Writing
6. Photography
7. About
8. Now
9. Links

The dialog:

- places focus on its first interactive element;
- traps focus while open;
- closes on Escape, explicit Close, route selection, or browser Back;
- returns focus to the Menu button;
- prevents the obscured page from scrolling or receiving pointer input;
- exposes the active destination in text or an accessible current marker;
- does not rely on swipe gestures.

The mobile sequence is the desktop sequence plus the secondary personal destinations;
it is not a different information architecture.

## Contextual navigation

Global navigation answers "which part of the site am I in?" Contextual navigation
answers "where am I inside this collection?"

### Breadcrumbs

Breadcrumbs appear on detail routes, not on the homepage or top-level collection
pages:

```text
Work / Film Room
Sessions / Title
Sessions / Techniques / Technique title
Learn / Photographer
```

Only ancestors are links. The current item is text with `aria-current="page"`.

### Collection controls

- Work uses search and filters, not a subnavigation bar.
- Sessions exposes **Full sessions** and **Techniques** as named collection sections.
  These may be jump links on `/demos`; they are not separate global-navigation items.
- Demo session details expose previous and next sessions in the declared sequence.
- Applied-technique details expose related sessions instead of pretending to have a
  numbered sequence.
- Learn tracks return to the Learn index and cross-link to evidence in Work, Sessions,
  and Writing.
- Blog retains its publication taxonomy below the global header.
- Photography retains gallery-specific controls below the global header.
- About, Now, and Links expose one another as sibling context links.

### Related content

Related links are explicit relationships in content data, not similarity guessed in
the browser:

- a work object may relate to demos, writing, or another work object;
- a demo may relate to work, applied techniques, and writing;
- a learn track may relate to work, demos, and writing;
- writing may relate back to work or demos.

Cross-links use the destination's content-type label so that a visitor knows whether
they are opening a demo, essay, product, repository, or external site.

## Work library

### Admission rule

> A work object belongs when it can be described truthfully and publication is
> authorized. Availability is metadata, not admission.

The default `/work` response contains every admitted object. There is no implicit
`featured`, `selected`, or `available` filter.

The inventory unit is an authored product, system, collection, or durable experiment,
not every repository and not every item inside a collection. For example, the demo
series is one Work object; its eighteen entries belong in Demos. The blog is one Work
object; its posts belong in Writing.

Client, employer, and commerce-related objects are included only when naming and
describing them is authorized. A clean repository or public URL is not publication
authority.

### Primary grouping

Domain is the default grouping and the proof of breadth:

1. **Developer tools**
2. **Local-first**
3. **Volleyball**
4. **Commerce**
5. **Media & assets**
6. **Writing**

Type is metadata, never a top-level page. Status is an honest label and filter, never
an admission gate.

### Statuses

| Status | Meaning | Destination behavior |
|---|---|---|
| `live` | Hosted and usable | open the canonical product |
| `maintained` | Actively maintained code, documentation, or toolkit | open the repository or public reference |
| `published` | Published material kept available as part of a collection | open the collection |
| `building` | Actively being built, not usable yet | open local detail context or have no action |
| `paused` | Stopped and retained for reference | open local detail context or have no action |

Access is separate from lifecycle status. A private project may be live or building
while its Work page remains a public summary.

### Types

The initial controlled vocabulary is:

`site` · `cli` · `app` · `service` · `repo` · `docs` · `toolkit` · `experience` · `collection`

Type describes the object. It does not determine importance, grouping, or whether the
object appears.

### Registry fields

Every Work record requires:

```text
slug
name
claim                  one sentence, verifiable and current
domain                 one controlled domain
state                  one controlled state
form                   one controlled form
destination            one primary destination or explicit none
destination_label      action in the visitor's language
updated_at
verified_at
relationships          explicit IDs for related work, demos, and writing
```

Optional local detail content is permitted when the object needs context. It is not
required merely to satisfy a card template.

### Filters and URLs

The unfiltered URL is canonical:

```text
/work
```

Refinements are shareable query parameters:

```text
/work?q=capture
/work?domain=volleyball
/work?state=building
/work?form=app
/work?domain=developer%20tools&state=maintained
```

Filters combine with AND across fields and OR within a repeated field. Removing all
filters returns the complete library. A zero-result state explains which refinements
are active and offers **Clear filters**.

The initial release does not need a visitor-facing sort menu. Domain order is stable;
items within a domain use declared recency, then name as a deterministic tie-breaker.

## Demos collection

`/demos` owns two complete, visible collections:

- **Sessions** — the eleven numbered presentations in their intended order.
- **Applied techniques** — the seven standalone applications without invented
  numbering.

The current session and applied-technique content is migrated intact before aesthetic
redesign. Navigation, canonical URLs, metadata, responsive behavior, and accessibility
are rebuilt around it.

The Demos landing page lists every entry. The Work library lists the series once and
links to the collection; it does not duplicate eighteen records.

## Search

Site search is justified by the size of the body of work, not added as decoration.
Its specific justification is reach: `/search` is the only surface that spans the
apex app and the separately published writing, so it finds things no in-page filter
can.

The `/search?q=` index covers:

- Work objects
- Demo sessions and applied techniques
- Blog posts, whitepapers, and presentations
- Durable pages such as About and Now

**Those four are index-scope names, not copy.** `work object` and `durable page` are
this contract's model vocabulary and must not be rendered to visitors — see
`OPEN-PRACTICE-ART-DIRECTION.md` §Copy and naming. The visitor-facing description of
the same scope names the things: projects, sessions, techniques, essays, and pages
about Nino.

Results are grouped by content type, show a result count per group, and preserve the
visitor's query. Photography may join the index when its runtime can provide stable
metadata.

Search never indexes private object details merely because a public Work card names
an internal system.

### Search scope must be labeled wherever a search box appears

The site carries a site-wide search plus a scoped search box on each collection —
`/work`, `/demos`, and `/blog` — and a fifth field inside the compact navigation
dialog. Five boxes with five different scopes and no scope labels means a visitor
who searched one collection, found nothing, and left never learns the site-wide
search would have found it.

- Every in-page search control names what it searches and how much of it: "Search
  the 26 work items", not "Search work".
- Every in-page search control offers a route to the site-wide search for the same
  query.
- The site-wide empty state offers example queries the visitor can click. It does
  not instruct the visitor in this contract's field names — "try a domain or state"
  asks them to know the data model before their first search.
- A result group larger than a screenful is capped with an explicit
  "show all N" control. A raw total with no ranking rationale reads as search
  failing open.

## Footer navigation

The footer repeats the six primary destinations and adds:

- Now
- Links
- Privacy
- GitHub
- LinkedIn
- Email

External destinations are labeled as external. Links do not force a new tab.

The footer is not a catch-all project directory; the Work library owns that job.

## URL and link rules

- Paths are lowercase nouns with hyphens where needed.
- Content type is represented by route ownership, not file extensions or technology.
- A link label names the visitor outcome: `View demo`, `Read essay`, `Open product`,
  `Read source`, or a verified install command.
- A Work object has at most one primary destination.
- External links receive an accessible external indicator.
- Internal navigation uses apex-relative URLs even when a router serves another
  runtime.
- Canonical tags, Open Graph URLs, sitemaps, and structured data use apex URLs.

## Redirect and migration plan

### Existing `/ai` routes

| Existing | Canonical |
|---|---|
| `/ai` | `/` |
| `/ai/work` | `/work` |
| `/ai/learn` | `/learn` |
| `/ai/learn/:track` | `/learn/:track` |

Track slugs remain unchanged. The redirects ship in the router at the same time as
the replacement routes.

### Demos

1. Inventory every current demo, applied technique, asset, and inbound URL.
2. Produce apex route parity under `/demos`.
3. Verify direct loads, relative assets, previous/next navigation, metadata, and
   responsive behavior for every entry.
4. Change canonical metadata and all first-party links to apex URLs.
5. Add permanent host-and-path-preserving redirects from
   `demos.ninochavez.co`.
6. Keep the old origin available behind the router until production receipts confirm
   that redirects and assets are healthy.

### Blog and photography

The current apex subpaths remain canonical. Their subdomains continue to redirect to
the matching apex paths. Runtime consolidation is optional; navigation and metadata
conformance are not.

### Sitemaps

The apex exposes one sitemap index that references the route-owning sitemap for:

- core pages, Work, Demos, and Learn;
- Blog;
- Photography.

No canonical URL appears twice under different hosts.

## Acceptance criteria for the IA prototype

Before production implementation, a route-complete click-through prototype must show:

- every global destination at desktop and mobile widths;
- active states for each top-level collection;
- the full unfiltered Work library plus filter and zero-result states;
- a Work detail with and without an external destination;
- the complete Demos index, one session, and one applied technique;
- Learn index and one track;
- global navigation on representative Blog and Photography pages;
- Search with grouped results and no results;
- mobile menu open, keyboard traversal, close, and focus return;
- redirect destinations for every retired `/ai` and demos URL class.

The prototype may use neutral styling. Art direction is a separate decision and begins
only after this structure is accepted.
