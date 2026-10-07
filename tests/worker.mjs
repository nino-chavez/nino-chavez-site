// Runs the built Worker (`dist/server`) in workerd, the runtime production uses,
// so the rendered-html and audit tests exercise the same bundle Cloudflare serves.
//
// The tests used to import dist/server/index.js into Node. vinext 1.0's build
// imports `cloudflare:workers`, which exists only inside workerd, so that stopped
// working. Miniflare runs workerd locally; it is pinned to the version wrangler
// uses (bump the three together, see wrangler.jsonc). Miniflare 5 takes a
// config-shaped option object with no published guide yet, so the options below
// use the documented 4.x shape and go through Miniflare's own converter.
//
// The contract is unchanged from the Node loader: ASSETS answers 404 for every
// path, and no other binding or variable is set, so a page must render from the
// Worker alone.
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Miniflare, convertV4MiniflareOptions } from "miniflare";

const serverDir = new URL("../dist/server/", import.meta.url);
let worker;

async function start() {
  // The build writes the deployable Worker config next to the bundle.
  const config = JSON.parse(await readFile(new URL("wrangler.json", serverDir), "utf8"));
  const root = fileURLToPath(serverDir);
  // Every bundle file is an ES module (the build's own rule); list them so the
  // entry comes first and no module type is guessed from its extension.
  const files = (await readdir(root, { recursive: true }))
    .filter((file) => /\.m?js$/.test(file))
    .sort((a, b) => (a === config.main ? -1 : b === config.main ? 1 : a.localeCompare(b)));
  const instance = new Miniflare(convertV4MiniflareOptions({
    modulesRoot: root,
    modules: files.map((file) => ({ type: "ESModule", path: join(root, file) })),
    compatibilityDate: config.compatibility_date,
    compatibilityFlags: config.compatibility_flags,
    serviceBindings: {
      ASSETS: () => new Response("Not found", { status: 404 }),
    },
  }));
  await instance.ready;
  return instance;
}

/**
 * Fetch a path from the built Worker. Redirects are returned, not followed.
 * `headers` adds to the default `accept: text/html`, for example a crawler's
 * user-agent.
 */
export async function render(path = "/", { headers = {} } = {}) {
  worker ??= start();
  return (await worker).dispatchFetch(`http://localhost${path}`, {
    headers: { accept: "text/html", ...headers },
    redirect: "manual",
  });
}

/**
 * Where a redirect sends the browser, resolved against the request the way a
 * browser resolves it. HTTP allows a relative Location, and vinext 1.0 sends
 * one ("/work"), where 0.0.x sent an absolute URL.
 */
export function redirectTarget(response) {
  return new URL(response.headers.get("location"), "http://localhost");
}

/**
 * The page as markup, without the inline scripts that carry React's serialized
 * data, so a match is against what the document renders rather than the payload
 * it hydrates from. JSON-LD stays: structured data is part of the document.
 * (The tests used to cut at `<script id="_R_">`; vinext 1.0 gives that script no
 * id, and the cut silently kept the whole page.)
 */
export function visibleDocument(html) {
  return html.replace(/<script\b(?![^>]*type="application\/ld\+json")[^>]*>[\s\S]*?<\/script>/g, "");
}

/** Stop workerd. Each test file calls this from `after`, or node:test never exits. */
export async function stopWorker() {
  if (!worker) return;
  const instance = await worker;
  worker = undefined;
  await instance.dispose();
}
