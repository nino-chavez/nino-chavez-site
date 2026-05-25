<script>
	import '$lib/styles/global.css';
	import { page } from '$app/state';
	import Masthead from '$lib/components/Masthead.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="#0c0e14" />
</svelte:head>

<a class="skip-to-content" href="#main">Skip to content</a>

<Masthead currentPath={page.url.pathname} />

{@render children()}

<SiteFooter />

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}
</style>
