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
			color: 'gray',
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
			color: 'violet',
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
			color: 'purple',
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
			color: 'fuchsia',
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
			color: 'pink',
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
					class="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6"
				>
					<span class="text-sm font-medium text-violet-400">Author Track</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					Create Multi-Chapter Reference Works
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl text-gray-400 mb-4 leading-relaxed max-w-3xl"
				>
					Not blog posts. Playbooks. The kind of document that becomes organizational IP—something people reference for years, not days.
				</p>

				<div in:fly={{ y: 20, duration: 800, delay: 400 }} class="flex flex-wrap gap-4 text-sm text-gray-500">
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-violet-500"></span>
						5 Levels
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-violet-500"></span>
						12-20 weeks
					</span>
					<span class="flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-violet-500"></span>
						Final: 20,000+ word playbook
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
					You have deep knowledge in a domain (not surface-level)
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You've written 5,000+ words on a single topic before
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You want to codify knowledge, not just share it
				</li>
				<li class="flex items-center gap-2">
					<span class="text-amber-400">&#10003;</span>
					You can commit 3-4 hours per week for 3+ months
				</li>
			</ul>
		</div>
	</section>

	<!-- Key Concept -->
	<section class="py-8 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="p-6 bg-violet-500/5 border border-violet-500/20 rounded-lg">
				<h3 class="text-lg font-semibold text-violet-400 mb-4">Playbook vs Blog Post</h3>
				<p class="text-gray-400 text-sm mb-4">A playbook isn't just a long blog post. It's structured differently:</p>
				<div class="grid md:grid-cols-2 gap-4 text-sm">
					<div>
						<p class="text-gray-500 mb-2">Blog post:</p>
						<p class="text-gray-400 italic">"Here's what I think about X right now"</p>
					</div>
					<div>
						<p class="text-gray-500 mb-2">Playbook:</p>
						<p class="text-white">"Here's how to do X, with enough detail that you can do it without me"</p>
					</div>
				</div>
				<p class="text-gray-500 text-sm mt-4">Playbooks are reference material. Someone should be able to open Chapter 7 six months from now and follow the process without context.</p>
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
									<span class="text-violet-400 font-semibold flex-shrink-0">Checkpoint:</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">4-Volume Structure</h4>
											<div class="space-y-2">
												{#each level.structure as vol}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-violet-400 font-semibold">{vol.volume}</span>
														<p class="text-gray-500 text-sm mt-1">{vol.purpose}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Design Principles</h4>
											<ul class="space-y-2">
												{#each level.principles as p}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-violet-400">&#8226;</span>
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

								<!-- Level 1 -->
								{#if level.level === 1}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Chapter Structure</h4>
											<div class="space-y-2">
												{#each level.chapterStructure as section}
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
														<span class="text-violet-400">&#8226;</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Consistency Dimensions</h4>
											<div class="space-y-2">
												{#each level.consistency as c}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-purple-400 font-medium">{c.dimension}</span>
														<p class="text-gray-500 text-sm mt-1">{c.example}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tools to Help</h4>
											<ul class="space-y-2">
												{#each level.tools as tool}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-purple-400">&#8226;</span>
														<span>{tool}</span>
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
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Appendix Types</h4>
											<div class="space-y-3">
												{#each level.appendixTypes as a}
													<div class="p-3 bg-gray-900 rounded-lg">
														<div class="flex justify-between items-start">
															<span class="text-fuchsia-400 font-medium">{a.type}</span>
														</div>
														<p class="text-gray-500 text-sm mt-1">{a.desc}</p>
														<p class="text-gray-600 text-xs mt-1 italic">Example: {a.example}</p>
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

								<!-- Level 4 -->
								{#if level.level === 4}
									<div class="space-y-6">
										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Abstraction Patterns</h4>
											<div class="space-y-3">
												{#each level.abstraction as a}
													<div class="p-3 bg-gray-900 rounded-lg">
														<span class="text-pink-400 font-medium">{a.pattern}</span>
														<p class="text-gray-500 text-sm mt-1">{a.desc}</p>
													</div>
												{/each}
											</div>
										</div>

										<div>
											<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Validation</h4>
											<ul class="space-y-2">
												{#each level.validation as v}
													<li class="flex items-start gap-2 text-gray-400 text-sm">
														<span class="text-pink-400">&#8226;</span>
														<span>{v}</span>
													</li>
												{/each}
											</ul>
										</div>

										<div class="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg">
											<p class="text-pink-400 font-medium text-sm">The test: Can someone else use your framework to produce quality output without your help?</p>
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
				Ready to Show Your Playbook?
			</h2>
			<p class="text-lg text-gray-400 mb-4 max-w-2xl mx-auto">
				Complete Level 3 and send me your playbook with at least 3 chapters and appendices. Not an outline—the actual content.
			</p>
			<p class="text-sm text-gray-600 mb-8 max-w-xl mx-auto">
				Include: Link to doc, total word count, which chapter was hardest.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Author%20Track%20-%20Level%203%20Complete&body=Link%20to%20playbook%3A%20%0A%0ATotal%20word%20count%3A%20%0A%0AWhich%20chapter%20was%20hardest%3A%20"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-violet-500 text-white font-semibold rounded-lg hover:bg-violet-400 transition-colors"
				>
					Email Me Your Playbook
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
				Email me at <a href="mailto:abelino.chavez@gmail.com" class="text-violet-400 hover:underline">abelino.chavez@gmail.com</a> with your blockers. Common issues: can't decide on structure, chapters feel disconnected, running out of steam mid-project.
			</p>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Author Track
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
	:global(.bg-violet-500\/20) { background-color: rgb(139 92 246 / 0.2); }
	:global(.text-violet-400) { color: rgb(167 139 250); }
	:global(.bg-purple-500\/20) { background-color: rgb(168 85 247 / 0.2); }
	:global(.text-purple-400) { color: rgb(192 132 252); }
	:global(.bg-fuchsia-500\/20) { background-color: rgb(217 70 239 / 0.2); }
	:global(.text-fuchsia-400) { color: rgb(232 121 249); }
	:global(.bg-pink-500\/20) { background-color: rgb(236 72 153 / 0.2); }
	:global(.text-pink-400) { color: rgb(244 114 182); }
</style>
