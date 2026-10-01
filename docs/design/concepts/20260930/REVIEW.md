# A — In the field is selected

These are local, clickable proposals. Nino selected A. The earlier referral-page selection of B is a separate, superseded visual decision.

Open `http://127.0.0.1:4336/comparison.html`. Switch direction while keeping the same page and viewport. Nine page types use the same real content: Home, Building, Writing, Article, Photography, Album, Product, Public study and About. Product also switches among Minder, The Rotation, Rally HQ, Cutting Board and Yawn.

## What the alternatives test

- **A — In the field:** the full-bleed photograph and name create the first impression. Image-led exploration follows. Tradeoff: the range of work requires scrolling or choosing navigation.
- **B — The journal:** a masthead, panoramic photograph and editorial front page expose the essay, product and album together. Tradeoff: more material competes for attention.
- **C — The contact sheet:** a compact identity and persistent desktop navigation frame a collection of real work. Tradeoff: the collection can feel more like an archive than a personal introduction.

All use Writing, Building, Photography and About as the proposed global routes. Building combines operated products, tools and public technical work. Work Library remains both a linked product and the source of the demonstrated public study. This is an experience comparison, not evidence that a stack migration is needed or complete.

## Review changed the actual compositions

The parent inspected rendered desktop and phone screenshots. A separate reviewer opened eighteen initial captures, then ten revised captures without authoring the concepts.

The first B and C drafts delayed the work behind personal introductions. B now exposes real editorial material; C reduces the portrait to a small desktop identity detail and puts the collection first. A keeps its full-bleed image, uses legible headline spacing and starts its article body before the illustration.

All detail pages gained visible parent links. Album controls were compacted, search recovery appears only when useful, and photographs retain their intrinsic proportions. The viewer controls fit narrow phones. Collection headings were reduced so actual products and images earn the available space. About includes the existing public email and LinkedIn destinations.

The cold review found no remaining blocking issue in the revised detail captures. It retained a concern about A's broad “Explore the work” label. That remains a comparison tradeoff, not a measured conversion finding.

## What was checked

`evidence/checks.json` is the final mechanical receipt. `verify.cjs` loads the photography project's existing Playwright installation and uses installed Chrome. It checks all nine routes in all three directions at 1440, 390 and 320 CSS pixels. The final run found no horizontal overflow, broken loaded images, empty links, missing or duplicate primary landmarks, or page script errors. An injected 4px overflow first proved the overflow check could detect a defect.

Interactions checked: photo search and empty state, clearing back to 43 photos, viewer next/Escape/focus return, viewer controls at 320px, product search and filters, mobile menu dismissal, five product details, and comparison direction switching while preserving Album and Phone. Desktop and phone viewport captures are saved in `evidence/`; these are not over-height full-page captures.

This verifies the prototypes. It does not prove production accessibility conformance, live download/save/auth behavior, production SEO, analytics outcomes, or completion of every existing site route. By date and Collections lead to the existing gallery. Product actions lead to their existing destinations. No authenticated Mobbin flow was inspected in this round, and no analytics result chooses a winner. Impeccable supplied design prompts and craft checks; it is not a substitute for rendered review.

## Source and delivery state

`shared/provenance.json` records source material. The essay is existing text, the album contains 43 actual image records, and product statuses retain their supplied limits. Minder's published preview contains a fictional sample day and is labeled accordingly. The study is an explicitly labeled opening excerpt from a public draft, linked to its source. No private Work Library registry was exported.

Three isolated worker branches were created at `fe44a2dacf899ea04d01d480dd89156702a894b2`. Their file scopes and unchanged shared fixture copies were checked. No existing branch moved. Parent corrections are in the integration worktree. The dispatcher receipts are `40bc97e5-b37b-4880-8001-e7550e67eec8` (A), `fe7a05a0-9fcb-4952-a857-70dd9f0e4f21` (B), and `33a2fe97-13ca-4621-8674-760f1cd52217` (C). Workers completed; their reported runtime model fields are unavailable, so requested routing is not presented as verified execution identity.

The prototype is served on loopback port 4336. The preview helper's detached process did not survive this execution host; a retained foreground server supplies the review instead. The external asset-capture browser tab was closed and its viewport override reset. No worker server or browser was started. Worker worktrees remain available with the original alternatives. No production source was changed by this concept round; nothing was committed, pushed or deployed.

## Selected direction — October 1, 2026

Nino selected **A — In the field** with the instruction **“less is more.”** This is the new site-wide selection, superseding the earlier referral B styling. The full-bleed home photograph, quiet four-link navigation and image-led work are selected. Remove repeated introductions, duplicated labels and competing calls to action. Preserve all useful retrieval and reading functions.

Carry forward B’s compact reading start and clear product availability. Carry forward C’s early access to actual work. Leave out B’s competing front-page modules, C’s permanent navigation rail and portrait preamble, and A’s optional orange promotional band. These compete with the selected photograph and the visitor’s immediate job.

Implement locally on existing routes. Writing is /blog; Building is /work and includes products, studies, /demos and /learn; Photography is /photography; About is /about. Building is not the registry’s In development state. Preserve direct links, query filters, private boundaries, canonical sources and specialized interactions. This selection does not migrate operational products or publish the changes.


