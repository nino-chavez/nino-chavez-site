<script>
	export let title;
	export let body;
	export let href;
	export let arrow = '';
</script>

<a class="teaser" {href}>
	<h3>{title}.</h3>
	<p>{body}</p>
	{#if arrow}
		<p class="arrow">→ {arrow}</p>
	{/if}
</a>

<style>
	.teaser {
		display: block;
		padding: var(--space-6) var(--space-5);
		border: 1px solid var(--border-base);
		text-decoration: none;
		color: inherit;
		transition:
			background-color var(--dur-base) var(--ease-out),
			border-color var(--dur-base) var(--ease-out);
	}

	.teaser:hover {
		background: var(--surface-card-hover);
		border-color: var(--border-violet-strong);
	}

	h3 {
		margin: 0 0 var(--space-2);
		font-size: var(--type-h3);
		font-weight: 500;
		color: var(--text-primary);
	}

	p {
		margin: 0 0 var(--space-3);
		font-size: var(--type-body);
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.arrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
	}
</style>
