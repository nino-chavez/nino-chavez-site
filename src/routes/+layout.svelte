<script>
	import '../app.css';
	// Self-hosted fonts (eliminates external Google Fonts requests)
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/900.css';
	// Bebas Neue is self-hosted in static/fonts with font-display: optional
	// (declared in app.css). Avoids CLS from font swap on the hero headline.
	import '@fontsource/space-grotesk/300.css';
	import '@fontsource/space-grotesk/400.css';
	import '@fontsource/space-grotesk/500.css';
	import '@fontsource/space-grotesk/600.css';
	import '@fontsource/space-grotesk/700.css';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { resolveSeo, SITE_ORIGIN } from '$lib/seo';
	import Toast from '$lib/components/Toast.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	// Every title, description, canonical and share tag on the site is emitted here and
	// nowhere else. Pages contribute via $lib/seo (static routes) or by returning `seo`
	// from their load (dynamic ones) — never by writing their own <svelte:head> meta,
	// which is what put two og:image tags on five routes.
	$: seo = resolveSeo($page.route.id, $page.data?.seo);
	$: canonical = `${SITE_ORIGIN}${$page.url.pathname.replace(/\/$/, '') || '/'}`;
	$: ogTitle = seo.ogTitle ?? seo.title;
	$: ogDescription = seo.ogDescription ?? seo.description;
</script>

<svelte:head>
	<title>{seo.title}</title>
	<meta name="description" content={seo.description} />
	<link rel="canonical" href={canonical} />
	{#if seo.noindex}<meta name="robots" content="noindex, nofollow" />{/if}

	<meta property="og:site_name" content="Nino Chavez" />
	<meta property="og:type" content={seo.type ?? 'website'} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={ogTitle} />
	<meta property="og:description" content={ogDescription} />
	{#if seo.image}
		<meta property="og:image" content={seo.image} />
		<!-- Only when the real dimensions are known. A case study's card is a remote hero
		     at a different aspect ratio, and declaring 1200x630 over it misleads the
		     platforms that use these to reserve layout. -->
		{#if seo.imageWidth && seo.imageHeight}
			<meta property="og:image:width" content={String(seo.imageWidth)} />
			<meta property="og:image:height" content={String(seo.imageHeight)} />
		{/if}
		{#if seo.imageAlt}<meta property="og:image:alt" content={seo.imageAlt} />{/if}
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={ogTitle} />
	<meta name="twitter:description" content={ogDescription} />
	{#if seo.image}<meta name="twitter:image" content={seo.image} />{/if}
</svelte:head>

<div class="min-h-screen bg-neutral-900 text-white" class:mounted>
	<slot />
</div>

<!-- Global Toast Notifications -->
<Toast />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	.mounted {
		opacity: 1;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
</style>