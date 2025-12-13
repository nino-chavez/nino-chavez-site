<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Orientation',
			duration: '1-2 days',
			goal: 'Understand the landscape before you start walking.',
			checkpoint: 'You can explain key AI concepts (LLM, RAG, agents) and why AI-assisted development differs from chat interfaces',
			color: 'gray',
			reading: [
				{ title: 'Anthropic Prompt Engineering Guide', desc: 'Official guide to effective prompting', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' },
				{ title: 'Vercel AI SDK Overview', desc: 'How modern apps integrate LLMs', url: 'https://sdk.vercel.ai/docs/introduction' }
			],
			terms: [
				{ term: 'LLM', desc: 'Large Language Model (Claude, GPT-4, Gemini)' },
				{ term: 'RAG', desc: 'Retrieval-Augmented Generation — giving AI context from your documents' },
				{ term: 'Prompt Engineering', desc: 'Designing inputs that get useful outputs' },
				{ term: 'Agentic AI', desc: 'AI that takes actions, not just generates text' }
			],
			checkpoints: [
				'You can explain LLM, RAG, and agentic AI to a colleague',
				'You understand what an "AI agent" does that a simple prompt doesn\'t',
				'You can set up a new SvelteKit or Next.js project from scratch'
			]
		},
		{
			level: 1,
			title: 'Ship Your First AI App',
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
			checkpoints: [
				'You have a deployed application',
				'You can show me what you built',
				'You can articulate what was hard and what was easy'
			]
		},
		{
			level: 2,
			title: 'Specs, Databases & Workflows',
			duration: '2-4 weeks',
			goal: 'Move from experimental prompting to documented, repeatable workflows.',
			checkpoint: 'You have a spec document and your app has a database and authentication',
			color: 'blue',
			intro: 'Level 1 was about proving you could ship. Level 2 is about learning patterns that scale. The tools below are widely used, well-documented, and AI-friendly.',
			skills: [
				{
					name: 'Prompt Engineering Patterns',
					items: ['Zero-shot vs. few-shot prompting', 'Chain-of-thought reasoning', 'System prompts vs. user prompts', 'When to use which model (Claude vs. GPT vs. Gemini)'],
					resources: [
						{ title: 'Anthropic Prompt Engineering', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering' },
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
			title: 'Multiple Models & Tool Use',
			duration: '4-8 weeks',
			goal: 'Move from single AI calls to multi-step workflows with tool use.',
			checkpoint: 'You\'ve built something that feels like an "agent" not just a "chatbot"',
			color: 'purple',
			skills: [
				{
					name: 'Multi-Provider LLM Integration',
					items: ['When to use Claude vs. GPT vs. Gemini', 'Cost optimization strategies', 'Fallback patterns', 'Streaming responses'],
					technologies: [
						{ name: 'Vercel AI SDK', when: 'Streaming UIs, quick prototypes' },
						{ name: 'LangChain', when: 'Complex chains, existing templates' },
						{ name: 'Direct API', when: 'Full control, minimal abstraction' }
					],
					resources: [
						{ title: 'Vercel AI SDK', url: 'https://sdk.vercel.ai/docs' },
						{ title: 'LangChain JS Docs', url: 'https://js.langchain.com/docs' }
					]
				},
				{
					name: 'Agentic Patterns',
					items: ['Reflection — AI critiques its own work', 'Tool Use — AI calls external APIs/databases', 'Planning — AI breaks complex tasks into steps', 'Multi-Agent — Multiple AI agents coordinating', 'MCP — Model Context Protocol for standardized tool definitions'],
					resources: [
						{ title: 'Model Context Protocol', url: 'https://modelcontextprotocol.io/introduction' }
					]
				},
				{
					name: 'Commerce & Data Orchestration',
					items: [
						'Product data enrichment — AI enhances PIM/catalog data with structured attributes',
						'Search orchestration — Query understanding, intent classification, reranking',
						'Feed optimization — Transform product data for AI answer engines (GEO)',
						'Multi-system integration — Coordinating between PIM, search, CMS, and analytics'
					],
					examples: [
						{ pattern: 'Agentic Product Feed', desc: 'AI analyzes product catalog → generates optimized descriptions → validates against brand guidelines → exports to multiple channels' },
						{ pattern: 'Search Query Orchestration', desc: 'User query → intent classification → retrieval from multiple sources → LLM reranking → structured response' },
						{ pattern: 'Data Quality Agent', desc: 'Monitors incoming product data → flags quality issues → suggests corrections → routes to human review' }
					]
				},
				{
					name: 'RAG Systems',
					items: ['Document chunking strategies', 'Vector embeddings and similarity search', 'Hybrid search (semantic + keyword)', 'Context window management'],
					resources: [
						{ title: 'Supabase Vector Guide', url: 'https://supabase.com/docs/guides/ai' },
						{ title: 'OpenAI Embeddings', url: 'https://platform.openai.com/docs/guides/embeddings' }
					]
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
					'A content generator that pulls context from your documents',
					'A product data enrichment pipeline that reads from PIM, enhances with AI, writes back',
					'A search quality analyzer that compares user queries to search results and suggests improvements'
				]
			},
			checkpoints: [
				'Your app uses multiple AI providers or tools',
				'You understand why different models are better for different tasks',
				'You can implement basic RAG (retrieve context, augment prompt)',
				'You\'ve built something that feels like an "agent" not just a "chatbot"'
			]
		},
		{
			level: 4,
			title: 'Production Systems & Observability',
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
					items: ['Tracing requests (Langfuse, LangSmith)', 'Cost tracking per request', 'Latency monitoring', 'Quality drift detection'],
					resources: [
						{ title: 'Langfuse Docs', url: 'https://langfuse.com/docs' },
						{ title: 'LangSmith Docs', url: 'https://docs.smith.langchain.com/' }
					]
				},
				{
					name: 'Testing AI Systems',
					items: ['How do you test non-deterministic outputs?', 'Evaluation frameworks', 'Regression testing for prompts', 'E2E testing with AI components']
				},
				{
					name: 'Governance & Safety',
					items: ['Prompt injection prevention', 'Output validation (JSON schema, content filters)', 'Audit trails for AI decisions', 'Rate limiting and cost caps per user'],
					resources: [
						{ title: 'Anthropic Safety Guide', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' }
					]
				}
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


	function toggleLevel(level) {
		expandedLevel = expandedLevel === level ? null : level;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Builder Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Learn to build production applications with AI assistance. From first contact to production-grade systems in 5 levels." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="max-w-7xl mx-auto p-6">
	<!-- Header -->
	<section class="py-8 md:py-12">
		{#if mounted}
			<a href="/ai/learn" class="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style="color: var(--ai-text-muted);" in:fade={{ duration: 400 }}>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				All Learning Tracks
			</a>

			<div
				in:fade={{ duration: 600, delay: 100 }}
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ai-badge-build"
			>
				<span class="text-sm font-medium">Builder Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Learning to Build Production AI Systems
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				From "I've never used AI to code" to "I ship production systems with observability and governance."
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-green);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-green);"></span>
					8-12 weeks · 5-10 hrs/week
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-green);"></span>
					Final: Deployed production app
				</span>
			</div>
		{/if}
	</section>

	<!-- Who This Is For -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 500 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-green);">Who This Track Is For</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're a developer who wants to ship AI-powered software</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You learn by building, not by watching tutorials</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You want production-ready code, not demo projects</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're comfortable with JavaScript/TypeScript and web development</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You want to explore AI for personal use (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're looking for prompt engineering tips without coding</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You need to document systems, not build them (see <a href="/ai/learn/architect" style="color: var(--ai-accent-blue);">Architect Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're brand new to programming</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- Prerequisites -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 600 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Before You Start</h3>
				<ul class="grid md:grid-cols-2 gap-2 text-sm" style="color: var(--ai-text-secondary);">
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-green);">&#10003;</span>
						You can read JavaScript/TypeScript code
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-green);">&#10003;</span>
						You've deployed a website before (even a simple one)
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-green);">&#10003;</span>
						You can run npm and git from your terminal
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-green);">&#10003;</span>
						You have 5-10 hours per week to dedicate
					</li>
				</ul>
			</div>
		{/if}
	</section>

	<!-- Self Assessment -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 700 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);"
			>
				<p class="text-sm mb-3 font-medium" style="color: var(--ai-text-secondary);">Not sure where to start?</p>
				<ul class="text-sm space-y-1" style="color: var(--ai-text-muted);">
					<li>&#8226; Never used AI for code → <span style="color: var(--ai-text-primary);">Start at Level 0</span></li>
					<li>&#8226; Built demos with ChatGPT/Cursor → <span style="color: var(--ai-text-primary);">Start at Level 1</span></li>
					<li>&#8226; Shipped AI features to production → <span style="color: var(--ai-text-primary);">Jump to Level 3</span></li>
				</ul>
			</div>
		{/if}
	</section>

	<!-- The Levels -->
	<section class="py-8">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 800 }}
				class="text-sm font-semibold uppercase tracking-wider mb-6"
				style="color: var(--ai-text-muted);"
			>
				The Levels
			</h2>

			<div class="space-y-4">
				{#each levels as level, i}
					<div
						in:fly={{ y: 20, duration: 600, delay: 900 + i * 50 }}
						class="ai-card rounded-xl overflow-hidden"
					>
						<!-- Level Header -->
						<button
							on:click={() => toggleLevel(level.level)}
							class="w-full p-6 text-left flex flex-col md:flex-row md:items-start gap-4"
							style="background: var(--ai-bg-card);"
						>
							<div class="flex-shrink-0">
								<div class="w-16 h-16 rounded-lg flex items-center justify-center ai-badge-build">
									<span class="text-2xl font-bold">{level.level}</span>
								</div>
							</div>

							<div class="flex-1">
								<div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
									<h3 class="text-xl font-bold" style="color: var(--ai-text-primary);">{level.title}</h3>
									<span class="inline-flex items-center px-3 py-1 text-sm rounded-full w-fit" style="background: var(--ai-bg-card-alt); color: var(--ai-text-muted);">
										{level.duration}
									</span>
								</div>

								<p class="mb-4" style="color: var(--ai-text-secondary);">{level.goal}</p>

								<div class="flex items-start gap-2 text-sm">
									<span class="font-semibold flex-shrink-0" style="color: var(--ai-accent-green);">Checkpoint:</span>
									<span style="color: var(--ai-text-muted);">{level.checkpoint}</span>
								</div>
							</div>

							<div class="flex-shrink-0 self-center">
								<svg
									class="w-5 h-5 transition-transform duration-200 {expandedLevel === level.level ? 'rotate-180' : ''}"
									style="color: var(--ai-text-muted);"
									fill="none" stroke="currentColor" viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</button>

						<!-- Level Details (Expandable) -->
						{#if expandedLevel === level.level}
							<div class="p-6" style="border-top: 1px solid var(--ai-border-color); background: var(--ai-bg-card-alt);" transition:fade={{ duration: 200 }}>
								<!-- Level 0: Orientation -->
								{#if level.level === 0}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Essential Reading</h4>
											<div class="space-y-2">
												{#each level.reading as item}
													<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 rounded-lg transition-colors" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-text-primary);">{item.title}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {item.desc}</span>
														<span class="text-xs ml-2" style="color: var(--ai-accent-green);">&rarr;</span>
													</a>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Understand These Terms</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.terms as term}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-green);">{term.term}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-secondary);">— {term.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Setup - Choose ONE</h4>
											<div class="grid md:grid-cols-2 gap-3">
												{#each level.setup as tool}
													<a href={tool.url} target="_blank" rel="noopener noreferrer" class="p-4 rounded-lg transition-colors" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
														<span class="font-semibold" style="color: var(--ai-text-primary);">{tool.tool}</span>
														<span class="text-xs ml-2" style="color: var(--ai-accent-green);">&rarr;</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{tool.desc}</p>
													</a>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Starter Project Ideas</h4>
											<ul class="space-y-2">
												{#each level.projects as project}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-green);">&#8226;</span>
														<span>{project}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">The Rules</h4>
											<ol class="space-y-2">
												{#each level.rules as rule, i}
													<li class="flex items-start gap-3 text-sm" style="color: var(--ai-text-secondary);">
														<span class="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ai-badge-build">{i + 1}</span>
														<span>{rule}</span>
													</li>
												{/each}
											</ol>
										</div>

										<div class="p-4 rounded-lg" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
											<p class="font-medium" style="color: var(--ai-accent-green);">Come back when you've shipped something. We'll talk.</p>
										</div>
									</div>
								{/if}

								<!-- Level 2: Structured Development -->
								{#if level.level === 2}
									<div class="space-y-6">
										{#if level.intro}
											<p class="text-sm italic p-3 rounded-lg" style="color: var(--ai-text-muted); background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-blue);">{level.intro}</p>
										{/if}

										{#each level.skills as skill}
											<div>
												<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{skill.name}</h4>
												<ul class="space-y-1 mb-2">
													{#each skill.items as item}
														<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
															<span style="color: var(--ai-accent-blue);">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 rounded transition-colors" style="background: var(--ai-bg-card); color: var(--ai-accent-blue);">
																{resource.title} &rarr;
															</a>
														{/each}
													</div>
												{/if}
											</div>
										{/each}

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{level.project.title}</h4>
											<ul class="space-y-2">
												{#each level.project.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-green);">&#9744;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Technical Stack to Learn</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.stack as item}
													<div class="flex justify-between p-2 rounded text-sm" style="background: var(--ai-bg-card);">
														<span style="color: var(--ai-text-muted);">{item.category}</span>
														<span style="color: var(--ai-text-primary);">{item.tech}</span>
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
												<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{skill.name}</h4>
												<ul class="space-y-1 mb-2">
													{#each skill.items as item}
														<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
															<span style="color: var(--ai-accent-purple);">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.technologies}
													<div class="space-y-1 mt-3">
														{#each skill.technologies as tech}
															<div class="flex items-baseline gap-2 text-sm">
																<span class="font-medium" style="color: var(--ai-accent-purple);">{tech.name}</span>
																<span style="color: var(--ai-text-muted);">— {tech.when}</span>
															</div>
														{/each}
													</div>
												{/if}
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 rounded transition-colors" style="background: var(--ai-bg-card); color: var(--ai-accent-purple);">
																{resource.title} &rarr;
															</a>
														{/each}
													</div>
												{/if}
												{#if skill.examples}
													<div class="mt-4 space-y-2">
														<h5 class="text-xs font-semibold uppercase" style="color: var(--ai-text-muted);">Real-World Patterns:</h5>
														{#each skill.examples as ex}
															<div class="p-3 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-purple);">
																<span class="font-medium text-sm" style="color: var(--ai-accent-purple);">{ex.pattern}</span>
																<p class="text-xs mt-1" style="color: var(--ai-text-muted);">{ex.desc}</p>
															</div>
														{/each}
													</div>
												{/if}
											</div>
										{/each}

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{level.project.title}</h4>
											<ul class="space-y-2 mb-4">
												{#each level.project.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-green);">&#9744;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
											<h5 class="text-xs font-semibold uppercase mb-2" style="color: var(--ai-text-muted);">Example Ideas:</h5>
											<ul class="space-y-1">
												{#each level.project.ideas as idea}
													<li class="text-sm" style="color: var(--ai-text-muted);">&#8226; {idea}</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- Level 4: Production & Governance -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">What "Production" Means</h4>
											<div class="grid md:grid-cols-2 gap-3">
												{#each level.production as item}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-orange);">{item.aspect}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{item.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										{#each level.skills as skill}
											<div>
												<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{skill.name}</h4>
												<ul class="space-y-1">
													{#each skill.items as item}
														<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
															<span style="color: var(--ai-accent-orange);">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 rounded transition-colors" style="background: var(--ai-bg-card); color: var(--ai-accent-orange);">
																{resource.title} &rarr;
															</a>
														{/each}
													</div>
												{/if}
											</div>
										{/each}

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold mb-3" style="color: var(--ai-text-primary);">{level.project.title}</h4>
											<ul class="space-y-2">
												{#each level.project.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-green);">&#9744;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- All levels: Checkpoints -->
								{#if level.checkpoints && level.level !== 0}
									<div class="pt-6 mt-6" style="border-top: 1px solid var(--ai-border-color);">
										<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
										<ul class="space-y-2">
											{#each level.checkpoints as cp}
												<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
													<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
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
		{/if}
	</section>

	<!-- CTA -->
	<section class="py-8 text-center">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 1200 }}
				class="text-2xl md:text-3xl font-bold mb-4"
				style="color: var(--ai-text-primary);"
			>
				Ready to Share What You Built?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				I'm happy to help people who help themselves. Complete Level 1, then reach out.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Include: link to deployed app, GitHub repo (if public), what was hardest, what surprised you.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Builder%20Track%20-%20Level%201%20Complete&body=Link%20to%20deployed%20app%3A%20%0A%0AGitHub%20repo%3A%20%0A%0AWhat%20was%20hardest%3A%20%0A%0AWhat%20surprised%20me%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-green); color: white;"
				>
					Email Me Your Build
				</a>
				<a
					href="/ai/learn"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg transition-colors"
					style="background: var(--ai-bg-card); color: var(--ai-text-primary); border: 1px solid var(--ai-border-color);"
				>
					Explore Other Tracks
				</a>
			</div>
		{/if}
	</section>

	<!-- Stuck Section -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 1600 }}
				class="rounded-xl p-6 text-center"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<p class="text-sm" style="color: var(--ai-text-muted);">
					<span class="font-medium" style="color: var(--ai-text-secondary);">Stuck?</span>
					Email me at <a href="mailto:abelino.chavez@gmail.com" style="color: var(--ai-accent-green);">abelino.chavez@gmail.com</a> with your blockers. I'll help you figure out if you need to go back a level, get specific technical help, or reassess your project scope.
				</p>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			Builder Track
		</p>
		<a href="/ai/learn" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			All Tracks
		</a>
	</div>
</footer>
