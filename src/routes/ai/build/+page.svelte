<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedProject = null;

	const projects = [
		{
			id: 'ask-dad',
			title: 'Ask Dad',
			tagline: 'RAG-powered family knowledge base',
			description: 'A chatbot that represents my voice, thinking, and documented perspectives. Built for my daughter to ask questions and get answers grounded in things I\'ve actually written.',
			status: 'Live',
			badge: 'ai-badge-learn',
			technologies: ['Claude', 'Supabase pgvector', 'SvelteKit', 'OpenAI Embeddings', 'Vercel'],
			architecture: {
				title: 'RAG Pipeline Architecture',
				flow: [
					{ step: 'Query', detail: 'User sends a message' },
					{ step: 'Embed', detail: 'Generate embedding via OpenAI' },
					{ step: 'Search', detail: 'Similarity search in Supabase pgvector' },
					{ step: 'Context', detail: 'Top K chunks injected into prompt' },
					{ step: 'Generate', detail: 'Claude responds with persona + context' }
				],
				features: [
					'Semantic search across blog posts, docs, and voice guides',
					'Streaming responses with source citations',
					'Conversation memory for context continuity',
					'Custom system prompt capturing voice patterns'
				]
			},
			link: '/ai/ask',
			linkText: 'Try It'
		},
		{
			id: 'code-to-cognition',
			title: 'Code to Cognition',
			tagline: 'Interactive AI learning platform',
			description: 'An interactive experience bridging traditional development and agentic AI systems. 11 slides, visual agent blueprints, and a 30-day learning path.',
			status: 'Live',
			badge: 'ai-badge-build',
			technologies: ['Next.js 15', 'React Flow', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
			architecture: {
				title: 'Interactive Learning Architecture',
				flow: [
					{ step: 'Slides', detail: '11 comprehensive slides with timeline navigation' },
					{ step: 'Blueprints', detail: 'Interactive agent graph visualization' },
					{ step: 'Filtering', detail: 'Filter by domain, agent type, capability' },
					{ step: 'Resources', detail: 'Curated links with 30-day learning path' }
				],
				features: [
					'Visual agent architecture diagrams',
					'603 agents mapped across 10 domains',
					'Data consolidation for <3s load time',
					'Zero-scroll UX with timeline navigation'
				]
			},
			link: '/code-to-cognition',
			linkText: 'View Live'
		}
	];

	function toggleProject(id) {
		expandedProject = expandedProject === id ? null : id;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Build - AI Projects | Nino Chavez</title>
	<meta name="description" content="AI projects I've built: RAG chatbots, interactive learning systems, and agentic workflows." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="max-w-7xl mx-auto p-6">
	<!-- Hero Section -->
	<section class="py-8 md:py-12">
		{#if mounted}
			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				What I've Built
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-6 leading-relaxed max-w-2xl"
				style="color: var(--ai-text-secondary);"
			>
				Real systems, shipped to production. Not demos or proofs-of-concept.
			</p>
		{/if}
	</section>

	<!-- Projects -->
	<section class="py-4">
		<div class="space-y-4">
			{#each projects as project, i}
				{#if mounted}
					<div
						in:fly={{ y: 20, duration: 600, delay: 400 + i * 100 }}
						class="ai-card rounded-xl overflow-hidden"
					>
						<!-- Project Header -->
						<button
							on:click={() => toggleProject(project.id)}
							class="w-full p-6 text-left transition-colors"
							style="background: var(--ai-bg-card);"
						>
							<div class="flex flex-col md:flex-row md:items-start gap-4">
								<!-- Icon -->
								<div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 {project.badge}">
									{#if project.id === 'ask-dad'}
										<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
										</svg>
									{:else}
										<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
										</svg>
									{/if}
								</div>

								<!-- Content -->
								<div class="flex-1">
									<div class="flex items-center gap-3 mb-2">
										<h2 class="text-lg font-bold" style="color: var(--ai-text-primary);">{project.title}</h2>
										<span class="text-xs px-2 py-0.5 rounded-full font-semibold {project.badge}">
											{project.status}
										</span>
									</div>
									<p class="text-sm mb-2" style="color: var(--ai-text-secondary);">{project.tagline}</p>
									<p class="text-sm" style="color: var(--ai-text-muted);">{project.description}</p>

									<!-- Tech Stack -->
									<div class="mt-4 flex flex-wrap gap-2">
										{#each project.technologies as tech}
											<span class="text-xs px-2 py-1 rounded" style="background: var(--ai-bg-card-alt); color: var(--ai-text-muted);">
												{tech}
											</span>
										{/each}
									</div>
								</div>

								<!-- Expand indicator -->
								<div class="flex-shrink-0">
									<svg
										class="w-5 h-5 transition-transform {expandedProject === project.id ? 'rotate-180' : ''}"
										style="color: var(--ai-text-muted);"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
									</svg>
								</div>
							</div>
						</button>

						<!-- Expanded Architecture Details -->
						{#if expandedProject === project.id}
							<div
								in:fade={{ duration: 200 }}
								class="p-6"
								style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);"
							>
								<h3 class="text-sm font-semibold uppercase tracking-wider mb-4" style="color: var(--ai-text-muted);">
									{project.architecture.title}
								</h3>

								<!-- Flow Diagram -->
								<div class="mb-6">
									<div class="flex flex-wrap items-center gap-2 md:gap-4">
										{#each project.architecture.flow as item, idx}
											<div class="flex items-center gap-2">
												<div class="px-3 py-2 rounded-lg" style="background: var(--ai-bg-card);">
													<div class="text-xs font-medium" style="color: var(--ai-text-primary);">{item.step}</div>
													<div class="text-xs" style="color: var(--ai-text-muted);">{item.detail}</div>
												</div>
												{#if idx < project.architecture.flow.length - 1}
													<svg class="w-4 h-4 hidden md:block" style="color: var(--ai-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												{/if}
											</div>
										{/each}
									</div>
								</div>

								<!-- Features -->
								<h4 class="text-xs font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Key Features</h4>
								<ul class="space-y-2">
									{#each project.architecture.features as feature}
										<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
											<svg class="w-4 h-4 mt-0.5 flex-shrink-0" style="color: var(--ai-accent-green);" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
											</svg>
											{feature}
										</li>
									{/each}
								</ul>

								<!-- Link if available -->
								{#if project.link}
									<div class="mt-6 pt-6" style="border-top: 1px solid var(--ai-border-color);">
										<a
											href={project.link}
											target={project.external ? '_blank' : undefined}
											rel={project.external ? 'noopener noreferrer' : undefined}
											class="inline-flex items-center gap-2 text-sm font-medium transition-colors"
											style="color: var(--ai-accent-purple);"
										>
											{project.linkText || 'View Live'}
											{#if project.external}
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
												</svg>
											{:else}
												<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
												</svg>
											{/if}
										</a>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<!-- Philosophy -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 700 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h2 class="text-lg font-bold mb-4" style="color: var(--ai-text-primary);">On building with AI</h2>
				<div class="space-y-3 text-sm" style="color: var(--ai-text-secondary);">
					<p>
						These aren't weekend projects. Each one solved a real problem for a real audience, with real constraints on performance, cost, and reliability.
					</p>
					<p>
						The patterns here emerged from production usage. Trade-offs were made. Some things didn't work. The architectures reflect what survived.
					</p>
				</div>
			</div>
		{/if}
	</section>

	<!-- CTA -->
	<section class="py-8 text-center">
		{#if mounted}
			<p in:fly={{ y: 20, duration: 800, delay: 800 }} class="mb-4" style="color: var(--ai-text-muted);">
				Want to build something similar?
			</p>
			<a
				href="/ai/learn/builder"
				in:fly={{ y: 20, duration: 800, delay: 900 }}
				class="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors"
				style="background: var(--ai-accent-green); color: #460073;"
			>
				Start the Builder Track
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex justify-between items-center">
		<p class="text-xs" style="color: var(--ai-text-muted);">Build</p>
		<a href="/ai" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			Back to AI Hub
		</a>
	</div>
</footer>
