---
name: Nino Chavez — Personal profile
colors:
  ground: "#07070F"
  text: "#F2F2EE"
  muted: "#A8A8B3"
  rule: "#2C2C38"
  action: "#8FCBEA"
  surface-muted: "#14141F"
typography:
  reading: 'Inter, system-ui, sans-serif'
  display: 'Anton, Impact, sans-serif'
  headings: '"Schibsted Grotesk", Inter, system-ui, sans-serif'
  controls: 'Inter, system-ui, sans-serif'
spacing:
  content: "1160px"
  desktop-gutter: "20px"
  phone-gutter: "20px"
---

# Personal profile

Nino selected Masthead with the Arena palette on November 4. [ADR 0008](docs/decisions/0008-profile-masthead-arena.md) records the decision. Masthead is the composition of home and `/work`; other profile routes keep their composition and take Arena through shared tokens. Writing and Photography remain independent specialist applications.

## Reader and purpose

Visitors arrive from a referral, search result, or a project link. They need
to understand who Nino is, inspect his work, and find a way to contact him.
They do not need prior knowledge of the site's structure. Keep project names,
authored statements, availability, contact details and canonical destinations.

## Character

Masthead is large, physical and plain-spoken: the name fills the width, a photograph sits beside the statement, and each project takes a full-width section with its name at display size. Arena keeps one ground from top to bottom. Photographs and product screens supply the color; the ice-blue action color marks what can be acted on and the closing line.

Do not give sections their own color. Nino rejected that because it competes with the photographs and product screens.

## Surfaces

| Surface | Routes | Preserve |
| --- | --- | --- |
| Personal pages | `/`, `/about`, `/now`, `/links`, `/cv` | Biography, authored claims, profile links, CV print behavior |
| Work | `/work`, query-filtered catalogue, `/work/:slug` | Search, filters, availability, media and destinations |
| Sessions | `/demos`, `/demos/:slug`, `/demos/applied/:slug` | Library controls, session navigation, embedded evidence |
| Guides | `/learn`, `/learn/:track` | Guide order, steps and linked examples |
| Utilities | `/search`, `/privacy`, missing routes | Search results, empty state, policy, recovery links |
| Coverage inquiry | `/photography/coverage` | Offer, gallery examples, validation, inquiry behavior |
| Specialist destinations | `/blog/**`, gallery-owned `/photography/**` | Their independent applications, styles and navigation |

The profile app's retired writing/gallery facades are not the public
specialist entrances. Routing remains owned by the apex router.

## Shared system

`app/profile.css` owns the shared Arena tokens and inner-route scope.
`app/masthead.css` owns the Masthead composition of home (`#masthead`) and `/work`.
`app/globals.css` retains the existing component contracts for inner routes.

Interior rules use the `profile-site` and `#main` scope so route styles loaded
during navigation cannot restore the previous theme. Media grid cells need
`min-width: 0`; the Sessions feature resets the old image aspect ratio so its
preview cannot cover the title. These are rendered regressions covered by the
profile navigation tests. Capture the collection after its records appear,
not while the Suspense fallback is visible.

Masthead uses arena black `#07070F`, text `#F2F2EE` and action `#8FCBEA`.
Display type is Anton, at scale in uppercase on home and `/work`, and in sentence case on other routes' `h1`. Reading text is Inter. Other headings use Schibsted Grotesk.
Home has the primary navigation, the full-width name, the statement with linked phrases, the photograph, Writing, three real project previews, a short biography and the closing "Get in touch". Phones keep Work, Writing, Photography, About and Email. Links are underlined at rest except display-size names, which underline on hover; controls retain visible focus and native semantics.
Preserve authored copy, facts and existing media. Specialist links open in a new tab, and so do the statement's Let's Pepper and SoundCloud links. The project links are separate destinations and retain their own tab behavior. Inner routes keep their existing header and footer.

Long text gets a full reading column. Biography facts may sit beside prose
on desktop and stack below it on phones. Project imagery and embedded
sessions retain their native appearance inside the profile page.

## States and journeys

| Object | Action | States to check |
| --- | --- | --- |
| Masthead home | Read, follow a destination, return home | Full-width name; phone stack; natural media |
| Inner profile route | Read, search, filter or follow a destination | Existing header/footer and route-specific composition |
| Library | Search, filter, open an item | Populated, filtered, no results, browser Back |
| Detail | Read evidence, follow destination, return | Long titles, private/unavailable destinations, missing slug |
| Inquiry | Read offer, fill fields | Initial form, required-field errors; no live test submission |
| Cross-site link | Open publication or gallery in a new tab | Native link with `target="_blank"` and `rel="noopener noreferrer"`; each site keeps its own style and navigation |

Writing and photography are separate sites even though they share the
`ninochavez.co` domain. Profile links to `/blog/**` and gallery-owned
`/photography/**` destinations open in new tabs. The profile-owned coverage
inquiry at `/photography/coverage` stays in the current tab.

Keep existing query parameters, breadcrumbs and return links. Verification
separates the Masthead home shell from the inner shell and checks desktop/phone
captures, no horizontal overflow, image loads and browser Back.
