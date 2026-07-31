import { workItems, learnTracks } from "../data";
import { appliedTechniques, demoSessions } from "../demos";

const origin = "https://ninochavez.co";

const staticPages = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.9"],
  ["/work", "weekly", "0.9"],
  ["/demos", "weekly", "0.8"],
  ["/learn", "monthly", "0.8"],
  ["/now", "weekly", "0.7"],
  ["/links", "monthly", "0.6"],
  ["/privacy", "yearly", "0.3"],
] as const;

export async function GET() {
  const pages = [
    ...staticPages,
    ...workItems.map((item) => [
      `/work/${item.slug}`,
      "monthly",
      "0.7",
    ] as const),
    ...demoSessions.map((item) => [
      `/demos/${item.slug}`,
      "monthly",
      "0.6",
    ] as const),
    ...appliedTechniques.map((item) => [
      `/demos/applied/${item.slug}`,
      "monthly",
      "0.6",
    ] as const),
    ...learnTracks.map((item) => [
      `/learn/${item.slug}`,
      "monthly",
      "0.6",
    ] as const),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ([path, changefreq, priority]) => `  <url>
    <loc>${origin}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
