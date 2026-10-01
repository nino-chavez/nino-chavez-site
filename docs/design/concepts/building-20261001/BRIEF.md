# Building: direction comparison

Design intent: rethink the `/work` page. Source: production revision `1329b5a`. The shared identity, global navigation and other routes stay governed by `DESIGN.md`. This comparison is local; none of its candidates is approved for production.

## Reader and job

A person following Nino's writing or social posts wants concrete examples of what he builds. They may know no product names. They need to understand what each product does, whether it is available, and whether the next link opens a product, a study, or more explanation. A returning visitor needs direct retrieval. They read on a phone or laptop, often without much time.

The page answers: what is here; what can I use or read now; what did Nino make; where should I go next; how do I return to the same item or search.

Character: concrete, composed, legible, recognisable, purposeful.
Anti-goals: a software supermarket; a long biography; repeated catalogues; screenshots with text laid over them; fictional proof or product interfaces.

## Surfaces

- Building, populated overview, desktop 1440×900 and phone 390×844.
- Building, complete searchable catalogue, direct query and empty result.
- Project browser, selected product and switching products, including narrow screens.
- Shared comparison controls, concept switch and phone viewport.

## Fixed truth and preservation

Use the six records from `app/operated-products.ts` and all 34 catalogue records from `app/data.ts`, frozen at the source revision. Preserve product names, factual summaries, availability, destinations, draft status, and the Minder image's fictional-sample-day disclosure. Work Library only opens its public study. Keep Process and Guides available. Keep q/domain/state/form retrieval and clear/return behavior in the proposed catalogue. Never edit generated production data.

Use the existing Schibsted Grotesk/Inter fonts, warm paper, navy text and blue actions. Product images may retain their own colors. No new global brand, navigation changes, added testimonials, adoption figures, or claims of measured user improvement. New headings group existing work; they do not add capabilities. Graphics use the three actual product previews, intentionally framed; missing screenshots use typographic entries instead of invented interfaces.

## Hierarchy and density

Show a compact page identity, then actual work. On desktop, at least three products or a six-product index should be visible in the first viewport. On phones, show product context and an explicit path to the rest within the first screen. Limit the curated overview to roughly three desktop screens; the complete catalogue is a separate user-selected view. Keep section boundaries stronger than item separators. Product name, purpose, availability and action belong together.

Copy uses the documentation register: short, direct labels, existing factual descriptions. Voice rules carried over are source fidelity, clear subjects and no corporate filler; essay rhythm and first-person reflection do not apply. Never relabel an internal alpha as available to download.

## Structure alternatives

The grounded structural inventory: (1) a gallery of distinct product previews; (2) an interactive project index with one selected detail; (3) a sequence of illustrated case studies; (4) one comprehensive filterable directory; (5) a featured product followed by a compact list; (6) a publication-style mix of build notes and products; (7) chapters grouped by what the work is for. The Impeccable surface seed `4f3b4662` dealt 7, 2, 1. The comparison contains those three structures. No outside visual-world challenger replaces this site's established identity.

- A — Product gallery (inventory 1): three distinct product previews; a compact area for the other three products; a clearly separated methods/studies area; complete catalogue on request. This favors quick visual scanning.
- B — Project browser (inventory 2): a six-item product index beside one generous real preview and product details; switching retains selection in the URL. Studies/methods and the complete catalogue remain separate. This favors comparison and short page length.
- C — By purpose (inventory 7): Everyday software, Volleyball, Making and sharing, then Studies and methods. Group related work and let one genuine preview establish each group. This favors understanding the breadth without knowing the names.

These are live HTML prototypes because selection, search, query retention and phone flow are part of the decision. The prototype renderer is not a standing Impeccable build-path preference. Each receives the same real records and states, not synthetic marketing compositions.

## Objects, actions and states

| Object | Owner | Valid actions | States | Reverse |
|---|---|---|---|---|
| Product | operated-products.ts | inspect; open canonical link | populated; stated availability; image absent | Back or select another |
| Catalogue entry | data.ts | open; search/filter | populated; filtered; empty | clear filters; return to overview |
| Public study | existing work page | read source draft | public draft | Back |
| Method | Blueprint record | explore method | maintained public record | Back |
| Process/Guides | existing routes | open destination | available | Back |
| Selected product | prototype URL | choose another | default; selected; browser Back | prior selection |

No loading/error/undo for edits: this surface makes no edits or remote data mutation. Static data is present at load; empty search is tested. Missing imagery is represented honestly. Largest text is checked for overflow; reduced motion suppresses transitions. Current content/status are source-controlled snapshots, so source changes require refreshing the data snapshot rather than pretending to be live.

## Motion, platform and length

Fixed light theme follows the existing main site. Native scrolling, links and form controls. Blue focus, 44px touch targets, semantic sections, descriptive image alternatives. One short selected-product transition is acceptable; no entrance procession, carousel, autoplay, scroll hijack, hover-only explanation or theme switch. The archive preserves its URL criteria and browser recovery. External destinations open real published pages in a new tab so a person can return to the comparison.

## Baseline and references

Parent inspected desktop, middle and phone baseline captures in `evidence/`. A cold reviewer, without source or rationale, found the purpose/direct actions legible, but equal grid weight competes, phone breadth is unclear, Process/Guides need context, and retrieval arrives late. Preserve real previews and honest availability. The new grouping is a design hypothesis, not an analytics conclusion.

Panic's live homepage was inspected October 1 at 1440×900 to ask how multiple products can keep identity while remaining one site. Its opening is a full-screen game promotion; that would add an unnecessary preamble here and is rejected. Its product grouping is considered only as a composition reference, never as evidence of effectiveness or a source of graphics/fonts. No authenticated Mobbin evidence is claimed.

## Selection

Pending Nino's comparison. No production implementation or deploy until he names a direction. Once selected, inspect the rejected candidates for useful pieces, record what is folded in and why, then implement with the existing route and filter contracts.
