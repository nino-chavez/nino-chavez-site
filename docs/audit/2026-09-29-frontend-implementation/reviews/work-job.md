## Recommendation

Keep `/work`, but demote it from a prominent primary destination to a secondary complete archive. Preserve the project detail pages and their direct URLs.

Its distinct job is:

> Show everything Nino has publicly authorized, including work omitted from Home, and state honestly what each item is and whether it is usable today.

That job is real, but narrower than the current navigation implies. The evidence does not show that most visitors arrive wanting an exhaustive inventory. It also does not support removing the archive.

### Why

Observed facts:

- Home already provides a direct Rally HQ route, four selected starting points, and a six-domain entrance to the complete body of work: [app/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/page.tsx:87), [app/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/page.tsx:107), [app/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/page.tsx:168).
- `/work` repeats the six-domain orientation before presenting its distinct feature: the complete searchable and filterable 29-item registry: [app/work/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/work/page.tsx:28), [app/work/page.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/work/page.tsx:67).
- Work search supports name, purpose, domain, status, and type. That is genuinely useful for exhaustive inspection: [WorkLibrary.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/components/WorkLibrary.tsx:63).
- The detail pages carry information that the external product destinations do not necessarily explain: Nino’s contribution, current status, access, evidence, relationships, and limitations. Rally HQ and Aisles demonstrate this: [data.ts](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/data.ts:260), [data.ts](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/data.ts:365), [detail page](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/work/%5Bslug%5D/page.tsx:700).
- The current global header and footer make Work the first primary destination: [SiteHeader.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/components/SiteHeader.tsx:10), [SiteFooter.tsx](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/components/SiteFooter.tsx:3).

The likely cost—still a hypothesis—is that a cold visitor is asked to understand Nino’s classification system before deciding which actual work matters. The current [work-mobile.jpg](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/work-mobile.jpg) shows that burden. All three rejected concepts retained the premise that a Work entrance must orient through either domains or records. Their rejection settles neither the page’s job nor whether the archive should exist.

## Who benefits and who pays

The archive benefits a visitor whose actual task is breadth: “What else has Nino made, including unfinished or less-prominent work?” It also benefits someone checking status across several projects without knowing every project name.

The cost falls on:

- Cold visitors, if this narrow completeness task occupies the most prominent navigation position.
- Mobile visitors, who encounter a long orientation and control stack before much named evidence.
- Nino, who must maintain metadata and two discovery layers on Home and Work.

The detail pages do not create the same cost. Direct referrals can bypass the collection entrance and land on a specific, contextual record.

## Overlap with the other routes

| Surface | Its strongest job | Overlap with Work |
|---|---|---|
| Home | Explain Nino and offer credible starting points | Already presents selected proof and all six domains. It duplicates most of Work’s orientation layer. |
| Search | Retrieve a remembered project, topic, session, essay, or page | Searches Work and the rest of the site. It is better for known-item retrieval but cannot show completeness without a query: [search](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/search/page.tsx:117). |
| Links | Get directly to something usable now | Duplicates the live-product subset, but deliberately excludes the complete history and work in development: [links](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/links/page.tsx:167). |
| Learn | Choose a path by intended output | Little direct overlap. Learn turns evidence into instruction rather than cataloging it: [learn](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/app/learn/page.tsx:21). |

## The three paths and their strongest counterarguments

1. **Keep Work prominent.**
   Strongest argument for it: public completeness remains obvious, and a visitor can browse without already knowing a project name.
   Strongest argument against it: prominence is unsupported by observed referral tasks, while Home already carries breadth and selected proof.

2. **Make Work a secondary archive — recommended.**
   Strongest argument against it: demotion could make the long tail feel hidden and weaken the site’s promise that unfinished or less-prestigious work remains visible. Search is not an adequate replacement because it requires recall.
   This is why `/work` should remain directly linked from Home, Search results, relevant detail pages, and the footer even if it leaves primary navigation.

3. **Remove the collection entrance but retain detail pages.**
   Strongest argument for it: Home, Search, Links, and direct referrals cover most practical discovery tasks with less taxonomy.
   Strongest argument against it: there would be no way to inspect the complete public body of work without guessing queries or following fragmented relationships. The detail pages would survive, but public completeness would not.

## Required owner amendment

The functional owner is [docs/IA-NAVIGATION.md](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/IA-NAVIGATION.md:11). It currently makes complete Work inspection a top-level visitor job and assigns Work the first primary-navigation position at lines 16–25 and 73–88.

The narrow amendment should:

- Preserve `/work` as the complete authorized registry and preserve its admission, status, and filter rules.
- Stop guaranteeing it a primary-navigation position.
- Define it as a secondary archive reachable from Home, site search, project relationships, and the footer.
- Leave unified apex routing and direct `/work/:slug` URLs unchanged.

Because [ADR-0004](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/decisions/0004-unified-apex-information-architecture.md:39) explicitly names Work as primary navigation, that one navigation clause needs a superseding note. The decision to use one hostname does not need reopening. The “atlas before registry” requirement in [OPEN-PRACTICE-ART-DIRECTION.md](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/OPEN-PRACTICE-ART-DIRECTION.md:40) should then stop dictating the entrance before its visitor job is validated.

## Evidence that would change this recommendation

Use the next five real referrals. Do not show them concepts or ask which page they like. Record:

1. The link actually sent.
2. The decision the visitor is genuinely making, in their words.
3. Their landing page and first two navigation actions.
4. The project evidence they inspect.
5. Whether they seek a complete body of work without being prompted.
6. Whether they use Work’s domains, search, status, or type controls.
7. Whether they can accurately state what Nino contributed and what is available today.

Change the recommendation as follows:

- **Restore prominent Work** if several real breadth-oriented referrals independently seek it, use its completeness or metadata, and find relevant evidence they would miss through Home or Search.
- **Keep it secondary** if direct referrals succeed on project pages while visitors use Work only when they deliberately need breadth.
- **Remove the entrance** only if real referral tasks repeatedly succeed through Home, Search, Links, and direct pages, and the complete registry supplies no additional useful find even when visitors are asked to inspect breadth.

The old assessment’s appearance claim that Home lacked a named product in its first viewport is superseded by the current Rally HQ action and newer [home-mobile.jpg](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-frontend-implementation/evidence/home-mobile.jpg). Its analytics remain only historical context: `/work` recorded 30 estimated page loads during the stated 30-day window, but those are neither unique people nor completed tasks and cannot decide prominence: [ASSESSMENT.md](/Users/nino/Workspace/dev/sites/nino/nino-chavez-site/.worktrees/codex/frontend-refit-20260929/docs/audit/2026-09-29-critical-frontend/ASSESSMENT.md:37).

No files, processes, refs, servers, or external systems were changed.
