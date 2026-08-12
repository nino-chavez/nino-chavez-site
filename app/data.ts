export const domains = [
  "Developer tools",
  "Local-first",
  "Volleyball",
  "Commerce",
  "Media & assets",
  "Writing",
] as const;

export const states = [
  "live",
  "maintained",
  "published",
  "building",
  "paused",
] as const;

export const forms = [
  "site",
  "cli",
  "app",
  "service",
  "repo",
  "docs",
  "toolkit",
  "experience",
  "collection",
] as const;

export type Domain = (typeof domains)[number];
export type WorkState = (typeof states)[number];
export type WorkForm = (typeof forms)[number];

export const workStateLabels: Record<WorkState, string> = {
  live: "Live",
  maintained: "Maintained",
  published: "Published",
  building: "In development",
  paused: "Paused",
};

export const workStateGlosses: Record<WorkState, string> = {
  live: "available to use now",
  maintained: "public and kept current",
  published: "available to read",
  building: "not yet released",
  paused: "not actively developed",
};

export function workStateText(state: WorkState) {
  return `${workStateLabels[state]} — ${workStateGlosses[state]}`;
}

export type WorkItem = {
  slug: string;
  name: string;
  claim: string;
  domain: Domain;
  state: WorkState;
  form: WorkForm;
  updatedAt: string;
  destination?: {
    label: string;
    href: string;
  };
  detailPage?: boolean;
  related?: string[];
};

export const workItems: WorkItem[] = [
  {
    slug: "blueprint",
    name: "Blueprint",
    claim:
      "A practical method for planning, reviewing, and checking product work done with AI agents.",
    domain: "Developer tools",
    state: "maintained",
    form: "docs",
    updatedAt: "2026-07-28",
    destination: {
      label: "Open the reference portal",
      href: "https://blueprint.ninochavez.co",
    },
    related: ["ways-of-working", "agentic-ways-of-working"],
  },
  {
    slug: "browse-tool",
    name: "Browse Tool",
    claim:
      "A command-line browser workflow that lets agents inspect real product surfaces.",
    domain: "Developer tools",
    state: "maintained",
    form: "cli",
    updatedAt: "2026-07-25",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/browse-tool",
    },
    related: ["ways-of-working"],
  },
  {
    slug: "specchain",
    name: "Specchain",
    claim:
      "A staged workflow that turns a feature request into specifications, implementation, and verification.",
    domain: "Developer tools",
    state: "maintained",
    form: "cli",
    updatedAt: "2026-07-22",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/specchain",
    },
  },
  {
    slug: "claude-recall",
    name: "Claude Recall",
    claim:
      "A local command-line index for recovering decisions and context from prior agent sessions.",
    domain: "Developer tools",
    state: "maintained",
    form: "cli",
    updatedAt: "2026-07-19",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/claude-recall-cli",
    },
  },
  {
    slug: "agentic-ways-of-working",
    name: "Agentic Ways of Working",
    claim:
      "A public set of rules and tools for delegating work to AI agents and reviewing what comes back.",
    domain: "Developer tools",
    state: "maintained",
    form: "docs",
    updatedAt: "2026-07-18",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/agentic-ways-of-working",
    },
    related: ["ways-of-working", "blueprint"],
  },
  {
    slug: "fleet-observability",
    name: "Fleet Observability",
    claim:
      "A private daily report that monitors repositories, deployments, costs, domains, and key user journeys.",
    domain: "Developer tools",
    state: "live",
    form: "service",
    updatedAt: "2026-07-12",
  },
  {
    slug: "repo-health-check",
    name: "Repo Health Check",
    claim:
      "A public command-line audit for GitHub settings, stale links, failed deployments, and neglected pull requests.",
    domain: "Developer tools",
    state: "maintained",
    form: "cli",
    updatedAt: "2026-07-11",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/repo-health-check",
    },
  },
  {
    slug: "gha-minutes",
    name: "GHA Minutes",
    claim:
      "A tool that finds wasted GitHub Actions time and cancels superseded runs without interrupting releases.",
    domain: "Developer tools",
    state: "maintained",
    form: "cli",
    updatedAt: "2026-07-10",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/gha-minutes",
    },
  },
  {
    slug: "design-qa",
    name: "Design QA",
    claim:
      "A local quality check that keeps visual exceptions tied to explicit, reviewable design decisions.",
    domain: "Developer tools",
    state: "building",
    form: "cli",
    updatedAt: "2026-07-09",
  },
  {
    slug: "ways-of-working",
    name: "Ways of Working",
    claim:
      "Published sessions and applied techniques drawn from real work with AI agents.",
    domain: "Developer tools",
    state: "live",
    form: "collection",
    updatedAt: "2026-07-30",
    destination: {
      label: "View all sessions",
      href: "/demos",
    },
    related: ["blueprint", "agentic-ways-of-working"],
  },
  {
    slug: "local-dictation",
    name: "Local Dictation",
    claim:
      "On-device speech capture and transcription designed to keep recordings local.",
    domain: "Local-first",
    state: "maintained",
    form: "app",
    updatedAt: "2026-07-27",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/local-dictation",
    },
  },
  {
    slug: "local-meeting-notes",
    name: "Local Meeting Notes",
    claim:
      "Research toward a Mac meeting notetaker that keeps audio local and ties every note back to the transcript.",
    domain: "Local-first",
    state: "building",
    form: "app",
    updatedAt: "2026-07-23",
    destination: {
      label: "Read the research source",
      href: "https://github.com/nino-chavez/meeting-notes-local",
    },
  },
  {
    slug: "rally-hq",
    name: "Rally HQ",
    claim:
      "Tournament registration, brackets, schedules, and live scoring in one public event page.",
    domain: "Volleyball",
    state: "live",
    form: "site",
    updatedAt: "2026-07-26",
    destination: {
      label: "Open Rally HQ",
      href: "https://rallyhq.app",
    },
  },
  {
    slug: "lets-pepper",
    name: "Let’s Pepper",
    claim:
      "A player-first grass volleyball tournament series with events, divisions, and photography.",
    domain: "Volleyball",
    state: "live",
    form: "site",
    updatedAt: "2026-07-24",
    destination: {
      label: "Explore the series",
      href: "https://letspepper.com",
    },
    related: ["nino-chavez-photography"],
  },
  {
    slug: "film-room",
    name: "Film Room",
    claim:
      "A local desktop app for reviewing sports and event footage, recording decisions, and preparing editor-ready outputs.",
    domain: "Volleyball",
    state: "building",
    form: "app",
    updatedAt: "2026-07-21",
  },
  {
    slug: "flickday",
    name: "Flickday Media",
    claim:
      "Grassroots sports media with on-site tournament photography, quick-turn reels, and same-day photo drops.",
    domain: "Volleyball",
    state: "live",
    form: "site",
    updatedAt: "2026-07-31",
    destination: {
      label: "Visit Flickday Media",
      href: "https://www.flickdaymedia.com/",
    },
  },
  {
    slug: "volleyrx",
    name: "Volley Rx",
    claim:
      "Professionally organized volleyball tournaments across the Chicagoland area.",
    domain: "Volleyball",
    state: "live",
    form: "site",
    updatedAt: "2026-07-31",
    destination: {
      label: "Browse Volley Rx events",
      href: "https://www.volleyrx.com/",
    },
  },
  {
    slug: "commerce-architecture",
    name: "Commerce architecture",
    claim:
      "25+ years designing and delivering commerce platforms across retail, B2B, grocery, and multi-brand businesses.",
    domain: "Commerce",
    state: "published",
    form: "experience",
    updatedAt: "2026-07-31",
  },
  {
    slug: "bc-subscriptions",
    name: "BC Subscriptions",
    claim:
      "A subscription engine demonstrated on a live BigCommerce store — billing, dunning recovery, and a self-serve subscriber portal, with the Kibble & Co demo storefront to walk through.",
    domain: "Commerce",
    state: "live",
    form: "site",
    updatedAt: "2026-08-12",
    destination: {
      label: "Open the BC Subscriptions demo",
      href: "https://marketing.bcsubs.app/",
    },
    related: ["commerce-architecture"],
  },
  {
    slug: "forge-brand",
    name: "Forge Brand",
    claim:
      "A system for turning approved brand direction into reusable colors, type, components, and visual assets.",
    domain: "Media & assets",
    state: "maintained",
    form: "toolkit",
    updatedAt: "2026-07-17",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/forge-brand",
    },
  },
  {
    slug: "forge-site",
    name: "Forge Site",
    claim:
      "A site-building playbook that matches client needs to proven archetypes, modules, and delivery steps.",
    domain: "Media & assets",
    state: "maintained",
    form: "toolkit",
    updatedAt: "2026-07-06",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/forge-site",
    },
  },
  {
    slug: "image-gen",
    name: "Image Gen",
    claim:
      "Tools for generating images with AI or rendering them from reusable HTML templates.",
    domain: "Media & assets",
    state: "maintained",
    form: "toolkit",
    updatedAt: "2026-07-04",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/image-gen",
    },
  },
  {
    slug: "render-kit",
    name: "Render Kit",
    claim:
      "Tools for producing consistent graphics and walkthroughs across sites and campaigns.",
    domain: "Media & assets",
    state: "maintained",
    form: "toolkit",
    updatedAt: "2026-07-03",
    destination: {
      label: "Read the source",
      href: "https://github.com/nino-chavez/render-kit",
    },
  },
  {
    slug: "nino-chavez-photography",
    name: "Nino Chavez Photography",
    claim:
      "Volleyball action photography organized so players can find, download, and keep their frames.",
    domain: "Media & assets",
    state: "live",
    form: "site",
    updatedAt: "2026-07-02",
    destination: {
      label: "Open the photography collection",
      href: "/photography",
    },
    related: ["lets-pepper"],
  },
  {
    slug: "signal-dispatch",
    name: "Signal Dispatch",
    claim:
      "Essays, fiction, tutorials, and research on architecture, commerce, and AI-assisted work.",
    domain: "Writing",
    state: "live",
    form: "collection",
    updatedAt: "2026-07-30",
    destination: {
      label: "Read the publication",
      href: "/blog",
    },
  },
  {
    slug: "whitepapers",
    name: "Whitepapers",
    claim:
      "Longer-form arguments and field guides published alongside the essay archive.",
    domain: "Writing",
    state: "published",
    form: "collection",
    updatedAt: "2026-06-28",
    destination: {
      label: "Browse whitepapers",
      href: "/blog?type=Whitepaper",
    },
    detailPage: false,
  },
  {
    slug: "presentations",
    name: "Presentations",
    claim:
      "Published decks that turn working decisions into material other practitioners can use.",
    domain: "Writing",
    state: "published",
    form: "collection",
    updatedAt: "2026-06-26",
    destination: {
      label: "Browse presentations",
      href: "/blog?type=Presentation",
    },
    detailPage: false,
  },
];

export function workHref(item: WorkItem) {
  return item.detailPage === false && item.destination
    ? item.destination.href
    : `/work/${item.slug}`;
}

export type LearnLevel = {
  title: string;
  duration: string;
  goal: string;
  checkpoint: string;
};

export type LearnEvidence = {
  kind: "Work" | "Session" | "Technique" | "Writing";
  title: string;
  href: string;
  note: string;
};

export type LearnTrack = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  startWhen: string;
  finalArtifact: string;
  timeline: string;
  whoFor: string[];
  notFor: string[];
  concept: {
    title: string;
    description: string;
  };
  levels: LearnLevel[];
  evidence: LearnEvidence[];
};

export const learnTracks: LearnTrack[] = [
  {
    slug: "explorer",
    title: "Explorer",
    tagline: "Use AI to understand yourself",
    description:
      "Before you use AI to produce, use it to reflect. Build cognitive mirrors that show you how you think.",
    startWhen:
      "You need to understand how you think before choosing what to build.",
    finalArtifact: "Personal cognitive mirror and bridge to creation",
    timeline: "4–8 weeks",
    whoFor: [
      "You are curious about AI but do not have a specific project yet.",
      "You want to understand how you think, not just collect answers.",
      "You already journal or reflect and want a practical place to begin.",
    ],
    notFor: [
      "You already know what you need to build.",
      "You need to ship a working product next week.",
      "You want AI to do the thinking for you.",
    ],
    concept: {
      title: "The cognitive mirror",
      description:
        "AI reflects your thinking back to you. It can reveal patterns in how you frame, revise, and decide; it does not decide what you should think.",
    },
    levels: [
      {
        title: "Notice your prompts",
        duration: "1–2 days",
        goal: "Observe how you already ask, revise, and respond.",
        checkpoint:
          "You can explain what made one prompt useful and another one weak.",
      },
      {
        title: "Build your first mirror",
        duration: "1 week",
        goal: "Create one repeatable prompt that reflects your thinking.",
        checkpoint:
          "You have a working mirror prompt and an example of what it revealed.",
      },
      {
        title: "Iterate and version",
        duration: "1–2 weeks",
        goal: "Change the mirror in response to what its output misses.",
        checkpoint:
          "You have a second or third version and can name what changed.",
      },
      {
        title: "Use multiple modes",
        duration: "2–3 weeks",
        goal: "Build different mirrors for different kinds of decisions.",
        checkpoint:
          "You have at least three prompts for distinct situations.",
      },
      {
        title: "Move from reflection to creation",
        duration: "Ongoing",
        goal: "Use what you learned about your thinking to make something.",
        checkpoint:
          "You have created an artifact another person can read, use, or test.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Claude Recall",
        href: "/work/claude-recall",
        note: "A local index for recovering decisions and patterns from prior sessions.",
      },
      {
        kind: "Session",
        title: "Your Sessions Are a Corpus",
        href: "/demos/session-corpus",
        note: "The working session that turns prior exchanges into usable evidence.",
      },
      {
        kind: "Writing",
        title: "The Taste Gap",
        href: "/blog#the-taste-gap",
        note: "An argument for keeping judgment and selection human.",
      },
    ],
  },
  {
    slug: "builder",
    title: "Builder",
    tagline: "Build production apps with AI",
    description:
      "Move from an AI-assisted prototype to a working system with specifications, review points, and operating evidence.",
    startWhen:
      "You need to turn an AI-assisted prototype into a production application.",
    finalArtifact: "Deployed production application",
    timeline: "8–12 weeks",
    whoFor: [
      "You are a developer who learns by building.",
      "You want production behavior, not another isolated demo.",
      "You are comfortable with JavaScript, TypeScript, or web applications.",
    ],
    notFor: [
      "You want a passive curriculum.",
      "You need a certificate rather than a working artifact.",
      "You are not ready to review generated code and product decisions.",
    ],
    concept: {
      title: "The application is the receipt",
      description:
        "A credible build path ends in deployed behavior another person can inspect. Prompts, screenshots, and passing checks support that claim; none replaces the running product.",
    },
    levels: [
      {
        title: "Orientation",
        duration: "1–2 days",
        goal: "Learn the roles models, retrieval, and agents can play.",
        checkpoint:
          "You can explain the difference between a model, retrieval, and an agent workflow.",
      },
      {
        title: "Ship your first AI app",
        duration: "1 week",
        goal: "Build and deploy one narrow end-to-end behavior.",
        checkpoint:
          "Another person can open the application and complete its main action.",
      },
      {
        title: "Add specs, data, and workflows",
        duration: "2–4 weeks",
        goal: "Make product intent and state durable outside the model.",
        checkpoint:
          "The application has a specification, persistent data, and an explicit access boundary.",
      },
      {
        title: "Use multiple models and tools",
        duration: "4–8 weeks",
        goal: "Move from a chatbot response to a bounded agent workflow.",
        checkpoint:
          "The system can choose and use a tool without gaining unbounded authority.",
      },
      {
        title: "Operate the production system",
        duration: "8+ weeks",
        goal: "Measure cost, behavior, failures, and output quality.",
        checkpoint:
          "You can inspect runtime metrics and validate important outputs at their source.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Rally HQ",
        href: "/work/rally-hq",
        note: "A live product and event operation built and run as one system.",
      },
      {
        kind: "Session",
        title: "The Browser Is a Shell Command",
        href: "/demos/browse-tool",
        note: "A practical example of giving an agent a repeatable inspection tool.",
      },
      {
        kind: "Writing",
        title: "The Scaffolding the Agent Doesn’t Build",
        href: "/blog#the-scaffolding-the-agent-doesnt-build",
        note: "Why generated output still needs human judgment and operating structure.",
      },
    ],
  },
  {
    slug: "architect",
    title: "Architect",
    tagline: "Design systems someone else can build",
    description:
      "Capture structure, constraints, and decisions in architecture documentation that remains useful while the system changes.",
    startWhen:
      "You need documentation another person can build from without asking you to reconstruct the system.",
    finalArtifact:
      "Complete system architecture using arc42, a standard template for documenting software architecture",
    timeline: "8–12 weeks",
    whoFor: [
      "You design systems that other people need to understand or extend.",
      "Important decisions are disappearing into meetings, chats, or code.",
      "You need system views, decision records, and one coherent reference.",
    ],
    notFor: [
      "You only need a sales diagram.",
      "You want documentation generated without inspecting the system.",
      "No one will own the reference after it is written.",
    ],
    concept: {
      title: "The voice shift",
      description:
        "Architecture reference is definitive about the current system and explicit about uncertainty. It records decisions and constraints; it does not perform confidence it has not earned.",
    },
    levels: [
      {
        title: "Learn the templates",
        duration: "1–2 days",
        goal:
          "Understand where C4 system views, the arc42 documentation template, and decision records each fit.",
        checkpoint:
          "You can explain the four C4 system-view levels and when a decision needs its own record.",
      },
      {
        title: "Document an existing system",
        duration: "1–2 weeks",
        goal: "Recover the system that already exists.",
        checkpoint:
          "You have a context view, container view, and three grounded decision records.",
      },
      {
        title: "Capture decisions as they happen",
        duration: "2–3 weeks",
        goal: "Make architectural choices reviewable while they are still changing.",
        checkpoint:
          "Five active decisions record context, choice, and consequence.",
      },
      {
        title: "Complete the architecture",
        duration: "3–4 weeks",
        goal: "Connect views, constraints, risks, and operations in one reference.",
        checkpoint:
          "Another practitioner can use the document to plan a build or change.",
      },
      {
        title: "Document cross-system integration",
        duration: "4+ weeks",
        goal: "Make boundaries and failure modes visible across systems.",
        checkpoint:
          "The reference names ownership, contracts, and failure behavior at every boundary.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Blueprint",
        href: "/work/blueprint",
        note: "A repository-native method with durable decisions and explicit gates.",
      },
      {
        kind: "Technique",
        title: "Two Ways to Draw a System",
        href: "/demos/applied/two-ways",
        note: "Choose diagram form by audience and rate of change.",
      },
      {
        kind: "Writing",
        title: "Who Reviewed the Reviewer?",
        href: "/blog#who-reviewed-the-reviewer",
        note: "A test of review systems against the human intent they are meant to preserve.",
      },
    ],
  },
  {
    slug: "strategist",
    title: "Strategist",
    tagline: "Turn evidence into a decision",
    description:
      "Write consulting-grade briefs that lead with an answer, show the evidence, compare options, and make the next decision clear.",
    startWhen:
      "You need scattered evidence to become a decision-ready recommendation.",
    finalArtifact: "Executive-ready strategic brief",
    timeline: "6–10 weeks",
    whoFor: [
      "You advise people who need to make consequential decisions.",
      "Your source material crosses products, teams, or domains.",
      "You need a point of view that another person can test.",
    ],
    notFor: [
      "You want a summary with no recommendation.",
      "You cannot show where important claims came from.",
      "The decision and its owner are still undefined.",
    ],
    concept: {
      title: "Consultant voice",
      description:
        "A strategic brief synthesizes complexity into an actionable recommendation. Confidence comes from traceable evidence, named tradeoffs, and a clear decision—not from tone alone.",
    },
    levels: [
      {
        title: "Learn consultant voice",
        duration: "1–2 days",
        goal: "Recognize writing that leads with the decision.",
        checkpoint:
          "You can identify five patterns that make a brief easier to act on.",
      },
      {
        title: "Write your first point of view",
        duration: "1–2 weeks",
        goal: "Turn one body of evidence into a defensible recommendation.",
        checkpoint:
          "The document states what should happen, why, and what would change your mind.",
      },
      {
        title: "Find cross-domain patterns",
        duration: "2–3 weeks",
        goal: "Distinguish a reusable pattern from a local coincidence.",
        checkpoint:
          "The brief tests a pattern against evidence from at least three contexts.",
      },
      {
        title: "Compare strategic options",
        duration: "2–3 weeks",
        goal: "Make alternatives and tradeoffs visible.",
        checkpoint:
          "The brief includes an options matrix and a recommended choice.",
      },
      {
        title: "Write for executive depth",
        duration: "3+ weeks",
        goal: "Support a fast decision without hiding the underlying work.",
        checkpoint:
          "The same recommendation works as a summary and as a sourced appendix.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Signal Dispatch",
        href: "/work/signal-dispatch",
        note: "A publication that turns operating evidence into durable points of view.",
      },
      {
        kind: "Session",
        title: "The Chiropractor’s Four Questions",
        href: "/demos/four-questions",
        note: "A diagnostic structure for finding the real constraint in a research brief.",
      },
      {
        kind: "Writing",
        title: "Agentic Commerce Field Guide",
        href: "/blog#agentic-commerce-field-guide",
        note: "A long-form field guide organized around an emerging operating decision.",
      },
    ],
  },
  {
    slug: "author",
    title: "Author",
    tagline: "Build a reference, not a pile of chapters",
    description:
      "Create a multi-chapter body of work with a durable structure, consistent voice, and reference material people can reuse.",
    startWhen:
      "You need a durable multi-chapter reference rather than another standalone article.",
    finalArtifact: "Multi-volume playbook of 20,000+ words",
    timeline: "12–20 weeks",
    whoFor: [
      "You have a substantial body of knowledge to organize.",
      "Readers need templates, examples, and reference material—not only narrative.",
      "You want the whole work to sound like one author.",
    ],
    notFor: [
      "One article can do the job.",
      "You have not decided who the reference is for.",
      "You want generated volume without editorial ownership.",
    ],
    concept: {
      title: "Playbook versus post",
      description:
        "A playbook is a system of ideas, examples, tools, and retrieval paths. Its architecture must help a reader enter, act, and return; length alone does not make it a reference.",
    },
    levels: [
      {
        title: "Design the playbook architecture",
        duration: "2–3 days",
        goal: "Define the reader, promise, volumes, and chapter sequence.",
        checkpoint:
          "You have an outline with four volumes and at least twelve distinct chapters.",
      },
      {
        title: "Master one chapter",
        duration: "2–3 weeks",
        goal: "Build the full pattern before multiplying it.",
        checkpoint:
          "One chapter of at least 5,000 words survives a reader review.",
      },
      {
        title: "Hold voice across chapters",
        duration: "3–4 weeks",
        goal: "Keep structure and language consistent as the work grows.",
        checkpoint:
          "Three chapters pass the same voice and structure review.",
      },
      {
        title: "Build the reference layer",
        duration: "3–4 weeks",
        goal: "Add the tools a reader needs after the first read.",
        checkpoint:
          "The work includes templates, worksheets, or decision trees tied to chapters.",
      },
      {
        title: "Make the framework reusable",
        duration: "4+ weeks",
        goal: "Separate the durable method from one client or situation.",
        checkpoint:
          "The framework works in more than one context without hiding its limits.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Forge Brand",
        href: "/work/forge-brand",
        note: "A system that turns approved direction into reusable source material.",
      },
      {
        kind: "Session",
        title: "The Beautifier Was an Auditor",
        href: "/demos/beautifier",
        note: "Why a polished reference still needs source and runtime checks.",
      },
      {
        kind: "Writing",
        title: "The Scaffolding the Agent Doesn’t Build",
        href: "/blog#the-scaffolding-the-agent-doesnt-build",
        note: "A published example of an argument grounded in the work that produced it.",
      },
    ],
  },
  {
    slug: "voice",
    title: "Voice",
    tagline: "Define a voice that survives scale",
    description:
      "Use your own writing as evidence for a repeatable voice system, then test whether other people and tools can apply it.",
    startWhen:
      "You need consistent voice based on actual writing rather than a list of adjectives.",
    finalArtifact: "Complete voice system with validation",
    timeline: "6–10 weeks",
    whoFor: [
      "Your writing drifts across formats, people, or tools.",
      "You have enough source material to study recurring choices.",
      "You need a system others can apply and review.",
    ],
    notFor: [
      "You want three adjectives and a moodboard.",
      "You do not have source writing to analyze.",
      "You want consistency to remove judgment from the work.",
    ],
    concept: {
      title: "Why voice guides fail",
      description:
        "A voice guide fails when it describes a personality but cannot guide a sentence. Useful systems connect observed patterns to choices, counterexamples, and a way to catch drift.",
    },
    levels: [
      {
        title: "Analyze your own writing",
        duration: "1–2 days",
        goal: "Find recurring choices in real source material.",
        checkpoint:
          "You can name five patterns and point to the passages that support them.",
      },
      {
        title: "Write the first voice guide",
        duration: "1–2 weeks",
        goal: "Turn observed patterns into usable direction.",
        checkpoint:
          "You have a 3,000-word specification with examples and counterexamples.",
      },
      {
        title: "Separate voice profiles",
        duration: "2–3 weeks",
        goal: "Define how voice changes when the reader and job change.",
        checkpoint:
          "Two distinct profiles produce recognizably different, appropriate drafts.",
      },
      {
        title: "Validate the output",
        duration: "2–3 weeks",
        goal: "Catch drift without reducing the work to keyword checks.",
        checkpoint:
          "A review process catches real failures and explains the correction.",
      },
      {
        title: "Operate a multi-voice system",
        duration: "3+ weeks",
        goal: "Make the system usable without your direct involvement.",
        checkpoint:
          "Another person can choose, apply, and review the right profile.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "Claude Recall",
        href: "/work/claude-recall",
        note: "A working corpus index used to recover patterns from prior sessions.",
      },
      {
        kind: "Technique",
        title: "Mine Your Own Transcripts",
        href: "/demos/applied/corpus",
        note: "A repeatable way to extract supported patterns and corrections.",
      },
      {
        kind: "Writing",
        title: "The Taste Gap",
        href: "/blog#the-taste-gap",
        note: "Why consistency still depends on human selection and judgment.",
      },
    ],
  },
  {
    slug: "enterprise",
    title: "Enterprise",
    tagline: "Scale useful AI practice across a team",
    description:
      "Turn a local pattern into a reusable team skill with explicit quality gates, governance, and room for human judgment.",
    startWhen:
      "You need one useful local AI pattern to work safely across a team.",
    finalArtifact: "Reusable team skill with quality gates",
    timeline: "10–16 weeks",
    whoFor: [
      "A useful AI workflow already exists somewhere in the organization.",
      "Multiple people need consistent output and clear authority.",
      "You can name an owner for quality, rollout, and maintenance.",
    ],
    notFor: [
      "You are still searching for the first useful workflow.",
      "The rollout has no accountable owner.",
      "You want governance language without tested operating controls.",
    ],
    concept: {
      title: "Skills versus prompts",
      description:
        "A prompt asks for an output. A reusable skill also carries inputs, tools, examples, quality checks, and boundaries so a team can operate it consistently.",
    },
    levels: [
      {
        title: "Find reusable patterns",
        duration: "2–3 days",
        goal: "Separate repeated work from one-off convenience.",
        checkpoint:
          "You have three candidate workflows with a user, input, output, and owner.",
      },
      {
        title: "Build the first skill",
        duration: "2–3 weeks",
        goal: "Package one workflow so another person can run it.",
        checkpoint:
          "The same inputs produce reviewably consistent output across operators.",
      },
      {
        title: "Support the required formats",
        duration: "2–3 weeks",
        goal: "Carry one source through the formats the team actually uses.",
        checkpoint:
          "The skill produces at least three useful formats without losing provenance.",
      },
      {
        title: "Add quality gates",
        duration: "2–3 weeks",
        goal: "Make acceptance criteria explicit and testable.",
        checkpoint:
          "A rubric and mechanical checks catch known failures before hand-off.",
      },
      {
        title: "Deploy and govern",
        duration: "4+ weeks",
        goal: "Roll out the skill with ownership, exceptions, and feedback.",
        checkpoint:
          "Multiple teams can use it, report failures, and identify who may change it.",
      },
    ],
    evidence: [
      {
        kind: "Work",
        title: "AI Champions Kit",
        href: "https://github.com/nino-chavez/ai-champions-kit",
        note: "A practical enablement kit for turning scattered use into team practice.",
      },
      {
        kind: "Session",
        title: "Taught Once, Enforced Forever",
        href: "/demos/enforced-forever",
        note: "A session about moving repeated corrections into durable guardrails.",
      },
      {
        kind: "Writing",
        title: "Who Reviewed the Reviewer?",
        href: "/blog#who-reviewed-the-reviewer",
        note: "Why review systems must remain accountable to human intent.",
      },
    ],
  },
];
