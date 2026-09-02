/**
 * Canonical career data — the single owner for employment history, education,
 * and sourced career metrics. Renderers (the /cv route, the Google Doc master
 * CV, the ATS one-pager, LinkedIn paste-copy) consume this module; none of
 * them may state a career fact this file doesn't carry.
 *
 * Provenance: synthesized 2026-08-08 from four evidence harvests — the Drive
 * resume corpus (7 docs, 2012–2026), workspace resume files, a live LinkedIn
 * capture (2026-08-08), and this repo's person/experience API routes. The
 * conflict register with per-source citations lives in the session scratchpad
 * (conflicts-register.md, 2026-08-08).
 *
 * Rules:
 * - Every metric carries `source` and `sourceStatus`. 'claimed' means it comes
 *   from a prior resume/profile and has not been re-derived against an
 *   artifact; 'verified' means it has. Public surfaces must not label a
 *   claimed number as verified.
 * - Numbers still contested between sources live in `openQuestions`, never in
 *   bullets — a renderer cannot show a number this file hasn't resolved.
 * - Counts that grow over time (essay count, years of experience) are derived
 *   at render time from `careerStartYear` and writing-data.json — never
 *   hand-written here. Three stale hand-written counts across old docs
 *   (156/200+/230 essays) are why this rule exists.
 * - `practice` entries are POINTERS into the work registry (data.ts). Claims
 *   and states stay owned there; duplicating them here is drift.
 * - Follow-up (not yet done): app/api/experience.json and app/api/person.json
 *   should derive from this file instead of hand-maintaining the same facts.
 */

export type SourceStatus = "verified" | "claimed";

export type Metric = {
  value: string;
  label: string;
  source: string;
  sourceStatus: SourceStatus;
};

export type Bullet = {
  text: string;
  metrics?: Metric[];
  /** work-registry slugs or URLs a reader can inspect */
  evidence?: string[];
  /** renderer filters — tailoring is deletion by tag, never rewriting */
  tags?: string[];
};

export type PositionKind = "employment" | "contract" | "volunteer";

export type Position = {
  kind: PositionKind;
  org: string;
  /** public practice title (site register) */
  title: string;
  /** HR/official title when it differs — LinkedIn Experience entries keep this */
  officialTitle?: string;
  /** YYYY-MM; null end = current */
  start: string;
  end: string | null;
  location?: string;
  summary?: string;
  bullets: Bullet[];
  tags?: string[];
};

export const identity = {
  name: "Nino Chavez",
  alternateName: "Antonino Chavez",
  location: "Chicago, IL",
  email: "nino@ninochavez.co",
  // Phone stays out of this file — the repo is public and the site never
  // renders it. The Doc/ATS renderers in Drive carry it directly.
  site: "https://ninochavez.co",
  // Both handles verified 2026-08-08: LinkedIn from the live profile capture;
  // GitHub via API (nino-chavez: created 2015, 47 public repos; the
  // unhyphenated `ninochavez` account is empty and not the real one).
  linkedin: "https://www.linkedin.com/in/nino-chavez/",
  github: "https://github.com/nino-chavez",
  soundcloud: "https://soundcloud.com/ni-no-cha-vez",
  headlines: {
    site: "Product architect + builder",
    // live on LinkedIn as of 2026-08-08 capture
    linkedin:
      "Product Architect + Builder | AI-native products, tools, and delivery methods",
    // Resume-2026-AI summary opener (Drive, 2026-05-31)
    ats: "Solution Architect and AI Product Builder",
  },
} as const;

/** Years of experience derive from this — never hand-write "25+ years". */
export const careerStartYear = 1999;

export function yearsOfPractice(now: Date = new Date()): number {
  return now.getFullYear() - careerStartYear;
}

/**
 * Nino's own locked claims — LinkedIn profile curation audit, 2026-07-31
 * (~/Documents/LInkedIn Profile/linkedin-profile-audit.md). Locked means the
 * prose rewrite must keep them exact; it does not mean re-derived. The audit's
 * "$20M+" was resolved to $25M by operator attestation 2026-08-08; the live
 * LinkedIn About was updated to $25M on 2026-08-09 (verified in the edit form).
 */
export const precisionLocks = [
  "100+ people",
  "$25M commerce re-platform",
  "sixteen years in enterprise codebases",
  "ten years as an architect and consultant",
  "a photography portfolio serving 20,000 images",
  "current role and company",
  "Blueprint's status as an open-source methodology and CLI",
] as const;

export const positions: Position[] = [
  {
    kind: "employment",
    org: "commerce.com",
    title: "Product Architect",
    // Both titles are real (operator, 2026-08-08): Workday says Product
    // Architect; a re-org moved the seat from the Product team to Global
    // Services as Enterprise Solution Architect. LinkedIn keeps the org seat;
    // the site keeps Product Architect.
    officialTitle: "Enterprise Solution Architect",
    start: "2026-01",
    end: null,
    location: "Greater Chicago Area",
    summary:
      "Designing AI-native products and features for the commerce platforms that power modern retail.",
    bullets: [
      {
        text: "Define product architecture for enterprise commerce platforms, aligning AI-assisted delivery patterns with product strategy.",
        tags: ["current"],
      },
    ],
    tags: ["current"],
  },
  {
    kind: "employment",
    org: "Accenture Song",
    // Display title from live LinkedIn; HR title confirmed by operator
    // 2026-08-08 — resume/ATS surfaces use officialTitle.
    title: "Enterprise Architect & Strategic Advisor",
    officialTitle: "Senior Manager, Commerce Advisory",
    start: "2023-02",
    end: "2026-01",
    location: "Greater Chicago Area",
    bullets: [
      {
        text: "Led eCommerce transformations for global brands, translating business needs into technology roadmaps for large-scale SAP Commerce Cloud implementations.",
        tags: ["consulting", "commerce"],
      },
      {
        // Kept qualitative on purpose: the 2026-07-31 audit's own rule —
        // "Do not add numbers until the owning project and attribution are
        // confirmed." Candidate outcomes are an interview item.
        text: "Advised enterprise leadership on AI-native platform adoption, cloud architecture roadmaps, and organizational transformation.",
        tags: ["consulting", "ai"],
      },
    ],
  },
  {
    kind: "employment",
    org: "Capgemini",
    title: "Managing Delivery Architect",
    start: "2021-09",
    end: "2023-02",
    location: "Chicago, IL",
    bullets: [
      {
        text: "Directed technical delivery of omni-channel commerce solutions on SAP Commerce Cloud (Azure), from design through go-live.",
        metrics: [
          {
            value: "20+",
            label: "global Agile team members managed",
            source:
              "Nino_Chavez_Resume_2025.docx; Resume 2025 (2020-vintage); Resume-2026-AI — three doc generations agree",
            sourceStatus: "claimed",
          },
        ],
        tags: ["delivery", "commerce"],
      },
      {
        text: "Established technical standards and reusable architecture patterns across global delivery centers.",
        tags: ["delivery"],
      },
    ],
  },
  {
    kind: "employment",
    org: "Peapod Digital Labs",
    title: "Domain Architect, Digital & eCommerce",
    // Start Dec 2020 per the contemporaneous Resume 2021 (written during the
    // role) and every later doc; the 2022 PDF's "May 2020" is the outlier.
    start: "2020-12",
    end: "2021-09",
    location: "Chicago, IL",
    bullets: [
      {
        text: "Led implementation of scalable microservices for online grocery platforms and drove architecture strategy across web, mobile, and fulfillment integration layers.",
        tags: ["architecture", "grocery"],
      },
    ],
  },
  {
    kind: "employment",
    org: "Accenture Interactive",
    // Contemporaneous resumes (2021, 2022) say Senior Solution Architect;
    // LinkedIn says Managing Enterprise Architect — see openQuestions.
    title: "Senior Solution Architect",
    officialTitle: "Managing Enterprise Architect",
    start: "2018-05",
    end: "2020-12",
    location: "Chicago, IL",
    bullets: [
      {
        // The flagship engagement. Figures resolved by operator attestation
        // 2026-08-08 (closing the $10M/$20M+/$25M and 20-30+/100+ variance).
        // Client stays anonymized — the disclosure test is public + attributable.
        text: "Architected and delivered a $25M multi-brand, omni-channel commerce re-platform — an SAP Commerce Cloud migration with a re-platform to the Spartacus composable storefront — for a North American retailer, leading 100+ global technical and functional resources across an 18-month engagement.",
        metrics: [
          {
            value: "$25M",
            label: "program budget",
            source:
              "operator attestation 2026-08-08 (resolves $10M resumes / $20M+ LinkedIn / $25M site variance)",
            sourceStatus: "claimed",
          },
          {
            value: "100+",
            label: "global technical and functional resources",
            source:
              "operator attestation 2026-08-08; matches live LinkedIn About and site experience.json",
            sourceStatus: "claimed",
          },
          {
            value: "18 months",
            label: "engagement duration",
            source:
              "operator attestation 2026-08-08; matches the 'North American Multi-Brand Retailer' engagement bullet in Resume 2021/2025",
            sourceStatus: "claimed",
          },
        ],
        tags: ["architecture", "commerce", "flagship"],
      },
    ],
  },
  {
    kind: "employment",
    org: "Gorilla Group",
    title: "Enterprise Architect",
    officialTitle: "Managing Enterprise Architect",
    start: "2015-12",
    end: "2018-05",
    location: "Chicago, IL",
    bullets: [
      {
        text: "Led cross-functional teams through complex eCommerce builds on SAP Commerce, Magento, and Salesforce Commerce Cloud; advised clients on platform selection and technical roadmaps.",
        metrics: [
          {
            value: "10+",
            label: "global technical team members managed",
            source: "Resume 2025 (2020-vintage); Resume 2021 (w/references)",
            sourceStatus: "claimed",
          },
        ],
        tags: ["architecture", "commerce"],
      },
    ],
  },
  {
    kind: "employment",
    org: "Lyons Consulting Group",
    title: "Development Lead",
    start: "2015-05",
    end: "2015-12",
    location: "Chicago, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "Acquity Group (acquired by Accenture)",
    title: "Development Lead",
    start: "2010-08",
    end: "2015-05",
    location: "Chicago, IL",
    bullets: [
      {
        text: "Led global delivery teams building hybris/SAP Commerce implementations.",
        metrics: [
          {
            value: "15+ developers, 4 business analysts",
            label: "global team managed",
            source: "Resume 2025 (2020-vintage); Resume 2021 (w/references)",
            sourceStatus: "claimed",
          },
        ],
        tags: ["early-career"],
      },
    ],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "PSC Group",
    title: "Senior Technical Analyst",
    start: "2005-11",
    end: "2010-08",
    location: "Schaumburg, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "TransUnion",
    title: "Senior Technical Analyst",
    start: "2004-03",
    end: "2005-11",
    location: "Chicago, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "CNA",
    // "Technical Analyst" per Resume 2021; the 2012-vintage doc says "Senior
    // Application Specialist" for the same stint. Low stakes — rolled up on
    // every renderer — recorded here for completeness.
    title: "Technical Analyst",
    start: "2001-08",
    end: "2004-03",
    location: "Schaumburg, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "Interlink Group",
    title: "Technical Analyst",
    start: "2000-10",
    end: "2001-08",
    location: "Chicago, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "employment",
    org: "Centrifusion",
    title: "Technical Analyst",
    start: "1999-03",
    end: "2000-10",
    location: "Chicago, IL",
    bullets: [],
    tags: ["early-career", "rollup-eligible"],
  },
  {
    kind: "contract",
    org: "630 Volleyball",
    title: "Photography & Media Subcontractor",
    // Operator, 2026-08-08: started Dec 2024, ongoing. Explicitly NOT employment.
    start: "2024-12",
    end: null,
    location: "Chicago, IL",
    bullets: [
      {
        text: "Tournament photography and media production as an independent subcontractor.",
        tags: ["photography"],
      },
      {
        text: "Agent-orchestrated marketing-operations engagement (Aug 2026): rebuilt the club's website with read-only registration sync, authored consent-first automation standards for marketing to families of minors, and delivered role and pricing proposals — a five-day sprint produced by steering AI agents.",
        metrics: [
          {
            value: "38 pages",
            label: "rebuilt website, verified against live registration data",
            source:
              "630-marketing-automation repo (private): release receipts, docs/internal/ops — not independently re-run",
            sourceStatus: "claimed",
          },
          {
            value: "5 days",
            label: "engagement sprint (222 commits, 2026-08-04 to 2026-08-08)",
            source: "630-marketing-automation repo git history",
            sourceStatus: "claimed",
          },
        ],
        evidence: ["https://ninochavez.co/blog/the-depth-penalty-is-gone"],
        tags: ["ai", "delivery"],
      },
    ],
    tags: ["contract", "photography", "ai"],
  },
  {
    kind: "volunteer",
    org: "Team One Volleyball Club",
    title: "Volleyball Coach",
    start: "2013-12",
    end: "2019-05",
    location: "Aurora, IL",
    bullets: [],
    tags: ["volunteer", "volleyball"],
  },
];

/**
 * Pointers into the work registry (data.ts). Claims, states, and links stay
 * owned there. `lead: true` marks the proof surfaces that front every
 * evidence presentation (operator decision, 2026-07-08): real products a
 * visitor can use today.
 */
export const practice: { slug: string; lead?: boolean }[] = [
  { slug: "rally-hq", lead: true },
  { slug: "blueprint", lead: true },
  { slug: "nino-chavez-photography", lead: true },
  { slug: "signal-dispatch" },
  { slug: "lets-pepper" },
  { slug: "flickday" },
  { slug: "volleyrx" },
  { slug: "ways-of-working" },
  { slug: "fleet-observability" },
  { slug: "browse-tool" },
  { slug: "specchain" },
  { slug: "claude-recall" },
  { slug: "agentic-ways-of-working" },
  { slug: "repo-health-check" },
  { slug: "gha-minutes" },
  { slug: "local-dictation" },
  { slug: "forge-brand" },
  { slug: "forge-site" },
  { slug: "image-gen" },
  { slug: "render-kit" },
  { slug: "commerce-architecture" },
  { slug: "whitepapers" },
  { slug: "presentations" },
];

export const education = [
  {
    school: "DeVry Technical Institute",
    program: "Computer Information Systems",
    start: "1997",
    end: "1999",
  },
  {
    school: "Morton Community College",
    program: "Electrical Engineering",
    start: "1994",
    end: "1996",
  },
  {
    school: "University of Illinois Urbana-Champaign",
    program: "Aeronautical/Aerospace Engineering",
    start: "1993",
    end: "1994",
  },
] as const;

/** Verified absent across every source swept 2026-08-08. */
export const certifications: never[] = [];

/**
 * Skill groups — from Resume-2026-AI (Drive, 2026-05-31). `linkedinPinned` is
 * the live five-skill list captured 2026-08-08.
 */
export const skills = {
  aiAgentic: [
    "Multi-agent orchestration",
    "RAG pipelines",
    "MCP servers",
    "Embeddings (pgvector)",
    "Guardrails",
    "Claude",
    "OpenAI",
    "Gemini",
  ],
  engineering: [
    "TypeScript",
    "Python",
    "Java",
    "Next.js",
    "React",
    "SvelteKit",
    "Spring",
    "Supabase",
    "Cloudflare Workers",
  ],
  commerce: [
    "SAP Commerce Cloud / hybris",
    "Spartacus / composable storefronts",
    "Omni-channel architecture",
    "Enterprise integration",
  ],
  linkedinPinned: [
    "Solution Architecture",
    "Generative AI",
    "E-Commerce",
    "Technical Leadership",
    "Enterprise Architecture",
  ],
} as const;

/**
 * Contested facts awaiting Nino's resolution. A bullet may not carry any
 * number listed here until its entry is resolved and moved into the bullet
 * with a named source.
 */
export const openQuestions = [
  // Resolved 2026-08-08 by operator interview and moved into the data above:
  // flagship-program-figures ($25M / 100+ / 18mo), commerce-official-title
  // (Workday: Product Architect; Global Services seat: Enterprise Solution
  // Architect), song-title (Senior Manager, Commerce Advisory), 630-dates
  // (Dec 2024, ongoing).
  {
    id: "ai-era-metrics",
    question:
      "The Dec 2025 AI-native resume's claims — '48-64x productivity gains', 'production SaaS solo in 7 days', '88/100 production readiness', Capgemini '50+' team — include with a named artifact each, or drop? (Unaddressed in the 2026-08-08 interview round; they render nowhere until resolved.)",
    variants: [
      {
        value: "as listed",
        source: "~/Workspace/dev/methods/career-goals/profile/resume-nino-chavez-2025.md (2025-12-08) — no artifact named for any figure",
      },
    ],
    stakes:
      "These are the most marketable and least sourced numbers in the corpus; they also inflate figures other docs state lower (Capgemini 20+ → 50+). Precision-locks list (Jul 2026) omits them all.",
  },
  {
    id: "song-outcomes",
    question:
      "Any public, attributable outcomes from the Song years (2023-2026) to replace the qualitative bullets? Disclosure test: confidentiality survives departure, so a fact qualifies only if it is already public (case study, press release, client-approved reference) AND attributable to Nino. Anonymized scale claims pass; client names and non-public figures do not.",
    variants: [],
    stakes: "Three years of the most senior consulting work currently carry zero outcomes.",
  },
] as const;
