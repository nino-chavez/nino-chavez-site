<script>
	// engage-hero composition — single line per DESIGN-PRINCIPLES §1.
	// Form deferred; no Cal.com integration ever.
</script>

<svelte:head>
	<title>Contact — Nino Chavez</title>
	<meta
		name="description"
		content="I'm not selling services. I respond to interesting work."
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
			<a href="/about">about</a>
			<a href="/contact" aria-current="page">contact</a>
		</nav>
		<p class="masthead-caption">context engineer · chicago</p>
	</header>

	<section class="hero">
		<p class="kicker">/contact</p>
		<h1 class="claim">
			I'm <em>not</em> selling services. I respond to interesting work.
		</h1>
		<p class="subhead">
			Email is the primary channel. GitHub for repo conversations. LinkedIn for everything else.
		</p>
	</section>

	<section class="channels">
		<a class="channel" href="mailto:nino@ninochavez.co">
			<span class="channel-label">email</span>
			<span class="channel-value">nino@ninochavez.co</span>
		</a>
		<a class="channel" href="https://github.com/nino-chavez" rel="noopener" target="_blank">
			<span class="channel-label">github</span>
			<span class="channel-value">github.com/nino-chavez</span>
		</a>
		<a
			class="channel"
			href="https://www.linkedin.com/in/nino-chavez/"
			rel="noopener"
			target="_blank"
		>
			<span class="channel-label">linkedin</span>
			<span class="channel-value">linkedin.com/in/nino-chavez</span>
		</a>
	</section>

	<footer class="site-foot">
		<p>© {new Date().getFullYear()} Nino Chavez · Chicago</p>
		<p class="foot-meta">
			<a href="/blueprint">/blueprint</a>
		</p>
	</footer>
</main>

<style>
	.site {
		max-width: 56rem;
		margin: 0 auto;
		padding: 2rem 1.5rem 4rem;
		font-family: 'Inter', system-ui, sans-serif;
		color: #e5e5ea;
		background: #0a0a0f;
	}

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

	.hero {
		padding: 2rem 0 3rem;
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
		max-width: 28ch;
	}

	.claim em {
		font-style: italic;
		color: #8b5cf6;
	}

	.subhead {
		font-size: 1rem;
		line-height: 1.55;
		color: #a8a8b2;
		max-width: 56ch;
		margin: 0;
	}

	.channels {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		margin: 2rem 0 4rem;
	}

	.channel {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: 1.5rem;
		padding: 1rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		text-decoration: none;
		color: inherit;
		transition: border-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.channel:hover {
		border-color: rgba(139, 92, 246, 0.5);
	}

	.channel-label {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.channel-value {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.9375rem;
		color: #c4b5fd;
		word-break: break-all;
	}

	.channel:hover .channel-value {
		color: #ffffff;
	}

	@media (max-width: 640px) {
		.channel {
			grid-template-columns: 1fr;
			gap: 0.25rem;
		}
	}

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
		.channel {
			transition: none;
		}
	}
</style>
