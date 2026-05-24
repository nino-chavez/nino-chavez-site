<script>
	import '../app.css';
	// Self-hosted fonts (eliminates external Google Fonts requests)
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	// Bebas Neue is self-hosted in static/fonts with font-display: optional
	// (declared in app.css). Avoids CLS from font swap on the hero headline.
	import '@fontsource/space-grotesk/300.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';

	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Toast from '$lib/components/Toast.svelte';
	import Masthead from '$lib/components/compositions/Masthead.svelte';
	import SiteFooter from '$lib/components/compositions/SiteFooter.svelte';

	let mounted = false;

	// Routes that get their own chrome:
	// - /blueprint/* — stakeholder review portal with its own scaffolding masthead
	// - /v1, /now, /links, /privacy, /ai/*, /work* — v2 surfaces (haven't been
	//   refactored yet); they still ship their own headers inline. The v3
	//   chrome only wraps the routes that have been refactored to the design
	//   system. Once /work etc are refactored, they get added here.
	$: pathname = $page.url.pathname;
	$: useV3Chrome =
		pathname === '/' ||
		pathname === '/about' ||
		pathname === '/practice' ||
		pathname === '/contact' ||
		pathname === '/design-system' ||
		pathname === '/writing' ||
		pathname === '/now' ||
		pathname === '/links' ||
		pathname === '/ai' ||
		pathname === '/ai/learn' ||
		pathname.startsWith('/ai/learn/') ||
		pathname.startsWith('/work');

	// /ai/ask intentionally NOT in the v3 chrome list — it owns its full
	// viewport for the chat interface (per DESIGN-PRINCIPLES.md §6:
	// supplementary, not headline; its own visual register).

	onMount(() => {
		mounted = true;

		// Initialize performance monitoring (production only).
		// TODO Phase 3c — drop @vercel/* in favor of CF Web Analytics.
		if (!dev && typeof window !== 'undefined') {
			import('@vercel/analytics').then(({ inject }) => inject());
			import('@vercel/speed-insights/sveltekit').then(({ injectSpeedInsights }) =>
				injectSpeedInsights()
			);

			import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
				onCLS((metric) => console.log('CLS:', metric));
				onFID((metric) => console.log('FID:', metric));
				onLCP((metric) => console.log('LCP:', metric));
				onFCP((metric) => console.log('FCP:', metric));
				onTTFB((metric) => console.log('TTFB:', metric));
			});
		}
	});
</script>

<svelte:head>
	<title>Nino Chavez — Context Engineer</title>
	<meta
		name="description"
		content="Context engineer. Codified a working practice for shipping production software with AI agents. Open toolchain, public case studies."
	/>
</svelte:head>

<div class="root" class:mounted>
	{#if useV3Chrome}
		<div class="site">
			<Masthead />
			<main>
				<slot />
			</main>
			<SiteFooter />
		</div>
	{:else}
		<slot />
	{/if}
</div>

<!-- Global Toast Notifications -->
<Toast />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.root {
		min-height: 100vh;
		background: var(--surface-background);
		color: var(--text-primary);
		font-family: var(--font-body);
	}

	.mounted {
		opacity: 1;
	}

	.site {
		max-width: var(--container-max);
		margin: 0 auto;
		padding: var(--space-8) var(--space-6) var(--space-16);
	}

	main {
		display: block;
	}
</style>
