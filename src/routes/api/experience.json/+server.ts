import { json } from '@sveltejs/kit';

export const prerender = true;

export function GET() {
	return json({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://ninochavez.co/#experience',
		name: 'Nino Chavez',
		description: 'Work history framed against the context-engineer practice — current role at commerce.com plus side-project portfolio across 8 capability clusters.',
		hasOccupation: [
			{
				'@type': 'Occupation',
				name: 'Product Architect',
				description: 'Architects against BigCommerce-platform systems at commerce.com. Day job; full-time. The practice surfaced on this site runs in parallel.',
				occupationLocation: {
					'@type': 'Organization',
					name: 'commerce.com',
					url: 'https://commerce.com'
				}
			},
			{
				'@type': 'Occupation',
				name: 'Context engineer (orbit)',
				description: 'Codifies the agent-assisted engineering practice through the blueprint methodology. Publishes a 275-artifact writing corpus at blog.ninochavez.co, maintains a 6-lathe production line under github.com/nino-chavez/forge, and ships side-project case studies catalogued at ninochavez.co/work.'
			}
		],
		alumniOf: {
			'@type': 'EducationalOrganization',
			name: 'Self-taught + commerce-platform pragmatic',
			description: 'No traditional CS degree. Practitioner-trained through ~25 years of shipping commerce platform work.'
		},
		award: [
			{
				'@type': 'Thing',
				name: 'Paired-deploy pattern (Rally HQ + Rally HQ Blueprint)',
				description: 'Demonstrated the canonical paired-deploy pattern at rallyhq.app + blueprint.rallyhq.app. This site at blueprint.ninochavez.co mirrors that pattern.'
			},
			{
				'@type': 'Thing',
				name: 'Atelier (PUBLIC MCP architecture)',
				description: 'Open-source 12-tool MCP server template for mixed human/agent teams. Lead deep dive in the AI-products cluster.'
			}
		]
	});
}
