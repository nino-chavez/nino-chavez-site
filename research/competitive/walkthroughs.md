# Competitive walkthroughs — five references, walked as the pilot

Stage 1 research register. Brownfield initiative: rebuild ninochavez.co/ai into an
evidence-backed enablement surface.

**Pilot (locked in blueprint.yml `pilot_profile`):** a craft practitioner who knows AI
matters for their work but bounces off tool-first tutorials. Needs: personas to locate
themselves, a path grounded in someone's real demonstrated practice, tools they can pick
up self-serve, and shipped evidence one click deep.

**The pilot's four questions, asked at every reference:**
1. How do I locate myself — persona/diagnosis, or a tool list I have to translate?
2. What path do I get for MY craft?
3. Where's the evidence the author's practice is real?
4. What's the concrete next action, and is it self-serve?

All URLs accessed 2026-07-08.

---

## 1. simonwillison.net — the practitioner-diary genre

URLs: https://simonwillison.net/ , https://simonwillison.net/guides/ (accessed 2026-07-08)

**Locate myself:** I can't. The front door is a reverse-chronological weblog (posts July
2026 backward). No "start here," no persona split, no role diagnosis. Wayfinding is
tag-driven — `coding-agents`, `ai-assisted-programming`, `agentic-engineering`,
`llm-tool-use`, `prompt-engineering` — plus a significance-ordered "Highlights." I locate
myself by already knowing the tag name for what I want, which a newcomer doesn't.

**Path for my craft:** None as a sequence. I browse or follow a tag and assemble my own
order. The one exception is `/guides/`, which holds a single structured artifact —
"Agentic Engineering Patterns," a 16-chapter progression from "What is agentic
engineering?" through testing/version-control to building tools. That guide is the closest
thing to a path, and it's buried behind a nav label most visitors never click.

**Evidence the practice is real:** Strongest of the five. The diary sits adjacent to a
constant stream of shipped tools — `sqlite-utils`, `shot-scraper`, `llm` CLI, `datasette`,
`tools.simonwillison.net/*` — each with GitHub links, release notes, usage examples. Every
claim is one scroll from a runnable artifact. Author authority is independently established
(Django co-creator; widely cited in mainstream and trade press on LLMs).

**Next action, self-serve?** Self-serve but unscaffolded: read the post, clone the repo,
subscribe to the sponsors newsletter for structured briefings. No "given your craft, do
this next."

- **Steal:** evidence-adjacency — every assertion sits next to a linkable, runnable
  artifact; and the `/guides/` move of distilling a diary into one sequenced guide.
- **Avoid:** reverse-chron diary as the *only* entry. Zero wayfinding for a newcomer who
  doesn't yet know the tag for their problem.
- **/ai can do what this structurally can't:** put a persona-diagnosis front door *in
  front of* the same evidence-adjacency, routing a practitioner to the artifact that
  matches their craft instead of making them already know its tag.

---

## 2. promptingguide.ai — the tool-first tutorial corpus

URL: https://www.promptingguide.ai/ (accessed 2026-07-08)

**Locate myself:** By technique, never by who I am. The entry is a taxonomy of methods —
"Prompting Techniques" (Zero-shot, Few-shot, Chain-of-Thought, RAG), "AI Agents"
(Function Calling, Deep Agents), "Applications," "Prompt Hub" (by task: Classification,
Coding, Reasoning), "Models," "Risks & Misuses." There is no "which of these are you." I,
the craft practitioner, land on a method menu and must reverse-engineer which technique
serves my work. **This is the exact surface the pilot is defined as bouncing off.**

**Path for my craft:** None. A domain expert hits technique menus, then task subsections
("Question Answering," "Information Extraction"). No role-based track; no bridge from my
craft to the technique.

**Evidence the practice is real:** Minimal. It reads as a reference compendium —
research citations, technique documentation, one "Graduate Job Classification" case study.
No practitioner shipping their own work; nobody's body of real output is on display.

**Next action, self-serve?** Self-serve reading, yes — it's free and open. But the action
is "read another technique page," not "apply this to your work and here's proof it lands."

- **Steal:** the comprehensiveness and organization of the technique taxonomy — valuable
  as a *depth/reference backstop*, not as a front door.
- **Avoid:** technique-first as the *entry*. Techniques without craft context and without
  demonstrated practice is precisely the tool-first failure the pilot rejects.
- **/ai can do what this structurally can't:** lead with persona-by-existing-craft and
  demonstrated artifacts; demote technique reference to a depth layer a path routes *into*,
  not the thing a newcomer meets first.

---

## 3. Every.to — the "how I use AI" essay genre

Representative pieces (accessed 2026-07-08):
- https://every.to/chain-of-thought/the-knowledge-economy-is-over-welcome-to-the-allocation-economy (thesis)
- https://every.to/source-code/how-i-use-claude-code-to-ship-like-a-team-of-five-6f23f136-52ab-455f-a997-101c071613aa (workflow narrative)
- Genre siblings: "How I Use Claude Code as a Second Brain," "After Automation"

**Locate myself:** At the level of *role reframing*, well. "The Allocation Economy" hands
the reader an identity — "you won't be judged on how much you know, but on how well you
can allocate and manage the resources to get work done"; the IC becomes a *model manager*.
That is persona-naming done well. But it's a thesis, not a diagnosis: it names one role for
everyone, not a taxonomy I route myself through by craft.

**Path for my craft:** A narrative to absorb, not a path to follow. "Ship Like a Team of
Five" is memoir anchored by one worked example (a queue-debugging session) and a
mindset shift ("programmer to orchestra conductor"). Three custom commands (`/issues`,
`/work`, `/review`) are shared as gists, but replicating them assumes Claude Code + Rails
familiarity. Illustrative, not prescriptive.

**Evidence the practice is real:** Moderate. Terminal screenshots, embedded video,
specific metrics ($400/mo, $5 token burn) — but no public repo or PR links. The thesis
essay is lighter still: introspection ("I've carved that task out of my skill set"), not
documented workflow.

**Next action, self-serve?** Self-serve but vague: "open your terminal, type what you want
in plain English, give it a real project." Non-developers are addressed only as an
afterthought ("my technically illiterate friends find it easier"). A PM, marketer, or
operator gets no concrete workflow — the craft coverage is implicitly developer-only.

- **Steal:** the persona-naming thesis ("you are now a model manager") as the *framing*
  for the front door, and the evidence-anchored first-person workflow narrative (metrics,
  screenshots, a real worked example).
- **Avoid:** prose-only with no navigable path; evidence that's screenshots without
  linkable repos; an implicit developer-only audience that leaves other crafts unserved.
- **/ai can do what this structurally can't:** make the path navigable rather than
  read-linearly, cover multiple crafts explicitly via the persona taxonomy, and replace
  screenshot-evidence with artifacts that are live and one click deep.

---

## 4. Anthropic Academy — the canonical vendor academy

URLs: https://www.anthropic.com/learn , https://anthropic.skilljar.com/ (accessed 2026-07-08).
Launched 2026-03-02; ~17 free courses, certificate on completion.

**Locate myself:** Best role-based entry of the five, at the hub level. `anthropic.com/learn`
splits three personas — **"Build with Claude"** (developers), **"Claude for work"** (teams),
**"Claude for personal"** (individuals) — and the catalog carries vertical "AI Fluency for
X" tracks (educators, students, nonprofits, small businesses, builders). That is genuine
role routing. But it's role-generic, not craft-specific: I pick "for work" or a broad
vertical, not "I'm a [my exact craft], here's your path." And one layer down at the
skilljar catalog the tracks dissolve into a **flat course list with no diagnosis** —
courses stand alone, unbundled ("Claude 101," "Claude Code 101," "Introduction to Cowork,"
"Building with the Claude API," MCP intro/advanced).

**Path for my craft:** A structured course sequence, professionally produced, with a
certificate as the completion artifact. But the content is generic vendor instruction — it
teaches the product, not one practitioner's demonstrated way of working.

**Evidence the practice is real:** This is the structural gap. The courses *assert* good
practice and teach capability; no single person's real shipped body of work stands behind
a track. The proof is a certificate you earn, not an artifact someone shipped.

**Next action, self-serve?** Fully self-serve: free, email signup, self-paced,
LinkedIn-able certificate. Best conversion mechanics of the five.

- **Steal:** the explicit role-based track split (dev / work / personal / vertical), free
  self-serve enrollment, and the certificate-as-completion-artifact mechanic.
- **Avoid:** generic vendor content with no practitioner's real work as substrate; and the
  flat, diagnosis-free catalog at the skilljar layer.
- **/ai can do what this structurally can't:** put one person's real, linkable shipped
  artifacts (Blueprint, Atelier, Ask BC, forge, recall) behind every path — proof by
  demonstrated work, not proof by certificate — with craft-specific personas finer-grained
  than "for work."

---

## 5. github.com/nino-chavez/ai-analyst-academy — Nino's own curriculum (comparable + placement candidate)

Repo: https://github.com/nino-chavez/ai-analyst-academy — deployed
https://ai-operator-academy.vercel.app (accessed 2026-07-08). SvelteKit + Svelte 5;
6 phases / 24 modules / 12 labs / capstone. Last pushed 2026-03-07; 0 stars; live landing
renders as a CSR-only SPA shell (no server-rendered content). In scope per mandate Q3 as a
placement candidate, evaluated here as a comparable.

**Locate myself:** By aspiration, not by existing craft. Hero framing is "Ready to become
an AI Analyst?" with CTAs "Start Learning" / "View Curriculum" / "Get Started Free." Entry
is a linear phase spine — Phase 1 AI Literacy → 2 Workflow Engineering → 3 Agentic
Orchestration → 4 Strategy & Economics → 5 AI Leadership → 6 Enterprise Architecture — plus
a "Structured Curriculum" feature block. There is no "which craft are you" diagnosis; I
enroll to become a new role rather than routing from the role I already have. (Note: the
labs use "persona" in a different sense — lab-1 "Persona Stress Test" is about designing AI
*prompt* personas, not diagnosing the *learner*.)

**Path for my craft:** A genuinely structured, hands-on sequence — the labs are
task-based and business-grounded (lab-1: draft a response to a revenue-threatening
customer LinkedIn complaint using four designed personas). Pedagogically the strongest
*sequence* of the five. But it is generic curriculum: the path is the same for everyone and
assumes I want to become an "AI Analyst."

**Evidence the practice is real:** Absent. The curriculum asserts AI application and
teaches frameworks; no shipped artifact of the author's stands behind a phase. Same failure
class the /ai audit flagged in the old academy — application asserted, not shown.

**Next action, self-serve?** Self-serve free enrollment, but the surface is stale (4 months
since last push as of today) and the CSR-only shell means the landing renders nothing to a
crawler or a JS-off visitor — the same discoverability failure class as /ai's noindex.

- **Steal:** the hands-on lab format (real business-scenario tasks) and the phase
  progression as a *depth spine* behind the personas.
- **Avoid:** "become an AI Analyst" aspiration over persona-by-existing-craft; asserting AI
  application without shipped evidence; and shipping a stale CSR-only shell (rot + no SSR
  discoverability — the exact pattern that killed the old /ai corpus).
- **/ai can do what this structurally can't:** fuse this curriculum's lab/phase depth with
  real shipped evidence and the freshness architecture; and Q3 must decide whether /ai
  supersedes this repo or folds its curriculum in — silence is not a choice (per mandate).

---

## Closing synthesis — where the pilot is served, underserved, and the gap /ai can occupy

**Currently served (each reference delivers one or two of the three things the pilot needs):**

| Need | Best served by | How |
|---|---|---|
| Locate myself (persona/role) | Every.to; Anthropic Academy | Every *names* a role ("model manager"); Academy *splits* role tracks (dev/work/personal/vertical) |
| Evidence the practice is real | simonwillison.net | Shipped tools + repos adjacent to every claim; independent author authority |
| A structured path/sequence | ai-analyst-academy; Anthropic Academy; simonwillison `/guides/` | Phase spines, course tracks, one 16-chapter guide |
| Technique depth/reference | promptingguide.ai | Exhaustive, well-organized method taxonomy |

**Underserved — the structural gap:** no reference fuses all three of *persona-diagnosis by
the craft you already have* + *one person's shipped evidence one click deep* + *a
self-serve transferable path*. Each holds one or two and is missing the rest:

- **simonwillison** — evidence + authority, but no persona entry and no path (diary).
- **promptingguide** — technique menu, but no persona, no demonstrated practice, no craft bridge.
- **Every** — persona-naming + narrative, but prose-to-read not a path; thin/linkless evidence; developer-only craft coverage.
- **Anthropic Academy** — role tracks + structure + certs, but generic vendor content with no single practitioner's real work as substrate; diagnosis-free catalog one layer down.
- **ai-analyst-academy** — structured hands-on curriculum, but evidence-free (asserts), aspiration-framed not craft-framed, stale, zero reach, CSR-only shell.

A second gap none of the five close: **freshness as architecture.** simonwillison stays
current only because a human posts daily; the vendor courses and the two academies are
static and rot (the Academy is fixed course content; ai-analyst-academy is 4 months stale).
None derive content from a canonical source, sense their own dead links, or refresh via an
agent.

**Positioning gap /ai can occupy:** the only enablement surface where (a) I diagnose myself
by the craft I already have via the persona taxonomy — finer than "for work," not an
aspiration to "become an analyst"; (b) every path is grounded in *one person's real,
linkable shipped artifacts* (Blueprint, Atelier, Ask BC, forge, specchain, recall) rather
than generic courses, unlinked screenshots, or a certificate; (c) the next action is
self-serve and the demonstrating artifact is one click deep; and (d) the surface maintains
its own freshness through derivation + sensors + an agentic refresh loop — which is itself
the strongest possible evidence for a practitioner deciding whether to work this way. The
five references, between them, prove each of these moves works in isolation; none combines
them, and that combination is the position /ai is uniquely placed to hold.
