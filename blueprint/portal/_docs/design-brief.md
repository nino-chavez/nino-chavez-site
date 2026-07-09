# 03 — Design Brief: the /ai enablement surface

Stage 3 (brownfield). Visual + IA direction for the prescribed changes
(`02-prescription.yml`), structured as the Triad's first two layers: this brief IS the
Architect output (bones: IA, archetypes, hard constraints) and the Manager output
(constraint contract + aesthetic brief). The Artist layer (production visuals) runs at
Stage 4 prototype and again at Tier-2 implementation, under the contract in §6. Every
section traces to prescription items and the two Stage 1 JTBDs.

**Design bar**: flagship. A practitioner and an evaluating client judge the whole
practice by this surface (goal doc § Mandate 2); its place in the architecture (a
site section) does not lower the bar. Voice guide loaded before this brief was
drafted; all copy work loads it again (§5).

---

## 1. Information architecture (Architect) — serves P1, P3; both JTBDs

### Route tree (after the rebuild)

```
/ai            Front door — the visitor's question, the map, two doors + proof strip
/ai/learn      Persona gateway — the PRIMARY surface (7-track diagnosis instrument)
/ai/learn/<track>  One TrackPage template × 7 (explorer|builder|architect|strategist|author|voice|enterprise)
/ai/work       Evidence surface — derived artifact registry (replaces /ai/build)
→ /blog        Writing lives at the blog; /ai links, never mirrors
```

Removed: `/ai/ask` (redirect → /ai, ADR-0003), `/ai/learn/corpus` (cut, P8),
`/ai/reference` (redirect → /ai/learn; its 3 architectures + 5 patterns fold into
tracks as worked patterns, P8), `/ai/build` (redirect → /ai/work, P5).

### Entry contract — the two-minute test (binds every layout decision)

Land on /ai → locate my craft (persona strip) → open my track → leave with a
self-serve action whose demonstrating artifact is one click deep. Every archetype
below must ship this path with zero dead ends; anything that does not serve it is
decoration and gets cut by default (personas cross-side rule: elements that only
prove, never teach, are out).

### Navigation integration (P1)

- Main-site nav gains "AI" (label decided at copy pass, not "Academy").
- Homepage: one entry card in the existing property-showcase pattern (`#labs`
  anchor grid) — same card anatomy as the other properties, not a special hero.
- Inside /ai: the section header carries Learn / Work + back-to-site; track pages
  breadcrumb to /ai/learn. No sub-nav item for cut routes.
- All pages indexed (noindex dropped), full meta/OG per page, SSR-rendered — the
  academy's CSR-only stub is a named anti-pattern (walkthroughs §5).

### Wireframe skeletons (mobile-first; desktop widens, never reorders)

```
/ai (front door)                      /ai/learn/<track> (TrackPage)
┌──────────────────────┐              ┌──────────────────────┐
│ site header + AI nav │              │ breadcrumb ← learn   │
├──────────────────────┤              ├──────────────────────┤
│ The question (H1):   │              │ Track hero: tagline, │
│ visitor-framed map   │              │ artifact, timeline   │
├──────────────────────┤              ├──────────────────────┤
│ Persona strip (7)    │──→ /learn    │ Grounding banner:    │
│ "which work is yours"│              │ shipped artifact +   │
├──────────────────────┤              │ honest verb + stamp  │
│ Proof strip: 3-4     │──→ /work     ├──────────────────────┤
│ derived artifact     │              │ Who this is for      │
│ cards (live stamps)  │              ├──────────────────────┤
├──────────────────────┤              │ Levels 0-4 accordion │
│ Latest writing (RSS) │──→ /blog     │ (normalized sections)│
└──────────────────────┘              ├──────────────────────┤
                                      │ Self-serve CTA       │
/ai/work: filterable ArtifactCard     └──────────────────────┘
grid from ONE derived array; each
card: what-it-is gloss, access label
(live|install|clone|read|gated),
pushedAt, last-verified, → track(s)
```

## 2. Page archetypes + component inventory (Architect) — serves P4, P5; craft JTBD

Four archetypes, closed set: **FrontDoor**, **TrackIndex**, **TrackPage** (×7 from
data), **WorkIndex**. Sibling wall #4 (rally-hq Foundation finding) applies: this
archetype contract is authored BEFORE per-track content; no page invents its own
layout.

Component inventory (semantic structure is Artist-locked):

| Component | Role | Data binding |
|---|---|---|
| `PersonaCard` | Diagnose-stage instrument on /ai and /ai/learn | `tracks` data file (taxonomy verbatim from old corpus, `old-corpus-inventory.md` §2) |
| `TrackPage` | The single template replacing 7 copy-pasted pages | normalized shape per `surface-audit.md` §b: header, whoFor, optional keyConcept/prereqs slot, `levels[].sections[]` with typed kinds (list/grid/keyval/cards/flow), CTA |
| `GroundingBanner` | Per-track "shown, not asserted" bar: the shipped artifact + honest verb | track→artifact map (P4); verbs: install / clone-and-read / read-and-copy / guided |
| `ArtifactCard` | Evidence unit on /ai/work + front-door proof strip | ONE derived array (GitHub API at build: description, pushedAt, README excerpt) + access label + last-verified stamp |
| `EvidenceLink` | Inline artifact reference inside track levels | same array by id — no free-floating URLs in prose |
| `VerifiedStamp` | Renders `verified:` date from data files; stale ⇒ CI fails before a visitor sees it | claim-lint data layer (P6) |
| `WritingStrip` | Latest AI-relevant essays | blog RSS at build (blog-corpus §4) |

Hard data rule (D5): **no content fact lives in markup.** Track content, stats,
links, model names, artifact metadata — all in typed data files; volatile facts
carry `verified:` dates; derived fields regenerate on scheduled builds. The seven
mailto CTA blocks are replaced by `TrackCTA` reading the same track data (P7).

Freshness is a UI feature, not just plumbing (P6): access labels never overpromise
(Ask BC renders "gated: BigCommerce merchants", Atelier "clone + run locally" —
`evidence-base-public.md` per-artifact reality), and a failed sensor fails the
build rather than rendering the claim.

## 3. Hard constraints — Architect-locked, Artist may not modify

- WCAG 2.1 AA: contrast ≥4.5:1 text / 3:1 UI, visible focus, keyboard-complete
  (accordion: Enter/Space/arrows), touch ≥44px, ARIA per component inventory,
  `prefers-reduced-motion` honored on every animation.
- SSR for all /ai routes; content readable with JS off (the evidence layer must be
  crawlable — both JTBDs enter via search/profile links).
- Performance: Lighthouse ≥90 mobile; the derived data is build-time, zero
  client-side API calls on landing; images lazy; no layout shift from stamps/labels.
- Semantic structure, ARIA, focus order, breakpoint reorder rules: locked as
  written in §1-2. Artist freedom is CSS, type, color-within-tokens, motion.

## 4. Aesthetic brief (Manager) — Creative Bold, Professional variant

**One system, not a microsite.** The old section shipped its own light-purple theme
(`ai-theme.css`: `#A100FF` gradient header, lavender page background) visually
severed from the site's dark identity (`tailwind.config.cjs`: `neutral-900` body,
`brand-dark #0a0a0f`, `brand-violet #8b5cf6`, Bebas Neue display over Inter). That
separateness is part of how the section orphaned. The rebuild **inherits the site
system**: dark ground, Bebas Neue for the question-headline moment, Inter for
everything readable, `brand-violet` as the single accent family. `ai-theme.css` is
retired with the old pages.

- **Vibe**: "the practitioner's workbench" — evidence-dense, quiet confidence,
  zero academy chrome. Reference points: Stripe docs restraint, Linear clarity,
  simonwillison.net's evidence-adjacency (graded Both — content authority).
- **Tracks differentiate by type and icon, not by seven accent colors.** One accent
  family; persona identity comes from the taxonomy's language (the verbatim
  taglines) and a per-track glyph. Seven-color systems read as course-catalog.
- **Stamps and labels are the signature visual element**: last-verified dates,
  access labels, pushedAt — set in a mono/metric face, visible but subordinate.
  They are the freshness architecture made legible, and the strongest quiet proof
  the surface maintains itself (goal doc § Freshness lane 3 positioning).
- **Anti-patterns (named, per Triad discipline)**: purple-gradient AI-slop washes
  (violet is an accent, never a wash), badge walls, stat tiles without a derivation
  path, certificate/level-completion chrome, multiple competing CTAs per page
  (one action per page rule), any "Live" badge not backed by a sensor.

## 5. Voice + copy contract (Manager) — binds every copy pass

Voice guide (`signal-dispatch-voice-guide.md`) loads before ANY prose drafting;
content modes per surface:

| Surface | Mode | Register notes |
|---|---|---|
| /ai front door | Thought Leadership (restrained) | The visitor's question leads; "the map I wish I had" framing survives from the old learn hero (judged already visitor-facing, `old-corpus-inventory.md` §2) |
| /ai/learn + tracks | Documentation | Instructional, imperative, copy-paste ready; level pedagogy keeps its concrete register |
| /ai/work | Solution Architecture | Precise, definitive; card copy is what-it-is + what-you-can-do, no adjectives |

Rules with teeth, from the guide:

1. **Concrete over coined** — highest-risk rule on a surface full of tool names.
   Every project name is glossed on first use ("Blueprint — a CLI that runs a
   product initiative end-to-end with an agent"); no unglossed inventories.
2. **Never fabricate** — no invented people, conversations, or artifacts. The
   Explorer track's fake version log is the standing violation (cut, P8); worked
   examples are real files in real repos or they don't ship.
3. **Show, don't assert** — a claim about AI application must sit next to its
   artifact (`GroundingBanner`/`EvidenceLink`), mirroring simonwillison-style
   evidence-adjacency (walkthroughs §1).
4. **Claim lint applies to prose** (P6): no model IDs, version numbers, counts, or
   vendor limits inline; they render from dated data files or not at all.
5. Persona taglines/descriptions port **verbatim** from the taxonomy first; edits
   go through a voice-guide-loaded copy pass, not ad-hoc rewording.

## 6. Artist-phase contract (deferred to Stage 4 / Tier 2)

The Artist receives: §1-2 structure (locked), §3 constraints (locked), §4 aesthetic
direction + site tokens as the starting palette, §5 copy as content. Artist must
explain type/color/motion choices against §4 and prove §3 in the QA loop
(axe/Playwright + contrast check + Lighthouse; prototype-smoke-runner at ship).
Motion: high-impact only at the diagnose moment (persona strip) and accordion
reveals; everything else static-fast.

## 7. Stage 4 decision — prototype justified: yes, scoped

The brief justifies a tangible artifact: the placement + integration argument
(ADR-0002) and the workbench aesthetic are exactly the kind of calls a
current-vs-proposed comparison de-risks. Stage 4 builds the **Review Portal
comparison for three pages only** — `/ai` front door, one TrackPage (builder:
richest current content), `/ai/work` — each with strategy + current-state drawers
(Stage 0 captures are the current-state assets). Not a full 13-page rebuild in the
portal; the portal is scaffolding, the SvelteKit implementation is the product.

## 8. Traceability

- P1/P3 → §1; P4 → §2 (TrackPage, GroundingBanner); P5 → §2 (ArtifactCard, one
  array); P6 → §2 stamps + §5 claim rules; P7 → §2 TrackCTA; P8 → §1 removals + §5
  rule 2; P2 → §1 removals + §4 sensor-backed-badge anti-pattern.
- craft-practitioner/ai-learn-builder/find-my-craft-persona-follow → §1 entry contract,
  §2 TrackPage/GroundingBanner, §5 Documentation mode.
- evaluating-client/ai-work/verify-the-ai-native-positioning-claim →
  §2 ArtifactCard/VerifiedStamp, §4 stamps-as-signature, §5 rule 3.
