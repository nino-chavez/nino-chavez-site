<script>
	import Hero from '$lib/components/Hero.svelte';
	import SectionHead from '$lib/components/SectionHead.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import RuleBlock from '$lib/components/RuleBlock.svelte';
	import PointerRow from '$lib/components/PointerRow.svelte';

	const closingPointers = [
		{ title: '/work', href: '/work', description: 'The catalog the practice produced' },
		{ title: '/writing', href: '/writing', description: 'The corpus the practice writes against' },
		{ title: '/about', href: '/about', description: 'Who runs the practice and why' }
	];
</script>

<svelte:head>
	<title>Practice — Nino Chavez</title>
	<meta name="description" content="Production line. Substrate. Operating rules. Instrumentation evidence. Every claim grounds to a real file or repo path." />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="/practice">
			This is how I <em>work</em>.
			<svelte:fragment slot="sub">
				Four sections in execution order. Every claim grounds to a real file or repo path —
				the catalog IS the evidence. The signature schematic in §01 depicts the production
				line that built every case study under <a href="/work">/work</a>.
			</svelte:fragment>
		</Hero>
	</section>

	<div class="container">

		<!-- 01 — Production line -->
		<section id="production-line" class="practice-section">
			<SectionHead kicker="01 — Production line" id="production-line-head">
				One umbrella. Six lathes. Every artifact downstream.
			</SectionHead>
			<p class="section-lede">
				<code>forge</code> is the umbrella entry point — public, documented, externally
				verifiable. Six private lathes do the work: <code>specchain</code> writes requirements
				into specs; <code>blueprint</code> formalizes the diagnose-prescribe-design methodology;
				<code>forge-brand</code> emits tokens from brand kits; <code>forge-signal</code>
				generates site copy; <code>forge-site</code> orchestrates archetypes;
				<code>image-gen</code> produces hero and social assets.
			</p>

			<figure class="schematic-frame" aria-label="Forge production line">
				<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="forge-pr-title">
					<title id="forge-pr-title">Forge umbrella feeding six private lathes</title>
					<rect class="schematic-node-pub" x="290" y="20" width="140" height="50"/>
					<text class="schematic-tag" x="360" y="12" text-anchor="middle">UMBRELLA · PUBLIC</text>
					<text class="schematic-text-pub" x="360" y="52" text-anchor="middle">forge</text>
					<line class="schematic-edge" x1="360" y1="70" x2="360" y2="110"/>
					<line class="schematic-edge" x1="80" y1="110" x2="640" y2="110"/>
					<line class="schematic-edge" x1="105" y1="110" x2="105" y2="140"/>
					<rect class="schematic-node" x="50" y="140" width="110" height="40"/>
					<text class="schematic-text" x="105" y="165" text-anchor="middle">specchain</text>
					<line class="schematic-edge" x1="220" y1="110" x2="220" y2="140"/>
					<rect class="schematic-node" x="175" y="140" width="90" height="40"/>
					<text class="schematic-text" x="220" y="165" text-anchor="middle">blueprint</text>
					<line class="schematic-edge" x1="320" y1="110" x2="320" y2="140"/>
					<rect class="schematic-node" x="275" y="140" width="90" height="40"/>
					<text class="schematic-text" x="320" y="165" text-anchor="middle">forge-brand</text>
					<line class="schematic-edge" x1="420" y1="110" x2="420" y2="140"/>
					<rect class="schematic-node" x="375" y="140" width="90" height="40"/>
					<text class="schematic-text" x="420" y="165" text-anchor="middle">forge-signal</text>
					<line class="schematic-edge" x1="520" y1="110" x2="520" y2="140"/>
					<rect class="schematic-node" x="475" y="140" width="90" height="40"/>
					<text class="schematic-text" x="520" y="165" text-anchor="middle">forge-site</text>
					<line class="schematic-edge" x1="620" y1="110" x2="620" y2="140"/>
					<rect class="schematic-node" x="575" y="140" width="90" height="40"/>
					<text class="schematic-text" x="620" y="165" text-anchor="middle">image-gen</text>
					<line class="schematic-edge" x1="105" y1="180" x2="620" y2="180"/>
					<line class="schematic-edge" x1="360" y1="180" x2="360" y2="220"/>
					<rect class="schematic-node" x="270" y="220" width="180" height="50"/>
					<text class="schematic-tag" x="360" y="212" text-anchor="middle">DOWNSTREAM</text>
					<text class="schematic-text" x="360" y="250" text-anchor="middle">case studies · sites · portals</text>
				</svg>
				<figcaption class="schematic-cap">Fig. 01 · forge production line — umbrella + six lathes → downstream artifacts</figcaption>
			</figure>
		</section>

		<!-- 02 — Substrate -->
		<section id="substrate" class="practice-section">
			<SectionHead kicker="02 — Substrate" id="substrate-head">
				What's underneath the toolchain.
			</SectionHead>
			<p class="section-lede">
				Four layers, each citable to a working repo. Without these the lathes above would each
				invent their own context loading, recall, and coordination patterns.
			</p>

			<div class="tool-grid">
				<ToolCard
					title="L1 · Hooks"
					visibility="private"
					description="SessionStart, UserPromptSubmit, Stop, PostToolUse hooks injected via .claude/settings.json. The Poe stack and decision-bias enforcement arrive through this layer."
					enforces="Declarative behavior shaping at session boundaries."
				/>
				<ToolCard
					title="L2 · Skills + subagents"
					visibility="private"
					description="50+ skills covering deploy / audit / spec / verify workflows. Subagents invoked with isolation: worktree for parallel work."
					enforces="Capability + isolation are independently composable."
				/>
				<ToolCard
					title="L3 · Session mining"
					visibility="private"
					description="claude-recall-cli walks every .jsonl transcript and rebuilds the Poe stack at every catchup ingest."
					enforces="Pattern extraction is mechanical, not curatorial."
				/>
				<ToolCard
					title="L4 · Hive coordination"
					visibility="private"
					description="ai-hive + claude-orchestrator + worktree-orchestrator partition work across parallel sessions so the main session never blocks on subagent compute."
					enforces="Multi-session merges land on the right branch."
				/>
			</div>
		</section>

		<!-- 03 — Operating rules -->
		<section id="operating-rules" class="practice-section">
			<SectionHead kicker="03 — Operating rules" id="rules-head">
				Four rules quoted verbatim from <code>~/.claude/CLAUDE.md</code>.
			</SectionHead>
			<p class="section-lede">
				The global instructions file is the source of truth for how every agent on this
				workstation operates. These four carry the most cross-project leverage.
			</p>

			<div class="rule-stack">
				<RuleBlock number="1" title="Decision bias — default to action, not confirmation">
					Don't pause to ask which direction to take when the direction is obvious from the
					conversation. If we've been working on X and there's a natural next step on X, take
					it. Mid-task "continue or pause?" questions kill flow and read as timidity, not care.
				</RuleBlock>

				<RuleBlock number="2" title="Canonical-pattern-first for infrastructure">
					When implementing infrastructure with a well-known canonical pattern — auth, payments,
					OAuth, sessions, queues, webhooks — default to the canonical pattern. Custom shapes
					must justify themselves explicitly against the canonical baseline.
				</RuleBlock>

				<RuleBlock number="3" title="Multi-session work isolation is mandatory">
					Any time more than one session has independent work in flight against the same repo,
					each session MUST operate in its own git worktree. Sessions sharing a working
					directory will switch each other's branches under each other's feet.
				</RuleBlock>

				<RuleBlock number="4" title="Never fabricate Nino's interior state">
					In prose drafted on Nino's behalf, never invent specific people, conversations,
					internal admissions, or experiences. Self-interrogation without grounding evidence
					is decoration that fails the voice's central test.
				</RuleBlock>
			</div>
		</section>

		<!-- 04 — Instrumentation evidence -->
		<section id="instrumentation" class="practice-section">
			<SectionHead kicker="04 — Instrumentation evidence" id="instrumentation-head">
				The proof that the rules above aren't aspirational.
			</SectionHead>
			<p class="section-lede">
				The hesitation fold below is the declarative-rule + prompt-hook + stop-hook triple that
				catches the "ending with a question" failure mode — and surfaces it through a Stop-hook
				violation message when it slips past.
			</p>

			<figure class="schematic-frame" aria-label="Hesitation fold">
				<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hesi-svg-title">
					<title id="hesi-svg-title">Hesitation fold — three layers sharing one classifier</title>
					<rect class="schematic-node" x="40" y="30" width="180" height="70"/>
					<text class="schematic-tag" x="130" y="22" text-anchor="middle">LAYER 1 · DECLARE</text>
					<text class="schematic-text" x="130" y="62" text-anchor="middle">declarative rule</text>
					<text class="schematic-tag" x="130" y="86" text-anchor="middle">~/.claude/CLAUDE.md</text>
					<rect class="schematic-node" x="270" y="30" width="180" height="70"/>
					<text class="schematic-tag" x="360" y="22" text-anchor="middle">LAYER 2 · PREDICT</text>
					<text class="schematic-text" x="360" y="62" text-anchor="middle">prompt hook</text>
					<text class="schematic-tag" x="360" y="86" text-anchor="middle">UserPromptSubmit · Poe</text>
					<rect class="schematic-node" x="500" y="30" width="180" height="70"/>
					<text class="schematic-tag" x="590" y="22" text-anchor="middle">LAYER 3 · CORRECT</text>
					<text class="schematic-text" x="590" y="62" text-anchor="middle">stop hook</text>
					<text class="schematic-tag" x="590" y="86" text-anchor="middle">end-of-turn audit</text>
					<line class="schematic-edge" x1="130" y1="100" x2="130" y2="200"/>
					<line class="schematic-edge" x1="360" y1="100" x2="360" y2="200"/>
					<line class="schematic-edge" x1="590" y1="100" x2="590" y2="200"/>
					<line class="schematic-edge" x1="130" y1="200" x2="590" y2="200"/>
					<line class="schematic-edge" x1="360" y1="200" x2="360" y2="220"/>
					<rect class="schematic-node-pub" x="280" y="220" width="160" height="60"/>
					<text class="schematic-tag" x="360" y="212" text-anchor="middle">SHARED CLASSIFIER</text>
					<text class="schematic-text-pub" x="360" y="256" text-anchor="middle">hesitation_pattern?</text>
				</svg>
				<figcaption class="schematic-cap">Fig. 02 · hesitation fold — three layers route through one classifier</figcaption>
			</figure>

			<div class="stats-grid">
				<div class="stat-tile">
					<p class="stat-tag">Corpus</p>
					<p class="stat-value">775</p>
					<p class="stat-note">signals · 64 projects</p>
				</div>
				<div class="stat-tile">
					<p class="stat-tag">Median sentence</p>
					<p class="stat-value">12</p>
					<p class="stat-note">words · p90 = 30</p>
				</div>
				<div class="stat-tile">
					<p class="stat-tag">Hedge rate</p>
					<p class="stat-value">10.6%</p>
					<p class="stat-note">"maybe / might / I think"</p>
				</div>
				<div class="stat-tile">
					<p class="stat-tag">Cheerleading rate</p>
					<p class="stat-value">1.6%</p>
					<p class="stat-note">"great / awesome / perfect"</p>
				</div>
				<div class="stat-tile">
					<p class="stat-tag">Red lines</p>
					<p class="stat-value">86</p>
					<p class="stat-note">rejection signals</p>
				</div>
				<div class="stat-tile">
					<p class="stat-tag">Hesitation overrides</p>
					<p class="stat-value">321</p>
					<p class="stat-note">questions overridden with "go"</p>
				</div>
			</div>
		</section>

		<footer class="practice-footer">
			<PointerRow pointers={closingPointers} />
		</footer>

	</div>
</main>

<style>
	main { padding-bottom: var(--space-16); }

	.practice-section {
		padding-block: var(--space-12);
		border-top: var(--border-1) solid var(--border-subtle);
		scroll-margin-top: var(--space-16);
	}

	.section-lede {
		max-width: var(--container-prose);
		color: var(--text-secondary);
		font-size: var(--type-base);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-6);
	}

	.section-lede code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--brand-400);
	}

	.schematic-frame {
		margin: var(--space-8) 0 0 0;
		padding: var(--space-6);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
		max-width: 760px;
	}

	.schematic-frame svg {
		display: block;
		width: 100%;
		height: auto;
		max-width: 720px;
		margin: 0 auto;
	}

	.schematic-cap {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-top: var(--space-3);
		text-align: center;
	}

	:global(.schematic-node) { fill: none; stroke: var(--text-primary); stroke-width: 1.5; }
	:global(.schematic-node-pub) { fill: none; stroke: var(--brand-500); stroke-width: 2; }
	:global(.schematic-edge) { fill: none; stroke: var(--text-muted); stroke-width: 1.5; }
	:global(.schematic-text) { font-family: var(--font-mono); font-size: 11px; fill: var(--text-primary); }
	:global(.schematic-text-pub) { font-family: var(--font-mono); font-size: 12px; fill: var(--brand-400); font-weight: 700; }
	:global(.schematic-tag) { font-family: var(--font-mono); font-size: 9px; fill: var(--text-muted); letter-spacing: 0.08em; }

	.tool-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.rule-stack {
		display: flex;
		flex-direction: column;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--space-3);
		margin-top: var(--space-8);
	}

	.stat-tile {
		padding: var(--space-4);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
	}

	.stat-tag {
		font-family: var(--font-mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-1);
	}

	.stat-value {
		font-family: var(--font-display);
		font-size: var(--type-2xl);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		line-height: 1;
	}

	.stat-note {
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--text-muted);
		margin-top: var(--space-1);
	}

	.practice-footer {
		margin-top: var(--space-16);
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}
</style>
