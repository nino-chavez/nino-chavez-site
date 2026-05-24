<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import PointerRow from '$lib/components/compositions/PointerRow.svelte';
</script>

<svelte:head>
	<title>About — Nino Chavez</title>
	<meta
		name="description"
		content="Nino Chavez. Chicago. Product Architect at commerce.com. Independent work: an open toolchain and case studies for AI-assisted software development."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/about</p>
	<svelte:fragment slot="claim">
		I'm Nino. I <em>codified</em> how to ship software with AI agents, and I run the practice in
		public.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Chicago. Product Architect at commerce.com. The work on this site is my own — built solo,
		evenings and weekends, with the toolchain documented in <a href="/practice">/practice</a>.
	</svelte:fragment>
</Hero>

<section class="narrative">
	<p>
		I've been writing code since 1999. Twenty-five years in commerce platform architecture taught
		me how large systems hold together — and how teams fail to keep them together. The job I do at
		commerce.com is product architect on a real platform with real customers; the writing and tools
		on this site are what I've built independently in parallel.
	</p>

	<p>
		What changed for me around late 2024 was realizing that AI coding agents are not a faster
		autocomplete. They're a different working unit — closer to a junior engineer with no memory
		and no opinions. Productive use requires the same things productive teams have always needed:
		clear specs, conventions, decision logs, guardrails, and a record of what was tried. So I
		started building those — a five-link production line that takes intent through spec
		(<code>specchain</code>) and archetype routing (<code>big-blueprint</code>) into a typed
		design system (<code>forge-brand</code>) and voiced prose and imagery
		(<code>forge-signal</code>, <code>gen-images</code>). The chain is the lathe; the case studies
		are what came off it. The single public piece is
		<a href="https://github.com/nino-chavez/ai-champions-kit" rel="noopener"
			>ai-champions-kit</a
		> — the practice packaged for others. <a href="/practice">/practice</a> has the full inventory.
	</p>

	<p>
		The shorthand for that is <em>context engineer</em>. The work isn't novel prompts or clever
		models — it's the surrounding system: the rules a session inherits, the artifacts it produces,
		the hooks that catch failure modes, the corpus that pulls forward what worked before. Most
		engineers configure Claude. I instrument it. That's the line; the rest of this site is the
		proof.
	</p>
</section>

<section class="pointers">
	<PointerRow title="Practice" href="/practice">
		Toolchain, operating rules, instrumentation.
	</PointerRow>
	<PointerRow title="Photography" href="https://ninochavez.co/photography" external>
		20K action-sports photos. AAA accessibility. Custom album-zip worker. Not a hobby — the craft
		dimension of the same practice.
	</PointerRow>
	<PointerRow title="Writing" href="https://blog.ninochavez.co" external>
		Signal Dispatch, where I publish the things that don't fit on a case-study card.
	</PointerRow>
</section>

<section class="contact-row">
	<p>
		contact
		<span class="sep">·</span>
		<a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a>
		<span class="sep">·</span>
		<a href="https://github.com/nino-chavez" rel="noopener">github.com/nino-chavez</a>
		<span class="sep">·</span>
		<a href="https://www.linkedin.com/in/nino-chavez/" rel="noopener">linkedin.com/in/nino-chavez</a>
	</p>
</section>

<style>
	.narrative {
		max-width: var(--prose-max);
		margin: 0 0 var(--space-20);
		font-size: var(--type-lead);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
	}

	.narrative p {
		margin: 0 0 var(--space-6);
	}

	.narrative p:last-child {
		margin-bottom: 0;
	}

	.narrative em {
		font-style: italic;
		color: var(--text-link-hover);
	}

	.narrative a {
		color: var(--text-link);
		text-decoration: none;
	}

	.narrative a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.pointers {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-6);
		margin-bottom: var(--space-12);
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
	}

	@media (max-width: 720px) {
		.pointers {
			grid-template-columns: 1fr;
		}
	}

	.contact-row {
		padding-top: var(--space-8);
		border-top: 1px solid var(--border-subtle);
	}

	.contact-row p {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-muted);
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		align-items: center;
	}

	.contact-row a {
		color: var(--text-link-hover);
		text-decoration: none;
	}

	.contact-row a:hover {
		color: var(--text-primary);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.sep {
		color: var(--text-disabled);
	}
</style>
