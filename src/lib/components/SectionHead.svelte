<script>
	/**
	 * SectionHead — kicker + h2 + optional lede.
	 *
	 * Per blueprint/03-design-brief.md — used at section boundaries within
	 * routes (e.g. cluster sections on /work, sub-sections on /practice).
	 * Lower visual weight than Hero; consistent typographic register.
	 *
	 * @param {string} [kicker] - small mono uppercase label (e.g. "01 — forge production line")
	 * @param {string} [id] - anchor ID for in-page navigation
	 */
	let { kicker = '', id = '' } = $props();
</script>

<header class="section-head" {id}>
	{#if kicker}
		<p class="kicker">{kicker}</p>
	{/if}
	<h2 class="title">
		<slot />
	</h2>
	{#if $$slots.lede}
		<p class="lede">
			<slot name="lede" />
		</p>
	{/if}
</header>

<style>
	.section-head {
		max-width: var(--container-prose);
		margin-bottom: var(--space-8);
		scroll-margin-top: var(--space-16);
	}

	.kicker {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-3);
	}

	.title {
		font-family: var(--font-display);
		font-size: var(--type-3xl);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-snug);
		color: var(--text-primary);
		margin-bottom: var(--space-4);
	}

	.lede {
		font-size: var(--type-lg);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		max-width: var(--container-prose);
	}

	:global(.section-head .title em) {
		font-style: italic;
		color: var(--brand-500);
		font-weight: var(--weight-semibold);
	}
</style>
