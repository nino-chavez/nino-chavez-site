# Claims and evidence audit — Open Practice redesign

- **Role**: 7 — Evidence & claims auditor (`.claude/agents/claims-evidence-auditor.md`)
- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Evidence**: `docs/audit/evidence/d0cfd0e/html/` (36 rendered documents) joined
  against `app/data.ts`, `app/demo-data.json`, `app/writing-data.json`
- **Method**: every number was recomputed from the file that owns it and compared
  to the rendered string. No count in this document was accepted because another
  document asserted it.
- **Date**: 2026-07-30

## Answer first

**Every count on the site is correct.** All 32 work records, 6 domains, 12
sessions, 8 techniques, 285 writing pieces, 241 essays, 9 series, 11
destinations, 7 learning paths, 12 photography frames — each derives from its
data file and each rendered figure matches. The art direction's prohibition
("Counts come from the Demos publisher instead of being copied into this
document or the interface") **holds**: no demo or work count is a literal in
any `.tsx`.

**Private work is never presented as available.** All 12 `internal` and both
`paused` records render `No public destination.` on their detail pages plus a
state-specific limit sentence. `PRODUCT.md`'s non-goal holds cleanly.

Two claim defects survive:

1. **`/demos` promises an action the site cannot deliver.** Twelve cards read
   "Watch session →" and land on a summary page with no player, no embed, and
   no link to the published session — even though `app/demo-data.json` carries
   the publisher URL for all twenty records and the site never renders it. S1.
2. **`/work` advertises a state no record holds.** The state filter offers
   `install` because `app/data.ts` declares six states while the registry uses
   five. Selecting it returns `0 of 32`. S2.

Plus one correction to the audit's own instrument: **`FINDINGS.md`'s
"URL-backed filters — Conforms at the server" is not supported by the evidence
it cites.** Two of the four filtered probes rendered *zero* results. Detail in
§4.

---

## 1. Claim → source ledger

Every row was derived, not read. `Derived` columns come from a computation over
the owning data file; `Rendered` columns come from the captured HTML.

### Counts

| Route | Rendered claim | Derived value | Source of truth | Match |
|---|---|---|---|---|
| `/` | `32 records` (register) | 32 | `workItems.length` | yes |
| `/` | `32 records across 6 domains` | 32 / 6 | `workItems.length`, `domains.length` | yes |
| `/` | Practice `11 records` | 11 | `workItems.filter(domain==="Practice")` | yes |
| `/` | Local-first `3 records` | 3 | same | yes |
| `/` | Volleyball `5 records` | 5 | same | yes |
| `/` | Commerce `4 records` | 4 | same | yes |
| `/` | Media & assets `6 records` | 6 | same | yes |
| `/` | Writing `3 records` | 3 | same | yes |
| `/` | `03 working surfaces` | 3 | `evidence.length` (`app/page.tsx:30`) | yes |
| `/` | `12 complete sessions and 8 applied techniques` | 12 / 8 | `demo-data.json` sessions/techniques | yes |
| `/` | `12 Operating sessions` / `08 Applied techniques` | 12 / 8 | same | yes |
| `/work` | `32 of 32 records in view` | 32 | `workItems.length` | yes |
| `/work` | `Browse all 32 records` | 32 | same | yes |
| `/work` | six domain tallies `11/3/5/4/6/3` | 11/3/5/4/6/3 | per-domain filter | yes |
| `/work` | `01 / 06` … `06 / 06` group indices | 6 | `domains.length` | yes |
| `/demos` | `12 Sessions` / `8 Techniques` | 12 / 8 | `demo-data.json` | yes |
| `/demos` | `20 of 20 records in view` | 20 | 12 + 8 | yes |
| `/demos` | `Search all 20 records` | 20 | same | yes |
| `/demos` | Sessions `12 records`, Techniques `8 records` | 12 / 8 | same | yes |
| `/blog` | `285 pieces` | 285 | `writing-data.json` `items.length` | yes |
| `/blog` | `241 essays, 44 other pieces` | 241 / 44 | `kind==="Essay"`; 285−241 | yes |
| `/blog` | `Search all 285 pieces` | 285 | same | yes |
| `/blog` | Essays group `241 pieces` | 241 | same | yes |
| `/blog` | `9 authored sequences`, `S01–S09` | 9 | `series.length` | yes |
| `/blog` | per-series `3,3,5,7,5,2,5,5,3 articles` | same | `series[].articleCount` | yes |
| `/blog` | Form select: 6 kinds | 6 | `Object.keys(kindCounts)` | yes |
| `/blog` | Year select: `2026, 2025` | 2026 (101), 2025 (184) | `items[].publishedAt` prefix | yes |
| `/learn` | `7 paths` | 7 | `learnTracks.length` | yes |
| `/learn` | `Seven ways into the practice`, `L01–L07` | 7 | same | yes |
| `/learn` | `5 stages each` | 5 on all 7 tracks | `learnTracks[].levels.length` | yes (literal — see F3) |
| `/learn/:track` ×7 | `Five stages to the artifact`, `Path / 00–04` | 5 on all 7 | same | yes (literal) |
| `/learn/:track` ×7 | `Grounding / 03 records` | 3 on all 7 | `learnTracks[].evidence.length` | yes (literal) |
| `/links` | `11 destinations` | 11 | `destinationGroups` flattened (L01–L11) | yes (literal — see F3) |
| `/photography` | `Contact sheet / 12 frames`, `12 frames shown` | 12 | `frames.length` | yes (literal) |
| `/now` | `Four things have my attention` | 4 | `currentFocus.length` | yes (prose, not a counter) |

### Filtered and searched result counts

| URL captured | Rendered claim | Derived | Match |
|---|---|---|---|
| `/work?domain=commerce` | `0 of 32 records in view` | 0 — filter is exact-case, registry holds `Commerce` | yes, truthful |
| `/work?q=agent&state=live` | `1 of 32 records in view` | 1 (`ways-of-working`) | yes |
| `/blog?type=essay` | `0 of 285 published pieces in view` | 0 — registry holds `Essay` | yes, truthful |
| `/blog?q=agents&year=2026` | `6 of 285`; groups `3 Essay + 2 Whitepaper + 1 Tutorial` | 6 | yes |
| `/demos?type=technique` | `8 of 20 records in view` | 8 | yes |
| `/demos?q=corpus` | `2 of 20 records in view` | 2 (`session-corpus`, `applied/corpus`) | yes |

The two zero-result rows are **honest renders of a real empty set**, not false
claims — the filters compare exactly (`item.domain === domain`,
`item.kind === kind`) and the captured URLs used lowercase values the registry
does not hold. Every link the site itself emits uses the correct case
(`/work?domain=Volleyball` at `app/now/page.tsx:47`,
`` href={`/work?domain=${encodeURIComponent(domain)}`} `` at `app/page.tsx:207`).
The consequence for a hand-edited or externally-shared URL belongs to the
wayfinding lead; it is not a claims defect. It **is** a correction to the audit
ledger — see §4.

### State labels — all 32 records

Mechanical join of the 32 `/work` card rows against `app/data.ts`:

| Check | Result |
|---|---|
| Rendered rows | 32 |
| Registry rows | 32 |
| State-label mismatches | **0** |
| Form-label mismatches | **0** |
| Records missing from `/work` | **0** |

Registry tally: `source` 7, `internal` 12, `live` 7, `building` 4, `paused` 2 —
matches `AUDIT-PLAN.md` §Capture list.

### Actions vs state

| Object class | Rendered action | Destination | Honest? |
|---|---|---|---|
| `/work` card, all 32 | `Open →` | `/work/:slug` on this site | yes — the record opens |
| `/work/:slug`, `live` (7) | `Open Rally HQ ↗` etc. | the labeled public URL | yes |
| `/work/:slug`, `source` (2 of 7) | `Read the source ↗`, `Open the reference portal ↗` | GitHub, blueprint.ninochavez.co | yes |
| `/work/:slug`, `internal` (12), `paused` (2), plus 5 `source`/`building` with no destination | `No public destination.` + a state-specific limit sentence (`app/work/[slug]/page.tsx:50–76`) | none offered | yes — exemplary |
| `/demos` session card ×12 | `Watch session →` | `/demos/:slug` — no player, no embed, no publisher link | **no — F1** |
| `/demos` technique card ×8 | `Use the technique →` | `/demos/applied/:slug` — principles listed, publisher link absent | weak — F1 |
| `/about` ×7 | `Open the work →`, `Read Signal Dispatch →`, `Listen on SoundCloud ↗`, … | matching internal routes + SoundCloud | yes |
| `/links` ×11 | `Open product`, `Browse source`, `Read publication`, … | see below | yes |
| `/photography` ×3 | `Open the full gallery ↗ (opens the live archive)` | archive routes, with the assistive-text warning | yes |

### `/links` — label vs destination, all 11

| Code | Label | Href | Match |
|---|---|---|---|
| L01 | Rally HQ / Open product | `https://rallyhq.app` | yes |
| L02 | Let's Pepper / Visit series | `https://letspepper.com` | yes |
| L03 | Flickday Media / Open studio | `https://flickdaymedia.com` | yes — but see F6 |
| L04 | Signal X Studio / Visit company | `https://signalx.studio` | yes |
| L05 | GitHub / Browse source | `https://github.com/nino-chavez` | yes |
| L06 | Signal Dispatch / Read publication | `/blog` | yes |
| L07 | LinkedIn / View profile | `https://www.linkedin.com/in/nino-chavez/` | yes |
| L08 | Photography / View galleries | `/photography` | yes |
| L09 | Instagram / Open Instagram | `https://www.instagram.com/nino.chavez.photo/` | yes |
| L10 | SoundCloud / Listen to sets | `https://soundcloud.com/ni-no-cha-vez` | yes |
| L11 | Email / Send email | `mailto:nino@ninochavez.co` | yes |

Count derived: 11. Rendered: `11 destinations`. Match.
**Destination liveness was not tested** — no network pass in this role. The
label-to-href match is verified; "these URLs resolve" is not.

### Dates

| Route | Rendered | Source | Verdict |
|---|---|---|---|
| `/now` | `30 July 2026` (`dateTime="2026-07-30"`) | hardcoded, `app/now/page.tsx:85` | **current today**; see F4 |
| `/links` | `Checked 30 July 2026` | hardcoded, `app/links/page.tsx:166` | **current today**; see F4 |
| `/` | `Current working set` / `29 Jul 2026` | hardcoded, `app/page.tsx:140` | **matches no record** — F2 |
| `/blog` | `Updated Jul 31, 2026` | derived from `latestPublishedAt` | derived correctly; see F7 |
| `/work` card dates (32) | `30 Jul` … `18 Jun` | `workItems[].updatedAt` | derived, all match |

---

## 2. The publisher clause — verdict: conforming

> "Counts come from the Demos publisher instead of being copied into this
> document or the interface."
> — `docs/OPEN-PRACTICE-ART-DIRECTION.md` §Demos are a sequence

**Holds.** Grep for numeric literals adjacent to count language across `app/`
returns five hits, and **none is a demo or work count**:

```
app/learn/page.tsx:17          "5 stages each"
app/learn/[track]/page.tsx:83  "Grounding / 03 records"
app/photography/page.tsx:231   "Contact sheet / 12 frames"
app/photography/page.tsx:259   "12 frames shown"
app/links/page.tsx:165         "11 destinations"
```

Every demo, work, domain, and writing count renders from `.length` or a
`.filter().length`. Confirmed at `app/page.tsx:74, 187, 208, 233, 262, 275`,
`app/components/WorkLibrary.tsx:163`, `app/components/WritingLibrary.tsx:188`,
`app/blog/page.tsx:15, 30, 39–40, 51`, `app/learn/page.tsx:16`.

Two generators enforce the invariant at load rather than trusting the file:

- `app/demos.ts:44–50` throws unless `sessionCount === sessions.length` **and**
  `techniqueCount === techniques.length`, and unless every technique's
  `relatedSessionSlugs` resolve to real sessions.
- `app/writing.ts:89–95` throws unless `publicPieceCount === items.length`.

`getDemoSnapshot()` and `getWritingSnapshot()` fetch the live publisher index
with `revalidate: 300` and fall back to the bundled snapshot on failure
(`app/demos.ts:81–100`). That is the clause implemented, not merely asserted.

---

## 3. Findings

### [S1] `/demos` — "Watch session" leads to a page where nothing can be watched

Twelve session cards on `/demos` render the action `Watch session →` and link
to `/demos/:slug`. That page is a text record: reader, evidence, practice, a
still preview frame, and previous/next navigation. It contains **no `<video>`,
no `<iframe>`, and no anchor to the published session**. Eight technique cards
render `Use the technique →` into the same shape.

`app/demo-data.json` supplies `href: "https://demos.ninochavez.co/<slug>/"` on
all 20 records. Nothing in `app/` renders it. The only reference to that origin
on a detail page is the `<img src>` for the preview frame — proof the origin
serves the visitor, and the record page shows its picture without offering its
door.

A visitor whose job is "watch an operating session" cannot complete it anywhere
on the site.

- **Contract**: `PRODUCT.md` §Content model — every work object has "an honest
  action, such as open, install, read, view source, or inspect notes."
  `docs/OPEN-PRACTICE-ART-DIRECTION.md` §Detail pages are records — "Context,
  public surface, current limit, relationships, and **the next honest action**
  stay close together."
- **Evidence**: `evidence/d0cfd0e/html/demos.html` — `Watch session` ×12,
  `Use the technique` ×8, every one linking to a local route.
  `evidence/d0cfd0e/html/demos_twelve-messages.html` — 1,204 characters of
  rendered text, `<iframe>` 0, `<video>` 0, no `<a href="https://demos…">`.
  `app/components/DemoLibrary.tsx:44` and `:57` overwrite the publisher `href`
  with `/demos/${slug}` and `/demos/applied/${slug}`.
  The preview figure is inert markup (`app/demos/[slug]/page.tsx:72–80` — an
  `<img>` inside a `<figure>`, no wrapping link); there is no `use client`,
  `onClick`, or `useRouter` anywhere under `app/demos/`, so the action is
  absent rather than merely undiscoverable.
- **Repro**:
  ```bash
  grep -c 'Watch session' docs/audit/evidence/d0cfd0e/html/demos.html            # 12
  grep -c '<iframe\|<video' docs/audit/evidence/d0cfd0e/html/demos_twelve-messages.html   # 0
  grep -c 'href="https://demos' docs/audit/evidence/d0cfd0e/html/demos_twelve-messages.html # 0
  node -e 'console.log(require("./app/demo-data.json").sessions[0].href)'         # the unused URL
  grep -rn '\.href' app/demos/                                                    # no record.href usage
  ```
- **Fix**: render `record.href` as the primary action on `/demos/:slug` and
  `/demos/applied/:slug` (`Watch the session ↗`), or change the card verbs to
  match what the local page delivers (`Read the record →`). Not both readings
  can be honest at once.

### [S2] `/work` — the state filter offers `install`, which no record holds

`app/data.ts:9–16` declares six states; the registry uses five. `install` has
zero members. `WorkLibrary.tsx` renders the vocabulary straight into the select
(`states.map`), so `/work` presents six states and one of them silently returns
`0 of 32 records in view`.

The site's premise is a complete, honestly labeled record. A state offered in
the interface that describes no object is a claim about the registry's shape
that the registry does not support.

- **Contract**: `PRODUCT.md` §Content model — the state vocabulary is the
  object's honest label, not an aspirational set. Role rubric: "a state label is
  inconsistent" is S2.
- **Evidence**: `evidence/d0cfd0e/html/work.html` — `#work-state` options are
  `['', 'install', 'live', 'source', 'internal', 'building', 'paused']`;
  registry tally `{source:7, internal:12, live:7, building:4, paused:2}`.
- **Repro**:
  ```bash
  npx tsx -e 'import {workItems,states} from "./app/data";
    const t:any={}; workItems.forEach((i:any)=>t[i.state]=(t[i.state]||0)+1);
    console.log(states, t)'
  ```
- **Fix**: derive the select's options from the states actually in use
  (`[...new Set(workItems.map(i => i.state))]` ordered by `states`), or delete
  `install` from the declared union until a record earns it.

### [S2] `/` — "Current working set / 29 Jul 2026" is a literal that matches nothing

`app/page.tsx:140` hardcodes `<time dateTime="2026-07-29">29 Jul 2026</time>`.
No record in the registry carries `updatedAt: "2026-07-29"`, and one of the four
items the heading dates — Ways of Working, `updatedAt: 2026-07-30` — was updated
*after* the stated date. The set is therefore labeled as current to a moment
that precedes its own contents.

The four entries in `currentWork` (`app/page.tsx:6–29`) also hand-copy `name`
and `state` from the registry. All four states are correct today
(`blueprint: source`, `film-room: building`, `rally-hq: live`,
`ways-of-working: live`) — but they are copies, and the first viewport is where
a stale state costs the most.

- **Contract**: `PRODUCT.md` §Success criteria — "state and availability are
  honest but visually secondary." `docs/OPEN-PRACTICE-ART-DIRECTION.md`
  §Content ownership and freshness — the site is "the reader-facing index, not a
  second editorial system."
- **Evidence**: `app/page.tsx:6–29, 140`; `evidence/d0cfd0e/html/index.html`
  renders `Current working set 29 Jul 2026`;
  `evidence/d0cfd0e/html/work.html` renders `30 Jul` for Ways of Working.
- **Repro**:
  ```bash
  npx tsx -e 'import {workItems} from "./app/data";
    console.log(workItems.filter((i:any)=>i.updatedAt==="2026-07-29").length,   // 0
                Math.max(...workItems.map((i:any)=>+new Date(i.updatedAt))))'    // 2026-07-30
  ```
- **Fix**: derive the heading date from `max(updatedAt)` over the featured set,
  and look the four entries up by slug from `workItems` so `state` and `name`
  cannot drift.

### [S3] Five count literals sit next to the data that would derive them

All five are **correct today**. None is covered by the Demos publisher clause,
so this is craft, not a contract violation — but each is a silent-drift seat on
a site whose thesis is that its numbers are true.

| File:line | Literal | Derivable from |
|---|---|---|
| `app/links/page.tsx:165` | `11 destinations` | `destinationGroups.flatMap(g => g.destinations).length` |
| `app/learn/page.tsx:17` | `5 stages each` | `learnTracks[].levels.length` (5 on all 7 today) |
| `app/learn/[track]/page.tsx:83` | `Grounding / 03 records` | `track.evidence.length` (3 on all 7 today) |
| `app/learn/[track]/page.tsx:140` | `Five stages to the artifact` | `track.levels.length` |
| `app/photography/page.tsx:231, 259` | `12 frames` ×2 | `frames.length` |

The two `/learn` literals are the sharpest: they are rendered identically on all
seven track pages, so one track gaining a sixth stage or a fourth grounding
record makes the string false on that page while the other six stay right.

- **Repro**: `npx tsx -e 'import {learnTracks} from "./app/data"; console.log([...new Set(learnTracks.map((t:any)=>t.levels.length))], [...new Set(learnTracks.map((t:any)=>t.evidence.length))])'` → `[5] [3]`
- **Fix**: interpolate. `{destinations.length} destinations`,
  `{track.levels.length} stages`, `{track.evidence.length} records`,
  `{frames.length} frames`.

### [S3] `/now` and `/links` date themselves by hand

`/now` renders `30 July 2026` and `/links` renders `Checked 30 July 2026`, both
hardcoded (`app/now/page.tsx:85`, `app/links/page.tsx:166`). Both are **accurate
today**. Neither has a mechanism.

`/now`'s entire contract is currency and `/links` claims a maintenance check,
so on both pages the date *is* the product. A hand-typed "checked" date is the
same class of artifact this role exists to distrust: an assertion that
verification happened, standing in for the verification.

- **Contract**: `AUDIT-PLAN.md` §The four new roles — "`/now` is a dated
  attention ledger. A stale date on a page whose job is currency is a defect."
  Not yet a defect; one edit away from being one.
- **Fix**: for `/now`, set the date from the newest `currentFocus` entry, or add
  a `reviewedAt` field the page must read. For `/links`, run a link check in CI
  and stamp its run date, or drop the word "Checked" and say "Maintained."

### [S3] `/links` and `/work` disagree about Flickday

`/links` L03 lists **Flickday Media** with the action `Open studio`, under a
group headed "Live places where the work can be used or followed."
`/work/flickday` labels the object `building` and renders `No public
destination.`

The two objects are arguably different — the studio business versus the
photography-delivery product — but they share a name, and a visitor who reads
both surfaces gets contradictory availability for it.

- **Contract**: `PRODUCT.md` §Success criteria — "state and availability are
  honest."
- **Evidence**: `app/links/page.tsx:36–41`; `app/data.ts` `flickday`
  (`state: "building"`, no `destination`);
  `evidence/d0cfd0e/html/links.html`, `evidence/d0cfd0e/html/work.html`.
- **Fix**: distinguish them in the copy — "Flickday Media (studio)" on `/links`
  — or give the registry record the studio destination and a state that matches.

### [S3] `/blog` renders `Updated Jul 31, 2026` — one day in the future

Today is 2026-07-30. The header is **derived correctly** from
`latestPublishedAt`, which is itself derived correctly from two items dated
`2026-07-31` (`grade-an-agent-tool-before-you-install-it`,
`one-component-i-didnt-already-have`). Nothing in the pipeline is broken.

Recorded because the render is unreachable-in-time on a page that labels itself
"complete publication": a reader on 30 July is told the archive was updated
tomorrow.

- **Evidence**: `app/blog/page.tsx:15–17, 31`;
  `node -e 'const d=require("./app/writing-data.json"); console.log(d.items.filter(i=>i.publishedAt>"2026-07-30").length)'` → 2
- **Fix**: publisher-side. Either the two pieces are scheduled and should be
  excluded until their date arrives, or the label should read "Latest piece"
  rather than "Updated."

### [S4] `/work` renders the same verb on all 32 cards

Every card's action reads `Open →` regardless of state — `live`, `internal`,
`paused` alike. It is honest (the record does open) and the state chip carries
the distinction, so no clause is broken. Noted only because `PRODUCT.md`'s
content model names five different actions and the index uses one.

---

## 4. Corrections to the audit's own instrument

Both belong in `docs/audit/FINDINGS.md` before Phase 3.

### The writing archive holds **285** pieces, not 281

`AUDIT-PLAN.md` §5 and `FINDINGS.md` §"[S3] `/blog` renders 3,155 DOM nodes"
both say "281 pieces." `app/writing-data.json` holds 285 items,
`publicPieceCount: 285`, and `/blog` renders `285 pieces` in three places.
`app/writing.ts:93` would throw if those disagreed.

The site is right; the audit documents are stale. This is not a site finding —
correcting it in the ledger prevents someone "fixing" a correct number.

```bash
node -e 'const d=require("./app/writing-data.json"); console.log(d.publicPieceCount, d.items.length)'   # 285 285
grep -c '285 pieces' docs/audit/evidence/d0cfd0e/html/blog.html
```

### "URL-backed filters — Conforms at the server" is not supported by its evidence

`FINDINGS.md` §Checked and conforming records:

> **Conforms at the server.** `/work?domain=commerce` server-renders 206 tags
> against 596 unfiltered; `/blog?type=essay` renders 171 KB against 353 KB.

Both probes rendered **zero results**, and the smaller payload is the empty
state, not a filtered one:

| URL | What the page actually says |
|---|---|
| `/work?domain=commerce` | `0 of 32 records in view` · `1 criterion active` · `No matches` |
| `/blog?type=essay` | `0 of 285 published pieces in view` · `1 criterion active` |

Filters compare with `===` (`WorkLibrary.tsx:65`, `WritingLibrary.tsx:95`) and
the registries hold `Commerce` and `Essay`. Shrinking HTML was read as evidence
of filtering when it was evidence of an empty set — exactly the inference this
role exists to catch.

The claim is still probably true: the two probes that used values the data holds
(`/demos?type=technique` → `8 of 20`, `/blog?q=agents&year=2026` → `6 of 285`)
render correct filtered sets server-side. **Restate the row on those two probes
and drop the two that returned nothing.** Whether an externally-shared
wrong-case URL landing silently empty is itself a defect is the wayfinding
lead's call, not a claims one.

---

## 5. The session/technique slug overlap — intentional, not a collision

`adopt-or-skip` and `config-probe` appear in both `sessions` and `techniques`.
Verified against the generator: `scripts/sync-demo-index.mjs:57–58` reads
sessions from `<source>/demos/*` and techniques from `<source>/applied/*` — two
independent directory namespaces in `apps/nc-demos`. A shared directory name is
a naming choice upstream, not a generator fault.

They are also not confusable in the interface:

| Slug | As session | As technique |
|---|---|---|
| `adopt-or-skip` | S12 "One Component I Didn't Already Have" · `/demos/adopt-or-skip` | A01 "Run the Subtraction Before You Install" · `/demos/applied/adopt-or-skip` |
| `config-probe` | S11 "The Sycophancy Was in the Config" · `/demos/config-probe` | A02 "Bare-Arm Test Your Agent Config" · `/demos/applied/config-probe` |

**No duplicate name reaches search.** `app/search/page.tsx:91–102` builds
results from `title`, tags each with a distinct `kind` ("Session" /
"Applied technique"), and routes to distinct hrefs. The slug is never the label.
Six of the eight techniques carry their own name (`corpus`, `gates`,
`guardrails`, `provenance`, `registry`, `two-ways`); only these two reuse their
originating session's — an upstream naming inconsistency at most, S4 if raised
at all.

**Derived from source, not from HTML.** The captured `search.html` was `/search`
with no query, so it contains no results. `/search` *is* server-rendered
(`await searchParams`), so a `?q=` capture would have shown them; the evidence
set simply has no such URL. The conclusion above rests on reading the render
path, which is sufficient for this claim.

---

## 6. Checked and conforming

Recorded so these are not re-raised.

| Check | Result |
|---|---|
| Every rendered count | **All correct.** Every count claim in §1 recomputed from the file that owns it; zero mismatches. |
| Demos publisher clause | **Conforms.** No demo or work count is a literal. `demos.ts` and `writing.ts` throw on count/array disagreement at load. |
| State labels, all 32 records | **Conforms.** Mechanical join of `/work` rows against `app/data.ts`: 0 state mismatches, 0 form mismatches, 0 missing rows. |
| Private work never reads as available | **Conforms.** All 12 `internal` and both `paused` detail pages render `No public destination.` plus a state-specific limit sentence (`app/work/[slug]/page.tsx:50–76`). No `internal` object offers a public action anywhere. |
| `/links` label ↔ href | **Conforms.** All 11 labels match their destination; count derives to 11. |
| `/about` actions | **Conforms.** All 7 resolve to the object they name. |
| `/photography` actions | **Conforms.** Outbound links carry `(opens the live archive)` as assistive text. |
| Writing group indices | **Conforms.** `01 / 06 … 06 / 06` preserves position across empty groups; the filtered `/blog` view skips group 03 and 05 rather than renumbering. |
| Series counts | **Generated.** `sync-writing-index.mjs:111–121, 155` computes `articleCount` from source frontmatter at sync time. |

### Not independently verifiable in this pass

Stated rather than assumed, per the role's standard.

- **Series `articleCount`.** Generated at sync, but `writing-data.json` items
  carry no `series` field, so the nine numbers cannot be re-derived from the
  shipped JSON. They are sourced to the publisher that owns them
  (`OPEN-PRACTICE` §Content ownership: "Signal Dispatch owns writing and series
  metadata"). One spec note: `sync-writing-index.mjs:118` counts only
  `kind === "Essay"` members, so a whitepaper or fiction piece inside a series
  would not appear in its total.
- **Destination liveness.** All 11 `/links` targets and the `/work` external
  destinations were checked label-to-href only. No request was made.
- **`/demos` remote index.** `getDemoSnapshot()` fetches
  `https://nc-demos.pages.dev/content-index.json` at render with a 300s
  revalidate. Whether the capture used the remote index or the bundled fallback
  is not recorded in the evidence set. Both agree on 12 / 8, so no count claim
  depends on the answer.
- **`generatedAt` timestamps.** Both data files read `2026-07-31T00:43Z` — a
  UTC rendering of 2026-07-30 evening local. Not a defect. The files differ from
  `d0cfd0e` by that one line only; every count in this audit is identical at both
  revisions.
