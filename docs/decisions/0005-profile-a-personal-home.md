# ADR 0005: Profile A personal home

- **Date:** 2026-10-26
- **Status:** Superseded by [ADR 0006](0006-profile-work-in-view.md) on October 30, 2026
- **Scope:** the profile homepage and navigation on all routes served by the profile app

## Decision

Nino selected Profile A as the personal home. It uses a warm-white, serif
composition with the approved portrait, first-person profile copy, and local
About, Projects, and Contact links. The compact footer retains Privacy.

The profile header replaces the shared Writing, Building, Photography, and
About primary navigation throughout the profile app. The home keeps ordinary links to the
complete Work library and full About page so the existing deep pages remain
discoverable. Writing and photography appear only in the Elsewhere contact
copy.

## Consequence

The prior shared-navigation contract is superseded for the profile app. Existing
deep-page content and typography stay in place; the new local profile header
and footer apply consistently when a visitor follows All projects or Privacy.
Writing and photography links open their current specialist archive and Events
URLs with full-page navigation. Subdomain migration remains a separate proposal. Existing routes, metadata, structured data, indexing guards,
analytics behavior, and privacy policy remain in force.

## October 29 amendment: consistent profile interiors

Nino asked to make every profile page match the selected homepage, retain the
blog and photography in their own styles, and check desktop and mobile before
shipping. This extends the accepted visual scope to all routes served by the
profile app, including the coverage inquiry page. It supersedes the earlier
choice to leave deep-page typography unchanged.

`app/profile.css` owns the shared warm-white ground, Georgia reading type,
ordinary links, 820px content measure, and compact interior layouts.
`app/layout.tsx` applies `profile-site` instead of the previous `site-a` layer.
Existing content, links, filters, analytics, privacy and inquiry behavior stay
in force. The publication and gallery applications keep their own styles and
navigation; their public URLs and routing are unchanged.
