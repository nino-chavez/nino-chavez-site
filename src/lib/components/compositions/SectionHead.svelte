<script>
	export let kicker = '';
	export let id = '';
</script>

<header class="section-head">
	{#if kicker}
		<p class="kicker">{kicker}</p>
	{/if}
	<h2 {id}>
		<slot />
	</h2>
</header>

<style>
	.section-head {
		margin-bottom: var(--space-8);
	}

	.kicker {
		margin: 0 0 var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}

	h2 {
		font-family: var(--font-display);
		font-size: var(--type-h1);
		font-weight: 500;
		line-height: var(--leading-heading);
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
		margin: 0;
		max-width: 32ch;
	}

	h2 :global(code) {
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: var(--text-link-hover);
		background: rgba(139, 92, 246, 0.1);
		padding: 0.125rem 0.375rem;
		border: 1px solid var(--border-violet);
	}
</style>
