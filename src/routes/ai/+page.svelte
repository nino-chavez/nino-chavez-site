<script>
	import { tracks } from '$lib/data/ai/tracks';
	import { featured } from '$lib/data/ai/artifacts';
	import ArtifactCard from '$lib/components/ai/ArtifactCard.svelte';
	import WritingStrip from '$lib/components/ai/WritingStrip.svelte';
	import writing from '$lib/data/ai/writing.json';
</script>

<svelte:head>
	<title>Work this way — AI practice, demonstrated | Nino Chavez</title>
	<meta
		name="description"
		content="Apply AI to the craft you already have: seven persona-based paths, self-serve tools, and the shipped work that proves each one."
	/>
	<meta property="og:title" content="Work this way — AI practice, demonstrated" />
	<meta
		property="og:description"
		content="Personas to locate yourself, paths to follow, tools you can pick up today, and the shipped work that proves each one."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/ai" />
</svelte:head>

<main class="px-6 lg:px-12 py-16 lg:py-24 max-w-7xl mx-auto">
	<header class="mb-20">
		<h1 class="font-display font-bold text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter mb-8">
			<span class="block">WORK</span>
			<span class="block text-lime-400">THIS WAY</span>
		</h1>
		<p class="text-lg lg:text-xl text-neutral-300 max-w-2xl leading-relaxed">
			You can apply AI to the craft you already have. This is the map — personas to
			locate yourself, paths to follow, tools you can pick up today, and the shipped
			work that proves each one.
		</p>
	</header>

	<section aria-labelledby="personas-heading" class="mb-24">
		<h2
			id="personas-heading"
			class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-6"
		>
			Which work is yours? — seven ways in
		</h2>
		<ul class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
			{#each tracks as track}
				<li>
					<a
						href="/ai/learn/{track.id}"
						class="group flex flex-col gap-1.5 border border-neutral-800 bg-neutral-950 p-5 h-full transition-colors hover:border-lime-400/60"
					>
						<span class="font-bold group-hover:text-lime-400 transition-colors"
							>{track.title}</span
						>
						<span class="text-sm text-neutral-400 leading-snug">{track.tagline}</span>
						<span class="font-mono text-[11px] text-lime-400/80 mt-2">enter track →</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>

	<section aria-labelledby="proof-heading" class="mb-24">
		<h2 id="proof-heading" class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-6">
			The proof — shipped, not asserted
		</h2>
		<div class="grid sm:grid-cols-2 gap-3">
			{#each featured as artifact}
				<ArtifactCard {artifact} compact />
			{/each}
		</div>
	</section>

	<section aria-labelledby="writing-heading" class="mb-16">
		<h2
			id="writing-heading"
			class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-4"
		>
			Latest writing — from the blog, on every build
		</h2>
		<WritingStrip posts={writing.posts} />
		<a
			href="/blog"
			class="inline-block mt-6 font-mono text-sm text-neutral-400 hover:text-lime-400 transition-colors"
			>all essays →</a
		>
	</section>

	<p class="font-mono text-[11px] text-neutral-600 max-w-xl leading-relaxed">
		Project cards and writing regenerate from the GitHub API and the blog feed on every
		scheduled build. "Verified" dates are sensor runs, not promises — a claim that fails
		its probe fails the build.
	</p>
</main>
