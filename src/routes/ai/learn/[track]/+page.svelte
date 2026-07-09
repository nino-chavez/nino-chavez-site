<script>
	import GroundingBanner from '$lib/components/ai/GroundingBanner.svelte';
	import TrackLevels from '$lib/components/ai/TrackLevels.svelte';

	export let data;
	$: track = data.track;
</script>

<svelte:head>
	<title>{track.title} — {track.tagline} | Nino Chavez</title>
	<meta name="description" content="{track.description} Demonstrated by shipped work; self-serve." />
	<meta property="og:title" content="{track.title} — {track.tagline}" />
	<meta property="og:description" content={track.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/ai/learn/{track.id}" />
</svelte:head>

<main class="px-6 lg:px-12 py-16 lg:py-24 max-w-5xl mx-auto">
	<nav aria-label="Breadcrumb" class="font-mono text-xs text-neutral-500 mb-10">
		<a href="/ai/learn" class="hover:text-lime-400 transition-colors">← all tracks</a>
	</nav>

	<header class="mb-12">
		<h1 class="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6 uppercase">
			{track.title}
		</h1>
		<p class="text-lg lg:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-6">
			{track.hero.subhead}
		</p>
		<div class="flex flex-wrap gap-2">
			<span class="px-3 py-1 border border-neutral-700 font-mono text-[11px] text-neutral-400"
				>{track.levels.length} levels</span
			>
			<span class="px-3 py-1 border border-neutral-700 font-mono text-[11px] text-neutral-400"
				>{track.timeline}</span
			>
			<span class="px-3 py-1 border border-neutral-700 font-mono text-[11px] text-neutral-400"
				>artifact: {track.finalArtifact}</span
			>
		</div>
	</header>

	<div class="mb-14">
		<GroundingBanner grounding={track.grounding} />
	</div>

	<section aria-labelledby="whofor-heading" class="mb-14">
		<h2 id="whofor-heading" class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-5">
			Who this is for
		</h2>
		<div class="grid md:grid-cols-2 gap-4">
			<div class="border border-neutral-800 bg-neutral-950 p-6">
				<h3 class="font-mono text-[11px] tracking-widest uppercase text-neutral-400 mb-4">
					This path is for you if
				</h3>
				<ul class="flex flex-col gap-2.5 text-sm text-neutral-300">
					{#each track.whoFor.for as item}
						<li class="flex gap-2"><span class="text-lime-400 shrink-0">·</span>{item}</li>
					{/each}
				</ul>
			</div>
			<div class="border border-neutral-800 bg-neutral-950 p-6">
				<h3 class="font-mono text-[11px] tracking-widest uppercase text-neutral-400 mb-4">
					Probably not if
				</h3>
				<ul class="flex flex-col gap-2.5 text-sm text-neutral-400">
					{#each track.whoFor.notFor as item}
						<li class="flex gap-2"><span class="text-neutral-600 shrink-0">·</span>{item}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	{#if track.keyConcept}
		<section aria-labelledby="concept-heading" class="mb-14 border border-neutral-800 p-7">
			<h2
				id="concept-heading"
				class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-3"
			>
				{track.keyConcept.title}
			</h2>
			<p class="text-neutral-300 leading-relaxed">{track.keyConcept.body}</p>
		</section>
	{/if}

	<section aria-labelledby="levels-heading" class="mb-14">
		<h2 id="levels-heading" class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-5">
			The levels
		</h2>
		<TrackLevels levels={track.levels} />
	</section>

	<div class="flex flex-wrap gap-3">
		<a
			href={track.cta.primary.href}
			class="px-6 py-3 bg-lime-400 text-black font-bold text-sm hover:bg-white transition-colors"
			>{track.cta.primary.label}</a
		>
		{#if track.cta.secondary}
			<a
				href={track.cta.secondary.href}
				target={track.cta.secondary.href.startsWith('http') ? '_blank' : undefined}
				rel={track.cta.secondary.href.startsWith('http') ? 'noopener noreferrer' : undefined}
				class="px-6 py-3 border border-neutral-700 font-mono text-sm hover:border-lime-400 hover:text-lime-400 transition-colors"
				>{track.cta.secondary.label}</a
			>
		{/if}
	</div>

	<p class="mt-12 font-mono text-[11px] text-neutral-600 max-w-xl leading-relaxed">
		Tool links and level references live in a dated data file checked by the link sensor
		on every build — this page can't silently point at a moved doc or a dead demo.
	</p>
</main>
