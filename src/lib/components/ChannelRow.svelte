<script>
	/**
	 * ChannelRow — mono link row (email · github · linkedin).
	 *
	 * Per blueprint/content/contact + /about closing-pointer-row — flat
	 * mono row of contact channels. No icons (schematic-mono icon register
	 * isn't yet authored as inline SVG; text-only is acceptable register
	 * per brief §5 iconography fallback).
	 *
	 * @param {Array<{label: string, href: string}>} channels
	 */
	let { channels = [] } = $props();
</script>

<nav class="channel-row" aria-label="Contact channels">
	{#each channels as channel, i (channel.href)}
		{#if i > 0}<span class="sep" aria-hidden="true">·</span>{/if}
		<a href={channel.href} class="channel-link" rel="noopener">
			{channel.label}
		</a>
	{/each}
</nav>

<style>
	.channel-row {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		align-items: center;
		font-family: var(--font-mono);
		font-size: var(--type-sm);
	}

	.channel-link {
		color: var(--text-secondary);
		text-decoration: none;
		padding: var(--space-1) 0;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.channel-link:hover {
		color: var(--brand-400);
	}

	.channel-link:focus-visible {
		outline: none;
		box-shadow: var(--shadow-focus);
		border-radius: var(--radius-sm);
	}

	.sep {
		color: var(--border-strong);
	}
</style>
