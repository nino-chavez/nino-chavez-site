# First-encounter review — Open Practice redesign

Reviewer: first-encounter-strategist
Evidence: `docs/audit/evidence/d0cfd0e/` (screenshots, rendered HTML, route-report.json)
Pages: `/`, `/work`, `/about`. Widths: 390, 1280.
Contracts scored: `PRODUCT.md` §First-encounter promise, §Non-goals, §Success criteria;
`docs/OPEN-PRACTICE-ART-DIRECTION.md` §Functional model, §Page expression model, §First encounter.

---

## The five-second answer, per page

### `/` — 1280

**What the visitor thinks this site IS:** a personal portfolio site belonging to
one named individual. Correct read. No non-goal misfire.

Literal on-screen words in the first viewport: `PRODUCT ARCHITECT + BUILDER` /
`NINO CHAVEZ` / `I build the system, run the operation, and keep the evidence.` /
`Product work, operating systems, and small live businesses are where I test how
agent-assisted practice holds up in real conditions.` / `ENTER THE WORK LIBRARY ↓`
(bottom edge) / a photographic portrait occupying the right half / a Rally HQ
tournament scoreboard in the lower-right, clipped by the fold with its
`ON THE COURT / Rally HQ` label sitting on the last ~16px of the viewport.

Promise scorecard at 5s:
1. who Nino is — **yes**, name at display scale plus portrait.
2. what he does — **yes**, `I build the system, run the operation, and keep the evidence.`
3. what he has made — **partial**. One proof surface is present but the object is
   not named until the very bottom pixel row; the visitor sees an unattributed
   scoreboard.
4. which object to open next — **partial**. `ENTER THE WORK LIBRARY` is the
   "direct library action" §First encounter asks for and it is present; the
   clause pairs it with a named proof object, and that object's label
   (`Rally HQ →`) is clipped.

### `/` — 390

**What the visitor thinks this site IS:** still a personal site — the h1 is the
name and the claim is first person — but the read is thinner, and the meta strip
(`OPEN PRACTICE / CHICAGO / 32 RECORDS / HUMAN-LED`) plus `ENTER THE WORK LIBRARY`
pushes toward "a catalogue of records" before any record is shown.

First viewport contains: the review banner (3 wrapped lines), `Nino Chavez` +
`Menu`, the meta strip, `PRODUCT ARCHITECT + BUILDER`, `NINO CHAVEZ`, the claim,
the support paragraph, and `ENTER THE WORK LIBRARY ↓` at the bottom edge.
**No portrait** (only a faint blue arc bleeding behind the paragraph) and
**no proof surface**.

Promise scorecard at 5s:
1. who Nino is — **partial**, name only, no face.
2. what he does — **yes**.
3. what he has made — **no**.
4. which object to open next — **no** named object.

### 30-second read on `/`

At 1280, one scroll reaches the portrait's lower half, the `Rally HQ →` proof
label, the four-item `CURRENT WORKING SET` (Blueprint / Film Room / Rally HQ /
Ways of Working with `SOURCE`, `BUILDING`, `LIVE`, `LIVE` states), then
`Evidence in use` — three real-image cards (Rally HQ, Signal Dispatch, Nino
Chavez Photography) each with a form label, a plain description, a live state,
and one action. All four promise items are answered by the end of the second
viewport. At 390 the same content requires roughly four viewports of scroll:
portrait, proof surface, working set, evidence bench.

### 2-minute read on `/`

Full text confirms the page carries: profile, current working set, evidence
bench, `32 records across 6 domains` with six domain tiles, and a Ways of Working
block. The claim, the support paragraph, and `Enter the work library` are all
real text nodes, not baked into an image — the art direction's readable-HTML
clause holds.

---

### `/work` — 1280

**What the visitor thinks this site IS:** a categorised index of one person's
projects — a catalogue, not a portfolio page. This read is sanctioned:
art direction §Functional model calls Work "an atlas before it is a registry"
and PRODUCT.md §Success criteria wants `/work` to expose the full public
inventory. Not an S1.

First viewport: `COMPLETE WORKING RECORD` / `WORK` / `Products, operating
systems, live businesses, and the tools used to make them hold together.` /
`Start with a domain to understand the range, or move directly to the complete
searchable record.` / `BROWSE ALL 32 RECORDS ↓` / six colour-field tiles —
`Practice 11 RECORDS`, `Local-first 3 RECORDS`, `Volleyball 5 RECORDS`,
`Commerce 4 RECORDS`, `Media & assets 6 RECORDS`, `Writing 3 RECORDS`.

Promise scorecard at 5s: (1) who — **N/A**, not this page's job; the name is
present at wordmark scale in the header. (2) what he does — **yes**, via the
claim line. (3) what he has made — **categories only**; not one project is named
and no object is shown. (4) which object next — **a domain, not an object**.

### `/work` — 390

First viewport ends inside the *first* tile. `Practice` is the only domain
visible; the other five require roughly five more viewport-heights. The atlas
opening — six domains and their relative weight, established before the registry
— does not exist at 390.

### 30s / 2min on `/work`

Scrolling reaches a state disclaimer (`Nothing is hidden for failing to look
finished. State tells you what can be opened, installed, read, or inspected now.
It does not decide whether the work belongs.`), then `Find a record.` with
search + domain/state/form selects, a `32 OF 32 RECORDS IN VIEW` rail, and
grouped record rows (`Ways of Working`, `Blueprint`, `Browse Tool`, `Specchain`,
`Claude Recall`, …) each with number, state, form, date, description, and an
`OPEN →` action.

`route-report.json` records **`imgCount: 0` for `/work` at both 390 and 1280**.
The complete working record contains no photograph or screenshot at any scroll
depth.

The server-rendered `html/work.html` contains the literal string
`Loading the complete library…` in place of the records; the 32 rows are
client-rendered after hydration.

---

### `/about` — 1280 and 390

**What the visitor thinks this site IS:** a personal site — the strongest and
most correct 5-second read of the three pages, at both widths.

First viewport (both widths): `ABOUT / DURABLE PROFILE` · `CHICAGO` ·
`BUILDING SINCE 1999` / `NINO CHAVEZ` (eyebrow) / `NINO CHAVEZ` (display) /
`Product architect by trade. I also build software, run volleyball tournaments,
photograph them, write, and DJ.` / `I live in Chicago. I've been writing code
since 1999. The work shows how I think; this page supplies the background.`
At 1280 the illustrated portrait fills the right half. At 390 only the crown of
the head appears at the very bottom edge.

Promise scorecard at 5s: (1) who — **yes**. (2) what he does — **yes**, the most
concrete statement anywhere on the site. (3) what he has made — **N/A**, not this
page's job. (4) which object next — **N/A**; the routes out (`Now`, `Links`,
`Work`, `See the method in Blueprint`, `Watch the operating sessions`) all sit
below the fold, which is appropriate for a biography page.

The composition is near-identical to `/`: same eyebrow slot, same Anton name
block at the same scale, same claim slot, same right-half portrait.
`route-report.json` confirms both routes report `h1: ["NINO\nCHAVEZ"]` and the
identical heading order `H1H2H2H2H2`.

30s / 2min: `01 / Biography — The short version`, a metadata rail
(`Current role / Product Architect`, `Organization / commerce.com`,
`Home / Chicago`, `Software practice / Since 1999`), `02 / Throughline — What
connects the work` (Architecture, Live operations, Photography, Writing, Music,
each with an action), `03 / Working model — More execution. Same
accountability.`, and `04 / Continue — Choose the context you need`.

---

## How the promise is scored

The four-item first-encounter promise is scored **in full only on `/`** — the
front door is the page the promise is written about. On `/work` and `/about`
only the items that page's job owns are scored; the rest are **N/A, not failed**.
`/about` is not supposed to show the work, and `/work` is not supposed to
introduce the person. A "no" below is always a page failing at its own job.

## No S1

All three pages read, at five seconds, as what `PRODUCT.md` says the site is:
one named person's portfolio and work catalogue. None reads as an agency site, a
magazine, a blog, or a services funnel. The `/work` opening's six colour tiles
were tested against the agency-capabilities-grid reading and rejected — the
`COMPLETE WORKING RECORD` eyebrow and per-tile `N RECORDS` counts mark it as a
catalogue, and art direction §Functional model sanctions the atlas form
explicitly.

## Findings

```
[S2] / — at 390 the portrait and the proof surface both fall out of the first encounter
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Functional model — "Home is a working
          stage. Identity, portrait, claim, and one live proof surface share the
          first encounter."
Evidence: shots/index-390-fold.png (nothing but type and a faint blue arc);
          shots/index-768-fold.png (all four elements inside the fold)
Repro:    390w, no scroll. Compare 768w, where the clause is satisfied.
Note:     ~175px of chrome (review banner, header, meta strip) plus a ~600px
          hero text block exceeds the 844px viewport before any image is placed.
          The banner is not the cause — removing all three of its lines still
          leaves the portrait below the fold. The finding holds either way.
Fix:      the constraint is the text block's height at 390, not the image's
          position. Either the claim or the support paragraph has to give up
          vertical space for evidence to share the viewport.
```

```
[S2] /about — the opening is compositionally the same page as /
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Page expression model — "Page-level
          sameness is a defect when the visitor jobs differ."
Evidence: shots/about-1280-fold.png vs shots/index-1280-fold.png;
          route-report.json — both routes report h1 ["NINO\nCHAVEZ"] and the
          identical heading order H1H2H2H2H2
Repro:    load /about cold at 1280 or 390 without seeing / first
Note:     both are Stage-model pages, so a shared identity is correct. The defect
          is that the compositions are interchangeable: same eyebrow slot, same
          Anton name block at the same scale, same claim slot, same right-half
          portrait, same h1 string. A cold visitor arriving on /about from a link
          has no signal they are not on the front door.
Fix:      differentiate the openings by job. / is the encounter and carries the
          proof surface; /about is the record of a person and could lead with the
          biography rail, the date range, or the portrait at a different scale
          rather than restating the front door.
```

```
[S2] /work — the complete working record contains no images at any scroll depth
Contract: PRODUCT.md §Success criteria — "real screenshots and photographs carry
          more visual weight than decorative typography";
          PRODUCT.md §Content model — a work object has "a real visual when the
          object has one."
Evidence: route-report.json — /work reports imgCount: 0 at both 390 and 1280;
          shots/work-1280-fold.png (six flat colour fields);
          shots/work-1280-full.png (32 text rows, no visuals)
Repro:    /work at any width, any scroll position
Note:     art direction §Functional model sanctions "proportional fields" for the
          atlas opening, so the imageless *opening* is defensible. The registry
          beneath it is not covered by that licence: 32 objects, several of which
          have real screenshots already in the repo and on the homepage, render
          as text only. The homepage shows Rally HQ, Signal Dispatch, and the
          photography frame as real images; /work shows none of them.
Fix:      carry the existing object visuals into the record rows, at least for
          the objects that already have one.
```

```
[S2] /work — at 390 the atlas opening does not exist; one of six domains is visible
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Functional model — "Work is an atlas
          before it is a registry. The opening establishes the six domains and
          their relative weight so a first-time visitor can understand the range
          before meeting search, state, form, and thirty-two records."
Evidence: shots/work-390-fold.png (fold ends inside tile 01 / 06);
          scratchpad crop of work-390-full.png (tiles stack full-width, roughly
          equal height, weight carried only by a thin bar and a count label)
Repro:    390w, no scroll
Note:     at 1280 all six are in the first viewport and the proportional sizing
          reads. At 390 the range arrives after ~five viewport-heights, and the
          relative weight the clause asks for is flattened by the stack.
Fix:      the range has to be legible at 390 before the registry — a compact
          six-item form that fits one viewport, with the counts doing the
          proportional work the tile areas do at 1280.
```

```
[S2] / — the singular proof surface is under-weighted past the point of function
Contract: OPEN-PRACTICE-ART-DIRECTION.md §First encounter — "a smaller Rally HQ
          surface provides immediate, actionable proof without becoming a third
          hero."
Evidence: shots/index-768-fold.png (clause satisfied: scoreboard, "ON THE COURT",
          "Rally HQ →", and "ENTER THE WORK LIBRARY" all inside the fold);
          shots/index-1280-fold.png ("ON THE COURT / Rally HQ" on the last ~16px);
          shots/index-1728-fold.png (a corner of the scoreboard, no label, no
          library action in the viewport)
Repro:    900px-tall viewport at 1280 and 1728
Note:     the clause has two halves. The second half holds at every width — the
          surface never becomes a third hero. The first half fails above 768:
          the proof is present but unattributed, so it is not actionable and the
          visitor cannot name the object it shows. The composition is tuned for
          768 and degrades in both directions, because the hero text block grows
          with width while the viewport does not.
Fix:      bind the label and the surface so they enter the fold together, and
          hold the pair inside a 900px viewport at 1280 and above.
```

```
[S3] / — the singular proof surface is duplicated twice more on the same page
Contract: OPEN-PRACTICE-ART-DIRECTION.md §First encounter — "The proof surface is
          singular."
Evidence: html/index.html — rally-hq.webp appears twice (hero, and the first
          "Evidence in use" card); "Rally HQ" also appears as item 03 of
          "Current working set"
Repro:    / at 1280, scroll through the second viewport
Note:     the hero itself is compliant — one surface, no collage. But the same
          screenshot reappears within a viewport and a half, and Rally HQ is
          named three times before the work library. Singularity in the hero is
          spent immediately after it.
Fix:      let the evidence bench lead with an object the hero has not already
          spent, or vary the Rally HQ frame so the two are not the same image.
```

```
[S3] /work — the registry is client-rendered; the atlas opening is not
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Functional model — "The complete record
          remains present, searchable, and honestly labeled beneath that
          orientation."
Evidence: html/work.html — the six domain tiles server-render in full
          ("01 / 06 Practice … 11 records" through "06 / 06 Writing"), but the
          32 record rows are replaced by the literal string
          "Loading the complete library…"; route-report.json shows bodyLen 6212
          after hydration
Repro:    read html/work.html without executing scripts
Note:     the first encounter on /work survives without JS — the atlas, the claim,
          and "Browse all 32 records" are all in the served document. Only the
          registry is deferred. Filing at S3 for that reason. Delivery cost and
          the no-JS case belong to the performance and accessibility roles.
Fix:      out of this role's scope; flagged for the reviewer who owns delivery.
```

```
[S4] / — the meta strip announces "32 RECORDS" above the first named object
Evidence: shots/index-390-fold.png, shots/index-1280-fold.png — the strip
          "OPEN PRACTICE / CHICAGO / 32 RECORDS / HUMAN-LED" sits above the name
Note:     no clause covers this. Observation only: at 390, where no image reaches
          the fold, an inventory count is the first concrete fact the visitor
          gets, which leans the read toward catalogue before portfolio.
          PRODUCT.md §Success criteria wants selected work to read "as portfolio
          evidence, not as an archive," but that clause is about the selected-work
          section, not the meta strip. Operator's call.
```

```
[S4] all routes — the review banner costs three wrapped lines of the 390 viewport
Evidence: shots/index-390-fold.png, shots/work-390-fold.png,
          shots/about-390-fold.png
Note:     "PRIVATE ART-DIRECTION REVIEW — OPEN PRACTICE — PRODUCTION REMAINS
          UNCHANGED" wraps to three lines at 390 and one at 1280. Presumed not to
          ship. Recorded so the 390 fold measurements above are reproducible;
          none of the S2 findings depend on it.
```

## Clauses checked and passing

- **"The claim and direct library action remain readable HTML, not words baked
  into an image or video"** (§First encounter) — passes. `route-report.json`
  resolves the claim and `Enter the work library` as text nodes in
  `Open Practice Body`; only "Nino" and "Chavez" use the display face.
- **"The name leads the hierarchy, the portrait supplies presence"**
  (§First encounter) — passes at 768 and above. The name is the h1 at display
  scale and the portrait never competes with it.
- **"A collage of several tilted project frames"** (§First encounter) — absent.
  One surface in the hero at every width.
- **PRODUCT.md §Non-goals** — no editorial devices (issue departments, numbered
  chapters, mastheads, contact sheets) on any of the three pages; no services
  language; no contact funnel.

---

# Deep-link arrival

`PRODUCT.md` §Primary audiences lists first: "Someone following a link to Nino or
to one named project." For that visitor the detail page **is** the first
encounter — they have never seen `/`. This section scores four detail routes as
cold landings.

Contracts: `IA-NAVIGATION.md` §Page responsibilities `/work/:slug` — "What is
this object and what is its honest state?" requiring *concise claim, state, form,
provenance or receipts when useful, one primary destination, related
demos/writing*; `/demos/:slug` — "Show me this session in sequence" requiring
*existing session content, sequence position, previous/next, related techniques
and work*. And `OPEN-PRACTICE-ART-DIRECTION.md` §Functional model — "Detail pages
are records. Context, public surface, current limit, relationships, and the next
honest action stay close together."

**Severity scale.** Scored on this role's brief — S1 is "the visitor cannot answer
a promise item at all, or misreads what the site is." `FINDINGS.md` uses a
different S1 ("blocks launch — a named visitor job cannot complete, a rendered
claim is false, or a route is broken"). One item needs the lead's call on merge:
`/demos/twelve-messages` renders `02 / Evidence — What the session shows: The
verbatim conversation, a five-principle method, the pipeline that runs it, and
two honest failures` over content that is neither present nor linked. On this
brief's scale that is part of the F4 arrival cost below. On `FINDINGS.md`'s scale
it may qualify independently as **a rendered claim that is false**.

## Shared shape

All four are the same three-part record: breadcrumb → eyebrow + h1 + claim +
right-hand metadata rail → numbered sections → footer. `bodyLen` runs 906–1363
characters; these are deliberately thin pages, which suits the record model.

## The five-second answer, per page

### `/work/rally-hq` (state: live) — 1280

**What the visitor thinks this page IS:** a product page for Rally HQ. Breadcrumb
`Work / Rally HQ`, eyebrow `VOLLEYBALL`, `Rally HQ`, `Tournament registration,
brackets, schedules, and live scoring in one public event page.`, a metadata rail
reading `State live` / `Form site` / `Record updated 2026-07-26`, then a real
full-width screenshot of the Sand Slam Open scoreboard.

**Q1 — whose site is this, and what is the parent practice?** Partially. The only
identity in the first viewport is the `Nino Chavez` header wordmark and the nav.
Nothing on the page says Nino made Rally HQ — no first-person voice, no byline,
no "from the practice of" line. The word "portfolio," the word "practice," and
the claim `I build the system, run the operation, and keep the evidence.` are all
on `/`, which this visitor never saw. The parent practice is inferable from the
nav labels (`Work Demos Learn Writing About`) and from the footer's
`Product architect and builder in Chicago` — both require work.

**Q2 — honest, secondary state?** Yes. `live` sits in small mono in the rail, and
`03 / Limit` says `Live means the destination is operating; it is not a claim of
universal availability or outcome.` Exactly the register `PRODUCT.md` asks for.

**Q3 — one obvious next action, leading somewhere real?** `Open Rally HQ ↗` is
real, but it is below the fold — the screenshot occupies the rest of the first
viewport and the action sits under it.

**Q4 — upward pull?** `← Return to the complete library` at the page foot. No
related demos and no related writing, which `IA-NAVIGATION.md` §`/work/:slug`
names as required content. Rally HQ appears in Ways of Working sessions and on
the homepage evidence bench; none of that is reachable from its own record.

### `/work/fleet-observability` (state: internal) — 1280

**What the visitor thinks this page IS:** a catalogue entry for something they
cannot use. Correct, and the page earns it.

**Q2 is the question this page exists to answer, and it answers it well.** At
1280 the entire record fits above the fold: `State internal` in the rail,
`02 / Public surface — What is available: There is no public destination attached
to this record. Its purpose and current state are the authorized surface.`, and
an inset panel reading `No public destination.` The visitor understands they
cannot use it **before** looking for a link, because there is no link to look
for. `03 / Limit` adds `Implementation detail remains intentionally private. No
client or employer claim is inferred.` This is the strongest page of the four and
the clearest expression of PRODUCT.md's "state and availability are honest but
visually secondary" anywhere in the evidence set.

**Q1** — same as Rally HQ: identity at wordmark scale only.
**Q3** — there is deliberately no primary destination, which is honest, but it
also means the only action is `← Return to the complete library`.
**Q4** — same single upward link. No related demos or writing.

### `/demos/twelve-messages` (a session) — 1280

**What the visitor thinks this page IS:** a description of a session they cannot
watch, with a broken image where the evidence should be.

Breadcrumb `Demos / Sessions / Twelve Messages`, `SESSION 01 OF 12`,
`Twelve Messages`, the claim, and a rail reading `Collection Ways of Working` /
`Record S01` / `Format Session`. Below that, a full-width dark field containing a
**broken-image placeholder** and its grey alt text, `Published Instagram story
rendered by the demo's pipeline`.

**Q3 — one obvious next action?** No. The page's outbound links are
`Return to all sessions` and `Next session → The Browser Is a Shell Command`.
There is no player, no transcript, and no link to the session on Ways of Working.
`02 / Evidence — What the session shows: The verbatim conversation, a
five-principle method, the pipeline that runs it, and two honest failures`
describes content that is neither present nor linked.

**Q4 — upward pull?** Yes, `Return to all sessions`, plus sequence position
(`SESSION 01 OF 12`, `Sequence start`) and a next-session link. Sequence is the
one part of the `/demos/:slug` contract this page fully satisfies. Related
techniques and related work are absent.

### `/demos/applied/config-probe` (a technique) — 1280

**What the visitor thinks this page IS:** a written method — the most
self-sufficient page of the four.

`APPLIED TECHNIQUE 02 OF 8`, `Bare-Arm Test Your Agent Config`, a five-line claim
that actually teaches the method, and a rail reading `Collection Applied` /
`Record A02` / `Related sessions 1`. Below the fold: `WORKING PRINCIPLES — What to
carry forward` with four one-line rules, then `Explicit relationships — Related
sessions` naming `The Sycophancy Was in the Config` with a full description, then
`← Previous technique` / `Next technique →`.

**Q3** — the page is its own destination; the content is the deliverable. Honest.
**Q4** — the strongest of the four: sequence in both directions plus a named,
described relationship into the session collection. This is what the art
direction's "relationships … stay close together" looks like when it works, and
it makes the session page's missing relationships more conspicuous, not less.

## At 390

All four record heads — breadcrumb, eyebrow, h1, claim, and the full metadata
rail — fit inside the 844px fold. The detail template degrades to small widths
**better than `/` or `/work` do**; the two S2s filed above about 390 do not
recur here. `/work/fleet-observability` loses its `No public destination.` panel
below the fold at 390, where at 1280 the whole record is visible at once.

## Scoring two already-filed findings as deep-link arrival

Not re-reported. `FINDINGS.md` owns both. What follows is the first-encounter
cost nobody had measured.

**F3 — every detail route carries `<title>Nino Chavez — Open Practice</title>`.**
As an SEO or WCAG item this is one line. As deep-link arrival it hits
`PRODUCT.md`'s **first-named audience** directly: "Someone following a link to
Nino or to one named project." Every surface that exists *outside* the page body
— the browser tab, the history entry, the bookmark, the shared-link preview, the
screen-reader page announcement — names the site and not the object. A visitor
sent a link to Rally HQ and a visitor sent a link to a technique see identical
text everywhere except the rendered page. Two of the eight affected routes are
sequence records (`SESSION 01 OF 12`, `APPLIED TECHNIQUE 02 OF 8`), so a visitor
reading through the series accumulates twelve indistinguishable tabs.

There is one perverse upside worth naming, because it bears on Q1: the shared
title is the only place a detail page states the person's name at any prominence.
Fixing F3 without addressing the identity gap below would remove it.

**F4 — `/demos` says "Watch session"; the session record has no player and no
link to one.** The arrival experience: the visitor clicks a verb promising video,
lands on `/demos/twelve-messages`, and finds a page whose one visual is an empty
frame field (see the S1 below), whose `02 / Evidence` section *describes* "the verbatim
conversation, a five-principle method, the pipeline that runs it, and two honest
failures" without supplying or linking any of it, and whose only forward action
is `Next session →` — the same unfulfilled promise, twelve times. The page does
not read as a record of a session; it reads as a stub for one. That is the
`/demos/:slug` visitor job — "Show me this session in sequence" — failing on
"show me" while succeeding on "in sequence."

## Findings

```
[S1] Demos — the entire session evidence layer is cross-origin hotlinked, and none of it rendered
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Content ownership and freshness —
          "Machine-to-machine reads use each publisher's stable Cloudflare Pages
          origin because the visitor-facing custom domains deliberately reject
          automated requests"; and "failure falls back to known content rather
          than silently producing an empty collection."
          §Functional model — "sessions retain their source frames."
Evidence: html/demos.html — 12 of 13 image sources point at
          https://demos.ninochavez.co/<slug>/img/*.jpg; only the hero uses a
          local asset (/work/demo-browser.jpg).
          html/demos_twelve-messages.html and html/demos_adopt-or-skip.html —
          both source frames are demos.ninochavez.co hotlinks.
          shots/demos_twelve_messages-1280-fold.png — broken-image placeholder
          and grey alt text on the dark field.
          shots/demos_adopt_or_skip-1280-fold.png — the same field, empty.
Repro:    load any session detail route; the source frame field paints empty
Note:     scope corrected upward after checking a second session. This is not one
          bad filename — it is the pattern. The frames are hotlinked from the
          Demos publisher's *visitor-facing* custom domain, the exact host the art
          direction says rejects automated requests, with no local fallback, while
          usable local assets already sit unused in public/work/
          (demo-twelve-messages.jpg, demo-adopt-or-skip.jpg, demo-config-probe.jpg,
          and eleven more). The /demos hero renders because it is the one image
          served locally; /work/rally-hq renders because it uses /work/rally-hq.webp.
          Every cross-origin frame in the capture failed.
Hedge:    this capture ran against a local build, and a headless capture failing
          against a host that deliberately rejects automated requests is exactly
          what the art direction predicts — a human browser may succeed where this
          did not. **The check that settles it: request one of those URLs with a
          browser user-agent.** If they serve to real visitors this drops to S3,
          a missing-fallback and wrong-origin defect. If they do not, the Demos
          collection ships with no evidence at all. Either way the art direction's
          named origin rule and its fallback rule are both unmet.
Fix:      serve source frames from the publisher's Pages origin, or from the local
          snapshot the build already maintains for the JSON indexes — the same
          "failure falls back to known content" rule, applied to images.
```

```
[S2] all detail routes — no record says who made the thing it describes
Contract: PRODUCT.md §Primary audiences — the first audience is "Someone
          following a link to Nino or to one named project";
          PRODUCT.md §First-encounter promise item 1, "who Nino is"
Evidence: shots/work_rally_hq-1280-fold.png, work_fleet_observability-1280-fold.png,
          demos_twelve_messages-1280-fold.png, demos_applied_config_probe-1280-fold.png
          — in all four first viewports the only identity is the "Nino Chavez"
          header wordmark
Repro:    open any detail route cold, having never seen /
Note:     the records are written in the third person about the object. Nothing
          asserts authorship: no byline, no first-person voice, no line placing
          the object inside a practice. The nav and the breadcrumb do establish
          that the object sits inside someone's collection — "Work / Rally HQ"
          under "Work Demos Learn Writing About" is nobody's product nav — so the
          visitor knows this is *someone's* work record. What they cannot learn is
          whose, or what that person's relation to the object is. The claims that
          would fix it — "I build the system, run the operation, and
          keep the evidence" and "Product architect + builder" — exist only on /,
          which this visitor never saw. The footer's "Product architect and
          builder in Chicago" is the sole statement of the parent practice and it
          is a full page away.
Fix:      one line of provenance in the record head — the practice, and Nino's
          relation to the object — costs nothing against the record model and
          answers the first thing the site's first-named audience needs.
```

```
[S2] /work/:slug — ships without the related demos and writing the IA contract requires
Contract: IA-NAVIGATION.md §Page responsibilities, /work/:slug required content —
          "concise claim, state, form, provenance or receipts when useful, one
          primary destination, related demos/writing";
          OPEN-PRACTICE-ART-DIRECTION.md §Functional model — "Detail pages are
          records. Context, public surface, current limit, relationships, and the
          next honest action stay close together."
Evidence: checked all four captured work records. html/work_browse-tool.html
          renders a "Related work" block ("Practice · Ways of Working"). The other
          three — work_rally-hq, work_fleet-observability, work_volleyrx — render
          none; their complete outbound set is one primary destination (or none)
          plus "← Return to the complete library".
Repro:    scroll any work record to the end; compare /work/browse-tool
Note:     **the template has the slot** — browse-tool proves it renders when data
          exists. So this is unpopulated relationship data on three of four
          records, not a missing component, and the fix is data rather than
          markup. Rally HQ makes the gap sharpest: it is the site's most connected
          object — homepage hero, first card on the evidence bench, item 03 of the
          current working set — and none of that is reachable from its own record.
          Five of the six required content items are present and well handled on
          every record; relationships are the one that is conditional.
Fix:      populate the relationship data for the records that have real
          relationships. I have not read the registry, so whether that means
          filling an existing field or adding one is for whoever owns app/data.ts;
          the rendering path already works.
```

```
[S3] /work/:slug — "01 / Context — Why this exists" repeats the claim verbatim
Contract: IA-NAVIGATION.md §Page responsibilities, /work/:slug "Must not become" —
          "a required template for every object"
Evidence: all four captured work records duplicate their claim verbatim into
          "01 / Context — Why this exists": work_rally-hq ("Tournament
          registration, brackets, schedules, and live scoring in one public event
          page."), work_fleet-observability ("A working internal view of
          repository health, deployments, and maintenance risk."),
          work_browse-tool ("A command-line browser workflow that lets agents
          inspect real product surfaces."), work_volleyrx ("A volleyball practice
          concept that turns development goals into specific training work.")
Repro:    read any work record top to bottom
Note:     four of four — template-level, not a content gap in two records. Both
          demo templates fill their first section with genuinely new content
          (01 / Reader, and the working-principles list), so this is the work
          template specifically. The visitor reads the same sentence twice within
          one viewport, which is the "required template" failure the contract
          names — the slot exists and is being filled to satisfy the shape.
Fix:      let 01 / Context carry something the claim does not, or drop the section
          when there is nothing further to say. The record model permits a shorter
          record; it does not require three numbered parts.
```

```
[S3] /work/rally-hq — the primary destination sits below the fold, under the screenshot
Contract: OPEN-PRACTICE-ART-DIRECTION.md §Functional model — "Context, public
          surface, current limit, relationships, and the next honest action stay
          close together."
Evidence: shots/work_rally_hq-1280-fold.png and work_rally_hq-390-fold.png — the
          first viewport ends inside the screenshot at both widths;
          "Open Rally HQ ↗" is in section 02 beneath it
Repro:    /work/rally-hq at 390 or 1280, no scroll
Note:     this is the only one of the four with a real outbound destination, and
          it is the only one where the action is not in the first viewport. The
          screenshot is correct evidence and should stay; the ordering puts a
          full-width image between the visitor and the thing the image is
          advertising. /work/fleet-observability keeps its (negative) public-surface
          statement above the fold at 1280 and reads better for it.
Fix:      pair the action with the state rail in the record head, or let the
          screenshot follow the public-surface section rather than precede it.
```

## Deep-link clauses checked and passing

- **State is honest and visually secondary** (PRODUCT.md §Success criteria) —
  passes on all four. `live` / `internal` sit in small mono in the metadata rail,
  never as a badge competing with the claim, and each work record carries an
  explicit `03 / Limit` section stating what the state does *not* claim.
- **`/work/fleet-observability` — the visitor knows they cannot use it before
  trying** — passes. There is no link to attempt, and `No public destination.`
  is stated twice in different words before the limit section.
- **`/demos/:slug` sequence position and previous/next** (IA-NAVIGATION.md) —
  passes. `SESSION 01 OF 12`, `Sequence start`, `Next session →`.
- **`/demos/applied/:slug` relationships** (IA-NAVIGATION.md; art direction
  §Functional model) — passes, and is the reference implementation the other
  three templates should copy.
- **"a generic work-detail page"** (IA-NAVIGATION.md `/demos/:slug` "Must not
  become") — passes. The session and technique templates are visibly distinct
  from the work template and from each other.
