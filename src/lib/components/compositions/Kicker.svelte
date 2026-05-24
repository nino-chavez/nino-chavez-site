<script>
	export let as = 'p';
</script>

<svelte:element this={as} class="kicker">
	<slot />
</svelte:element>

<style>
	.kicker {
		margin: 0 0 var(--space-5);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}
</style>
