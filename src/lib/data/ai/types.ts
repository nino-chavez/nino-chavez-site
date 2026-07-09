/**
 * /ai data layer — the typed shapes behind every /ai surface.
 *
 * Hard rule (03-design-brief.md §2, D5): no content fact lives in markup.
 * Track content, artifact metadata, stats, and links all live here; volatile
 * facts carry `verified` dates covered by the staleness gate
 * (scripts/ai-freshness/claim-lint.mjs).
 */

/** Honest access verbs — what a visitor can actually do today.
 *  `live` = a real product a visitor can use (sensor-backed), never a
 *  reachable-but-gated surface (06-triage.md, 2026-07-08). */
export type AccessLabel = 'live' | 'install' | 'clone' | 'read' | 'gated';

export type TrackId =
  | 'explorer'
  | 'builder'
  | 'architect'
  | 'strategist'
  | 'author'
  | 'voice'
  | 'enterprise';

/** One shipped artifact in the evidence registry (ONE array drives /ai/work,
 *  the front-door proof strip, and every in-track EvidenceLink). */
export interface Artifact {
  id: string;
  name: string;
  /** Plain-language what-it-is — every coined name glossed (voice rule 1). */
  gloss: string;
  access: AccessLabel;
  /** Qualifier rendered with the label, e.g. "BigCommerce merchants" for gated. */
  accessNote?: string;
  /** Primary link a visitor follows (repo, live URL, or npm page). */
  href: string;
  /** Command shown for install-verb artifacts. */
  command?: string;
  /** Live product URL probed by the liveness sensor (may differ from href). */
  liveUrl?: string;
  /** GitHub repo (owner/name) when public — drives derived fields. Private
   *  repos omit this and derive from the liveness probe only. */
  repo?: string;
  /** Derived at build from the GitHub API when `repo` is set. */
  pushedAt?: string;
  /** Last sensor pass (YYYY-MM-DD). Stale beyond threshold fails CI. */
  verified: string;
  /** Tracks this artifact grounds. 'method' = cross-cutting. */
  tracks: (TrackId | 'method')[];
  /** Featured on the front-door proof strip. */
  featured?: boolean;
}

/** A typed content section inside a track level — the normalized shape that
 *  replaced the old corpus's ~45 bespoke per-level field names
 *  (research/current-state/surface-audit.md §b). */
export interface LevelSection {
  label: string;
  kind: 'list' | 'keyval' | 'flow';
  /** list: plain items; keyval: "Term — description" pairs; flow: ordered steps. */
  items: string[];
}

export interface TrackLevel {
  /** 0-4 (five levels; "Level 5" never exists — learn page count is honest). */
  level: number;
  title: string;
  duration: string;
  goal: string;
  /** The single completion criterion a learner can self-check. */
  checkpoint: string;
  sections: LevelSection[];
}

/** A grounding binding: the shipped artifact that demonstrates this track's
 *  AI application — shown, not asserted. References the registry by id. */
export interface Grounding {
  artifactId: string;
  /** Why THIS artifact proves THIS track, one sentence. */
  role: string;
}

export interface Track {
  id: TrackId;
  title: string;
  /** Verbatim from the original taxonomy (judged sound; port intact). */
  tagline: string;
  description: string;
  finalArtifact: string;
  timeline: string;
  hero: {
    h1: string;
    subhead: string;
  };
  whoFor: {
    for: string[];
    notFor: string[];
  };
  /** Optional named concept block (Explorer's Cognitive Mirror, Architect's
   *  Voice Shift, Enterprise's Skills vs Prompts...). */
  keyConcept?: {
    title: string;
    body: string;
  };
  grounding: Grounding[];
  levels: TrackLevel[];
  /** Self-serve next actions (P7) — no mailto, ever. */
  cta: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
}
