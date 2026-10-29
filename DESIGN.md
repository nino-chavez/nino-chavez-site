---
name: Nino Chavez — Personal profile
colors:
  ground: "#fffdf9"
  text: "#24211e"
  muted: "#765d50"
  rule: "#d9d2c8"
  action: "#684c3b"
  surface-muted: "#f3eee6"
typography:
  reading: 'Georgia, "Times New Roman", serif'
  controls: '"Open Practice Body", Inter, system-ui, sans-serif'
spacing:
  content: "820px"
  desktop-gutter: "20px"
  phone-gutter: "16px"
---

# Personal profile

The homepage selected October 26 is the visual reference for every profile
page. Nino extended that direction to the interiors on October 29.
[ADR 0005](docs/decisions/0005-profile-a-personal-home.md) records both decisions.
This is a refit within that direction; the previous In the Field treatment is
retained in Git history and is no longer loaded by the profile shell.

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
`app/globals.css` retains the homepage composition and the existing component
contracts. Route CSS supplies controls and media framing; the profile layer
normalizes the enclosing layouts, headings, spacing and reading widths.

Interior rules use the `profile-site` and `#main` scope so route styles loaded
during navigation cannot restore the previous theme. Media grid cells need
`min-width: 0`; the Sessions feature resets the old image aspect ratio so its
preview cannot cover the title. These are rendered regressions covered by the
profile navigation tests. Capture the collection after its records appear,
not while the Suspense fallback is visible.

All profile content aligns with the 820px header and footer. Georgia carries
headings and prose. The existing Inter-backed face carries inputs, filters
and compact metadata. Headings use normal weight and sentence case.
Links use underlines; controls retain visible focus and native semantics.
Portraits use the approved photograph from the homepage.

Long text gets a full reading column. Biography facts may sit beside prose
on desktop and stack below it on phones. Project imagery and embedded
sessions retain their native appearance inside the profile page.

## States and journeys

| Object | Action | States to check |
| --- | --- | --- |
| Profile | Read, follow a section, return home | Desktop and narrow phone; long prose |
| Library | Search, filter, open an item | Populated, filtered, no results, browser Back |
| Detail | Read evidence, follow destination, return | Long titles, private/unavailable destinations, missing slug |
| Inquiry | Read offer, fill fields | Initial form, required-field errors; no live test submission |
| Cross-site link | Open publication or gallery | Full navigation; specialist chrome remains independent |

Keep existing anchors, query parameters, breadcrumbs and return links.
No new animation or scrolling behavior is introduced. Verification uses
rendered desktop and phone captures plus the project's navigation suite.
