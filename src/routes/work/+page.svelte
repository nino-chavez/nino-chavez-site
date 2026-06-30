<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { WORK_PROJECTS, WORK_CATEGORIES, type WorkProject } from '$lib/work-data';

	let mounted = false;
	let activeCategory: string = 'all';
	let filteredProjects: WorkProject[] = [];

	// Status badge colors
	const statusColors: Record<string, string> = {
		production: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		active: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		beta: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
	};

	// Visibility badge colors
	const visibilityColors: Record<string, string> = {
		public: 'bg-emerald-500/10 text-emerald-400',
		private: 'bg-violet-500/10 text-violet-400',
		partial: 'bg-amber-500/10 text-amber-400'
	};

	// Category colors
	const categoryColors: Record<string, string> = {
		'zero-to-one': 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
		'ai-tools': 'from-violet-500/20 to-violet-500/5 border-violet-500/30',
		'platforms': 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
		'open-source': 'from-amber-500/20 to-amber-500/5 border-amber-500/30'
	};

	function filterProjects(category: string) {
		activeCategory = category;
		if (category === 'all') {
			filteredProjects = [...WORK_PROJECTS].sort((a, b) => a.order - b.order);
		} else {
			filteredProjects = WORK_PROJECTS.filter(p => p.category === category).sort((a, b) => a.order - b.order);
		}
	}

	onMount(() => {
		mounted = true;
		filterProjects('all');
	});
</script>

<svelte:head>
	<title>Work - Nino Chavez</title>
	<meta name="description" content="Things I've built — production platforms, AI tools, side projects." />

	<!-- Open Graph -->
	<meta property="og:title" content="Work - Nino Chavez" />
	<meta property="og:description" content="Things I've built — production platforms, AI tools, side projects." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/work" />
	<meta property="og:image" content="https://ninochavez.co/images/og-image.jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Work - Nino Chavez" />
	<meta name="twitter:description" content="Projects I've built. Production applications, AI experiments, and things I'm tinkering with." />
	<meta name="twitter:image" content="https://ninochavez.co/images/og-image.jpeg" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-8 md:pt-24 md:pb-12 px-6 md:px-12">
		<div class="max-w-6xl mx-auto">
			{#if mounted}
				<div in:fade={{ duration: 400 }}>
					<!-- Breadcrumb -->
					<nav class="mb-8">
						<a href="/" class="text-gray-500 hover:text-gray-300 transition-colors text-sm">Home</a>
						<span class="text-gray-600 mx-2">/</span>
						<span class="text-gray-300 text-sm">Work</span>
					</nav>

					<!-- Header -->
					<h1
						in:fly={{ y: 20, duration: 600, delay: 100 }}
						class="text-4xl md:text-5xl font-bold mb-4"
					>
						What I've Built
					</h1>

					<p
						in:fly={{ y: 20, duration: 600, delay: 200 }}
						class="text-xl text-gray-400 max-w-3xl mb-8"
					>
						Side projects, experiments, and things I've built. Some are production apps,
						some are just things I wanted to exist.
					</p>
				</div>
			{/if}
		</div>
	</section>

	<!-- Category Filter -->
	<section class="px-6 md:px-12 pb-8">
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-wrap gap-2">
				<button
					class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 {activeCategory === 'all'
						? 'bg-white text-gray-950'
						: 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}"
					on:click={() => filterProjects('all')}
				>
					All Projects
					<span class="ml-2 text-xs opacity-60">{WORK_PROJECTS.length}</span>
				</button>
				{#each WORK_CATEGORIES as category}
					<button
						class="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 {activeCategory === category.id
							? 'bg-white text-gray-950'
							: 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'}"
						on:click={() => filterProjects(category.id)}
					>
						{category.label}
						<span class="ml-2 text-xs opacity-60">{WORK_PROJECTS.filter(p => p.category === category.id).length}</span>
					</button>
				{/each}
			</div>
		</div>
	</section>

	<!-- Project Grid -->
	<section class="px-6 md:px-12 pb-16">
		<div class="max-w-6xl mx-auto">
			{#if mounted}
				<div class="grid md:grid-cols-2 gap-6">
					{#each filteredProjects as project, i (project.slug)}
						<a
							href="/work/{project.slug}"
							in:fly={{ y: 20, duration: 400, delay: i * 50 }}
							class="group block bg-gradient-to-br {categoryColors[project.category]} border rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
						>
							<!-- Image -->
							<div class="aspect-video relative overflow-hidden">
								<img
									src={project.heroImage}
									alt={project.title}
									width="800"
									height="450"
									class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
									decoding="async"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent"></div>

								<!-- Badges -->
								<div class="absolute top-4 left-4 flex gap-2">
									<span class="px-2 py-1 text-xs font-medium rounded border {statusColors[project.status]}">
										{project.status}
									</span>
									<span class="px-2 py-1 text-xs font-medium rounded {visibilityColors[project.visibility]}">
										{project.visibility === 'public' ? 'Open Source' : project.visibility === 'private' ? 'Private' : 'Partial'}
									</span>
								</div>
							</div>

							<!-- Content -->
							<div class="p-6">
								<h3 class="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
									{project.title}
								</h3>
								<p class="text-sm text-gray-400 mb-4">
									{project.tagline}
								</p>

								<!-- Stack Preview -->
								<div class="flex flex-wrap gap-1">
									{#each project.stack.slice(0, 5) as tech}
										<span class="px-2 py-1 text-xs bg-gray-800/50 text-gray-400 rounded">
											{tech}
										</span>
									{/each}
									{#if project.stack.length > 5}
										<span class="px-2 py-1 text-xs bg-gray-800/50 text-gray-500 rounded">
											+{project.stack.length - 5}
										</span>
									{/if}
								</div>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- GitHub Links -->
	<section class="px-6 md:px-12 pb-16">
		<div class="max-w-6xl mx-auto">
			<div class="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
				<h2 class="text-xl font-bold text-white mb-4">GitHub Organizations</h2>
				<p class="text-gray-400 mb-6">
					Work is split across personal and studio accounts. Public repos are linked from individual project pages.
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="https://github.com/nino-chavez"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						nino-chavez
					</a>
					<a
						href="https://github.com/signal-x-studio"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						signal-x-studio
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="px-6 md:px-12 pb-16">
		<div class="max-w-6xl mx-auto">
			<div class="bg-gradient-to-r from-emerald-500/10 to-violet-500/10 border border-gray-800 rounded-xl p-8 text-center">
				<h2 class="text-2xl font-bold text-white mb-4">
					Want to chat?
				</h2>
				<p class="text-gray-400 mb-6 max-w-2xl mx-auto">
					Always happy to talk about building things, photography, or whatever's interesting.
				</p>
				<div class="flex flex-wrap gap-4 justify-center">
					<a
						href="mailto:nino@ninochavez.co"
						class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
					>
						Say Hi
					</a>
					<a
						href="/about"
						class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
					>
						About Me
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
