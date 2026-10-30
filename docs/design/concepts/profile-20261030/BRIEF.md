# Make the profile easy to enter and easy to leave

Design intent: **rethink**. Requested by Nino on October 30, 2026 after finding the profile difficult to follow and read. Nino selected C — Work in view on October 30, 2026 after reviewing the comparison. The three prototypes remain the selection evidence. Source baseline: `909b5f7`. Production implementation follows this selection; ADR 0005 must be superseded by a new decision record before release.

## The visitor's job

A visitor arrives from a referral, search result, or shared project. They need to understand who Nino is, find something relevant, and contact him. A returning visitor may already know exactly which destination they want. Neither reader should need to understand Nino's companies or the site's internal categories first. The site is read on a laptop or phone, often while distracted.

The opening should answer who this is and provide a useful next step together. A name, explanation, and link belong in one reading group. A person seeking photographs should recognize “Photography” without first interpreting “Images and sound.” The name of a project remains intact; its description explains the unfamiliar name.

Character: personal, clear, grounded, welcoming, compact.
Anti-goals: a corporate brochure; a software marketplace; a sparse page that still requires decoding; a directory where every destination competes equally; a shared shell imposed on the independent blog and gallery.

## Surfaces

- Profile home, populated: desktop 1440×900 and phone 390×844.
- Links, complete directory: the same viewports, with all eleven existing destinations.
- Comparison controls: choose a concept, switch Home/Links, choose desktop/phone, and open the page at full size.

These two content types are the direction test. About/CV/Now, the searchable Projects catalogue and its details, Sessions, Guides, Search, Privacy, and coverage inquiries will need route-specific implementation and review after selection. These prototypes do not claim to redesign or test those routes. Blog and photography remain independent destinations.

## Content and constraints

Documentation register for controls and source-preserving personal prose. Carry over the voice guide's source fidelity, clear subjects, and absence of filler; do not import essay rhythm or invent first-person experiences. Canonical sources: `app/page.tsx`, `app/links/page.tsx`, `app/selected-work.ts`, `reader-contract.json`, and ADR 0005. `content.js` is a frozen prototype snapshot of those facts, not a replacement production registry.

Every home uses the existing introduction, the same three projects (Minder, Rally HQ, The Rotation), visible routes to writing and photographs, and contact. The fuller existing biography remains reachable. Every Links page keeps all eleven destinations. Headings may change grouping; destinations and facts may not change. No copied count, last-checked label, status claim, testimonial, new availability claim, or fictional product interface.

Use the real approved portrait and existing product captures. Preserve the Minder caption that identifies a fictional sample day. The warm white, charcoal, and brown of the live site are the starting palette. Typography and composition are open: readable sans-serif text may replace the serif treatment; keep 17–18px body copy, clear links, and moderate heading sizes. The existing local Schibsted Grotesk and Inter files are available. No new brand artwork is needed.

## Hierarchy and density

Home: identity → useful destinations → selected work → deeper biography/contact. At 1440×900, show a useful destination and at least the start of selected work without scrolling. At 390×844, show identity and the primary destination choices without a long preamble. Aim for two desktop screens for the home and two for the directory. Fit by cutting repeated explanations, not shrinking body text. Long biographies live on About.

Links: page name → grouped destinations. Remove the current explanation of the difference between Work and Links. Put descriptions directly under their linked names; avoid the current left-title/right-description/far-right-action scan. Use grouping and spacing before adding boxes. A box must be one clickable object, never decoration around a section. Labels describe destinations: Projects, Writing, Photography, Links, Contact. The brand name Signal Dispatch can appear beside Writing.

## Three structures

- **A — Personal introduction:** one continuous reading column, compact portrait/introduction, prominent text destinations, selected work as short entries. Links uses a short, plainly grouped directory. Strength to test: least interpretation and easiest phone reading. Risk: the work may lack visual character.
- **B — Profile beside content:** persistent identity/navigation rail on desktop with a separate main content area; compact identity and ordinary horizontal navigation on phones. Home and Links share the same orientation. Strength to test: return and retrieval without repeating the introduction. Risk: sidebar furniture may consume space without helping phone users.
- **C — Work in view:** compact introduction followed quickly by real product previews and their adjacent descriptions; writing and photography are clear outbound paths. Links uses a compact visual grouping of destinations without forcing visitors through category selection. Strength to test: understand unfamiliar projects by seeing them. Risk: projects may dominate the person or increase scrolling.

Use the same facts and destinations across candidates. These are competing structures, not three font changes. Preserve all three after selection and inspect the rejected two for useful pieces to carry into the selected design.

## Objects, actions, and states

| Object | Owner | Action | States | Return |
|---|---|---|---|---|
| Profile | app/page.tsx, career data | Read; open full About | Populated; narrow screen; enlarged text | Home link |
| Project | app/page.tsx, selected-work.ts | Read purpose; open source destination | Populated; image absent | Browser Back |
| Public destination | app/links/page.tsx | Follow native link | Full list; keyboard focus | Browser Back |
| Contact | Existing mailto | Open email composer | Link only; no submission | Close composer |
| Concept | This comparison | Switch concept/surface/viewport | Direct query; current selection; Back | Comparison link |

These static prototypes have no loading, remote errors, editable records, empty search, or undo states. Do not invent them to fill a checklist. Check all native anchors, local images, keyboard focus, no horizontal overflow, and text enlargement. External visits are real links, not simulated product interactions.

## Platform, motion, and theme

Fixed light theme; no theme switch. Native document scrolling and native links. No carousel, entrance animation, automatic scrolling, hidden main navigation, hover-only description, or remote API. Visible keyboard focus and sufficiently spaced touch targets. Use proper headings and one main landmark. No labels describing the implementation inside the proposed website; comparison labels belong outside it.

## Evidence and decision

The parent opened the live home and Links page before briefing workers. Captures and a blind baseline review are in `evidence/`. Baseline Home and Links captures are 1197×1208; the additional Links desktop capture is 1440×900. No baseline phone capture is claimed. The baseline reviewer independently noted delayed next actions and distant link affordances. The parent confirmed both against the live pages. Its suggestion that another metadata label is necessarily needed remains unaccepted: descriptions and explicit links can do the job without extra labels.

[Reference findings](REFERENCES.md) record the two supplied Instagram videos, inspected October 30 with browser captures, full machine transcripts, and selected video frames. They support hypotheses to test on this site, not measured claims about visitor success.

Recommendation: **C — Work in view**. Its compact introduction and adjacent real product previews make the range of work concrete. Its Links page groups each linked name with its purpose and uses desktop width without spreading one item across a row. A remains a useful alternative for the shortest phone homepage; B offers persistent desktop orientation at the cost of space. This is a design judgment, not evidence of measured visitor success.

The independent finished-screen review, in `evidence/concept-review.txt`, chose C for both Home and Links after viewing all twelve full-page captures without the briefs or this recommendation. The parent also inspected the rendered screens. Accepted fixes: remove the extra rule above C's directory groups and use the same “Links” label in A's footer. The suggestions to add product imagery to A or narrow B's identity rail remain comparison tradeoffs: doing either now would reduce the distinction being tested. C's portrait-shaped Minder source leaves space in its landscape frame; retain the complete source and its sample-data disclosure for this comparison. A portrait-aware media treatment is a selected-direction refinement, not a reason to crop product evidence.

Verification: all six pages rendered at 1440×900 and 390×844; thirteen Playwright checks pass. They cover loaded images, no page errors, no horizontal overflow, doubled-text stress on phone widths, the eleven canonical Links destinations, and comparison navigation/history. The overflow detector was first proved to fail on an injected oversized element. This is browser-viewport review, not physical-device or usability-test evidence. Full-page and first-viewport captures are in `evidence/`.

Selection: **Nino selected C — Work in view on October 30, 2026**, replying “C — Work in view (Recommended)” to the rendered comparison. This satisfies Signal Frontend Designer Phase 0. Retain C’s visible product proof and grouped Links. Graft A’s compact mobile reading order where it helps without removing the images; retain B’s clear current-page navigation but not its desktop rail. Implement against existing routes and behavior, then review full rendered pages before release.
