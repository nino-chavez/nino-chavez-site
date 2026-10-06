# Production visual packet

Target: the public `ninochavez.co` website, captured September 29, 2026. This packet contains evidence, not a recommendation.

The primary capture directory is `/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/evidence/`.

Use the `*-desktop-top.png` frames at 1440×900 and the `*-mobile-top.png` frames at 390×844. Files named `*-observed-800x423-top.png` are intermediate-width observations, not desktop captures. Images show the viewport, not the entire document. Do not infer everything below the captured frame is absent.

## Open these frames before reading rationale

- Home: `home-desktop-top.png`, `home-mobile-top.png`.
- Work entrance: `work-desktop-top.png`, `work-mobile-top.png`.
- Project detail: `rally-hq-desktop-top.png`, `rally-hq-mobile-top.png`.
- Sessions and a story: `sessions-desktop-top.png`, `session-detail-mobile-top.png`.
- Learn: `learn-desktop-top.png`, `learn-mobile-top.png`.
- Writing entrance: `writing-desktop-top.png`, `writing-mobile-top.png`.
- Article: `article-desktop-top.png`, `article-mobile-top.png`.
- Photography entrance: `photography-desktop-top.png`, `photography-mobile-top.png`.
- Album: `album-desktop-top.png`, `album-mobile-top.png`.
- Coverage: `coverage-desktop-top.png`, `coverage-mobile-top.png`.

The corresponding JSON files contain captured production DOM and computed information. Inspect them after the initial image judgment where a factual claim needs support. Appearance resolves to the frame; an image does not prove interaction behavior or conversion.

## Additional reading and collection frames

Eight additional viewport slices are now available in this packet's `evidence/` directory. Open them before finalizing:

- `home-proof-desktop.png`, `home-proof-mobile.png`.
- `work-records-desktop.png`, `work-records-mobile.png`.
- `writing-records-desktop.png`, `writing-records-mobile.png`.
- `article-body-desktop.png`, `article-body-mobile.png`.

`capture-manifest.json` records URL, dimensions, scroll position, capture time, and page height. These slices are current production captures, not local prototypes. Do not assume that a first-viewport composition represents the complete page.

## Review boundary

Reviewers inspect local files in a read-only worker. They do not run browsers, servers, installs, tests that write build output, authenticated accounts, or production actions. The parent owns live capture and any requested factual follow-up. A missing frame or unobserved behavior remains an explicit limit.
