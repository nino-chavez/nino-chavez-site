---
canonical: true
stage: 1
status: draft
last_updated: 2026-05-25
voice_mode: internal-strategy
---

# Persona — Conference / Speaking Circuit

A program chair, content lead, or curator at a conference, podcast,
internal-summit, or vendor-event series. Their job is to fill a stage with
people who will not embarrass the program. They evaluate fast and reject
even faster.

## Snapshot

| | |
|---|---|
| **Role** | Program chair, podcast producer, conference content lead, vendor-event curator, internal-summit organizer |
| **Decision pressure** | They need to fill N speaker slots and have already received 10x N pitches |
| **Reads** | Speaker bio page first. Then: one talk video, one written piece, one prior-event credit |
| **Trust signal** | Has done this before. Has receipts. Has a POV that's already published, not "coming soon" |

## The visit

**Arrives at**: A "Speaking" page directly (if one exists — currently doesn't),
or `/about` (the closest existing analog), or a Signal Dispatch post they
were referred to with "this person might be a fit."

**Question they're answering**: "Can I confidently introduce this person to
my audience?"

**Time budget**: 30 seconds to disqualify. 2 minutes to add to the shortlist.
8 minutes to deep-dive if they're seriously considering.

**Failure mode of v2**: The site has no speaking surface. There is no:
- Speaker bio (short / medium / long-form)
- Headshot library (square, wide, with credit line)
- Talk history with topics, dates, venues
- Sample talk video or recording
- Topic-area list ("I speak about: ...")
- Booking inquiry form scoped to speaking

The Conference / Speaking Circuit persona can verify Nino is real (LinkedIn,
Signal Dispatch, working products), but cannot answer "should I book this
person to speak" without leaving the site to do that research elsewhere.
That's a lost engagement.

## What the v3 site has to do for this persona

1. **A dedicated `/speaking` (or equivalent) page**, not just an `/about`
   paragraph mentioning talks.
2. **Three bio variants**: 50-word, 100-word, 250-word — copy-pasteable so
   the curator doesn't have to rewrite anything.
3. **Headshot library**: at least one square, one wide, with explicit credit
   line if any. Direct download links, not Instagram crops.
4. **Topic-area list**: 3–7 named topics with one-sentence descriptions of
   the talk Nino can give on each.
5. **Past-talk credits if any exist**: name + venue + date + link if
   recorded. If none exist, name that explicitly — "newer to the speaking
   circuit; here's the written corpus the talks would draw from" — and
   link Signal Dispatch.
6. **Scoped inquiry path**: an email or form specifically for speaking
   requests, with the subject template populating "Speaking — [event name]
   — [date]" so the inbound is high-information.

## What v2 gets right for this persona

- `/about` exists and has substantive bio prose.
- LinkedIn link is present (curators verify there).
- Signal Dispatch demonstrates a body of published work that could seed
  talk topics.

## What v2 gets wrong for this persona

- No speaking surface at all.
- No bio variants — they'd have to rewrite from the `/about` page.
- No headshot — they'd have to ask, which is friction most curators won't
  push through.
- No topic list — they'd have to infer from blog post titles what Nino
  could speak about. Most won't bother.

## Receipts that already exist for this persona

This is the persona with the *thinnest* current-state receipt layer.
Building the speaking surface is mostly a content-authoring task, not a
salvage-and-reorganize task.

Items that exist and can be cited:
- **Signal Dispatch corpus** — 277 posts. The voice already exists; the
  speaker bio just needs to point at it.
- **Working products** — Rally HQ, Blueprint, Atelier are speakable topics
  (architect-directs-agents, methodology design, AI-native delivery).
- **Day-job context** — Product Architect at commerce.com is itself a
  credible speaker frame for commerce + AI events.

Items that need to be *authored* in Stage 2/3:
- The bio variants
- The headshot (or commit to using one of the existing photos)
- The topic-area list
- The past-talks list (or honest "writing-first, talks coming" statement)

## Decisive signal — visit was "worth it"

The Conference / Speaking Circuit persona leaves with:
- A bio copy-pasted into their slate document, **or**
- A scoped inquiry sent with venue and date populated, **or**
- A return-visit pinning the URL for a future event they're scoping

This persona is the lowest-volume of the three but the highest-leverage —
one accepted speaking slot reaches more Peer Architects and Prospective
Clients than the site itself can in months. The v3 prescription should
not treat speaking as a "nice to have" surface.
