import postcss, { type ChildNode, type Rule } from "postcss";
import fallback from "./demo-stories.json";

export type DemoStoryKind = "session" | "technique";

export type DemoStorySection = {
  id: string;
  label: string;
  className: string;
  html: string;
};

export type DemoStory = {
  schemaVersion: number;
  kind: DemoStoryKind;
  slug: string;
  title: string;
  sourcePath: string;
  assetBase: string;
  sourceHash: string;
  sourceRevision: string;
  sectionCount: number;
  style: string;
  sections: DemoStorySection[];
};

type DemoStorySnapshot = {
  schemaVersion: number;
  source: string;
  sourceRevision: string | null;
  sessionCount: number;
  techniqueCount: number;
  sessions: DemoStory[];
  techniques: DemoStory[];
};

const storyOrigin = "https://nc-demos.pages.dev";
const scopedStyleCache = new Map<string, string>();

function validateStory(
  story: DemoStory,
  kind: DemoStoryKind,
  slug: string,
) {
  if (
    story.schemaVersion !== 1 ||
    story.kind !== kind ||
    story.slug !== slug ||
    typeof story.title !== "string" ||
    typeof story.style !== "string" ||
    !story.style.includes(".slide") ||
    typeof story.assetBase !== "string" ||
    !story.assetBase.startsWith(`${storyOrigin}/`) ||
    !Array.isArray(story.sections) ||
    story.sectionCount !== story.sections.length ||
    story.sections.length === 0
  ) {
    throw new Error(`${kind}/${slug} does not match the native story contract.`);
  }

  const sectionIds = new Set<string>();
  for (const section of story.sections) {
    if (
      typeof section.id !== "string" ||
      typeof section.label !== "string" ||
      typeof section.className !== "string" ||
      typeof section.html !== "string" ||
      /<script\b/i.test(section.html) ||
      sectionIds.has(section.id)
    ) {
      throw new Error(`${kind}/${slug} has an invalid story section.`);
    }
    sectionIds.add(section.id);
  }

  return story;
}

function validateSnapshot(snapshot: DemoStorySnapshot) {
  if (
    snapshot.schemaVersion !== 1 ||
    !Array.isArray(snapshot.sessions) ||
    !Array.isArray(snapshot.techniques) ||
    snapshot.sessionCount !== snapshot.sessions.length ||
    snapshot.techniqueCount !== snapshot.techniques.length
  ) {
    throw new Error("Bundled Demos stories do not match schema version 1.");
  }

  return {
    ...snapshot,
    sessions: snapshot.sessions.map((story) =>
      validateStory(story, "session", story.slug),
    ),
    techniques: snapshot.techniques.map((story) =>
      validateStory(story, "technique", story.slug),
    ),
  };
}

const bundledStories = validateSnapshot(
  fallback as unknown as DemoStorySnapshot,
);

function fallbackStory(kind: DemoStoryKind, slug: string) {
  const collection =
    kind === "session"
      ? bundledStories.sessions
      : bundledStories.techniques;
  return collection.find((story) => story.slug === slug);
}

export async function getDemoStory(
  kind: DemoStoryKind,
  slug: string,
  storyHref?: string,
) {
  const expectedPrefix = `${storyOrigin}/content/${
    kind === "session" ? "sessions" : "techniques"
  }/`;
  const publishedHref = storyHref?.startsWith(expectedPrefix)
    ? storyHref
    : `${expectedPrefix}${slug}.json`;

  try {
    const response = await fetch(publishedHref, {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error(`Demos story returned ${response.status}.`);
    }
    return validateStory(
      (await response.json()) as DemoStory,
      kind,
      slug,
    );
  } catch (error) {
    console.warn(
      `Demos story ${kind}/${slug} unavailable; using the bundled story.`,
      error,
    );
    return fallbackStory(kind, slug);
  }
}

function isInsideKeyframes(node: ChildNode) {
  let parent = node.parent;
  while (parent) {
    if (
      parent.type === "atrule" &&
      /(?:^|-)keyframes$/i.test(parent.name)
    ) {
      return true;
    }
    parent = parent.parent;
  }
  return false;
}

function scopedSelector(selector: string, scope: string) {
  const trimmed = selector.trim();
  if (!trimmed) return scope;
  if (trimmed === ":root" || trimmed === "html" || trimmed === "body") {
    return scope;
  }
  if (trimmed.startsWith(":root")) {
    return trimmed.replace(":root", scope);
  }
  if (/^(?:html|body)(?=[\s.#:[>+~]|$)/.test(trimmed)) {
    return trimmed.replace(/^(?:html|body)/, scope);
  }
  return `${scope} ${trimmed}`;
}

export function scopeDemoStoryStyle(style: string, sourceHash = style) {
  const cached = scopedStyleCache.get(sourceHash);
  if (cached) return cached;

  const scope = ".demo-story-surface";
  const root = postcss.parse(style);
  root.walkRules((rule: Rule) => {
    if (isInsideKeyframes(rule)) return;
    rule.selectors = rule.selectors.map((selector) =>
      scopedSelector(selector, scope),
    );
  });
  const scopedStyle = root.toString();
  scopedStyleCache.set(sourceHash, scopedStyle);
  return scopedStyle;
}

export function renderDemoStoryHtml(story: DemoStory, html: string) {
  return html
    .replaceAll('src="img/', `src="${story.assetBase}img/`)
    .replaceAll("src='img/", `src='${story.assetBase}img/`)
    .replace(
      /href=(["'])\/([^"']*)\1/g,
      (match, quote: string, target: string) => {
        if (
          target.startsWith("/") ||
          target === "demos" ||
          target.startsWith("demos/")
        ) {
          return match;
        }

        const suffixAt = target.search(/[?#]/);
        const path =
          suffixAt === -1 ? target : target.slice(0, suffixAt);
        const suffix =
          suffixAt === -1 ? "" : target.slice(suffixAt);
        const normalized = path.replace(/\/+$/, "");
        const destination = normalized
          ? `/demos/${normalized}`
          : "/demos";

        return `href=${quote}${destination}${suffix}${quote}`;
      },
    );
}
