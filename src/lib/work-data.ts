/**
 * Work Portfolio Data — v3 refresh
 *
 * Lead slate of 5 case studies (rally-hq, atelier, ask-bc, photography,
 * bc-subscriptions). signal-forge and agent-os live on /practice as
 * toolchain rows (under their canonical names forge-signal and as part of
 * the production-line story respectively), not as case studies here.
 * Honorable-mention entries (aix, cix, six, cpa) retained as `featured: false`
 * for the honorable-mentions strip.
 *
 * Source draft: blueprint/content/work-data-refresh.md
 */

export interface WorkProject {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	category: 'zero-to-one' | 'ai-tools' | 'platforms' | 'open-source';
	status: 'production' | 'active' | 'beta' | 'archived';
	visibility: 'public' | 'private' | 'partial';

	demo?: string;
	github?: string;
	docs?: string;

	stack: string[];
	architecture: string[];
	keyDecisions: string[];

	metrics: {
		label: string;
		value: string;
		context?: string;
	}[];
	outcomes: string[];

	problem: string;
	approach: string;
	learned: string[];

	heroImage: string;
	screenshots?: string[];

	started: string;
	duration?: string;

	featured: boolean;
	order: number;

	// v3 additions
	pullQuote?: string;
	quotableArtifacts?: Array<{
		label: string;
		href: string;
		excerpt?: string;
	}>;
	schematic?: string;
}

export const WORK_CATEGORIES = [
	{
		id: 'zero-to-one',
		label: 'Zero to One',
		description: 'Full products built from scratch',
		color: 'emerald'
	},
	{
		id: 'ai-tools',
		label: 'AI Tools & Frameworks',
		description: 'Tools for working with AI',
		color: 'violet'
	},
	{
		id: 'platforms',
		label: 'Platforms',
		description: 'Intelligence and transformation tools',
		color: 'blue'
	},
	{
		id: 'open-source',
		label: 'Open Source',
		description: 'Public tools and reference implementations',
		color: 'amber'
	}
] as const;

export const WORK_PROJECTS: WorkProject[] = [
	// ============================================
	// LEAD SLATE — 5 case studies
	// ============================================
	{
		slug: 'rally-hq',
		title: 'Rally HQ + Blueprint',
		tagline:
			'A tournament management product and the methodology that produced it — both live, two surfaces',
		description:
			'Real-time tournament management platform for volleyball and similar sports. Mobile-first scorekeeper, multi-tenant architecture, capability-based permissions, drag-and-drop scheduling, white-label branding. Paired with a public blueprint surface that documents the big-blueprint methodology applied to build it.',
		category: 'zero-to-one',
		status: 'production',
		visibility: 'public',

		demo: 'https://rallyhq.app',
		docs: 'https://blueprint.rallyhq.app',

		stack: [
			'SvelteKit 2',
			'Svelte 5',
			'TypeScript',
			'Supabase',
			'PostgreSQL',
			'Tailwind CSS',
			'Vercel'
		],
		architecture: [
			'Capability-based permission system (not role-based)',
			'Real-time bracket updates via Supabase Realtime',
			'Multi-tenant architecture with RLS',
			'Mobile-first scorekeeper as primary surface',
			'WCAG 2.1 AA throughout'
		],
		keyDecisions: [
			'Capability-based permissions over RBAC for organizer flexibility',
			'Real-time as core infrastructure from day one, not bolted on',
			'Public blueprint surface as a separate Pages site, not a /blueprint route — methodology is its own product'
		],

		metrics: [
			{ label: 'Surfaces Live', value: '2', context: 'rallyhq.app + blueprint.rallyhq.app' },
			{ label: 'Initial Build', value: '7 days', context: 'Zero to production' },
			{ label: 'Readiness', value: '88/100', context: 'Production assessment' }
		],
		outcomes: [
			'Production multi-tenant SaaS with real users',
			'Public methodology surface — blueprint outputs from the 7-stage big-blueprint pipeline',
			'Demo mode for evaluator access',
			'White-label branding for tournament operators'
		],

		problem:
			'Tournament management is fragmented across spreadsheets, group chats, and outdated desktop software. Directors need a modern platform for registration, scheduling, brackets, and scoring — mobile-first because scorekeeping happens at the court.',
		approach:
			'Built solo using the big-blueprint methodology — 7-stage pipeline (research → design principles → prototype → fact-check → docs → deploy → iterate). The blueprint outputs ship as a public surface at blueprint.rallyhq.app, separate from the product itself. Built through the codified production line (specchain → big-blueprint → forge-brand → forge-signal → gen-images), with the brand and copy resolving to one source-of-truth JSON.',
		learned: [
			'Capability-based auth is worth the upfront complexity for organizer-facing products',
			'Real-time needs to be core infrastructure, not an afterthought — retrofitting is more work than designing for it',
			'Shipping the methodology as a separate public surface is a forcing function for actually following it'
		],

		pullQuote:
			'Product and methodology shipped to two surfaces of one offering. The methodology side proves the discipline; the product side proves it works.',
		quotableArtifacts: [
			{
				label: 'DESIGN-PRINCIPLES.md',
				href: 'https://blueprint.rallyhq.app',
				excerpt: '7 design rules (R1 opinionated UI, R2 display-primary, R3 tournament-day mode, ...)'
			},
			{
				label: 'Per-page _meta',
				href: 'https://blueprint.rallyhq.app',
				excerpt: 'Strategy + current-state drawer per page — fact-check citations live with the prototype'
			}
		],
		schematic: 'rally-hq-blueprint-pipeline.svg',
		heroImage: '/case-studies/rally-hq/schematic.svg',

		started: '2025-10',
		duration: '7 days initial; ongoing iteration',
		featured: true,
		order: 1
	},
	{
		slug: 'atelier',
		title: 'Atelier',
		tagline:
			'A spine connecting tools around one project so mixed human + AI teams can author concurrently without drift',
		description:
			'OSS project template + agent interop protocol + reference prototype. Mixed teams of humans and AI agents concurrently author one canonical artifact across IDE, browser, and terminal surfaces. Author of the 12-tool open MCP protocol; reference implementation runs on Cloudflare Workers + Supabase with role-aware lenses, find_similar with hybrid retrieval, fenced locks, and an SSE Durable Object for per-project fan-out.',
		category: 'platforms',
		status: 'production',
		visibility: 'public',

		demo: 'https://atelier.ninochavez.co',
		github: 'https://github.com/nino-chavez/atelier',
		docs: 'https://github.com/nino-chavez/atelier#readme',

		stack: [
			'Next.js',
			'OpenNext (Cloudflare Workers)',
			'Supabase',
			'Hyperdrive',
			'Durable Objects',
			'MCP',
			'TypeScript'
		],
		architecture: [
			'12-tool open MCP protocol (specification, not a product)',
			'Cloudflare Workers via OpenNext (per ADR-052 — pivoted off Vercel)',
			'Hyperdrive for Postgres pooling to Supabase, RLS via per-tx SET LOCAL ROLE',
			'SSE Durable Object for per-project_id fan-out (broadcast-worker)',
			'Five separate cron triggers (reaper, mirror-delivery, reconcile, triage, alert-publisher)'
		],
		keyDecisions: [
			'Three first-class engagement tiers (Specification / Reference Implementation / Reference Deployment) — all OSS',
			'Cloudflare-primary infrastructure per ADR-052; Vercel deploy was the v0 substrate',
			'BroadcastService seam decouples DO implementation from transport — swappable to Postgres NOTIFY without binding changes'
		],

		metrics: [
			{ label: 'Milestones Shipped', value: 'M0 → M7', context: 'v1 substrate complete' },
			{ label: 'MCP Tools', value: '12', context: 'Open protocol' },
			{ label: 'CLI Surface', value: '6 + 7', context: 'Polished commands + pointer-stubs for v1.x' }
		],
		outcomes: [
			'OSS specification (12-tool MCP protocol) usable on any stack',
			'Reference implementation live at atelier.ninochavez.co',
			'`atelier init` / `atelier deploy` lifecycle CLI for fresh projects'
		],

		problem:
			'Mixed teams of humans and AI agents work in different surfaces (IDE, browser, terminal) and across overlapping work. Without a coordination layer, contributions drift — locks are informal, conventions vary by composer, and the canonical state is whatever the loudest tool last wrote.',
		approach:
			'Independent evolution of an ai-hive project Nino started at Commerce Inc. Atelier is the unconstrained rebuild — a 12-tool open MCP protocol plus a reference Cloudflare Workers implementation. The methodology is published as ADRs (52+ ADRs and counting) and the protocol is published independently of the implementation, so other implementers can ship Atelier on a different stack.',
		learned: [
			'The protocol is the durable artifact; the implementation is one example',
			'Cloudflare Workers + OpenNext is a viable hosting target for stateful Next.js apps when Hyperdrive owns the connection pool',
			'Role-aware lenses are how you make a multi-composer interface legible — single-view is hostile to mixed teams'
		],

		pullQuote:
			'Atelier is the spine that connects existing best-in-class tools around one project so mixed teams can work concurrently without drift.',
		quotableArtifacts: [
			{
				label: 'ADR-052 Cloudflare pivot',
				href: 'https://github.com/nino-chavez/atelier/blob/main/docs/decisions/0052-cloudflare-primary.md'
			},
			{
				label: 'NORTH-STAR.md',
				href: 'https://github.com/nino-chavez/atelier/blob/main/docs/strategic/NORTH-STAR.md'
			},
			{
				label: 'M7-exit audit',
				href: 'https://github.com/nino-chavez/atelier/blob/main/docs/architecture/audits/milestone-M7-exit.md'
			}
		],
		schematic: 'atelier-12-tool-mcp.svg',
		heroImage: '/case-studies/atelier/schematic.svg',

		started: '2025-04',
		duration: 'M0–M7 shipped; v1.x scope ongoing',
		featured: true,
		order: 2
	},
	{
		slug: 'ask-bc',
		title: 'Ask BC',
		tagline:
			'Hybrid agentic-AI assistant for commerce platforms — Vercel + Cloudflare Worker + Durable Objects per store',
		description:
			'Production-grade AI store assistant. Next.js on Vercel handles OAuth and the admin iframe shell. The agent runtime runs in a Cloudflare Worker as a Durable Object per store. Read tools execute inside a Codemode sandbox; write tools run outside with a two-turn confirmation gate. Sonnet/Haiku model routing, 29 commerce-API tools, generative UI with seven block components.',
		category: 'ai-tools',
		status: 'production',
		visibility: 'public',

		demo: 'https://askbc.ninochavez.co',
		github: 'https://github.com/nino-chavez/ask-bc',

		stack: [
			'Next.js',
			'Vercel',
			'Cloudflare Workers',
			'Durable Objects',
			'Anthropic (Sonnet + Haiku)',
			'@cloudflare/think',
			'@cloudflare/codemode',
			'Upstash Redis',
			'BigCommerce API'
		],
		architecture: [
			'Vercel: OAuth + admin iframe shell',
			'Cloudflare Worker: agent runtime as Durable Object per store',
			'Codemode sandbox: read tools execute as model-generated TypeScript chaining commerce-API calls',
			'Two-turn confirmation gate: write tools run outside the sandbox with explicit user confirmation',
			'Generative UI: 7 block components the model can render inline'
		],
		keyDecisions: [
			'Hybrid topology (Vercel + CF Worker) because OAuth + iframe live best on Vercel, but per-store stateful agent runtime needs Durable Objects',
			'Codemode sandbox for reads — model writes the call chain, Codemode executes it in a Dynamic Worker',
			'Two-turn confirmation for writes — the safety mechanism for an agent that can mutate merchant data'
		],

		metrics: [
			{
				label: 'Commerce-API Tools',
				value: '29',
				context: 'BC Catalog, Orders, Customers, Promotions, ...'
			},
			{ label: 'Model Routing', value: '2', context: 'Sonnet for reasoning, Haiku for classification' },
			{ label: 'UI Block Components', value: '7', context: 'Generative inline rendering' }
		],
		outcomes: [
			'Production agentic assistant for merchants',
			'Reference pattern for hybrid Vercel + CF Worker architecture',
			'Two-turn confirmation pattern as a quotable safety mechanism for write-capable agents'
		],

		problem:
			'Merchants spend hours navigating commerce-platform admin UIs to perform multi-step tasks (e.g., "find all orders with status X and apply discount Y"). Existing platform UIs are deeply nested; an agentic assistant could collapse this into one conversation — but only if the safety model handles writes correctly.',
		approach:
			'Built a hybrid runtime where OAuth + admin shell sit on Vercel (where Next.js is happy) and the per-store agent runtime sits on a Cloudflare Worker Durable Object (where stateful per-tenant execution is cheap). Reads go through a Codemode sandbox (model writes the call chain as TypeScript, Codemode executes it in a Dynamic Worker); writes go through a two-turn confirmation gate.',
		learned: [
			"Hybrid Vercel + CF Worker is a viable production pattern when each platform owns what it's best at — don't force one to do both",
			'Codemode for reads is dramatically better than tool-by-tool function calling — the model can plan and execute in one structured turn',
			'Two-turn confirmation is a non-negotiable safety primitive for write-capable agents; the UX cost is small and the safety win is large'
		],

		pullQuote:
			'Hybrid: Next.js on Vercel handles OAuth and the admin shell. The agent runtime runs in a Cloudflare Worker as a Durable Object per store. Read tools execute inside a Codemode sandbox; write tools run outside with a two-turn confirmation gate.',
		quotableArtifacts: [
			{ label: 'README architecture section', href: 'https://github.com/nino-chavez/ask-bc#readme' },
			{
				label: 'agent-runtime Worker',
				href: 'https://github.com/nino-chavez/ask-bc/blob/main/workers/agent-runtime/src/index.ts'
			}
		],
		schematic: 'ask-bc-hybrid-arch.svg',
		heroImage: '/case-studies/ask-bc/schematic.svg',

		started: '2025-08',
		duration: 'Production, ongoing',
		featured: true,
		order: 3
	},
	{
		slug: 'photography',
		title: 'Photography — ninochavez.co/photography',
		tagline:
			'20,000-photo action-sports gallery on SvelteKit + Supabase + Cloudflare R2 / Images / Workers, AAA accessibility, AI-enriched semantic search',
		description:
			'Production photography site at scale. SvelteKit 2 + Svelte 5 + Supabase metadata + Cloudflare R2 for original storage + Cloudflare Images for variant delivery + a custom Cloudflare Worker for album-zip generation. AI enrichment via Gemini for play type, intensity, composition, lighting — enables semantic search without manual tagging. AAA accessibility throughout. Lighthouse > 90 across categories.',
		category: 'platforms',
		status: 'production',
		visibility: 'public',

		demo: 'https://ninochavez.co/photography',
		github: 'https://github.com/nino-chavez/nino-chavez-gallery',

		stack: [
			'SvelteKit 2',
			'Svelte 5',
			'TypeScript',
			'Supabase',
			'PostgreSQL',
			'Cloudflare R2',
			'Cloudflare Images',
			'Cloudflare Workers',
			'Google Gemini',
			'Tailwind CSS'
		],
		architecture: [
			'Cloudflare Images named variants (thumbnail / grid / medium / large / public) — pre-configured, faster than on-the-fly transforms',
			'Responsive srcset: 400w / 800w / 1600w with viewport-aware quality',
			'Custom Worker for album-zip generation (streams R2 originals into a zip without buffering)',
			'Gemini-enriched metadata for semantic search (play type, intensity, composition, lighting)',
			'WCAG 2.1 AAA — keyboard nav, ARIA, contrast, reduce-motion fallback throughout'
		],
		keyDecisions: [
			'Cloudflare Images variants over on-the-fly transforms — set up once in dashboard, predictable performance',
			'Custom Worker for album zips instead of buffering in Node — streaming approach handles 1000+ photo albums without OOM',
			"AI enrichment for tags instead of manual — 20K photos couldn't be tagged manually; Gemini classifies in batch"
		],

		metrics: [
			{ label: 'Photos', value: '20,000+', context: 'Live in the gallery' },
			{ label: 'Accessibility', value: 'AAA', context: 'WCAG 2.1' },
			{ label: 'Lighthouse', value: '>90', context: 'Across categories' }
		],
		outcomes: [
			'Production gallery at real scale',
			'Custom Worker pattern for streaming album-zip generation',
			'Reference impl of AI-enrichment-driven semantic search'
		],

		problem:
			"Action-sports photography at volume (20K+ images across tournaments and events) needs a gallery that loads fast on mobile, allows semantic search, and meets accessibility standards. Off-the-shelf gallery products either don't scale, don't do semantic search, or fail accessibility audits.",
		approach:
			'Built end-to-end on SvelteKit + Supabase + the Cloudflare data plane (R2 + Images + Workers). AI enrichment via Gemini classifies each photo on ingest. A custom Cloudflare Worker handles album-zip downloads by streaming R2 originals through. AAA accessibility was a design constraint from day one. Built through the codified production line (specchain → big-blueprint → forge-brand → forge-signal → gen-images), with the brand and copy resolving to one source-of-truth JSON.',
		learned: [
			'AI enrichment is a portfolio superpower at scale — manual tagging at 20K photos is impossible',
			'Cloudflare Images named variants beat on-the-fly transforms for predictable performance',
			'AAA accessibility costs more upfront than AA but the marginal cost beyond AA is small if you bake it in from the start'
		],

		pullQuote:
			'20K-photo gallery on SvelteKit + Supabase + Cloudflare R2/Images/Workers, AAA accessibility, custom album-zip worker, AI semantic search via Gemini enrichment.',
		quotableArtifacts: [
			{
				label: 'cloudflare-images.ts utility',
				href: 'https://github.com/nino-chavez/nino-chavez-gallery/blob/main/src/lib/utils/cloudflare-images.ts'
			},
			{
				label: 'album-zip Worker',
				href: 'https://github.com/nino-chavez/nino-chavez-gallery/tree/main/workers/album-zip'
			}
		],
		schematic: 'photography-cf-pipeline.svg',
		heroImage: '/case-studies/photography/schematic.svg',

		started: '2024-12',
		duration: 'Production, ongoing',
		featured: true,
		order: 4
	},
	{
		slug: 'bc-subscriptions',
		title: 'bc-subscriptions',
		tagline:
			'Subscription-management platform spec + reference implementation — a case study in spec-driven development for AI-assisted software',
		description:
			'Dual-track agile coexists in one repo: 38 ADRs, a 5-persona journey template, mechanical state derivation (tooling, not prose audits), a runnable prototype as the design oracle, and shipping code under apps/. Every spec edit flows through proposal → synthesis → ADR with a synthesis ID carried in the commit message. Current implementation state is derived from source rather than narrated.',
		category: 'platforms',
		status: 'active',
		visibility: 'public',

		github: 'https://github.com/nino-chavez/bc-subscriptions',
		docs: 'https://github.com/nino-chavez/bc-subscriptions/tree/main/docs',

		stack: [
			'TypeScript',
			'specchain',
			'Hive (coordination)',
			'ADR-based decisions',
			'Prototype-as-oracle methodology'
		],
		architecture: [
			'Spec + prototype + shipping code in one repo (one-repo strategy)',
			'38 ADRs in docs/decisions/',
			'5-persona journey template in docs/journeys/',
			'Mechanical state derivation in tools/state-derive/ — current status is derived from source, not narrated in prose'
		],
		keyDecisions: [
			'One-repo strategy: discovery and delivery in the same repo, with the prototype as the design oracle',
			'ADR-driven decisions with synthesis IDs in commit messages — full traceability from idea → ADR → PR',
			'Mechanical state derivation: status pages are generated from source code, not hand-written'
		],

		metrics: [
			{ label: 'ADRs', value: '38', context: 'Decision discipline' },
			{
				label: 'Persona Journeys',
				value: '5',
				context: 'P1 maya-subscription-box through P5 taylor-consumables'
			},
			{
				label: 'Spec → Implementation',
				value: 'Traceable',
				context: 'Synthesis ID carried in commits'
			}
		],
		outcomes: [
			'Reference case study for spec-driven AI-assisted development',
			'Methodology template (5-persona journey) reusable across projects',
			'Mechanical state-derivation pattern (tools/state-derive/) usable on any TypeScript project'
		],

		problem:
			'AI-assisted software development at spec depth creates a coordination problem: who owns the spec, when does the spec change, how do code changes trace back to spec decisions. Without discipline, spec and code drift apart immediately.',
		approach:
			'Built as a methodology proof: one repo holding the spec + prototype + shipping code. Every spec edit goes through proposal → synthesis → ADR (38 ADRs and counting). The 5-persona journey template captures discovery work the same way ADRs capture decisions. State is mechanically derived from source by tools/state-derive/ — there is no prose status report that can drift from reality.',
		learned: [
			'Mechanical state derivation is the single highest-leverage discipline for spec-driven AI dev — eliminates prose-status-vs-reality drift',
			'ADRs with synthesis IDs make the commit history a navigable decision log',
			'Persona journey templates are more useful than user stories for design discovery — concrete people surface specific friction'
		],

		pullQuote:
			'Dual-track agile coexists in one repo: 38 ADRs, 5-persona journey template, mechanical state derivation, runnable prototype as the design oracle, and shipping code under apps/.',
		quotableArtifacts: [
			{
				label: 'ADR-0001 Hive workflow',
				href: 'https://github.com/nino-chavez/bc-subscriptions/blob/main/docs/decisions/0001-hive-workflow.md',
				excerpt: '"Why lives in Hive, what lives in git, the linkage is the synthesis ID."'
			},
			{
				label: 'ADR-0029 Marketplace-first',
				href: 'https://github.com/nino-chavez/bc-subscriptions/blob/main/docs/decisions/0029-marketplace-first.md',
				excerpt: 'Posture reversal driven by 2,665-page corpus evidence'
			},
			{
				label: 'ADR-0030 Convention catalog',
				href: 'https://github.com/nino-chavez/bc-subscriptions/blob/main/docs/decisions/0030-bigeng-pattern-alignment.md',
				excerpt: '12-convention catalog with CI gates'
			},
			{
				label: 'ADR-0037 Stored-instruments vault',
				href: 'https://github.com/nino-chavez/bc-subscriptions/blob/main/docs/decisions/0037-stored-instruments-vault.md',
				excerpt: 'Multi-adapter → single canonical rail (spike-driven simplification)'
			},
			{
				label: 'ADR-0038 Charge capture timing',
				href: 'https://github.com/nino-chavez/bc-subscriptions/blob/main/docs/decisions/0038-charge-capture-timing.md',
				excerpt: 'Cheap-config-now / expensive-behavior-later pattern'
			}
		],
		schematic: 'bc-subscriptions-dual-track.svg',
		heroImage: '/case-studies/bc-subscriptions/schematic.svg',

		started: '2025-06',
		duration: 'Active development',
		featured: true,
		order: 5
	},

	// ============================================
	// HONORABLE MENTIONS — demoted from lead pack
	// ============================================
	{
		slug: 'aix',
		title: 'AIX (Answer Intelligence)',
		tagline: 'Track how LLMs cite your brand',
		description:
			'Multi-LLM visibility platform that monitors how ChatGPT, Claude, Gemini, and Perplexity mention and cite brands in AI-generated answers. Real-time analytics and competitive intelligence.',
		category: 'zero-to-one',
		status: 'production',
		visibility: 'private',

		demo: 'https://aix.signalx.studio',
		github: 'https://github.com/signal-x-studio/aix',

		stack: [
			'Next.js 15',
			'React 19',
			'TypeScript',
			'Supabase',
			'PostgreSQL',
			'OpenAI API',
			'Anthropic API',
			'Google AI API',
			'Perplexity API',
			'Tailwind CSS'
		],
		architecture: [
			'Multi-LLM orchestration layer',
			'AEO Readiness Score framework (0-100 with 4 weighted dimensions)',
			'Real-time citation tracking and analytics',
			'Cost tracking and attribution per query'
		],
		keyDecisions: [
			'Built multi-LLM from start rather than single-provider',
			'Created proprietary AEO Readiness Score methodology',
			'Implemented cost tracking at query level for margin visibility'
		],

		metrics: [
			{ label: 'LLMs Tracked', value: '4', context: 'ChatGPT, Claude, Gemini, Perplexity' },
			{ label: 'Query Latency', value: '<100ms', context: 'Real-time analytics' }
		],
		outcomes: [
			'First-mover platform for AI answer visibility',
			'Proprietary AEO Readiness Score',
			'Multi-tenant architecture',
			'Competitive intelligence automation'
		],

		problem:
			'Brands have no visibility into how AI assistants represent them. When someone asks ChatGPT "What\'s the best CRM?", brands don\'t know if they\'re being mentioned, how accurately, or compared to whom.',
		approach:
			'Built a monitoring platform that queries each major AI provider and analyzes responses for brand mentions, sentiment, accuracy, and competitive positioning. Generates an "AEO Readiness Score" that quantifies AI visibility.',
		learned: [
			'Multi-provider orchestration is harder than it looks — each LLM has different response patterns',
			'The scoring methodology matters more than the platform',
			'This market is moving fast — first-mover advantage is real but fragile'
		],

		heroImage:
			'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=800&fit=crop&q=80',

		started: '2024-11',
		duration: 'Ongoing (Phase 22+)',
		featured: false,
		order: 11
	},
	{
		slug: 'cix',
		title: 'CIX (Commerce Intelligence)',
		tagline: '137 capabilities mapped for commerce transformation',
		description:
			'Strategic tool for mapping commerce capabilities across domains. AI-powered gap analysis, semantic search, and transformation roadmap generation.',
		category: 'platforms',
		status: 'production',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/cix',

		stack: [
			'SvelteKit 2',
			'Svelte 5',
			'TypeScript',
			'Supabase',
			'pgvector',
			'OpenAI',
			'XY Flow',
			'Tailwind CSS'
		],
		architecture: [
			'137 capabilities x 550 functions data model',
			'Semantic search with vector embeddings (pgvector)',
			'Interactive architecture visualization (XY Flow)',
			'AI-powered capability recommendations'
		],
		keyDecisions: [
			'Used pgvector for semantic search over traditional full-text',
			'Built visual architecture diagrams with XY Flow',
			'Implemented 12 industry vertical configurations'
		],

		metrics: [
			{ label: 'Capabilities', value: '137', context: 'Mapped commerce capabilities' },
			{ label: 'Functions', value: '550', context: 'Detailed specifications' },
			{ label: 'Search Latency', value: '<100ms', context: 'Semantic query performance' }
		],
		outcomes: [
			'Complete commerce capability taxonomy',
			'AI-powered transformation recommendations',
			'Visual architecture diagram generation'
		],

		problem:
			"Commerce transformations fail because there's no comprehensive map of what capabilities exist and how to prioritize investments. People recreate this from scratch every time.",
		approach:
			'Built a comprehensive capability taxonomy by analyzing dozens of commerce platforms and implementations. Used vector embeddings for semantic search and AI to generate transformation recommendations.',
		learned: [
			'pgvector makes semantic search surprisingly accessible',
			'Reusable knowledge bases are more valuable than one-off analyses',
			'The taxonomy is the product — the UI is just the interface to it'
		],

		heroImage:
			'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',

		started: '2024-09',
		duration: '7 phases completed',
		featured: false,
		order: 12
	},
	{
		slug: 'six',
		title: 'SIX (Shopping Intelligence)',
		tagline: 'Adaptive shopping experiences powered by user intent',
		description:
			'AI-native commerce platform that dynamically adapts the shopping interface based on detected user intent. Uses LangChain/LangGraph for agent orchestration and real-time personalization.',
		category: 'zero-to-one',
		status: 'active',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/six',

		stack: [
			'Next.js 16',
			'React 19',
			'TypeScript',
			'Supabase',
			'LangChain',
			'LangGraph',
			'Anthropic API',
			'OpenAI API',
			'Google AI API',
			'Tailwind CSS'
		],
		architecture: [
			'Intent detection via multi-model ensemble',
			'LangChain/LangGraph agent orchestration',
			'Product extraction pipeline with embeddings',
			'Adaptive UI component system'
		],
		keyDecisions: [
			'Used LangGraph for complex agent workflows',
			'Built intent-first architecture (detect intent before showing UI)',
			'Implemented multi-model approach for accuracy'
		],

		metrics: [
			{ label: 'Agent Types', value: '5', context: 'Specialized shopping agents' },
			{ label: 'Intent Categories', value: '12', context: 'Shopping intent taxonomy' }
		],
		outcomes: [
			'Intent-first shopping experience',
			'Multi-agent commerce orchestration',
			'Adaptive UI component library'
		],

		problem:
			'Traditional e-commerce shows the same interface to everyone regardless of intent. Someone researching is different from someone ready to buy.',
		approach:
			'Building a commerce experience that detects user intent in real-time and adapts the interface. Uses a multi-agent system where different agents specialize in different shopping modes.',
		learned: [
			'LangGraph is powerful but the learning curve is real',
			'Intent detection is more useful than recommendation engines',
			'The UI adaptation needs to be subtle or it feels uncanny'
		],

		heroImage:
			'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop&q=80',

		started: '2025-11',
		duration: 'Active development',
		featured: false,
		order: 13
	},
	{
		slug: 'commerce-prompt-analyzer',
		title: 'Commerce Prompt Analyzer',
		tagline: 'How customers search in the age of AI',
		description:
			'Open-source tool for analyzing how customers phrase commerce queries to AI assistants. Helps understand the language patterns that lead to AI recommendations.',
		category: 'open-source',
		status: 'production',
		visibility: 'public',

		github: 'https://github.com/signal-x-studio/commerce-prompt-analyzer',

		stack: ['TypeScript', 'Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
		architecture: [
			'Prompt analysis engine',
			'Pattern recognition for commerce queries',
			'Category and intent classification'
		],
		keyDecisions: [
			'Made fully open-source',
			'Focused on commerce-specific patterns',
			'Built for actionable insights, not just analysis'
		],

		metrics: [
			{ label: 'License', value: 'MIT', context: 'Fully open source' },
			{ label: 'Categories', value: '15+', context: 'Commerce query types' }
		],
		outcomes: [
			'Open tool for commerce AI analysis',
			'Reference implementation for prompt analysis'
		],

		problem:
			"Brands don't understand how customers phrase questions to AI assistants. Traditional SEO keywords don't map to conversational queries.",
		approach:
			'Built an analyzer that breaks down commerce queries into intent, category, entities, and sentiment.',
		learned: [
			'Conversational queries are structurally different from search keywords',
			'Open-sourcing gets more feedback than keeping it private',
			'Small focused tools get more adoption than comprehensive platforms'
		],

		heroImage:
			'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop&q=80',

		started: '2024-12',
		duration: '1 week to production',
		featured: false,
		order: 14
	}
];

// ============================================
// Helper functions
// ============================================

export function getProjectBySlug(slug: string): WorkProject | undefined {
	return WORK_PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: WorkProject['category']): WorkProject[] {
	return WORK_PROJECTS.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): WorkProject[] {
	return WORK_PROJECTS.filter((p) => p.featured).sort((a, b) => a.order - b.order);
}

export function getHonorableMentions(): WorkProject[] {
	return WORK_PROJECTS.filter((p) => !p.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjects(): WorkProject[] {
	return [...WORK_PROJECTS].sort((a, b) => a.order - b.order);
}
