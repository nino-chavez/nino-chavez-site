<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const levels = [
		{
			level: 0,
			title: 'Orientation',
			duration: '1-2 days',
			goal: 'Understand the landscape before you start walking.',
			checkpoint: 'You can explain why AI-assisted development is different from "using ChatGPT"',
			color: 'gray'
		},
		{
			level: 1,
			title: 'First Contact',
			duration: '1 week',
			goal: 'Get your hands dirty. Build something — anything — with AI assistance.',
			checkpoint: 'You have a deployed application you can show me',
			color: 'emerald'
		},
		{
			level: 2,
			title: 'Structured Development',
			duration: '2-4 weeks',
			goal: 'Move from ad-hoc prompting to repeatable workflows.',
			checkpoint: 'You have a spec document and your app has a database and authentication',
			color: 'blue'
		},
		{
			level: 3,
			title: 'Multi-Model & Agents',
			duration: '4-8 weeks',
			goal: 'Move from single prompts to orchestrated systems.',
			checkpoint: 'You\'ve built something that feels like an "agent" not just a "chatbot"',
			color: 'purple'
		},
		{
			level: 4,
			title: 'Production & Governance',
			duration: '8+ weeks',
			goal: 'Build systems that are production-grade, not just demos.',
			checkpoint: 'You can show me metrics, cost tracking, and output validation',
			color: 'amber'
		}
	];

	const techStack = [
		{ category: 'Language', tech: 'TypeScript (strict)', why: 'Type safety catches errors early' },
		{ category: 'Frontend', tech: 'Next.js 15, SvelteKit', why: 'Production-grade, AI-friendly' },
		{ category: 'Database', tech: 'Supabase', why: 'PostgreSQL + Auth + Realtime in one' },
		{ category: 'Styling', tech: 'Tailwind CSS', why: 'Fast iteration, consistent design' },
		{ category: 'Primary LLM', tech: 'Claude (Anthropic)', why: 'Best for coding, reasoning' },
		{ category: 'Framework', tech: 'Vercel AI SDK, LangChain', why: 'Standardized patterns' },
		{ category: 'Dev Tool', tech: 'Claude Code', why: 'CLI-based AI assistance' },
		{ category: 'Testing', tech: 'Playwright', why: 'E2E with visual regression' }
	];

	const resources = [
		{
			title: 'DeepLearning.AI: Agentic AI',
			url: 'https://learn.deeplearning.ai/courses/agentic-ai',
			type: 'Course',
			description: 'Free, foundational course on agentic patterns'
		},
		{
			title: 'Anthropic Claude Documentation',
			url: 'https://docs.anthropic.com/',
			type: 'Docs',
			description: 'The source of truth for Claude'
		},
		{
			title: 'Frontend Masters: Cursor & Claude Code',
			url: 'https://frontendmasters.com/courses/pro-ai/',
			type: 'Course',
			description: 'Practical AI-assisted workflow'
		},
		{
			title: 'Prompt Engineering Guide',
			url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering',
			type: 'Guide',
			description: 'Anthropic\'s official prompt patterns'
		}
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Learning Gateway - Nino Chavez | Agentic AI Learning Path</title>
	<meta name="description" content="A self-directed path for practitioners who want to build with AI, not just talk about it. From orientation to production-grade systems." />
	<meta name="robots" content="noindex, nofollow" />

	<meta property="og:title" content="The Agentic Learning Gateway - Nino Chavez" />
	<meta property="og:description" content="How I learned AI-native development — and how you can too." />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://ninochavez.co/learn" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="The Agentic Learning Gateway" />
	<meta name="twitter:description" content="A self-directed path for practitioners who want to build with AI." />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8"
				>
					<span class="text-sm font-medium text-blue-400">Learning Path v1.0</span>
				</div>

				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					The Agentic Learning Gateway
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-6 leading-relaxed"
				>
					How I learned this — and how you can too.
				</p>

				<p
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="text-lg text-gray-500 mb-12 leading-relaxed max-w-3xl"
				>
					A self-directed path for practitioners who want to <span class="text-white">build with AI</span>, not just talk about it.
				</p>
			{/if}
		</div>
	</section>

	<!-- The Filter -->
	<section class="py-12 px-6 md:px-12 bg-gray-900/50 border-y border-gray-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">Who This Is For</h2>

			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-lg font-semibold text-red-400 mb-4">This path is NOT for you if:</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You want a curriculum you passively consume</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You need someone to tell you exactly what to do next</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
							</svg>
							<span>You're looking for a certification to add to LinkedIn</span>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="text-lg font-semibold text-emerald-400 mb-4">This path IS for you if:</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want a map of the territory I've crossed</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want real projects that force real learning</span>
						</li>
						<li class="flex items-start gap-3 text-gray-400">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span>You want to prove to yourself that you're serious</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- The Hard Truth -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-6">The Hard Truth</h2>

			<div class="bg-gray-900 border border-gray-800 rounded-lg p-8">
				<p class="text-lg text-gray-300 leading-relaxed mb-6">
					I didn't learn this from a course. I learned it by:
				</p>

				<ol class="space-y-4 mb-8">
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">1</span>
						<span class="text-gray-300 pt-1">Starting with fear (of being left behind)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">2</span>
						<span class="text-gray-300 pt-1">Building something real (not a tutorial project)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">3</span>
						<span class="text-gray-300 pt-1">Hitting walls and figuring out how to get past them</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">4</span>
						<span class="text-gray-300 pt-1">Documenting what worked (and what didn't)</span>
					</li>
					<li class="flex items-start gap-4">
						<span class="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">5</span>
						<span class="text-gray-300 pt-1">Repeating — faster each time</span>
					</li>
				</ol>

				<p class="text-gray-400 border-l-2 border-emerald-500 pl-4">
					The 48-64x productivity multiplier I talk about? It didn't come from watching videos. It came from shipping <span class="text-white">8+ production applications</span> in a year while also doing my day job.
				</p>
			</div>

			<p class="mt-8 text-xl text-gray-400 text-center">
				<span class="text-white font-semibold">You can't shortcut the reps.</span> But you can avoid wasting time on the wrong reps.
			</p>
		</div>
	</section>

	<!-- The Levels -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Levels</h2>

			<div class="space-y-6">
				{#each levels as level, i}
					<div class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors duration-300">
						<div class="flex flex-col md:flex-row md:items-start gap-4">
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
									<span class="text-emerald-400 font-semibold flex-shrink-0">Checkpoint:</span>
									<span class="text-gray-500">{level.checkpoint}</span>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Level 1 Deep Dive -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-y border-gray-800">
		<div class="max-w-4xl mx-auto">
			<div class="flex items-center gap-3 mb-6">
				<div class="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
					<span class="text-lg font-bold text-emerald-400">1</span>
				</div>
				<h2 class="text-2xl font-bold">Level 1: The Filter</h2>
			</div>

			<p class="text-lg text-gray-400 mb-8">
				This is where most people stop. It's also where the real learning begins.
			</p>

			<div class="grid md:grid-cols-2 gap-6">
				<div class="bg-gray-900/80 border border-gray-800 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-white mb-4">Your First Build</h3>
					<p class="text-gray-400 mb-4">Build a <span class="text-white">working application</span> in one week. Not a tutorial. Not following along. Your own thing.</p>

					<h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Starter Ideas:</h4>
					<ul class="space-y-2 text-gray-400 text-sm">
						<li>• A personal dashboard that pulls data from an API you use</li>
						<li>• A CLI tool that automates something tedious in your workflow</li>
						<li>• A simple web app that solves a real problem you have</li>
					</ul>
				</div>

				<div class="bg-gray-900/80 border border-gray-800 rounded-lg p-6">
					<h3 class="text-lg font-semibold text-white mb-4">The Rules</h3>
					<ol class="space-y-4">
						<li class="flex items-start gap-3">
							<span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">1</span>
							<span class="text-gray-400">Must be <span class="text-white">functional</span> (not a mockup)</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">2</span>
							<span class="text-gray-400">Must use <span class="text-white">AI assistance</span> throughout</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">3</span>
							<span class="text-gray-400">Must be <span class="text-white">deployed</span> somewhere</span>
						</li>
					</ol>

					<div class="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
						<p class="text-sm text-emerald-400">
							<span class="font-semibold">Come back to me when you've shipped something.</span> We'll talk.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Stack -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I Actually Use</h2>

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-gray-800">
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">Category</th>
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400">Technology</th>
							<th class="text-left py-3 px-4 text-sm font-semibold text-gray-400 hidden md:table-cell">Why</th>
						</tr>
					</thead>
					<tbody>
						{#each techStack as item}
							<tr class="border-b border-gray-800/50 hover:bg-gray-900/50">
								<td class="py-3 px-4 text-sm text-gray-500">{item.category}</td>
								<td class="py-3 px-4 text-sm text-white font-medium">{item.tech}</td>
								<td class="py-3 px-4 text-sm text-gray-400 hidden md:table-cell">{item.why}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- Resources -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">External Resources</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each resources as resource}
					<a
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						class="block bg-gray-900 border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors duration-300 group"
					>
						<div class="flex items-start justify-between gap-4">
							<div>
								<span class="inline-block px-2 py-0.5 bg-blue-500/10 text-blue-400 text-xs font-medium rounded mb-2">
									{resource.type}
								</span>
								<h3 class="text-white font-semibold group-hover:text-blue-400 transition-colors">{resource.title}</h3>
								<p class="text-sm text-gray-500 mt-1">{resource.description}</p>
							</div>
							<svg class="w-5 h-5 text-gray-600 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Filter Statement -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<div class="bg-gradient-to-r from-gray-900 to-gray-900/50 border border-gray-800 rounded-lg p-8 md:p-12">
				<h2 class="text-2xl md:text-3xl font-bold mb-6">The Filter</h2>

				<p class="text-xl text-gray-400 mb-6 leading-relaxed">
					The filter is simple: <span class="text-white font-semibold">Show me what you've shipped.</span>
				</p>

				<p class="text-gray-500 mb-8 leading-relaxed">
					Not what you've read. Not what you're planning. What you've built.
					That's how I know you're serious. That's how I learned. That's how you will too.
				</p>

				<div class="border-t border-gray-800 pt-8">
					<p class="text-gray-400 italic">
						"I spent the last year not selling strategy about AI — but shipping production systems with it.
						The path above is a map of that territory. It's not complete (no map is), and it's constantly evolving. But it's real."
					</p>
					<p class="text-emerald-400 mt-4 font-medium">— Here's where I've landed, for now.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-6 md:px-12 bg-gray-900/30">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				Ready to start?
			</h2>
			<p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
				After you've completed Level 1, reach out. I'm happy to help people who help themselves.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com?subject=Learning%20Gateway%20-%20Level%201%20Complete"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Email Me (After Level 1)
				</a>
				<a
					href="/one-pager"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					</svg>
					About Me
				</a>
				<a
					href="/cv"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-400 font-semibold rounded-lg hover:text-white border border-gray-800 hover:border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Full CV
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				Learning Gateway v1.0 — December 2024
			</p>
			<div class="flex items-center gap-6">
				<a
					href="/"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Portfolio
				</a>
				<a
					href="/one-pager"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					One-Pager
				</a>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Dynamic color classes for levels */
	:global(.bg-gray-500\/20) { background-color: rgb(107 114 128 / 0.2); }
	:global(.text-gray-400) { color: rgb(156 163 175); }
	:global(.bg-emerald-500\/20) { background-color: rgb(16 185 129 / 0.2); }
	:global(.text-emerald-400) { color: rgb(52 211 153); }
	:global(.bg-blue-500\/20) { background-color: rgb(59 130 246 / 0.2); }
	:global(.text-blue-400) { color: rgb(96 165 250); }
	:global(.bg-purple-500\/20) { background-color: rgb(168 85 247 / 0.2); }
	:global(.text-purple-400) { color: rgb(192 132 252); }
	:global(.bg-amber-500\/20) { background-color: rgb(245 158 11 / 0.2); }
	:global(.text-amber-400) { color: rgb(251 191 36); }
</style>
