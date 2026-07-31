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
const outputPath = path.join(projectRoot, "app/demo-stories.json");
const indexPath = path.join(projectRoot, "app/demo-data.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function validateStory(story, kind, slug) {
  const expectedKind = kind === "sessions" ? "session" : "technique";
  if (
    story?.schemaVersion !== 1 ||
    story.kind !== expectedKind ||
    story.slug !== slug ||
    typeof story.style !== "string" ||
    !story.style.includes(".slide") ||
    typeof story.assetBase !== "string" ||
    !story.assetBase.startsWith("https://nc-demos.pages.dev/") ||
    !Array.isArray(story.sections) ||
    story.sectionCount !== story.sections.length ||
    story.sections.length === 0
  ) {
    throw new Error(`${kind}/${slug} does not match the native story contract.`);
  }

  const sectionIds = new Set();
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

async function loadStory(record, kind) {
  const localPath = path.join(
    sourceRoot,
    "dist",
    "content",
    kind,
    `${record.slug}.json`,
  );
  if (fs.existsSync(localPath)) {
    return validateStory(readJson(localPath), kind, record.slug);
  }

  const response = await fetch(record.storyHref, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(
      `${record.storyHref} returned ${response.status} ${response.statusText}.`,
    );
  }
  return validateStory(await response.json(), kind, record.slug);
}

async function buildSnapshot() {
  const index = readJson(indexPath);
  const [sessions, techniques] = await Promise.all([
    Promise.all(index.sessions.map((record) => loadStory(record, "sessions"))),
    Promise.all(
      index.techniques.map((record) => loadStory(record, "techniques")),
    ),
  ]);

  return {
    schemaVersion: 1,
    source: index.source,
    sourceRevision: index.sourceRevision,
    sessionCount: sessions.length,
    techniqueCount: techniques.length,
    sessions,
    techniques,
  };
}

try {
  const snapshot = await buildSnapshot();
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);
  console.log(
    `Synced ${snapshot.sessions.length} session stories and ${snapshot.techniques.length} technique stories to ${outputPath}`,
  );
} catch (error) {
  if (!fs.existsSync(outputPath)) {
    throw error;
  }
  console.warn(
    `Demos story source unavailable; preserving the bundled native stories. ${error}`,
  );
}
