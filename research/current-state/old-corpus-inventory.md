# Old /ai Corpus Inventory

Stage 1 research register. Source: `src/routes/ai/**` (13 pages + 2 layouts, 6,454 lines
incl. layouts). Every claim cites `file:line`. Verdicts (Mine / Rebuild / Cut) carry a
"because" reason. Audit date 2026-07-08; corpus frozen Dec 2025 / Jan 2026.

Path convention: files below are relative to `src/routes/ai/`. Line numbers are of the
file named in the heading unless a full path is given.

## Corpus-wide facts

- All 13 pages carry `<meta name="robots" content="noindex, nofollow" />` (verified: 13
  matches). Section is invisible to search and unlinked from the main site.
- Every page imports the shared theme `$lib/styles/ai-theme.css` via one of two layouts
  (`+layout.svelte:5`, `ask/+layout.svelte:5`); it supplies `--ai-*` CSS vars, `.ai-card`,
  `.ai-badge-*`. This is the ONLY shared code. Every learn track is a standalone copy —
  no shared Svelte component (grep for `$lib` component imports across `/ai` returns only
  `ask/+page.svelte:2` importing `Chat.svelte`).
- Naming leak: the layout nav labels the chat "Ask Dad" (`+layout.svelte:12`) while the
  front door labels it "Ask / Talk to Virtual Nino" (`+page.svelte:44-45`). The private
  family persona is hardcoded — `src/lib/server/askdad/system-prompt.ts:20`: "**You're
  talking to Zoey, Nino's 19-year-old daughter.**"
- Every learn-track CTA is a `mailto:nino@ninochavez.co` "email me your homework" link
  (Builder :781, Enterprise :650, Explorer :617, Architect :629, Strategist :617,
  Author :602, Voice :618). Implies a review service that the initiative doc says is not
  operated (AI-INITIATIVE-GOAL.md § Out of scope).

---

## 1. `/ai` — Front door (`+page.svelte`, 206 lines)

**Purpose.** Hub landing. H1 "Working with AI" (:75); subhead frames it as Nino's
documentation of "what I've learned, what I've built, and what patterns have emerged"
(:82-83) — owner-centric, not visitor-centric.

**Core claims / counts (all in the `pathways` array :7-52).**
- Learn: "7 self-directed tracks from Explorer to Enterprise" — stat badge "7 tracks",
  detail "4-20 weeks each" (:12-17).
- Build: "Real applications: RAG chatbots, interactive learning systems, agentic
  workflows." — stat "2 projects" (:23-27).
- Reference: stat "**70+ terms**" (:38). FALSE/inflated — the reference page holds 25
  glossary terms + 3 architectures + 5 patterns = 33 items (reference `+page.svelte`).
- Ask: badge "**Live**" (:49), "RAG-powered chatbot grounded in my actual writing"
  (:45). Dead in prod (appendix finding 1).

**CTAs.** Four cards → `/ai/learn`, `/ai/build`, `/ai/reference`, `/ai/ask` (:14,22,33,45).
Footer: "Main Portfolio" → `/` (:191), "Read my writing" → `/blog` (:198, already fixed
from dead signaldispatch.co).

**Verdicts.**
- Hero framing (:75-83) — **Cut** because it is owner's-diary voice ("what I've learned");
  the goal reframes the front door as the visitor's question.
- 4-card pathway grid (:98-148) — **Rebuild** because the IA collapses to Learn/Work/Blog
  per the prescription; card-grid pattern is reusable but Build+Reference+Ask fold in.
- "70+ terms" / "2 projects" / "Live" stats (:38,27,49) — **Cut** because all three are
  wrong or unverifiable; replace with derived counts.
- "The approach" philosophy block (:160-177) — **Mine** because the "everything here comes
  from actual projects… code that shipped" claim (:163) is the correct thesis, but must be
  backed by links, not asserted.

---

## 2. `/ai/learn` — Persona gateway (`+page.svelte`, 336 lines)

**Purpose.** The persona on-ramp; the primary surface per the prescription. H1 "Learn to
Ship with AI" (:115), subhead "The map I wish I had when I started" (:123).

**The 7-persona taxonomy — `tracks` array (:7-92), definitions verbatim.** The taxonomy is
judged sound and will be kept; per-track anatomy is in §§4-10 below.

| id | title | tagline (verbatim) | artifact (verbatim) | timeline |
|---|---|---|---|---|
| explorer | Explorer | "Use AI to understand yourself" | "Personal cognitive mirror + bridge to creation" | 4-8 weeks |
| builder | Builder | "Build production apps with AI" | "Deployed production application" | 8-12 weeks |
| architect | Architect | "Design systems, write arc42 docs" | "Complete arc42 solution architecture" | 8-12 weeks |
| strategist | Strategist | "Write consulting-grade docs" | "Executive-ready strategic brief" | 6-10 weeks |
| author | Author | "Create multi-chapter reference works" | "Multi-volume playbook (20,000+ words)" | 12-20 weeks |
| voice | Voice | "Define consistent voice at scale" | "Complete voice system with validation" | 6-10 weeks |
| enterprise | Enterprise | "Scale AI work across teams" | "Reusable skill with quality gates" | 10-16 weeks |

Verbatim descriptions (`tracks[].description`):
- Explorer (:14): "Before you use AI to produce, use it to reflect. Build cognitive
  mirrors that show you how you think."
- Builder (:26): "From \"I've never used AI to code\" to shipping production systems with
  observability and governance."
- Architect (:38): "Create documentation someone could build from—without asking you
  questions. arc42, C4 diagrams, ADRs."
- Strategist (:50): "External advisor voice. Pattern recognition across clients and
  industries. Recommendations grounded in observation."
- Author (:60): "Not blog posts. Playbooks. Frameworks. The kind of document that becomes
  organizational IP."
- Voice (:72): "Analyze your writing, document patterns, build validation systems that
  enforce consistency across thousands of words."
- Enterprise (:84): "Encode workflows into reusable skills, multi-format exports, quality
  rubrics, and governance frameworks."

All 7 carry `ready: true` and `levels: 5`. NOTE inconsistency: the array labels every track
`levels: 5`, but each track page defines a `levels` array of 5 entries indexed **0-4** (§§4-10) —
i.e. levels 0,1,2,3,4. So "5 levels" is honest count, "Level 5" never exists.

**Other content blocks.**
- "This path is NOT for you if / IS for you if" filter (:145-181): "want a curriculum to
  passively consume" / "collecting credentials for LinkedIn" vs "learn by building" /
  "want real projects" (:152-176).
- "The Filter" (:261-270): "Show me what you've shipped. Not what you've read… That's how
  I learned. That's how you will too." — the evidence-standard thesis, verbatim :264-269.
- CTA (:297-316): "Start Exploring" → `/ai/learn/explorer`, "Start Building" →
  `/ai/learn/builder`. Footer "Read my writing" → `/blog` (:328-333).

**Verdicts.**
- 7-persona `tracks` array (:7-92) — **Mine** because the taxonomy is the product's spine
  and is judged sound; port the id/title/tagline/artifact/timeline fields to one data file.
- "The map I wish I had" hero (:115-131) — **Mine** because it is already visitor-facing
  ("for practitioners who want to work with AI"), unlike the /ai front door.
- NOT-for-you / IS-for-you filter (:145-181) — **Rebuild** because the "no passive
  curriculum / no LinkedIn credentials" gatekeeping suits the pilot, but the negative
  framing needs softening toward "find your track."
- "The Filter — show me what you've shipped" (:261-270) — **Mine** because it IS the
  evidence standard; the goal keeps it as substrate, demoted from headline.
- Card grid pattern (:197-249) — **Rebuild** into the single data-driven track template.

---

## 3. `/ai/build` — Shipped projects (`+page.svelte`, 290 lines)

**Purpose.** "What I've Built" (:88): "Real systems, shipped to production. Not demos"
(:96). Accordion of 2 projects (`projects` array :8-62).

**Core claims + brokenness.**
- Ask Dad (:9-35): status "Live" (:15); stack "Claude, Supabase pgvector, SvelteKit,
  OpenAI Embeddings, **Vercel**" (:16). Deploy claim wrong — site is Cloudflare Pages
  (appendix finding 5). RAG pipeline flow Query→Embed→Search→Context→Generate (:19-25)
  is accurate to the real architecture. Link "Try It" → `/ai/ask` (:33-34).
- Code to Cognition (:36-61): status "Live" (:41); "11 slides… 30-day learning path"
  (:40); claims "**603 agents mapped across 10 domains**", "<3s load time" (:54-56).
  Link "View Live" → `/code-to-cognition` (:59) — **404s, route absent from repo**
  (appendix finding 3); real home labs.ninochavez.co has expired cert.
- "On building with AI" (:248-256): "These aren't weekend projects… The architectures
  reflect what survived." CTA → `/ai/learn/builder` (:267-268).

**Verdicts.**
- Ask Dad card (:9-35) — **Rebuild** because the project is real and the RAG flow is a
  legit worked example, but the "Vercel" deploy claim and "Live" badge must be corrected
  and the demo relaunched-or-killed first.
- Code to Cognition card (:36-61) — **Cut** because the link 404s, the artifact is gone
  from the repo, and the "603 agents / <3s" stats are unverifiable.
- "603 agents mapped across 10 domains" (:55) — **Cut** because unsourced and unverifiable.
- Two-project inventory as a whole — **Rebuild** because the real evidence base is ~12 live
  artifacts (AI-INITIATIVE-GOAL.md § Missing), none of which appear here; `/ai/work`
  replaces this with a GitHub-derived array.

---

## 4. `/ai/learn/explorer` (`+page.svelte`, 661 lines)

**Persona (verbatim).** Hero H1 "Use AI to Understand Yourself" (:181), subhead: "Before
you use AI to produce, use it to reflect. Build prompts that show you how you think—not
prompts that think for you." (:189). "This is for you if" (:221-237): "curious about AI
but don't have a specific project"; "want to understand how you think, not just get
answers"; "forming your mind with AI, not adding AI to a formed mind"; "journal, reflect,
or want to start". Key concept "The Cognitive Mirror" (:274-286).

**Level structure (`levels` array :8-141, indices 0-4).** 0 Notice Your Prompts (:9) ·
1 Build Your First Mirror (:36) · 2 Iterate and Version (:63) · 3 Multiple Modes (:90) ·
4 From Reflection to Creation (:116). Each level = goal + checkpoint + field-specific
sub-lists (exercises, patterns, components, antiPatterns, modes, bridges).

**ASSERTED vs SHOWN.** Entirely ASSERTED. The "AI application" is generic prompt-craft
advice (mirror-prompt components :41-47; anti-patterns "no therapy speak" :48-54; a fake
version log :75-80). No Nino artifact shown or linked. Bridges (:122-127) cross-link to
Voice/Builder/Strategist/Author tracks — internal, not evidence.

**Verdicts.**
- Persona definition + "cognitive mirror" concept (:181-286) — **Mine** because it is the
  strongest "apply AI to your own thinking" on-ramp and needs no product to be true.
- Level 0-4 pedagogy (:8-141) — **Rebuild** because the prompt-craft is sound but must
  point to a real, copyable artifact (the goal doc pairs Explorer with nothing shipped —
  candidate: claude-recall-cli / a published mirror prompt).
- Fabricated example version log (:75-80) — **Cut** because it is illustrative fiction, not
  a real changelog; violates the "show, don't assert" standard.

---

## 5. `/ai/learn/builder` (`+page.svelte`, 825 lines — largest)

**Persona (verbatim).** Hero H1 "Learning to Build Production AI Systems" (:273), subhead
"From \"I've never used AI to code\" to \"I ship production systems with observability and
governance.\"" (:281). "This is for you if" (:313-330): "a developer who wants to ship
AI-powered software"; "learn by building, not by watching tutorials"; "want production-ready
code, not demo projects"; "comfortable with JavaScript/TypeScript and web development".

**Level structure (`levels` :8-232, indices 0-4).** 0 Orientation (:13) · 1 Ship Your First
AI App (:33) · 2 Specs, Databases & Workflows (:60) · 3 Multiple Models & Tool Use (:109) ·
4 Production Systems & Observability (:183).

**ASSERTED vs SHOWN — this + Enterprise are where concrete mechanics concentrate.** Named,
specific mechanics (curriculum-grade, but not demonstrated via Nino's code):
- Tools with URLs: Claude Code (:40), Cursor `cursor.sh` (:41, stale → cursor.com),
  Vercel AI SDK `sdk.vercel.ai` (:18,125, stale → ai-sdk.dev), LangChain (:126),
  Supabase Vector (:154), Langfuse/LangSmith (:200-201), OpenAI embeddings (:156).
- Agentic patterns enumerated (:131): Reflection, Tool Use, Planning, Multi-Agent, MCP,
  with MCP link modelcontextprotocol.io (:133).
- Commerce orchestration examples (:137-148): "Agentic Product Feed", "Search Query
  Orchestration", "Data Quality Agent" — concrete pipelines, but described not shown.
- Recommended stack (:94-100): Next.js/SvelteKit, Supabase, Tailwind, TS strict, Playwright.
- BROKEN link: "Anthropic Safety Guide" → prompt-caching URL (:212), appendix finding 7.

Still ASSERTED overall: every mechanic is a reading/curriculum item; nothing links to
Nino's shipped Builder artifact (Atelier / Ask BC / specchain per the goal doc).

**Verdicts.**
- Level 0-4 spine (:8-232) — **Mine** because it is the most concrete track and its
  progression (ship → spec → tools → observability) is the correct Builder arc.
- Tool/URL lists (:17-18,40-41,124-156,200-212) — **Rebuild** because the pattern is right
  but the URLs are stale and must move to a sensed data file (link-checked, dated).
- Commerce orchestration examples (:137-148, also Architect :129-133) — **Rebuild** into
  linked case studies; genericized-from-client-work is Nino's real material.
- mailto "Email Me Your Build" CTA (:781-785) — **Cut** because self-serve replaces it.

---

## 6. `/ai/learn/architect` (`+page.svelte`, 673 lines)

**Persona (verbatim).** Hero H1 "Design Systems. Write Implementation-Ready Docs." (:182),
subhead "Most architecture diagrams are lies. This track teaches you to create
documentation someone could build from—without asking you clarifying questions." (:190).
"This is for you if" (:222-238): "a tech lead or senior engineer who documents systems";
"built systems but struggled to communicate their design"; "want documentation that
developers actually use"; "tired of explaining the same architecture decisions repeatedly".
Key concept "The Voice Shift" — exploratory vs definitive voice (:306-318).

**Level structure (`levels` :8-142, indices 0-4).** 0 Learn the Templates (:9) · 1 Document
an Existing System (:34) · 2 Capture Decisions as You Make Them (:62) · 3 Complete arc42
Document (:87) · 4 Cross-System Integration Docs (:115).

**ASSERTED vs SHOWN.** Mechanics are real and specific (arc42 12 sections :94-107; C4;
ADR workflow :69-72; tools Excalidraw/D2/Mermaid :50-54; reading arc42.org/c4model.com/
adr.github.io :17-19; commerce integration examples :129-133) but no Nino artifact shown.
Direct tie to the goal doc: Architect → Blueprint's doc pipeline (blueprint.ninochavez.co)
— the shipped artifact exists but is NOT linked here.

**Verdicts.**
- arc42 / C4 / ADR spine (:8-142) — **Mine** because the method is exactly what Blueprint
  ships; this is the track with the strongest available evidence to bind.
- "The Voice Shift" concept (:306-318) — **Mine** because it maps to the real content-mode
  taxonomy (Solution Architecture vs Thought Leadership) in Nino's voice guide.
- Reference links (:17-19) — **Rebuild** into dated/sensed data (external doc URLs drift).
- mailto CTA (:629) — **Cut**; bind the capstone to a public Blueprint arc42 example instead.

---

## 7. `/ai/learn/strategist` (`+page.svelte`, 661 lines)

**Persona (verbatim).** Hero H1 "Write Consulting-Grade Strategic Docs" (:173), subhead
"Most strategy documents bury the recommendation on page 12. This track teaches you to
write like a consultant—lead with the answer, back it up, get decisions made." (:181).
"This is for you if" (:213-230): "advise clients or stakeholders on strategy"; "write for
executives who need to make decisions"; "want to communicate recommendations clearly and
persuasively"; "come from consulting, advisory, or leadership roles". Key concept "The
Consultant Voice" (:297-309).

**Level structure (`levels` :8-133, indices 0-4).** 0 Learn the Consultant Voice (:9) ·
1 Write Your First POV (:35) · 2 Cross-Domain Pattern Recognition (:58) · 3 Strategic Briefs
with Options (:81) · 4 Executive Communication (:108).

**ASSERTED vs SHOWN.** Entirely ASSERTED, and NO AI mechanics at all — this is writing
pedagogy (BLUF, pyramid principle :114-118, POV/brief structures). No tool, no AI-specific
step, no shown artifact. The goal doc ties Strategist → forge-signal + Blueprint doc
generation, unlinked here.

**Verdicts.**
- Consultant-voice pedagogy (:8-133, 297-309) — **Rebuild** because it is sound but
  AI-absent; a rebuild must show where AI does the drafting (forge-signal) or the track
  fails the "show the AI application" test hardest.
- POV/brief templates (:40-46,87-93) — **Mine** as reusable content shapes, but only if
  bound to a real generated example.
- mailto CTA (:617) — **Cut**.

---

## 8. `/ai/learn/author` (`+page.svelte`, 646 lines)

**Persona (verbatim).** Hero H1 "Create Multi-Chapter Reference Works" (:169), subhead
"Not blog posts. Playbooks. The kind of document that becomes organizational IP—something
people reference for years, not days." (:177). "This is for you if" (:209-225): "deep
expertise you want to codify into a reference"; "building playbooks, guides, or manuals for
organizations"; "want repeatable frameworks others can use without you"; "comfortable with
long-form writing (20,000+ words)". Key concept "Playbook vs Blog Post" (:293-305).

**Level structure (`levels` :8-129, indices 0-4).** 0 Design Playbook Architecture (:9) ·
1 Master a Single Chapter (:35) · 2 Maintain Voice Across Chapters (:60) · 3 Build Reference
Appendices (:85) · 4 Create Client-Agnostic Frameworks (:105).

**ASSERTED vs SHOWN.** Entirely ASSERTED. Mechanics are doc-structure templates (4-volume
:15-20; chapter sections :40-47; variable substitution `{{client.name}}` :112; config files
style-guide.json :115). No shown artifact. Overlaps heavily with Architect (both are
"AI writes long structured docs") and Enterprise (both invoke config/rubric files).

**Verdicts.**
- Playbook architecture pedagogy (:8-129) — **Rebuild** because it is real Blueprint-adjacent
  material but overlaps Architect/Enterprise; candidate for merge, not standalone survival.
- Variable-substitution / config-file mechanics (:111-116) — **Mine** into Enterprise, where
  the same "reusable skill with config" idea is concrete and demonstrable.
- mailto CTA (:602) — **Cut**.

---

## 9. `/ai/learn/voice` (`+page.svelte`, 662 lines)

**Persona (verbatim).** Hero H1 "Define and Maintain Voice at Scale" (:174), subhead
"\"Be conversational\" isn't a voice guide. This track teaches you to document voice
precisely enough that AI can replicate it—and validate when it drifts." (:182). "This is
for you if" (:215-231): "produce content regularly and want consistent voice"; "want AI to
sound like you, not like generic AI"; "a blogger, writer, or thought leader with an
audience"; "write for different contexts (blog vs docs vs email)". Key concept "Why Voice
Guides Fail" — vague vs specific (:298-310).

**Level structure (`levels` :8-134, indices 0-4).** 0 Analyze Your Own Writing (:9) ·
1 Write Your First Voice Guide (:35) · 2 Create Multiple Voice Profiles (:59) · 3 Build
Automated Validation (:84) · 4 Orchestrate Multi-Voice Systems (:108).

**ASSERTED vs SHOWN.** Mostly ASSERTED, but the closest to a real Nino artifact: Level 3
validation approaches (word lists, pattern matching, LLM scoring, comparative analysis
:89-93) and drift detection (:118) describe exactly the practice behind Nino's own voice
guide + corpus/recall (AI-INITIATIVE-GOAL.md ties Voice → voice-guide + corpus/recall).
That artifact is NOT linked. So the highest-evidence track under-delivers on proof.

**Verdicts.**
- Voice-guide-as-spec pedagogy (:8-134, 298-310) — **Mine** because it is directly backed
  by the canonical `signal-dispatch-voice-guide.md` + claude-recall-cli, the strongest
  possible worked example.
- Validation/drift mechanics (:84-133) — **Rebuild** to link the actual voice-auditor /
  recall tooling as the shown artifact.
- mailto CTA (:618) — **Cut**.

---

## 10. `/ai/learn/enterprise` (`+page.svelte`, 694 lines)

**Persona (verbatim).** Hero H1 "Scale AI Work Across Teams" (:183), subhead "One skill,
used well, beats ten prompts. This track teaches you to extract patterns into reusable
skills, add quality gates, and deploy across teams." (:191). "This is for you if"
(:223-240): "scaling AI workflows across a team or organization"; "need reusable, governed
AI capabilities (not one-off prompts)"; "a team lead or manager responsible for AI
adoption"; "completed at least one other track". Key concept "Skills vs Prompts" (:307-328).

**Level structure (`levels` :8-143, indices 0-4).** 0 Identify Reusable Patterns (:9) ·
1 Build Your First Skill (:36) · 2 Add Multi-Format Export (:59) · 3 Implement Quality Gates
(:84) · 4 Deploy Team-Wide (:110).

**ASSERTED vs SHOWN — 2nd concentration of concrete mechanics.** The most specific track:
- Claude Skill anatomy (:41-46): `SKILL.md` w/ YAML frontmatter, `scripts/`, `references/`,
  `assets/`.
- Hard spec limits stated as fact WITH NO SOURCE (:48-52): "Name under 64 characters",
  "Description under 200 characters", "SKILL.md under 5,000 words" — appendix flags this
  ("Enterprise track states Claude Skills spec limits as fixed facts with no source").
- Multi-format export incl. `html2pptx` (:125); quality rubric 5 dimensions (:90-96);
  governance components (:116-122).
- Skill examples (:123-128) that ARE Nino's real skills, described as text not linked:
  "Solution Architecture" (arc42+C4), "Strategic Deck" (html2pptx), "Governance Playbook",
  "Voice Auditor" ("References: 550-line voice guide").

Still ASSERTED: the four skill examples describe real assets but none is a link or repo.

**Verdicts.**
- Skill-extraction spine + "Skills vs Prompts" (:8-143, 307-328) — **Mine** because it is
  concrete and maps to ai-champions-kit (the goal doc's Enterprise evidence).
- Unsourced spec limits (:48-52) — **Rebuild** into a dated/sensed data file (these are
  volatile vendor facts; the freshness architecture forbids them in prose).
- Skill examples (:123-128) — **Mine** as the seed for real linked case studies (Voice
  Auditor, Strategic Deck exist in Nino's toolchain).
- mailto CTA (:650) — **Cut**.

---

## 11. `/ai/learn/corpus` — Stub (`+page.svelte`, 69 lines)

**Purpose.** "Corpus Browser" — a "Coming Soon" placeholder (:32) live for ~7 months.

**Claimed statistics (the `<meta>` + stat grid).** meta description "Browse **882,786
words** of AI-assisted work across 6 client projects" (:14). Stat tiles (:38-54):
- **882,786** Total words (:40-41)
- **6** Client projects (:44-45)
- **5** Reusable skills (:48-49)
- **40+** Architecture diagrams (:52-53)

These are unverifiable and internally inconsistent with the learn page's own counts
(appendix: "unverifiable precision… inconsistent with the learn page's own counts"). The
"5 reusable skills" here vs Enterprise's four named skill examples (:123-128), and "6
client projects" appears nowhere else.

**CTA.** Single "Explore Tracks" → `/ai/learn` (:57-58).

**Verdict.**
- Entire page — **Cut** because it is a 7-month "Coming Soon" fronted by four unverifiable
  precise statistics; the prescription explicitly cuts it (AI-INITIATIVE-GOAL.md § Prescription 5).

---

## 12. `/ai/reference` — Glossary + patterns (`+page.svelte`, 485 lines)

**Purpose.** "Reference — Patterns, architectures, and terminology. Genericized from real
client work." (:225-233). Three tabs (:10-14): Glossary, Architectures, Patterns.

**Glossary — 25 terms in 5 categories (`glossary` array :25-60).**
- Protocols (3): MCP (:27), Tool Calling (:28), Human-in-the-Loop (:29).
- Orchestration (6): ReAct (:32), Reflection (:33), Planning Pattern (:34), Multi-Agent
  System (:35), Guardrails (:36), Context Engine (:37).
- Fundamentals (8): LLM (:40), RAG (:41), Embedding (:42), Hallucination (:43),
  Groundedness (:44), Fine-Tuning (:45), Temperature (:46), Token (:47).
- Data (4): Vector Database (:50), kNN (:51), Feature Store (:52), Observability (:53).
- Visibility (5→actually 4): GEO (:56), AEO (:57), Citation Share (:58), E-E-A-T (:59).

STALE content: LLM def cites "GPT-4, Claude 3, and Gemini are all LLMs" as current
exemplars (:40) — appendix finding 6 (stale models). Each term has definition + a
commerce-flavored example (heavily retail/shopping-agent framed).

**Architectures (3, `architectures` array :62-100).** Conversational RAG (:63), C4 Model
Progressive Disclosure (:77), Agentic Workflow (:89) — each with layers + use cases.

**Patterns (5, `patterns` array :102-143).** ReAct (:104), Basic RAG (:112), Reflection
(:120), Human-in-the-Loop (:128), Tool Use (:136) — each with flow / when / avoid.

Note: front door claims "70+ terms" (`+page.svelte:38`); actual = 25 glossary + 3 arch +
5 patterns = 33.

**Verdicts.**
- 25-term glossary (:25-60) — **Cut** because the prescription cuts the glossary (§ Prescription 5),
  the counts are misstated by the front door, and the commerce-agent framing is off-thesis for
  the craft-practitioner pilot; salvage only if a term is load-bearing for a track.
- Stale model exemplars "GPT-4, Claude 3" (:40) — **Cut** because volatile facts are
  forbidden in prose by the freshness architecture.
- 3 architectures + 5 patterns (:62-143) — **Rebuild** because RAG/ReAct/Reflection/HITL/
  Tool-Use ARE the reusable substance, but belong inside the tracks as worked patterns, not
  a standalone reference tab.

---

## 13. `/ai/ask` — Chatbot (`+page.svelte` 56 + `+layout.svelte` 28)

**Purpose.** Full-screen chat, "Ask Dad - Virtual Nino" (:6). Renders
`$lib/components/askdad/Chat.svelte` (:2,19). Own layout overrides parent nav for a clean
chat surface (`ask/+layout.svelte:1-2`).

**Core facts / brokenness.**
- meta title "Ask Dad" (:6) but public framing is "Virtual Nino" (:7) — the private/public
  naming leak. Backend persona hardcoded to Zoey (`src/lib/server/askdad/system-prompt.ts:20`).
- Dead in prod: `/api/ask/chat` 404 (appendix finding 1; root cause was the router Worker,
  now fixed at the origin, but the demo still needs relaunch validation).
- Chat pins model `claude-sonnet-4-20250514` (`src/routes/api/ask/chat/+server.ts:129`,
  appendix finding 6).
- Only CTA: back link → `/ai` (:12).

**Verdicts.**
- Ask surface (:1-56) — **Rebuild-or-Cut** (relaunch-or-kill, AI-INITIATIVE-GOAL.md
  § Prescription 4): survives only with a public non-Zoey persona prompt, a current pinned
  model in a data file, and verified live routes; else cut. The family version stays private.
- "Ask Dad" naming (:6) — **Cut** because it leaks the private family artifact onto a public
  surface.
