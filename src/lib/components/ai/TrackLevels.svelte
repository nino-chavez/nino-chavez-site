<script>
	/** Levels 0-4 accordion. Native details/summary — keyboard-complete
	 *  without JS (brief §3). Level 0 open by default. */
	export let levels; // TrackLevel[]
</script>

<div class="flex flex-col gap-3">
	{#each levels as lvl, i}
		<details
			class="group border border-neutral-800 bg-neutral-950"
			open={i === 0}
			id="level-{lvl.level}"
		>
			<summary
				class="flex items-center gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400"
			>
				<span
					class="w-8 h-8 grid place-items-center border border-lime-400/40 text-lime-400 font-mono text-sm shrink-0"
					>{lvl.level}</span
				>
				<span class="font-bold">{lvl.title}</span>
				<span class="ml-auto font-mono text-[11px] text-neutral-500 shrink-0">{lvl.duration}</span>
				<span
					class="text-neutral-600 transition-transform group-open:rotate-90 shrink-0"
					aria-hidden="true">→</span
				>
			</summary>

			<div class="px-5 pb-6 lg:pl-[68px] flex flex-col gap-5">
				<p class="text-neutral-300">{lvl.goal}</p>

				{#each lvl.sections as section}
					<div>
						<h4 class="font-mono text-[11px] tracking-widest uppercase text-neutral-500 mb-2">
							{section.label}
						</h4>
						{#if section.kind === 'flow'}
							<ol class="flex flex-col gap-1.5 text-sm text-neutral-400 list-decimal list-inside">
								{#each section.items as item}<li>{item}</li>{/each}
							</ol>
						{:else}
							<ul class="flex flex-col gap-1.5 text-sm text-neutral-400">
								{#each section.items as item}
									{#if section.kind === 'keyval' && item.includes(' — ')}
										<li>
											<span class="text-neutral-200 font-medium">{item.split(' — ')[0]}</span>
											<span> — {item.split(' — ').slice(1).join(' — ')}</span>
										</li>
									{:else}
										<li class="flex gap-2"><span class="text-lime-400/70 shrink-0">·</span>{item}</li>
									{/if}
								{/each}
							</ul>
						{/if}
					</div>
				{/each}

				<p class="text-sm text-neutral-500 border-t border-neutral-800/60 pt-3">
					<span class="font-mono text-[11px] tracking-widest uppercase">Done when</span> — {lvl.checkpoint}
				</p>
			</div>
		</details>
	{/each}
</div>
