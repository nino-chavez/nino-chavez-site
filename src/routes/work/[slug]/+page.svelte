<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import PullQuote from '$lib/components/compositions/PullQuote.svelte';
	import Schematic from '$lib/components/Schematic.svelte';

	export let data;
	$: project = data.project;

	function urlLabel(u) {
		if (!u) return '';
		return u.replace(/^https?:\/\//, '').replace(/\/$/, '');
	}

	// Per-case-study schematic mapping. All five lead studies have hand-drafted
	// SVGs in Schematic.svelte. Honorable mentions (aix, cix, six, cpa) fall
	// back to the forge-pipeline placeholder — they're not lead studies and
	// the brief doesn't prescribe per-study schematics for them.
	const SCHEMATIC_KIND = {
		'rally-hq': 'rally-hq-blueprint-pipeline',
		atelier: 'atelier-12-tool-mcp',
		'ask-bc': 'ask-bc-hybrid-arch',
		photography: 'photography-cf-pipeline',
		'bc-subscriptions': 'bc-subscriptions-dual-track'
	};
	$: schematicKind = SCHEMATIC_KIND[project.slug] || 'forge-pipeline';
	$: hasPullQuote = Boolean(project.pullQuote);
	$: hasQuotableArtifacts = Array.isArray(project.quotableArtifacts) && project.quotableArtifacts.length > 0;

	$: liveUrl = project.demo || project.github;
</script>

<svelte:head>
	<title>{project.title} — Work — Nino Chavez</title>
	<meta name="description" content={project.tagline} />
	<meta property="og:title" content="{project.title} — Nino Chavez" />
	<meta property="og:description" content={project.tagline} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://ninochavez.co/work/{project.slug}" />
</svelte:head>

<!-- ───── hero-case-study ────────────────────────────────────────────── -->
<Hero size="compact">
	<p slot="kicker">/work / {project.slug}</p>
	<svelte:fragment slot="claim">{project.title}</svelte:fragment>
	<svelte:fragment slot="subhead">{project.tagline}</svelte:fragment>
</Hero>

<div class="case-meta">
	{#if liveUrl}
		<a class="url-pill" href={liveUrl} rel="noopener" target="_blank">
			{urlLabel(liveUrl)}
		</a>
	{/if}
	{#if project.github && project.github !== liveUrl}
		<a class="url-pill secondary" href={project.github} rel="noopener" target="_blank">
			{urlLabel(project.github)}
		</a>
	{/if}
	<ul class="stack">
		{#each project.stack as tech}
			<li>{tech}</li>
		{/each}
	</ul>
</div>

<!-- ───── signature-diagram-opener ───────────────────────────────────── -->
<section class="diagram" aria-labelledby="diagram-heading">
	<h2 id="diagram-heading" class="visually-hidden">{project.title} architecture</h2>
	<Schematic
		kind={schematicKind}
		caption={`${project.schematic ?? schematicKind + '.svg'} — case-study architecture diagram`}
	/>
</section>

<!-- ───── agentic-approach-readout ───────────────────────────────────── -->
<section class="approach" aria-labelledby="approach-heading">
	<SectionHead kicker="01 — The approach" id="approach-heading">
		Problem framing, agent design, artifact links.
	</SectionHead>
	<div class="readout-grid">
		<article class="readout">
			<h3 class="readout-label">Problem</h3>
			<p>{project.problem}</p>
		</article>
		<article class="readout">
			<h3 class="readout-label">Approach</h3>
			<p>{project.approach}</p>
		</article>
		<article class="readout">
			<h3 class="readout-label">Key decisions</h3>
			<ul>
				{#each project.keyDecisions as decision}
					<li>{decision}</li>
				{/each}
			</ul>
		</article>
	</div>
</section>

<!-- ───── quotable-artifact-block ────────────────────────────────────── -->
{#if hasPullQuote || hasQuotableArtifacts}
	<section class="artifacts" aria-labelledby="artifacts-heading">
		<SectionHead kicker="02 — Quotable artifacts" id="artifacts-heading">
			Specific things you can click into.
		</SectionHead>

		{#if hasPullQuote}
			<PullQuote>{project.pullQuote}</PullQuote>
		{/if}

		{#if hasQuotableArtifacts}
			<ul class="artifact-list">
				{#each project.quotableArtifacts as artifact}
					<li class="artifact">
						<a href={artifact.href} rel="noopener" target="_blank">
							<span class="artifact-label">{artifact.label}</span>
							{#if artifact.excerpt}
								<span class="artifact-excerpt">{artifact.excerpt}</span>
							{/if}
							<span class="artifact-href">{urlLabel(artifact.href)}</span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
{/if}

<!-- ───── outcome-readout ────────────────────────────────────────────── -->
<section class="outcomes" aria-labelledby="outcomes-heading">
	<SectionHead kicker="03 — Outcomes" id="outcomes-heading">
		What shipped, what it measures.
	</SectionHead>

	<dl class="metric-list">
		{#each project.metrics as metric}
			<div class="metric-row">
				<dt>{metric.label}</dt>
				<dd>
					<span class="metric-value">{metric.value}</span>
					{#if metric.context}<span class="metric-context">{metric.context}</span>{/if}
				</dd>
			</div>
		{/each}
	</dl>

	{#if project.outcomes?.length}
		<ul class="outcome-list">
			{#each project.outcomes as outcome}
				<li>{outcome}</li>
			{/each}
		</ul>
	{/if}

	{#if project.learned?.length}
		<aside class="learned">
			<h3 class="learned-head">What I learned</h3>
			<ul>
				{#each project.learned as item}
					<li>{item}</li>
				{/each}
			</ul>
		</aside>
	{/if}

	<footer class="case-foot">
		<a href="/work">← back to work index</a>
		{#if liveUrl}
			<a href={liveUrl} rel="noopener" target="_blank" class="primary-link">
				{urlLabel(liveUrl)} ↗
			</a>
		{/if}
	</footer>
</section>

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.case-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin: 0 0 var(--space-16);
		align-items: center;
	}

	.url-pill {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-link-hover);
		padding: var(--space-2) var(--space-3);
		border: 1px solid var(--border-violet-strong);
		text-decoration: none;
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.url-pill:hover {
		background: var(--surface-card-hover);
	}

	.url-pill.secondary {
		color: var(--text-muted);
		border-color: var(--border-base);
	}

	.stack {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		list-style: none;
		padding: 0;
		margin: 0 0 0 var(--space-2);
	}

	.stack li {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
		padding: var(--space-1) var(--space-2);
		border: 1px solid var(--border-base);
	}

	.diagram,
	.approach,
	.artifacts,
	.outcomes {
		margin: var(--space-20) 0;
	}

	.readout-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-6);
	}

	.readout {
		border: 1px solid var(--border-base);
		padding: var(--space-6);
	}

	.readout-label {
		margin: 0 0 var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
		font-weight: 500;
	}

	.readout p {
		margin: 0;
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: 64ch;
	}

	.readout ul {
		margin: 0;
		padding-left: var(--space-5);
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: 64ch;
	}

	.readout li {
		margin-bottom: var(--space-2);
	}

	.artifact-list {
		list-style: none;
		padding: 0;
		margin: var(--space-8) 0 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.artifact a {
		display: block;
		padding: var(--space-4) var(--space-5);
		border: 1px solid var(--border-base);
		text-decoration: none;
		color: inherit;
		transition: border-color var(--dur-base) var(--ease-out),
			background-color var(--dur-base) var(--ease-out);
	}

	.artifact a:hover {
		border-color: var(--border-violet-strong);
		background: var(--surface-card-hover);
	}

	.artifact-label {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
		margin-bottom: var(--space-1);
	}

	.artifact-excerpt {
		display: block;
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: 1.5;
		margin-bottom: var(--space-2);
		font-style: italic;
	}

	.artifact-href {
		display: block;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link);
		word-break: break-all;
	}

	.metric-list {
		margin: 0 0 var(--space-8);
		display: flex;
		flex-direction: column;
		gap: 0;
		border-top: 1px solid var(--border-subtle);
	}

	.metric-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-4);
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--border-subtle);
		align-items: baseline;
	}

	.metric-row dt {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-secondary);
	}

	.metric-row dd {
		margin: 0;
		font-family: var(--font-mono);
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.metric-value {
		font-size: var(--type-lead);
		color: var(--text-primary);
		font-weight: 500;
	}

	.metric-context {
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.outcome-list {
		margin: var(--space-6) 0 0;
		padding-left: var(--space-5);
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: 64ch;
	}

	.outcome-list li {
		margin-bottom: var(--space-2);
	}

	.learned {
		margin: var(--space-8) 0 0;
		padding: var(--space-5);
		background: var(--surface-elevated);
		border-left: 2px solid var(--color-brand-violet);
	}

	.learned-head {
		margin: 0 0 var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
		font-weight: 500;
	}

	.learned ul {
		margin: 0;
		padding-left: var(--space-5);
		font-size: var(--type-sm);
		line-height: 1.6;
		color: var(--text-secondary);
		max-width: 64ch;
	}

	.learned li {
		margin-bottom: var(--space-2);
	}

	.case-foot {
		margin: var(--space-12) 0 0;
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
	}

	.case-foot a {
		color: var(--text-link);
		text-decoration: none;
	}

	.case-foot a:hover {
		color: var(--text-link-hover);
	}

	.primary-link {
		color: var(--text-link-hover) !important;
	}
</style>
