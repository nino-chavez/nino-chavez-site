<script>
	// hero-with-thesis → narrative-prose-block → closing-pointer-row
	// Source: blueprint/content/about.md
</script>

<svelte:head>
	<title>About — Nino Chavez</title>
	<meta
		name="description"
		content="Nino Chavez. Chicago. Product Architect at commerce.com. Independent work: an open toolchain and case studies for AI-assisted software development."
	/>
</svelte:head>

<main class="site">
	<header class="masthead">
		<a href="/" class="monogram" aria-label="Nino Chavez — home">
			<span>nc</span><span class="dot">.</span>
		</a>
		<nav class="topnav" aria-label="Primary">
			<a href="/work">work</a>
			<a href="/practice">practice</a>
			<a href="https://blog.ninochavez.co" rel="noopener">writing</a>
			<a href="/about" aria-current="page">about</a>
			<a href="/contact">contact</a>
		</nav>
		<p class="masthead-caption">context engineer · chicago</p>
	</header>

	<!-- ============================================================
		 Hero
		============================================================ -->
	<section class="hero">
		<p class="kicker">/about</p>
		<h1 class="claim">
			I'm Nino. I <em>codified</em> how to ship software with AI agents, and I run the practice
			in public.
		</h1>
		<p class="subhead">
			Chicago. Product Architect at commerce.com. The work on this site is my own — built solo,
			evenings and weekends, with the toolchain documented in
			<a href="/practice">/practice</a>.
		</p>
	</section>

	<!-- ============================================================
		 Narrative prose
		============================================================ -->
	<section class="narrative">
		<p>
			I've been writing code since 1999. Twenty-five years in commerce platform architecture
			taught me how large systems hold together — and how teams fail to keep them together. The
			job I do at commerce.com is product architect on a real platform with real customers; the
			writing and tools on this site are what I've built independently in parallel.
		</p>

		<p>
			What changed for me around late 2024 was realizing that AI coding agents are not a faster
			autocomplete. They're a different working unit — closer to a junior engineer with no
			memory and no opinions. Productive use requires the same things productive teams have
			always needed: clear specs, conventions, decision logs, guardrails, and a record of what
			was tried. So I started building those: a spec-driven workflow
			(<code>specchain</code>), a brand-kit-to-site pipeline (the forge family), a session voice
			corpus (<code>claude-recall-cli</code> + the Poe stack), an open governance layer for code
			generation (AEGIS), a planning methodology (<code>big-blueprint</code>). The toolchain is
			the practice. The case studies are what came out of using it.
		</p>

		<p>
			The shorthand for that is <em>context engineer</em>. The work isn't novel prompts or
			clever models — it's the surrounding system: the rules a session inherits, the artifacts
			it produces, the hooks that catch failure modes, the corpus that pulls forward what worked
			before. Most engineers configure Claude. I instrument it. That's the line; the rest of
			this site is the proof.
		</p>
	</section>

	<!-- ============================================================
		 Closing pointer row
		============================================================ -->
	<section class="pointers">
		<div class="pointer">
			<h2><a href="/practice">Practice →</a></h2>
			<p>Toolchain, operating rules, instrumentation.</p>
		</div>
		<div class="pointer">
			<h2>
				<a href="https://ninochavez.co/photography" rel="noopener">Photography →</a>
			</h2>
			<p>
				20K action-sports photos. AAA accessibility. Custom album-zip worker. Not a hobby — the
				production craft side of the practice.
			</p>
		</div>
		<div class="pointer">
			<h2>
				<a href="https://blog.ninochavez.co" rel="noopener">Writing →</a>
			</h2>
			<p>Signal Dispatch, where I publish the things that don't fit on a case-study card.</p>
		</div>
	</section>

	<section class="contact-row">
		<p>
			contact
			<span class="sep">·</span>
			<a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a>
			<span class="sep">·</span>
			<a href="https://github.com/nino-chavez" rel="noopener">github.com/nino-chavez</a>
			<span class="sep">·</span>
			<a href="https://www.linkedin.com/in/nino-chavez/" rel="noopener"
				>linkedin.com/in/nino-chavez</a
			>
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
		max-width: 64rem;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
		font-family: 'Inter', system-ui, sans-serif;
		color: #e5e5ea;
		background: #0a0a0f;
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

	.topnav a:hover,
	.topnav a[aria-current='page'] {
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
		padding: 2rem 0 4rem;
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
		font-size: clamp(1.875rem, 4.5vw, 3rem);
		line-height: 1.15;
		letter-spacing: -0.02em;
		font-weight: 500;
		margin: 0 0 1.5rem;
		color: #ffffff;
		max-width: 32ch;
	}

	.claim em {
		font-style: italic;
		color: #8b5cf6;
		font-weight: 500;
	}

	.subhead {
		font-size: 1rem;
		line-height: 1.55;
		color: #a8a8b2;
		max-width: 56ch;
		margin: 0;
	}

	.subhead a {
		color: #c4b5fd;
		text-decoration: none;
	}

	.subhead a:hover {
		color: #ffffff;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	/* ===== Narrative ===== */
	.narrative {
		max-width: 44rem;
		margin: 0 0 5rem;
		font-size: 1.0625rem;
		line-height: 1.75;
		color: #c4c4cd;
	}

	.narrative p {
		margin: 0 0 1.5rem;
	}

	.narrative p:last-child {
		margin-bottom: 0;
	}

	.narrative em {
		font-style: italic;
		color: #c4b5fd;
	}

	.narrative code {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875em;
		color: #c4b5fd;
		background: rgba(139, 92, 246, 0.1);
		border: 1px solid rgba(139, 92, 246, 0.2);
		padding: 0.0625rem 0.375rem;
	}

	/* ===== Pointers ===== */
	.pointers {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
		margin-bottom: 3rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.pointer h2 {
		font-size: 1.0625rem;
		font-weight: 500;
		margin: 0 0 0.5rem;
		letter-spacing: -0.01em;
	}

	.pointer h2 a {
		color: #ffffff;
		text-decoration: none;
		transition: color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.pointer h2 a:hover {
		color: #c4b5fd;
	}

	.pointer p {
		font-size: 0.875rem;
		color: #a8a8b2;
		margin: 0;
		line-height: 1.55;
	}

	@media (max-width: 720px) {
		.pointers {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Contact row ===== */
	.contact-row {
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.contact-row p {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875rem;
		color: #a8a8b2;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.contact-row a {
		color: #c4b5fd;
		text-decoration: none;
	}

	.contact-row a:hover {
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

	@media (prefers-reduced-motion: reduce) {
		.topnav a,
		.pointer h2 a {
			transition: none;
		}
	}
</style>
