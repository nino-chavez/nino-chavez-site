// Shared line-scan extraction of the /ai artifact registry's derivation inputs
// (id / repo / liveUrl / href) from artifacts.ts. A regex scan, not a TS parse —
// the fields are flat quoted scalars by contract (types.ts); if the shape ever
// changes, these scripts fail loudly in CI rather than silently derive nothing.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const DATA_DIR = path.join(ROOT, 'src', 'lib', 'data', 'ai');
export const ROUTES_DIR = path.join(ROOT, 'src', 'routes', 'ai');

export function readRegistry() {
	const src = readFileSync(path.join(DATA_DIR, 'artifacts.ts'), 'utf8');
	const entries = [];
	// Split on object openings inside the authored array; scan flat fields.
	const blocks = src.split(/\n\t\{\n/).slice(1);
	for (const block of blocks) {
		const f = (key) => {
			const m = new RegExp(`${key}:\\s*'([^']*)'`).exec(block);
			return m ? m[1] : undefined;
		};
		const id = f('id');
		if (!id) continue;
		entries.push({ id, repo: f('repo'), liveUrl: f('liveUrl'), href: f('href') });
	}
	if (entries.length === 0) {
		throw new Error('registry extraction found 0 artifacts — artifacts.ts shape changed?');
	}
	return entries;
}

export const today = () => new Date().toISOString().slice(0, 10);
