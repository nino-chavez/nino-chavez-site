# Content strategist — copy defect list

- **Role**: 6 — labels, microcopy, headings, scan-ability, jargon, voice
- **Subject**: `d0cfd0e` on `codex/ia-navigation-prototype`
- **Evidence**: `docs/audit/evidence/d0cfd0e/html/` (36 rendered documents), plus
  the owning source files where the string is generated rather than authored.
- **Scored against**: `docs/OPEN-PRACTICE-ART-DIRECTION.md`,
  `~/Workspace/dev/apps/website-nc/docs/IA-NAVIGATION.md`, `PRODUCT.md`, and
  `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md`.
- **Explicitly out of scope**: conversion and CTA optimization. `PRODUCT.md`
  §Non-goals rejects a services funnel, so "strengthen this CTA" is not a
  finding. Counts are the claims auditor's lane; this pass does not verify them.

Severity per `docs/AUDIT-PLAN.md`: **S1** blocks launch. **S2** approved contract
clause violated. **S3** craft and consistency. **S4** observation outside
contract.

---

## Correction to the shared ledger — read before consolidating

`FINDINGS.md` §Checked and conforming, row **"URL-backed filters"**, currently
reads: *"Conforms at the server. `/work?domain=commerce` server-renders 206 tags
against 596 unfiltered; `/blog?type=essay` renders 171 KB against 353 KB. Filter
state is honored in SSR."*

**The `/blog?type=essay` half of that is wrong, and the byte figure is what made
it look right.** The captured document renders "**0 of 285 published pieces in
view**" and the No-matches empty state. The size drop is the cost of rendering
an empty list, not a filtered one — and `blog_q_agents_year_2026.html` is
*larger* (182 KB) than the "successful" case while showing six records, so byte
delta was never evidence of filtering either way.

Root cause: the URL parameter is matched case-sensitively against title-case
values (`Essay`, `Whitepaper`, …), so `?type=essay` matches nothing while
`?type=Essay` works. A shared or hand-typed filtered URL lands on an empty
archive. That is an **S1 candidate in the wayfinding / claims lane**, not this
one — flagging it, not claiming it. The row is marked "recorded so these are not
re-raised," which is why the correction has to be explicit.

- **Evidence**: `evidence/d0cfd0e/html/blog_type_essay.html`;
  `app/writing.ts:3-32`; `app/components/WritingLibrary.tsx:57,95`
- The `/work?domain=commerce` half of the row is untested here and may well hold.

---

## Findings

### [S2] `/work/:slug` — "Why this exists" reprints the sentence directly above it

Every work record renders `item.claim` twice: once as the header lede, then
again, verbatim, under a heading that promises something new.

On `/work/fleet-observability`, the lede reads "A working internal view of
repository health, deployments, and maintenance risk." Two lines down: "**01 /
Context — Why this exists** — A working internal view of repository health,
deployments, and maintenance risk." Identical on `/work/rally-hq` and
`/work/volleyrx`; it is structural, not a data slip.

A reader who follows the heading gets nothing for the click of attention. The
section reads as a template with a slot, which is exactly the failure the IA
contract names.

`/demos/:slug` proves the site knows how to do this. On `/demos/twelve-messages`
the lede is the session's claim, and the three sections underneath each carry
something new — "01 / Reader — Anyone delegating real work to an AI agent",
"02 / Evidence — the verbatim conversation, a five-principle method…",
"03 / Practice — Steal the shape: templates over outputs, constraints in the
repo, judgment kept human." Same three-block shape, zero repetition. `/work/:slug`
is the exception, not the pattern.

- **Contract**: `IA-NAVIGATION.md` §Page responsibilities — `/work/:slug` "must
  not become **a required template for every object**." Also
  `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Economy of rules: a line
  appears only when it communicates a boundary… that spacing and figure-ground
  cannot express more clearly."
- **Evidence**: `app/work/[slug]/page.tsx:117` (`<p className="lede">{item.claim}</p>`)
  and `app/work/[slug]/page.tsx:147-149` (`<h2>Why this exists</h2><p>{item.claim}</p>`);
  rendered in `evidence/d0cfd0e/html/work_fleet-observability.html`,
  `work_rally-hq.html`, `work_volleyrx.html`
- **Fix**: drop the duplicated paragraph and let `01 / Context` carry a distinct
  `context` field — the origin, not the claim. For Fleet Observability:
  *"Repository health was living in six dashboards and my memory. This pulls
  deployment state, dependency drift, and maintenance risk into one view I
  actually check."* Where no distinct context exists yet, delete the `01 /
  Context` block for that record rather than restating the lede.

### [S2] `/` — "Product surface · Published collection · Finished frame" is three coined labels in a row with no gloss

The evidence bench on the homepage introduces its three objects with invented
category names before naming anything a reader can picture:

> "Evidence in use — 03 working surfaces … **Product surface** Rally HQ … **Published collection** Signal Dispatch … **Finished frame** Nino Chavez Photography"

"Working surfaces," "product surface," "published collection," and "finished
frame" are internal taxonomy. A cold visitor cannot tell what distinguishes a
"finished frame" from a "published collection" — and the objects underneath
(a tournament app, a blog, a photo site) are all plainly nameable.

- **Contract**: voice guide §Concrete Over Coined — "A list of three or more
  coined terms in a row, with no gloss, is the most reliable form of this trap…
  To a reader, it's four opaque words pretending to be evidence." Also
  `OPEN-PRACTICE-ART-DIRECTION.md` §Functional model — "captions identify what
  each object is **without introducing another campaign headline**."
- **Anticipated objection**: §Functional model does say "product surfaces,
  published work, and finished output." That sentence describes the register's
  *contents* to a reader of the art direction; it does not authorize those words
  as on-screen labels. The same document draws that line explicitly elsewhere —
  counts come from the publisher "instead of being copied into this document
  **or the interface**." Document vocabulary is not interface vocabulary.
- **Evidence**: `evidence/d0cfd0e/html/index.html`, evidence-bench section
- **Fix**: **delete the coined eyebrow.** Each card already reads
  `[eyebrow] / [name] / [plain descriptor · state] / [action]` — "Product
  surface / Rally HQ / Tournament operations · live / Open Rally HQ →". The
  plain descriptor already does the eyebrow's job. Removing the first line
  leaves "Rally HQ — Tournament operations · live — Open Rally HQ →", which a
  cold reader can picture without a glossary. Section heading "Evidence in use —
  03 working surfaces" becomes **"Three things you can open right now."**

### [S3] `/learn` and `/learn/architect` — arc42, C4, and decision records carry the Architect path with no gloss

The Architect path's end artifact is stated as "**Complete arc42 solution
architecture**." Every other path states its artifact in plain words ("Deployed
production application", "Executive-ready strategic brief"), so this one line is
the outlier, not the register.

On the track page the density triples. The fit check — the section whose entire
job is helping a reader decide — reads: "**You need C4 diagrams, decision
records, and one coherent reference.**" Three insider terms in one sentence, none
defined. Stage 00 then compounds it: "Understand where **C4, arc42, and decision
records** each fit… Done when you can explain the four C4 levels."

A reader who does not already know C4 cannot use the fit check to decide whether
the path is for them, which is the only thing the fit check is there to do.

- **Contract**: voice guide §Concrete Over Coined — "A list of three or more
  coined terms in a row, with no gloss, is the most reliable form of this trap…
  Gloss it the first time."
- **Evidence**: `evidence/d0cfd0e/html/learn.html` (path L 03);
  `evidence/d0cfd0e/html/learn_architect.html` (Fit check, Path stage 00)
- **Fix**: gloss each once, at first use, then use the short name freely.
  - End artifact → **"A full architecture document in arc42 — the standard
    section template teams use so another engineer can build the system without
    asking you to explain it."**
  - Fit check → **"You need C4 diagrams (four zoom levels, from system context
    down to code), a written record of why each big choice was made, and one
    reference that holds them together."**
  - Stage 00 goal → **"Understand where each format fits: C4 for diagrams,
    arc42 for the document, decision records for the reasoning."**

### [S3] `/work` — the State filter's six options are insider vocabulary presented without meanings

The State control offers `install`, `live`, `source`, `internal`, `building`,
`paused` — lowercase, unglossed, in a dropdown. Three of the six are not
self-evident: `source` means the code is public but the product may not be
installable; `internal` means it exists and you cannot see it; `install` names
an action, not a state, and sits in a list of adjectives.

The page does explain the idea — "State tells you what can be opened, installed,
read, or inspected now" — but that sentence lives in the domain-atlas section
above the library, and it never maps an option to its meaning. Proximity is the
contract's own word for what is missing.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Proximity: a
  state, count, caption, or constraint stays **beside the object it
  qualifies**." Also §Action-object contract — "Filter controls… keep their
  label, value, and control indicator grouped."
- **Evidence**: `evidence/d0cfd0e/html/work.html`, State `<select>`
- **Fix**: label each option with its meaning rather than its enum value —
  **"Live — running now"**, **"Source — code is public"**, **"Install — you can
  install it"**, **"Internal — exists, not public"**, **"Building — in
  progress"**, **"Paused — kept, not active"**. The URL parameter keeps the
  short value; only the visible label changes.

### [S3] `/blog` — the Subject filter exposes editorial bookkeeping as reader-facing choices

The Subject list offers eighteen options including **"Uncategorized"**,
**"Consulting"** *and* **"Consulting Practice"**, **"Reflection"** *and*
**"Reflections"**, and **"Counterpoints"** — which collides with the Form filter's
**"Counterpoint"** directly beside it.

A reader choosing "Consulting" cannot know whether the piece they want is filed
under "Consulting Practice" instead, and "Uncategorized" asks them to browse the
publisher's backlog hygiene.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Content ownership — "one source
  owns each record"; §Action-object contract — "Filter controls look editable
  before focus and keep their label, value, and control indicator grouped."
  A control whose options overlap cannot predict its own result.
- **Evidence**: `evidence/d0cfd0e/html/blog.html`, Subject `<select>`
- **Fix**: collapse the pairs at the source index (merge "Consulting Practice"
  into "Consulting", "Reflections" into "Reflection") and suppress
  "Uncategorized" from the visible options — pieces without a subject stay in
  "All subjects" and remain findable by search. If the merge has to wait on
  Signal Dispatch, alias them in this site's filter map so one visible option
  matches both stored values.

### [S3] `/demos` — the empty state names the records something the page never calls them

The no-results heading reads: **"No collection records match the current
view."** Nowhere else does `/demos` use "collection records" — the page's own
vocabulary is *sessions* and *applied techniques*, taught explicitly two screens
up ("Sessions preserve sequence… Techniques preserve reuse").

The failure surfaces at the exact moment the reader is already confused.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Similarity:
  repeated objects mean repeated behavior"; the interface should not rename its
  own objects between states.
- **Evidence**: `app/components/DemoLibrary.tsx:264`
- **Fix**: **"No sessions or techniques match the current view."**

### [S3] All three libraries — the empty state says "clear the view" and the button says "Clear filters"

`/work`, `/blog`, and `/demos` share one empty state: "**Active criteria**:
{list}. Remove one or **clear the view** to return to all 285 pieces." The
button immediately below is labeled **"Clear filters."**

Two names for one action, one line apart. "Active criteria" is also system
vocabulary — the controls the reader used are labeled Search, Form, Subject, and
Year, none of which is a "criterion."

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Action-object contract —
  "Behavioral consistency: visually equivalent objects behave equivalently…
  Responsive compression may shorten an action label, but it does not remove the
  only action cue." A label that changes name mid-instruction breaks the same
  correspondence.
- **Evidence**: `app/components/WritingLibrary.tsx:269-281`,
  `app/components/WorkLibrary.tsx:240-252`,
  `app/components/DemoLibrary.tsx:262-274`
- **Fix**: **"Filters applied: {list}. Remove one, or clear all filters to see
  all 285 pieces."** Button stays "Clear filters."

### [S3] `/work/:slug` — the "Public surface" and "Limit" boilerplate is legal-notice voice, not first-person

Three sentences render on records across the site:

> "There is no public destination attached to this record. Its purpose and current state are **the authorized surface**."
> "A public destination is linked below. **The record does not imply anything beyond the labeled state.**"
> "Implementation detail remains intentionally private. **No client or employer claim is inferred.**"

The honesty is right and it is the site's whole thesis. The register is wrong:
"the authorized surface," "does not imply," "is inferred" is passive
disclaimer-speak on pages that are otherwise Nino in first person ("I build the
system, run the operation, and keep the evidence").

- **Contract**: voice guide §What to Avoid — corporate jargon and academic
  distance; §Usage Guidelines — "Use 'I' not 'you should'." `PRODUCT.md`
  §Content hierarchy — "a concrete **first-person** description of the practice."
- **Evidence**: `app/work/[slug]/page.tsx:49-53` (`publicScope`),
  `app/work/[slug]/page.tsx:56+` (`recordLimit`)
- **Fix**: keep the constraint, drop the passive voice.
  - no destination → **"Nothing to open. What it is and where it stands is all I
    can show publicly."**
  - has destination → **"The link below is the real thing. Its state is the only
    claim I'm making about it."**
  - `internal` → **"How it's built stays private. Nothing here is a claim about
    a client or an employer."**

### [S3] `/about` — "More execution. Same accountability." is a retired voice tell

The Working model section heads with **"More execution. Same accountability."**
That is the exact "Two X. Same Y." shape the voice guide retires by name, citing
"Two different modes. Same instinct." as a phrase that "through repetition… has
become hollow."

The paragraph underneath is strong and specific — agents "research, draft, code,
test, review, and package," but "do not decide what the work is for, what may be
published, or whether a judgment is honest." The heading is doing less work than
the body it introduces.

- **Contract**: voice guide §Phrases that have become tells; §Sentence-Level
  Mechanics — "If every post has 'Two [X]. Same [Y].'… it becomes a signature
  tic instead of a tool."
- **Evidence**: `evidence/d0cfd0e/html/about.html`, section `03 / Working model`
- **Fix**: promote the actual claim into the heading — **"Agents do the
  execution. I keep the judgment."**

### [S3] `/search` — "Search is intentionally global" answers an objection the reader has not made

The heading below the search box reads **"Search is intentionally global."**
"Intentionally" defends a design decision to a reader who arrived wanting to
find something. The line that follows — "Try a product, domain, state, or idea"
— is the useful one, and it re-uses `domain` and `state` as if they were
everyday words.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Page expression model —
  "Utility — Search, Links, Privacy. These pages remain **quiet and direct**."
- **Evidence**: `evidence/d0cfd0e/html/search.html`
- **Fix**: heading → **"One search covers everything."** Hint line →
  **"Examples: agent, volleyball, Rally HQ."** (Paired with the placeholder fix
  in the search-placeholder finding below; the two rewrites are one change.)

### [S3] `/` — "Human-led" is an unattached claim in the identity strip

The first line of the stage reads: "Open practice · Chicago · 32 records ·
**Human-led** · Product architect + builder". Four of those five items are facts.
"Human-led" is a position, dropped into a metadata rail with nothing to attach
it to — a reader five seconds in cannot tell what it is led *instead of*.

The site makes this argument well two screens down ("They do not decide what the
work is for, what may be published, or whether a judgment is honest") and again
on `/about`. In the strip it is a slogan.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Functional model — captions
  must not "introduce another campaign headline."
- **Evidence**: `evidence/d0cfd0e/html/index.html`, identity strip
- **Fix**: cut it from the strip. The claim is already carried, with evidence,
  by the sentence beneath the name and by `/about`. If a fifth item is wanted,
  a fact belongs there — **"Since 1999"**.

### [S3] `/demos/:slug` — two slugs each name a session and a technique, and match neither title

`adopt-or-skip` and `config-probe` are each used twice — once as a session slug,
once as a technique slug — for four objects with four unrelated titles:

| URL | Renders |
|---|---|
| `/demos/adopt-or-skip` | Session 12 of 12 — **"One Component I Didn't Already Have"** |
| `/demos/applied/adopt-or-skip` | Applied technique 01 of 8 — **"Run the Subtraction Before You Install"** |
| `/demos/config-probe` | Session 11 of 12 — **"The Sycophancy Was in the Config"** |
| `/demos/applied/config-probe` | Applied technique 02 of 8 — **"Bare-Arm Test Your Agent Config"** |

A URL is a label. These four predict nothing, and each one predicts its twin
more strongly than itself — a visitor who reads `/demos/adopt-or-skip` in a
shared link, a browser history entry, or a status bar will expect the adopt-or-
skip technique and get a session about a plugin audit. Every other session slug
in the set tracks its title (`browse-tool`, `four-questions`, `beautifier`,
`landmine-registry`); these two are the exception.

Whether the shared key is also a routing hazard is the wayfinding lead's call —
handing that over. The label defect stands either way.

- **Contract**: `IA-NAVIGATION.md` §Link labels — "A link label names the visitor
  outcome"; `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Similarity: repeated
  objects mean repeated behavior. **Unlike work keeps an unlike visual form,
  even when it shares the same data and action grammar.**"
- **Evidence**: `app/demo-data.json` — `sessions[].slug` and `techniques[].slug`
  both contain `adopt-or-skip` and `config-probe`;
  `evidence/d0cfd0e/html/demos_adopt-or-skip.html`,
  `demos_applied_adopt-or-skip.html`, `demos_applied_config-probe.html`
- **Fix**: give the two sessions slugs drawn from their own titles —
  `/demos/one-component` and `/demos/sycophancy-in-the-config` — and leave the
  technique slugs as they are. Redirect the old session paths.

### [S3] `/demos/applied/:slug` — "The technique behind demo 12" uses a noun the site does not

Both applied-technique pages close their summary with "**The technique behind
demo 12.**" / "**The technique behind demo 11.**" Everywhere else the site calls
these objects *sessions* — "Session 12 of 12", "12 Sessions", "Operating
sessions", "Sessions preserve sequence", "Return to all sessions". "Demo" is the
nav label for the collection, never the name of a member.

The number is also unlinked, so a reader is told to go find demo 12 by hand.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Continuity:
  shared alignment, type roles, palette, navigation, and **action language**
  connect the routes."
- **Evidence**: `evidence/d0cfd0e/html/demos_applied_adopt-or-skip.html`,
  `demos_applied_config-probe.html`
- **Fix**: **"Pulled from Session 12."** — with the session title as the link
  text if the summary can carry one. The Related sessions block below already
  links it correctly; the summary line just needs to use the same word.

### [S3] `/demos` — the only primary destination whose page does not contain its own nav word

Every route in the primary and secondary navigation bridges the nav label to the
page by one of two mechanisms — the `<h1>` repeats the label, or the eyebrow
carries it as the first token:

| Route | Nav label | Eyebrow | `<h1>` | Bridged |
|---|---|---|---|---|
| `/work` | Work | "Complete working record" | **Work** | h1 |
| `/learn` | Learn | "**Learn** / practitioner paths" | Start with the artifact. | eyebrow |
| `/blog` | Writing | "**Writing** / complete publication" | Signal Dispatch | eyebrow |
| `/about` | About | "**About** / durable profile" | Nino Chavez | eyebrow |
| `/now` | Now | "**Now** / current attention" | Now | both |
| `/links` | Links | "**Links** / maintained directory" | Links | both |
| `/privacy` | Privacy | "**Privacy** / current policy" | Privacy | both |
| `/search` | Search | "Global utility" | **Search** | h1 |
| `/photography` | Photography | "Nino Chavez / **Photography**" | Photography | both |
| `/demos` | **Demos** | "Operating record" | Ways of Working | **neither** |

A visitor who clicks Demos arrives at a page headed "Ways of Working" over the
eyebrow "Operating record" and has to infer that it is the right place. Both
names are correct — Ways of Working is a real published property and the IA
contract locks the nav label — so this is not a rename. It is a missing bridge,
and the site already owns the mechanism.

Its own children bridge correctly: `/demos/twelve-messages` breadcrumbs "Demos /
Sessions / Twelve Messages" and `/demos/applied/config-probe` breadcrumbs "Demos
/ Applied / …". The index is the one page in the collection that drops the word.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "**Continuity:
  shared alignment, type roles, palette, navigation, and action language connect
  the routes.**" Also `IA-NAVIGATION.md` line 80, which locks "Work, Demos,
  Learn, Writing, About, in that order" — so the fix is on the page, not the nav.
- **Evidence**: `evidence/d0cfd0e/html/demos.html` vs the nine other rendered
  route documents in the same directory
- **Fix**: one word in the eyebrow — **"Demos / operating record"**. The `<h1>`
  stays "Ways of Working."

### [S3] `/blog` — a filtered URL that returns nothing gets an empty state that cannot explain why

`/blog?type=essay` server-renders "**0 of 285 published pieces in view**" over
"No matches — Active criteria: form "essay". Remove one or clear the view to
return to all 285 pieces." There are 241 essays. The filter values are
title-case (`Essay`), so the lowercase parameter matches nothing.

The root cause is case-sensitive parameter matching and belongs to the wayfinding
lead. The copy defect is separate and survives whatever they decide: the empty
state quotes the criterion back to the reader as though it were valid, and offers
exactly one recovery — throw away every filter. A reader cannot learn from this
screen that the value, not the field, is the problem.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Action-object contract —
  "**Honest feedback:** only interactive objects receive interactive… feedback.
  Hover, keyboard focus, and touch activation identify the same owning object."
  The empty state identifies a criterion the system did not actually honor.
- **Evidence**: `evidence/d0cfd0e/html/blog_type_essay.html`;
  `app/writing.ts:3-32` (values are `Essay`, `Whitepaper`, …);
  `app/components/WritingLibrary.tsx:57,95`
- **Fix**: name the unrecognized value and offer the nearest real one —
  **"Nothing is filed under form 'essay'. Did you mean **Essay** (241 pieces)?"**
  with the corrected filter as a link, keeping "Clear filters" as the fallback.
  When the criteria are genuinely valid and simply return nothing, the current
  wording is fine.

### [S3] Search placeholders name fields the reader cannot see, and the one page called Search has none

Four search inputs, four different promises:

| Input | Placeholder |
|---|---|
| `/work` | "Name, purpose, domain…" |
| `/demos` | "Title, evidence, or practice…" |
| `/blog` | "Title, argument, or **tag**…" |
| `/photography` | "Event, team, or jersey #" |
| `/search` | *(none)* |

`/photography`'s is the model — every term is a thing the visitor already has in
hand. `/blog`'s invites the reader to search by **tag**, but no tag is rendered
anywhere on `/blog`; tags exist only inside the search index. The visible filters
there are Form, Subject, and Year, and the placeholder names none of them.
`/demos` offers "evidence" and "practice," neither of which is a field, a filter,
or a label on that page.

And `/search` — the route whose entire job is searching — ships a bare input. Its
hint ("Try a product, domain, state, or idea. Examples: agent, volleyball, or
internal") sits *below* the control, and re-uses `domain`, `state`, and
`internal` as if they were ordinary words.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Action-object contract —
  "**Filter controls look editable before focus and keep their label, value, and
  control indicator grouped**"; §Cognition — "Proximity: a state, count, caption,
  or constraint stays beside the object it qualifies."
- **Evidence**: `grep -o 'placeholder="[^"]*"'` across
  `evidence/d0cfd0e/html/*.html`; `evidence/d0cfd0e/html/search.html`
  (`<input id="site-query" type="search" autofocus name="q">`, no placeholder);
  `app/components/WritingLibrary.tsx:30-38` (searchable fields)
- **Fix**: promise only what the reader can see.
  - `/blog` → **"Title, topic, or a phrase you remember…"**
  - `/demos` → **"Session title, technique, or a topic…"**
  - `/search` → add **"Search everything — a project, a topic, a word you
    remember…"**, and change the hint below to **"Examples: agent, volleyball,
    Rally HQ."** (Dropping `internal` from the examples: it is the one term
    there that only makes sense after reading the Work page's state vocabulary —
    see the State-filter finding above.)

### [S3] `/now` — the page's answer is a four-item list written as one prose sentence

The lede reads:

> "Four things have my attention. **The day job, consolidating the public record, tightening agent-assisted practice, and running volleyball systems in real conditions.**"

The sentence announces a count, then hides the four items inside a 21-word noun
pile with mismatched grammar — one bare noun followed by three gerund phrases.
The four `N0n` blocks immediately below are the same four things, correctly
parallel and correctly separated. The lede is the only place they are hard to
read, and it is the first thing a returning visitor reads.

- **Contract**: voice guide §Lists — "**Convert inline lists to bullet points
  when you have 3+ items.** ❌ Avoid: comma-separated lists buried in prose."
  Also §Lists — "Parallel structure (all start with verbs, or all are nouns)."
- **Evidence**: `evidence/d0cfd0e/html/now.html`, lede
- **Fix**: break it and make the items parallel — **"Four things have my
  attention: the day job, consolidating the public record, tightening
  agent-assisted practice, and running volleyball systems in real conditions."**
  as four lines, or cut the lede entirely and let the `N0n` blocks answer, since
  they already say it better.

### [S3] `/privacy` — three of the six contents-rail labels do not match the heading they jump to

The jump rail and the section headings disagree:

| Rail | Section heading |
|---|---|
| `P05` **People in photographs** | `P05 / Photographs` — People in the collection |
| `P06` **Choices and contact** | `P06 / Control` — Your choices and contact |
| `P02` Public site | `P02 / Public site` — What the site receives ✓ |

A reader who scrolls back looking for "Choices and contact" finds "Control"
instead. The mismatch is small, but on the one page where a visitor may be
looking for a specific obligation, the index should name what it lands on.

This is the only defect on `/privacy`. Reading rhythm on that page is the
strongest on the site: it front-loads its answer ("No ads. No data sales. No
cross-site profiling."), keeps paragraphs to one or two sentences, uses bolded
lead-ins, and stays first-person and honest — "I will not pretend I can identify
a record when I cannot."

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "Continuity:
  shared alignment, type roles, palette, navigation, and **action language**
  connect the routes."
- **Evidence**: `evidence/d0cfd0e/html/privacy.html`
- **Fix**: make the rail label the heading. `P05 / People in photographs`,
  `P06 / Choices and contact`.

### [S3] `P0n` means three unrelated things on three pages

The same Space Mono prefix token indexes three different kinds of object:

| Page | `P01`… | What it indexes |
|---|---|---|
| `/about` | `P01`–`P03` | destination cards under "04 / Continue" |
| `/photography` | `P01`–`P05` | entry points into the live archive |
| `/privacy` | `P01`–`P06` | policy sections |

A reader who learns what `P0n` means on one page learns nothing transferable.
The site also runs `N01`–`N04` on `/now`, `L 01`–`L 07` on `/learn`, `D01`–`D04`
plus `L01`–`L11` on `/links` (two schemes on one page), `S 01`–`S 12` on
`/demos`, `E001`–`E241` on `/blog`, and `E 01`–`E 03` for evidence records on a
track page — where `E` means something different than it does on `/blog`.

Where the number carries real order it earns its place: `/demos` sessions have a
publication sequence the art direction requires preserved, and `/blog` groups by
form. Where it indexes three destination cards or six policy sections it is
decoration wearing the costume of a system.

- **Contract**: `OPEN-PRACTICE-ART-DIRECTION.md` §Cognition — "**Similarity:
  repeated objects mean repeated behavior.** Unlike work keeps an unlike visual
  form, even when it shares the same data and action grammar." One token, three
  behaviors, is the inverse of that clause. §Typography sanctions Space Mono for
  "sequence" but does not require a sequence where none exists.
- **Evidence**: `evidence/d0cfd0e/html/about.html`, `photography.html`,
  `privacy.html`, `links.html`
- **Fix**: keep the prefixes only where the order is real and reader-visible —
  `/demos` sessions, `/blog` pieces, `/learn` paths, `/privacy` sections (they
  are jump targets). Drop them from `/about`'s three destination cards and
  `/photography`'s five entry points, where nothing is ordered. Then make the
  heading predict the content: `/about` **"04 / Continue"** → **"Where to go
  next"**.

---

## Checked and conforming

Recorded so these are not re-raised.

| Check | Result |
|---|---|
| **Result rail on `/blog`** | **Conforms.** In a filtered archive the rail reads "6 of 285 published pieces in view / 2 criteria active / Adjust filters ↑" — count, scope, active-filter total, and a labeled route back to the controls, all persistent. This is the art direction's clause ("a persistent result rail keeps the count and a direct return to the filters available deep in the archive") met literally. Same pattern on `/work` ("1 of 32 records in view") and `/demos` ("2 of 20 records in view"). Verified in `blog_q_agents_year_2026.html`, `work_q_agent_state_live.html`, `demos_q_corpus.html`. |
| Honest labeling of unavailable work | **Conforms, and unusually well.** `/work/fleet-observability` and `/work/volleyrx` say "No public destination" plainly and add "What this record does not claim." `/photography` marks every external entry "(opens the live archive)". `/links` labels external destinations. Nothing found overstates readiness. Register on the `/work` boilerplate is a separate finding above; the honesty itself is not in question. |
| Reading rhythm — `/privacy` | **Strongest on the site.** Answer first ("No ads. No data sales. No cross-site profiling."), one-to-two-sentence paragraphs, bolded lead-ins, first-person throughout. |
| Reading rhythm — `/learn/:track` | **Conforms.** `/learn/architect` front-loads "Start when / End artifact", separates "Use this path if" from "Choose another path if", and gives every stage a checkpoint ("Done when…") rather than a duration promise — "Move on when the checkpoint is true, not when the time estimate expires." Density is a jargon problem, not a rhythm problem; see the arc42 finding. |
| Reading rhythm — `/about` | **Conforms.** Short first-person paragraphs; the Working-model section states the boundary concretely — agents "research, draft, code, test, review, and package," but "do not decide what the work is for, what may be published, or whether a judgment is honest." Only the section heading is flagged. |
| Voice on `/` and `/work` | **Conforms.** "I build the system, run the operation, and keep the evidence." / "Nothing is hidden for failing to look finished." / "State tells you what can be opened, installed, read, or inspected now. It does not decide whether the work belongs." First-person, concrete, no marketing register. |
| Marketing / agency boilerplate | **None in site copy.** Grepped all 36 rendered documents for the voice guide's named failure register (leverage, drive value, impactful, seasoned, synergize, best-in-class, cutting-edge, world-class, passionate about, game-changing, holistic, empower, unlock, seamless, delve). Four hits, all inside Signal Dispatch post excerpts owned by the publisher, and all correct usage — "high leverage" as the consulting-economics noun, "the game changed" as a plain past-tense statement. Zero in navigation, headings, controls, or any copy this site authors. |
| Review-build banner | **Conforms.** "Private art-direction review — Open Practice — production remains unchanged" is present on every route and states the status plainly. |
| Empty-state consistency | Three libraries share one pattern and one button label. The wording defects are filed above; the consistency is correct. |
| Detail-page structure — `/demos/:slug`, `/demos/applied/:slug` | **Conforms.** Header lede, three sections, no repetition; "Who this is for / What the session shows / What to reuse" each carry distinct content. Sequence position ("Session 01 of 12"), previous/next, and related objects are all present, matching the IA contract's required content for both routes. The slug and "demo 12" defects above are labeling, not structure. |
