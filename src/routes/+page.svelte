<script>
	import { getFeaturedProjects } from '$lib/work-data';
	import Schematic from '$lib/components/Schematic.svelte';

	const featured = getFeaturedProjects();

	const ribbon = [
		{
			value: '60+',
			label: 'projects shipped',
			detail: 'under ~/Workspace/dev'
		},
		{
			value: '6',
			label: 'open toolchain',
			detail: 'forge-brand · forge-signal · forge-site · specchain · claude-recall-cli · ai-champions-kit'
		},
		{
			value: '743',
			label: 'voice signals',
			detail: 'codified across 62 projects (voice corpus)'
		}
	];

	const practiceTeasers = [
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

	function urlPill(url) {
		if (!url) return null;
		return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
	}
</script>

<svelte:head>
	<title>Nino Chavez — Context Engineer</title>
	<meta
		name="description"
		content="Context engineer. Codified a working practice for shipping production software with AI agents. Open toolchain, public case studies, instrumentation that the loop actually closes on."
	/>
</svelte:head>

<main class="site">
	<!-- ============================================================
		 Masthead
		============================================================ -->
	<header class="masthead">
		<a href="/" class="monogram" aria-label="Nino Chavez — home">
			<span>nc</span><span class="dot">.</span>
		</a>
		<nav class="topnav" aria-label="Primary">
			<a href="/work">work</a>
			<a href="/practice">practice</a>
			<a href="https://blog.ninochavez.co" rel="noopener">writing</a>
			<a href="/about">about</a>
			<a href="/contact">contact</a>
		</nav>
		<p class="masthead-caption">context engineer · chicago</p>
	</header>

	<!-- ============================================================
		 Hero — hero-with-thesis
		============================================================ -->
	<section class="hero">
		<p class="kicker">Context engineer.</p>
		<h1 class="claim">
			I <em>instrument</em> the systems that build the systems.
		</h1>
		<p class="subhead">
			Working practice <span class="plus">+</span> open toolchain
			<span class="plus">+</span> production software. Built solo with agents at volume.
		</p>
	</section>

	<!-- ============================================================
		 Credibility ribbon — instrument-readout row
		============================================================ -->
	<section class="ribbon" aria-label="Credibility ribbon">
		{#each ribbon as card}
			<article class="ribbon-card">
				<p class="ribbon-value">{card.value}</p>
				<p class="ribbon-label">{card.label}</p>
				<p class="ribbon-detail">{card.detail}</p>
			</article>
		{/each}
	</section>

	<!-- ============================================================
		 Signature diagram — forge-pipeline-diagram
		============================================================ -->
	<section class="diagram-section" aria-labelledby="pipeline-heading">
		<h2 id="pipeline-heading" class="visually-hidden">Forge pipeline</h2>
		<Schematic
			kind="forge-pipeline"
			caption="One brand-kit JSON drives tokens, copy, images, and a site archetype. The artifacts in this row are public repos. → /practice"
		/>
	</section>

	<!-- ============================================================
		 Case-study stripe — 5 lead studies
		============================================================ -->
	<section class="cases" aria-labelledby="cases-heading">
		<header class="section-head">
			<p class="section-kicker">01 — case studies</p>
			<h2 id="cases-heading">Five surfaces. One practice.</h2>
		</header>
		<ol class="case-list">
			{#each featured as project, i}
				<li class="case">
					<a class="case-link" href="/work/{project.slug}">
						<p class="case-num">{String(i + 1).padStart(2, '0')}</p>
						<div class="case-body">
							<h3 class="case-title">{project.title}</h3>
							<p class="case-tagline">{project.tagline}</p>
							<div class="case-meta">
								{#if project.demo}
									<span class="url-pill">{urlPill(project.demo)}</span>
								{:else if project.github}
									<span class="url-pill">{urlPill(project.github)}</span>
								{/if}
								{#each project.stack.slice(0, 4) as tech}
									<span class="stack-tag">{tech}</span>
								{/each}
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ol>
	</section>

	<!-- ============================================================
		 Practice teaser panel — 3 cards → /practice anchors
		============================================================ -->
	<section class="practice-teaser" aria-labelledby="practice-teaser-heading">
		<header class="section-head">
			<p class="section-kicker">02 — the practice</p>
			<h2 id="practice-teaser-heading">Three surfaces of the same practice.</h2>
		</header>
		<div class="teaser-grid">
			{#each practiceTeasers as teaser}
				<a class="teaser-card" href={teaser.href}>
					<h3>{teaser.title}.</h3>
					<p>{teaser.body}</p>
					<p class="teaser-arrow">→ {teaser.href}</p>
				</a>
			{/each}
		</div>
	</section>

	<!-- ============================================================
		 Closing thesis
		============================================================ -->
	<section class="closing">
		<p class="closing-thesis">
			Most engineers configure Claude.<br />
			I <em>instrument</em> it. The artifacts above are how.
		</p>
		<p class="closing-row">
			<a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a>
			<span class="sep">·</span>
			<a href="https://github.com/nino-chavez" rel="noopener">github</a>
			<span class="sep">·</span>
			<a href="https://www.linkedin.com/in/nino-chavez/" rel="noopener">linkedin</a>
			<span class="sep">·</span>
			<a href="https://blog.ninochavez.co" rel="noopener">/writing</a>
			<span class="sep">·</span>
			<a href="/contact">/contact</a>
		</p>
	</section>

	<footer class="site-foot">
		<p>© {new Date().getFullYear()} Nino Chavez · Chicago</p>
		<p class="foot-meta">
			<a href="/blueprint">/blueprint</a>
			<span class="sep">·</span>
			<a href="/api/person.json">/api/person.json</a>
		</p>
	</footer>
</main>

<style>
	.site {
		max-width: 72rem;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
		font-family: 'Inter', system-ui, sans-serif;
		color: #e5e5ea;
		background: #0a0a0f;
	}

	:global(html, body) {
		background: #0a0a0f;
	}

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

	/* ===== Masthead ===== */
	.masthead {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		grid-column-gap: 2rem;
		grid-row-gap: 0.25rem;
		align-items: center;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		margin-bottom: 3rem;
	}

	.monogram {
		grid-column: 1;
		grid-row: 1 / span 2;
		font-family: 'Inter', sans-serif;
		font-size: 1.5rem;
		font-weight: 600;
		text-decoration: none;
		color: #ffffff;
		letter-spacing: -0.02em;
		line-height: 1;
		display: inline-flex;
		align-items: baseline;
	}

	.monogram .dot {
		color: #8b5cf6;
	}

	.topnav {
		grid-column: 2;
		grid-row: 1;
		display: flex;
		gap: 1.5rem;
		justify-content: flex-end;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		flex-wrap: wrap;
	}

	.topnav a {
		color: #a8a8b2;
		text-decoration: none;
		transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.topnav a:hover {
		color: #c4b5fd;
	}

	.masthead-caption {
		grid-column: 1 / -1;
		grid-row: 2;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #7a7a85;
		margin: 0.5rem 0 0;
		letter-spacing: 0.02em;
	}

	/* ===== Hero ===== */
	.hero {
		padding: 3rem 0 4rem;
	}

	.kicker {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875rem;
		color: #8b5cf6;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		margin: 0 0 1.25rem;
	}

	.claim {
		font-size: clamp(2.5rem, 6.5vw, 5rem);
		line-height: 1.05;
		letter-spacing: -0.025em;
		font-weight: 500;
		margin: 0 0 1.75rem;
		color: #ffffff;
		max-width: 22ch;
	}

	.claim em {
		font-style: italic;
		color: #8b5cf6;
		font-weight: 500;
	}

	.subhead {
		font-size: 1.125rem;
		line-height: 1.55;
		color: #c4c4cd;
		max-width: 48rem;
		margin: 0;
	}

	.plus {
		color: #8b5cf6;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		padding: 0 0.25rem;
	}

	/* ===== Ribbon ===== */
	.ribbon {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
		margin-bottom: 5rem;
	}

	.ribbon-card {
		border: 1px solid rgba(139, 92, 246, 0.25);
		padding: 1.5rem 1.25rem 1.25rem;
		background: rgba(139, 92, 246, 0.03);
	}

	.ribbon-value {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 2.5rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	.ribbon-label {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875rem;
		color: #8b5cf6;
		margin: 0 0 0.625rem;
		text-transform: lowercase;
		letter-spacing: 0.04em;
	}

	.ribbon-detail {
		font-size: 0.8125rem;
		color: #a8a8b2;
		margin: 0;
		line-height: 1.5;
	}

	@media (max-width: 720px) {
		.ribbon {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Diagram ===== */
	.diagram-section {
		margin: 0 0 5rem;
	}

	/* ===== Cases ===== */
	.section-head {
		margin-bottom: 2rem;
	}

	.section-kicker {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		margin: 0 0 0.625rem;
	}

	.section-head h2 {
		font-size: clamp(1.75rem, 3.5vw, 2.5rem);
		font-weight: 500;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0;
		max-width: 28ch;
	}

	.cases {
		margin-bottom: 5rem;
	}

	.case-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.case-link {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 1.5rem;
		padding: 1.5rem 0.75rem 1.5rem 0;
		text-decoration: none;
		color: inherit;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		transition: background-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.case-link:hover {
		background: rgba(139, 92, 246, 0.05);
	}

	.case-link:hover .case-title {
		color: #c4b5fd;
	}

	.case-num {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #8b5cf6;
		margin: 0.25rem 0 0;
		padding-left: 0.5rem;
	}

	.case-title {
		font-size: 1.5rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0 0 0.5rem;
		letter-spacing: -0.015em;
		transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.case-tagline {
		font-size: 1rem;
		color: #c4c4cd;
		margin: 0 0 0.875rem;
		line-height: 1.5;
		max-width: 62ch;
	}

	.case-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.url-pill,
	.stack-tag {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		padding: 0.25rem 0.625rem;
		border: 1px solid rgba(139, 92, 246, 0.25);
		color: #a8a8b2;
	}

	.url-pill {
		color: #c4b5fd;
		border-color: rgba(139, 92, 246, 0.5);
	}

	@media (max-width: 640px) {
		.case-link {
			grid-template-columns: 1fr;
			gap: 0.5rem;
		}
		.case-num {
			padding-left: 0;
		}
	}

	/* ===== Practice teaser ===== */
	.practice-teaser {
		margin-bottom: 5rem;
	}

	.teaser-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}

	.teaser-card {
		display: block;
		padding: 1.5rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		text-decoration: none;
		color: inherit;
		transition:
			background-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
			border-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.teaser-card:hover {
		background: rgba(139, 92, 246, 0.05);
		border-color: rgba(139, 92, 246, 0.4);
	}

	.teaser-card h3 {
		font-size: 1.125rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0 0 0.625rem;
	}

	.teaser-card p {
		font-size: 0.9375rem;
		color: #c4c4cd;
		margin: 0 0 0.875rem;
		line-height: 1.5;
	}

	.teaser-arrow {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
		margin: 0;
	}

	@media (max-width: 720px) {
		.teaser-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Closing ===== */
	.closing {
		margin: 4rem 0 2rem;
		padding: 2.5rem 0;
		border-top: 1px solid rgba(139, 92, 246, 0.25);
		border-bottom: 1px solid rgba(139, 92, 246, 0.25);
	}

	.closing-thesis {
		font-size: clamp(1.5rem, 3vw, 2rem);
		line-height: 1.3;
		font-weight: 400;
		color: #ffffff;
		margin: 0 0 1.75rem;
		max-width: 36ch;
	}

	.closing-thesis em {
		font-style: italic;
		color: #8b5cf6;
	}

	.closing-row {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.625rem;
		margin: 0;
	}

	.closing-row a {
		color: #c4b5fd;
		text-decoration: none;
	}

	.closing-row a:hover {
		color: #ffffff;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.sep {
		color: #4a4a55;
	}

	/* ===== Footer ===== */
	.site-foot {
		margin-top: 3rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #7a7a85;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.site-foot p {
		margin: 0;
	}

	.foot-meta a {
		color: #a8a8b2;
		text-decoration: none;
	}

	.foot-meta a:hover {
		color: #c4b5fd;
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		.case-link,
		.teaser-card {
			transition: none;
		}
	}
</style>
