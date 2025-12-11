<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Notice Your Prompts',
			duration: '1-2 days',
			goal: 'Become aware of what you\'re actually asking AI to do.',
			checkpoint: 'You can articulate the difference between good and bad prompts you\'ve written',
			color: 'gray',
			insight: 'Most people ask AI questions the way they\'d Google something. That\'s not how this works.',
			exercises: [
				'Write down 5 prompts you\'ve used in the last week',
				'For each one, ask: What did I actually want? Did I get it?',
				'Notice which prompts gave you useful responses vs generic ones',
				'Identify one prompt that surprised you (good or bad)'
			],
			patterns: [
				{ pattern: 'Vague ask', example: '"Help me with my essay"', problem: 'AI doesn\'t know what kind of help' },
				{ pattern: 'Missing context', example: '"Is this good?"', problem: 'Good for what? For whom?' },
				{ pattern: 'Too broad', example: '"Tell me about AI"', problem: 'Could be 10,000 different answers' },
				{ pattern: 'Clear ask', example: '"Read this paragraph and tell me if the argument is logical"', problem: 'Specific, bounded, answerable' }
			],
			checkpoints: [
				'List of 5 recent prompts with what worked/didn\'t',
				'Can explain why some prompts work better than others',
				'Noticed at least one pattern in your own asking style'
			]
		},
		{
			level: 1,
			title: 'Build Your First Mirror',
			duration: '1 week',
			goal: 'Create a single prompt that helps you understand how you think.',
			checkpoint: 'You have a "cognitive mirror" prompt that reveals patterns in your thinking',
			color: 'indigo',
			concept: 'A mirror prompt doesn\'t give you answers—it shows you your own thinking more clearly.',
			components: [
				{ section: 'Context', desc: 'Who you are, what you\'re working with (age, situation, goals)' },
				{ section: 'Input format', desc: 'What you\'ll give the AI (journal entry, decision, problem)' },
				{ section: 'Output structure', desc: 'How you want the reflection organized (sections, questions, patterns)' },
				{ section: 'Anti-patterns', desc: 'What you DON\'T want (therapy-speak, empty encouragement, generic advice)' },
				{ section: 'Tone calibration', desc: 'How direct, how gentle, how challenging' }
			],
			antiPatterns: [
				'Do NOT speak like a therapist',
				'No fake "you got this!!" pep talks',
				'No generic self-help language',
				'No assuming you know what I should do',
				'No fluff or filler'
			],
			checkpoints: [
				'Working mirror prompt (200+ words)',
				'Tested on at least 3 different inputs',
				'Refined based on what felt useful vs generic',
				'Can explain what makes YOUR mirror different from a generic prompt'
			]
		},
		{
			level: 2,
			title: 'Iterate and Version',
			duration: '1-2 weeks',
			goal: 'Track how your prompts evolve as you learn what works.',
			checkpoint: 'You have v2 or v3 of your mirror with documented changes',
			color: 'sky',
			why: 'Your first prompt won\'t be your best. The skill is noticing what to change.',
			process: [
				'After each use, note what was useful and what wasn\'t',
				'Identify patterns: Does it miss certain things? Overexplain others?',
				'Make one change at a time so you know what improved',
				'Keep old versions—you might want to go back'
			],
			versionLog: [
				{ version: 'v1.0', change: 'Initial prompt', why: 'Starting point' },
				{ version: 'v1.1', change: 'Added "no therapy speak"', why: 'Responses felt too soft' },
				{ version: 'v1.2', change: 'Added output structure', why: 'Responses were disorganized' },
				{ version: 'v2.0', change: 'Complete rewrite of tone section', why: 'Found better calibration' }
			],
			checkpoints: [
				'At least 2 versions of your mirror saved',
				'Changelog explaining what changed and why',
				'Can point to specific improvements between versions',
				'Habit of noting what works after each session'
			]
		},
		{
			level: 3,
			title: 'Multiple Modes',
			duration: '2-3 weeks',
			goal: 'Create different prompts for different mental states or needs.',
			checkpoint: 'You have 3+ prompts for different situations',
			color: 'purple',
			insight: 'You think differently when you\'re stuck vs. excited vs. overwhelmed. Your prompts should match.',
			modes: [
				{ mode: 'Reflection Mode', when: 'Processing something that happened', focus: 'Understanding, pattern recognition' },
				{ mode: 'Decision Mode', when: 'Stuck on a choice', focus: 'Trade-offs, blind spots, values clarification' },
				{ mode: 'Creative Mode', when: 'Generating ideas or drafting', focus: 'Expansion, possibilities, "yes and"' },
				{ mode: 'Processing Mode', when: 'Emotions are high', focus: 'Clarity through chaos, separating feeling from fact' },
				{ mode: 'Planning Mode', when: 'Figuring out next steps', focus: 'Sequencing, dependencies, realistic scope' }
			],
			calibration: [
				'Each mode needs different tone (gentle vs challenging)',
				'Each mode needs different output (questions vs frameworks vs options)',
				'You\'ll use some modes more than others—that\'s fine',
				'Modes can evolve independently'
			],
			checkpoints: [
				'3+ distinct prompts for different situations',
				'Clear criteria for when to use which',
				'Tested each mode at least twice',
				'Can explain how the modes differ and why'
			]
		},
		{
			level: 4,
			title: 'From Reflection to Creation',
			duration: 'Ongoing',
			goal: 'Bridge self-understanding to external output.',
			checkpoint: 'You\'ve used what you learned about yourself to create something for others',
			color: 'pink',
			shift: 'Levels 0-3 were inward. This level is about taking what you\'ve learned and pointing it outward.',
			bridges: [
				{ from: 'Understanding your voice', to: 'Writing that sounds like you', track: 'Voice Track' },
				{ from: 'Knowing how you think', to: 'Building tools that think with you', track: 'Builder Track' },
				{ from: 'Decision clarity', to: 'Helping others decide', track: 'Strategist Track' },
				{ from: 'Processing patterns', to: 'Teaching others to process', track: 'Author Track' }
			],
			questions: [
				'What have you learned about how you think?',
				'What would you want to create that reflects that?',
				'Who else might benefit from what you\'ve figured out?',
				'Which track calls to you now that you know yourself better?'
			],
			checkpoints: [
				'Created one thing for someone else using AI',
				'Can articulate what you learned about yourself in Levels 0-3',
				'Identified which track (if any) you want to explore next',
				'Shared your mirror or approach with at least one other person'
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
	<title>Explorer Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Use AI to understand yourself before you use it to produce. Build cognitive mirrors, iterate prompts, find your thinking patterns." />
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
					class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-indigo-400">Explorer Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Use AI to Understand Yourself
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					Before you use AI to produce, use it to reflect. Build prompts that show you how you think—not prompts that think for you.
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-indigo-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-indigo-500"></span>
						4-8 weeks
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-indigo-500"></span>
						Final: Self-understanding + bridge to creation
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Who This Is For -->
	<section class="py-8 px-6 md:px-12 bg-indigo-500/5 border-y border-indigo-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-lg font-semibold text-indigo-400 mb-4">Who This Track Is For</h3>
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-indigo-400 mt-0.5">&#10003;</span>
							<span>You're curious about AI but don't have a specific project</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-indigo-400 mt-0.5">&#10003;</span>
							<span>You want to understand how you think, not just get answers</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-indigo-400 mt-0.5">&#10003;</span>
							<span>You're forming your mind with AI, not adding AI to a formed mind</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-indigo-400 mt-0.5">&#10003;</span>
							<span>You journal, reflect, or want to start</span>
						</li>
					</ul>
				</div>
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is NOT for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You already know what you want to build</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You need to ship something for work next week</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You want AI to do the thinking for you</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You're looking for productivity hacks</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Key Concept -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
				<h3 class="text-lg font-semibold text-indigo-400 mb-4">The Cognitive Mirror</h3>
				<p class="text-gray-400 text-sm mb-4">Most people use AI to get answers. This track teaches you to use AI as a mirror—something that reflects your thinking back to you more clearly than you can see it yourself.</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-gray-500 mb-2">AI as answer machine:</p>
						<p class="text-gray-400 italic">"What should I do about X?"</p>
					</div>
					<div>
						<p class="text-gray-500 mb-2">AI as cognitive mirror:</p>
						<p class="text-white">"Help me see the patterns in how I'm thinking about X"</p>
					</div>
				</div>
				<p class="text-gray-500 text-sm mt-4">The mirror doesn't tell you what to think. It shows you how you already think—so you can decide if that's serving you.</p>
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
									<span class="text-indigo-400 font-semibold flex-shrink-0">Checkpoint:</span>
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
										<div class="p-4 bg-gray-900 rounded-lg border-l-2 border-indigo-500">
											<p class="text-gray-300 text-sm italic">{level.insight}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Exercises</h4>
											<ul class="space-y-2">
												{#each level.exercises as exercise}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-indigo-400">&#8226;</span>
														<span>{exercise}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Prompt Patterns</h4>
											<div class="space-y-2">
												{#each level.patterns as p}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-indigo-400 font-semibold">{p.pattern}</span>
														<p class="text-gray-500 text-sm mt-1">"{p.example}"</p>
														<p class="text-gray-600 text-xs mt-1">{p.problem}</p>
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

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div class="p-4 bg-gray-900 rounded-lg border-l-2 border-indigo-500">
											<p class="text-gray-300 text-sm italic">{level.concept}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Mirror Components</h4>
											<div class="space-y-2">
												{#each level.components as c}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-indigo-400 font-medium">{c.section}</span>
														<p class="text-gray-500 text-sm mt-1">{c.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Anti-Patterns (What to Forbid)</h4>
											<ul class="space-y-1">
												{#each level.antiPatterns as ap}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-red-400">&#10007;</span>
														<span>{ap}</span>
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
										<div class="p-4 bg-gray-900 rounded-lg border-l-2 border-sky-500">
											<p class="text-gray-300 text-sm italic">{level.why}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Iteration Process</h4>
											<ul class="space-y-2">
												{#each level.process as p}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-sky-400">&#8226;</span>
														<span>{p}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Example Version Log</h4>
											<div class="space-y-2 font-mono text-sm">
												{#each level.versionLog as v}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-sky-400">{v.version}</span>
														<span class="text-gray-500 ml-2">— {v.change}</span>
														<p class="text-gray-600 text-xs mt-1">Why: {v.why}</p>
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

								<!-- Level 3 -->
								{#if level.level === 3}
									<div class="space-y-6">
										<div class="p-4 bg-gray-900 rounded-lg border-l-2 border-purple-500">
											<p class="text-gray-300 text-sm italic">{level.insight}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Possible Modes</h4>
											<div class="space-y-3">
												{#each level.modes as m}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-purple-400 font-medium">{m.mode}</span>
														<p class="text-gray-500 text-sm mt-1">When: {m.when}</p>
														<p class="text-gray-600 text-xs mt-1">Focus: {m.focus}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Calibration Notes</h4>
											<ul class="space-y-2">
												{#each level.calibration as c}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-purple-400">&#8226;</span>
														<span>{c}</span>
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

								<!-- Level 4 -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div class="p-4 bg-gray-900 rounded-lg border-l-2 border-pink-500">
											<p class="text-gray-300 text-sm italic">{level.shift}</p>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Bridges to Other Tracks</h4>
											<div class="space-y-3">
												{#each level.bridges as b}
													<div class="p-3 bg-gray-900 rounded-lg">
														<div class="flex items-center gap-2 text-sm">
															<span class="text-gray-500">{b.from}</span>
															<span class="text-pink-400">→</span>
															<span class="text-white">{b.to}</span>
														</div>
														<p class="text-pink-400 text-xs mt-1">{b.track}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Questions to Sit With</h4>
											<ul class="space-y-2">
												{#each level.questions as q}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-pink-400">?</span>
														<span>{q}</span>
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
				Ready to Share Your Mirror?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				Complete Level 1 and send me your cognitive mirror. Not a generic reflection prompt—your prompt, calibrated to your thinking.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Include: The full prompt, one example of using it, what surprised you about how you think.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Explorer%20Track%20-%20Level%201%20Complete&body=My%20cognitive%20mirror%20prompt%3A%20%0A%0AExample%20of%20using%20it%3A%20%0A%0AWhat%20surprised%20me%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-400 transition-colors"
				>
					Email Me Your Mirror
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
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-indigo-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. Common issues: prompt feels generic, not sure what to reflect on, outputs don't feel useful.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Explorer Track
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
	:global(.bg-indigo-500\/20) { background-color: rgb(99 102 241 / 0.2); }
	:global(.text-indigo-400) { color: rgb(129 140 248); }
	:global(.bg-sky-500\/20) { background-color: rgb(14 165 233 / 0.2); }
	:global(.text-sky-400) { color: rgb(56 189 248); }
	:global(.bg-purple-500\/20) { background-color: rgb(168 85 247 / 0.2); }
	:global(.text-purple-400) { color: rgb(192 132 252); }
	:global(.bg-pink-500\/20) { background-color: rgb(236 72 153 / 0.2); }
	:global(.text-pink-400) { color: rgb(244 114 182); }
</style>
