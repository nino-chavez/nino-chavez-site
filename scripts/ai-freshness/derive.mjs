#!/usr/bin/env node
// Freshness lane 1 — DERIVE (02-prescription.yml P6): anything with a
// canonical source elsewhere is rendered, never restated. Refreshes
// derived.json (GitHub pushedAt + probe-verified dates) and writing.json
// (latest posts from the live blog feed). Run by the scheduled workflow;
// changes arrive as a PR (lane 3 scaffold), so prose stays human-reviewed
// while data flows.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { readRegistry, DATA_DIR, today } from './registry.mjs';

const GH_HEADERS = {
	'user-agent': 'ai-freshness-derive (ninochavez.co)',
	accept: 'application/vnd.github+json',
	...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
};

async function pushedAt(repo) {
	const res = await fetch(`https://api.github.com/repos/${repo}`, {
		headers: GH_HEADERS,
		signal: AbortSignal.timeout(15000)
	});
	if (!res.ok) throw new Error(`GitHub ${repo} → ${res.status}`);
	return (await res.json()).pushed_at.slice(0, 10);
}

async function alive(url) {
	try {
		const res = await fetch(url, {
			redirect: 'follow',
			signal: AbortSignal.timeout(15000),
			headers: { 'user-agent': 'ai-freshness-derive (ninochavez.co)' }
		});
		return res.ok;
	} catch {
		return false;
	}
}

// ── derived.json ─────────────────────────────────────────────────────────────
const registry = readRegistry();
const derivedPath = path.join(DATA_DIR, 'derived.json');
const prev = JSON.parse(readFileSync(derivedPath, 'utf8'));
const next = { _comment: prev._comment, derived: today(), artifacts: {} };
let failures = 0;

for (const a of registry) {
	const entry = {};
	if (a.repo) {
		try {
			entry.pushedAt = await pushedAt(a.repo);
		} catch (err) {
			console.error(`  ! ${a.id}: ${err.message} — keeping previous pushedAt`);
			if (prev.artifacts[a.id]?.pushedAt) entry.pushedAt = prev.artifacts[a.id].pushedAt;
			failures++;
		}
	}
	// `verified` only advances when the claim actually verifies — an unreachable
	// URL keeps its old date and the probe (separate script) fails the build.
	const target = a.liveUrl ?? (a.href?.startsWith('http') ? a.href : null);
	entry.verified = target && (await alive(target)) ? today() : (prev.artifacts[a.id]?.verified ?? prev.derived);
	next.artifacts[a.id] = entry;
	console.log(`  ${a.id}: pushed ${entry.pushedAt ?? '—'} · verified ${entry.verified}`);
}

writeFileSync(derivedPath, JSON.stringify(next, null, '\t') + '\n');

// ── writing.json (blog RSS → latest 3) ──────────────────────────────────────
try {
	const rss = await (
		await fetch('https://ninochavez.co/blog/rss.xml', { signal: AbortSignal.timeout(15000) })
	).text();
	const items = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 3).map(([, item]) => {
		const pick = (tag) =>
			(item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`)) ?? [])[1]?.trim();
		return {
			title: pick('title'),
			url: pick('link'),
			date: new Date(pick('pubDate')).toISOString().slice(0, 10)
		};
	});
	if (items.length && items.every((i) => i.title && i.url && i.date)) {
		const writingPath = path.join(DATA_DIR, 'writing.json');
		const writing = JSON.parse(readFileSync(writingPath, 'utf8'));
		writeFileSync(
			writingPath,
			JSON.stringify({ _comment: writing._comment, derived: today(), posts: items }, null, '\t') + '\n'
		);
		console.log(`  writing: ${items.length} posts from the live feed`);
	} else {
		console.error('  ! RSS parse produced incomplete items — writing.json left unchanged');
		failures++;
	}
} catch (err) {
	console.error(`  ! blog RSS unreachable (${err.message}) — writing.json left unchanged`);
	failures++;
}

process.exit(failures ? 2 : 0); // 2 = partial derive; workflow surfaces it without blocking the PR
