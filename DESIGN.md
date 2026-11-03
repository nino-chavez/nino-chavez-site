---
name: Nino Chavez — Personal profile
colors:
  ground: "#F1EDE4"
  text: "#233343"
  muted: "#566273"
  rule: "#CDBBB0"
  action: "#244CC2"
  surface-muted: "#E5EAF4"
typography:
  reading: 'Inter, system-ui, sans-serif'
  headings: '"Studio Display", "Schibsted Grotesk", Inter, system-ui, sans-serif'
  controls: 'Inter, system-ui, sans-serif'
spacing:
  content: "1160px"
  desktop-gutter: "20px"
  phone-gutter: "20px"
---

# Personal profile

Nino selected the Studio home on November 3. [ADR 0007](docs/decisions/0007-profile-studio.md) records the decision. Studio is the home composition only; inner profile routes retain their existing composition. Writing and Photography remain independent specialist applications.

## Reader and purpose

Visitors arrive from a referral, search result, or a project link. They need
to understand who Nino is, inspect his work, and find a way to contact him.
They do not need prior knowledge of the site's structure. Keep project names,
authored statements, availability, contact details and canonical destinations.

## Character

Studio is personal, artful and direct: a refined cobalt identity rail beside a
porcelain canvas. The rail makes the routes and contact action immediate; the
main stream gives photography, writing, work and biography their own rhythm.
Use ink headings and natural media. The pale-blue writing field marks a change
of medium without making another page template. Email actions use contrasting fills: porcelain on the cobalt rail, cobalt on the canvas.
Inner routes remain readable, practical Work in view pages rather than being
restyled as Studio.

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

`app/profile.css` owns the shared profile tokens and inner-route scope.
`app/studio.css` scopes Studio's home-only composition to `#studio`.
`app/globals.css` retains the existing component contracts for inner routes.

Interior rules use the `profile-site` and `#main` scope so route styles loaded
during navigation cannot restore the previous theme. Media grid cells need
`min-width: 0`; the Sessions feature resets the old image aspect ratio so its
preview cannot cover the title. These are rendered regressions covered by the
profile navigation tests. Capture the collection after its records appear,
not while the Suspense fallback is visible.

Studio uses Porcelain `#F1EDE4`, cobalt `#244CC2`, and text `#233343`.
Body copy is Inter; the Studio Body and Studio Display aliases keep the home’s
type roles local. Desktop home has the cobalt identity rail, `.identity-heading`
home link, and main stream. On mobile the rail becomes the Studio header while
retaining Work, Writing, Photography, About and Email. Links are underlined;
controls retain visible focus and native semantics.

Home shows photography, writing, three real project previews, then a short
biography. Preserve authored copy, facts and existing media. Specialist links
open in a new tab. The project links are separate destinations and retain their
own tab behavior. Inner routes keep their existing header and footer.

Long text gets a full reading column. Biography facts may sit beside prose
on desktop and stack below it on phones. Project imagery and embedded
sessions retain their native appearance inside the profile page.

## States and journeys

| Object | Action | States to check |
| --- | --- | --- |
| Studio home | Read, follow a destination, return home | Desktop rail; narrow mobile header; natural media |
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
separates the Studio home shell from the inner shell and checks desktop/phone
captures, no horizontal overflow, image loads and browser Back.
