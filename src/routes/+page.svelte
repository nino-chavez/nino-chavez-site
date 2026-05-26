<script>
	// v3 home — Nino Chavez ⊕ studio
	// JTBD-driven (blueprint/research/02.5-jobs-to-be-done.md):
	//   J1 — Peer Architect verifies practice is real (≤5s sees ≥3 receipts)
	//   J2 — Prospective Client decides to schedule (CTA always visible in header)
	// Tokens from brand/nino-chavez-studio.css (forge-brand AI-validated)
	// Voice from brand/nino-chavez-studio.voice.json
	// Composition reference: forge-site portfolio-brand archetype

	export let data;
	$: latestPosts = (data?.blogPosts ?? []).slice(0, 5);

	function formatRelative(dateStr) {
		if (!dateStr) return '';
		const d = new Date(dateStr);
		const days = Math.floor((Date.now() - d.getTime()) / 86400000);
		if (days === 0) return 'today';
		if (days === 1) return '1d ago';
		if (days < 30) return `${days}d ago`;
		if (days < 365) return `${Math.floor(days / 30)}mo ago`;
		return `${Math.floor(days / 365)}y ago`;
	}
</script>

<svelte:head>
	<title>Nino Chavez ⊕ studio — commerce architecture grounded in reality</title>
	<meta name="description" content="Product Architect at commerce.com. Practitioner studio surface: 11 shipped products, 277-essay Signal Dispatch archive, Blueprint methodology, speaking surface." />
	<link rel="canonical" href="https://ninochavez.co/" />
</svelte:head>

<div class="v3">
	<header class="v3-header">
		<div class="v3-header-inner">
			<a href="/" class="v3-wordmark">
				Nino Chavez<span class="v3-wordmark-tag">studio</span>
			</a>
			<nav class="v3-nav">
				<a href="#building">Building</a>
				<a href="#writing">Writing</a>
				<a href="#threads">Threads</a>
				<a href="/speaking">Speaking</a>
				<a href="/colophon">Colophon</a>
				<a href="/now">Now</a>
			</nav>
			<a href="mailto:nino@ninochavez.co?subject=Conversation%20%E2%80%94%20[topic]" class="v3-header-cta">Schedule a conversation</a>
		</div>
	</header>

	<main class="v3-main">

		<!-- HERO — J1 acceptance: parseable ≤4s, h2-scale (not display) so receipts fit above fold -->
		<section class="v3-hero">
			<h1 class="v3-hero-capability">
				<strong>Commerce architecture</strong> grounded in reality. I direct agents to ship enterprise commerce and write the <span class="v3-em">harness</span> that makes them safe to ship it.
			</h1>
			<p class="v3-hero-sub">
				Product Architect at commerce.com. Methodology at <a href="https://github.com/nino-chavez/blueprint">Blueprint</a>. Writing at <a href="https://blog.ninochavez.co">Signal Dispatch</a> — 277 essays since 2018.
			</p>
		</section>

		<!-- BUILDING — J1 acceptance: ≥3 named shipped products above fold -->
		<section class="v3-section" id="building">
			<header class="v3-section-header">
				<span class="v3-section-label">§ what's shipping</span>
				<span class="v3-section-meta">11 products · updated 2026-05</span>
			</header>

			<div class="v3-receipt">
				<div class="v3-receipt-name">Rally HQ</div>
				<div class="v3-receipt-desc">Tournament platform serving 17 brackets this weekend. Blueprint Pattern B reference implementation.</div>
				<a class="v3-receipt-url" href="https://rallyhq.app">rallyhq.app →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Signal X Studio</div>
				<div class="v3-receipt-desc">Studio identity surface — the home of the AI-native delivery work.</div>
				<a class="v3-receipt-url" href="https://signalx.studio">signalx.studio →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Quantifai</div>
				<div class="v3-receipt-desc">AI FinOps — cost attribution and adoption metrics across model providers.</div>
				<span class="v3-receipt-url">quantifai.io</span>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">BC Subscriptions</div>
				<div class="v3-receipt-desc">Active B2B subscription engagement; client work under NDA.</div>
				<span class="v3-receipt-url">client engagement</span>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Blueprint</div>
				<div class="v3-receipt-desc">Brownfield audit-driven methodology for AI-native delivery. This site is its latest output.</div>
				<a class="v3-receipt-url" href="/colophon">colophon →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Atelier</div>
				<div class="v3-receipt-desc">OSS template + interop protocol for mixed human/agent teams. In flight.</div>
				<span class="v3-receipt-url">wip/atelier</span>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Atelier Dashboard</div>
				<div class="v3-receipt-desc">Active dashboard surface paired with the Atelier template.</div>
				<span class="v3-receipt-url">in flight</span>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Let's Pepper</div>
				<div class="v3-receipt-desc">Volleyball cultural surface; brand voice exemplar.</div>
				<a class="v3-receipt-url" href="https://letspepper.com">letspepper.com →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Flickday Media</div>
				<div class="v3-receipt-desc">Photography subcontractor brand.</div>
				<a class="v3-receipt-url" href="https://flickdaymedia.com">flickdaymedia.com →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Photography</div>
				<div class="v3-receipt-desc">20,000+ action-sports photos; volleyball-first.</div>
				<a class="v3-receipt-url" href="https://photography.ninochavez.co">photography.ninochavez.co →</a>
			</div>
			<div class="v3-receipt">
				<div class="v3-receipt-name">Signal Dispatch</div>
				<div class="v3-receipt-desc">277 essays since 2018 — architecture, AI-native delivery, the practice of building.</div>
				<a class="v3-receipt-url" href="https://blog.ninochavez.co">blog.ninochavez.co →</a>
			</div>
		</section>

		<!-- WRITING — recent dispatches with live RSS data (W6) -->
		<section class="v3-section" id="writing">
			<header class="v3-section-header">
				<span class="v3-section-label">§ recent dispatches</span>
				<span class="v3-section-meta">live · pulled from blog.ninochavez.co</span>
			</header>

			{#if latestPosts.length > 0}
				{#each latestPosts as post (post.id)}
					<article class="v3-post">
						<a href={post.link} class="v3-post-title">{post.title}</a>
						<span class="v3-post-date">{formatRelative(post.date)}</span>
					</article>
				{/each}
				<a href="https://blog.ninochavez.co" class="v3-archive-link">Full archive — 277 essays since 2018 →</a>
			{:else}
				<article class="v3-post">
					<a href="https://blog.ninochavez.co" class="v3-post-title">Signal Dispatch — 277 essays</a>
					<span class="v3-post-date">live feed</span>
				</article>
			{/if}
		</section>

		<!-- THREADS — W3-verified topic anchors -->
		<section class="v3-section" id="threads">
			<header class="v3-section-header">
				<span class="v3-section-label">§ threads I keep pulling on</span>
				<span class="v3-section-meta">tag pages on the blog</span>
			</header>

			<div class="v3-topic">
				<a href="https://blog.ninochavez.co/tag/harness" class="v3-topic-name">Harness engineering</a>
				<span class="v3-topic-count">7 posts</span>
				<p class="v3-topic-desc">Why the harness — not the agent — is the load-bearing engineering work.</p>
			</div>
			<div class="v3-topic">
				<a href="https://blog.ninochavez.co/tag/agentic-workflows" class="v3-topic-name">Agentic workflows in practice</a>
				<span class="v3-topic-count">18 posts</span>
				<p class="v3-topic-desc">How the architect's job changed and the patterns that survived contact with production.</p>
			</div>
			<div class="v3-topic">
				<a href="https://blog.ninochavez.co/tag/commerce" class="v3-topic-name">Commerce in the agent era</a>
				<span class="v3-topic-count">40 posts</span>
				<p class="v3-topic-desc">Specific patterns for commerce platforms moving from human-driven to agent-driven flows.</p>
			</div>
			<div class="v3-topic">
				<a href="https://blog.ninochavez.co/tag/brownfield" class="v3-topic-name">Brownfield over greenfield</a>
				<span class="v3-topic-count">7 posts</span>
				<p class="v3-topic-desc">Auditing the system you have before designing the one you wish you had.</p>
			</div>
		</section>
	</main>

	<footer class="v3-footer">
		<div class="v3-footer-inner">
			<div>
				<h4>Contact</h4>
				<ul>
					<li><a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a></li>
					<li><a href="https://www.linkedin.com/in/nino-chavez/">LinkedIn</a></li>
					<li><a href="https://github.com/nino-chavez">GitHub</a></li>
					<li><a href="https://x.com/PhotoByNino">X (PhotoByNino)</a></li>
				</ul>
			</div>
			<div>
				<h4>Adjacent properties</h4>
				<ul>
					<li><a href="https://blog.ninochavez.co">blog.ninochavez.co</a></li>
					<li><a href="https://photography.ninochavez.co">photography.ninochavez.co</a></li>
					<li><a href="https://signalx.studio">signalx.studio</a></li>
					<li><a href="https://labs.ninochavez.co">labs.ninochavez.co</a></li>
					<li><a href="https://letspepper.com">letspepper.com</a></li>
					<li><a href="https://flickdaymedia.com">flickdaymedia.com</a></li>
				</ul>
			</div>
			<div>
				<h4>Built with</h4>
				<ul>
					<li>Blueprint methodology + brand-forge generated design system.</li>
					<li><a href="/colophon">→ how this site was built</a></li>
					<li>SvelteKit on Cloudflare Pages.</li>
				</ul>
			</div>
		</div>

		<div class="v3-footer-meta">
			<span>v3 · 2026-05-25 · forge-pipeline edition</span>
			<span><a href="https://blog.ninochavez.co/rss.xml">RSS</a> · © 2026 Nino Chavez</span>
		</div>
	</footer>
</div>
