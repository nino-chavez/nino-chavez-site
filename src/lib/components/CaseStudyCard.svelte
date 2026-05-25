<script>
	/**
	 * CaseStudyCard — case-study summary tile.
	 *
	 * Per ADR-0009 — used inside cluster sections for "deep-dive lead"
	 * case studies (atelier, cortex, ask-dad, bc-subscriptions, ask-bc,
	 * rally-hq). One card per lead; compact for non-lead items.
	 *
	 * @param {string} title - case study name
	 * @param {string} description - one-line summary
	 * @param {string} [href] - link to detail page
	 * @param {string} [visibility] - 'public' | 'private' (renders badge per ADR-0009 enforcement)
	 * @param {string[]} [tags] - mono-rendered stack tags
	 * @param {Array<{label: string, url: string}>} [liveUrls] - live URL pills
	 */
	let { title, description, href = '', visibility = 'private', tags = [], liveUrls = [] } = $props();

	const TagComponent = href ? 'a' : 'div';
</script>

<svelte:element this={TagComponent} class="case-card" href={href || undefined}>
	<div class="card-head">
		<h3 class="title">{title}</h3>
		<span class="visibility visibility-{visibility}" aria-label="{visibility} repository">{visibility}</span>
	</div>
	<p class="description">{description}</p>
	{#if liveUrls.length > 0}
		<ul class="live-urls">
			{#each liveUrls as live (live.url)}
				<li><a href={live.url} rel="noopener" class="live-url-pill">{live.label}</a></li>
			{/each}
		</ul>
	{/if}
	{#if tags.length > 0}
		<ul class="tags">
			{#each tags as tag (tag)}
				<li class="tag">{tag}</li>
			{/each}
		</ul>
	{/if}
</svelte:element>

<style>
	.case-card {
		display: block;
		padding: var(--space-6);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
		text-decoration: none;
		color: inherit;
		transition: border-color var(--duration-fast) var(--ease-out),
		            transform var(--duration-fast) var(--ease-out);
	}

	a.case-card:hover {
		border-color: var(--brand-500);
		transform: translateY(-2px);
	}

	a.case-card:focus-visible {
		outline: none;
		box-shadow: var(--shadow-focus);
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-4);
		margin-bottom: var(--space-3);
	}

	.title {
		font-family: var(--font-display);
		font-size: var(--type-xl);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		margin: 0;
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
		margin-bottom: var(--space-4);
	}

	.live-urls,
	.tags {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.live-urls {
		margin-bottom: var(--space-3);
	}

	.live-url-pill {
		display: inline-block;
		padding: 2px 8px;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--brand-400);
		border: var(--border-1) solid var(--brand-700);
		border-radius: var(--radius-pill);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.live-url-pill:hover {
		color: var(--brand-300);
	}

	.tag {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-muted);
		padding: 2px 6px;
		border: var(--border-1) solid var(--border-subtle);
	}

	@media (prefers-reduced-motion: reduce) {
		a.case-card:hover {
			transform: none;
		}
	}
</style>
