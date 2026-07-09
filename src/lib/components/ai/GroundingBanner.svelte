<script>
	import { byId } from '$lib/data/ai/artifacts';
	import AccessLabel from './AccessLabel.svelte';
	import VerifiedStamp from './VerifiedStamp.svelte';

	/** The show-don't-assert bar: every track opens with the shipped artifacts
	 *  demonstrating it (P4). References the registry — no free-floating claims. */
	export let grounding; // Grounding[]
</script>

<section
	aria-labelledby="grounding-heading"
	class="border border-lime-400/30 bg-lime-400/[0.04] p-6 lg:p-8"
>
	<h2
		id="grounding-heading"
		class="font-mono text-xs tracking-widest uppercase text-lime-400 mb-5"
	>
		Demonstrated, not asserted
	</h2>
	<ul class="flex flex-col gap-4">
		{#each grounding as g}
			{@const a = byId(g.artifactId)}
			{#if a}
				<li class="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
					<a
						href={a.href}
						target="_blank"
						rel="noopener noreferrer"
						class="font-bold hover:text-lime-400 transition-colors">{a.name}</a
					>
					<AccessLabel access={a.access} note={a.accessNote ?? ''} />
					<span class="text-neutral-400 text-sm leading-relaxed basis-full sm:basis-auto sm:flex-1"
						>{g.role}</span
					>
					{#if a.command}
						<code class="font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 px-2 py-0.5"
							>{a.command}</code
						>
					{/if}
					<VerifiedStamp verified={a.verified} />
				</li>
			{/if}
		{/each}
	</ul>
</section>
