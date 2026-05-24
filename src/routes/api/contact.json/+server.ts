import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) — ContactPoint payload.
 *
 * Per 02-prescription.yml sitemap. The site does not sell services
 * (DESIGN-PRINCIPLES.md §1); this endpoint exists so AI crawlers can
 * resolve "how to reach Nino Chavez" deterministically without surfacing
 * the v2 "Enterprise Consulting / Photography Services" framing.
 */

export const prerender = true;

export const GET: RequestHandler = async () => {
	const contactData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Nino Chavez',
		url: 'https://ninochavez.co',
		email: 'nino@ninochavez.co',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Chicago',
			addressRegion: 'IL',
			addressCountry: 'US'
		},
		contactPoint: [
			{
				'@type': 'ContactPoint',
				contactType: 'primary',
				email: 'nino@ninochavez.co',
				availableLanguage: ['en', 'es'],
				description:
					'Email is the primary channel. Responds to interesting work; does not sell services.'
			},
			{
				'@type': 'ContactPoint',
				contactType: 'professional',
				url: 'https://www.linkedin.com/in/nino-chavez/',
				description: "LinkedIn for professional inquiries that aren't a fit for direct email."
			},
			{
				'@type': 'ContactPoint',
				contactType: 'code',
				url: 'https://github.com/nino-chavez',
				description:
					'GitHub for repo-level conversations — issues, PRs, code-specific discussion.'
			}
		],
		sameAs: [
			'https://www.linkedin.com/in/nino-chavez/',
			'https://github.com/nino-chavez',
			'https://blog.ninochavez.co'
		],
		additionalProperty: [
			{
				'@type': 'PropertyValue',
				name: 'Engagement Posture',
				value: "I'm not selling services. I respond to interesting work."
			},
			{
				'@type': 'PropertyValue',
				name: 'Response Time',
				value: 'Email replied within 1-3 business days; no SLA.'
			},
			{
				'@type': 'PropertyValue',
				name: 'Primary Identity',
				value: 'Context Engineer'
			}
		]
	};

	return json(contactData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
