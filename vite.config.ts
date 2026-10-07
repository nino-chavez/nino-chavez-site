import { cloudflare } from "@cloudflare/vite-plugin";
import vinext from "vinext";
import { defineConfig } from "vite";
import { sites } from "./build/sites-vite-plugin";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

// The Cloudflare plugin is imported statically: `vinext-cloudflare deploy`
// only recognizes it from a static `import { cloudflare }`. Wrangler reads
// WRANGLER_LOG_PATH when that import loads, before this file runs, so the npm
// scripts set it (.wrangler/wrangler.log) rather than this config.
export default defineConfig(() => {
  // Keep Wrangler and Miniflare state project-local. Both are read when used,
  // not at import. These are non-secret tool settings; application environment
  // belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
      }),
    ],
  };
});
