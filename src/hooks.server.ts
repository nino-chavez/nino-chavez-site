import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Redirect old /learn/* paths to /ai/learn/*
	if (pathname === '/learn' || pathname.startsWith('/learn/')) {
		throw redirect(301, pathname.replace('/learn', '/ai/learn'));
	}

	return resolve(event);
};
