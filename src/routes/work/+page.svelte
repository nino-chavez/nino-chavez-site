<script>
	import { getFeaturedProjects, getHonorableMentions } from '$lib/work-data';
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import CaseStudyCard from '$lib/components/compositions/CaseStudyCard.svelte';
	import HonorableStrip from '$lib/components/compositions/HonorableStrip.svelte';

	const featured = getFeaturedProjects();
	const demoted = getHonorableMentions();

	// Brand/site honorable-mention strip — sourced from 02-prescription.yml
	// case_studies.honorable_mention_strip. These are brands and surfaces
	// adjacent to the practice, not full case studies.
	const brandStrip = [
		{
			name: 'signalx.studio',
			caption: 'holding company',
			href: 'https://signalx.studio'
		},
		{
			name: 'letspepper.com',
			caption: 'tournament-series brand',
			href: 'https://letspepper.com'
		},
		{
			name: 'flickdaymedia.com',
			caption: 'sports media brand',
			href: 'https://flickdaymedia.com'
		},
		{
			name: 'quantifai.app',
			caption: 'internal AI FinOps · product paused',
			href: 'https://quantifai.app'
		},
		{
			name: 'volleyrx.com',
			caption: 'brand work',
			href: 'https://volleyrx.com'
		},
		{
			name: '630 Volleyball suite',
			caption: 'Coach Competency Index (617 tests) · AAU 5-algorithm ranking · e-signatures'
		},
		{
			name: 'Client work',
			caption: 'Urvil Performance · Allen Wellness Center · Creative Floors'
		}
	];

	function primaryMetric(project) {
		// Pick the first metric — it tends to be the load-bearing one.
		return project.metrics?.[0] ?? null;
	}
</script>

<svelte:head>
	<title>Work — Nino Chavez</title>
	<meta
		name="description"
		content="Five lead case studies. The artifacts the toolchain produced: Rally HQ + Blueprint, Atelier, Ask BC, Photography, bc-subscriptions."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/work</p>
	<svelte:fragment slot="claim">
		Five lead case studies. <em>Every</em> one is a working artifact.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		What the practice produced. Each surface is either a deployed product or a published spec
		repo. The pull-quote on each card is the load-bearing line; click through for the agentic
		approach, the quotable artifacts, and the outcome metrics.
	</svelte:fragment>
</Hero>

<section class="leads" aria-labelledby="leads-heading">
	<SectionHead kicker="01 — Lead case studies" id="leads-heading">
		Five surfaces.
	</SectionHead>
	<div class="card-stack">
		{#each featured as project}
			<CaseStudyCard
				slug={project.slug}
				title={project.title}
				pullQuote={project.pullQuote ?? project.tagline}
				tagline={project.tagline}
				demo={project.demo}
				github={project.github}
				stack={project.stack}
				primaryMetric={primaryMetric(project)}
			/>
		{/each}
	</div>
</section>

<section class="strip-section" aria-labelledby="strip-heading">
	<SectionHead kicker="02 — Honorable mentions" id="strip-heading">
		Adjacent brands and surfaces.
	</SectionHead>
	<HonorableStrip items={brandStrip} />
</section>

{#if demoted.length}
	<section class="more" aria-labelledby="more-heading">
		<SectionHead kicker="03 — Other work" id="more-heading">
			Earlier case studies, kept for context.
		</SectionHead>
		<ul class="more-list">
			{#each demoted as project}
				<li class="more-item">
					<a href="/work/{project.slug}">
						<span class="more-title">{project.title}</span>
						<span class="more-tagline">{project.tagline}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/if}

<style>
	.leads,
	.strip-section,
	.more {
		margin: var(--space-16) 0;
	}

	.card-stack {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.more-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--border-subtle);
	}

	.more-item {
		border-bottom: 1px solid var(--border-subtle);
	}

	.more-item a {
		display: grid;
		grid-template-columns: 16rem 1fr;
		gap: var(--space-6);
		padding: var(--space-4) var(--space-1);
		text-decoration: none;
		color: inherit;
		align-items: baseline;
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.more-item a:hover {
		background: var(--surface-card-hover);
	}

	.more-item a:hover .more-title {
		color: var(--text-link-hover);
	}

	.more-title {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
	}

	.more-tagline {
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	@media (max-width: 720px) {
		.more-item a {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}
	}
</style>
