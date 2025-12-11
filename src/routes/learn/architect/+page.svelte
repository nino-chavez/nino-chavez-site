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

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Header -->
	<section class="pt-16 pb-8 md:pt-24 md:pb-12 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<a href="/learn" class="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8" in:fade={{ duration: 400 }}>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
					</svg>
					All Learning Tracks
				</a>

				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-cyan-400">Architect Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Design Systems. Write Implementation-Ready Docs.
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					Most architecture diagrams are lies. This track teaches you to create documentation someone could build from—without asking you clarifying questions.
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-cyan-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-cyan-500"></span>
						8-12 weeks
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-cyan-500"></span>
						Final: Complete arc42 document
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Who This Is For -->
	<section class="py-8 px-6 md:px-12 bg-cyan-500/5 border-y border-cyan-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-lg font-semibold text-cyan-400 mb-4">Who This Track Is For</h3>
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-cyan-400 mt-0.5">&#10003;</span>
							<span>You're a tech lead or senior engineer who documents systems</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-cyan-400 mt-0.5">&#10003;</span>
							<span>You've built systems but struggled to communicate their design</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-cyan-400 mt-0.5">&#10003;</span>
							<span>You want documentation that developers actually use</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-cyan-400 mt-0.5">&#10003;</span>
							<span>You're tired of explaining the same architecture decisions repeatedly</span>
						</li>
					</ul>
				</div>
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is NOT for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You haven't built production systems yet (see <a href="/learn/builder" class="text-emerald-400 hover:underline">Builder Track</a>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You want to write persuasive content for executives (see <a href="/learn/strategist" class="text-rose-400 hover:underline">Strategist Track</a>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You're exploring AI for self-understanding (see <a href="/learn/explorer" class="text-indigo-400 hover:underline">Explorer Track</a>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You need to build AI apps, not document them</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Prerequisites -->
	<section class="py-6 px-6 md:px-12 bg-amber-500/5 border-y border-amber-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Before You Start</h3>
			<ul class="grid md:grid-cols-2 gap-2 text-gray-400 text-sm">
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You've built at least one production system
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You've struggled to explain a system's architecture
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You know the difference between a database and an API
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					Complete <a href="/learn/builder" class="text-cyan-400 hover:underline">Builder Track</a> first if you haven't shipped anything
				</li>
			</ul>
		</div>
	</section>

	<!-- The Voice Shift -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
				<h3 class="text-lg font-semibold text-cyan-400 mb-4">Critical Concept: The Voice Shift</h3>
				<p class="text-gray-400 text-sm mb-4">Architecture documentation requires a different voice than thought leadership:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-gray-500 mb-2">Thought Leadership (exploratory):</p>
						<p class="text-gray-400 italic">"Here's where I've landed—for now..."</p>
					</div>
					<div>
						<p class="text-gray-500 mb-2">Architecture (definitive):</p>
						<p class="text-white">"The system uses PostgreSQL for X because Y."</p>
					</div>
				</div>
				<p class="text-gray-500 text-sm mt-4">Architecture docs are reference material. Someone should build from them without asking you questions.</p>
			</div>
		</div>
	</section>

	<!-- The Levels -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Levels</h2>

			<div class="space-y-4">
				{#each levels as level}
					<div class="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors duration-300">
						<button
							on:click={() => toggleLevel(level.level)}
							class="w-full p-6 text-left flex flex-col md:flex-row md:items-start gap-4"
						>
							<div class="flex-shrink-0">
								<div class="w-16 h-16 rounded-lg bg-{level.color}-500/20 flex items-center justify-center">
									<span class="text-2xl font-bold text-{level.color}-400">{level.level}</span>
								</div>
							</div>

							<div class="flex-1">
								<div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
									<h3 class="text-xl font-bold text-white">{level.title}</h3>
									<span class="inline-flex items-center px-3 py-1 bg-gray-800 text-gray-400 text-sm rounded-full w-fit">
										{level.duration}
									</span>
								</div>

								<p class="text-gray-400 mb-4">{level.goal}</p>

								<div class="flex items-start gap-2 text-sm">
									<span class="text-cyan-400 font-semibold flex-shrink-0">Checkpoint:</span>
									<span class="text-gray-500">{level.checkpoint}</span>
								</div>
							</div>

							<div class="flex-shrink-0 self-center">
								<svg
									class="w-5 h-5 text-gray-500 transition-transform duration-200 {expandedLevel === level.level ? 'rotate-180' : ''}"
									fill="none" stroke="currentColor" viewBox="0 0 24 24"
								>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
								</svg>
							</div>
						</button>

						{#if expandedLevel === level.level}
							<div class="border-t border-gray-800 p-6 bg-gray-950/50" transition:fade={{ duration: 200 }}>
								<!-- Level 0 -->
								{#if level.level === 0}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Essential Reading</h4>
											<div class="space-y-2">
												{#each level.reading as item}
													<a href={item.url} target="_blank" rel="noopener noreferrer" class="block p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
														<span class="text-white font-medium">{item.title}</span>
														<span class="text-gray-500 text-sm ml-2">— {item.desc}</span>
														<span class="text-cyan-400 text-xs ml-2">&rarr;</span>
													</a>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Understand These Terms</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.terms as term}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-cyan-400 font-semibold">{term.term}</span>
														<span class="text-gray-400 text-sm ml-2">— {term.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">System Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-cyan-400">&#8226;</span>
														<span>{req}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Create These Artifacts</h4>
											<div class="space-y-3">
												{#each level.artifacts as artifact}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-white font-medium">{artifact.name}</span>
														<p class="text-gray-500 text-sm mt-1">{artifact.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools</h4>
											<div class="space-y-1">
												{#each level.tools as tool}
													<div class="flex items-baseline gap-2 text-sm">
														<span class="text-cyan-400 font-medium">{tool.name}</span>
														<span class="text-gray-600">— {tool.when}</span>
													</div>
												{/each}
											</div>
										</div>

										<div class="border-t border-gray-800 pt-6">
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">The ADR Workflow</h4>
											<div class="space-y-3">
												{#each level.workflow as step}
													<div class="flex items-start gap-3">
														<span class="text-blue-400 font-semibold text-sm whitespace-nowrap">{step.phase}:</span>
														<span class="text-gray-400 text-sm">{step.action}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Write 5 ADRs — Include At Least:</h4>
											<ul class="space-y-2">
												{#each level.adrTypes as type}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-blue-400">&#9744;</span>
														<span>{type}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="border-t border-gray-800 pt-6">
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">The 12 arc42 Sections</h4>
											<div class="grid md:grid-cols-2 gap-2">
												{#each level.sections as section}
													<div class="p-2 bg-gray-900 rounded text-sm">
														<span class="text-purple-400 font-medium">{section.num}. {section.name}</span>
														<span class="text-gray-600 ml-1">— {section.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div class="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
											<p class="text-purple-400 font-medium text-sm">This is your capstone. Show me the complete document.</p>
										</div>

										<div class="border-t border-gray-800 pt-6">
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">&#9744;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Document These</h4>
											<div class="space-y-3">
												{#each level.topics as topic}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-amber-400 font-medium">{topic.name}</span>
														<p class="text-gray-500 text-sm mt-1">{topic.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										{#if level.commerceExamples}
											<div>
												<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Commerce Integration Examples</h4>
												<div class="space-y-3">
													{#each level.commerceExamples as ex}
														<div class="p-3 bg-gray-900 rounded-lg border-l-2 border-amber-500/50">
															<span class="text-amber-400 font-medium">{ex.system}</span>
															<p class="text-gray-400 text-sm mt-1">{ex.pattern}</p>
														</div>
													{/each}
												</div>
											</div>
										{/if}

										<div class="border-t border-gray-800 pt-6">
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Checkpoints</h4>
											<ul class="space-y-2">
												{#each level.checkpoints as cp}
													<li class="flex items-start gap-2 text-gray-400">
														<span class="text-gray-600 mt-1">&#9744;</span>
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
		</div>
	</section>

	<!-- CTA -->
	<section class="py-16 md:py-24 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-2xl md:text-3xl font-bold mb-6">
				Ready to Show Your Architecture Doc?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				Complete Level 3 and send me your arc42 document. Not an outline—the full document.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Include: Link to doc (Google Docs, Notion, or repo), which system you documented, what was hardest.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Architect%20Track%20-%20Level%203%20Complete&body=Link%20to%20arc42%20document%3A%20%0A%0ASystem%20documented%3A%20%0A%0AWhat%20was%20hardest%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cyan-500 text-gray-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
				>
					Email Me Your Doc
				</a>
				<a
					href="/learn"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
				>
					Explore Other Tracks
				</a>
			</div>
		</div>
	</section>

	<!-- Stuck Section -->
	<section class="py-8 px-6 md:px-12 bg-gray-900/50 border-t border-gray-800">
		<div class="max-w-4xl mx-auto text-center">
			<p class="text-gray-500 text-sm">
				<span class="text-gray-400 font-medium">Stuck?</span>
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-cyan-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. Common issues: not sure which system to document, ADRs feel forced, diagrams don't capture reality.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Architect Track
			</p>
			<a href="/learn" class="text-sm text-gray-500 hover:text-white transition-colors">
				All Tracks
			</a>
		</div>
	</footer>
</div>

<style>
	:global(.bg-gray-500\/20) { background-color: rgb(107 114 128 / 0.2); }
	:global(.text-gray-400) { color: rgb(156 163 175); }
	:global(.bg-cyan-500\/20) { background-color: rgb(6 182 212 / 0.2); }
	:global(.text-cyan-400) { color: rgb(34 211 238); }
	:global(.bg-blue-500\/20) { background-color: rgb(59 130 246 / 0.2); }
	:global(.text-blue-400) { color: rgb(96 165 250); }
	:global(.bg-purple-500\/20) { background-color: rgb(168 85 247 / 0.2); }
	:global(.text-purple-400) { color: rgb(192 132 252); }
	:global(.bg-amber-500\/20) { background-color: rgb(245 158 11 / 0.2); }
	:global(.text-amber-400) { color: rgb(251 191 36); }
</style>
