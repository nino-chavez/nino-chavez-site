<script>
	/** Single channel row used on /contact — label + value */
	export let label;
	export let value;
	export let href;
	export let external = false;
</script>

<a class="channel" {href} rel={external ? 'noopener' : null} target={external ? '_blank' : null}>
	<span class="label">{label}</span>
	<span class="value">{value}</span>
</a>

<style>
	.channel {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: var(--space-6);
		padding: var(--space-4) var(--space-5);
		border: 1px solid var(--border-base);
		text-decoration: none;
		color: inherit;
		transition: border-color var(--dur-base) var(--ease-out);
	}

	.channel:hover {
		border-color: var(--border-violet-strong);
	}

	.label {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}

	.value {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-link-hover);
		word-break: break-all;
	}

	.channel:hover .value {
		color: var(--text-primary);
	}

	@media (max-width: 640px) {
		.channel {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}
	}
</style>
