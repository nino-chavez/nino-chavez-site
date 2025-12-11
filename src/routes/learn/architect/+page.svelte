<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Architect Track - Coming Soon | Learning Gateway</title>
	<meta name="description" content="Design systems, write arc42 documentation. Create documentation someone could build from." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
	{#if mounted}
		<div class="max-w-2xl text-center" in:fade={{ duration: 600 }}>
			<a href="/learn" class="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to Learning Gateway
			</a>

			<div class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
				<span class="text-sm font-medium text-cyan-400">Architect Track</span>
			</div>

			<h1 class="text-4xl md:text-5xl font-bold mb-6">Coming Soon</h1>

			<p class="text-xl text-gray-400 mb-4">
				Design systems, write arc42 docs
			</p>

			<p class="text-gray-500 mb-8">
				Create documentation someone could build from—without asking you questions. arc42, C4 diagrams, ADRs.
			</p>

			<div class="p-6 bg-gray-900 border border-gray-800 rounded-xl mb-8">
				<div class="text-sm text-gray-500 mb-2">Corpus Example</div>
				<div class="text-lg text-white font-medium">Signet AEO Solution Architecture</div>
				<div class="text-cyan-400">51,386 words · 40+ diagrams</div>
			</div>

			<a
				href="/learn/builder"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
			>
				Start with Builder Track
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	{/if}
</div>
