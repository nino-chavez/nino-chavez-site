<script>
	/**
	 * Track-readout card — used on /ai/learn index. Each card surfaces the
	 * spine of one curriculum track: title, tagline, artifact, timeline, level
	 * count, and optional v3 anchors that point at real case studies / practice
	 * surfaces embodying the track's pattern. Clicking links to the per-track
	 * deep-dive at /ai/learn/[id].
	 */
	export let id;
	export let title;
	export let tagline;
	export let artifact;
	export let timeline;
	export let levels;
	export let anchors = []; // [{ label, href }]
</script>

<a class="track" href="/ai/learn/{id}">
	<header class="head">
		<h3 class="title">{title}</h3>
		<span class="levels">{levels} levels</span>
	</header>
	<p class="tagline">{tagline}</p>
	<dl class="meta">
		<div>
			<dt>Artifact</dt>
			<dd>{artifact}</dd>
		</div>
		<div>
			<dt>Timeline</dt>
			<dd>{timeline}</dd>
		</div>
	</dl>
	{#if anchors.length > 0}
		<div class="anchors">
			<p class="anchors-label">Live anchors</p>
			<ul>
				{#each anchors as anchor}
					<li>{anchor.label}</li>
				{/each}
			</ul>
		</div>
	{/if}
	<p class="arrow">→ /ai/learn/{id}</p>
</a>

<style>
	.track {
		display: block;
		padding: var(--space-5) var(--space-5);
		border: 1px solid var(--border-base);
		text-decoration: none;
		color: inherit;
		transition:
			border-color var(--dur-base) var(--ease-out),
			background-color var(--dur-base) var(--ease-out);
	}

	.track:hover {
		border-color: var(--border-violet-strong);
		background: var(--surface-card-hover);
	}

	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: var(--space-3);
		margin-bottom: var(--space-2);
	}

	.title {
		margin: 0;
		font-size: var(--type-h3);
		font-weight: 500;
		color: var(--text-primary);
	}

	.track:hover .title {
		color: var(--text-link-hover);
	}

	.levels {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-violet);
	}

	.tagline {
		margin: 0 0 var(--space-4);
		font-size: var(--type-body);
		color: var(--text-secondary);
		line-height: 1.5;
		min-height: 3rem;
	}

	.meta {
		margin: 0 0 var(--space-3);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		padding-top: var(--space-3);
		border-top: 1px solid var(--border-subtle);
	}

	.meta > div {
		display: grid;
		grid-template-columns: 6rem 1fr;
		gap: var(--space-3);
	}

	.meta dt {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	.meta dd {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: 1.4;
	}

	.anchors {
		margin: 0 0 var(--space-3);
		padding: var(--space-3) var(--space-3);
		background: var(--surface-elevated);
		border-left: 2px solid var(--color-brand-violet);
	}

	.anchors-label {
		margin: 0 0 var(--space-1);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-wide);
	}

	.anchors ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.anchors li {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.arrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
	}
</style>
