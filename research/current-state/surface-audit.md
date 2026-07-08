# /ai Surface Audit (Brownfield Design-Discovery)

Stage 1 register, scoped to the `/ai` section (consolidated per initiative decision: one
doc, four sections). Every claim cites `file:line` under `src/routes/ai/` unless a full
path is given. Audit date 2026-07-08.

---

## (a) Surface inventory

13 page routes + 2 layouts. **All public. All `noindex, nofollow`.** Zero inbound links
from the main site (orphaned; direct-URL only).

| # | Route | Page file | Purpose | Content source | noindex |
|---|---|---|---|---|---|
| — | `/ai` (layout) | `+layout.svelte` (162) | Header + sub-nav + theme toggle wrapper | Inline `aiSections` array (:7-13) | n/a (layout) |
| 1 | `/ai` | `+page.svelte` (206) | Hub / front door | Inline `pathways` array (:7-52) | :62 |
| 2 | `/ai/learn` | `learn/+page.svelte` (336) | Persona gateway (7 tracks) | Inline `tracks` array (:7-92) | :103 |
| 3 | `/ai/learn/explorer` | (661) | Explorer persona track | Inline `levels` array (:8-141) | :155 |
| 4 | `/ai/learn/builder` | (825) | Builder persona track | Inline `levels` array (:8-232) | :247 |
| 5 | `/ai/learn/architect` | (673) | Architect persona track | Inline `levels` array (:8-142) | :156 |
| 6 | `/ai/learn/strategist` | (661) | Strategist persona track | Inline `levels` array (:8-133) | :147 |
| 7 | `/ai/learn/author` | (646) | Author persona track | Inline `levels` array (:8-129) | :143 |
| 8 | `/ai/learn/voice` | (662) | Voice persona track | Inline `levels` array (:8-134) | :148 |
| 9 | `/ai/learn/enterprise` | (694) | Enterprise persona track | Inline `levels` array (:8-143) | :157 |
| 10 | `/ai/learn/corpus` | (69) | "Coming Soon" stub | Inline stat tiles (:38-54) | :15 |
| 11 | `/ai/build` | `build/+page.svelte` (290) | Shipped-projects accordion | Inline `projects` array (:8-62) | :76 |
| 12 | `/ai/reference` | `reference/+page.svelte` (485) | Glossary + architectures + patterns | Inline `glossary`/`architectures`/`patterns` (:25-143) | :169 |
| — | `/ai/ask` (layout) | `ask/+layout.svelte` (28) | Full-screen chat wrapper (overrides parent nav) | — | n/a (layout) |
| 13 | `/ai/ask` | `ask/+page.svelte` (56) | Virtual-Nino chatbot | `Chat.svelte` + `/api/ask/chat` + `askdad/system-prompt.ts` | :8 |

**Content-source observation.** Every page's data is a hardcoded array literal inside its
own `<script>`. There is no `src/lib/data/` or content collection; nothing is derived from
GitHub, the blog, or any canonical source. This is the structural root of the rot the
freshness architecture targets — a fact only updates if a human hand-edits the page file.

---

## (b) Component audit — the 7-template duplication, quantified

**Shared code = 1 file.** Only `$lib/styles/ai-theme.css` (199 lines) is shared, imported
by the two layouts (`+layout.svelte:5`, `ask/+layout.svelte:5`). It supplies the `--ai-*`
CSS custom properties and the `.ai-card`, `.ai-badge-{learn,build,reference,ask}` utility
classes. Only ONE actual Svelte component exists: `Chat.svelte`, imported solely by
`ask/+page.svelte:2`. **No shared component backs the 7 learn tracks, the front door, the
build page, or the reference page** — each is a self-contained `.svelte` file that
re-implements the same markup.

**The 7 learn tracks are one copy-pasted template.** Combined 4,822 lines (explorer 661 +
builder 825 + architect 673 + strategist 661 + author 646 + voice 662 + enterprise 694).
Four structural blocks are near-identical across all 7 — they differ ONLY in data (text,
one badge class, one accent-color var, mailto subject/body). Measured line ranges:

| Block | explorer | builder | architect | strategist | author | voice | enterprise | ~lines ea. |
|---|---|---|---|---|---|---|---|---|
| A. Hero header (back-link + badge + h1 + subhead + 3 meta pills) | 158-207 | 250-299 | 159-208 | 150-199 | 146-195 | 151-200 | 160-209 | ~50 |
| B. "Who This Is For" (2-col for / not-for) | 209-264 | 301-355 | 210-265 | 201-256 | 197-252 | 202-257 | 211-266 | ~55 |
| C. "The Levels" accordion button-header (number badge, title, duration pill, goal, checkpoint, chevron) | 308-344 | 425-461 | 340-376 | 331-367 | 327-363 | 332-368 | 350-386 | ~37 |
| D. CTA + "Stuck?" + footer | 587-661 | 751-825 | 599-673 | 587-661 | 572-646 | 588-662 | 620-694 | ~74 |

Blocks A+B+C+D ≈ **216 identical-structure lines per track × 7 ≈ 1,510 lines** that a
single template collapses to one implementation. On top of that:
- **Script boilerplate** (`mounted` / `expandedLevel` / `toggleLevel()` / `onMount`) is
  byte-identical across all 7 (e.g. builder :1-6,235-241; enterprise :1-6,145-151) ≈ 15
  lines × 7 ≈ 105 lines.
- **The "Checkpoints" render idiom** (`{#each level.checkpoints as cp}` with the ☐ glyph)
  repeats once per level inside every level's `{#if}` block — ~35 copies total (5 levels ×
  7 files), ~12 lines each ≈ 420 lines, all identical.

Net: **~2,000 of the 4,822 learn-track lines (~40%) are mechanically duplicated markup.**
The remaining ~60% is the per-level expanded content — the `{#if level.level === N}` blocks
— which is where the files genuinely differ, but even there the idiom is uniform:
`<h4 uppercase label>` + `{#each}` list-or-grid, repeated with per-level field names
(`reading`, `terms`, `setup`, `skills`, `rubric`, `governance`, `mapping`, `formats`, …).

**Cross-page duplication beyond the tracks.**
- The `mailto:nino@ninochavez.co` contact + "Email Me Your …" CTA is duplicated across all
  7 tracks (Builder :781, Enterprise :650, Explorer :617, Architect :629, Strategist :617,
  Author :602, Voice :618).
- The card-grid pattern recurs unshared in `/ai` (:98-148), `/ai/learn` (:197-249),
  `/ai/build` (:104-236) and `/ai/reference` (:283-376).
- The `mounted` + `fly/fade` onMount animation scaffold is re-implemented in every page.

**What a single data-driven `<TrackPage>` template would need.** One component +
one `tracks` data file:
1. **Header data**: `badgeClass`, `accentVar`, `h1`, `subhead`, and 3 meta pills
   (`levelsCount`, `timeline`, `finalArtifact`). (Replaces Block A.)
2. **`whoFor`**: `{ for: string[], notFor: {text, crossLinkTrack?}[] }`. (Replaces Block B.)
3. **Optional intro slot**: `keyConcept {title, vagueLabel, vague, specificLabel, specific}`
   OR `prerequisites: string[]` — currently these vary (Explorer/Enterprise/Voice use
   "Key Concept"; Builder/Architect/Strategist/Author use "Prerequisites"; Architect adds
   a "Voice Shift" block :306-318; Builder adds "Self Assessment" :390-405).
4. **`levels[]`** normalized to a generic shape so ONE renderer replaces all seven
   `{#if level.level === N}` ladders. Each level = `{ level, title, duration, goal,
   checkpoint, sections: Section[], checkpoints: string[] }`; each `Section = { label,
   kind: 'list'|'grid'|'keyval'|'cards'|'flow', items }`. This normalization is the core
   rebuild task — the current per-level bespoke field names must map onto typed section
   kinds.
5. **CTA**: replace the `mailto {subject, body}` with a self-serve `{ label, href }` to a
   repo / live demo / essay (per prescription 3). (Replaces Block D.)

The build page (`projects` array) and reference page (`glossary`/`architectures`/
`patterns`) are separate shapes but follow the same "inline array → accordion/grid render"
pattern and would each collapse to a small typed component + data file.

---

## (c) Content-type taxonomy (implicit content shapes + fields)

Ten implicit shapes, all currently expressed as inline array literals with no schema:

1. **Persona Track** — `learn/+page.svelte:7-92` + per-track page. Fields: `id`, `title`,
   `tagline`, `description`, `artifact`, `timeline`, `levels`(count), `badge`, `icon`,
   `ready`; per-page: hero `subhead`, `whoFor.for[]`, `whoFor.notFor[]` (each optionally
   cross-links another track), `keyConcept`. (7 instances.)
2. **Level** — per-track `levels` array (e.g. builder :8-232). Universal fields: `level`
   (0-4), `title`, `duration`, `goal`, `checkpoint`, `checkpoints[]`. Plus **non-uniform**
   typed sub-sections that vary by level and track: `reading`, `terms`, `setup`, `projects`,
   `rules`, `skills`, `project`, `stack`, `production`, `signals`, `mapping`, `structure`,
   `requirements`, `formats`, `patterns`, `rubric`, `automation`, `governance`,
   `skillExamples`, `metrics`, `sections`, `workflow`, `adrTypes`, `topics`,
   `commerceExamples`, `modes`, `bridges`, `versionLog`, `components`, `antiPatterns`,
   `consistency`, `appendixTypes`, `abstraction`, `validation`, `contexts`, `approaches`,
   `system`, `technique`, `sources`, `dimensions`, `briefStructure`, `principles`,
   `package`, `chapterStructure`, `volume/structure`. (~35 instances; the sub-section
   sprawl is exactly what a normalized `Section[]` kind would tame.)
3. **Glossary Term** — `reference:25-60`. Fields: `term`, `fullName` (nullable),
   `category` (Protocols|Orchestration|Fundamentals|Data|Visibility), `definition`,
   `example`. (25 instances.)
4. **Architecture** — `reference:62-100`. Fields: `id`, `title`, `description`,
   `layers[]{name, components[]}`, `useCases[]`. (3 instances.)
5. **Pattern** — `reference:102-143`. Fields: `id`, `title`, `description`, `flow`, `when`,
   `avoid`. (5 instances.)
6. **Build Project** — `build:8-62`. Fields: `id`, `title`, `tagline`, `description`,
   `status`, `badge`, `technologies[]`, `architecture{title, flow[]{step,detail},
   features[]}`, `link`, `linkText`, `external?`. (2 instances.)
7. **Pathway Card** — `+page.svelte:7-52`. Fields: `id`, `title`, `tagline`, `description`,
   `href`, `badge`, `icon`, `stats`, `detail`. (4 instances.)
8. **Nav Section** — `+layout.svelte:7-13`. Fields: `path`, `label`, `exact?`,
   `description`. (5 instances.)
9. **CTA Block** — every track. Fields: `headline`, `subhead`, `note`, and a `mailto`
   `{subject, body}` (to be replaced by a self-serve `{label, href}`).
10. **Stat Claim** — `corpus:38-54` (also front-door card `stats` and build features).
    Fields: `value`, `label`. This is the shape the claim-lint / staleness gate must cover
    (values like `882,786`, `603 agents`, `70+ terms` are all unverifiable in-prose stats).

---

## (d) Auth boundary

The entire `/ai` section is **fully public with no authentication or authorization of any
kind.** No route defines a `+page.server.ts`/`+layout.server.ts` guard, no session or user
check exists, and the `/ai` layout (`+layout.svelte`) renders unconditionally. The only
access control present anywhere is the soft `noindex, nofollow` meta tag on all 13 pages —
a search-visibility signal, not an access boundary; the pages are reachable and fully
readable by any direct-URL visitor. The single dynamic backend, `/api/ask/chat` (consumed
by `/ai/ask`), is likewise unauthenticated (rate-limiting/turnstile status is a Stage 2
question, not an auth boundary here). Net: there is no auth surface to preserve in the
rebuild — the prescription's "drop noindex, add nav links" (prescription 1) is unblocked by
any access-control dependency.
