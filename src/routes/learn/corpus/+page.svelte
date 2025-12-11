<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Corpus Browser - Coming Soon | Learning Gateway</title>
	<meta name="description" content="Browse 882,786 words of AI-assisted work across 6 client projects." />
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

			<div class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-full mb-6">
				<span class="text-sm font-medium text-gray-300">Corpus Browser</span>
			</div>

			<h1 class="text-4xl md:text-5xl font-bold mb-6">Coming Soon</h1>

			<p class="text-xl text-gray-400 mb-8">
				Browse the full corpus of AI-assisted work
			</p>

			<div class="grid grid-cols-2 gap-4 mb-8">
				<div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
					<div class="text-2xl font-bold text-emerald-400">882,786</div>
					<div class="text-sm text-gray-500">Total words</div>
				</div>
				<div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
					<div class="text-2xl font-bold text-emerald-400">6</div>
					<div class="text-sm text-gray-500">Client projects</div>
				</div>
				<div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
					<div class="text-2xl font-bold text-emerald-400">5</div>
					<div class="text-sm text-gray-500">Reusable skills</div>
				</div>
				<div class="p-4 bg-gray-900 border border-gray-800 rounded-xl">
					<div class="text-2xl font-bold text-emerald-400">40+</div>
					<div class="text-sm text-gray-500">Architecture diagrams</div>
				</div>
			</div>

			<a
				href="/learn"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
			>
				Explore Tracks
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	{/if}
</div>
