<script>
	/** closing-pointer-row composition — title link + caption */
	export let title;
	export let href;
	export let external = false;
</script>

<div class="pointer">
	<h3>
		<a {href} rel={external ? 'noopener' : null} target={external ? '_blank' : null}>
			{title} →
		</a>
	</h3>
	<p>
		<slot />
	</p>
</div>

<style>
	.pointer {
		display: block;
	}

	h3 {
		margin: 0 0 var(--space-2);
		font-size: var(--type-lead);
		font-weight: 500;
		letter-spacing: var(--tracking-tight);
	}

	h3 a {
		color: var(--text-primary);
		text-decoration: none;
		transition: color var(--dur-base) var(--ease-out);
	}

	h3 a:hover {
		color: var(--text-link-hover);
	}

	p {
		margin: 0;
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.55;
	}
</style>
