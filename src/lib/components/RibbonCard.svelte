<script>
	/**
	 * RibbonCard — single chip for the cluster ribbon.
	 *
	 * Per ADR-0009 (cluster surfacing) — the ribbon at top of /work and
	 * compressed on / renders 8 of these chips. Each chip is label + count
	 * + anchor link. Hover lifts + violet border per blueprint motion budget.
	 *
	 * @param {string} label - cluster name (e.g. "Forge production line")
	 * @param {number|string} count - repo count or artifact count
	 * @param {string} href - anchor link (e.g. "#forge-production-line")
	 */
	let { label, count, href } = $props();
</script>

<a class="ribbon-card" {href}>
	<span class="label">{label}</span>
	<span class="count">{count}</span>
</a>

<style>
	.ribbon-card {
		display: inline-flex;
		align-items: baseline;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-3);
		border: var(--border-1) solid var(--border-strong);
		background: var(--surface-1);
		color: var(--text-primary);
		text-decoration: none;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		transition: border-color var(--duration-fast) var(--ease-out),
		            transform var(--duration-fast) var(--ease-out),
		            background var(--duration-fast) var(--ease-out);
	}

	.ribbon-card:hover {
		border-color: var(--brand-500);
		background: hsl(220 25% 9%);
		transform: translateY(-1px);
		text-decoration: none;
	}

	.ribbon-card:focus-visible {
		outline: none;
		box-shadow: var(--shadow-focus);
	}

	.label {
		color: var(--text-primary);
	}

	.count {
		color: var(--brand-400);
		font-weight: var(--weight-medium);
	}

	@media (prefers-reduced-motion: reduce) {
		.ribbon-card:hover {
			transform: none;
		}
	}
</style>
