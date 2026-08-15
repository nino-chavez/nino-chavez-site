# Asset render standard — nino-chavez-site

Read before rendering any image asset for this site — OG cards, hero graphics, diagrams, anything
shipped as a rendered file rather than live DOM. Sets the model tier and the gates that run at every
tier. Machinery: `~/.claude/hooks/render-dispatch-guard.py` and the tier agents at
`~/.claude/agents/render-{mechanical,standard,judged}.md`.

## Render work is dispatched, not done inline

**Rule R-0.** Name the tier, then dispatch. The main loop cannot change model mid-session.

**Check.** Mechanical for `render-kit` invocations.

> **Scope note.** This standard governs *rendered asset files*. It does not govern the site's own
> component rendering — a Svelte or React component re-rendering is not a render task, and the
> dispatch hook deliberately ignores that language.

## Tiers

**Rule R-1.** Route on who or what catches a wrong answer.

| Who catches it | Tier | Model |
|---|---|---|
| A gate — a build that fails, a visual diff against a committed asset | Mechanical | `haiku` |
| A gate exists, but the work is real editing — payload or template geometry | Standard | `sonnet` |
| A person judges it on appearance; anything a prospect, client or employer sees | Judged | `opus` |

**Rule R-2.** Highest matching tier wins. This is a portfolio: the audience is people deciding
whether to work with Nino, so most public assets here are Judged by audience even when the render
command is trivial.

## Gates — every tier, no exceptions

0. **Rendering is not publishing.** A public asset gets a human look before it ships.
1. **Type, color and layout come from this repo's design direction** — `DESIGN.md`,
   `DESIGN-DIRECTION.md`, `DIRECTION.md`. **Check:** name which file the values came from. Where they
   disagree with the built site, the built site wins and the doc is stale; say so rather than
   reconciling silently.
2. **No fabricated credential, client, metric or endorsement.** A portfolio asset asserting work that
   did not happen is the one defect here with consequences outside the repo. **Source of fact:** the
   site's own career and project data. **Check:** every claim on a rendered asset traces to a
   committed source in this repo.
3. **A person's name or face renders only with their agreement** — clients, colleagues, subjects.
4. **Numbers are sourced or labeled invented.** There is no third category.

## Escalation

**Rule R-3.** Stop and re-dispatch at Judged if the asset carries a claim about work, a client name,
a metric, or a person.

## What would change this standard

- A committed token file derived from the built site would make gate 1 mechanical.
- If rendered assets stop being public-facing, most of this drops to Standard.
