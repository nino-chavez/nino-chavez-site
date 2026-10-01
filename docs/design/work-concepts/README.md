# Work entrance concepts

Three comparison-only HTML prototypes for `/work`. Serve the repository root and open:

Status: Nino rejected all three on September 29, 2026 and challenged the page's purpose. No candidate was selected or implemented. The collection's role and prominence are under review before further design work.

- `docs/design/work-concepts/index.html`
- `docs/design/work-concepts/a.html`
- `docs/design/work-concepts/b.html`
- `docs/design/work-concepts/c.html`

The files load the repository's fonts from `public/fonts`; no production route imports them. `comparison.html` shows the captured phone views together.

## Source and preservation

`data.js` is a read-only snapshot of all 29 `workItems` in `app/data.ts`, recorded at `8cc4079ff461bb78730dede01f3069698f656576` (the latest commit touching that registry when this comparison was made). It contains the true slug, name, claim, domain, status, type, and update date. Work links use `/work/<slug>` so the prototypes do not make a second destination model.

- A preserves the compact proportional domain map and puts the complete grouped collection immediately after it.
- B preserves the domain model but gives each domain a named, current item and direct access to its complete group. Its useful graft is concrete proof beside breadth.
- C preserves domains as a browse mechanism while moving the full list into the first collection surface. Its useful graft is the persistent visible domain chooser.

All three preserve URL filters (`q`, `domain`, `state`), clear recovery, a useful empty state, native links, and `popstate` rendering for browser Back. They are intentionally not a production recommendation or an amendment to the accepted atlas-before-registry owner.
