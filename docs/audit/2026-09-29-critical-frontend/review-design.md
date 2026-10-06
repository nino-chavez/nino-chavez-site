# Recommendation

Preserve the visual identity and refit three specific areas; do not redesign the site.

The experience is authored, not interchangeable. The oversized Anton type, restrained ink/bone/cobalt palette, volleyball imagery, evidence labels, and page-specific compositions form a recognizable point of view. The site avoids both portfolio-template sameness and a generic services funnel.

The public experience is strongest when the visitor arrives with a concrete job: open Rally HQ, find a photograph, read the latest piece, or search the site. It is weakest where the interface delays proof, contradicts its own contract, or lets display typography escape the viewport.

Forward synthesis: [ASSESSMENT.md](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/docs/audit/2026-09-29-critical-frontend/ASSESSMENT.md)

## Cold judgments

### Home

**Five seconds:** Nino is a product architect and builder in Chicago who works in real conditions. The full-bleed volleyball photograph makes the claim personal and specific. This does not resemble a stock technology portfolio.

**Thirty seconds:** The visitor still has not seen product evidence. “See selected work ↓” postpones the proof promised by “I design products, build the software behind them, and run them in the real world.” The page establishes the person faster than it establishes the work.

### Direct-entry inner pages

**Five seconds:** Most pages announce their job unusually well.

- Rally HQ states what the product does and offers “Open Rally HQ.”
- Photography leads with the practical task: “Find the frame you came for.”
- Search names its scope in plain language.
- Coverage states the audience, outcome, price, and request action.
- Work, Sessions, Writing, and About establish their collection or context clearly.
- Learn is the exception: its headline visibly runs beyond the viewport.

**Thirty seconds:** The page-expression model holds together. Work feels like an atlas, Sessions like a sequence, Writing like a publication, Photography like an image archive, and Search like a utility. That variety is intentional and valuable. The visitor can usually identify one next action without decoding the entire site.

## Persona journeys

| Visitor | Entry | Question | Next action | Likely obstacle |
|---|---|---|---|---|
| Prospective collaborator or employer | Home, About, Work, or Rally HQ | Is this substantial work, and what judgment does Nino personally own? | Open Rally HQ, Work, or Sessions | Home creates confidence but makes the visitor scroll before seeing a named product or inspectable proof |
| Reader referred to an essay or demo | Writing, Sessions, or a direct detail URL | What is this, and where does it fit in the broader practice? | Read the latest piece or open a featured session | Collection pages expose large bodies of material. The direct essay/session experience was not captured, and compact navigation hides adjacent destinations behind Menu |
| Parent, athlete, or team | Photography or Sports & event coverage | Can I find my event, and can this photographer cover ours? | Search the archive, view match photos, or request coverage | The practical path is excellent, but the visible $250 offer contradicts the approved $350 contract, leaving the actual public promise unresolved |

## Strengths to preserve

1. **The identity is specific without becoming theatrical.** The home photograph, name scale, typography, and “Product architect + builder” label create immediate authorship. The work feels connected to volleyball, operations, and software rather than decorated with those themes afterward.

2. **Different pages use different compositions for different jobs.** Rally HQ is a concise record. Photography behaves like an archive. Writing gives the latest piece priority. Search is quiet and direct. This fulfills the art direction’s requirement that shared identity must not become page-level sameness.

3. **Practical actions often outrank self-promotion.** “Find photos,” “Open Rally HQ,” and the site search field tell visitors what they can do. Photography is especially strong: the archive search appears before biography or portfolio narration.

## Cognitive and emotional assessment

Cognitive load is low on Home, Rally HQ, Photography, Coverage, and Search. Their first viewports present one primary task and no more than one or two secondary actions. Sessions presents three understandable choices: sessions, techniques, and one featured entry.

Work contains six domain choices, but the large separated rows chunk them effectively. Learn has the clearest load problem: “Choose by output” leads into seven equal peer paths named Explorer, Builder, Architect, Strategist, Author, Voice, and Enterprise. The visitor must translate persona-like labels back into outcomes before comparing them.

The emotional journey is mostly confidence → curiosity → evidence. Photography adds recognition and reassurance: a parent can immediately search using event, team, or jersey number. Learn creates the clearest emotional valley because the opening statement is visibly cut off. Coverage creates a potential trust valley: its confident offer becomes risky when the displayed price and owned contract disagree.

## Ranked priority issues

### 1. P1 — Learn’s opening escapes the viewport

- **Visible evidence:** “Start with what you need to make.” is cut off in both `learn-desktop-top.png` at 800×423 and `learn-mobile-top.png` at 390×844. Supporting capture metadata reports `scrollWidth: 958` against an 800-pixel viewport.
- **User consequence:** The page’s governing instruction is literally unreadable. Horizontal overflow also makes the learning surface feel mechanically unfinished before the visitor evaluates any path.
- **Smallest remedy:** Reduce or clamp the display size, constrain the heading’s owning field, and make the longest real text wrap without increasing document width.
- **Confidence:** High.
- **Classification:** Breaches the owned typography and cognition clauses: display text must remain inside its field, and readable text may not escape its region.

### 2. P1 — The coverage price contradicts the approved contract

- **Visible evidence:** `coverage-desktop-top.png` at 800×423 displays “$250 per match.” `coverage-mobile-top.png` at 390×844 displays “Varsity volleyball · $250.” The approved IA contract specifies a “clearly labeled $350 varsity volleyball match package.”
- **User consequence:** Price is the central decision fact on an inquiry page. Contradictory source and rendered promises can produce an incorrect expectation before contact and weaken trust during booking.
- **Smallest remedy:** Resolve which price is current, then make the hero, package section, request option, and owning contract use that one amount. The images do not establish whether $250 or $350 is correct.
- **Confidence:** High on the contradiction; no conclusion about the intended price.
- **Classification:** Owned-clause breach, not a design opinion.

### 3. P2 — Home postpones the product proof

- **Visible evidence:** `home-desktop-top.png` at 1440×900 and `home-mobile-top.png` at 390×844 show the claim and the generic action “See selected work ↓,” but no named product or inspectable product surface.
- **User consequence:** A cold employer or collaborator understands the identity but must invest another scroll or click before testing the software claim. The volleyball photograph proves real-world involvement, not the product architecture behind it.
- **Smallest remedy:** Restore one compact, named Rally HQ proof object or make the immediate work action name the concrete proof. Keep one proof surface; do not add a services pitch or project collage.
- **Confidence:** High.
- **Classification:** Breaches the owned first-encounter clause calling for a singular actionable Rally HQ proof.

### 4. P2 — Learn says “choose by output” but leads with seven role labels

- **Visible evidence:** `learn-mobile-top.png` shows “7 PATHS,” “Choose a path,” and the first peer card, “Explorer.” The DOM evidence confirms seven peers: Explorer, Builder, Architect, Strategist, Author, Voice, and Enterprise.
- **User consequence:** A first-time visitor has to interpret seven identities before comparing what each path produces. Seven peer choices exceed the requested four-item cognitive-load threshold.
- **Smallest remedy:** Make each output or need the dominant comparison label and demote the persona name. Keep all seven paths and the current visual language.
- **Confidence:** Medium-high.
- **Classification:** Design judgment supported by the cognitive-load rubric; not an explicit product-clause breach.

## Nielsen heuristic scores

These are reviewer judgments from static evidence, not empirical usability measurements.

| # | Heuristic | Score | Reason |
|---|---|---:|---|
| 1 | Visibility of system status | 2 | Breadcrumbs, current-page labels, counts, and Rally HQ status help. Compact Menu state and action feedback were not observed. |
| 2 | Match with the real world | 3 | Most pages use direct visitor language. Learn’s role taxonomy requires translation. |
| 3 | User control and freedom | n/a | Menu, filters, search, and form behavior were not exercised. |
| 4 | Consistency and standards | 3 | Type roles, action arrows, shell, and content hierarchy are coherent while page forms remain appropriately varied. |
| 5 | Error prevention | n/a | Input constraints and submission behavior cannot be judged from stills. |
| 6 | Recognition rather than recall | 2 | Primary actions are labeled, but the global IA is hidden behind Menu at compact widths and Learn requires role-to-output translation. |
| 7 | Flexibility and efficiency | n/a | Mostly Experience/Read surfaces; accelerators are neither central nor observable. |
| 8 | Aesthetic and minimalist design | 3 | Strong focus and little decorative clutter. Learn’s overflow prevents a 4. |
| 9 | Error recognition and recovery | n/a | No error states were captured. |
| 10 | Help and documentation | n/a | Not central to these public surfaces, and contextual help behavior was not tested. |
| **Total** |  | **13/20** | **65% — Acceptable; strong identity with significant targeted defects** |

## Per-surface disposition

| Surface | Direction | Reason |
|---|---|---|
| Home | Refit | Preserve the authored stage; restore immediate named proof |
| Work | Preserve | The atlas successfully makes a complete inventory legible |
| Rally HQ | Preserve | Best concise product explanation and action hierarchy |
| Sessions | Preserve | Clear split between complete sessions and reusable techniques |
| Learn | Refit | Fix containment and re-rank outputs over persona labels |
| Writing | Preserve | Publication identity, latest piece, and archive scope are clear |
| Photography | Preserve | Strongest task-led direct-entry experience |
| Coverage | Refit | Preserve imagery and inquiry hierarchy; resolve the price contract |
| About | Preserve | Human, specific, and connected to inspectable work |
| Search | Preserve | Quiet utility with clear scope and examples |

No surface merits a wholesale rethink from the evidence available.

## Falsifiers and interaction requirements

The recommendation would change if:

- a fresh Learn capture at 390 and 1440 pixels showed no clipping or horizontal overflow;
- the approved coverage contract were deliberately superseded to $250;
- observed visitor sessions showed that the generic home action reaches proof as effectively as a named product;
- full 1440-wide captures showed additional proof or navigation omitted from these files.

Observed interaction is still required for Menu focus and dismissal, search and filter results, coverage-form validation and recovery, keyboard traversal, focus visibility, hover/touch ownership, reduced motion, loading states, and direct essay/session navigation.

Only `home-desktop-top.png` is 1440×900. Every other file named `desktop-top.png` is 800×423. Therefore, wide-desktop behavior outside Home cannot be inferred. These are top-of-page captures, so lower-page composition also remains unreviewed. I did not read analytics or treat DOM link presence as proof that an interaction works.

## Evidence opened and sources used

Opened PNGs:

- `home-desktop-top.png`, `home-mobile-top.png`
- `work-desktop-top.png`, `work-mobile-top.png`
- `rally-hq-desktop-top.png`, `rally-hq-mobile-top.png`
- `sessions-desktop-top.png`, `sessions-mobile-top.png`
- `learn-desktop-top.png`, `learn-mobile-top.png`
- `writing-desktop-top.png`, `writing-mobile-top.png`
- `photography-desktop-top.png`, `photography-mobile-top.png`
- `coverage-desktop-top.png`, `coverage-mobile-top.png`
- `about-desktop-top.png`, `about-mobile-top.png`
- `search-desktop-top.png`, `search-mobile-top.png`

Also used the corresponding ten page JSON exports, `PRODUCT.md`, `docs/IA-NAVIGATION.md`, `docs/OPEN-PRACTICE-ART-DIRECTION.md`, `CLAUDE.md`, `AGENTS.md`, Impeccable’s Assessment A/cognitive-load/heuristics guidance, and the Signal Dispatch voice guide.

Assessment B, detector output, other reviewers, analytics files, source implementation, and stale `DESIGN.md` were not inspected. No servers, browser tabs, fixtures, detectors, or persistent processes were started. No files were changed.