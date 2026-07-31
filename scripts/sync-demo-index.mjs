import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
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
const defaultSourceRoot = path.join(
  canonicalCheckoutRoot,
  "../../apps/nc-demos",
);
const sourceRoot = path.resolve(process.argv[2] ?? defaultSourceRoot);
const outputPath = path.join(projectRoot, "app/demo-data.json");
const previewRoot = path.join(projectRoot, "public/work");
const remoteIndex = "https://nc-demos.pages.dev/content-index.json";
const publicDemoRoot = "https://ninochavez.co/demos";

function directories(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validate(snapshot) {
  if (
    snapshot?.schemaVersion !== 1 ||
    !Array.isArray(snapshot.sessions) ||
    !Array.isArray(snapshot.techniques)
  ) {
    throw new Error("Demos content index does not match schema version 1.");
  }

  const sessionSlugs = new Set(snapshot.sessions.map((item) => item.slug));
  for (const session of snapshot.sessions) {
    if (
      typeof session.storyHref !== "string" ||
      !session.storyHref.startsWith(
        "https://nc-demos.pages.dev/content/sessions/",
      )
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
      )
    ) {
      throw new Error(
        `Applied technique ${technique.slug} is missing principles or relationships.`,
      );
    }
    for (const slug of technique.relatedSessionSlugs) {
      if (!sessionSlugs.has(slug)) {
        throw new Error(
          `Applied technique ${technique.slug} references unknown session ${slug}.`,
        );
      }
    }
  }

  return snapshot;
}

function preserveGeneratedAt(candidate) {
  if (!fs.existsSync(outputPath)) return candidate;

  try {
    const current = validate(readJson(outputPath));
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

function fromWorkspace() {
  const demoRoot = path.join(sourceRoot, "demos");
  const appliedRoot = path.join(sourceRoot, "applied");
  const techniqueEntries = directories(appliedRoot).map((slug) => {
    const meta = readJson(path.join(appliedRoot, slug, "meta.json"));
    return {
      slug,
      title: meta.title,
      summary: meta.cardDesc ?? meta.description,
      description: meta.description,
      principles: meta.principles,
      relatedSessionSlugs: meta.relatedSessionSlugs,
      href: `${publicDemoRoot}/applied/${slug}`,
      storyHref: `https://nc-demos.pages.dev/content/techniques/${slug}.json`,
    };
  });
  const techniqueBySession = new Map();
  for (const technique of techniqueEntries) {
    for (const sessionSlug of technique.relatedSessionSlugs ?? []) {
      if (techniqueBySession.has(sessionSlug)) {
        throw new Error(
          `More than one applied technique claims session ${sessionSlug}.`,
        );
      }
      techniqueBySession.set(sessionSlug, technique.slug);
    }
  }

  fs.mkdirSync(previewRoot, { recursive: true });
  const sessions = directories(demoRoot)
    .map((slug) => {
      const meta = readJson(path.join(demoRoot, slug, "meta.json"));
      const previewName = `demo-${slug}.jpg`;
      fs.copyFileSync(
        path.join(demoRoot, slug, meta.preview),
        path.join(previewRoot, previewName),
      );
      return {
        number: meta.number,
        slug,
        title: meta.title,
        summary: meta.hook,
        audience: meta.for,
        evidence: meta.get,
        practice: meta.do,
        date: meta.date,
        theme: meta.theme,
        accent: meta.accent,
        artifact: {
          src: `/work/${previewName}`,
          alt: meta.previewAlt,
        },
        relatedTechniqueSlug: techniqueBySession.get(slug),
        href: `${publicDemoRoot}/${slug}`,
        storyHref: `https://nc-demos.pages.dev/content/sessions/${slug}.json`,
      };
    })
    .sort((a, b) => a.number.localeCompare(b.number));

  return {
    schemaVersion: 1,
    source: "apps/nc-demos",
    sourceRevision: execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: sourceRoot,
      encoding: "utf8",
    }).trim(),
    generatedAt: new Date().toISOString(),
    sessionCount: sessions.length,
    techniqueCount: techniqueEntries.length,
    sessions,
    techniques: techniqueEntries,
  };
}

async function fromPublishedIndex() {
  const response = await fetch(remoteIndex, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(
      `Published Demos index returned ${response.status} ${response.statusText}.`,
    );
  }
  return response.json();
}

const snapshot = preserveGeneratedAt(
  fs.existsSync(path.join(sourceRoot, "demos"))
    ? fromWorkspace()
    : await fromPublishedIndex(),
);

validate(snapshot);
fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(
  `Synced ${snapshot.sessions.length} sessions and ${snapshot.techniques.length} techniques to ${outputPath}`,
);
