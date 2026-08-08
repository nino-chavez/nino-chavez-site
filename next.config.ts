import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const nextConfig: NextConfig = {
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
