#!/usr/bin/env node
// Freshness lane 2 — SENSE, fail loudly (02-prescription.yml P6).
// Probes every live/link claim the /ai surface makes and fails CI before a
// visitor can meet a dead link. Each of the old surface's failures maps to a
// check here: cert expiry (labs), dead endpoint (Ask), dead route
// (code-to-cognition), silent staleness (the whole corpus).
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { readRegistry, DATA_DIR } from './registry.mjs';

const STALE_DAYS = 21; // derived.json older than this fails — the loop must keep running

const failures = [];

async function probe(url, label) {
	try {
		const res = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			signal: AbortSignal.timeout(15000),
			headers: { 'user-agent': 'ai-freshness-probe (ninochavez.co sensor)' }
		});
		if (!res.ok) failures.push(`${label}: ${url} → HTTP ${res.status}`);
	} catch (err) {
		// TLS/cert failures and DNS errors land here — exactly the labs-cert class.
		failures.push(`${label}: ${url} → ${err.cause?.code ?? err.name}: ${err.message}`);
	}
}

const registry = readRegistry();
const urls = new Map();
for (const a of registry) {
	if (a.liveUrl) urls.set(a.liveUrl, `${a.id} (live claim)`);
	if (a.href?.startsWith('http')) urls.set(a.href, `${a.id} (link)`);
	if (a.repo) urls.set(`https://github.com/${a.repo}`, `${a.id} (repo)`);
}

await Promise.all([...urls.entries()].map(([url, label]) => probe(url, label)));

// Staleness gate: an aging derivation is a silent lie waiting to render.
const derived = JSON.parse(readFileSync(path.join(DATA_DIR, 'derived.json'), 'utf8'));
const ageDays = (Date.now() - new Date(derived.derived).getTime()) / 86400000;
if (ageDays > STALE_DAYS) {
	failures.push(
		`derived.json is ${Math.floor(ageDays)} days old (threshold ${STALE_DAYS}) — the scheduled derive loop has stopped running`
	);
}

if (failures.length) {
	console.error(`SENSOR FAIL — ${failures.length} claim(s) would lie to a visitor:`);
	for (const f of failures) console.error('  ✗ ' + f);
	process.exit(1);
}
console.log(`sensors green — ${urls.size} URLs probed, derivation ${Math.floor(ageDays)}d old`);
