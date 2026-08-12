---
# Nino Chavez Portfolio (SvelteKit) — ninochavez.com
# Personal brand surface. Answer Engine Optimization (AEO) proof-of-concept.
schemaVersion: 1
name: Nino Chavez Portfolio
tagline: Personal portfolio — Nino Chavez, Chicago
mode: dark

# FLAT BY REQUIREMENT, not by preference. impeccable's design-system reader
# (`addColorObject`) takes only string values one level under `colors:` — it does
# not recurse. Nesting these under brand:/neutral:/semantic: parses to ZERO colors
# and `design-system-color` abstains silently, which is what happened here from
# 2026-04-22 until 2026-07-27. Human grouping lives in comments and in `roles:`.
colors:
  # Ground
  brandDark:   "#0a0a0f"    # near-black, 2% hue shift toward blue
  brandLight:  "#f0f0f5"    # near-white, matched hue to dark

  # Accent — one ink. See DIRECTION.md ledger, `lime-accent`.
  brandLime:   "#a3e635"    # THE accent — Tailwind lime-400
  brandLimeHi: "#84cc16"    # lime-500, pressed/active only

  # Neutral ramp (Tailwind neutral).
  neutral50:  "#fafafa"
  neutral100: "#f5f5f5"
  neutral200: "#e5e5e5"
  neutral300: "#d4d4d4"
  neutral400: "#a3a3a3"
  neutral500: "#737373"
  neutral600: "#525252"
  neutral700: "#404040"
  neutral800: "#262626"
  neutral900: "#171717"
  neutral950: "#0a0a0a"

  # Semantic
  success: "#22c55e"
  warning: "#f59e0b"
  error:   "#ef4444"
  info:    "#3b82f6"

# Role bindings. Documentary — impeccable does not read this block.
roles:
  surfaces:
    background: "{colors.brandDark}"
    surface:    "{colors.neutral900}"
    card:       "{colors.neutral900}"
    elevated:   "{colors.neutral800}"
    border:     "{colors.neutral800}"
  text:
    primary:   "{colors.brandLight}"
    secondary: "{colors.neutral300}"
    muted:     "{colors.neutral400}"
    link:      "{colors.brandLime}"
    linkHover: "{colors.brandLimeHi}"

# Roles sit directly under `typography:` and name the stack in `fontFamily`, because
# impeccable's `addTypographyFonts` walks `typography.<role>.fontFamily` and ignores
# anything else. Nested under a `fonts:` key with a `family:` field it parsed to zero
# fonts, so `design-system-font` abstained the same way `design-system-color` did.
typography:
  display:
    fontFamily: '"Bebas Neue", ui-sans-serif, system-ui, sans-serif'
    weights: [400]
  body:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    weights: [400, 500, 600]
  mono:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    weights: [400, 500, 700]

  scale:
    # Shipped value. The hero is a full-bleed Bebas statement that scales to the
    # viewport, not a large heading — the previous "…, 5rem)" ceiling described a
    # site that has not existed since the January 2026 redesign.
    hero:    "clamp(3rem, 15vw, 14rem)"
    heroMin: "3rem"       # clamp floor — enumerated so the fluid range is declared,
    heroMax: "14rem"      # not just implied. Endpoints are the decision here.
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

> **Historical production record.** This file describes the prior SvelteKit-era
> system and remains useful for provenance. The canonical design-system owner is
> `docs/claude-design-system.md` (the rationed system), shipped to production
> 2026-08-05; current tokens live in `app/globals.css`. The round-04 candidate at
> `art-direction/round-04-portfolio-system/SYSTEM.md` was withdrawn and is
> historical evidence. Do not combine palettes, type roles, or component rules
> across any of these documents.

## Overview

Personal portfolio + AEO (Answer Engine Optimization) proof-of-concept. The site is a working demonstration of structured content that AI models (ChatGPT, Claude, Gemini) can definitively answer from — so the visual system is deliberately **content-forward** rather than spectacle-driven. Dark default with a single lime accent; Inter throughout; generous reading measure.

> **Accent history.** This document declared violet (`#8b5cf6`) from 2026-04-22 to
> 2026-07-27. The site had shipped lime since 2026-01-30 (`c4f859e`, *"Redesign one-pager
> with lime/black color scheme"*), so the declaration never described the running site; the
> 2026-05-25 v3 archive re-canonized it while restoring lime code. Corrected to match the
> decision that was actually made. Violet survives on `/work`, `/privacy` and in the footer
> — 18 usages on surfaces that have no direction record yet, and off-system as of this edit.

This is the authoritative "who is Nino" surface. The sibling properties are:

- **`nino-chavez-gallery`** — volleyball action-sports photography (charcoal + gold, Montserrat)
- **`nino-chavez-labs`** — experimental apps hub (purple + DM Sans, gradient-heavy)

Each has its own visual system; they share "dark default" but are **not** visually cousin-ish. Links between them use the active site's accent color, not the destination's.

## Colors

- **`{colors.brandDark}` (#0a0a0f)** — the canvas. 2% hue shift toward blue from pure black — subtle cool cast.
- **`{colors.brandLime}` (#a3e635 / lime-400)** — the single saturated accent. Links, primary CTA, focus ring, accent graphics. Do not introduce a second brand color.
- **`{colors.brandLight}` (#f0f0f5)** — body text. Not pure white; hue-matched to the dark canvas for less optical glare.
- **Neutral ramp** carries the entire surface hierarchy between background and text.

## Typography

**Bebas Neue for display, Inter for everything else.** Bebas carries the hero and every card
title (`.font-display`, `.hero-text`); it is self-hosted in `static/fonts` with
`font-display: optional` specifically because swapping into it at hero size measured ~0.138
CLS. Inter runs body and UI at 400–600. JetBrains Mono is the third face, reserved for the
tracked micro-labels. Three faces, one job each — do not add a fourth.

*(This section previously read "Inter everywhere… no secondary display font," which was
never true of the shipped site: Bebas has been the display face across `/`, `/about`,
`/now` and `/links`. Corrected 2026-07-27 when `design-system-font` ran for the first time
and reported it.)*

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
- Reserve `{colors.brandLime}` for links, focus ring, and the single primary CTA per viewport.
- Keep to the three declared faces: Bebas Neue (display), Inter (body/UI), JetBrains Mono (micro-labels). Do not introduce a fourth, and do not reach for a serif for "prose" moments.
- Respect the content-first measure. 44rem prose column, period.

**Don't**
- Introduce a second accent color.
- Use hero display sizes on content-interior pages. Hero is for the landing.
- Let a visual treatment override semantic markup (a styled `div` in place of `h2`).
- Add continuous/ambient motion.

---

*Derived from `src/styles/globals.css` and `src/lib/styles/`. The runtime CSS is thin (Tailwind + custom vars) — this DESIGN.md carries the discipline that Tailwind alone can't enforce.*
