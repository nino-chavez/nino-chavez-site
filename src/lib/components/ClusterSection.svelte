<script>
	/**
	 * ClusterSection — anchored section wrapper for cluster content.
	 *
	 * Per ADR-0009 — 8 of these stack below the cluster ribbon on /work.
	 * Each wraps a SectionHead + the cluster's body composition (which
	 * varies by cluster — schematic for forge, card grid for agent-infra,
	 * deep-dive cards for AI products / commerce, etc.).
	 *
	 * Composes SectionHead.
	 *
	 * @param {string} id - anchor ID matching the ribbon chip href
	 * @param {string} kicker - cluster number + name (e.g. "01 — forge production line")
	 * @param {string} title - cluster headline (e.g. "The toolchain that built everything below.")
	 */
	import SectionHead from './SectionHead.svelte';

	let { id, kicker, title } = $props();
</script>

<section class="cluster-section" {id}>
	<SectionHead kicker={kicker} id="{id}-head">
		{title}
		{#if $$slots.lede}
			<svelte:fragment slot="lede"><slot name="lede" /></svelte:fragment>
		{/if}
	</SectionHead>
	<div class="cluster-body">
		<slot />
	</div>
</section>

<style>
	.cluster-section {
		padding-block: var(--space-12);
		border-bottom: var(--border-1) solid var(--border-subtle);
		scroll-margin-top: var(--space-16);
	}

	.cluster-section:last-of-type {
		border-bottom: none;
	}

	.cluster-body {
		max-width: var(--container-full);
	}
</style>
