import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const canonicalCheckoutRoot = path.dirname(
  path.resolve(
    projectRoot,
    execFileSync("git", ["rev-parse", "--git-common-dir"], {
      cwd: projectRoot,
      encoding: "utf8",
    }).trim(),
  ),
);
const sourceRoot = path.resolve(
  process.argv[2] ??
    path.join(canonicalCheckoutRoot, "../../apps/blog/astro-build"),
);
const outputPath = path.join(projectRoot, "app/writing-data.json");
const remoteIndex =
  "https://ninochavez-blog.pages.dev/blog/api/content-index.json";

const collections = [
  {
    directory: "blog",
    href: (slug) => `/blog/${slug}`,
    kind: "Essay",
    visible: (data) =>
      data.status === undefined || data.status === "published",
  },
  {
    directory: "whitepapers",
    href: (slug) => `/blog/whitepapers/${slug}`,
    kind: "Whitepaper",
    visible: () => true,
  },
  {
    directory: "presentations",
    href: (slug) => `/blog/presentations/${slug}`,
    kind: "Presentation",
    visible: () => true,
  },
  {
    directory: "tutorials",
    href: (slug) => `/blog/tutorials/${slug}`,
    kind: "Tutorial",
    visible: () => true,
  },
  {
    directory: "counterpoints",
    href: (slug) => `/blog/counterpoints/${slug}`,
    kind: "Counterpoint",
    visible: () => true,
  },
  {
    directory: "fiction",
    href: (slug) => `/blog/fiction/${slug}`,
    kind: "Fiction",
    visible: (data) => data.status !== "draft",
  },
];

function sourceFiles(directory) {
  const collectionRoot = path.join(sourceRoot, "src/content", directory);
  return fs
    .readdirSync(collectionRoot, { recursive: true, encoding: "utf8" })
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => ({
      absolutePath: path.join(collectionRoot, entry),
      slug: entry.replace(/\.mdx$/, "").replaceAll(path.sep, "/"),
    }));
}

function isoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}

function publicHref(pathname) {
  return `https://ninochavez.co${pathname}`;
}

function validate(snapshot) {
  if (
    snapshot?.schemaVersion !== 1 ||
    !Array.isArray(snapshot.items) ||
    !Array.isArray(snapshot.series) ||
    snapshot.publicPieceCount !== snapshot.items.length
  ) {
    throw new Error("Writing content index does not match schema version 1.");
  }
  return snapshot;
}

function preserveGeneratedAt(candidate) {
  if (!fs.existsSync(outputPath)) return candidate;

  try {
    const current = validate(
      JSON.parse(fs.readFileSync(outputPath, "utf8")),
    );
    const currentGeneratedAt = current.generatedAt;
    const currentContent = { ...current };
    const candidateContent = { ...candidate };
    delete currentContent.generatedAt;
    delete candidateContent.generatedAt;

    if (JSON.stringify(currentContent) === JSON.stringify(candidateContent)) {
      return { ...candidate, generatedAt: currentGeneratedAt };
    }
  } catch {
    // A stale or invalid snapshot should be replaced by the validated source.
  }

  return candidate;
}

if (!fs.existsSync(path.join(sourceRoot, "src/content"))) {
  const response = await fetch(remoteIndex, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(
      `Published writing index returned ${response.status} ${response.statusText}.`,
    );
  }
  const publishedSnapshot = preserveGeneratedAt(
    validate(await response.json()),
  );
  fs.writeFileSync(
    outputPath,
    `${JSON.stringify(publishedSnapshot, null, 2)}\n`,
  );
  console.log(
    `Synced ${publishedSnapshot.items.length} public pieces and ${publishedSnapshot.series.length} series to ${outputPath}`,
  );
  process.exit(0);
}

const requireFromSource = createRequire(path.join(sourceRoot, "package.json"));
const matter = requireFromSource("gray-matter");
const items = [];
const seriesMembership = new Map();

for (const collection of collections) {
  for (const file of sourceFiles(collection.directory)) {
    const { data } = matter(fs.readFileSync(file.absolutePath, "utf8"));
    if (!collection.visible(data)) continue;

    if (collection.kind === "Essay" && data.series?.slug) {
      seriesMembership.set(
        data.series.slug,
        (seriesMembership.get(data.series.slug) ?? 0) + 1,
      );
    }

    items.push({
      slug: file.slug,
      title: data.title,
      excerpt: data.excerpt ?? "",
      publishedAt: isoDate(data.publishedAt),
      kind: collection.kind,
      category:
        data.category ??
        (collection.kind === "Fiction" ? "Fiction" : "Uncategorized"),
      tags: Array.isArray(data.tags) ? data.tags : [],
      href: publicHref(collection.href(file.slug)),
    });
  }
}

items.sort(
  (a, b) =>
    b.publishedAt.localeCompare(a.publishedAt) ||
    a.title.localeCompare(b.title),
);

const series = sourceFiles("series")
  .map((file) => {
    const { data } = matter(fs.readFileSync(file.absolutePath, "utf8"));
    return {
      slug: file.slug,
      title: data.title,
      description: data.description,
      publishedAt: isoDate(data.publishedAt),
      status: data.status ?? "active",
      articleCount: seriesMembership.get(file.slug) ?? 0,
      href: publicHref(`/blog/series/${file.slug}`),
    };
  })
  .sort(
    (a, b) =>
      b.publishedAt.localeCompare(a.publishedAt) ||
      a.title.localeCompare(b.title),
  );

const kinds = collections.map((collection) => collection.kind);
const kindCounts = Object.fromEntries(
  kinds.map((kind) => [
    kind,
    items.filter((item) => item.kind === kind).length,
  ]),
);
const categories = [...new Set(items.map((item) => item.category))].sort();
const years = [
  ...new Set(items.map((item) => item.publishedAt.slice(0, 4))),
].sort((a, b) => b.localeCompare(a));
const sourceRevision = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: sourceRoot,
  encoding: "utf8",
}).trim();

const snapshot = preserveGeneratedAt({
  schemaVersion: 1,
  source: "apps/blog/astro-build",
  sourceRevision,
  generatedAt: new Date().toISOString(),
  latestPublishedAt: items[0]?.publishedAt ?? null,
  publicPieceCount: items.length,
  kindCounts,
  categories,
  years,
  items,
  series,
});

validate(snapshot);
fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `Synced ${items.length} public pieces and ${series.length} series to ${outputPath}`,
);
