<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import ToolCard from '$lib/components/compositions/ToolCard.svelte';
	import RuleBlock from '$lib/components/compositions/RuleBlock.svelte';
	import PullQuote from '$lib/components/compositions/PullQuote.svelte';
	import Schematic from '$lib/components/Schematic.svelte';

	const toolchain = [
		{
			name: 'forge family',
			subtitle: 'forge-brand · forge-signal · forge-site · gen-images',
			body: 'One brand-kit JSON drives tokens, copy, images, and a site archetype. Four CLIs chain together: brand definition → CSS variables → voiced content → imagery → archetype-instantiated site.',
			enforces:
				'brand drift is structurally prevented — every downstream artifact resolves to the same source JSON.',
			href: 'github.com/nino-chavez/forge-brand',
			visibility: 'private'
		},
		{
			name: 'specchain',
			subtitle: 'spec-driven workflow',
			body: 'Spec-driven development workflow for AI-assisted coding. Execution profiles, crash recovery, traceability between spec and implementation, multi-agent handoffs.',
			enforces:
				'the spec is the durable artifact; the implementation is derived. Spec drift surfaces as a failing test, not a hallway conversation three sprints later.',
			href: 'github.com/nino-chavez/specchain',
			visibility: 'private'
		},
		{
			name: 'AEGIS Framework',
			subtitle: 'v2.5.0 · governance layer for AI code generation',
			body: 'Plan gating (MVP / Surgical / Systemic), self-healing blueprint engine, evolution-story tracking, cross-framework learning.',
			enforces:
				'every AI-generated change passes through plan classification + validation + evolution tracking before it lands.',
			href: 'github.com/signal-x-studio/aegis-framework',
			visibility: 'private'
		},
		{
			name: 'claude-recall-cli + Poe stack',
			subtitle: '746 signals · 62 projects',
			body: 'Global /recall slash commands plus the voice-stack generator that builds the character sheet at the top of every session. SQLite + FTS5 underneath; the Poe stack is the serialized output that loads into every prompt.',
			enforces:
				'corrections survive the session — past corrections inform future drafts, with measurable tone metrics as evidence the loop is closed.',
			href: 'github.com/nino-chavez/claude-recall-cli',
			visibility: 'private'
		},
		{
			name: 'ai-champions-kit',
			subtitle: '10 skills · 5 subagents · 5 templates',
			body: 'Shared Claude Code skills + subagents packaged for installation by others. The practice transferred to other practitioners as a kit.',
			enforces:
				"the practice is reproducible, not personal. If it only works for me, it isn't a practice.",
			href: 'https://github.com/nino-chavez/ai-champions-kit',
			visibility: 'public'
		},
		{
			name: 'big-blueprint',
			subtitle: '7-stage methodology · used by rally-hq, bc-subscriptions',
			body: '7-stage agent-assisted methodology for product-planning initiatives. Research → design principles → prototype → fact-check → docs → deploy → iterate.',
			enforces:
				'every product decision has a recorded source in the synthesis layer; planning state derives from artifacts, not whiteboard memory.',
			href: 'github.com/nino-chavez/big-blueprint',
			visibility: 'private'
		}
	];

	const rules = [
		{
			pill: 'Rule 1',
			title: 'Canonical-pattern-first for infrastructure',
			body: `When implementing infrastructure with a well-known canonical pattern — auth, payments, OAuth, sessions, queues, webhooks, file uploads, anything where the vendor publishes "the right way to do this" — default to the canonical pattern. Custom shapes must justify themselves explicitly against the canonical baseline.`,
			why: `A pre-spec check forces two reads — vendor docs + existing internal reference impl — before a custom shape ships. The "why not canonical" sentence in the spec is non-negotiable. Silence is not an acceptable answer.`
		},
		{
			pill: 'Rule 2',
			title: 'Default to action, not confirmation',
			body: `Don't pause to ask which direction to take when the direction is obvious from the conversation. If we've been working on X and there's a natural next step on X, take it. Mid-task "continue or pause?" questions kill flow and read as timidity, not care. The user can interrupt at any time; they can't recover the time spent waiting for a green light on something that didn't need one.`,
			why: `Three layers reinforce this rule — the declarative text in CLAUDE.md, a UserPromptSubmit hook that injects voice context before Claude generates a response, and a Stop hook that blocks turns ending with hesitation patterns. See Instrumentation below.`
		},
		{
			pill: 'Rule 3',
			title: 'Multi-session work isolation (worktrees mandatory)',
			body: `Any time more than one session has independent work in flight against the same repo, each session MUST operate in its own git worktree. For Agent tool invocations: pass isolation: "worktree". No-change worktrees auto-clean; changed worktrees return path + branch in the result.`,
			why: `Without this, parallel sessions switch each other's branches under each other's feet and commits land on the wrong branch. The rule is operational evidence of working at agent scale — not a theoretical concern.`
		},
		{
			pill: 'Rule 4',
			title: 'Voice stack imports',
			body: `CLAUDE.md uses @~/path syntax to import poe-preamble.md + stack.md into every session. The serialized voice context is part of every prompt, not optional context.`,
			why: `The corpus only enforces voice if it's actually loaded. The import syntax makes that automatic.`
		}
	];

	const corpusStats = [
		{ label: 'Corpus size', value: '746', detail: 'signals' },
		{ label: 'Project coverage', value: '62', detail: 'projects' },
		{ label: 'Median sentence length', value: '12', detail: 'words (p90: 30)' },
		{ label: 'Hedge rate', value: '10.9%', detail: 'target: declining' },
		{ label: 'Cheerleading rate', value: '1.7%', detail: 'target: declining' },
		{ label: 'Imperative-opener rate', value: '11.6%', detail: 'target: rising' },
		{ label: 'Validated turns (no correction)', value: '6,418', detail: '' }
	];
</script>

<svelte:head>
	<title>Practice — Nino Chavez</title>
	<meta
		name="description"
		content="The differentiator page: six published tools, four operating rules, a three-layer classifier against hesitation, and a 746-signal voice corpus. Every claim links to a public artifact."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/practice</p>
	<svelte:fragment slot="claim">This is <em>how</em> I work.</svelte:fragment>
	<svelte:fragment slot="subhead">
		Every claim on this page is anchored in a specific artifact — a tool, a hook, a corpus, a
		repo. Some are public; some are private (marked below). No methodology that isn't running.
		No rule that hasn't caught a real failure.
	</svelte:fragment>
</Hero>

<section id="toolchain" class="section">
	<SectionHead kicker="01 — Toolchain">Six tools that codify the practice.</SectionHead>
	<div class="tool-grid">
		{#each toolchain as tool}
			<ToolCard {...tool} />
		{/each}
	</div>
</section>

<section id="rules" class="section">
	<SectionHead kicker="02 — Operating rules">Four rules from <code>~/.claude/CLAUDE.md</code>.</SectionHead>
	<div class="rules-stack">
		{#each rules as rule}
			<RuleBlock {...rule} />
		{/each}
	</div>
</section>

<section id="instrumentation" class="section">
	<SectionHead kicker="03 — Instrumentation">One classifier. Three lifecycle points.</SectionHead>

	<Schematic
		kind="hesitation-fold"
		caption="The same classify_situation() runs at prompt-submit (predict), at end-of-turn (enforce), and at session-end (extract). New patterns added to the classifier are automatically caught by all three layers."
	/>

	<PullQuote cite="~/.claude/hooks/anti-hesitation.py block message, verbatim">
		"Stop hook feedback: You ended your turn with a hesitation question — exactly the pattern that
		the CLAUDE.md 'decision bias' rule prohibits. Restate your closing as a status sentence
		describing the next move you're taking."
	</PullQuote>

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
			Distilled from corrections in past sessions. The metrics are the record of whether the loop
			is actually closing.
		</p>
	</div>

	<aside class="adversarial">
		<h3>The adversarial test plan</h3>
		<PullQuote cite="~/.claude/poe/adversarial-test-plan.md">
			"The deterministic surfaces (classifiers, query, extraction) have unit tests. This document
			tests the harder claim: <em>does the prompt hook actually change how Claude responds?</em>"
		</PullQuote>
		<p class="adversarial-caption">
			A documented control-versus-treatment protocol that proves the loop is closed. Most "I
			prompt Claude well" claims aren't testable. This one has a control group.
		</p>
		<a
			class="tool-link"
			href="https://github.com/nino-chavez/claude-recall-cli"
			rel="noopener"
			target="_blank"
		>
			→ github.com/nino-chavez/claude-recall-cli
		</a>
	</aside>
</section>

<section class="topology">
	<p>
		<span class="topology-label">Topology footnote.</span> ninochavez.co is served by a Cloudflare
		Worker (<code>ninochavez-router</code>, 47 lines) that routes the apex,
		<code>/photography</code>, and <code>/blog</code> through one entry point with 301s for the old
		subdomains. The router is its own artifact —
		<a
			href="https://github.com/nino-chavez/nino-chavez-site/tree/main/apps/router"
			rel="noopener"
			target="_blank">github.com/nino-chavez/nino-chavez-site/tree/main/apps/router</a
		>.
	</p>
</section>

<style>
	.section {
		margin: var(--space-20) 0;
	}

	.tool-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-5);
	}

	@media (max-width: 720px) {
		.tool-grid {
			grid-template-columns: 1fr;
		}
	}

	.rules-stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.corpus-readout {
		margin: var(--space-12) 0;
		border: 1px solid var(--border-violet);
		padding: var(--space-6) var(--space-6) var(--space-5);
	}

	.corpus-heading {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
		margin: 0 0 var(--space-5);
		font-weight: 500;
	}

	.corpus-list {
		margin: 0;
		padding: 0;
	}

	.corpus-row {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-4);
		padding: var(--space-3) 0;
		border-bottom: 1px solid var(--border-subtle);
		align-items: baseline;
	}

	.corpus-row:last-child {
		border-bottom: none;
	}

	.corpus-row dt {
		font-size: var(--type-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.corpus-row dd {
		margin: 0;
		font-family: var(--font-mono);
		text-align: right;
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.corpus-value {
		font-size: var(--type-lead);
		color: var(--text-primary);
		font-weight: 500;
	}

	.corpus-detail {
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
	}

	.corpus-caption {
		margin: var(--space-6) 0 0;
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.55;
	}

	.adversarial {
		margin: var(--space-12) 0;
	}

	.adversarial h3 {
		font-size: var(--type-lead);
		font-weight: 500;
		color: var(--text-primary);
		margin: 0 0 var(--space-4);
	}

	.adversarial-caption {
		margin: var(--space-4) 0;
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.55;
		max-width: 56ch;
	}

	.tool-link {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-link);
		text-decoration: none;
		word-break: break-all;
	}

	.tool-link:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.topology {
		margin: var(--space-16) 0 var(--space-8);
		padding: var(--space-4) var(--space-5);
		border: 1px solid var(--border-base);
		background: var(--surface-card);
	}

	.topology p {
		font-size: var(--type-sm);
		line-height: 1.55;
		color: var(--text-muted);
		margin: 0;
	}

	.topology-label {
		font-family: var(--font-mono);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		font-size: var(--type-xs);
		letter-spacing: var(--tracking-mono);
		margin-right: var(--space-2);
	}

	.topology code {
		font-family: var(--font-mono);
		font-size: 0.85em;
		color: var(--text-link-hover);
		padding: 0.125rem 0.25rem;
		background: rgba(139, 92, 246, 0.1);
	}

	.topology a {
		color: var(--text-link);
		text-decoration: none;
		word-break: break-all;
	}

	.topology a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
	}
</style>
