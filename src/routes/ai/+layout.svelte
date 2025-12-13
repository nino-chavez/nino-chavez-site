<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import '$lib/styles/ai-theme.css';

	const aiSections = [
		{ path: '/ai', label: 'Hub', exact: true, description: 'Overview' },
		{ path: '/ai/learn', label: 'Learn', description: 'Skill tracks' },
		{ path: '/ai/build', label: 'Build', description: 'Create' },
		{ path: '/ai/reference', label: 'Reference', description: 'Docs' },
		{ path: '/ai/ask', label: 'Ask Dad', description: 'Chat' }
	];

	let theme = 'dark';

	// Reactive current path for context-aware nav
	$: currentPath = $page.url.pathname;

	// Check if a section is active based on current path
	$: getActiveSection = () => {
		// Check non-exact matches first (more specific paths)
		for (const section of aiSections) {
			if (!section.exact) {
				if (currentPath === section.path || currentPath.startsWith(section.path + '/')) {
					return section.path;
				}
			}
		}
		// Then check exact match for Hub
		if (currentPath === '/ai') {
			return '/ai';
		}
		return null;
	};

	$: activeSection = getActiveSection();

	function isActive(section) {
		return activeSection === section.path;
	}

	function setTheme(newTheme) {
		theme = newTheme;
		if (browser) {
			document.documentElement.setAttribute('data-ai-theme', theme);
			localStorage.setItem('ai-theme', theme);
		}
	}

	function cycleTheme() {
		if (theme === 'light') setTheme('dark');
		else if (theme === 'dark') setTheme('high-contrast');
		else setTheme('light');
	}

	onMount(() => {
		const stored = localStorage.getItem('ai-theme');
		if (stored) {
			theme = stored;
		}
		document.documentElement.setAttribute('data-ai-theme', theme);

		// Keyboard shortcut: T to cycle theme
		const handleKeyDown = (e) => {
			if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
			if (e.key.toLowerCase() === 't') {
				cycleTheme();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="min-h-screen transition-colors duration-300" style="background: var(--ai-bg-page); color: var(--ai-text-primary);">
	<!-- Header with gradient -->
	<header class="py-4 px-6" style="background: var(--ai-bg-header);">
		<div class="max-w-7xl mx-auto">
			<div class="flex justify-between items-center">
				<div class="flex items-center gap-4">
					<a href="/" class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors" style="background: var(--ai-accent-green);">
						<svg class="w-5 h-5" style="color: #460073;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</a>
					<div>
						<h1 class="text-lg font-bold text-white">AI Practice Area</h1>
						<p class="text-sm" style="color: var(--ai-text-on-dark-secondary);">Learning, Building, Referencing</p>
					</div>
				</div>

				<!-- Theme Toggle -->
				<div class="ai-theme-toggle">
					<button
						on:click={() => setTheme('light')}
						class="ai-theme-btn {theme === 'light' ? 'active' : ''}"
						title="Light theme (T)"
					>
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="4" stroke-width="2"/>
							<path stroke-width="2" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
						</svg>
					</button>
					<button
						on:click={() => setTheme('dark')}
						class="ai-theme-btn {theme === 'dark' ? 'active' : ''}"
						title="Dark theme (T)"
					>
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-width="2" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
						</svg>
					</button>
					<button
						on:click={() => setTheme('high-contrast')}
						class="ai-theme-btn {theme === 'high-contrast' ? 'active' : ''}"
						title="High contrast (T)"
					>
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<circle cx="12" cy="12" r="10" stroke-width="2"/>
							<path stroke-width="2" d="M12 2v20"/>
							<path stroke-width="2" d="M12 2a10 10 0 0 1 0 20" fill="currentColor"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Sub-navigation -->
	<nav class="border-b px-6 py-2 sticky top-0 backdrop-blur-sm z-40" style="background: var(--ai-bg-nav); border-color: var(--ai-border-color);">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<div class="flex items-center gap-1">
				{#each aiSections as section}
					{@const active = isActive(section)}
					<a
						href={section.path}
						class="group relative px-3 py-2 rounded-lg text-sm transition-all {active ? 'font-semibold' : 'font-medium'}"
						style="{active
							? 'background: var(--ai-accent-purple); color: white;'
							: 'color: var(--ai-text-secondary);'}"
					>
						<span class="relative z-10">{section.label}</span>
						{#if !active}
							<span class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style="background: var(--ai-bg-card-alt);"></span>
						{/if}
					</a>
				{/each}
			</div>
			<div class="flex items-center gap-3">
				<span class="text-xs hidden sm:block" style="color: var(--ai-text-muted);">
					{#if activeSection}
						{aiSections.find(s => s.path === activeSection)?.description || ''}
					{/if}
				</span>
				<span class="text-xs hidden md:block opacity-50" style="color: var(--ai-text-muted);">T for theme</span>
			</div>
		</div>
	</nav>

	<slot />
</div>
