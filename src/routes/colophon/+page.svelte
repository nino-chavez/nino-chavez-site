<script>
	// v3 /colophon — methodology meta-receipt page
	// Source: blueprint/research/03-design-brief.md § /colophon
	// Closes 01-diagnose.md D5 (design system divergence) + implements
	// differentiation move 3 (methodology meta-receipt).
	// Stage 7 C1 candidate: rework with Stitch-inspired stat-tile +
	// receipt-line treatment (deferred to iterate cycle).
</script>

<svelte:head>
	<title>Colophon — Nino Chavez ⊕ studio</title>
	<meta name="description" content="How this site was built — the cyanotype print of its own methodology. Blueprint pipeline applied to v3 ninochavez.co: diagnose → prescription → design brief → prototype → fact-check → documents → iterate." />
	<link rel="canonical" href="https://ninochavez.co/colophon" />
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
				<a href="/#building">On the desk</a>
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
				How this site was built — the <span class="v3-emphasis-red">cyanotype</span> print of its own methodology.
			</p>

			<p class="v3-prose-body">
				This page is the meta-receipt: the same site that names Blueprint
				as the methodology also documents the methodology that produced it.
				Every claim on the rest of the site traces back here, and from here
				back to the research artifacts in the repo. Walk the chain in
				either direction.
			</p>

			<section class="v3-block" id="methodology">
				<span class="v3-block-label">the methodology</span>
				<h2 class="v3-block-title">Blueprint — brownfield audit-driven delivery.</h2>

				<p>This site is the latest output of <a href="https://github.com/nino-chavez/blueprint">Blueprint</a> — the brownfield audit-driven methodology I'm developing in <code>wip/blueprint</code> and applying to projects including <a href="https://rallyhq.app">Rally HQ</a>, <a href="https://blog.ninochavez.co">Signal Dispatch</a>, and this one.</p>

				<p>Blueprint defines a seven-stage pipeline; brownfield projects follow it differently than greenfield. v3 of this site is a brownfield Pattern B initiative — diagnose-prescribe-design-prototype the new state against the live product.</p>

				<div class="v3-receipt-group" style="margin-top: 2rem;">
					<div class="v3-receipt-group-label">the pipeline for ninochavez.co v3</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 1 — Diagnose</div>
						<div class="v3-receipt-desc">8 numbered diagnoses pairing v2's abstract claims with the receipts that contradict them. Closes with 4 resolved open questions.<span class="v3-receipt-url">research/01-diagnose.md · 421 lines</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 2 — Prescription</div>
						<div class="v3-receipt-desc">8 impact-ordered changes (P0/P1/P2/P3) each with one evidence cite. Receipt-bucket discipline: 11 CURRENT, 2 EVOLUTION, 1 client context, 14 ADJACENT.<span class="v3-receipt-url">research/02-prescription.yml · 329 lines</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 3 — Design Brief (v0.2)</div>
						<div class="v3-receipt-desc">v0.1 cohort-followed and produced AI-default tells. v0.2 carries 8 structural moves forward and reworks the visual direction against an anti-slop test.<span class="v3-receipt-url">research/03-design-brief.md · 700+ lines</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 3.5 — Visual Spec</div>
						<div class="v3-receipt-desc">High-fidelity pixel screens via Google Stitch for all 4 pages. Calibration artifact for composition + density.<span class="v3-receipt-url">research/03.5-visual-spec/</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 4 — Prototype</div>
						<div class="v3-receipt-desc">Stakeholder-review portal at blueprint.ninochavez.co. 4 pages, 3 persona flows.<span class="v3-receipt-url">blueprint/portal/</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 5 — Fact-Check</div>
						<div class="v3-receipt-desc">Ralph Wiggum convergence loop. 6 PASS / 5 DEFER / 0 FAIL.<span class="v3-receipt-url">research/05-fact-check.md · 419 lines</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 6 — Documents + Deploy</div>
						<div class="v3-receipt-desc">Strategy summary + production deploy plan. This SvelteKit production is the deploy.<span class="v3-receipt-url">research/06-strategy-summary.md + 07-production-deploy-plan.md</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Stage 7 — Iterate</div>
						<div class="v3-receipt-desc">Stakeholder feedback loop. Annotation overlay enabled on the portal via localStorage flag.<span class="v3-receipt-url">post-launch</span></div>
					</div>
				</div>

				<p style="margin-top: 2rem;">Every claim on this site traces to a research artifact in <a href="https://github.com/nino-chavez/website-nc/tree/main/blueprint/research">github.com/nino-chavez/website-nc/blueprint/research</a>. Open the directory, walk the numbered files in order.</p>
			</section>

			<section class="v3-block" id="stack">
				<span class="v3-block-label">the stack</span>
				<h2 class="v3-block-title">SvelteKit on Cloudflare Pages. Vectorize for the chat.</h2>

				<div class="v3-receipt-group">
					<div class="v3-receipt">
						<div class="v3-receipt-name">Framework</div>
						<div class="v3-receipt-desc">SvelteKit on Cloudflare adapter. Static-first; Pages Functions for the chat surface.<span class="v3-receipt-url">svelte 4 · sveltekit · @sveltejs/adapter-cloudflare</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Hosting</div>
						<div class="v3-receipt-desc">Cloudflare Pages at ninochavez.co. Blueprint portal at blueprint.ninochavez.co (stakeholder review).<span class="v3-receipt-url">project: ninochavez-main</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Type</div>
						<div class="v3-receipt-desc">Bree Serif (display) + Crimson Pro (body — radical for the cohort) + Inter (UI only) + JetBrains Mono (data + labels).<span class="v3-receipt-url">self-hosted via @fontsource</span></div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Color</div>
						<div class="v3-receipt-desc">Deep cyanotype blueprint blue canvas (#1e3a5e). Cream type (#f6efdb). Counter-saturated proof-mark red (#e8623f) for emphasis only.<span class="v3-receipt-url">color = positioning</span></div>
					</div>
				</div>
			</section>

			<section class="v3-block" id="influences">
				<span class="v3-block-label">predecessors + influences</span>
				<h2 class="v3-block-title">Where the patterns came from. Citing the lineage.</h2>

				<p>The site shape owes most to <a href="https://brianlovin.com">Brian Lovin</a>, <a href="https://hyperbo.la">Ryan Lopopolo</a>, and <a href="https://www.geoffreylitt.com">Geoffrey Litt</a> — capability sentence plus named receipt list is their pattern.</p>

				<p>The methodology-as-meta-receipt move is borrowed from <a href="https://lethain.com">Will Larson's body of work</a> — systematized practitioner methodology applied to one's own surface. Blueprint is, in shape if not in topic, "Larson's pattern applied to AI-native delivery."</p>

				<p>The harness-engineering vocabulary on this site predates the OpenAI Feb 2026 piece but was named publicly first by Ryan Lopopolo. Citing the coiner here so the lineage stays straight; the contribution this site claims is the commerce-specific application, not the term.</p>

				<p>The body-in-serif move (cohort-divergent) is calibrated against the writer-cohort — magazine-essay tradition. The cyanotype color is direct material reference to Sir John Herschel's 1842 architectural drafting reproduction process.</p>

				<p>Anti-slop posture borrowed from <a href="https://letspepper.com">letspepper.com</a> + <a href="https://flickdaymedia.com">flickdaymedia.com</a> — sites I've previously fought this same fight on. Big confident type, saturated color, not-muted-tasteful, type-driven. Form reinvented because architect-who-writes is a different genre than sport-cultural-brand.</p>
			</section>

			<section class="v3-block" id="changes">
				<span class="v3-block-label">what changed from v2</span>
				<h2 class="v3-block-title">v3 closes the diagnoses, then differentiates.</h2>

				<div class="v3-receipt-group">
					<div class="v3-receipt">
						<div class="v3-receipt-name">Identity frame</div>
						<div class="v3-receipt-desc">v2 read hobbyist polymath (Photography + Music + Writing + Building as 4 equal pursuits). v3 is architect-primary; creative pursuits live in subdomains, surfaced as nav links only. Closes D1.</div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Receipt density</div>
						<div class="v3-receipt-desc">v2 surfaces 4 products. v3 surfaces 11 CURRENT receipts, topic-grouped. None of the audited cohort sites has this many shipped surfaces. Closes D8.</div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Contact path</div>
						<div class="v3-receipt-desc">v2 had an unstructured mailto and an unsurfaced Cal.com. v3 has a single general inquiry CTA. Closes D4.</div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">/ai surfacing</div>
						<div class="v3-receipt-desc">v2's /ai subsection (5 pages, 1,377 lines) was invisible from /. v3 surfaces it from nav. Closes D2.</div>
					</div>
					<div class="v3-receipt">
						<div class="v3-receipt-name">Design system</div>
						<div class="v3-receipt-desc">v2 lived in drift between DESIGN.md (violet content-forward) and live / (lime bento spectacle). v3 retires both; new system from clean slate. Closes D5.</div>
					</div>
				</div>
			</section>

		</div>

		<aside class="v3-column-rail">

			<div class="v3-rail-card">
				<div class="v3-rail-label">research artifacts</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 1</span>
					<span class="v3-live-text">01-diagnose.md</span>
					<span class="v3-live-age">421 lines · 8 diagnoses</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 2</span>
					<span class="v3-live-text">02-prescription.yml</span>
					<span class="v3-live-age">329 lines · 8 prescriptions</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 3</span>
					<span class="v3-live-text">03-design-brief.md v0.2</span>
					<span class="v3-live-age">700+ lines · anti-slop reworked</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-tag">stage 5</span>
					<span class="v3-live-text">05-fact-check.md</span>
					<span class="v3-live-age">6 PASS / 5 DEFER / 0 FAIL</span>
				</div>
			</div>

			<div class="v3-rail-card">
				<div class="v3-rail-label">cohort calibration</div>
				<div class="v3-live-row">
					<span class="v3-live-text"><a href="https://github.com/nino-chavez/website-nc/blob/main/blueprint/research/competitive/peer-cohort.md" style="color: var(--v3-text-primary); border-bottom: none;">peer-cohort.md</a></span>
					<span class="v3-live-age">site-shape audit · 7 sites</span>
				</div>
				<div class="v3-live-row">
					<span class="v3-live-text"><a href="https://github.com/nino-chavez/website-nc/blob/main/blueprint/research/competitive/market-cohort.md" style="color: var(--v3-text-primary); border-bottom: none;">market-cohort.md</a></span>
					<span class="v3-live-age">voice/positioning audit · 11 voices</span>
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
					<li><a href="/now">Now</a></li>
				</ul>
			</div>
			<div>
				<h4>contact</h4>
				<ul>
					<li><a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a></li>
					<li><a href="https://github.com/nino-chavez">GitHub</a></li>
				</ul>
			</div>
			<div>
				<h4>repo</h4>
				<ul>
					<li><a href="https://github.com/nino-chavez/website-nc">website-nc</a></li>
					<li><a href="https://blueprint.ninochavez.co">stakeholder portal</a></li>
				</ul>
			</div>
		</div>
		<div class="v3-footer-meta">
			<span>v3 · 2026-05-25 · cyanotype edition</span>
		</div>
	</footer>
</div>
