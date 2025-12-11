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
			color: 'gray',
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
			color: 'rose',
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
			color: 'pink',
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
			color: 'fuchsia',
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
			color: 'red',
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
					class="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-rose-400">Strategist Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Write Consulting-Grade Strategic Docs
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					Most strategy documents bury the recommendation on page 12. This track teaches you to write like a consultant—lead with the answer, back it up, get decisions made.
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-rose-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-rose-500"></span>
						6-10 weeks
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-rose-500"></span>
						Final: Executive strategic brief
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Prerequisites -->
	<section class="py-6 px-6 md:px-12 bg-amber-500/5 border-y border-amber-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3">Before You Start</h3>
			<ul class="grid md:grid-cols-2 gap-2 text-gray-400 text-sm">
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You have opinions about how things should be done
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You've been frustrated by unclear recommendations
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You can write 2,000 coherent words
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You want to influence decisions, not just document them
				</li>
			</ul>
		</div>
	</section>

	<!-- Key Concept -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-6 bg-rose-500/5 border border-rose-500/20 rounded-lg">
				<h3 class="text-lg font-semibold text-rose-400 mb-4">The Consultant Voice</h3>
				<p class="text-gray-400 text-sm mb-4">Strategic writing isn't about being right—it's about being clear enough to be useful.</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-gray-500 mb-2">Don't write:</p>
						<p class="text-gray-400 italic">"There are several options to consider, each with various trade-offs..."</p>
					</div>
					<div>
						<p class="text-gray-500 mb-2">Write:</p>
						<p class="text-white">"We recommend Option B. Here's why, and here's what it costs."</p>
					</div>
				</div>
				<p class="text-gray-500 text-sm mt-4">Your job is to synthesize complexity into actionable recommendations—not to transfer the complexity to your reader.</p>
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
									<span class="text-rose-400 font-semibold flex-shrink-0">Checkpoint:</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Voice Patterns to Learn</h4>
											<div class="space-y-2">
												{#each level.patterns as item}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-rose-400 font-semibold">{item.pattern}</span>
														<span class="text-gray-500 text-sm ml-2">— {item.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Anti-Patterns to Avoid</h4>
											<ul class="space-y-2">
												{#each level.antiPatterns as item}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-red-400">&#10007;</span>
														<span>{item}</span>
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

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">POV Structure</h4>
											<div class="space-y-2">
												{#each level.structure as section}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-white font-medium">{section.section}</span>
														<p class="text-gray-500 text-sm mt-1">{section.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-rose-400">&#8226;</span>
														<span>{req}</span>
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

								<!-- Level 2 -->
								{#if level.level === 2}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Pattern Recognition Techniques</h4>
											<div class="space-y-3">
												{#each level.technique as t}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-pink-400 font-medium">{t.name}</span>
														<p class="text-gray-500 text-sm mt-1">{t.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Where to Find Patterns</h4>
											<ul class="space-y-2">
												{#each level.sources as source}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-pink-400">&#8226;</span>
														<span>{source}</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Strategic Brief Structure</h4>
											<div class="space-y-2">
												{#each level.briefStructure as section}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-fuchsia-400 font-medium">{section.section}</span>
														<p class="text-gray-500 text-sm mt-1">{section.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Trade-off Dimensions</h4>
											<ul class="space-y-1">
												{#each level.dimensions as dim}
													<li class="flex items-baseline gap-2 text-sm">
														<span class="text-fuchsia-400 font-medium">&#8226;</span>
														<span class="text-gray-400">{dim}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg">
											<p class="text-fuchsia-400 font-medium text-sm">Your options must be genuinely different — not "do it fast" vs "do it slow"</p>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Executive Communication Principles</h4>
											<div class="space-y-3">
												{#each level.principles as p}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-red-400 font-medium">{p.name}</span>
														<p class="text-gray-500 text-sm mt-1">{p.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">The Executive Package</h4>
											<div class="space-y-2">
												{#each level.package as component}
													<div class="flex items-center gap-3 p-2 bg-gray-900 rounded text-sm">
														<span class="text-white font-medium w-32">{component.component}</span>
														<span class="text-gray-500">{component.desc}</span>
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
				Ready to Show Your Strategic Brief?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				Complete Level 3 and send me your strategic brief with options analysis. Not a summary—the full brief.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Include: Link to doc, what decision it's meant to support, which option you recommended.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Strategist%20Track%20-%20Level%203%20Complete&body=Link%20to%20strategic%20brief%3A%20%0A%0ADecision%20it%20supports%3A%20%0A%0AYour%20recommendation%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 text-white font-semibold rounded-lg hover:bg-rose-400 transition-colors"
				>
					Email Me Your Brief
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
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-rose-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. Common issues: can't decide what topic to write about, struggling to form an opinion, recommendations feel weak.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Strategist Track
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
	:global(.bg-rose-500\/20) { background-color: rgb(244 63 94 / 0.2); }
	:global(.text-rose-400) { color: rgb(251 113 133); }
	:global(.bg-pink-500\/20) { background-color: rgb(236 72 153 / 0.2); }
	:global(.text-pink-400) { color: rgb(244 114 182); }
	:global(.bg-fuchsia-500\/20) { background-color: rgb(217 70 239 / 0.2); }
	:global(.text-fuchsia-400) { color: rgb(232 121 249); }
	:global(.bg-red-500\/20) { background-color: rgb(239 68 68 / 0.2); }
	:global(.text-red-400) { color: rgb(248 113 113); }
</style>
