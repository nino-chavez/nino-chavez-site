import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Redirect old /learn/* paths to /ai/learn/*
	if (pathname === '/learn' || pathname.startsWith('/learn/')) {
		throw redirect(301, pathname.replace('/learn', '/ai/learn'));
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

	return resolve(event);
};
