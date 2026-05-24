<script>
	/**
	 * Schematic-diagram primitives — hand-drafted SVGs per blueprint/03-design-brief.md §3.
	 *
	 *   Register: 1.5px stroke · no fill · JetBrains Mono labels · violet
	 *   (#8b5cf6) for load-bearing elements · neutral (#e5e5ea) for outline ·
	 *   deterministic geometry · no decoration.
	 *
	 * Two marquee diagrams (forge-pipeline, hesitation-fold) and five
	 * per-case-study diagrams (rally-hq, atelier, ask-bc, photography,
	 * bc-subscriptions). All inline so they participate in the SvelteKit
	 * bundle rather than living as static assets — same geometry edits flow
	 * through the same review surface.
	 */
	export let kind = 'forge-pipeline';
	export let caption = '';

	// shared color tokens for inline SVG (must duplicate from tokens.css since
	// SVG attribute values can't reference CSS custom properties cross-shadow)
	const STROKE = '#e5e5ea';
	const SPINE = '#8b5cf6';
	const SOFT = '#c4b5fd';
	const TEXT = '#ffffff';
	const MUTED = '#a8a8b2';
	const FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
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
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>
			{#each [{ x: 20, label: 'brand-kit', sub: '.json' }, { x: 190, label: 'tokens', sub: 'CSS vars' }, { x: 360, label: 'copy', sub: 'signal-forge' }, { x: 530, label: 'images', sub: 'image-gen' }, { x: 700, label: 'site archetype', sub: 'forge-site' }] as node, i}
				<rect x={node.x} y="60" width="160" height="80" fill="none" stroke={STROKE} stroke-width="1.5" />
				<text x={node.x + 80} y="95" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="14">{node.label}</text>
				<text x={node.x + 80} y="118" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">{node.sub}</text>
				{#if i < 4}
					<line x1={node.x + 160} y1="100" x2={node.x + 190} y2="100" stroke={SPINE} stroke-width="1.5" marker-end="url(#fp-arrow)" />
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
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={STROKE} stroke-width="1.5" />
				</marker>
			</defs>
			{#each [{ x: 30, label: 'CLAUDE.md', sub: 'declarative rule' }, { x: 280, label: 'UserPromptSubmit', sub: 'predict' }, { x: 530, label: 'Stop hook', sub: 'correct' }] as node, i}
				<rect x={node.x} y="20" width="160" height="80" fill="none" stroke={STROKE} stroke-width="1.5" />
				<text x={node.x + 80} y="55" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">{node.label}</text>
				<text x={node.x + 80} y="78" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">{node.sub}</text>
				{#if i < 2}
					<line x1={node.x + 160} y1="60" x2={node.x + 250} y2="60" stroke={STROKE} stroke-width="1.5" marker-end="url(#hf-arrow)" />
				{/if}
				<line x1={node.x + 80} y1="100" x2={node.x + 80} y2="170" stroke={SPINE} stroke-width="1.5" stroke-dasharray="4 4" />
			{/each}
			<rect x="200" y="170" width="320" height="60" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="360" y="200" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="14">classify_situation()</text>
			<text x="360" y="220" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">one classifier · three lifecycle points</text>
		</svg>

	{:else if kind === 'rally-hq-blueprint-pipeline'}
		<svg
			viewBox="0 0 880 360"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Rally HQ + Blueprint: the big-blueprint methodology produces two paired deployable surfaces — the product (rallyhq.app) and the methodology surface (blueprint.rallyhq.app)"
			class="schematic-svg"
		>
			<defs>
				<marker id="rh-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>

			<!-- Top: 7-stage methodology -->
			<rect x="40" y="20" width="800" height="80" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="440" y="48" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="13">big-blueprint · 7-stage methodology</text>
			{#each ['research', 'principles', 'prototype', 'fact-check', 'docs', 'deploy', 'iterate'] as stage, i}
				<text x={70 + i * 110} y="80" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="11">{i + 1}. {stage}</text>
			{/each}

			<!-- Spine arrows -->
			<line x1="280" y1="100" x2="280" y2="180" stroke={SPINE} stroke-width="1.5" marker-end="url(#rh-arrow)" />
			<line x1="600" y1="100" x2="600" y2="180" stroke={SPINE} stroke-width="1.5" marker-end="url(#rh-arrow)" />
			<text x="295" y="145" fill={MUTED} font-family={FONT_MONO} font-size="11">instantiates</text>
			<text x="615" y="145" fill={MUTED} font-family={FONT_MONO} font-size="11">documents</text>

			<!-- Two surfaces -->
			<rect x="120" y="190" width="320" height="140" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="280" y="218" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="14">rallyhq.app</text>
			<text x="280" y="240" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">product surface</text>
			<text x="280" y="270" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">multi-tenant SaaS</text>
			<text x="280" y="290" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">capability-based permissions</text>
			<text x="280" y="310" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">real-time bracket updates</text>

			<rect x="440" y="190" width="320" height="140" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="600" y="218" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="14">blueprint.rallyhq.app</text>
			<text x="600" y="240" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">methodology surface</text>
			<text x="600" y="270" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">7-stage outputs as docs</text>
			<text x="600" y="290" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">per-page strategy drawers</text>
			<text x="600" y="310" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">fact-check citations inline</text>
		</svg>

	{:else if kind === 'atelier-12-tool-mcp'}
		<svg
			viewBox="0 0 880 360"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Atelier: three consumer surfaces (IDE, browser, terminal) interact with a 12-tool MCP protocol backed by a Cloudflare Worker substrate"
			class="schematic-svg"
		>
			<defs>
				<marker id="at-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>

			<!-- Top: three consumer surfaces -->
			{#each [{ x: 90, label: 'IDE' }, { x: 360, label: 'browser' }, { x: 630, label: 'terminal' }] as surface}
				<rect x={surface.x} y="20" width="160" height="56" fill="none" stroke={STROKE} stroke-width="1.5" />
				<text x={surface.x + 80} y="54" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">{surface.label}</text>
			{/each}

			<!-- arrows down to MCP -->
			{#each [170, 440, 710] as cx}
				<line x1={cx} y1="76" x2={cx} y2="120" stroke={STROKE} stroke-width="1.5" marker-end="url(#at-arrow)" />
			{/each}

			<!-- MCP spine -->
			<rect x="60" y="124" width="760" height="64" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="440" y="150" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="14">12-tool open MCP protocol</text>
			<text x="440" y="172" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">specification — implementable on any stack</text>

			<!-- arrow down to substrate -->
			<line x1="440" y1="188" x2="440" y2="220" stroke={SPINE} stroke-width="1.5" marker-end="url(#at-arrow)" />

			<!-- Bottom: substrate features -->
			{#each [{ x: 40, label: 'role-aware', sub: 'lenses' }, { x: 220, label: 'find_similar', sub: 'hybrid retrieval' }, { x: 400, label: 'fenced', sub: 'locks' }, { x: 580, label: 'SSE Durable', sub: 'Object' }, { x: 760, label: '5 crons', sub: 'reaper · triage · …' }] as feat}
				<rect x={feat.x} y="226" width="100" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
				<text x={feat.x + 50} y="254" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="11">{feat.label}</text>
				<text x={feat.x + 50} y="272" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">{feat.sub}</text>
			{/each}

			<text x="440" y="320" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">reference implementation · Cloudflare Workers + Supabase + Hyperdrive</text>
			<text x="440" y="340" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">atelier.ninochavez.co</text>
		</svg>

	{:else if kind === 'ask-bc-hybrid-arch'}
		<svg
			viewBox="0 0 880 380"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Ask BC hybrid architecture: Vercel handles OAuth and the admin iframe shell, Cloudflare Worker runs the per-store agent runtime as a Durable Object, reads execute in a Codemode sandbox, writes pass through a two-turn confirmation gate"
			class="schematic-svg"
		>
			<defs>
				<marker id="ab-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={STROKE} stroke-width="1.5" />
				</marker>
				<marker id="ab-arrow-v" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>

			<!-- Swim-lane headers -->
			<line x1="440" y1="20" x2="440" y2="360" stroke={MUTED} stroke-width="1" stroke-dasharray="4 4" />
			<text x="220" y="44" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="12">VERCEL</text>
			<text x="660" y="44" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="12">CLOUDFLARE</text>

			<!-- Vercel side -->
			<rect x="60" y="60" width="320" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="220" y="86" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">OAuth + admin iframe shell</text>
			<text x="220" y="106" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">Next.js 15 · BigCommerce app</text>

			<!-- CF side: Durable Object -->
			<rect x="500" y="60" width="320" height="64" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="660" y="86" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="13">Durable Object · per-store</text>
			<text x="660" y="106" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">stateful agent runtime</text>

			<!-- Crossing arrow Vercel→CF -->
			<line x1="380" y1="92" x2="500" y2="92" stroke={STROKE} stroke-width="1.5" marker-end="url(#ab-arrow)" />
			<text x="440" y="84" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">HTTPS</text>

			<!-- CF: agent runtime → Codemode sandbox -->
			<line x1="660" y1="124" x2="660" y2="160" stroke={SPINE} stroke-width="1.5" marker-end="url(#ab-arrow-v)" />
			<rect x="500" y="164" width="320" height="80" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="660" y="190" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">Codemode sandbox</text>
			<text x="660" y="210" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">model writes the TypeScript</text>
			<text x="660" y="228" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">Codemode executes · 29 BC tools</text>

			<!-- "reads" label -->
			<text x="680" y="142" text-anchor="start" fill={SPINE} font-family={FONT_MONO} font-size="10">reads ↓</text>

			<!-- Writes path: from CF back across to Vercel through gate -->
			<rect x="60" y="270" width="760" height="64" fill="none" stroke={SPINE} stroke-width="1.5" stroke-dasharray="6 4" />
			<text x="440" y="296" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="13">two-turn confirmation gate</text>
			<text x="440" y="316" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">writes never auto-execute · the merchant always approves the mutation</text>

			<line x1="660" y1="244" x2="660" y2="270" stroke={SPINE} stroke-width="1.5" marker-end="url(#ab-arrow-v)" />
			<text x="680" y="262" text-anchor="start" fill={SPINE} font-family={FONT_MONO} font-size="10">writes ↓</text>

			<text x="440" y="360" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="11">Sonnet for reasoning · Haiku for classification · 7 generative-UI block components</text>
		</svg>

	{:else if kind === 'photography-cf-pipeline'}
		<svg
			viewBox="0 0 880 360"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="Photography pipeline: photo upload through R2 storage, Gemini enrichment, Supabase metadata, Cloudflare Images variants, with a custom album-zip Worker"
			class="schematic-svg"
		>
			<defs>
				<marker id="ph-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>

			<!-- Source -->
			<rect x="30" y="140" width="120" height="72" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="90" y="170" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">photo upload</text>
			<text x="90" y="190" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">20K+ frames</text>

			<!-- R2 -->
			<line x1="150" y1="176" x2="190" y2="176" stroke={SPINE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="190" y="140" width="140" height="72" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="260" y="170" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="13">R2 · originals</text>
			<text x="260" y="190" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="10">canonical storage</text>

			<!-- Gemini branch up -->
			<line x1="260" y1="140" x2="260" y2="84" stroke={STROKE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="190" y="20" width="140" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="260" y="46" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">Gemini enrichment</text>
			<text x="260" y="64" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">play type · composition · intensity</text>

			<!-- Supabase metadata from Gemini -->
			<line x1="330" y1="52" x2="380" y2="52" stroke={STROKE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="380" y="20" width="160" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="460" y="46" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">Supabase metadata</text>
			<text x="460" y="64" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">semantic search · tags</text>

			<!-- CF Images variants -->
			<line x1="330" y1="176" x2="380" y2="176" stroke={SPINE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="380" y="140" width="180" height="72" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="470" y="170" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">Cloudflare Images</text>
			<text x="470" y="190" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">named variants · WebP/AVIF</text>

			<!-- SvelteKit CF Pages -->
			<line x1="560" y1="176" x2="600" y2="176" stroke={SPINE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="600" y="140" width="220" height="72" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="710" y="170" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="13">SvelteKit on CF Pages</text>
			<text x="710" y="190" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">AA accessibility · Lighthouse target &gt;90</text>

			<!-- Album-zip Worker branch -->
			<line x1="260" y1="212" x2="260" y2="270" stroke={STROKE} stroke-width="1.5" marker-end="url(#ph-arrow)" />
			<rect x="190" y="274" width="240" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
			<text x="310" y="300" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">album-zip Worker</text>
			<text x="310" y="318" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">streams R2 → ZIP · no buffering</text>

			<text x="440" y="358" text-anchor="middle" fill={SPINE} font-family={FONT_MONO} font-size="11">ninochavez.co/photography</text>
		</svg>

	{:else if kind === 'bc-subscriptions-dual-track'}
		<svg
			viewBox="0 0 880 360"
			xmlns="http://www.w3.org/2000/svg"
			role="img"
			aria-label="bc-subscriptions dual-track: discovery (persona journeys → ADRs → synthesis IDs) runs in parallel with delivery (prototype → state-derive → shipping code), joined through commit messages"
			class="schematic-svg"
		>
			<defs>
				<marker id="bc-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
					<path d="M0,0 L10,5 L0,10" fill="none" stroke={SPINE} stroke-width="1.5" />
				</marker>
			</defs>

			<!-- Discovery track (top) -->
			<text x="50" y="50" fill={SPINE} font-family={FONT_MONO} font-size="12">DISCOVERY TRACK</text>
			<line x1="50" y1="60" x2="830" y2="60" stroke={MUTED} stroke-width="1" stroke-dasharray="2 4" />

			{#each [{ x: 40, label: 'persona', sub: '5 journeys' }, { x: 240, label: 'synthesis', sub: 'proposal → review' }, { x: 440, label: 'ADRs', sub: '38 decisions' }, { x: 640, label: 'synthesis ID', sub: 'unique per ADR' }] as node, i}
				<rect x={node.x} y="80" width="160" height="64" fill="none" stroke={STROKE} stroke-width="1.5" />
				<text x={node.x + 80} y="106" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">{node.label}</text>
				<text x={node.x + 80} y="124" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">{node.sub}</text>
				{#if i < 3}
					<line x1={node.x + 160} y1="112" x2={node.x + 240} y2="112" stroke={STROKE} stroke-width="1.5" marker-end="url(#bc-arrow)" />
				{/if}
			{/each}

			<!-- Linkage spine in middle -->
			<line x1="720" y1="144" x2="720" y2="200" stroke={SPINE} stroke-width="1.5" marker-end="url(#bc-arrow)" />
			<rect x="600" y="200" width="240" height="40" fill="none" stroke={SPINE} stroke-width="1.5" />
			<text x="720" y="226" text-anchor="middle" fill={SOFT} font-family={FONT_MONO} font-size="12">commit message · synthesis ID</text>
			<line x1="720" y1="240" x2="720" y2="280" stroke={SPINE} stroke-width="1.5" marker-end="url(#bc-arrow)" />

			<!-- Delivery track (bottom) -->
			<text x="50" y="318" fill={SPINE} font-family={FONT_MONO} font-size="12">DELIVERY TRACK</text>
			<line x1="50" y1="328" x2="830" y2="328" stroke={MUTED} stroke-width="1" stroke-dasharray="2 4" />

			{#each [{ x: 40, label: 'prototype', sub: 'design oracle' }, { x: 240, label: 'state-derive', sub: 'mechanical audit' }, { x: 440, label: 'PR', sub: 'apps/ shipping code' }, { x: 640, label: 'PR', sub: 'apps/ shipping code' }] as node, i}
				{#if i < 3}
					<rect x={node.x} y="270" width="160" height="50" fill="none" stroke={STROKE} stroke-width="1.5" />
					<text x={node.x + 80} y="290" text-anchor="middle" fill={TEXT} font-family={FONT_MONO} font-size="12">{node.label}</text>
					<text x={node.x + 80} y="307" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">{node.sub}</text>
					{#if i < 2}
						<line x1={node.x + 160} y1="295" x2={node.x + 240} y2="295" stroke={STROKE} stroke-width="1.5" marker-end="url(#bc-arrow)" />
					{/if}
				{/if}
			{/each}

			<text x="440" y="356" text-anchor="middle" fill={MUTED} font-family={FONT_MONO} font-size="10">one repo · spec + prototype + shipping code · 38 ADRs · traceable from idea → PR</text>
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
