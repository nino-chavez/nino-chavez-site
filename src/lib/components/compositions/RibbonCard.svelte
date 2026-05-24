<script>
	/** instrument-readout card — numeric value + mono label + detail line */
	export let value;
	export let label;
	export let detail = '';
</script>

<article class="ribbon-card">
	<p class="value">{value}</p>
	<p class="label">{label}</p>
	{#if detail}
		<p class="detail">{detail}</p>
	{/if}
</article>

<style>
	.ribbon-card {
		border: 1px solid var(--border-violet);
		padding: var(--space-6) var(--space-5) var(--space-5);
		background: var(--surface-elevated);
	}

	.value {
		margin: 0 0 var(--space-2);
		font-family: var(--font-mono);
		font-size: 2.5rem;
		font-weight: 500;
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}

	.label {
		margin: 0 0 var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		text-transform: lowercase;
		letter-spacing: var(--tracking-wide);
	}

	.detail {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}
</style>
