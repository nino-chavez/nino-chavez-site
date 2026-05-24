<script>
	/** case-study row in the homepage stripe — title, tagline, URL pill, stack tags */
	export let index;
	export let slug;
	export let title;
	export let tagline;
	export let url = '';
	export let stack = [];

	function urlPill(u) {
		if (!u) return '';
		return u.replace(/^https?:\/\//, '').replace(/\/$/, '');
	}
</script>

<li class="case">
	<a class="case-link" href="/work/{slug}">
		<p class="case-num">{String(index).padStart(2, '0')}</p>
		<div class="case-body">
			<h3 class="case-title">{title}</h3>
			<p class="case-tagline">{tagline}</p>
			<div class="case-meta">
				{#if url}
					<span class="url-pill">{urlPill(url)}</span>
				{/if}
				{#each stack.slice(0, 4) as tech}
					<span class="stack-tag">{tech}</span>
				{/each}
			</div>
		</div>
	</a>
</li>

<style>
	.case {
		list-style: none;
	}

	.case-link {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-6);
		padding: var(--space-6) var(--space-3) var(--space-6) 0;
		text-decoration: none;
		color: inherit;
		border-bottom: 1px solid var(--border-subtle);
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.case-link:hover {
		background: var(--surface-card-hover);
	}

	.case-link:hover .case-title {
		color: var(--text-link-hover);
	}

	.case-num {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		margin: var(--space-1) 0 0;
		padding-left: var(--space-2);
	}

	.case-title {
		font-size: var(--type-h2);
		font-weight: 500;
		color: var(--text-primary);
		margin: 0 0 var(--space-2);
		letter-spacing: var(--tracking-tight);
		transition: color var(--dur-base) var(--ease-out);
	}

	.case-tagline {
		font-size: var(--type-body);
		color: var(--text-secondary);
		margin: 0 0 var(--space-3);
		line-height: 1.5;
		max-width: 62ch;
	}

	.case-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		align-items: center;
	}

	.url-pill,
	.stack-tag {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--border-violet);
		color: var(--text-muted);
	}

	.url-pill {
		color: var(--text-link-hover);
		border-color: var(--border-violet-strong);
	}

	@media (max-width: 640px) {
		.case-link {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}
		.case-num {
			padding-left: 0;
		}
	}
</style>
