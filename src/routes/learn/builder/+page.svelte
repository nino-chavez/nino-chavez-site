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
					'A content generator that pulls context from your documents'
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

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Header -->
	<section class="pt-16 pb-8 md:pt-24 md:pb-12 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<a href="/learn" class="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8" in:fade={{ duration: 400 }}>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
					All Learning Tracks
				</a>

				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-emerald-400">Builder Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Learning to Build Production AI Systems
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					From "I've never used AI to code" to "I ship production systems with observability and governance."
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
						8-12 weeks · 5-10 hrs/week
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-emerald-500"></span>
						Final: Deployed production app
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Prerequisites -->
	<section class="py-6 px-6 md:px-12 bg-amber-500/5 border-y border-amber-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Before You Start</h3>
			<ul class="grid md:grid-cols-2 gap-2 text-gray-400 text-sm">
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You can read JavaScript/TypeScript code
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You've deployed a website before (even a simple one)
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You can run npm and git from your terminal
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You have 5-10 hours per week to dedicate
				</li>
			</ul>
		</div>
	</section>

	<!-- Self Assessment -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-4 bg-gray-900 border border-gray-800 rounded-lg">
				<p class="text-gray-400 text-sm mb-3 font-medium">Not sure where to start?</p>
				<ul class="text-gray-500 text-sm space-y-1">
					<li>&#8226; Never used AI for code → <span class="text-white">Start at Level 0</span></li>
					<li>&#8226; Built demos with ChatGPT/Cursor → <span class="text-white">Start at Level 1</span></li>
					<li>&#8226; Shipped AI features to production → <span class="text-white">Jump to Level 3</span></li>
				</ul>
			</div>
		</div>
	</section>

	<!-- The Levels -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Levels</h2>

			<div class="space-y-4">
				{#each levels as level}
					<div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors duration-300">
						<!-- Level Header -->
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

						<!-- Level Details (Expandable) -->
						{#if expandedLevel === level.level}
							<div class="border-t border-gray-800 p-6 bg-gray-950/50" transition:fade={{ duration: 200 }}>
								<!-- Level 0: Orientation -->
								{#if level.level === 0}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Essential Reading</h4>
											<div class="space-y-2">
												{#each level.reading as item}
													<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
														<span class="text-white font-medium">{item.title}</span>
														<span class="text-gray-500 text-sm ml-2">— {item.desc}</span>
														<span class="text-emerald-400 text-xs ml-2">&rarr;</span>
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
														<span class="text-gray-600 mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Setup - Choose ONE</h4>
											<div class="grid md:grid-cols-2 gap-3">
												{#each level.setup as tool}
													<a href={tool.url} target="_blank" rel="noopener noreferrer" class="p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors border border-gray-800">
														<span class="text-white font-semibold">{tool.tool}</span>
														<span class="text-emerald-400 text-xs ml-2">&rarr;</span>
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
														<span class="text-emerald-400">&#8226;</span>
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

										<div class="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
											<p class="text-emerald-400 font-medium">Come back when you've shipped something. We'll talk.</p>
										</div>
									</div>
								{/if}

								<!-- Level 2: Structured Development -->
								{#if level.level === 2}
									<div class="space-y-6">
										{#if level.intro}
											<p class="text-gray-500 text-sm italic border-l-2 border-blue-500/50 pl-4">{level.intro}</p>
										{/if}

										{#each level.skills as skill}
											<div>
												<h4 class="text-sm font-semibold text-white mb-3">{skill.name}</h4>
												<ul class="space-y-1 mb-2">
													{#each skill.items as item}
														<li class="flex items-start gap-2 text-gray-400 text-sm">
															<span class="text-blue-400">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20">
																{resource.title} &rarr;
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
														<span class="text-emerald-400">&#9744;</span>
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
															<span class="text-purple-400">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.technologies}
													<div class="space-y-1 mt-3">
														{#each skill.technologies as tech}
															<div class="flex items-baseline gap-2 text-sm">
																<span class="text-purple-400 font-medium">{tech.name}</span>
																<span class="text-gray-600">— {tech.when}</span>
															</div>
														{/each}
													</div>
												{/if}
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded hover:bg-purple-500/20">
																{resource.title} &rarr;
															</a>
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
														<span class="text-emerald-400">&#9744;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
											<h5 class="text-xs font-semibold text-gray-600 uppercase mb-2">Example Ideas:</h5>
											<ul class="space-y-1">
												{#each level.project.ideas as idea}
													<li class="text-gray-500 text-sm">&#8226; {idea}</li>
												{/each}
											</ul>
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
															<span class="text-amber-400">&#8226;</span>
															<span>{item}</span>
														</li>
													{/each}
												</ul>
												{#if skill.resources}
													<div class="flex flex-wrap gap-2 mt-2">
														{#each skill.resources as resource}
															<a href={resource.url} target="_blank" rel="noopener noreferrer" class="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded hover:bg-amber-500/20">
																{resource.title} &rarr;
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
														<span class="text-emerald-400">&#9744;</span>
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
													<span class="text-gray-600 mt-1">&#9744;</span>
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


	<!-- CTA -->
	<section class="py-16 md:py-24 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-2xl md:text-3xl font-bold mb-6">
				Ready to Share What You Built?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				I'm happy to help people who help themselves. Complete Level 1, then reach out.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Include: link to deployed app, GitHub repo (if public), what was hardest, what surprised you.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Builder%20Track%20-%20Level%201%20Complete&body=Link%20to%20deployed%20app%3A%20%0A%0AGitHub%20repo%3A%20%0A%0AWhat%20was%20hardest%3A%20%0A%0AWhat%20surprised%20me%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
				>
					Email Me Your Build
				</a>
				<a
					href="/learn"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
				>
					Explore Other Tracks
				</a>
			</div>
		</div>
	</section>

	<!-- Stuck Section -->
	<section class="py-8 px-6 md:px-12 bg-gray-900/50 border-t border-gray-800">
		<div class="max-w-4xl mx-auto text-center">
			<p class="text-gray-500 text-sm">
				<span class="text-gray-400 font-medium">Stuck?</span>
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-emerald-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. I'll help you figure out if you need to go back a level, get specific technical help, or reassess your project scope.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Builder Track
			</p>
			<a href="/learn" class="text-sm text-gray-500 hover:text-white transition-colors">
				All Tracks
			</a>
		</div>
	</footer>
</div>

<style>
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
</style>
