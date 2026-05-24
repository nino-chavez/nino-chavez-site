<script>
	/** /practice toolchain card — name, subtitle, body, enforces inset, link */
	export let name;
	export let subtitle = '';
	export let body;
	export let enforces;
	export let href;
</script>

<article class="tool">
	<h3 class="name">{name}</h3>
	{#if subtitle}
		<p class="subtitle">{subtitle}</p>
	{/if}
	<p class="body">{body}</p>
	<p class="enforces">
		<span class="enforces-label">Enforces:</span>
		{enforces}
	</p>
	<a class="link" {href} rel="noopener" target="_blank">
		→ {href.replace(/^https?:\/\//, '')}
	</a>
</article>

<style>
	.tool {
		border: 1px solid var(--border-base);
		padding: var(--space-6) var(--space-6) var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.name {
		margin: 0;
		font-size: var(--type-h3);
		font-weight: 500;
		color: var(--text-primary);
	}

	.subtitle {
		margin: 0 0 var(--space-1);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		letter-spacing: var(--tracking-wide);
	}

	.body {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: 1.55;
	}

	.enforces {
		margin: var(--space-2) 0;
		padding: var(--space-3) var(--space-4);
		border-left: 2px solid var(--color-brand-violet);
		background: var(--surface-elevated);
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	.enforces-label {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link-hover);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		margin-right: var(--space-2);
	}

	.link {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-link);
		text-decoration: none;
		margin-top: auto;
		word-break: break-all;
	}

	.link:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
