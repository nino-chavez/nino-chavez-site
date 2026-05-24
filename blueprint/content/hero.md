# `/` Hero + Credibility Ribbon — content draft

Per `blueprint/03-design-brief.md` §1 (signature) and Composition 1 (`hero-with-thesis`) + Composition 2 (`credibility-readout-row`).

## Hero claim (locked)

> **Context engineer.**
> I _instrument_ the systems that build the systems.

Treatment: the word **instrument** renders in italic violet (per brief §1 supporting pattern `editorial-italic` — one human moment per page). All other words in default white (Inter, no italic).

## Subhead (one line, mono pill row treatment optional)

> Working practice + open toolchain + production software. Built solo with agents at volume.

Three nouns separated by `+` marks — sets the spine that the rest of the page proves (practice, toolchain, software). Optional treatment: each noun as a mono pill, matching the credibility-readout-row register below.

## Credibility ribbon (three instrument-readout cards)

Numbers are defensible and pulled from the inventory + Poe corpus. Each card has a mono numeric value and a one-line mono caption.

| Card | Value | Caption |
|---|---|---|
| 1 | **56+** | projects shipped under `~/Workspace/dev` |
| 2 | **4 projects** | through the chain — P&P origin → bc-subscriptions → rally-hq → website-nc-v3 · A/B at 70–80% quality, 10–15× faster |
| 3 | **746** | voice signals codified across 62 projects (voice corpus) |

The third card is the differentiator. *56+ projects* and *5 lathes* are structural claims any senior engineer could make on a good day. *746 signals across 62 projects* is a specific, quantitative artifact that only exists because Nino built it. It's the hook for the `/practice` page.

## Composition 3 — `signature-diagram-hero`

Full-width hand-drafted SVG: `forge-pipeline-diagram` (per brief §1).

Schematic shape: left-to-right chain in 1.5px violet/white stroke, JetBrains Mono labels:

```
[ brand-kit ]  ──►  [ tokens ]  ──►  [ copy ]  ──►  [ images ]  ──►  [ site archetype ]
   .json              CSS vars       signal-forge     image-gen      forge-site
```

The violet accent goes on the spine arrow connecting all five nodes — the spine *is* the practice.

Caption below diagram (mono, small, left-aligned):

> One brand-kit JSON drives tokens, copy, images, and a site archetype. The artifacts in this row are public repos. → `/practice`

## Composition 4 — `case-study-stripe` (5 lead studies)

One row per study. Each row: title (bold) + tagline (regular) + live-URL pill (mono) + stack tags (mono pills). Click → `/work/[slug]`.

Order (locked from prescription):

```
1. Rally HQ + Blueprint    Product and methodology shipped to two surfaces of one offering    rallyhq.app · blueprint.rallyhq.app
2. Atelier                 Spine connecting tools around one project for mixed human + AI teams    atelier.ninochavez.co
3. Ask BC                  Hybrid Vercel + Cloudflare Worker + Durable Objects, two-turn confirmation gate    askbc.ninochavez.co
4. Photography             20K-photo gallery on SvelteKit + Supabase + CF R2/Images/Workers, AA accessibility    ninochavez.co/photography
5. bc-subscriptions        Spec + reference implementation. 38 ADRs. Dual-track agile in one repo.    github.com/nino-chavez/bc-subscriptions
```

## Composition 5 — `practice-teaser-panel`

Three-card readout linking to the three `/practice` sub-sections:

> **Toolchain.** Six tools that codify the practice. → `/practice#toolchain`
> **Operating rules.** Canonical-pattern-first. Default to action. Worktree isolation. → `/practice#rules`
> **Instrumentation.** A three-layer classifier against one failure mode, with an adversarial test plan. → `/practice#instrumentation`

## Composition 6 — `closing-thesis-panel`

Italic emphasis on **instrument**, schematic-mono frame:

> Most engineers configure Claude.
> I _instrument_ it. The artifacts above are how.

Followed by a mono receipts row:

> 48 hours · 11 pages · 4 strategy docs · 30+ cited sources · A/B'd at 70–80% quality · 4 projects ran through the chain

Then a single mono contact row: `email · github · linkedin · /writing · /contact`.

---

## Composition slot 0 (above hero) — masthead

Stamped-monogram `nc.` in upper-left, mono nav row in upper-right (`work · practice · writing · about · contact`). No "Now Booking" indicator (Cal.com cut per Diagnose). Mono caption under monogram: `context engineer · chicago`.

## What the hero does NOT contain (audit guard)

- No photo (volleyball or otherwise) — per brief §3 imagery direction
- No bento grid — replaced by the schematic-diagram-hero composition
- No "Cut the Noise / Follow the Signal" tagline — replaced by the locked claim
- No 4-way interests grid (Photography / Music / Writing / Building) — cut per Diagnose
- No "Now Booking" availability indicator — Cal.com integration cut
- No `/v1` reference — that route gets deleted in Phase 4
