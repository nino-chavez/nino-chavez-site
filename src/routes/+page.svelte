<script>
	import Hero from '$lib/components/Hero.svelte';
	import ClusterRibbon from '$lib/components/ClusterRibbon.svelte';
	import { clusters } from '$lib/clusters';
</script>

<svelte:head>
	<title>Nino Chavez — Context engineer</title>
	<meta
		name="description"
		content="Context engineer. I instrument the systems that build the systems. I build the harnesses that make personal software possible — and the threshold between buying and building moves up the stack every quarter."
	/>
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="ninochavez.co · v3">
			Context engineer. I <em>instrument</em> the systems that build the systems.
			<svelte:fragment slot="sub">
				I build the harnesses that make personal software possible — and the threshold between
				buying and building moves up the stack every quarter.
			</svelte:fragment>
		</Hero>
	</section>

	<section class="scope-band container" aria-labelledby="scope-label">
		<p id="scope-label" class="scope-kicker">Scope</p>
		<p class="scope-lede">
			Eight clusters. Sixty-nine repos. Seventeen live deploys. The breadth IS the receipts —
			walk the ribbon for at-a-glance scope, follow the link for depth.
		</p>
		<ClusterRibbon clusters={clusters} variant="compressed" labelledby="scope-label" />
		<p class="ribbon-footer">
			<a href="/work" class="scope-link">Full cluster surfacing on /work →</a>
		</p>
	</section>

	<section class="teasers container">
		<article class="teaser">
			<p class="teaser-kicker">Practice</p>
			<h2 class="teaser-title">How the work gets done.</h2>
			<p class="teaser-body">
				Production line · substrate · operating rules · instrumentation evidence. Every claim
				grounds to a real file or repo path.
			</p>
			<a href="/practice" class="teaser-link">/practice →</a>
		</article>

		<article class="teaser">
			<p class="teaser-kicker">Writing</p>
			<h2 class="teaser-title">~275 artifacts. Seven collections.</h2>
			<p class="teaser-body">
				Signal Dispatch corpus — 229 blog posts, 12 whitepapers, 8 series, 10 fiction,
				9 presentations, 3 counterpoints, 3 tutorials, 1 research note.
			</p>
			<a href="/writing" class="teaser-link">/writing →</a>
		</article>
	</section>
</main>

<style>
	main {
		padding-bottom: var(--space-16);
	}

	.scope-band {
		padding-block: var(--space-12);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.scope-kicker {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-3);
	}

	.scope-lede {
		font-size: var(--type-lg);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		max-width: var(--container-prose);
		margin-bottom: var(--space-6);
	}

	.ribbon-footer {
		margin-top: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
	}

	.scope-link {
		color: var(--brand-400);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.scope-link:hover {
		color: var(--brand-300);
	}

	.teasers {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-12);
		padding-block: var(--space-16);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.teaser-kicker {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-3);
	}

	.teaser-title {
		font-family: var(--font-display);
		font-size: var(--type-2xl);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.teaser-body {
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-4);
	}

	.teaser-link {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--brand-400);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.teaser-link:hover {
		color: var(--brand-300);
	}

	@media (max-width: 768px) {
		.teasers {
			grid-template-columns: 1fr;
			gap: var(--space-8);
		}
	}
</style>
