<script>
	/**
	 * ToolCard — toolchain item with visibility badge + enforce caption.
	 *
	 * Per blueprint/content/practice.md Composition 2 — used in the
	 * production-line readout on /practice. Each card represents one
	 * lathe (forge family) or one substrate tool.
	 *
	 * @param {string} title - tool/repo name
	 * @param {string} description - one-line purpose
	 * @param {string} [enforces] - what the tool enforces (italic caption)
	 * @param {string} [href] - GitHub URL (omitted for private repos)
	 * @param {string} [visibility] - 'public' | 'private'
	 */
	let { title, description, enforces = '', href = '', visibility = 'private' } = $props();
</script>

<article class="tool-card">
	<header class="tool-head">
		<h3 class="title">
			{#if href}<a href={href} rel="noopener">{title}</a>{:else}{title}{/if}
		</h3>
		<span class="visibility visibility-{visibility}" aria-label="{visibility} repository">{visibility}</span>
	</header>
	<p class="description">{description}</p>
	{#if enforces}
		<p class="enforces">
			<span class="enforces-label">Enforces:</span>
			{enforces}
		</p>
	{/if}
</article>

<style>
	.tool-card {
		padding: var(--space-6);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
	}

	.tool-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-4);
		margin-bottom: var(--space-3);
	}

	.title {
		font-family: var(--font-display);
		font-size: var(--type-lg);
		font-weight: var(--weight-semibold);
		margin: 0;
	}

	.title a {
		color: var(--text-primary);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.title a:hover {
		color: var(--brand-400);
	}

	.visibility {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		padding: 2px 8px;
		border-radius: var(--radius-pill);
		flex-shrink: 0;
	}

	.visibility-public {
		color: var(--brand-400);
		border: var(--border-1) solid var(--brand-700);
		background: hsl(270 80% 20% / 0.3);
	}

	.visibility-private {
		color: var(--text-muted);
		border: var(--border-1) solid var(--border-strong);
	}

	.description {
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
	}

	.enforces {
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: var(--leading-relaxed);
		padding-left: var(--space-4);
		border-left: var(--border-2) solid var(--brand-700);
	}

	.enforces-label {
		font-family: var(--font-mono);
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		font-weight: var(--weight-semibold);
		margin-right: var(--space-2);
	}
</style>
