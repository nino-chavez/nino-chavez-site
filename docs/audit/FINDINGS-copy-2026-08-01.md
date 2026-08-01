# Copy audit findings — production, 2026-08-01

- **Subject**: live `https://ninochavez.co`, **no frozen SHA**
- **Target**: production, fetched directly. The apex rejects automated requests;
  this pass ran with Cloudflare's "definitely automated traffic" rule temporarily
  disabled. `ninochavez-main.pages.dev` serves a superseded build and is not a
  valid target.
- **Evidence**: none retained. Rendered text for `/`, `/work`, `/work/rally-hq`,
  `/work/commerce-practice`, `/about`, `/now`, `/learn`, `/demos`, `/blog`,
  `/links`, `/search` (six queries plus a no-match query); link targets
  enumerated on `/` and `/work`; one 390px capture of the homepage hero and the
  compact navigation dialog.
- **Plan**: [`docs/AUDIT-PLAN.md`](../AUDIT-PLAN.md)
- **Prior pass**: [`FINDINGS.md`](./FINDINGS.md) — `d0cfd0e`, local build, 32 records
- **Status**: Phase 2 complete for one role (content strategist, role 6). Phase 4
  partially mechanized. Extended the same day with a photography-consolidation
  pass (C23–C30), which also touches wayfinding and IA rather than copy alone.

## This pass has weaker footing than the d0cfd0e pass — say so

Phase 0 of the audit plan exists to freeze the subject and record a SHA, because
findings against a moving tree are not reproducible. **This pass skipped Phase 0.**
It audited production live, so:

- there is no frozen SHA and no evidence directory;
- every finding below is reproducible only against production as it stood on
  2026-08-01, and a deploy invalidates the line references;
- the record count differs from the prior pass (26 live vs. 32 at `d0cfd0e`), so
  count findings across the two ledgers are not comparable.

What survives that weakness: the findings that became clauses, and the findings
that became tests. Those are durable. The rest are dated observations.

## Subject drift — `main` moved during the pass, again

Production was serving `e66a2db`. While this pass ran, `main` advanced two commits
to `e7fca8b` ("fix(work): clarify commerce architecture experience", "fix(work):
make portfolio records useful") and pushed. That build is a materially different
site: **33 records**, the `Practice` domain renamed to `Developer tools`, and the
state vocabulary replaced — `live / source / internal / building` became
`live / maintained / published / building / paused`.

This is the same hazard the `d0cfd0e` pass recorded, from the same cause:
concurrent sessions against one repository. A worktree exists at
`.worktrees/copy-hierarchy` on `codex/copy-hierarchy`, so isolation was available.

Every finding below was re-checked against `e7fca8b` before being written down.
The `at e7fca8b` column says what the current tree does, independent of what
production was serving.

| Finding | At production `e66a2db` | At `e7fca8b` | At `bd20957` |
|---|---|---|---|
| C7 | instruction names fields; examples clickable | same defect, `state` → `status` | — |
| C8 | present | present — verified by test | **resolved** — gate live |
| C9 | present | **resolved** — record rewritten as `commerce-architecture`, no third-person self-reference anywhere in `app/` | resolved |
| C10 | present | present — verified by test | **present** — gate `todo` |
| C11 | present | present — verified by test | **resolved** — gate live |
| C12 | present | present — verified by test | **resolved** — gate live |
| C14 | filter glossed, detail pages bare | **changed shape** — consistent and glossless on every surface | **present** — gate `todo` |

`bd20957` ("fix: clarify portfolio copy and search") landed on `origin/main` while
this ledger was being written and remediated three of the five mechanized findings.
Those gates are now live assertions rather than `todo` markers — the branch this
ledger ships on is built on top of that commit, and `npm run test:audit` reports
**15 pass, 0 fail, 2 todo**.

This is the loop working as designed: the `todo` flag is not a parking space. A case
that starts passing is reported by node:test, which is how these three were caught
rather than sitting stale.

Severity uses the existing scale. **S1** blocks — a named visitor job cannot
complete, a rendered claim is false, or a route is broken. **S2** an approved
contract clause is violated. **S3** craft and consistency. **S4** observation
outside the contract, for Nino's call.

Contract clauses cited as **AD §Copy** (`OPEN-PRACTICE-ART-DIRECTION.md` §Copy and
naming), **IA §Naming** and **IA §Search** (`IA-NAVIGATION.md`). Those clauses were
written from this pass. They are cited here rather than restated, and they did not
exist when the defects were found — so nothing below is self-justifying by
construction, but nothing below predates its clause either.

All findings are `[verified]` — re-derived from live captures in this session.

---

## S2 — contract clause violated

### C1. The homepage answers the practice thesis before it answers what Nino does `[verified]`

The hero reads "I build the system, run the operation, and keep the evidence,"
then "Product work, operating systems, and small live businesses are where I test
how agent-assisted practice holds up in real conditions."

Sentence one is abstract — "keep the evidence" gives a cold reader no object.
Sentence two frames the whole site as a research programme about agent-assisted
work. A visitor arriving from a LinkedIn profile gets a methodology statement in
place of an introduction.

`/about` already solves it in its own opening line: "Product architect by trade. I
also build software, run volleyball tournaments, photograph them, write, and DJ."
Fifteen words, four of the practice's five mediums, no vocabulary to learn.

This is the highest-leverage single change in the pass.

- **Contract**: `PRODUCT.md` §First-encounter promise — a visitor should understand
  who Nino is and what he does "without scrolling through a manifesto."
- **Repro**: fetch `/`, read the first two body paragraphs.
- **Fix**: promote `/about`'s opening sentence to the hero. Keep the
  agent-practice framing as the second paragraph.

### C2. "Open Practice" is the site's frame and is defined nowhere `[verified]`

It is the `<title>`, the OpenGraph title, and the first words in the first
viewport. `grep -ri "open practice" app/` returns `app/layout.tsx` (metadata plus
a launch-gated banner that does not render in production), `app/page.tsx` (the
hero eyebrow), and three `font-family` names in `globals.css`. No definition on any
route.

A visitor cannot tell whether it means open source, open to work, or practice
conducted in public.

- **Contract**: AD §Copy — "A site-level frame appearing in the `<title>` or the
  first viewport is a coined term and must be defined on the page that carries it."
- **Repro**: `grep -ri "open practice" app/`
- **Fix**: one sentence in the homepage opening, or drop the phrase and let the
  hero carry the frame.

### C3. The work library has seven visitor-facing names `[verified]`

| Surface | Name used |
|---|---|
| Header nav | Work |
| Homepage primary action | ENTER THE WORK LIBRARY |
| Homepage section heading | COMPLETE WORK LIBRARY |
| `/work` eyebrow | COMPLETE WORKING RECORD |
| `/work` body | the complete searchable record |
| `/work` list heading | ALL WORK |
| `/about` | The complete public record of projects, systems, and practices |
| `/links` | The Work library holds the complete record |
| `/work/:slug` return link | ← Return to the complete library |
| `/now` N02 | BROWSE THE COMPLETE WORK |

- **Contract**: IA §Naming — one canonical name per surface.
- **Fix**: settle on "the work library" and use it in every label, heading, and
  link. Descriptive prose about the library may still vary.

### C4. Three surfaces are named some variant of "Ways of Working" `[verified]`

- `/work/ways-of-working` — record 10, LIVE · COLLECTION
- `/work/agentic-ways-of-working` — record 05, SOURCE · DOCS
- `/demos` — page titled **Ways of Working**

Two registry records with near-identical slugs, and a third page carrying one of
their titles. Search surfaces all three with no way to tell them apart.

- **Contract**: IA §Naming — no two records share a name.
- **Repro**: link targets on `/work`; page title on `/demos`.
- **Fix**: rename at least two.

### C5. The `Demos` nav label does not describe `/demos` `[verified]`

The page is titled **Ways of Working** and contains twelve written operating
sessions and eight applied techniques. "Demos" promises something interactive.

- **Contract**: IA §Naming — the nav label describes what is there.
- **Fix**: rename the label to `Sessions` or `Ways of Working`. The route may stay
  `/demos`.

### C6. Five search boxes, five scopes, no scope labels `[verified]`

| Where | Scope | Label |
|---|---|---|
| Header → `/search` | everything, including the separately published writing | "Search this site" |
| Compact nav dialog | same as `/search` | "Search this site" |
| `/work` | 26 work items | "SEARCH WORK" |
| `/demos` | 20 sessions and techniques | "SEARCH DEMOS" |
| `/blog` | 285 published pieces | "SEARCH THE PUBLICATION" |

- **Contract**: IA §Search — search scope must be labeled wherever a search box
  appears.
- **Fix**: label each in-page control with its scope and count, and give each a
  route to the site-wide search for the same query.

### C7. `/search`'s empty state teaches the data model `[verified]`

> "Try a product, domain, state, or idea. Examples: agent, volleyball, or internal."

`domain` and `state` are registry field names. "internal" only works as an example
if the visitor already knows it is a state value. `e7fca8b` renames `state` to
`status` in the same sentence, which does not change what it asks of the reader.

**Correction to an earlier draft.** That draft recommended "replace with clickable
example queries." The examples are *already* links — `app/search/page.tsx:184`
renders each as `<Link href="/search?q=…">`, and they were links in production too.
Rendered text does not show link-ness, and the draft inferred a defect from a text
capture without checking the source. The real defect is narrower: the instruction
sentence, and the choice of a status value as one of three examples.

- **Contract**: IA §Search — the site-wide empty state offers clickable example
  queries and does not instruct the visitor in field names.
- **Fix**: keep the links. Replace the instruction with the examples themselves,
  and swap the status-value example for a phrase a visitor would actually type.

### C8. Internal vocabulary is rendered to visitors `[verified]`

| Route | String | Term |
|---|---|---|
| `/search` | "Find **work objects**, demo sessions, applied techniques, writing, and **durable pages** from one place." | model names, sourced from IA §Search's index-scope list |
| `/now` N02 | "This **review build** is the current artifact." | reads as staging to a visitor on production |

`work object` and `durable page` are not copy slips — they are this contract's own
index-scope vocabulary rendered verbatim. IA §Search has been amended to mark the
boundary.

- **Contract**: AD §Copy — reader-facing nouns, not data-model names.
- **Fix**: "Find projects, sessions, techniques, essays, and pages about me."
  For `/now`: "This site is the current version of that consolidation."

### C9. `/work/commerce-practice` speaks in the third person — **resolved at `e7fca8b`** `[verified]`

At production: "The commerce practice is a public account of **Nino's**
architecture work across retail, B2B, grocery, and multi-brand platforms." Every
other page is first person — "I build the system", "I live in Chicago", "I update
this page".

**Resolved in the current tree.** The record is now `commerce-architecture` with
rewritten copy, and `grep -ro "Nino’s" app/` returns zero matches. Retained here
because the clause it produced (AD §Copy, first person) outlives the instance, and
because the defect is still live on production until the next deploy.

- **Contract**: AD §Copy — first person, everywhere Nino speaks. `PRODUCT.md`
  §Product — "presented by the person responsible for it."
- **Repro**: `grep -ro "Nino’s" app/` — 0 at `e7fca8b`.

### C10. The homepage renders counts as zero-padded ordinals `[verified]`

`08 Applied techniques` and `07 Learning paths` sit in the same visual family as
`01 Practice` and `02 Local-first`, which are sequence positions. `12 Operating
sessions` is not padded, so the same row mixes both conventions.

- **Contract**: AD §Copy — counts never render as ordinals.
- **Fix**: render counts unpadded: `12`, `8`, `7`.

### C11. `/work` record badges disagree with display order `[verified]`

Practice lists **10, 01, 02, 03, 04, 05, 06, 07, 08, 09**. Volleyball lists
**16, 17, 13, 14, 15**.

Mechanism: badges look like a stable index assigned at insertion, and cards sort
newest-first. Within each domain the older badges are already in date order
(01 = 28 Jul down to 09 = 9 Jul; 13 = 26 Jul down to 15 = 21 Jul). Only the three
newest items — 10, 16, 17 — hold the highest numbers while sorting to the top. One
round of new entries broke the correspondence.

Effect: a visitor reads "10" as the first item in a ten-item list, sees "01" below
it, and can decode neither.

- **Contract**: AD §Copy — "a sequence badge must also match the order the items
  are displayed in."
- **Fix**: derive badges from display order, or remove them.

### C12. Homepage domain tile 04 reads `1 RECORDS` `[verified]`

`/work` renders `1 RECORD` correctly for the same domain. The agreement bug is
only on the homepage.

- **Contract**: `PRODUCT.md` §Success criteria — state and availability are honest.
  A rendered claim that disagrees with itself across two routes is a credibility
  defect on a site whose premise is an accurate record.
- **Repro**: fetch `/`, read the Commerce tile.
- **Fix**: pluralize from the count. Locked by test C12 in
  `tests/audit-regression.test.mjs`.

### C13. Five passages negate a norm the visitor was never told about `[verified]`

- `/work`: "NOTHING IS HIDDEN FOR FAILING TO LOOK FINISHED."
- `/work`: "Every record stays visible when it can be described honestly."
- `/blog`: "Nothing is selected away."
- `/learn`: "not enrollment tracks or certification."
- `/now`: "It is not a daily activity log."

Each reads as answering a complaint the visitor has not made.

- **Contract**: AD §Copy — say what the reader gets, not what the site refuses to do.
- **Fix**: "Unfinished and internal work is listed too — the state label tells you
  what you can open today." "Updated when the focus shifts, not daily."

### C14. `state` is glossed in one place and used bare everywhere else `[verified]`

The `/work` filter glosses it well: "Live — running now", "Source — code or
reference is public", "Internal — exists, not public", "Building — in progress".
Detail pages render `State: internal` with no gloss; search results render
`PRACTICE · INTERNAL` with no gloss. Search sends visitors straight to detail
pages, so most meet the vocabulary unglossed first.

Adjacent defect: the same metadata block mixes an adjective and a noun phrase in
one field — `Access: public` on `/work/rally-hq`, `Access: private record` on
`/work/commerce-practice`.

**The defect changed shape at `e7fca8b`, and did not go away.** The bare-token half
is fixed — `app/work/[slug]/page.tsx:621` now renders `workStateLabels[item.state]`,
so detail pages show a label rather than a raw value. But the glosses themselves
were removed. `workStateLabels` in `app/data.ts:34` maps every state to a single
word: `live → "Live"`, `maintained → "Maintained"`, `published → "Published"`,
`building → "In development"`, `paused → "Paused"`. So the production build glossed
the vocabulary in one place and the current build glosses it nowhere. "Maintained"
tells a visitor strictly less than "Source — code or reference is public" did.

- **Contract**: AD §Copy — a coined term carries its gloss at first use.
- **Fix**: give `workStateLabels` a second field for the gloss and render it in the
  `/work` filter, on detail pages, and on search rows. Normalize `Access` to
  `public` / `private`. Locked by test C14 in `tests/audit-regression.test.mjs`.

---

## S3 — craft and consistency

### C15. The hero eyebrow pairs "26 RECORDS" with "SINCE 1999" `[verified]`

At 390px the eyebrow renders as a 2×2 grid:

```
OPEN PRACTICE                    CHICAGO
26 RECORDS                    SINCE 1999
```

"26 RECORDS" and "SINCE 1999" share a baseline at opposite ends of the same row.
The scan is "26 records since 1999" — 26 things in 27 years. The intended meaning
is tenure in software, which `/about` states correctly as "BUILDING SINCE 1999".
Desktop has the same adjacency, weaker.

- **Contract**: `PRODUCT.md` §Success criteria — honest claims. Not a false
  string; a false reading produced by adjacency.
- **Evidence**: 390px capture; measured text-node positions put both at `y=101`.
- **Fix**: pair the tenure with the role (`PRODUCT ARCHITECT + BUILDER · SINCE
  1999`), or change the string to `BUILDING SINCE 1999`.

### C16. Nav says "Writing"; the brand appears only after the click `[verified]`

`/blog` handles arrival correctly — eyebrow `WRITING / COMPLETE PUBLICATION` above
title `SIGNAL DISPATCH`. The seam is upstream: the homepage tile says **Signal
Dispatch** under the eyebrow **ONGOING PUBLICATION**, and the 404 page says "read
the publication". A visitor who has not clicked has no reason to connect them.

- **Contract**: IA §Naming — the nav label appears on the page it opens; where a
  destination has a brand the nav does not carry, the linking surface introduces
  both.
- **Fix**: "Signal Dispatch — my essays and field notes" on the homepage tile.
  Name it on the 404 page.

### C17. Five parallel numbering schemes `[verified]`

`/work` 01–26 plus `01 / 06` domain position; `/learn` L01–L07; `/demos` S01–S12;
`/now` N01–N04; `/links` D01–D04 groups plus L01–L11 items. Each is internally
consistent. `L01` means a learning path on `/learn` and a link on `/links`.

- **Contract**: AD §Cognition and Gestalt contract.
- **Fix**: keep numbering only where sequence carries meaning — `/demos` sessions
  and `/work` domain position. Drop the letter prefixes.

### C18. Search results mix navigation behaviors in one list `[verified]`

Writing results carry "(opens in a new tab)"; work results open in place.

- **Contract**: `IA-NAVIGATION.md` §Footer navigation sets the precedent —
  "External destinations are labeled as external. Links do not force a new tab."
- **Fix**: one behavior per result list.

### C19. `/learn` L01's end artifact is undecodable `[verified]`

"Personal cognitive mirror and bridge to creation." Compare L05's "Multi-volume
playbook of 20,000+ words," which names a real output.

- **Contract**: AD §Copy — reader-facing nouns.
- **Fix**: name the artifact.

---

## S4 — observation, for Nino's call

### C20. "Records" is the noun for every kind of thing `[verified]`

Rally HQ is a live product, Blueprint a method, Photography an archive, Commerce
practice an index of deliberately withheld work. All four are "records." A visitor
asking what Nino makes is handed the filing cabinet rather than the work. The
registry's own `form` vocabulary — site, cli, app, service, docs, collection —
already carries the distinction.

AD §Copy now restricts `record` as a *category* name, so a future pass may
reclassify this as S2. Left at S4 here because the fix touches the registry's
public vocabulary and `PRODUCT.md` §Content model, which is a product decision.

- **Suggested**: "26 projects, tools, and collections across 6 areas of work."

### C21. `/learn` week ranges have no basis `[verified]`

"4–8 weeks", "8–12 weeks", "12–20 weeks" on self-directed paths with no cohort and
no instructor. On a site whose authority rests on sourced evidence, these are the
softest claims present.

- **Contract**: AD §Copy — a duration or effort claim names its basis. Filed S4
  because removing or grounding them is an editorial choice, not a defect fix.

### C22. `/learn` uses "artifact" as visitor-facing vocabulary — kept `[verified]`

`app/learn/page.tsx` renders it four times, including the page's H1: "START WITH
THE ARTIFACT." Also "Each path ends in a concrete artifact" and the per-path field
label "END ARTIFACT."

`artifact` is model vocabulary by the letter of AD §Copy, so this was a candidate
for `reader-contract.json` `denyTerms`. **Not denied, deliberately.** The word is
load-bearing here: it carries the page's whole argument — choose the thing you need
to make, not a role you need to become — and no plainer noun ("output",
"deliverable", "thing you build") holds that meaning as tightly. Denying it would
have put a machine-readable rule in direct conflict with shipped copy.

Recorded so the exemption is a decision with a paper trail rather than an
oversight. If a future pass finds visitors cannot decode it, the rule already
exists to act on. `registry` and `snapshot` **are** denied — verified absent from
rendered copy, so those are forward-looking guards, not conflicts. `prototype` is
excluded too: it appears only as the `prototype-banner` class name.

- **Contract**: AD §Copy — reader-facing nouns. Exemption argued, not assumed.

---

## Photography subtree — added 2026-08-01, same pass

Scope: the consolidation of the formerly standalone photography site into the
profile. Surfaces examined: `/photography` (main app landing), `/photography/*`
(the legacy SvelteKit origin, served on the apex), `/work/nino-chavez-photography`,
`photography.ninochavez.co`, `robots.txt`, and both sitemaps.

**The subdomain retirement is complete and correct.** Every
`photography.ninochavez.co/*` path 301s to `ninochavez.co/photography/*`, query
strings survive the hop, and `apps/router` `resolveDestination` hands `/photography`
and `/photography/` to the main app while `/photography/*` goes to the photography
origin. The legacy homepage is shadowed, not competing. `robots.txt` declares all
three sitemaps and the photography sitemap holds 20,964 apex URLs.

### C23. `/photography/about` is an indexed second personal homepage `[verified]`

"Meet Nino Chavez — Started courtside at my kid's volleyball games. Never left."
followed by a full first-person biography in a different voice from `/about`, plus a
photography philosophy section.

It is **in the declared sitemap**, so it is eligible to be returned as the answer to
"who is Nino Chavez" in preference to `/about`. This is not two pages coexisting; it
is two biographies competing for the same query.

The content itself is the best "why" writing on the domain and `/about` has no
equivalent — `/about` says what Nino does, this says why he shoots. The defect is
location, not quality.

- **Contract**: `IA-NAVIGATION.md` §Page responsibilities — `/photography/**`
  **"Must not become: a second personal homepage."** Clause predates this pass.
- **Repro**: `curl -sS https://ninochavez.co/photography/sitemap.xml | grep '/photography/about'`
- **Fix**: move the two strong paragraphs onto `/photography` or
  `/work/nino-chavez-photography` (currently a thin spec sheet), then 301
  `/photography/about` → `/photography` and drop it from the sitemap.

### C24. Every entrance to the archive leaves for a retired host in a new tab `[verified]`

`/photography` is the section landing page. All six of its outbound entrances —
Search, Albums, Timeline, Collections, Favorites, and the contact-sheet link —
point at `https://photography.ninochavez.co/…?src=profile` with `target="_blank"`
and a rendered "(OPENS IN A NEW TAB)" label. The search control is a cross-host
GET form:

```
action: "https://photography.ninochavez.co/explore"
method: get, target: _blank, input: q | "Team, event, or #"
```

So the task path for the archive's highest-volume audience — a player or parent
looking for their own frames — is: submit to a retired hostname, 301 back to the
apex, land in a second tab of the same site. The query does survive the redirect,
so it works; it is a redirect hop and an orphan tab, not a broken link.

Two consequences beyond the hop. The destination is same-origin after the 301, so
"(OPENS IN A NEW TAB)" is now a false statement about internal navigation. And the
visitor ends up with two tabs of `ninochavez.co` and no way back to the landing
page except the wordmark.

- **Contract**: `IA-NAVIGATION.md` §Footer navigation — "External destinations are
  labeled as external. Links do not force a new tab." AD §Copy — a rendered claim
  that is no longer true is a copy defect.
- **Repro**: `curl -sSD- https://photography.ninochavez.co/explore?src=profile | grep -i location`
- **Fix**: rewrite all six to apex-relative paths, same tab, and remove the new-tab
  labels. Keep the authoritative search implementation in the photography runtime
  at `/photography/explore`; duplicating gallery search inside the portfolio landing
  would create the second implementation this consolidation is meant to remove.

### C25. Two indexed privacy policies for one domain `[verified]`

`/privacy` (profile) and `/photography/privacy` (legacy, "Last Updated: June 23,
2026") are both in the sitemap. The legacy one states it governs "this gallery at
ninochavez.co/photography."

**Read both before retiring either.** The profile policy is the broader of the two —
its §P03 covers Supabase authentication, engagement events with 90-day expiry,
one-way session dedup from IP and user-agent, and search-term retention; its §P05
covers published athlete names and jersey numbers plus a removal route for a
pictured person or the parent of a youth athlete.

One clause exists only in the legacy policy: the **submitter-side consent gate** —
"To submit a tag, you must confirm you have permission from the athlete (or their
parent/guardian if under 18)." The profile's §P05 grants the pictured person a
removal right but never states what the submitter must attest to. That is the
legally load-bearing half of a youth-athlete tagging feature.

- **Contract**: `IA-NAVIGATION.md` §Page responsibilities — `/privacy` owns "current
  policy"; two current policies means neither is authoritative.
- **Fix**: port the consent-gate sentence into `/privacy` §P05 **first**, then 301
  `/photography/privacy` → `/privacy`. Do not reverse that order.

### C26. The landing page understates the archive by three orders of magnitude `[verified]`

`/photography` renders "CONTACT SHEET / 12 FRAMES" and "12 FRAMES SHOWN" and states
the archive's size nowhere. `/photography/faq` — a legacy page — holds the real
figures: **20,655 photos**, 15,330 of them volleyball, across **251 albums** and 12
sports. The albums page renders `251` itself.

Both numbers are publisher-derivable, which is exactly the case AD §Content
ownership and freshness governs. A visitor judging whether this is a hobby or a body
of work is shown twelve frames and no scale.

- **Contract**: AD §Content ownership and freshness — "Counts in the interface are
  computed from the active snapshot." The count is available and not surfaced.
- **Fix**: derive and render the archive scale on `/photography` and on
  `/work/nino-chavez-photography`. Then `/photography/faq` can fold into the archive
  or stay as a utility page, but it stops being the only place the numbers live.

### C27. The global shell uses two different labels for the same control `[verified]`

The profile renders `Menu`; every photography route renders `Site menu`. Confirmed at
1280 and 390. Button styling differs too — the photography variant is a larger
outlined pill.

- **Contract**: `IA-NAVIGATION.md` §Global navigation — "The rendering
  implementation may differ by runtime; the labels, destinations, order,
  active-state rules, and accessibility behavior may not."
- **Fix**: one label. `Menu` is the shorter and is what the primary app ships.

### C28. `/photography/style-guide` is publicly reachable `[verified]`

Returns 200 on the apex and renders the gallery's internal design system —
"Design System v2.0.0", token swatches, component patterns.

**Not in the sitemap**, so this is a reachable dev surface rather than an indexed
leak. Downgraded accordingly.

- **Fix**: `noindex` plus a redirect, or leave it and accept that a URL-guesser can
  read the design system. Low stakes either way.

### C29. `/photography` sets no canonical tag while its children do `[verified]`

`/photography/albums` emits `<link rel="canonical" href="https://ninochavez.co/photography/albums">`.
`/photography`, served by the main app, emits none. The two runtimes disagree about
whether the section's own entrance needs one — and this is the page the retired
subdomain's root now 301s into.

- **Fix**: emit a canonical on `/photography`, matching the children.

### C30. Photography is structurally a top-level section and absent from primary nav `[verified]`

Primary nav is Work, Demos, Learn, Writing, About. Photography appears in the footer,
as one of three homepage "Work in the world" tiles, and as a `/work` record. But
`/photography` has five child routes, its own persistent sub-nav, 20,964 sitemap
URLs, and a distinct audience — which is the shape of a top-level section.

`Writing` is the precedent: also a separately published system with its own subtree,
and it holds a primary nav slot. Photography is the same shape without the slot.

Filed **S4** because adding a sixth primary item is a product decision, not a defect
fix, and `PRODUCT.md` non-goals include "giving every craft equal visual acreage."
The argument for it is audience, not fairness — see the reasoning recorded with this
pass. Six items stays within §Global navigation's single-level contract.

### Photography — checked and conforming

| Check | Result |
|---|---|
| Subdomain retirement | **Complete.** All `photography.ninochavez.co/*` paths 301 to the apex; query strings survive; the legacy homepage is shadowed by the router, not competing. |
| Global shell across the subtree | **Present on all of** `/albums`, `/timeline`, `/collections`, `/explore`, `/about` — global nav, wordmark home link, and footer. An earlier read showed it missing on four of five; that was a hydration timing artifact, not a defect. Recorded so it is not re-raised. |
| Discoverability | **Conforms.** `robots.txt` declares all three sitemaps; `/photography/sitemap.xml` holds 20,964 apex URLs. Not the gap an earlier draft assumed. |
| Archive at 390px | **Clean.** `scrollWidth` 390, no overflow, first photograph at 237px with an icon sub-nav and three compact filters above it. The containment failure mode this repo watches for does not fire here. |
| `/photography/photos` | 404 — no internal link targets it. |

---

## Checked and conforming

Recorded so these are not re-raised.

| Check | Result |
|---|---|
| Count reconciliation, work | 10 + 2 + 5 + 1 + 5 + 3 = **26**, matching the `/work` header, the homepage, and the filter footer's "26 of 26 in view" |
| Count reconciliation, demos | 12 sessions + 8 techniques = **20**, matching "Search all 20" |
| Count reconciliation, learn | 7 paths, matching the homepage tile |
| Count reconciliation, links | L01–L11 = **11**, matching "11 DESTINATIONS" |
| Count reconciliation, writing | 241 essays + 44 other = **285**, matching "285 PIECES" and "Search all 285" |
| Route health | `/blog`, `/photography`, `/links`, `/privacy`, `/work/rally-hq`, `/demos/twelve-messages`, `/learn/builder` all 200 |
| Nav link targets | every header and footer target resolves; `Writing → /blog` is correct, not the `/writing` 404 an early read suggested |
| Search relevance | grouped by type with per-group counts; case-insensitive; a no-match query returns an explicit empty state naming the query |
| `/about` | the strongest page in the pass. Biography, five-medium throughline, and the agent working model are concrete, first-person, and decodable cold. No findings. |
| Mobile overflow, homepage | `scrollWidth` 390 at a 390 viewport — no horizontal overflow |
| Launch banner | the `isPublicLaunch` gate holds; the private-review banner does not render in production |

**The site's central claim survives audit.** Not one count contradicts another
anywhere on the site, across five independent reconciliations. For a site whose
premise is an honestly labeled record, that is the claim that had to hold.

---

## Mechanized

`tests/audit-regression.test.mjs` gained cases C8, C10, C11, C12, and C14. Run
with `npm run test:audit`.

**All five failed when first run against `e7fca8b`.** That is the point: it converts
"observed on production" into "verified against the current tree," which is the
stronger claim and the one that survives a deploy.

Against `bd20957`, three passed and became live gates. The follow-up remediation
removed the remaining `todo` markers after C10 and C14 were fixed, then added live
gates for the mechanically testable photography findings.

### Follow-up resolution — 2026-08-01

| Finding | Resolution |
|---|---|
| C10 | Homepage quantities render without ordinal padding. |
| C14 | Every work status is explained in the filter, direct search results, and detail metadata. The visitor-facing field remains `Status`; `state` is only the data key. |
| C23 | The two useful story paragraphs now live on `/photography`; the router permanently redirects `/photography/about` to that section. |
| C24 | Every archive entrance is apex-relative and same-tab. Search remains authoritative at `/photography/explore` rather than being duplicated in the portfolio app. |
| C25 | The canonical `/privacy` policy now carries the youth-athlete permission gate; the router permanently redirects `/photography/privacy` to it. |
| C26 | `/photography` and its Work detail read current photo, video, and album totals from the gallery's existing publisher-owned stats endpoint. No count is copied into prose. |
| C27 | Every runtime uses `Menu` for the global compact-navigation control. |
| C28 | Already resolved before this remediation: the style guide emits `noindex, follow` and is absent from the sitemap. |
| C29 | `/photography` now emits an apex canonical and apex Open Graph image URL. |
| C30 | Photography is a sixth top-level navigation item in the main app, Signal Dispatch, and gallery shell. Its collection sub-navigation remains visually subordinate. |

Not mechanizable, and left to a re-run: C1 (whether the lede answers the
question), C2 (whether a definition is a *good* definition), C13 (framing), C15
(an adjacency defect needing a browser at 390), C17, C19, C20, C21.

The order matters: a green suite means the copy has not regressed on the parts a
machine can check. It does not mean the copy is good. The clauses say which is
which.

## Next

Re-run the affected routes after deployment per the triggers in
`docs/AUDIT-PLAN.md` §4. The browser pass must include the six-item header near its
desktop-to-compact breakpoint and the gallery's story, scale, search, and redirect
paths.
