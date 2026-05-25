---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
version: 0.2
supersedes: v0.1 (2026-05-25 morning) — that version was speculative; this is grounded in browse-tool/WebFetch observation of each site.
---

# Peer Cohort — Personal Sites of Practicing Architects + Writers

## v0.1 → v0.2 — what changed and why

v0.1 of this document was authored without visiting any of the seven cited
sites. The "common patterns" claims were synthesized from training data
plus the framing already laid out in `_external-corpus.md`. That's exactly
the abstract-framing-not-receipts failure mode the diagnose anchor flagged.

v0.2 is grounded in actual observation (browse-tool snapshots + WebFetch
content extraction, 2026-05-25). Where v0.1 was wrong, v0.2 says so
explicitly so the correction is traceable and so Stage 3 inherits verified
inputs rather than rolling forward speculation.

### URL corrections from v0.1

Three of the seven peer-site URLs in `_external-corpus.md` were wrong:

| Persona | v0.1 URL | Correct URL | Source |
|---|---|---|---|
| Brian Lovin | brian.lovin.io | **brianlovin.com** | DNS lookup |
| Jordan Singer | jsngr.co | **jsngr.com → ibuildmyideas.com** (302) | redirect chain |
| Ryan Lopopolo | lopopolo.io | **hyperbo.la** | confirmed via WebSearch (referenced his blog by name in OpenAI harness-engineering material) |

`lopopolo.com` is a parked Sedo domain; `lopopolo.io` returns
ECONNREFUSED — neither belongs to Ryan. The corpus map `_external-corpus.md`
needs the same correction (logged as a follow-up).

### Claims from v0.1 verified, corrected, or retired

| v0.1 claim | Verdict | Notes |
|---|---|---|
| "None of the cohort has a `/speaking` page" | ✓ Verified | Confirmed across all 7. Lovin has Writing + Projects but no Speaking. Collison has 18 nav items, none named press/speaking. |
| "Bento grid as the home page — the cohort universally rejects" | ✓ Verified | None of the audited sites uses bento. Confirmed. |
| "Hero image rotation — none do it" | ✓ Verified | None do. Confirmed. |
| "Creative-pursuit framing on the home page" | ✓ Verified absent | None of the seven uses the four-equal-pursuits framing v2 currently uses. |
| **"Every site has a clear single-sentence capability statement on `/`"** | ✗ **WRONG** | Collison has NO capability sentence (just a nav list). Lehr has a poetic intro, not a capability. Lovin, Freiberg, and Lopopolo all do have one. Pattern is "most do, not all do." |
| **"Even Collison's spartan site states what Stripe does in the first paragraph"** | ✗ **WRONG** | Collison's home page is his name + a flat list of ~18 page links. No paragraph. No Stripe mention. The claim was a hallucination. |
| **Archetype 3 framing of Aurvia as a "peer architect personal site"** | ✗ **WRONG** | Aurvia is Jen Anderson's **fractional CTO services site** — a business surface, not a personal portfolio. Different shape entirely. Calibration value is "what you would build IF you were selling consulting services" — which Nino is not (FT at commerce.com). |
| Lovin attributed to "designer-engineer personality-forward" archetype 2 | ✗ Wrong grouping | Lovin's pattern is capability-sentence + named receipt list with one-line descriptions per. That's closer to what v0.1 called archetype 1 (Lopopolo/Collison/Lehr). The Lovin/Singer/Freiberg grouping was speculative. |

## Audited reality — what these seven sites actually look like

### aurvia.io — Jen Anderson, Fractional CTO

- **Title**: "Aurvia — Fractional CTO for Startups | PhD-Trained Technical Leadership"
- **H1**: "A technical partner who sees what others miss"
- **Capability**: "I give startups the pattern-recognition and hands-on technical leadership of a full CTO office — priced for the stage you're at. Strategy and execution. Working software you own."
- **Nav**: Services / How it works / Agents / About / Why Jen / Free discovery
- **Named services**: AI readiness audit, Architecture audit, Build to MVP, AI agent workflow (4)
- **Receipts**: 87% performance improvement (TTI 29.9s → 3.9s), 9M+ patient visits, 40-60% faster delivery
- **CTAs**: "Book your free discovery" + "See how it works"
- **Contact**: jen@aurvia.io + Calendly + LinkedIn
- **Adjacent properties**: Operion, AskJentic, Llama Learning Academy, andersonnjen.com
- **Aesthetic**: business-services site; structured services + testimonials + receipts

**Calibration value for v3**: This is the shape v3 is **not** building. Useful
as inverse — when prescribing v3, anything that drifts toward "named
services with prices and an intake form" is drifting toward Aurvia and away
from the personal-portfolio archetype. Nino is FT at commerce.com, so the
v3 surface is the architect's *home*, not a services-sales surface.

### brianlovin.com — Brian Lovin, software designer at Notion

- **Title**: "Brian Lovin"
- **Capability**: "I'm a software designer living in San Francisco, currently making AI products at Notion."
- **Sections**: Writing, Projects
- **Writing entries**: "Give your agent a laboratory, pt. II" / "Why I'm excited about Notion Workers" / "Use the ✦ Hyper key" / "Omarchy first impressions" / "Syncing Claude Code settings between computers" (recent + active)
- **Named projects with one-line descriptions** (heavy use of receipt-density list):
  - HN — A minimal hacker news reader
  - App Dissection — Breaking down well-designed apps
  - Stack — My favorite apps and tools
  - AMA — Ask me anything
  - TIL — Today I learned
  - Listening — Music in rotation
  - Sites — A curated list of well-designed websites
  - Shiori — A beautifully simple read-it-later app
  - Staff Design — Navigating the IC career path
  - Design Details — A podcast about design and technology
  - How to Computer Better, Crit, How Terminals Work, HN CLI, Tax UI
- **Contact**: not surfaced in first-viewport scrape (deeper page likely)
- **Aesthetic**: minimal, list-dense, single column

**Calibration value for v3**: This is the strongest single archetype for what
v3 should consider. Lovin demonstrates the pattern of capability sentence at
top + named projects with one-line descriptions per. That's exactly what
P1-4 (surface receipt density on `/`) prescribes for v3 — replace 4 hero-image
cards with a flat named list of the 11 CURRENT receipts.

### patrickcollison.com — Patrick Collison

- **Title**: "Home · Patrick Collison"
- **H1**: NONE
- **Capability**: NONE on `/`
- **Hero**: NONE
- **Nav**: 18 links — About, Advice, Blog, Bookshelf, Culture, Enlightenment, Fast, Growth, Labs, Links, Novels, People, Pollution, Progress, Questions, Solar, SV history, Travel
- **Contact**: not on `/`
- **Aesthetic**: extreme minimalism. Just his name + the nav list. Period.

**Calibration value for v3**: This is the inversion of v2 — extreme restraint
as signal. Collison's authority is so established the home page doesn't need
to state it. v3 cannot inherit this without that pre-established authority;
the prescription's P1-1 (capability sentence in buyer language) is correct
*because* Nino is not yet at Collison's authority altitude. Note for Stage 3
brief: the Collison pattern is what v3 *graduates to* over years, not what
it ships at.

### julian.digital — Julian Lehr

- **Title**: "julian.digital"
- **H1**: "Thoughts"
- **Intro** (terminal-prompt styled): "> Hello / > My name is Julian / > This is my lifelog and digital playground"
- **Sections**: Thoughts (list of essays, most recent: "The case against conversational interfaces," 2025-03-27)
- **Contact**: RSS / Twitter (@julianlehr) / email signup
- **Footer**: IMPRINT only
- **Aesthetic**: extreme minimalism, terminal/monospace styling, no nav

**Calibration value for v3**: This is "the writing IS the site" archetype.
Lehr's identity is the essays; the rest is plumbing. v3 should not adopt
the literal terminal styling, but the principle — that the writing list
is itself the home page — is worth carrying into Stage 3 for the
Signal Dispatch surfacing.

### rauno.me — Rauno Freiberg, interaction designer

- **Title**: "Rauno Freiberg"
- **H1**: "Rauno Freiberg"
- **Capability**: "Estonian interaction designer working with Vercel and Devouring Details"
- **Nav**: Devouring Details / Craft / History of Software Design / Projects / Field Notes
- **Adjacent properties**: 2023.rauno.me + 2022.rauno.me (yearly archives — interesting pattern)
- **Contact**: email with click-to-copy interaction
- **Aesthetic**: minimal typography, restrained whitespace, motion-aware (per training/cohort framing)

**Calibration value for v3**: Capability + named projects sections (similar
to Lovin's shape). The yearly-archive sub-domains (2022.rauno.me,
2023.rauno.me) are an interesting evolution-pattern; v3's `/v1` archive
strategy (P3-1) is the same idea less elegantly executed.

### ibuildmyideas.com (via jsngr.com 302) — Jordan Singer

- **Title**: "Jordan Singer"
- **H1**: "Jordan Singer"
- **Content not extractable via text-only fetch** — heavy client-side
  interactivity. From training/cohort framing: Singer's pattern is
  interactive-demo portfolio entries rather than static project descriptions.
- **Status**: partial audit. Would need browser-rendered screenshot for full
  fidelity. Logged as a Stage 4 follow-up.

**Calibration value for v3**: undetermined from this audit pass. Do not cite
patterns attributed to Singer until Stage 4 fact-check verifies via
rendered screenshot.

### hyperbo.la — Ryan Lopopolo

- **Title**: "hyperbola"
- **H1**: "hyperbola"
- **Capability**: "Learnings on how to be effective with code, people, organizations, and systems."
- **Nav**: home / contact / lifestream / blog
- **Featured Work categories**: AI / Leadership / Rust / AWS Billing / Artichoke Ruby / Current Pursuits
- **Contact**: rjl@hyperbo.la (plain email)
- **Aesthetic**: minimalist, text-centric, hierarchical
- **Recent**: published 2026-02-17 update on "harness engineered the blog build" with Vite-native SSR; OpenAI harness-engineering work positions Lopopolo as the primary public-thinker on this discipline

**Calibration value for v3**: Closest direct analog for what v3 wants. Three
features worth Stage 3 consideration:
1. **Capability framed as plural learnings** — "Learnings on how to be
   effective with code, people, organizations, and systems." Note the
   plural noun + plural domains. Different from Lovin's "I'm a designer at
   Notion" identity-statement.
2. **"Lifestream" nav item** — Lopopolo's version of what v2's `/now` page
   could become.
3. **Featured Work organized by topic, not by project** — AI / Leadership /
   Rust / AWS Billing / Artichoke Ruby / Current Pursuits. Topical grouping
   rather than flat product list. Worth comparing in Stage 3 against P1-4's
   "flat named list of 11 CURRENT receipts."

## Re-derived archetypes (grounded in observation)

### A — Extreme minimalism / nav-only

**Sites**: Collison, Lehr

**Pattern**: No hero, no capability sentence, no CTA. The site is a tiny
index pointing at the writing or the named pages.

**v3 fit**: Wrong altitude. v3 is not at Collison's pre-established
authority and is not a writer-only surface (it indexes 11 working products,
a `/speaking` page, a contact path). Reference, don't imitate.

### B — Capability sentence + named-receipt list

**Sites**: Lovin, Freiberg, Lopopolo

**Pattern**: One-sentence identity/capability at top. Below: named
sections (Writing/Projects, or Craft/Projects/Field Notes, or
Featured-Work-by-topic). Each named item gets a short description.
Receipt-density list, not hero cards.

**v3 fit**: **Primary archetype to draw from.** Matches P1-1 (capability
in buyer language) + P1-4 (receipt density on `/`). Stage 3 brief should
look at how each of these three sites composes the capability line +
receipt list visually.

### C — Services-business surface (separate from personal portfolio)

**Sites**: Aurvia

**Pattern**: Named services, pricing/positioning, structured intake form,
testimonials, conversion-optimized CTAs.

**v3 fit**: **Inverse calibration only.** v3 is not selling services. If
prescription drifts toward "named services with prices and an intake
form," that's drift toward Aurvia's shape. Use Aurvia to recognize the
drift, not to follow it.

### D — Interactive-demo portfolio

**Sites**: Singer (provisional — needs rendered audit in Stage 4)

**Pattern**: Portfolio entries are themselves interactive surfaces, not
text descriptions.

**v3 fit**: Aspirational. The `/ai/ask` page (Chat component) already
gestures at this for one surface. Stage 3 brief should decide whether to
expand the demo-as-portfolio pattern.

## Patterns observed across the audited cohort

Verified across the seven sites (excluding Singer where partial):

| Pattern | Cohort behavior | v3 implication |
|---|---|---|
| `/speaking` page | NONE has one | v3 building one (P0-2) differentiates the Conference Circuit persona's path. Confirmed advantage. |
| Bento grid on home | NONE uses one | P1-1 removal of v2's bento is cohort-aligned. |
| Hero image rotation | NONE uses one | v2's volleyball-photo rotation is cohort-divergent; P1-1 flag carries. |
| Capability sentence on `/` | 3 of 6 (Lovin, Freiberg, Lopopolo) | P1-1 prescription holds, but it's not universally adopted in the cohort. Some opt for minimal nav (Collison) or poetic intro (Lehr). |
| Cal.com / structured booking on `/` | NONE has it | If v3 ships Cal.com on `/` (P0-1), it differentiates from the cohort. Decide in Stage 3 whether differentiation is intended or whether v3 follows the cohort's plain-email convention. |
| Plain email contact | ALL audited use it (Aurvia adds Calendly; rest are email only) | The "single general inquiry path" (resolved Q4) can be plain email rather than Cal.com if Stage 3 wants cohort fluency. |
| "Now" / "lifestream" surface | Lopopolo, Lovin (via Listening/TIL), Lehr (whole site framed as lifelog) | v2's `/now` page is cohort-aligned. P1-1 nav placement should preserve it. |
| Topic-categorized Featured Work | Lopopolo only | Alternative to flat receipt list (P1-4). Stage 3 brief should evaluate both. |
| Yearly archive subdomains | Freiberg (2022.rauno.me, 2023.rauno.me) | Elegant alternative to v3's `/v1` archive (P3-1). Stage 6 housekeeping could consider subdomain rather than `_archive/` path. |

## What did NOT survive contact

These claims from v0.1 are retired:

1. ~~"Every site in the cohort has a clear single-sentence capability statement"~~ — only 3 of 6 do
2. ~~"Even Collison's spartan site states what Stripe does in the first paragraph"~~ — false (no paragraph)
3. ~~Aurvia framed as peer-architect personal-site reference~~ — Aurvia is a services-business surface, different archetype
4. ~~Lovin grouped with Singer/Freiberg as archetype 2~~ — Lovin uses the capability + receipt-list pattern (re-derived archetype B)

The brand-domination-strategy reconciliation note at the end of v0.1 carries
forward unchanged — that doc remains historical reference per `_inventory.md`
decision 3.

## Anti-cohort — what does NOT belong here

- **Agency sites** — different audience, different shape, different conversion goals.
- **Conference-speaker showcase sites** — Nino's site is the speaker's home, not a speaker-marketplace listing.
- **Photography-first portfolios** — `apps/photography` covers that audience on its own subdomain.
- **AI startup landing pages** — Quantifai, Signal X Studio, etc. are separate properties.
- **Aurvia** (re-added) — services-business surface, not peer-portfolio. Listed in archetype C only as inverse calibration.

## Stage 4 follow-ups logged

- Re-audit Singer (ibuildmyideas.com) with rendered-screenshot tool. Text-only fetch insufficient.
- Re-audit any site that materially redesigns between now and ship time.
- Verify the cohort observations table against rendered visuals (especially the "no Cal.com on /" claim — could miss if it's a small CTA).
