# Building: mixed-work revision ready for review

## Current assessment — supersedes the original recommendation

Nino rejected the purpose grouping and the assumption that the collection contains only products. The corrected proposal is **Selected work**: one continuous portfolio index with a name, kind, description and clear destination for each entry. It now shows all eight entries, including Flickday Media as a sports-media business and Let’s Pepper as a tournament series. A website is the destination for those entities, not a claim that the businesses are apps. The existing catalogue already held both records; no duplicate was added.

The revised source is `selected-work.html`, `selected-work.js` and `selected-work.css`. The shared preview opens this revision with Desktop and Phone controls. `comparison-v1.html` preserves the original three concepts. None of those three was selected.

The parent inspected first-view and whole-page captures at 1440, 800 and 390 pixels. A fresh cold reviewer, given the user correction and rendered frames only, found that the mixed collection now reads accurately, the separate rows are clear, and the phone scan holds together. It requested tighter phone crops of The Rotation and Rally HQ. Those now show one actual match listing and one court score; the reviewer reopened both captures and marked the finding resolved. Its final disposition is ready for local design review.

This structure trades some large-image impact for easier scanning and consistent separation. The graphics now support identification; they are not uniform product mockups. Each business keeps its own truthful descriptor. Entries without imagery remain concise text rows instead of fabricated interfaces. Studies and methods remain a distinct supporting section.

All 12 browser checks passed. The new checks cover eight curated entries, exact destination links for the additions, entity labels, zero document overflow or broken images at three widths, one result per new entry in the 34-record catalogue, reload recovery, return to overview, and accurate phone/desktop iframe dimensions. The earlier search, empty, clear, filter, Back, and overflow-canary checks still pass. These are local prototype checks, not production regression proof.

The one detector pass for this revision reported three warnings: two known font aliases and the existing cream palette. No suppression or new brand choice was saved. Product context now records the mixed scope and the rejection of purpose grouping. Production UI and data are unchanged. No deployment occurred.

Evidence: `evidence/selected-*`, including the complete screenshots, individual phone crops, JSON receipts and detector output. Asset sources and current public-site facts are recorded in the current correction at the top of `BRIEF.md`. Parent and reviewer judgments are design assessments, not analytics results. The proposed selected-work order is reviewable, not inferred from traffic volume. The next production step requires a named human design selection under the existing rethink contract.

## Original comparison record

October 1, 2026. Local prototypes based on production revision `1329b5a7d96da6a576c3489e090c49c3ea30dc88`. No direction has been selected. No production route, stylesheet, navigation, data, or deployment changed.

## Recommendation

C gives the strongest visual separation and explains what the work is for. A is quicker to scan and more compact. B offers direct selection among all six products, but hides their details behind controls. Present all three; Nino chooses the direction.

| Concept | What changes | Main tradeoff | Measured overview height, desktop / phone |
|---|---|---|---|
| A: Product gallery | Separate real previews; compact additional products; distinct studies band | Easy comparison, but a relatively flat inventory | 1761 / 2766 CSS px |
| B: Project browser | Six-product index with one selected preview and URL-retained selection | Shorter page; lower discovery and horizontal selection on phone | 1408 / 1877 CSS px |
| C: By purpose | Everyday software, Volleyball, Making and sharing, then Studies and methods | Best category separation; longest scroll | 2734 / 4262 CSS px |

These heights are operating measurements from the saved browser receipts, not evidence of user outcomes. The complete catalogue is a separate selected view in every concept.

## Rendered judgment

The parent opened desktop and phone captures itself. A has the clearest immediate product/action comparison. C explains relationships more strongly through headings, related products and a dark volleyball band. B is useful for returning visitors, but its selection control places a cost on unfamiliar visitors. Real product images establish different products without text overlays; a product without imagery is represented with honest text.

A fresh reviewer, with screenshots and the visitor job only, ranked C, A, B. It found no blocker to presenting the concepts. Its concrete concern about the detached “Notes and transcripts” heading in C was fixed by removing that repeated heading. The reviewer reopened desktop and the complete phone section and marked the grouping resolved. It also confirmed that the Making and sharing descriptors now read at the intended size. No analytics result is claimed.

Retain the review's tradeoffs for the decision: C's dark band is a strong tonal change; A can feel like a long inventory; B hides breadth and cuts off the horizontal selector as a scrolling cue on phones. B's products without screenshots use typographic panels, which repeat some information; evaluate that cost before selecting it.

## Verification

`npx playwright test --config docs/design/concepts/building-20261001/playwright.config.mjs`: eight checks passed after the final layout changes. A subsequent C-only run passed both viewport checks while capturing the complete phone Everyday software section for the reviewer.

At 1440×900 and 390×844, every overview had zero document overflow and zero broken images. The catalogue showed all 34 source records, accepted search, displayed an empty result, cleared filters, retained the Volleyball filter on reload, and returned to the overview. B selection retained the product in the URL, restored keyboard focus and recovered Minder with browser Back. Comparison controls switched concepts and used an actual 390px phone frame. The overflow check rejected an intentionally injected 4px defect before passing the restored page. The first run exposed an imprecise test label locator; the accessible combobox role/name was used instead.

An initial B image-sizing defect was corrected before the final captures. The comparison now renders at fixed 1440px desktop or 390px phone width, scaled to fit its panel, rather than silently showing the phone layout behind a Desktop button. It is open in the in-app browser. Its narrow current panel is set to Phone for readable review.

The one Impeccable detector pass reported 13 warnings. Six concerned font aliases: Field and Body load the existing Schibsted Grotesk and Inter files. Three concerned the existing cream palette. Three padding warnings concerned outer section bands; visible content has logical block padding and inner horizontal wraps. One concerned C's muted text shade on its dark volleyball band. These are documented findings, not a claimed zero-warning scan; the established identity and rendered spacing were retained. No detector suppression or new global brand preference was saved.

## Evidence and boundaries

`evidence/` contains current production baseline captures, final first-viewport/full-page/empty-result captures, B's selected Yawn state, C's complete Everyday software section, geometry receipts and detector output. `BRIEF.md` records the experience, source data and inspected Panic reference. No authenticated Mobbin research is claimed.

Imagery comes from the repository's actual Minder, The Rotation and Rally HQ previews. The Minder fictional-sample-day disclosure is preserved. No generated or invented product screens were added. Product states and destinations come from the frozen source snapshot; the prototypes do not update themselves as production data changes.

These checks cover the local concept controls and visual states, not a production integration. The shared navigation is a representative prototype. Production implementation must preserve the current `/work` query parameters, item routes, semantic navigation, and legacy `#work-library` catalogue entry. C's current product-section ID uses that legacy string and must be renamed during integration. Validate those contracts against the chosen implementation before release. Missing preview states and external destinations were not retested as live product functionality.

## Next decision

Nino selects A, B or C. Then inspect the rejected candidates for useful parts, record any deliberate incorporation, and implement the selected direction in the existing `/work` route. Preserve these local alternatives. This is a direction-selection artifact, not a release receipt.
