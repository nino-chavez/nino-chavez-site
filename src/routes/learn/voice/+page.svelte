<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Voice Designer Track - Coming Soon | Learning Gateway</title>
	<meta name="description" content="Define consistent voice at scale. Analyze writing, document patterns, build validation systems." />
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

			<div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full mb-6">
				<span class="text-sm font-medium text-orange-400">Voice Designer Track</span>
			</div>

			<h1 class="text-4xl md:text-5xl font-bold mb-6">Coming Soon</h1>

			<p class="text-xl text-gray-400 mb-4">
				Define consistent voice at scale
			</p>

			<p class="text-gray-500 mb-8">
				Analyze your writing, document patterns, build validation systems that enforce consistency across thousands of words.
			</p>

			<div class="p-6 bg-gray-900 border border-gray-800 rounded-xl mb-8">
				<div class="text-sm text-gray-500 mb-2">Corpus Example</div>
				<div class="text-lg text-white font-medium">Signal Dispatch Voice Guide</div>
				<div class="text-orange-400">18,309 words · Complete voice system</div>
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
