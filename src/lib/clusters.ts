// Cluster IA source-of-truth per ADR-0009.
//
// Counts are derived from blueprint/research/current-state/repos-inventory.md
// + writing-corpus.md. Source-of-truth lives in the markdown inventories;
// this module mirrors them for SvelteKit consumption. If counts drift,
// re-derive from the inventories before editing this file.

export interface Cluster {
	id: string;
	label: string;
	count: number;
	publicCount: number;
	tagline: string;
	composition: 'production-line-schematic' | 'repo-card-grid' | 'case-study-deep-dive' | 'hero-case-study' | 'live-url-list' | 'compact-list' | 'pointer';
}

export const clusters: Cluster[] = [
	{
		id: 'forge-production-line',
		label: 'Forge production line',
		count: 8,
		publicCount: 1,
		tagline: 'The toolchain that built everything below.',
		composition: 'production-line-schematic'
	},
	{
		id: 'agent-infrastructure',
		label: 'Agent infrastructure',
		count: 10,
		publicCount: 1,
		tagline: 'Coordination, recall, parallel orchestration.',
		composition: 'repo-card-grid'
	},
	{
		id: 'ai-products',
		label: 'AI products',
		count: 18,
		publicCount: 6,
		tagline: 'Shipped bets across the inference surface.',
		composition: 'case-study-deep-dive'
	},
	{
		id: 'commerce-bc',
		label: 'Commerce / BC',
		count: 10,
		publicCount: 1,
		tagline: 'Day-job-adjacent + side-project commerce engineering.',
		composition: 'case-study-deep-dive'
	},
	{
		id: 'volleyball-630',
		label: '630 / volleyball',
		count: 9,
		publicCount: 1,
		tagline: 'Longest-running build cluster — paired with blueprint.rallyhq.app.',
		composition: 'hero-case-study'
	},
	{
		id: 'personal-orbit',
		label: 'Personal orbit',
		count: 7,
		publicCount: 0,
		tagline: 'Live URLs around the personal brand.',
		composition: 'live-url-list'
	},
	{
		id: 'client-work',
		label: 'Client work',
		count: 4,
		publicCount: 0,
		tagline: 'Present, not selling.',
		composition: 'compact-list'
	},
	{
		id: 'writing',
		label: 'Writing',
		count: 275,
		publicCount: 275,
		tagline: '~275 published artifacts across 7 collections.',
		composition: 'pointer'
	}
];
