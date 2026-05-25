import { error } from '@sveltejs/kit';
import { findCase } from '$lib/case-studies';

export const prerender = true;

export function entries() {
	return [
		{ cluster: 'ai-products', slug: 'atelier' },
		{ cluster: 'ai-products', slug: 'cortex' },
		{ cluster: 'ai-products', slug: 'ask-dad' },
		{ cluster: 'commerce-bc', slug: 'bc-subscriptions' },
		{ cluster: 'commerce-bc', slug: 'ask-bc' },
		{ cluster: 'volleyball-630', slug: 'rally-hq' }
	];
}

export function load({ params }) {
	const study = findCase(params.cluster, params.slug);
	if (!study) {
		throw error(404, `Case study not found: ${params.cluster}/${params.slug}`);
	}
	return { study };
}
