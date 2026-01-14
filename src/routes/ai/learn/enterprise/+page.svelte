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
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ai-badge-learn"
			>
				<span class="text-sm font-medium">Enterprise Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Scale AI Work Across Teams
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				One skill, used well, beats ten prompts. This track teaches you to extract patterns into reusable skills, add quality gates, and deploy across teams.
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					10-16 weeks
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					Final: Reusable skill with governance
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
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-purple);">Who This Track Is For</h3>
				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're scaling AI workflows across a team or organization</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You need reusable, governed AI capabilities (not one-off prompts)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're a team lead or manager responsible for AI adoption</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You've completed at least one other track</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're just getting started with AI (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You haven't shipped production work yet (see <a href="/ai/learn/builder" style="color: var(--ai-accent-purple);">Builder Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're working alone without team requirements</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You don't have recurring workflows to systematize</span>
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
				<h3 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Before You Start</h3>
				<ul class="grid md:grid-cols-2 gap-2 text-sm" style="color: var(--ai-text-secondary);">
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You've completed at least one other track
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You have recurring workflows (not one-off tasks)
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You work with or manage a team
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You can write basic Python or Bash scripts
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
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-purple);">Skills vs Prompts</h3>
				<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">Most teams share prompts. Skills are better:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Prompts:</p>
						<ul class="space-y-1" style="color: var(--ai-text-secondary);">
							<li>&#8226; Copy-pasted, drift over time</li>
							<li>&#8226; No versioning or governance</li>
							<li>&#8226; Quality varies by user</li>
							<li>&#8226; Hard to improve systematically</li>
						</ul>
					</div>
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Skills:</p>
						<ul class="space-y-1" style="color: var(--ai-text-primary);">
							<li>&#8226; Versioned, maintained, governed</li>
							<li>&#8226; Include scripts, templates, references</li>
							<li>&#8226; Consistent quality output</li>
							<li>&#8226; Improvements benefit everyone</li>
						</ul>
					</div>
				</div>
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
								<div class="w-16 h-16 rounded-lg flex items-center justify-center ai-badge-learn">
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
									<span class="font-semibold flex-shrink-0" style="color: var(--ai-accent-purple);">Checkpoint:</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Signals a Workflow Needs a Skill</h4>
											<ul class="space-y-2">
												{#each level.signals as signal}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{signal}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Workflow Mapping Table</h4>
											<div class="space-y-2">
												{#each level.mapping as col}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-purple);">{col.column}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {col.desc}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Skill Directory Structure</h4>
											<div class="space-y-2">
												{#each level.structure as item}
													<div class="p-3 rounded-lg font-mono" style="background: var(--ai-bg-card);">
														<span style="color: var(--ai-accent-purple);">{item.file}</span>
														<span class="text-sm ml-2 font-sans" style="color: var(--ai-text-muted);">— {item.desc}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Requirements</h4>
											<ul class="space-y-2">
												{#each level.requirements as req}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Common Export Formats</h4>
											<div class="space-y-2">
												{#each level.formats as f}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{f.format}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {f.use}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Export Patterns</h4>
											<ul class="space-y-2">
												{#each level.patterns as p}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{p}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Quality Rubric Dimensions</h4>
											<div class="space-y-3">
												{#each level.rubric as r}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{r.dimension}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{r.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Automation Options</h4>
											<ul class="space-y-2">
												{#each level.automation as a}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{a}</span>
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

								<!-- Level 4 -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Governance Components</h4>
											<div class="space-y-3">
												{#each level.governance as g}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{g.component}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{g.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										{#if level.skillExamples}
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Skill System Examples</h4>
											<div class="space-y-2">
												{#each level.skillExamples as ex}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-purple);">
														<span class="font-medium text-sm" style="color: var(--ai-accent-purple);">{ex.skill}</span>
														<p class="text-xs mt-1" style="color: var(--ai-text-muted);">{ex.desc}</p>
													</div>
												{/each}
											</div>
										</div>
										{/if}

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Success Metrics</h4>
											<ul class="space-y-1">
												{#each level.metrics as m}
													<li class="flex items-baseline gap-2 text-sm">
														<span class="font-medium" style="color: var(--ai-accent-purple);">&#8226;</span>
														<span style="color: var(--ai-text-secondary);">{m}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-purple);">
											<p class="font-medium text-sm" style="color: var(--ai-accent-purple);">The test: Can your skill system run across teams for 2 weeks without your involvement?</p>
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
				Ready to Show Your Skill?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				Complete Level 1 and send me your skill. Include the SKILL.md, one example output, and what workflow it replaced.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Bonus points if you can share the quality rubric from Level 3.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:nino@ninochavez.co?subject=Enterprise%20Track%20-%20Level%201%20Complete&body=Link%20to%20SKILL.md%3A%20%0A%0AExample%20output%3A%20%0A%0AWorkflow%20it%20replaced%3A%20%0A%0ATime%20saved%20per%20use%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-purple); color: white;"
				>
					Email Me Your Skill
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
					Email me at <a href="mailto:nino@ninochavez.co" style="color: var(--ai-accent-purple);">nino@ninochavez.co</a> with your blockers. Common issues: can't identify patterns, skill output inconsistent, quality gates too strict/loose.
				</p>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			Enterprise Track
		</p>
		<a href="/ai/learn" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			All Tracks
		</a>
	</div>
</footer>
