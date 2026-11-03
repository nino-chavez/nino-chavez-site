# Profile page rethink — November 2, 2026

design_intent: rethink
status: research and three whole-page concepts required; no selection

## Operator correction

Nino rejected Current, Apricot & ink, and Sage & cocoa: “none of these. rethink the profile page design against other profile pages that are more artful and blend function with color to afford design”.

The earlier palette refit is closed without a selection. It must not be promoted or treated as approved. Its frames and source remain historical comparison evidence. ADR0006 describes the current baseline; it no longer locks the new concepts' composition.

## Assignment

Inspect original, working personal profile/portfolio pages at desktop and mobile widths. Study how composition, typography, photography, color and interaction help a visitor understand the person, inspect real work, navigate and make contact. Record observed evidence and limits; do not infer full-site design from social-media stills.

Develop three structurally different whole-page Profile concepts using the same real Nino content and destinations. Color must clarify grouping, choices, current location and action. New typography, composition, image treatment and interaction are open. Preserve truth, privacy, source images, content ownership, useful URLs, accessibility and product functionality. Do not invent biography, testimonials, project facts, counts, app features or achievements.

## Surfaces

- Current Profile homepage, desktop and mobile baseline.
- Three complete proposed homepages on desktop and mobile.
- Navigation and representative project/contact actions, including keyboard focus and reduced motion where motion changes.
- Narrow-screen and enlarged-text stress checks.

## Sequence

Profile first: original reference research, a reader/job brief, three divergent working pages, independent cold review, then Nino's selection. Yawn desktop remains next in the assignment; retain its independent work in progress and resume it after the new Profile comparison is delivered. Other fleet properties remain deferred.

## Experience brief

Reader: a prospective collaborator, client, employer or reader encountering Nino through a referral or a project. They need to understand who he is, see credible work, choose a destination and contact him. The first view must identify Nino as a Chicago product architect and expose a route to Work, Writing, Photography and Email. Do not turn the page into an agency or a photography portfolio.

Character: personal, visually authored, curious, practical, connected across disciplines. Anti-goals: anonymous résumé, agency sales page, decorative swatch demonstration, app dashboard, or spectacle that delays access. Density: identity and destination choices within the first mobile view; fuller context and three product proofs below. Native scrolling, explicit links and readable body text remain familiar.

| Object | Action | States and recovery |
| --- | --- | --- |
| Identity and portrait | Read; open About | Populated source copy; image alt if media fails; no loading ceremony. |
| Work | Inspect Minder, Rally HQ and The Rotation; open real destinations; view all Work | Populated source descriptions and screenshots. Missing images retain labels and links; never hide content behind hover. |
| Writing and Photography | Open their independent publications | Descriptive labels and real URLs; external destination is clear. |
| Index disclosures (concept C) | Expand/collapse each pursuit | Work initially open; native keyboard operation and visible state; links still usable without JavaScript. |
| Contact and wider navigation | Open email, About, Links, Sessions and Learn | Actual links, visible focus, no simulated success or contact form. |

Entry: referral → identify person → choose pursuit or inspect work → follow destination. Return: browser Back restores ordinary document context; index sections preserve native state during a visit. No forced scroll, pointer-only navigation, cursor replacement or scroll hijack. All concepts retain the same factual lede, both biographical paragraphs, three project descriptions, contact address and specialist destinations.

### Research and adaptations

Original homepages fetched and rendered November 2 at 1440 × 1000 and 390 × 1000. Parent opened all six captures. Private research captures and observations: `outputs/profile-yawn-revisit/profile/references/` in the session deliverable. The shared browse-tool timed out during tab lookup; a separate headless Playwright context captured originals instead. No login or authenticated state used.

- [Maggie Appleton](https://maggieappleton.com/): large serif statement unifies several disciplines; plum links and turquoise marks have different roles. The mobile statement consumes substantial space before the collection. Adapt the editorial hierarchy and clearly named destinations; keep Nino's first choices nearer the top. Opening the mobile menu exposes a plain full-height list of destinations. Desktop focused link visibly changes to a plum outline; mobile hover probe was intercepted by a wrapper, so no mobile interaction verdict.
- [Josh Comeau](https://www.joshwcomeau.com/): sky-blue authored environment, pink section labels and blue category controls coexist with a conventional article list. Desktop illustrative composition simplifies on mobile. Adapt color roles and responsive restraint; do not borrow his rainbow, avatar, clouds or sounds. Opening Categories exposes an ordinary text menu over the authored header. Still captures show character, not evidence of improved usability.
- [Tobias van Schneider](https://vanschneider.com/): expressive black/white typographic opening, red destination emphasis, grouped routes across writing, music and images. Mobile reveals the cost of a long identity-first opening. Adapt the coherent personal world and large image/text contrast; avoid borrowed heraldry, philosophy, moving banners and making the visitor wait for work. A real promotional link visibly changes fill/text on desktop hover.
- Robb Owen was attempted through web and browser but DNS failed; excluded from design evidence.

Transfer hypothesis: color used consistently for pursuits and active choices can make a broad practice easier to scan. This is a design hypothesis to judge on Nino's working pages; none of these precedents proves a usability or conversion benefit.

### Three concept contracts

A — Editorial. Paper with cobalt identity and persimmon image field; oversized name, compact source lede and portrait in an asymmetric magazine opening. A horizontal typographic destination strip gives Work, Writing and Photography their own color family. Projects become broad alternating image/text rows, not three equal cards. Typography: Schibsted plus restrained Georgia italic. Desktop split becomes a compact linear phone composition.

B — Studio. Deep ink with pale pistachio navigation and lilac photography accents. A persistent identity sidebar sits beside an image-led editorial stream. Portrait and an existing Nino volleyball photograph supply authorship; genuine product screenshots remain intact below. Mobile identity becomes a concise top block and the stream follows without horizontal interaction. Clear light text and restrained bright destination labels keep dark areas readable.

C — Living index. Ivory and oxblood with butter and blue category planes. Compact portrait/name introduction followed by large native disclosure rows for Work, Writing, Photography and Music. Color signals which pursuit is expanded; visible +/- and native semantics also communicate state. Work opens initially and includes all three products; the other panels show genuine route context. This is an interactive directory, not a card grid or hidden carousel.

### Motion brief

Visitor mode: Experience plus Read. Identity is immediately stable; no entrance choreography. Hover/focus may change underline, fill and a small arrow over 120–180ms to acknowledge the chosen destination. Disclosure state is native and immediate; no animated heights. No autoplay, parallax, moving background or runtime animation library. `prefers-reduced-motion: reduce` removes transitions; keyboard order and native scroll remain stable. Render/check 1440, 390, 320 and enlarged text; exercise all disclosures, links and focus before review.

### Verification owed

Same representative states: first view, full document, primary navigation focus and real project destination. C additionally expanded Photography, Writing and Music. Parent opens renders before an independent unprimed review. Verify screenshots load without tint/cropping, readable contrast, no overflow at 320, enlarged text, reduced motion, keyboard operation and valid external/internal destinations. Comparison source is review-only; selecting a design and production implementation remain separate steps. Rejected refits remain preserved below.

## Local comparison and review record

- Working comparison: `http://127.0.0.1:8872/__profile_review/rethink.html`. Editorial, Studio and Living index are complete independent HTML compositions; Current is the actual local application. Rejected palette refits remain at the original review URL.
- Source is limited to `public/__profile_review/`, this owned brief and `scripts/profile-rethink-review.mjs`. Production application source, global design record and other sites are unchanged.
- To reproduce: first run `SITE_VISIBILITY=public npm run dev -- --host 127.0.0.1 --port 8870` in one terminal, then `python3 scripts/profile-review-proxy.py` in another. The committed proxy binds only loopback port 8872, forwards GET/HEAD to 8870 and strips X-Frame-Options from local responses to permit comparison frames. Production security headers remain unchanged.
- Repeatable headless checks: `node scripts/profile-rethink-review.mjs`, with optional `PROFILE_REVIEW_BASE_URL` and `PROFILE_REVIEW_OUTPUT` (absolute directory ending in `/`). The running local proxy/app pair is required. Default evidence goes to `.artifacts/profile-rethink/`.
- Initial rendered testing caught stretched portraits, a narrow Studio project column, and enlarged-text overflow. Parent corrected image aspect handling, minimum grid sizes and wrapping, then recaptured the actual pages. No screenshot was cosmetically edited.
- Captures cover 1440, 390 and 320; whole-document and first-view states; index keyboard expansion; contact focus; enlarged text; reduced motion; all assets loaded; no fake links; and exact retained copy and destination URLs. Automated accessibility checks cover desktop/mobile with all index sections open. These are local browser checks, not human usability evidence or production deployment.
- The three authors ran through Operator with runtime receipts reporting gpt-5.6-terra, high effort. They wrote one isolated HTML each; parent integrated, tested and reviewed every full-page desktop/mobile render. Their source-only checks were not treated as visual acceptance.
- Independent cold review (Operator dispatch, runtime receipt stored with the task) preferred Editorial on the six whole-page desktop/mobile captures. Its primary observation was balance: Editorial keeps the person and all three destinations legible, Studio reads as photography-led, and Living index makes Work dominant. Parent independently observed the same tradeoffs. Editorial destination labels were strengthened to explicit Explore/Read/Open actions. Studio’s image-led opening and the index’s folded sections are retained as deliberate comparative choices, not production recommendations; both retain direct first-view navigation to Writing and Photography. No human selection is implied.
- Source-review fixes: body sizes now use rem; the enlarged-text assertion proves an actual biography paragraph doubles, then checks overflow. The framing proxy is committed with exact startup instructions. Editorial’s down-arrow Work route now scrolls to its real selected-work heading; the browser check exercises that action.
- No selection has been recorded. This is a never-merge comparison branch and draft PR; implementation of a chosen design is a later change. Profile remains first; Yawn comparison work is retained next.

## Historical refit record — rejected

# Profile design comparison — November 2, 2026

## Intent

Compare two original color and presentation directions for the existing Profile
home and Links surfaces. This is a refit, not a structural rethink: the same
real content, typography, navigation, destinations, and Work in view hierarchy
remain in place.

**Selected structure:** [ADR 0006 — Put the person and work in view](../decisions/0006-profile-work-in-view.md).

## Reader job

A visitor arriving from a referral or project link should quickly understand who
Nino is, inspect three real products, open Writing or Photography, and find a
route to more context or contact. Links should keep each destination name with
its explanation, without making the visitor assemble them across columns.

## Traits and anti-goals

Both directions are personal, clear, practical, and calm. Product previews are
treated as evidence, not decoration. They must not become a hero replacement,
a card collection, a gallery treatment, a dashboard, a badge system, or a
palette borrowed from Blog or Photography.

## Preserve

- The Work in view page sequence and three-column desktop to single-column phone hierarchy.
- Schibsted Grotesk for headings; existing Inter-backed prose and control face.
- Every word, URL, target, semantic element, data attribute, privacy behavior,
  visible navigation item, and existing new-tab behavior.
- Real project images and their current purpose and caption; no replacement,
  tint, recolor, or new media.
- Underlined links, native semantics, visible keyboard focus, and the existing
  no-new-animation and reduced-motion behavior.
- Profile ownership only. Writing and Photography keep their independent
  application styles and navigation.

## Directions

### Apricot & ink

`#FBF1E4` ground, `#28384A` ink, `#8B413F` action, `#F4E2CF` surface,
`#5D6068` muted text, and `#D3C4B5` rules. The blue-black ink gives the soft
apricot ground a crisp editorial contrast; the muted red is reserved for active
and interactive emphasis rather than spread over the interface.

### Sage & cocoa

`#EDF1E8` ground, `#35312C` ink, `#496650` action, `#DFE6D7` surface,
`#62665C` muted text, and `#C4CEBD` rules. This makes the same structure quieter
and more workshop-like. Cocoa preserves text weight while sage marks actions
without turning the home into a product-brand surface.

### Shared presentation refinement

The work section begins with a slightly firmer rule. Each existing product
image receives a simple surface frame without inner padding, and no image
filter or replacement. This makes tall and wide screenshots easier to inspect
at a glance while retaining their native UI. The only crop-related compromise is
the existing `object-fit: contain`: it protects the complete screenshot rather
than filling the frame with a more dramatic but less honest crop.

## Surfaces

| Surface | Reader sees | Check still owed |
| --- | --- | --- |
| Home — desktop | Compact identity and cross-site routes, then three equal product proofs and biography. | 1440px visual comparison; title wrap, image clarity, link and focus states. |
| Home — mobile | Portrait/name introduction followed by one product proof per row. | 390px reading order, touch targets, and image framing. |
| Links — desktop | Two readable groups with linked names directly above explanations. | Palette contrast, long destination names, and active/focus treatment. |
| Links — mobile | One reading column with the same grouped relationships. | 390px wrap and no clipped descriptions. |
| 320px stress | The header, quick links, and about actions retain wrap-safe gaps. | No horizontal overflow or obscured focus outline at 320px. |

## Interaction states

The active navigation item and project category use the direction's action
color. Hovering a product frame switches only its outline and surface to the
existing quiet-action tone; there is no new motion. Keyboard focus remains a
clear offset outline in that action color. Link underlines remain the primary
non-color affordance.

## Limits and status

This review stylesheet is isolated at `public/__profile_review/directions.css`.
It does not select a direction, alter production CSS or application code, or
claim a rendered result. A parent review still needs to load each direction,
inspect Home and Links at the listed widths, check 320px overflow and contrast,
and choose or reject a palette before any production change.

Parent refinement: removed inner padding after measurement showed it reduced the wide screenshots. The frame keeps the full available width; the taller aspect ratio gives Minder and The Rotation more image area without cropping. Capture checks wait for the computed palette to settle before reading or saving the frame.
