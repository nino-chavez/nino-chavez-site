# Page purpose audit

Reviewed 31 July 2026 against the current local production build at desktop and
390 px mobile width. This review asks one question of every public page type:
what should a first-time visitor see, know, and do here?

The site shares a shell and a design language. It does not force unlike visitor
jobs into one page template.

| Route or template | Visitor job | See and know | Primary action | Result |
|---|---|---|---|---|
| `/` | Understand who Nino is and whether the practice produces real work | Identity, operating claim, one live product, and three unlike public proof forms | Enter the complete Work library | Revised. Removed the duplicate current-work shelf; current attention now lives on Now. |
| `/work` | Understand the range, then find a specific record | Six domains, 32 honestly labeled records, state, form, and availability | Browse a domain or search and filter all records | Pass. The atlas orients before the registry asks for input. |
| `/work/:slug` | Decide what is real and what can be inspected now | State meaning, available evidence, current limit, and related work | Open the nearest honest public artifact | Revised. The first panel now explains state instead of repeating the project claim. |
| `/demos` | Choose between watching work unfold and reusing one technique | Sessions preserve sequence; techniques preserve reuse | Open a complete session or a reusable technique | Revised. The page now names its relationship to Demos in the opening label. |
| `/demos/:slug` | Step through one complete operating session | Native chapters, source artifacts, decisions, failures, and corrections | Move through the chapters or skip to the record | Pass. The content is native and functional, not an iframe or static screenshot. |
| `/demos/applied/:slug` | Learn one reusable move without replaying a whole session | The technique, its sequence, proof, limits, and source sessions | Apply the sequence or inspect its source session | Pass. |
| `/learn` | Choose a path by the artifact the visitor needs to make | Seven outcomes, start conditions, and finished artifacts | Open the path that matches the intended output | Pass. |
| `/learn/:track` | Decide whether a path fits, then begin it | Evidence, fit and non-fit conditions, stages, and checkpoints | Go to the first stage | Revised. C4 and arc42 are defined at first use in the Architect path. |
| `/blog` | Find a published argument or browse the complete publication | Current volume, series, formats, subjects, years, and latest publication date | Search, filter, or open an article | Pass. The live index includes the latest published content. |
| Article pages | Read one piece with enough context to decide whether to continue | Title, excerpt, author, publication context, and contents | Read the article or use its section index | Pass on the production article template. |
| `/photography` | Find a frame or enter the archive visually | Full-bleed work, archive scope, search, and five browsing modes | Search by team, event, or number; or browse events | Revised. The mobile search prompt is shorter and remains legible. |
| Photography archive routes | Browse by query, event, time, collection, or saved frame | The active browsing model and its result set | Open a frame or change the browsing model | Pass for Explore, Albums, Timeline, Collections, and Favorites. Gallery-card taxonomy now uses the owning app's reader-facing formatter. |
| `/about` | Understand the person and what connects the different domains | Background, operating model, selected contexts, and public destinations | Enter the context most relevant to the visitor | Pass. |
| `/now` | See current attention without mistaking it for a complete portfolio | Dated active work, current state, and nearest public evidence | Open the evidence attached to an active item | Revised. The opening now explains what every entry supplies. |
| `/links` | Go directly to a maintained destination | Products, publishing, media, profiles, and direct contact | Open the named destination | Pass. It remains a route directory, not a duplicate Work library. |
| `/privacy` | Understand what the site and gallery record | Short version, scope, six indexed sections, and third-party policies | Jump to a section or open the named policy | Pass. |
| `/search` | Search across otherwise different collections | Search scope, one input, result type, and destination | Enter a project, topic, or page | Revised. Internal wording was replaced with reader-facing language. |
| Unknown route | Recover from a bad or retired URL | Clear not-found state and valid routes back into the site | Return home, search, or enter a primary collection | Pass under the existing regression suite. |

## Mobile acceptance

The routes above were checked at a 390 by 844 px viewport. No tested page
produced document-level horizontal overflow, clipped action text, or a missing
primary action. Demos and Photography intentionally use contained horizontal
collections; their scroll regions do not widen the document. Long code and
diagram surfaces inside demo stories likewise keep overflow local to the
artifact.

## Public-proof decision

Photography and Signal Dispatch belong in the homepage proof set because a
visitor can inspect maintained public work at the destination. Film Room stays
visible in Now and Work as building, but does not enter the proof set until a
public destination exposes a real artifact or working surface.

## Owning-app correction

The production photography gallery could expose stored taxonomy such as
`cross_country` without converting it to reader-facing text. The gallery card
now uses the photography app's existing metadata formatter, so the public label
reads “Cross Country” while the stored value remains unchanged.
