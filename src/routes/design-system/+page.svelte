<script>
	/**
	 * /design-system — the load-bearing audit gate (per blueprint/03-design-brief.md).
	 *
	 *   "Only rendered code at /design-system is unambiguous. Without
	 *    /design-system, the renovator produces drift."
	 *
	 * Every token in `src/lib/styles/tokens.css` and every composition primitive
	 * in `src/lib/components/compositions/` is rendered live below. New surfaces
	 * get reviewed against this page, not against prose in the brief.
	 *
	 * noindex / nofollow — scaffolding for reviewers, not part of the public IA.
	 */
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import RibbonCard from '$lib/components/compositions/RibbonCard.svelte';
	import CaseStripeItem from '$lib/components/compositions/CaseStripeItem.svelte';
	import TeaserCard from '$lib/components/compositions/TeaserCard.svelte';
	import ToolCard from '$lib/components/compositions/ToolCard.svelte';
	import RuleBlock from '$lib/components/compositions/RuleBlock.svelte';
	import PullQuote from '$lib/components/compositions/PullQuote.svelte';
	import ChannelRow from '$lib/components/compositions/ChannelRow.svelte';
	import PointerRow from '$lib/components/compositions/PointerRow.svelte';
	import Schematic from '$lib/components/Schematic.svelte';

	const colorTokens = [
		{ name: '--color-brand-dark', value: '#0a0a0f', use: 'canvas' },
		{ name: '--color-brand-violet', value: '#8b5cf6', use: 'single saturated accent' },
		{ name: '--color-brand-violet-hover', value: '#a78bfa', use: 'link hover, primary links' },
		{ name: '--color-brand-violet-soft', value: '#c4b5fd', use: 'editorial italic emphasis text' },
		{ name: '--color-brand-light', value: '#f0f0f5', use: 'body text — hue-matched, not pure white' },
		{ name: '--text-primary', value: '#f0f0f5', use: 'headings, foreground text' },
		{ name: '--text-secondary', value: '#c4c4cd', use: 'body prose' },
		{ name: '--text-muted', value: '#a8a8b2', use: 'captions, meta' },
		{ name: '--text-faint', value: '#7a7a85', use: 'footer, deemphasized' },
		{ name: '--text-disabled', value: '#4a4a55', use: 'separator dots, disabled' }
	];

	const typeScale = [
		{ name: '--type-hero', sample: 'Context engineer.', size: 'clamp(3rem, … 5rem)' },
		{ name: '--type-display', sample: 'I instrument the systems', size: 'clamp(2.25, … 3.75rem)' },
		{ name: '--type-h1', sample: 'Five surfaces. One practice.', size: 'clamp(1.875, … 2.75rem)' },
		{ name: '--type-h2', sample: 'Operating rules', size: 'clamp(1.5, … 2rem)' },
		{ name: '--type-h3', sample: 'forge family', size: '1.25rem' },
		{ name: '--type-lead', sample: 'Working practice + open toolchain.', size: '1.125rem' },
		{ name: '--type-body', sample: 'I codified a working practice.', size: '1rem' },
		{ name: '--type-sm', sample: 'codified across 62 projects', size: '0.875rem' },
		{ name: '--type-xs', sample: 'NAV · KICKER · PILL', size: '0.75rem' }
	];

	const spacingScale = [
		{ name: '--space-1', value: '0.25rem' },
		{ name: '--space-2', value: '0.5rem' },
		{ name: '--space-3', value: '0.75rem' },
		{ name: '--space-4', value: '1rem' },
		{ name: '--space-6', value: '1.5rem' },
		{ name: '--space-8', value: '2rem' },
		{ name: '--space-12', value: '3rem' },
		{ name: '--space-16', value: '4rem' },
		{ name: '--space-24', value: '6rem' }
	];

	const motionCurves = [
		{ name: '--dur-fast', value: '150ms', use: 'hover state changes' },
		{ name: '--dur-base', value: '250ms', use: 'card hover, color transitions' },
		{ name: '--dur-slow', value: '500ms', use: 'reveal transitions' },
		{ name: '--dur-hero', value: '800ms', use: 'page hero entrance' },
		{ name: '--ease-out', value: 'cubic-bezier(0.16, 1, 0.3, 1)', use: 'canonical curve' },
		{ name: '--ease-in-out', value: 'cubic-bezier(0.65, 0, 0.35, 1)', use: 'reversible motions' }
	];

	const sampleCase = {
		index: 1,
		slug: 'rally-hq',
		title: 'Rally HQ + Blueprint',
		tagline:
			'A tournament management product and the methodology that produced it — both live, two surfaces.',
		url: 'https://rallyhq.app',
		stack: ['SvelteKit 2', 'Supabase', 'TypeScript', 'Tailwind CSS']
	};
</script>

<svelte:head>
	<title>Design system — Nino Chavez</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<Hero size="compact">
	<p slot="kicker" class="ds-kicker">/design-system</p>
	<svelte:fragment slot="claim">
		The <em>canonical</em> reference.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Every token in <code>tokens.css</code> and every composition primitive in
		<code>src/lib/components/compositions/</code> is rendered live below. New surfaces get reviewed
		against this page, not prose. <strong>Drift surfaces as visible mismatch.</strong>
	</svelte:fragment>
</Hero>

<!-- ───── Tokens · Color ─────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="01 — Tokens">Color</SectionHead>
	<dl class="swatch-grid">
		{#each colorTokens as tok}
			<div class="swatch">
				<div class="swatch-chip" style="background: {tok.value};"></div>
				<dt><code>{tok.name}</code></dt>
				<dd>
					<span class="swatch-value">{tok.value}</span>
					<span class="swatch-use">{tok.use}</span>
				</dd>
			</div>
		{/each}
	</dl>
	<p class="ds-note">
		<strong>Only one saturated accent.</strong> Per DESIGN.md: do not introduce a second brand color.
		Violet is for links, the editorial-italic emphasis word, focus rings, and the single primary CTA
		per viewport.
	</p>
</section>

<!-- ───── Tokens · Type ──────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="02 — Tokens">Typography</SectionHead>
	<p class="ds-lede">
		<strong>Inter everywhere.</strong> Display + body + UI. No serif for prose moments.
		<strong>JetBrains Mono</strong> for kickers, pills, labels, code, schematic-diagram labels — anywhere
		mechanical precision is the register.
	</p>
	<ul class="type-list">
		{#each typeScale as t}
			<li class="type-row">
				<div class="type-meta">
					<code class="type-token">{t.name}</code>
					<span class="type-size">{t.size}</span>
				</div>
				<p class="type-sample" style="font-size: var({t.name});">
					{t.sample}
				</p>
			</li>
		{/each}
	</ul>
</section>

<!-- ───── Tokens · Spacing ───────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="03 — Tokens">Spacing</SectionHead>
	<dl class="spacing-grid">
		{#each spacingScale as s}
			<div class="spacing-row">
				<dt><code>{s.name}</code> · {s.value}</dt>
				<dd>
					<span class="spacing-bar" style="width: {s.value};"></span>
				</dd>
			</div>
		{/each}
	</dl>
</section>

<!-- ───── Tokens · Motion ────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="04 — Tokens">Motion</SectionHead>
	<dl class="motion-list">
		{#each motionCurves as m}
			<div class="motion-row">
				<dt><code>{m.name}</code></dt>
				<dd>
					<span class="motion-value">{m.value}</span>
					<span class="motion-use">{m.use}</span>
				</dd>
			</div>
		{/each}
	</dl>
	<p class="ds-note">
		<strong>Static by default.</strong> Hover transitions on interactive elements; one entrance stagger
		on the homepage credibility ribbon. No continuous or ambient motion. All transitions gated on
		<code>prefers-reduced-motion: no-preference</code>.
	</p>
</section>

<!-- ───── Primitives ─────────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="05 — Primitives">Composition primitives</SectionHead>

	<h3 class="prim-name">Hero (with-thesis variant)</h3>
	<div class="prim-frame">
		<Hero size="compact">
			<p slot="kicker">/example</p>
			<svelte:fragment slot="claim">
				The <em>load-bearing</em> word goes here.
			</svelte:fragment>
			<svelte:fragment slot="subhead">
				One supporting line in lead size. Set the spine the rest of the page proves.
			</svelte:fragment>
		</Hero>
	</div>

	<h3 class="prim-name">SectionHead</h3>
	<div class="prim-frame">
		<SectionHead kicker="01 — Section">Punchy header, restrained.</SectionHead>
	</div>

	<h3 class="prim-name">RibbonCard — credibility-readout-row</h3>
	<div class="prim-frame">
		<div class="ribbon-row">
			<RibbonCard
				value="60+"
				label="projects shipped"
				detail="under ~/Workspace/dev"
			/>
			<RibbonCard value="6" label="open toolchain" detail="six published tools" />
			<RibbonCard
				value="743"
				label="voice signals"
				detail="codified across 62 projects (voice corpus)"
			/>
		</div>
	</div>

	<h3 class="prim-name">CaseStripeItem — case-study-stripe row</h3>
	<div class="prim-frame">
		<ol class="case-list">
			<CaseStripeItem {...sampleCase} />
		</ol>
	</div>

	<h3 class="prim-name">TeaserCard — practice-teaser-panel</h3>
	<div class="prim-frame">
		<div class="teaser-grid">
			<TeaserCard
				title="Toolchain"
				body="Six tools that codify the practice."
				href="/practice#toolchain"
				arrow="/practice#toolchain"
			/>
			<TeaserCard
				title="Operating rules"
				body="Canonical-pattern-first. Default to action."
				href="/practice#rules"
				arrow="/practice#rules"
			/>
			<TeaserCard
				title="Instrumentation"
				body="Three-layer classifier against one failure mode."
				href="/practice#instrumentation"
				arrow="/practice#instrumentation"
			/>
		</div>
	</div>

	<h3 class="prim-name">ToolCard — /practice toolchain row</h3>
	<div class="prim-frame">
		<div class="tool-grid">
			<ToolCard
				name="example-tool"
				subtitle="one-line mono tagline"
				body="Two-sentence body that describes what the tool does without resorting to coined names."
				enforces="the single property that ships when this tool is in the loop."
				href="https://github.com/nino-chavez/example-tool"
			/>
		</div>
	</div>

	<h3 class="prim-name">RuleBlock — operating-rules-stack</h3>
	<div class="prim-frame">
		<RuleBlock
			pill="Rule 0"
			title="Pattern title in sentence case"
			body="The rule body, quoted verbatim from ~/.claude/CLAUDE.md when it's a real operating rule. Bullets are allowed inside; voice stays operational."
			why="The reason the rule exists. Concrete experience, not abstract principle."
		/>
	</div>

	<h3 class="prim-name">PullQuote</h3>
	<div class="prim-frame">
		<PullQuote cite="source label — file or person">
			A short pull-quote that frames a section. Italic violet on emphasis words; mono cite below.
		</PullQuote>
	</div>

	<h3 class="prim-name">ChannelRow — /contact</h3>
	<div class="prim-frame">
		<ChannelRow label="email" value="nino@ninochavez.co" href="mailto:nino@ninochavez.co" />
	</div>

	<h3 class="prim-name">PointerRow — closing-pointer-row</h3>
	<div class="prim-frame">
		<div class="pointer-grid">
			<PointerRow title="Practice" href="/practice">
				One-line caption describing the surface.
			</PointerRow>
			<PointerRow title="Photography" href="https://ninochavez.co/photography" external>
				One-line caption with grounded evidence.
			</PointerRow>
		</div>
	</div>
</section>

<!-- ───── Signature ──────────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="06 — Signature">Schematic-diagram</SectionHead>
	<p class="ds-lede">
		1.5px stroke, no fill, JetBrains Mono labels, violet spine on load-bearing nodes. Hand-drafted
		(not algorithmically generated, not AI image generation). The two diagrams below recur across
		surfaces as visual continuity.
	</p>
	<div class="prim-frame">
		<Schematic
			kind="forge-pipeline"
			caption="forge-pipeline-diagram — appears on /, /practice toolchain, /work/atelier"
		/>
	</div>
	<div class="prim-frame">
		<Schematic
			kind="hesitation-fold"
			caption="hesitation-fold-diagram — appears on /practice instrumentation, /about (small inline)"
		/>
	</div>
</section>

<!-- ───── Layout rules ───────────────────────────────────────────────── -->
<section class="ds-section">
	<SectionHead kicker="07 — Layout">Container + content widths</SectionHead>
	<dl class="layout-list">
		<div>
			<dt><code>--container-max</code> · 72rem</dt>
			<dd>page container. Set in <code>+layout.svelte</code>; do not override per-page.</dd>
		</div>
		<div>
			<dt><code>--content-max</code> · 44rem</dt>
			<dd>prose column for editorial-register sections (≈65ch reading measure).</dd>
		</div>
		<div>
			<dt><code>--prose-max</code> · 42rem</dt>
			<dd>tighter prose, used on the /about lede.</dd>
		</div>
		<div>
			<dt><code>--header-height</code> · 4rem</dt>
			<dd>masthead row height.</dd>
		</div>
	</dl>
	<p class="ds-note">
		Per-page <code>max-width</code> drift is a refactor smell. Use the tokens, or extend the design
		system before adding a new constraint.
	</p>
</section>

<style>
	.ds-kicker {
		margin: 0 0 var(--space-5);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}

	.ds-section {
		margin: var(--space-16) 0;
	}

	.ds-lede {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0 0 var(--space-8);
	}

	.ds-lede :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	.ds-lede :global(code),
	.ds-note :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--text-link-hover);
		padding: 0.0625rem 0.375rem;
		background: rgba(139, 92, 246, 0.1);
		border: 1px solid var(--border-violet);
	}

	.ds-note {
		margin: var(--space-6) 0 0;
		padding: var(--space-4) var(--space-5);
		background: var(--surface-card);
		border-left: 2px solid var(--color-brand-violet);
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.55;
		max-width: var(--content-max);
	}

	.ds-note :global(strong) {
		color: var(--text-primary);
		font-weight: 600;
	}

	/* swatch grid */
	.swatch-grid {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}

	.swatch {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: var(--space-4);
		align-items: center;
		border: 1px solid var(--border-base);
		padding: var(--space-4);
	}

	.swatch-chip {
		width: 3rem;
		height: 3rem;
		border: 1px solid var(--border-base);
	}

	.swatch dt {
		margin: 0;
	}

	.swatch dt code {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link-hover);
	}

	.swatch dd {
		margin: var(--space-1) 0 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.swatch-value {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.swatch-use {
		font-size: var(--type-sm);
		color: var(--text-secondary);
	}

	/* type list */
	.type-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.type-row {
		display: grid;
		grid-template-columns: 18rem 1fr;
		gap: var(--space-6);
		align-items: baseline;
		padding-bottom: var(--space-4);
		border-bottom: 1px solid var(--border-subtle);
	}

	.type-meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.type-token {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-link-hover);
	}

	.type-size {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.type-sample {
		margin: 0;
		color: var(--text-primary);
		line-height: var(--leading-heading);
	}

	@media (max-width: 720px) {
		.type-row {
			grid-template-columns: 1fr;
		}
	}

	/* spacing */
	.spacing-grid {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.spacing-row {
		display: grid;
		grid-template-columns: 14rem 1fr;
		gap: var(--space-4);
		align-items: center;
	}

	.spacing-row dt {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
	}

	.spacing-row dt code {
		color: var(--text-link-hover);
	}

	.spacing-row dd {
		margin: 0;
	}

	.spacing-bar {
		display: block;
		height: 0.75rem;
		background: var(--color-brand-violet);
	}

	/* motion */
	.motion-list {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		max-width: var(--content-max);
	}

	.motion-row {
		display: grid;
		grid-template-columns: 12rem 1fr;
		gap: var(--space-4);
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border-subtle);
		align-items: baseline;
	}

	.motion-row dt {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
	}

	.motion-row dt code {
		color: var(--text-link-hover);
	}

	.motion-row dd {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.motion-value {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
	}

	.motion-use {
		font-size: var(--type-sm);
		color: var(--text-muted);
	}

	/* primitives */
	.prim-name {
		margin: var(--space-8) 0 var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
		font-weight: 500;
	}

	.prim-frame {
		padding: var(--space-6);
		border: 1px dashed var(--border-base);
	}

	.ribbon-row {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.teaser-grid,
	.pointer-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-4);
	}

	.tool-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-5);
	}

	.case-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--border-subtle);
	}

	@media (max-width: 720px) {
		.ribbon-row,
		.teaser-grid,
		.pointer-grid {
			grid-template-columns: 1fr;
		}
	}

	/* layout list */
	.layout-list {
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: var(--content-max);
	}

	.layout-list > div {
		display: grid;
		grid-template-columns: 18rem 1fr;
		gap: var(--space-4);
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border-subtle);
		align-items: baseline;
	}

	.layout-list dt {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
	}

	.layout-list dt code {
		color: var(--text-link-hover);
	}

	.layout-list dd {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.layout-list dd :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--text-link-hover);
	}

	@media (max-width: 720px) {
		.layout-list > div {
			grid-template-columns: 1fr;
		}
	}
</style>
