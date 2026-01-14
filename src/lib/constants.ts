// This file defines constants used throughout the application, such as configuration values or static data.

import type { InsightArticle, Project } from './types';

export const PROJECTS: Project[] = [
    // Featured: this SvelteKit portfolio (live, with real repo)
    {
        id: 'ai-native-portfolio',
        title: 'AI‑Native Portfolio Experience',
        subtitle: 'Production portfolio built with SvelteKit and AI‑accelerated workflows',
        description:
            "A production-grade portfolio showcasing AI-native development workflows. Built with SvelteKit, featuring centralized copy management, lazy-loaded sections, EXIF-aware portfolio modals, and automated Playwright audits for visual QA and accessibility.",
        category: 'ai-native-systems',
        technologies: ['SvelteKit', 'Svelte 4', 'TypeScript', 'Tailwind CSS', 'Playwright', 'Vercel'],
        featured: true,
        isShowcase: true,
    demo: 'https://nino.photos',
    repository: 'https://github.com/nino-chavez/website',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80',
        year: 2025,
        status: 'live',
        outcomes: [
            'Centralized copy system to prevent drift',
            'Lazy‑loaded sections with accessible transitions',
            'Portfolio modal with EXIF overlays and proper semantics',
            'Automated visual and accessibility checks via Playwright'
        ],
        metrics: {
            performance: 'Core Web Vitals ≥95',
            scale: 'Static‑optimized SSG + edge caching',
            timeline: 'React → SvelteKit migration completed'
        },
        tags: ['SvelteKit', 'Portfolio', 'Accessibility', 'Performance']
    },
    // Labs: Experimentation and prototyping platform
    {
        id: 'nino-labs',
        title: 'Nino Labs — Experimentation Platform',
        subtitle: 'Prototypes, explorations, and learning tools for AI-native development',
        description:
            'A curated collection of prototypes and experiments exploring the future of software development and AI-powered systems. Serves as an incubator for ideas that graduate into production systems—including AIQ, CIQ, Rally HQ, and workshops for AI search optimization.',
        category: 'ai-native-systems',
        technologies: ['Next.js', 'Turborepo', 'TypeScript', 'Tailwind CSS', 'Schema.org', 'Vercel'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop&q=80',
        demo: 'https://labs.ninochavez.co',
        repository: 'https://github.com/nino-chavez/labs',
        year: 2025,
        status: 'live',
        outcomes: ['Incubator for production systems', 'AEO/GEO workshop platform', 'Structured data optimization', 'Monorepo architecture'],
        metrics: {
            performance: 'Turborepo-optimized builds',
            scale: 'Multi-project monorepo',
            timeline: 'Continuous experimentation'
        },
        tags: ['Labs', 'Experiments', 'AI', 'Prototypes']
    },
    // Personal blog: AI, architecture, commerce, leadership
    {
        id: 'signal-dispatch-blog',
        title: 'Signal Dispatch — Personal Blog',
        subtitle: 'Long-form writing on AI-native development and enterprise architecture',
        description:
            'Long-form writing on AI-native development, enterprise architecture, and leadership. Designed for clarity and speed with an emphasis on accessibility and exceptional reading experience.',
        category: 'ai-native-systems',
        technologies: ['React', 'Vite', 'MDX', 'Tailwind CSS', 'Vercel'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=800&fit=crop&q=80',
        demo: 'https://blog.ninochavez.co',
        repository: 'https://github.com/nino-chavez/signal-dispatch-blog',
        year: 2025,
        status: 'live',
        outcomes: ['Accessible reading experience', 'Fast loads, minimal layout shift', 'AI-generated category images', 'Mermaid diagram support'],
        metrics: {
            performance: 'Optimized for readability',
            scale: 'Static hosting (CDN)',
            timeline: 'Active updates'
        },
        tags: ['Writing', 'AI', 'Architecture']
    },
    // Photography gallery: High-performance photo portfolio
    {
        id: 'nino-chavez-gallery',
        title: 'Photography Gallery',
        subtitle: 'High-performance photo portfolio with 20,000+ images',
        description:
            'Production-grade photography portfolio built with SvelteKit 2 and Svelte 5. Features dynamic gallery with advanced filtering, timeline view, full-featured lightbox with EXIF overlays and keyboard navigation. Optimized for performance with comprehensive database indexing.',
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
    // Rally HQ: Tournament management platform
    {
        id: 'rally-hq',
        title: 'Rally HQ — Tournament Platform',
        subtitle: 'Production volleyball tournament management SaaS',
        description:
            'Production-ready volleyball tournament management platform with 137 specialized services. Multi-tenant SaaS architecture with real-time WebSocket features, capability-based permissions, drag-and-drop bracket management, and white-label branding support.',
        category: 'platform-architecture',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Radix UI'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop&q=80',
        demo: 'https://rallyhq.app',
        repository: 'https://github.com/signal-x-studio/rally-hq',
        year: 2025,
        status: 'live',
        outcomes: ['137 specialized services', '88/100 production readiness score', 'Real-time bracket updates', 'Multi-tenant architecture'],
        metrics: {
            performance: 'Real-time WebSocket updates',
            scale: 'Enterprise multi-tenant SaaS',
            timeline: 'Active production'
        },
        tags: ['SaaS', 'Sports', 'Real-time', 'Enterprise']
    },
    // CIQ: Commerce Intelligence Quotient
    {
        id: 'ciq-platform',
        title: 'CIQ — Commerce Intelligence',
        subtitle: 'Enterprise AI transformation platform for commerce',
        description:
            'Strategic transformation platform mapping 137 commerce capabilities across domains. Features semantic search, interactive architecture visualization with XY Flow, AI-powered capability recommendations, and enterprise consulting workflows.',
        category: 'enterprise-commerce',
        technologies: ['SvelteKit 2', 'Svelte 5', 'Supabase', 'OpenAI', 'XY Flow', 'Tailwind CSS'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
        demo: 'https://ciq.signalx.studio',
        repository: 'https://github.com/signal-x-studio/ciq',
        year: 2025,
        status: 'live',
        outcomes: ['137 capabilities mapped', 'AI-powered semantic search', 'Interactive architecture diagrams', 'Enterprise consulting workflows'],
        metrics: {
            performance: 'Sub-100ms capability search',
            scale: 'Enterprise transformation tool',
            timeline: 'Active production'
        },
        tags: ['Consulting', 'Commerce', 'AI', 'Enterprise']
    },
    // AI Answer Intelligence Platform
    {
        id: 'aiq-platform',
        title: 'AIQ — Answer Intelligence Platform',
        subtitle: 'Measure brand visibility in AI-generated answers',
        description:
            'Enterprise SaaS platform measuring how LLMs (ChatGPT, Claude, Gemini, Perplexity) cite your brand in AI-generated answers. Multi-tenant architecture with real-time analytics, cost tracking, citation intelligence, and automated competitive analysis across billions of daily AI interactions.',
        category: 'enterprise-commerce',
        technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Multiple LLM APIs'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
        demo: 'https://clear-cite.vercel.app',
        repository: 'https://github.com/signal-x-studio/aiq',
        year: 2024,
        status: 'live',
        outcomes: ['Multi-LLM citation tracking', 'Real-time analytics (<100ms latency)', 'Automated competitive intelligence', 'Multi-tenant SaaS with RLS'],
        metrics: {
            performance: 'Realtime updates via Supabase',
            scale: 'Enterprise multi-org platform',
            timeline: 'Phase 15+ (Beta production)'
        },
        tags: ['SaaS', 'Enterprise', 'Answer Engine Optimization', 'Analytics']
    },
    // Commerce transformation consulting tool
    {
        id: 'commerce-transformation-navigator',
        title: 'Commerce Transformation Navigator',
        subtitle: 'Strategic tool for agentic commerce transformation consulting',
        description:
            'Strategic presentation tool enabling Accenture consultants to explore and visualize agentic commerce transformation. Maps 567 capabilities across 10 domains, featuring 52 personas, 193 orchestrator agents, and interactive architecture diagrams. Supports four workflow modes—Browse, Visualize, Wizard, and Present—for C-suite narratives.',
        category: 'enterprise-commerce',
        technologies: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'React Flow', 'Framer Motion'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop&q=80',
        repository: 'https://github.com/signal-x-studio/commerce-transformation-navigator',
        year: 2024,
        status: 'in-progress',
        outcomes: ['567 capabilities mapped', '4 consultant workflow modes', 'Interactive architecture visualization', 'NLP-powered semantic search'],
        metrics: {
            performance: 'Sub-100ms search',
            scale: 'Enterprise consulting tool',
            timeline: 'Phase 1 active development'
        },
        tags: ['Consulting', 'Agentic Commerce', 'Strategy', 'Visualization']
    },
    // Enterprise AI governance framework
    {
        id: 'aegis-framework',
        title: 'Aegis — AI Agent Development Governance',
        subtitle: 'Framework for consistent, compliant AI-generated code',
        description:
            'Framework ensuring consistent, compliant, and trackable AI-generated code across development teams. Enforces standards with governance patterns, automated validation, and reproducible blueprints. Designed for teams and enterprises adopting AI-assisted development.',
        category: 'ai-native-systems',
        technologies: ['TypeScript', 'CLI', 'Docs'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop&q=80',
        link: 'https://github.com/signal-x-studio/aegis-framework',
        repository: 'https://github.com/signal-x-studio/aegis-framework',
        year: 2024,
        status: 'in-progress',
    outcomes: ['Agent consistency', 'Quality enforcement', 'Multi‑agent coordination'],
        metrics: {
            performance: 'Governed code generation',
            scale: 'Team & enterprise use',
            timeline: 'Active framework development'
        },
        tags: ['Governance', 'Compliance', 'AI Agents']
    },
    // 72‑hour enterprise integration proof
    {
        id: 'smugmug-reference',
    title: '72-Hour Enterprise Integration Proof',
        subtitle: 'SmugMug API reference demonstrating AI-accelerated development',
        description:
            'Enterprise-grade reference application built solo in 72 hours using AI-agent orchestration. Demonstrates rapid development capabilities with OAuth 1.0a integration, AI-powered photo search, bulk operations, and comprehensive documentation. A practical proof of AI-accelerated enterprise development velocity.',
        category: 'system-integration',
        technologies: ['React', 'TypeScript', 'OAuth 1.0a', 'Semantic Search'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop&q=80',
        link: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
        repository: 'https://github.com/signal-x-studio/smugmug-api-reference-app',
        demo: 'https://signal-x-studio.github.io/smugmug-api-reference-app/',
        year: 2024,
        status: 'completed',
        outcomes: ['20k+ LOC + 78k words docs', '98.8% cost reduction', 'Enterprise OAuth integration'],
        metrics: {
            performance: '20x velocity (proof)',
            scale: 'Production‑ready reference',
            timeline: '72‑hour delivery'
        },
        tags: ['AI‑accelerated', 'Integration', 'Proof']
    },
    // AI development workflow optimization
    {
        id: 'agent-os-workflow-system',
        title: 'Agent‑OS Workflow System',
        subtitle: '3‑mode implementation framework for AI agents',
        description:
            'Configurable workflow system with three implementation modes (direct, selective, thorough) for AI-assisted development. Delivers 3.5x faster implementation and 73% token savings while maintaining production quality standards.',
        category: 'ai-native-systems',
        technologies: ['YAML', 'Documentation', 'Workflow Design'],
        featured: false,
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=800&fit=crop&q=80',
        link: 'https://github.com/signal-x-studio/agent-os-workflow-system',
        repository: 'https://github.com/signal-x-studio/agent-os-workflow-system',
        year: 2024,
        status: 'completed',
        outcomes: ['3.5x faster delivery vs baseline', '73% token reduction', 'Same quality (WCAG AA, 60fps)'],
        metrics: {
            performance: '3.5x velocity improvement',
            scale: 'Enterprise‑ready framework',
            timeline: 'Production‑validated'
        },
        tags: ['AI Workflow', 'Developer Tools', 'Efficiency']
    }
];

export const PROJECT_CATEGORIES = [
  { id: 'all', label: 'All Projects', count: PROJECTS.length },
  { id: 'enterprise-commerce', label: 'Enterprise Commerce', count: PROJECTS.filter(p => p.category === 'enterprise-commerce').length },
  { id: 'ai-native-systems', label: 'AI-Native Systems', count: PROJECTS.filter(p => p.category === 'ai-native-systems').length },
  { id: 'platform-architecture', label: 'Platform Architecture', count: PROJECTS.filter(p => p.category === 'platform-architecture').length },
  { id: 'system-integration', label: 'System Integration', count: PROJECTS.filter(p => p.category === 'system-integration').length },
  { id: 'performance-optimization', label: 'Performance Optimization', count: PROJECTS.filter(p => p.category === 'performance-optimization').length },
  { id: 'infrastructure', label: 'Infrastructure', count: PROJECTS.filter(p => p.category === 'infrastructure').length }
] as const;

export const INSIGHTS_ARTICLES: InsightArticle[] = [
    {
        id: 'commerce-integration-reality',
        title: 'When "Simple Integration" Isn\'t',
        subtitle: 'Commerce platform field notes',
        platform: 'Blog',
        excerpt: 'Connecting SAP Commerce to warehouse systems sounds straightforward in the architecture deck. Then you meet the legacy ERP that thinks it\'s 1997, inventory data that updates "eventually," and business rules that exist only in someone\'s head.',
        imageUrl: 'https://picsum.photos/seed/integration-reality/600/400',
        link: 'https://blog.ninochavez.co',
        readTime: '7 min read',
        date: '2024-09-15',
        category: 'Field Notes',
        tags: ['Commerce', 'Integration', 'Reality Check', 'Legacy Systems'],
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
        excerpt: 'Surfers read conditions, not predictions. Position, timing, response. Enterprise architecture operates the same way: constraint analysis over roadmap promises, deployment windows over sprint velocity.',
        imageUrl: 'https://picsum.photos/seed/pattern-recognition/600/400',
        link: 'https://blog.ninochavez.co',
        readTime: '6 min read',
        date: '2024-08-22',
        category: 'Systems Thinking',
        tags: ['Strategy', 'Pattern Recognition', 'Surfing', 'Architecture'],
        insights: [
            'The best architectures respond to reality, not PowerPoint projections',
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
        excerpt: 'Fortune 500 companies don\'t need another voice in the room. They need someone to reflect what\'s actually happening—the gaps between strategy and execution, the technical debt nobody wants to talk about, the assumptions that stopped being true three years ago.',
        imageUrl: 'https://picsum.photos/seed/leadership/600/400',
        link: 'https://www.linkedin.com/in/nino-chavez/',
        readTime: '8 min read',
        date: '2024-07-18',
        category: 'Leadership',
        tags: ['Enterprise', 'Strategy', 'Consulting', 'Signal'],
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
        excerpt: 'AI commerce transformation frameworks for retailers. When customers expect answers instead of search results, your entire commerce platform needs rethinking—not retrofitting.',
        imageUrl: 'https://picsum.photos/seed/ai-commerce/600/400',
        link: 'https://blog.ninochavez.co',
        readTime: '10 min read',
        date: '2024-06-25',
        category: 'AI Strategy',
        tags: ['AI', 'Commerce', 'Transformation', 'Strategy'],
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
        era: 'commerce.com',
        scale: 'commerce.com',
        role: 'Product Architect',
        achievement:
            'Leading product architecture for enterprise commerce platform, building scalable systems that power commerce experiences.',
        current: true
    },
    {
        year: 2023,
        endYear: 2026,
        era: 'Accenture Song',
        scale: 'Accenture',
        role: 'Enterprise Architect & Strategic Advisor',
        achievement:
            'Led AI-native commerce innovation at Accenture, bridging strategic vision with hands-on technical implementation for enterprise clients.',
        details:
            'Architecting AI-Native Readiness • Driving Strategic Foresight • Enabling Agile Operating Models • Aligning Executive Vision with Execution • Leading commerce platform modernization for composable, data-rich foundations'
    },
    {
        year: 2015,
        era: 'Enterprise Leadership',
        scale: 'Fortune 500 Commerce Platforms',
        role: 'Managing Enterprise Architect',
        achievement:
            'Transitioned from hands-on engineering leadership to enterprise architecture and technical advisory. Led implementation efforts on large-scale commerce platforms, then gradually moved into shaping the strategy behind them.',
        details:
            'Advising clients on platform selection, technical roadmaps, and architectural design • Led cross-functional teams through complex eCommerce builds (SAP Commerce, Magento, Salesforce Commerce Cloud) • Defined patterns, standards, and architectures that bridged engineering execution with long-term platform vision'
    },
    {
        year: 2010,
        era: 'Scale & Growth',
        scale: '100K→1M users',
        role: 'Engineering Lead',
        achievement:
            'Elevated from individual contributor to engineering leadership, scaling custom solutions while establishing foundational enterprise engineering practices. Led cross-functional teams through complex platform builds, balancing technical delivery with emerging leadership responsibilities.',
        details:
            'Transitioned from senior developer to engineering lead roles • Scaled platforms from hundreds of thousands to millions of users • Established delivery methodologies and team coordination patterns • Built foundation for enterprise-level system design and architecture practices'
    },
    {
        year: 2000,
        era: 'Foundation Building',
        scale: 'Individual Contributor Growth',
        role: 'Software Engineer',
        achievement:
            'Built a strong foundation in software development and systems integration across consulting firms, agencies, and enterprise organizations. Progressed from junior developer to senior software engineer, mastering full-stack development and complex system design.',
        details:
            'Progressed from junior to senior software engineer roles • Full-stack development using Java, .NET, and open-source frameworks • Solution architecture for retail, B2B, and CMS-driven platforms • Built expertise in agile delivery and cross-functional collaboration'
    }
];

export const FOCUS_AREAS = [
    {
        area: 'Enterprise Commerce Architecture',
        description: 'Designing scalable commerce platforms that serve millions of users',
        color: 'violet'
    },
    {
        area: 'AI-Native Development',
        description: 'Building with AI as core infrastructure, not just an add-on',
        color: 'cyan'
    },
    {
        area: 'Systems Integration',
        description: 'Connecting legacy systems that were never meant to work together',
        color: 'green'
    },
    {
        area: 'Technical Leadership',
        description: 'Guiding teams through complex technical challenges',
        color: 'violet'
    },
    {
        area: 'Performance Engineering',
        description: 'Optimizing systems for maximum efficiency and user experience',
        color: 'cyan'
    }
];

export const ARCHITECTURAL_DOMAINS = [
    {
        area: 'System Design & Architecture',
        description: 'Scalable, event-driven, and decoupled architectures that survive production.',
        capabilities: [
            'Event-driven order orchestration for high-volume commerce',
            'Distributed systems resilience and failure isolation patterns',
            'API design and microservices decomposition strategies'
        ]
    },
    {
        area: 'Data & Orchestration',
        description: 'Designing the "single source of truth" and orchestration engines for complex, real-time data flow.',
        capabilities: [
            'Real-time data pipelines for mission-critical systems',
            'Cross-platform integration architecture',
            'Event sourcing and CQRS pattern implementation'
        ]
    },
    {
        area: 'AI & Governance',
        description: 'Implementing frameworks and AI-Ops workflows to move AI from experiment to production safely.',
        capabilities: [
            'AI governance frameworks for production deployment safety',
            'Multi-agent orchestration and constitutional AI patterns',
            'Production AI observability and risk mitigation strategies'
        ]
    },
    {
        area: 'Enterprise Commerce',
        description: 'Platform architecture for commerce systems where downtime costs millions.',
        capabilities: [
            'Fortune 500 commerce platform modernization',
            'Headless and composable architecture strategies',
            'Legacy modernization and strangler fig patterns'
        ]
    }
];

// Legacy export for backward compatibility (deprecated)
export const TECHNICAL_DEPTH = ARCHITECTURAL_DOMAINS;

// Interactive Panel System: Capability Mapping
// Maps focus areas to their corresponding architectural domains
export const CAPABILITY_SYSTEM = {
  'enterprise-commerce': {
    id: 'enterprise-commerce',
    focusArea: {
      title: 'Enterprise Commerce Architecture',
      description: 'Designing scalable commerce platforms that serve millions of users',
      color: 'violet'
    },
    domain: {
      area: 'Enterprise Commerce',
      description: 'Platform architecture for commerce systems where downtime costs millions.',
      capabilities: [
        'Fortune 500 commerce platform modernization',
        'Headless and composable architecture strategies',
        'Legacy modernization and strangler fig patterns'
      ]
    }
  },
  'ai-native': {
    id: 'ai-native',
    focusArea: {
      title: 'AI-Native Development',
      description: 'Building with AI as core infrastructure, not just an add-on',
      color: 'cyan'
    },
    domain: {
      area: 'AI & Governance',
      description: 'Implementing frameworks and AI-Ops workflows to move AI from experiment to production safely.',
      capabilities: [
        'AI governance frameworks for production deployment safety',
        'Multi-agent orchestration and constitutional AI patterns',
        'Production AI observability and risk mitigation strategies'
      ]
    }
  },
  'systems-integration': {
    id: 'systems-integration',
    focusArea: {
      title: 'Systems Integration',
      description: 'Connecting legacy systems that were never meant to work together',
      color: 'green'
    },
    domain: {
      area: 'Data & Orchestration',
      description: 'Designing the "single source of truth" and orchestration engines for complex, real-time data flow.',
      capabilities: [
        'Real-time data pipelines for mission-critical systems',
        'Cross-platform integration architecture',
        'Event sourcing and CQRS pattern implementation'
      ]
    }
  },
  'technical-leadership': {
    id: 'technical-leadership',
    focusArea: {
      title: 'Technical Leadership',
      description: 'Guiding teams through complex technical challenges',
      color: 'violet'
    },
    domain: {
      area: 'System Design & Architecture',
      description: 'Scalable, event-driven, and decoupled architectures that survive production.',
      capabilities: [
        'Event-driven order orchestration for high-volume commerce',
        'Distributed systems resilience and failure isolation patterns',
        'API design and microservices decomposition strategies'
      ]
    }
  },
  'performance': {
    id: 'performance',
    focusArea: {
      title: 'Performance Engineering',
      description: 'Optimizing systems for maximum efficiency and user experience',
      color: 'cyan'
    },
    domain: {
      area: 'Performance Optimization & Scale',
      description: 'Engineering systems for speed, efficiency, and reliability under heavy load.',
      capabilities: [
        'Sub-second response times for high-traffic commerce endpoints',
        'Database query optimization and caching strategies',
        'Performance monitoring, profiling, and continuous optimization'
      ]
    }
  }
} as const;

export const CAPABILITY_IDS = Object.keys(CAPABILITY_SYSTEM) as Array<keyof typeof CAPABILITY_SYSTEM>;

// Named exports only; consumers should import what they need explicitly.

// Ensure named export visibility for bundlers
// end