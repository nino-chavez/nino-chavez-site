<script>
	/**
	 * PullQuote — italic quote block with optional attribution.
	 *
	 * Per blueprint/03-design-brief.md supporting pattern `editorial-italic`
	 * — one human moment per page; the italic-violet treatment is reserved
	 * for the hero's emphasis word, so PullQuote uses italic + larger size
	 * + violet left-border instead of full violet text.
	 *
	 * @param {string} [cite] - source citation (URL or label)
	 * @param {string} [citeLabel] - displayed citation text
	 */
	let { cite = '', citeLabel = '' } = $props();
</script>

<figure class="pull-quote">
	<blockquote {cite}>
		<slot />
	</blockquote>
	{#if citeLabel}
		<figcaption>
			{#if cite && cite.startsWith('http')}
				— <a href={cite} rel="noopener">{citeLabel}</a>
			{:else}
				— {citeLabel}
			{/if}
		</figcaption>
	{/if}
</figure>

<style>
	.pull-quote {
		margin: var(--space-8) 0;
		padding-left: var(--space-6);
		border-left: var(--border-2) solid var(--brand-500);
	}

	.pull-quote blockquote {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--type-xl);
		line-height: var(--leading-snug);
		font-style: italic;
		color: var(--text-primary);
	}

	.pull-quote figcaption {
		margin-top: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.pull-quote figcaption a {
		color: var(--text-muted);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.pull-quote figcaption a:hover {
		color: var(--text-link-hover);
	}
</style>
