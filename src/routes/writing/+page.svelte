<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';

	// editorial-lede → whitepaper-feature-row → recent-pieces-list (brief §2)
	//
	// Featured pieces are hand-curated until a blog-RSS integration lands. The
	// blog at blog.ninochavez.co is the canonical archive; this page surfaces
	// the three pieces I'd point a hiring manager at first.
	const featured = [
		{
			title: 'The toolchain is the practice',
			pullQuote:
				"Most engineers configure Claude. I instrument it. The toolchain is the surrounding system — rules a session inherits, artifacts it produces, hooks that catch failure modes, corpus that pulls forward what worked before.",
			href: 'https://blog.ninochavez.co'
		},
		{
			title: 'Spec-driven AI development',
			pullQuote:
				"AI coding agents are not faster autocomplete. They're a different working unit — a junior engineer with no memory and no opinions. Productive use needs the same things productive teams have always needed: specs, conventions, decision logs, guardrails.",
			href: 'https://blog.ninochavez.co'
		},
		{
			title: 'The hesitation fold',
			pullQuote:
				"One classifier, three lifecycle points. A declarative rule, a prompt-submit hook that predicts hesitation, a stop hook that catches it after the fact. The same classify_situation() runs at all three. New patterns added once are caught everywhere.",
			href: 'https://blog.ninochavez.co'
		}
	];
</script>

<svelte:head>
	<title>Writing — Nino Chavez</title>
	<meta
		name="description"
		content="Signal Dispatch: essays on AI-assisted software development, methodology, and the practice. Three pieces to start with; the full archive is at blog.ninochavez.co."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/writing</p>
	<svelte:fragment slot="claim">
		<em>Signal Dispatch.</em>
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Essays on AI-assisted software development, methodology, and the practice. The full archive is
		at <a href="https://blog.ninochavez.co" rel="noopener">blog.ninochavez.co</a>; below are the
		three pieces I'd point a hiring manager at first.
	</svelte:fragment>
</Hero>

<section class="featured" aria-labelledby="featured-heading">
	<SectionHead kicker="01 — Three to start with" id="featured-heading">
		Flagship pieces.
	</SectionHead>
	<ul class="paper-row">
		{#each featured as paper}
			<li class="paper">
				<a href={paper.href} rel="noopener" target="_blank">
					<h3 class="paper-title">{paper.title}</h3>
					<blockquote class="paper-quote">{paper.pullQuote}</blockquote>
					<span class="paper-arrow">read on Signal Dispatch ↗</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="archive">
	<SectionHead kicker="02 — More">The archive.</SectionHead>
	<p class="archive-note">
		The chronological feed lives at <a href="https://blog.ninochavez.co" rel="noopener"
			>blog.ninochavez.co</a
		>. Signal Dispatch is the long-form companion to <a href="/practice">/practice</a> — where the
		methodology gets unpacked at essay length instead of catalog length.
	</p>
</section>

<style>
	.featured,
	.archive {
		margin: var(--space-16) 0;
	}

	.paper-row {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.paper a {
		display: block;
		padding: var(--space-6) var(--space-6) var(--space-5);
		border: 1px solid var(--border-base);
		text-decoration: none;
		color: inherit;
		transition:
			border-color var(--dur-base) var(--ease-out),
			background-color var(--dur-base) var(--ease-out);
	}

	.paper a:hover {
		border-color: var(--border-violet-strong);
		background: var(--surface-card-hover);
	}

	.paper-title {
		margin: 0 0 var(--space-4);
		font-size: var(--type-h2);
		font-weight: 500;
		color: var(--text-primary);
		letter-spacing: var(--tracking-tight);
	}

	.paper a:hover .paper-title {
		color: var(--text-link-hover);
	}

	.paper-quote {
		margin: 0 0 var(--space-4);
		padding: 0 0 0 var(--space-4);
		border-left: 2px solid var(--color-brand-violet);
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		font-style: italic;
		max-width: 62ch;
	}

	.paper-arrow {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: lowercase;
		letter-spacing: var(--tracking-wide);
	}

	.archive-note {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0;
	}

	.archive-note a {
		color: var(--text-link);
		text-decoration: none;
	}

	.archive-note a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
