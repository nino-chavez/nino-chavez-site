---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
---

# Peer Cohort — Personal Sites of Practicing Architects + Writers

Per `_external-corpus.md` § "Peer + competitive references" the v3 redesign
calibrates against three site archetypes from a peer cohort. None of these
is a benchmark to beat. They are **reference samples** — what does a
site-of-a-thinking-practitioner look like in 2025/26.

The cohort is grouped by archetype, not listed flat. Each archetype tells
the v3 redesign something different.

## Archetype 1 — Engineering portfolios with strong written POV

**Reference sites**:
- **Ryan Lopopolo** (https://lopopolo.io/) — cited in poe stack as
  influence on "buy-vs-build threshold" / harness-engineering. The
  closest *technical-voice* analog Nino has cited.
- **Patrick Collison** (patrickcollison.com) — minimalist authority-by-
  receipt portfolio. CEO, not architect, but the structure travels.
- **Julian Lehr** (julian.digital) — designer with written POV. The
  closest "writer's portfolio" structure in the cohort.

**Common pattern**:
- Plain text or near-plain text. No bento grids. No oversized hero type.
- Single accent color, often none.
- "Selected work" is a list, not a card carousel.
- Writing is the primary surface. The site is the index, the posts are
  the product.
- No "I do X, Y, Z" capability page — the writing implies the capability.

**What v3 should learn from this archetype**:
- **Restraint as signal**. A Peer Architect reading a site with three
  paragraphs and a publication list reads competence into the restraint.
  The opposite — a maximalist personal-brand surface — reads less serious
  by inversion.
- **Receipts via list, not via carousel**. A flat list of shipped products
  with a one-sentence description per is more credible than a styled card
  grid with hero images.
- **Letting the writing carry the brand**. The site doesn't need to do the
  work the blog does. It needs to index the blog and not get in its way.

## Archetype 2 — Designer-engineers with high motion polish

**Reference sites**:
- **Brian Lovin** (brian.lovin.io) — personality-forward, opinionated
  single-author site. Daily-driver Mac apps, design notes, frequent updates.
- **Jordan Singer** (jsngr.co) — designer-engineer with experimental
  surfaces (e.g., interactive demos as portfolio entries).
- **Rauno Freiberg** (rauno.me) — designer with high motion / micro-
  interaction polish; reference for motion language `MODERN_ANIMATION_SYSTEM.md`
  gestures at.

**Common pattern**:
- Strong visual identity, often a single saturated accent color used
  precisely.
- Motion is meaningful (entrance, focus, state-change) not decorative.
- "Now" or "currently" sections that update frequently.
- Personality is explicit: a daily-driver list, a music section, a now-page.
- Side projects are interactive demos, not screenshots.

**What v3 should learn from this archetype**:
- **Motion as polish, not spectacle**. v2 already loaded `modernAnimations.css`;
  the prescription should keep motion but use it for state changes and
  reveals, not ambient animation.
- **A "now" surface done right**. `/now` exists on v2; it could be the
  Peer Architect's bookmark surface if it became the canonical
  status-of-Nino's-work page.
- **Personality without dilution**. Brian Lovin's site is personality-forward
  AND credibility-forward. It's possible to have both. The current v2
  creative-pursuit framing (Photography + Music + Writing + Building) reads
  hobbyist; the Lovin pattern reads as a person who happens to also do
  these things, with the engineering-credibility staying primary.

## Archetype 3 — Peer reference (friend's site, not adversarial)

**Reference site**:
- **Aurvia** (https://aurvia.io/) — explicitly identified in `blueprint.yml`
  as a friend's site, peer reference, not adversarial competitor.

**Why this archetype is its own group**:
A friend's site is calibration data, not benchmark data. The v3 redesign is
not trying to "beat" Aurvia and is not trying to look like Aurvia. The
purpose of including Aurvia is to **anchor what "good for our cohort"
currently looks like** — what visual + IA conventions a credible peer
landed on, so the v3 redesign can either align or diverge with intention.

**What v3 should learn from this archetype**:
- **The conventions of a peer practitioner's site in this moment**.
  Whatever Aurvia ships is what the peer audience is currently used to.
  v3 can do what Aurvia does and inherit that fluency, or diverge and pay
  the orientation cost — both are defensible, neither is automatic.
- **Don't copy. Calibrate**. If Aurvia and v3 land on the same IA, that
  should be coincidence (because the cohort converged) rather than
  imitation.

## Cross-cohort observations

### What none of these sites have

- **A speaking surface that's a full page** (Lovin, Singer, Freiberg, Lehr,
  Collison, Lopopolo — none have a dedicated `/speaking` page with bio
  variants, headshot library, topic list). If v3 builds one, it differentiates
  from the cohort. That's either advantage or noise — the Conference
  Circuit persona analysis says advantage.
- **A bento grid as the home page**. The cohort universally rejects this
  pattern. v2 uses it. Stage 2 prescription should question this hard.
- **Creative-pursuit framing on the home page**. None of these sites
  frames the practitioner as a four-pursuit polymath on the landing
  surface. Personality lives in deeper pages, not on `/`.
- **Hero image rotation**. None do it. v2 does. Worth questioning.

### What every site in the cohort has

- **A clear, single-sentence capability statement on `/`** — even Collison's
  spartan site states what Stripe does in the first paragraph.
- **A blog / writing surface that is prominent and recent**. Updates are
  visible. The site signals "this person is still writing."
- **A direct contact path** — usually email, sometimes a form, never just
  social DMs.

## Brand-strategy reconciliation

`docs/brand-domination-strategy.md` (683 lines) is symlinked at
`competitive/brand-strategy-prior.md`. Per `_inventory.md` decision 3, that
strategy was authored but did not ship and is **not active**. The peer-
cohort calibration here supersedes it. Stage 2 prescription authors brand
positioning from working-product receipts and this peer-cohort frame, not
from `brand-strategy-prior.md`.

## What does NOT belong in this cohort

- **Agency sites** — different audience, different shape, different conversion goals.
- **Conference-speaker showcase sites** — Nino's site is the speaker's home,
  not a speaker-marketplace listing.
- **Photography-first portfolios** — `apps/photography` covers that audience
  on its own subdomain.
- **AI startup landing pages** — Quantifai, Signal X Studio, etc. are
  separate properties. The personal site does not compete with or imitate
  them.
