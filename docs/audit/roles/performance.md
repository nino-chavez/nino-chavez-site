# Performance & delivery — role 8 findings

- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Evidence**: `docs/audit/evidence/d0cfd0e/` (manifest + 36 rendered HTML), `dist/`, `public/`, `app/`
- **Plan**: [`docs/AUDIT-PLAN.md`](../../AUDIT-PLAN.md) · **Ledger**: [`docs/audit/FINDINGS.md`](../FINDINGS.md)
- **Method**: no browser. Byte figures are file sizes on disk or computed compression, never a production measurement.

## Measurement labels

The local server does not compress, so no transfer number in the evidence set is a
production number. Every compressed figure below is **computed by me** with
`brotli -c -q 11` over the artifact on disk. Cloudflare's edge compresses at a
lower quality level than q11, so treat these as a **floor**, not a prediction.
Target-independent figures — DOM node counts, request counts, asset bytes on
disk, and code-level costs — carry the findings.

---

## Payload table

DOM nodes from `evidence/d0cfd0e/manifest.json`. Raw bytes are the rendered HTML
on disk. **Flight** is the total bytes inside `<script>` tags — the serialized RSC
payload. **Markup** is everything outside them. Brotli is computed, q11.

| Route | DOM nodes | Raw HTML | Flight (RSC) | Markup | Brotli q11 (computed) |
|---|---:|---:|---:|---:|---:|
| `/blog` | 3,155 | 355.7 KB | 158.4 KB | 197.3 KB | **43.7 KB** |
| `/demos` | 363 | 50.0 KB | 29.7 KB | 20.3 KB | 9.9 KB |
| `/work` | 596 | 46.1 KB | 21.1 KB | 25.0 KB | 7.1 KB |
| `/privacy` | 216 | 29.8 KB | 17.5 KB | 12.3 KB | 5.0 KB |
| `/` | 264 | 29.2 KB | 17.9 KB | 11.4 KB | 4.7 KB |
| `/learn/architect` | 247 | 27.0 KB | 16.7 KB | 10.3 KB | 4.6 KB |
| `/about` | 219 | 26.8 KB | 16.9 KB | 9.9 KB | 4.7 KB |
| `/learn/*` (6 more) | 247 | ~26.8 KB | ~16.6 KB | ~10.2 KB | ~4.6 KB |
| **36 documents total** | 10,141 | 1,444 KB | — | — | **249 KB** |

**Filtered-URL rows are excluded from this table on purpose.** The three filtered
captures in the evidence set (`/blog?type=essay`, `/blog?q=agents&year=2026`,
`/work?domain=commerce`) do not measure what they appear to. See P1 — two of the
three render an **empty result set**, so their smaller markup is a defect, not
filtering working.

Two notes so nothing here reads as an error:

- Raw bytes are the **saved file on disk**; `manifest.json` measured the **worker
  response**. Hence 355.7 vs 353.5 KB on `/blog`. The ~2 KB delta is the capture
  method, not a discrepancy.
- `/privacy` ships 29.8 KB across 216 nodes — **more bytes than `/about` at 219
  nodes**, and more than every `/learn` track. A Utility route outweighing the
  Stage route is odd. `FINDINGS.md` already flags `/privacy` for a 220px Anton
  headline under the Anton-on-Utility S2; this is likely the same cause and is
  one more reason to settle that finding.

Compressed, the site is small. `/blog` at ~44 KB brotli is not a byte-weight
emergency. The durable costs are the 3,155-node tree, the hydration payload, and
the asset budget below.

---

## Font budget

Seven WOFF2 files ship in `public/fonts/`, **185,652 bytes**. Only four are
declared.

| File | Bytes | `@font-face`? | Family |
|---|---:|---|---|
| `inter-latin.woff2` | 48,432 | yes | Open Practice Body (var. 100–900) |
| `space-mono-latin-700-normal.woff2` | 16,724 | yes | Open Practice Evidence |
| `space-mono-latin-400-normal.woff2` | 16,520 | yes | Open Practice Evidence |
| `anton-400.woff2` | 12,004 | yes | Open Practice Hero |
| **Live subtotal** | **93,680** | | 3 families, 4 faces |
| `schibsted-grotesk-latin.woff2` | 46,864 | **no** | — dead |
| `jetbrains-mono-latin.woff2` | 31,340 | **no** | — dead |
| `bebas-neue-400.woff2` | 13,768 | **no** | — dead |
| **Dead subtotal** | **91,972** | | **49.5% of the directory** |

- **Families**: three, matching the locked art direction. No violation.
- **`font-display`**: `swap` on all four faces. Correct.
- **Subset**: filenames declare `-latin`, and the sizes are consistent with latin
  subsets (a full Inter variable is ~800 KB; this is 48 KB). `fontTools` is not
  installed in this environment, so I did **not** count glyphs — this is a
  size-and-filename inference, not a measurement. No `unicode-range` is declared
  on any face.
- **Loaded but unused per route**: all four faces are declared in one global
  stylesheet that all 36 documents load, so Anton is fetched on Utility routes.
  `/search` renders no display face at all (already filed in `FINDINGS.md` as the
  Anton-on-Utility inconsistency), so on that route Anton is a wasted request.
  Browsers only fetch a face when a rule matches, so the practical waste is
  bounded — this is a consequence of the S2 already filed, not a separate defect.

---

## Image budget

`public/` totals **6.5 MB** across 41 image files (16 JPEG, 17 WebP, 4 PNG, 4 SVG).

| Asset | Intrinsic | Bytes | Note |
|---|---|---:|---|
| `work/nino-illustrated-v1.png` | 1254×1254 | **2,495,054** | LCP element on `/` and `/about`, `fetchPriority="high"` |
| `og.png` | 1200×630 | 1,132,561 | crawler-only, not a visitor cost |
| `work/blueprint.png` | 512×512 | 231,764 | |
| `photography/p-06.webp` | 1080×1621 | 182,914 | largest of 17 photography WebPs |
| `work/demo-four-questions.jpg` | 880×900 | 108,770 | largest of 14 demo JPEGs |

- **`next/image` is not used anywhere.** All 39 `<img>` in the evidence set are
  raw tags: **0 use `/_vinext/image`, 0 carry `srcset`**. 26 set `loading`.
- **6 `<img>` have no `width`/`height`** — `work/photography.webp`,
  `work/rally-hq.webp` (×2), `work/signal-dispatch.webp`, and two remote
  `demos.ninochavez.co` images. Each is an unreserved box until the bytes land.

---

## Findings

### [S3] P1 — Lowercase filter URLs server-render an empty result set

`/blog?type=essay` renders `0 of 285 published pieces in view` plus a "No matches"
empty state. `/work?domain=commerce` renders `0 of 32 records in view`. Neither is
a filtered view; both are misses.

The filters compare with strict equality against capitalized data values:

- `app/components/WritingLibrary.tsx:95` — `(!kind || item.kind === kind)`, where
  `kind` values are `Essay`, `Whitepaper`, … (`app/writing.ts`).
- `app/components/WorkLibrary.tsx:65` — `(!domain || item.domain === domain)`,
  where `domains` are `Commerce`, `Local-first`, … (`app/data.ts:1`).

`states` are lowercase in the data, which is why `/work?q=agent&state=live`
correctly renders `1 of 32` and `/demos?type=technique` renders `8 of 20`. The
casing convention is inconsistent between fields, so the defect hits some filters
and not others.

The app's own controls emit correct casing (`href="/work?domain=Commerce"` in
`app/work/page.tsx:53` and `app/page.tsx:210`), so **no click path inside the site
reaches this**. It bites a hand-typed URL, a lowercased share, or an external
rewrite. That is why it is S3 robustness and not S2: no approved clause is
violated on any path a visitor actually walks. The wayfinding lead owns the final
call on visitor impact.

- **Contract**: README lists "URL-backed search and filtering" as a headline item
  on four collections; the art direction requires URL-addressable filters.
- **Evidence**: `evidence/d0cfd0e/html/blog_type_essay.html` and
  `work_domain_commerce.html`, markup outside `<script>`; `app/data.ts:1`,
  `app/components/WritingLibrary.tsx:95`, `app/components/WorkLibrary.tsx:65`
- **Fix**: match case-insensitively on read, and normalize to the canonical
  cased value when writing the URL — one shared helper across all four libraries.

### [S2] P2 — The writing dataset ships to the browser three times; the third copy is pure waste

`/blog` delivers the same 285 records in three places. (The rendered page and the
bundled snapshot both say **285**, not the 281 quoted in `FINDINGS.md` — the count
itself belongs to the claims auditor, but every figure below is against 285.)

| Copy | Where | Raw | Brotli q11 |
|---|---|---:|---:|
| Rendered rows | `blog.html` markup | 197.3 KB | — |
| RSC flight payload | `blog.html` inline `<script>` | 158.4 KB | — |
| **Static import** | `dist/client/assets/WritingLibrary-LryMvWEd.js` | **140.2 KB** | **32.7 KB** |

The third copy is deletable today with no architectural change.
`WritingLibrary.tsx` receives its data as the `items` prop
(`app/components/WritingLibrary.tsx:45`, destructured to `writingItems`) and uses
only that. But it also value-imports `writingKinds` from `../writing`, and
`app/writing.ts:1` does `import snapshot from "./writing-data.json"` at module
scope — so the bundler drags all 168,890 bytes of the JSON into the client chunk
that no code path reads. Verified: the client chunk contains 298 occurrences of
`publishedAt` and literal record excerpts.

Scale confirms it: `WorkLibrary` is 4,943 bytes and `DemoLibrary` 5,074 bytes.
`WritingLibrary` is **140,188** — 28× its siblings, for the same amount of logic.

The copy is also **stale**. `app/writing-data.json` carries 285 records; the page
fetches a live index at render (`getWritingSnapshot()`), so the bundled snapshot is
a fallback that ships to every visitor regardless.

- **Evidence**: `dist/client/assets/*.js` sizes; `app/writing.ts:1`;
  `app/components/WritingLibrary.tsx:45,63,90`
- **Fix**: move `writingKinds` and the exported types into a data-free module
  (e.g. `app/writing-kinds.ts`) that does not import `writing-data.json`, and
  import from there in the client component. Deletes ~135 KB raw / ~32 KB brotli
  from the client bundle and removes the stale-snapshot risk. `app/writing.ts`
  keeps the JSON import for the server fallback.

### [S2] P3 — The LCP image is a 2.5 MB PNG of an opaque RGB illustration

`public/work/nino-illustrated-v1.png` is 1254×1254, **2,495,054 bytes**, and is
preloaded with `fetchPriority="high"` on both `/` (`app/page.tsx:108`) and
`/about` (`app/about/page.tsx:171`). It is the largest single asset the site
serves and it gates the largest paint on the two most important routes.

PNG is the wrong container: `sips` reports `samplesPerPixel: 3`, `hasAlpha: no` —
opaque RGB, no transparency to preserve. Re-encoded at identical 1254×1254:

| Format | Bytes | vs. current |
|---|---:|---|
| PNG (current) | 2,495,054 | — |
| JPEG q82 | 411,491 | −83.5% |
| **WebP q82** | **147,468** | **−94.1%** |

WebP saves **2.35 MB** on a route-critical, high-priority fetch with no dimension
change. Images are already compressed, so the edge does not recover this.

- **Contract**: `docs/OPEN-PRACTICE-ART-DIRECTION.md` §First encounter names this
  asset as load-bearing — "the illustrated portrait occupies the right half of the
  stage as an intentional image field", "the portrait supplies presence." The
  clause establishes that the portrait is structural to the opening, not
  decoration that could be deferred. **No clause governs image encoding**, so the
  S2 severity is my judgment on measured delivery cost, not a conformance call.
  The byte figures are measurements; the ranking is mine.
- **Evidence**: `sips -g` on the file; re-encode run in this session
- **Fix**: convert to WebP and update both `src` values. The portrait renders into
  `.practice-portrait` (`inset: 0 0 0 50%`, `object-fit: cover`) and
  `.about-opening__portrait` (`width: 48%`) — so at 390px it is painted into a
  ~195px-wide box from a 1254px source. Serving a second, smaller source at mobile
  is the follow-on win; see P4 for the mechanism that already exists.

### [S3] P4 — The Worker wires a Cloudflare Images endpoint that nothing uses

`worker/index.ts:31` handles `/_vinext/image`, calling `env.IMAGES.input(...)
.transform({width}).output({format, quality})` against `DEFAULT_DEVICE_SIZES` and
`DEFAULT_IMAGE_SIZES`. The resize-and-reformat path is built, deployed, and
reachable.

Zero of 39 `<img>` in the evidence set route through it, and none carries a
`srcset`. Every visitor gets the full-resolution original at every width. The fix
for P3 and for the 17 photography WebPs (1080×1621 each, up to 183 KB) is
adoption, not new infrastructure.

- **Evidence**: `worker/index.ts:29-41`; `grep` over
  `evidence/d0cfd0e/html/*.html` — 0 matches for `_vinext/image`, 0 for `srcset`
- **Fix**: use `next/image` for content images, or hand-write `srcset` against
  `/_vinext/image?url=…&w=…&q=…`. Highest value on `/photography` (17 large WebPs
  in one grid) and the P3 portrait.

### [S3] P5 — Six images reserve no space, so their boxes shift on load

33 of 39 `<img>` set `width`/`height`. These six do not:

- `/work/photography.webp`, `/work/rally-hq.webp` (two instances),
  `/work/signal-dispatch.webp?v=372a9501`
- two remote images from `demos.ninochavez.co` (`adopt-or-skip/img/preview.jpg`,
  `twelve-messages/img/gritty.jpg`)

The remote pair is worse than the local four: a third-party origin with no
intrinsic size known to the layout engine, on `/demos/*` detail routes.

- **Evidence**: `grep -ho '<img[^>]*>' evidence/d0cfd0e/html/*.html | grep -v 'width='`
- **Fix**: add intrinsic `width`/`height` (or an `aspect-ratio` on the wrapper) to
  all six. The CSS already establishes ratios for some portrait slots
  (`app/globals.css:505` sets `aspect-ratio: 4/5`); extend that pattern rather
  than adding attributes ad hoc.

### [S3] P6 — 92 KB of font files ship in `public/` with no `@font-face`

`schibsted-grotesk-latin.woff2` (46,864), `jetbrains-mono-latin.woff2` (31,340),
and `bebas-neue-400.woff2` (13,768) total **91,972 bytes** — 49.5% of the font
directory — and are referenced by no stylesheet. They appear only in
`dist/server/index.js`, which is the asset manifest, not a load.

No visitor downloads them, so this is not a transfer cost. It is a deploy-payload
and a correctness cost: three fonts outside the locked three-family art direction
sitting in the served asset directory, one of them (Bebas Neue) a display face
that would read as an Anton substitute if anything ever referenced it.

- **Contract**: `docs/OPEN-PRACTICE-ART-DIRECTION.md` §Typography — Anton, Inter,
  Space Mono are the locked roles.
- **Evidence**: `public/fonts/` listing vs. the four `@font-face` blocks in
  `app/globals.css:3-33`
- **Fix**: delete the three files.

### [S3] P7 — No font is preloaded, but seven images are

Not one of the 36 documents preloads a font. The four faces are discoverable only
after the 148,859-byte stylesheet (21.2 KB brotli, computed) parses, which is
itself one network hop after the HTML. Anton is the display face carrying the
site's identity on nearly every route, so the first paint of the largest text on
the page is a guaranteed swap.

Meanwhile seven `<link rel="preload" as="image">` hints exist, including the 2.5 MB
PNG from P3 at `fetchPriority="high"`. The priority order is inverted: the heaviest
asset is promoted, the identity typeface is left to be discovered.

- **Contract**: `docs/OPEN-PRACTICE-ART-DIRECTION.md` §Typography — the display
  treatment is load-bearing identity, not decoration.
- **Evidence**: `grep -rl 'rel="preload"' evidence/d0cfd0e/html/` → 8 files, all
  image hints; no `as="font"` anywhere
- **Fix**: add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for
  `anton-400.woff2` and `inter-latin.woff2` (the two faces that paint above the
  fold on every route). Leave Space Mono unpreloaded — it carries dates and counts,
  which are secondary. Keep `font-display: swap`.

### [S4] P8 — `og.png` is 1.13 MB

1200×630, PNG, 1,132,561 bytes. Fetched by crawlers and unfurlers, not by
visitors, so it is not a page-weight line. JPEG q82 at the same dimensions is
173,058 bytes (−85%). Filed as an observation because the hosted preview is
auth-walled and unfurl behavior is explicitly out of this audit's reach.

- **Fix**: re-encode to JPEG or WebP if touched for another reason.

---

## Ledger correction for the engagement lead — not a severity item

`FINDINGS.md` → "Checked and conforming" → **"URL-backed filters"** should be
struck. The row reads:

> **Conforms at the server.** `/work?domain=commerce` server-renders 206 tags
> against 596 unfiltered; `/blog?type=essay` renders 171 KB against 353 KB.
> Filter state is honored in SSR, not applied only after hydration.

Both reductions are the **empty state**, not filtering. `/work?domain=commerce`
renders `0 of 32 records in view` and `/blog?type=essay` renders `0 of 285
published pieces in view`, each with a "No matches" block (P1). The tag and byte
deltas are real; the conclusion drawn from them is not.

Two consequences:

1. **Server-side filtering is still unverified.** The two captures that were meant
   to prove it prove nothing. `/blog?q=agents&year=2026` (6 of 285) and
   `/demos?type=technique` (8 of 20) do render real filtered results server-side,
   so the mechanism appears sound — but it should be re-stated on evidence that
   actually exercises it.
2. **Three filtered evidence documents are invalid** and need recapture with
   correctly-cased URLs: `blog_type_essay.html`, `work_domain_commerce.html`, and
   any screenshots taken at those URLs. Other roles reading those files will draw
   wrong conclusions about empty states and result counts.

## Extends the existing S3 on `/blog` — and narrows it

`FINDINGS.md` files `/blog` at 3,155 DOM nodes and hands the fix to this role as
"virtualize or paginate the rendered rows." Two corrections:

**The paint cost is already mitigated.** `app/globals.css:5370` already sets
`content-visibility: auto` with `contain-intrinsic-size: auto 112px` on
`.writing-room .writing-record`. Off-screen rows are already skipped for layout
and paint while staying in the DOM, searchable and URL-addressable. Recommending
virtualization would be recommending a heavier, contract-threatening version of
something already shipped. **Do not virtualize.**

**What remains is not layout.** It is (a) parsing 197 KB of markup into 3,155
nodes, (b) deserializing the 158 KB flight payload, and (c) hydrating a client
component whose `useMemo` filter runs over 285 records. Of those, only the flight
payload has real headroom, and it is largely inherent: the client component needs
the full record set in memory to filter instantly without a server round-trip,
which is exactly what the art direction requires. Serializing props from a server
component to a client component is how RSC transfers that set. **The HTML + flight
duplication is a structural property of this architecture, not a defect** — the
avoidable duplicate is the third copy in the JS bundle (P2).

The one further reduction that preserves the contract: trim what each record
carries into the client. The flight serializes `excerpt` for all 285 records, and
`searchableText()` (`app/components/WritingLibrary.tsx:38`) does use it, so it
cannot be dropped without weakening search. If search over excerpts is negotiable,
omitting that one field is the largest single lever left. That is a product call,
not a performance one.

---

## Worker and cold start

`dist/server/index.js` is 994,724 bytes and `dist/server/ssr/index.js` is 587,482.
Nothing in `worker/index.ts` runs at module scope beyond two imports — no
top-level fetch, no client construction, no data parsing. `dist/server/wrangler.json`
declares no KV, D1, R2, Durable Object, or queue bindings in use, `nodejs_compat`
is on, `observability` is enabled, and assets are served from `../client` by the
platform rather than through Worker code.

**No cold-start finding.** The one thing worth naming is not the Worker: `/blog`
awaits `getWritingSnapshot()` (`app/writing.ts`), a live fetch to
`ninochavez-blog.pages.dev` with `next: { revalidate: 300 }`, before it can render.

What I established: **`/blog` is not prerendered.** `dist/` emits no static HTML
for any route and no prerender manifest enumerates one, so the page is rendered
per request and the fetch sits on the render path. What I could not establish:
whether `revalidate: 300` is backed by a cache on this host. `dist/server/wrangler.json`
declares no KV, D1, or R2, but the Workers `caches` API needs no binding, so its
absence proves nothing. The rendered page shows `285 pieces`, matching the bundled
snapshot exactly, so the evidence cannot distinguish "fetch succeeded with
identical data" from "fetch failed into the fallback" — `writing.ts` catches and
`console.warn`s server-side, which would not reach the browser console capture.

**Verdict: unresolved, and it does not block launch on its own.** Worst case is a
300-second-amortized third-party dependency on one route, with a working fallback
already in place. It is worth one live check, not a launch gate.

- **Next step**: hit `/blog` twice on the deployed Worker and compare response
  times, or check whether the origin appears in the subrequest count. If
  `revalidate` is not cached, make the fetch non-blocking and render from the
  bundled snapshot first. Needs a live-origin check outside this role's
  no-browser scope.

---

## Not findings

Recorded so they are not re-raised.

| Check | Result |
|---|---|
| Compressed page weight | Small. 36 documents = 249 KB brotli q11 computed, total. `/blog` is 43.7 KB. Not a byte emergency. |
| CSS delivery | One 148,859-byte stylesheet (21.2 KB brotli, computed) shared by all 64 document loads — cached once, high hit rate. Splitting it per route would trade a cache hit for a request. Leave it. |
| Client JS baseline | `framework` 189,761 (50,954 brotli) + `index` 82,943 (21,848) + router/link/query ~18 KB. Normal for React 19 RSC. |
| `WorkLibrary` / `DemoLibrary` client cost | 4,943 and 5,074 bytes. Both take data via props and import no JSON. **These are the correct pattern** — P2 is the fix that makes `WritingLibrary` match them. |
| Font families | Three, as locked. `font-display: swap` on all four faces. |
| `content-visibility` on blog rows | Already shipped (`app/globals.css:5370`). |
| Worker module scope | Clean. No cold-start work. |
| Request count | 1 HTML + 1 CSS + 9 JS modulepreloads + fonts + images. No third-party scripts, no analytics, no web fonts from a CDN. |

---

## Ranked

| # | Sev | Finding | Fix size |
|---|---|---|---|
| P3 | S2 | 2.5 MB PNG is the LCP element on `/` and `/about`; WebP is 147 KB | re-encode + 2 `src` edits |
| P2 | S2 | 140 KB stale duplicate of the writing dataset in the client bundle | one module split |
| P7 | S3 | No font preload; 7 image preloads including the 2.5 MB PNG | 2 `<link>` tags |
| P4 | S3 | Cloudflare Images endpoint built and wired, used by nothing | adoption |
| P5 | S3 | 6 images reserve no space | attribute pass |
| P1 | S3 | Lowercase filter URLs render empty; no in-site path reaches it | one shared helper |
| P6 | S3 | 92 KB of undeclared font files in `public/` | delete 3 files |
| P8 | S4 | `og.png` 1.13 MB | opportunistic |

Two items sit outside this table because they are not site defects: the **ledger
correction** above (strike one conformance row, recapture three evidence
documents) and the **`revalidate` check** (unresolved, not a launch gate).

Do P3 and P7 together — they touch the same two routes and the same `<head>`, and
P7's fix is partly undone if the 2.5 MB preload stays.
