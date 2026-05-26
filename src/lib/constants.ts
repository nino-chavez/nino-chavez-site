// Constants used throughout the application.

import type { InsightArticle, Project } from './types';

export const PROJECTS: Project[] = [
	{
		id: 'ai-native-portfolio',
		title: 'Portfolio',
		subtitle: 'This site — SvelteKit on Cloudflare Pages',
		description:
			'Personal portfolio. SvelteKit, centralized copy, lazy-loaded sections, EXIF photo modals, Playwright visual checks.',
		category: 'ai-native-systems',
		technologies: ['SvelteKit', 'Svelte 4', 'TypeScript', 'Tailwind CSS', 'Playwright', 'Cloudflare Pages'],
		featured: true,
		isShowcase: true,
		demo: 'https://ninochavez.co',
		repository: 'https://github.com/nino-chavez/website',
		imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80',
		year: 2025,
		status: 'live',
		outcomes: [
			'Centralized copy system to prevent drift',
			'Lazy-loaded sections with accessible transitions',
			'Portfolio modal with EXIF overlays',
			'Automated visual and accessibility checks via Playwright'
		],
		metrics: {
			performance: 'Core Web Vitals 95+',
			scale: 'Static SSG + edge caching',
			timeline: 'React to SvelteKit migration'
		},
		tags: ['SvelteKit', 'Portfolio', 'Accessibility', 'Performance']
	},
	{
		id: 'signal-dispatch-blog',
		title: 'Signal Dispatch',
		subtitle: 'Essays on making things',
		description:
			'Long-form writing on craft, code, and the process of building. Designed for clarity and speed with an emphasis on accessibility and reading experience.',
		category: 'ai-native-systems',
		technologies: ['Astro', 'MDX', 'Tailwind CSS', 'Cloudflare Pages'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&q=80',
		demo: 'https://blog.ninochavez.co',
		repository: 'https://github.com/nino-chavez/signal-dispatch-blog',
		year: 2025,
		status: 'live',
		outcomes: ['Accessible reading experience', 'Fast loads, minimal layout shift', 'Mermaid diagram support'],
		metrics: {
			performance: 'Optimized for readability',
			scale: 'Static hosting (CDN)',
			timeline: 'Active updates'
		},
		tags: ['Writing', 'AI', 'Architecture']
	},
	{
		id: 'nino-chavez-gallery',
		title: 'Photography Gallery',
		subtitle: 'Action sports portfolio with 20,000+ images',
		description:
			'Photography portfolio built with SvelteKit 2 and Svelte 5. Dynamic gallery with advanced filtering, timeline view, full-featured lightbox with EXIF overlays and keyboard navigation.',
		category: 'ai-native-systems',
		technologies: ['SvelteKit 2', 'Svelte 5', 'Supabase', 'Tailwind CSS 4', 'Playwright'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1200&h=800&fit=crop&q=80',
		demo: 'https://photography.ninochavez.co',
		repository: 'https://github.com/nino-chavez/gallery',
		year: 2025,
		status: 'live',
		outcomes: ['20,000+ photos indexed', 'Lighthouse >90 performance', 'WCAG 2.1 AA compliant', 'Full EXIF metadata display'],
		metrics: {
			performance: 'Sub-second gallery loads',
			scale: '20k+ photos with efficient queries',
			timeline: 'Production since Nov 2025'
		},
		tags: ['Photography', 'SvelteKit', 'Supabase', 'Performance']
	},
	{
		id: 'rally-hq',
		title: 'Rally HQ',
		subtitle: 'Tournament management platform',
		description:
			'Volleyball tournament management platform. Multi-tenant with real-time WebSocket features, capability-based permissions, drag-and-drop bracket management, and white-label branding.',
		category: 'platform-architecture',
		technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Radix UI'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop&q=80',
		demo: 'https://rallyhq.app',
		repository: 'https://github.com/signal-x-studio/rally-hq',
		year: 2025,
		status: 'live',
		outcomes: ['Real-time bracket updates', 'Multi-tenant architecture', 'Drag-and-drop scheduling', 'White-label support'],
		metrics: {
			performance: 'Real-time WebSocket updates',
			scale: 'Multi-tenant SaaS',
			timeline: 'Active production'
		},
		tags: ['SaaS', 'Sports', 'Real-time']
	},
	{
		id: 'ciq-platform',
		title: 'CIX — Commerce Intelligence',
		subtitle: 'Capability mapping and transformation tool',
		description:
			'Strategic tool mapping 137 commerce capabilities across domains. Semantic search, interactive architecture visualization with XY Flow, and AI-powered recommendations.',
		category: 'enterprise-commerce',
		technologies: ['SvelteKit 2', 'Svelte 5', 'Supabase', 'OpenAI', 'XY Flow', 'Tailwind CSS'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
		demo: 'https://ciq.signalx.studio',
		repository: 'https://github.com/signal-x-studio/ciq',
		year: 2025,
		status: 'live',
		outcomes: ['137 capabilities mapped', 'AI-powered semantic search', 'Interactive architecture diagrams'],
		metrics: {
			performance: 'Sub-100ms capability search',
			scale: 'Comprehensive capability taxonomy',
			timeline: 'Active production'
		},
		tags: ['Commerce', 'AI', 'Visualization']
	},
	{
		id: 'aiq-platform',
		title: 'AIX — Answer Intelligence',
		subtitle: 'Track how LLMs cite your brand',
		description:
			'Platform measuring how ChatGPT, Claude, Gemini, and Perplexity mention brands in AI-generated answers. Real-time analytics, cost tracking, and competitive analysis.',
		category: 'enterprise-commerce',
		technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Multiple LLM APIs'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
		demo: 'https://clear-cite.vercel.app',
		repository: 'https://github.com/signal-x-studio/aiq',
		year: 2024,
		status: 'live',
		outcomes: ['Multi-LLM citation tracking', 'Real-time analytics', 'Automated competitive intelligence', 'Multi-tenant with RLS'],
		metrics: {
			performance: 'Realtime updates via Supabase',
			scale: 'Multi-org platform',
			timeline: 'Beta production'
		},
		tags: ['SaaS', 'AI', 'Analytics']
	},
	{
		id: 'aegis-framework',
		title: 'AEGIS Framework',
		subtitle: 'Governance for AI code generation',
		description:
			'Framework for governing AI agent behavior in software development. Enforces consistency, quality, and compliance across AI-generated code with plan gating, self-healing, and drift detection.',
		category: 'ai-native-systems',
		technologies: ['TypeScript', 'CLI', 'Docs'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
		link: 'https://github.com/signal-x-studio/aegis-framework',
		repository: 'https://github.com/signal-x-studio/aegis-framework',
		year: 2024,
		status: 'in-progress',
		outcomes: ['Agent consistency', 'Quality enforcement', 'Multi-agent coordination'],
		metrics: {
			performance: 'Governed code generation',
			scale: 'Team & individual use',
			timeline: 'Active development'
		},
		tags: ['Governance', 'AI Agents']
	},
	{
		id: 'smugmug-reference',
		title: '72-Hour Build Proof',
		subtitle: 'SmugMug API integration built in a weekend',
		description:
			'Full reference app built solo in 72 hours using AI-agent orchestration. OAuth 1.0a integration, AI-powered photo search, bulk operations, and comprehensive docs.',
		category: 'system-integration',
		technologies: ['React', 'TypeScript', 'OAuth 1.0a', 'Semantic Search'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop&q=80',
		link: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
		repository: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
		demo: 'https://signal-x-studio.github.io/smugmug-api-reference-app/',
		year: 2024,
		status: 'completed',
		outcomes: ['20k+ LOC + 78k words docs', 'OAuth integration', 'AI-powered search'],
		metrics: {
			performance: 'Built in 72 hours',
			scale: 'Production-ready reference',
			timeline: '72-hour delivery'
		},
		tags: ['AI-accelerated', 'Integration']
	},
	{
		id: 'agent-os-workflow-system',
		title: 'Agent OS',
		subtitle: 'Workflow system for AI-assisted development',
		description:
			'Three-mode workflow system (Fast, Selective, Thorough) for AI-assisted development. 3.5x faster implementation and 73% token savings while maintaining production quality.',
		category: 'ai-native-systems',
		technologies: ['YAML', 'Documentation', 'Workflow Design'],
		featured: false,
		imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
		link: 'https://github.com/signal-x-studio/agent-os-workflow-system',
		repository: 'https://github.com/signal-x-studio/agent-os-workflow-system',
		year: 2024,
		status: 'completed',
		outcomes: ['3.5x faster delivery', '73% token reduction', 'Same quality (WCAG AA, 60fps)'],
		metrics: {
			performance: '3.5x velocity improvement',
			scale: 'Reproducible framework',
			timeline: 'Production-validated'
		},
		tags: ['AI Workflow', 'Developer Tools']
	}
];

export const PROJECT_CATEGORIES = [
	{ id: 'all', label: 'All Projects', count: PROJECTS.length },
	{ id: 'enterprise-commerce', label: 'Commerce & AI', count: PROJECTS.filter(p => p.category === 'enterprise-commerce').length },
	{ id: 'ai-native-systems', label: 'AI-Native Systems', count: PROJECTS.filter(p => p.category === 'ai-native-systems').length },
	{ id: 'platform-architecture', label: 'Platforms', count: PROJECTS.filter(p => p.category === 'platform-architecture').length },
	{ id: 'system-integration', label: 'Integrations', count: PROJECTS.filter(p => p.category === 'system-integration').length },
] as const;

export const INSIGHTS_ARTICLES: InsightArticle[] = [
	{
		id: 'commerce-integration-reality',
		title: 'When "Simple Integration" Isn\'t',
		subtitle: 'Field notes from connecting systems',
		platform: 'Blog',
		excerpt: 'Connecting SAP Commerce to warehouse systems sounds straightforward in the architecture deck. Then you meet the legacy ERP that thinks it\'s 1997 and business rules that exist only in someone\'s head.',
		imageUrl: 'https://picsum.photos/seed/integration-reality/600/400',
		link: 'https://blog.ninochavez.co',
		readTime: '7 min read',
		date: '2024-09-15',
		category: 'Field Notes',
		tags: ['Commerce', 'Integration', 'Legacy Systems'],
		insights: [
			'Documentation describes the system they wish they had, not the one that exists',
			'Every integration has an "undocumented behavior" that breaks everything',
			'The phrase "it should be straightforward" is a warning sign',
			'Success is measured in fires that don\'t start, not features shipped'
		]
	},
	{
		id: 'reading-the-road',
		title: 'Reading the Road',
		subtitle: 'Pattern recognition in systems and surfing',
		platform: 'Blog',
		excerpt: 'Surfers read conditions, not predictions. Position, timing, response. Building software works the same way: constraint analysis over roadmap promises, deployment windows over sprint velocity.',
		imageUrl: 'https://picsum.photos/seed/pattern-recognition/600/400',
		link: 'https://blog.ninochavez.co',
		readTime: '6 min read',
		date: '2024-08-22',
		category: 'Systems Thinking',
		tags: ['Strategy', 'Pattern Recognition', 'Architecture'],
		insights: [
			'The best architectures respond to reality, not slide decks',
			'Positioning matters more than prediction',
			'Small signals reveal big problems before they cascade',
			'Sometimes the right move is to paddle around the wave'
		]
	},
	{
		id: 'quiet-leadership',
		title: 'Holding Up the Mirror',
		subtitle: 'Quiet leadership in loud organizations',
		platform: 'LinkedIn',
		excerpt: 'Big companies don\'t need another voice in the room. They need someone to reflect what\'s actually happening—the gaps between strategy and execution, the assumptions that stopped being true three years ago.',
		imageUrl: 'https://picsum.photos/seed/leadership/600/400',
		link: 'https://www.linkedin.com/in/nino-chavez/',
		readTime: '8 min read',
		date: '2024-07-18',
		category: 'Leadership',
		tags: ['Strategy', 'Leadership', 'Signal'],
		insights: [
			'Most organizations know their problems—they need permission to act',
			'Listening reveals more than talking ever will',
			'The questions you ask define the answers you get',
			'Technical leadership is about clarity, not authority'
		]
	},
	{
		id: 'ai-native-shift',
		title: 'Answer-First Commerce',
		subtitle: 'Rethinking assumptions in an AI-native world',
		platform: 'Blog',
		excerpt: 'When customers expect answers instead of search results, your entire commerce platform needs rethinking—not retrofitting.',
		imageUrl: 'https://picsum.photos/seed/ai-commerce/600/400',
		link: 'https://blog.ninochavez.co',
		readTime: '10 min read',
		date: '2024-06-25',
		category: 'AI Strategy',
		tags: ['AI', 'Commerce', 'Strategy'],
		insights: [
			'Search-first architecture doesn\'t map to answer-first experiences',
			'AI isn\'t a feature layer—it changes core assumptions',
			'The hardest part isn\'t the technology, it\'s organizational readiness',
			'Best approach: progressive enhancement, not big-bang replacement'
		]
	}
];

export const CAREER_MILESTONES = [
	{
		year: 2026,
		role: 'Product Architect',
		company: 'commerce.com',
		current: true
	},
	{
		year: 2023,
		endYear: 2026,
		role: 'Enterprise Architect',
		company: 'Accenture Song'
	},
	{
		year: 2015,
		endYear: 2023,
		role: 'Enterprise Architect',
		company: 'Various (Capgemini, Peapod, Accenture, Gorilla Group)'
	},
	{
		year: 1999,
		endYear: 2015,
		role: 'Software Engineer → Engineering Lead',
		company: 'Various'
	}
];

export const INTERESTS = [
	{
		area: 'Photography',
		description: 'Action sports and volleyball'
	},
	{
		area: 'Music',
		description: 'DJ sets, house, disco'
	},
	{
		area: 'Writing',
		description: 'Essays on making things'
	},
	{
		area: 'Building',
		description: 'Software and side projects'
	}
];

// Legacy export for backward compatibility
export const FOCUS_AREAS = INTERESTS;

// Legacy exports for v1 archived page — do not use in new code
export const CAPABILITY_SYSTEM = {
	'enterprise-commerce': {
		id: 'enterprise-commerce',
		focusArea: { title: 'Commerce', description: 'Building commerce platforms', color: 'violet' },
		domain: { area: 'Commerce', description: 'Commerce platforms.', capabilities: ['Platform architecture', 'Composable commerce', 'Legacy modernization'] }
	},
	'ai-native': {
		id: 'ai-native',
		focusArea: { title: 'AI-Native Development', description: 'Building with AI as core infrastructure', color: 'cyan' },
		domain: { area: 'AI & Governance', description: 'AI workflows and governance.', capabilities: ['AI governance', 'Agent orchestration', 'AI observability'] }
	},
	'systems-integration': {
		id: 'systems-integration',
		focusArea: { title: 'Systems Integration', description: 'Connecting systems', color: 'green' },
		domain: { area: 'Data & Orchestration', description: 'Data flow and orchestration.', capabilities: ['Data pipelines', 'Integration architecture', 'Event sourcing'] }
	},
	'technical-leadership': {
		id: 'technical-leadership',
		focusArea: { title: 'Technical Leadership', description: 'Guiding teams', color: 'violet' },
		domain: { area: 'System Design', description: 'Scalable architectures.', capabilities: ['Event-driven systems', 'Resilience patterns', 'API design'] }
	},
	'performance': {
		id: 'performance',
		focusArea: { title: 'Performance', description: 'Optimizing systems', color: 'cyan' },
		domain: { area: 'Performance', description: 'Speed and efficiency.', capabilities: ['Response optimization', 'Caching strategies', 'Performance monitoring'] }
	}
} as const;

export const CAPABILITY_IDS = Object.keys(CAPABILITY_SYSTEM) as Array<keyof typeof CAPABILITY_SYSTEM>;

// Named exports only; consumers should import what they need explicitly.
