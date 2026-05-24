<script>
	/**
	 * case-study-readout composition (brief §2 — /work composition 2).
	 *
	 * Per study: pull-quote (load-bearing line) + outcome metric + live-URL pill +
	 * stack tags. Each card links to /work/[slug].
	 */
	export let slug;
	export let title;
	export let pullQuote = '';
	export let tagline = '';
	export let demo = '';
	export let github = '';
	export let stack = [];
	export let primaryMetric = null; // { label, value, context }

	function urlLabel(u) {
		if (!u) return '';
		return u.replace(/^https?:\/\//, '').replace(/\/$/, '');
	}

	$: liveUrl = demo || github;
</script>

<article class="card">
	<a class="card-link" href="/work/{slug}">
		<header class="card-head">
			<h3 class="title">{title}</h3>
			{#if liveUrl}
				<span class="url-pill">{urlLabel(liveUrl)}</span>
			{/if}
		</header>
		<blockquote class="quote">
			{pullQuote || tagline}
		</blockquote>
		{#if primaryMetric}
			<div class="metric">
				<span class="metric-value">{primaryMetric.value}</span>
				<span class="metric-label">{primaryMetric.label}</span>
				{#if primaryMetric.context}
					<span class="metric-context">{primaryMetric.context}</span>
				{/if}
			</div>
		{/if}
		<footer class="card-foot">
			<ul class="stack">
				{#each stack.slice(0, 6) as tech}
					<li>{tech}</li>
				{/each}
			</ul>
			<span class="readmore">read →</span>
		</footer>
	</a>
</article>

<style>
	.card {
		border: 1px solid var(--border-base);
		transition: border-color var(--dur-base) var(--ease-out),
			background-color var(--dur-base) var(--ease-out);
	}

	.card:hover {
		border-color: var(--border-violet-strong);
		background: var(--surface-card-hover);
	}

	.card-link {
		display: block;
		padding: var(--space-6) var(--space-6) var(--space-5);
		text-decoration: none;
		color: inherit;
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-3);
		margin-bottom: var(--space-4);
		flex-wrap: wrap;
	}

	.title {
		margin: 0;
		font-size: var(--type-h2);
		font-weight: 500;
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}

	.card:hover .title {
		color: var(--text-link-hover);
	}

	.url-pill {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link-hover);
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--border-violet-strong);
		white-space: nowrap;
	}

	.quote {
		margin: 0 0 var(--space-4);
		padding: 0;
		border-left: 2px solid var(--color-brand-violet);
		padding-left: var(--space-4);
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		font-style: italic;
		max-width: 62ch;
	}

	.metric {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		flex-wrap: wrap;
		margin: var(--space-4) 0;
		padding: var(--space-3) 0;
		border-top: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
		font-family: var(--font-mono);
	}

	.metric-value {
		font-size: var(--type-h3);
		color: var(--text-primary);
		font-weight: 500;
	}

	.metric-label {
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}

	.metric-context {
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.card-foot {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: var(--space-4);
		margin-top: var(--space-4);
		flex-wrap: wrap;
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.stack li {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-base);
	}

	.readmore {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: lowercase;
		letter-spacing: var(--tracking-wide);
	}
</style>
