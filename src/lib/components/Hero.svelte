<script>
	/**
	 * Hero — the page-level thesis composition.
	 *
	 * Per blueprint/03-design-brief.md §2 + ADR-0003 (locked hero claim) +
	 * ADR-0010 §5 (lede sub-claim). The slot pattern lets each route
	 * provide its own headline + sub-claim while keeping the kicker +
	 * frame consistent.
	 *
	 * @param {string} [kicker] - small mono uppercase label above headline
	 * @param {string} [size] - 'lg' (page heroes) or 'md' (section heros)
	 */
	let { kicker = '', size = 'lg' } = $props();
</script>

<section class="hero" class:size-md={size === 'md'}>
	{#if kicker}
		<p class="kicker">{kicker}</p>
	{/if}
	<h1 class="headline">
		<slot />
	</h1>
	{#if $$slots.sub}
		<p class="sub">
			<slot name="sub" />
		</p>
	{/if}
	{#if $$slots.meta}
		<div class="meta">
			<slot name="meta" />
		</div>
	{/if}
</section>

<style>
	.hero {
		padding-block: var(--space-32) var(--space-16);
		max-width: var(--container-prose);
	}

	.hero.size-md {
		padding-block: var(--space-16) var(--space-8);
	}

	.kicker {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-6);
	}

	.headline {
		font-family: var(--font-display);
		font-size: var(--type-6xl);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-tight);
		color: var(--text-primary);
		margin-bottom: var(--space-8);
	}

	.size-md .headline {
		font-size: var(--type-4xl);
	}

	.sub {
		font-size: var(--type-xl);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-8);
		max-width: var(--container-prose);
	}

	.size-md .sub {
		font-size: var(--type-lg);
	}

	.meta {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		align-items: center;
	}

	/* The em element inside the slot — italic violet per ADR-0004 signature.
	   :global() because slot content lives in the parent component's scope. */
	:global(.hero .headline em) {
		font-style: italic;
		color: var(--brand-500);
		font-weight: var(--weight-semibold);
	}
</style>
