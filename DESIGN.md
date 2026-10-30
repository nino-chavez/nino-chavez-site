---
name: Nino Chavez — Personal profile
colors:
  ground: "#fffdf9"
  text: "#24211e"
  muted: "#635b54"
  rule: "#d9d2c8"
  action: "#684c3b"
  surface-muted: "#f3eee6"
typography:
  reading: '"Open Practice Body", Inter, system-ui, sans-serif'
  headings: '"Schibsted Grotesk", Inter, system-ui, sans-serif'
  controls: '"Open Practice Body", Inter, system-ui, sans-serif'
spacing:
  content: "1160px"
  desktop-gutter: "20px"
  phone-gutter: "20px"
---

# Personal profile

Nino selected **C — Work in view** on October 30 after finding the prior profile difficult to follow and read. [ADR 0006](docs/decisions/0006-profile-work-in-view.md) records the selection and the pieces retained from the alternatives. The [three-direction comparison](docs/design/concepts/profile-20261030/BRIEF.md) remains the visual reference. This direction applies to every profile route; the publication and gallery remain independent.

## Reader and purpose

Visitors arrive from a referral, search result, or a project link. They need
to understand who Nino is, inspect his work, and find a way to contact him.
They do not need prior knowledge of the site's structure. Keep project names,
authored statements, availability, contact details and canonical destinations.

## Character

Personal, readable, unhurried, direct and practical. Avoid oversized poster
headings, dark editorial entrances, monospaced navigation, narrow prose
columns and unrelated page themes. The homepage's density is the reference:
one clear heading, readable paragraphs, ordinary links, thin warm rules.
Library controls may be denser because people are searching and comparing.

## Surfaces

| Surface | Routes | Preserve |
| --- | --- | --- |
| Personal pages | `/`, `/about`, `/now`, `/links`, `/cv` | Biography, authored claims, profile links, CV print behavior |
| Projects | `/work`, query-filtered catalogue, `/work/:slug` | Search, filters, availability, media and destinations |
| Sessions | `/demos`, `/demos/:slug`, `/demos/applied/:slug` | Library controls, session navigation, embedded evidence |
| Guides | `/learn`, `/learn/:track` | Guide order, steps and linked examples |
| Utilities | `/search`, `/privacy`, missing routes | Search results, empty state, policy, recovery links |
| Coverage inquiry | `/photography/coverage` | Offer, gallery examples, validation, inquiry behavior |
| Specialist destinations | `/blog/**`, gallery-owned `/photography/**` | Their independent applications, styles and navigation |

The profile app's retired writing/gallery facades are not the public
specialist entrances. Routing remains owned by the apex router.

## Shared system

`app/profile.css` owns profile tokens and the `profile-site` scope.
`app/globals.css` retains the existing component contracts. Home and directory composition also live in `app/profile.css`. Route CSS supplies controls and media framing; the profile layer
normalizes the enclosing layouts, headings, spacing and reading widths.

Interior rules use the `profile-site` and `#main` scope so route styles loaded
during navigation cannot restore the previous theme. Media grid cells need
`min-width: 0`; the Sessions feature resets the old image aspect ratio so its
preview cannot cover the title. These are rendered regressions covered by the
profile navigation tests. Capture the collection after its records appear,
not while the Suspense fallback is visible.

The shell aligns with the 1160px header and footer. Schibsted Grotesk carries headings; the existing Inter-backed face carries prose, inputs, filters and compact metadata. Headings use sentence case and a clear semibold weight. Body text is 17–18px; descriptions stay next to their linked names. Long prose stays within a comfortable reading measure.
Links use underlines; controls retain visible focus and native semantics.
Portraits use the approved photograph from the homepage.

Home shows a compact personal introduction, immediate writing and photography links, then three real project previews. The directory uses two groups across on desktop and a single reading column on phones. Keep names and descriptions together; do not restore the old distant action column.

Long text gets a full reading column. Biography facts may sit beside prose
on desktop and stack below it on phones. Project imagery and embedded
sessions retain their native appearance inside the profile page.

## States and journeys

| Object | Action | States to check |
| --- | --- | --- |
| Profile | Read, follow a destination, return home | Desktop and narrow phone; long prose |
| Library | Search, filter, open an item | Populated, filtered, no results, browser Back |
| Detail | Read evidence, follow destination, return | Long titles, private/unavailable destinations, missing slug |
| Inquiry | Read offer, fill fields | Initial form, required-field errors; no live test submission |
| Cross-site link | Open publication or gallery in a new tab | Native link with `target="_blank"` and `rel="noopener noreferrer"`; each site keeps its own style and navigation |

Writing and photography are separate sites even though they share the
`ninochavez.co` domain. Profile links to `/blog/**` and gallery-owned
`/photography/**` destinations open in new tabs. The profile-owned coverage
inquiry at `/photography/coverage` stays in the current tab.

Keep existing anchors, query parameters, breadcrumbs and return links.
No new animation or scrolling behavior is introduced. Verification uses
rendered desktop and phone captures plus the project's navigation suite.
