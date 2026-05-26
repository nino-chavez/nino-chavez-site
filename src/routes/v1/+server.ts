import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// W8 — /v1 legacy route archived 2026-05-25. Source moved to src/_archive/v1/.
// SvelteKit handler returns 301 for /v1 and /v1/* paths.
// static/_redirects file ALSO has the redirect but SvelteKit's _routes.json
// catches /* and intercepts before _redirects fires; this server route is
// the reliable mechanism.

export const GET: RequestHandler = () => {
  throw redirect(301, '/');
};

export const prerender = false;
