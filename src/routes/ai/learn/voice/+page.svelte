<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Analyze Your Own Writing',
			duration: '1-2 days',
			goal: 'Find the patterns you already use—before trying to codify them.',
			checkpoint: 'You can identify 5 distinct patterns in your existing writing',
			method: [
				'Gather 10-20 pieces of your writing (posts, emails, docs)',
				'Read them looking for patterns, not quality',
				'Note: sentence length, opening patterns, word choices, tone shifts',
				'Look for what you do consistently (intentional or not)'
			],
			patterns: [
				{ pattern: 'Sentence Rhythm', desc: 'Short punchy? Long flowing? Mixed?' },
				{ pattern: 'Opening Hooks', desc: 'Questions? Bold claims? Stories? Data?' },
				{ pattern: 'Tone Markers', desc: 'Formal/casual? Confident/tentative? Direct/exploratory?' },
				{ pattern: 'Structural Habits', desc: 'Lists? Paragraphs? Headers? Mixed?' },
				{ pattern: 'Signature Phrases', desc: 'Words or phrases you use repeatedly' }
			],
			checkpoints: [
				'List of 5+ patterns you noticed in your writing',
				'Examples of each pattern from your actual work',
				'Notes on which patterns feel intentional vs accidental'
			]
		},
		{
			level: 1,
			title: 'Write Your First Voice Guide',
			duration: '1-2 weeks',
			goal: 'Document your voice so others (or AI) can replicate it.',
			checkpoint: 'You have a 3,000+ word voice specification',
			sections: [
				{ section: 'Core Identity', desc: 'Who is speaking? What do they believe? What makes them distinctive?' },
				{ section: 'Tone Spectrum', desc: 'Where on the formal/casual, confident/humble, direct/exploratory axes?' },
				{ section: 'Structural Patterns', desc: 'How are ideas organized? What formats are preferred?' },
				{ section: 'Language Choices', desc: 'Words to use, words to avoid, signature phrases' },
				{ section: 'Examples', desc: 'Before/after showing voice applied' }
			],
			requirements: [
				'Be specific—"conversational" is too vague',
				'Include anti-patterns (what NOT to do)',
				'Show don\'t just tell (examples > descriptions)'
			],
			checkpoints: [
				'3,000+ word voice guide with all 5 sections',
				'At least 3 before/after examples',
				'Someone else can read it and understand your voice'
			]
		},
		{
			level: 2,
			title: 'Create Multiple Voice Profiles',
			duration: '2-3 weeks',
			goal: 'Define distinct voices for different contexts or audiences.',
			checkpoint: 'You have 2 documented voice profiles that are clearly different',
			contexts: [
				{ context: 'Audience', example: 'Technical readers vs executives vs general public' },
				{ context: 'Purpose', example: 'Teaching vs persuading vs documenting' },
				{ context: 'Medium', example: 'Blog posts vs documentation vs social media' },
				{ context: 'Domain', example: 'Thought leadership vs architecture (inverted voice)' }
			],
			technique: [
				'Start with your base voice',
				'Identify what changes for each context',
				'Document the delta, not a complete rewrite',
				'Create switching rules (when to use which voice)'
			],
			checkpoints: [
				'2 distinct voice profiles documented',
				'Clear switching rules between them',
				'Examples of same content in both voices',
				'Someone else can identify which voice a piece uses'
			]
		},
		{
			level: 3,
			title: 'Build Automated Validation',
			duration: '2-3 weeks',
			goal: 'Create checks that catch voice drift without manual review.',
			checkpoint: 'You have automated voice validation that catches violations',
			approaches: [
				{ approach: 'Word Lists', desc: 'Flag banned words, suggest alternatives' },
				{ approach: 'Pattern Matching', desc: 'Check for required/forbidden sentence structures' },
				{ approach: 'LLM Scoring', desc: 'Prompt an LLM to score adherence to voice guide' },
				{ approach: 'Comparative Analysis', desc: 'Compare new content to corpus of approved content' }
			],
			implementation: [
				'Start simple—word list checks work for most cases',
				'Add LLM scoring for nuanced violations',
				'Build feedback loop (violations → guide updates)',
				'Track metrics (violations over time, common issues)'
			],
			checkpoints: [
				'Working validation tool (any approach)',
				'Can catch at least 3 types of violations',
				'Feedback mechanism to improve guide',
				'Documented false positive rate'
			]
		},
		{
			level: 4,
			title: 'Orchestrate Multi-Voice Systems',
			duration: '3+ weeks',
			goal: 'Manage multiple voices across teams or content types at scale.',
			checkpoint: 'You have a voice system that works without your direct involvement',
			system: [
				{ component: 'Voice Registry', desc: 'Catalog of all voices with metadata (owner, use cases, last updated)' },
				{ component: 'Selection Logic', desc: 'Rules for which voice applies to which content' },
				{ component: 'Validation Pipeline', desc: 'Automated checks run on all content before publish' },
				{ component: 'Drift Detection', desc: 'Monitor for voice inconsistency over time' },
				{ component: 'Governance', desc: 'Who can create/modify voices, approval workflows' }
			],
			metrics: [
				'Voice consistency score across content',
				'Time to validate new content',
				'False positive/negative rates',
				'Voice drift over time'
			],
			checkpoints: [
				'Voice registry with 3+ documented voices',
				'Automated selection and validation',
				'Governance process documented',
				'System works without you for 2+ weeks'
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
	<title>Voice Designer Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Learn to define and maintain consistent voice at scale. Voice guides, validation, multi-voice systems." />
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
				<span class="text-sm font-medium">Voice Designer Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Define and Maintain Voice at Scale
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				"Be conversational" isn't a voice guide. This track teaches you to document voice precisely enough that AI can replicate it—and validate when it drifts.
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					6-10 weeks
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					Final: Voice system with validation
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
								<span>You produce content regularly and want consistent voice</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You want AI to sound like you, not like generic AI</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're a blogger, writer, or thought leader with an audience</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You write for different contexts (blog vs docs vs email)</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're just starting to explore AI (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You don't have existing writing to analyze</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You need architecture docs, not content (see <a href="/ai/learn/architect" style="color: var(--ai-accent-cyan);">Architect Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You want generic AI output, not your voice specifically</span>
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
						You have a body of existing writing (10+ pieces)
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You care about consistency across content
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You're generating content with AI (or plan to)
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You can describe why something "sounds like you"
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
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-purple);">Why Voice Guides Fail</h3>
				<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">Most voice guides are too vague to be useful:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Vague (useless):</p>
						<p class="italic" style="color: var(--ai-text-secondary);">"Be conversational and approachable"</p>
					</div>
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Specific (actionable):</p>
						<p style="color: var(--ai-text-primary);">"Start with a question. Second-person 'you'. No sentences over 20 words. Contractions always."</p>
					</div>
				</div>
				<p class="text-sm mt-4" style="color: var(--ai-text-muted);">A good voice guide is specific enough that you could check compliance automatically.</p>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Analysis Method</h4>
											<ul class="space-y-2">
												{#each level.method as step}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{step}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Patterns to Look For</h4>
											<div class="space-y-2">
												{#each level.patterns as p}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-purple);">{p.pattern}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {p.desc}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Voice Guide Sections</h4>
											<div class="space-y-2">
												{#each level.sections as section}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-text-primary);">{section.section}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Voice Contexts</h4>
											<div class="space-y-2">
												{#each level.contexts as c}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{c.context}</span>
														<span class="text-sm ml-2" style="color: var(--ai-text-muted);">— {c.example}</span>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Technique</h4>
											<ul class="space-y-2">
												{#each level.technique as t}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{t}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Validation Approaches</h4>
											<div class="space-y-3">
												{#each level.approaches as a}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{a.approach}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{a.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Implementation Tips</h4>
											<ul class="space-y-2">
												{#each level.implementation as impl}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{impl}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">System Components</h4>
											<div class="space-y-3">
												{#each level.system as s}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{s.component}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{s.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Metrics to Track</h4>
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
											<p class="font-medium text-sm" style="color: var(--ai-accent-purple);">The test: Can your voice system run for 2 weeks without your involvement?</p>
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
				Ready to Show Your Voice Guide?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				Complete Level 1 and send me your voice guide. Not "be conversational"—the full specification.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Include: Link to guide, link to 2 pieces of writing that follow it, what pattern surprised you most.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Voice%20Designer%20Track%20-%20Level%201%20Complete&body=Link%20to%20voice%20guide%3A%20%0A%0AExamples%20of%20writing%20using%20it%3A%20%0A%0APattern%20that%20surprised%20you%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-purple); color: white;"
				>
					Email Me Your Voice Guide
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
					Email me at <a href="mailto:abelino.chavez@gmail.com" style="color: var(--ai-accent-purple);">abelino.chavez@gmail.com</a> with your blockers. Common issues: can't identify patterns, guide is too vague, validation catches too much/little.
				</p>
			</div>
		{/if}
	</section>
</main>

<!-- Footer -->
<footer class="py-6 px-6 mt-8" style="background: var(--ai-bg-card-alt); border-top: 1px solid var(--ai-border-color);">
	<div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
		<p class="text-xs" style="color: var(--ai-text-muted);">
			Voice Designer Track
		</p>
		<a href="/ai/learn" class="text-xs transition-colors" style="color: var(--ai-text-muted);">
			All Tracks
		</a>
	</div>
</footer>
