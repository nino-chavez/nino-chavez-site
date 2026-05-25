import { json } from '@sveltejs/kit';

export const prerender = true;

export function GET() {
	return json({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		'@id': 'https://ninochavez.co/#expertise',
		name: 'Nino Chavez — areas of expertise',
		description: 'Toolchain-led catalog of working practice. Each entry grounds to a public repo or shipped artifact.',
		itemListOrder: 'https://schema.org/ItemListOrderAscending',
		numberOfItems: 8,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'Thing',
					name: 'Forge production line',
					description: 'Public umbrella + 6 private lathes (specchain, blueprint, forge-brand, forge-signal, forge-site, image-gen) producing case studies, sites, and portals.',
					url: 'https://github.com/nino-chavez/forge'
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'Thing',
					name: 'Agentic software architecture',
					description: 'MCP-mediated tool surfaces, Durable Object per-tenant runtimes, two-turn write gates, sandboxed read tools. See Atelier + Ask BC.',
					url: 'https://ninochavez.co/work#ai-products'
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'Thing',
					name: 'BigCommerce platform engineering',
					description: 'Day-job at commerce.com + side-project commerce work — bc-subscriptions, ask-bc, aisles. Subscription engineering, hybrid retrieval, AI-native storefronts.',
					url: 'https://ninochavez.co/work#commerce-bc'
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'Thing',
					name: 'Multi-session agent orchestration',
					description: 'ai-hive, claude-orchestrator, worktree-orchestrator — partition work across parallel sessions so the main session never blocks on subagent compute.',
					url: 'https://ninochavez.co/practice#substrate'
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'Thing',
					name: 'Local-first AI engineering',
					description: 'Tauri v2 + SvelteKit + Rust + MLX — on-device inference against Apple Silicon Neural Engine. See Cortex.',
					url: 'https://github.com/nino-chavez/cortex'
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'Thing',
					name: 'Cloudflare-first infrastructure',
					description: 'Pages, Workers, Durable Objects, Vectorize. Paired-deploy pattern: product + blueprint portal as sibling CF Pages projects (rally-hq, ninochavez.co).',
					url: 'https://ninochavez.co/practice'
				}
			},
			{
				'@type': 'ListItem',
				position: 7,
				item: {
					'@type': 'Thing',
					name: 'RAG production architectures',
					description: 'Mechanically-derived corpora + Cloudflare Vectorize. Cost-line discipline: ask-dad rebuilds at ~$0.0007 per full pass.',
					url: 'https://ninochavez.co/work/ai-products/ask-dad'
				}
			},
			{
				'@type': 'ListItem',
				position: 8,
				item: {
					'@type': 'Thing',
					name: 'Writing practice',
					description: 'Signal Dispatch corpus — 275 artifacts across 7 collections (blog, whitepapers, series, fiction, presentations, counterpoints, tutorials, research notes).',
					url: 'https://blog.ninochavez.co'
				}
			}
		]
	});
}
