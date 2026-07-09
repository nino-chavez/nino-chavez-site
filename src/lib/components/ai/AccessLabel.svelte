<script>
	/** Honest access verb chip — `live` is sensor-backed, never decorative
	 *  (06-triage.md evidence-tier rule). */
	export let access; // AccessLabel
	export let note = '';

	const styles = {
		live: 'text-emerald-400 border-emerald-400/40',
		install: 'text-lime-400 border-lime-400/40',
		clone: 'text-neutral-400 border-neutral-700',
		read: 'text-neutral-400 border-neutral-700',
		gated: 'text-amber-400/90 border-amber-400/30'
	};
</script>

<span
	class="inline-flex items-center gap-1 px-2 py-0.5 border text-[10px] font-mono tracking-widest uppercase {styles[access] ?? styles.clone}"
>
	{access}{#if note}<span class="normal-case tracking-normal text-neutral-500">· {note}</span>{/if}
</span>
