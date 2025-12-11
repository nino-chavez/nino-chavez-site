<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const tracks = [
		{
			id: 'builder',
			title: 'Builder',
			tagline: 'Build production apps with AI',
			description: 'From "I\'ve never used AI to code" to shipping production systems with observability and governance.',
			artifact: 'Deployed production application',
			timeline: '8-12 weeks',
			levels: 5,
			color: 'emerald',
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
			color: 'cyan',
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
			color: 'rose',
			ready: false,
			example: 'BBY FY27 Brief (8,374 words)',
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
			color: 'violet',
			ready: false,
			example: 'GEO Playbook (87,740 words)',
			icon: 'book'
		},
		{
			id: 'voice',
			title: 'Voice Designer',
			tagline: 'Define consistent voice at scale',
			description: 'Analyze your writing, document patterns, build validation systems that enforce consistency across thousands of words.',
			artifact: 'Complete voice system with validation',
			timeline: '6-10 weeks',
			levels: 5,
			color: 'orange',
			ready: false,
			example: 'Signal Dispatch Voice Guide (18,309 words)',
			icon: 'pen'
		},
		{
			id: 'enterprise',
			title: 'Enterprise',
			tagline: 'Scale AI work across teams',
			description: 'Encode workflows into reusable skills, multi-format exports, quality rubrics, and governance frameworks.',
			artifact: 'Reusable skill with quality gates',
			timeline: '10-16 weeks',
			levels: 5,
			color: 'teal',
			ready: false,
			example: '5 production skills, 3-role workflow',
			icon: 'building'
		}
	];


	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Learning Gateway - Nino Chavez | 6 Tracks for AI-Assisted Work</title>
	<meta name="description" content="A self-directed path for practitioners who want to work with AI. 6 tracks: Builder, Architect, Strategist, Author, Voice Designer, Enterprise." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			{#if mounted}
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Learn to Ship with AI
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed"
				>
					The map I wish I had when I started.
				</p>

				<p
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="text-lg text-gray-500 leading-relaxed max-w-3xl"
				>
					A self-directed path for practitioners who want to <span class="text-white">work with AI</span>—not just talk about it. Build apps. Design systems. Write documents that ship.
				</p>
			{/if}
		</div>
	</section>

	<!-- Philosophy Section -->
	<section class="py-12 px-6 md:px-12 bg-gray-900/50 border-y border-gray-800">
		<div class="max-w-5xl mx-auto">
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold text-red-400 mb-4">This path is NOT for you if:</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You want a curriculum to passively consume</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You're collecting credentials for LinkedIn</span>
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
							<span>You learn by building, not by reading</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want real projects that force real learning</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>


	<!-- Available Tracks -->
	<section class="py-16 md:py-20 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Available Tracks</h2>

			<div class="grid md:grid-cols-2 gap-6">
				{#each tracks.filter(t => t.ready) as track}
					<a
						href="/learn/{track.id}"
						class="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 group block"
					>
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 rounded-lg flex items-center justify-center {track.color === 'emerald' ? 'bg-emerald-500/20' : 'bg-cyan-500/20'}">
								{#if track.icon === 'code'}
									<svg class="w-6 h-6 {track.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
								{:else if track.icon === 'boxes'}
									<svg class="w-6 h-6 {track.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								{/if}
							</div>
							<div>
								<h3 class="text-xl font-bold text-white">{track.title} Track</h3>
								<span class="text-xs {track.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}">{track.levels} levels · {track.timeline}</span>
							</div>
						</div>

						<p class="text-sm text-gray-400 mb-4">{track.description}</p>

						<div class="pt-4 border-t border-gray-800">
							<div class="flex justify-between items-center">
								<div>
									<span class="text-xs text-gray-600">You'll ship:</span>
									<span class="text-xs text-gray-400 ml-1">{track.artifact}</span>
								</div>
								<span class="text-sm font-medium {track.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}">Start →</span>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Coming Soon Tracks -->
	<section class="py-8 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-sm font-semibold uppercase tracking-wider text-gray-600 mb-4">More Tracks Coming</h3>
			<div class="grid sm:grid-cols-2 gap-3">
				{#each tracks.filter(t => !t.ready) as track}
					<div class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800/50">
						<span class="text-gray-400 font-medium">{track.title}</span>
						<span class="text-xs text-gray-600">— {track.tagline}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Filter -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-3xl mx-auto">
			<div class="bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-8 md:p-12">
				<h2 class="text-2xl md:text-3xl font-bold mb-6">The Filter</h2>

				<p class="text-xl text-gray-400 mb-6 leading-relaxed">
					The filter is simple: <span class="text-white font-semibold">Show me what you've shipped.</span>
				</p>

				<p class="text-gray-500 leading-relaxed">
					Not what you've read. Not what you're planning. What you've built.
					That's how I know you're serious. That's how I learned. That's how you will too.
				</p>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-6 md:px-12">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				Ready to start?
			</h2>
			<p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
				Complete Level 1, then reach out.
			</p>

			<a
				href="/learn/builder"
				class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
			>
				Start Builder Track
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Learning Gateway
			</p>
			<a
				href="https://signaldispatch.co"
				target="_blank"
				rel="noopener noreferrer"
				class="text-sm text-gray-500 hover:text-white transition-colors"
			>
				Read my writing →
			</a>
		</div>
	</footer>
</div>

<style>
	:global(.bg-emerald-500\/20) { background-color: rgb(16 185 129 / 0.2); }
	:global(.text-emerald-400) { color: rgb(52 211 153); }
	:global(.hover\:border-emerald-500\/50:hover) { border-color: rgb(16 185 129 / 0.5); }
	:global(.group-hover\:text-emerald-400) { }
	:global(.group:hover .group-hover\:text-emerald-400) { color: rgb(52 211 153); }
	:global(.text-emerald-400\/80) { color: rgb(52 211 153 / 0.8); }
</style>
