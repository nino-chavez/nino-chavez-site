import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) — Experience payload.
 *
 * v3 lead: the independent Context Engineer practice is the first entry. The
 * commerce.com Product Architect role follows as the current employment fact;
 * prior enterprise-consulting roles are kept for résumé continuity.
 *
 * Source draft: blueprint/content/aeo-experience.json
 */

export const GET: RequestHandler = async () => {
	const experienceData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Nino Chavez — Work History',
		description: 'Independent practice plus continuous enterprise architecture employment since 2015.',
		url: 'https://ninochavez.co/api/experience.json',
		numberOfItems: 7,

		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'WorkRole',
					roleName: 'Context Engineer (Independent Practice)',
					startDate: '2024',
					description:
						'Codified a working practice for AI-assisted software development. Built and shipped a six-tool open toolchain, an AI governance framework (AEGIS), and a session voice corpus. Used the toolchain to ship 5 lead case studies under his own brand (Rally HQ + blueprint surface, Atelier, Ask BC, Photography, bc-subscriptions). Independent of the day-job employment below.',
					namedPosition: 'Context Engineer',
					url: 'https://ninochavez.co/practice'
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'WorkRole',
					roleName: 'Product Architect',
					startDate: '2026',
					memberOf: { '@type': 'Organization', name: 'commerce.com', url: 'https://commerce.com' },
					description:
						'Product architecture at commerce.com. Internal work; separate from the independent context-engineering practice surfaced on this site.'
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'WorkRole',
					roleName: 'Enterprise Architect & Strategic Advisor',
					startDate: '2023',
					endDate: '2026',
					memberOf: { '@type': 'Organization', name: 'Accenture Song' },
					description: 'Strategic enterprise architecture advisory for Fortune 500 commerce transformations.'
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'WorkRole',
					roleName: 'Managing Delivery Architect',
					startDate: '2021',
					endDate: '2023',
					memberOf: { '@type': 'Organization', name: 'Capgemini' },
					description:
						'Delivery architecture leadership across multi-region commerce platform implementations.'
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'WorkRole',
					roleName: 'Domain Architect',
					startDate: '2020',
					endDate: '2021',
					memberOf: { '@type': 'Organization', name: 'Peapod Digital Labs' },
					description: 'Commerce domain architecture for grocery e-commerce platform.'
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'WorkRole',
					roleName: 'Managing Enterprise Architect',
					startDate: '2018',
					endDate: '2020',
					memberOf: { '@type': 'Organization', name: 'Accenture Interactive' },
					description: 'Enterprise architecture for commerce transformation programs.'
				}
			},
			{
				'@type': 'ListItem',
				position: 7,
				item: {
					'@type': 'WorkRole',
					roleName: 'Managing Enterprise Architect',
					startDate: '2015',
					endDate: '2018',
					memberOf: { '@type': 'Organization', name: 'Gorilla Group' },
					description: 'Commerce platform delivery and architecture leadership.'
				}
			}
		]
	};

	return json(experienceData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
