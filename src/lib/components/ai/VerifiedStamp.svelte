<script>
	/** The freshness architecture made legible (03-design-brief.md §4):
	 *  derived pushed date + the last sensor pass. Stale `verified` values
	 *  fail CI before a visitor ever sees them (claim-lint). */
	export let verified;
	export let pushedAt = '';
</script>

<span class="font-mono text-[10px] text-neutral-500 tracking-wide">
	{#if pushedAt}pushed {pushedAt} · {/if}verified {verified}
</span>
