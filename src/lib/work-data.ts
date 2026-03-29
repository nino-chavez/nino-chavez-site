/**
 * Work Portfolio Data
 *
 * What I've built, how I built it, and what I learned.
 */

export interface WorkProject {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	category: 'zero-to-one' | 'ai-tools' | 'platforms' | 'open-source';
	status: 'production' | 'active' | 'beta' | 'archived';
	visibility: 'public' | 'private' | 'partial';

	// Links
	demo?: string;
	github?: string;
	docs?: string;

	// Technical details
	stack: string[];
	architecture: string[];
	keyDecisions: string[];

	// Evidence
	metrics: {
		label: string;
		value: string;
		context?: string;
	}[];
	outcomes: string[];

	// Story
	problem: string;
	approach: string;
	learned: string[];

	// Visual
	heroImage: string;
	screenshots?: string[];

	// Timeline
	started: string;
	duration?: string;

	// For filtering/sorting
	featured: boolean;
	order: number;
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
	// ZERO TO ONE
	// ============================================
	{
		slug: 'rally-hq',
		title: 'Rally HQ',
		tagline: 'Tournament management platform built in 7 days',
		description: 'Multi-tenant volleyball tournament platform with real-time brackets, capability-based permissions, drag-and-drop scheduling, and white-label branding.',
		category: 'zero-to-one',
		status: 'production',
		visibility: 'private',

		demo: 'https://rallyhq.app',
		github: 'https://github.com/signal-x-studio/rally-hq',

		stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Radix UI', 'WebSocket'],
		architecture: [
			'Capability-based permission system (not role-based)',
			'Real-time bracket updates via WebSocket',
			'Multi-tenant architecture with RLS',
			'WCAG 2.1 AA compliance throughout'
		],
		keyDecisions: [
			'Chose capability-based permissions over RBAC for flexibility',
			'Built real-time features from day one, not bolted on',
			'Used Supabase for rapid iteration without DevOps overhead'
		],

		metrics: [
			{ label: 'Build Time', value: '7 days', context: 'Zero to production' },
			{ label: 'Readiness', value: '88/100', context: 'Production assessment' }
		],
		outcomes: [
			'Production multi-tenant SaaS',
			'Real-time tournament bracket management',
			'Drag-and-drop scheduling',
			'White-label branding for operators'
		],

		problem: 'Tournament management is fragmented across spreadsheets, emails, and outdated software. Directors need a modern platform for registration, scheduling, brackets, and scoring.',
		approach: 'Built the entire platform solo using AI coding agents with my AEGIS governance framework. Started with a comprehensive architecture document, then implemented features in parallel. Treated the AI as a team member that needed clear specs and guardrails.',
		learned: [
			'Capability-based auth is worth the upfront complexity',
			'Real-time needs to be core infrastructure, not an afterthought',
			'AI agents can ship production code if you give them constraints'
		],

		heroImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop&q=80',

		started: '2025-10',
		duration: '7 days initial, ongoing iteration',
		featured: true,
		order: 1
	},
	{
		slug: 'aix',
		title: 'AIX (Answer Intelligence)',
		tagline: 'Track how LLMs cite your brand',
		description: 'Multi-LLM visibility platform that monitors how ChatGPT, Claude, Gemini, and Perplexity mention and cite brands in AI-generated answers. Real-time analytics and competitive intelligence.',
		category: 'zero-to-one',
		status: 'production',
		visibility: 'private',

		demo: 'https://aix.signalx.studio',
		github: 'https://github.com/signal-x-studio/aix',

		stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'OpenAI API', 'Anthropic API', 'Google AI API', 'Perplexity API', 'Tailwind CSS'],
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

		problem: 'Brands have no visibility into how AI assistants represent them. When someone asks ChatGPT "What\'s the best CRM?", brands don\'t know if they\'re being mentioned, how accurately, or compared to whom.',
		approach: 'Built a monitoring platform that queries each major AI provider and analyzes responses for brand mentions, sentiment, accuracy, and competitive positioning. Generates an "AEO Readiness Score" that quantifies AI visibility.',
		learned: [
			'Multi-provider orchestration is harder than it looks — each LLM has different response patterns',
			'The scoring methodology matters more than the platform',
			'This market is moving fast — first-mover advantage is real but fragile'
		],

		heroImage: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=800&fit=crop&q=80',

		started: '2024-11',
		duration: 'Ongoing (Phase 22+)',
		featured: true,
		order: 2
	},
	{
		slug: 'cix',
		title: 'CIX (Commerce Intelligence)',
		tagline: '137 capabilities mapped for commerce transformation',
		description: 'Strategic tool for mapping commerce capabilities across domains. AI-powered gap analysis, semantic search, and transformation roadmap generation.',
		category: 'platforms',
		status: 'production',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/cix',

		stack: ['SvelteKit 2', 'Svelte 5', 'TypeScript', 'Supabase', 'pgvector', 'OpenAI', 'XY Flow', 'Tailwind CSS'],
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

		problem: 'Commerce transformations fail because there\'s no comprehensive map of what capabilities exist and how to prioritize investments. People recreate this from scratch every time.',
		approach: 'Built a comprehensive capability taxonomy by analyzing dozens of commerce platforms and implementations. Used vector embeddings for semantic search and AI to generate transformation recommendations.',
		learned: [
			'pgvector makes semantic search surprisingly accessible',
			'Reusable knowledge bases are more valuable than one-off analyses',
			'The taxonomy is the product — the UI is just the interface to it'
		],

		heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',

		started: '2024-09',
		duration: '7 phases completed',
		featured: true,
		order: 3
	},
	{
		slug: 'six',
		title: 'SIX (Shopping Intelligence)',
		tagline: 'Adaptive shopping experiences powered by user intent',
		description: 'AI-native commerce platform that dynamically adapts the shopping interface based on detected user intent. Uses LangChain/LangGraph for agent orchestration and real-time personalization.',
		category: 'zero-to-one',
		status: 'active',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/six',

		stack: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'LangChain', 'LangGraph', 'Anthropic API', 'OpenAI API', 'Google AI API', 'Tailwind CSS'],
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

		problem: 'Traditional e-commerce shows the same interface to everyone regardless of intent. Someone researching is different from someone ready to buy.',
		approach: 'Building a commerce experience that detects user intent in real-time and adapts the interface. Uses a multi-agent system where different agents specialize in different shopping modes.',
		learned: [
			'LangGraph is powerful but the learning curve is real',
			'Intent detection is more useful than recommendation engines',
			'The UI adaptation needs to be subtle or it feels uncanny'
		],

		heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=800&fit=crop&q=80',

		started: '2025-11',
		duration: 'Active development',
		featured: false,
		order: 4
	},

	// ============================================
	// AI TOOLS & FRAMEWORKS
	// ============================================
	{
		slug: 'aegis',
		title: 'AEGIS Framework',
		tagline: 'Governance for AI code generation',
		description: 'Framework for governing AI agent behavior in software development. Enforces consistency and quality across AI-generated code with plan gating, self-healing, and drift detection.',
		category: 'ai-tools',
		status: 'production',
		visibility: 'public',

		github: 'https://github.com/signal-x-studio/aegis-framework',
		docs: 'https://github.com/signal-x-studio/aegis-framework#readme',

		stack: ['TypeScript', 'Bun', 'Vite', 'Playwright', 'Vitest', 'CLI', 'Docker'],
		architecture: [
			'Plan gating system (MVP, Surgical, Systemic)',
			'Self-healing blueprint engine with drift detection',
			'Evolution story tracking (learns from patterns)',
			'Cross-framework learning engine'
		],
		keyDecisions: [
			'Built as a governance layer, not a replacement for AI tools',
			'Inspired by Anthropic\'s constitutional approach',
			'Made framework-agnostic to work with any AI coding tool'
		],

		metrics: [
			{ label: 'Version', value: '2.5.0', context: 'Production release' },
			{ label: 'Plan Levels', value: '3', context: 'MVP, Surgical, Systemic' }
		],
		outcomes: [
			'Constitutional governance for AI code generation',
			'Automated quality enforcement',
			'Reproducible blueprint system'
		],

		problem: 'AI coding tools generate inconsistent code. Without governance, you get drift in patterns, violations of standards, and no auditability. Hard to adopt AI coding at scale without controls.',
		approach: 'Created a governance framework that wraps AI coding tools with rules. Every AI-generated change goes through plan gating, validation, and evolution tracking. The framework learns from the codebase over time.',
		learned: [
			'Constitutional AI principles apply beyond language models — they work for code generation too',
			'The framework needs to learn, not just enforce',
			'Plan gating is the single most effective quality control'
		],

		heroImage: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=800&fit=crop&q=80',

		started: '2024-08',
		duration: '6 months to v2.5',
		featured: true,
		order: 5
	},
	{
		slug: 'signal-forge',
		title: 'Signal Forge',
		tagline: 'AI content generation with a three-role workflow',
		description: 'CLI tool that generates strategic content using a three-role AI workflow: Ghost Writer, Copywriter, Editor. Maintains voice consistency across all outputs.',
		category: 'ai-tools',
		status: 'production',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/signal-forge',

		stack: ['Node.js', 'TypeScript', 'CLI', 'OpenAI API', 'Anthropic API', 'PPTX.js', 'Docx.js', 'PDF-lib'],
		architecture: [
			'Three-role workflow (Ghost Writer > Copywriter > Editor)',
			'Voice guide enforcement system',
			'Multi-format export (PPTX, DOCX, PDF, HTML)',
			'Content mode taxonomy'
		],
		keyDecisions: [
			'Built as CLI for automation, not GUI for manual use',
			'Implemented three-role separation for quality',
			'Created mode-specific voice guides for consistency'
		],

		metrics: [
			{ label: 'Projects', value: '12+', context: 'Client deliverables produced' },
			{ label: 'Export Formats', value: '4', context: 'PPTX, DOCX, PDF, HTML' },
			{ label: 'Voice Consistency', value: '95%+', context: 'Audited accuracy' }
		],
		outcomes: [
			'Professional content at AI speed',
			'Voice consistency across all outputs',
			'Multi-format export'
		],

		problem: 'Strategic content takes weeks to produce. Raw AI output lacks voice, structure, and polish. The gap between "AI-generated" and "good enough to send" is significant.',
		approach: 'Built a three-role pipeline where the Ghost Writer creates raw content, the Copywriter refines for voice, and the Editor polishes for delivery. Each role has specific prompts, constraints, and quality gates.',
		learned: [
			'Multi-stage pipelines produce dramatically better output than single prompts',
			'Voice guides are surprisingly effective at maintaining consistency',
			'CLI-first design means it integrates into any workflow'
		],

		heroImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&h=800&fit=crop&q=80',

		started: '2024-10',
		duration: 'Production, ongoing',
		featured: true,
		order: 6
	},
	{
		slug: 'agent-os',
		title: 'Agent OS',
		tagline: 'Three-mode workflow for AI-assisted development',
		description: 'Workflow system with three modes (Fast, Selective, Thorough) for AI-assisted development. 3.5x faster and 73% less tokens while maintaining quality.',
		category: 'ai-tools',
		status: 'production',
		visibility: 'public',

		github: 'https://github.com/signal-x-studio/agent-os-workflow-system',

		stack: ['YAML', 'Documentation', 'Workflow Design', 'Prompt Engineering'],
		architecture: [
			'Three-mode system (Fast 95%, Selective default, Thorough 5%)',
			'Token-optimized workflows',
			'Phase-based development (Research > Design > Implement > Test)',
			'Context tier management'
		],
		keyDecisions: [
			'Optimized for token efficiency, not just speed',
			'Built mode selection into workflow, not afterthought',
			'Made methodology documentation-first'
		],

		metrics: [
			{ label: 'Velocity', value: '3.5x', context: 'vs baseline' },
			{ label: 'Token Savings', value: '73%', context: 'Optimized prompts' },
			{ label: 'Quality', value: 'Same', context: 'WCAG AA, 60fps maintained' }
		],
		outcomes: [
			'Reproducible AI development methodology',
			'Token-efficient workflows',
			'Quality maintained at higher velocity'
		],

		problem: 'AI-assisted development without a methodology leads to inconsistent results, token waste, and quality drift.',
		approach: 'Three-mode system where task complexity determines the workflow: Fast mode for routine changes (95% of work), Selective for standard features, Thorough for critical/complex work (5%).',
		learned: [
			'95% of changes are routine — treat them that way',
			'Token efficiency compounds over time',
			'The methodology matters more than the tools'
		],

		heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',

		started: '2024-07',
		duration: 'Production-validated',
		featured: false,
		order: 7
	},

	// ============================================
	// OPEN SOURCE
	// ============================================
	{
		slug: 'commerce-prompt-analyzer',
		title: 'Commerce Prompt Analyzer',
		tagline: 'How customers search in the age of AI',
		description: 'Open-source tool for analyzing how customers phrase commerce queries to AI assistants. Helps understand the language patterns that lead to AI recommendations.',
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

		problem: 'Brands don\'t understand how customers phrase questions to AI assistants. Traditional SEO keywords don\'t map to conversational queries.',
		approach: 'Built an analyzer that breaks down commerce queries into intent, category, entities, and sentiment.',
		learned: [
			'Conversational queries are structurally different from search keywords',
			'Open-sourcing gets more feedback than keeping it private',
			'Small focused tools get more adoption than comprehensive platforms'
		],

		heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop&q=80',

		started: '2024-12',
		duration: '1 week to production',
		featured: false,
		order: 9
	},
];

// Helper functions
export function getProjectBySlug(slug: string): WorkProject | undefined {
	return WORK_PROJECTS.find(p => p.slug === slug);
}

export function getProjectsByCategory(category: WorkProject['category']): WorkProject[] {
	return WORK_PROJECTS.filter(p => p.category === category).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): WorkProject[] {
	return WORK_PROJECTS.filter(p => p.featured).sort((a, b) => a.order - b.order);
}

export function getAllProjects(): WorkProject[] {
	return [...WORK_PROJECTS].sort((a, b) => a.order - b.order);
}
