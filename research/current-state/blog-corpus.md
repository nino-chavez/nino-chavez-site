# Signal Dispatch Corpus Inventory — AI/Agentic-Engineering Content

Stage 1 research (current-state). Source of truth: `~/Workspace/dev/apps/blog/astro-build`
(Astro content collections). Live surface: `ninochavez.co/blog`. All frontmatter/path
claims cite the repo; all live claims cite URL + HTTP status. Probes run 2026-07-08.

> **Note on repo layout:** the blog source lives in `apps/blog/astro-build/`, not the
> repo root. Root `src/` is empty/legacy; the top-level `_drafts/` holds three unrelated
> LinkedIn/portfolio drafts, not blog posts. Collections config: `astro-build/src/content.config.ts`.

---

## 1. Corpus shape

**Eight content collections** (`src/content.config.ts:251-260`), file counts under
`astro-build/src/content/`:

| Collection | Files (.mdx) |
|---|---|
| blog | 237 |
| whitepapers | 13 |
| fiction | 10 |
| presentations | 9 |
| series | 9 |
| counterpoints | 4 |
| tutorials | 4 |
| research-notes | 1 |

**Blog is the corpus that matters here: 237 posts, all with parseable `publishedAt`**
(236 `status: published`, 1 `unlisted`; per frontmatter). Range: **2025-06-02 →
2026-06-16**.

**Publishing cadence** (blog `publishedAt`, by month):

```
2025-06  85   ← launch backfill (import spike, not organic cadence)
2025-07  31
2025-08  27
2025-09   5
2025-10  11
2025-11  12
2025-12   8
2026-01  17
2026-02   9
2026-03  15
2026-04   7
2026-05   4
2026-06   6   (latest: 2026-06-16)
```

Last 12 months (Jul 2025 – Jun 2026): **152 posts, every month non-zero.** After the
June-2025 launch backfill, cadence settles to a steady ~4–17/month — a live, actively
maintained blog, not a dormant archive.

**AI/agentic share:** classifying a post AI-relevant when its `tags` include
`ai-development` / `agentic-systems` / `ai-governance`, OR `category: AI & Automation`,
OR title/excerpt matches agent/LLM/Claude/prompt keywords:

- **177 of 237 posts (75%) are AI-relevant.**
- Of those, **43 are agentic-engineering-specific** (build/ship-with-agents: `agentic-systems`
  tag or agentic/multi-agent/spec-driven/worktree/orchestration keywords).

Tag frequencies (top, across blog): `ai-development` 141, `architecture` 98,
`reflection` 84, `leadership` 42, `consulting` 28, `agentic-systems` 25, `engineering` 23,
`ai-governance` 6. Category `AI & Automation` = 134 posts. **The corpus is dominantly
about applied AI/agentic engineering** — it is the blog's primary subject, not a side theme.

---

## 2. Annotated index — the agentic-engineering essays

Selected from the 43 agentic posts, most recent first. Track = which learn track(s) the
essay could support (Explorer/Builder/Architect/Strategist/Author/Voice/Enterprise).
**Evidence** = does it narrate real shipped work (S = shipped/worked example with concrete
mechanics; O = opinion/industry-analysis). Slug = file under `content/blog/<slug>.mdx`.

| Date | Title / slug | Thesis (one line) | Track(s) | Evidence |
|---|---|---|---|---|
| 2026-06-16 | The Gate Verifies the Work. It Never Looks at the Plan. `the-gate-verifies-the-work-not-the-plan` | 13 features shipped green but every design was wrong — verification gates make being wrong cheap only on the code side, not the plan side. | Architect, Builder | **S** |
| 2026-06-16 | Red Is the Good News `red-is-the-good-news` | Three bugs that would have shipped clean; only a test written to fail first against the real thing caught them. | Builder | **S** |
| 2026-06-16 | The Migration That Ate Two Columns `the-migration-that-ate-two-columns` | A DB rebuild silently dropped two columns, no error, all tests green — what actually caught it. | Builder, Architect | **S** |
| 2026-06-16 | I Wrote the Rule Down. I Broke It Anyway. `i-wrote-the-rule-down-i-broke-it-anyway` | A rule file existed to stop one mistake; made it 3x anyway — the difference between a rule and a wall. | Architect | S (reflective) |
| 2026-06-15 | Where the API Stops `where-the-api-stops` | Fought the human-interface-vs-machine-native war on both sides in one pipeline; a human had to close the seam. | Architect, Strategist | **S** |
| 2026-06-11 | Open Kitchen `open-kitchen` | Building agent-assisted work in the open vs "closed kitchens"; what the alternative costs. (cites blueprint) | Author, Voice | S (reflective) |
| 2026-05-30 | The Only Thing in My Codebase That Can't Lie `the-only-thing-in-my-codebase-that-cant-lie` | Tests as the one artifact an agent can't fake; governance via verification. | Builder, Enterprise | **S** |
| 2026-05-24 | The Scaffolding the Agent Doesn't Build `the-scaffolding-the-agent-doesnt-build` | An AI draft confessed things about his work that weren't true — the human scaffolding agents can't supply (voice-guard). | Voice, Architect | **S** |
| 2026-05-24 | The A/B Test That Built the Lathe `the-backport-i-didnt-make` | In-loop plan vs template-only run: template landed at ~70% — the feedback loop is the product. (cites blueprint, specchain, ninochavez.co) | Strategist, Author, Architect | **S** |
| 2026-04-23 | The Muscle Memory of Expensive Things `the-muscle-memory-of-expensive-things` | Enterprise instincts about cost/risk vs what AI makes cheap. | Strategist, Enterprise | S/O |
| 2026-04-21 | I Don't Write Any Code `i-dont-write-any-code` | Mapping skills across 65 projects; the correction he typed back that others refuse to type. | Explorer, Strategist | S (reflective) |
| 2026-03-25 | Skip the Steps `skip-the-steps` | Supabase's "copy prompt" button → reframing "context engineering" as "probability engineering." | Explorer, Builder | S/O |
| 2026-03-20 | What 223 Sessions Taught Me About Working with AI `what-223-sessions-taught-me-about-working-with-ai` | Pulled 30 days of Claude Code data — 223 sessions, 38k+ prompts, 32 projects — what AI-native dev actually looks like. | Explorer, Builder | **S (hard data)** |
| 2026-03-16 | The 48-Hour Artifact `the-48-hour-artifact` | Pointed an agent at an initiative, wrote no code/copy; 2 days → 11 pages, 4 docs, 30+ citations — and a trust problem. | Strategist, Author, Architect | **S (worked example)** |
| 2026-02-04 | Spec-Driven Development with Multi-Agent Orchestration `spec-driven-development-with-multi-agent-orchestration` | Coordination, not capability, is the bottleneck; built a system where specialists implement and verifiers catch drift. | Architect, Builder | **S (the method)** |
| 2026-01-18 | The Signal Forge Method: Agentic Document Generation `the-signal-forge-method-agentic-document-generation` | Documents fail when treated as one task; mode-per-document agentic generation (forge-signal). | Author, Strategist | **S (the method)** |
| 2026-01-17 | 22GB to 2GB: Video Compression as Agentic Collaboration `22gb-to-2gb-video-compression-as-agentic-collaboration` | A real logistics task solved by an agent that analyzed, proposed, tested, pivoted, executed. | Explorer, Builder | **S (worked example)** |
| 2026-01-17 | The Cowork Moment `the-cowork-moment-when-agentic-ai-goes-mainstream` | Claude Cowork packages the agentic pattern for non-devs — a category shift, not a launch. | Explorer, Strategist | O |
| 2026-03-19 | The Cart Is a Protocol Now `the-cart-is-a-protocol-now` | Agentic checkout protocols (Google UCP, OpenAI/Stripe); cart/checkout becoming infrastructure. | Strategist, Enterprise | O (industry) |
| 2026-03-01..03-07 | Civil War Inside Every Agent / What If the Fork / Two Doors for Agents / Six Months After the Horizon / Can vs. Should | Series on agent interface strategy (explore-vs-menu), the fork problem, and can-vs-should governance. | Architect, Strategist, Enterprise | O (analysis) |

**Track-coverage read:** Builder and Architect are the best-served (the 2026-05/06
verification-gate cluster is unusually strong shipped evidence). Author/Strategist have
concrete method essays (48-Hour Artifact, Signal Forge, A/B Test). Voice has one strong
piece (Scaffolding). **Explorer** is thinner (223 Sessions, 22GB, Skip the Steps are the
on-ramps). **Enterprise** is mostly analysis/opinion, not shipped evidence — matches the
audit's finding that AI mechanics concentrate in Builder/Architect, and Enterprise leans on
asserted facts. This maps cleanly onto the goal doc's track→artifact plan and flags Explorer
+ Enterprise as the tracks whose evidence needs the most help from the /work artifacts.

---

## 3. Freshness assessment — is "actively publishing on agentic engineering" TRUE?

**Yes, as of 2026-07-08 the claim holds.** Most recent post is **2026-06-16** (~3 weeks
before today); the June 2026 batch is four agentic-engineering essays published same-day
(the "build-wave pair" in the blog's own git log: `044bf3a content: publish the build-wave
pair`). Every one of the last 12 months has posts, and the newest content is squarely
agentic-engineering, not adjacent topics.

**5 most recent AI-relevant posts** (frontmatter `publishedAt`; all confirmed present in
the **live** `/blog/rss.xml` newest-first order):

1. 2026-06-16 — **The Migration That Ate Two Columns** (`agentic-systems, architecture, ai-development`)
2. 2026-06-16 — **Red Is the Good News** (`agentic-systems, engineering, ai-development`)
3. 2026-06-16 — **I Wrote the Rule Down. I Broke It Anyway.** (`agentic-systems, reflection, ai-development`)
4. 2026-06-16 — **The Gate Verifies the Work. It Never Looks at the Plan.** (`agentic-systems, architecture, ai-development`)
5. 2026-06-15 — **Where the API Stops** (`agentic-systems, architecture, field-notes`)

One caveat worth carrying into Stage 2: cadence has thinned in the most recent quarter
(Apr 7, May 4, Jun 6) vs the winter peak (Jan 17, Mar 15). Still active, but the raw volume
is lower — a derived "latest essays" surface should show 3–6 items, not assume a firehose.

---

## 4. Derivation feasibility — can the rebuilt /ai render "writing" as derived content?

**Yes — a build-time feed exists and is live. But there's a routing trap to design around.**

The blog exposes four machine-readable endpoints in source (`astro-build/src/pages/`):

| Source file | Builds to | Content | Live at `ninochavez.co` |
|---|---|---|---|
| `pages/blog/rss.xml.ts` | `/blog/rss.xml` | title, pubDate, excerpt, link, **categories = tags**, author | **200 ✓** |
| `pages/blog/full-content-rss.xml.ts` | `/blog/full-content-rss.xml` | full post bodies | **200 ✓** |
| `pages/api/posts.json.ts` | `/api/posts.json` | richest: slug, title, excerpt, publishedAt, updatedAt, category, tags, url, featureImage | **404 ✗** |
| `pages/llms.txt.ts` | `/llms.txt` | LLM context index | **404 ✗** |

**Why the two best endpoints 404 (load-bearing for Stage 2):** the Astro app has no
`base` path (`astro.config.mjs`: `site: "https://ninochavez.co"`, no `base`), so the JSON
API and llms.txt build to `/api/*` and `/llms.txt` at the apex — **outside the `/blog/`
prefix the `apps/router` Worker forwards to the blog Pages project.** The same 2026-07-08
router fix that removed `/api/*` blog-forwarding (goal doc § Prerequisites #1) is what now
strands the blog's own JSON feed: `/api/posts.json` on the apex resolves to the main
SvelteKit site, which has no such route → 404. Only the two feeds physically under
`/blog/` survive the router. (`/blog/api/posts.json` and `/blog/llms.txt` also 404 — the
files aren't nested under `blog/` in source.)

**Practical consequence for the freshness architecture (goal doc § Lane 1 "Derived"):**

- **Available today, zero changes:** consume **`https://ninochavez.co/blog/rss.xml`** at
  build time. It carries `<pubDate>` and `<category>` (the tags), so the /ai build can
  filter to AI/agentic posts (`agentic-systems` / `ai-development` / `ai-governance`) and
  render the latest N with dates and excerpts. Confirmed live: **236 items**, newest-first,
  CORS not needed for build-time server fetch. This is the recommended derivation source.
- **Better, one small blog-side change:** the JSON API (`posts.json.ts`) is `prerender = true`,
  CORS `Access-Control-Allow-Origin: *`, and already emits exactly the card fields a /work-style
  grid wants. Moving it to `src/pages/blog/api/posts.json.ts` (→ `/blog/api/posts.json`, inside
  the forwarded prefix) makes the rich JSON reachable on the public domain. Cheap, and it
  future-proofs the derivation lane. Recommend filing this as a blog-repo prerequisite,
  parallel to the goal doc's existing "prerequisites in the main repo" list.
- **Alternative (no network):** the /ai build could read the blog repo's build output or
  content collection directly at build time if the two repos share a build context — but the
  live RSS is simpler and keeps the surfaces decoupled.

Bottom line: **derivation is feasible now via `/blog/rss.xml`; the richer JSON is one route
move away.** Either path satisfies "render, never restate" for the writing lane.

---

## 5. Voice notes for the /ai surface (feeds Stage 3 — no prose drafted)

Source: `apps/blog/docs/signal-dispatch-voice-guide.md` (v1.2, updated 2026-05-24; empirical,
156-post analysis). The register the /ai prose must hit, in ≤10 lines:

1. **Open with tension or an uncomfortable truth, never a thesis** — no "In this section
   we'll explore." The reader meets a question, not a table of contents.
2. **Show the work, not the result** — public-practice, vulnerable-competence: real
   iterations, false starts, the messy middle. This is the voice's core and it aligns
   exactly with the initiative's "show, don't assert" mandate.
3. **Provisional, not authoritative** — no "you should always," no 7-step prescriptions;
   ground every claim in "I did X," trust the reader to apply or reject.
4. **Concrete over coined** — every named artifact (Blueprint, specchain, forge, recall)
   must be glossed the first time or replaced with what it does; never ≥3 coined terms in a
   row. This is the single highest-risk rule for a surface full of tool names.
5. **Never fabricate interior state** — no invented people, conversations, or admissions;
   self-interrogation must be grounded in a real commit/post/session.
6. **Mechanics:** short paragraphs (1–3 sentences), punchy bold headers (questions/
   statements/provocations, never "Introduction"), intentional fragments (vary their shape —
   avoid the "Two X. Same Y." tic), em-dashes, `---` between H2s.
7. **Avoid the retired tells** — "Ask me again in six months," "here's where I've landed—for
   now," etc. are now dead giveaways of templated writing.
8. **Content mode:** the /ai enablement surface is mostly **Documentation/Solution-Architecture
   register** (instructional, definitive) for paths/tools, but the connective prose and any
   first-person framing must stay in the **Thought-Leadership** Signal Dispatch voice above —
   pick the mode per block, don't blend.
9. Guide's cardinal rule: **spirit over literals** — do not copy phrases from the guide;
   reproduce what they accomplish.

---

## Provenance

- Frontmatter/counts: parsed from `apps/blog/astro-build/src/content/**/*.mdx` (2026-07-08).
- Collections schema: `apps/blog/astro-build/src/content.config.ts`.
- Feed endpoints: `apps/blog/astro-build/src/pages/{blog/rss.xml.ts, blog/full-content-rss.xml.ts, api/posts.json.ts, llms.txt.ts}`; `astro.config.mjs`.
- Live probes (2026-07-08): `/blog` 200, `/blog/rss.xml` 200 (236 items), `/blog/full-content-rss.xml` 200, `/api/posts.json` 404, `/llms.txt` 404, `/blog/api/posts.json` 404.
- Voice: `apps/blog/docs/signal-dispatch-voice-guide.md` (v1.2).
- Router context: goal doc § Prerequisites #1 (`apps/router/src/index.ts` `/api` prefix removal, 2026-07-08).
