# ADR 0007: Use Studio for the profile home

- **Date:** 2026-11-03
- **Status:** Approved — ship it
- **Scope:** profile home (`/`)
- **Supersedes:** the home composition in [ADR 0006](0006-profile-work-in-view.md)

## Decision

Nino selected Studio for the profile home after reviewing the Studio direction
and its `porcelain-refined` palette. The comparison reference is commit
`3604c0e25d143ed6d6211e1c9810a96ef9e143d9` and [draft PR 65](https://github.com/nino-chavez/nino-chavez-site/pull/65). The approved
reference is `public/__profile_review/rethink/studio.html` with
`studio-palettes.css` set to `porcelain-refined`; review controls are not part
of the production design.

Studio uses a Porcelain canvas (`#F1EDE4`), refined cobalt (`#244CC2`) identity
rail and mobile header, and ink text (`#233343`). The home presents the rail,
the linked `.identity-heading`, and the main content stream. Writing has a
pale-blue field. Headings are ink, media stays natural, and email actions use contrasting fills: porcelain in the rail and cobalt on the canvas. The home body uses Inter through the Studio Body alias; Studio
Display is reserved for its display role.

The selected home uses **Work** for `/work`. Its page title, heading and inner footer use the same name. This replaces the earlier Projects label without changing the catalogue or its routes.

## Boundaries

The Studio composition is home-only. Profile-wide Porcelain/cobalt tokens also apply to inner pages. Inner profile routes retain their existing Work in view
composition, including their header and footer. Writing and Photography are
specialist applications with their own styles and navigation; their profile
links continue to open in new tabs. Preserve authored copy, facts, existing
media, route behavior and specialist link boundaries.

## Verification

Rendered checks distinguish the home shell from inner shells. They retain
specialist new-tab behavior, image-load checks, no-horizontal-overflow checks,
and browser Back. This ADR records the selected direction; it is not release or
deployment evidence.
