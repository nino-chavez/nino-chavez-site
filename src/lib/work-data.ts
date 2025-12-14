/**
 * Work Portfolio Data
 * Strategic case studies for talent-dense environments
 *
 * This data is structured to answer the questions that matter to
 * engineering leaders at Replit, Stripe, Anthropic, Cursor, and Vercel:
 * - Can this person ship?
 * - What did they actually build?
 * - How do they think?
 */

export interface WorkProject {
	slug: string;
	title: string;
	tagline: string;
	description: string;
	category: 'zero-to-one' | 'ai-frameworks' | 'enterprise-platforms' | 'open-source';
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

	// Case study content
	problem: string;
	approach: string;
	whatThisProves: string[];

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
		label: 'Zero-to-One Products',
		description: 'Full production apps built solo with AI agents',
		color: 'emerald'
	},
	{
		id: 'ai-frameworks',
		label: 'AI/Agentic Frameworks',
		description: 'Proprietary methodologies and governance tools',
		color: 'violet'
	},
	{
		id: 'enterprise-platforms',
		label: 'Enterprise Platforms',
		description: 'Transformation and intelligence tools',
		color: 'blue'
	},
	{
		id: 'open-source',
		label: 'Open Source',
		description: 'Public contributions and reference implementations',
		color: 'amber'
	}
] as const;

export const WORK_PROJECTS: WorkProject[] = [
	// ============================================
	// ZERO-TO-ONE PRODUCTS
	// ============================================
	{
		slug: 'rally-hq',
		title: 'Rally HQ',
		tagline: 'Production volleyball tournament SaaS built in 7 days',
		description: 'Enterprise multi-tenant tournament management platform with 137 specialized services, real-time WebSocket features, capability-based permissions, and white-label branding support.',
		category: 'zero-to-one',
		status: 'production',
		visibility: 'private',

		demo: 'https://rallyhq.app',
		github: 'https://github.com/signal-x-studio/rally-hq',

		stack: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Radix UI', 'WebSocket'],
		architecture: [
			'137 specialized services with clear boundaries',
			'Capability-based permission system (not role-based)',
			'Real-time bracket updates via WebSocket',
			'Multi-tenant architecture with RLS',
			'WCAG 2.1 AA compliance throughout'
		],
		keyDecisions: [
			'Chose capability-based permissions over RBAC for flexibility',
			'Built real-time features from day one, not bolted on',
			'Used Supabase for rapid iteration without DevOps overhead',
			'Implemented comprehensive health monitoring dashboard'
		],

		metrics: [
			{ label: 'Services', value: '137', context: 'Specialized service modules' },
			{ label: 'Build Time', value: '7 days', context: 'Zero to production-ready' },
			{ label: 'Readiness Score', value: '88/100', context: 'Production assessment' },
			{ label: 'Context Window', value: '200k+', context: 'Token optimization achieved' }
		],
		outcomes: [
			'Production-ready multi-tenant SaaS',
			'Real-time tournament bracket management',
			'Drag-and-drop scheduling interface',
			'White-label branding for tournament operators',
			'Comprehensive admin dashboard with analytics'
		],

		problem: 'Volleyball tournament management is fragmented across spreadsheets, emails, and outdated software. Tournament directors need a modern platform that handles registration, scheduling, brackets, and real-time scoring.',
		approach: 'Built the entire platform solo using AI coding agents (Claude Code) with my AEGIS governance framework. Started with a comprehensive architecture document, then implemented features in parallel using multi-agent workflows. The key insight was treating the AI as a team member that needed clear specifications and guardrails.',
		whatThisProves: [
			'I can go from zero to production SaaS in days, not months',
			'I understand enterprise architecture patterns (multi-tenancy, RLS, capability-based auth)',
			'I build real-time features as core infrastructure, not afterthoughts',
			'I ship complete products, not demos'
		],

		heroImage: 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=1200&h=800&fit=crop&q=80',

		started: '2025-10',
		duration: '7 days initial, ongoing iteration',
		featured: true,
		order: 1
	},
	{
		slug: 'aix',
		title: 'AIX (Answer Intelligence)',
		tagline: 'Track how LLMs cite your brand across billions of AI conversations',
		description: 'Multi-LLM visibility platform that monitors how ChatGPT, Claude, Gemini, and Perplexity mention and cite brands in AI-generated answers. Enterprise SaaS with real-time analytics and competitive intelligence.',
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
			'Consultant-mediated service delivery engine',
			'Cost tracking and attribution per query'
		],
		keyDecisions: [
			'Built multi-LLM from start rather than single-provider',
			'Created proprietary AEO Readiness Score methodology',
			'Designed for consultant delivery model ($100k-$1.45M engagements)',
			'Implemented cost tracking at query level for margin visibility'
		],

		metrics: [
			{ label: 'LLMs Tracked', value: '4', context: 'ChatGPT, Claude, Gemini, Perplexity' },
			{ label: 'Score Dimensions', value: '4', context: 'Weighted AEO assessment' },
			{ label: 'Query Latency', value: '<100ms', context: 'Real-time analytics' },
			{ label: 'Engagement Range', value: '$100k-$1.45M', context: 'Service delivery model' }
		],
		outcomes: [
			'First-mover platform for AI answer visibility',
			'Proprietary AEO Readiness Score methodology',
			'Enterprise-grade multi-tenant architecture',
			'Consultant workflow integration',
			'Competitive intelligence automation'
		],

		problem: 'Brands have no visibility into how AI assistants represent them. When someone asks ChatGPT "What\'s the best CRM?", brands don\'t know if they\'re being mentioned, how accurately, or compared to whom.',
		approach: 'Built a multi-LLM monitoring platform that queries each major AI provider with category-relevant prompts and analyzes the responses for brand mentions, sentiment, accuracy, and competitive positioning. The platform generates an "AEO Readiness Score" that quantifies a brand\'s AI visibility.',
		whatThisProves: [
			'I identify emerging market opportunities before they\'re obvious',
			'I can build multi-provider integrations with proper orchestration',
			'I think about business models, not just features',
			'I understand enterprise consulting delivery patterns'
		],

		heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80',

		started: '2024-11',
		duration: 'Ongoing (Phase 22+)',
		featured: true,
		order: 2
	},
	{
		slug: 'cix',
		title: 'CIX (Commerce Intelligence)',
		tagline: '137 capabilities × 550 functions mapped for enterprise transformation',
		description: 'Strategic transformation platform for enterprise commerce. Maps capabilities across domains, provides AI-powered gap analysis, and generates transformation roadmaps with semantic search.',
		category: 'enterprise-platforms',
		status: 'production',
		visibility: 'private',

		demo: 'https://ciq.signalx.studio',
		github: 'https://github.com/signal-x-studio/cix',

		stack: ['SvelteKit 2', 'Svelte 5', 'TypeScript', 'Supabase', 'pgvector', 'OpenAI', 'XY Flow', 'Tailwind CSS'],
		architecture: [
			'137 capabilities × 550 functions data model',
			'Semantic search with vector embeddings (pgvector)',
			'Interactive architecture visualization (XY Flow)',
			'AI-powered capability recommendations',
			'Collaborative workspace features'
		],
		keyDecisions: [
			'Used pgvector for semantic search over traditional full-text',
			'Built visual architecture diagrams with XY Flow',
			'Designed for consultant workflows, not self-service',
			'Implemented 12 industry vertical configurations'
		],

		metrics: [
			{ label: 'Capabilities', value: '137', context: 'Mapped commerce capabilities' },
			{ label: 'Functions', value: '550', context: 'Detailed function specifications' },
			{ label: 'Domains', value: '12', context: 'Industry verticals' },
			{ label: 'Search Latency', value: '<100ms', context: 'Semantic query performance' }
		],
		outcomes: [
			'Complete commerce capability taxonomy',
			'AI-powered transformation recommendations',
			'Visual architecture diagram generation',
			'Enterprise consulting workflow support',
			'Benchmarking against industry standards'
		],

		problem: 'Enterprise commerce transformations fail because there\'s no comprehensive map of what capabilities exist, what functions they enable, and how to prioritize investments. Consultants recreate this from scratch for every engagement.',
		approach: 'Built a comprehensive capability taxonomy by analyzing dozens of commerce platforms and enterprise implementations. Used vector embeddings to enable semantic search ("find capabilities related to order orchestration") and AI to generate transformation recommendations based on current state assessments.',
		whatThisProves: [
			'I understand enterprise commerce at a structural level',
			'I can build knowledge management systems with AI-native search',
			'I think about reusable IP, not one-off deliverables',
			'I build tools that make other consultants more effective'
		],

		heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',

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
			'Adaptive UI component system',
			'Real-time personalization engine'
		],
		keyDecisions: [
			'Used LangGraph for complex agent workflows',
			'Built intent-first architecture (detect intent before showing UI)',
			'Implemented multi-model approach for accuracy',
			'Designed component system that morphs based on context'
		],

		metrics: [
			{ label: 'Agent Types', value: '5', context: 'Specialized shopping agents' },
			{ label: 'Intent Categories', value: '12', context: 'Shopping intent taxonomy' },
			{ label: 'Personalization', value: 'Real-time', context: 'Sub-second adaptation' }
		],
		outcomes: [
			'Intent-first shopping experience architecture',
			'Multi-agent commerce orchestration',
			'Adaptive UI component library',
			'Product extraction and embedding pipeline'
		],

		problem: 'Traditional e-commerce shows the same interface to everyone regardless of intent. Someone researching a category needs different information than someone ready to buy. Current personalization is limited to "you might also like" recommendations.',
		approach: 'Building a commerce experience that detects user intent in real-time and adapts the entire interface accordingly. Uses a multi-agent system where different agents specialize in different shopping modes (research, comparison, purchase, support).',
		whatThisProves: [
			'I\'m pushing the boundaries of what commerce can be',
			'I understand and implement LangChain/LangGraph patterns',
			'I think about UX as adaptive systems, not static pages',
			'I build with cutting-edge AI infrastructure'
		],

		heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',

		started: '2025-11',
		duration: 'Active development',
		featured: false,
		order: 4
	},

	// ============================================
	// AI/AGENTIC FRAMEWORKS
	// ============================================
	{
		slug: 'aegis',
		title: 'AEGIS Framework',
		tagline: 'Constitutional governance for AI code generation',
		description: 'Production-ready framework for governing AI agent behavior in software development. Enforces consistency, quality, and compliance across AI-generated code with plan gating, self-healing, and drift detection.',
		category: 'ai-frameworks',
		status: 'production',
		visibility: 'public',

		github: 'https://github.com/signal-x-studio/aegis-framework',
		docs: 'https://github.com/signal-x-studio/aegis-framework#readme',

		stack: ['TypeScript', 'Bun', 'Vite', 'Playwright', 'Vitest', 'CLI', 'Docker'],
		architecture: [
			'Plan gating system (MVP → Surgical → Systemic)',
			'Self-healing blueprint engine with drift detection',
			'Evolution story tracking (learns from patterns)',
			'Democratic amendment system (version governance)',
			'Cross-framework learning engine',
			'MCP (Model Context Protocol) server integration'
		],
		keyDecisions: [
			'Built as a governance layer, not a replacement for AI tools',
			'Implemented "constitutional" approach inspired by Anthropic',
			'Designed for teams adopting AI-assisted development',
			'Made framework-agnostic to work with any AI coding tool'
		],

		metrics: [
			{ label: 'Version', value: '2.5.0', context: 'Production release' },
			{ label: 'Plan Levels', value: '3', context: 'MVP, Surgical, Systemic' },
			{ label: 'Validation Gates', value: '12', context: 'Quality checkpoints' }
		],
		outcomes: [
			'Constitutional governance for AI code generation',
			'Automated quality enforcement',
			'Multi-agent coordination patterns',
			'Reproducible blueprint system',
			'Team adoption playbook'
		],

		problem: 'AI coding tools generate inconsistent code across a team. Without governance, you get drift in patterns, violations of standards, and no auditability. Enterprises can\'t adopt AI coding at scale without controls.',
		approach: 'Created a governance framework that wraps AI coding tools with "constitutional" rules. Every AI-generated change goes through plan gating (is this change appropriate?), validation (does it meet standards?), and evolution tracking (what patterns are emerging?). The framework learns from the codebase and gets smarter over time.',
		whatThisProves: [
			'I think about AI adoption at enterprise scale',
			'I build tools that govern AI, not just use it',
			'I understand compliance and auditability requirements',
			'I create frameworks others can adopt'
		],

		heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80',

		started: '2024-08',
		duration: '6 months to v2.5',
		featured: true,
		order: 5
	},
	{
		slug: 'signal-forge',
		title: 'Signal Forge',
		tagline: 'Strategic content generation with three-role AI workflow',
		description: 'CLI tool that generates consultant-grade strategic content (decks, POVs, white papers) using a three-role AI workflow: Ghost Writer → Copywriter → Editor. Maintains voice consistency across all outputs.',
		category: 'ai-frameworks',
		status: 'production',
		visibility: 'private',

		github: 'https://github.com/signal-x-studio/signal-forge',

		stack: ['Node.js', 'TypeScript', 'CLI', 'OpenAI API', 'Anthropic API', 'PPTX.js', 'Docx.js', 'PDF-lib'],
		architecture: [
			'Three-role workflow (Ghost Writer → Copywriter → Editor)',
			'Voice guide enforcement system',
			'Multi-format export (PPTX, DOCX, PDF, HTML)',
			'Content mode taxonomy (Thought Leadership, Solution Architecture, Executive Advisory)',
			'Red-team audited architecture'
		],
		keyDecisions: [
			'Built as CLI for automation, not GUI for manual use',
			'Implemented three-role separation for quality',
			'Created mode-specific voice guides for consistency',
			'Designed for integration with consulting workflows'
		],

		metrics: [
			{ label: 'Client Projects', value: '12+', context: 'BBY, REI, MSFT, Signet, Conagra, etc.' },
			{ label: 'Content Modes', value: '3', context: 'Specialized output types' },
			{ label: 'Export Formats', value: '4', context: 'PPTX, DOCX, PDF, HTML' },
			{ label: 'Voice Consistency', value: '95%+', context: 'Audited accuracy' }
		],
		outcomes: [
			'Consultant-grade content at AI speed',
			'Voice consistency across all outputs',
			'Multi-format export for client delivery',
			'Integration with strategic workflows',
			'Red-team validated architecture'
		],

		problem: 'Strategic consulting content (decks, POVs, papers) takes weeks to produce. AI can accelerate this, but raw AI output lacks the voice, structure, and polish that clients expect. The gap between "AI-generated" and "consultant-grade" is significant.',
		approach: 'Built a three-role pipeline where the Ghost Writer creates the raw content, the Copywriter refines it for voice and flow, and the Editor polishes for client delivery. Each role has specific prompts, constraints, and quality gates. The system maintains voice guides per content mode to ensure consistency.',
		whatThisProves: [
			'I understand content quality at a professional level',
			'I can build multi-stage AI pipelines with quality gates',
			'I think about voice and brand consistency programmatically',
			'I build tools that accelerate entire workflows, not just tasks'
		],

		heroImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&q=80',

		started: '2024-10',
		duration: 'Production, ongoing',
		featured: true,
		order: 6
	},
	{
		slug: 'agent-os',
		title: 'Agent OS Workflow System',
		tagline: '3-mode implementation framework for AI-assisted development',
		description: 'Configurable workflow system with three implementation modes (Fast, Selective, Thorough) for AI-assisted development. Delivers 3.5x faster implementation and 73% token savings while maintaining production quality.',
		category: 'ai-frameworks',
		status: 'production',
		visibility: 'public',

		github: 'https://github.com/signal-x-studio/agent-os-workflow-system',

		stack: ['YAML', 'Documentation', 'Workflow Design', 'Prompt Engineering'],
		architecture: [
			'Three-mode system (Fast 95%, Selective default, Thorough 5%)',
			'Token-optimized workflows (<1000 for Fast, <5000 for Thorough)',
			'Phase-based development (Research → Design → Implement → Test)',
			'Role-based implementation patterns',
			'Context tier management (40k/40k/20k allocation)'
		],
		keyDecisions: [
			'Optimized for token efficiency, not just speed',
			'Built mode selection into workflow, not afterthought',
			'Designed for reproducibility across projects',
			'Made methodology documentation-first'
		],

		metrics: [
			{ label: 'Velocity', value: '3.5x', context: 'vs baseline implementation' },
			{ label: 'Token Savings', value: '73%', context: 'Optimized prompts' },
			{ label: 'Quality', value: 'Same', context: 'WCAG AA, 60fps maintained' },
			{ label: 'Modes', value: '3', context: 'Fast, Selective, Thorough' }
		],
		outcomes: [
			'Reproducible AI development methodology',
			'Token-efficient workflows',
			'Quality maintained at higher velocity',
			'Team-adoptable patterns',
			'Mode-appropriate tool selection'
		],

		problem: 'AI-assisted development without a methodology leads to inconsistent results, token waste, and quality drift. Teams struggle to know when to use AI and when to code manually.',
		approach: 'Created a three-mode system where the complexity of the task determines the workflow: Fast mode for routine changes (95% of work, <1000 tokens), Selective mode for standard features (default), and Thorough mode for critical/complex work (5%, full context). Each mode has specific tools, prompts, and validation gates.',
		whatThisProves: [
			'I think about AI usage strategically, not just tactically',
			'I can quantify and optimize AI workflows',
			'I build methodologies others can follow',
			'I understand the economics of AI development'
		],

		heroImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80',

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
		tagline: 'Discover how customers search in the age of AI',
		description: 'Open-source tool for analyzing how customers phrase commerce queries to AI assistants. Helps brands understand the language patterns that lead to AI recommendations.',
		category: 'open-source',
		status: 'production',
		visibility: 'public',

		demo: 'https://commerce-prompt-analyzer.vercel.app',
		github: 'https://github.com/signal-x-studio/commerce-prompt-analyzer',

		stack: ['TypeScript', 'Next.js', 'OpenAI API', 'Tailwind CSS', 'Vercel'],
		architecture: [
			'Prompt analysis engine',
			'Pattern recognition for commerce queries',
			'Category and intent classification',
			'Export and reporting features'
		],
		keyDecisions: [
			'Made fully open-source for community benefit',
			'Focused on commerce-specific patterns',
			'Built for actionable insights, not just analysis'
		],

		metrics: [
			{ label: 'License', value: 'MIT', context: 'Fully open source' },
			{ label: 'Categories', value: '15+', context: 'Commerce query types' }
		],
		outcomes: [
			'Open tool for commerce AI analysis',
			'Community contribution to AEO understanding',
			'Reference implementation for prompt analysis'
		],

		problem: 'Brands don\'t understand how customers phrase questions to AI assistants. Traditional SEO keywords don\'t map to conversational AI queries.',
		approach: 'Built an analyzer that takes commerce queries and breaks them down into intent, category, entities, and sentiment. Helps brands understand the "language of AI search" so they can optimize their content.',
		whatThisProves: [
			'I contribute to the community, not just build proprietary tools',
			'I understand emerging patterns in AI-native commerce',
			'I can ship useful tools quickly'
		],

		heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&q=80',

		started: '2024-12',
		duration: '1 week to production',
		featured: false,
		order: 8
	}
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
