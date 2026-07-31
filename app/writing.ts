import snapshot from "./writing-data.json";

export const writingKinds = [
  {
    value: "Essay",
    code: "E",
    description: "Public reflections, field notes, and arguments.",
  },
  {
    value: "Whitepaper",
    code: "W",
    description: "Formal long-form analysis and reference work.",
  },
  {
    value: "Presentation",
    code: "P",
    description: "Slide decks with speaker notes and supporting material.",
  },
  {
    value: "Tutorial",
    code: "T",
    description: "Hands-on exercises with a concrete stopping condition.",
  },
  {
    value: "Counterpoint",
    code: "C",
    description: "Adversarial responses that test an earlier argument.",
  },
  {
    value: "Fiction",
    code: "F",
    description: "Short stories and serialized fiction.",
  },
] as const;

export type WritingKind = (typeof writingKinds)[number]["value"];

export type WritingItem = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  kind: WritingKind;
  category: string;
  tags: string[];
  href: string;
};

export type WritingSeries = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  status: "active" | "completed";
  articleCount: number;
  href: string;
};

export type WritingSnapshot = {
  schemaVersion?: number;
  source: string;
  sourceRevision: string | null;
  generatedAt?: string;
  latestPublishedAt: string;
  publicPieceCount: number;
  kindCounts: Record<WritingKind, number>;
  categories: string[];
  years: string[];
  items: WritingItem[];
  series: WritingSeries[];
};

const publishedIndex =
  "https://ninochavez-blog.pages.dev/blog/api/content-index.json";

export const writingSnapshotFallback = snapshot as unknown as WritingSnapshot;
export const writingItems = writingSnapshotFallback.items;
export const writingSeries = writingSnapshotFallback.series;
export const writingCategories = writingSnapshotFallback.categories;
export const writingYears = writingSnapshotFallback.years;
export const writingSnapshot = {
  latestPublishedAt: snapshot.latestPublishedAt,
  publicPieceCount: snapshot.publicPieceCount,
  kindCounts: snapshot.kindCounts as Record<WritingKind, number>,
};

function validate(candidate: WritingSnapshot) {
  if (
    (candidate.schemaVersion !== undefined &&
      candidate.schemaVersion !== 1) ||
    !Array.isArray(candidate.items) ||
    !Array.isArray(candidate.series) ||
    candidate.publicPieceCount !== candidate.items.length
  ) {
    throw new Error("Writing content index does not match schema version 1.");
  }
  return candidate;
}

export async function getWritingSnapshot() {
  try {
    const response = await fetch(publishedIndex, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`Writing index returned ${response.status}.`);
    }
    return validate((await response.json()) as WritingSnapshot);
  } catch (error) {
    console.warn(
      "Writing index unavailable; using the bundled snapshot.",
      error,
    );
    return writingSnapshotFallback;
  }
}
