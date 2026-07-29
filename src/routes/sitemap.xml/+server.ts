/**
 * Sitemap for ninochavez.co.
 *
 * This is the ROOT sitemap of the domain — the one Google reads first, and the one
 * robots.txt names alongside the blog's and the gallery's. It was a hand-maintained
 * static/sitemap.xml carrying nine URLs, and what it listed was wrong in both directions:
 *
 *   - It omitted /work and every case study under it, plus /ai, /ai/work, /ai/learn and
 *     the seven learn tracks, /links and /privacy. The portfolio — the thing a recruiter
 *     or a prospect searches for — was not in the sitemap of the site that owns the root.
 *   - It listed four JSON API endpoints (/api/person.json and friends) as if they were
 *     pages. Those are machine-readable data, already advertised in robots.txt; a sitemap
 *     is a list of pages worth indexing.
 *   - It listed /now, which carries <meta name="robots" content="noindex, nofollow">.
 *     Submitting a noindex URL is a Search Console error, and the noindex is the
 *     deliberate side: /now is linked from nowhere and the tag arrived with the
 *     "personal/creator focus" repositioning (25061ba).
 *   - Every lastmod read 2025-10-19, the day the file was written.
 *
 * Generated from the route table and the data modules, so adding a project or a track
 * puts it in the sitemap without anyone remembering to.
 */

import { WORK_PROJECTS } from '$lib/work-data';
import { tracks } from '$lib/data/ai/tracks';
import type { RequestHandler } from './$types';

const SITE_ORIGIN = 'https://ninochavez.co';

interface SitemapUrl {
	path: string;
	changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
	priority: number;
}

/**
 * Deliberately absent, so the next person does not "fix" it:
 *   /now      — noindex by choice, and unlinked.
 *   /api/*    — data endpoints, not pages. robots.txt already points crawlers at them.
 *   /blog, /photography — separate apps behind the same Worker, each publishing its own
 *              sitemap; robots.txt lists all three. Listing their roots here too would
 *              claim URLs this app does not serve.
 */
const STATIC_PAGES: SitemapUrl[] = [
	{ path: '/', changefreq: 'weekly', priority: 1.0 },
	{ path: '/about', changefreq: 'monthly', priority: 0.9 },
	{ path: '/work', changefreq: 'weekly', priority: 0.9 },
	{ path: '/ai', changefreq: 'weekly', priority: 0.8 },
	{ path: '/ai/work', changefreq: 'weekly', priority: 0.7 },
	{ path: '/ai/learn', changefreq: 'monthly', priority: 0.7 },
	{ path: '/links', changefreq: 'monthly', priority: 0.6 },
	{ path: '/privacy', changefreq: 'yearly', priority: 0.3 }
];

export const GET: RequestHandler = async ({ setHeaders }) => {
	const urls: SitemapUrl[] = [
		...STATIC_PAGES,
		...WORK_PROJECTS.map((project) => ({
			path: `/work/${project.slug}`,
			changefreq: 'monthly' as const,
			priority: 0.8
		})),
		...tracks.map((track) => ({
			path: `/ai/learn/${track.id}`,
			changefreq: 'monthly' as const,
			priority: 0.6
		}))
	];

	// No <lastmod>. The old file stamped every URL with the day it was written and never
	// moved, which tells a crawler less than saying nothing: an unchanging lastmod on
	// changing pages trains it to stop revisiting. Omit until there is a real per-page date.
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_ORIGIN}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
	)
	.join('\n')}
</urlset>
`;

	setHeaders({ 'cache-control': 'public, max-age=3600, s-maxage=3600' });
	return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};
