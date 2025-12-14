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
		'ai-frameworks': 'from-violet-500/20 to-violet-500/5 border-violet-500/30',
		'enterprise-platforms': 'from-blue-500/20 to-blue-500/5 border-blue-500/30',
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
	<title>Work - Nino Chavez | Production Portfolio</title>
	<meta name="description" content="Production applications, AI frameworks, and enterprise platforms. Built solo with AI agents. Evidence of zero-to-one velocity." />

	<!-- Open Graph -->
	<meta property="og:title" content="Work - Nino Chavez | Production Portfolio" />
	<meta property="og:description" content="Production applications, AI frameworks, and enterprise platforms. Built solo with AI agents." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://ninochavez.co/work" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Work - Nino Chavez | Production Portfolio" />
	<meta name="twitter:description" content="Production applications, AI frameworks, and enterprise platforms." />
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
						Production applications, AI governance frameworks, and enterprise platforms.
						All built solo using AI agents. Not demos—real systems in active use.
					</p>

					<!-- The Signal -->
					<div
						in:fly={{ y: 20, duration: 600, delay: 300 }}
						class="inline-flex items-center gap-3 px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg mb-8"
					>
						<div class="flex items-center gap-2">
							<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
							<span class="text-sm text-gray-400">Looking for</span>
						</div>
						<span class="text-sm font-medium text-white">teams where AI-native velocity is the baseline</span>
					</div>
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
									class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

								<!-- Proof Point -->
								<p class="text-sm text-emerald-400/90 mb-4 line-clamp-2">
									{project.whatThisProves[0]}
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
					Looking for the full story?
				</h2>
				<p class="text-gray-400 mb-6 max-w-2xl mx-auto">
					These projects demonstrate how I work. If you're building something that needs velocity,
					let's talk about what I can bring to your team.
				</p>
				<div class="flex flex-wrap gap-4 justify-center">
					<a
						href="/one-pager"
						class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
					>
						View One-Pager
					</a>
					<a
						href="mailto:abelino.chavez@gmail.com"
						class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
					>
						Get in Touch
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
