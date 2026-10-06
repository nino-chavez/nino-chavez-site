# Three complete site concepts

September 30, 2026. Local design comparison, not a selected direction or production migration.

## Job

Help a cold visitor recognize Nino and explore his work; let a referred reader, photo visitor or product user get straight to what brought them here. The work includes operated products, AI-assisted thinking and making, public technical studies, and photography. The same real content is used in every concept. The parent owns synthesis and review.

## Surfaces

- **Home.** Personal identity, memorable image and meaningful entrances.
- **Building.** Products people can use, tools, studies, process and guides.
- **Writing.** Publication entry and a real article.
- **Article.** The Work Doesn’t End at Send, full existing text.
- **Photography.** Actual archive imagery and access to an event.
- **Album.** Millikin at North Central, September 23, 2026, 43 real photographs.
- **Product.** Minder by default; also The Rotation and the other supplied records.
- **Study.** One Cart Across Two Storefronts; source opening excerpt with full-source link and draft status.
- **About.** Source-supported biography and contact.

## Experience contract

Five questions: What did I arrive to read, see or use? Whose work is this? What can I do immediately? What related work is worth opening? How do I get back to where I was?

Character: photographic, authored, capable, curious, grounded.
Anti-goals: generic agency landing page, database dashboard, software-only identity, hidden photography, portfolio navigation imposed inside independent products.

Density: home gets one dominant authored composition with legible identity and navigation; discovery pages expose real named material in the first viewport; album images begin within the first phone viewport after compact identity and controls. Article text begins without a full-height cover. Reading lines are about 65–75 characters on desktop and comfortably sized on phones. Real long titles must fit.

Hierarchy: the person/image leads home; useful products lead Building; the article leads reading; photos lead albums; the question and argument lead studies. Draft/alpha status stays explicit and near the relevant object. Emotional impact is an earned contribution. Do not add repeated brand bars, taxonomy intros, tiny duplicate proof cards or decorative metrics.

Copy: use shared source content. Short navigational copy may be authored without inventing achievements, users, impact, revenue, publication dates or experience. Keep source claims and author attribution intact. This is documentation/product-navigation register, not an imitation of Nino's essay voice. The canonical voice guide's truth, subject-ownership and filler constraints transfer; essay rhythm does not.

Motion: native scrolling; no scroll-jacking, autoplay, hidden-on-load content or ornamental animation. Hover/focus states may change with reduced-motion support. Menu and image viewer must support keyboard dismissal and focus restoration.

States/actions: responsive menu open/closed; Building filter and no-match state; photo search, reset, viewer, previous/next and close; product actions open their real destinations. Download/save delivery is not being reimplemented. Public study status, source date and original link remain visible. A prototype is never evidence that private access or app functionality migrated.

Entry/return: all nine pages have direct query URLs; internal links preserve the concept; browser Back works. The comparison controls keep the selected surface when changing direction and allow full-width/phone views. Test gallery image dismissal and search clearing.

## Direction derivation

Possible worlds from the actual work: (1) photographic field portfolio, (2) independent editorial journal, (3) studio project index, (4) product launch collection, (5) photographer's contact sheet, (6) technical reference library, (7) chronological field notebook. These span photographic, editorial, product and retrieval traditions. A split hero and interchangeable card grid are the rejected default.

Impeccable's direction seed `f0b05910` assigned candidate 5. That contact-sheet structure is developed as C. A and B test the other two strongest distinct structures; the user's existing three-concept requirement takes precedence over presenting only one assigned option. The seed does not choose the user's winner. Reference authority is Nino's existing real imagery, material and tokens, with new composition/typographic relationships explicitly proposed for a rethink. No fresh authenticated Mobbin flow was inspected; its earlier category listing is not a design validation.

- **A — In the field.** A full-bleed photograph and name form the homepage composition. Large image-led sections unfold into work. Modest global bar on object pages; a dark photo experience, light readable essays, tangible product imagery. Risk: first-time visitors may see photography before realizing the breadth of the work.
- **B — The journal.** A typographic masthead, editorial feature with substantial panoramic imagery, and unequal columns connect thinking, products and public studies. Typographic reading hierarchy, deliberate rules and flat paper-like surfaces. Risk: editorial density may require more scanning.
- **C — The contact sheet.** A narrow identity/navigation rail, short personal introduction and varied-size real work/image tiles produce an immediately browsable body of work. Object pages keep an identifiable return path while giving the object space. Risk: the collection can feel like an archive unless the person remains clear.

The seed's decorative challengers are not copied: costume typography/stripes and word effects obstruct public reading and real photography. Their useful challenge is commitment: A must commit to image scale, B to editorial hierarchy, C to visible material density. The terminal-shaped challenger does not carry the photographic or cold nontechnical audience. This is a reasoned rejection of forms, not evidence from user testing.

## Build contract and ownership

Parent owns shared/content.js, shared/base.css, shared/common.js, comparison files, provenance, evidence and this brief. Each writer owns only its concept folder a/, b/ or c/: index.html, design.css, design.js and NOTES.md. No package install, app source edits, commits, pushes, deployment or network access. Writers are not alone; do not revert another session's work. Each writer runs in its own linked worktree seeded with this exact prototype fixture and current evaluation docs. The dirty production refit remains untouched in its original worktree.

Runtime: writers have no server, browser, port, database, Docker or fixture allocation. The parent serves the integrated comparison on port 4336 and owns its browser tabs. No shared browser state is mutated by writers. All locally started prototype review resources are recorded; the final preview stays up for Nino.

## Shared JavaScript contract

Every concept index loads ../shared/base.css then design.css. At body end load ../shared/content.js, ../shared/common.js, design.js in that order. design.js defines `window.renderConcept = function(page) { return htmlString; }`, then calls `Concept.mount(renderConcept)`.

`ConceptData` provides `assets`, `article`, `album`, `products`, `study`, `tools`, `guides`, `photoArchive`, `name`, `intro`, `about`, `location`. Inspect these fields directly. All asset URLs are relative to the concept directory. No mock statistics. Some product records have no image; render them intentionally as text.

`Concept` provides `escape(text)`, `href(page, extra={})`, `nav(activePage)`, `footer()`, `albumTools()`, `photoGrid()`, `viewer()`, `product()` (selected product from URL, default Minder), `productFilters()`, `mount(render)`. Nav emits a desktop link set and mobile details menu, both `.site-nav`; style as desired. Use `data-product` on product items and `data-search-text` if desired; filters match shared products. `photoGrid()` renders actual buttons with `data-view-photo`. Shared event code handles filter/search/viewer. You may compose your own markup using those attributes; do not replace helpers or data.

`page` is home, building, writing, article, photography, album, product, study, about. Product links use `Concept.href('product',{product: p.id})`; other links use `Concept.href('article')` etc. Use one h1/main. Add a skip link. All important internal navigation stays in this concept. External actions remain explicitly ordinary links. Article body comes directly from D.article.body; study is an explicitly labeled opening excerpt. Under the Minder image preserve its fictional-sample caption.

## Review and selection

Parent checks all routes, phone overflow, image loading, links, keyboard menu/viewer and search recovery, then opens desktop/phone captures. A cold reviewer receives captures and the five job questions, not these aesthetic rationales. One batched correction pass follows, with a bounded confirmation. Human selection and any graft from rejected concepts are recorded only after Nino chooses. This work does not pick a framework or claim a migration is complete.
