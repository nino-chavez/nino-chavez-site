import type { PageServerLoad } from './$types';
import { getLatestRssInsights } from '$lib/adapters/rssAdapter';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({
    'cache-control': 'public, max-age=300, stale-while-revalidate=600'
  });

  const latest = await getLatestRssInsights(5);
  return {
    blogPosts: latest,
    blogStatus: latest.length > 0 ? ('success' as const) : ('empty' as const)
  };
};

export const prerender = true;
