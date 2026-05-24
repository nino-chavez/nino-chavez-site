# ninochavez.co — Visual Identity Brief

Per `tools/forge-site/playbook/3.5-design-brief.md`. One page. Five sections.

Reference example: `wip/tna/brand/visual-identity/brief.md` (TNA chose `instrument-readout`; this brief picks a different signature because ninochavez.co's thesis is different).

## 1. Signature

**`schematic-diagram`** — hand-drafted inline SVG diagrams as primary content, not decoration. 1.5px stroke, no fill, mono labels (JetBrains Mono), violet accent on the load-bearing node, no gradients, no glow, no rounded ends. Diagrams replace the slots that would otherwise hold decorative imagery — hero, section headers, case-study openers, `/practice` sub-section headers.

Reason: the positioning is *"Nino does not configure Claude. He instruments it."* That claim is only credible if visitors see the instruments. A photograph or stock illustration in the hero slot reads as decoration; a schematic of the three-layer hesitation fold reads as the evidence itself. The signature picks itself from the thesis — anything else would force visitors to *trust* a claim that the page could be making concrete.

Two diagrams should anchor the brand surface (recur across pages as the visual continuity):

- **forge-pipeline-diagram** — brand-kit JSON → tokens → copy → images → site archetype, shown as a left-to-right chain with mono labels and one violet accent on the spine. Appears on `/`, `/practice` (toolchain section), and as an opener on `/work/atelier`.
- **hesitation-fold-diagram** — declarative-rule (CLAUDE.md) ↦ prompt-hook (predict) ↦ stop-hook (correct), three boxes sharing one classifier, with the classifier rendered as the violet-accent node. Appears on `/practice` (instrumentation section) and `/about` (small inline variant).

**Supporting patterns (subordinate to the signature, not competing)**:

- **`stamped-monogram`** — `nc.` typographic mark with violet terminator dot, used as masthead and footer brand surface. Pairs with the signature; replaces any "logo" decision.
- **`instrument-readout`** — bordered cards with mono pill metadata in headers, used for the credibility ribbon (`60+ shipped` / `5 case studies` / `739 voice signals`) and for `/practice` toolchain rows. **Subordinate**, not signature — the schematic is the load-bearing visual move; readouts are auxiliary chrome.
- **`editorial-italic`** — italic emphasis in violet on the load-bearing word of the hero claim and the `/about` lede. One human moment per page; the rest is schematic-precise.

**Anti-uses**:

- **No volleyball action photography on the main site.** It belongs on the photography subdomain (`/photography`). On `ninochavez.co` it dilutes "context engineer" by positioning the surface as photographer-first.
- **No AI-generated imagery anywhere on the main site.** Schematics are hand-drafted because (a) statistical generation cannot hit the constraint set (1.5px stroke, deterministic geometry, mono labels in correct positions), (b) the brand sells precision engineering, so AI-glitch artifacts in a hero image would directly undermine the claim.
- **No bento grid as a recurring composition.** It's a generic template tell. Use the readout-row composition for tabular displays; use the schematic for spatial/architectural displays.
- **No animated audio waveform, scrolling photo strip, giant background "SAY HI" text.** Removed from the current site; do not reintroduce.
- **Navigation labels stay restrained** — no signature treatment on nav.
- **404 / empty states** use the editorial-italic register, not the schematic.

## 2. Compositions per page

Site map (from `02-prescription.yml`):

```
/                Homepage — claim + ribbon + 5 case-study cards + practice teaser + writing teaser + contact line
/work            Case-study index — 5 lead studies + honorable-mentions strip
/work/[slug]     Deep dives × 5 (rally-hq, atelier, ask-bc, photography, bc-subscriptions)
/practice        NEW — toolchain + operating rules + instrumentation
/writing         Signal Dispatch teaser
/about           Narrative
/contact         Single line + minimal form
/now             Current focus, rewritten
/privacy         Privacy policy
/api/*.json      AEO endpoints
```

| Page | Compositions in execution order |
|---|---|
| `/` | `hero-with-thesis` (editorial-italic claim + violet emphasis word) → `credibility-readout-row` (3 instrument-readout cards: shipped count / case-study count / corpus stats) → `signature-diagram-hero` (forge-pipeline-diagram, full-width) → `case-study-stripe` (5 lead studies, one row each, mono stack tags) → `practice-teaser-panel` (3-link card to `/practice` sub-sections) → `closing-thesis-panel` (italic emphasis on "instruments") |
| `/work` | `hero-with-thesis` (one-line + one-line subhead) → `case-study-readout` (5 cards in priority order, each with pull-quote + outcome metric + live-URL pill) → `honorable-mentions-strip` (7-logo wall) |
| `/work/[slug]` | `hero-case-study` (problem statement + live-URL pill + stack tags) → `signature-diagram-opener` (per-study schematic, full-width) → `agentic-approach-readout` (3 readout cards: problem framing / agent design / artifact links) → `quotable-artifact-block` (one pull-quote + GitHub link to the cited file) → `outcome-readout` (instrument-readout card with metrics, footer with cited-source links) |
| `/practice` | `hero-with-thesis` ("This is how I work" + violet emphasis on *how*) → `toolchain-readout-grid` (6 instrument-readout cards, one per tool: forge family / specchain / claude-recall-cli / ai-champions-kit / big-blueprint / router worker) → `operating-rules-stack` (4 rules quoted verbatim from CLAUDE.md, mono pill heading + body + "Why" inset) → `instrumentation-deep-dive` (hesitation-fold-diagram + Poe corpus stats readout + adversarial-test-plan pull-quote + GitHub-link footer per artifact) |
| `/writing` | `editorial-lede` (one paragraph framing Signal Dispatch) → `whitepaper-feature-row` (3 flagship essays with pull-quotes) → `recent-pieces-list` (chronological from blog RSS) |
| `/about` | `hero-with-thesis` (1st-person lede, italic emphasis on the practice) → `narrative-prose-block` (3 short paragraphs: who / what changed / what now) → `closing-pointer-row` (photography / signal dispatch / contact links as a mono row, no decorations) |
| `/contact` | `engage-hero` (one line: "I'm not selling services. I respond to interesting work.") → `single-form-with-receipts` (email / GitHub / LinkedIn as mono row + minimal form with name + email + message + Turnstile + Resend) |
| `/now` | `editorial-lede` (one paragraph current-focus, italic emphasis on the active project) → `now-readout-row` (3 readout cards: shipping / writing / learning) — practice-led, not hobby-led |
| `/privacy` | `prose-block` (privacy policy) |

**Composition-order rule applied (per playbook):** the second composition on every page is signature-bearing or readout-bearing, not editorial prose. On `/`, the credibility-readout-row in slot 2 establishes that the claims will be quantified, not narrated. On `/practice`, the toolchain-readout-grid in slot 2 establishes that the page is a catalog of artifacts, not an essay about them. The reason: the second slot determines whether the page reads as a *catalog of evidence* or as *a personal essay*. Essay-second produces the same blog-y cadence as every other portfolio site.

## 3. Imagery direction

- **Texture / hero**: **none.** The hero uses a schematic-diagram, not a textured background. Reason: textures are decorative; schematics are content. The brand has only one slot for the load-bearing visual move and it goes to the schematic.
- **Diagrams**: **hand-drafted inline SVG.** 5 diagrams to author for v3 launch — forge-pipeline (3-node chain), hesitation-fold (3-box + classifier node), atelier-12-tool-mcp (radial), ask-bc-hybrid-arch (Vercel + CF Worker + Durable Objects swim-lanes), photography-cf-pipeline (Supabase → R2 → Images → CF Pages). All in 1.5px violet/white stroke, JetBrains Mono labels, deterministic geometry, no decoration. Reason: AI image generation cannot produce schematic-diagram correctly because the constraint set is too narrow for statistical generation — and a brand whose thesis is *"I instrument my tools"* cannot ship statistical hero imagery without undermining itself.
- **Portraits**: **one head-on portrait on `/about`, optional.** Schematic-tile placeholder (`nc.` stamped-monogram in a violet-accent tile) until a real photograph is supplied. Reason: a portrait is a credibility-anchor for personal brand sites; the placeholder carries the surface until a final photo lands without blocking launch.
- **Photographic imagery on the main site**: **refused everywhere except `/about` portrait slot.** Reason: photographic content lives on the photography subdomain (`/photography`); duplicating it on the main site dilutes both surfaces. The link to `/photography` from `/about` is enough.
- **Decorative imagery, lifestyle photography, abstract art, stock graphics**: refused. The schematic is the only imagery register.

## 4. Motion budget

- **Static by default.** Reason: the signature is precise; entrance animations on page load fight the schematic register the same way they fight TNA's instrument-readout. Schematics rendered in still SVG read as authoritative; schematics that fade in read as marketing collateral.
- **Hover**: subtle. `lift (translateY(-2px))` + violet glow shadow on interactive cards (case-study cards on `/work`, toolchain readouts on `/practice`). 200ms cubic-bezier `(0.16, 1, 0.3, 1)`. No scale transforms.
- **Scroll-reveal**: only on credibility-readout-row on `/`. Stagger 80ms, fade-up 320ms. No other scroll-triggered motion anywhere.
- **Schematic animation**: refused at v3 launch. Diagrams are static SVG. Reason: an animated schematic implies a runtime system; a static schematic implies an engineered system. The latter is the claim.
- **Row-hover background** on toolchain readouts and case-study cards (subtle background-color shift only, no transform).
- **Reduce-motion fallback**: **required.** All transforms and transitions gated on `prefers-reduced-motion: no-preference`. Verify in Phase 5 audit.

## 5. Iconography

- **Style register**: **`schematic-mono-line`.** 1.5px stroke, no fill, no rounded ends, no decoration. Matches the schematic-diagram signature exactly. Reason: any other icon register would visually compete with the signature; uniform stroke + uniform register = the diagrams and the icons read as one drawing system.
- **Source**: **hand-drafted inline SVG.** Starter set (10 icons for v3 launch): `github`, `linkedin`, `external-link`, `arrow-right`, `check`, `x`, `info`, `code`, `terminal`, `file`. No icon libraries (Lucide / Heroicons / Phosphor) because they're filled-humanist or rounded-end and would fight the signature even with overrides.
- **Pills and inline marks**: `▸` (mono triangle) for list bullets in readouts; `·` (mono mid-dot) as separator in stamped-monogram. Both rendered as text, not SVG.

## Audit checks (pre-ship)

- [ ] **Signature appears on at least 4 pages.** Target: `/`, `/work`, every `/work/[slug]` (5 pages), `/practice`, `/about` (small inline). That's 9 pages — exceeds the threshold easily.
- [ ] **Every page uses 2–5 compositions.** Verify per page in the IA table above. Currently in range on every page (`/contact` and `/privacy` are at 2 and 1 respectively — `/privacy` is allowed to drop below as a legal-text page).
- [ ] **Imagery direction reinforces signature.** Verify no photographic or AI-generated images leak into main-site pages; verify `/about` portrait slot uses placeholder until a real photo is supplied.
- [ ] **Motion budget matches voice register.** Verify reduce-motion CSS wired; verify no entrance animations on page load except the credibility-readout-row stagger on `/`; verify no animated schematics.
- [ ] **Iconography subordinates to signature.** Verify all 10 icons in starter set follow 1.5px no-fill schematic-mono-line register; reject any Lucide/Heroicons/Phosphor leak.
- [ ] **Design system page exists at `/design-system`.** Every token, pattern, component, motion curve rendered live as the canonical visual reference. Renovate (Stage 4) implements every page against this page, not against the brief prose. *This is the load-bearing audit gate — without `/design-system`, the renovator produces drift.*
- [ ] **No bento, no lime, no Bebas Neue.** Verify in the final build that the violated `DESIGN.md` tokens (lime accent, Bebas display) do not appear anywhere; only violet accent + Inter + JetBrains Mono.

## Hero claim — finalist set

The three options I drafted in the synthesis:

| Option | Reads as |
|---|---|
| **A.** *"Context engineer. I instrument the systems that build the systems."* | Recursive, technical, distinctive |
| **B.** *"I codified how to ship software with agents. I run it in public."* | Direct, evidence-forward |
| **C.** *"Software shipped with agents — by someone who built the toolchain to make it repeatable."* | Concrete, less abstract |

**Recommendation: A.** Reason: it pairs cleanly with the schematic-diagram signature (the recursion "systems that build the systems" is literally what the forge-pipeline diagram shows). B and C describe what Nino did; A describes what Nino *is*. A is also the only option that contains a word ("instrument") doing visible work — that becomes the violet-emphasis italic word in the hero.

Lock or veto in Nino's review pass; everything else in this brief can proceed in parallel.

## Why this brief is not the design system

This brief is *prescription* — which signature, which compositions, which imagery, which motion, which icons — and *why*. The design system at `/design-system` (built in Stage 4 Renovate, audit-gated above) is *specification* — every token, every component, every motion curve rendered live in code so the renovator and Nino are looking at the same artifact. Prose alone is insufficient: two implementers reading this brief in prose produce two different visuals. Only rendered code at `/design-system` is unambiguous.
