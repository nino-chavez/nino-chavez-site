# Wayfinding and task-journey review

- **Role**: 2 — Wayfinding / task-journey lead
- **Subject**: local production build, `http://localhost:3000`, branch
  `codex/ia-navigation-prototype`
- **Method**: live browser (`browse-nav` / `browse-eval`) against the running
  build, plus SSR probes via `curl` for byte-cheap case comparisons
- **Date**: 2026-07-30

Severity per `docs/AUDIT-PLAN.md` §Phase 2: **S1** blocks launch — a named
visitor job cannot complete, a rendered claim is false, or a route is broken.
**S2** an approved contract clause is violated. **S3** craft and consistency.
**S4** observation outside the contract.

---

## Part 1 — the five visitor jobs

Each job run cold from `/`. "Steps" counts clicks from the homepage to the
answer.

| # | Job | Click path | Steps | Outcome |
|---|---|---|---|---|
| 1 | Understand who Nino is and what connects the work | `/` (identity, practice claim, six-domain map) → header **About** → `/about` | 1 | **Pass.** `/` answers the "who" partially on its own; `/about` completes it with biography and working model. |
| 2 | See the complete body of work without guessing what was omitted | `/` → **ENTER THE WORK LIBRARY ↓** → `/work` | 1 | **Pass.** 32 records, "COMPLETE WORKING RECORD", no implicit selection. Every in-site refinement path works; a refinement URL typed by hand or copied from the contract does not — see [S2] case-sensitivity. |
| 3 | Inspect how the work gets made | `/` → **Ways of Working** card or header **Demos** → `/demos` | 1 | **Pass.** 12 sessions and 8 applied techniques, both collections complete on the page, distinction stated. |
| 4 | Find an applicable path for their own practice | `/` → *(no entrance in page body)* → header **Learn** → `/learn` | 1 | **Degraded.** The route works and holds seven tracks, but `/` never mentions it. See [S2] "no body entrance to Learn or About". |
| 5 | Read, view, or use a specific artifact | `/` → **Writing** → `/blog` → click a piece → `https://ninochavez.co/blog/…` | 3 | **Degraded.** Work and demo artifacts open locally in 2 steps. Every writing artifact and every photography destination leaves the origin. See [S2] "blog items are absolute cross-origin". |

### Ambiguous steps and dead ends

- **Job 4, step 1 is a guess.** The homepage body offers entrances to Work
  (five), Demos (three), Writing, and Photography, and none to Learn. The
  visitor must infer from the bare header label "Learn" that this is where a
  path for their own practice lives.
- **Job 2 dead-ends on a hand-typed refinement, not on any in-site path.**
  `/work?domain=volleyball` — the form the IA contract itself publishes —
  renders zero records for a domain that holds five. Every link the site
  actually emits uses the exact case and works. The escape hatch (**Clear
  filters**) is present, so it is a dead end the visitor can back out of, not a
  trap.
- **Arriving on a shared `/work` filter URL puts the results below the fold.**
  The filtered set is there and the count is right; the visitor just lands on
  the hero and has to scroll to discover it.
- **No dead ends found** in Demos, Learn, Search, About, Now, Links, or Privacy.
  `/demos#applied` and `/demos#sessions` both resolve and scroll correctly
  (verified: `scrollY` 3245 == `#applied` element top 3245).

### "Must not become" — every row scored

Source: `~/Workspace/dev/apps/website-nc/docs/IA-NAVIGATION.md`
§Page responsibilities.

| Route | Must not become | Verdict |
|---|---|---|
| `/` | the full portfolio, a services funnel, or a seven-way persona chooser | **Pass.** Four highlighted objects and six domain doors, not 32 records. No contact CTA in the header or body. No persona fork. |
| `/work` | a selected-work grid or a list split into tools/apps/sites | **Pass.** All 32 records render by default; form is a filter, never a top-level split. |
| `/work/:slug` | a required template for every object or an invented case study | **Pass.** `/work/fleet-observability` (internal, no destination) renders 643 chars across two sections; `/work/rally-hq` renders more. The template scales down rather than demanding filler. |
| `/demos` | a marketing teaser for an external subdomain | **Pass.** All 20 entries listed with local hrefs; no external subdomain promoted. |
| `/demos/:slug` | a generic work-detail page | **Pass.** Carries "SESSION 02 OF 12" and previous/next in declared sequence. |
| `/demos/applied/:slug` | a detached microsite | **Pass.** Breadcrumb to `/demos#applied`, a related session link, and next-technique navigation. |
| `/learn` | a homepage-level fork | **Pass** as a page — seven tracks with stated distinctions. It is not a fork because `/` does not present it at all, which is its own defect. |
| `/learn/:track` | a claim without receipts | **Fail on `/learn/strategist`.** One of its evidence links, `/blog#agentic-commerce-field-guide`, targets a fragment that does not exist on `/blog`. See [S2]. |
| `/blog/**` | a second personal homepage | **Pass** as a page. But every item link is an absolute cross-origin URL — see [S2]. |
| `/photography/**` | a second personal homepage | **Pass.** A labeled gateway: 13 local frames, five named doors, each marked "↗ (OPENS THE LIVE ARCHIVE)". Honest about leaving. |
| `/about` | a services pitch | **Pass.** Biography, working model, sibling links to Now and Links. No pitch, no rate card. |
| `/now` | a second work inventory | **Pass.** Four current-attention items that link out to `/work` rather than re-listing it. |
| `/links` | the primary navigation | **Pass.** A maintained destination list, mostly external, explicitly deferring the complete record to `/work`. |
| `/search` | an unscoped web search | **Pass.** Grouped Work / Demos / Writing / Pages with per-group counts, query preserved, and a zero state offering a clear. |
| `/privacy` | promotional content | **Pass.** Policy only. |

**14 of 15 pass. One fails** — `/learn/:track`.

---

## Part 2 — URL round-trip matrix

Tested per collection: **write** (does the filter UI put state in the URL),
**share** (cold navigation to the URL in the running browser), **reload**, and
**back** (browser-back immediately after filtering).

| Collection | Params tested | Write UI→URL | Share | Reload | Back | Result rail count |
|---|---|---|---|---|---|---|
| `/work` | `q`, `domain`, `state`, `form` | ✅ composes into one query string | ⚠️ lands filtered **for exact-case values only**, and below the fold | ✅ | ❌ **exits to `/`** | ✅ accurate (`2 records` for `?domain=Volleyball&state=live`) |
| `/blog` | `q`, `type`, `subject`, `year` | ✅ | ✅ **for exact-case values only** | ✅ | ❌ **exits to `/`** | ✅ accurate (`179 pieces` for `?type=Essay&year=2025`) |
| `/demos` | `q`, `type` | ✅ | ✅ **for exact-case values only** | ✅ | ❌ **exits to `/`** | ✅ accurate (`8 records` for `?type=technique`) |
| `/photography` | `src` | **N/A** | **N/A** | **N/A** | **N/A** | **N/A** |

### Back — the measurement

`history.length` is flat across every filter interaction, on all three
collections. The filter writes the URL with `router.replace()`, so no history
entry is created:

```
/work    : land 50 → domain=Volleyball 50 → q=rally 50 → state=live 50
/blog    : land 33 → type=Essay 33 → +year=2025 33
/demos   : land 39 → type=technique 39
```

End-to-end confirmation on `/work`, from a clean history: `/` (len 3) → click
**Work** (len 4) → apply `domain=Volleyball` (len 4, URL now
`?domain=Volleyball`, 5 rows) → **back** → lands on `/`. The same sequence on
`/blog` and `/demos` also lands on `/`.

Back does not merely skip past the filtered view — it skips past the unfiltered
collection too and ejects the visitor to whatever page preceded the collection.

### `/photography` — why N/A, with evidence

`/photography` exposes no visitor-facing filter. It has one search input whose
form `action` is `https://ninochavez.co/photography/explore`, and every gallery
destination is an absolute cross-origin URL. `src` is an attribution
passthrough, not a filter: `?src=work` changes only the value of a hidden field
and the `?src=` suffix appended to the five outbound links
(`…/albums?src=work`, `…/timeline?src=work`, …). Response size moves 13 bytes
between `?src=work` and `?src=home`.

The README's "URL-backed search and filtering" review item therefore cannot be
scored on this route in this build — the capability is not present locally.
Recorded as [S3] rather than a failure, because the page is honest about
handing off.

---

## Findings

### [S2] The filter vocabulary is case-sensitive, and the IA contract's own documented URLs return zero results

`/work?domain=volleyball` — copied verbatim from the contract — renders **zero
records** for a domain that holds five. So does
`/work?domain=practice&state=source`, also copied verbatim. Only the
exact-cased value matches.

**Why S2 and not S1.** No rendered surface on the site emits a lowercase filter
value: every `href` carrying `domain=`, `state=`, `form=`, `type=`, or
`subject=` across `/`, `/work`, `/about`, `/now`, `/links`, `/demos`, `/blog`,
`/learn`, `/search`, and `/photography` uses the exact-case form. So no path
from the homepage reaches the defect, and visitor job 2 completes in one step.
The failure is reachable only by a hand-typed URL or one copied out of the
approved contract, and it lands *visibly* empty with the required **Clear
filters** escape rather than silently unfiltered. That is a violated clause, not
a blocked job.

- **Contract**: `IA-NAVIGATION.md` §Work library → Filters and URLs — the
  published shareable forms are `/work?domain=volleyball`,
  `/work?state=internal`, `/work?form=app`,
  `/work?domain=practice&state=source`.
- **The contract does not agree with itself.** §Primary grouping lists the
  domain vocabulary **capitalized** (Practice, Local-first, Volleyball,
  Commerce, Media & assets, Writing); §Filters and URLs writes the same values
  **lowercase** in its URL examples. Neither spelling is authoritative, which is
  the argument for case-insensitive matching over picking a canonical case.
  `state` and `form` are consistent in both places (lowercase in the contract,
  lowercase in the data) and both work — **`domain` is the only mismatched
  field on `/work`.** On `/blog`, `type` and `subject` are capitalized in the
  data; on `/demos`, `type` is lowercase.
- **Evidence** (browser, rows = unique `/work/<slug>` links in `main`):

  | URL | rows | zero-state |
  |---|---|---|
  | `/work` | 32 | no |
  | `/work?domain=Volleyball` | 5 | no |
  | `/work?domain=volleyball` | **0** | **Clear filters** |
  | `/work?domain=Commerce` | 4 | no |
  | `/work?domain=commerce` | **0** | **Clear filters** |
  | `/work?domain=Practice&state=source` | 6 | no |
  | `/work?domain=practice&state=source` | **0** | **Clear filters** |

  Same defect on `/blog` (`?type=essay` and `?subject=commerce` → zero;
  `?type=Essay`, `?subject=Commerce` → 250 and 19 items) and on `/demos` in the
  opposite direction (`?type=session` → 12; `?type=Session` → **zero**).
- **Repro**: `browse-nav http://localhost:3000/work?domain=volleyball`
- **Root cause, at the source**: `app/components/WorkLibrary.tsx:65-67` matches
  with strict equality and no normalization —
  `(!domain || item.domain === domain) && (!state || item.state === state) && (!form || item.form === form)`.
  The vocabulary in `app/data.ts:1-8` is capitalized (`Practice`,
  `Local-first`, `Volleyball`, `Commerce`, `Media & assets`, `Writing`), while
  the contract publishes it lowercase. `app/components/DemoLibrary.tsx` and
  `app/components/WritingLibrary.tsx` use the same strict-equality shape.
- **Note — `FINDINGS.md` needs new evidence, not a new verdict.** The
  "URL-backed filters — Conforms at the server" row is **correct**: filter state
  is honored in SSR, not applied only after hydration. My own cold navigation to
  `/work?domain=Commerce` server-renders 4 rows, which confirms it
  independently. What needs replacing is the evidence cited for it —
  `/work?domain=commerce` (206 tags) and `/blog?type=essay` (171 KB) are both
  lowercase, so both measured the **zero-result page**. The numbers are real but
  they do not support the claim they are attached to. Swap in an exact-case URL.
- **Fix**: compare case-insensitively when matching `domain`, and audit the same
  for `type` and `subject` on `/blog`. Because the approved contract spells the
  vocabulary two different ways, normalizing both sides is the only fix that
  makes the doc's published URLs work without also having to amend the doc.

### [S2] Browser-back after filtering ejects the visitor from the collection

On `/work`, `/blog`, and `/demos`, applying a filter writes the URL without
creating a history entry. Pressing back therefore does not return to the
previous filtered view, and does not return to the unfiltered collection — it
leaves for whatever page preceded the collection.

A visitor who narrows `/work` three times and presses back once is on the
homepage with all three refinements gone.

- **Contract**: `AUDIT-PLAN.md` §Phase 1 — "browser-back that skips past the
  filtered view" is one of the three named round-trip failures.
  `OPEN-PRACTICE-ART-DIRECTION.md` — "a persistent result rail keeps the count
  and a direct return to the filters available deep in the archive"; back is the
  return gesture every browser user already has.
- **Evidence**: `history.length` flat at 50 across three `/work` filter changes;
  flat at 33 across two `/blog` changes; flat at 39 on `/demos`. Clean-history
  walk: `/` (3) → `/work` (4) → `?domain=Volleyball` (4) → back → `/`.
- **Root cause, at the source**: every collection's `setFilter` calls
  `router.replace(...)` — `app/components/WorkLibrary.tsx:50`,
  `app/components/DemoLibrary.tsx:79`, `app/components/WritingLibrary.tsx:83`.
  The **Clear filters** controls do the same
  (`WorkLibrary.tsx:176,249`, `DemoLibrary.tsx:169,271`,
  `WritingLibrary.tsx:201,278`), so clearing is also unwindable only by
  re-filtering.
- **Fix**: use `router.push()` for filter changes rather than `router.replace()`
  — optionally debounced so free-text typing coalesces into one entry.

### [S2] The homepage has no body entrance to Learn or About

`IA-NAVIGATION.md` names the homepage's required content as "entrances to Work,
Demos, Learn, Writing, Photography, and About." The rendered `main` on `/`
contains **zero** links to `/learn` and **zero** to `/about`. Both exist only in
the global header and footer, which every route carries.

This is the ambiguous step in visitor job 4. Learn is the route that owns "find
an applicable path for their own practice," and the page responsible for routing
into the model never names it.

- **Contract**: `IA-NAVIGATION.md` §Page responsibilities, `/` row — required
  content. Also §Product model — "The homepage introduces the model and routes
  into it."
- **Evidence**: every `main a[href]` on `/` — `/work` ×5, `/work/:slug` ×4,
  `/work?domain=…` ×6, `/demos` ×3, `/blog`, `/photography`. No `/learn`, no
  `/about`.
- **Fix**: give Learn a body entrance that says what it is (seven practitioner
  tracks), and give About one. The header label "Learn" alone does not carry the
  job.

### [S2] Blog items link to absolute cross-origin URLs instead of apex-relative paths

Every one of the 294 item links on `/blog` is an absolute
`https://ninochavez.co/blog/<slug>`. On any origin that is not production —
including the build under audit — clicking a writing result leaves the site.
Visitor job 5 cannot be completed against this build for the entire Writing
collection. `/photography` has the same shape for its five gallery
destinations.

- **Contract**: `IA-NAVIGATION.md` §URL and link rules — "Internal navigation
  uses apex-relative URLs even when a router serves another runtime."
- **Evidence**: `curl -s localhost:3000/blog | grep -o 'href="https://ninochavez.co/blog/[^"]*"' | sort -u` → 294.
  Same probe returns 0 on `/`, `/work`, `/demos`, `/learn`, `/about`; 5 on
  `/photography`.
- **Fix**: emit `/blog/<slug>` and `/photography/<path>`. The runtime split is
  the router's concern, not the link's. **Order matters** — `/blog/the-taste-gap`
  currently returns the bare 9-byte 404 already filed in `FINDINGS.md`, so the
  apex router must own `/blog/**` before the links are relativized, or this
  trades an off-site jump for a dead end.
- **Note**: `/photography`'s outbound links are visibly labeled "↗ (OPENS THE
  LIVE ARCHIVE)", so that route is honest about the handoff even while it
  violates the clause. `/blog`'s item links carry no such label.

### [S2] `/learn/strategist` cites evidence that lands nowhere

The track links to `/blog#agentic-commerce-field-guide`. That fragment does not
exist anywhere on `/blog`, so the link lands at the top of a 285-item page with
no indication of which piece was meant. The route's approved constraint is
precisely that it must not become "a claim without receipts."

The other three blog fragments referenced from Learn tracks
(`#the-scaffolding-the-agent-doesnt-build`, `#the-taste-gap`,
`#who-reviewed-the-reviewer`) all resolve.

- **Contract**: `IA-NAVIGATION.md` §Page responsibilities, `/learn/:track` row —
  "Must not become: a claim without receipts." Also §Related content — "Related
  links are explicit relationships in content data."
- **Evidence**: `grep -c 'id="agentic-commerce-field-guide"'` on the rendered
  `/blog` → 0. The other three → 1 each.
- **Fix**: repair or remove the reference, and add a build-time assertion that
  every `/blog#<id>` emitted from a Learn track exists in the rendered blog
  index.

### [S3] A shared `/work` filter URL lands above the fold it filtered

`/work?domain=Volleyball` — the exact form the homepage's six-domain map emits —
opens at `scrollY: 0` with the first result at 1064px, below an 844px viewport.
The visitor lands on the hero, the prose, and the unfiltered domain map, with no
signal at the landing position that a filter is active. "Share lands filtered"
is technically true while the page looks unfiltered.

`/work`'s own domain nav emits the fragment (`app/work/page.tsx:53` →
`/work?domain=${…}#work-library`) and lands correctly at `scrollY: 657` with the
first result at 407px, visible. The homepage's version omits it.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` — "a persistent result rail
  keeps the count and a direct return to the filters available deep in the
  archive." The rail is correct; the visitor just cannot see it on arrival.
- **Evidence**: cold `browse-nav` to both forms; `#work-library` exists and
  resolves. Without fragment: `firstResultVisible: false`. With fragment:
  `firstResultVisible: true`.
- **Fix**: append `#work-library` to the homepage's six domain links, or scroll
  to the result rail on load whenever any filter param is present — the latter
  also covers hand-typed and doc-copied URLs.

### [S3] Two demo slugs resolve to different records under both namespaces

`adopt-or-skip` and `config-probe` each exist as a session **and** as an applied
technique, with different content:

| Slug | `/demos/<slug>` | `/demos/applied/<slug>` |
|---|---|---|
| `adopt-or-skip` | "One Component I Didn't Already Have" | "Run the Subtraction Before You Install" |
| `config-probe` | "The Sycophancy Was in the Config" | "Bare-Arm Test Your Agent Config" |

A visitor who truncates `/demos/applied/adopt-or-skip` to `/demos/adopt-or-skip`
— the same hand-truncation behavior that `FINDINGS.md` already tracks for
`/demos/applied` — gets a 200 and a **different record**, with no signal that
they are not where they meant to be. A silent wrong answer is worse than the
404 the truncation case currently produces one level up.

- **Contract**: `IA-NAVIGATION.md` §Demos collection — Sessions and Applied
  techniques are two distinct collections; §URL and link rules — "Content type
  is represented by route ownership."
- **Evidence**: HTTP 200 on both paths for both slugs, distinct `<h1>` each.
  The other 18 slugs resolve in exactly one namespace.
- **Fix**: disambiguate the two colliding slugs, or have each detail page state
  its collection prominently enough that the wrong one is obvious. The page
  already carries "SESSION n OF 12" / "APPLIED TECHNIQUE n OF 8", so this is
  close to solved by content.

### [S3] `/photography` has no URL-backed filtering to round-trip

The README lists "URL-backed search and filtering" as a headline review item on
four collections. `/photography` implements none: no filter control, no
query-param filter, and a search box that submits cross-origin to
`https://ninochavez.co/photography/explore`. `src` is attribution metadata
forwarded to outbound links.

Filed as an observation about the review item's scope, not as a page defect —
the route is a deliberate, clearly-labeled gateway and it says so on screen.

- **Contract**: README §What this iteration asks you to review; the art
  direction's "persistent result rail" clause presumes a filterable collection.
- **Evidence**: form actions and outbound hrefs on `/photography` and
  `/photography?src=work`; response sizes 62211 / 62224 / 62214 bytes for no
  param / `src=work` / `src=home`.
- **Fix**: either scope the README item to the three collections that have
  filters, or state that photography's filtering lives in the gallery runtime.

### [S3] Section-owner navigation uses `aria-current="location"` where the contract specifies `"true"`

The active-state contract reads: `aria-current="page"` on an exact page,
`aria-current="true"` for a section owner. The implementation uses `"page"`
correctly and `"location"` for section owners (`Work` on `/work/:slug` and
`/photography`; `About` on `/now` and `/links`).

`location` is a valid ARIA token and arguably the better fit — the likely fix is
to amend the contract rather than the code — but as written the clause is not
met.

- **Contract**: `IA-NAVIGATION.md` §Active-state rules.
- **Evidence**: `aria-current` values across 10 routes. Everything else in that
  table conforms: Work stays active on `/photography`, About stays active on
  `/now` and `/links`, the identity link carries `aria-current="page"` on `/`
  only, and the visible label appends "Current page" / "Current section" so the
  state is not communicated by color alone.
- **Fix**: pick one and make the other match.

---

## Checked and conforming

Recorded so these are not re-raised.

| Check | Result |
|---|---|
| `/demos#applied` anchor | **Conforms.** Closes the sub-question `FINDINGS.md` left open on the `/demos/applied` 404. `#applied` and `#sessions` both exist and land exactly — `scrollY` 3245 matches the `#applied` element top of 3245; `#sessions` matches at 2242. |
| Share and reload, all three filterable collections | **Conform** for exact-case values. Cold navigation restores select values, search input, row set, and rail count; reload preserves all of them. |
| Filter UI writes to the URL | **Conforms.** Selects and the search box compose into one query string across all four `/work` params. |
| Result rail counts | **Conform.** `2 records` for `?domain=Volleyball&state=live` (2 rows), `179 pieces` for `?type=Essay&year=2025`, `8 records` for `?type=technique`. The count is published, not copied. |
| AND across fields | **Conforms.** `domain=Practice` 11, `state=source` 7, combined 6. |
| Zero-result state | **Conforms.** Explains the active refinements and offers **Clear filters**. |
| Header parity across runtimes | **Conforms.** Identical labels and order — Nino Chavez, Work, Demos, Learn, Writing, About, Search — on `/blog` and `/photography` as on the main app. |
| Footer | **Conforms** on all 12 routes checked, including `/photography` (the 1-link footer there is a section footer inside `main`; the 12-link `site-footer` is present below it). |
| `/search` | **Conforms.** Grouped Work / Demos / Writing / Pages, per-group counts, query preserved in the input, zero state with a clear action. Demos appear for `q=browser` and `q=agentic`. |
| Breadcrumbs | **Conform.** Present on detail routes only, absent from `/`, `/about`, `/now`, `/links`, `/privacy` and the collection landings. Ancestors are links, current item carries `aria-current="page"`. Shapes match the contract: `Work / Fleet Observability`, `Demos / Sessions / …`, `Demos / Applied / …`, `Learn / Architect`. |
| Sequence navigation | **Conforms.** Sessions expose previous and next in declared order; applied techniques expose a next technique and a related session rather than inventing a numbered sequence. |
