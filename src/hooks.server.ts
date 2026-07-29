import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

/**
 * Security headers for every server-rendered response.
 *
 * The blog has carried these since it launched; this app and the gallery never
 * did, so two of the three apps behind ninochavez.co were unprotected. The router
 * (apps/router) forwards origin responses unchanged and sets nothing of its own,
 * so what is declared here is exactly what a visitor receives — including on `/`,
 * since this app owns the domain root.
 *
 * NOT in a `_headers` file, which is where this obviously belongs and where it
 * does not work: Cloudflare Pages applies `_headers` to STATIC ASSET responses
 * only, and every page here is rendered by the Pages Function. Verified in the
 * gallery under `wrangler pages dev` — a `/*` block reached the favicons and no
 * HTML at all. The blog gets away with `_headers` for this job only because Astro
 * emits it fully static.
 *
 * DENY rather than SAMEORIGIN: nothing in this app frames its own pages — there is
 * no <iframe> in the source at all.
 */
const SECURITY_HEADERS: Record<string, string> = {
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin'
};

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Redirect old /learn/* paths to /ai/learn/*
	if (pathname === '/learn' || pathname.startsWith('/learn/')) {
		throw redirect(301, pathname.replace('/learn', '/ai/learn'));
	}

	// Legacy redirects migrated from the retired vercel.json — Cloudflare Pages
	// never read that file, so these are honored here instead. The cross-origin
	// rewrites vercel.json also declared are served by the `apps/router` Worker.
	if (pathname === '/cv') {
		throw redirect(301, '/about');
	}
	if (pathname === '/photo' || pathname.startsWith('/photo/')) {
		throw redirect(301, pathname.replace('/photo', '/photography'));
	}

	// /ai rebuild (02-prescription.yml P2/P5/P8): retired routes redirect to
	// their successors. Ask is killed per ADR-0003; build → work; the
	// reference tab and corpus stub fold into learn.
	if (pathname === '/ai/ask' || pathname.startsWith('/ai/ask/')) {
		throw redirect(301, '/ai');
	}
	if (pathname === '/ai/build' || pathname.startsWith('/ai/build/')) {
		throw redirect(301, '/ai/work');
	}
	if (pathname === '/ai/reference' || pathname === '/ai/learn/corpus') {
		throw redirect(301, '/ai/learn');
	}

	const response = await resolve(event);

	// The redirects above throw, so they never reach this — a 301 to /about carries
	// no headers from here, and does not need them: the destination sets its own.
	for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
		response.headers.set(name, value);
	}

	return response;
};
