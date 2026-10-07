import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
  // Serve every page's <title>, description and Open Graph tags in <head>, for
  // every user agent. vinext 1.0 streams metadata that awaits data (every /work,
  // /demos and /learn detail page) into the body after the shell, and in this
  // Worker it did so for link-preview bots too (facebookexternalhit, Slackbot,
  // Twitterbot), whose default "limited bot" match did not take effect
  // (2026-10-07, vinext 1.0.1). Matching every agent is Next.js's documented
  // opt-out of streaming metadata, and keeps what vinext 0.0.x served.
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
