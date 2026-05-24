<script>
	import { getFeaturedProjects } from '$lib/work-data';
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import RibbonCard from '$lib/components/compositions/RibbonCard.svelte';
	import CaseStripeItem from '$lib/components/compositions/CaseStripeItem.svelte';
	import TeaserCard from '$lib/components/compositions/TeaserCard.svelte';
	import Schematic from '$lib/components/Schematic.svelte';

	const featured = getFeaturedProjects();

	const ribbon = [
		{ value: '56+', label: 'projects shipped', detail: 'under ~/Workspace/dev' },
		{
			value: '4 projects',
			label: 'through the chain',
			detail:
				'P&P origin → bc-subscriptions → rally-hq → website-nc-v3 · A/B at 70–80% quality, 10–15× faster'
		},
		{
			value: '746',
			label: 'voice signals',
			detail: 'codified across 62 projects (voice corpus)'
		}
	];

	const teasers = [
		{
			title: 'Toolchain',
			body: 'Six tools that codify the practice.',
			href: '/practice#toolchain'
		},
		{
			title: 'Operating rules',
			body: 'Canonical-pattern-first. Default to action. Worktree isolation.',
			href: '/practice#rules'
		},
		{
			title: 'Instrumentation',
			body: 'A three-layer classifier against one failure mode, with an adversarial test plan.',
			href: '/practice#instrumentation'
		}
	];

	function urlFor(project) {
		return project.demo || project.github || '';
	}
</script>

<Hero>
	<p slot="kicker">Context engineer.</p>
	<svelte:fragment slot="claim">
		I <em>instrument</em> the systems that build the systems.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Working practice + open toolchain + production software. Built solo with agents at volume.
	</svelte:fragment>
</Hero>

<section class="ribbon" aria-label="Credibility ribbon">
	{#each ribbon as card}
		<RibbonCard {...card} />
	{/each}
</section>

<section class="diagram-section" aria-labelledby="pipeline-heading">
	<h2 id="pipeline-heading" class="visually-hidden">Forge pipeline</h2>
	<Schematic
		kind="forge-pipeline"
		caption="One brand-kit JSON drives tokens, copy, images, and a site archetype. The artifacts in this row are public repos. → /practice"
	/>
</section>

<section class="cases" aria-labelledby="cases-heading">
	<SectionHead kicker="01 — Case studies" id="cases-heading">Five surfaces. One practice.</SectionHead>
	<ol class="case-list">
		{#each featured as project, i}
			<CaseStripeItem
				index={i + 1}
				slug={project.slug}
				title={project.title}
				tagline={project.tagline}
				url={urlFor(project)}
				stack={project.stack}
			/>
		{/each}
	</ol>
</section>

<section class="practice-teaser" aria-labelledby="practice-teaser-heading">
	<SectionHead kicker="02 — The practice" id="practice-teaser-heading">
		Three surfaces of the same practice.
	</SectionHead>
	<div class="teaser-grid">
		{#each teasers as teaser}
			<TeaserCard title={teaser.title} body={teaser.body} href={teaser.href} arrow={teaser.href} />
		{/each}
	</div>
</section>

<section class="closing">
	<p class="closing-thesis">
		Most engineers configure Claude.<br />
		I <em>instrument</em> it. The artifacts above are how.
	</p>
	<p class="closing-receipts">
		48 hours · 11 pages · 4 strategy docs · 30+ cited sources · A/B'd at 70–80% quality · 4
		projects ran through the chain
	</p>
	<p class="closing-row">
		<a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a>
		<span class="sep">·</span>
		<a href="https://github.com/nino-chavez" rel="noopener">github</a>
		<span class="sep">·</span>
		<a href="https://www.linkedin.com/in/nino-chavez/" rel="noopener">linkedin</a>
		<span class="sep">·</span>
		<a href="/writing">/writing</a>
		<span class="sep">·</span>
		<a href="/contact">/contact</a>
	</p>
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

	.ribbon {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
		margin: 0 0 var(--space-20);
	}

	@media (max-width: 720px) {
		.ribbon {
			grid-template-columns: 1fr;
		}
	}

	.diagram-section {
		margin: 0 0 var(--space-20);
	}

	.cases,
	.practice-teaser {
		margin: 0 0 var(--space-20);
	}

	.case-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--border-subtle);
	}

	.teaser-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	@media (max-width: 720px) {
		.teaser-grid {
			grid-template-columns: 1fr;
		}
	}

	.closing {
		margin: var(--space-16) 0 var(--space-8);
		padding: var(--space-10) 0;
		border-top: 1px solid var(--border-violet);
		border-bottom: 1px solid var(--border-violet);
	}

	.closing-thesis {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.3;
		font-weight: 400;
		color: var(--text-primary);
		margin: 0 0 var(--space-6);
		max-width: 36ch;
	}

	.closing-thesis em {
		font-style: italic;
		color: var(--color-brand-violet);
	}

	.closing-receipts {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-muted);
		margin: 0 0 var(--space-6);
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
		line-height: 1.6;
	}

	.closing-row {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
		margin: 0;
	}

	.closing-row a {
		color: var(--text-link-hover);
		text-decoration: none;
	}

	.closing-row a:hover {
		color: var(--text-primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.sep {
		color: var(--text-disabled);
	}
</style>
