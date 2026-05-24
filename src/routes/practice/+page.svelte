<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import ToolCard from '$lib/components/compositions/ToolCard.svelte';
	import RuleBlock from '$lib/components/compositions/RuleBlock.svelte';
	import PullQuote from '$lib/components/compositions/PullQuote.svelte';
	import Schematic from '$lib/components/Schematic.svelte';

	// The production line — five tools, ordered. Each link consumes the prior
	// link's output. From "The Backport I Didn't Make" (Signal Dispatch):
	// "The chassis is the lathe. The template. The spec format. The brand
	// bridge. The contract that says every prototype slice exposes the same
	// shape, so the next thing built on top can assume it."
	const toolchain = [
		{
			name: 'specchain',
			subtitle: '01 · intent → spec → tasks',
			body: 'Spec-driven development workflow for AI-assisted coding. Execution profiles, crash recovery, traceability between spec and implementation, multi-agent handoffs.',
			enforces:
				'the spec is the durable artifact; the implementation is derived. Spec drift surfaces as a failing test, not a hallway conversation three sprints later.',
			href: 'github.com/nino-chavez/specchain',
			visibility: 'private'
		},
		{
			name: 'big-blueprint',
			subtitle: '02 · spec → archetype + design brief',
			body: 'Routes a spec through a small set of archetypes (portfolio-brand, commerce, internal-tool, etc.) and emits the design brief the rest of the chain consumes. 7-stage pipeline: research → principles → prototype → fact-check → docs → deploy → iterate. Extracted March 2026 from a 48-hour P&P initiative; A/B-tested at 70–80% quality in 10–15× less time, with six template gaps caught and re-tested; currently applied to bc-subscriptions, rally-hq, and the redesign of this site.',
			enforces:
				'every product decision has a recorded source in the synthesis layer; planning state derives from artifacts, not whiteboard memory.',
			href: 'github.com/nino-chavez/big-blueprint',
			visibility: 'private'
		},
		{
			name: 'forge-brand',
			subtitle: '03 · brand-kit JSON → typed design system',
			body: 'One brand-kit JSON emits the design tokens, the type ramp, the spacing scale, the motion curves, and the component primitives the downstream tools consume. Every artifact resolves to one source-of-truth JSON.',
			enforces:
				'brand drift is structurally prevented — tokens, copy, and imagery downstream all resolve to the same source.',
			href: 'github.com/nino-chavez/forge-brand',
			visibility: 'private'
		},
		{
			name: 'forge-signal',
			subtitle: '04 · brand bridge → voiced prose',
			body: 'Writes the prose for whatever mode the surface needs — Thought Leadership / Solution Architecture / Executive Advisory / Documentation. Voice guides per mode, voice-corpus enforcement, no templated provisionality.',
			enforces:
				'voice register is picked first; the draft never opens in the wrong mode and then gets "edited" toward the right one.',
			href: 'github.com/nino-chavez/forge-signal',
			visibility: 'private'
		},
		{
			name: 'gen-images',
			subtitle: '05 · brand bridge → schematic-grade visuals',
			body: 'Renders heroes, OG cards, and diagrams from the brand bridge. Schematic-diagram register where the brand calls for it; never AI-statistical for surfaces whose claim is engineering precision.',
			enforces:
				'imagery is generated against the same tokens the type and copy resolve to — three artifacts, one bridge.',
			href: 'github.com/nino-chavez/gen-images',
			visibility: 'private'
		}
	];

	// forge-site is the human's playbook reference — it doesn't run; it gets
	// read. Surfaced separately so it doesn't read as a 6th runtime in the
	// chain.
	const playbook = {
		name: 'forge-site',
		body: 'The playbook the human reads before the chain runs. Archetypes, modules, stage 2/3/3.5 templates. Knowledge artifact, no runtime.',
		href: 'github.com/nino-chavez/forge-site',
		visibility: 'private'
	};

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

	// The substrate — what runs in every Claude Code session, before the
	// production line ever fires. Each entry names real files / real repos
	// that exist on disk today (verified via ls).
	const substrate = [
		{
			name: 'Hooks',
			subtitle: 'Three lifecycle points · one classifier',
			body: 'Stop hook (`anti-hesitation.py`) catches end-of-turn hesitation post-response. UserPromptSubmit hook injects voice context predictively pre-response. Session-end hook extracts new patterns into the corpus. All three call the SAME `classify_situation()` function — a new pattern added to one is automatically caught by the other two.',
			refs: [
				{ label: '~/.claude/hooks/anti-hesitation.py', meta: 'Stop · ~280 lines' },
				{ label: '~/.claude/poe/hook.log', meta: 'execution log' }
			]
		},
		{
			name: 'Skills + subagents',
			subtitle: 'Verbs the human invokes · specialized roles',
			body: 'Custom slash-commands live in `~/.claude/commands/` (`/recall`, `/recall-scan`, `/poe`, `/poe-check`). Custom subagents live in `~/.claude/agents/` (`ux-ui-auditor`). Claude Code builtins fill the rest of the verb-set: `/diagnose`, `/tdd`, `/grill-with-docs`, `/to-prd`, `/verify`, `/run`, `/loop`, `/schedule`, `/write-a-skill`, plus the audit subagents (`architects-protocol-auditor`, `code-review`, etc.). The `ai-champions-kit` repo packages a transferable subset.',
			refs: [
				{ label: '~/.claude/commands/', meta: '6 custom skills' },
				{ label: '~/.claude/agents/', meta: '1 custom + 7 archived' },
				{ label: 'github.com/nino-chavez/ai-champions-kit', meta: 'public transfer kit' }
			]
		},
		{
			name: 'Session mining',
			subtitle: 'Sessions → corpus → voice card → in every prompt',
			body: '`recall-cli.py` reads `~/.claude/history.jsonl` (currently ~7MB of session data). `recall-scan.py` batch-classifies messages against `classify_situation()`. The output is a corpus (`~/.claude/poe/corpus.jsonl`) which `poe-extract.py` serializes into `~/.claude/poe/stack.md` — the character sheet that loads into the system prompt of every new session via `@~/path` imports in CLAUDE.md. The loop closes because the classifier the hooks call is the same classifier the miner calls.',
			refs: [
				{ label: 'tools/claude-recall-cli/', meta: 'private · 13 files' },
				{ label: '~/.claude/poe/stack.md', meta: 'serialized character sheet' },
				{ label: '~/.claude/poe/adversarial-test-plan.md', meta: 'control/treatment protocol' }
			]
		},
		{
			name: 'Hive coordination',
			subtitle: 'Cross-surface spine for mixed human + AI teams',
			body: 'Started inside Commerce Inc as `ai-hive` — a coordination layer that connects IDE, browser, and terminal surfaces so contributions don\'t drift. Atelier is the unconstrained OSS rebuild: a 12-tool MCP protocol with role-aware lenses, fenced locks, and an SSE Durable Object for per-project fan-out. `bc-subscriptions` uses Hive synthesis to carry traceability IDs from idea → ADR → PR. The protocol is published independently of the reference implementation so other implementers can ship on a different stack.',
			refs: [
				{ label: 'atelier.ninochavez.co', meta: 'reference deployment · live' },
				{ label: 'github.com/nino-chavez/atelier', meta: '12-tool MCP protocol · private' },
				{ label: '/work/atelier', meta: 'case study' }
			]
		}
	];
</script>

<svelte:head>
	<title>Practice — Nino Chavez</title>
	<meta
		name="description"
		content="The differentiator page: a five-link production line, the substrate that automates it (hooks, skills, subagents, session mining, Hive coordination), four operating rules from CLAUDE.md, and the closed-loop evidence — a 746-signal voice corpus with measurable tone metrics and an adversarial test plan."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/practice</p>
	<svelte:fragment slot="claim">This is <em>how</em> I work.</svelte:fragment>
	<svelte:fragment slot="subhead">
		Two halves of the same practice. The <em>production line</em> turns intent into shipping
		software (five lathes). The <em>substrate</em> is what runs in every session before, during,
		and after — hooks, skills, subagents, session mining, coordination. Both halves are anchored
		in specific artifacts on disk. Some are public; some are private (marked below).
	</svelte:fragment>
</Hero>

<section id="toolchain" class="section">
	<SectionHead kicker="01 — The production line">
		Five lathes that make the next prototype possible.
	</SectionHead>
	<p class="section-lede">
		The Industrial Revolution gets remembered as steam. The actual inflection was Maudslay's
		screw-cutting lathe — a machine that produced interchangeable parts other machines could be
		built from. The LLM is the steam engine of this moment. The chain below is the lathe.
		Each link consumes the prior link's output; together they turn raw generative output into
		something the next layer can assume the shape of.
		<a href="https://blog.ninochavez.co/the-backport-i-didnt-make" rel="noopener">More in the post</a>.
	</p>
	<div class="tool-grid">
		{#each toolchain as tool}
			<ToolCard {...tool} />
		{/each}
	</div>

	<aside class="playbook-note">
		<p class="playbook-head">Playbook (not a runtime)</p>
		<p>
			<strong>{playbook.name}</strong> — {playbook.body}
		</p>
		<p class="playbook-href">
			{playbook.href}
			<span class="link-note">— private; request access</span>
		</p>
	</aside>
</section>

<section id="substrate" class="section">
	<SectionHead kicker="02 — The substrate">
		What runs in every session — before, during, and after.
	</SectionHead>
	<p class="section-lede">
		The lathes above produce sites. The substrate below produces the lathes — and runs alongside
		every session, mining patterns out and feeding them back in. Hooks predict and catch drift;
		skills and subagents are the verbs the human invokes; session mining keeps the corpus current;
		Hive coordinates work across surfaces when more than one human or agent is involved. This is
		the part most "I prompt Claude well" claims skip.
	</p>
	<div class="substrate-grid">
		{#each substrate as block}
			<article class="substrate-card">
				<header class="substrate-head">
					<h3 class="substrate-name">{block.name}</h3>
					<p class="substrate-subtitle">{block.subtitle}</p>
				</header>
				<p class="substrate-body">{block.body}</p>
				<ul class="substrate-refs">
					{#each block.refs as ref}
						<li>
							<code>{ref.label}</code>
							<span>— {ref.meta}</span>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>

<section id="rules" class="section">
	<SectionHead kicker="03 — Operating rules">Four rules from <code>~/.claude/CLAUDE.md</code>.</SectionHead>
	<p class="section-lede">
		The declarative half of the substrate. The hooks above are the mechanical enforcement of the
		rules below. Each rule's <em>Why</em> inset traces back to a specific past failure mode that
		the rule prevents.
	</p>
	<div class="rules-stack">
		{#each rules as rule}
			<RuleBlock {...rule} />
		{/each}
	</div>
</section>

<section id="instrumentation" class="section">
	<SectionHead kicker="04 — Instrumentation evidence">
		One classifier. Three lifecycle points. Measurable output.
	</SectionHead>

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

	.section-lede {
		font-size: var(--type-body);
		line-height: var(--leading-body);
		color: var(--text-secondary);
		max-width: var(--content-max);
		margin: 0 0 var(--space-8);
	}

	.section-lede em {
		font-style: italic;
		color: var(--text-link-hover);
	}

	/* Substrate grid */
	.substrate-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-5);
	}

	@media (max-width: 720px) {
		.substrate-grid {
			grid-template-columns: 1fr;
		}
	}

	.substrate-card {
		border: 1px solid var(--border-base);
		padding: var(--space-6) var(--space-6) var(--space-5);
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.substrate-head {
		margin: 0;
	}

	.substrate-name {
		margin: 0 0 var(--space-1);
		font-size: var(--type-h3);
		font-weight: 500;
		color: var(--text-primary);
	}

	.substrate-subtitle {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		letter-spacing: var(--tracking-wide);
	}

	.substrate-body {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: 1.55;
	}

	.substrate-body :global(code) {
		font-family: var(--font-mono);
		font-size: 0.875em;
		color: var(--text-link-hover);
		padding: 0.0625rem 0.3125rem;
		background: rgba(139, 92, 246, 0.1);
		border: 1px solid var(--border-violet);
	}

	.substrate-refs {
		list-style: none;
		padding: 0;
		margin: var(--space-2) 0 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		border-top: 1px solid var(--border-subtle);
		padding-top: var(--space-3);
	}

	.substrate-refs li {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		align-items: baseline;
	}

	.substrate-refs li code {
		color: var(--text-link);
		word-break: break-all;
	}

	.substrate-refs li span {
		color: var(--text-faint);
	}

	.section-lede a {
		color: var(--text-link);
		text-decoration: none;
	}

	.section-lede a:hover {
		color: var(--text-link-hover);
		text-decoration: underline;
		text-underline-offset: 3px;
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

	.playbook-note {
		margin: var(--space-6) 0 0;
		padding: var(--space-5) var(--space-6);
		border: 1px solid var(--border-base);
		background: var(--surface-card);
	}

	.playbook-head {
		margin: 0 0 var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--color-brand-violet);
		text-transform: uppercase;
		letter-spacing: var(--tracking-kicker);
	}

	.playbook-note p {
		margin: 0 0 var(--space-2);
		font-size: var(--type-sm);
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.playbook-note p:last-child {
		margin-bottom: 0;
	}

	.playbook-note strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.playbook-href {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-faint);
	}

	.link-note {
		color: var(--text-disabled);
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
