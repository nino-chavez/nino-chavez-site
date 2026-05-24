// Build-time loader for all docs under /blueprint/**.
// Used by both the index route and the [...slug] doc renderer.
// Markdown and YAML are both surfaced — YAML gets wrapped in a fenced code
// block downstream so it renders through the same marked() path.

const mdModules = import.meta.glob('/blueprint/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const ymlModules = import.meta.glob('/blueprint/**/*.yml', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

export type DocExt = 'md' | 'yml';

export interface BlueprintDoc {
	slug: string;
	title: string;
	group: string;
	groupOrder: number;
	order: number;
	ext: DocExt;
	content: string;
}

function extractTitle(content: string, fallback: string): string {
	const m = content.match(/^#\s+(.+?)\s*$/m);
	if (m) return m[1].trim();
	return fallback;
}

function classify(slug: string): { group: string; groupOrder: number; order: number } {
	if (slug === 'HANDOFF') return { group: 'Operating Doc', groupOrder: 0, order: 0 };
	if (slug === 'README') return { group: 'Overview', groupOrder: 1, order: 0 };
	if (slug === 'DESIGN-PRINCIPLES')
		return { group: 'Stage 2 — Design Principles', groupOrder: 2, order: 0 };
	if (slug === '01-diagnose') return { group: 'Stage 2 — Diagnose', groupOrder: 3, order: 0 };
	if (slug === '02-prescription') return { group: 'Stage 3 — Prescription', groupOrder: 4, order: 0 };
	if (slug === '03-design-brief')
		return { group: 'Stage 3.5 — Design Brief', groupOrder: 5, order: 0 };
	if (slug.startsWith('decisions/')) {
		const m = slug.match(/decisions\/(\d+)/);
		const order = m ? parseInt(m[1], 10) : 99;
		return { group: 'Decisions (ADRs)', groupOrder: 6, order };
	}
	if (slug.startsWith('content/')) return { group: 'Phase 2 Content Drafts', groupOrder: 7, order: 0 };
	return { group: 'Other', groupOrder: 99, order: 0 };
}

function buildDocs(): Map<string, BlueprintDoc> {
	const docs = new Map<string, BlueprintDoc>();

	for (const [path, raw] of Object.entries(mdModules)) {
		const slug = path.replace('/blueprint/', '').replace(/\.md$/, '');
		const cls = classify(slug);
		docs.set(slug, {
			slug,
			title: extractTitle(raw, slug),
			...cls,
			ext: 'md',
			content: raw
		});
	}

	for (const [path, raw] of Object.entries(ymlModules)) {
		const slug = path.replace('/blueprint/', '').replace(/\.yml$/, '');
		const cls = classify(slug);
		const firstLine = raw.split('\n').find((l) => l.trim().startsWith('#'));
		const title = firstLine ? firstLine.replace(/^#\s*/, '').trim() : slug;
		docs.set(slug, {
			slug,
			title,
			...cls,
			ext: 'yml',
			content: raw
		});
	}

	return docs;
}

export const blueprintDocs = buildDocs();

export function listDocs(): BlueprintDoc[] {
	return Array.from(blueprintDocs.values()).sort((a, b) => {
		if (a.groupOrder !== b.groupOrder) return a.groupOrder - b.groupOrder;
		if (a.order !== b.order) return a.order - b.order;
		return a.slug.localeCompare(b.slug);
	});
}

export function getDoc(slug: string): BlueprintDoc | undefined {
	return blueprintDocs.get(slug);
}

export function listSlugs(): string[] {
	return Array.from(blueprintDocs.keys());
}
