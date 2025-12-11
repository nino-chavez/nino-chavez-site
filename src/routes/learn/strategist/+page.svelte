<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Strategist Track - Coming Soon | Learning Gateway</title>
	<meta name="description" content="Write consulting-grade documents. External advisor voice with pattern recognition across clients." />
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

			<div class="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full mb-6">
				<span class="text-sm font-medium text-rose-400">Strategist Track</span>
			</div>

			<h1 class="text-4xl md:text-5xl font-bold mb-6">Coming Soon</h1>

			<p class="text-xl text-gray-400 mb-4">
				Write consulting-grade docs
			</p>

			<p class="text-gray-500 mb-8">
				External advisor voice. Pattern recognition across clients and industries. Recommendations grounded in observation.
			</p>

			<div class="p-6 bg-gray-900 border border-gray-800 rounded-xl mb-8">
				<div class="text-sm text-gray-500 mb-2">Corpus Example</div>
				<div class="text-lg text-white font-medium">BBY FY27 Strategic Brief</div>
				<div class="text-rose-400">8,374 words</div>
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
