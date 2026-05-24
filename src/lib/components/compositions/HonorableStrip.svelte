<script>
	/**
	 * honorable-mentions-strip composition (brief §2 — /work composition 3).
	 *
	 * Single-row strip of brand/site links, mono register, no decoration.
	 * Each item: name (link if href) + one-line caption.
	 */
	export let items = []; // [{ name, caption, href? }]
</script>

<ul class="strip">
	{#each items as item}
		<li class="item">
			{#if item.href}
				<a class="row" href={item.href} rel="noopener" target="_blank">
					<span class="name">{item.name}</span>
					<span class="caption">{item.caption}</span>
				</a>
			{:else}
				<div class="row">
					<span class="name">{item.name}</span>
					<span class="caption">{item.caption}</span>
				</div>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.strip {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--border-subtle);
	}

	.item {
		border-bottom: 1px solid var(--border-subtle);
	}

	.row {
		display: grid;
		grid-template-columns: 16rem 1fr;
		gap: var(--space-6);
		padding: var(--space-4) var(--space-1);
		text-decoration: none;
		color: inherit;
		align-items: baseline;
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.row:hover {
		background: var(--surface-card-hover);
	}

	.row:hover .name {
		color: var(--text-link-hover);
	}

	.name {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
		transition: color var(--dur-base) var(--ease-out);
	}

	.caption {
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	@media (max-width: 720px) {
		.row {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}
	}
</style>
