/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { handleCoverage, retryNotifications } from "./coverage";

type Env = Cloudflare.Env;

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/coverage/requests" || url.pathname === "/api/coverage/events") {
      return handleCoverage(request, env, ctx);
    }

    // The sixth work domain was renamed Writing -> Publishing on 2026-08-17.
    // /work and the home page published ?domain= links for months, so a
    // bookmarked or shared filter would otherwise dead-end on the empty state.
    // This runs here rather than as a next.config redirect because that layer
    // drops sibling params in this runtime — ?domain=Writing&state=live lands
    // on the domain filter alone. Rewriting the parsed URL keeps every other
    // param intact, and the browser carries the original #fragment across.
    if (url.pathname === "/work" && /^writing$/i.test(url.searchParams.get("domain") ?? "")) {
      const target = new URL(url);
      target.searchParams.set("domain", "Publishing");
      return Response.redirect(target.toString(), 301);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const outputFormat = (["image/jpeg", "image/png", "image/gif", "image/webp", "image/avif", "rgb", "rgba"] as const).find(value => value === format);
          if (!outputFormat) throw new Error("Unsupported image output format");
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format: outputFormat, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const response = await handler.fetch(request, env, ctx);
    // AI Labyrinth's prepended anchor changes React's document hydration tree.
    // Preserve this form page's HTML at the edge; keep other routes unchanged.
    if ((url.pathname === "/photography/coverage" || url.pathname === "/photography/coverage/") && response.headers.get("Content-Type")?.includes("text/html")) {
      const headers = new Headers(response.headers);
      const cacheControl = headers.get("Cache-Control");
      if (!cacheControl?.split(",").some(value => value.trim().toLowerCase() === "no-transform")) {
        headers.set("Cache-Control", cacheControl ? `${cacheControl}, no-transform` : "no-transform");
      }
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }
    return response;
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(retryNotifications(env));
  },
};

export default worker;
