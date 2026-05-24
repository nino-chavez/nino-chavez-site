<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import PullQuote from '$lib/components/compositions/PullQuote.svelte';

	// TODO task #9 — replace this stub with the full editorial-lede +
	// whitepaper-feature-row + recent-pieces-list composition. Stub exists
	// so the masthead nav resolves on-site instead of bouncing to an external
	// subdomain (IA asymmetry the brief calls out).
</script>

<svelte:head>
	<title>Writing — Nino Chavez</title>
	<meta
		name="description"
		content="Signal Dispatch: essays on AI-assisted software development, methodology, and the practice."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/writing</p>
	<svelte:fragment slot="claim">
		<em>Signal Dispatch.</em>
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Essays on AI-assisted software development, methodology, and the practice. Hosted at <a
			href="https://blog.ninochavez.co"
			rel="noopener">blog.ninochavez.co</a
		> until the on-site /writing surface lands in the next slice.
	</svelte:fragment>
</Hero>

<section class="placeholder">
	<SectionHead kicker="01 — flagship">Three pieces I'd point at first.</SectionHead>
	<p class="note">
		Curated whitepaper-row landing as part of task #9. Until then, the blog index has the full
		archive →
		<a href="https://blog.ninochavez.co" rel="noopener">blog.ninochavez.co</a>.
	</p>
</section>

<style>
	.placeholder {
		margin: var(--space-12) 0;
	}

	.note {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
	}

	.note a {
		color: var(--text-link);
		text-decoration: none;
	}

	.note a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
