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
		Where the toolchain came from: March 2026. About ten months after I'd started taking AI
		coding agents seriously, I built a Pricing &amp; Packaging initiative for a commerce
		platform — 11 prototype pages, an AI billing agent with 8 tools, 4 strategy documents
		validated against production code, 30+ cited sources. About 48 hours of work, mostly
		prompts. Zero lines of code or copy by hand. The artifacts shipped. The interesting
		question came around hour 18: <em>can this happen again from a template, without me in the
		feedback loop?</em> That extracted into <code>big-blueprint</code>, A/B'd at 70–80% quality
		in 10–15× less time, then ran on <code>bc-subscriptions</code>, <code>rally-hq</code>, and
		the redesign of this site. Each pass made the chain sharper.
	</p>

	<p>
		The chain is the lathe: <code>specchain</code> (intent → spec → tasks) →
		<code>big-blueprint</code> (archetype routing) → <code>forge-brand</code> (typed design
		system) → <code>forge-signal</code> (voiced prose) → <code>gen-images</code> (visuals).
		Five links, each consuming the prior link's output. The single public piece is
		<a href="https://github.com/nino-chavez/ai-champions-kit" rel="noopener">ai-champions-kit</a> —
		the practice packaged for others. <a href="/practice">/practice</a> has the full inventory.
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
		20K action-sports photos. AA accessibility. Custom album-zip worker. Not a hobby — the craft
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
