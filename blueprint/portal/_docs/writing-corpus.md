# Writing corpus inventory — Signal Dispatch

**As-of:** 2026-05-25 via `find apps/blog/astro-build/src/content -name "*.md*"`
**Total published artifacts:** ~275

## Counts by collection

| Collection | Count | Purpose |
|---|---|---|
| `blog/` | 229 | Canonical Signal Dispatch posts |
| `whitepapers/` | 12 | Long-form solution-architecture pieces |
| `fiction/` | 10 | Narrative range — out-of-band voice work |
| `presentations/` | 9 | Talk decks |
| `series/` | 8 | Structured argument threads |
| `counterpoints/` | 3 | Adversarial pieces |
| `tutorials/` | 3 | Instructional content |
| `research-notes/` | 1 | Working research |

## Implications for v3

**The blog is not an aside.** 229 posts represent a thought-leadership corpus that exceeds the case-study slate by 25× in volume and is the load-bearing evidence for the "context engineer who codified a working practice" positioning. The current v3 `/writing` route surfaces 3 flagship whitepapers and an archive pointer — that's an under-representation of the actual writing posture.

**Voice range matters.** Fiction (10), counterpoints (3), and series (8) show Nino operates in multiple registers — not just thought-leadership cadence. The voice guide canonicalizes the Signal Dispatch register; the v3 site should honor that this is one of several registers, not the only one.

**The whitepapers are differentiated artifacts.** 12 long-form solution-architecture pieces are exactly the kind of substrate that supports "context engineer" claims with primary source material. These should be prominently surfaced, not just linked-to.

## Voice-guide ground truth

Canonical voice reference: `~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md` (913 lines, v1.2, distilled from the corpus). Voice-guide claimed 156-post corpus at time of writing; actual count is now 229. The guide is still the canonical reference but the count needs refresh.

## Cross-link gap

The v3 redesign does not currently surface:
- The 12 whitepapers as differentiated long-form artifacts (only 3 flagship pointed-to)
- The 8 series as structured argument threads (not surfaced at all)
- The 10 fiction pieces as voice-range evidence (not surfaced at all)
- The 9 presentations as speaking surface (not surfaced at all)

A complete v3 should give each non-`blog/` collection a surfacing — even if just as a typed link with count, so reviewers can see the breadth of writing output before clicking through.
