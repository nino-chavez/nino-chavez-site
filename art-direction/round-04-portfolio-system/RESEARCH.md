# Round 04 research — profile-led portfolio system

- **Status**: Evidence for the next art-direction round
- **Date**: 2026-07-29
- **Depends on**: acceptance of the multi-route IA and navigation prototype
- **Not a decision**: no palette, typeface, composition, or motion language is
  approved here
- **Candidate system**: `SYSTEM.md` and `prototype/index.html` translated this
  evidence into one reviewable direction; that candidate was withdrawn in the
  2026-08-04 bake-off. The system that shipped is `docs/claude-design-system.md`

## Research question

What should the next visual round inherit from Nino's saved references, existing
project systems, and the failure of the prior concepts if the result must read as a
personal portfolio rather than an editorial package?

## Sources

1. Chrome export: `/Users/nino/Documents/bookmarks_7_29_26.html`
2. Existing project design systems and style guides under
   `/Users/nino/Workspace/dev`
3. The implemented redesign prototype and the three Round 03 concepts
4. The accepted route and navigation contract in
   `/Users/nino/Workspace/dev/apps/website-nc/docs/IA-NAVIGATION.md`

## Bookmark corpus

Chrome's export does not preserve internal bookmark node IDs, so folder `1456`
cannot be mapped mechanically. **Design & UI/UX** is the unambiguous match: it is
the only design-focused folder and contains three groups with eighteen links.

### Tools

| Bookmark | What it is evidence for |
|---|---|
| [Aceternity UI](https://ui.aceternity.com/) | High-polish interaction patterns |
| [Aceternity components](https://ui.aceternity.com/components) | Reusable section and effect catalog |
| [Adobe Fonts](https://fonts.adobe.com/) | Typeface sourcing |
| [Adobe Fonts — distressed search](https://fonts.adobe.com/search/fonts?query=distressed&page=3) | A specific interest in rough, printed, vintage, or stencil-like display type |
| [Get Waves](https://getwaves.io/) | Organic SVG shape generation |
| [Haikei](https://haikei.app/) | Configurable abstract geometry and texture |
| [OG Image Maker](https://ogimagemaker.com/) | Repeatable social-preview production |
| [React Bits](https://reactbits.dev/get-started/index) | Expressive motion and interactive UI details |

### Inspiration

| Bookmark | What it is evidence for |
|---|---|
| [Awwwards](https://www.awwwards.com/) | A broad quality bar, not one aesthetic |
| [Dribbble dashboard search](https://dribbble.com/search/dashboard) | Product-like, information-dense interfaces |
| [Minimal Gallery](https://minimal.gallery/) | Functional minimalism and structured galleries |
| [Supahero](https://www.supahero.io/) | Clear, high-impact opening compositions |
| [Unsection](https://www.unsection.com/) | Modular page assembly and section taxonomy |

### Articles

| Bookmark | What it is evidence for |
|---|---|
| [50 website color schemes](https://visme.co/blog/website-color-schemes/) | Palette exploration, not a palette preference |
| [Card UI examples](https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-design) | Card hierarchy and browseable systems |
| [CSS clamp vs media queries](https://www.youtube.com/watch?v=pYW3O0AxpI8) | Fluid responsive implementation |
| [E-commerce UX tips](https://medium.com/@dollyborade07/10-e-commerce-ui-ux-design-tips-that-boost-conversion-rates-in-2026-be4193f0b62a) | Practical usability and conversion |
| [UI/UX conversion principles](https://medium.com/@dollyborade07/how-i-use-10-essential-ui-ux-design-principles-to-boost-conversions-in-2026-f7de0de8ee0f) | Clear action hierarchy |

### What the bookmarks do and do not say

Strong signals:

- This is a production and reference toolbox, not a moodboard of favorite sites.
- Component systems, browseable catalogs, cards, categories, and repeatable
  sections recur.
- Motion matters, but the saved tools make it available; they do not authorize
  ambient spectacle.
- The distressed-font search is the clearest deliberate aesthetic inquiry in the
  folder.
- Dashboard, card, and gallery references support a product-like portfolio more
  than a magazine or e-zine.

Medium signals:

- Get Waves and Haikei indicate interest in generative or organic geometry, but
  they may simply be utilities.
- Supahero indicates attention to the opening encounter, not necessarily a giant
  marketing hero.

Unsafe inferences:

- The black and purple defaults shared by several bookmarked tools are those
  products' brands, not Nino's palette preference.
- A saved component library does not authorize using its effects.
- The corpus cannot settle color.

## Existing project DNA

A scan across the demos, personal site, photography, Rally HQ, and Forge sources
found durable signals underneath their distinct project identities.

### Repeated

- **Body type**: Inter or a close system sans appears in most systems.
- **Evidence type**: JetBrains Mono or SF Mono repeatedly carries state, sequence,
  measurements, and receipts.
- **Display type**: condensed grotesks recur, although the exact family varies.
- **Geometry**: a 4px spacing base, 6–10px radii, hairline rules, and occasional
  accent edges are more stable than shadows or floating cards.
- **Color discipline**: neutral, dark-capable foundations and one controlled
  accent recur even though the accent itself changes by product.
- **Hierarchy**: strong names and titles, recessive chrome, compact metadata, and
  foregrounded product evidence.
- **Interaction**: short, contained state changes and image movement with
  reduced-motion support.
- **Proof**: screenshots, real interfaces, terminal output, and state labels do
  more work than atmospheric copy.

Representative evidence:

- `/Users/nino/Workspace/dev/apps/nc-demos/site/index.html`
- `/Users/nino/Workspace/dev/apps/nc-demos/demos/config-probe/deck.html`
- `/Users/nino/Workspace/dev/apps/website-nc/DESIGN.md`
- `/Users/nino/Workspace/dev/apps/photography/DESIGN.md`
- `/Users/nino/Workspace/dev/apps/rally-hq/DESIGN.md`
- `/Users/nino/Workspace/dev/tools/forge-site/archetypes/portfolio-brand.DESIGN.md`

### Project-specific, not personal-brand defaults

- Signal Dispatch's serif masthead, issue structure, coral/cyan palette, and
  periodical composition
- The current site's lime, grain, contact-sheet numbering, and craft colors
- Demo progress rails, scroll snapping, and rotating per-demo palettes
- Photography gold
- Rally HQ gold and navy
- Labs gradients
- Signal Forge violet
- Bento grids as a default composition

Those are valid local identities. Reusing any one as the universal shell would
make that project the visual owner of every other project.

## Why the previous concepts still read as editorial

The failure was encoded before palette and typography were chosen:

- `PRODUCT.md` asked for four to six selected objects.
- Round 03 fixed exactly six objects inside one 1600×1000 encounter.
- The implemented homepage used a masthead-like identity, a thesis, and a series
  of curated departments.
- The navigation was mostly a table of contents, and Demos still exited the site.
- Standardized media ratios, equal modules, captions, and small metadata made
  products feel like feature stories.

The Round 03 directions changed the surface treatment without changing the
artifact:

- **Reach Field** became a poster-directory.
- **Pressure Field** became an interactive cover or gallery carousel.
- **Open Reach** became a nameplate, thesis, and six-column campaign surface.

All three failed the scalability test: add twenty work objects and the visual
premise collapses.

## Constraints for the next visual round

### Do

- Make Nino, his role, and real global navigation legible in the first viewport.
- Design against the full Work library, not a perfect set of six.
- Let Work, Demos, and detail pages prove the system alongside Home.
- Let project screenshots, demo frames, photography, and outputs retain their
  native identities.
- Give every work record a clear name, truthful state, concise purpose, and one
  primary destination.
- Use metadata as useful evidence, not decorative magazine furniture.
- Use motion for navigation, filtering, focus, state changes, and relationships.
- Test the system with color removed and hover unavailable.

### Avoid

- A manifesto-only first viewport
- Masthead, issue, chapter, department, or contents-page composition
- Colored bands as the primary taxonomy
- One sports image setting the mood for the entire practice
- Universal tints or identical crops across unrelated products
- Tiny metadata beneath poster-scale headlines
- Whole-grid reallocation, carousels, or accordion movement as the main encounter
- Hover-only discovery
- Generic blobs, stock waves, glass, card lift, or ambient component-library effects

## Starting hypothesis, not art direction

The evidence supports a **profile-led portfolio with an instrumented project
library**:

- personal and visual at the entrance;
- stable global shell;
- product evidence in the foreground;
- complete, searchable library;
- concise state and form evidence;
- local identities contained rather than normalized away.

Possible ingredients to test, not inherit:

- a legible sans body system;
- a condensed display face used selectively;
- mono restricted to state, year, form, counts, and verification;
- one controlled interface accent;
- an occasional distressed or printed treatment for the name or a portable mark;
- one systematic geometric or textural signature, only if it is bespoke.

No palette should be derived from the bookmark folder. The approved portrait,
existing project media, and a deliberate palette study are better evidence.

## Role of Forge

Forge should codify an approved direction, not manufacture taste:

1. Write a visual brief with one signature, named page compositions, imagery
   rules, and motion rules.
2. Prototype distinct systems against identical real content and route states.
3. Select through live visual review.
4. Encode the winner as tokens and reusable components.
5. Validate contrast, type roles, state semantics, and exports.

## Required next-round artifacts

Do not make three more homepage posters. Each comparable direction must show the
same five surfaces:

1. Home first viewport
2. Work library with at least twenty objects
3. Demos collection
4. One Work or Demo detail
5. Mobile navigation and a filtered-library state

Pass/fail test:

> Remove color and hover, then add twenty work objects. If identity, navigation,
> state, and actions remain clear, the direction is functioning as a portfolio
> system rather than an e-zine cover.
