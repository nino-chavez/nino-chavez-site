# DESIGN-PRINCIPLES.md — ninochavez.co v3

**Stage 2 gate per `wip/big-blueprint`.** What this site CAN'T do today. Explicit refusal list — the failure mode the bc-subscriptions case study pays for is letting drift accumulate when there's no codified "won't."

Each rule below is enforceable on review. If a Phase 3 PR or a Phase 4 cut introduces something on this list, reviewers (you, future-Nino, or future agents) reject without ceremony.

## Categorical refusals (won't ship in any phase)

### 1. No transactional framing on the main surface

The site does not sell services, take bookings, or accept inquiries that imply paid engagement. No Cal.com integration, no "Now Booking" availability indicator, no service-tier cards, no pricing pages, no contact form copy that reads as a sales funnel.

**Why:** the goal is hirable + known as a context engineer, not sellable as a consultant. The Aurvia.io structure was a structural reference for the credibility-header pattern, NOT the service-tier IA. Mixing the two reads as larping.

**Enforcement:** [ADR-0001](./decisions/0001-positioning-context-engineer.md). Cal.com integration cut list locked in [`02-prescription.yml`](./02-prescription.yml) `cut_routes` block. Contact page copy: *"I'm not selling services. I respond to interesting work."*

### 2. No AI-generated imagery anywhere on the main site

Hand-drafted SVG schematics only. No DALL-E / Midjourney / Stable Diffusion / Sora outputs in any hero, section header, OG card, or decorative slot.

**Why:** the thesis is *"I instrument the systems."* A brand whose claim is engineering precision cannot ship statistical-generation glitch artifacts in its hero. Photography subdomain (`/photography`) has its own rules; the main site refuses synthetic imagery categorically.

**Enforcement:** [ADR-0004](./decisions/0004-signature-schematic-diagram.md). Design brief §3 imagery direction.

### 3. No volleyball / action-sports imagery on the main surface

Photography of any kind stays on the `photography.ninochavez.co` subdomain (now collapsed to `ninochavez.co/photography` via router worker). The main site uses schematic-diagram imagery only.

**Why:** action photography on the main hero positions the surface as photographer-first. The main site is the context-engineer surface; the photography subdomain is the photographer surface. Duplicating across dilutes both.

**Enforcement:** Design brief §3 imagery direction. Anti-use enumerated in `content/hero.md`.

### 4. No 4-way polymath grid

No equal-weight grid presenting Software / Photography / Music / Writing as parallel interests. The site leads with a single positioning claim. Other facets surface as one-line pointers on `/about`, not as visual co-equals on the homepage.

**Why:** the polymath framing is what positions the current v2 site as "generalist creative" rather than "context engineer." It's the single biggest positioning misalignment the audit identified.

**Enforcement:** [ADR-0001](./decisions/0001-positioning-context-engineer.md). Diagnose explicitly cuts the v2 interests grid.

### 5. No course / education / training pitch

No `/ai/learn` surface, no "Learn X with Nino" framing, no AI-course offerings, no curriculum-tier cards. The practice is documented openly on `/practice`; visitors can read it; that's the surface.

**Why:** course-seller framing competes directly with the hireable-context-engineer framing. The current v2 site has 8 `/ai/learn/*` sub-pages marked `noindex,nofollow` — the fact that they're un-indexable suggests they were already abandoned; v3 deletes them.

**Enforcement:** `02-prescription.yml` `cut_routes` block. Phase 4 destructive cut.

### 6. No RAG-chat / "Virtual Nino" / chatbot novelty

No `/ai/ask` page, no Rive avatar, no conversational interface dressed as a feature.

**Why:** "ask the AI version of me" positions the brand as chatbot novelty, not hireable expert. The credibility play is the toolchain artifacts being readable by humans, not a chatbot demonstrating Nino's voice.

**Enforcement:** `02-prescription.yml` `cut_routes` block. Phase 4 destructive cut.

### 7. No prescriptive-authority voice

No "you should always" / "the right way to do this is" / "here are the N steps to..." patterns. The voice grounds claims in specific experience and trusts the reader to evaluate.

**Why:** Voice-guide rule (`~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md` §"Prescriptive Authority"). The Signal Dispatch voice is process-oriented, not preach-oriented. The portfolio surface inherits that voice.

**Enforcement:** review every prose draft against the voice guide before commit. Voice-guide check is mandatory before any prose ships.

### 8. No fabricated anecdotes

No invented people, conversations, or events. "A friend of mine once..." / "A client told me..." / "I was talking to a colleague..." — all refused unless witnessed directly and named.

**Why:** Voice-guide hard rule. Specific fabrication breaks the credibility play; would Nino be comfortable if someone asked *"which friend?"*

**Enforcement:** review every case-study `learned` section and every about/practice anecdote against the rule.

### 9. No templated provisionality

No "Ask me again in six months" / "Here's where I've landed—for now" / "Your mileage may vary" / "That's the direction, anyway" / "This is what I think today." These were once authentic; through overuse they are now AI-generated-content tells.

**Why:** Voice-guide rule. Closing phrases must vary per page. Find directional language fresh each time.

**Enforcement:** voice-guide check before any prose ships. Phrase-list grep on the prose drafts.

### 10. No bento grid + lime + Bebas Neue tells

No bento-card grid as a homepage hero pattern. No lime / electric-green accent. No Bebas Neue display font. No "Cut the Noise / Follow the Signal" tagline.

**Why:** these are template-tailwind / vibe-coded-dev-portfolio-on-Twitter-circa-2024 tells. The current v2 homepage violates the project's own `DESIGN.md` — restoring conformance is the visual reset.

**Enforcement:** [ADR-0004](./decisions/0004-signature-schematic-diagram.md). Phase 3 visual reset. Final design audit checks for these specifically.

## Soft refusals (revisit if scope changes)

### A. No CMS at v3 launch

`cms-sanity` is deferred indefinitely. Nino is the editor; markdown + work-data.ts are source of truth.

**Revisit if:** a non-developer co-author joins (Travis / Alex via TNA, or any future co-author).

### B. No analytics segmentation at v3 launch

Cloudflare Web Analytics is enough. PostHog deferred until traffic warrants segmentation.

**Revisit if:** v3 traffic exceeds ~1K monthly visitors and there's a real product-analytics question to answer.

### C. No `state-derive`-equivalent mechanical capability check tool

Manual verification at v3 launch; tool deferred (per Option B "lean" scope).

**Revisit if:** the v3 redesign scope grows beyond the current 5-phase plan, or if a second portfolio surface (gallery, blog, signalx.studio) absorbs similar redesign work and the tool becomes a force multiplier.

## Stage 4 (Fact-Check) discipline — the bc-subs lesson applied

The bc-subscriptions case-study (`wip/big-blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md`) shows the cost of skipping Stage 4. Concrete fact-check gates for v3:

| Claim site makes | How it gets verified | Current status |
|---|---|---|
| Production line = 5 named lathes + 1 public transfer kit | `gh repo view nino-chavez/<tool> --json visibility` for each | **Lathes are PRIVATE** (specchain, big-blueprint, forge-brand, forge-signal, gen-images). `ai-champions-kit` is the single PUBLIC artifact. AEGIS Framework was previously claimed in copy but `signal-x-studio/aegis-framework` does not exist as a repo (GraphQL "Could not resolve to a Repository") — **fabrication caught and removed from all v3 surfaces 2026-05-25.** Production-line framing aligns with "The Backport I Didn't Make" (Signal Dispatch). **Launch decision needed**: make the 5 lathes public OR keep "lathes are private; the transfer kit is public" framing permanently. See HANDOFF.md "Open launch decisions." |
| No references to non-existent repos | grep for repo URLs in shipped src/ + run `gh repo view` on each | ✓ AEGIS / signal-x-studio/aegis-framework removed from /, /about, /practice, /api/person.json, /api/expertise.json, /api/experience.json, work-data approach text, and blueprint/content/practice.md. Remaining reference in `src/lib/constants.ts` (line 145) is consumed only by /v1 and v2-era FrameSection components — both in Phase 4 destructive-cut list — so will be deleted when those routes are cut. |
| Hero credibility ribbon: 56+ projects | `find ~/Workspace/dev/{apps,wip,tools,client} -mindepth 1 -maxdepth 1 -type d \| wc -l` | ✓ 56 top-level workspace project directories. Updated from "60+" — original undercounted because the narrow `-name package.json -o ...` find missed projects without those manifest files. Broader rule is verifiable. |
| Hero credibility ribbon: 746 voice signals across 62 projects | Read `~/.claude/poe/stack.md` top; update number on every push if the corpus has grown | ✓ Updated to 746 (corpus grew from 743 → 746 mid-session). |
| 5 lead case-study URLs return 200 | `curl -sI -L` each URL | ✓ All 5 verified: rallyhq.app, blueprint.rallyhq.app, atelier.ninochavez.co, askbc.ninochavez.co, ninochavez.co/photography |
| AEO `/api/person.json` leads with "Context Engineer" in deployed payload | `curl` against the live preview deploy, not just source grep | Pending — verify after the next CF Pages deploy lands. |
| `/practice` toolchain card claims | Each public-repo link clicked manually before launch; broken links block deploy. Private repos display non-clickable with "request access" label. | ✓ Card visibility prop wired; private repos render as non-link text. |

These aren't optional. They're the discipline the bc-subs case study says is the difference between "structurally complete" and "runtime-complete."

## Anti-pattern: removing this file

If a future PR removes or guts this file, that PR is the anti-pattern. The Stage 2 gate exists to slow down drift; deleting it because "we don't have time to maintain it" is exactly the failure mode it prevents. Add new categorical refusals as they get discovered; never remove the existing ones unless the entire positioning thesis changes.
