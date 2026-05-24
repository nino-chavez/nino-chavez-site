<script>
	/**
	 * hero-with-thesis composition (brief §2).
	 *
	 * Slots:
	 *   kicker — small mono label above the claim (page name or role)
	 *   claim  — load-bearing headline; use <em> for the editorial-italic
	 *            violet emphasis word (one human moment per page)
	 *   subhead — supporting line, optional
	 */
	export let size = 'page'; // 'page' (clamp hero scale) | 'compact' (h1 scale)
</script>

<section class="hero" class:compact={size === 'compact'}>
	<slot name="kicker" />
	<h1 class="claim">
		<slot name="claim" />
	</h1>
	{#if $$slots.subhead}
		<p class="subhead">
			<slot name="subhead" />
		</p>
	{/if}
</section>

<style>
	.hero {
		padding: var(--space-12) 0 var(--space-16);
	}

	.compact {
		padding: var(--space-8) 0 var(--space-12);
	}

	.claim {
		font-family: var(--font-display);
		font-size: var(--type-hero);
		line-height: var(--leading-hero);
		letter-spacing: var(--tracking-tight);
		font-weight: 500;
		margin: 0 0 var(--space-6);
		color: var(--text-primary);
		max-width: 22ch;
	}

	.compact .claim {
		font-size: var(--type-display);
		line-height: var(--leading-heading);
		max-width: 32ch;
	}

	.claim :global(em) {
		font-style: italic;
		color: var(--color-brand-violet);
		font-weight: 500;
	}

	.subhead {
		margin: 0;
		font-size: var(--type-lead);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: 56ch;
	}

	.compact .subhead {
		font-size: var(--type-body);
		color: var(--text-muted);
	}

	.subhead :global(a) {
		color: var(--text-link);
		text-decoration: none;
	}

	.subhead :global(a:hover) {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
