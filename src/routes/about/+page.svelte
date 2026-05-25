<script>
	import Hero from '$lib/components/Hero.svelte';
	import ChannelRow from '$lib/components/ChannelRow.svelte';
	import PointerRow from '$lib/components/PointerRow.svelte';

	const channels = [
		{ label: 'nino@ninochavez.co', href: 'mailto:nino@ninochavez.co' },
		{ label: 'github.com/nino-chavez', href: 'https://github.com/nino-chavez' },
		{ label: 'linkedin.com/in/ninochavez', href: 'https://www.linkedin.com/in/ninochavez/' }
	];

	const closingPointers = [
		{ title: '/practice', href: '/practice', description: 'The codified practice' },
		{ title: '/work', href: '/work', description: 'The catalog the practice produced' },
		{ title: 'photography.ninochavez.co', href: 'https://photography.ninochavez.co', description: 'Volleyball-action + commercial photography' }
	];
</script>

<svelte:head>
	<title>About — Nino Chavez</title>
	<meta name="description" content="Product Architect at commerce.com. Codifies the practice through the blueprint methodology; publishes the receipts." />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="/about">
			Nino Chavez. I codify the <em>practice</em>, then publish the receipts.
			<svelte:fragment slot="sub">
				Product Architect at commerce.com by day. The practice — instrumented agent work,
				documented through a methodology called <code>blueprint</code> — runs through
				everything else.
			</svelte:fragment>
		</Hero>
	</section>

	<div class="container narrative">

		<article class="narrative-block">
			<p class="narrative-tag">Who · the lede</p>
			<p>
				I work at the intersection of product architecture, agentic-software engineering, and
				a slowly-codified discipline I now call <em>context engineering</em>. The day job is
				at commerce.com, where I architect against BigCommerce-platform systems. The orbit
				around it is what this site exists to surface.
			</p>
			<p>
				The orbit: a public methodology (<a href="https://github.com/nino-chavez/blueprint" rel="noopener"><code>github.com/nino-chavez/blueprint</code></a>),
				a six-lathe production line (<a href="https://github.com/nino-chavez/forge" rel="noopener"><code>github.com/nino-chavez/forge</code></a>),
				a 275-artifact writing corpus at <a href="https://blog.ninochavez.co" rel="noopener">blog.ninochavez.co</a>,
				and a portfolio of agent-assisted side projects ranging from a 12-tool MCP architecture
				(<a href="/work/ai-products/atelier">Atelier</a>) to a tournament-management platform
				paired with its own blueprint deploy (<a href="https://rallyhq.app" rel="noopener">rally-hq.app</a>).
			</p>
		</article>

		<article class="narrative-block">
			<p class="narrative-tag">What changed · the inflection</p>
			<p>
				The v2 of this site framed the work as polymath — software, photography, music, and
				writing as four co-equal interests in a 2×2 grid. That framing was honest about the
				breadth but wrong about the structure. The breadth isn't four parallel interests; it's
				a single discipline (build agent-assisted systems that produce verifiable artifacts)
				with documentation surfaces in different media.
			</p>
			<p>
				The shift is encoded in <code>ADR-0001</code> on this repo: context-engineer positioning
				over polymath framing. The receipts followed — the <code>forge</code> umbrella went
				public, the blueprint methodology got formal staging (diagnose → prescribe → design →
				portal), and the surface area went from 9 case studies on v2 to 8 clusters spanning
				69 repos + 17 deploys + 275 artifacts on v3. The cluster IA on <a href="/work">/work</a>
				exists because the v2 surface hid 88% of the work.
			</p>
		</article>

		<article class="narrative-block">
			<p class="narrative-tag">What now · the practice</p>
			<p>
				The practice has four operational layers: declarative rules in <code>~/.claude/CLAUDE.md</code>,
				prompt-time hooks that load context (the Poe voice stack arrives this way), stop-time
				audits that catch hesitation patterns before they ship, and session-mining tools that
				rebuild the Poe stack from every prior transcript. The hesitation-fold diagram on
				<a href="/practice">/practice</a> is what it looks like wired together.
			</p>
			<p>
				The instrumented part is the point. The agents aren't doing the thinking — they're
				doing the executing, against a stack that predicts where I'd want to redirect and
				catches places I haven't redirected explicitly. Every claim on this site grounds to
				a real repo path or commit; that's the only positioning that survives contact with
				someone evaluating whether the receipts are real.
			</p>
		</article>

		<aside class="channels-aside">
			<p class="channels-tag">Channels</p>
			<ChannelRow channels={channels} />
		</aside>

		<footer class="about-footer">
			<PointerRow pointers={closingPointers} />
		</footer>

	</div>
</main>

<style>
	main { padding-bottom: var(--space-16); }

	.narrative {
		max-width: var(--container-prose);
	}

	.narrative-block {
		padding-block: var(--space-8);
		border-bottom: var(--border-1) solid var(--border-subtle);
	}

	.narrative-block:last-of-type { border-bottom: none; }

	.narrative-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-3);
	}

	.narrative-block p {
		font-size: var(--type-base);
		color: var(--text-primary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
	}

	.narrative-block p:last-child { margin-bottom: 0; }

	.narrative-block code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--brand-400);
		background: var(--surface-1);
		padding: 1px 4px;
	}

	.narrative-block a {
		color: var(--brand-400);
		text-decoration: none;
		border-bottom: var(--border-1) solid var(--border-strong);
	}

	.narrative-block a:hover {
		color: var(--brand-300);
		border-bottom-color: var(--brand-500);
	}

	.narrative-block :global(em) {
		font-style: italic;
		color: var(--brand-500);
	}

	.channels-aside {
		margin-top: var(--space-12);
		padding-top: var(--space-6);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.channels-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-3);
	}

	.about-footer {
		margin-top: var(--space-12);
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}
</style>
