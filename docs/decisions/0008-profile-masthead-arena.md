# ADR 0008: Use Masthead and Arena for the profile site

- **Date:** 2026-11-04
- **Status:** Approved — build it
- **Scope:** profile home and `/work` composition; Arena colors on all profile routes
- **Supersedes:** [ADR 0007](0007-profile-studio.md)

## Decision

Nino asked for a rethink in a modern agency visual style, selected **A, Masthead**, then reopened the palette and selected **Arena**.

Masthead sets the name across the full width in Anton, then the statement beside a large photograph, then one full-width section per project. It closes on "Get in touch" at the same scale. B's linked statement is grafted in: the words of the authored statement are links.

Arena keeps one ground from top to bottom, and the photographs and product screens supply most of the color:

| Role | Color |
| --- | --- |
| Ground | `#07070F`, the arena black from the home photograph |
| Text | `#F2F2EE` |
| Action | `#8FCBEA`, the ice blue of the lights behind the player |
| Secondary text | `#A8A8B3` |
| Rules | `#2C2C38` |

The action color marks what you can act on: link and control accents, and the closing line.

## Alternatives

The brief, concepts B and C, and the rejected palettes (Ultra, Night Game, Flare, Clash, Bookend, Gallery) stay in [docs/design/concepts/agency-20261104](../design/concepts/agency-20261104/BRIEF.md). Nino rejected the first palettes because a different color per section competed with the page, which is why Arena has no section bands.

Known objections Nino chose over: a cold reviewer preferred Gallery and said Arena's light product screens glare on black. Arena also sits closer than the alternatives to the charcoal Photography site and Flickday's black.

## Boundaries

Inner profile routes keep their composition and header and take Arena through shared tokens; their `h1` uses Anton. Writing and Photography remain independent applications and their links keep opening in new tabs. Authored copy, facts, media, routes and search behavior do not change. Agency grammar does not add services, client logos, testimonials or "we".

## Verification

This ADR records the selected direction; it is not release evidence.
