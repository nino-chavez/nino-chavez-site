# Funnel — how visitors reach (and fail to reach) /ai

Probed 2026-07-08. Method: curl against production + `gh api` for the profile
README; full commands and raw link lists preserved below each claim.

Personas whose journeys this funnel carries: the craft-practitioner enters (or
fails to) through every channel in §1 and walks §2 end-to-end; the
evaluating-client typically enters from the GitHub profile or a referral link and
only touches the §2 arrival step. Machine-readable persona↔surface pairs live in
the sibling `pair-*.md` files; JTBD declarations in `../personas/`.

## 1. Entry — every channel into /ai is severed

| Channel | State | Evidence |
|---|---|---|
| Organic search | Blocked by construction | All 13 pages ship `<meta name="robots" content="noindex, nofollow"/>` (Stage 0 manifest, 13/13 probes) |
| Main-site nav / homepage | Zero links to /ai | Homepage `curl` link inventory: `/about`, `#contact`, `#labs`, blog + photography subdomains, external properties (rallyhq.app, signalx.studio, flickdaymedia.com, letspepper.com), socials, mailto — no `/ai` anywhere |
| GitHub profile README | Links `ninochavez.co` and `ninochavez.co/blog` only | `gh api repos/nino-chavez/nino-chavez/readme` link extraction: exactly two URLs, neither /ai |
| Blog (freshest surface, actively publishing) | No /ai links in nav or footer | `/blog` link inventory: `/about`, `/blog/*`, `/research`, `/llms.txt`, site root — no `/ai` |
| Direct URL | The only working channel | 200s on all routes (Stage 0 manifest) |

Net: the section serves only visitors who already have the URL — which is the
goal doc's diagnosis ("the old corpus partly died of placement") made mechanical.

## 2. Arrival → action — what happens to the visitor who does land

Walking the captured surfaces (`../current-state/captures/`):

1. **Land on /ai**: academy framing ("learning academy" register), two project
   cards badged **Live** — one 500s on use (Ask; Stage 0 probe), one 404s
   (/code-to-cognition). The evidence layer fails at first click.
2. **Enter /ai/learn**: sound persona diagnosis instrument (7 tracks), but each
   track asserts its AI application rather than showing it, and the track CTA is
   mailto-your-homework — a review service that isn't operated (appendix,
   structural findings).
3. **Exit paths**: footer "Read my writing" previously pointed at a domain with
   no DNS (fixed 2026-07-08 to /blog); no path from any /ai page to the shipped
   artifacts that actually exist (Blueprint, Atelier, Ask BC, etc. — appendix
   § Missing).

The funnel therefore dead-ends at exactly the two stages the pilot needs most:
Try (evidence one click deep) and Adopt (self-serve next action).

## 3. Reverse funnel — where the audience actually is today

The properties with live traffic potential all point AWAY from or past /ai:
homepage showcases external products (`#labs` anchor, rallyhq.app, signalx.studio),
the GitHub profile carries the positioning statement ("AI-native engineer. Agents
are how the work gets done") and routes to root + blog, and the blog carries the
freshest AI content. The rebuilt surface inverts this: those three channels are
the natural inbound edges, and mandate question 3 (placement) must be answered so
that linking from all three is coherent.

## 4. Stage 2 implications (recorded here, decided there)

- Discoverability is structural, not editorial: prescription prior #1 (nav link +
  drop noindex) is necessary but not sufficient — the GitHub profile README and
  blog are the two live channels and neither currently has a reason to link /ai.
- The two-minute success criterion binds the Arrival step: persona match, track
  entry, tool install, or worked example — all self-serve (goal doc § Success).
- Freshness architecture (goal doc § Freshness) is what makes the Return stage
  exist at all; without it the funnel has no loop.
