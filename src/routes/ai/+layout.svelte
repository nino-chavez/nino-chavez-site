<script>
	// /ai section shell — inherits the site system (dark ground, site fonts,
	// lime accent). The old ai-theme.css microsite skin is retired (P3;
	// 03-design-brief.md §4 as corrected to the shipped palette).
	import AiSubnav from '$lib/components/ai/AiSubnav.svelte';
</script>

<div class="bg-black text-white min-h-screen">
	<AiSubnav />
	<slot />
</div>
