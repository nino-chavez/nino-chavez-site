<script>
	export let aeoLink = '/api/person.json';
	export let aeoLabel = '/api/person.json';
</script>

<footer class="foot">
	<p>© {new Date().getFullYear()} Nino Chavez · Chicago</p>
	<p class="meta">
		<a href={aeoLink}>{aeoLabel}</a>
	</p>
</footer>

<style>
	.foot {
		margin-top: var(--space-12);
		padding-top: var(--space-6);
		border-top: 1px solid var(--border-subtle);
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-4);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-faint);
	}

	.foot p {
		margin: 0;
	}

	.meta a {
		color: var(--text-muted);
		text-decoration: none;
	}

	.meta a:hover {
		color: var(--text-link-hover);
	}
</style>
