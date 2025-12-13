<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const tracks = [
		{
			id: 'explorer',
			title: 'Explorer',
			tagline: 'Use AI to understand yourself',
			description: 'Before you use AI to produce, use it to reflect. Build cognitive mirrors that show you how you think.',
			artifact: 'Personal cognitive mirror + bridge to creation',
			timeline: '4-8 weeks',
			levels: 5,
			badge: 'ai-badge-learn',
			ready: true,
			icon: 'compass'
		},
		{
			id: 'builder',
			title: 'Builder',
			tagline: 'Build production apps with AI',
			description: 'From "I\'ve never used AI to code" to shipping production systems with observability and governance.',
			artifact: 'Deployed production application',
			timeline: '8-12 weeks',
			levels: 5,
			badge: 'ai-badge-build',
			ready: true,
			icon: 'code'
		},
		{
			id: 'architect',
			title: 'Architect',
			tagline: 'Design systems, write arc42 docs',
			description: 'Create documentation someone could build from—without asking you questions. arc42, C4 diagrams, ADRs.',
			artifact: 'Complete arc42 solution architecture',
			timeline: '8-12 weeks',
			levels: 5,
			badge: 'ai-badge-reference',
			ready: true,
			icon: 'boxes'
		},
		{
			id: 'strategist',
			title: 'Strategist',
			tagline: 'Write consulting-grade docs',
			description: 'External advisor voice. Pattern recognition across clients and industries. Recommendations grounded in observation.',
			artifact: 'Executive-ready strategic brief',
			timeline: '6-10 weeks',
			levels: 5,
			badge: 'ai-badge-ask',
			ready: true,
			icon: 'lightbulb'
		},
		{
			id: 'author',
			title: 'Author',
			tagline: 'Create multi-chapter reference works',
			description: 'Not blog posts. Playbooks. Frameworks. The kind of document that becomes organizational IP.',
			artifact: 'Multi-volume playbook (20,000+ words)',
			timeline: '12-20 weeks',
			levels: 5,
			badge: 'ai-badge-learn',
			ready: true,
			icon: 'book'
		},
		{
			id: 'voice',
			title: 'Voice',
			tagline: 'Define consistent voice at scale',
			description: 'Analyze your writing, document patterns, build validation systems that enforce consistency across thousands of words.',
			artifact: 'Complete voice system with validation',
			timeline: '6-10 weeks',
			levels: 5,
			badge: 'ai-badge-build',
			ready: true,
			icon: 'mic'
		},
		{
			id: 'enterprise',
			title: 'Enterprise',
			tagline: 'Scale AI work across teams',
			description: 'Encode workflows into reusable skills, multi-format exports, quality rubrics, and governance frameworks.',
			artifact: 'Reusable skill with quality gates',
			timeline: '10-16 weeks',
			levels: 5,
			badge: 'ai-badge-reference',
			ready: true,
			icon: 'building'
		}
	];


	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Learning Gateway - Nino Chavez | 7 Tracks for AI-Assisted Work</title>
	<meta name="description" content="A self-directed path for practitioners who want to work with AI. 7 tracks: Explorer, Builder, Architect, Strategist, Author, Voice Designer, Enterprise." />
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
				Learn to Ship with AI
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-xl md:text-2xl mb-4 leading-relaxed"
				style="color: var(--ai-text-secondary);"
			>
				The map I wish I had when I started.
			</p>

			<p
				in:fly={{ y: 20, duration: 800, delay: 400 }}
				class="text-base leading-relaxed max-w-2xl"
				style="color: var(--ai-text-muted);"
			>
				A self-directed path for practitioners who want to <span style="color: var(--ai-text-primary);">work with AI</span>—not just talk about it. Build apps. Design systems. Write documents that ship.
			</p>
		{/if}
	</section>

	<!-- Philosophy Section -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 500 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<div class="grid md:grid-cols-2 gap-8">
					<div>
						<h3 class="text-lg font-semibold mb-4" style="color: #ef4444;">This path is NOT for you if:</h3>
						<ul class="space-y-3">
							<li class="flex items-start gap-3" style="color: var(--ai-text-muted);">
								<svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: #ef4444;" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
								<span>You want a curriculum to passively consume</span>
							</li>
							<li class="flex items-start gap-3" style="color: var(--ai-text-muted);">
								<svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: #ef4444;" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
								</svg>
								<span>You're collecting credentials for LinkedIn</span>
							</li>
						</ul>
					</div>

					<div>
						<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-green);">This path IS for you if:</h3>
						<ul class="space-y-3">
							<li class="flex items-start gap-3" style="color: var(--ai-text-muted);">
								<svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--ai-accent-green);" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>You learn by building, not by reading</span>
							</li>
							<li class="flex items-start gap-3" style="color: var(--ai-text-muted);">
								<svg class="w-5 h-5 mt-0.5 flex-shrink-0" style="color: var(--ai-accent-green);" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								<span>You want real projects that force real learning</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</section>


	<!-- Available Tracks -->
	<section class="py-8">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 600 }}
				class="text-sm font-semibold uppercase tracking-wider mb-6"
				style="color: var(--ai-text-muted);"
			>
				Available Tracks
			</h2>

			<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each tracks.filter(t => t.ready) as track, i}
					<a
						href="/ai/learn/{track.id}"
						in:fly={{ y: 20, duration: 600, delay: 700 + i * 50 }}
						class="ai-card group block rounded-xl p-5"
					>
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 rounded-lg flex items-center justify-center {track.badge}">
								{#if track.icon === 'compass'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
									</svg>
								{:else if track.icon === 'code'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
								{:else if track.icon === 'boxes'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								{:else if track.icon === 'lightbulb'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								{:else if track.icon === 'book'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
								{:else if track.icon === 'mic'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
									</svg>
								{:else if track.icon === 'building'}
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
								{/if}
							</div>
							<div>
								<h3 class="text-lg font-bold" style="color: var(--ai-text-primary);">{track.title}</h3>
								<span class="text-xs px-2 py-0.5 rounded-full font-semibold {track.badge}">{track.timeline}</span>
							</div>
						</div>

						<p class="text-xs mb-3 line-clamp-2" style="color: var(--ai-text-muted);">{track.tagline}</p>

						<div class="pt-3" style="border-top: 1px solid var(--ai-border-color);">
							<span class="text-xs font-medium" style="color: var(--ai-accent-purple);">Start &rarr;</span>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</section>

	<!-- The Filter -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 900 }}
				class="rounded-xl p-8 md:p-12"
				style="background: linear-gradient(135deg, var(--ai-bg-card) 0%, var(--ai-bg-card-alt) 100%); border: 1px solid var(--ai-border-color);"
			>
				<h2 class="text-2xl md:text-3xl font-bold mb-6" style="color: var(--ai-text-primary);">The Filter</h2>

				<p class="text-xl mb-6 leading-relaxed" style="color: var(--ai-text-secondary);">
					The filter is simple: <span class="font-semibold" style="color: var(--ai-text-primary);">Show me what you've shipped.</span>
				</p>

				<p class="leading-relaxed" style="color: var(--ai-text-muted);">
					Not what you've read. Not what you're planning. What you've built.
					That's how I know you're serious. That's how I learned. That's how you will too.
				</p>
			</div>
		{/if}
	</section>

	<!-- CTA Section -->
	<section class="py-8 text-center">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 1000 }}
				class="text-2xl md:text-3xl font-bold mb-4"
				style="color: var(--ai-text-primary);"
			>
				Ready to start?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1100 }}
				class="text-lg mb-6 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				New to AI? Start with Explorer. Ready to build? Jump to Builder.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1200 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="/ai/learn/explorer"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors ai-badge-learn"
					style="background: var(--ai-accent-purple); color: white;"
				>
					Start Exploring
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
				<a
					href="/ai/learn/builder"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-green); color: #460073;"
				>
					Start Building
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			Learning Gateway
		</p>
		<a
			href="https://signaldispatch.co"
			target="_blank"
			rel="noopener noreferrer"
			class="text-xs transition-colors"
			style="color: var(--ai-text-muted);"
		>
			Read my writing &rarr;
		</a>
	</div>
</footer>
