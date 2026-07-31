# Design direction — personal profile, project-native portfolio

> **Historical direction.** The current branch is a neutral IA and navigation
> click-through. The visual choices below are not approved for the redesign and
> should not influence structural review. A new art-direction round follows
> acceptance of the route system.

## Decision

Build a conventional personal portfolio with a quiet, stable shell and
project-native work previews.

The portfolio should not look like a publication about Nino's work. It should
look like Nino's personal site, with the work immediately present.

## What the existing systems actually say

| Surface | Useful evidence | Do not inherit |
|---|---|---|
| Ways of Working demos | Restrained neutral shell, real previews, Avenir/system sans, honest evidence copy, each artifact keeps its own accent | Serialized arc, numbered cards, mono-led titles, gallery-wall composition |
| Photography | Chrome recedes; real imagery carries the surface; one accent has one job | Photography's gold as a universal personal brand |
| Rally HQ | Product shown doing its job; closed palette; direct language; clear action hierarchy | Sports-marketing headline scale |
| Let's Pepper | Color encodes real product taxonomy; photography is integral; voice is short and direct | Heat colors and athletic display language outside the event brand |
| Signal Dispatch | First-person, provisional, technically specific voice | Masthead, departments, kickers, contents-page layout |
| Labs | Child projects may diverge; the hub supplies navigation and a minimum contract | Treating visual diversity itself as the homepage concept |
| Forge kits | Tokens have roles; accents are semantic; body typography and spacing can be normalized | Believing a normalized kit provides art direction |

The recurring principle is not a single aesthetic. It is disciplined containment:
the shell is restrained, each project keeps its native identity, color encodes
meaning, and claims are backed by a real object.

## Color

Use the demo index's neutral shell as the personal-site foundation because it is
already the only surface designed to hold several unrelated identities without
wearing any of them.

### Dark

- Ground: `#16181c`
- Surface: `#1d2025`
- Strong surface: `#24272d`
- Text: `#e8e6e0`
- Muted text: `#9aa0a8`
- Rule: `#2c2f35`
- Action/link: `#7a97ff`

### Light

- Ground: `#f6f4ef`
- Surface: `#fffefb`
- Strong surface: `#efede7`
- Text: `#1c1e21`
- Muted text: `#5f646c`
- Rule: `#ddd9d0`
- Action/link: `#2b55d4`

The site may follow the visitor's color scheme. The two modes are the same
system, not alternate art directions.

The blue is interface ink only: links, focus, and the primary action. It does
not wash sections, tint cards, or color headlines. Project color appears inside
real screenshots, photography, logos, and—when useful—a narrow local edge or
small state mark derived from that project's own system.

Retire the current lime. It is strongly associated with the present sports-poster
hero, appears nowhere as a stable personal signature across the project family,
and competes with project-native color.

## Typography

### Roles

- **Headings and navigation:** Archivo, weights 500–700.
- **Body and UI:** Inter Variable, weights 400–600.
- **Technical data only:** JetBrains Mono.

Archivo and Inter are already a shipped pairing in the product family. They are
clear at portfolio scale without turning the site into either a sports poster or
a periodical.

Do not use Bebas Neue or Anton as the personal-site voice. They belong to the
athletic brands and make the current homepage feel like campaign creative.

Do not use mono for the name, section titles, project titles, or recurring
kickers. Mono is reserved for things that are actually technical or tabular:
version, repository, date, command, or compact state.

The demo series may continue using Avenir Next, Avenir Next Condensed, and its
mono-led gallery system on its own property. The portfolio does not need to
impersonate the demos to link to them.

### Scale

- Name: `clamp(2.75rem, 6vw, 5.5rem)`, 650–700, title case.
- Intro: `clamp(1.25rem, 2.2vw, 1.75rem)`, regular.
- Section heading: `clamp(1.75rem, 3vw, 2.5rem)`, 600.
- Project title: `1.25rem–1.5rem`, 600.
- Body: `1rem`, 1.6 line height.
- Metadata: `0.8125rem–0.875rem`.

No all-caps paragraphs, giant slogan, blinking cursor, numbered chapters, or
letterspaced section departments.

## Composition

### Global shell

- Simple header: `Nino Chavez` at left; `Work`, `Demos`, `Writing`, `About` at
  right; GitHub and email remain secondary.
- Maximum page width around `1200px`.
- Twelve-column desktop grid, but visible content should resolve into a calm
  two-column portfolio rhythm.
- 16:10 or 4:3 project media; no cinematic strips used merely for drama.
- Thin rules and spacing create hierarchy. Cards do not need elevated boxes,
  shadows, gradients, or colored glows.

### Homepage

1. **Profile intro**
   - Name.
   - One concrete first-person sentence.
   - Current role, Chicago, and two actions.
   - Optional small portrait or working photograph; never a full-bleed hero
     backdrop.
2. **Selected work**
   - Four to six projects.
   - Two-column grid on desktop, one column on mobile.
   - Real image first; title, one sentence, state, and action below.
   - One lead project may span two columns, but do not create a newspaper-like
     hierarchy of six different tile sizes.
3. **Ways of working**
   - One substantial preview with the demo index image or a compact three-demo
     strip.
   - Link to the dedicated demo property.
4. **Writing**
   - Three recent or representative titles in a plain list.
5. **About/contact**
   - Short biography, current focus, and direct links.

### `/work`

The complete launch pad. Use a consistent grid or list and allow visitors to
filter by domain, state, and form. Filters are controls, not visual identities.
All objects keep an honest action. Private or conceptual work may be named when
publication is authorized, but its action must match its state.

### Project summaries

Create a local summary page only when it helps a visitor understand why an
external property or repository matters. A summary uses:

- one-sentence purpose;
- role and contribution;
- current state;
- a real screenshot or photograph;
- two to four concrete facts;
- direct destination links.

This is not a case-study template and does not require a fabricated
problem/process/outcome narrative.

## Content and copy

Write in first person. Prefer nouns and observable facts over positioning
language. The voice is direct, specific, conversational, and willing to state
limits.

### Homepage draft

**Nino Chavez**

> I design and build software, run volleyball events, photograph them, and
> publish what I learn about working with AI agents.

> Product architect in Chicago. This is selected work from the products, tools,
> events, photographs, and writing I maintain outside and alongside that role.

Primary actions:

- `View selected work`
- `Ways of working`

### Card pattern

**Rally HQ**  
Tournament registration, brackets, schedules, and live scoring in one public
event page.  
`Live product` · `Open Rally HQ`

Avoid:

- “multidisciplinary creative technologist”;
- “agent-assisted practice” as the first thing a visitor must decode;
- “cut the noise / follow the signal”;
- claims about breadth before showing the work;
- “explore,” “discover,” or “learn more” when a specific action exists;
- craft kickers and colored domain labels repeated on every card.

## Interaction

- Images may scale slightly inside a fixed frame; the card itself does not
  lift.
- Links change color and gain a visible underline or arrow.
- Focus is always visible in the interface blue.
- Motion is under 200ms and explains state. No scroll theatre, marquees,
  parallax, ambient grids, or entrance choreography.
- Dark/light mode follows system by default; a manual toggle is optional and
  not a first-release requirement.

## Subdomains and deployment

Keep purpose-built subdomains. Consolidate the personal identity, profile,
selected work, complete work index, and project summaries into the main
`ninochavez.co` site. Do not merge the demo series, blog, photography search
experience, or product applications into the portfolio codebase.

One main-site deployment is correct. One deployment for the entire public
ecosystem is not.

## Next design artifact

Produce one responsive homepage prototype using this system. It should use real
project images and representative copy. Review the first viewport, selected-work
grid, demo-series handoff, and mobile navigation before implementing the
remaining routes.

Do not generate another set of unrelated art-direction options.
