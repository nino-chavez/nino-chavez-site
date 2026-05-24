<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;
	let expandedLevel = null;

	const levels = [
		{
			level: 0,
			title: 'Design Playbook Architecture',
			duration: '2-3 days',
			goal: 'Plan a multi-volume structure before writing a single chapter.',
			checkpoint: 'You have a complete outline with 4 volumes and 12+ chapters',
			structure: [
				{ volume: 'Volume 1: Strategic Framework', purpose: 'Why this matters, core concepts, maturity model' },
				{ volume: 'Volume 2: Methodology', purpose: 'How to do each major activity, step-by-step' },
				{ volume: 'Volume 3: Execution', purpose: 'Team structure, engagement models, governance' },
				{ volume: 'Volume 4: Reference', purpose: 'Templates, checklists, decision trees, glossary' }
			],
			principles: [
				'Each volume should be readable standalone',
				'Chapters within a volume build on each other',
				'Reference material lives in appendices, not inline',
				'Plan cross-references before writing'
			],
			checkpoints: [
				'4-volume structure with clear purpose for each',
				'12+ chapter outlines with section headers',
				'Dependency map (which chapters reference which)',
				'Estimated word count per chapter'
			]
		},
		{
			level: 1,
			title: 'Master a Single Chapter',
			duration: '2-3 weeks',
			goal: 'Write one complete chapter that could stand alone as a reference.',
			checkpoint: 'You have a 5,000+ word chapter with consistent structure',
			chapterStructure: [
				{ section: 'Introduction', desc: 'What this chapter covers, who should read it' },
				{ section: 'Core Concepts', desc: 'Key ideas with definitions' },
				{ section: 'Process/Steps', desc: 'How to do the thing, with detail' },
				{ section: 'Examples', desc: 'Real or realistic scenarios' },
				{ section: 'Common Pitfalls', desc: 'What goes wrong and how to avoid it' },
				{ section: 'Summary', desc: 'Key takeaways, next steps' }
			],
			requirements: [
				'Pick the chapter you know best',
				'Write it as if you won\'t be there to explain it',
				'Include enough detail that someone could act on it'
			],
			checkpoints: [
				'5,000+ word chapter with all 6 sections',
				'Consistent heading hierarchy (H2 → H3 → H4)',
				'At least 2 concrete examples',
				'Someone unfamiliar with the topic could follow it'
			]
		},
		{
			level: 2,
			title: 'Maintain Voice Across Chapters',
			duration: '3-4 weeks',
			goal: 'Write 3 chapters that read like one author wrote them.',
			checkpoint: 'You have 3 chapters with consistent terminology and tone',
			consistency: [
				{ dimension: 'Terminology', example: 'Always "playbook" not "handbook/guide/manual"' },
				{ dimension: 'Tone', example: 'Confident but not arrogant, instructional not academic' },
				{ dimension: 'Structure', example: 'Same sections in same order across chapters' },
				{ dimension: 'Depth', example: 'Similar detail level (don\'t over-explain one thing)' }
			],
			tools: [
				'Style guide document (terms to use/avoid)',
				'Chapter template with required sections',
				'Cross-chapter review (read all 3 sequentially)'
			],
			checkpoints: [
				'3 chapters totaling 15,000+ words',
				'Style guide document with 20+ terms',
				'Consistent structure across all chapters',
				'Someone could read chapters 1, 5, 9 and notice same author'
			]
		},
		{
			level: 3,
			title: 'Build Reference Appendices',
			duration: '3-4 weeks',
			goal: 'Create the supplementary materials that make a playbook actionable.',
			checkpoint: 'You have appendices with templates, worksheets, and decision trees',
			appendixTypes: [
				{ type: 'Templates', desc: 'Fill-in-the-blank documents for common outputs', example: 'Assessment template, status report template' },
				{ type: 'Worksheets', desc: 'Structured exercises to work through', example: 'Capability gap analysis, priority matrix' },
				{ type: 'Decision Trees', desc: 'If-then logic for common decisions', example: 'Which approach to use based on context' },
				{ type: 'Checklists', desc: 'Step-by-step validation lists', example: 'Launch readiness, quality gates' },
				{ type: 'Glossary', desc: 'Definitive terms with definitions', example: 'Domain-specific vocabulary' }
			],
			checkpoints: [
				'At least 3 templates (different types)',
				'At least 2 worksheets with worked examples',
				'At least 1 decision tree',
				'Glossary with 30+ terms',
				'Appendices reference main chapters and vice versa'
			]
		},
		{
			level: 4,
			title: 'Create Client-Agnostic Frameworks',
			duration: '4+ weeks',
			goal: 'Make your playbook reusable across contexts with variable substitution.',
			checkpoint: 'You have a framework that works for multiple clients/contexts',
			abstraction: [
				{ pattern: 'Variable Substitution', desc: '{{client.name}}, {{client.industry}}, {{engagement.scope}}' },
				{ pattern: 'Conditional Sections', desc: 'Include/exclude based on context (enterprise vs SMB)' },
				{ pattern: 'Scalable Examples', desc: 'Examples that work at different scales/industries' },
				{ pattern: 'Configuration Files', desc: 'style-guide.json, quality-rubric.json, abstractions.json' }
			],
			validation: [
				'Test with 2 different "clients" (real or hypothetical)',
				'Have someone else use the framework without your help',
				'Check that substitutions produce coherent output'
			],
			checkpoints: [
				'Framework tested with 2+ different contexts',
				'Configuration files for customization',
				'Quality rubric for scoring outputs',
				'Someone else can use the framework independently'
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
	<title>Author Track - Learning Gateway | Nino Chavez</title>
	<meta name="description" content="Learn to create comprehensive multi-chapter reference works. Playbooks, frameworks, 20K+ words." />
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
				<span class="text-sm font-medium">Author Track</span>
			</div>

			<h1
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-3xl md:text-4xl font-bold mb-4 leading-tight"
				style="color: var(--ai-text-primary);"
			>
				Create Multi-Chapter Reference Works
			</h1>

			<p
				in:fly={{ y: 20, duration: 800, delay: 300 }}
				class="text-lg mb-4 leading-relaxed max-w-3xl"
				style="color: var(--ai-text-secondary);"
			>
				Not blog posts. Playbooks. The kind of document that becomes organizational IP—something people reference for years, not days.
			</p>

			<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm" style="color: var(--ai-text-muted);">
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					5 Levels
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					12-20 weeks
				</span>
				<span class="flex items-center gap-2">
					<span class="w-2 h-2 rounded-full" style="background: var(--ai-accent-purple);"></span>
					Final: 20,000+ word playbook
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
								<span>You have deep expertise you want to codify into a reference</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're building playbooks, guides, or manuals for organizations</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You want repeatable frameworks others can use without you</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: var(--ai-accent-green);" class="mt-0.5">&#10003;</span>
								<span>You're comfortable with long-form writing (20,000+ words)</span>
							</li>
						</ul>
					</div>
					<div>
						<p class="text-sm uppercase tracking-wider mb-2" style="color: var(--ai-text-muted);">This is NOT for you if:</p>
						<ul class="space-y-2 text-sm" style="color: var(--ai-text-secondary);">
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You want to write blog posts, not books (see <a href="/ai/learn/voice" style="color: var(--ai-accent-purple);">Voice Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You need one-off strategy briefs (see <a href="/ai/learn/strategist" style="color: var(--ai-accent-red);">Strategist Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You're exploring AI for self-understanding (see <a href="/ai/learn/explorer" style="color: var(--ai-accent-purple);">Explorer Track</a>)</span>
							</li>
							<li class="flex items-start gap-2">
								<span style="color: #ef4444;" class="mt-0.5">&#10007;</span>
								<span>You don't yet have domain expertise to document</span>
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
						You have deep knowledge in a domain (not surface-level)
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You've written 5,000+ words on a single topic before
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You want to codify knowledge, not just share it
					</li>
					<li class="flex items-center gap-2">
						<span style="color: var(--ai-accent-purple);">&#10003;</span>
						You can commit 3-4 hours per week for 3+ months
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
				<h3 class="text-lg font-semibold mb-4" style="color: var(--ai-accent-purple);">Playbook vs Blog Post</h3>
				<p class="text-sm mb-4" style="color: var(--ai-text-secondary);">A playbook isn't just a long blog post. It's structured differently:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Blog post:</p>
						<p class="italic" style="color: var(--ai-text-secondary);">"Here's what I think about X right now"</p>
					</div>
					<div>
						<p class="mb-2" style="color: var(--ai-text-muted);">Playbook:</p>
						<p style="color: var(--ai-text-primary);">"Here's how to do X, with enough detail that you can do it without me"</p>
					</div>
				</div>
				<p class="text-sm mt-4" style="color: var(--ai-text-muted);">Playbooks are reference material. Someone should be able to open Chapter 7 six months from now and follow the process without context.</p>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">4-Volume Structure</h4>
											<div class="space-y-2">
												{#each level.structure as vol}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-semibold" style="color: var(--ai-accent-purple);">{vol.volume}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{vol.purpose}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Design Principles</h4>
											<ul class="space-y-2">
												{#each level.principles as p}
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

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Chapter Structure</h4>
											<div class="space-y-2">
												{#each level.chapterStructure as section}
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Consistency Dimensions</h4>
											<div class="space-y-2">
												{#each level.consistency as c}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{c.dimension}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{c.example}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Tools to Help</h4>
											<ul class="space-y-2">
												{#each level.tools as tool}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{tool}</span>
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
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Appendix Types</h4>
											<div class="space-y-3">
												{#each level.appendixTypes as a}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{a.type}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{a.desc}</p>
														<p class="text-xs mt-1 italic" style="color: var(--ai-text-muted);">Example: {a.example}</p>
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

								<!-- Level 4 -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Abstraction Patterns</h4>
											<div class="space-y-3">
												{#each level.abstraction as a}
													<div class="p-3 rounded-lg" style="background: var(--ai-bg-card);">
														<span class="font-medium" style="color: var(--ai-accent-purple);">{a.pattern}</span>
														<p class="text-sm mt-1" style="color: var(--ai-text-muted);">{a.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold uppercase tracking-wider mb-3" style="color: var(--ai-text-muted);">Validation</h4>
											<ul class="space-y-2">
												{#each level.validation as v}
													<li class="flex items-start gap-2 text-sm" style="color: var(--ai-text-secondary);">
														<span style="color: var(--ai-accent-purple);">&#8226;</span>
														<span>{v}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 rounded-lg" style="background: var(--ai-bg-card); border-left: 3px solid var(--ai-accent-purple);">
											<p class="font-medium text-sm" style="color: var(--ai-accent-purple);">The test: Can someone else use your framework to produce quality output without your help?</p>
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
				Ready to Show Your Playbook?
			</h2>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1300 }}
				class="text-lg mb-4 max-w-2xl mx-auto"
				style="color: var(--ai-text-secondary);"
			>
				Complete Level 3 and send me your playbook with at least 3 chapters and appendices. Not an outline—the actual content.
			</p>
			<p
				in:fly={{ y: 20, duration: 800, delay: 1400 }}
				class="text-sm mb-8 max-w-xl mx-auto"
				style="color: var(--ai-text-muted);"
			>
				Include: Link to doc, total word count, which chapter was hardest.
			</p>

			<div
				in:fly={{ y: 20, duration: 800, delay: 1500 }}
				class="flex flex-col sm:flex-row gap-4 justify-center"
			>
				<a
					href="mailto:nino@ninochavez.co?subject=Author%20Track%20-%20Level%203%20Complete&body=Link%20to%20playbook%3A%20%0A%0ATotal%20word%20count%3A%20%0A%0AWhich%20chapter%20was%20hardest%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-lg transition-colors"
					style="background: var(--ai-accent-purple); color: white;"
				>
					Email Me Your Playbook
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
					Email me at <a href="mailto:nino@ninochavez.co" style="color: var(--ai-accent-purple);">nino@ninochavez.co</a> with your blockers. Common issues: can't decide on structure, chapters feel disconnected, running out of steam mid-project.
				</p>
			</div>
		{/if}
	</section>
</main>
