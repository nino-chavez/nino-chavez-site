<script>
	/**
	 * ClusterRibbon — horizontal anchor nav of cluster chips.
	 *
	 * Per ADR-0009 (cluster surfacing pattern). Lives at top of /work
	 * (full form) and below the hero on / (compressed form). 8 chips:
	 * forge / agent-infra / ai-products / commerce / volleyball / personal /
	 * client / writing. Counts source from
	 * research/current-state/repos-inventory.md per Stage 4 fact-check.
	 *
	 * Composes RibbonCard for each chip.
	 *
	 * @param {Array<{id: string, label: string, count: number|string}>} clusters
	 * @param {string} [variant] - 'full' (default on /work) | 'compressed' (on /)
	 * @param {string} [labelledby] - aria-labelledby for the nav landmark
	 */
	import RibbonCard from './RibbonCard.svelte';

	let { clusters = [], variant = 'full', labelledby = '' } = $props();
</script>

<nav
	class="cluster-ribbon"
	class:compressed={variant === 'compressed'}
	aria-label={labelledby ? undefined : 'Work clusters'}
	aria-labelledby={labelledby || undefined}
>
	{#each clusters as cluster (cluster.id)}
		<RibbonCard
			label={cluster.label}
			count={cluster.count}
			href="{variant === 'compressed' ? '/work' : ''}#{cluster.id}"
		/>
	{/each}
</nav>

<style>
	.cluster-ribbon {
		display: flex;
		gap: var(--space-3);
		flex-wrap: wrap;
		padding: var(--space-6) 0;
		border-top: var(--border-1) solid var(--border-subtle);
		border-bottom: var(--border-1) solid var(--border-subtle);
	}

	.cluster-ribbon.compressed {
		padding: var(--space-4) 0;
		border-top: none;
		gap: var(--space-2);
	}

	@media (max-width: 640px) {
		.cluster-ribbon {
			overflow-x: auto;
			flex-wrap: nowrap;
			-webkit-overflow-scrolling: touch;
			padding-inline: var(--space-4);
			margin-inline: calc(-1 * var(--space-4));
		}

		.cluster-ribbon :global(.ribbon-card) {
			flex-shrink: 0;
		}
	}
</style>
