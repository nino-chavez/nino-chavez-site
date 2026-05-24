<script>
	import Schematic from '$lib/components/Schematic.svelte';

	const toolchain = [
		{
			name: 'forge family',
			subtitle: 'forge-brand · forge-signal · forge-site · gen-images',
			body: 'One brand-kit JSON drives tokens, copy, images, and a site archetype. Four CLIs chain together: brand definition → CSS variables → voiced content → imagery → archetype-instantiated site.',
			enforces:
				'brand drift is mechanically impossible — every downstream artifact resolves to one source-of-truth JSON.',
			href: 'https://github.com/nino-chavez/forge-brand'
		},
		{
			name: 'specchain',
			subtitle: 'spec-driven workflow',
			body: 'Spec-driven development workflow for AI-assisted coding. Execution profiles, crash recovery, traceability between spec and implementation, multi-agent handoffs.',
			enforces:
				'the spec is the durable artifact; the implementation is derived. Spec drift surfaces as test failure, not whisper-network observation.',
			href: 'https://github.com/nino-chavez/specchain'
		},
		{
			name: 'AEGIS Framework',
			subtitle: 'v2.5.0 · constitutional governance',
			body: 'Governance layer for AI code generation. Plan gating (MVP / Surgical / Systemic), self-healing blueprint engine, evolution-story tracking, cross-framework learning.',
			enforces:
				'every AI-generated change passes through plan classification + validation + evolution tracking before it lands.',
			href: 'https://github.com/signal-x-studio/aegis-framework'
		},
		{
			name: 'claude-recall-cli + Poe stack',
			subtitle: '743 signals · 62 projects',
			body: 'Global /recall slash commands plus the voice-stack generator that builds the character sheet at the top of every session. SQLite + FTS5; same schema as the QuantifAI commercial product.',
			enforces:
				'corrections survive the session — past corrections inform future drafts, with measurable tone metrics as evidence the loop is closed.',
			href: 'https://github.com/nino-chavez/claude-recall-cli'
		},
		{
			name: 'ai-champions-kit',
			subtitle: '10 skills · 5 subagents · 5 templates',
			body: 'Shared Claude Code skills + subagents packaged for installation by others. The practice transferred to other practitioners as a kit.',
			enforces:
				"the practice is reproducible, not personal. If it only works for me, it isn't a practice.",
			href: 'https://github.com/nino-chavez/ai-champions-kit'
		},
		{
			name: 'big-blueprint',
			subtitle: '7-stage methodology · used by rally-hq, bc-subscriptions',
			body: '7-stage agent-assisted methodology for product-planning initiatives. Research → design principles → prototype → fact-check → docs → deploy → iterate.',
			enforces:
				'every product decision has a recorded source in the synthesis layer; planning state derives from artifacts, not whiteboard memory.',
			href: 'https://github.com/nino-chavez/big-blueprint'
		}
	];

	const rules = [
		{
			label: 'Rule 1',
			title: 'Canonical-pattern-first for infrastructure',
			body: `When implementing infrastructure with a well-known canonical pattern — auth, payments, OAuth, sessions, queues, webhooks, file uploads, anything where the vendor publishes "the right way to do this" — default to the canonical pattern. Custom shapes must justify themselves explicitly against the canonical baseline.`,
			why: `A pre-spec check forces two reads — vendor docs + existing internal reference impl — before a custom shape ships. The "why not canonical" sentence in the spec is non-negotiable. Silence is not an acceptable answer.`
		},
		{
			label: 'Rule 2',
			title: 'Default to action, not confirmation',
			body: `Don't pause to ask which direction to take when the direction is obvious from the conversation. If we've been working on X and there's a natural next step on X, take it. Mid-task "continue or pause?" questions kill flow and read as timidity, not care. The user can interrupt at any time; they can't recover the time spent waiting for a green light on something that didn't need one.`,
			why: `Three layers reinforce this rule — the declarative text in CLAUDE.md, a UserPromptSubmit hook that injects voice context predictively before Claude generates a response, and a Stop hook that blocks turns ending with hesitation patterns. See Instrumentation below.`
		},
		{
			label: 'Rule 3',
			title: 'Multi-session work isolation (worktrees mandatory)',
			body: `Any time more than one session has independent work in flight against the same repo, each session MUST operate in its own git worktree. For Agent tool invocations: pass isolation: "worktree". No-change worktrees auto-clean; changed worktrees return path + branch in the result.`,
			why: `Without this, parallel sessions switch each other's branches under each other's feet and commits land on the wrong branch. The rule is operational evidence of working at agent scale — not a theoretical concern.`
		},
		{
			label: 'Rule 4',
			title: 'Voice stack imports',
			body: `CLAUDE.md uses @~/path syntax to import poe-preamble.md + stack.md into every session. The serialized voice context is part of every prompt, not optional context.`,
			why: `The corpus only enforces voice if it's actually loaded. The import syntax makes that automatic.`
		}
	];

	const corpusStats = [
		{ label: 'Corpus size', value: '743', detail: 'signals' },
		{ label: 'Project coverage', value: '62', detail: 'projects' },
		{ label: 'Median sentence length', value: '12', detail: 'words (p90: 30)' },
		{ label: 'Hedge rate', value: '10.6%', detail: 'target: declining' },
		{ label: 'Cheerleading rate', value: '1.7%', detail: 'target: declining' },
		{ label: 'Imperative-opener rate', value: '11.7%', detail: 'target: rising' },
		{ label: 'Validated turns (no correction)', value: '6,397', detail: '' }
	];
</script>

<svelte:head>
	<title>Practice — Nino Chavez</title>
	<meta
		name="description"
		content="The differentiator page: six published tools, four operating rules, a three-layer hesitation fold, and a 743-signal voice corpus. Every claim links to a public artifact."
	/>
</svelte:head>

<main class="site">
	<header class="masthead">
		<a href="/" class="monogram" aria-label="Nino Chavez — home">
			<span>nc</span><span class="dot">.</span>
		</a>
		<nav class="topnav" aria-label="Primary">
			<a href="/work">work</a>
			<a href="/practice" aria-current="page">practice</a>
			<a href="https://blog.ninochavez.co" rel="noopener">writing</a>
			<a href="/about">about</a>
			<a href="/contact">contact</a>
		</nav>
		<p class="masthead-caption">context engineer · chicago</p>
	</header>

	<!-- ============================================================
		 Hero
		============================================================ -->
	<section class="hero">
		<p class="kicker">/practice</p>
		<h1 class="claim">This is <em>how</em> I work.</h1>
		<p class="subhead">
			Every claim on this page links to a public artifact. No methodology that isn't running.
			No tool that hasn't shipped. No rule that hasn't caught a real failure.
		</p>
	</section>

	<!-- ============================================================
		 Toolchain
		============================================================ -->
	<section id="toolchain" class="section">
		<header class="section-head">
			<p class="section-kicker">01 — Toolchain</p>
			<h2>Six tools that codify the practice.</h2>
		</header>
		<div class="tool-grid">
			{#each toolchain as tool}
				<article class="tool-card">
					<h3 class="tool-name">{tool.name}</h3>
					<p class="tool-subtitle">{tool.subtitle}</p>
					<p class="tool-body">{tool.body}</p>
					<p class="tool-enforces">
						<span class="enforces-label">Enforces:</span> {tool.enforces}
					</p>
					<a class="tool-link" href={tool.href} rel="noopener" target="_blank">
						→ {tool.href.replace('https://', '')}
					</a>
				</article>
			{/each}
		</div>
	</section>

	<!-- ============================================================
		 Operating rules
		============================================================ -->
	<section id="rules" class="section">
		<header class="section-head">
			<p class="section-kicker">02 — Operating rules</p>
			<h2>Four rules from <code>~/.claude/CLAUDE.md</code>.</h2>
		</header>
		<div class="rules-stack">
			{#each rules as rule}
				<article class="rule">
					<header class="rule-head">
						<span class="rule-pill">{rule.label}</span>
						<h3 class="rule-title">{rule.title}</h3>
					</header>
					<blockquote class="rule-body">
						{rule.body}
					</blockquote>
					<aside class="rule-why">
						<p><em>Why:</em> {rule.why}</p>
					</aside>
				</article>
			{/each}
		</div>
	</section>

	<!-- ============================================================
		 Instrumentation
		============================================================ -->
	<section id="instrumentation" class="section">
		<header class="section-head">
			<p class="section-kicker">03 — Instrumentation</p>
			<h2>One classifier. Three lifecycle points.</h2>
		</header>

		<div class="instrumentation-block">
			<Schematic
				kind="hesitation-fold"
				caption="The same classify_situation() runs at prompt-submit (predict), at end-of-turn (enforce), and at session-end (extract). New patterns added to the classifier are automatically caught by all three layers."
			/>

			<blockquote class="pull-quote">
				"Stop hook feedback: You ended your turn with a hesitation question — exactly the pattern
				that the CLAUDE.md 'decision bias' rule prohibits. Restate your closing as a status
				sentence describing the next move you're taking."
				<cite>— ~/.claude/hooks/anti-hesitation.py block message, verbatim</cite>
			</blockquote>
		</div>

		<div class="corpus-readout">
			<h3 class="corpus-heading">Poe corpus — quantitative voice card</h3>
			<dl class="corpus-list">
				{#each corpusStats as stat}
					<div class="corpus-row">
						<dt>{stat.label}</dt>
						<dd>
							<span class="corpus-value">{stat.value}</span>
							{#if stat.detail}<span class="corpus-detail">{stat.detail}</span>{/if}
						</dd>
					</div>
				{/each}
			</dl>
			<p class="corpus-caption">
				Distilled from corrections in past sessions. The metrics are how I know the corpus is
				doing what it's supposed to do.
			</p>
		</div>

		<aside class="adversarial">
			<h3>The adversarial test plan</h3>
			<blockquote>
				"The deterministic surfaces (classifiers, query, extraction) have unit tests. This
				document tests the harder claim: <em>does the prompt hook actually change how Claude
				responds?</em>"
				<cite>— ~/.claude/poe/adversarial-test-plan.md</cite>
			</blockquote>
			<p class="adversarial-caption">
				A documented control-versus-treatment protocol that proves the loop is closed. Most "I
				prompt Claude well" claims aren't testable. This one is.
			</p>
			<a class="tool-link" href="https://github.com/nino-chavez/claude-recall-cli" rel="noopener" target="_blank">
				→ github.com/nino-chavez/claude-recall-cli
			</a>
		</aside>
	</section>

	<!-- ============================================================
		 Topology footnote
		============================================================ -->
	<section class="topology">
		<p>
			<span class="topology-label">Topology footnote.</span> ninochavez.co is served by a Cloudflare
			Worker (<code>ninochavez-router</code>, 47 lines) that routes the apex, <code>/photography</code>,
			and <code>/blog</code> through one entry point with 301s for the old subdomains. The router is
			its own artifact —
			<a
				href="https://github.com/nino-chavez/nino-chavez-site/tree/main/apps/router"
				rel="noopener"
				target="_blank">github.com/nino-chavez/nino-chavez-site/tree/main/apps/router</a
			>.
		</p>
	</section>

	<footer class="site-foot">
		<p>© {new Date().getFullYear()} Nino Chavez · Chicago</p>
		<p class="foot-meta">
			<a href="/blueprint">/blueprint</a>
			<span class="sep">·</span>
			<a href="/api/expertise.json">/api/expertise.json</a>
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

	/* ===== Masthead — shared pattern with homepage ===== */
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
		font-size: clamp(2.5rem, 6vw, 4.5rem);
		line-height: 1.05;
		letter-spacing: -0.025em;
		font-weight: 500;
		margin: 0 0 1.5rem;
		color: #ffffff;
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
		max-width: 56ch;
		margin: 0;
	}

	/* ===== Sections ===== */
	.section {
		margin: 5rem 0;
	}

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
		max-width: 32ch;
	}

	.section-head h2 code {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.85em;
		color: #c4b5fd;
		background: rgba(139, 92, 246, 0.1);
		padding: 0.125rem 0.375rem;
		border: 1px solid rgba(139, 92, 246, 0.25);
	}

	/* ===== Toolchain ===== */
	.tool-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.25rem;
	}

	.tool-card {
		border: 1px solid rgba(255, 255, 255, 0.08);
		padding: 1.5rem 1.5rem 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}

	.tool-name {
		font-size: 1.125rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0;
	}

	.tool-subtitle {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
		margin: 0 0 0.25rem;
		letter-spacing: 0.02em;
	}

	.tool-body {
		font-size: 0.9375rem;
		color: #c4c4cd;
		margin: 0;
		line-height: 1.55;
	}

	.tool-enforces {
		font-size: 0.875rem;
		color: #a8a8b2;
		margin: 0.5rem 0;
		padding: 0.625rem 0.875rem;
		border-left: 2px solid #8b5cf6;
		background: rgba(139, 92, 246, 0.04);
		line-height: 1.5;
	}

	.enforces-label {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #c4b5fd;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-right: 0.375rem;
	}

	.tool-link {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #a78bfa;
		text-decoration: none;
		margin-top: auto;
		word-break: break-all;
	}

	.tool-link:hover {
		color: #c4b5fd;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	@media (max-width: 720px) {
		.tool-grid {
			grid-template-columns: 1fr;
		}
	}

	/* ===== Rules ===== */
	.rules-stack {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.rule {
		border-top: 1px solid rgba(139, 92, 246, 0.2);
		padding-top: 1.5rem;
	}

	.rule-head {
		display: flex;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.rule-pill {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #c4b5fd;
		padding: 0.25rem 0.625rem;
		border: 1px solid rgba(139, 92, 246, 0.4);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.rule-title {
		font-size: 1.25rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0;
		letter-spacing: -0.015em;
	}

	.rule-body {
		margin: 0 0 1rem;
		padding: 0;
		font-size: 1rem;
		line-height: 1.65;
		color: #c4c4cd;
		max-width: 64ch;
		border-left: none;
		font-style: normal;
	}

	.rule-why {
		margin: 0;
		padding: 0.75rem 1rem;
		background: rgba(139, 92, 246, 0.05);
		border-left: 2px solid #8b5cf6;
		max-width: 64ch;
	}

	.rule-why p {
		margin: 0;
		font-size: 0.9375rem;
		color: #a8a8b2;
		line-height: 1.55;
	}

	.rule-why em {
		font-style: italic;
		color: #c4b5fd;
	}

	/* ===== Instrumentation ===== */
	.instrumentation-block {
		margin-bottom: 3rem;
	}

	.pull-quote {
		margin: 2.5rem auto 0;
		max-width: 56ch;
		padding: 1.25rem 1.5rem;
		border-left: 2px solid #8b5cf6;
		background: rgba(139, 92, 246, 0.04);
		font-size: 0.9375rem;
		line-height: 1.6;
		color: #c4c4cd;
		font-style: italic;
	}

	.pull-quote cite {
		display: block;
		margin-top: 0.75rem;
		font-style: normal;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
	}

	.corpus-readout {
		margin: 3rem 0;
		border: 1px solid rgba(139, 92, 246, 0.25);
		padding: 1.75rem 1.75rem 1.25rem;
	}

	.corpus-heading {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #8b5cf6;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		margin: 0 0 1.25rem;
		font-weight: 500;
	}

	.corpus-list {
		margin: 0;
		padding: 0;
	}

	.corpus-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		align-items: baseline;
	}

	.corpus-row:last-child {
		border-bottom: none;
	}

	.corpus-row dt {
		font-size: 0.9375rem;
		color: #c4c4cd;
		margin: 0;
	}

	.corpus-row dd {
		margin: 0;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.corpus-value {
		font-size: 1.125rem;
		color: #ffffff;
		font-weight: 500;
	}

	.corpus-detail {
		font-size: 0.75rem;
		color: #8b5cf6;
	}

	.corpus-caption {
		margin: 1.5rem 0 0;
		font-size: 0.8125rem;
		color: #a8a8b2;
		line-height: 1.55;
	}

	.adversarial {
		margin: 3rem 0;
	}

	.adversarial h3 {
		font-size: 1.125rem;
		font-weight: 500;
		color: #ffffff;
		margin: 0 0 1rem;
	}

	.adversarial blockquote {
		margin: 0 0 1rem;
		padding: 1.25rem 1.5rem;
		border-left: 2px solid #8b5cf6;
		background: rgba(139, 92, 246, 0.04);
		font-size: 0.9375rem;
		line-height: 1.6;
		color: #c4c4cd;
		font-style: italic;
		max-width: 56ch;
	}

	.adversarial blockquote em {
		font-style: italic;
		color: #c4b5fd;
	}

	.adversarial blockquote cite {
		display: block;
		margin-top: 0.75rem;
		font-style: normal;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		color: #8b5cf6;
	}

	.adversarial-caption {
		margin: 0 0 1rem;
		font-size: 0.875rem;
		color: #a8a8b2;
		line-height: 1.55;
		max-width: 56ch;
	}

	/* ===== Topology footnote ===== */
	.topology {
		margin: 4rem 0 2rem;
		padding: 1rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
	}

	.topology p {
		font-size: 0.875rem;
		line-height: 1.55;
		color: #a8a8b2;
		margin: 0;
	}

	.topology-label {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		color: #8b5cf6;
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		margin-right: 0.5rem;
	}

	.topology code {
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.85em;
		color: #c4b5fd;
		padding: 0.125rem 0.25rem;
		background: rgba(139, 92, 246, 0.1);
	}

	.topology a {
		color: #a78bfa;
		text-decoration: none;
		word-break: break-all;
	}

	.topology a:hover {
		color: #c4b5fd;
		text-decoration: underline;
		text-underline-offset: 3px;
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

	.sep {
		color: #4a4a55;
	}

	/* ===== Reduced motion ===== */
	@media (prefers-reduced-motion: reduce) {
		.topnav a {
			transition: none;
		}
	}
</style>
