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
			color: 'violet',
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
			color: 'orange',
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
			color: 'teal',
			ready: true,
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

			<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
				{#each tracks.filter(t => t.ready) as track}
					<a
						href="/learn/{track.id}"
						class="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all duration-300 group block"
					>
						<div class="flex items-center gap-3 mb-3">
							<div class="w-10 h-10 rounded-lg flex items-center justify-center
								{track.color === 'emerald' ? 'bg-emerald-500/20' : ''}
								{track.color === 'cyan' ? 'bg-cyan-500/20' : ''}
								{track.color === 'rose' ? 'bg-rose-500/20' : ''}
								{track.color === 'violet' ? 'bg-violet-500/20' : ''}
								{track.color === 'orange' ? 'bg-orange-500/20' : ''}
								{track.color === 'teal' ? 'bg-teal-500/20' : ''}">
								{#if track.icon === 'code'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
									</svg>
								{:else if track.icon === 'boxes'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
									</svg>
								{:else if track.icon === 'lightbulb'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
									</svg>
								{:else if track.icon === 'book'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
									</svg>
								{:else if track.icon === 'mic'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
									</svg>
								{:else if track.icon === 'building'}
									<svg class="w-5 h-5 {track.color === 'emerald' ? 'text-emerald-400' : ''} {track.color === 'cyan' ? 'text-cyan-400' : ''} {track.color === 'rose' ? 'text-rose-400' : ''} {track.color === 'violet' ? 'text-violet-400' : ''} {track.color === 'orange' ? 'text-orange-400' : ''} {track.color === 'teal' ? 'text-teal-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
									</svg>
								{/if}
							</div>
							<div>
								<h3 class="text-lg font-bold text-white">{track.title}</h3>
								<span class="text-xs
									{track.color === 'emerald' ? 'text-emerald-400' : ''}
									{track.color === 'cyan' ? 'text-cyan-400' : ''}
									{track.color === 'rose' ? 'text-rose-400' : ''}
									{track.color === 'violet' ? 'text-violet-400' : ''}
									{track.color === 'orange' ? 'text-orange-400' : ''}
									{track.color === 'teal' ? 'text-teal-400' : ''}">{track.timeline}</span>
							</div>
						</div>

						<p class="text-xs text-gray-500 mb-3 line-clamp-2">{track.tagline}</p>

						<div class="pt-3 border-t border-gray-800">
							<span class="text-xs font-medium
								{track.color === 'emerald' ? 'text-emerald-400' : ''}
								{track.color === 'cyan' ? 'text-cyan-400' : ''}
								{track.color === 'rose' ? 'text-rose-400' : ''}
								{track.color === 'violet' ? 'text-violet-400' : ''}
								{track.color === 'orange' ? 'text-orange-400' : ''}
								{track.color === 'teal' ? 'text-teal-400' : ''}">Start →</span>
						</div>
					</a>
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
