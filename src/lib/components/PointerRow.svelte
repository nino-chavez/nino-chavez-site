<script>
	/**
	 * PointerRow — three-pointer end-of-page links.
	 *
	 * Per blueprint/content/about.md Composition 3 — mono row, no
	 * decoration, ordered "least personal → most personal". Used at the
	 * close of /about, /practice, /work pages to direct readers to the
	 * adjacent surfaces in the orbit.
	 *
	 * @param {Array<{title: string, href: string, description: string}>} pointers
	 */
	let { pointers = [] } = $props();
</script>

<nav class="pointer-row" aria-label="Related surfaces">
	{#each pointers as pointer (pointer.href)}
		<a href={pointer.href} class="pointer" rel={pointer.href.startsWith('http') ? 'noopener' : undefined}>
			<span class="pointer-title">{pointer.title}</span>
			<span class="pointer-arrow" aria-hidden="true">→</span>
			<span class="pointer-description">{pointer.description}</span>
		</a>
	{/each}
</nav>

<style>
	.pointer-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
	}

	.pointer {
		display: grid;
		grid-template-columns: minmax(8rem, max-content) auto 1fr;
		gap: var(--space-3);
		align-items: baseline;
		padding: var(--space-2) 0;
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.pointer:hover {
		color: var(--text-primary);
	}

	.pointer:hover .pointer-title {
		color: var(--brand-400);
	}

	.pointer:hover .pointer-arrow {
		color: var(--brand-500);
		transform: translateX(2px);
	}

	.pointer:focus-visible {
		outline: none;
		box-shadow: var(--shadow-focus);
		border-radius: var(--radius-sm);
	}

	.pointer-title {
		font-weight: var(--weight-medium);
		color: var(--text-primary);
		transition: color var(--duration-fast) var(--ease-out);
	}

	.pointer-arrow {
		color: var(--border-strong);
		transition: color var(--duration-fast) var(--ease-out),
		            transform var(--duration-fast) var(--ease-out);
	}

	.pointer-description {
		color: var(--text-muted);
	}

	@media (max-width: 640px) {
		.pointer {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}

		.pointer-arrow {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.pointer:hover .pointer-arrow {
			transform: none;
		}
	}
</style>
