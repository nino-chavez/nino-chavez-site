<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import TrackCard from '$lib/components/compositions/TrackCard.svelte';

	// /ai/learn redesign 2026-05-25 — DESIGN-PRINCIPLES.md §5 revised:
	// preserved as free, ungated reference. No tier pricing, no enroll CTAs.
	// Each track is a self-directed reference path ending in an artifact.
	const tracks = [
		{
			id: 'explorer',
			title: 'Explorer',
			tagline: 'Use AI to understand yourself',
			artifact: 'Personal cognitive mirror + bridge to creation',
			timeline: '4-8 weeks',
			levels: 5
		},
		{
			id: 'builder',
			title: 'Builder',
			tagline: 'Build production apps with AI',
			artifact: 'Deployed production application',
			timeline: '8-12 weeks',
			levels: 5
		},
		{
			id: 'architect',
			title: 'Architect',
			tagline: 'Design systems, write arc42 docs',
			artifact: 'Complete arc42 solution architecture',
			timeline: '8-12 weeks',
			levels: 5
		},
		{
			id: 'strategist',
			title: 'Strategist',
			tagline: 'Write consulting-grade docs',
			artifact: 'Executive-ready strategic brief',
			timeline: '6-10 weeks',
			levels: 5
		},
		{
			id: 'author',
			title: 'Author',
			tagline: 'Create multi-chapter reference works',
			artifact: 'Multi-volume playbook (20,000+ words)',
			timeline: '12-20 weeks',
			levels: 5
		},
		{
			id: 'voice',
			title: 'Voice',
			tagline: 'Define consistent voice at scale',
			artifact: 'Complete voice system with validation',
			timeline: '6-10 weeks',
			levels: 5
		},
		{
			id: 'enterprise',
			title: 'Enterprise',
			tagline: 'Scale AI work across teams',
			artifact: 'Reusable skill with quality gates',
			timeline: '10-16 weeks',
			levels: 5
		}
	];
</script>

<svelte:head>
	<title>Learn — Nino Chavez</title>
	<meta
		name="description"
		content="Seven self-directed reference tracks for AI-assisted work — Explorer, Builder, Architect, Strategist, Author, Voice Designer, Enterprise. Each track ends with an artifact."
	/>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/ai/learn</p>
	<svelte:fragment slot="claim">
		Seven tracks. Each ends in an <em>artifact</em>.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Self-directed reference paths for AI-assisted work. Free, ungated, no enrollment. Each track
		documents what to learn, what to build, and what shipping looks like — the structure I'd
		recommend to someone asking how to get started.
	</svelte:fragment>
</Hero>

<section class="tracks" aria-labelledby="tracks-heading">
	<SectionHead kicker="01 — Tracks" id="tracks-heading">Pick where to start.</SectionHead>
	<div class="grid">
		{#each tracks as track}
			<TrackCard {...track} />
		{/each}
	</div>
</section>

<section class="how">
	<SectionHead kicker="02 — How to use these">Three reading modes.</SectionHead>
	<p>
		<strong>Linear.</strong> Pick a track, work through the 5 levels in order, end with the
		artifact. The intended path.
	</p>
	<p>
		<strong>Reference.</strong> Scan the levels, copy the patterns you need, ignore the rest. Each
		level is self-contained.
	</p>
	<p>
		<strong>Diagnostic.</strong> Read the artifacts at the bottom of each track. Pick the track
		whose artifact matches what you're trying to ship. Work backward.
	</p>
</section>

<style>
	.tracks,
	.how {
		margin: var(--space-16) 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.how p {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0 0 var(--space-3);
	}

	.how strong {
		color: var(--text-primary);
		font-weight: 600;
	}
</style>
