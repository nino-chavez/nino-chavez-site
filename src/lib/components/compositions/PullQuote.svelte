<script>
	export let cite = '';
</script>

<blockquote class="pull-quote">
	<slot />
	{#if cite}
		<cite>— {cite}</cite>
	{/if}
</blockquote>

<style>
	.pull-quote {
		margin: var(--space-8) auto 0;
		max-width: 56ch;
		padding: var(--space-5) var(--space-6);
		border-left: 2px solid var(--color-brand-violet);
		background: var(--surface-elevated);
		font-size: var(--type-sm);
		line-height: 1.6;
		color: var(--text-secondary);
		font-style: italic;
	}

	.pull-quote :global(em) {
		font-style: italic;
		color: var(--text-link-hover);
	}

	cite {
		display: block;
		margin-top: var(--space-3);
		font-style: normal;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
	}
</style>
