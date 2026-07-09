/**
 * Builder track — ported from src/routes/ai/learn/builder/+page.svelte per the
 * Stage 1 verdicts (research/current-state/old-corpus-inventory.md §5):
 * level spine and who-for Mined verbatim; tool links moved to sensor-covered
 * data (stable doc roots, stale hosts corrected per appendix-validation.md);
 * mailto CTA cut (P7); grounding bound to shipped artifacts (P4, 06-triage.md
 * evidence tier: Rally HQ leads as the live product destination).
 */
import type { Track } from '../types';

export const builder: Track = {
	id: 'builder',
	title: 'Builder',
	tagline: 'Build production apps with AI',
	description:
		'From "I\'ve never used AI to code" to shipping production systems with observability and governance.',
	finalArtifact: 'Deployed production application',
	timeline: '8-12 weeks',
	hero: {
		h1: 'Learning to Build Production AI Systems',
		subhead:
			'From "I\'ve never used AI to code" to "I ship production systems with observability and governance."'
	},
	whoFor: {
		for: [
			"You're a developer who wants to ship AI-powered software",
			'You learn by building, not by watching tutorials',
			'You want production-ready code, not demo projects',
			"You're comfortable with JavaScript/TypeScript and web development"
		],
		notFor: [
			'You want a curriculum to passively consume',
			"You're collecting credentials — the artifact here is a deployed app, not a certificate"
		]
	},
	grounding: [
		{
			artifactId: 'rally-hq',
			role: 'A live tournament platform built end to end with this method — the path\'s destination, running in production.'
		},
		{
			artifactId: 'specchain',
			role: 'The spec → tasks → implementation workflow this track teaches, as an installable tool.'
		},
		{
			artifactId: 'ask-bc',
			role: 'A production agentic assistant — proof the Level 3-4 patterns ship, not just demo.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Orientation',
			duration: '1-2 days',
			goal: 'Understand the landscape before you start walking.',
			checkpoint:
				'You can explain key AI concepts (LLM, RAG, agents) and why AI-assisted development differs from chat interfaces',
			sections: [
				{
					label: 'Terms that matter',
					kind: 'keyval',
					items: [
						'LLM — Large Language Model, the engine behind every tool here',
						'RAG — Retrieval-Augmented Generation: giving AI context from your documents',
						'Prompt Engineering — designing inputs that get useful outputs',
						'Agentic AI — AI that takes actions, not just generates text'
					]
				},
				{
					label: 'Read',
					kind: 'keyval',
					items: [
						'Anthropic\'s prompt engineering guide — platform.claude.com/docs',
						'AI SDK overview (how modern apps integrate LLMs) — ai-sdk.dev'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You can explain LLM, RAG, and agentic AI to a colleague',
						'You understand what an "AI agent" does that a simple prompt doesn\'t',
						'You can set up a new SvelteKit or Next.js project from scratch'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Ship Your First AI App',
			duration: '1 week',
			goal: 'Get your hands dirty. Build something — anything — with AI assistance.',
			checkpoint: 'You have a deployed application you can show',
			sections: [
				{
					label: 'Set up',
					kind: 'keyval',
					items: [
						'Claude Code — CLI-based AI assistance (what this whole site is built with) — code.claude.com/docs',
						'Cursor — an IDE with AI built in — cursor.com'
					]
				},
				{
					label: 'Pick a project',
					kind: 'list',
					items: [
						'A personal dashboard that pulls data from an API you use',
						'A CLI tool that automates something tedious in your workflow',
						'A simple web app that solves a real problem you have'
					]
				},
				{
					label: 'Rules',
					kind: 'list',
					items: [
						'Must be functional (not a mockup)',
						'Must use AI assistance throughout — keep your prompts',
						'Must be deployed somewhere (Cloudflare, Vercel, Netlify, anywhere)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You have a deployed application',
						'You can show what you built',
						'You can articulate what was hard and what was easy'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Specs, Databases & Workflows',
			duration: '2-4 weeks',
			goal: 'Move from experimental prompting to documented, repeatable workflows.',
			checkpoint: 'You have a spec document and your app has a database and authentication',
			sections: [
				{
					label: 'Skills',
					kind: 'keyval',
					items: [
						'Prompt patterns — zero-shot vs few-shot, chain-of-thought, system vs user prompts, picking the right model for the task',
						'Context management — the right context without overwhelming the model; RAG basics; when to start fresh vs continue a thread',
						'Plan-first development — write specs before code, have AI generate plans then execute them, document decisions as you go. This is exactly what specchain packages: npx create-specchain'
					]
				},
				{
					label: 'Project: rebuild your Level 1 app — better',
					kind: 'list',
					items: [
						'A written spec, before you start',
						'Structured prompts, not just "build me X"',
						'Documentation generated alongside the code',
						'At least one integration (database, API, external service)'
					]
				},
				{
					label: 'A stack that works',
					kind: 'keyval',
					items: [
						'Frontend — Next.js or SvelteKit (pick one)',
						'Database — Supabase (PostgreSQL + auth + realtime)',
						'Styling — Tailwind CSS',
						'Type safety — TypeScript, strict mode',
						'Testing — Playwright for end-to-end'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You have a spec document for your rebuilt app',
						'Your app has a database and authentication',
						'You can explain your prompt workflow to someone else',
						"You've hit at least 3 walls and figured out how to get past them"
					]
				}
			]
		},
		{
			level: 3,
			title: 'Multiple Models & Tool Use',
			duration: '4-8 weeks',
			goal: 'Move from single AI calls to multi-step workflows with tool use.',
			checkpoint: 'You\'ve built something that feels like an "agent," not just a "chatbot"',
			sections: [
				{
					label: 'Skills',
					kind: 'keyval',
					items: [
						'Multi-provider integration — when each model family fits, cost optimization, fallbacks, streaming (AI SDK: ai-sdk.dev; LangChain for complex chains; direct API for full control)',
						'Agentic patterns — reflection, tool use, planning, multi-agent, and MCP for standardized tool definitions (modelcontextprotocol.io)',
						'RAG systems — chunking strategies, vector embeddings and similarity search, hybrid search, context-window management (supabase.com/docs/guides/ai)'
					]
				},
				{
					label: 'Worked patterns from real systems',
					kind: 'keyval',
					items: [
						'Agentic product feed — AI analyzes a catalog, generates optimized descriptions, validates against brand guidelines, exports to channels',
						'Search query orchestration — query → intent classification → multi-source retrieval → LLM reranking → structured response',
						'Data quality agent — monitors incoming data, flags issues, suggests corrections, routes to human review. Ask BC ships this family of patterns in production against live stores'
					]
				},
				{
					label: 'Project: build something that uses tools',
					kind: 'list',
					items: [
						'Calls at least 2 external tools or APIs',
						'Makes decisions based on retrieved data',
						'Handles errors gracefully',
						'Logs its reasoning'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Your app uses multiple AI providers or tools',
						'You understand why different models fit different tasks',
						'You can implement basic RAG — retrieve context, augment the prompt',
						'You\'ve built something that feels like an "agent," not just a "chatbot"'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Production Systems & Observability',
			duration: '8+ weeks',
			goal: 'Build systems that are production-grade, not just demos.',
			checkpoint: 'You can show metrics, cost tracking, and output validation',
			sections: [
				{
					label: 'What production-grade means',
					kind: 'keyval',
					items: [
						'Reliability — it works consistently, not just sometimes',
						'Observability — you know when it fails and why',
						'Cost control — you are not burning money on API calls',
						"Safety — it doesn't do things it shouldn't"
					]
				},
				{
					label: 'Skills',
					kind: 'keyval',
					items: [
						'LLM observability — tracing every request, cost per request, latency, quality drift (langfuse.com/docs)',
						'Testing AI systems — evaluating non-deterministic outputs, regression testing for prompts, end-to-end tests with AI components',
						'Governance and safety — prompt-injection prevention, output validation, audit trails, rate limiting and cost caps per user'
					]
				},
				{
					label: 'Project: add observability & governance to your Level 3 app',
					kind: 'list',
					items: [
						'Add tracing — every AI call logged',
						'Add cost tracking — know your spend per user and per request',
						'Add output validation — catch bad responses before they reach users',
						'Add basic access control — who can use which features'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You can show metrics from your AI system',
						'You know your cost per request',
						'You have validation that catches bad AI outputs',
						"You've thought about what your AI shouldn't do"
					]
				}
			]
		}
	],
	cta: {
		primary: { label: 'Start at Level 0', href: '#level-0' },
		secondary: { label: 'npx create-specchain', href: 'https://github.com/nino-chavez/specchain' }
	}
};
