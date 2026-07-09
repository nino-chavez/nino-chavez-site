<script>
	import { artifacts } from '$lib/data/ai/artifacts';
	import ArtifactCard from '$lib/components/ai/ArtifactCard.svelte';

	const filters = ['all', 'live', 'install', 'clone', 'read', 'gated'];
	let active = 'all';

	$: visible = active === 'all' ? artifacts : artifacts.filter((a) => a.access === active);
</script>

<svelte:head>
	<title>Shipped work — the evidence behind every path | Nino Chavez</title>
	<meta
		name="description"
		content="The artifact registry behind the AI practice paths: live products, installable tools, and public method repos — every card derived and probed at build time."
	/>
	<meta property="og:title" content="Shipped work — the evidence behind every path" />
	<meta
		property="og:description"
		content="Live products, installable tools, and public method repos — every card derived and probed at build time."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/ai/work" />
</svelte:head>

<main class="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
	<header class="mb-14">
		<h1 class="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-8">
			<span class="block">SHIPPED</span>
			<span class="block text-lime-400">WORK</span>
		</h1>
		<p class="text-lg text-neutral-300 max-w-2xl leading-relaxed">
			The artifacts behind every path. Each card is derived from the repository itself
			at build time — description, last push, access — and each "verified" date is a
			sensor run against the live URL.
		</p>
	</header>

	<div role="group" aria-label="Filter by access" class="flex flex-wrap gap-2 mb-10">
		{#each filters as f}
			<button
				on:click={() => (active = f)}
				aria-pressed={active === f}
				class="px-4 py-2 font-mono text-[11px] tracking-widest uppercase border transition-colors {active === f
					? 'border-lime-400 text-lime-400 bg-lime-400/10'
					: 'border-neutral-700 text-neutral-400 hover:border-neutral-500'}">{f}</button
			>
		{/each}
	</div>

	<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-14">
		{#each visible as artifact (artifact.id)}
			<ArtifactCard {artifact} />
		{/each}
	</div>

	<p class="font-mono text-[11px] text-neutral-600 max-w-xl leading-relaxed">
		This page is one derived array. A repository push updates its card on the next
		scheduled build; a failed liveness probe fails the build before a visitor can meet
		the dead link. Access labels say what you can actually do today — "live" is
		sensor-backed, "gated" is honest.
	</p>
</main>
