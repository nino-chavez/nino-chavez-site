<script>
	/** operating-rule block — pill + title + body + Why inset */
	export let pill;
	export let title;
	export let body;
	export let why;
</script>

<article class="rule">
	<header class="head">
		<span class="pill">{pill}</span>
		<h3 class="title">{title}</h3>
	</header>
	<blockquote class="body">{body}</blockquote>
	<aside class="why">
		<p><em>Why:</em> {why}</p>
	</aside>
</article>

<style>
	.rule {
		border-top: 1px solid var(--border-violet-subtle);
		padding-top: var(--space-6);
	}

	.head {
		display: flex;
		align-items: baseline;
		gap: var(--space-4);
		margin-bottom: var(--space-4);
		flex-wrap: wrap;
	}

	.pill {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link-hover);
		padding: var(--space-1) var(--space-3);
		border: 1px solid var(--border-violet-strong);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
	}

	.title {
		margin: 0;
		font-size: var(--type-h3);
		font-weight: 500;
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}

	.body {
		margin: 0 0 var(--space-4);
		padding: 0;
		font-size: var(--type-body);
		line-height: 1.65;
		color: var(--text-secondary);
		max-width: 64ch;
		font-style: normal;
		border-left: none;
	}

	.why {
		margin: 0;
		padding: var(--space-3) var(--space-4);
		background: var(--surface-card-hover);
		border-left: 2px solid var(--color-brand-violet);
		max-width: 64ch;
	}

	.why p {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.55;
	}

	.why em {
		font-style: italic;
		color: var(--text-link-hover);
	}
</style>
