import { json } from '@sveltejs/kit';

export const prerender = true;

export function GET() {
	return json({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': 'https://ninochavez.co/#person',
		name: 'Nino Chavez',
		alternateName: 'Abelino Chavez',
		jobTitle: 'Context engineer · Product Architect',
		description: 'Product Architect at commerce.com. Codifies the practice through the blueprint methodology and publishes the receipts at ninochavez.co. Instrumented agent work — declarative rules, prompt-time hooks, stop-time audits, session-mining tools — produces the work catalogued at /work.',
		url: 'https://ninochavez.co',
		image: 'https://ninochavez.co/og-image.jpg',
		worksFor: {
			'@type': 'Organization',
			name: 'commerce.com',
			url: 'https://commerce.com'
		},
		sameAs: [
			'https://github.com/nino-chavez',
			'https://www.linkedin.com/in/ninochavez/',
			'https://blog.ninochavez.co',
			'https://blueprint.ninochavez.co'
		],
		knowsAbout: [
			'Context engineering',
			'Agentic software architecture',
			'Model Context Protocol (MCP)',
			'BigCommerce platform engineering',
			'Cloudflare Pages and Workers',
			'SvelteKit',
			'RAG (retrieval-augmented generation)',
			'Multi-session agent orchestration',
			'Design system engineering'
		],
		hasOccupation: {
			'@type': 'Occupation',
			name: 'Context engineer',
			description: 'Builds the harnesses that make personal software possible — declarative rules + hooks + skills + session-mining tools that turn coding agents into instrumented production lines.'
		}
	});
}
