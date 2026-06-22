// W6 — Signal Dispatch RSS adapter for v3 live signals
// Fetches https://ninochavez.co/blog/rss.xml at SSR/build time, parses with
// regex (RSS structure is stable; avoids dependency overhead), maps to
// InsightArticle shape so /+page.svelte and /now/+page.svelte can render
// without conditionals.
//
// Why not the existing blogAdapter.ts: that one expects a JSON manifest at
// /manifest.json or /api/manifest which currently 404. RSS is live.

import type { InsightArticle } from '../types';

const RSS_URL = 'https://ninochavez.co/blog/rss.xml';
const FETCH_TIMEOUT_MS = 4000;

interface RssEntry {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  category: string;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—');
}

function stripCdata(text: string): string {
  return text.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function extractTag(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!match) return '';
  return decodeHtmlEntities(stripCdata(match[1].trim()));
}

function parseRssItems(xml: string, limit = 10): RssEntry[] {
  const items: RssEntry[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null && items.length < limit) {
    const inner = match[1];
    items.push({
      title: extractTag(inner, 'title'),
      link: extractTag(inner, 'link'),
      pubDate: extractTag(inner, 'pubDate'),
      description: extractTag(inner, 'description'),
      category: extractTag(inner, 'category')
    });
  }
  return items;
}

function rssEntryToInsight(entry: RssEntry, index: number): InsightArticle {
  const id = `rss-${entry.link.replace(/[^a-z0-9]+/gi, '-').slice(0, 60).toLowerCase()}-${index}`;
  const date = entry.pubDate ? new Date(entry.pubDate).toISOString().slice(0, 10) : '';
  const cleanDescription = entry.description
    .replace(/<[^>]+>/g, '')
    .trim()
    .slice(0, 280);

  return {
    id,
    title: entry.title || 'Untitled',
    subtitle: '',
    platform: 'Blog',
    excerpt: cleanDescription,
    imageUrl: '',
    link: entry.link,
    readTime: '',
    date,
    category: entry.category || 'Essay',
    tags: entry.category ? [entry.category] : [],
    insights: [],
    content: ''
  };
}

export async function getLatestRssInsights(limit = 5): Promise<InsightArticle[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const response = await fetch(RSS_URL, {
      headers: { 'Accept': 'application/xml, text/xml, */*' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[rssAdapter] HTTP ${response.status} fetching ${RSS_URL}`);
      return [];
    }

    const xml = await response.text();
    const entries = parseRssItems(xml, limit);
    return entries.map((entry, i) => rssEntryToInsight(entry, i));
  } catch (error) {
    console.warn('[rssAdapter] Failed to fetch RSS:', error);
    return [];
  }
}
