import type { PageServerLoad } from './$types';
import { getLatestRssInsights } from '$lib/adapters/rssAdapter';
import { FALLBACK_BLOG_POSTS } from '$lib/adapters/blogAdapter';

export const load: PageServerLoad = async ({ setHeaders }) => {
  // Set cache headers for edge optimization
  setHeaders({
    'cache-control': 'public, max-age=300, stale-while-revalidate=600'
  });

  // W6 — primary path is Signal Dispatch RSS (which is live).
  // blogAdapter.ts manifest endpoints currently 404; RSS is the
  // canonical source. Fallback to static FALLBACK_BLOG_POSTS keeps
  // the page rendering even if RSS is temporarily unreachable.
  const rssPosts = await getLatestRssInsights(5);

  if (rssPosts.length > 0) {
    return {
      blogPosts: rssPosts,
      blogStatus: 'success' as const
    };
  }

  return {
    blogPosts: FALLBACK_BLOG_POSTS,
    blogStatus: 'fallback' as const
  };
};

// Enable prerendering for static generation
export const prerender = true;