---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
---

# Persona — Prospective Client

A buyer with a real problem and a budget. They're not browsing; someone told
them Nino's name, or they searched for a specific capability and a Signal
Dispatch post came up, or they saw a talk and wanted to know who could be
hired to do what was described.

**Important nuance**: Nino is a full-time Product Architect at commerce.com.
The site is not a freelance-services surface. "Prospective Client" here means:

1. **Commerce.com clients / prospects** who land on Nino's site as part of
   evaluating commerce.com (he is the personal-brand surface of his role
   there, not a sales surface).
2. **Speaking / advisory inquiries** — paid advisory, paid speaking, paid
   workshops. Not staff augmentation.
3. **Methodology / Blueprint inquiries** — companies who saw Blueprint and
   want to know if Nino can apply it inside their org as an engagement.

## Snapshot

| | |
|---|---|
| **Role** | VP / Director / Head-of at a buyer org — commerce platform owner, AI strategy lead, transformation PMO |
| **Decision pressure** | Has a meeting on the calendar where they need to recommend a vendor / advisor / speaker |
| **Reads** | Skims. Looks for one verifiable receipt before opening Cal.com. |
| **Trust signal** | A named client, a shipped product, a published talk, a clear "what I do" sentence — not a thought-leadership performance |

## The visit

**Arrives at**: `/` (referral from a colleague), `/about` (LinkedIn click-through),
or a Signal Dispatch post that solved a problem they're currently scoping.

**Question they're answering**: "Could this person help me solve [specific
problem]?"

**Time budget**: 60 seconds on `/`. 3–5 minutes if they don't immediately bounce.

**Failure mode of v2**: The home page is structured around creative pursuits,
not around capabilities. A Prospective Client looking for "AI-native commerce
architecture" or "agentic transformation strategy" cannot scan the home page
and confirm Nino does that. The capabilities are real (the `/ai/` subsection
exists, `/work` exists, `constants.ts` has 9 projects), but the home page
does not foreground them in the language the buyer uses.

## What the v3 site has to do for this persona

1. **Within 10 seconds of `/`**: a one-sentence capability statement in the
   language of the buyer, not the language of the practitioner. "I help
   commerce platforms ship AI-native experiences" beats "Cut the noise,
   follow the signal."
2. **Within 30 seconds**: a named receipt — a client, a shipped product, a
   talk. Specific name beats abstract claim.
3. **Within 90 seconds**: a clear path to a scoped conversation. Cal.com
   booking link with a tight intake form, or `mailto:` with a structured
   subject template, or both. The current `mailto:nino@ninochavez.co` is
   functional but does not scope the conversation, so most Prospective
   Clients ghost rather than send a low-information cold email.
4. **By the time they leave**: confidence that the next interaction will be
   high-signal. The site should set the expectation for the conversation
   that follows.

## What v2 gets right for this persona

- `/about` is substantive and includes role context (Product Architect at
  commerce.com). Sets the "this person is currently doing the work" frame.
- LinkedIn is prominently linked — Prospective Client cohort verifies on
  LinkedIn before reaching out, so the link belongs there.
- Cal.com integration exists in the repo (`docs/CAL-COM-*`) — the infrastructure
  is in place even if the surface placement is not optimal.

## What v2 gets wrong for this persona

- The capability statement is implicit. "Cut the Noise, Follow the Signal" is a
  brand line, not a capability line.
- Creative-pursuit framing (Photography, Music, Writing, Building) reads as
  hobbyist polymath, not as specialist. The Prospective Client is buying a
  specialist; the home page sells a generalist.
- Cal.com booking is not surfaced on `/`. A Prospective Client who got to
  the point of wanting to book has to hunt for the booking link.
- The `mailto:` is unstructured. The cold email becomes a low-information
  exchange that wastes the first round.
- No named clients. commerce.com is the day-job context but is not stated
  on `/`. Per `_external-corpus.md`, working products exist (Rally HQ live,
  Signal X Studio live) — but a Prospective Client doesn't intuit these as
  "client work" unless told.

## Receipts that already exist for this persona

- **commerce.com role** — Product Architect (per global CLAUDE.md context).
  Surface this *somewhere*, not just `/about`.
- **Rally HQ at rallyhq.app** — live tournament platform serving real
  tournaments. A buyer recognizes "live product with users" instantly.
- **Signal X Studio at signalx.studio** — live studio identity surface.
- **630 Volleyball platform** (subcontractor role) — esign / cci / vbranking
  / design-system. Demonstrates B2B product delivery.
- **Signal Dispatch** — 277 published posts. Long-form proves the thinking
  is durable, not performance.
- **Speaking history** — surfacing a talk list would be the single highest-
  leverage Prospective Client move. Not currently present on the site.

The v3 prescription must do two things for this persona:

1. State the capability in the buyer's language above the fold.
2. Make the scoped-conversation path single-click.

## Decisive signal — visit was "worth it"

The Prospective Client leaves with:
- A Cal.com booking confirmed, **or**
- A structured `mailto:` sent with subject template populated, **or**
- A LinkedIn message sent referencing a specific page on the site, **or**
- A return-visit with a colleague (the buyer often loops in a peer before
  the introduction call)

If the only signal is "they visited and left without contacting," v2 has
failed this persona — and currently does.
