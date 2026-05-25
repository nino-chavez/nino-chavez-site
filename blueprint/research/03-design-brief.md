---
canonical: true
stage: 3
status: draft
last_updated: 2026-05-25
voice_mode: solution-architecture
version: 0.1
---

# 03 — Design Brief

Brownfield Stage 3 deliverable for the `ninochavez.co` v3 redesign. Visual
+ IA direction for the changes prescribed in `02-prescription.yml`,
integrated with the site-shape calibration from `peer-cohort.md` and the
voice/positioning calibration from `market-cohort.md`.

This brief commits to one direction per decision with rationale. Where
alternates were considered and rejected, they're named so the choice is
traceable. Stage 4 fact-check validates against this brief; Stage 6 deploys
against it.

## Operating constraints (carried forward)

Resolved in `01-diagnose.md § Open questions resolved` (2026-05-25):

- **Fresh design direction** — neither DESIGN.md (violet + content-forward) nor live `/` (lime + bento + spectacle) is canonical. This brief authors the new system from clean slate.
- **Architect-primary home; facets in nav only** — creative pursuits move off `/` body entirely.
- **Single general inquiry path** — no scoped speaking/advisory/methodology forms.
- **`/ai/` is shipped, not experimental** — surface it from `/`.

Confirmed in `_external-corpus.md` (2026-05-25 receipt bucket interview):

- Cite the 11 CURRENT receipts as live. Mention 2 EVOLUTION items only as "where I started." Don't cite ADJACENT/EXPERIMENT.

Confirmed in the 2026-05-25 differentiation question:

- All 8 differentiation moves commit at launch (not staged across iterations).
- Visual personality: editorial-warm with serif moments.
- Methodology meta-receipt lives in footer / colophon, not above the fold.

## Differentiation thesis

The cohort calibration (`peer-cohort.md` + `market-cohort.md`) names the
shape v3 would default into if it followed cohort norms: a 12th
capability-sentence-plus-receipt-list site. To not be an also-ran, v3
deviates intentionally along these axes:

| # | Axis | Commitment |
|---|---|---|
| 1 | Subject intersection | Capability sentence names the commerce × harness-engineering intersection (empty subspace per market-cohort.md). |
| 2 | Receipt volume | 11 CURRENT receipts + 277 Signal Dispatch posts surfaced on `/`. More density than any cohort site. |
| 3 | Methodology meta-receipt | `/colophon` + footer line: "this site is the latest output of the same Blueprint methodology that shipped rallyhq.app." |
| 4 | Live runtime signals | Home-page strip surfaces latest Signal Dispatch post, current Rally HQ status, in-flight Blueprint stage. Live, not static. |
| 5 | Speaking surface | Full `/speaking` page with bio variants, headshot, topic list. No cohort site has one. |
| 6 | AI chat FAB | Persistent FAB grounded in Signal Dispatch corpus via Cloudflare Vectorize. Architect-directs-agents demonstrated at the surface. |
| 7 | Show the kitchen | Receipts link to methodology repos (Blueprint, Atelier) alongside products. Surfaces the operating system, not just the meals. |
| 8 | Editorial serif | Serif for capability sentence + post titles + h1/h2; workhorse sans for body. Cohort is sans-only. Codes "writer" identity in the type system. |

## Visual direction — Editorial-warm

Canvas-and-type system tuned for an architect-who-writes identity. Warm
neutrals + a distinctive copper accent + serif editorial moments + sans
workhorse. Restrained layout. No spectacle, but personality.

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0e1014` | Page background. Warmer than v2's pure black (#000), warmer than DESIGN.md's `#0a0a0f`. |
| `--surface-1` | `#16191f` | Elevated surfaces (cards, drawers). |
| `--surface-2` | `#1d2129` | Hover / pressed states on surfaces. |
| `--text-primary` | `#f4f1ea` | Body text. Warm off-white. Hue-matched to canvas. |
| `--text-secondary` | `#a8a39a` | Meta text, subtitles. |
| `--text-muted` | `#6a665f` | Dates, captions, mono labels. |
| `--accent-copper` | `#c97c4a` | Single saturated accent. Links, focus ring, hover state, accent moments. **No cohort site uses copper/amber.** |
| `--accent-copper-hover` | `#d99a6c` | Hover state shift; lightens by ~10%. |
| `--border-soft` | `rgba(244,241,234,0.08)` | Hairline dividers. |
| `--border-strong` | `rgba(244,241,234,0.16)` | Card borders, focus outlines. |

**Rationale**: The cohort uses either pure neutrals (Lovin, Collison,
Lehr, Lopopolo) or a tech-bro accent (Freiberg subtle, swyx blues,
Appleton ochre — closest to copper but warmer-ochre vs. our copper-orange).
Copper is unowned in this cohort and reads editorial-warm rather than
tech-saturated. Pair with warm off-white text (vs. the cohort's pure
white) for a tactile rather than digital feel.

**Alternates considered and rejected**:
- Forest green accent — could differentiate, but reads agriculture/finance, wrong vector for AI-architect identity.
- Burgundy / oxblood — too editorial-magazine, drifts toward L4 (Stratechery) which we're not optimizing for.
- Carrying DESIGN.md's violet — retired per resolved Q2 (fresh direction, not inheriting).
- Carrying live `/`'s lime — same; lime reads tech-startup, not editorial-architect.

### Type system

| Role | Family | Use | Why |
|---|---|---|---|
| Editorial serif | **GT Sectra** (primary) / Source Serif Pro (fallback) / Charter (system) | Capability sentence on `/`, h1+h2 on all pages, Signal Dispatch post titles in receipt list | Codes "writer" identity. None of the audited cohort uses a display serif. Strongest cheap-to-execute personality move. |
| Workhorse sans | **Inter** | Body, nav, UI, project descriptions, footer | Cohort-fluent (Lovin, Freiberg, Lopopolo all sans-default). Inter has the weight range to carry both UI and prose. |
| Mono | **JetBrains Mono** (carry from DESIGN.md) | Code, live-signal labels, timestamps, RSS strip | Carry-forward; signals technical surface. |

**Type scale** (fluid `clamp()`):

| Step | Value | Use |
|---|---|---|
| `--text-hero` | `clamp(2.5rem, 5vw, 4.75rem)` | Capability sentence on `/`. Serif. |
| `--text-display` | `clamp(2rem, 3.5vw, 3.25rem)` | h1 on interior pages. Serif. |
| `--text-h2` | `clamp(1.5rem, 2.2vw, 2rem)` | h2 throughout. Serif. |
| `--text-h3` | `1.25rem` | h3 + subsection. Sans, semibold. |
| `--text-lead` | `1.125rem` | Subtext under capability sentence; lead paragraphs. |
| `--text-body` | `1rem` | Body. |
| `--text-meta` | `0.875rem` | Dates, secondary meta. Sans or mono per context. |
| `--text-micro` | `0.75rem` | Mono labels, RSS strip, footer fine print. |

**Leading + tracking**:
- Hero serif: `1.05` leading, `-0.02em` tracking
- Display serif: `1.15`
- Body sans: `1.6` leading (preserve from DESIGN.md — generous for long-form-adjacent reading)
- Mono labels: `1`, uppercase, `+0.06em` tracking

### Layout

| Token | Value | Why |
|---|---|---|
| Container max | `80rem` | Between DESIGN.md's 72rem (too narrow for receipt-density) and the current asymmetric live `/`. Wide enough for two-column receipt sections on desktop, narrow enough that nothing feels lost. |
| Reading column | `42rem` | Carry from DESIGN.md (~65ch). Reading comfort for prose. |
| Section padding (y) | `clamp(4rem, 8vw, 8rem)` | Generous breathing between major sections; tightens on mobile. |
| Grid gutter | `clamp(1rem, 2vw, 2rem)` | |
| Base unit | `4px` | Standard rhythm. |
| Header height | `4.5rem` | Slightly taller than DESIGN.md's 4rem to host the wordmark + nav comfortably. |

### Motion

- **Reveal on scroll**: single-direction (fade-in + 8px up). 320ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Lehr-style restraint.
- **Hover micro-interactions**: receipt list items get an accent-colored underline reveal on hover (200ms). Project URLs get a small `→` glyph that slides 4px right on hover.
- **NO ambient animation** (carry the v2 + DESIGN.md discipline).
- **NO hero photo rotation** (retired — see § Home page composition).
- **Chat FAB micro-interaction**: subtle 1px outline pulse on hover, 4px lift, ~120ms.

## IA — Top-level navigation

Five primary nav items + one secondary action.

| Item | Slug | Notes |
|---|---|---|
| Writing | `/writing` | Index of Signal Dispatch posts. Stage 6 decides: native page that pulls from blog corpus, OR direct external link to `blog.ninochavez.co`. Tentative: native index with "Full archive →" link to the blog property. |
| Building | `/work` | Carries from v2 `/work`. Renamed in nav from "Work" to "Building" — active-voice, cohort-aligned (Lovin uses "Projects," Lopopolo "Featured Work" — "Building" is verbier, more architect-active). |
| AI | `/ai` | Surfaces the existing 5-page subsection. Direct nav label `AI` (cohort: Litt's "Projects" includes AI work — direct label is fine). |
| Speaking | `/speaking` | New page per P0-2. Cohort-differentiator. |
| About | `/about` | Bio + role + influences + selected clients. |
| (Secondary) Now | `/now` | Header-tail link. Live status surface per move 4. Cohort-aligned (Lopopolo "lifestream," Lovin "TIL," Lehr "lifelog"). |

**Removed from nav vs. v2**:
- `/links` — folded into footer + `/colophon` if relevant
- `/v1` — archived per P3-1
- `/privacy` + `/api` — operational, footer-only
- "Photography" / "Music" — moved off `/` body per resolved Q3; live as **footer "Adjacent properties"** links to subdomains.

## Home page composition

Top-to-bottom layout. Each section names the differentiation move it
implements.

### 1. Header

```
[Nino Chavez]                      Writing  Building  AI  Speaking  About  →ow
  (serif wordmark)                            (sans, --text-meta)         (mono label, accent, micro)
```

- Wordmark in editorial serif (`GT Sectra`), sized `1.5rem`, accent-on-hover.
- 5 nav items in sans, evenly spaced, current-page underline.
- "→ now" as a mono micro-label tail, accent-colored — invites the visitor to see what's happening now.
- Sticky header on scroll with `--surface-1` background, hairline bottom border.

### 2. Hero (above fold) — Differentiation moves 1 + 8

```
I direct agents to ship commerce.
I write the harness that makes them safe to ship it.

Product Architect at commerce.com.
Methodology at Blueprint. Writing at Signal Dispatch.

[Schedule a conversation →]
```

- **Capability sentence (move 1 + 8)**: two lines in editorial serif at `--text-hero`. Names the commerce × harness-engineering intersection. ~11 words per line (matches Nino's median sentence length per poe stack).
- **Subtext**: three role-cite sentences in sans at `--text-lead`, secondary color. Compresses Nino's three primary surfaces (commerce.com role, Blueprint, Signal Dispatch) into one micro-section.
- **CTA**: single button — accent-color background, canvas-color text, serif label. Routes to Cal.com. No secondary CTA. (Cohort uses plain email; v3 differentiates intentionally per resolved Q4 + the noted cost.)
- **No hero image** (retired the photo rotation). The capability sentence IS the hero. Cohort-aligned (Lopopolo, Litt, Lovin — none has a photo hero).

**Alternates considered for capability sentence**:
1. "I build the harness that lets agents ship enterprise commerce." — one-line variant; rejected for not surfacing the writing identity.
2. "Direct agents. Ship commerce. Document the methodology." — imperative-opener triplet; rejected for sounding like an instruction manual, not a thesis.
3. "Architect for commerce in the agent era." — clean title-claim; rejected for being too tagline-y.
4. "Product Architect for the agent era of commerce." — same family; same problem.

Picked the two-sentence shape because it (a) names the verb (direct agents), (b) names the domain (commerce), (c) names the differentiator (harness — Nino's specific subspace), and (d) two ~11-word sentences match the poe-stack cadence.

### 3. Live signals strip — Differentiation move 4

```
[● writing] "Why blueprint won't be a SaaS"        ·  2d ago
[● shipping] Rally HQ — 17 tournaments this weekend
[● in flight] ninochavez.co v3 — Stage 3 (Design Brief)
```

- Single horizontal strip in `--text-meta`, mono prefix labels, sans content.
- Three live signals:
  - **Writing** — latest Signal Dispatch post title + age (fetched via blog RSS at build, refreshed on demand).
  - **Shipping** — Rally HQ live activity signal (tournament count today, or uptime ✓).
  - **In flight** — current Blueprint initiative stage (this brief is one — the page can read its own state).
- Accent-colored dot prefixes (`●`).
- Wraps to stacked rows on narrow viewports.

**No cohort site has this.** It's the single most distinctive structural element on the page — frames v3 as a live operating system, not a static portfolio. Per Stage 6 implementation note: this should ship at launch (Nino's selection: "all 8 moves at launch"), but the data sources can be progressively wired — RSS first, Rally HQ second, Blueprint state third.

### 4. What I'm building — Differentiation moves 2 + 7

```
WHAT I'M BUILDING

  Commerce Architecture
    ─ Rally HQ          rallyhq.app           Live tournament platform
    ─ Quantifai         quantifai.io          AI FinOps cost attribution
    ─ BC Subscriptions  (client)              Active B2B subscription work
    ─ Signal X Studio   signalx.studio        Studio identity surface

  Methodology + Agents
    ─ Blueprint         repo + this site      Methodology for AI-native delivery
    ─ Atelier           wip/atelier           OSS template, mixed human/agent teams
    ─ Atelier Dashboard wip/atelier-dashboard Active dashboard surface

  Brand + Cultural
    ─ Let's Pepper      letspepper.com        Volleyball cultural surface
    ─ Flickday Media    flickdaymedia.com     Photography brand
    ─ Photography       photography.ninochavez.co  20k+ action shots
    ─ Signal Dispatch   blog.ninochavez.co    277 essays since 2018
```

- h2 in editorial serif at `--text-h2`: "What I'm building"
- 11 CURRENT receipts (per `_external-corpus.md`), grouped by topic (Lopopolo pattern from market-cohort).
- Three topic groups: Commerce Architecture / Methodology + Agents / Brand + Cultural.
- Each receipt: name (sans semibold) + URL (mono accent) + 1-line description (sans secondary).
- Flat list within each group. No cards, no hero images per item.
- **Move 7 differentiation**: receipts that have a methodology repo (Rally HQ, Atelier, Blueprint) get a second mono-label line: `→ built with Blueprint Pattern B` linking the methodology repo. Surfaces the kitchen alongside the meal.
- Hover: underline reveal on receipt name in accent color.

**Rationale**: This is the receipt-density block. 11 receipts grouped by topic is more density than any cohort site shows (Lovin shows ~15 named projects but they're hobby-scale; Lopopolo shows 6 topic categories; Lehr/Collison show only writing). v3's density signals "practitioner with shipped breadth."

**Excluded from this list** (per receipt-bucket discipline):
- AI Hive (EVOLUTION — appears only on `/colophon`)
- Labs hub (EVOLUTION — appears only as footer "labs.ninochavez.co" link)
- 630-volleyball (client subcontract — mentioned on `/about` as client context, not as Nino product)
- All ADJACENT/EXPERIMENT wip items

### 5. Latest from Signal Dispatch — Differentiation move 2

```
LATEST FROM SIGNAL DISPATCH

  Why blueprint won't be a SaaS                     ·  2 days ago
  The harness was always the point                  ·  6 days ago
  Buy-vs-build in the agent era                    ·  11 days ago
  Architect-directs-agents, three months in        ·  18 days ago
  Notes from a brownfield audit                    ·  24 days ago

  Full archive — 277 essays since 2018  →
```

- h2 in editorial serif: "Latest from Signal Dispatch"
- 5 most recent post titles in serif at `--text-h3`. Dates in mono `--text-meta` right-aligned.
- Each title links to the post on `blog.ninochavez.co`.
- Trailing link to full archive with the volume callout — surfaces the 277-post archive authority per cohort norm.

### 6. What I think about — Differentiation move 1 elaboration

```
WHAT I THINK ABOUT

Harness engineering for commerce
  Why the harness — not the agent — is the load-bearing engineering work.

Buy-vs-build threshold in the agent era
  When the cost of building exceeds the cost of buying flips, and why.

Architect-directs-agents
  Why the architect's job changed and what didn't.

Brownfield over greenfield
  Auditing the system you have before designing the one you wish you had.
```

- h2 in editorial serif: "What I think about"
- 4 named topics with one-sentence positioning each.
- Topic name in serif at `--text-h3` (linked to relevant blog tag page).
- Positioning sentence in sans body.
- These are the proto-frameworks identified in `market-cohort.md § Stage 3 implications, item 3`. Topics drawn from existing Signal Dispatch posts (NOT invented). Stage 4 fact-check verifies each has 2+ existing posts to anchor.

### 7. Footer — Differentiation move 3 (meta-receipt placement)

```
─────────────────────────────────────────────────────────

Contact                Adjacent properties           Built with
nino@ninochavez.co     blog.ninochavez.co            Blueprint methodology.
LinkedIn               photography.ninochavez.co     How this site was built →
GitHub                 signalx.studio                (/colophon)
X (PhotoByNino)        labs.ninochavez.co
                       letspepper.com
                       flickdaymedia.com

RSS · Subscribe                                       © 2026 Nino Chavez
```

- Three columns: Contact / Adjacent properties / Built with.
- **Meta-receipt (move 3)**: third column carries the methodology line. Links to `/colophon`.
- Adjacent properties surface the cross-app family (`_external-corpus.md` § "The domain family"). Cohort-divergent — most cohort sites don't have a multi-property family to surface — but appropriate to Nino's case.
- RSS as primary subscribe path (cohort-aligned).

### 8. Chat FAB — Differentiation move 6

- Persistent bottom-right circular button, 56px, `--surface-1` background, accent border, mono "Ask" label.
- Click: opens overlay panel from bottom (mobile-style sheet), 480px wide on desktop.
- Panel header: "Ask Signal Dispatch — 277 essays indexed."
- Empty state shows 3 starter questions seeded from the four "What I think about" topics:
  - "What does Nino mean by harness engineering?"
  - "Where does the buy-vs-build threshold actually sit?"
  - "How does Blueprint work in practice?"
- Backend: Cloudflare Vectorize index over `apps/blog` markdown corpus (per `blueprint.yml § cloudflare.primitives.vectorize: true`). Streaming response with cited post excerpts.
- Persistent across all pages.

## `/speaking` page composition — P0-2

The single highest-leverage *new surface*. No cohort site has one.

```
[h1] Speaking

I write about and build at the intersection of enterprise commerce and
AI-native software delivery. Available for keynotes, panels, podcasts,
and internal summits.

[Schedule a conversation →]

─────────────────────────────────────────────

[h2] Bio

50 words
Nino Chavez is a Product Architect at commerce.com…
[copy ↗]

100 words
…
[copy ↗]

250 words
…
[copy ↗]

─────────────────────────────────────────────

[h2] Headshot

[square 1:1]   [wide 16:9]
[Download ↗]   [Download ↗]

Credit: [photographer name if any]

─────────────────────────────────────────────

[h2] Topics I speak on

· Harness engineering for enterprise commerce
   What it is, why it changes the architect's role, what survives.
· Architect-directs-agents in production
   The pattern at Rally HQ, Quantifai, Atelier — what works and what doesn't.
· Buy-vs-build threshold in the agent era
   When the math flipped and the org-shape decisions that follow.
· Blueprint methodology
   A brownfield audit-driven methodology for AI-native delivery.
· Commerce in the agent era
   Specific patterns for commerce platforms moving from human-driven to agent-driven flows.

─────────────────────────────────────────────

[h2] Past talks + appearances

· Latent Space podcast (anticipated 2026) — Harness engineering case study
· [other talks as they accumulate]

If this list is short, the writing corpus is the substrate — see Signal Dispatch.
```

- Single column, reading-column-width.
- Three bio variants in collapsible blocks (default-expanded), each with a "copy" action that copies to clipboard.
- Headshot section with direct download links (two aspect ratios). Square + wide cover most event needs.
- Topic list as named bullet points. Topics drawn from `market-cohort.md` proto-framework recommendation + the prescription's stage_3_handoff.
- Past-talks list with honesty floor: if empty, state it and link to the writing substrate.
- Single CTA at top + bottom: routes to the same general inquiry path as `/` (resolved Q4 — single general path).

## `/colophon` page composition — Differentiation move 3

```
[h1] How this site was built

[h2] The methodology
This site is the latest output of Blueprint — the brownfield audit-driven
methodology I'm developing in wip/blueprint and applying to projects
including Rally HQ, Signal Dispatch, and this one.

The Blueprint pipeline for ninochavez.co v3:
  Stage 1 — Diagnose  (research/01-diagnose.md)
  Stage 2 — Prescription  (research/02-prescription.yml)
  Stage 3 — Design brief  (research/03-design-brief.md ← this site)
  Stage 4 — Fact-check
  Stage 5 — Documents
  Stage 6 — Deploy
  Stage 7 — Iterate

Every claim on this site traces to a research artifact in
github.com/ninochavez/website-nc/blueprint/research/.

[h2] The stack
SvelteKit on Cloudflare Pages. Cloudflare Vectorize for the chat FAB
(indexed over the Signal Dispatch corpus at blog.ninochavez.co). Type
system uses GT Sectra serif + Inter sans + JetBrains Mono.

[h2] Predecessors and influences
The site shape owes most to Brian Lovin, Ryan Lopopolo, and Geoffrey Litt
— capability-statement-plus-named-receipt-list is their pattern. The
methodology-as-meta-receipt move is borrowed from Will Larson's body of
work — systematized practitioner methodology.

The harness-engineering vocabulary on this site predates the OpenAI
Feb 2026 piece but was named publicly first by Ryan Lopopolo. Citing the
coiner here so the lineage stays straight.

[h2] What I changed from v2
Five-bullet summary of v3-vs-v2 deltas, linking back to 01-diagnose.md
diagnoses each closes.

[h2] What's next
Three-bullet of what's in flight per the Stage 7 iterate cycle.
```

- Long-form prose page. Editorial serif h1/h2, sans body, mono for the pipeline list.
- Self-referential: the colophon IS the methodology meta-receipt. Move 3 doesn't need to be on `/`; it lives here and gets named in the footer of every page.

## `/about` updates

Carry the v2 bio prose. Add three sections:

1. **Role + context** — Product Architect at commerce.com, subcontractor for 630 Volleyball, methodology work via Blueprint.
2. **Influences** — explicit cite of Lopopolo (harness engineering), Willison (LLM tooling discipline), Larson (methodology shape). Per `market-cohort.md` recommendation: low-cost authority signal in this cohort.
3. **Selected client context** — 630 Volleyball, plus any other named clients. Mention as context (per receipt-bucket rule), not as portfolio.

## `/now` page composition — Differentiation move 4 (live signals expanded)

```
[h1] Now — 2026-05-25

[h2] In flight
  ninochavez.co v3       Stage 3 — Design brief in review
  Blueprint methodology  Stage 7 — Iterating template/.claude hooks
  Rally HQ              Live, 17 tournaments this weekend
  Atelier dashboard     Active development

[h2] Recent writing
  [latest 5 Signal Dispatch posts pulled live]

[h2] Reading + listening
  [optional — book list, podcast queue if maintained]

[h2] Last updated 2026-05-25
```

- Live-state mirror of what's happening in Nino's stack.
- The page reads its own Blueprint stage (this site).
- Updates expected weekly+. Mirrors Lopopolo's "lifestream" and Lovin's "TIL" patterns per peer-cohort.

## Component-level visual decisions

| Component | Spec |
|---|---|
| Buttons (primary) | `--accent-copper` background, `--canvas` text, serif label, `0.75rem 1.25rem` padding, `4px` radius, 200ms hover lift (`translateY(-1px)` + accent-copper-hover bg). |
| Buttons (secondary) | Transparent bg, `--accent-copper` border, accent text, same dimensions. |
| Links (in prose) | `--accent-copper` underline, `--accent-copper-hover` on hover. |
| Receipt list rows | Borderless. 1rem vertical gap. Hover: name underline in accent. |
| Live signal strip | Mono `--text-micro`, accent-colored `●` prefix, sans content, `--text-meta` size. |
| Nav links (header) | Sans `--text-meta`, current-page accent underline. |
| Chat FAB | 56px circle, `--surface-1` bg, `--accent-copper` border (2px), mono "Ask" label centered, accent-color label, 4px shadow on hover. |
| Code blocks (Signal Dispatch posts) | Mono, `--surface-1` bg, 4px radius, no syntax theme on `/` previews (theme only on the blog property). |

## Stage 4 fact-check anchors

The Stage 4 reviewer should verify (against this brief):

- [ ] Capability sentence as authored ships verbatim on `/`.
- [ ] All 11 CURRENT receipts (per `_external-corpus.md`) appear in "What I'm building."
- [ ] No EVOLUTION items (ai-hive, labs hub) appear in "What I'm building."
- [ ] Live signal strip pulls actual data, not placeholder (RSS minimum at launch).
- [ ] `/speaking` page has all 4 required sub-blocks (bio variants, headshot, topics, past talks).
- [ ] `/colophon` exists and is linked from every page footer.
- [ ] Chat FAB is persistent and grounds in the actual Signal Dispatch corpus, not a stub.
- [ ] No bento grid, no hero photo rotation, no four-pursuit framing anywhere on `/`.
- [ ] `src/lib/constants.ts:9` no longer says "Vercel."
- [ ] `/v1` is archived (P3-1, Stage 6 housekeeping).
- [ ] DESIGN.md (root) is replaced — not amended — with the new system.

## Stage 6 deploy notes

- Deploy target: Cloudflare Pages (per `blueprint.yml`).
- Project name: `ninochavez` (carries from current).
- Vectorize binding setup for chat FAB (per `blueprint.yml § cloudflare.primitives.vectorize: true`).
- Custom domain: `ninochavez.co` (carry).
- Smoke test pre-flight: load `/`, verify capability sentence renders in serif, verify chat FAB opens, verify live signal strip pulls data.

## What this brief is NOT

- **Not the implementation.** Stage 6 deploy carries the actual SvelteKit + CSS work.
- **Not a finalized copy doc.** Capability sentence ships verbatim from this brief; everything else (subtext, receipt descriptions, /speaking topic positioning, /about expansion) gets a Stage 4 copy pass against the Signal Dispatch voice guide.
- **Not exhaustive.** Edge surfaces (`/privacy`, `/api`) keep current treatment; this brief only addresses the architected surfaces.
- **Not a graphic design document.** A Stage 3.5 visual spec (or direct Figma) would render the brief in pixels. The brief commits to tokens + composition; pixel-fidelity is the next step.

## Open follow-ups for Stage 4

1. **Capability sentence final approval** — committed: "I direct agents to ship commerce. / I write the harness that makes them safe to ship it." Stage 4 verifies the line ships verbatim and lands as intended; Stage 5 documents-package may revise once.
2. **Topic naming verification** — the 4 topics in § "What I think about" must each anchor to 2+ existing Signal Dispatch posts. Stage 4 verifies; revise topics or write the posts before launch.
3. **Headshot sourcing** — `/speaking` page requires at least one square + one wide headshot. Source from existing photography or schedule a shoot before Stage 6.
4. **Live signal data sources** — RSS for writing is ready (`apps/blog`). Rally HQ status + Blueprint stage need lightweight endpoints. Decide MVP shape in Stage 6.
5. **Vectorize indexing** — pre-compute and ship the Signal Dispatch corpus index before launch. Re-indexing cadence in Stage 7.
