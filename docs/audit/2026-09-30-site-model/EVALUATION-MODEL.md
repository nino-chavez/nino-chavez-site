# A visitor should reach the work before having to understand the website

September 30, 2026. Evaluation model, not an approved design or implementation plan.

The current design is a candidate to evaluate, not a constraint. Nino explicitly permits a complete redesign and consideration of one codebase and shared stack. Useful content, honest claims, access controls, working actions and existing public links remain requirements. Their present layout, grouping, labels, typography, color and implementation may change.

## The owner's clarified purpose supplies the organizing idea

Nino describes photography as evidence of his photographic skill, writing as his AI-assisted thinking, and projects, work and demos as extensions showing how he builds and what he has built with AI. This is the owner's stated purpose, not an inferred audience preference or a claim that every existing item was made with AI.

Recommend **Writing, Building, Photography, About** as the public map to test. Writing holds the arguments; Building connects tangible work with its making and useful ways to apply it; Photography retains its own craft and archive. Projects, demonstrations and guides earn space inside Building when they supply a useful object or task. Their present source types do not each earn a peer navigation entry. Keep direct article, project and album arrivals immediate.

The scope also includes `apps.ninochavez.co`, omitted from the initial inventory and added after Nino called it out. Its catalog and product/download pages serve people choosing or installing Cutting Board and Yawn. Include these pages in the public-frontend consolidation. Their app binaries and release processes remain separate. An Apps collection is a prominent entry within Building; the subdomain does not by itself require another global navigation section.

Nino also operates The Rotation at `therotation.tv` and Minder: Your Day, publicly listed on the App Store with its own site at `mindyourday.app`. Building must show products he operates as well as how he makes things. Lead that section with useful products and direct actions; place methods, experiments and guides after them. Keep availability, platform, product kind and Nino's role as separate facts. An internal alpha must not inherit a released product's status merely by sharing a collection.

The personal site connects this body of work. A product's working interface has its own audience and navigation: volleyball discovery for The Rotation, day planning for Minder. Include their representation and onward journeys in this evaluation without assuming their operational interfaces or native code belong in the portfolio's frontend migration.

Work Library adds two distinct objects: the publication/handoff tool Nino builds, and the public studies, methods and technical arguments it publishes at `library.ninochavez.co`. Give the tool one Building record with a truthful description and a link to its public output. Classify each publication by its reader's job: an argument or research piece can appear in Writing; an applied study, method or project document can appear with relevant Building material. A publication keeps one canonical destination when surfaced in both. The source repository does not determine a global navigation category.

## Start with what a person came to do

Nino reports sharing writing through LinkedIn crossposts and photo galleries through social posts. That is direct evidence about how he distributes links. It does not tell us every visitor's identity or motivation. A person arriving at an article or album has already chosen a destination; the site should honor that choice.

| Arrival | Immediate job | What the page must establish | A useful next step | What would fail |
|---|---|---|---|---|
| LinkedIn → article | Read the promised piece | Matching title, author, readable opening, relevant context | Continue the series, save/read another piece, inspect the author if interested | A portfolio pitch or publication directory before the article |
| Social post → album/photo | Recognize the event and find a photograph | Correct event, date, visible images and understandable actions | View, save, download, share or return to the same place | A presentation cover that delays the collection; losing position on Back |
| Name/search/referral → home | Understand who Nino is and whether to explore | A recognizable person, a concrete account of the work, convincing real material | Choose a relevant project, writing, photography or biography | An exhaustive directory, unexplained categories, or a generic professional template |
| Project link → project | Judge a particular piece of work | What it does, who it serves, Nino's role, real evidence, honest availability | Open/use it, inspect evidence or contact Nino | Only an abstract description, inflated proof or a dead destination |
| App referral → product/download page | Decide whether to try it and obtain the right build | Actual purpose, platform requirements, current release status and correct download | Install, check release notes or resolve a problem | A build story before the download; stale version/checksum; alpha presented as a finished release |
| Returning product user → product | Use the product or obtain help | Familiar product identity, direct access to the working interface or owned help | Find a match in The Rotation; reach Minder's store, guide or support page | Detour through the personal portfolio, unrelated global navigation or broken support/privacy links |
| Public study link → publication | Understand and assess a technical argument or reuse a method | Title, reader question, answer, material limits and readable evidence | Inspect sources, apply the method or follow related work | Private-access instructions, internal taxonomy or repeated publication mechanics before the argument |
| Practical question → teaching material | Learn or reuse something specific | Output, prerequisites, example and first useful step | Try the technique or follow a sequence | Choosing an identity such as “Explorer” before knowing the result |
| Returning visitor → archive/search | Recover a remembered item | Search scope, recognizable results, stable state | Reopen the item and return to results | Relearning a taxonomy or searching a different collection unknowingly |

Reading and looking can be successful outcomes. Do not force every page into a sales funnel or use a click as proof of understanding. Employer, client, athlete, parent and fan remain possible audiences, not identified analytics segments.

## Separate the things from the ways of finding them

The underlying objects are a person, projects, articles, sessions, techniques, learning sequences, albums, photographs and collections. An archive, search result, topic, date grouping and homepage are ways of finding those objects. A format, subject, audience and publication state are different fields.

A project may link to a session showing how it was made and an article discussing a decision. That relationship is more useful than putting all three into identical cards and calling them “work.” An album contains photographs; a date view and collection offer other paths to the same photographs. They should not create competing photo identities or destinations.

Public URL ownership, content ownership, visual ownership and deployment ownership must each be explicit. They need not have the same boundaries.

## Navigation has three jobs, with different prominence

1. **Site identity and switching:** whose work is this, where am I, and how can I reach another part?
2. **Local discovery:** browse this collection, search it, change topic/date, or resume a sequence.
3. **Object actions:** read, play, view, save, download, share, open a product, or return to results.

The current task should have the strongest controls. A global link is not automatically entitled to the same visual weight on an album as on the homepage. A small owner link can provide continuity without repeating an entire portfolio menu above every image or essay.

A navigation item earns a place if people can predict its destination, it answers a distinct recurring job, and it is more useful at that level than within its parent or search. A page earns a URL if it supplies a distinct object, decision, useful collection, durable reference or recoverable state. Neither a repository nor a generated content type earns a navigation slot by itself.

## Three structures to compare on the same journeys

These are architecture candidates, not three visual treatments of the current layout. Route examples describe navigation placement, not a mandate to rename public URLs.

### A. A personal home with distinct sections

```text
Nino Chavez / Home
├─ Work
│  ├─ Selected projects → project → use it / evidence
│  ├─ All projects
│  └─ How it was made → sessions / techniques / learning paths
├─ Writing / Signal Dispatch
│  ├─ Publication → article
│  └─ Topics / series / archive / scoped search
├─ Photography
│  ├─ Events → album → photograph
│  ├─ By date / collections / saved / scoped search
│  └─ Coverage information and request
└─ About → now / CV / contact / links
Utility: site search, privacy, analytics preferences
```

Strength: distinct material has predictable homes, while the person connects them. Risk: teaching becomes harder to discover if hidden too deeply under Work. Test an explicit teaching route from relevant project/article pages and search before removing a global Learn link. A light owner bar and strong local navigation can keep the writing and photo experiences focused.

### B. One collection, organized around objects and relationships

```text
Nino Chavez / Home
├─ Explore
│  ├─ Projects / writing / sessions / photographs
│  ├─ Search and filters by subject and type
│  └─ Each object → related objects / useful action
├─ Selected collections / guided sequences
└─ About / contact
```

Strength: cross-disciplinary relationships are discoverable and repeated index pages disappear. Risk: an enormous photo corpus can swamp a small project library; each visit starts with a classification decision. An article, a product and an event album still need different presentation and actions. One library must not mean one universal card or detail template.

### C. Independent destinations with a small shared identity

```text
Nino Chavez / personal introduction and property switcher
├─ Portfolio → projects / process / biography
├─ Signal Dispatch → publication's own navigation
└─ Photography → gallery's own navigation
Every destination: clear “by Nino Chavez” / return path
Contextual links connect relevant work across destinations
```

Strength: direct referrals receive a focused publication or gallery with its own character. Risk: cross-property discovery and author recognition weaken if the common identity becomes too subtle. Duplicate About pages, search, menus and privacy controls need explicit ownership. Separate visitor destinations do not require separate domains or repositories.

### Compare rather than vote

Walk each candidate through the same tasks in the arrival table. Record where a visitor must guess a label, change context, pass a redundant introduction or lose their place. Keep the competing models available until one can explain both the direct referrals and the cold homepage arrival. Do not pick by preference for the prettiest diagram or fewest links.

## Page hierarchy follows the mode

| Page family | First encounter | Body | End / continuation |
|---|---|---|---|
| Home: identity and exploration | Distinct personal visual moment + identity + concise meaning | Real selected material, then breadth if useful | Contact/about and deeper exploration |
| Index: discovery | Clear scope + first useful items + retrieval where needed | Collection, optional filters, honest availability | More results, clear state and recovery |
| Project: evaluation | Real artifact + what it does + Nino's role + truthful action | Problem, decisions, proof, limits | Use it, related evidence or contact |
| App: evaluation and installation | Purpose + real product + release status + platform/action | Useful demonstration, requirements, download and install information | Release notes, product-owned support information if available, related making/writing |
| Article: reading | Title + author/context + opening within a reasonable reading start | The piece, optional contents, useful figures | Series continuation or deliberately chosen related reading |
| Album: retrieval and viewing | Event identity + photographs + relevant retrieval/actions | Images, useful grouping, position continuity | Related event or collection |
| Photograph: experience | The image at a useful size with its integrity preserved | Context and actions placed near the object | Previous/next and return to the same album position |
| Learning path: doing | Concrete output + starting conditions + first step | Ordered stages and real examples | Usable result and next relevant practice |
| Public study: assessment or reuse | Reader question + answer + essential status/limits | Analysis, method, diagrams and supporting evidence | Sources/provenance, application or related work |
| Utility: completion | Clear purpose and required action/information | Only what helps complete or understand it | Confirmation or safe return |

A full-bleed image may earn the homepage's largest area because it creates identity and emotional engagement. The same treatment can obstruct an album where people came for a collection. “No unnecessary hero” is not a global ban on photographic drama.

## Every element must justify its attention cost

For every section, control, image and navigation item, record:

- **Job:** what visitor question or action does it serve here?
- **Evidence:** what fact, object, context or feeling does it contribute?
- **Priority:** does its size and position match that contribution?
- **Relationship:** is its grouping and destination understandable?
- **Removal test:** what becomes harder or poorer if it disappears?
- **Verdict:** retain, combine, move, replace, remove, or test; name why.

Emotional impact, atmosphere and authorship are legitimate contributions. An image does not need to prove a software claim to earn its place. Conversely, calling something “brand” does not exempt a muddy crop or generic decoration from judgment.

## Score each dimension separately; do not average away a failure

Use **fails / uncertain / works / distinctive** with a visible observation. These are reviewer judgments, not measured user outcomes. Record **not observed** separately from a failure.

| Dimension | Evaluation question | Evidence that can answer it |
|---|---|---|
| Job fit | Can the visitor begin what brought them here? | Cold arrival and observed task walk |
| Information scent | Can they predict what a label or link opens? | First-click prediction and destination check |
| Hierarchy | Is the important material visually dominant? | Desktop and phone first viewport, then whole-page sequence |
| Grouping | Do related things look related and different things look different? | Proximity, similarity, common region, continuity and figure-ground analysis |
| Identity | Does this feel like Nino's work, with credible property differences? | Unprompted comparison across actual pages |
| Delight | Is there a memorable, fitting visual or interaction moment? | Real material, crop, pacing and feedback; ask what the viewer recalls |
| Continuity | Can people move, return and resume without surprise? | Back, deep links, filters, scroll position and cross-property navigation |
| Inclusion | Can people see, read, focus and operate the page? | Accessibility tree, contrast, keyboard and device behavior |
| Integrity | Are content, claims, privacy and actions trustworthy? | Source, delivered output, access control and consent behavior |

Failure of the primary job, essential readability, working actions or public-link continuity blocks acceptance. A loss of the chosen visual identity also blocks acceptance even when functional checks pass. A low click count does not compensate for a lifeless page.

For the homepage specifically, require one unmistakable authored visual moment. A generic product thumbnail, a large name or a tidy directory does not satisfy that requirement by itself. Compare the first frame with the earlier full-bleed photograph and ask what becomes more memorable, not only what becomes easier to scan.

## Use Gestalt as an explanation, not a styling recipe

- **Proximity:** group a label, its value and its action; separate unrelated choices. Large empty space is not automatically clear hierarchy.
- **Similarity:** use matching treatments for comparable actions. Avoid presenting a product, essay and photo as interchangeable just to unify the site.
- **Common region:** a shared area can signal a collection; too many bordered containers fragment a composition.
- **Continuity:** maintain a reading or browsing path. Navigation that changes position or meaning across properties interrupts it.
- **Figure-ground:** the work must stand out against its support. A global header must not become the brightest competing object above a photograph.

These applications are design inferences, grounded in the observed frames. Background: [proximity](https://www.nngroup.com/articles/gestalt-proximity/) and [similarity](https://www.nngroup.com/articles/gestalt-similarity/).

## Consolidate the public application; prove the framework choice

The recommended target is one frontend for the personal site, writing, photography and integrated app catalog/product pages, with one owned navigation system, component system, route map, metadata policy, search model and consent behavior. This is not a mandate to replatform every product Nino operates. The observed duplicated personal-site shell implementations and separate previews justify consolidation within that boundary. A monorepo containing those three independent frontends would improve coordination but would not complete it. One repository, one framework, one runtime and one deployment remain separate decisions.

Migrate in verified slices. First prove a real rich article and an album with server-backed pagination, keyboard viewing, saved state, downloads and a private-share variant. Choose the framework against those behaviors, authoring requirements and delivery performance. Then consolidate the shared shell, publication, public gallery discovery and sensitive gallery flows. No framework is selected by this recommendation, and no migration has begun.

Specialist services may remain separate: publication authoring, photo ingestion/enrichment, media delivery, database/access enforcement and streamed ZIP downloads. The portfolio's project pages do not imply merging products such as Rally HQ into this application. Shared implementation must still support different reading, looking and doing experiences.

Product marketing/download pages at `apps.ninochavez.co` also belong in the shared frontend target. Preserve `/cutting-board/*` and `/yawn/*` compatibility during migration. Descriptions should derive from one product record; versions, platform availability, checksums and download URLs must come from the owning release process. The existing Yawn catalog feed is a starting pattern to inspect, not a reason to copy mutable release values into portfolio content. The observed catalog has `noindex, nofollow` and Yawn has `noindex`; preserve indexing policy until a deliberate publication decision changes it. Unlisted and confidential are different states.

Preserve `therotation.tv` as a direct product destination and `mindyourday.app` as Minder's product/guide/support destination, including the URLs referenced by its App Store listing. A short product record on ninochavez.co can point to those destinations and related build stories without duplicating their full marketing pages. Their web components or metadata could share implementation later if a concrete maintenance benefit justifies it. Moving The Rotation's functional UI, its data-refresh operation or Minder's native app is outside the currently justified consolidation.

Work Library's public discovery and reading surfaces are candidates for integration with this frontend. Its current React/VineNext stack shares the personal site's framework family, but that does not establish migration safety. Keep publication admission, exact source version, original claims, audience/lifecycle metadata, private handoffs and access enforcement owned by Work Library. A shared public reader/search must consume only explicitly admitted public material and public-safe metadata/assets; hiding private records in the UI is not a publication boundary. Preserve existing library links and one canonical copy of each publication. The local product contract already separates public publications, private handoffs and the owner archive; a combined public experience must respect those distinctions.

No architecture earns an SEO claim merely by sharing a codebase. Preserve crawlable content, public URL meaning, internal links and canonical/redirect behavior. Google describes ranking as primarily page-level with some site-wide signals; one domain is not proof that sports-photo traffic improves software-query rankings. [Ranking systems](https://developers.google.com/search/docs/appearance/ranking-systems-guide). If URLs change, use an explicit mapping and migration checks. [Site moves](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## What would change the recommendation

Real visitors consistently finding Sessions/Learn correctly would argue for retaining their prominence. Readers using the publication independently would strengthen model C. Successful cross-type discovery without photo overload would strengthen model B. If visitors cannot predict where practical guides live under Building, expose them more clearly or reconsider the label. If the representative application trial cannot preserve publication and gallery behavior at reasonable cost, retain specialist frontends behind an explicitly owned shared contract instead. A failed trial must be allowed to change the technical recommendation.

The next visual design phase must develop three divergent whole-screen concepts on the same real home, article, album and project states. Those are still to be designed; the navigation candidates above are not substitutes for them. Compare against both the earlier full-bleed homepage and the rejected current refit, then explicitly record which useful ideas are taken from rejected candidates.

## Updated recommendation: make thinking, making and photography legible

The initial challenge correctly rejected hiding teaching beneath an unexplained Work label. The owner's subsequent clarification gives Building a more specific purpose: completed work, how it was made, and ways to apply what was learned. This supersedes the earlier five-item recommendation of Projects, Writing, Photography, Learn and About. The new labels remain a recommendation to test, not approved interface copy.

```text
Nino Chavez / Home — person, visual identity and selected material
├─ Writing — ideas, arguments, articles and series
├─ Building
│  ├─ Products I run — useful apps/services and direct actions
│  ├─ Tools and experiments — useful work with honest availability
│  ├─ Studies and methods — applied analysis and reusable technical work
│  ├─ How it was built — sessions, demonstrations and decisions
│  └─ Guides — practical paths with an output and first step
├─ Photography — events, albums, photographs and retrieval
└─ About — biography, now, CV and contact
```

The existing Learn paths contain stages, checkpoints and outputs in `app/data.ts` and `app/learn/[track]/page.tsx`. Preserve that substance and make guides visible from Building, relevant projects, articles and search. Do not reduce them to a link collection or keep a separate school-like entrance solely because its template already exists.

One existing Builder stage groups Rally HQ, “The Browser Is a Shell Command” and “The Scaffolding the Agent Doesn't Build” (`app/data.ts`, Builder path). It demonstrates a useful connection between an artifact, a technique and an argument. It does not prove that the session built that product or the essay caused it. Related links require that distinction. Articles retain one canonical home even when surfaced in a guide or project.

Projects and tools need an honest role, availability and provenance. Do not relabel older professional work as AI-built without source evidence. Demonstrations belong as primary objects only when independently useful; otherwise place them with the project or technique they explain.

Candidate B must receive a fair test: a shared collection does not inherently force a referred reader through Explore. Direct object URLs can still open immediately. Its actual risks are mixed-result relevance, confusing browse categories and uniform presentation, not an unavoidable extra click. C likewise can have a vivid, useful homepage; a property switcher does not inherently have to be a directory.

The complete judgment, architecture options, provenance and next design gate are in [RED-TEAM-ASSESSMENT.md](RED-TEAM-ASSESSMENT.md).
