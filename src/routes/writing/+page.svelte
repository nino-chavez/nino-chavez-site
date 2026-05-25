<script>
	import Hero from '$lib/components/Hero.svelte';
	import PointerRow from '$lib/components/PointerRow.svelte';

	const collections = [
		{ id: 'blog', title: 'Blog', count: 229, flagship: true, summary: 'Essays on AI engineering, agentic-software architecture, commerce platform work, and the operational reality of building with coding agents.', flagships: ['What it means to be a context engineer', 'Building with agents, not for them'] },
		{ id: 'whitepapers', title: 'Whitepapers', count: 12, flagship: true, summary: 'Long-form architectural treatments — agentic-software patterns, BigCommerce subscription engineering, RAG production trade-offs, methodology distillation.', flagships: ['The bc-subscriptions agentic-architecture', 'Ask-bc — hybrid retrieval at platform scale'] },
		{ id: 'series', title: 'Series', count: 8, flagship: false, summary: 'Multi-part deep dives on themes that don\'t fit a single post — typically 4–8 entries each, threaded with explicit arcs.', flagships: ['Forge production line — codifying the practice', 'Building Atelier — the 12-tool MCP case'] },
		{ id: 'fiction', title: 'Fiction', count: 10, flagship: false, summary: 'Short fiction working at the edges of the same themes — ascension, imprint, voice, the strange recursion of building tools that build tools.', flagships: ['The carrier of voice', 'The bored god'] },
		{ id: 'presentations', title: 'Presentations', count: 9, flagship: false, summary: 'Slides + speaker notes from internal Commerce talks and external conferences. Heavy on diagrams; light on text — the talk IS the artifact.', flagships: ['Context engineering as a discipline', 'The Hive coordination pattern'] },
		{ id: 'counterpoints', title: 'Counterpoints', count: 3, flagship: false, summary: 'Deliberate pushback pieces — responses to AI/agent discourse where the standard framing is wrong and the corrective is worth writing down.', flagships: ['Against the prompt-as-program framing', 'Why "AI slop" is not the right axis'] },
		{ id: 'tutorials', title: 'Tutorials', count: 3, flagship: false, summary: 'Concrete how-tos — installing the substrate, wiring hooks, running the Poe ingest. Copy-paste ready, no philosophy.', flagships: ['Wiring the hesitation fold from scratch', 'Mining session data with claude-recall-cli'] },
		{ id: 'research-notes', title: 'Research notes', count: 1, flagship: false, summary: 'Working notes from the v3 redesign Stage 1 — surface inventory, persona model, competitive analysis. Not polished; intentionally surfaced.', flagships: ['v3 synthesis · scale-mismatch finding'] }
	];

	const recent = [
		{ date: '2026-05-22', title: 'The bc-subscriptions agentic-architecture', collection: 'whitepaper' },
		{ date: '2026-05-18', title: 'Against the prompt-as-program framing', collection: 'counterpoint' },
		{ date: '2026-05-15', title: 'Forge production line — codifying the practice (pt 4)', collection: 'series' },
		{ date: '2026-05-12', title: 'What it means to be a context engineer', collection: 'blog' },
		{ date: '2026-05-09', title: 'Mining session data with claude-recall-cli', collection: 'tutorial' },
		{ date: '2026-05-05', title: 'Building with agents, not for them', collection: 'blog' },
		{ date: '2026-05-01', title: 'The carrier of voice', collection: 'fiction' },
		{ date: '2026-04-28', title: 'v3 synthesis · scale-mismatch finding', collection: 'research-note' },
		{ date: '2026-04-24', title: 'Context engineering as a discipline', collection: 'presentation' },
		{ date: '2026-04-20', title: 'The Hive coordination pattern', collection: 'whitepaper' }
	];

	const closingPointers = [
		{ title: '/work', href: '/work', description: 'The catalog the writing chronicles' },
		{ title: '/practice', href: '/practice', description: 'How the work the writing chronicles gets done' },
		{ title: 'blog.ninochavez.co', href: 'https://blog.ninochavez.co', description: 'Full archive — Signal Dispatch corpus' }
	];
</script>

<svelte:head>
	<title>Writing — Nino Chavez</title>
	<meta name="description" content="~275 published artifacts across 7 collections — Signal Dispatch corpus." />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="/writing · Signal Dispatch corpus">
			~275 published artifacts across 7 collections.
			<svelte:fragment slot="sub">
				Signal Dispatch is the public catalog of the writing — essays, whitepapers, series,
				fiction, presentations, and counterpoint pieces. The v2 site surfaced 3 flagships out
				of ~275 artifacts; this surface exposes every collection because the corpus IS the
				receipt.
			</svelte:fragment>
		</Hero>
	</section>

	<div class="container">

		<section class="collection-grid">
			{#each collections as col (col.id)}
				<article class="collection-card" class:flagship={col.flagship}>
					<p class="collection-tag">Collection{col.flagship ? ' · flagship' : ''}</p>
					<div class="collection-header">
						<span class="collection-title">{col.title}</span>
						<span class="collection-count">{col.count}</span>
					</div>
					<p class="collection-summary">{col.summary}</p>
					<ul class="collection-flagships">
						{#each col.flagships as f (f)}
							<li>{f}</li>
						{/each}
					</ul>
				</article>
			{/each}
		</section>

		<section class="recent-section">
			<h2 class="recent-h2">Recent — last 10 across all collections</h2>
			<p class="recent-sub">Chronological tail from Signal Dispatch.</p>
			<ul class="recent-list">
				{#each recent as r (r.title)}
					<li>
						<span class="recent-date">{r.date}</span>
						<span class="recent-title">{r.title}</span>
						<span class="recent-collection">{r.collection}</span>
					</li>
				{/each}
			</ul>
		</section>

		<aside class="archive-pointer">
			<p>
				Full archive lives at <a href="https://blog.ninochavez.co" rel="noopener">blog.ninochavez.co</a>
				— Signal Dispatch · 7 collections · 275 artifacts · RSS available.
			</p>
		</aside>

		<footer class="writing-footer">
			<PointerRow pointers={closingPointers} />
		</footer>

	</div>
</main>

<style>
	main { padding-bottom: var(--space-16); }

	.collection-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
		padding-block: var(--space-8);
	}

	.collection-card {
		padding: var(--space-5);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
		display: flex;
		flex-direction: column;
	}

	.collection-card.flagship {
		border-color: var(--brand-700);
		background: hsl(270 80% 9% / 0.4);
	}

	.collection-tag {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-bottom: var(--space-2);
	}

	.collection-card.flagship .collection-tag { color: var(--brand-400); }

	.collection-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.collection-title {
		font-family: var(--font-display);
		font-size: var(--type-xl);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
	}

	.collection-count {
		font-family: var(--font-display);
		font-size: var(--type-2xl);
		font-weight: var(--weight-bold);
		color: var(--brand-400);
		line-height: 1;
	}

	.collection-summary {
		font-size: var(--type-sm);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-3);
		flex: 1;
	}

	.collection-flagships {
		list-style: none;
		padding: var(--space-3) 0 0 0;
		margin: 0;
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.collection-flagships li {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-muted);
		padding: 2px 0;
	}

	.collection-flagships li::before {
		content: '▸ ';
		color: var(--brand-500);
	}

	.recent-section {
		padding-block: var(--space-12);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.recent-h2 {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-2);
	}

	.recent-sub {
		font-family: var(--font-display);
		font-size: var(--type-2xl);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		margin-bottom: var(--space-6);
	}

	.recent-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.recent-list li {
		display: grid;
		grid-template-columns: 120px 1fr auto;
		gap: var(--space-4);
		align-items: baseline;
		padding: var(--space-3) 0;
		border-bottom: var(--border-1) solid var(--border-subtle);
		font-size: var(--type-sm);
	}

	.recent-date {
		font-family: var(--font-mono);
		font-size: 11px;
		color: var(--text-muted);
	}

	.recent-title { color: var(--text-primary); }

	.recent-collection {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		justify-self: end;
	}

	.archive-pointer {
		margin-top: var(--space-12);
		padding: var(--space-8);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
		text-align: center;
	}

	.archive-pointer p {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-secondary);
		margin: 0;
	}

	.archive-pointer a {
		color: var(--brand-400);
		font-weight: var(--weight-semibold);
		text-decoration: none;
	}

	.writing-footer {
		margin-top: var(--space-12);
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}
</style>
