---
# Nino Chavez Portfolio (SvelteKit) — ninochavez.com
# Personal brand surface. Answer Engine Optimization (AEO) proof-of-concept.
schemaVersion: 1
name: Nino Chavez Portfolio
tagline: Personal portfolio — Nino Chavez, Chicago
mode: dark

colors:
  brand:
    dark:   "#0a0a0f"     # near-black, 2% hue shift toward blue
    violet: "#8b5cf6"     # primary accent — Tailwind violet-500
    light:  "#f0f0f5"     # near-white, matched hue to dark

  # Shadcn-style neutral ramp expressed as Tailwind neutral.
  neutral:
    "50":  "#fafafa"
    "100": "#f5f5f5"
    "200": "#e5e5e5"
    "300": "#d4d4d4"
    "400": "#a3a3a3"
    "500": "#737373"
    "600": "#525252"
    "700": "#404040"
    "800": "#262626"
    "900": "#171717"
    "950": "#0a0a0a"

  semantic:
    success: "#22c55e"
    warning: "#f59e0b"
    error:   "#ef4444"
    info:    "#3b82f6"

  surfaces:
    background: "{colors.brand.dark}"
    surface:    "{colors.neutral.900}"
    card:       "{colors.neutral.900}"
    elevated:   "{colors.neutral.800}"
    border:     "{colors.neutral.800}"

  text:
    primary:   "{colors.brand.light}"
    secondary: "{colors.neutral.300}"
    muted:     "{colors.neutral.400}"
    link:      "{colors.brand.violet}"
    linkHover: "#a78bfa"              # violet-400

typography:
  fonts:
    display:
      family: Inter
      fallbacks: [ui-sans-serif, system-ui, "-apple-system", sans-serif]
      weights: [500, 600, 700, 800]
    body:
      family: Inter
      fallbacks: [ui-sans-serif, system-ui, "-apple-system", sans-serif]
      weights: [400, 500, 600]
    mono:
      family: "JetBrains Mono"
      fallbacks: [ui-monospace, monospace]
      weights: [400, 500, 700]

  scale:
    hero:    "clamp(3rem, 2.25rem + 3.75vw, 5rem)"
    display: "clamp(2.25rem, 1.75rem + 2.5vw, 3.75rem)"
    h1:      "clamp(1.875rem, 1.5rem + 1.875vw, 2.75rem)"
    h2:      "clamp(1.5rem, 1.3rem + 1vw, 2rem)"
    h3:      "1.25rem"
    lead:    "1.125rem"
    body:    "1rem"
    sm:      "0.875rem"
    xs:      "0.75rem"

  leading:
    hero:    1.05
    heading: 1.2
    body:    1.6                      # generous for AEO content — long-form
    relaxed: 1.75

  tracking:
    tighter: "-0.03em"
    tight:   "-0.02em"
    normal:  "0"
    wide:    "0.02em"

spacing:
  "1": 0.25rem
  "2": 0.5rem
  "3": 0.75rem
  "4": 1rem
  "6": 1.5rem
  "8": 2rem
  "12": 3rem
  "16": 4rem
  "24": 6rem
  "32": 8rem

rounded:
  sm:   0.375rem
  md:   0.5rem
  lg:   0.75rem
  xl:   1rem
  "2xl": 1.5rem
  full: 9999px

elevation:
  sm:    "0 2px 8px rgb(0 0 0 / 0.4)"
  md:    "0 12px 32px rgb(0 0 0 / 0.5)"
  focus: "0 0 0 3px rgb(139 92 246 / 0.4)"

motion:
  duration: { fast: 150ms, base: 250ms, slow: 500ms, hero: 800ms }
  easing:
    out:   "cubic-bezier(0.16, 1, 0.3, 1)"
    inOut: "cubic-bezier(0.65, 0, 0.35, 1)"
  note: "modernAnimations.css provides scroll-linked reveal + entrance timing."

layout:
  containerMax:   72rem               # narrower than flashy portfolios — content-first
  contentMax:     44rem               # reading comfort for AEO long-form
  proseMax:       42rem
  headerHeight:   4rem
  heroMinHeight:  36rem
  touchTargetMin: 2.75rem
  gutter:   "{spacing.4}"
  gutterMd: "{spacing.6}"
  gutterLg: "{spacing.8}"
---

# Nino Chavez Portfolio — Design System

## Overview

Personal portfolio + AEO (Answer Engine Optimization) proof-of-concept. The site is a working demonstration of structured content that AI models (ChatGPT, Claude, Gemini) can definitively answer from — so the visual system is deliberately **content-forward** rather than spectacle-driven. Dark default with a single violet accent; Inter throughout; generous reading measure.

This is the authoritative "who is Nino" surface. The sibling properties are:

- **`nino-chavez-gallery`** — volleyball action-sports photography (charcoal + gold, Montserrat)
- **`nino-chavez-labs`** — experimental apps hub (purple + DM Sans, gradient-heavy)

Each has its own visual system; they share "dark default" but are **not** visually cousin-ish. Links between them use the active site's accent color, not the destination's.

## Colors

- **`{colors.brand.dark}` (#0a0a0f)** — the canvas. 2% hue shift toward blue from pure black — subtle cool cast.
- **`{colors.brand.violet}` (#8b5cf6 / violet-500)** — the single saturated accent. Links, primary CTA, focus ring, accent graphics. Do not introduce a second brand color.
- **`{colors.brand.light}` (#f0f0f5)** — body text. Not pure white; hue-matched to the dark canvas for less optical glare.
- **Neutral ramp** carries the entire surface hierarchy between background and text.

## Typography

**Inter everywhere** — display, body, UI. Display weights go up to 800; body stays at 400–600. No secondary display font; Inter has enough weight range to carry both roles.

### Scale

Fluid `clamp()` across all steps. Hero tops at 5rem on widest viewport — not the 8rem a portfolio-brand archetype would allow. This is content-first; the hero is a statement, not a spectacle.

### Leading rules

- **Hero** 1.05 — tight, to make the statement land
- **Headings** 1.2
- **Body** 1.6 — generous for AEO-style long-form
- **Relaxed** 1.75 — for pull quotes and featured prose

### Tracking

Hero display: `-0.03em`. Body: `0`. All-caps section tags: `+0.02em`. No decorative tracking.

## Layout

- **Container 72rem** — narrower than the 80rem portfolio-brand archetype. This site prioritizes reading over spectacle.
- **Content 44rem** — ~65ch target for comfortable prose reading.
- **Header 4rem** — tight. Logo + 4–5 nav links + resume-link tail.

## Motion

`modernAnimations.css` provides scroll-linked reveal timing and entrance animations. Default easing is expo-out (`{motion.easing.out}`) — characteristic of portfolio animation languages. Hero entrance runs 800ms.

Continuous/ambient animation is not used. Motion exists for reveal transitions on scroll, not for decoration.

## Structured Content Discipline (AEO)

This site is the proof-of-concept for AEO. The *visual* system must not undermine the *content* structure that makes AI answer-readable:

- **Headings are semantic.** `h1`/`h2`/`h3` carry meaning. Don't use an `h2` class on a `div` just to get the visual treatment.
- **Lists are lists.** Bulleted/numbered lists in prose should be `<ul>`/`<ol>`, not styled paragraphs.
- **Data gets `<dl>`.** Facts like "Role: Product Architect" or "Years: 20+" use `<dl>`/`<dt>`/`<dd>` so AI models can parse the entity.
- **Schema.org markup is required** on bio, work history, project descriptions, and long-form posts.

The DESIGN.md token system supports this by keeping visual hierarchy aligned with semantic hierarchy: `h1` always reads larger than `h2` regardless of container.

## Do's and Don'ts

**Do**
- Reference tokens in all component CSS.
- Reserve `{colors.brand.violet}` for links, focus ring, and the single primary CTA per viewport.
- Use Inter for everything. Do not introduce a serif for "prose" moments.
- Respect the content-first measure. 44rem prose column, period.

**Don't**
- Introduce a second accent color.
- Use hero display sizes on content-interior pages. Hero is for the landing.
- Let a visual treatment override semantic markup (a styled `div` in place of `h2`).
- Add continuous/ambient motion.

---

*Derived from `src/styles/globals.css` and `src/lib/styles/`. The runtime CSS is thin (Tailwind + custom vars) — this DESIGN.md carries the discipline that Tailwind alone can't enforce.*
