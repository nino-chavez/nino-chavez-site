# ninochavez.co — Visual Identity Brief (refreshed 2026-05-25)

Per `tools/forge-site/playbook/3.5-design-brief.md`. One page. Five sections.

**This version supersedes the original 2026-05-24 brief.** Reason: original §2 (Compositions per page) was authored against the flat 5-case-study slate. Cluster IA per ADR-0009 recasts `/work` and `/writing` page shapes. §1 (Signature), §3 (Imagery), §4 (Motion), §5 (Iconography) survive substantially unchanged — they were pattern-independent.

Reference example: `wip/tna/brand/visual-identity/brief.md` (TNA chose `instrument-readout`; this brief picks a different signature because ninochavez.co's thesis is different).

## 1. Signature

**`schematic-diagram`** — hand-drafted inline SVG diagrams as primary content, not decoration. 1.5px stroke, no fill, mono labels (JetBrains Mono), violet accent on the load-bearing node, no gradients, no glow, no rounded ends. Diagrams replace the slots that would otherwise hold decorative imagery — hero, section headers, case-study openers, `/practice` sub-section headers.

Reason: the positioning is *"Nino does not configure Claude. He instruments it."* That claim is only credible if visitors see the instruments. A photograph or stock illustration in the hero slot reads as decoration; a schematic of the three-layer hesitation fold reads as the evidence itself.

**Anchor diagrams** (recur across pages for visual continuity):

- **forge-production-line-diagram** — `forge` umbrella (PUBLIC, violet-accent node) feeding 5 lathes (specchain → big-blueprint → forge-brand → forge-signal → image-gen). **Load-bearing for the forge-production-line cluster section on `/work` per ADR-0009.** Also appears on `/` (compressed) and `/practice` (toolchain section).
- **hesitation-fold-diagram** — declarative-rule (CLAUDE.md) ↦ prompt-hook (predict) ↦ stop-hook (correct), three boxes sharing one classifier rendered as the violet-accent node. Appears on `/practice` (instrumentation section) and `/about` (small inline variant).
- **paired-deploy-diagram** — main-site CF Pages project (`ninochavez-main`) + blueprint portal CF Pages project (`ninochavez-blueprint`) sharing repo + Vectorize index. Appears on the blueprint portal `/` landing as the meta-signature for the paired-deploy pattern itself.

**Supporting patterns (subordinate to the signature)**:

- **`stamped-monogram`** — `nc.` typographic mark with violet terminator dot, used as masthead and footer brand surface.
- **`instrument-readout`** — bordered cards with mono pill metadata in headers, used for credibility ribbon and per-cluster count chips.
- **`editorial-italic`** — italic emphasis in violet on the load-bearing word of the hero claim and the `/about` lede.
- **NEW: `cluster-ribbon`** — compact horizontal navigation strip introduced by ADR-0009. One chip per cluster, each with label + count + anchor. Lives at the top of `/work` (full form) and below the hero on `/` (compressed form). Subordinate to the signature visually; structural to the IA.

**Anti-uses**:

- **No volleyball action photography on the main site.** Belongs on the photography subdomain.
- **No AI-generated imagery anywhere on the main site.** Schematics are hand-drafted because (a) statistical generation can't hit the constraint set, (b) the brand sells precision engineering — AI-glitch artifacts would directly undermine the claim.
- **No bento grid as a recurring composition** — categorically refused per DESIGN-PRINCIPLES.md §10. Cluster sections are full-width editorial blocks, not mixed-size tiles.
- **Navigation labels stay restrained** — no signature treatment on nav.
- **404 / empty states** use the editorial-italic register, not the schematic.

## 2. Compositions per page

Site map (from `02-prescription.yml` refreshed 2026-05-25):

```
MAIN SITE (ninochavez.co — SvelteKit)
/                  Hero + compressed cluster ribbon + practice teaser + writing teaser + chat
/about             Narrative
/practice          Toolchain + substrate + operating rules + instrumentation
/work              Hero + cluster ribbon + 8 per-cluster editorial sections (ADR-0009)
/work/[cluster]/[slug]  Per-project deep dives (6 leads: atelier, cortex, ask-dad,
                        bc-subscriptions, ask-bc, rally-hq)
/writing           All 7 collections surfaced with counts + flagships per
/contact           Single form
/api/*.json        AEO endpoints
/api/ask/chat      RAG endpoint (preserved from pre-nuke, working)

BLUEPRINT PORTAL (blueprint.ninochavez.co — static HTML + Pages Functions per ADR-0008)
/                  Studio catalog — slice cards + flow links + chat entry
/pages/<id>.html   One prototype page per main-site route (proposed-view + shipped-view)
/docs/             Markdown viewer for blueprint/*.md
/functions/api/chat.js  Vectorize-backed chat (shared askdad-corpus)
```

| Page | Compositions in execution order |
|---|---|
| `/` (main) | `hero-with-thesis` (editorial-italic claim + violet emphasis on *instrument*) → `cluster-ribbon-compressed` (8 chips, compact form, anchor to /work) → `signature-diagram-hero` (forge-production-line-diagram, full-width) → `practice-teaser-panel` (3-link card to /practice sub-sections) → `writing-teaser-panel` (collection counts + 2 flagship pointers) → `closing-thesis-panel` (italic emphasis + chat entry CTA) |
| `/work` | `hero-with-thesis` (one-line thesis) → `cluster-ribbon-full` (8 chips, full form, each with label + count + anchor) → 8× `cluster-section` (one per cluster, anchored, each using its declared composition per ADR-0009) → `footer-transition` (pointer to /practice and /about) |
| `/work/[cluster]/[slug]` | `hero-case-study` (problem + live-URL pill + cluster breadcrumb) → `signature-diagram-opener` (per-study schematic, full-width) → `agentic-approach-readout` (3 readout cards) → `quotable-artifact-block` (pull-quote + GitHub link) → `outcome-readout` (metrics + cited-source footer) |
| `/practice` | `hero-with-thesis` ("This is how I work") → `production-line-readout` (forge family + ai-hive + claude-* tools, lead with PUBLIC `forge`) → `substrate-stack` (hooks + skills/subagents + session mining + Hive coordination) → `operating-rules-stack` (4 rules quoted verbatim from ~/.claude/CLAUDE.md) → `instrumentation-deep-dive` (hesitation-fold-diagram + Poe corpus stats + adversarial-test-plan + GitHub-link per artifact) |
| `/writing` | `editorial-lede` (paragraph framing Signal Dispatch + total artifact count) → `collection-grid` (7 collections, one card each, count + 2 flagship titles per) → `recent-pieces-list` (chronological from blog RSS, last 10) → `archive-pointer` (link to full archive at blog.ninochavez.co) |
| `/about` | `hero-with-thesis` (1st-person lede, italic emphasis on the practice) → `narrative-prose-block` (3 short paragraphs: who / what changed / what now) → `closing-pointer-row` (photography / signal dispatch / contact links as a mono row) |
| `/contact` | `engage-hero` ("I'm not selling services. I respond to interesting work.") → `single-form-with-receipts` (email / GitHub / LinkedIn mono row + minimal form with name + email + message + Turnstile + Resend) |

| Blueprint portal page | Compositions in execution order |
|---|---|
| Portal `/` (studio catalog) | `portal-hero` (project name + tagline) → `slice-card-grid` (one card per slice, auto-rendered from `_meta/index.json`) → `flow-strip` (one chip per declared flow) → `chat-fab` (bottom-right, always-visible) |
| Portal `/pages/<id>.html` | Per `blueprint/portal/CONVENTIONS.md`: `top-brand-bar` (36px, fixed) → `slice-header-bar` (44px, breadcrumb + PROPOSED/COMPARE/SHIPPED toggle + finding/principle badges) → `proposed-view` (production-indistinguishable rendering of the page) → `shipped-view` (v2 screenshot or mock) → `slice-sidebar` (pages-in-slice + flows-through-slice) → `strategy-drawer` (right, populated from `_meta/<id>.json#strategy`) → `shipped-drawer` (left, populated from `_meta/<id>.json#currentState`) → `chat-fab` |

**Composition-order rule (per playbook):** the second composition on every page is signature-bearing, ribbon-bearing, or readout-bearing — never editorial prose. On `/`, the cluster-ribbon-compressed in slot 2 establishes that the page will quantify scope. On `/work`, the cluster-ribbon-full in slot 2 establishes that this is a catalog of breadth, not a curated highlights reel. On `/practice`, the production-line-readout in slot 2 establishes that the page is a catalog of artifacts, not an essay about them. Essay-second produces the same blog-y cadence as every other portfolio site.

## 3. Imagery direction

- **Texture / hero**: **none.** The hero uses a schematic-diagram, not a textured background.
- **Diagrams**: **hand-drafted inline SVG.** Diagrams to author for v3 launch:
  - `forge-production-line` (umbrella + 5 lathes; load-bearing for `/work` forge cluster section)
  - `hesitation-fold` (3-box + classifier; load-bearing for `/practice` instrumentation)
  - `paired-deploy` (main + blueprint CF projects + shared Vectorize; for portal landing)
  - Per-case-study schematics: `atelier-12-tool-mcp`, `cortex-local-pipeline`, `ask-dad-rag`, `bc-subscriptions-dual-track`, `ask-bc-hybrid-arch`, `rally-hq-blueprint-pipeline`
  - All in 1.5px violet/white stroke, JetBrains Mono labels, deterministic geometry, no decoration.
- **NEW: Screenshots as current-state evidence (blueprint portal only).** v2 routes captured at 1440px + 390px, stored in `blueprint/portal/current-state/<route-id>.{1440,390}.png`. Surface in the portal's Shipped drawer per page. Reason: comparison toggle requires a faithful "what exists today" reference — synthetic mockups would defeat the audit point.
- **Portraits**: **one head-on portrait on `/about`, optional.** Schematic-tile placeholder (`nc.` stamped-monogram in a violet-accent tile) until a real photograph is supplied.
- **Photographic imagery on the main site**: **refused everywhere except `/about` portrait slot.** Photographic content lives on the photography subdomain.
- **Decorative imagery, lifestyle photography, abstract art, stock graphics**: refused.

## 4. Motion budget

- **Static by default.** Entrance animations on page load fight the schematic register. Schematics rendered in still SVG read as authoritative; schematics that fade in read as marketing collateral.
- **Hover**: subtle. `lift (translateY(-2px))` + violet glow shadow on interactive cards (cluster chips on `/`, case-study cards in cluster sections, toolchain readouts on `/practice`). 200ms cubic-bezier `(0.16, 1, 0.3, 1)`. No scale transforms.
- **Scroll-reveal**: only on credibility-readout-row on `/` (if used) and on the cluster-ribbon when it enters viewport. Stagger 80ms, fade-up 320ms. No other scroll-triggered motion.
- **Schematic animation**: refused at v3 launch. Static SVG.
- **Cluster section anchor scroll**: smooth-scroll on ribbon-chip click (180ms ease-out, gated on `prefers-reduced-motion: no-preference`).
- **Portal comparison toggle**: instant cross-fade between proposed-view and shipped-view (120ms, no easing). Reason: comparison-toggle is for analytical work; animation reads as decoration there.
- **Drawer open/close (portal)**: 200ms slide + fade. Standard.
- **Reduce-motion fallback**: **required.** All transforms and transitions gated on `prefers-reduced-motion: no-preference`. Verify in fact-check.

## 5. Iconography

- **Style register**: **`schematic-mono-line`.** 1.5px stroke, no fill, no rounded ends, no decoration. Matches the schematic-diagram signature exactly.
- **Source**: **hand-drafted inline SVG.** Starter set for v3 launch (12 icons):
  - `github`, `linkedin`, `external-link`, `arrow-right`, `arrow-down` (anchor cue for ribbon→section), `check`, `x`, `info`, `code`, `terminal`, `file`, `globe` (live-URL indicator)
- **No icon libraries** (Lucide / Heroicons / Phosphor) because they're filled-humanist or rounded-end and would fight the signature even with overrides.
- **Pills and inline marks**: `▸` (mono triangle) for list bullets in readouts; `·` (mono mid-dot) as separator in stamped-monogram. Both rendered as text, not SVG.
- **PUBLIC/private visibility badges**: small mono pills (12px height, JetBrains Mono 10px, no border, violet text for PUBLIC, neutral text for private). Used on every repo mention in cluster sections per ADR-0009 enforcement.

## Audit checks (pre-ship)

- [ ] **Signature appears on at least 6 pages.** Target: `/` (forge production line compressed), `/work` (forge cluster section), each `/work/[cluster]/[slug]` (6 pages), `/practice` (hesitation fold), `/about` (small inline), blueprint portal `/` (paired-deploy diagram). That's 11 pages — exceeds the threshold.
- [ ] **Cluster ribbon appears on `/` (compressed) and `/work` (full).** Both render 8 chips with counts matching `research/current-state/repos-inventory.md`.
- [ ] **Every page uses 2–6 compositions.** Verify per page in the IA table above.
- [ ] **All 7 writing collections surface on `/writing` with counts.** Verify counts match `apps/blog/astro-build/src/content/`.
- [ ] **Imagery direction reinforces signature.** Verify no photographic or AI-generated images leak into main-site pages.
- [ ] **Motion budget matches voice register.** Verify reduce-motion CSS wired; verify no entrance animations on page load except cluster-ribbon scroll-reveal and credibility stagger; verify no animated schematics.
- [ ] **Iconography subordinates to signature.** Verify all 12 icons follow 1.5px no-fill schematic-mono-line register.
- [ ] **PUBLIC/private badges present on every repo mention in cluster sections.**
- [ ] **Design system page exists at `/design-system`.** Every token, pattern, component, motion curve rendered live as the canonical visual reference. *Load-bearing audit gate — without `/design-system`, the rebuild produces drift.*
- [ ] **Blueprint portal `_meta/<page-id>.json` files populate `strategy.*` and `currentState.*` for every prototype page.** Per ADR-0008 enforcement.
- [ ] **No bento, no lime, no Bebas Neue.** Verify only violet accent + Inter + JetBrains Mono.

## Hero claim — locked

Per ADR-0003, option A is locked:

**"Context engineer. I _instrument_ the systems that build the systems."**

The italic-emphasis word *instrument* takes the violet accent. Pairs cleanly with the forge-production-line schematic immediately below — the recursion in the claim ("systems that build the systems") is what the diagram literally depicts.

## Why this brief is not the design system

This brief is *prescription* — which signature, which compositions, which imagery, which motion, which icons — and *why*. The design system at `/design-system` (built in Phase 2 of the rebuild, audit-gated above) is *specification* — every token, every component, every motion curve rendered live in code so the implementer and reviewer are looking at the same artifact. Prose alone is insufficient: two implementers reading this brief in prose produce two different visuals. Only rendered code at `/design-system` is unambiguous.

## What changed from the original brief

| Section | Change | Reason |
|---|---|---|
| §1 Signature | Added `forge-production-line-diagram` as load-bearing anchor; added `cluster-ribbon` as new supporting pattern; added `paired-deploy-diagram` for portal landing | Cluster IA needs visual treatment for the forge cluster; ribbon is new primitive; portal adoption introduces new diagram |
| §2 Compositions | Major rewrite of `/work` (cluster ribbon + 8 sections), `/work/[cluster]/[slug]` (nested route), `/writing` (all 7 collections), `/` (compressed ribbon); removed `/now` (cut from sitemap); removed `/links` (cut); removed `/privacy` (still exists but absent from the brief — minimal legal page doesn't need composition spec); added blueprint portal page compositions | ADR-0009 cluster pattern; ADR-0008 portal adoption; deferred /now decision per refreshed diagnose |
| §3 Imagery | Added screenshots-as-current-state-evidence direction for portal | Portal Shipped drawers need v2 screenshots, not synthetic mockups |
| §4 Motion | Added cluster-ribbon anchor-scroll, portal toggle cross-fade, portal drawer slide | New primitives need motion specs |
| §5 Iconography | Added `arrow-down`, `globe`; added PUBLIC/private visibility badges as a typographic primitive | Cluster ribbon needs anchor-down cue; visibility badges enforce ADR-0009 honesty requirement |
| Hero claim section | Locked to option A (no longer "finalist set") | ADR-0003 locked it |
| New: "What changed" section | This table | Audit trail for the refresh |
