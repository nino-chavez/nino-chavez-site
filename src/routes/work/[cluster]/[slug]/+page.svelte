<script>
	import Hero from '$lib/components/Hero.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import PullQuote from '$lib/components/PullQuote.svelte';
	import PointerRow from '$lib/components/PointerRow.svelte';

	let { data } = $props();
	const study = $derived(data.study);

	const closingPointers = $derived([
		{ title: `Back to /work#${study.cluster}`, href: `/work#${study.cluster}`, description: `Other ${study.clusterLabel} cluster items` },
		{ title: '/practice', href: '/practice', description: 'The practice this case study was produced through' },
		{ title: '/contact', href: '/contact', description: 'Reach out about this work' }
	]);
</script>

<svelte:head>
	<title>{study.title} — case study — Nino Chavez</title>
	<meta name="description" content={study.lede.slice(0, 160)} />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="{study.clusterLabel} · case study">
			{study.title}
			<svelte:fragment slot="sub">{study.lede}</svelte:fragment>
			<svelte:fragment slot="meta">
				<span class="visibility visibility-{study.visibility}">{study.visibility}</span>
				{#if study.repo}<code class="repo-ref">{study.repo}</code>{/if}
				{#if study.liveUrls}
					{#each study.liveUrls as live (live.url)}
						<a class="live-pill" href={live.url} rel="noopener">{live.label}</a>
					{/each}
				{/if}
			</svelte:fragment>
		</Hero>
	</section>

	<div class="container">

		<section class="case-section">
			<SectionHead kicker={study.architectureKicker}>{study.architectureTitle}</SectionHead>
			<p class="section-body">{study.architectureBody}</p>
		</section>

		<section class="case-section">
			<SectionHead kicker={study.approachKicker}>{study.approachTitle}</SectionHead>
			<p class="section-body">{study.approachIntro}</p>
			<div class="readout-grid">
				{#each study.approachReadouts as readout (readout.tag)}
					<article class="readout">
						<p class="readout-tag">{readout.tag}</p>
						<p class="readout-title">{readout.title}</p>
						<p class="readout-body">{readout.body}</p>
					</article>
				{/each}
			</div>
		</section>

		<section class="case-section">
			<SectionHead kicker="03 — Quotable artifact">From the source.</SectionHead>
			<PullQuote citeLabel={study.quoteSource}>{study.quote}</PullQuote>
		</section>

		<section class="case-section">
			<SectionHead kicker="04 — Outcome">Where it stands.</SectionHead>
			<div class="outcome-grid">
				{#each study.outcomes as outcome (outcome.tag)}
					<div class="outcome-tile">
						<p class="outcome-tag">{outcome.tag}</p>
						<p class="outcome-value">{outcome.value}</p>
						<p class="outcome-note">{outcome.note}</p>
					</div>
				{/each}
			</div>
		</section>

		<footer class="case-footer">
			<PointerRow pointers={closingPointers} />
		</footer>

	</div>
</main>

<style>
	main { padding-bottom: var(--space-16); }

	.visibility {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		padding: 2px 8px;
		border-radius: var(--radius-pill);
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

	.repo-ref {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--brand-400);
	}

	.live-pill {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		padding: 2px 8px;
		border: var(--border-1) solid var(--brand-700);
		background: hsl(270 80% 20% / 0.3);
		color: var(--brand-400);
		text-decoration: none;
		border-radius: var(--radius-pill);
		transition: var(--transition-base);
	}

	.live-pill:hover {
		background: var(--brand-700);
		color: white;
	}

	.case-section {
		padding-block: var(--space-12);
		border-top: var(--border-1) solid var(--border-subtle);
		scroll-margin-top: var(--space-16);
	}

	.section-body {
		max-width: var(--container-prose);
		color: var(--text-secondary);
		font-size: var(--type-base);
		line-height: var(--leading-relaxed);
	}

	.readout-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
		margin-top: var(--space-6);
	}

	.readout {
		padding: var(--space-5);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
	}

	.readout-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.readout-title {
		font-family: var(--font-sans);
		font-size: var(--type-base);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		margin-bottom: var(--space-2);
	}

	.readout-body {
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
	}

	.outcome-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--space-3);
		margin-top: var(--space-6);
	}

	.outcome-tile {
		padding: var(--space-4);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
	}

	.outcome-tag {
		font-family: var(--font-mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-1);
	}

	.outcome-value {
		font-family: var(--font-display);
		font-size: var(--type-xl);
		font-weight: var(--weight-bold);
		color: var(--text-primary);
		line-height: 1.2;
	}

	.outcome-note {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}

	.case-footer {
		margin-top: var(--space-16);
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}
</style>
