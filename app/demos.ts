import fallback from "./demo-data.json";

export type DemoEntry = {
  slug: string;
  title: string;
  summary: string;
  href: string;
  storyHref: string;
};

export type DemoSession = DemoEntry & {
  number?: string;
  audience: string;
  evidence: string;
  practice: string;
  artifact: {
    src: string;
    alt: string;
  };
  relatedTechniqueSlug?: string;
};

export type AppliedTechnique = DemoEntry & {
  description: string;
  steps: string[];
  relatedSessionSlugs: string[];
};

type SourceTechnique = Omit<AppliedTechnique, "steps"> & {
  principles: string[];
};

export type DemoSnapshot = {
  schemaVersion: number;
  source: string;
  sourceRevision: string | null;
  generatedAt?: string;
  sessionCount: number;
  techniqueCount: number;
  sessions: DemoSession[];
  techniques: SourceTechnique[];
};

const publishedIndex = "https://nc-demos.pages.dev/content-index.json";
const publicDemoRoot = "https://ninochavez.co/demos/";

function normalize(snapshot: DemoSnapshot) {
  if (
    snapshot.schemaVersion !== 1 ||
    !Array.isArray(snapshot.sessions) ||
    !Array.isArray(snapshot.techniques) ||
    snapshot.sessionCount !== snapshot.sessions.length ||
    snapshot.techniqueCount !== snapshot.techniques.length
  ) {
    throw new Error("Demos content index does not match schema version 1.");
  }

  const sessionSlugs = new Set(snapshot.sessions.map((item) => item.slug));
  for (const session of snapshot.sessions) {
    if (
      typeof session.storyHref !== "string" ||
      !session.storyHref.startsWith(
        "https://nc-demos.pages.dev/content/sessions/",
      ) ||
      typeof session.href !== "string" ||
      !session.href.startsWith(publicDemoRoot)
    ) {
      throw new Error(`Demo session ${session.slug} is missing its native story.`);
    }
  }
  for (const technique of snapshot.techniques) {
    if (
      !Array.isArray(technique.principles) ||
      !Array.isArray(technique.relatedSessionSlugs) ||
      typeof technique.storyHref !== "string" ||
      !technique.storyHref.startsWith(
        "https://nc-demos.pages.dev/content/techniques/",
      ) ||
      typeof technique.href !== "string" ||
      !technique.href.startsWith(publicDemoRoot) ||
      technique.relatedSessionSlugs.some((slug) => !sessionSlugs.has(slug))
    ) {
      throw new Error(
        `Applied technique ${technique.slug} has invalid relationships.`,
      );
    }
  }

  return {
    ...snapshot,
    sessions: snapshot.sessions,
    techniques: snapshot.techniques.map((item) => ({
      ...item,
      steps: item.principles,
    })),
  };
}

export const demoSnapshotFallback = normalize(
  fallback as unknown as DemoSnapshot,
);
export const demoSessions = demoSnapshotFallback.sessions;
export const appliedTechniques = demoSnapshotFallback.techniques;

export async function getDemoSnapshot() {
  try {
    const response = await fetch(publishedIndex, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`Demos index returned ${response.status}.`);
    }
    return normalize((await response.json()) as DemoSnapshot);
  } catch (error) {
    console.warn(
      "Demos index unavailable; using the bundled snapshot.",
      error,
    );
    return demoSnapshotFallback;
  }
}
