# ADR-0010 — Position relative to harness engineering + adopt the forge framework

**Status:** Accepted
**Date:** 2026-05-25
**Deciders:** Nino Chavez

## Context

Three developments converged in late May 2026 that change how the v3 redesign should articulate Nino's positioning. Critical correction (added 2026-05-25 after reading the canon): **most of the structural framework is already published in Nino's May 24 canon.** The new work in this ADR is THREE LAYER ADDITIONS on top of that canon, not a from-scratch positioning shift.

### Already published in Nino's canon (May 24, 2026)

- **Whitepaper:** "Big Blueprint: A Production Line for Agent-Assisted Product Work" (`~/Workspace/dev/apps/blog/astro-build/src/content/whitepapers/big-blueprint-methodology.mdx`). Names: production line · chassis · composable tool chains (specchain → big-blueprint → forge-brand → forge-signal → gen-images) · compounding mechanism · "the artifacts the agent reads getting more precise."
- **Blog companion:** "The A/B Test That Built the Lathe" (`the-backport-i-didnt-make.mdx`). The metaphor anchor: Industrial Revolution = steam (LLM) + lathe (chassis); "the chassis is the lathe"; "the work that compounds is building the lathes"; closing call: "the engineers who win the next cycle are the ones who notice they're being asked to do lathe work and accept the assignment."
- **Related blog:** "The Scaffolding the Agent Doesn't Build." Anchors "scaffolding" as the work-around-the-LLM frame; cites Adam Bender's "directionless amplifier" thesis.

The structural argument — that the work that compounds is the scaffolding/chassis/lathe around the LLM, not the LLM itself — is published, dated, and load-bearing. This ADR does not re-litigate it.

### What's new since the May 24 publish date

1. **OpenAI's "harness engineering" framing surfaced publicly** via the AI Engineer Podcast (Lopopolo interview, late May 2026). The underlying piece published Feb 11 2026 but the wider conversation happened recently enough that the May 24 canon missed it. Lopopolo names a discipline — "humans steer, agents execute"; design environments + feedback loops + control systems; agent legibility as the goal; repository as system of record — that is functionally identical to Nino's chassis/lathe framing. **OpenAI is third-party validation of an argument Nino already made.**
2. **Brett Taylor (OpenAI chairman) commentary** on vendored dependencies — extended by Lopopolo to "couple-thousand-line dependencies in an afternoon." Strengthens the implicit chassis-vs-LLM economic argument with a specific empirical claim.
3. **Strategic conversation surfaced three new framings** that the canon does NOT yet contain: the forge as just-in-time/personal-software production unit; personal software / on-demand framing as customer-facing payoff; the buy-vs-build threshold thesis as an empirical claim about where the border between buy and build now sits.

The Stage 1 Research substrate (`research/synthesis.md`), the current positioning (ADR-0001: context engineer), the locked hero (ADR-0003: "Context engineer. I instrument the systems that build the systems."), the schematic-diagram signature (ADR-0004), AND the published canon above all predate the three new framings. This ADR captures how the redesign absorbs them WITHOUT re-litigating what's already published.

## Decision

Adopt a four-part framework that extends — does not replace — the existing positioning.

### 1. Position relative to OpenAI's "harness engineering" framing

**Keep "context engineer" as the headline noun** (per ADR-0001). Do NOT pivot wholesale to "harness engineer."

Reasons:
- Pivoting the noun three months after OpenAI publishes the term reads reactive, not coining. The corpus (229 Signal Dispatch posts + voice guide + earlier ADRs) is anchored on the existing label; the practice predates the OpenAI term by ~18 months.
- "Harness engineer" requires technical-peer audience to parse; "context engineer" parses for recruiters and hiring managers (the audience that matters for "hirable + known").
- Lineage is positioning. Erasing the prior label to chase the fresh one loses the receipts.

**Adopt harness/environment/feedback-loops/control-systems vocabulary one layer down** — in `/practice` section headers, content body copy, and ADR rationale.

Concrete vocabulary mapping for `/practice` sections (the 4-section structure from DESIGN-PRINCIPLES.md §Stage 4 stays; the headers + body text adopt the new vocabulary):

| Existing section | OpenAI-aligned vocabulary to surface |
|---|---|
| 01 — production line | Use "harness" + "forge" explicitly; cite the OpenAI piece's "design environments, specify intent, build feedback loops" framing as third-party validation |
| 02 — substrate | Map to "legibility infrastructure" + "agent legibility is the goal" |
| 03 — operating rules | Map to "invariants enforced, not implementations micromanaged" |
| 04 — instrumentation | Map to "feedback loops" + "control systems"; the hesitation fold IS a control system in the OpenAI sense |

**Cite the OpenAI piece explicitly in `/practice` as third-party confirmation that the discipline Nino has been codifying is what major labs are now publicly building toward.** The framing: "OpenAI named the discipline in February 2026. The forge production line + Hive + claude-recall-cli + ai-champions-kit predate the term by ~18 months; the corpus is older than the label."

### 2. The forge framework (layers on top of the published lathe/chassis canon)

**Important:** the published canon already uses lathe + chassis + industrial-revolution as the load-bearing metaphors. Do NOT replace them. The forge framework LAYERS ON TOP as the production-unit framing — what the lathe (chassis) PRODUCES, one bespoke instance at a time.

The integrated metaphor stack:

| Layer | Term | Source |
|---|---|---|
| Raw power | Steam engine = the LLM | Published canon (May 24) |
| The precision multiplier | Lathe = the chassis that turns raw power into consumable parts | Published canon (May 24) |
| The wider scaffolding system | Chassis | Published canon (May 24) |
| Industry term for the same scaffolding | Harness | OpenAI (Feb 11), surfaced via Lopopolo (May 2026) |
| The production unit (one bespoke item per use) | Forge | NEW |
| The customer-facing output category | Personal software / on-demand software | NEW |

**Forge framework specifics:**
- **Forge = the just-in-time / personal / on-demand / bespoke-per-instance unit of software production.**
- Distinguished from the **factory** (mass production, identical units, productization layer amortized across many customers).
- Pre-industrial craft register: smith + raw stock + heat + intention = one custom object per heat.
- Maps directly to Nino's existing forge family (`forge` umbrella PUBLIC, plus specchain, big-blueprint, forge-brand, forge-signal, image-gen as private lathes).
- Vocabulary reconciliation: in Nino's tool naming, "forge" is a family of lathes — the production line. In the new positioning layer, "forge" is also the metaphor for the production unit itself (smith's forge, not factory). Both readings are coherent: the forge family IS the production line that makes personal software possible.

**The thesis the AI industrial revolution actually represents:** not faster factories, but the **collapse of the factory's monopoly on cheap production**. Mass production was a specific solution to a specific constraint (humans expensive, machines fixed-tool, distribution slow). When the cost of production approaches zero and tooling becomes general-purpose, productization loses its advantage to instance-production.

The arc is `pre-industrial craft → industrial factory → personal forge (post-industrial craft, scaled)`. NOT `industrial factory → AI factory`. This extends the published canon's "lathe was the multiplier" framing by naming what gets MULTIPLIED — not factories at higher throughput, but the per-instance production unit.

**Do NOT add "3D printer" as a separate metaphor.** Reasons:
- Mixes industrial / post-industrial registers (the canon's industrial revolution + lathe is pre-industrial-to-industrial; 3D printer is post-industrial)
- Carries baggage ("was supposed to revolutionize manufacturing, mostly produces plastic trinkets")
- Diverges from the industry's chosen vocabulary (OpenAI says "harness," not "printer")
- The forge already does the work 3D printer would do AND fits Nino's existing brand vocabulary AND extends the canon coherently

### 3. The buy-vs-build threshold thesis (replaces "off-the-shelf indistinguishable" overclaim)

**Do not claim "v0 indistinguishable from off-the-shelf" wholesale.** Such absolute claims invite first-read rejection from readers who can name 20 categories where they're false.

**Adopt the threshold framing:**

> The border between buy-vs-build has moved up the stack. Below the border — utilities, glue, app-specific logic, internal tools — build now wins. Above the border — infrastructure, network-effect platforms, regulated categories — buy still wins. The forge keeps pushing the border up. Most things people USE are below the new border.

This is defensible because it (a) names the threshold, (b) acknowledges what doesn't get vendored, and (c) makes a specific empirical claim about where the threshold sits now and how it's moving.

Threshold-by-category for citation:

| Category | Build threshold today |
|---|---|
| Generic utilities (lodash, date-fns, p-limit) | Build wins — fully indistinguishable, often better |
| App-specific tools (Calendly, internal Slackbots, dashboards, trace visualizers) | Build wins for single-team use |
| Infrastructure (Postgres, Redis, K8s, Auth0, Vectorize) | Buy still wins — operational + scale + security cost too high |
| Network-effect platforms (Stripe, GitHub, AWS, edge CDNs) | Buy wins on the network effect; build wins on the API-surface part |

### 4. The economic-unit shift (the load-bearing claim under all of the above)

**The forge changes the economic unit of software from "product" to "instance."**

- **Off-the-shelf software** = one product, many instances. Build cost amortized across N customers. Productization layer (marketing, support, billing, compliance, packaging) is most of the cost.
- **Forge software** = one instance, one customer (often you). No amortization needed because there's no productization layer. The build cost competes only with use value, not with the cost of supporting N customers.

The SaaS economy keeps growing in dollars even as this thesis is true because the things people still buy (infrastructure, platforms, regulated) ARE expensive. But the COUNT of things people would have bought yesterday and forge today has exploded.

**Personal software is the customer-facing payoff:** single-user need + forge + harness = build-it-in-an-afternoon, dissolve it when done. The OpenAI piece's Next.js trace-visualizer example is the existence proof.

### 5. Positioning sentence (subhead under the locked hero)

The locked hero (ADR-0003) remains: **"Context engineer. I instrument the systems that build the systems."**

**Add as the lede sub-claim immediately under the hero:**

> "I build the harnesses that make personal software possible — and the threshold between buying and building moves up the stack every quarter."

The subhead does three jobs:
1. Names what's built (harnesses) and what it makes possible (personal software) — sharper than the abstract "instrument systems" claim alone
2. References the OpenAI-coined vocabulary without abandoning the locked hero
3. Sets up the buy-vs-build threshold thesis as a citable, defensible empirical claim

## Alternatives considered

| Alternative | Why rejected |
|---|---|
| Pivot the hero noun from "context engineer" to "harness engineer" | Three-month reactive timing; breaks 229-post corpus anchoring; loses 18-month lineage advantage; "harness engineer" requires more parse-effort from non-technical readers (recruiters, hiring managers) |
| Adopt 3D printer as the personal-software metaphor | Mixes industrial / post-industrial registers; carries failed-promise baggage; diverges from OpenAI's "harness" vocabulary; forge already covers the same conceptual ground while fitting Nino's existing brand |
| Claim "v0 indistinguishable from off-the-shelf solutions" outright | Overclaim — false for infrastructure + network-effect categories; invites first-read rejection; threshold framing is both more defensible and more specific |
| Keep assembly-line as the primary industrial-revolution metaphor | Mismatched — assembly lines produce identical units at scale; forges produce bespoke single-instance outputs; the metaphor undersells the actual claim |
| Write a separate ADR per concept (positioning vs forge vs threshold vs subhead) | Concepts are interdependent — separating them obscures the connective tissue. One ADR captures the framework; downstream ADRs only needed for new load-bearing decisions |

## Consequences

**Positive:**
- Strategic thinking is locked in writing; future sessions don't re-litigate
- The forge framework gives the site a defensible, specific metaphor that connects existing brand vocabulary (forge family) to industry-recognized framings (harness engineering, vendored dependencies, personal software)
- The threshold framing protects the positioning from first-read rejection by readers with deep SaaS experience
- The subhead under the locked hero extends without breaking corpus anchoring
- The OpenAI piece becomes citable third-party validation, not an unaddressed elephant in the room

**Negative / accepted trade-offs:**
- The subhead adds copy density to the hero region; the hero + subhead together must remain scannable in <5 seconds (verify in fact-check)
- The blog series + whitepaper drafts may contain the "off-the-shelf indistinguishable" overclaim and the assembly-line-primary framing; both need refinement before the site references them as primary sources (see Enforcement)
- The 4-section `/practice` vocabulary rewrite cascades to content/practice.md, the per-page strategy drawer in the blueprint portal, and the eventual rendered route

## Enforcement

1. **`/practice` copy must use harness + forge vocabulary in section headers + body**, not the older flat "toolchain / substrate / rules / instrumentation" framing alone. The 4-section structure stays; the language register shifts.
2. **The OpenAI piece must be cited in `/practice` body copy** with an explicit "Nino predates the term" framing — not as borrowed, but as confirmed.
3. **The blog series + whitepaper drafts must be reviewed against this ADR** before the v3 site references them as primary sources. If the "off-the-shelf indistinguishable" overclaim is present, refine to the threshold framing.
4. **The hero subhead is mandatory** on `/` and on `/about`; optional in mastheads and footers (where the locked hero alone suffices).
5. **The forge production line schematic (ADR-0004) becomes the load-bearing visual** for the whole positioning — it now carries the metaphor, not just the toolchain. The schematic must visually depict `forge` (umbrella, PUBLIC) feeding the 5 lathes, with the violet accent on the umbrella, not on a lathe.
6. **The DESIGN-PRINCIPLES.md Stage 4 fact-check table must add rows** for: OpenAI piece cited; blog series + whitepaper cited as primary sources; threshold claim stated specifically not absolutely.
7. **If a future session proposes pivoting to "harness engineer" as the hero noun**, link them to this ADR — the decision was considered and rejected for the reasons in Alternatives.

## References

### Primary sources

- **OpenAI: "Harness engineering: leveraging Codex in an agent-first world"** (Lopopolo, Feb 11 2026) — the term canonicalization
- **AI Engineer Podcast transcript: Lopopolo on Symphony + Frontier** (late May 2026) — wider public surfacing
- **Brett Taylor public commentary on vendored dependencies** — strengthens the chassis-vs-LLM economic argument

### Nino's published canon (predates the OpenAI piece's public surfacing by ~18 months on the WORK level)

- **`apps/blog/astro-build/src/content/whitepapers/big-blueprint-methodology.mdx`** (May 24 2026) — "Big Blueprint: A Production Line for Agent-Assisted Product Work." Names production line + chassis + composable tool chains + compounding mechanism.
- **`apps/blog/astro-build/src/content/blog/the-backport-i-didnt-make.mdx`** (May 24 2026, published as "The A/B Test That Built the Lathe") — the metaphor anchor: industrial revolution + steam (LLM) + lathe (chassis); load-bearing positioning claim ("the work that compounds is building the lathes").
- **`apps/blog/astro-build/src/content/blog/the-scaffolding-the-agent-doesnt-build.mdx`** (May 24 2026) — anchors "scaffolding" + cites Bender's "directionless amplifier" thesis.

### Methodology layer companion (parallel to this ADR)

- **`wip/big-blueprint/METHODOLOGY-v2-harness-engineering-patch.md`** (May 25 2026) — the methodology-level adoption of OpenAI harness primitives into BigBlueprint. Status: Increment 1 (Stage 0: Application Legibility) LANDED + validated on Rally HQ + website-nc-v3. Increments 2 (Ralph Wiggum Loop with 5 reviewer agents) + 3 (Map-not-manual + janitor + invariants) NOT STARTED.
- **`wip/big-blueprint/HANDOFF-v2-patch.md`** — operational handoff for v2 patch work
- **`wip/big-blueprint/docs/browser-legibility.md`** — canonical Stage 0 reference (browse-tool default + four-trigger MCP escalation rubric)

**Layer separation:** the v2 patch operates at the METHODOLOGY level (how BigBlueprint adopts harness primitives across all initiatives). This ADR operates at the POSITIONING level (how the v3 site articulates the practice). Both can co-exist because:
- The v2 patch's "Stage 0 Application Legibility" gives v3 blueprint the browser sensor it uses to validate the portal
- ADR-0010 references the v2 patch as the operational substrate that makes Nino's harness-engineering claim defensible — the v3 site claims "I build harnesses"; the v2 patch's Stage 0 recipe is one of those harnesses in action

### Cross-references within this blueprint

- ADR-0001 — positioning: context engineer (this ADR extends, does not supersede)
- ADR-0003 — locked hero claim (this ADR adds a subhead, does not supersede)
- ADR-0004 — schematic-diagram signature (reinforced; forge production line schematic becomes load-bearing)
- ADR-0009 — cluster surfacing pattern (unchanged; copy within cluster sections adopts new vocabulary)
- `research/synthesis.md` — Stage 1 Research substrate

### Pending v2 patch dependencies that affect v3 future work

When v2 patch Increment 2 lands (Ralph Wiggum Loop with 5 reviewer agents), the v3 blueprint's Stage 4 fact-check table in DESIGN-PRINCIPLES.md should migrate from manual rows to agent-validated rows. The 5 reviewers map cleanly to v3 needs: `citation-checker` validates OpenAI + canon citations; `current-state-claim-verifier` validates v2 screenshots; `doc-quality-auditor` audits content drafts; `terminology-linter` catches overclaims (per ADR-0010 §3 buy-vs-build threshold guardrail); `prototype-smoke-runner` runs the Stage 0 browse-tool recipe.

When v2 patch Increment 3 lands (Map-not-manual restructure), the v3 blueprint directory structure may need to migrate to the ~100-line AGENTS.md + structured docs/ tree pattern. Current flat structure (01-diagnose / 02-prescription / 03-design-brief at root) is the legacy three-stage variant; if Increment 3 lands, plan a coordinated migration.
