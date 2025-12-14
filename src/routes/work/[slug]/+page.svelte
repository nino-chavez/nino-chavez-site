<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
	$: project = data.project;

	let mounted = false;

	// Status badge colors
	const statusColors: Record<string, string> = {
		production: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
	};

	// Visibility icons and labels
	const visibilityConfig: Record<string, { label: string; class: string }> = {
		public: { label: 'Open Source', class: 'text-emerald-400' },
		private: { label: 'Private Repository', class: 'text-violet-400' },
		partial: { label: 'Partial Access', class: 'text-amber-400' }
	};

	// Category labels
	const categoryLabels: Record<string, string> = {
		'zero-to-one': 'Zero-to-One Product',
		'ai-frameworks': 'AI/Agentic Framework',
		'enterprise-platforms': 'Enterprise Platform',
		'open-source': 'Open Source'
	};

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>{project.title} - Nino Chavez | Work</title>
	<meta name="description" content="{project.tagline}. {project.description}" />

	<!-- Open Graph -->
	<meta property="og:title" content="{project.title} - Nino Chavez | Work" />
	<meta property="og:description" content="{project.tagline}" />
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://ninochavez.co/work/{project.slug}" />
	<meta property="og:image" content="{project.heroImage}" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="{project.title} - Nino Chavez" />
	<meta name="twitter:description" content="{project.tagline}" />
	<meta name="twitter:image" content="{project.heroImage}" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero -->
	<section class="relative">
		<!-- Background Image -->
		<div class="absolute inset-0 h-[50vh]">
			<img
				src={project.heroImage}
				alt={project.title}
				class="w-full h-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/80 to-gray-950"></div>
		</div>

		<!-- Content -->
		<div class="relative pt-16 pb-8 md:pt-24 md:pb-12 px-6 md:px-12">
			<div class="max-w-4xl mx-auto">
				{#if mounted}
					<!-- Breadcrumb -->
					<nav class="mb-8" in:fade={{ duration: 300 }}>
						<a href="/" class="text-gray-400 hover:text-gray-200 transition-colors text-sm">Home</a>
						<span class="text-gray-600 mx-2">/</span>
						<a href="/work" class="text-gray-400 hover:text-gray-200 transition-colors text-sm">Work</a>
						<span class="text-gray-600 mx-2">/</span>
						<span class="text-gray-200 text-sm">{project.title}</span>
					</nav>

					<!-- Badges -->
					<div class="flex flex-wrap gap-3 mb-6" in:fly={{ y: 20, duration: 400, delay: 100 }}>
						<span class="px-3 py-1 text-sm font-medium rounded-full border {statusColors[project.status]}">
							{project.status}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full bg-gray-800/80 text-gray-300">
							{categoryLabels[project.category]}
						</span>
						<span class="px-3 py-1 text-sm font-medium rounded-full bg-gray-800/80 {visibilityConfig[project.visibility].class}">
							{visibilityConfig[project.visibility].label}
						</span>
					</div>

					<!-- Title -->
					<h1
						class="text-4xl md:text-5xl font-bold mb-4"
						in:fly={{ y: 20, duration: 500, delay: 150 }}
					>
						{project.title}
					</h1>

					<!-- Tagline -->
					<p
						class="text-xl md:text-2xl text-gray-300 mb-8"
						in:fly={{ y: 20, duration: 500, delay: 200 }}
					>
						{project.tagline}
					</p>

					<!-- Quick Links -->
					<div class="flex flex-wrap gap-4" in:fly={{ y: 20, duration: 500, delay: 250 }}>
						{#if project.demo}
							<a
								href={project.demo}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
							>
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
								View Live
							</a>
						{/if}
						{#if project.github && project.visibility === 'public'}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
							>
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
								View Source
							</a>
						{:else if project.visibility === 'private'}
							<span class="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 text-gray-400 font-medium rounded-lg border border-gray-700/50">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
								Private - Available on Request
							</span>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- Metrics Bar -->
	<section class="px-6 md:px-12 py-8 bg-gray-900/50 border-y border-gray-800">
		<div class="max-w-4xl mx-auto">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
				{#each project.metrics as metric}
					<div class="text-center">
						<div class="text-2xl md:text-3xl font-bold text-white">{metric.value}</div>
						<div class="text-sm text-gray-400">{metric.label}</div>
						{#if metric.context}
							<div class="text-xs text-gray-600 mt-1">{metric.context}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Main Content -->
	<div class="px-6 md:px-12 py-12">
		<div class="max-w-4xl mx-auto">
			<!-- Description -->
			<section class="mb-12">
				<p class="text-lg text-gray-300 leading-relaxed">
					{project.description}
				</p>
			</section>

			<!-- Problem & Approach -->
			<section class="grid md:grid-cols-2 gap-8 mb-12">
				<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
					<h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
						<span class="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
							<svg class="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
						</span>
						The Problem
					</h2>
					<p class="text-gray-400 leading-relaxed">{project.problem}</p>
				</div>

				<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
					<h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
						<span class="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
							<svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
							</svg>
						</span>
						The Approach
					</h2>
					<p class="text-gray-400 leading-relaxed">{project.approach}</p>
				</div>
			</section>

			<!-- Architecture -->
			<section class="mb-12">
				<h2 class="text-xl font-bold text-white mb-6">Architecture Decisions</h2>
				<div class="grid gap-3">
					{#each project.architecture as decision}
						<div class="flex items-start gap-3 bg-gray-900/30 border border-gray-800/50 rounded-lg p-4">
							<svg class="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
							</svg>
							<span class="text-gray-300">{decision}</span>
						</div>
					{/each}
				</div>
			</section>

			<!-- Key Decisions -->
			<section class="mb-12">
				<h2 class="text-xl font-bold text-white mb-6">Why I Built It This Way</h2>
				<div class="space-y-4">
					{#each project.keyDecisions as decision}
						<div class="flex items-start gap-3">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
							<span class="text-gray-300">{decision}</span>
						</div>
					{/each}
				</div>
			</section>

			<!-- Tech Stack -->
			<section class="mb-12">
				<h2 class="text-xl font-bold text-white mb-6">Technology Stack</h2>
				<div class="flex flex-wrap gap-2">
					{#each project.stack as tech}
						<span class="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm font-medium">
							{tech}
						</span>
					{/each}
				</div>
			</section>

			<!-- Outcomes -->
			<section class="mb-12">
				<h2 class="text-xl font-bold text-white mb-6">Outcomes</h2>
				<div class="grid md:grid-cols-2 gap-3">
					{#each project.outcomes as outcome}
						<div class="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
							<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="text-gray-300">{outcome}</span>
						</div>
					{/each}
				</div>
			</section>

			<!-- What This Proves -->
			<section class="mb-12">
				<div class="bg-gradient-to-r from-violet-500/10 to-emerald-500/10 border border-gray-800 rounded-xl p-8">
					<h2 class="text-xl font-bold text-white mb-6">What This Proves</h2>
					<p class="text-gray-400 mb-6">For engineering leaders evaluating my work:</p>
					<div class="space-y-4">
						{#each project.whatThisProves as proof}
							<div class="flex items-start gap-3">
								<span class="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
									<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
									</svg>
								</span>
								<span class="text-white font-medium">{proof}</span>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<!-- Timeline -->
			<section class="mb-12">
				<div class="flex items-center gap-6 text-sm text-gray-400">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<span>Started: {project.started}</span>
					</div>
					{#if project.duration}
						<div class="flex items-center gap-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span>{project.duration}</span>
						</div>
					{/if}
				</div>
			</section>

			<!-- Navigation -->
			<section class="border-t border-gray-800 pt-8">
				<div class="flex flex-wrap gap-4 justify-between items-center">
					<a
						href="/work"
						class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Back to All Work
					</a>
					<a
						href="/one-pager"
						class="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
					>
						View One-Pager
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</a>
				</div>
			</section>
		</div>
	</div>
</div>
