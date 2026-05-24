<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import TeaserCard from '$lib/components/compositions/TeaserCard.svelte';

	// /ai redesign 2026-05-25 — DESIGN-PRINCIPLES.md §5 + §6 revised, /ai/build
	// and /ai/reference remain in the cut list, so the hub surfaces only the
	// two preserved children: /ai/learn (open reference tracks) and /ai/ask
	// (supplementary RAG entry point).

	const pathways = [
		{
			title: 'Learn',
			body: 'Seven self-directed reference tracks — Explorer, Builder, Architect, Strategist, Author, Voice Designer, Enterprise. Free, ungated. Each track ends with an artifact you can show.',
			href: '/ai/learn',
			arrow: '/ai/learn'
		},
		{
			title: 'Ask',
			body: 'A RAG-grounded interface to the practice. Supplementary entry point — the primary credibility play remains the toolchain on /practice and the case studies on /work.',
			href: '/ai/ask',
			arrow: '/ai/ask'
		}
	];
</script>

<svelte:head>
	<title>AI — Nino Chavez</title>
	<meta
		name="description"
		content="Two entry points for the practice: open reference tracks for AI-assisted work, and a RAG-grounded interface for asking specific questions."
	/>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/ai</p>
	<svelte:fragment slot="claim">
		Two ways <em>into</em> the practice.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		The toolchain and case studies are the headline. These two surfaces are alternate entry points
		for visitors who want the practice in a different shape — structured reference (Learn) or
		direct question-answering (Ask).
	</svelte:fragment>
</Hero>

<section class="paths" aria-labelledby="paths-heading">
	<SectionHead kicker="01 — Choose a path" id="paths-heading">Where do you want to start?</SectionHead>
	<div class="grid">
		{#each pathways as p}
			<TeaserCard title={p.title} body={p.body} href={p.href} arrow={p.arrow} />
		{/each}
	</div>
</section>

<section class="approach">
	<SectionHead kicker="02 — The approach">No theory pages.</SectionHead>
	<p>
		I don't write about AI from a distance. Everything here comes from actual projects, real
		deadlines, and code that shipped.
	</p>
	<p>
		The <strong>Learn</strong> section is structured around artifacts, not theory. Each track ends with
		something you can show.
	</p>
	<p>
		The <strong>Ask</strong> section is a live demo: a RAG interface grounded in published writing.
		Talk to it.
	</p>
	<p class="exit">
		For the toolchain and the case studies, go to <a href="/practice">/practice</a> and
		<a href="/work">/work</a>.
	</p>
</section>

<style>
	.paths,
	.approach {
		margin: var(--space-16) 0;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	@media (max-width: 720px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}

	.approach p {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0 0 var(--space-4);
	}

	.approach strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.approach .exit {
		margin-top: var(--space-6);
		padding-top: var(--space-4);
		border-top: 1px solid var(--border-subtle);
		font-size: var(--type-sm);
		color: var(--text-muted);
	}

	.approach a {
		color: var(--text-link);
		text-decoration: none;
	}

	.approach a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
