<script>
	import '../app.css';
	// Import self-hosted Inter font weights
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/900.css';

	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import Toast from '$lib/components/Toast.svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;

		// Initialize performance monitoring (production only)
		if (!dev && typeof window !== 'undefined') {
			// Vercel Analytics
			import('@vercel/analytics').then(({ inject }) => inject());

			// Web Vitals monitoring
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
	 <title>Nino Chavez</title>
	 <meta name="description" content="Photographer. DJ. Writer. Builder. Creating things in Chicago." />
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