# The local refit is ready; Work still needs a visitor job

The responsive, navigation, and styling repairs are implemented in review branches. The main site, publication, and gallery passed their relevant checks. Nothing was pushed or deployed.

Nino rejected all three Work concepts. The recommendation is to retain `/work` as a secondary complete archive, with direct project pages doing the work for specific referrals. Its job would be to show the full public body of work and current availability. That is useful when someone deliberately wants breadth; the available evidence does not establish that it deserves the first navigation position.

This recommendation is not an implemented navigation change. The archive, domain data, filters, project URLs, and existing navigation position remain intact. No fourth concept is being developed in this round. The unanswered question is who the next important visitor is and what decision that person needs to make.

## The repairs make the existing paths easier to use

- Home exposes a named Rally HQ action and real product proof earlier on a phone. Its selected work grid no longer inherits the desktop column count at phone widths.
- Learn wraps its long heading, compares outputs more clearly, and fits within the page. Later CSS rules no longer override the intended desktop type scale. Writing's desktop title scale received the same correction.
- Photography's entrance has a clearer image crop, text overlay, and search panel. The coverage page uses the existing type family with adjusted display tracking.
- The three applications use the same global labels and menu order while retaining publication and photo-finding controls. Keyboard focus wraps in both directions. Escape, Close, route selection, and Back close the menus without leaving an extra menu entry in navigation history.
- Same-site essays, series, writing search results, and related writing use ordinary same-tab navigation. External product destinations retain their existing behavior.
- Main-site entrances now emit an apex canonical URL, including query-based Work and Search pages. This repairs page identity; it does not establish an indexing or traffic gain.
- The gallery's long album breadcrumb fits a phone. Existing album viewing and lightbox navigation remain available.

What this means: the current site can be reviewed as a working candidate without selecting a new Work model or replacing its brand.

## The rejected concepts do not answer the purpose question

All three concepts were comparison artifacts. Each retained the full collection, but each assumed a prominent Work entrance was necessary. Nino's rejection challenges that premise as well as their appearance.

The [independent Work review](reviews/work-job.md) recommends a secondary archive. Home already supplies selected proof and a domain map. Search retrieves remembered things. Links supplies usable destinations. Work's remaining distinct value is complete inspection, including work that those entrances omit.

The historical analytics show page loads, not why people visited or whether they made a useful decision. They cannot settle archive prominence, prove that a new design would improve conversion, or justify deleting project evidence. The audit's historical numbers remain in their existing local evidence files.

What this means: do not use SEO, completeness, or a prettier inventory as substitutes for a visitor's actual task. Keeping one hostname does not require this particular collection entrance.

The recommendation would change if real referrals independently sought the full body of work, used the archive's metadata, and found relevant evidence they otherwise missed. Removal would require evidence that complete inspection adds no useful discovery. The next real referral is the appropriate starting point; no messages to visitors were sent.

## The visual review found no further styling requirement

The [cold rendered review](reviews/cold-render.md) found a coherent visual system and no release-blocking visual defect in the reviewed frames. It recommended preserving the light global shell and the distinct publication and gallery environments. Nino's preference for the homepage image and desktop pacing remains open.

The reviewer flagged a $250/$350 source conflict. The current [September 9 offer correction](../../coverage/lead-operations.md#introductory-price-correction--september-9), current offer code, and rendered page all specify $250. The older IA reference was stale and has been corrected. Commercial terms were not changed by the refit. The original review is preserved rather than silently rewritten.

The gallery's lower thumbnails were blank in the initial capture. A later [scrolled observation](evidence/gallery-scroll-observed.jpg) shows loaded photographs farther down the collection. The capture alone cannot establish a persistent missing-image defect. No image-loading rewrite was made.

What this means: another styling round is unsupported. Work's purpose and the homepage's intended first impression are the remaining product decisions.

## The checks cover local builds and observed browser behavior

| Surface | Completed checks | Evidence |
|---|---|---|
| Main application | Static check; lint with eight existing warnings and no errors; production build and rendered HTML checks; audit regression checks | Local command results; [canonical negative control](evidence/canonical-negative-control.json) |
| Main standalone checkout | Fresh independent clone, dependency install, public production test using the existing published-feed fallback | [Clean-checkout receipt](evidence/clean-checkout.json) |
| Publication | Production build after the article-title and menu repairs | Local build result; article and menu captures |
| Gallery | Static/Svelte check, production build, navigation contract checks, refreshed reader-review source receipt | Gallery review branch and its `docs/reader-audits/gallery-interface.json` |
| Browser behavior | Main and publication menu focus/Back/search; gallery focus/Back, real event and album, lightbox Next/Escape; Work empty-state recovery and domain filter | [Menu observations](evidence/menu-checks.json); phone captures; parent interactive observations |
| Intermediate width | Ten main routes measured at 800 CSS pixels without document overflow | [Tablet measurements](evidence/responsive-tablet.json) |
| Appearance | Desktop and phone entrance captures, article body, album and lightbox; parent inspection and independent cold review | [Capture manifest](evidence/capture-manifest.json); [review](reviews/cold-render.md) |

The overflow check encountered a real failing album breadcrumb before the fix. Its document scroll width changed from 485 to 378 CSS pixels at a 378-pixel client width. The canonical check also rejected the older Work build with no canonical. These are observed failures, not checks that have only shown green.

The committed candidate's owned content refresh produced 306 writing items and nine series. The clean checkout also produced 306 items and nine series through the published-feed fallback. The category sets differ between those sources, so passing the clean build does not claim identical content snapshots. Generated indexes were refreshed with their owning scripts, not hand-edited.

What this means: implementation and local rendering are checked. Human visitor success, production routing, and traffic gains have not been measured by these checks.

## The review branches remain local

| Repository | Branch | Source commit before documentation closeout |
|---|---|---|
| Main site | `codex/frontend-refit-20260929` | `6995badba04daf148e860bc7274381caef431455` |
| Publication | `codex/frontend-shell-20260929` | `eaf6ab4` |
| Gallery | `codex/frontend-shell-20260929` | `3a1bd85` |

The original main-site branch refs were compared before and after dispatch; none moved. See [the ref comparison](evidence/branches-after.json). Original checkouts and unrelated worktrees were preserved. Review worktrees remain available; they have not been merged or published.

Operator classified and dispatched the bounded workers. The saved receipts record requested routes. Observed child model and effort fields were unavailable, so the requested models are not presented as verified runtime facts. No new persistent sidebar task was created.

## Production and visitor outcomes remain separate

- The three local applications ran on separate ports. A complete Home → article → album → Work journey on one hosted hostname was not observed for this candidate. The production router was not modified.
- The review used browser desktop, phone, and intermediate-width states. It is not physical-phone acceptance, measured Core Web Vitals, or a complete cold/warm-cache performance study.
- Coverage persistence, email delivery, downloads, saves, authentication, and share delivery were not newly exercised as production operations. Existing commercial behavior was preserved.
- Search Console changes, legacy-host redirects, deployment, and post-release analytics were not performed. Existing automation must be considered before an authorized push.
- No preference approval is inferred from the cold reviewer. All three Work concepts remain rejected, and the homepage priority question remains unanswered.

What this means: this round closes with a tested local refit and a clear negative result for the three concepts. Further design work starts with the visitor's decision, not another rearrangement of the archive.
