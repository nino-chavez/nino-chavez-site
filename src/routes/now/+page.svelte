<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import RibbonCard from '$lib/components/compositions/RibbonCard.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';

	// editorial-lede → now-readout-row (3 cards: shipping / writing / learning)
	// Per blueprint/02-prescription.yml cut_routes /now: "Currently lists co-equal
	// hobbies; reframe to lead with practice work."
	const lastUpdated = '2026-05-24';

	const readout = [
		{
			value: 'v3 redesign',
			label: 'shipping',
			detail:
				'ninochavez.co v3 — design system + practice page + case studies. Worktree on redesign/v3-context-engineer.'
		},
		{
			value: 'voice corpus',
			label: 'writing',
			detail:
				'Tracking the Poe stack at 746 signals. Drafting the bc-subscriptions case study as the longer-form companion to /practice.'
		},
		{
			value: 'agent SDK',
			label: 'learning',
			detail:
				'Claude Agent SDK + Cloudflare Workers/Hyperdrive integration patterns. Translating the Atelier reference into a deployable shape for others.'
		}
	];
</script>

<svelte:head>
	<title>Now — Nino Chavez</title>
	<meta
		name="description"
		content="What I'm shipping, writing, and learning right now. Practice-led, updated periodically."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/now</p>
	<svelte:fragment slot="claim">
		Right now I'm <em>shipping</em> the v3 redesign and the bc-subscriptions case study.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		A snapshot of the active surface — what's compiling today, what's drafting, what's reshaping
		my thinking. Practice-led, not hobby-led. Updated {lastUpdated}.
	</svelte:fragment>
</Hero>

<section class="now-row" aria-label="Current focus">
	{#each readout as card}
		<RibbonCard {...card} />
	{/each}
</section>

<section class="lede">
	<SectionHead kicker="01 — Background context">What's not on this page.</SectionHead>
	<p>
		The personal-brand /now convention surfaces hobbies — running, reading, where someone is
		living. This page leads with the practice instead. Photography and music are real; they live
		at <a href="https://ninochavez.co/photography" rel="noopener">photography</a> and
		<a href="https://blog.ninochavez.co" rel="noopener">blog</a> respectively. Volleyball and the
		630 / Let's Pepper / Flickday work are on
		<a href="/work">work</a>. This page is just for the slice of activity that's actively shaping
		the practice today.
	</p>
</section>

<style>
	.now-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		margin: 0 0 var(--space-16);
	}

	@media (max-width: 720px) {
		.now-row {
			grid-template-columns: 1fr;
		}
	}

	.lede {
		margin: var(--space-12) 0;
	}

	.lede p {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0;
	}

	.lede a {
		color: var(--text-link);
		text-decoration: none;
	}

	.lede a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
