# ADR 0005: Profile A personal home

- **Date:** 2026-10-26
- **Status:** Accepted
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
