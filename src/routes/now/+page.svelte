<script>
	// v3 /now — live state mirror of in-flight work
	// Source: blueprint/research/03-design-brief.md § /now page composition
	// Promotes /now from v2 lateral surface to v3 primary live-state mirror.
	// Implements differentiation move 4 (live runtime signals).
	// Updates weekly+.
</script>

<svelte:head>
	<title>Now — Nino Chavez ⊕ studio</title>
	<meta name="description" content="Live state mirror of what's actually happening this week. In-flight initiatives, Blueprint stage status, recent writing, reading queue." />
	<link rel="canonical" href="https://ninochavez.co/now" />
</svelte:head>

<div class="v3">
	<header class="v3-header">
		<div class="v3-header-inner">
			<a href="/" class="v3-wordmark">
				<span class="v3-wordmark-name">Nino Chavez<span class="v3-mark-glyph">⊕</span></span>
				<span class="v3-wordmark-tag">studio</span>
			</a>
			<nav class="v3-nav">
				<a href="/#writing">Writing</a>
				<a href="/#desk">On the desk</a>
				<a href="/#threads">Threads</a>
				<a href="/speaking">Speaking</a>
				<a href="/about">About</a>
				<a href="/now" class="v3-now-link">→ now</a>
			</nav>
		</div>
	</header>

	<div class="v3-main">
		<div class="v3-column-main">

			<p class="v3-prose-intro">
				What's <span class="v3-emphasis-red">actually</span> happening this week.
			</p>

			<p class="v3-prose-body">
				Live mirror of in-flight work. Updates weekly+. The site reads its
				own Blueprint stage; the writing strip pulls from Signal Dispatch
				RSS; the shipping signals tail Rally HQ's actual status. This is
				what's on the desk right now — not a roadmap, not a marketing page.
				The cyanotype dries while it's being printed.
			</p>

			<section class="v3-block" id="in-flight">
				<span class="v3-block-label">in flight</span>
				<h2 class="v3-block-title">What I'm actively working on this week.</h2>

				<div class="v3-receipt-group">
					<div class="v3-receipt">
						<div class="v3-receipt-name">ninochavez.co v3</div>
						<div class="v3-receipt-desc">Blueprint Stage 6 (Documents + Deploy) — production cutover. Anti-slop rework after v0.1 cohort-followed too closely. Four routes shipped from prototype to production.<span class="v3-receipt-url">apps/website-nc · stage 6</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Blueprint methodology</div>
						<div class="v3-receipt-desc">Stage 7 — iterating template/.claude hooks. Receipt-bucket discipline encoded; market-cohort sweep added.<span class="v3-receipt-url">wip/blueprint · active</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Rally HQ</div>
						<div class="v3-receipt-desc">Production. Tournament brackets live this weekend.<span class="v3-receipt-url">apps/rally-hq · production</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Atelier dashboard</div>
						<div class="v3-receipt-desc">Active development. State-derive parser fix mirrored from template.<span class="v3-receipt-url">wip/atelier · in flight</span></div>
					</div>
				</div>
			</section>

			<section class="v3-block" id="writing-now">
				<span class="v3-block-label">writing this week</span>
				<h2 class="v3-block-title">Recent dispatches and the drafts on the desk.</h2>

				<!-- TODO W6: pull from blog RSS at build time -->
				<article class="v3-post">
					<a href="https://blog.ninochavez.co" class="v3-post-title">Latest from Signal Dispatch →</a>
					<span class="v3-post-date">live feed</span>
				</article>

				<p style="margin-top: 1.5rem;"><a href="https://blog.ninochavez.co">Full archive — 277 essays since 2018 →</a></p>
			</section>

			<section class="v3-block" id="reading">
				<span class="v3-block-label">reading + listening</span>
				<h2 class="v3-block-title">What's in the rotation this week.</h2>

				<div class="v3-receipt-group">
					<div class="v3-receipt">
						<div class="v3-receipt-name">"Harness engineering" (Lopopolo)</div>
						<div class="v3-receipt-desc">OpenAI Feb 2026 piece + Latent Space interview. Re-reading for /colophon influence cites.<span class="v3-receipt-url">openai.com/index/harness-engineering</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">"Memos on AI-assisted delivery" (Böckeler)</div>
						<div class="v3-receipt-desc">ThoughtWorks/Martin Fowler series. The "memos" framing as informal-iterative is influencing how I'll surface Signal Dispatch sub-modes.<span class="v3-receipt-url">martinfowler.com/articles/exploring-gen-ai</span></div>
					</div>
				</div>
			</section>

		</div>

		<aside class="v3-column-rail">

			<div class="v3-rail-card">
				<div class="v3-rail-label">live signals</div>
				<!-- TODO W6: replace with live data sources -->
				<div class="v3-live-row">
					<span class="v3-live-tag">writing</span>
					<span class="v3-live-text">Latest dispatch loading…</span>
					<span class="v3-live-age">→ blog.ninochavez.co</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">shipping</span>
					<span class="v3-live-text">Rally HQ — production</span>
					<span class="v3-live-age">→ rallyhq.app</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">in flight</span>
					<span class="v3-live-text">ninochavez.co v3 — Stage 6 deploy</span>
					<span class="v3-live-age">→ /colophon</span>
				</div>
			</div>

			<div class="v3-rail-card">
				<div class="v3-rail-label">stage status — blueprint initiatives</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 6</span>
					<span class="v3-live-text">ninochavez.co v3</span>
					<span class="v3-live-age">deploy · 4 routes live</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 7</span>
					<span class="v3-live-text">Blueprint methodology</span>
					<span class="v3-live-age">iterating template hooks</span>
				</div>
			</div>

			<div class="v3-rail-card">
				<div class="v3-rail-label">last updated</div>
				<div class="v3-live-row">
					<span class="v3-live-text">2026-05-25</span>
					<span class="v3-live-age">manual until Stage 7 lifestream automation lands</span>
				</div>
			</div>

		</aside>
	</div>

	<footer class="v3-footer">
		<div class="v3-footer-inner">
			<div>
				<h4>navigate</h4>
				<ul>
					<li><a href="/">Home</a></li>
					<li><a href="/speaking">Speaking</a></li>
					<li><a href="/colophon">Colophon</a></li>
				</ul>
			</div>
			<div>
				<h4>subscribe</h4>
				<ul>
					<li><a href="https://blog.ninochavez.co">Signal Dispatch RSS</a></li>
				</ul>
			</div>
			<div>
				<h4>contact</h4>
				<ul>
					<li><a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a></li>
					<li><a href="https://github.com/nino-chavez">GitHub</a></li>
				</ul>
			</div>
		</div>
		<div class="v3-footer-meta">
			<span>v3 · 2026-05-25 · cyanotype edition</span>
		</div>
	</footer>
</div>
