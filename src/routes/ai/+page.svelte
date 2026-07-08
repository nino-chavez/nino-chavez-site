<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const pathways = [
		{
			id: 'learn',
			title: 'Learn',
			tagline: 'Master AI-assisted work',
			description: '7 self-directed tracks from Explorer to Enterprise. Build real things. Ship production work.',
			href: '/ai/learn',
			badge: 'ai-badge-learn',
			icon: 'academic-cap',
			stats: '7 tracks',
			detail: '4-20 weeks each'
		},
		{
			id: 'build',
			title: 'Build',
			tagline: 'Projects I\'ve shipped',
			description: 'Real applications: RAG chatbots, interactive learning systems, agentic workflows.',
			href: '/ai/build',
			badge: 'ai-badge-build',
			icon: 'code',
			stats: '2 projects',
			detail: 'With architecture'
		},
		{
			id: 'reference',
			title: 'Reference',
			tagline: 'Patterns and architectures',
			description: 'Genericized architectures from client work. Glossary of AI/ML concepts. Agent patterns.',
			href: '/ai/reference',
			badge: 'ai-badge-reference',
			icon: 'book-open',
			stats: '70+ terms',
			detail: 'Architectures & patterns'
		},
		{
			id: 'ask',
			title: 'Ask',
			tagline: 'Talk to Virtual Nino',
			description: 'RAG-powered chatbot grounded in my actual writing and perspectives. Get feedback on your thinking.',
			href: '/ai/ask',
			badge: 'ai-badge-ask',
			icon: 'chat',
			stats: 'Live',
			detail: 'RAG-powered'
		}
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>AI Practice Area - Nino Chavez</title>
	<meta name="description" content="Learn AI-assisted work, explore projects, and reference architectures and patterns." />
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
				Working with AI
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 400 }}
				class="text-base leading-relaxed max-w-2xl"
				style="color: var(--ai-text-muted);"
			>
				Where I document what I've learned, what I've built, and what patterns have emerged from real work with AI systems.
			</p>
		{/if}
	</section>

	<!-- Pathways -->
	<section class="py-8">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 500 }}
				class="text-sm font-semibold uppercase tracking-wider mb-6"
				style="color: var(--ai-text-muted);"
			>
				Choose a Path
			</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each pathways as pathway, i}
					<a
						href={pathway.href}
						in:fly={{ y: 20, duration: 600, delay: 600 + i * 100 }}
						class="ai-card group block rounded-xl p-6 cursor-pointer"
					>
						<div class="flex items-start gap-4">
							<!-- Icon -->
							<div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 {pathway.badge}">
								{#if pathway.icon === 'academic-cap'}
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
									</svg>
								{:else if pathway.icon === 'code'}
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
								{:else if pathway.icon === 'book-open'}
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
								{:else if pathway.icon === 'chat'}
									<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
									</svg>
								{/if}
							</div>

							<!-- Content -->
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<h3 class="text-lg font-bold" style="color: var(--ai-text-primary);">{pathway.title}</h3>
									<span class="text-xs px-2 py-0.5 rounded-full font-semibold {pathway.badge}">
										{pathway.stats}
									</span>
								</div>
								<p class="text-sm mb-1" style="color: var(--ai-text-secondary);">{pathway.tagline}</p>
								<p class="text-sm" style="color: var(--ai-text-muted);">{pathway.description}</p>
							</div>

							<!-- Arrow -->
							<div class="hidden sm:flex items-center flex-shrink-0">
								<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" style="color: var(--ai-text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Philosophy -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 900 }}
				class="rounded-xl p-6 md:p-8"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h2 class="text-lg font-bold mb-4" style="color: var(--ai-text-primary);">The approach</h2>
				<div class="space-y-3 text-sm" style="color: var(--ai-text-secondary);">
					<p>
						I don't write about AI from a distance. Everything here comes from actual projects, real deadlines, and code that shipped.
					</p>
					<p>
						The <strong style="color: var(--ai-accent-purple);">Learn</strong> section is structured around artifacts, not theory. Each track ends with something you can show.
					</p>
					<p>
						The <strong style="color: var(--ai-accent-purple);">Build</strong> section shows the systems I've built. Architectures, trade-offs, what worked.
					</p>
					<p>
						The <strong style="color: var(--ai-accent-purple);">Reference</strong> section collects patterns that emerged from client work. Scrubbed of specifics, kept for reuse.
					</p>
					<p>
						The <strong style="color: var(--ai-accent-purple);">Ask</strong> section is a live demo: a RAG-powered chatbot trained on my writing. Talk to it.
					</p>
				</div>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			AI Practice Area
		</p>
		<div class="flex gap-6">
			<a
				href="/"
				class="text-xs transition-colors"
				style="color: var(--ai-text-muted);"
			>
				Main Portfolio
			</a>
			<a
				href="/blog"
				class="text-xs transition-colors"
				style="color: var(--ai-text-muted);"
			>
				Read my writing
			</a>
		</div>
	</div>
</footer>
