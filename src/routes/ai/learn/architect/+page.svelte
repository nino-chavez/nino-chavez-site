<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Learn the Templates',
			duration: '1-2 days',
			goal: 'Understand arc42, C4, and ADRs before you start filling them.',
			checkpoint: 'You can explain the difference between Context, Container, and Component diagrams',
			color: 'gray',
			reading: [
				{ title: 'arc42 Documentation', desc: 'The full template with section explanations', url: 'https://arc42.org' },
				{ title: 'C4 Model', desc: 'Four levels of abstraction for diagrams', url: 'https://c4model.com' },
				{ title: 'ADR GitHub Repo', desc: 'Architecture Decision Records template', url: 'https://adr.github.io' }
			],
			terms: [
				{ term: 'Context Diagram', desc: 'Your system as a box + external actors and systems' },
				{ term: 'Container', desc: 'A separately deployable unit (API, database, web app)' },
				{ term: 'Component', desc: 'A logical grouping within a container (auth module, payment service)' },
				{ term: 'ADR', desc: 'Architecture Decision Record — documents why you chose X over Y' }
			],
			checkpoints: [
				'You can explain Context vs Container vs Component diagrams',
				'You understand why ADRs include "Alternatives Considered"',
				'You know what makes documentation "implementation-ready"'
			]
		},
		{
			level: 1,
			title: 'Document an Existing System',
			duration: '1-2 weeks',
			goal: 'Create your first architecture document for a system you\'ve already built.',
			checkpoint: 'You have a Context diagram, Container diagram, and 3 ADRs',
			color: 'cyan',
			requirements: [
				'Pick a system with at least 2 containers (frontend + API, or API + database)',
				'Must have at least 1 external integration',
				'Must have at least 3 decisions you remember making'
			],
			artifacts: [
				{ name: 'Context Diagram', desc: 'Your system as a single box, all users/actors, all external systems' },
				{ name: 'Container Diagram', desc: 'Break the system into deployable parts with technology labels' },
				{ name: '3 ADRs', desc: 'Status, Context, Decision, Rationale, Consequences, Alternatives' }
			],
			tools: [
				{ name: 'Excalidraw', when: 'Quick sketches, hand-drawn feel' },
				{ name: 'D2', when: 'Diagram-as-code, version control' },
				{ name: 'Mermaid', when: 'Embedded in markdown' }
			],
			checkpoints: [
				'You have a Context diagram showing system boundaries',
				'You have a Container diagram showing internal structure',
				'You have 3 ADRs with rationale and alternatives',
				'All artifacts are in a single markdown file or repo'
			]
		},
		{
			level: 2,
			title: 'Capture Decisions as You Make Them',
			duration: '2-3 weeks',
			goal: 'Write ADRs before or during decisions, not after.',
			checkpoint: 'You have 5 ADRs written during active decision-making',
			color: 'blue',
			workflow: [
				{ phase: 'Before deciding', action: 'Write the Context section — what problem, what constraints' },
				{ phase: 'While deciding', action: 'Write Alternatives — 2-3 real options with trade-offs' },
				{ phase: 'After deciding', action: 'Write Decision, Rationale, Consequences' }
			],
			adrTypes: [
				'1 technology selection (database, framework, service)',
				'1 architectural pattern (monolith vs microservices, sync vs async)',
				'1 integration approach (REST vs GraphQL, polling vs webhooks)',
				'1 security/compliance decision',
				'1 "we decided NOT to do X" (scope/deferral decisions count)'
			],
			checkpoints: [
				'You have 5 ADRs written during active work (not historical)',
				'Each ADR includes a trade-off table',
				'You have a sense of when a decision is "significant" enough to document'
			]
		},
		{
			level: 3,
			title: 'Complete arc42 Document',
			duration: '3-4 weeks',
			goal: 'Create a full arc42 solution architecture for a real system.',
			checkpoint: 'You have a complete arc42 document someone could build from',
			color: 'purple',
			sections: [
				{ num: 1, name: 'Introduction and Goals', desc: 'What, why, who, quality goals' },
				{ num: 2, name: 'Constraints', desc: 'Technical, organizational, regulatory' },
				{ num: 3, name: 'Context and Scope', desc: 'Context diagram, business + technical context' },
				{ num: 4, name: 'Solution Strategy', desc: 'Key approaches, technology decisions' },
				{ num: 5, name: 'Building Block View', desc: 'Container + Component diagrams' },
				{ num: 6, name: 'Runtime View', desc: 'Sequence diagrams for key scenarios' },
				{ num: 7, name: 'Deployment View', desc: 'Infrastructure, environments, process' },
				{ num: 8, name: 'Cross-cutting Concepts', desc: 'Auth, errors, logging, security' },
				{ num: 9, name: 'Architecture Decisions', desc: 'All ADRs with decision log' },
				{ num: 10, name: 'Quality Requirements', desc: 'Quality tree and scenarios' },
				{ num: 11, name: 'Risks and Technical Debt', desc: 'Known risks, mitigation, debt backlog' },
				{ num: 12, name: 'Glossary', desc: 'Domain and technical terms' }
			],
			checkpoints: [
				'Complete arc42 document with all 12 sections',
				'At least 5 diagrams (Context, Container, Component, Runtime, Deployment)',
				'At least 5 ADRs',
				'Document is implementation-ready — someone could build from it'
			]
		},
		{
			level: 4,
			title: 'Cross-System Integration Docs',
			duration: '4+ weeks',
			goal: 'Document how your system integrates with others you don\'t control.',
			checkpoint: 'You have system-of-systems documentation with failure modes',
			color: 'amber',
			topics: [
				{ name: 'System-of-Systems Context', desc: 'Your system as one box among many, dependencies in both directions' },
				{ name: 'Integration Patterns', desc: 'Sync vs async, data flow direction, contract ownership' },
				{ name: 'Failure Modes', desc: 'What happens when each dependency fails? Retries, circuit breakers, fallbacks' },
				{ name: 'Data Consistency', desc: 'Source of truth per data type, eventual consistency windows' },
				{ name: 'Integration ADRs', desc: 'Why this approach? What contracts negotiated? What compromises made?' }
			],
			commerceExamples: [
				{ system: 'PIM → AI Enrichment', pattern: 'Event-driven: Product updates trigger enrichment pipeline. Source of truth: PIM. AI writes back enhanced attributes.' },
				{ system: 'Search Platform → LLM', pattern: 'Hybrid: Traditional search for recall, LLM for semantic reranking. Circuit breaker if LLM latency exceeds threshold.' },
				{ system: 'CMS → Personalization', pattern: 'Async: Content published → events → personalization engine indexes. Fallback: Generic content if engine unavailable.' },
				{ system: 'Analytics → Optimization', pattern: 'Batch: Daily aggregation feeds optimization models. Real-time: Click data for immediate reranking.' }
			],
			checkpoints: [
				'System-of-systems context diagram',
				'Integration pattern documentation for 3+ external systems',
				'Failure mode analysis for each integration',
				'Integration-specific ADRs'
			]
		}
	];

	function toggleLevel(level) {
		expandedLevel = expandedLevel === level ? null : level;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Architect Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Learn to create implementation-ready architecture documentation. arc42, C4 diagrams, ADRs." />
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="max-w-7xl mx-auto p-6">
	<!-- Header -->
	<section class="py-8 md:py-12">
		{#if mounted}
			<a href="/ai/learn" class="inline-flex items-center gap-2 text-sm mb-8 transition-colors" style="color: var(--ai-text-muted);" in:fade={{ duration: 400 }}>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				All Learning Tracks
			</a>

			<div
				in:fade={{ duration: 600, delay: 100 }}
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ai-badge-reference"
			>
				<span class="text-sm font-medium">Architect Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Design Systems. Write Implementation-Ready Docs.
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				Most architecture diagrams are lies. This track teaches you to create documentation someone could build from—without asking you clarifying questions.
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-cyan);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-cyan);"></span>
					8-12 weeks
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-cyan);"></span>
					Final: Complete arc42 document
				</span>
			</div>
		{/if}
	</section>

	<!-- Who This Is For -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 500 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-cyan);">Who This Track Is For</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're a tech lead or senior engineer who documents systems</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You've built systems but struggled to communicate their design</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You want documentation that developers actually use</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're tired of explaining the same architecture decisions repeatedly</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You haven't built production systems yet (see <a href="/ai/learn/builder" style="color: var(--ai-accent-green);" class="hover:underline">Builder Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You want to write persuasive content for executives (see <a href="/ai/learn/strategist" style="color: var(--ai-accent-red);" class="hover:underline">Strategist Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're exploring AI for self-understanding (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);" class="hover:underline">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You need to build AI apps, not document them</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- Prerequisites -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 600 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-accent-orange);">Before You Start</h3>
				<ul class="grid md:grid-cols-2 gap-2 text-sm" style="color: var(--ai-text-secondary);">
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You've built at least one production system
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You've struggled to explain a system's architecture
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You know the difference between a database and an API
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						Complete <a href="/ai/learn/builder" style="color: var(--ai-accent-cyan);" class="hover:underline">Builder Track</a> first if you haven't shipped anything
					</li>
				</ul>
			</div>
		{/if}
	</section>

	<!-- The Voice Shift -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 700 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-cyan);">Critical Concept: The Voice Shift</h3>
				<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">Architecture documentation requires a different voice than thought leadership:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Thought Leadership (exploratory):</p>
						<p class="italic" style="color: var(--ai-text-secondary);">"Here's where I've landed—for now..."</p>
					</div>
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Architecture (definitive):</p>
						<p style="color: var(--ai-text-primary);">"The system uses PostgreSQL for X because Y."</p>
					</div>
				</div>
				<p class="text-sm mt-4" style="color: var(--ai-text-muted);">Architecture docs are reference material. Someone should build from them without asking you questions.</p>
			</div>
		{/if}
	</section>

	<!-- The Levels -->
	<section class="py-8">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 800 }}
				class="text-sm font-semibold uppercase tracking-wider mb-6"
				style="color: var(--ai-text-muted);"
			>
				The Levels
			</h2>

			<div class="space-y-4">
				{#each levels as level, i}
					<div
						in:fly={{ y: 20, duration: 600, delay: 900 + i * 50 }}
						class="ai-card rounded-xl overflow-hidden"
					>
						<button
							on:click={() => toggleLevel(level.level)}
							class="w-full p-6 text-left flex flex-col md:flex-row md:items-start gap-4"
							style="background: var(--ai-bg-card);"
						>
							<div class="flex-shrink-0">
								<div class="w-16 h-16 rounded-lg flex items-center justify-center ai-badge-reference">
									<span class="text-2xl font-bold">{level.level}</span>
								</div>
							</div>

							<div class="flex-1">
								<div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
									<h3 class="text-xl font-bold" style="color: var(--ai-text-primary);">{level.title}</h3>
									<span class="inline-flex items-center px-3 py-1 text-sm rounded-full w-fit" style="background: var(--ai-bg-card-alt); color: var(--ai-text-muted);">
										{level.duration}
									</span>
								</div>

								<p class="mb-4" style="color: var(--ai-text-secondary);">{level.goal}</p>

								<div class="flex items-start gap-2 text-sm">
									<span class="font-semibold flex-shrink-0" style="color: var(--ai-accent-cyan);">Checkpoint:</span>
									<span style="color: var(--ai-text-muted);">{level.checkpoint}</span>
								</div>
							</div>

							<div class="flex-shrink-0 self-center">
								<svg
									class="w-5 h-5 transition-transform duration-200 {expandedLevel === level.level ? 'rotate-180' : ''}"
									style="color: var(--ai-text-muted);"
									fill="none" stroke="currentColor" viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</button>

						{#if expandedLevel === level.level}
							<div class="p-6" style="border-top: 1px solid var(--ai-border-color); background: var(--ai-bg-card-alt);" transition:fade={{ duration: 200 }}>
								<!-- Level 0 -->
								{#if level.level === 0}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Essential Reading</h4>
											<div class="space-y-2">
												{#each level.reading as item}
													<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 rounded-lg transition-colors" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-text-primary);">{item.title}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {item.desc}</span>
														<span class="text-xs ml-2" style="color: var(--ai-accent-cyan);">&rarr;</span>
													</a>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Understand These Terms</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.terms as term}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-cyan);">{term.term}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-secondary);">— {term.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">System Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-cyan);">&#8226;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Create These Artifacts</h4>
											<div class="space-y-3">
												{#each level.artifacts as artifact}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-text-primary);">{artifact.name}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{artifact.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Tools</h4>
											<div class="space-y-1">
												{#each level.tools as tool}
													<div class="flex items-baseline gap-2 text-sm">
														<span class="font-medium" style="color: var(--ai-accent-cyan);">{tool.name}</span>
														<span style="color: var(--ai-text-muted);">— {tool.when}</span>
													</div>
												{/each}
											</div>
										</div>

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- Level 2 -->
								{#if level.level === 2}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">The ADR Workflow</h4>
											<div class="space-y-3">
												{#each level.workflow as step}
													<div class="flex items-start gap-3">
														<span class="font-semibold text-sm whitespace-nowrap" style="color: var(--ai-accent-blue);">{step.phase}:</span>
														<span class="text-sm" style="color: var(--ai-text-secondary);">{step.action}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Write 5 ADRs — Include At Least:</h4>
											<ul class="space-y-2">
												{#each level.adrTypes as type}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-blue);">&#9744;</span>
														<span>{type}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- Level 3 -->
								{#if level.level === 3}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">The 12 arc42 Sections</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.sections as section}
													<div class="p-2 rounded text-sm" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{section.num}. {section.name}</span>
														<span class="ml-1" style="color: var(--ai-text-muted);">— {section.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div class="p-4 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-purple);">
											<p class="font-medium text-sm" style="color: var(--ai-accent-purple);">This is your capstone. Show me the complete document.</p>
										</div>

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}

								<!-- Level 4 -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Document These</h4>
											<div class="space-y-3">
												{#each level.topics as topic}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-orange);">{topic.name}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{topic.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										{#if level.commerceExamples}
											<div>
												<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Commerce Integration Examples</h4>
												<div class="space-y-3">
													{#each level.commerceExamples as ex}
														<div class="p-3 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-orange);">
															<span class="font-medium" style="color: var(--ai-accent-orange);">{ex.system}</span>
															<p class="text-sm mt-1" style="color: var(--ai-text-secondary);">{ex.pattern}</p>
														</div>
													{/each}
												</div>
											</div>
										{/if}

										<div class="pt-6" style="border-top: 1px solid var(--ai-border-color);">
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-text-muted);" class="mt-1">&#9744;</span>
														<span>{cp}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- CTA -->
	<section class="py-8 text-center">
		{#if mounted}
			<h2
				in:fly={{ y: 20, duration: 800, delay: 1200 }}
				class="text-2xl md:text-3xl font-bold mb-4"
				style="color: var(--ai-text-primary);"
			>
				Ready to Show Your Architecture Doc?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				Complete Level 3 and send me your arc42 document. Not an outline—the full document.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Include: Link to doc (Google Docs, Notion, or repo), which system you documented, what was hardest.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Architect%20Track%20-%20Level%203%20Complete&body=Link%20to%20arc42%20document%3A%20%0A%0ASystem%20documented%3A%20%0A%0AWhat%20was%20hardest%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-cyan); color: white;"
				>
					Email Me Your Doc
				</a>
				<a
					href="/ai/learn"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-medium rounded-lg transition-colors"
					style="background: var(--ai-bg-card); color: var(--ai-text-primary); border: 1px solid var(--ai-border-color);"
				>
					Explore Other Tracks
				</a>
			</div>
		{/if}
	</section>

	<!-- Stuck Section -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 1600 }}
				class="rounded-xl p-6 text-center"
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<p class="text-sm" style="color: var(--ai-text-muted);">
					<span class="font-medium" style="color: var(--ai-text-secondary);">Stuck?</span>
					Email me at <a href="mailto:abelino.chavez@gmail.com" style="color: var(--ai-accent-cyan);">abelino.chavez@gmail.com</a> with your blockers. Common issues: not sure which system to document, ADRs feel forced, diagrams don't capture reality.
				</p>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			Architect Track
		</p>
		<a href="/ai/learn" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			All Tracks
		</a>
	</div>
</footer>
