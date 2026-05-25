# DESIGN-PRINCIPLES.md — ninochavez.co v3

**Stage 2 gate per `wip/blueprint`.** What this site CAN'T do today. Explicit refusal list — the failure mode the bc-subscriptions case study pays for is letting drift accumulate when there's no codified "won't."

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

### 5. No paid course / curriculum-tier cards / membership funnel

Refused: payment, gating, "Learn X with Nino" packaging, tier cards, membership signup, course-completion certificates, or any framing that reads as a paid product. **Applies to any future surfacing of practice/curriculum content** — the prior `/ai/learn` 8-track surface was nuked 2026-05-25; if practice content is re-surfaced (under `/practice/learn`, `/curriculum`, or any other route), this refusal still binds.

**Why:** course-seller framing competes with hireable-context-engineer framing. Open reference material does NOT — it demonstrates the practice without selling it. Per Nino's intent: "share the concepts of the agentic workflows and principles used here without having to share the repo entirely."

**Enforcement:** No pricing tables, no "enroll" CTAs, no email-gate. Any future curriculum surface must surface structure (levels, artifacts, timelines) as reference, not as a sales funnel.

### 6. RAG / Q&A surfaces are supplementary, never primary

Refused: positioning a RAG/chat surface as the headline credibility play, replacing readable toolchain artifacts with conversational extraction, decorative novelty (Rive avatar, "Virtual Nino" personality framing, talking-head conceit). **Applies to any future surfacing of the ask-dad chat** — the prior `/ai/ask` UI was nuked 2026-05-25; the backend (`src/lib/server/askdad/` + `/api/ask/chat` endpoint + Vectorize `askdad-corpus` index) is preserved and will power both the v3 site's chat FAB (if surfaced) and the blueprint portal's chat function. UI surfacing decisions must obey this rule regardless of route.

**Why:** the primary credibility play is the toolchain artifacts being human-readable + browsable. The chatbot is the door for someone who wants to ask one question — not the substitute for browsing the case studies. The corpus must remain grounded in real published artifacts; no fabricated training data.

**Enforcement:** Any UI surfacing of ask-dad must be supplementary to `/work` and `/practice`, not primary. The chat is grounded in `askdad-corpus` (mechanically derived from source per ADR-0006). New corpus sources must point at real published artifacts (no fabrication).

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

The bc-subscriptions case-study (`wip/blueprint/docs/case-study-bc-subscriptions-skipped-stages-2-4.md`) shows the cost of skipping Stage 4. Concrete fact-check gates for v3 (refreshed 2026-05-25 against cluster IA + Stage 1 Research):

| Claim site makes | How it gets verified | Current status |
|---|---|---|
| Production line = `forge` (PUBLIC umbrella) + 5 private lathes | `gh repo view nino-chavez/<tool> --json visibility` for each | ✓ Verified per `research/current-state/repos-inventory.md`. `forge` IS PUBLIC. Lathes (specchain, blueprint, forge-brand, forge-signal, image-gen) are PRIVATE. `ai-champions-kit` is PUBLIC. The "all lathes private" framing was corrected during Stage 1 Research. Public-flip decisions for individual lathes deferred per Nino 2026-05-25; revisit if cluster surfacing exposes a credibility gap. |
| Cluster counts on `/work` ribbon match the inventory | Compare each cluster chip count against `research/current-state/repos-inventory.md` "Thematic clusters" section | ⏳ Pending — verify after main site rebuild lands. Baseline counts: forge 8 / agent-infra 10 / AI-products 18 / commerce 10 / volleyball 9 / personal 7 / client 4 / writing ~275 artifacts. |
| Public vs private badges accurate on every repo mention | grep for repo URLs in shipped src/ + run `gh repo view` on each | ⏳ Pending — verify after main site rebuild. Source-of-truth: `research/current-state/repos-inventory.md`. |
| No references to non-existent repos | grep for repo URLs in shipped src/ + run `gh repo view` on each | ✓ AEGIS / signal-x-studio/aegis-framework was caught + removed pre-nuke. Post-nuke src is empty; verify again post-rebuild. |
| Hero credibility ribbon counts (if used): 69 repos / 17 live deploys / ~275 published artifacts | Numbers source from `research/synthesis.md` scale-mismatch table; refresh inventory before each push if surface has grown | ✓ Source-of-truth in `research/current-state/`. Refresh policy: re-run `gh repo list` + `wrangler pages project list` + `find apps/blog/astro-build/src/content` before any ribbon-count change ships. |
| Voice signals count (if used in copy): 762 across 63 projects | Read `~/.claude/poe/stack.md` top metadata; update number on every push if the corpus has grown | ✓ Current count per loaded stack at session start: 762/63. Update before any prose reference ships. |
| 6 lead case-study URLs return 200 | `curl -sI -L` each URL | ⏳ Pending — leads per refreshed prescription: atelier (PUB repo), cortex (PUB repo), ask-dad (subdomain), bc-subscriptions (repo), ask-bc (subdomain), rally-hq (paired live + blueprint deploy). Verify before deploy. |
| AEO `/api/person.json` leads with "Context Engineer" in deployed payload | `curl` against the live preview deploy, not just source grep | ⏳ Pending — endpoint will be rebuilt with cluster IA framing in Phase 2 of rebuild. |
| `/practice` four sections each ground to real artifacts | Each public-repo link clicked manually; private repos render with visibility badge | ⏳ Pending — `/practice` will be rebuilt in Phase 2. Brief §2 locked the 4-section structure: production-line / substrate / operating-rules / instrumentation. |
| Blueprint portal `_meta/<page-id>.json` `strategy.*` and `currentState.*` populated for every prototype page | Lint script over `_meta/` checking required fields per `CONVENTIONS.md` | ⏳ Pending — portal pages authored in Phase 1 of rebuild. ADR-0008 enforcement. |
| Portal v2 current-state screenshots captured at 1440 + 390 for every prototype page that has a shipped equivalent | `ls blueprint/portal/current-state/*.{1440,390}.png` matches `_meta/<page-id>.json#currentState.route` list | ⏳ Pending — screenshots captured in Phase 1 of rebuild. |
| Writing collection counts match the filesystem | `find apps/blog/astro-build/src/content/<collection> -name "*.md*" \| wc -l` matches displayed count | ⏳ Pending — `/writing` will be rebuilt in Phase 2. Baseline 2026-05-25: blog 229 / whitepapers 12 / series 8 / fiction 10 / presentations 9 / counterpoints 3 / tutorials 3 / research-notes 1. |
| OpenAI "harness engineering" piece cited as third-party validation on `/practice` (per ADR-0010) | grep `/practice` rendered HTML for `openai.com/index/harness-engineering`; verify framing is "OpenAI named the discipline; canon predates by ~18 months" not "borrowed from" | ⏳ Pending — content draft (`content/practice.md` Composition 0) already updated 2026-05-25; rebuild pass needs to render the link with correct attribution framing. |
| Published canon (whitepaper + companion blog) cited as primary sources on `/practice` | grep `/practice` rendered HTML for `the-backport-i-didnt-make` + `blueprint-methodology` slugs | ⏳ Pending — content draft already updated; verify post-rebuild that the citation pill row renders above the thesis (not buried) |
| Buy-vs-build threshold claim stated specifically, not absolutely | grep all v3 site copy + AEO endpoints for phrases like "indistinguishable from off-the-shelf" or "off-the-shelf is dead" — none should appear; the threshold framing (border moved up the stack, build wins below, buy wins above) MUST appear in the lede sub-claim or `/practice` if the claim is made at all | ⏳ Pending — lede sub-claim added to `content/hero.md` per ADR-0010 §5; verify post-rebuild that no absolute overclaim crept in elsewhere. |
| Forge framework integrated coherently with published canon (lathe + chassis) | `/practice` Composition 2 intro names "production line + forge framework" explicitly; metaphor stack table from ADR-0010 §2 is the source-of-truth for any external explanation; lathe/chassis NOT removed in favor of forge | ⏳ Pending — content draft updated 2026-05-25; verify post-rebuild that lathe + chassis remain primary vocabulary and forge layers on as production-unit framing, not replacement. |
| Lede sub-claim renders under the locked hero on `/` and `/about` (per ADR-0010 §5) | View `/` + `/about` rendered HTML; "I build the harnesses that make personal software possible" appears immediately under the locked hero claim | ⏳ Pending — content draft (`content/hero.md`) updated 2026-05-25; `/about` content needs same update in Phase 2. |

These aren't optional. They're the discipline the bc-subs case study says is the difference between "structurally complete" and "runtime-complete."

## Anti-pattern: removing this file

If a future PR removes or guts this file, that PR is the anti-pattern. The Stage 2 gate exists to slow down drift; deleting it because "we don't have time to maintain it" is exactly the failure mode it prevents. Add new categorical refusals as they get discovered; never remove the existing ones unless the entire positioning thesis changes.
