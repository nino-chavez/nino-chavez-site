---
name: Nino Chavez — In the field
description: A warm, restrained personal practice site led by one full-bleed photograph and direct routes into real work.
colors:
  ground: "#f4f0e8"
  surface: "#faf7f1"
  surface-muted: "#e5e0d7"
  text: "#122a3c"
  muted: "#536373"
  rule: "#bbc0bf"
  action: "#0d5a93"
  action-quiet: "#e0e9ed"
  ink: "#07131d"
typography:
  display:
    fontFamily: '"In the Field Display", "Open Practice Body", Inter, ui-sans-serif, system-ui, sans-serif'
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  hero:
    fontFamily: '"Open Practice Hero", "Arial Narrow", Arial, sans-serif'
    fontSize: "clamp(90px, 13vw, 188px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Open Practice Body", Inter, ui-sans-serif, system-ui, sans-serif'
    fontSize: "16px"
    lineHeight: 1.55
  evidence:
    fontFamily: '"Open Practice Evidence", "Courier New", monospace'
rounded:
  control: "3px"
  dialog: "0"
spacing:
  header: "80px"
  content-gutter: "clamp(40px, 10vw, 156px)"
components:
  nav-active:
    textColor: "{colors.text}"
  menu-button:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "8px 13px"
---

## Overview

**Creative North Star: "In the field."** The selected October 1, 2026 direction is warm, photographic, and restrained. One full-bleed opening photograph establishes the personal surface. The rest of the site gets visitors to real writing, products, studies, and photographs without repeating the introduction or adding promotional scaffolding.

**Key Characteristics:**

- Warm reading ground and navy ink on main-site pages.
- A quiet four-link global navigation: Writing, Building, Photography, About.
- Image-led entrances into the three bodies of work.
- Compact interiors that put the actual archive, product, or gallery task before extended explanation.

The main application scopes this system to `body.site-a` in `app/in-the-field.css`. The article publisher and photography gallery keep their own application behavior and specialized controls.

## Colors

**The Warm Ground Rule.** Use the warm ground for main-site reading surfaces. Use navy text and action blue for legibility and interaction. Use dark ink where photography needs a dark ground or chrome.

`ground`, `surface`, and `surface-muted` establish the light hierarchy. `text` is the reading ink. `muted` supports secondary information. `rule` is the shared border color. `action` and `action-quiet` carry links, active states, focus, and quiet interactive fills. `ink` is the dark photographic ground.

**The One Action Rule.** On light pages, one action color carries interactive emphasis. Do not introduce another promotional accent to make a section compete.

## Typography

**The One Job Per Face Rule.** Schibsted Grotesk, loaded as `In the Field Display`, serves compact interior headings and navigation identity. `Open Practice Body` is the Inter-backed reading face. `Open Practice Evidence` is the Space Mono-backed evidence face. The home lockup uses the `Open Practice Hero` face currently loaded from `anton-400.woff2`.

Interior headings use the display role with tight tracking. Body copy uses the body role at a comfortable 16px and 1.55 line-height. Evidence, code, and small technical labels use the monospace role.

## Layout

**The Arrival Rule.** The homepage opens with one full-bleed photograph, then shows three equally weighted routes: Building, Writing, and Photography. Captions sit outside the images so the route names do not compete with content inside the images.

The main header is 80px on wide screens and contracts to 72px below 920px. Main content uses a maximum width of 1320px and responsive outer gutters. The image routes form three columns on wide screens and compact image-and-text rows at 640px and below.

Interior pages begin with their real task. Writing keeps its title, latest piece, archive controls, and records compact enough for the archive to appear early. Photography keeps its compact identity, direct search, intrinsic image framing, and gallery controls.

## Elevation & Depth

The system is mostly flat. Light surfaces separate through ground, surface, rules, and spacing rather than cards with decorative shadows. The mobile navigation dialog uses a dark translucent backdrop and a short slide-in transition to make its temporary layer clear.

## Shapes

**The Quiet Edge Rule.** Controls use a restrained 3px radius and ordinary 1px rules. The navigation dialog is square after the `site-a` reset, which keeps the temporary panel plain and direct.

Photography uses the images' intrinsic proportions. Do not add rounded frames or veils that obscure the photographs.

## Components

### Navigation

The desktop header keeps identity, the four primary destinations, and Search as a utility. The active route is marked by an action-blue 3px underline. On smaller screens, the same destinations appear in a dialog with its own search, focus handling, Escape dismissal, and browser-Back recovery.

### Route previews

Homepage previews are real images with a route heading, concise descriptor, and directional arrow. At narrow widths, each becomes a compact square image beside its text. Hover underlines the route heading; keyboard focus uses the shared action-blue focus treatment.

### Buttons and controls

Controls use the body face, clear borders, a light surface, and the shared action color for active and focused states. Keep the existing search, filtering, gallery viewer, save, and download controls functional and visible where their task requires them.

## Do's and Don'ts

### Do:

- **Do** preserve the full-bleed opening photograph and the four-link global navigation.
- **Do** put the actual work, archive, or gallery action before a long introduction on interior pages.
- **Do** use real images, real destinations, and truthful availability labels.
- **Do** keep direct routes, query filters, keyboard focus, and recovery behavior intact.

### Don't:

- **Don't** bring back the prior dark-and-lime SvelteKit-era palette or typography as active guidance.
- **Don't** add competing homepage modules, permanent rails, portrait preambles, or a promotional band around the opening photograph.
- **Don't** replace specialized gallery and product controls with generic decorative controls.
- **Don't** present generated imagery as photography or invent evidence, availability, testimonials, or measured outcomes.
