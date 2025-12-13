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

<div class="min-h-screen flex items-center justify-center px-6" style="background: var(--ai-bg-page);">
	{#if mounted}
		<div class="max-w-2xl text-center" in:fade={{ duration: 600 }}>
			<a href="/ai/learn" class="inline-flex items-center gap-2 transition-colors mb-8" style="color: var(--ai-text-muted);">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				Back to Learning Gateway
			</a>

			<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);">
				<span class="text-sm font-medium" style="color: var(--ai-text-secondary);">Corpus Browser</span>
			</div>

			<h1 class="text-4xl md:text-5xl font-bold mb-6" style="color: var(--ai-text-primary);">Coming Soon</h1>

			<p class="text-xl mb-8" style="color: var(--ai-text-secondary);">
				Browse the full corpus of AI-assisted work
			</p>

			<div class="grid grid-cols-2 gap-4 mb-8">
				<div class="p-4 rounded-xl" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
					<div class="text-2xl font-bold" style="color: var(--ai-accent-green);">882,786</div>
					<div class="text-sm" style="color: var(--ai-text-muted);">Total words</div>
				</div>
				<div class="p-4 rounded-xl" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
					<div class="text-2xl font-bold" style="color: var(--ai-accent-green);">6</div>
					<div class="text-sm" style="color: var(--ai-text-muted);">Client projects</div>
				</div>
				<div class="p-4 rounded-xl" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
					<div class="text-2xl font-bold" style="color: var(--ai-accent-green);">5</div>
					<div class="text-sm" style="color: var(--ai-text-muted);">Reusable skills</div>
				</div>
				<div class="p-4 rounded-xl" style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);">
					<div class="text-2xl font-bold" style="color: var(--ai-accent-green);">40+</div>
					<div class="text-sm" style="color: var(--ai-text-muted);">Architecture diagrams</div>
				</div>
			</div>

			<a
				href="/ai/learn"
				class="inline-flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors"
				style="background: var(--ai-bg-card-alt); color: var(--ai-text-primary); border: 1px solid var(--ai-border-color);"
			>
				Explore Tracks
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>
	{/if}
</div>
