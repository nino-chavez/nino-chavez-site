import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) — Person payload.
 *
 * v3 lead: Context Engineer. Product Architect remains as the current
 * employment fact but is no longer the lead identity. Photography is not on
 * this surface — it lives at /photography on the photography subdomain.
 *
 * Source draft: blueprint/content/aeo-person.json
 */

export const prerender = true;

export const GET: RequestHandler = async () => {
	const personData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Nino Chavez',
		alternateName: 'Antonino Chavez',
		jobTitle: ['Context Engineer', 'Product Architect'],
		description:
			'Context engineer who codified a working practice for shipping production software with AI agents. Author of a five-link production line (specchain → big-blueprint → forge-brand → forge-signal → gen-images) that turns intent into a spec, archetype, design system, voiced prose, and imagery, plus the ai-champions-kit (publicly available on GitHub) that packages the practice for other practitioners. Day job: Product Architect at commerce.com. Independent work shipped under his own brand: Rally HQ, Atelier, Ask BC, a 20K-photo gallery on Cloudflare. Based in Chicago.',
		url: 'https://ninochavez.co',
		email: 'nino@ninochavez.co',

		worksFor: {
			'@type': 'Organization',
			name: 'commerce.com',
			url: 'https://commerce.com'
		},

		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Chicago',
			addressRegion: 'IL',
			addressCountry: 'US'
		},

		sameAs: [
			'https://www.linkedin.com/in/nino-chavez/',
			'https://github.com/nino-chavez'
		],

		knowsAbout: [
			{
				'@type': 'Thing',
				name: 'Context Engineering',
				description:
					'Practice of instrumenting AI coding agents at the workflow layer — spec discipline, hook-based reinforcement, persistent voice corpora, governance frameworks. The work surrounding the model, not the prompt to it.',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Codified Practice',
					value:
						'Five-link production line (specchain → big-blueprint → forge-brand → forge-signal → gen-images) + 746 voice signals across 62 projects + ai-champions-kit (public)'
				}
			},
			{
				'@type': 'Thing',
				name: 'AI-Assisted Software Development',
				description:
					'Production agentic software development at volume. 56+ projects shipped, 5 lead case studies live (Rally HQ + blueprint surface, Atelier, Ask BC, Photography, bc-subscriptions).',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Tooling Authored',
					value:
						'specchain · big-blueprint · forge-brand · forge-signal · gen-images · forge-site · claude-recall-cli · ai-champions-kit'
				}
			},
			{
				'@type': 'Thing',
				name: 'Agentic Software Architecture',
				description:
					'Hybrid runtimes spanning Vercel + Cloudflare Workers + Durable Objects, MCP endpoints, multi-model routing, two-turn confirmation gates, generative UI patterns. See Ask BC and Atelier case studies.',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Reference Implementation',
					value: 'askbc.ninochavez.co (hybrid agentic-AI assistant for commerce platforms)'
				}
			},
			{
				'@type': 'Thing',
				name: 'Spec-Driven Development',
				description:
					'Methodology + tooling for spec → tasks → implementation flows in AI-assisted coding. Author of specchain (workflow + crash recovery + traceability) and big-blueprint (7-stage planning methodology).',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Reference Case Study',
					value:
						'bc-subscriptions — 38 ADRs, 5-persona journey template, mechanical state derivation, dual-track agile in one repo'
				}
			},
			{
				'@type': 'Thing',
				name: 'Commerce Platform Architecture',
				description:
					'15+ years implementing large-scale commerce platforms — migration, headless architecture, ecosystem integration. Now applied through Ask BC and Atelier rather than as a primary identity.',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Years',
					value: '15+'
				}
			}
		],

		hasOccupation: [
			{
				'@type': 'Occupation',
				name: 'Context Engineer',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago',
					'@id': 'https://www.wikidata.org/wiki/Q1297'
				},
				responsibilities:
					'Codify working practices for AI-assisted software development. Author and maintain the production line (specchain, big-blueprint, forge-brand, forge-signal, gen-images). Ship production software using the codified practice as the proof.',
				skills: [
					'Claude Code instrumentation (hooks, classifiers, subagents, skills)',
					'Agentic software architecture (MCP, Durable Objects, multi-model routing)',
					'Spec-driven development (specchain, big-blueprint)',
					'Brand-to-site pipelines (forge-brand, forge-signal, gen-images, forge-site)',
					'Voice-corpus engineering (claude-recall-cli + Poe stack)'
				]
			},
			{
				'@type': 'Occupation',
				name: 'Product Architect',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago'
				},
				experienceRequirements: '25+ years',
				responsibilities:
					'Product architecture at commerce.com. Internal day-job work; separate from the independent context-engineering practice on this site.',
				skills: [
					'Commerce platform architecture',
					'Headless architecture',
					'Microservices',
					'Cloud-native platform design'
				]
			}
		],

		alumniOf: [
			{
				'@type': 'Organization',
				name: 'commerce.com',
				startDate: '2026',
				description: 'Product Architect — current role'
			},
			{
				'@type': 'Organization',
				name: 'Accenture Song',
				startDate: '2023',
				endDate: '2026',
				description: 'Enterprise Architect & Strategic Advisor'
			},
			{
				'@type': 'Organization',
				name: 'Capgemini',
				startDate: '2021',
				endDate: '2023',
				description: 'Managing Delivery Architect'
			},
			{
				'@type': 'Organization',
				name: 'Peapod Digital Labs',
				startDate: '2020',
				endDate: '2021',
				description: 'Domain Architect'
			},
			{
				'@type': 'Organization',
				name: 'Accenture Interactive',
				startDate: '2018',
				endDate: '2020',
				description: 'Managing Enterprise Architect'
			},
			{
				'@type': 'Organization',
				name: 'Gorilla Group',
				startDate: '2015',
				endDate: '2018',
				description: 'Managing Enterprise Architect'
			}
		],

		additionalProperty: [
			{
				'@type': 'PropertyValue',
				name: 'Projects Shipped',
				value: '56+ across ~/Workspace/dev'
			},
			{
				'@type': 'PropertyValue',
				name: 'Production Line Size',
				value:
					'5 lathes (specchain → big-blueprint → forge-brand → forge-signal → gen-images) + 1 public transfer kit (ai-champions-kit). Production-line lathes are currently private.'
			},
			{
				'@type': 'PropertyValue',
				name: 'Voice Corpus',
				value: '746 signals across 62 projects (Poe stack)'
			},
			{
				'@type': 'PropertyValue',
				name: 'Lead Case Studies',
				value: '5 (Rally HQ + Blueprint, Atelier, Ask BC, Photography, bc-subscriptions)'
			},
			{
				'@type': 'PropertyValue',
				name: 'Years of Experience',
				value: '25+'
			}
		]
	};

	return json(personData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
