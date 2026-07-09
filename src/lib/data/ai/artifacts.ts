/**
 * The evidence registry — ONE array behind /ai/work, the front-door proof
 * strip, and every in-track grounding (03-design-brief.md §2; P5).
 *
 * Hand-authored content lives here; the machine-derived fields (`pushedAt`,
 * `verified`) live in derived.json, written by scripts/ai-freshness/derive.mjs
 * (GitHub API + liveness probes) and merged below — so the scheduled refresh
 * never rewrites authored TypeScript.
 *
 * Evidence tier rule (06-triage.md): `live` is reserved for real products a
 * visitor can use — Rally HQ, the photography site, Blueprint's self-demo.
 * Reachable-but-gated surfaces are `clone` or `gated`, never `live`.
 */
import type { Artifact } from './types';
import derived from './derived.json';

const authored: Omit<Artifact, 'verified' | 'pushedAt'>[] = [
	{
		id: 'blueprint',
		name: 'Blueprint',
		gloss:
			'A CLI that runs a product initiative end to end with an agent — research, strategy docs, prototype, validated handoff.',
		access: 'install',
		href: 'https://blueprint.ninochavez.co',
		command: 'npx @nino-chavez-labs/blueprint-cli init',
		liveUrl: 'https://blueprint.ninochavez.co',
		repo: 'nino-chavez/blueprint',
		tracks: ['architect', 'strategist', 'author'],
		featured: true
	},
	{
		id: 'rally-hq',
		name: 'Rally HQ',
		gloss:
			'A live tournament platform — a real product, planned, built, and shipped with the agentic method this section teaches.',
		access: 'live',
		href: 'https://rallyhq.app',
		liveUrl: 'https://rallyhq.app',
		// repo private — card derives from the liveness probe (04-fact-check.md)
		tracks: ['builder'],
		featured: true
	},
	{
		id: 'photography',
		name: 'Photography',
		gloss:
			'A shipped photography site built the same way — proof the method transfers to a creative craft, not just software.',
		access: 'live',
		href: 'https://ninochavez.co/photography/',
		liveUrl: 'https://ninochavez.co/photography/',
		repo: 'nino-chavez/photography',
		tracks: ['builder'],
		featured: true
	},
	{
		id: 'specchain',
		name: 'specchain',
		gloss:
			'Spec-driven development — a workflow that chains spec → tasks → implementation with verification gates between them.',
		access: 'install',
		href: 'https://github.com/nino-chavez/specchain',
		command: 'npx create-specchain',
		repo: 'nino-chavez/specchain',
		tracks: ['builder'],
		featured: true
	},
	{
		id: 'ask-bc',
		name: 'Ask BC',
		gloss:
			'A production agentic assistant for BigCommerce merchants — 29 store tools, generative UI, confirmation-gated writes.',
		access: 'gated',
		accessNote: 'BigCommerce merchants',
		href: 'https://askbc.ninochavez.co',
		liveUrl: 'https://askbc.ninochavez.co',
		// repo private — derives from the liveness probe
		tracks: ['builder']
	},
	{
		id: 'agentic-ways-of-working',
		name: 'agentic-ways-of-working',
		gloss:
			'The method, public and scrubbed: one canonical working-style doc, per-harness adapters, and the skills and hooks that enforce it.',
		access: 'clone',
		href: 'https://github.com/nino-chavez/agentic-ways-of-working',
		repo: 'nino-chavez/agentic-ways-of-working',
		tracks: ['method']
	},
	{
		id: 'ai-champions-kit',
		name: 'ai-champions-kit',
		gloss:
			'A copy-in library of skills and subagents for driving AI adoption across a team, in tiers from universal to champion.',
		access: 'clone',
		href: 'https://github.com/nino-chavez/ai-champions-kit',
		command: './install.sh --tier universal',
		repo: 'nino-chavez/ai-champions-kit',
		tracks: ['enterprise']
	},
	{
		id: 'claude-recall-cli',
		name: 'claude-recall-cli',
		gloss:
			'Session recall plus the voice-corpus machinery: mine your own transcripts into a searchable memory and a voice stack.',
		access: 'clone',
		href: 'https://github.com/nino-chavez/claude-recall-cli',
		repo: 'nino-chavez/claude-recall-cli',
		tracks: ['voice']
	},
	{
		id: 'atelier',
		name: 'Atelier',
		gloss:
			'A self-hostable template plus a 12-tool agent-interop protocol for mixed human/agent teams — a working substrate to clone and read, not yet a live product.',
		access: 'clone',
		href: 'https://github.com/nino-chavez/atelier',
		repo: 'nino-chavez/atelier',
		tracks: ['builder']
	},
	{
		id: 'cortex',
		name: 'cortex',
		gloss:
			'A local-first Mac app: on-device capture, OCR, transcription, semantic search, and RAG chat over your own screen history.',
		access: 'clone',
		accessNote: 'build from source',
		href: 'https://github.com/nino-chavez/cortex',
		repo: 'nino-chavez/cortex',
		tracks: ['builder']
	},
	{
		id: 'forge-brand',
		name: 'forge-brand',
		gloss:
			'One brand-kit JSON drives tokens, media, components, and docs — the first link in an agent-driven design chain.',
		access: 'clone',
		href: 'https://github.com/nino-chavez/forge-brand',
		repo: 'nino-chavez/forge-brand',
		tracks: ['author']
	},
	{
		id: 'forge-site',
		name: 'forge-site',
		gloss:
			'A playbook, not a runtime: archetypes, modules, and a five-step process for agent-driven site renovation.',
		access: 'read',
		href: 'https://github.com/nino-chavez/forge-site',
		repo: 'nino-chavez/forge-site',
		tracks: ['method']
	},
	{
		id: 'voice-guide',
		name: 'Signal Dispatch voice guide',
		gloss:
			'The public voice guide behind the blog — voice documented precisely enough that an agent can replicate and validate it. Read it, copy the pattern for your own voice.',
		access: 'read',
		href: 'https://github.com/nino-chavez/blog/blob/main/docs/signal-dispatch-voice-guide.md',
		repo: 'nino-chavez/blog',
		tracks: ['voice', 'author']
	}
];

const overlay = (id: string): { pushedAt?: string; verified: string } =>
	(derived.artifacts as Record<string, { pushedAt?: string; verified: string }>)[id] ?? {
		verified: derived.derived
	};

export const artifacts: Artifact[] = authored.map((a) => ({ ...a, ...overlay(a.id) }));

export const byId = (id: string): Artifact | undefined => artifacts.find((a) => a.id === id);
export const featured = artifacts.filter((a) => a.featured);
export const forTrack = (track: string): Artifact[] =>
	artifacts.filter((a) => a.tracks.includes(track as Artifact['tracks'][number]));
