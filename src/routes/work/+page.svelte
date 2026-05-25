<script>
	import Hero from '$lib/components/Hero.svelte';
	import ClusterRibbon from '$lib/components/ClusterRibbon.svelte';
	import ClusterSection from '$lib/components/ClusterSection.svelte';
	import CaseStudyCard from '$lib/components/CaseStudyCard.svelte';
	import ToolCard from '$lib/components/ToolCard.svelte';
	import PointerRow from '$lib/components/PointerRow.svelte';
	import { clusters } from '$lib/clusters';

	const closingPointers = [
		{ title: '/practice', href: '/practice', description: 'How the work happens — substrate + rules + instrumentation' },
		{ title: '/writing', href: '/writing', description: '~275 artifacts across 7 collections' },
		{ title: '/about', href: '/about', description: 'Who Nino is, what changed, what now' }
	];
</script>

<svelte:head>
	<title>Work — Nino Chavez</title>
	<meta name="description" content="Eight clusters. Sixty-nine repos. Seventeen live deploys. The breadth IS the receipts." />
</svelte:head>

<main id="main">
	<section class="container">
		<Hero kicker="scope">
			Eight clusters. Sixty-nine repos. Seventeen live deploys.
			<svelte:fragment slot="sub">
				The breadth IS the receipts. Walk the ribbon below for at-a-glance scope; scroll for depth.
			</svelte:fragment>
		</Hero>
	</section>

	<section class="container ribbon-band" aria-labelledby="ribbon-label">
		<p id="ribbon-label" class="visually-hidden">Cluster ribbon</p>
		<ClusterRibbon clusters={clusters} variant="full" labelledby="ribbon-label" />
	</section>

	<div class="container">

		<!-- 01 — Forge production line -->
		<ClusterSection
			id="forge-production-line"
			kicker="01 — Forge production line"
			title="The toolchain that built everything below."
		>
			<p class="cluster-lede">
				<code>forge</code> is the public umbrella entry point. Six private lathes do the work:
				<code>specchain</code> writes requirements into specs; <code>blueprint</code> formalizes
				the diagnose-prescribe-design methodology this very portal demonstrates;
				<code>forge-brand</code> emits tokens from brand kits; <code>forge-signal</code> generates
				site copy; <code>forge-site</code> orchestrates archetypes; <code>image-gen</code> produces
				hero + social assets.
			</p>

			<figure class="schematic-frame" aria-label="Forge production line — umbrella + six lathes">
				<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="forge-svg-title">
					<title id="forge-svg-title">Forge umbrella feeding six private lathes</title>
					<rect class="schematic-node-pub" x="290" y="20" width="140" height="50"/>
					<text class="schematic-tag" x="360" y="12" text-anchor="middle">UMBRELLA · PUBLIC</text>
					<text class="schematic-text-pub" x="360" y="52" text-anchor="middle">forge</text>
					<line class="schematic-edge" x1="360" y1="70" x2="360" y2="110"/>
					<line class="schematic-edge" x1="80" y1="110" x2="640" y2="110"/>
					<line class="schematic-edge" x1="105" y1="110" x2="105" y2="140"/>
					<rect class="schematic-node" x="50" y="140" width="110" height="40"/>
					<text class="schematic-text" x="105" y="165" text-anchor="middle">specchain</text>
					<line class="schematic-edge" x1="220" y1="110" x2="220" y2="140"/>
					<rect class="schematic-node" x="175" y="140" width="90" height="40"/>
					<text class="schematic-text" x="220" y="165" text-anchor="middle">blueprint</text>
					<line class="schematic-edge" x1="320" y1="110" x2="320" y2="140"/>
					<rect class="schematic-node" x="275" y="140" width="90" height="40"/>
					<text class="schematic-text" x="320" y="165" text-anchor="middle">forge-brand</text>
					<line class="schematic-edge" x1="420" y1="110" x2="420" y2="140"/>
					<rect class="schematic-node" x="375" y="140" width="90" height="40"/>
					<text class="schematic-text" x="420" y="165" text-anchor="middle">forge-signal</text>
					<line class="schematic-edge" x1="520" y1="110" x2="520" y2="140"/>
					<rect class="schematic-node" x="475" y="140" width="90" height="40"/>
					<text class="schematic-text" x="520" y="165" text-anchor="middle">forge-site</text>
					<line class="schematic-edge" x1="620" y1="110" x2="620" y2="140"/>
					<rect class="schematic-node" x="575" y="140" width="90" height="40"/>
					<text class="schematic-text" x="620" y="165" text-anchor="middle">image-gen</text>
					<line class="schematic-edge" x1="105" y1="180" x2="620" y2="180"/>
					<line class="schematic-edge" x1="360" y1="180" x2="360" y2="220"/>
					<rect class="schematic-node" x="270" y="220" width="180" height="50"/>
					<text class="schematic-tag" x="360" y="212" text-anchor="middle">DOWNSTREAM</text>
					<text class="schematic-text" x="360" y="250" text-anchor="middle">case studies · sites · portals</text>
				</svg>
				<figcaption class="schematic-cap">Fig. forge · the production line. See <a href="/practice#production-line">/practice</a> for the full breakdown.</figcaption>
			</figure>
		</ClusterSection>

		<!-- 02 — Agent infrastructure -->
		<ClusterSection
			id="agent-infrastructure"
			kicker="02 — Agent infrastructure"
			title="Coordination, recall, parallel orchestration."
		>
			<p class="cluster-lede">
				Ten repos. One PUBLIC: <code>ai-champions-kit</code> — tiered installer. The substrate:
				<code>ai-hive</code>, <code>claude-recall-cli</code>, <code>claude-orchestrator</code>,
				<code>worktree-orchestrator</code>, <code>browse-tool</code>, <code>claude-docs-toolkit</code>.
			</p>

			<div class="tool-grid">
				<ToolCard
					title="ai-champions-kit"
					href="https://github.com/nino-chavez/ai-champions-kit"
					visibility="public"
					description="Tiered installer that bootstraps the substrate stack on a new workstation."
					enforces="The substrate ships as software, not as documentation that drifts."
				/>
				<ToolCard
					title="claude-recall-cli"
					visibility="private"
					description="Walks every .jsonl session transcript and rebuilds the Poe stack at every catchup ingest."
					enforces="Pattern extraction is mechanical, not curatorial."
				/>
				<ToolCard
					title="ai-hive"
					visibility="private"
					description="Multi-session orchestration so the main session never blocks on subagent compute."
				/>
				<ToolCard
					title="worktree-orchestrator"
					visibility="private"
					description="Manages git worktrees for parallel agent sessions per CLAUDE.md R3 isolation rule."
				/>
				<ToolCard
					title="browse-tool"
					visibility="private"
					description="Headless Chrome wrapper used as the project's browser sensor — preferred over MCP for token economics."
				/>
				<ToolCard
					title="claude-docs-toolkit"
					visibility="private"
					description="Documentation orchestrator that keeps CLAUDE.md and global instructions coherent across repos."
				/>
			</div>
		</ClusterSection>

		<!-- 03 — AI products -->
		<ClusterSection
			id="ai-products"
			kicker="03 — AI products"
			title="Shipped bets across the inference surface."
		>
			<p class="cluster-lede">
				Eighteen repos. Six PUBLIC: atelier, cortex, ai-analyst-academy, quantifai-sync,
				quantifai-homebrew-tap, venue-aurora. Lead deep dives below.
			</p>

			<div class="case-grid">
				<CaseStudyCard
					title="Atelier"
					href="/work/ai-products/atelier"
					visibility="public"
					description="12-tool MCP server mediating between an orchestrator and a fan-out of domain agents. Self-hostable. Reference prototype for mixed human/agent teams."
					tags={['MCP', 'self-host', 'OSS']}
					liveUrls={[{ label: 'github.com/nino-chavez/atelier', url: 'https://github.com/nino-chavez/atelier' }]}
				/>
				<CaseStudyCard
					title="Cortex"
					href="/work/ai-products/cortex"
					visibility="public"
					description="Local-first Mac app for on-device inference. Tauri v2 + SvelteKit + Rust + MLX. No cloud calls in the hot path; Apple Neural Engine is the runtime."
					tags={['Tauri', 'Rust', 'MLX', 'local-first']}
					liveUrls={[{ label: 'github.com/nino-chavez/cortex', url: 'https://github.com/nino-chavez/cortex' }]}
				/>
				<CaseStudyCard
					title="Ask Dad — RAG"
					href="/work/ai-products/ask-dad"
					visibility="private"
					description="Mechanically-derived corpus + Cloudflare Vectorize storage. 15 sources, 114 vectors, ~$0.0007 per rebuild. Live at /api/ask/chat."
					tags={['RAG', 'Vectorize', 'CF Pages Functions']}
				/>
			</div>
		</ClusterSection>

		<!-- 04 — Commerce / BC -->
		<ClusterSection
			id="commerce-bc"
			kicker="04 — Commerce / BC"
			title="Day-job-adjacent + side-project commerce engineering."
		>
			<p class="cluster-lede">
				Ten repos. One PUBLIC: <code>commerce-prompt-analyzer</code>. Lead deep dives: bc-subscriptions,
				ask-bc, aisles.
			</p>

			<div class="case-grid">
				<CaseStudyCard
					title="bc-subscriptions"
					href="/work/commerce-bc/bc-subscriptions"
					visibility="private"
					description="Subscription engineering on BigCommerce with the blueprint methodology applied to its own architecture. 38+ ADRs, mechanical state derivation, runnable prototype as the design oracle."
					tags={['BigCommerce', 'methodology-recursive', '38+ ADRs']}
				/>
				<CaseStudyCard
					title="Ask BC"
					href="/work/commerce-bc/ask-bc"
					visibility="private"
					description="Hybrid runtime — Next.js + Vercel for OAuth and admin, CF Worker Durable Object per store for the agent runtime, Codemode sandbox for read tools, two-turn confirmation gate for writes."
					tags={['CF Durable Objects', 'Codemode', 'agentic']}
					liveUrls={[{ label: 'askbc.ninochavez.co', url: 'https://askbc.ninochavez.co' }]}
				/>
				<CaseStudyCard
					title="aisles"
					href="/work/commerce-bc/aisles"
					visibility="private"
					description="AI-native headless storefront — the experiment in building commerce surfaces where the agent stack IS the architecture, not bolted on."
					tags={['headless', 'AI-native']}
				/>
			</div>
		</ClusterSection>

		<!-- 05 — 630 / volleyball -->
		<ClusterSection
			id="volleyball-630"
			kicker="05 — 630 / volleyball platform"
			title="Longest-running build cluster."
		>
			<p class="cluster-lede">
				Nine repos. One PUBLIC: <code>letspepper</code>. Hero deep dive: rally-hq — paired with
				<code>blueprint.rallyhq.app</code>, the canonical blueprint v2 portal deploy that this very
				portal mirrors.
			</p>

			<div class="case-grid case-grid-single">
				<CaseStudyCard
					title="Rally HQ"
					href="/work/volleyball-630/rally-hq"
					visibility="private"
					description="Tournament-management platform — and the canonical demonstration of the paired-deploy pattern. Two CF Pages projects ship from one repo: the product at rallyhq.app, the review portal at blueprint.rallyhq.app."
					tags={['paired-deploy', 'CF Pages', 'tournaments']}
					liveUrls={[
						{ label: 'rallyhq.app', url: 'https://rallyhq.app' },
						{ label: 'blueprint.rallyhq.app', url: 'https://blueprint.rallyhq.app' }
					]}
				/>
			</div>
		</ClusterSection>

		<!-- 06 — Personal orbit -->
		<ClusterSection
			id="personal-orbit"
			kicker="06 — Personal sites / brand orbit"
			title="Live URLs around the personal brand."
		>
			<p class="cluster-lede">
				Seven repos. The orbit being built — this redesign IS part of it.
			</p>

			<PointerRow
				pointers={[
					{ title: 'ninochavez.co', href: 'https://ninochavez.co', description: 'This site — currently rebuilding on v3' },
					{ title: 'blueprint.ninochavez.co', href: 'https://blueprint.ninochavez.co', description: 'The paired blueprint portal you can preview the v3 design in' },
					{ title: 'blog.ninochavez.co', href: 'https://blog.ninochavez.co', description: 'Signal Dispatch — 275 artifacts across 7 collections' },
					{ title: 'photography.ninochavez.co', href: 'https://photography.ninochavez.co', description: 'Volleyball-action + commercial photography for 630' },
					{ title: 'signalx.studio', href: 'https://signalx.studio', description: 'Studio brand surface' },
					{ title: 'flickdaymedia.com', href: 'https://flickdaymedia.com', description: 'Media-production brand surface' }
				]}
			/>
		</ClusterSection>

		<!-- 07 — Client work -->
		<ClusterSection
			id="client-work"
			kicker="07 — Client work"
			title="Present, not selling."
		>
			<p class="cluster-lede">
				Four repos. Services posture is present in the catalog without making the main site a
				services-funnel — per ADR-0001 positioning and R1 categorical refusal.
			</p>

			<PointerRow
				pointers={[
					{ title: 'allen-wellness-center', href: '/work/client/allen-wellness-center', description: 'Wellness clinic site + Google Business Profile work' },
					{ title: 'urvil-performance', href: '/work/client/urvil-performance', description: 'Personal training brand — site + Stripe integration' },
					{ title: 'creative-floors', href: '/work/client/creative-floors', description: 'Flooring contractor site' },
					{ title: 'lake-mathews-retreat', href: '/work/client/lake-mathews-retreat', description: 'Short-term-rental brand surface' }
				]}
			/>
		</ClusterSection>

		<!-- 08 — Writing -->
		<ClusterSection
			id="writing"
			kicker="08 — Writing — Signal Dispatch corpus"
			title="~275 published artifacts across 7 collections."
		>
			<p class="cluster-lede">
				blog (229) · whitepapers (12) · series (8) · fiction (10) · presentations (9) ·
				counterpoints (3) · tutorials (3) · research-notes (1). Full collection surfacing on
				<a href="/writing">/writing</a>; this slot is a pointer.
			</p>

			<p class="writing-pointer">
				<a href="/writing" class="writing-cta">Open the corpus →</a>
			</p>
		</ClusterSection>

		<!-- Closing pointer row -->
		<footer class="cluster-footer">
			<PointerRow pointers={closingPointers} />
		</footer>

	</div>
</main>

<style>
	main {
		padding-bottom: var(--space-16);
	}

	.ribbon-band {
		padding-block: var(--space-4) var(--space-8);
	}

	.cluster-lede {
		max-width: var(--container-prose);
		color: var(--text-secondary);
		font-size: var(--type-base);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-6);
	}

	.cluster-lede code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		color: var(--brand-400);
	}

	.schematic-frame {
		margin: var(--space-8) 0 0 0;
		padding: var(--space-6);
		border: var(--border-1) solid var(--border-subtle);
		background: var(--surface-1);
		max-width: 760px;
	}

	.schematic-frame svg {
		display: block;
		width: 100%;
		height: auto;
		max-width: 720px;
		margin: 0 auto;
	}

	.schematic-cap {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		margin-top: var(--space-3);
		text-align: center;
	}

	.schematic-cap :global(a) {
		color: var(--brand-400);
		text-decoration: none;
	}

	/* SVG schematic atoms — page-scoped */
	:global(.schematic-node) { fill: none; stroke: var(--text-primary); stroke-width: 1.5; }
	:global(.schematic-node-pub) { fill: none; stroke: var(--brand-500); stroke-width: 2; }
	:global(.schematic-edge) { fill: none; stroke: var(--text-muted); stroke-width: 1.5; }
	:global(.schematic-text) { font-family: var(--font-mono); font-size: 11px; fill: var(--text-primary); }
	:global(.schematic-text-pub) { font-family: var(--font-mono); font-size: 12px; fill: var(--brand-400); font-weight: 700; }
	:global(.schematic-tag) { font-family: var(--font-mono); font-size: 9px; fill: var(--text-muted); letter-spacing: 0.08em; }

	.tool-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--space-4);
	}

	.case-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--space-4);
	}

	.case-grid-single {
		grid-template-columns: 1fr;
		max-width: 720px;
	}

	.writing-pointer {
		margin-top: var(--space-6);
	}

	.writing-cta {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		text-decoration: none;
		padding-bottom: 2px;
		border-bottom: var(--border-1) solid var(--brand-700);
	}

	.writing-cta:hover {
		color: var(--brand-300);
		border-bottom-color: var(--brand-500);
	}

	.cluster-footer {
		margin-top: var(--space-16);
		padding-top: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
