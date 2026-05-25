<script>
	/**
	 * SiteFooter — minimal footer with copyright + AEO endpoint link.
	 *
	 * Per blueprint/03-design-brief.md and ADR-0001 — no transactional
	 * framing. Footer is informational only, no CTAs, no "Now Booking".
	 *
	 * @param {string} [aeoHref] - link to a structured-data endpoint (per ADR convention)
	 * @param {string} [aeoLabel] - displayed label for the AEO link
	 */
	let { aeoHref = '/api/person.json', aeoLabel = '/api/person.json' } = $props();

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="site-footer-inner container">
		<p class="copyright">© {year} Nino Chavez · Chicago</p>
		<p class="meta">
			<a href="/blueprint/" rel="noopener">blueprint.ninochavez.co</a>
			<span class="sep" aria-hidden="true">·</span>
			<a href={aeoHref}>{aeoLabel}</a>
		</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: var(--space-32);
		padding-block: var(--space-8);
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.site-footer-inner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-faint);
	}

	.site-footer-inner p {
		margin: 0;
		color: var(--text-faint);
	}

	.meta {
		display: inline-flex;
		gap: var(--space-3);
		align-items: center;
	}

	.meta a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.meta a:hover {
		color: var(--text-link-hover);
	}

	.sep {
		color: var(--border-strong);
	}
</style>
