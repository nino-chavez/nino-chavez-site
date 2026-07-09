<script>
	/** Latest writing — derived from the blog feed on every scheduled build
	 *  (P6 lane 1); never hand-maintained. */
	export let posts; // { title, url, date }[]
</script>

<ul class="flex flex-col">
	{#each posts as post}
		<li class="border-b border-neutral-800">
			<a
				href={post.url}
				class="flex items-baseline justify-between gap-4 py-4 group"
			>
				<span class="group-hover:text-lime-400 transition-colors">{post.title}</span>
				<span class="font-mono text-[11px] text-neutral-500 shrink-0">{post.date}</span>
			</a>
		</li>
	{/each}
</ul>
