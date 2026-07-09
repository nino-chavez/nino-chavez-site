#!/usr/bin/env node
// Freshness lane 2 — claim lint (02-prescription.yml P6): volatile facts are
// forbidden in /ai prose and authored data. Model IDs, versioned model names,
// and vendor spec numbers rot silently (the old glossary cited retired models
// as current; the Enterprise track's vendor limits went stale-and-wrong —
// appendix-validation.md). Volatile facts belong in derived/dated data only.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { DATA_DIR, ROUTES_DIR } from './registry.mjs';

const PATTERNS = [
	{ re: /claude-[a-z0-9]+-[a-z0-9]*-?\d{8}/gi, why: 'pinned model ID' },
	{ re: /\b(?:GPT|gpt)-\d[a-z0-9.]*/g, why: 'versioned model name' },
	{ re: /\bClaude\s+\d/g, why: 'versioned model name' },
	{ re: /\bGemini\s+\d/g, why: 'versioned model name' },
	{ re: /under\s+\d+[,\d]*\s+(?:characters|words)/gi, why: 'vendor spec limit stated as fact' }
];
// derived/dated files are the sanctioned home for volatile values
const EXEMPT = new Set(['derived.json', 'writing.json']);

function* walk(dir) {
	for (const name of readdirSync(dir)) {
		const p = path.join(dir, name);
		if (statSync(p).isDirectory()) yield* walk(p);
		else if (/\.(svelte|ts|js|json)$/.test(name) && !EXEMPT.has(name)) yield p;
	}
}

const hits = [];
for (const dir of [ROUTES_DIR, DATA_DIR]) {
	for (const file of walk(dir)) {
		const text = readFileSync(file, 'utf8');
		for (const { re, why } of PATTERNS) {
			re.lastIndex = 0;
			let m;
			while ((m = re.exec(text))) {
				const line = text.slice(0, m.index).split('\n').length;
				hits.push(`${path.relative(process.cwd(), file)}:${line} — "${m[0]}" (${why})`);
			}
		}
	}
}

if (hits.length) {
	console.error(`CLAIM LINT FAIL — ${hits.length} volatile fact(s) in prose/authored data:`);
	for (const h of hits) console.error('  ✗ ' + h);
	console.error('Move volatile values into dated data files (derived.json pattern) or name them generically.');
	process.exit(1);
}
console.log('claim lint green — no volatile facts in /ai prose or authored data');
