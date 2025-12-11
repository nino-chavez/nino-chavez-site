<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Identify Reusable Patterns',
			duration: '2-3 days',
			goal: 'Find the workflows worth extracting into skills.',
			checkpoint: 'You can identify 3 workflows that would benefit from skill extraction',
			color: 'gray',
			signals: [
				'You do the same type of task repeatedly (weekly+)',
				'Multiple people need to do the same type of task',
				'The output has consistent structure (not freeform)',
				'Quality varies between executions',
				'You\'ve already written instructions or templates for it'
			],
			mapping: [
				{ column: 'Task', desc: 'What is it? (e.g., "Write architecture doc")' },
				{ column: 'Frequency', desc: 'How often? Weekly? Per project?' },
				{ column: 'People', desc: 'How many people do this?' },
				{ column: 'Structure', desc: 'How consistent is the output?' },
				{ column: 'Quality Gap', desc: 'How much does quality vary?' }
			],
			checkpoints: [
				'Mapped 10+ recurring workflows',
				'Scored each on frequency, people, structure, quality gap',
				'Identified top 3 candidates for skill extraction'
			]
		},
		{
			level: 1,
			title: 'Build Your First Skill',
			duration: '2-3 weeks',
			goal: 'Create a working Claude skill for your top workflow.',
			checkpoint: 'You have a skill that produces consistent, quality output',
			color: 'teal',
			structure: [
				{ file: 'SKILL.md', desc: 'Core prompt with YAML frontmatter (name, description, triggers)' },
				{ file: 'scripts/', desc: 'Python/Bash scripts for automation' },
				{ file: 'references/', desc: 'Documentation loaded into context' },
				{ file: 'assets/', desc: 'Templates, examples, binary files' }
			],
			requirements: [
				'Name under 64 characters',
				'Description under 200 characters (this is what Claude scans)',
				'SKILL.md under 5,000 words',
				'Clear trigger conditions (when should this skill activate?)'
			],
			checkpoints: [
				'Working SKILL.md with valid frontmatter',
				'Skill produces expected output on 5+ test inputs',
				'Someone else can use the skill without explanation'
			]
		},
		{
			level: 2,
			title: 'Add Multi-Format Export',
			duration: '2-3 weeks',
			goal: 'Extend your skill to output multiple formats.',
			checkpoint: 'Your skill exports to 3+ formats',
			color: 'cyan',
			formats: [
				{ format: 'Markdown', use: 'Version control, editing, collaboration' },
				{ format: 'HTML', use: 'Web publishing, previews, interactive elements' },
				{ format: 'PDF', use: 'Print, formal delivery, archival' },
				{ format: 'PPTX', use: 'Presentations, stakeholder reviews' },
				{ format: 'DOCX', use: 'Client edits, redlining, formal documents' }
			],
			patterns: [
				'Generate canonical format first (usually Markdown)',
				'Transform to other formats via scripts',
				'Preserve semantic structure across formats',
				'Handle format-specific features (slides, tracked changes)'
			],
			checkpoints: [
				'Export to at least 3 formats',
				'Automated format conversion (not manual copy-paste)',
				'Format-specific features preserved (not just text dump)'
			]
		},
		{
			level: 3,
			title: 'Implement Quality Gates',
			duration: '2-3 weeks',
			goal: 'Add validation that catches quality issues before delivery.',
			checkpoint: 'Quality rubric with automated checks',
			color: 'emerald',
			rubric: [
				{ dimension: 'Completeness', desc: 'All required sections present' },
				{ dimension: 'Accuracy', desc: 'Claims verifiable, no hallucinations' },
				{ dimension: 'Consistency', desc: 'Terminology, formatting, voice consistent' },
				{ dimension: 'Actionability', desc: 'Clear next steps, implementable' },
				{ dimension: 'Fit', desc: 'Matches audience, context, constraints' }
			],
			automation: [
				'Structural checks (required sections, word counts)',
				'Terminology validation (banned words, required phrases)',
				'Cross-reference validation (internal links work)',
				'LLM scoring against rubric criteria'
			],
			checkpoints: [
				'Quality rubric with 5+ dimensions',
				'At least 2 dimensions automated',
				'Gate blocks delivery when thresholds not met',
				'Documented false positive rate'
			]
		},
		{
			level: 4,
			title: 'Deploy Team-Wide',
			duration: '4+ weeks',
			goal: 'Scale your skill system across teams.',
			checkpoint: 'Multiple teams using skills with governance',
			color: 'violet',
			governance: [
				{ component: 'Skill Registry', desc: 'Catalog of skills with metadata (owner, version, status)' },
				{ component: 'Access Control', desc: 'Who can use, create, modify skills' },
				{ component: 'Version Management', desc: 'How skills evolve, backward compatibility' },
				{ component: 'Quality Standards', desc: 'Minimum bar for new skills' },
				{ component: 'Usage Monitoring', desc: 'Track adoption, success rates, feedback' }
			],
			skillExamples: [
				{ skill: 'Solution Architecture', desc: 'Generates arc42 docs with C4 diagrams. References: templates/, quality rubric with 10 dimensions. Triggers: "document the architecture"' },
				{ skill: 'Strategic Deck', desc: 'Creates slide content with brand colors + typography. Scripts: html2pptx converter. Assets: color palettes, font specs.' },
				{ skill: 'Governance Playbook', desc: 'Multi-volume playbook generator with client variable substitution. Quality gate: terminology validation, section completeness.' },
				{ skill: 'Voice Auditor', desc: 'Scores content against voice principles. References: 550-line voice guide. Output: score card with before/after examples.' }
			],
			metrics: [
				'Skills in production',
				'Users per skill',
				'Time saved vs manual',
				'Quality consistency (variance reduction)',
				'Adoption rate across teams'
			],
			checkpoints: [
				'3+ skills in production use',
				'2+ teams using skill system',
				'Governance process documented and followed',
				'System runs without your involvement for 2+ weeks'
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
	<title>Enterprise Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Scale AI work across teams with reusable skills, multi-format exports, quality gates, and governance." />
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
					class="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-teal-400">Enterprise Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Scale AI Work Across Teams
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					One skill, used well, beats ten prompts. This track teaches you to extract patterns into reusable skills, add quality gates, and deploy across teams.
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-teal-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-teal-500"></span>
						10-16 weeks
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-teal-500"></span>
						Final: Reusable skill with governance
					</span>
				</div>
			{/if}
		</div>
	</section>

	<!-- Who This Is For -->
	<section class="py-8 px-6 md:px-12 bg-teal-500/5 border-y border-teal-500/20">
		<div class="max-w-4xl mx-auto">
			<h3 class="text-lg font-semibold text-teal-400 mb-4">Who This Track Is For</h3>
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-teal-400 mt-0.5">&#10003;</span>
							<span>You're scaling AI workflows across a team or organization</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-teal-400 mt-0.5">&#10003;</span>
							<span>You need reusable, governed AI capabilities (not one-off prompts)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-teal-400 mt-0.5">&#10003;</span>
							<span>You're a team lead or manager responsible for AI adoption</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-teal-400 mt-0.5">&#10003;</span>
							<span>You've completed at least one other track</span>
						</li>
					</ul>
				</div>
				<div>
					<p class="text-sm text-gray-500 uppercase tracking-wider mb-2">This is NOT for you if:</p>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You're just getting started with AI (see <a href="/learn/explorer" class="text-indigo-400 hover:underline">Explorer Track</a>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You haven't shipped production work yet (see <a href="/learn/builder" class="text-emerald-400 hover:underline">Builder Track</a>)</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You're working alone without team requirements</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-red-400 mt-0.5">&#10007;</span>
							<span>You don't have recurring workflows to systematize</span>
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
					You've completed at least one other track
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You have recurring workflows (not one-off tasks)
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You work with or manage a team
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You can write basic Python or Bash scripts
				</li>
			</ul>
		</div>
	</section>

	<!-- Key Concept -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-6 bg-teal-500/5 border border-teal-500/20 rounded-lg">
				<h3 class="text-lg font-semibold text-teal-400 mb-4">Skills vs Prompts</h3>
				<p class="text-gray-400 text-sm mb-4">Most teams share prompts. Skills are better:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-gray-500 mb-2">Prompts:</p>
						<ul class="text-gray-400 space-y-1">
							<li>• Copy-pasted, drift over time</li>
							<li>• No versioning or governance</li>
							<li>• Quality varies by user</li>
							<li>• Hard to improve systematically</li>
						</ul>
					</div>
					<div>
						<p class="text-gray-500 mb-2">Skills:</p>
						<ul class="text-white space-y-1">
							<li>• Versioned, maintained, governed</li>
							<li>• Include scripts, templates, references</li>
							<li>• Consistent quality output</li>
							<li>• Improvements benefit everyone</li>
						</ul>
					</div>
				</div>
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
									<span class="text-teal-400 font-semibold flex-shrink-0">Checkpoint:</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Signals a Workflow Needs a Skill</h4>
											<ul class="space-y-2">
												{#each level.signals as signal}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-teal-400">&#8226;</span>
														<span>{signal}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Workflow Mapping Table</h4>
											<div class="space-y-2">
												{#each level.mapping as col}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-teal-400 font-semibold">{col.column}</span>
														<span class="text-gray-500 text-sm ml-2">— {col.desc}</span>
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
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skill Directory Structure</h4>
											<div class="space-y-2">
												{#each level.structure as item}
													<div class="p-3 bg-gray-900 rounded-lg font-mono">
														<span class="text-teal-400">{item.file}</span>
														<span class="text-gray-500 text-sm ml-2 font-sans">— {item.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-teal-400">&#8226;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Common Export Formats</h4>
											<div class="space-y-2">
												{#each level.formats as f}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-cyan-400 font-medium">{f.format}</span>
														<span class="text-gray-500 text-sm ml-2">— {f.use}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Export Patterns</h4>
											<ul class="space-y-2">
												{#each level.patterns as p}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-cyan-400">&#8226;</span>
														<span>{p}</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Quality Rubric Dimensions</h4>
											<div class="space-y-3">
												{#each level.rubric as r}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-emerald-400 font-medium">{r.dimension}</span>
														<p class="text-gray-500 text-sm mt-1">{r.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Automation Options</h4>
											<ul class="space-y-2">
												{#each level.automation as a}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-emerald-400">&#8226;</span>
														<span>{a}</span>
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
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Governance Components</h4>
											<div class="space-y-3">
												{#each level.governance as g}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-violet-400 font-medium">{g.component}</span>
														<p class="text-gray-500 text-sm mt-1">{g.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										{#if level.skillExamples}
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skill System Examples</h4>
											<div class="space-y-2">
												{#each level.skillExamples as ex}
													<div class="p-3 bg-gray-900 rounded-lg border-l-2 border-violet-500/50">
														<span class="text-violet-400 font-medium text-sm">{ex.skill}</span>
														<p class="text-gray-500 text-xs mt-1">{ex.desc}</p>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Success Metrics</h4>
											<ul class="space-y-1">
												{#each level.metrics as m}
													<li class="flex items-baseline gap-2 text-sm">
														<span class="text-violet-400 font-medium">&#8226;</span>
														<span class="text-gray-400">{m}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
											<p class="text-violet-400 font-medium text-sm">The test: Can your skill system run across teams for 2 weeks without your involvement?</p>
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
				Ready to Show Your Skill?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				Complete Level 1 and send me your skill. Include the SKILL.md, one example output, and what workflow it replaced.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Bonus points if you can share the quality rubric from Level 3.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Enterprise%20Track%20-%20Level%201%20Complete&body=Link%20to%20SKILL.md%3A%20%0A%0AExample%20output%3A%20%0A%0AWorkflow%20it%20replaced%3A%20%0A%0ATime%20saved%20per%20use%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-400 transition-colors"
				>
					Email Me Your Skill
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
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-teal-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. Common issues: can't identify patterns, skill output inconsistent, quality gates too strict/loose.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Enterprise Track
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
	:global(.bg-teal-500\/20) { background-color: rgb(20 184 166 / 0.2); }
	:global(.text-teal-400) { color: rgb(45 212 191); }
	:global(.bg-cyan-500\/20) { background-color: rgb(6 182 212 / 0.2); }
	:global(.text-cyan-400) { color: rgb(34 211 238); }
	:global(.bg-emerald-500\/20) { background-color: rgb(16 185 129 / 0.2); }
	:global(.text-emerald-400) { color: rgb(52 211 153); }
	:global(.bg-violet-500\/20) { background-color: rgb(139 92 246 / 0.2); }
	:global(.text-violet-400) { color: rgb(167 139 250); }
</style>
