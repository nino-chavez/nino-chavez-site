import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// W8 — /v1/* catch-all redirect to /
export const GET: RequestHandler = () => {
  throw redirect(301, '/');
};

export const prerender = false;
