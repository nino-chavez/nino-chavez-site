<script>
	import AccessLabel from './AccessLabel.svelte';
	import VerifiedStamp from './VerifiedStamp.svelte';

	/** One evidence unit — data-driven from the single artifacts array (P5). */
	export let artifact;
	/** compact = front-door proof strip; full = /ai/work registry */
	export let compact = false;
</script>

<a
	href={artifact.href}
	target={artifact.href.startsWith('http') ? '_blank' : undefined}
	rel={artifact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
	class="group relative flex flex-col gap-3 border border-neutral-800 bg-neutral-950 p-6 transition-colors hover:border-lime-400/50"
>
	<div class="flex items-baseline gap-3 flex-wrap">
		<h3 class="font-display font-bold text-xl group-hover:text-lime-400 transition-colors">
			{artifact.name}
		</h3>
		<AccessLabel access={artifact.access} note={artifact.accessNote ?? ''} />
	</div>

	<p class="text-neutral-400 text-sm leading-relaxed {compact ? '' : 'flex-1'}">
		{artifact.gloss}
	</p>

	{#if artifact.command}
		<code class="font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-1 self-start"
			>{artifact.command}</code
		>
	{/if}

	<div class="flex items-center gap-3 flex-wrap">
		{#if !compact}
			{#each artifact.tracks as t}
				<span class="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border border-neutral-800 text-neutral-500"
					>{t}</span
				>
			{/each}
		{/if}
		<VerifiedStamp verified={artifact.verified} pushedAt={artifact.pushedAt ?? ''} />
	</div>
</a>
