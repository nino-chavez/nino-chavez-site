<script>
	import { tracks } from '$lib/data/ai/tracks';
</script>

<svelte:head>
	<title>Learn — find your track | Nino Chavez</title>
	<meta
		name="description"
		content="Seven persona-based tracks for applying AI to the craft you already have — each demonstrated by shipped work, each self-serve."
	/>
	<meta property="og:title" content="Learn — find your track" />
	<meta
		property="og:description"
		content="Seven persona-based tracks for applying AI to the craft you already have."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/ai/learn" />
</svelte:head>

<main class="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
	<header class="mb-16 max-w-3xl">
		<h1 class="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-6">
			FIND YOUR TRACK
		</h1>
		<p class="text-lg text-neutral-300 leading-relaxed">
			The map I wish I had when I started. Newcomers don't fail at prompts — they fail
			at knowing what kind of work they're doing. Locate the craft you already have;
			each track pairs its path with the shipped work that demonstrates it.
		</p>
	</header>

	<ul class="grid md:grid-cols-2 gap-4 mb-20">
		{#each tracks as track}
			<li>
				<a
					href="/ai/learn/{track.id}"
					class="group flex flex-col gap-3 border border-neutral-800 bg-neutral-950 p-7 h-full transition-colors hover:border-lime-400/60"
				>
					<div class="flex items-baseline justify-between gap-4">
						<h2 class="text-2xl font-display font-bold group-hover:text-lime-400 transition-colors">
							{track.title}
						</h2>
						<span class="font-mono text-[11px] text-neutral-500 shrink-0">{track.timeline}</span>
					</div>
					<p class="text-lime-400/90 text-sm font-medium">{track.tagline}</p>
					<p class="text-neutral-400 text-sm leading-relaxed flex-1">{track.description}</p>
					<p class="font-mono text-[11px] text-neutral-500">
						artifact: {track.finalArtifact}
					</p>
				</a>
			</li>
		{/each}
	</ul>

	<section class="border border-neutral-800 p-7 max-w-3xl">
		<h2 class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-3">The filter</h2>
		<p class="text-neutral-300 leading-relaxed">
			Show me what you've shipped. Not what you've read, not what you plan to build —
			what you've shipped. That's how I learned. That's how you will too. Every track
			ends in an artifact, and every claim on these pages links to one.
		</p>
	</section>
</main>
