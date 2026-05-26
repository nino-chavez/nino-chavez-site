---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
---

# Funnel — v2 Current State

Maps how each persona moves through `ninochavez.co` today. Sourced from the
live site source (`src/routes/`) and `src/lib/constants.ts`, not from
analytics. Stage 4 fact-check may revise once referrer/UTM data is
sensored.

The funnel is described in three layers:
1. **Entry** — where they arrive
2. **Engagement** — what they read or click while on-site
3. **Action** — the off-site or convert moment

If a persona has no defined Action layer in v2, that's a current-state failure
and goes into `01-diagnose.md` as a prescription anchor.

## Live route inventory

The current v2 site has the following routes (per `ls src/routes/`):

| Route | Purpose | Audience load |
|---|---|---|
| `/` | Home — bento grid, hero photo rotation, creative-pursuit framing | All three personas land here |
| `/about` | Bio, role, contact links | Prospective Client + Conference Circuit |
| `/work` | Project rows (`constants.ts` § PROJECTS) | Peer Architect + Prospective Client |
| `/work/[slug]` | Per-project detail | Peer Architect (deepest engagement) |
| `/ai/` | 5-page subsection (ask, build, learn, reference) — substantial surface | Peer Architect (highest-fit if surfaced) |
| `/now` | Status / "what I'm doing now" page | Returning visitors only |
| `/links` | External link index | Curiosity-driven taps |
| `/v1` | Legacy v1 surface (per inventory: archive at end of redesign) | Inadvertent entries via stale URLs |
| `/privacy` | Privacy policy | Compliance |
| `/api` | API surface | Programmatic / agent consumers |

The `/ai/` subsection is the single most under-surfaced asset on the site.
Five pages of architect-loaded content with no link from `/`.

## Off-site destinations

The home page sends users to (in order of placement):

| Destination | Type | Notes |
|---|---|---|
| `letspepper.com` | External — Nino's project | Volleyball cultural surface |
| `flickdaymedia.com` | External — Nino's project | Photography subcontractor brand |
| `soundcloud.com/ni-no-cha-vez` | External — Nino | DJ sets / music |
| `photography.ninochavez.co` | Cross-app | Photography gallery property |
| `rallyhq.app` | External — Nino's product | Live tournament platform |
| `blog.ninochavez.co` | Cross-app | Signal Dispatch blog |
| `www.signalx.studio` | External — Nino's studio | Studio identity surface |
| `mailto:nino@ninochavez.co` | Contact | Unstructured |
| `linkedin.com/in/nino-chavez` | Contact | Professional verification |
| `github.com/nino-chavez` | Contact | Code verification |
| `x.com/PhotoByNino` | Contact | Social |
| `/about`, `/now#cv` | Internal | Bio surfaces |

**Observation**: There is no Cal.com booking link on the home page despite
Cal.com being integrated (`docs/CAL-COM-INTEGRATION.md`). The integration
shipped, but the surface placement did not.

## Funnel by persona

### Peer Architect funnel

```
Entry:    Signal Dispatch post (most likely) OR direct /about visit
              ↓
Engagement: /about → maybe /work, maybe blog post → /
              (lateral exploration; few hit /ai/ because nothing surfaces it)
              ↓
Action:    RSS subscribe via blog.ninochavez.co (off-site), OR
           opens rallyhq.app / signalx.studio in new tab, OR
           bookmarks for return
```

**Current-state failure**: `/ai/` subsection is invisible to this persona. The
Peer Architect is the highest-fit audience for `/ai/build`, `/ai/reference`,
etc., and the home page does not link there.

**Current-state win**: Cross-app blog link is prominent. RSS-subscription
action path is intact (just lives on the blog property, not the main site).

### Prospective Client funnel

```
Entry:    / (referral from colleague) OR /about (LinkedIn click-through)
              ↓
Engagement: /about → scans for capability statement → does not find one
              ↓
              maybe clicks /work OR rallyhq.app (highest-conversion link)
              ↓
Action:    [most paths end here without contact]
           OR mailto:nino@ninochavez.co (unstructured)
           OR LinkedIn DM (off-site)
```

**Current-state failure**: No structured contact path on `/`. No Cal.com link
despite the integration existing. No named capability statement matching the
buyer's vocabulary. The Prospective Client cannot convert without doing
their own homework to figure out what to ask for.

**Current-state win**: `/about` is substantive enough that a determined
Prospective Client can verify Nino is real and reach out.

### Conference / Speaking Circuit funnel

```
Entry:    /about (only natural entry; no /speaking page exists)
              ↓
Engagement: /about → scans for talk history → does not find any
              ↓
              clicks blog.ninochavez.co → confirms voice
              ↓
Action:    mailto:nino@ninochavez.co with unstructured speaking inquiry, OR
           [most paths bounce; curator finds another speaker]
```

**Current-state failure**: No speaking surface. No bio variants. No headshot.
No topic list. No past-talks credits. This persona has no funnel — they enter
and immediately fall out.

**Current-state win**: None specific to this persona. The general bio on
`/about` is the only intercept, and it's not structured for speaking-curator
evaluation.

## Cross-persona observations

### Lateral surfaces (`/links`, `/now`)

Neither is part of an active funnel for any of the three personas. They serve
returning-visitor / curiosity-driven taps. Worth keeping for completeness,
but Stage 2 prescription should not invest IA weight in them.

### Legacy surface (`/v1`)

Per `_inventory.md` § "Decisions logged 2026-05-25, point 1": archive at end
of redesign. Currently live and indexable; can leak inbound traffic into a
stale design. Low-priority drag.

### The `/ai/` subsection mystery

`/ai/` has 5 pages — `ask`, `build`, `learn`, `reference`, plus the index.
That's substantial architect-loaded content. It does not appear in:
- The home page bento grid
- The `/about` page
- The site's top-nav (if there is one)
- Any audit doc in `docs/` or `e2e/audit/`

This is either:
1. An experiment that wasn't completed (and should be either finished or
   removed), or
2. A completed surface that's intentionally hidden (which makes no sense for
   a Peer Architect audience), or
3. A surface that was launched and then deprioritized without removal

Stage 2 prescription must answer this. The diagnose flags it as the highest-
priority unknown in the current-state map.

## Funnel-level failures, ranked

| # | Failure | Persona impacted | Prescription priority |
|---|---|---|---|
| 1 | No structured contact path → no scoped buyer conversation | Prospective Client | P0 |
| 2 | No speaking surface → entire persona has no funnel | Conference Circuit | P0 |
| 3 | `/ai/` invisible from `/` → highest-fit content unreachable | Peer Architect | P1 |
| 4 | No capability statement in buyer language | Prospective Client | P1 |
| 5 | Creative-pursuit framing dilutes specialist signal | Prospective Client, Peer Architect | P1 |
| 6 | `/v1` legacy surface still live | All (low blast) | P3 |
| 7 | No analytics sensoring on referrer/UTM | All (operational) | P2 — needed for Stage 4 |

## What this funnel map is NOT

- It is not an analytics report. Real conversion rates are unknown until
  Stage 4 fact-check sensors referrer + Cal.com booking + mailto-click events.
- It is not a prescription. It catalogs what the v2 funnel *is*; Stage 2
  decides what to change.
- It is not exhaustive. Routes like `/privacy` and `/api` are operational
  and outside the conversion-funnel scope for these three personas.
