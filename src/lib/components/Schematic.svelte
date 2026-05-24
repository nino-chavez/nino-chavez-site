<script>
	/**
	 * Schematic-diagram primitives — placeholder shapes for the Phase 3b
	 * hand-drafted SVGs. Renders the correct visual register (1.5px stroke,
	 * no fill, mono labels, violet spine on the load-bearing node) so the
	 * layout reads as engineered, not unfinished. Replace with imported
	 * artworks under static/schematics/ when Phase 3b lands.
	 */
	export let kind = 'forge-pipeline';
	export let caption = '';
</script>

<figure class="schematic">
	{#if kind === 'forge-pipeline'}
		<svg
			viewBox="0 0 880 200"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Forge pipeline: brand-kit JSON drives tokens, copy, images, and a site archetype"
			class="schematic-svg"
		>
			<defs>
				<marker id="fp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke="#8b5cf6" stroke-width="1.5" />
				</marker>
			</defs>
			{#each [{ x: 20, label: 'brand-kit', sub: '.json' }, { x: 190, label: 'tokens', sub: 'CSS vars' }, { x: 360, label: 'copy', sub: 'signal-forge' }, { x: 530, label: 'images', sub: 'image-gen' }, { x: 700, label: 'site archetype', sub: 'forge-site' }] as node, i}
				<rect
					x={node.x}
					y="60"
					width="160"
					height="80"
					rx="0"
					fill="none"
					stroke="#e5e5ea"
					stroke-width="1.5"
				/>
				<text
					x={node.x + 80}
					y="95"
					text-anchor="middle"
					fill="#ffffff"
					font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
					font-size="14"
				>
					{node.label}
				</text>
				<text
					x={node.x + 80}
					y="118"
					text-anchor="middle"
					fill="#8b5cf6"
					font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
					font-size="11"
				>
					{node.sub}
				</text>
				{#if i < 4}
					<line
						x1={node.x + 160}
						y1="100"
						x2={node.x + 190}
						y2="100"
						stroke="#8b5cf6"
						stroke-width="1.5"
						marker-end="url(#fp-arrow)"
					/>
				{/if}
			{/each}
		</svg>
	{:else if kind === 'hesitation-fold'}
		<svg
			viewBox="0 0 720 260"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Hesitation fold: CLAUDE.md rule, UserPromptSubmit hook, and Stop hook all share one classifier"
			class="schematic-svg"
		>
			<defs>
				<marker id="hf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke="#e5e5ea" stroke-width="1.5" />
				</marker>
				<marker id="hf-arrow-v" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L5,10 L10,0" fill="none" stroke="#e5e5ea" stroke-width="1.5" />
				</marker>
			</defs>
			{#each [{ x: 30, label: 'CLAUDE.md', sub: 'declarative rule' }, { x: 280, label: 'UserPromptSubmit', sub: 'predict' }, { x: 530, label: 'Stop hook', sub: 'correct' }] as node, i}
				<rect
					x={node.x}
					y="20"
					width="160"
					height="80"
					fill="none"
					stroke="#e5e5ea"
					stroke-width="1.5"
				/>
				<text
					x={node.x + 80}
					y="55"
					text-anchor="middle"
					fill="#ffffff"
					font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
					font-size="13"
				>
					{node.label}
				</text>
				<text
					x={node.x + 80}
					y="78"
					text-anchor="middle"
					fill="#a8a8b2"
					font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
					font-size="11"
				>
					{node.sub}
				</text>
				{#if i < 2}
					<line
						x1={node.x + 160}
						y1="60"
						x2={node.x + 250}
						y2="60"
						stroke="#e5e5ea"
						stroke-width="1.5"
						marker-end="url(#hf-arrow)"
					/>
				{/if}
				<line
					x1={node.x + 80}
					y1="100"
					x2={node.x + 80}
					y2="170"
					stroke="#8b5cf6"
					stroke-width="1.5"
					stroke-dasharray="4 4"
				/>
			{/each}
			<rect x="200" y="170" width="320" height="60" fill="none" stroke="#8b5cf6" stroke-width="1.5" />
			<text
				x="360"
				y="200"
				text-anchor="middle"
				fill="#c4b5fd"
				font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
				font-size="14"
			>
				classify_situation()
			</text>
			<text
				x="360"
				y="220"
				text-anchor="middle"
				fill="#8b5cf6"
				font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
				font-size="11"
			>
				one classifier · three lifecycle points
			</text>
		</svg>
	{/if}
	{#if caption}
		<figcaption>{caption}</figcaption>
	{/if}
</figure>

<style>
	.schematic {
		margin: 0;
		padding: 0;
	}

	.schematic-svg {
		display: block;
		width: 100%;
		height: auto;
		max-width: 880px;
		margin: 0 auto;
	}

	figcaption {
		margin-top: 1rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #8b5cf6;
		text-align: left;
		max-width: 880px;
		margin-left: auto;
		margin-right: auto;
		line-height: 1.5;
	}
</style>
