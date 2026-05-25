<script>
	import '$lib/styles/global.css';

	export let data;
</script>

<svelte:head>
	<meta name="color-scheme" content="dark" />
	<meta name="theme-color" content="#0c0e14" />
</svelte:head>

<a class="skip-to-content" href="#main">Skip to content</a>

<slot />

<style>
	/* Layout-specific styles only. Tokens + body baseline live in global.css. */
	:global(html) {
		scroll-behavior: smooth;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}
	}
</style>
