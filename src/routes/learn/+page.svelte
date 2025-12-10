<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let activeTrack = 'builder'; // 'builder' or 'commerce'
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Orientation',
			duration: '1-2 days',
			goal: 'Understand the landscape before you start walking.',
			checkpoint: 'You can explain why AI-assisted development is different from "using ChatGPT"',
			color: 'gray',
			reading: [
				{ title: 'From Fear to Flow', desc: 'My personal journey into AI-assisted development', url: 'https://signaldispatch.co' },
				{ title: 'How I Structure My AI Workflows', desc: 'The system behind the output', url: 'https://signaldispatch.co' },
				{ title: 'The Coming Code', desc: 'Why AI-native software needs standards', url: 'https://signaldispatch.co' }
			],
			terms: [
				{ term: 'LLM', desc: 'Large Language Model (Claude, GPT-4, Gemini)' },
				{ term: 'RAG', desc: 'Retrieval-Augmented Generation — giving AI context from your documents' },
				{ term: 'Prompt Engineering', desc: 'Designing inputs that get useful outputs' },
				{ term: 'Agentic AI', desc: 'AI that takes actions, not just generates text' },
				{ term: 'MCP', desc: 'Model Context Protocol — standardized tool use for AI' }
			],
			checkpoints: [
				'Why AI-assisted development is different from just "using ChatGPT"',
				'What an "AI agent" does that a simple prompt doesn\'t',
				'Why I emphasize "shipping" over "learning"'
			]
		},
		{
			level: 1,
			title: 'First Contact',
			duration: '1 week',
			goal: 'Get your hands dirty. Build something — anything — with AI assistance.',
			checkpoint: 'You have a deployed application you can show me',
			color: 'emerald',
			setup: [
				{ tool: 'Claude Code', desc: 'CLI-based AI assistance (what I use)', url: 'https://docs.anthropic.com/en/docs/claude-code' },
				{ tool: 'Cursor', desc: 'IDE with AI built-in', url: 'https://cursor.sh' }
			],
			projects: [
				'A personal dashboard that pulls data from an API you use',
				'A CLI tool that automates something tedious in your workflow',
				'A simple web app that solves a real problem you have'
			],
			rules: [
				'Must be functional (not a mockup)',
				'Must use AI assistance throughout (document your prompts)',
				'Must be deployed somewhere (Vercel, Netlify, anywhere)'
			],
			learnings: [
				'How to prompt for code generation',
				'How to iterate when the AI gets it wrong',
				'How to break problems into AI-sized chunks',
				'Where AI helps and where it struggles'
			],
			checkpoints: [
				'You have a deployed application',
				'You can show me what you built',
				'You can articulate what was hard and what was easy'
			]
		},
		{
			level: 2,
			title: 'Structured Development',
			duration: '2-4 weeks',
			goal: 'Move from ad-hoc prompting to repeatable workflows.',
			checkpoint: 'You have a spec document and your app has a database and authentication',
			color: 'blue',
			skills: [
				{
					name: 'Prompt Engineering Patterns',
					items: ['Zero-shot vs. few-shot prompting', 'Chain-of-thought reasoning', 'System prompts vs. user prompts', 'When to use which model (Claude vs. GPT vs. Gemini)'],
					resources: [
						{ title: 'Anthropic Prompt Engineering Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' },
						{ title: 'OpenAI Cookbook', url: 'https://cookbook.openai.com/' }
					]
				},
				{
					name: 'Context Management',
					items: ['How to give AI the right context without overwhelming it', 'RAG basics — retrieving relevant documents', 'Managing conversation history', 'When to start fresh vs. continue a thread']
				},
				{
					name: 'Plan-First Development',
					items: ['Write specs before code', 'Use AI to generate plans, then execute them', 'Document decisions as you go (docs-as-code)']
				}
			],
			project: {
				title: 'Rebuild Your Level 1 App — Better',
				requirements: [
					'A written spec (before you start)',
					'Structured prompts (not just "build me X")',
					'Documentation generated alongside the code',
					'At least one integration (database, API, external service)'
				]
			},
			stack: [
				{ category: 'Frontend', tech: 'Next.js or SvelteKit (pick one)' },
				{ category: 'Database', tech: 'Supabase (PostgreSQL + Auth + Realtime)' },
				{ category: 'Styling', tech: 'Tailwind CSS' },
				{ category: 'Type Safety', tech: 'TypeScript (strict mode)' },
				{ category: 'Testing', tech: 'Playwright for E2E' }
			],
			checkpoints: [
				'You have a spec document for your rebuilt app',
				'Your app has a database and authentication',
				'You can explain your prompt workflow to someone else',
				'You\'ve hit at least 3 walls and figured out how to get past them'
			]
		},
		{
			level: 3,
			title: 'Multi-Model & Agents',
			duration: '4-8 weeks',
			goal: 'Move from single prompts to orchestrated systems.',
			checkpoint: 'You\'ve built something that feels like an "agent" not just a "chatbot"',
			color: 'purple',
			skills: [
				{
					name: 'Multi-Provider LLM Integration',
					items: ['When to use Claude vs. GPT vs. Gemini', 'Cost optimization strategies', 'Fallback patterns', 'Streaming responses'],
					technologies: ['Vercel AI SDK (@ai-sdk/*)', 'LangChain basics', 'Direct API integration']
				},
				{
					name: 'Agentic Patterns',
					items: ['Reflection — AI critiques its own work', 'Tool Use — AI calls external APIs/databases', 'Planning — AI breaks complex tasks into steps', 'Multi-Agent — Multiple AI agents coordinating']
				},
				{
					name: 'RAG Systems',
					items: ['Document chunking strategies', 'Vector embeddings and similarity search', 'Hybrid search (semantic + keyword)', 'Context window management']
				}
			],
			project: {
				title: 'Build Something That Uses Tools',
				requirements: [
					'Calls at least 2 external tools/APIs',
					'Makes decisions based on retrieved data',
					'Handles errors gracefully',
					'Logs its reasoning'
				],
				ideas: [
					'A research assistant that searches, summarizes, and cites sources',
					'A data analyzer that queries a database and generates insights',
					'A content generator that pulls context from your documents'
				]
			},
			reading: [
				{ title: 'I Let a Bunch of AI Agents Rebuild My App', desc: 'Multi-agent coordination in practice', url: 'https://signaldispatch.co' },
				{ title: 'Beyond the Copilot', desc: 'Architecting for autonomy', url: 'https://signaldispatch.co' }
			],
			checkpoints: [
				'Your app uses multiple AI providers or tools',
				'You understand why different models are better for different tasks',
				'You can implement basic RAG (retrieve context, augment prompt)',
				'You\'ve built something that feels like an "agent" not just a "chatbot"'
			]
		},
		{
			level: 4,
			title: 'Production & Governance',
			duration: '8+ weeks',
			goal: 'Build systems that are production-grade, not just demos.',
			checkpoint: 'You can show me metrics, cost tracking, and output validation',
			color: 'amber',
			production: [
				{ aspect: 'Reliability', desc: 'It works consistently, not just sometimes' },
				{ aspect: 'Observability', desc: 'You know when it fails and why' },
				{ aspect: 'Cost Control', desc: 'You\'re not burning money on API calls' },
				{ aspect: 'Safety', desc: 'It doesn\'t do things it shouldn\'t' }
			],
			skills: [
				{
					name: 'LLM Observability',
					items: ['Tracing requests (Langfuse, LangSmith)', 'Cost tracking per request', 'Latency monitoring', 'Quality drift detection']
				},
				{
					name: 'Testing AI Systems',
					items: ['How do you test non-deterministic outputs?', 'Evaluation frameworks', 'Regression testing for prompts', 'E2E testing with AI components']
				},
				{
					name: 'Governance & Safety',
					items: ['Prompt injection prevention', 'Output validation', 'Audit trails for AI decisions', 'Constitutional AI patterns (constraining behavior)']
				}
			],
			frameworks: [
				{ name: 'AEGIS', desc: 'Constitutional AI governance framework I built' },
				{ name: 'Agent OS', desc: 'Multi-mode AI workflow system' }
			],
			project: {
				title: 'Add Observability & Governance to Your Level 3 App',
				requirements: [
					'Add tracing (every AI call logged)',
					'Add cost tracking (know your spend per user/request)',
					'Add output validation (catch bad responses before they reach users)',
					'Add basic access control (who can use which features)'
				]
			},
			checkpoints: [
				'You can show me metrics from your AI system',
				'You know your cost per request',
				'You have validation that catches bad AI outputs',
				'You\'ve thought about what your AI *shouldn\'t* do'
			]
		}
	];

	// Commerce Practitioner Track - for Song practitioners
	const practitionerRoles = [
		{
			role: 'PMO / Delivery',
			icon: 'clipboard',
			focus: 'Program governance, lifecycle management, risk tracking',
			mustKnow: ['Transformation lifecycle phases', 'Capability roadmap planning', 'Traditional vs. Agentic workflow comparisons', 'Risk assessment for AI initiatives'],
			speakTo: ['Why agentic reduces manual intervention rates', 'How AI changes project timelines', 'Risk/compliance implications', 'ROI calculation for automation']
		},
		{
			role: 'Technical / Architecture',
			icon: 'server',
			focus: 'System integration, API design, platform selection',
			mustKnow: ['MCP (Model Context Protocol)', 'LangChain/LangGraph patterns', 'RAG architecture', 'Tool calling & function calling', 'Vector databases'],
			speakTo: ['Integration complexity vs. traditional EDI', 'Security & PCI implications', 'Observability requirements', 'Latency and performance trade-offs']
		},
		{
			role: 'Functional / Business',
			icon: 'users',
			focus: 'Business process design, requirements, stakeholder management',
			mustKnow: ['Traditional vs. Agentic workflows by persona', 'Pain points addressed by AI', 'KPIs that change with automation', 'Customer journey mapping'],
			speakTo: ['How B2B quoting goes from 8-20 hours to minutes', 'Self-service deflection rates', 'Customer experience transformation', 'Change management for AI adoption']
		},
		{
			role: 'Analyst / Data',
			icon: 'chart',
			focus: 'Data modeling, analytics, reporting, quality',
			mustKnow: ['Embeddings & vectors', 'RAG retrieval patterns', 'CDP integration', 'GEO metrics (citation share)', 'Data quality for AI'],
			speakTo: ['How AI search differs from keyword search', 'Data quality requirements for AI', 'Measurement frameworks', 'Hallucination detection and prevention']
		}
	];

	// Expanded glossary with all BBY workshop terms
	const glossaryCategories = [
		{
			category: 'Protocols',
			color: 'blue',
			terms: [
				{ term: 'ACP', full: 'Agentic Commerce Protocol', desc: 'OpenAI + Stripe protocol for agent-driven checkout. Three components: Product Feed, Agentic Checkout, Delegated Payment.' },
				{ term: 'AP2', full: 'Agent Payments Protocol', desc: 'Google\'s competing standard that lets AI agents make purchases with explicit user permission rules called "mandates".' },
				{ term: 'MCP', full: 'Model Context Protocol', desc: 'Anthropic\'s open protocol for connecting AI models to external data sources and tools.' },
				{ term: 'SPT', full: 'Stripe Payment Token', desc: 'Secure, limited-use token that lets an AI agent charge a card without seeing the actual card number.' },
				{ term: 'HNP', full: 'Human-Not-Present', desc: 'Transaction where the AI agent acts autonomously based on pre-set rules, without the human actively watching.' }
			]
		},
		{
			category: 'AI/ML',
			color: 'purple',
			terms: [
				{ term: 'RAG', full: 'Retrieval-Augmented Generation', desc: 'Teaching AI to look up real information before answering, instead of just guessing.' },
				{ term: 'LLM', full: 'Large Language Model', desc: 'AI systems like ChatGPT or Claude that understand and generate human language.' },
				{ term: 'Embedding', full: null, desc: 'Converting text, images, or products into lists of numbers that capture their meaning.' },
				{ term: 'Vector', full: null, desc: 'A list of numbers representing something. Vectors let computers understand similarity and meaning.' },
				{ term: 'Hallucination', full: null, desc: 'When AI confidently states something that isn\'t true. Major risk in commerce.' },
				{ term: 'Groundedness', full: null, desc: 'How well AI responses are based on actual data vs. made up.' }
			]
		},
		{
			category: 'Agentic Patterns',
			color: 'emerald',
			terms: [
				{ term: 'ReAct', full: 'Reasoning + Acting', desc: 'Agent pattern where AI alternates between thinking through a problem and taking actions.' },
				{ term: 'Reflection', full: null, desc: 'Agent pattern where AI evaluates its own output and self-corrects.' },
				{ term: 'Tool Calling', full: 'Function Calling', desc: 'AI agent invoking external functions or APIs to get real data instead of guessing.' },
				{ term: 'Multi-Agent', full: null, desc: 'Using multiple specialized AI agents that collaborate on a task.' },
				{ term: 'HITL', full: 'Human-in-the-Loop', desc: 'Requiring human approval at critical decision points.' },
				{ term: 'Guardrails', full: null, desc: 'Rules and limits that constrain what an AI agent can do.' },
				{ term: 'Prompt Chaining', full: null, desc: 'Breaking a complex task into sequential steps, where each step\'s output feeds into the next.' },
				{ term: 'Routing', full: null, desc: 'Directing different types of requests to specialized handlers.' }
			]
		},
		{
			category: 'Commerce',
			color: 'amber',
			terms: [
				{ term: 'CDP', full: 'Customer Data Platform', desc: 'System that collects all customer data into one unified profile.' },
				{ term: 'PIM', full: 'Product Information Management', desc: 'Master system storing all product data—the "source of truth".' },
				{ term: 'DOM', full: 'Distributed Order Management', desc: 'System that decides WHERE to fulfill an order from.' },
				{ term: 'ATP', full: 'Available to Promise', desc: 'Real-time inventory that\'s actually available to sell.' },
				{ term: 'OMS', full: 'Order Management System', desc: 'Tracks orders from placement through delivery.' },
				{ term: 'GEO', full: 'Generative Engine Optimization', desc: 'Optimizing content so AI agents cite and recommend a brand.' }
			]
		},
		{
			category: 'Payments',
			color: 'red',
			terms: [
				{ term: 'PSP', full: 'Payment Service Provider', desc: 'Companies like Stripe, PayPal that process credit card payments.' },
				{ term: 'PCI DSS', full: 'Payment Card Industry Data Security Standard', desc: 'Strict security rules for handling credit card data.' },
				{ term: 'Tokenization', full: null, desc: 'Replacing sensitive card numbers with random tokens.' },
				{ term: 'Chargeback', full: null, desc: 'When a customer disputes a charge and money is forcibly returned.' },
				{ term: 'MoR', full: 'Merchant of Record', desc: 'The company legally responsible for the transaction.' }
			]
		},
		{
			category: 'Orchestration',
			color: 'cyan',
			terms: [
				{ term: 'LangChain', full: null, desc: 'Popular open-source framework for building AI agent applications.' },
				{ term: 'LangGraph', full: null, desc: 'Extension of LangChain for stateful, multi-actor AI applications.' },
				{ term: 'LangSmith', full: null, desc: 'Observability and debugging platform for LLM applications.' },
				{ term: 'CrewAI', full: null, desc: 'Framework for orchestrating multiple AI agents as a "crew".' },
				{ term: 'AutoGen', full: null, desc: 'Microsoft\'s framework for building multi-agent conversational systems.' }
			]
		}
	];

	// Expanded workflow transforms with more personas
	const workflowTransforms = [
		{
			persona: 'B2B Account Manager',
			traditional: 'Manually build quotes in spreadsheets (8-20 hours per quote)',
			agentic: 'AI generates professional quotes instantly with optimal pricing',
			improvement: '70-85% less time'
		},
		{
			persona: 'Credit Manager',
			traditional: 'Manually review credit applications (3-5 days per customer)',
			agentic: 'AI credit scoring provides instant approvals for low-risk customers',
			improvement: '95% faster'
		},
		{
			persona: 'IT Operations Manager',
			traditional: 'Respond to alert storms during outages (chaotic war rooms)',
			agentic: 'AI correlates alerts automatically, creates single incident',
			improvement: '90% noise reduction'
		},
		{
			persona: 'B2B Customer Service',
			traditional: 'Answer repetitive phone calls about order status',
			agentic: 'Self-service portal deflects 40-60% of routine inquiries',
			improvement: '40-60% deflection'
		},
		{
			persona: 'Security Operations Lead',
			traditional: 'Review 5,000-50,000 security alerts per day manually',
			agentic: 'AI filters to 500 actionable alerts (90% noise reduction)',
			improvement: '95% faster MTTD'
		},
		{
			persona: 'IT Service Manager',
			traditional: 'Monitor ticket backlog of 500-2,000 open tickets',
			agentic: 'AI chatbot resolves 40-60% of requests (no escalation)',
			improvement: '70% backlog reduction'
		},
		{
			persona: 'Procurement Manager',
			traditional: 'Manually compare 10-50 suppliers (weeks of RFQ cycles)',
			agentic: 'AI recommends optimal suppliers with risk scores in minutes',
			improvement: '80% faster sourcing'
		},
		{
			persona: 'Channel Partner Manager',
			traditional: 'Manually track partner performance in spreadsheets',
			agentic: 'Real-time partner dashboards with predictive churn alerts',
			improvement: '25% partner retention lift'
		}
	];

	const techStack = [
		{ category: 'Language', tech: 'TypeScript (strict)', why: 'Type safety catches errors early' },
		{ category: 'Frontend', tech: 'Next.js 15, SvelteKit 2', why: 'Production-grade, AI-friendly' },
		{ category: 'Database', tech: 'Supabase', why: 'PostgreSQL + Auth + Realtime in one' },
		{ category: 'Styling', tech: 'Tailwind CSS', why: 'Fast iteration, consistent design' },
		{ category: 'Deployment', tech: 'Vercel', why: 'Zero-config, great DX' },
		{ category: 'Primary LLM', tech: 'Claude (Anthropic)', why: 'Best for coding, reasoning' },
		{ category: 'Secondary LLM', tech: 'GPT-4, Gemini', why: 'Different strengths' },
		{ category: 'LLM Framework', tech: 'Vercel AI SDK, LangChain', why: 'Standardized patterns' },
		{ category: 'Observability', tech: 'Langfuse', why: 'LLM-specific tracing' },
		{ category: 'Dev Tool', tech: 'Claude Code', why: 'CLI-based AI assistance' },
		{ category: 'Testing', tech: 'Playwright', why: 'E2E with visual regression' },
		{ category: 'Validation', tech: 'Zod', why: 'Runtime type checking' },
		{ category: 'Background Jobs', tech: 'pg-boss', why: 'Reliable async processing' },
		{ category: 'Caching', tech: 'Upstash Redis', why: 'Serverless-friendly' }
	];

	const resources = [
		{
			title: 'DeepLearning.AI: Agentic AI',
			url: 'https://learn.deeplearning.ai/courses/agentic-ai',
			type: 'Course',
			description: 'Free, foundational course on agentic patterns',
			level: 0
		},
		{
			title: 'Anthropic Claude Documentation',
			url: 'https://docs.anthropic.com/',
			type: 'Docs',
			description: 'The source of truth for Claude',
			level: 0
		},
		{
			title: 'Frontend Masters: AI-Assisted Coding',
			url: 'https://frontendmasters.com/courses/pro-ai/',
			type: 'Course',
			description: 'Practical AI-assisted workflow with Cursor & Claude',
			level: 1
		},
		{
			title: 'Prompt Engineering Guide',
			url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering',
			type: 'Guide',
			description: 'Anthropic\'s official prompt patterns',
			level: 2
		},
		{
			title: 'OpenAI Cookbook',
			url: 'https://cookbook.openai.com/',
			type: 'Guide',
			description: 'Practical examples for GPT integration',
			level: 2
		},
		{
			title: 'LangChain Documentation',
			url: 'https://python.langchain.com/docs/',
			type: 'Docs',
			description: 'Building AI agents with LangChain',
			level: 3
		},
		{
			title: 'Langfuse Observability',
			url: 'https://langfuse.com/',
			type: 'Tool',
			description: 'Open-source LLM observability',
			level: 4
		}
	];

	const signalDispatchPosts = [
		{ title: 'Start Here: Why Signal Reflex Exists', desc: 'Origin story', url: 'https://signaldispatch.co' },
		{ title: 'From Fear to Flow', desc: 'My journey into AI-assisted development', url: 'https://signaldispatch.co' },
		{ title: 'How I Use AI in Consulting', desc: 'Applied patterns in real work', url: 'https://signaldispatch.co' },
		{ title: 'The Coming Code', desc: 'Why AI-native software needs standards', url: 'https://signaldispatch.co' },
		{ title: 'I Let a Bunch of AI Agents Rebuild My App', desc: 'Multi-agent coordination', url: 'https://signaldispatch.co' },
		{ title: 'Beyond the Copilot', desc: 'Architecting for autonomy', url: 'https://signaldispatch.co' },
		{ title: 'Coaching Without Coddling', desc: 'Supporting high-potential people', url: 'https://signaldispatch.co' }
	];

	function toggleLevel(level) {
		expandedLevel = expandedLevel === level ? null : level;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Learning Gateway - Nino Chavez | Agentic AI Learning Path</title>
	<meta name="description" content="A self-directed path for practitioners who want to build with AI, not just talk about it. From orientation to production-grade systems." />
	<meta name="robots" content="noindex, nofollow" />

	<meta property="og:title" content="The Agentic Learning Gateway - Nino Chavez" />
	<meta property="og:description" content="How I learned AI-native development — and how you can too." />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://ninochavez.co/learn" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Agentic Learning Gateway" />
	<meta name="twitter:description" content="A self-directed path for practitioners who want to build with AI." />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8"
				>
					<span class="text-sm font-medium text-blue-400">Learning Path v1.2</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					The Agentic Learning Gateway
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed"
				>
					How I learned this — and how you can too.
				</p>

				<p
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="text-lg text-gray-500 mb-8 leading-relaxed max-w-3xl"
				>
					A self-directed path for practitioners who want to <span class="text-white">build with AI</span>, not just talk about it.
				</p>

				<!-- Track Selector -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="flex gap-2 p-1 bg-gray-900 rounded-lg w-fit"
				>
					<button
						on:click={() => activeTrack = 'builder'}
						class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 {activeTrack === 'builder' ? 'bg-emerald-500 text-gray-950' : 'text-gray-400 hover:text-white'}"
					>
						Builder Track
					</button>
					<button
						on:click={() => activeTrack = 'commerce'}
						class="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 {activeTrack === 'commerce' ? 'bg-blue-500 text-gray-950' : 'text-gray-400 hover:text-white'}"
					>
						Commerce Practitioner
					</button>
				</div>
			{/if}
		</div>
	</section>

	<!-- The Filter -->
	<section class="py-12 px-6 md:px-12 bg-gray-900/50 border-y border-gray-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Who This Is For</h2>

			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold text-red-400 mb-4">This path is NOT for you if:</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You want a curriculum you passively consume</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You need someone to tell you exactly what to do next</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You're looking for a certification to add to LinkedIn</span>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-emerald-400 mb-4">This path IS for you if:</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want a map of the territory I've crossed</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want real projects that force real learning</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want to prove to yourself that you're serious</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- The Hard Truth -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">The Hard Truth</h2>

			<div class="bg-gray-900 border border-gray-800 rounded-lg p-8">
				<p class="text-lg text-gray-300 leading-relaxed mb-6">
					I didn't learn this from a course. I learned it by:
				</p>

				<ol class="space-y-4 mb-8">
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">1</span>
						<span class="text-gray-300 pt-1">Starting with fear (of being left behind)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">2</span>
						<span class="text-gray-300 pt-1">Building something real (not a tutorial project)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">3</span>
						<span class="text-gray-300 pt-1">Hitting walls and figuring out how to get past them</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">4</span>
						<span class="text-gray-300 pt-1">Documenting what worked (and what didn't)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">5</span>
						<span class="text-gray-300 pt-1">Repeating — faster each time</span>
					</li>
				</ol>

				<p class="text-gray-400 border-l-2 border-emerald-500 pl-4">
					The 48-64x productivity multiplier I talk about? It didn't come from watching videos. It came from shipping <span class="text-white">8+ production applications</span> in a year while also doing my day job.
				</p>
			</div>

			<p class="mt-8 text-xl text-gray-400 text-center">
				<span class="text-white font-semibold">You can't shortcut the reps.</span> But you can avoid wasting time on the wrong reps.
			</p>
		</div>
	</section>

	{#if activeTrack === 'builder'}
		<!-- Builder Track: The Levels -->
		<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Levels</h2>

				<div class="space-y-4">
					{#each levels as level}
						<div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors duration-300">
							<!-- Level Header (Always Visible) -->
							<button
								on:click={() => toggleLevel(level.level)}
								class="w-full p-6 text-left flex flex-col md:flex-row md:items-start gap-4"
							>
								<div class="flex-shrink-0">
									<div class="w-16 h-16 rounded-lg bg-{level.color}-500/20 flex items-center justify-center">
										<span class="text-2xl font-bold text-{level.color}-400">{level.level}</span>
									</div>
								</div>

								<div class="flex-1">
									<div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
										<h3 class="text-xl font-bold text-white">{level.title}</h3>
										<span class="inline-flex items-center px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full w-fit">
											{level.duration}
										</span>
									</div>

									<p class="text-gray-400 mb-4">{level.goal}</p>

									<div class="flex items-start gap-2 text-sm">
										<span class="text-emerald-400 font-semibold flex-shrink-0">Checkpoint:</span>
										<span class="text-gray-500">{level.checkpoint}</span>
									</div>
								</div>

								<div class="flex-shrink-0 self-center">
									<svg
										class="w-5 h-5 text-gray-500 transition-transform duration-200 {expandedLevel === level.level ? 'rotate-180' : ''}"
										fill="none" stroke="currentColor" viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</button>

							<!-- Level Deep Dive (Expandable) -->
							{#if expandedLevel === level.level}
								<div class="border-t border-gray-800 p-6 bg-gray-950/50" transition:fade={{ duration: 200 }}>
									<!-- Level 0: Orientation -->
									{#if level.level === 0}
										<div class="space-y-6">
											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Read These (In Order)</h4>
												<div class="space-y-2">
													{#each level.reading as item}
														<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
															<span class="text-white font-medium">{item.title}</span>
															<span class="text-gray-500 text-sm ml-2">— {item.desc}</span>
														</a>
													{/each}
												</div>
											</div>

											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Understand These Terms</h4>
												<div class="grid md:grid-cols-2 gap-2">
													{#each level.terms as term}
														<div class="p-3 bg-gray-900 rounded-lg">
															<span class="text-emerald-400 font-semibold">{term.term}</span>
															<span class="text-gray-400 text-sm ml-2">— {term.desc}</span>
														</div>
													{/each}
												</div>
											</div>

											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
												<ul class="space-y-2">
													{#each level.checkpoints as cp}
														<li class="flex items-start gap-2 text-gray-400">
															<span class="text-gray-600 mt-1">☐</span>
															<span>{cp}</span>
														</li>
													{/each}
												</ul>
											</div>
										</div>
									{/if}

									<!-- Level 1: First Contact -->
									{#if level.level === 1}
										<div class="space-y-6">
											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Setup — Choose ONE</h4>
												<div class="grid md:grid-cols-2 gap-3">
													{#each level.setup as tool}
														<a href={tool.url} target="_blank" rel="noopener noreferrer" class="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
															<span class="text-white font-semibold">{tool.tool}</span>
															<p class="text-gray-500 text-sm mt-1">{tool.desc}</p>
														</a>
													{/each}
												</div>
											</div>

											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Starter Project Ideas</h4>
												<ul class="space-y-2">
													{#each level.projects as project}
														<li class="flex items-start gap-2 text-gray-400">
															<span class="text-emerald-400">•</span>
															<span>{project}</span>
														</li>
													{/each}
												</ul>
											</div>

											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">The Rules</h4>
												<ol class="space-y-2">
													{#each level.rules as rule, i}
														<li class="flex items-start gap-3 text-gray-400">
															<span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">{i + 1}</span>
															<span>{rule}</span>
														</li>
													{/each}
												</ol>
											</div>

											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">What You'll Learn (By Doing)</h4>
												<ul class="space-y-2">
													{#each level.learnings as learning}
														<li class="flex items-start gap-2 text-gray-400">
															<span class="text-blue-400">→</span>
															<span>{learning}</span>
														</li>
													{/each}
												</ul>
											</div>

											<div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
												<p class="text-emerald-400 font-medium">Come back to me when you've shipped something. We'll talk.</p>
											</div>
										</div>
									{/if}

									<!-- Level 2: Structured Development -->
									{#if level.level === 2}
										<div class="space-y-6">
											{#each level.skills as skill}
												<div>
													<h4 class="text-sm font-semibold text-white mb-3">{skill.name}</h4>
													<ul class="space-y-1 mb-2">
														{#each skill.items as item}
															<li class="flex items-start gap-2 text-gray-400 text-sm">
																<span class="text-blue-400">•</span>
																<span>{item}</span>
															</li>
														{/each}
													</ul>
													{#if skill.resources}
														<div class="flex flex-wrap gap-2 mt-2">
															{#each skill.resources as resource}
																<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20">
																	{resource.title} →
																</a>
															{/each}
														</div>
													{/if}
												</div>
											{/each}

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-white mb-3">{level.project.title}</h4>
												<ul class="space-y-2">
													{#each level.project.requirements as req}
														<li class="flex items-start gap-2 text-gray-400 text-sm">
															<span class="text-emerald-400">☐</span>
															<span>{req}</span>
														</li>
													{/each}
												</ul>
											</div>

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Technical Stack to Learn</h4>
												<div class="grid md:grid-cols-2 gap-2">
													{#each level.stack as item}
														<div class="flex justify-between p-2 bg-gray-900 rounded text-sm">
															<span class="text-gray-500">{item.category}</span>
															<span class="text-white">{item.tech}</span>
														</div>
													{/each}
												</div>
											</div>
										</div>
									{/if}

									<!-- Level 3: Multi-Model & Agents -->
									{#if level.level === 3}
										<div class="space-y-6">
											{#each level.skills as skill}
												<div>
													<h4 class="text-sm font-semibold text-white mb-3">{skill.name}</h4>
													<ul class="space-y-1 mb-2">
														{#each skill.items as item}
															<li class="flex items-start gap-2 text-gray-400 text-sm">
																<span class="text-purple-400">•</span>
																<span>{item}</span>
															</li>
														{/each}
													</ul>
													{#if skill.technologies}
														<div class="flex flex-wrap gap-2 mt-2">
															{#each skill.technologies as tech}
																<span class="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded">{tech}</span>
															{/each}
														</div>
													{/if}
												</div>
											{/each}

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-white mb-3">{level.project.title}</h4>
												<ul class="space-y-2 mb-4">
													{#each level.project.requirements as req}
														<li class="flex items-start gap-2 text-gray-400 text-sm">
															<span class="text-emerald-400">☐</span>
															<span>{req}</span>
														</li>
													{/each}
												</ul>
												<h5 class="text-xs font-semibold text-gray-600 uppercase mb-2">Example Ideas:</h5>
												<ul class="space-y-1">
													{#each level.project.ideas as idea}
														<li class="text-gray-500 text-sm">• {idea}</li>
													{/each}
												</ul>
											</div>

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Advanced Reading</h4>
												<div class="space-y-2">
													{#each level.reading as item}
														<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
															<span class="text-white font-medium">{item.title}</span>
															<span class="text-gray-500 text-sm ml-2">— {item.desc}</span>
														</a>
													{/each}
												</div>
											</div>
										</div>
									{/if}

									<!-- Level 4: Production & Governance -->
									{#if level.level === 4}
										<div class="space-y-6">
											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">What "Production" Means</h4>
												<div class="grid md:grid-cols-2 gap-3">
													{#each level.production as item}
														<div class="p-3 bg-gray-900 rounded-lg">
															<span class="text-amber-400 font-semibold">{item.aspect}</span>
															<p class="text-gray-500 text-sm mt-1">{item.desc}</p>
														</div>
													{/each}
												</div>
											</div>

											{#each level.skills as skill}
												<div>
													<h4 class="text-sm font-semibold text-white mb-3">{skill.name}</h4>
													<ul class="space-y-1">
														{#each skill.items as item}
															<li class="flex items-start gap-2 text-gray-400 text-sm">
																<span class="text-amber-400">•</span>
																<span>{item}</span>
															</li>
														{/each}
													</ul>
												</div>
											{/each}

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Frameworks I've Built</h4>
												<div class="grid md:grid-cols-2 gap-3">
													{#each level.frameworks as fw}
														<div class="p-3 bg-gray-900 rounded-lg border border-amber-500/20">
															<span class="text-amber-400 font-semibold">{fw.name}</span>
															<p class="text-gray-500 text-sm mt-1">{fw.desc}</p>
														</div>
													{/each}
												</div>
											</div>

											<div class="border-t border-gray-800 pt-6">
												<h4 class="text-sm font-semibold text-white mb-3">{level.project.title}</h4>
												<ul class="space-y-2">
													{#each level.project.requirements as req}
														<li class="flex items-start gap-2 text-gray-400 text-sm">
															<span class="text-emerald-400">☐</span>
															<span>{req}</span>
														</li>
													{/each}
												</ul>
											</div>
										</div>
									{/if}

									<!-- All levels: Checkpoints -->
									{#if level.checkpoints && level.level !== 0}
										<div class="border-t border-gray-800 pt-6 mt-6">
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">☐</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- My Writing (Signal Dispatch) -->
		<section class="py-12 md:py-16 px-6 md:px-12 border-t border-gray-800">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">My Writing (Signal Dispatch)</h2>
				<p class="text-gray-500 mb-6">These posts document my learning journey and contain the patterns I reference throughout the levels.</p>

				<div class="grid md:grid-cols-2 gap-3">
					{#each signalDispatchPosts as post}
						<a
							href={post.url}
							target="_blank"
							rel="noopener noreferrer"
							class="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-emerald-500/30 transition-colors group"
						>
							<span class="text-white font-medium group-hover:text-emerald-400 transition-colors">{post.title}</span>
							<p class="text-gray-500 text-sm mt-1">{post.desc}</p>
						</a>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	{#if activeTrack === 'commerce'}
		<!-- Commerce Practitioner Track -->
		<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
			<div class="max-w-4xl mx-auto">
				<div class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
						<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
						</svg>
					</div>
					<h2 class="text-2xl font-bold">Commerce Practitioner Track</h2>
					<span class="inline-flex items-center px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full">
						Song
					</span>
				</div>

				<p class="text-gray-400 mb-8">
					For PMO, delivery, tech, functional, and analyst roles who need to speak across disciplines and the project lifecycle. Based on real enterprise implementations at Best Buy, Conagra, and REI.
				</p>

				<!-- Role Cards -->
				<div class="grid md:grid-cols-2 gap-4 mb-12">
					{#each practitionerRoles as role}
						<div class="bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500/30 transition-colors">
							<div class="flex items-center gap-3 mb-3">
								{#if role.icon === 'clipboard'}
									<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
									</svg>
								{:else if role.icon === 'server'}
									<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
									</svg>
								{:else if role.icon === 'users'}
									<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								{:else}
									<svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
									</svg>
								{/if}
								<h3 class="font-semibold text-white">{role.role}</h3>
							</div>
							<p class="text-sm text-gray-500 mb-4">{role.focus}</p>

							<div class="space-y-3">
								<div>
									<span class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Must Know:</span>
									<ul class="mt-1 space-y-1">
										{#each role.mustKnow as item}
											<li class="text-xs text-gray-400 flex items-start gap-2">
												<span class="text-blue-400 mt-1">•</span>
												{item}
											</li>
										{/each}
									</ul>
								</div>
								<div>
									<span class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Speak To:</span>
									<ul class="mt-1 space-y-1">
										{#each role.speakTo as item}
											<li class="text-xs text-gray-400 flex items-start gap-2">
												<span class="text-emerald-400 mt-1">•</span>
												{item}
											</li>
										{/each}
									</ul>
								</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- Workflow Transformations -->
				<div class="mb-12">
					<h3 class="text-lg font-semibold text-white mb-4">Traditional → Agentic Workflow Examples</h3>
					<p class="text-sm text-gray-500 mb-4">Real transformations to reference when explaining business value:</p>

					<div class="grid md:grid-cols-2 gap-3">
						{#each workflowTransforms as transform}
							<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
								<div class="flex items-center justify-between mb-2">
									<span class="text-sm font-semibold text-white">{transform.persona}</span>
									<span class="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
										{transform.improvement}
									</span>
								</div>
								<div class="space-y-2 text-xs">
									<div>
										<span class="text-gray-600 uppercase tracking-wider">Traditional:</span>
										<p class="text-gray-500 mt-1">{transform.traditional}</p>
									</div>
									<div>
										<span class="text-emerald-600 uppercase tracking-wider">Agentic:</span>
										<p class="text-gray-400 mt-1">{transform.agentic}</p>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<!-- Expanded Glossary -->
		<section class="py-12 md:py-16 px-6 md:px-12 border-t border-gray-800">
			<div class="max-w-4xl mx-auto">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Complete Glossary (Plain English)</h2>
				<p class="text-gray-500 mb-8">Every term you'll encounter across disciplines, organized by category:</p>

				<div class="space-y-8">
					{#each glossaryCategories as cat}
						<div>
							<h3 class="text-lg font-semibold text-{cat.color}-400 mb-4 flex items-center gap-2">
								<span class="w-3 h-3 rounded-full bg-{cat.color}-400"></span>
								{cat.category}
							</h3>
							<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
								{#each cat.terms as term}
									<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-3 hover:border-{cat.color}-500/30 transition-colors">
										<div class="flex items-baseline gap-2 mb-1">
											<span class="text-sm font-bold text-{cat.color}-400">{term.term}</span>
											{#if term.full}
												<span class="text-xs text-gray-600">{term.full}</span>
											{/if}
										</div>
										<p class="text-xs text-gray-500">{term.desc}</p>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Tech Stack (Both Tracks) -->
	<section class="py-12 md:py-16 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I Actually Use</h2>

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-gray-800">
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">Category</th>
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">Technology</th>
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Why</th>
						</tr>
					</thead>
					<tbody>
						{#each techStack as item}
							<tr class="border-b border-gray-800/50 hover:bg-gray-900/50">
								<td class="py-3 px-4 text-sm text-gray-500">{item.category}</td>
								<td class="py-3 px-4 text-sm text-white font-medium">{item.tech}</td>
								<td class="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{item.why}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- Resources -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">External Resources</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each resources as resource}
					<a
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors duration-300 group"
					>
						<div class="flex items-start justify-between gap-4">
							<div>
								<div class="flex items-center gap-2 mb-2">
									<span class="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded">
										{resource.type}
									</span>
									<span class="text-xs text-gray-600">Level {resource.level}+</span>
								</div>
								<h3 class="text-white font-semibold group-hover:text-blue-400 transition-colors">{resource.title}</h3>
								<p class="text-sm text-gray-500 mt-1">{resource.description}</p>
							</div>
							<svg class="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- How to Engage -->
	<section class="py-12 md:py-16 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">How to Engage With Me</h2>

			<div class="grid md:grid-cols-2 gap-6">
				<div class="bg-gray-900 border border-emerald-500/30 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-emerald-400 mb-4">If You're a Bootstrapper</h3>
					<p class="text-gray-400 text-sm mb-4">You'll complete these levels largely on your own, checking in when you have specific questions or want feedback on what you've built.</p>
					<ul class="space-y-2 text-sm text-gray-500">
						<li class="flex items-start gap-2">
							<span class="text-emerald-400">•</span>
							Review your projects
						</li>
						<li class="flex items-start gap-2">
							<span class="text-emerald-400">•</span>
							Discuss architectural decisions
						</li>
						<li class="flex items-start gap-2">
							<span class="text-emerald-400">•</span>
							Point you to resources I've found useful
						</li>
						<li class="flex items-start gap-2">
							<span class="text-emerald-400">•</span>
							Challenge your thinking
						</li>
					</ul>
				</div>

				<div class="bg-gray-900 border border-gray-700 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-gray-400 mb-4">If You're a Blank Slate</h3>
					<p class="text-gray-500 text-sm mb-4">Start at Level 0. Do the reading. Build something in Level 1. <span class="text-white">Then</span> come talk to me.</p>
					<div class="space-y-3 text-sm">
						<p class="text-gray-500">If you come to me asking "where do I start?" — I'll send you this page.</p>
						<p class="text-gray-400">If you come back having built something — we'll have a real conversation.</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- The Filter Statement -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
				<h2 class="text-2xl md:text-3xl font-bold mb-6">The Filter</h2>

				<p class="text-xl text-gray-400 mb-6 leading-relaxed">
					The filter is simple: <span class="text-white font-semibold">Show me what you've shipped.</span>
				</p>

				<p class="text-gray-500 mb-8 leading-relaxed">
					Not what you've read. Not what you're planning. What you've built.
					That's how I know you're serious. That's how I learned. That's how you will too.
				</p>

				<div class="border-t border-gray-800 pt-8">
					<p class="text-gray-400 italic">
						"I spent the last year not selling strategy about AI — but shipping production systems with it.
						The path above is a map of that territory. It's not complete (no map is), and it's constantly evolving. But it's real."
					</p>
					<p class="text-emerald-400 mt-4 font-medium">— Here's where I've landed, for now.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				Ready to start?
			</h2>
			<p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
				After you've completed Level 1, reach out. I'm happy to help people who help themselves.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Learning%20Gateway%20-%20Level%201%20Complete"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Email Me (After Level 1)
				</a>
				<a
					href="/one-pager"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					About Me
				</a>
				<a
					href="/cv"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-400 font-semibold rounded-lg hover:text-white border border-gray-800 hover:border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Full CV
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Learning Gateway v1.2 — December 2024
			</p>
			<div class="flex items-center gap-6">
				<a
					href="https://signaldispatch.co"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Signal Dispatch
				</a>
				<a
					href="/"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Portfolio
				</a>
				<a
					href="/one-pager"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					One-Pager
				</a>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Dynamic color classes for levels */
	:global(.bg-gray-500\/20) { background-color: rgb(107 114 128 / 0.2); }
	:global(.text-gray-400) { color: rgb(156 163 175); }
	:global(.bg-emerald-500\/20) { background-color: rgb(16 185 129 / 0.2); }
	:global(.text-emerald-400) { color: rgb(52 211 153); }
	:global(.bg-blue-500\/20) { background-color: rgb(59 130 246 / 0.2); }
	:global(.text-blue-400) { color: rgb(96 165 250); }
	:global(.bg-purple-500\/20) { background-color: rgb(168 85 247 / 0.2); }
	:global(.text-purple-400) { color: rgb(192 132 252); }
	:global(.bg-amber-500\/20) { background-color: rgb(245 158 11 / 0.2); }
	:global(.text-amber-400) { color: rgb(251 191 36); }
	:global(.bg-red-500\/20) { background-color: rgb(239 68 68 / 0.2); }
	:global(.text-red-400) { color: rgb(248 113 113); }
	:global(.bg-cyan-500\/20) { background-color: rgb(6 182 212 / 0.2); }
	:global(.text-cyan-400) { color: rgb(34 211 238); }
</style>
