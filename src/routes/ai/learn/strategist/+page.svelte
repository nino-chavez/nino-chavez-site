<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Learn the Consultant Voice',
			duration: '1-2 days',
			goal: 'Understand how consultants write differently than engineers or academics.',
			checkpoint: 'You can identify 5 voice patterns in a sample POV',
			patterns: [
				{ pattern: 'BLUF', desc: 'Bottom Line Up Front — lead with the recommendation' },
				{ pattern: 'Options + Recommendation', desc: 'Present choices, then advocate for one' },
				{ pattern: 'So What?', desc: 'Every data point needs an implication' },
				{ pattern: 'Confident Uncertainty', desc: '"Based on X, we recommend Y" — not "maybe try Y?"' },
				{ pattern: 'Structured Assertions', desc: 'Numbered lists, clear hierarchy, scannable' }
			],
			antiPatterns: [
				'Hedging without a position ("There are many options...")',
				'Data dumps without synthesis',
				'Academic distance ("Research suggests...")',
				'Burying the recommendation at the end'
			],
			checkpoints: [
				'Read 2-3 consulting POVs or strategy docs',
				'Identify which patterns they use',
				'Note what feels different from technical writing'
			]
		},
		{
			level: 1,
			title: 'Write Your First POV',
			duration: '1-2 weeks',
			goal: 'Produce a 2,000 word point-of-view document with clear recommendations.',
			checkpoint: 'You have a POV someone could act on without asking you clarifying questions',
			structure: [
				{ section: 'Executive Summary', desc: '200-300 words — entire argument in miniature' },
				{ section: 'Context & Problem', desc: 'What triggered this? Why does it matter?' },
				{ section: 'Options Analysis', desc: '2-3 approaches with trade-offs' },
				{ section: 'Recommendation', desc: 'What you advise and why' },
				{ section: 'Next Steps', desc: 'Specific, actionable, time-bound' }
			],
			requirements: [
				'Pick a real problem (your company, a client, a domain you know)',
				'Have a genuine opinion about what should be done',
				'Be willing to be wrong — POVs are stakes in the ground'
			],
			checkpoints: [
				'2,000+ word document with all 5 sections',
				'Clear recommendation (not "it depends")',
				'Someone unfamiliar with the topic can understand your position'
			]
		},
		{
			level: 2,
			title: 'Cross-Domain Pattern Recognition',
			duration: '2-3 weeks',
			goal: 'Draw insights from multiple industries to strengthen your arguments.',
			checkpoint: 'Your POVs reference patterns from 3+ different contexts',
			technique: [
				{ name: 'Analogical Reasoning', desc: '"This is like when X industry faced Y..."' },
				{ name: 'Pattern Extraction', desc: 'Identify the abstract principle, apply to new context' },
				{ name: 'Counter-Example', desc: 'Show where the pattern broke down and why' }
			],
			sources: [
				'Industry reports (Gartner, Forrester, McKinsey)',
				'Case studies from adjacent domains',
				'Historical precedents (tech history, business history)',
				'Your own past projects (if you can abstract the pattern)'
			],
			checkpoints: [
				'Write a POV that references 3 different industries/contexts',
				'Each reference adds credibility (not just decoration)',
				'You can explain why each analogy is relevant'
			]
		},
		{
			level: 3,
			title: 'Strategic Briefs with Options',
			duration: '2-3 weeks',
			goal: 'Present multiple strategic options with clear trade-off analysis.',
			checkpoint: 'You have a brief with options matrix that a decision-maker could use',
			briefStructure: [
				{ section: 'Situation', desc: 'What\'s happening? What\'s at stake?' },
				{ section: 'Options', desc: '3 distinct approaches (not variations of one)' },
				{ section: 'Analysis', desc: 'Trade-off matrix across key dimensions' },
				{ section: 'Recommendation', desc: 'Which option and why' },
				{ section: 'Risks & Mitigations', desc: 'What could go wrong with your recommendation' }
			],
			dimensions: [
				'Cost (implementation + ongoing)',
				'Timeline (time to value)',
				'Risk (technical, organizational, market)',
				'Capability required (skills, resources)',
				'Strategic fit (alignment with direction)'
			],
			checkpoints: [
				'Brief with 3 genuinely different options',
				'Trade-off matrix covering 4+ dimensions',
				'Clear recommendation with risk acknowledgment',
				'Decision-maker can choose without additional research'
			]
		},
		{
			level: 4,
			title: 'Executive Communication',
			duration: '3+ weeks',
			goal: 'Write for board-level audiences who have 5 minutes and high stakes.',
			checkpoint: 'You have an executive package (summary + appendix) that works at multiple depths',
			principles: [
				{ name: 'Pyramid Principle', desc: 'Start with conclusion, then supporting points, then details' },
				{ name: 'One Page Rule', desc: 'If they only read one page, they get the full picture' },
				{ name: 'Appendix Depth', desc: 'Details exist but don\'t interrupt the main argument' },
				{ name: 'Visual Hierarchy', desc: 'Scanning should reveal structure and priority' }
			],
			package: [
				{ component: 'One-Pager', desc: 'Entire recommendation on one page' },
				{ component: 'Executive Summary', desc: '2-3 page expansion with key evidence' },
				{ component: 'Full Brief', desc: 'Complete analysis (10-20 pages)' },
				{ component: 'Appendices', desc: 'Data, methodology, detailed options' }
			],
			checkpoints: [
				'Executive package with all 4 components',
				'One-pager is self-sufficient',
				'Full brief adds depth without contradicting summary',
				'Someone at C-level could make a decision from this'
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
	<title>Strategist Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Learn to write consulting-grade strategic documents. POVs, strategic briefs, executive communication." />
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
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ai-badge-ask"
			>
				<span class="text-sm font-medium">Strategist Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Write Consulting-Grade Strategic Docs
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				Most strategy documents bury the recommendation on page 12. This track teaches you to write like a consultant—lead with the answer, back it up, get decisions made.
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-red);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-red);"></span>
					6-10 weeks
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-red);"></span>
					Final: Executive strategic brief
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
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-red);">Who This Track Is For</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You advise clients or stakeholders on strategy</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You write for executives who need to make decisions</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You want to communicate recommendations clearly and persuasively</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You come from consulting, advisory, or leadership roles</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're building software, not advising on it (see <a href="/ai/learn/builder" style="color: var(--ai-accent-green);">Builder Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You need technical architecture documentation (see <a href="/ai/learn/architect" style="color: var(--ai-accent-blue);">Architect Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're exploring AI for self-understanding (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You prefer showing data without recommending action</span>
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
				style="background: var(--ai-bg-card-alt); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-accent-orange);">Before You Start</h3>
				<ul class="grid md:grid-cols-2 gap-2 text-sm" style="color: var(--ai-text-secondary);">
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You have opinions about how things should be done
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You've been frustrated by unclear recommendations
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You can write 2,000 coherent words
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-orange);">&#10003;</span>
						You want to influence decisions, not just document them
					</li>
				</ul>
			</div>
		{/if}
	</section>

	<!-- Key Concept -->
	<section class="py-8">
		{#if mounted}
			<div
				in:fly={{ y: 20, duration: 800, delay: 700 }}
				class="rounded-xl p-6"
				style="background: var(--ai-bg-card); border: 1px solid var(--ai-border-color);"
			>
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-red);">The Consultant Voice</h3>
				<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">Strategic writing isn't about being right—it's about being clear enough to be useful.</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Don't write:</p>
						<p class="italic" style="color: var(--ai-text-secondary);">"There are several options to consider, each with various trade-offs..."</p>
					</div>
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Write:</p>
						<p style="color: var(--ai-text-primary);">"We recommend Option B. Here's why, and here's what it costs."</p>
					</div>
				</div>
				<p class="text-sm mt-4" style="color: var(--ai-text-muted);">Your job is to synthesize complexity into actionable recommendations—not to transfer the complexity to your reader.</p>
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
								<div class="w-16 h-16 rounded-lg flex items-center justify-center ai-badge-ask">
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
									<span class="font-semibold flex-shrink-0" style="color: var(--ai-accent-red);">Checkpoint:</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Voice Patterns to Learn</h4>
											<div class="space-y-2">
												{#each level.patterns as item}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-red);">{item.pattern}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {item.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Anti-Patterns to Avoid</h4>
											<ul class="space-y-2">
												{#each level.antiPatterns as item}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: #ef4444;">&#10007;</span>
														<span>{item}</span>
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

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">POV Structure</h4>
											<div class="space-y-2">
												{#each level.structure as section}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-red);">{section.section}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{section.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-red);">&#8226;</span>
														<span>{req}</span>
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

								<!-- Level 2 -->
								{#if level.level === 2}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Pattern Recognition Techniques</h4>
											<div class="space-y-3">
												{#each level.technique as t}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-red);">{t.name}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{t.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Where to Find Patterns</h4>
											<ul class="space-y-2">
												{#each level.sources as source}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-red);">&#8226;</span>
														<span>{source}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Strategic Brief Structure</h4>
											<div class="space-y-2">
												{#each level.briefStructure as section}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-red);">{section.section}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{section.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Trade-off Dimensions</h4>
											<ul class="space-y-1">
												{#each level.dimensions as dim}
													<li class="flex items-baseline gap-2 text-sm">
														<span class="font-medium" style="color: var(--ai-accent-red);">&#8226;</span>
														<span style="color: var(--ai-text-secondary);">{dim}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-red);">
											<p class="font-medium text-sm" style="color: var(--ai-accent-red);">Your options must be genuinely different — not "do it fast" vs "do it slow"</p>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Executive Communication Principles</h4>
											<div class="space-y-3">
												{#each level.principles as p}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-red);">{p.name}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{p.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">The Executive Package</h4>
											<div class="space-y-2">
												{#each level.package as component}
													<div class="flex items-center gap-3 p-2 rounded text-sm" style="background: var(--ai-bg-card);">
														<span class="font-medium w-32" style="color: var(--ai-text-primary);">{component.component}</span>
														<span style="color: var(--ai-text-muted);">{component.desc}</span>
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
				Ready to Show Your Strategic Brief?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				Complete Level 3 and send me your strategic brief with options analysis. Not a summary—the full brief.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Include: Link to doc, what decision it's meant to support, which option you recommended.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:nino@ninochavez.co?subject=Strategist%20Track%20-%20Level%203%20Complete&body=Link%20to%20strategic%20brief%3A%20%0A%0ADecision%20it%20supports%3A%20%0A%0AYour%20recommendation%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-red); color: white;"
				>
					Email Me Your Brief
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
					Email me at <a href="mailto:nino@ninochavez.co" style="color: var(--ai-accent-red);">nino@ninochavez.co</a> with your blockers. Common issues: can't decide what topic to write about, struggling to form an opinion, recommendations feel weak.
				</p>
			</div>
		{/if}
	</section>
</main>
