import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // Serve every page's <title>, description and Open Graph tags in <head>, for
  // every user agent. vinext 1.0 streams metadata that awaits data (every /work,
  // /demos and /learn detail page) into the body after the shell. Its bot check
  // is right per request, but the HTML response cache keys a page by path only,
  // so a browser's streamed render is served from cache to link-preview bots
  // (facebookexternalhit, Slackbot, Twitterbot): cloudflare/vinext#3764.
  // Matching every agent is Next.js's documented opt-out of streaming metadata;
  // every render is then blocking, so the cache only ever holds <head> metadata,
  // as vinext 0.0.x served. Still exposed: a background regeneration sends no
  // User-Agent and streams anyway (cloudflare/vinext#3435). Remove this when
  // both are fixed and the head-metadata test passes without it.
  htmlLimitedBots: /.*/,
  async headers() {
    return [
      { source: "/", headers: securityHeaders },
      { source: "/:path*", headers: securityHeaders },
    ];
  },
  async redirects() {
    return [
      { source: "/photo", destination: "/photography", permanent: true },
      {
        source: "/photo/:path*",
        destination: "/photography/:path*",
        permanent: true,
      },
      { source: "/ai/ask/:path*", destination: "/", permanent: true },
      { source: "/ai/build/:path*", destination: "/work", permanent: true },
      { source: "/ai/reference", destination: "/learn", permanent: true },
      { source: "/ai/learn/corpus", destination: "/learn", permanent: true },
    ];
  },
};

export default nextConfig;
