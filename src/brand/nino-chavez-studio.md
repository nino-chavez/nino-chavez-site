# Nino Chavez ⊕ studio Design System

## Brand Identity
- **Tagline**: "Commerce architecture grounded in reality"
- **Mission**: We transform fragmented enterprise commerce systems into coherent architectures by combining deep technical analysis with proven harness engineering principles that actually work in production environments.
- **Positioning**: Unlike consultancies that deliver theoretical frameworks or agencies that focus on front-end experiences, we architect commerce systems using harness engineering discipline—where failure isn't an option and every decision must withstand real-world operational stress.
- **Audience**: VP/Director-level commerce platform leaders managing complex technical debt, Senior enterprise architects tasked with commerce system modernization, Engineering managers struggling with distributed commerce infrastructure, CTO/Head of Engineering at mid-to-large retailers facing scalability challenges, Technical product managers overseeing commerce platform evolution
- **Personality**: Evidence-driven: backs every recommendation with data and real-world examples, Self-critical: openly acknowledges limitations and questions own assumptions, Implementation-focused: prioritizes what works over what sounds impressive, Transparently direct: delivers uncomfortable truths without corporate sugar-coating, Process-methodical: breaks complex problems into systematic, repeatable approaches, Skeptically practical: challenges conventional wisdom with hands-on experience

---

## Color Palette

### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Critical Orange | `#e86c5d` | Primary accent |
| Blueprint Steel | `#4a90bb` | Secondary accent |
| Process Amber | `#d4a574` | Accent |

### Neutral Scale
| Step | Hex |
|------|-----|
| 50 | `#fafafa` |
| 100 | `#f5f5f5` |
| 200 | `#e5e5e5` |
| 300 | `#d1d5db` |
| 400 | `#a3a3a3` |
| 500 | `#6b7280` |
| 600 | `#525252` |
| 700 | `#374151` |
| 800 | `#262626` |
| 900 | `#111827` |
| 950 | `#0a0a0f` |

### Semantic Colors
| Name | Hex | Usage |
|------|-----|-------|
| Success | `#22c55e` | Positive states |
| Warning | `#f59e0b` | Caution states |
| Error | `#ef4444` | Error states |
| Info | `#3b82f6` | Informational states |

### Surfaces
| Name | Hex |
|------|-----|
| background | `#0f1419` |
| foreground | `#e8eaed` |
| card | `#111827` |
| cardForeground | `#e8eaed` |
| muted | `#1f2937` |
| mutedForeground | `#9ca3af` |
| border | `#374151` |

---

## Typography

### Font Stack
```css
--font-display: 'Roboto Slab', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', Menlo, monospace;
```

### Type Scale
| Name | Size (Desktop) | Size (Mobile) | Weight | Line Height | Font |
|------|---------------|---------------|--------|-------------|------|
| hero | 4rem | 2.5rem | 700 | 1.1 | display |
| h2 | 2.25rem | 1.75rem | 400 | 1.2 | display |
| h3 | 1.5rem | 1.25rem | 600 | 1.3 | body |
| body-lg | 1.125rem | — | 400 | 1.6 | body |
| body | 1rem | — | 400 | 1.5 | body |
| caption | 0.875rem | — | 400 | 1.5 | body |
| label | 0.75rem | — | 400 | 1.4 | mono |

---

## Spacing Scale

```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;  /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;  /* 16px */
--space-6: 1.5rem;  /* 24px */
--space-8: 2rem;  /* 32px */
--space-12: 3rem;  /* 48px */
--space-16: 4rem;  /* 64px */
--space-24: 6rem;  /* 96px */
```

---

## Layout

- **Max content width**: 48rem (768px)
- **Section padding**: space-16
- **Container padding**: space-6

### Breakpoints
| Name | Min Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## Voice & Tone

### Attributes
- **receipt-anchored**: Grounds claims in specific project outcomes and measurable results rather than theory
  > "We reduced deployment frequency from 6 weeks to 2 hours — but customer complaints actually went up 23%."
- **self-interrogating**: Questions its own assumptions mid-argument and exposes reasoning process
  > "I'm calling this a failure, but hold on — maybe I'm measuring the wrong thing entirely."
- **practitioner-candid**: Admits mistakes, uncertainty, and the messy reality of implementation without defensiveness
  > "Three clients fired us for this approach. The fourth one promoted their entire team."
- **architecturally-direct**: Cuts through enterprise jargon to expose actual technical and organizational constraints
  > "Your 'microservices transformation' is really about avoiding your database team."
- **pattern-obsessed**: Identifies recurring structures across domains, connecting commerce patterns to broader systems thinking
  > "Inventory allocation works exactly like Kubernetes resource scheduling — and fails for identical reasons."

### Avoid
- **thought-leadership-speak** (error): unlock potential, drive innovation, leverage synergies, digital transformation journey, best practices
  > Instead: Replace with specific outcomes or concrete constraints
- **consultant-certainty** (error): always, never, the key is, simply, just need to...
  > Instead: Add provisional language and acknowledge complexity
- **academic-abstraction** (warning): framework for, methodology to, approach that enables, comprehensive solution
  > Instead: Ground in specific project examples and measurable outcomes
- **vendor-neutrality** (error): leading platform, industry-standard, enterprise-grade, scalable solution
  > Instead: Name specific tools, costs, and trade-offs

### Examples
**Explaining microservices architecture benefits**
- Good: "We split checkout into 12 services — deployments dropped from 4 hours to 8 minutes, but debugging customer issues now takes 3x longer. Worth it? Depends if you value developer velocity over support team sanity."
- Bad: "Microservices architecture enables teams to deploy independently and scale components based on demand, driving innovation through decoupled systems."

**Positioning advisory services**
- Good: "I've designed commerce platforms for 47 companies. 12 of them fired me. The other 35 processed $2.3B last year using patterns I'm still refining."
- Bad: "Our proven methodology leverages industry best practices to deliver scalable commerce solutions that drive business transformation."

**Critiquing platform team effectiveness**
- Good: "Your platform team built 23 internal tools. Developers use 3 of them — and only because deployments literally won't work otherwise. The other 20 exist to justify next year's headcount."
- Bad: "Many platform teams struggle to achieve developer adoption due to insufficient stakeholder alignment and unclear value propositions."

**Describing technical trade-offs**
- Good: "Event sourcing solved our audit requirements but destroyed our junior developers' productivity. Six months later, only two people could debug production issues — and one of them quit."
- Bad: "Event sourcing provides comprehensive audit trails and enables powerful analytical capabilities, though it requires careful consideration of complexity trade-offs."

---

*Generated by brand-forge v0.1.0 on 2026-05-26T01:46:38.693Z*