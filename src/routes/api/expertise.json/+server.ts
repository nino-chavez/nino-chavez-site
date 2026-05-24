import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) — Expertise payload.
 *
 * v3 framing: each expertise area anchors to a public artifact (repo, deploy,
 * or measured corpus), not a years-of-experience claim. Practice + agentic
 * architecture + governance lead; commerce demoted to a supporting position.
 *
 * Source draft: blueprint/content/aeo-expertise.json
 */

export const GET: RequestHandler = async () => {
	const expertiseData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Nino Chavez — Expertise',
		description:
			'Demonstrated areas of expertise, each anchored in a public artifact rather than a years-of-experience claim.',
		url: 'https://ninochavez.co/api/expertise.json',
		numberOfItems: 7,

		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'DefinedTerm',
					name: 'Context Engineering',
					description:
						'Practice of instrumenting AI coding agents at the workflow layer. Codified through a published toolchain and quantified through a voice corpus.',
					subjectOf: [
						{ '@type': 'WebPage', url: 'https://ninochavez.co/practice' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/claude-recall-cli' }
					],
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Toolchain Authored',
							value: '6 tools (1 public, 5 private)'
						},
						{ '@type': 'PropertyValue', name: 'Voice Corpus', value: '746 signals across 62 projects' },
						{ '@type': 'PropertyValue', name: 'Validated Turns', value: '6,418 (corpus-tracked)' }
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'DefinedTerm',
					name: 'Agentic Software Architecture',
					description:
						'Hybrid runtimes for production agentic systems — MCP endpoints, Durable Objects, multi-model routing (Sonnet/Haiku), Codemode sandboxes, two-turn confirmation gates, generative UI.',
					subjectOf: [
						{ '@type': 'WebPage', url: 'https://askbc.ninochavez.co' },
						{ '@type': 'WebPage', url: 'https://atelier.ninochavez.co' }
					],
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Reference Implementation 1',
							value:
								'Ask BC — Next.js + Cloudflare Worker + Durable Objects per store, 29 commerce-API tools'
						},
						{
							'@type': 'PropertyValue',
							name: 'Reference Implementation 2',
							value:
								'Atelier — 12-tool MCP protocol, role-aware lenses, find_similar with hybrid retrieval, fenced locks'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'DefinedTerm',
					name: 'AI Code Governance',
					description:
						'Constitutional discipline applied to AI-generated code. Plan gating (MVP / Surgical / Systemic), drift detection, evolution-story tracking, cross-framework learning.',
					subjectOf: [
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/signal-x-studio/aegis-framework' }
					],
					additionalProperty: [
						{ '@type': 'PropertyValue', name: 'Framework Version', value: 'AEGIS v2.5.0 (production)' },
						{ '@type': 'PropertyValue', name: 'Plan Levels', value: '3 (MVP, Surgical, Systemic)' }
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'DefinedTerm',
					name: 'Spec-Driven Development',
					description:
						'Spec → tasks → implementation methodology and tooling for AI-assisted coding. Mechanical state derivation, ADR discipline, dual-track agile in one repo.',
					subjectOf: [
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/specchain' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/big-blueprint' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/bc-subscriptions' }
					],
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Reference Case Study',
							value:
								'bc-subscriptions — 38 ADRs, 5-persona journey template, runnable prototype as design oracle'
						},
						{
							'@type': 'PropertyValue',
							name: 'Planning Methodology',
							value:
								'big-blueprint — 7-stage pipeline (research → principles → prototype → fact-check → docs → deploy → iterate)'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'DefinedTerm',
					name: 'Brand-to-Site Pipelines',
					description:
						'One brand-kit JSON drives tokens, voiced copy, imagery, and an archetype-instantiated site. CLI-chained workflow used across multiple shipped sites.',
					subjectOf: [
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/forge-brand' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/forge-signal' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/forge-site' },
						{ '@type': 'SoftwareSourceCode', url: 'https://github.com/nino-chavez/gen-images' }
					],
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Tools',
							value: '4 chained CLIs (forge-brand → forge-signal → gen-images → forge-site)'
						},
						{
							'@type': 'PropertyValue',
							name: 'Sites Shipped Through Pipeline',
							value: '10+ (signalx.studio, letspepper.com, flickdaymedia.com, plus client work)'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'DefinedTerm',
					name: 'Production Web Engineering',
					description:
						'End-to-end production craft on SvelteKit + Supabase + Cloudflare R2/Images/Workers. AAA accessibility, viewport-aware image serving, custom Workers for non-trivial paths (e.g., album zip generation).',
					subjectOf: [{ '@type': 'WebPage', url: 'https://ninochavez.co/photography' }],
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Photography Site Scale',
							value: '20,000+ photos with AI-enriched semantic search'
						},
						{ '@type': 'PropertyValue', name: 'Accessibility Target', value: 'WCAG 2.1 AAA' },
						{
							'@type': 'PropertyValue',
							name: 'Performance Target',
							value: 'Lighthouse >90 across categories'
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 7,
				item: {
					'@type': 'DefinedTerm',
					name: 'Commerce Platform Architecture (Supporting)',
					description:
						'15+ years of commerce platform implementation — headless architecture, ecosystem integration, multi-tenant SaaS. Now applied through agentic-AI products (Ask BC, bc-subscriptions) rather than as a primary positioning.',
					additionalProperty: [
						{ '@type': 'PropertyValue', name: 'Years', value: '15+' },
						{
							'@type': 'PropertyValue',
							name: 'Current Application',
							value:
								'Ask BC (agentic assistant for BigCommerce merchants) + bc-subscriptions (subscription-management platform spec)'
						}
					]
				}
			}
		]
	};

	return json(expertiseData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
