<script>
	// v3 /speaking — Conference Circuit persona surface
	// Source: blueprint/research/03-design-brief.md § /speaking page composition
	// Closes 01-diagnose.md D3: Conference Circuit had no funnel.

	let copyState = '';

	function copyBio(variant) {
		const el = document.getElementById(`bio-${variant}`);
		if (!el) return;
		navigator.clipboard.writeText(el.innerText.trim()).then(() => {
			copyState = variant;
			setTimeout(() => (copyState = ''), 2000);
		});
	}
</script>

<svelte:head>
	<title>Speaking — Nino Chavez ⊕ studio</title>
	<meta name="description" content="Bio variants, headshot library, topic list. Available for keynotes, panels, podcasts, and internal summits at the intersection of enterprise commerce and AI-native software delivery." />
	<link rel="canonical" href="https://ninochavez.co/speaking" />
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
				I write and build at the intersection of <span class="v3-emphasis-red">enterprise commerce</span> and AI-native software delivery.
			</p>

			<p class="v3-prose-body">
				Available for keynotes, panels, podcasts, and internal summits. The
				inquiry path goes through the same general contact as everything
				else; no separate form. The page below is what curators need to slate
				me without leaving the site: bio variants, a headshot, a topic list,
				and an honest accounting of what's already on the record.
			</p>

			<a href="mailto:nino@ninochavez.co?subject=Speaking%20%E2%80%94%20[event]%20%E2%80%94%20[date]" class="v3-prose-cta">Schedule a conversation</a>

			<section class="v3-block" id="bio">
				<span class="v3-block-label">bio — copy-pasteable</span>
				<h2 class="v3-block-title">Three bios for three slate-doc lengths.</h2>

				<div class="v3-receipt-group">
					<div class="v3-receipt-group-label">50 words</div>
					<p id="bio-50" style="margin-bottom: 0.5rem;">Nino Chavez is a Product Architect at commerce.com who directs agents to ship enterprise commerce. He develops the Blueprint methodology for AI-native delivery, writes at Signal Dispatch (277 essays since 2018), and ships at Rally HQ, Atelier, and across the practice from Chicago.</p>
					<button on:click={() => copyBio('50')} class="v3-copy-btn">
						{copyState === '50' ? '✓ copied' : 'copy ↗'}
					</button>
				</div>

				<div class="v3-receipt-group">
					<div class="v3-receipt-group-label">100 words</div>
					<p id="bio-100" style="margin-bottom: 0.5rem;">Nino Chavez is a Product Architect at commerce.com working at the intersection of enterprise commerce and AI-native software delivery. He develops Blueprint — a brownfield audit-driven methodology for shipping AI-augmented systems — and applies it across products including Rally HQ (live tournament platform), Atelier (OSS template for mixed human/agent teams), and Quantifai (AI FinOps). He writes at Signal Dispatch (277 essays since 2018) on harness engineering, the buy-vs-build threshold in the agent era, and the practice of directing agents. Based in Chicago.</p>
					<button on:click={() => copyBio('100')} class="v3-copy-btn">
						{copyState === '100' ? '✓ copied' : 'copy ↗'}
					</button>
				</div>

				<div class="v3-receipt-group">
					<div class="v3-receipt-group-label">250 words</div>
					<div id="bio-250" style="margin-bottom: 0.5rem;">
						<p>Nino Chavez is a Product Architect at commerce.com working at the intersection of enterprise commerce architecture and AI-native software delivery. His thesis — architect-directs-agents — has been applied at production scale across multiple shipped products and forms the substrate for Blueprint, his brownfield audit-driven methodology for shipping AI-augmented systems through diagnose → prescription → design brief → fact-check stages.</p>
						<p>His shipped work includes Rally HQ, a live tournament platform serving real volleyball tournaments built as the Blueprint Pattern B reference implementation; Atelier, an OSS template and interop protocol for mixed human/agent teams; Quantifai, an AI FinOps platform for cost attribution across model providers; and Signal X Studio, the identity surface for the practice. He also subcontracts B2B subscription work and runs adjacent brand surfaces (Let's Pepper, Flickday Media) and a 20,000-photo volleyball action gallery.</p>
						<p>Nino writes at Signal Dispatch (277 essays since 2018) on harness engineering for commerce, the buy-vs-build threshold in the agent era, brownfield-over-greenfield methodology, and the practice of directing agents at production scale. He's based in Chicago and available for keynotes, panels, podcasts, and internal summits.</p>
					</div>
					<button on:click={() => copyBio('250')} class="v3-copy-btn">
						{copyState === '250' ? '✓ copied' : 'copy ↗'}
					</button>
				</div>
			</section>

			<section class="v3-block" id="topics">
				<span class="v3-block-label">topics I speak on</span>
				<h2 class="v3-block-title">Pick the angle that fits your stage.</h2>

				<div class="v3-topic">
					<span class="v3-topic-name">Harness engineering for enterprise commerce</span>
					<p class="v3-topic-desc">What it is, why it changes the architect's role at scale, what survives the transition and what doesn't. Format: 25–45 min keynote or 60 min workshop with case study.</p>
				</div>

				<div class="v3-topic">
					<span class="v3-topic-name">Agentic workflows in practice</span>
					<p class="v3-topic-desc">Patterns at Rally HQ, Quantifai, Atelier — what works and what doesn't when the harness is the load-bearing engineering. Format: 25–45 min talk with live receipts.</p>
				</div>

				<div class="v3-topic">
					<span class="v3-topic-name">Commerce in the agent era</span>
					<p class="v3-topic-desc">Specific patterns for commerce platforms moving from human-driven to agent-driven flows. Format: 25–45 min, commerce-specific events.</p>
				</div>

				<div class="v3-topic">
					<span class="v3-topic-name">Blueprint methodology</span>
					<p class="v3-topic-desc">A brownfield audit-driven methodology for AI-native delivery — diagnose → prescription → design brief → fact-check. Format: 45 min talk or workshop applying the pipeline to the audience's product.</p>
				</div>

				<div class="v3-topic">
					<span class="v3-topic-name">Brownfield over greenfield</span>
					<p class="v3-topic-desc">Auditing the system you have before designing the one you wish you had — and why that discipline matters more in the agent era. Format: 25–35 min talk.</p>
				</div>
			</section>

			<section class="v3-block" id="past">
				<span class="v3-block-label">on the record</span>
				<h2 class="v3-block-title">Past talks and the substrate the talks draw from.</h2>

				<p>Talks list is short — the writing corpus is the substrate. <a href="https://blog.ninochavez.co">Signal Dispatch carries 277 essays</a> across the topics above; each talk is built from a stack of those essays.</p>

				<div class="v3-receipt-group" style="margin-top: 2rem;">
					<div class="v3-receipt-group-label">in progress</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Latent Space podcast (anticipated 2026)</div>
						<div class="v3-receipt-desc">Harness engineering case study — Rally HQ as production reference.<span class="v3-receipt-url">scheduling in progress</span></div>
					</div>
				</div>
			</section>

		</div>

		<aside class="v3-column-rail">

			<div class="v3-rail-card">
				<div class="v3-rail-label">headshot library</div>
				<div class="v3-photo-anchor" style="margin-bottom: 0.5rem;"></div>
				<div class="v3-photo-caption">SQUARE 1:1 · 2026 · 4096×4096<br><a href="#">download ↗</a></div>
				<div class="v3-photo-anchor" style="margin-top: 1rem; aspect-ratio: 16/9;"></div>
				<div class="v3-photo-caption">WIDE 16:9 · 2026 · 4096×2304<br><a href="#">download ↗</a></div>
				<div style="margin-top: 1rem; font-family: var(--v3-font-mono); font-size: var(--v3-text-micro); color: var(--v3-text-muted);">credit: required if photographer named in EXIF</div>
			</div>

			<div class="v3-rail-card">
				<div class="v3-rail-label">contact path</div>
				<div class="v3-live-row">
					<span class="v3-live-text">nino@ninochavez.co</span>
					<span class="v3-live-age">subject template pre-filled: speaking — [event] — [date]</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-text"><a href="https://www.linkedin.com/in/nino-chavez/" style="color: var(--v3-text-primary); border-bottom: none;">LinkedIn</a></span>
					<span class="v3-live-age">verification + DM if email's blocked</span>
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
					<li><a href="/#desk">On the desk</a></li>
					<li><a href="/#writing">Writing</a></li>
					<li><a href="/colophon">Colophon</a></li>
					<li><a href="/now">Now</a></li>
				</ul>
			</div>
			<div>
				<h4>contact</h4>
				<ul>
					<li><a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a></li>
					<li><a href="https://www.linkedin.com/in/nino-chavez/">LinkedIn</a></li>
					<li><a href="https://github.com/nino-chavez">GitHub</a></li>
				</ul>
			</div>
			<div>
				<h4>built with</h4>
				<ul>
					<li>Blueprint methodology.</li>
					<li><a href="/colophon">→ how this site was built</a></li>
				</ul>
			</div>
		</div>
		<div class="v3-footer-meta">
			<span>v3 · 2026-05-25 · cyanotype edition</span>
		</div>
	</footer>
</div>

<style>
	.v3-copy-btn {
		font-family: var(--v3-font-mono);
		font-size: var(--v3-text-micro);
		color: var(--v3-accent-red);
		background: transparent;
		border: 1px solid var(--v3-accent-red);
		padding: 0.375rem 0.75rem;
		cursor: pointer;
		transition: background 180ms ease;
	}
	.v3-copy-btn:hover {
		background: var(--v3-accent-red);
		color: var(--v3-canvas);
	}
</style>
