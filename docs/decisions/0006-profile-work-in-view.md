# ADR 0006: Put the person and work in view

- **Date:** 2026-10-30
- **Status:** Accepted by Nino
- **Scope:** all routes served by the profile application
- **Supersedes:** [ADR 0005](0005-profile-a-personal-home.md)

## Decision

Nino found the profile hard to follow and read and asked for a rethink from first principles. After reviewing three working directions, Nino selected **C — Work in view** on October 30. The [comparison and selection record](../design/concepts/profile-20261030/BRIEF.md) preserve all three candidates and the inspected reference material.

The home introduces Nino briefly, exposes writing and photographs immediately, and shows three real product previews with their purposes alongside them. The longer biography follows the work. Links groups each linked name with its explanation directly underneath. It no longer spreads one destination across a title column, a description column, and a distant action label.

Use the existing warm-white, charcoal and brown palette. Schibsted Grotesk carries headings; Inter carries body text and controls. The wider 1160px shell allows product previews and grouped destinations to use desktop space. Long prose retains a narrower reading measure. On phones, keep text across the available width, a small portrait beside the name, and visible navigation.

## What carries over from the alternatives

A contributes the compact phone introduction and direct name-then-description order. It remains the shorter, text-only alternative; the selected home keeps product imagery. B contributes a visible current-page indication. Its desktop identity rail is omitted because it consumes space without helping the phone experience.

The new primary navigation is Home, Writing, Photography, Links and Email. Phones show Home, Links and Email; writing and photographs remain immediately available on Home and in the footer. About, Projects and Privacy remain discoverable in the footer. Keep the existing home anchors for incoming links.

## Boundaries and verification

The blog and gallery retain their own applications, navigation and styles. Existing URLs, content facts, metadata, structured data, indexing guards, analytics, privacy, catalogue filters, browser history, inquiry validation and CV printing stay in force. The profile-owned coverage inquiry receives the profile typography, without a live test submission.

The comparison was inspected at desktop and phone browser widths, including doubled-text stress, and received an independent screen review. These are rendered design checks, not measured usability improvement. The production implementation must also pass its source checks, rendered HTML tests and navigation suite, then receive a cold rendered review before release. Release evidence belongs with the implementation, not in the human selection record.
