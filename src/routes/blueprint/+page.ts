import { listDocs } from './blueprint-docs';

export const prerender = true;

export function load() {
	const docs = listDocs();
	const groups = new Map<string, typeof docs>();
	for (const doc of docs) {
		const existing = groups.get(doc.group) ?? [];
		existing.push(doc);
		groups.set(doc.group, existing);
	}
	const orderedGroups = Array.from(groups.entries()).map(([name, items]) => ({
		name,
		items: items.map((d) => ({ slug: d.slug, title: d.title }))
	}));
	return { groups: orderedGroups };
}
